# İçerik kaynakları ve doğrulama durumu

## Arapça Kur'an metni
- Sağlayıcı: AlQuran Cloud — https://alquran.cloud/
- API: https://api.alquran.cloud/v1
- Kullanılan edisyon: `quran-uthmani`
- Kaynak koşulları: https://alquran.cloud/terms-and-conditions
- 13.11.2026 tarihli koşullara göre Kur'an metni kullanılabilir; metin hareke ve yazımı korunarak aynen gösterilmeli ve kaynak belirtilmelidir. Metin üzerinde düzeltme veya yeniden yazım yapılmamalıdır.
- Uygulama sure/ayet sayısı ve meal bütünlüğü kontrolleri yapar. Bu kontroller, bütün harf ve harekelerin bağımsız Mushaf karşılaştırmasıyla tek tek doğrulandığı anlamına gelmez.
- Durum: Yapısal bütünlük kontrolü var; bağımsız tam Mushaf karşılaştırması henüz tamamlanmadı.

## Türkçe meal
- Sağlayıcı: QuranEnc.com API — https://quranenc.com/
- Çeviri: Türkçe Tercüme - Rowwad Translation Center
- API anahtarı: `turkish_rwwad`
- Sürüm: 1.0.4 (28.09.2025)
- API: https://quranenc.com/api/v1/translation/sura/turkish_rwwad/{sure_no}
- Uygulamada mealler kaynak metinden değiştirilmeden alınır; dipnotlar varsa gösterilir. Sure yüklenirken bütün ayet numaralarının tekil ve eksiksiz olduğu kontrol edilir.
- Ticari yeniden yayımlama/lisans koşulları Google Play yayını öncesinde sağlayıcıdan ayrıca teyit edilmelidir.

## Kur'an duaları ve paylaşım kartlarındaki ayetler
- Arapça ayet: AlQuran Cloud `quran-uthmani`.
- Türkçe meal: QuranEnc / Rowwad Translation Center, `turkish_rwwad`.
- Dua ekranında ve paylaşım kartlarında ayet numarasıyla tam meal alınır; veri eksikse tahminî veya kısaltılmış meal gösterilmez.
- Paylaşım kartlarındaki ayetler: İnşirah 94:5-6, Ra'd 13:28, Bakara 2:286, Zümer 39:53. Kur'an dualarında Hz. Musa'nın duası Tâhâ 20:25-28; Allah'a sığınma ve dayanma duası Yûnus 10:85-86 aralığıyla tam gösterilir.

## Hadisler
- Ameller niyetlere göredir: Buhârî 1; Müslim 1907a. Birinci rivayetin metni ve numarası: https://sunnah.com/bukhari:1 ve https://sunnah.com/muslim:1907
- Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz: Buhârî 69; Müslim 1732. Kaynaklar: https://sunnah.com/bukhari/3/11 ve https://sunnah.com/muslim/32/6
- Sizin en hayırlınız, Kur'an'ı öğrenen ve öğretendir: Buhârî 5027. Kaynak: https://sunnah.com/bukhari/66/49
- Güzel söz sadakadır: Bu ifade daha kapsamlı bir sadaka hadisinin parçasıdır; Buhârî 2989 ve Müslim 1009. Kaynaklar: https://sunnah.com/bukhari:2989 ve https://sunnah.com/muslim:1009
- Hadislerin Türkçe ifadeleri anlamı koruyan kısa aktarımlardır; paylaşım kartlarında kaynak künyesi görünür. Kaynak numaraları birincil hadis koleksiyonlarındaki güncel numaralandırmayla eşleştirildi.

## Esma-ül Hüsna
- Uygulamadaki liste, Tirmizî 3507'deki yaygın 99 isim tertibidir: https://sunnah.com/tirmidhi:3507. TDV İslâm Ansiklopedisi, bu liste ekinin Tirmizî ve İbn Mâce rivayetlerinde bulunduğunu, rivayetlerdeki isim listelerinin farklılık gösterdiğini açıklar. 99 isim hadisinin ana metni ile isimlerin tek tek sıralandığı liste aynı şey değildir; TDV İslâm Ansiklopedisi, liste ekinin Tirmizî ve İbn Mâce rivayetlerinde yer aldığını, diğer bazı temel hadis kaynaklarında bulunmadığını ve listeler arasında farklılıklar olduğunu açıklar: https://islamansiklopedisi.org.tr/esma-i-husna
- Bu nedenle uygulamadaki liste “Allah'ın yalnızca 99 ismi vardır” veya “bu sıralama tartışmasız biçimde Peygamberimizden aynen nakledilmiştir” anlamında sunulmamalıdır.
- Arapça yazılış, okunuş ve kısa Türkçe anlamların tek tek uzman kontrolü henüz tamamlanmadı.
- Zikir hedefleri, kaynakta aktarılan ebced temelli uygulama adetleridir; dinen zorunlu veya sahih hadisle sabit sayılar değildir. Allah ismi için gösterilen 66 da farz, sünnet veya zorunlu günlük hedef değildir.

## Sesli sureler
- Kodda kullanılan akış adresi: `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/{sure_no}.mp3` (Islamic Network ses CDN'si; Alafasy okuyucu koleksiyonu).
- AlQuran Cloud koşulları ses kayıtlarının telifinin okuyucuya ait olduğunu; kişisel/eğitsel kullanım için akışa izin verildiğini ve ticari üründe okuyucunun kaldırma talebinde bulunabileceğini belirtir: https://alquran.cloud/terms-and-conditions
- Durum: Teknik akış adresi seçilmiş; ticari kullanım/Google Play için açık izin veya uygun lisans henüz teyit edilmedi.

## Yayın öncesi açık işler
- [ ] Arapça metnin tamamını yetkili Mushaf nüshasıyla bağımsız karşılaştırma
- [ ] Esma-ül Hüsna yazılış, okunuş ve anlamlarını güvenilir kaynaklarla tek tek kontrol
- [ ] Ses kayıtları için ticari kullanım izni/lisansı
- [ ] Meal yeniden yayımlama koşullarını sağlayıcıdan teyit
- [ ] Gizlilik politikası ve Google Play veri güvenliği beyanını son kez inceleme
