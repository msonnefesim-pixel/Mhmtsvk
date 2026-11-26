# Google Play Veri Güvenliği — yayın öncesi çalışma notu

Son kod incelemesi: 26 Kasım 2026 · Web uygulaması: V94

## İncelenen uygulama davranışı
- Hesap oluşturma veya oturum açma yok.
- V94 web kodunda reklam, analiz veya izleme SDK'sı bulunmuyor. AdMob entegrasyonu planlanıyor ancak henüz eklenmedi; eklendiğinde bu değerlendirme ve gizlilik politikası yeniden hazırlanmalı.
- Uygulama kodunda kullanıcı verisini geliştirici sunucusuna gönderen bir akış görünmüyor.
- Son okunan sure/ayet, favoriler, zikir sayaçları ve geçmişi, okuma hedefleri, tema ve yazı boyutu cihazın yerel depolamasında tutuluyor.
- Arapça metin ve Türkçe meal uygulamayla gelen yerel veri dosyalarından okunuyor. Okuma sırasında AlQuran Cloud veya QuranEnc API isteği yapılmıyor.
- Kullanıcı paylaşımı kendisi başlatıyor; uygulama seçilen görsel/metni işletim sisteminin paylaşım menüsüne veriyor. Kullanıcı hedef uygulamayı seçiyor.
- Uygulama içinde konum, kişi listesi, fotoğraf arşivi veya benzeri kişisel veri izni isteyen bir özellik tespit edilmedi.

## Play Console için geçici değerlendirme
Nihai Android paketi aynı davranışı ve yalnızca mevcut bağımlılıkları koruyorsa, Veri Güvenliği formunda “veri toplanmıyor” ve “veri paylaşılmıyor” yanıtları uygun olabilir. Bu bir taslak değerlendirmedir; Play Console'a henüz nihai cevap olarak girilmemelidir.

## Android paket kontrolü durumu
- Android derleme iş akışına, üretilecek AndroidManifest.xml içindeki izinleri ve `releaseRuntimeClasspath` bağımlılık ağacını raporlayan bir denetim adımı eklendi.
- Bu denetim henüz Android derlemesi çalıştırılarak doğrulanmadı. Paket ve SDK listesi elde edilmeden nihai Veri Güvenliği beyanı yapılmayacak.

## Mevcut sınırlama
Bu incelemede varsayılan dalda `android/app/src/main/AndroidManifest.xml` veya bir Android proje dizini bulunamadı; `package.json` yalnızca Capacitor Android/Core bağımlılıklarını ve `cap sync android` komutunu tanımlıyor. Bu nedenle henüz üretilmiş Android paketi, birleştirilmiş manifest veya gerçek paket SDK listesi incelenmiş değildir. Kullanıcı isteği doğrultusunda şu aşamada APK/AAB oluşturulmamıştır.

## Yayın öncesi zorunlu Android kontrolü
1. Üretilecek AAB/APK içindeki birleştirilmiş AndroidManifest.xml dosyasını incele.
2. İzinleri ve bunların hangi özellik tarafından kullanıldığını kontrol et.
3. Gradle bağımlılık ağacını ve pakete giren tüm SDK'ları kontrol et.
4. SDK'ların otomatik veri toplama/paylaşım davranışını kendi güncel belgeleriyle karşılaştır.
5. WebView/Capacitor köprüleri ve dış bağlantı/paylaşım davranışını gerçek cihazda doğrula.
6. Gizlilik politikası ile Play Console Veri Güvenliği yanıtlarının birebir tutarlı olduğunu teyit et.

Google Play, SDK'lar tarafından aktarılan veriler dâhil uygulamanın tüm veri akışlarının beyan edilmesini ister. Nihai beyanın doğruluğundan geliştirici sorumludur. Paket kontrolü tamamlanmadan “kesinlikle veri toplamıyor” şeklinde garanti verilmemelidir.
