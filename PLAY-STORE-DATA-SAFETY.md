# Google Play Veri Güvenliği — yayın öncesi çalışma notu

Son kod incelemesi: 26 Kasım 2026 · Web uygulaması: V93

## İncelenen uygulama davranışı
- Hesap oluşturma veya oturum açma yok.
- Reklam, analiz veya izleme SDK'sı görünmüyor.
- Uygulama kodunda kullanıcı verisini geliştirici sunucusuna gönderen bir akış görünmüyor.
- Son okunan sure/ayet, favoriler, zikir sayaçları ve geçmişi, okuma hedefleri, tema ve yazı boyutu cihazın yerel depolamasında tutuluyor.
- Arapça metin ve Türkçe meal uygulamayla gelen yerel veri dosyalarından okunuyor. Okuma sırasında AlQuran Cloud veya QuranEnc API isteği yapılmıyor.
- Kullanıcı paylaşımı kendisi başlatıyor; uygulama seçilen görsel/metni işletim sisteminin paylaşım menüsüne veriyor. Kullanıcı hedef uygulamayı seçiyor.
- Uygulama içinde konum, kişi listesi, fotoğraf arşivi veya benzeri kişisel veri izni isteyen bir özellik tespit edilmedi.

## Play Console için geçici değerlendirme
Nihai Android paketi aynı davranışı ve yalnızca mevcut bağımlılıkları koruyorsa, Veri Güvenliği formunda “veri toplanmıyor” ve “veri paylaşılmıyor” yanıtları uygun olabilir. Bu bir taslak değerlendirmedir; Play Console'a henüz nihai cevap olarak girilmemelidir.

## Yayın öncesi zorunlu Android kontrolü
1. Üretilecek AAB/APK içindeki birleştirilmiş AndroidManifest.xml dosyasını incele.
2. İzinleri ve bunların hangi özellik tarafından kullanıldığını kontrol et.
3. Gradle bağımlılık ağacını ve pakete giren tüm SDK'ları kontrol et.
4. SDK'ların otomatik veri toplama/paylaşım davranışını kendi güncel belgeleriyle karşılaştır.
5. WebView/Capacitor köprüleri ve dış bağlantı/paylaşım davranışını gerçek cihazda doğrula.
6. Gizlilik politikası ile Play Console Veri Güvenliği yanıtlarının birebir tutarlı olduğunu teyit et.

Google Play, SDK'lar tarafından aktarılan veriler dâhil uygulamanın tüm veri akışlarının beyan edilmesini ister. Nihai beyanın doğruluğundan geliştirici sorumludur. Paket kontrolü tamamlanmadan “kesinlikle veri toplamıyor” şeklinde garanti verilmemelidir.
