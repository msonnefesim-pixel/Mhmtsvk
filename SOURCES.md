# İçerik kaynakları ve doğrulama durumu

## Arapça Kur'an metni
- Asıl kaynak: Tanzil Project — Uthmani 1.1: https://tanzil.net/download/
- Uygulamadaki dosya: `quran-uthmani.txt` (Tanzil'in özgün metni ve gömülü telif bildirimi değiştirilmeden korunmuştur).
- SHA-256: `ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af` · dosya boyutu: 1.334.737 bayt.
- Tanzil kullanım şartları: metin aynen korunarak çoğaltılabilir; değiştirilemez; Tanzil Project kaynağı belirtilmeli, `tanzil.net` bağlantısı ve özgün telif bildirimi korunmalıdır: https://tanzil.net/docs/Text_License.
- Uygulama, 6.236 ayet satırını yerel Tanzil dosyasından okur. Sure metadata bilgileri AlQuran Cloud API'sinden, Türkçe meal kayıtları QuranEnc API'sinden yayın/dağıtım derlemesi sırasında alınarak `quran-offline-data.json` dosyasına paketlenir. V93 uygulama çalışma zamanında bu yerel JSON dosyasını kullanır; okuma sırasında AlQuran Cloud veya QuranEnc API'sine istek göndermez.
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
- Zikirmatikteki “Allahümme ente's-selâmü ve minke's-selâm, tebârekte zâ'l-celâli ve'l-ikrâm” hazır zikrinin hedefi 1'dir; Sahih Müslim 591'de namaz bitiminde istiğfarın ardından bu dua bir kez aktarılır. Kaynak: https://sunnah.com/muslim/5/171.

## Esma-ül Hüsna
- Uygulamadaki liste, Tirmizî 3507'de yer alan ve yaygınlaşan 99 isim tertibidir. Liste, Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu'nun *Fetvalar* kitabındaki “Allah'ın 99 ismi” sıralı listesiyle karşılaştırıldı: https://dijital.diyanet.gov.tr/File/Download?id=389&path=fetvalar.pdf (s. 51-52). Hadis kaynağı: https://sunnah.com/tirmidhi:3507. TDV İslâm Ansiklopedisi, isim listesinin hadisin ikinci kısmında yalnız Tirmizî ve İbn Mâce rivayetlerinde bulunduğunu; birçok âlimin listenin râvi tarafından eklendiği görüşünde olduğunu ve iki rivayetteki listelerin farklılaştığını aktarır: https://islamansiklopedisi.org.tr/esma-i-husna. Diyanet kaynağı da Allah'ın isimlerinin 99 ile sınırlı olmadığını, bu sayının meşhur isimleri ifade ettiğini belirtir. Uygulama listeyi tek ve tartışmasız tertip olarak sunmaz.
- Bu nedenle uygulamadaki liste “Allah'ın yalnızca 99 ismi vardır” veya “bu sıralama tartışmasız biçimde Peygamberimizden aynen nakledilmiştir” anlamında sunulmamalıdır.
- v78'de 99 ismin kısa Türkçe anlamları, TDV İslâm Ansiklopedisi'nin Tirmizî tertibine ait alfabetik anlam tablosuyla satır satır karşılaştırılarak TDV'nin kısa açıklamaları esas alınacak biçimde hizalandı: https://islamansiklopedisi.org.tr/esma-i-husna (özellikle alfabetik tablo). Bu, uzman/hoca onayı veya bütün Arapça harekelerin bağımsız Mushaf kontrolü değildir. Türkçe okunuşların akademik transkripsiyonla tek tek uzman denetimi ayrıca sürmektedir.
- Zikir hedefleri, kullanıcının seçtiği İslamiyet.gen.tr sayfasındaki “Günde Zikir Sayısı” değerlerinden aktarılmıştır: https://islamiyet.gen.tr/allah-c-c/allah-azze-ve-cellenin-99-ismi-esma-ul-husna-sir-ve-faziletleri-kac-kere-zikir-edilmeli.html (22.04.2015). Bu, geleneksel uygulama derlemesidir; kaynaklar arasında sayılar değişebilir ve her değer doğrudan ebced değeri değildir. Sayılar Diyanet tarafından belirlenmiş, farz/sünnet veya sahih hadisle sabit hedefler değildir. Allah ismi için sayfada günlük hedef bulunmaz; uygulamadaki 66, sayfada anlatılan özel uygulama adedidir ve zorunlu günlük hedef değildir. Sayfa içindeki fazilet/sonuç iddiaları uygulamaya aktarılmamıştır.


- V94 arayüz güncellemesi: mevcut zikirmatikten ayrı, 33 boncuklu animasyonlu tesbih ekranı eklendi. Sayaç 33, 66 ve 99'da cihaz titreşimini destekler; toplam sayaç değeri yalnızca cihazın yerel depolamasında saklanır. Bu özellik yeni bir hesap veya geliştirici sunucusuna veri aktarımı oluşturmaz.

## Sesli sureler
- Sesli sureler bölümü v84 sürümünde, kayıtların Google Play/ticari dağıtımı için okuyucu veya hak sahibinden açık yazılı izin doğrulanamadığı için uygulamadan ve dağıtım paketinden çıkarıldı.
- İzin ve lisans kapsamı yazılı olarak doğrulanırsa bölüm yeniden değerlendirilebilir. Önceki teknik erişim taraması, kullanım hakkı vermez.

## Yayın öncesi açık işler
- [x] Arapça dosyanın Tanzil Uthmani 1.1 yayın kopyasıyla bayt bayt eşleşmesi, 6.236 ayet satırı, 114 sure ve besmele sınırı otomatik kontrolü.
- [ ] Bağımsız ikinci Mushaf/uzman-hafız tarafından son okuma (otomatik aynı-kaynak kontrolünden ayrı bir onaydır).
- [x] Esma-ül Hüsna 99 isim ve 99 zikir hedefi sayısı; 99 kısa anlam TDV İslâm Ansiklopedisi alfabetik tabloyla karşılaştırıldı.
- [ ] Arapça yazılış ve Türkçe okunuşların uzman/hoca tarafından tek tek son kontrolü
- [x] 114/114 ses dosyası adresinin teknik erişilebilirliği kontrol edildi.
- [x] Ses kayıtları için yazılı ticari izin henüz doğrulanmadığından sesli sureler bölümü uygulama kodundan ve paketinden çıkarıldı
- [x] 114/114 surenin tüm Türkçe meal kayıtları sıra, tekillik ve boş olmayan çeviri bakımından doğrulandı.
- [x] QuranEnc yeniden yayımlama şartları (değiştirmeme, yayıncı/kaynak, sürüm, dipnot, güncel sürüm, reklam koşulları) kod ve arayüzle karşılaştırıldı; uygulamada reklam yok. Kaynakta değişiklik notu eklenirse QuranEnc'e ayrıca bildirilmelidir.
- [x] V93 web uygulamasının veri akışı koddan incelendi: Kur'an metni ve meal uygulamayla gelen yerel dosyalardan okunuyor; okuma sırasında AlQuran Cloud/QuranEnc API çağrısı yapılmıyor. Okuma konumu, favoriler, zikir ve hedef kayıtları cihaz içi depolamada tutuluyor; reklam/analiz SDK'sı veya hesap akışı bulunmuyor.
- [x] Gizlilik politikası V93'ün gerçek web uygulaması davranışına göre güncellendi; kullanıcı tarafından başlatılan paylaşım ve dış kaynak bağlantıları açıklandı.
- [ ] Nihai Android paketi oluşturulduktan sonra birleştirilmiş manifest, izinler, SDK/bağımlılıklar ve gerçek veri akışları denetlenecek; Google Play Veri Güvenliği beyanı bu incelemeye göre kesinleştirilecek.
