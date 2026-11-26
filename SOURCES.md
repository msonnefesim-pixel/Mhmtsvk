# İçerik kaynakları ve doğrulama durumu

## Arapça Kur'an metni
- Asıl kaynak: Tanzil Project — Uthmani 1.1: https://tanzil.net/download/
- Uygulamadaki dosya: `quran-uthmani.txt` (Tanzil'in özgün metni ve gömülü telif bildirimi değiştirilmeden korunmuştur).
- SHA-256: `ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af` · dosya boyutu: 1.334.737 bayt.
- Tanzil kullanım şartları: metin aynen korunarak çoğaltılabilir; değiştirilemez; Tanzil Project kaynağı belirtilmeli, `tanzil.net` bağlantısı ve özgün telif bildirimi korunmalıdır: https://tanzil.net/docs/Text_License.
- Uygulama, 6.236 ayet satırını yerel dosyadan okur. Sure adları ve ayet sayıları için AlQuran Cloud'un yalnızca sure metadata uç noktası kullanılır; Arapça ayet metni artık AlQuran Cloud API'sinden alınmaz.
- Sure başındaki besmele, Fâtiha'da 1. ayetin kendisidir; Tevbe'nin başında besmele yoktur. Diğer surelerde Tanzil dosyasındaki besmele ilk satırın başında yer alır ve uygulamada ilk ayetten ayrı bir açılış satırı olarak gösterilir; metindeki harfler ve harekeler değiştirilmez.
- Otomatik denetim, uygulamadaki dosyanın sabitlenmiş Tanzil kopyasıyla bayt bayt aynı olduğunu, 6.236 ayet satırını, 114 sure sınırını ve besmele durumlarını kontrol eder. Bu, kaynağın kendisinden bağımsız ikinci bir Mushaf veya uzman/hafız onayı değildir.
- Durum: Tanzil'in yayınladığı Uthmani 1.1 metni birebir kopya olarak uygulamaya alındı; tam dosya bütünlük denetimi CI üzerinden yürütülüyor.
## Türkçe meal
- Sağlayıcı: QuranEnc.com API — https://quranenc.com/
- Çeviri: Türkçe Tercüme - Rowwad Translation Center
- API anahtarı: `turkish_rwwad`
- Sürüm: 1.0.4 (28.09.2025)
- API: https://quranenc.com/api/v1/translation/sura/turkish_rwwad/{sure_no}
- 26.11.2026 tarihli otomatik taramada 114/114 surenin tüm meal kayıtları kontrol edildi: ayet numaraları 1'den başlayarak sıralı ve tekil, her ayetin Türkçe çevirisi boş değil.
- QuranEnc yayın koşulları indirme ve yeniden yayımlamaya; metnin değiştirilmemesi, QuranEnc.com ve yayıncının belirtilmesi, sürüm numarasının yazılması, dipnot bilgilerinin korunması, güncel sürüme geçilmesi ve uygunsuz reklam gösterilmemesi şartlarıyla izin verir: https://quranenc.com/en/home/about/conditions. Uygulama meal metnini değiştirmeden gösterir; sure, dua, favori ve paylaşım kartlarında kaynak/sürüm bilgisi görünür. Kaynakta çeviriye ilişkin yeni bir not eklenirse QuranEnc'e bildirilmelidir. Uygulamada reklam bulunmaz.

## Kur'an duaları ve paylaşım kartlarındaki ayetler
- Arapça ayet: Uygulamayla birlikte gelen Tanzil Project Uthmani 1.1 dosyası; ayetler sure/ayet numarasıyla yerel dosyadan alınır.
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
- Uygulamadaki liste, Tirmizî 3507'de yer alan ve yaygınlaşan 99 isim tertibidir: https://sunnah.com/tirmidhi:3507. TDV İslâm Ansiklopedisi, isim listesinin hadisin ikinci kısmında yalnız Tirmizî ve İbn Mâce rivayetlerinde bulunduğunu; birçok âlimin listenin râvi tarafından eklendiği görüşünde olduğunu ve iki rivayetteki listelerin farklılaştığını aktarır: https://islamansiklopedisi.org.tr/esma-i-husna. Bu nedenle uygulama listeyi tek ve tartışmasız tertip olarak sunmaz.
- Bu nedenle uygulamadaki liste “Allah'ın yalnızca 99 ismi vardır” veya “bu sıralama tartışmasız biçimde Peygamberimizden aynen nakledilmiştir” anlamında sunulmamalıdır.
- v78'de 99 ismin kısa Türkçe anlamları, TDV İslâm Ansiklopedisi'nin Tirmizî tertibine ait alfabetik anlam tablosuyla satır satır karşılaştırılarak TDV'nin kısa açıklamaları esas alınacak biçimde hizalandı: https://islamansiklopedisi.org.tr/esma-i-husna (özellikle alfabetik tablo). Bu, uzman/hoca onayı veya bütün Arapça harekelerin bağımsız Mushaf kontrolü değildir. Türkçe okunuşların akademik transkripsiyonla tek tek uzman denetimi ayrıca sürmektedir.
- Zikir hedefleri, kaynakta aktarılan ebced temelli uygulama adetleridir; dinen zorunlu veya sahih hadisle sabit sayılar değildir. Allah ismi için gösterilen 66 da farz, sünnet veya zorunlu günlük hedef değildir.

## Sesli sureler
- Kodda kullanılan akış adresi: `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/{sure_no}.mp3` (Islamic Network ses CDN'si; Alafasy okuyucu koleksiyonu).
- AlQuran Cloud koşulları ses kayıtlarının telifinin okuyucuya ait olduğunu; kişisel/eğitsel kullanım için akışa izin verildiğini ve ticari üründe okuyucunun kaldırma talebinde bulunabileceğini belirtir: https://alquran.cloud/terms-and-conditions
- 26.11.2026 tarihli otomatik taramada 114/114 MP3 adresi HTTP ve ses içerik türü bakımından erişilebilir bulundu. Bu yalnızca teknik erişim kontrolüdür; okuyucu/ kayıt sahibinin ticari/Google Play dağıtım izni değildir.\n- Durum: Teknik erişim doğrulandı; ticari kullanım/Google Play için açık izin veya uygun lisans henüz teyit edilmedi.

## Yayın öncesi açık işler
- [x] Arapça dosyanın Tanzil Uthmani 1.1 yayın kopyasıyla bayt bayt eşleşmesi, 6.236 ayet satırı, 114 sure ve besmele sınırı otomatik kontrolü.\n- [ ] Bağımsız ikinci Mushaf/uzman-hafız tarafından son okuma (otomatik aynı-kaynak kontrolünden ayrı bir onaydır).
- [x] Esma-ül Hüsna 99 isim ve 99 zikir hedefi sayısı; 99 kısa anlam TDV İslâm Ansiklopedisi alfabetik tabloyla karşılaştırıldı.\n- [ ] Arapça yazılış ve Türkçe okunuşların uzman/hoca tarafından tek tek son kontrolü
- [ ] Ses kayıtları için Google Play/ticari dağıtımın kapsamına uygun yazılı izin veya lisans (AlQuran Cloud koşulları, okuyucuya telif hakkı tanındığını ve ticari üründe kaldırma talep edilebileceğini söylüyor)
- [x] QuranEnc yeniden yayımlama şartları (değiştirmeme, yayıncı/kaynak, sürüm, dipnot, güncel sürüm, reklam koşulları) kod ve arayüzle karşılaştırıldı; uygulamada reklam yok. Kaynakta değişiklik notu eklenirse QuranEnc'e ayrıca bildirilmelidir.
- [x] Web/PWA gizlilik politikası; yerel Tanzil metni, AlQuran Cloud sure metadata, QuranEnc meal, Islamic Network ses CDN'si, cihaz içi depolama ve kullanıcının başlattığı paylaşım akışları eklendi.
- [ ] Nihai Android paketi ve Google Play Veri Güvenliği beyanını gerçek SDK/manifest/paket davranışıyla son kez inceleme
