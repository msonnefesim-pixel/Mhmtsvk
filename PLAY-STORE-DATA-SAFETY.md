# Google Play Veri Güvenliği — yayın öncesi çalışma notu

Son kod incelemesi: 26 Kasım 2026 · Uygulama: V94

## İncelenen uygulama davranışı
- Hesap oluşturma veya oturum açma yok.
- Android uygulama bağımlılıklarına Google Mobile Ads (AdMob) SDK eklendi. İlk Android test yapılandırması yalnızca Google'ın resmî test uygulama ve banner reklam kimliklerini kullanır; gerçek reklam kimlikleri henüz eklenmedi.
- Native reklam köprüsü yalnızca Android platformunda çalışır. Web/PWA sürümünde AdMob SDK başlatılmaz.
- Reklam rızası UMP üzerinden sorgulanır; yalnızca SDK'nın canRequestAds değeri true olduğunda reklam isteği yapılır.
- Banner yalnızca izin verilen yardımcı ekranlarda görünür; Kur'an metni/meal okuma ekranı ve Tesbih Çekme ekranında gizlenir.
- Uygulama kodunda kullanıcı verisini geliştirici sunucusuna gönderen bir akış görünmüyor.
- Son okunan sure/ayet, favoriler, zikir sayaçları ve geçmişi, okuma hedefleri, tema ve yazı boyutu cihazın yerel depolamasında tutuluyor.
- Arapça metin ve Türkçe meal uygulamayla gelen yerel veri dosyalarından okunuyor. Okuma sırasında AlQuran Cloud veya QuranEnc API isteği yapılmıyor.
- Kullanıcı paylaşımı kendisi başlatıyor; uygulama seçilen görsel/metni işletim sisteminin paylaşım menüsüne veriyor. Kullanıcı hedef uygulamayı seçiyor.
- Uygulama kendi özellikleri için konum, kişi listesi, fotoğraf arşivi veya benzeri kişisel veri izni istemiyor. Google Mobile Ads SDK'sının IP adresinden yaklaşık konum çıkarımı yapabilmesi, uygulamanın konum izni istemesinden ayrı bir SDK veri işleme faaliyetidir.

## AdMob SDK'sı için dikkate alınacak veri kategorileri
Google'ın Android Google Mobile Ads SDK açıklamasına göre SDK; IP adresini (yaklaşık konum çıkarımı için), uygulama etkileşim bilgilerini, tanılama bilgilerini ve cihaz/hesap tanımlayıcılarını reklam, analiz ve sahtekârlığı önleme amaçlarıyla otomatik olarak toplayıp paylaşabilir. Aktarım TLS ile şifrelenir. Reklam kimliği toplanması Android manifest ayarlarıyla kontrol edilebilir. Güncel belge:
https://developers.google.com/admob/android/privacy/play-data-disclosure

Bu nedenle nihai Play Console formunda “hiç veri toplanmıyor” veya “hiç veri paylaşılmıyor” yanıtları varsayılan olarak seçilmemelidir. SDK'nın yayın paketindeki kesin sürümü, yapılandırması ve beyan kapsamı ayrıca doğrulanmalıdır.

## Android paket kontrolü durumu
- Android derleme iş akışına, üretilecek birleştirilmiş AndroidManifest.xml içindeki izinleri ve releaseRuntimeClasspath bağımlılık ağacını raporlayan denetim adımı eklendi.
- Android release preflight iş akışı, APK/AAB üretmeden Android projesini oluşturup manifest ve bağımlılık denetimi yapacak şekilde hazırlandı.
- Preflight sonucu henüz tamamlanmadı; nihai manifest ve SDK raporu görülmeden denetim başarılı kabul edilmeyecek.

## Mevcut sınırlama
- Android proje dizini repoda saklanmıyor; GitHub Actions içinde Capacitor ile yeniden oluşturuluyor.
- Google test reklam kimlikleri yalnızca test içindir; bunlarla gerçek gelir elde edilmez.
- Kullanıcının AdMob hesabından gerçek uygulama kimliği ve banner birimi kimliği alınmadı.
- Google AdMob/UMP panelinde gerekli bölgesel rıza mesajlarının yapılandırıldığı henüz doğrulanmadı.
- Kullanıcı isteği doğrultusunda şu aşamada APK/AAB oluşturulmamıştır.

## Yayın öncesi zorunlu Android kontrolü
1. Üretilecek AAB içindeki birleştirilmiş AndroidManifest.xml dosyasını incele.
2. İzinleri ve bunların hangi özellik tarafından kullanıldığını kontrol et.
3. Gradle bağımlılık ağacını ve pakete giren tüm SDK'ları kontrol et.
4. SDK'ların otomatik veri toplama/paylaşım davranışını kendi güncel belgeleriyle karşılaştır.
5. Rıza mesajını gerçek hedef bölgelerde ve gerçek cihazda doğrula.
6. Banner'ın yalnızca izin verilen ekranlarda göründüğünü; Kur'an okuma ve Tesbih ekranlarında kapandığını doğrula.
7. Gizlilik politikası ile Play Console Veri Güvenliği yanıtlarının birebir tutarlı olduğunu teyit et.
8. Gerçek reklam kimliklerini yalnızca testler ve politika kontrolleri tamamlandıktan sonra ekle.

Google Play, SDK'lar tarafından aktarılan veriler dâhil uygulamanın tüm veri akışlarının beyan edilmesini ister. Nihai beyanın doğruluğundan geliştirici sorumludur. Paket kontrolü tamamlanmadan kesin Veri Güvenliği beyanı yapılmamalıdır.
