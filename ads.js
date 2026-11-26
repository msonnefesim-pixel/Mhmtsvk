import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize
} from '@capacitor-community/admob';

const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const AD_ALLOWED_PAGES = new Set([
  'home',
  'duas',
  'names',
  'continue',
  'favorites',
  'readingStats',
  'inspiration'
]);

let sdkReady = false;
let consentAllowsAds = false;
let bannerVisible = false;
let desiredVisibility = false;
let startPromise = null;

function setBannerInset(height) {
  const value = Number(height) > 0 ? Number(height) : 0;
  document.documentElement.style.setProperty('--native-ad-height', value + 'px');
  document.body.classList.toggle('native-banner-visible', value > 0);
}

async function hideNativeBanner() {
  if (!Capacitor.isNativePlatform() || !sdkReady || !bannerVisible) {
    setBannerInset(0);
    return;
  }
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.warn('AdMob banner could not be hidden:', error);
  }
  bannerVisible = false;
  setBannerInset(0);
}

async function prepareAdMob() {
  if (sdkReady && consentAllowsAds) return true;
  if (startPromise) return startPromise;

  startPromise = (async () => {
    try {
      let consent = await AdMob.requestConsentInfo();
      if (
        consent.isConsentFormAvailable &&
        consent.status === AdmobConsentStatus.REQUIRED
      ) {
        consent = await AdMob.showConsentForm();
      }
      consentAllowsAds = Boolean(consent.canRequestAds);
      if (!consentAllowsAds) return false;

      await AdMob.initialize();
      await AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => {
        if (bannerVisible) setBannerInset(size.height);
      });
      sdkReady = true;
      return true;
    } catch (error) {
      console.warn('AdMob consent or initialization did not complete:', error);
      return false;
    } finally {
      startPromise = null;
    }
  })();

  return startPromise;
}

window.setNativeAdVisibility = async (page, view = 'list') => {
  const shouldShow = Capacitor.isNativePlatform() &&
    view !== 'reader' &&
    AD_ALLOWED_PAGES.has(page);
  desiredVisibility = shouldShow;

  if (!shouldShow) {
    await hideNativeBanner();
    return;
  }

  const ready = await prepareAdMob();
  if (!ready || !desiredVisibility || bannerVisible) return;

  try {
    await AdMob.showBanner({
      adId: TEST_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
      npa: true
    });
    bannerVisible = true;
    if (!desiredVisibility) await hideNativeBanner();
  } catch (error) {
    bannerVisible = false;
    setBannerInset(0);
    console.warn('Test banner was not displayed:', error);
  }
};

// The browser/PWA preview never initializes native advertising.
if (Capacitor.isNativePlatform()) {
  window.setNativeAdVisibility('home', 'list');
}
