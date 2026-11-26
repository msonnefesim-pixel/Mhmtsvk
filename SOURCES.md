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
- Ameller niyetlere göredir: Buhârî, Bed'ü'l-Vahy, 1; Müslim, İmâre, 155. Diyanet kaynağı: https://www.diyanet.gov.tr/icerik/10217
- Kolaylaştırınız, zorlaştırmayınız: Buhârî, İlim, 11; Müslim, Cihâd, 6-7. Diyanet kaynakları: https://www.diyanet.gov.tr/icerik/10004 ve https://webdosya.diyanet.gov.tr/mevlidinebi/UserFiles/00000000-0000-0000-0000-000000000000/2023/9/20/0375dfba-0e2d-4dd5-881d-9824954288ac.pdf
- Sizin en hayırlınız Kur'an'ı öğrenen ve öğretendir: Tirmizî, Fedâilü'l-Kur'ân, 15 (hadis no: 2907). Diyanet kaynağı: https://hadislerleislam.diyanet.gov.tr/sayfa.php?CILT=1&SAYFA=553
- Güzel söz sadakadır: Buhârî, Edeb, 34; Müslim, Zekât, 56. Diyanet kaynağı: https://webdosyasp.diyanet.gov.tr/muftuluk/UserFiles/eskisehir/Ilceler/odunpazari/UserFiles/Files/20%20hadis_d748cd13-d9de-4b6c-8e8d-b1747d8a5b62.pdf
- Hadislerin Türkçe ifadeleri anlamı koruyan kısa aktarımlardır; paylaşım kartlarında kaynak künyesi görünür.

## Esma-ül Hüsna
- Uygulamadaki liste, yaygın olarak aktarılan 99 isimlik geleneksel listedir. 99 isim hadisinin ana metni ile isimlerin tek tek sıralandığı liste aynı şey değildir; TDV İslâm Ansiklopedisi, liste ekinin Tirmizî ve İbn Mâce rivayetlerinde yer aldığını, diğer bazı temel hadis kaynaklarında bulunmadığını ve listeler arasında farklılıklar olduğunu açıklar: https://islamansiklopedisi.org.tr/esma-i-husna
- Bu nedenle uygulamadaki liste “Allah'ın yalnızca 99 ismi vardır” veya “bu sıralama tartışmasız biçimde Peygamberimizden aynen nakledilmiştir” anlamında sunulmamalıdır.
- Arapça yazılış, okunuş ve kısa Türkçe anlamların tek tek uzman kontrolü henüz tamamlanmadı.
- Zikir hedefleri, ekrandaki açıklamada belirtildiği gibi geleneksel/ebced temelli uygulama adetleridir; dinen zorunlu veya sahih hadisle sabit sayılar değildir. Allah ismi için gösterilen 66 da farz, sünnet veya zorunlu günlük hedef değildir.

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
