# Kur'an-ı Kerim

Android ve mobil web için hazırlanmış Kur'an okuma uygulaması.

## Mevcut bölümler
- Arapça Kur'an metni (Tanzil Project, Uthmani 1.1)
- Türkçe meal (QuranEnc / Rowwad Translation Center, sürüm 1.0.4)
- Kur'an duaları (ayet referanslarıyla)
- Esma-ül Hüsna (yaygın 99 isim tertibi, Türkçe anlamlar ve isteğe bağlı geleneksel zikir adetleri)
- Zikirmatik, günlük zikir geçmişi ve titreşim
- Kaldığım yer, favori ayetler ve günlük/haftalık/aylık okuma hedefleri
- Ayet ve hadis paylaşım kartları

## İçerik güvenliği
Arapça metin değiştirilmeden Tanzil'in yayınladığı Uthmani 1.1 dosyasından sunulur. Türkçe meal, yayıncı ve sürüm bilgisiyle birlikte QuranEnc / Rowwad Translation Center kaynağından alınır. Esma listesinin tertibi ve zikir adetlerinin kaynak/sınırlamaları `SOURCES.md` içinde açıklanır. Zikir adetleri dinen zorunlu veya sahih hadisle sabit hedefler değildir.

Sesli sureler, Google Play/ticari dağıtım için gerekli yazılı kullanım izni doğrulanamadığı için uygulamadan çıkarılmıştır. İzin doğrulanmadan geri eklenmeyecektir.

## Otomatik kontroller
GitHub Actions şu kontrolleri çalıştırır:
- Tanzil Uthmani 1.1 dosyasının sabitlenmiş yayın kopyasıyla bayt bayt eşleşmesi
- 114 sure ve 6.236 ayet satırı ile besmele sınırları
- 114 surenin Türkçe meal kayıtlarında ayet numarası, sıra, tekillik ve boş olmayan çeviri
- Esma verilerinde 99 isim, benzersiz Arapça/Türkçe adlar ve 99 pozitif hedef
- Türkçe sure adları, HTML/JavaScript eleman eşleşmeleri ve Kur'an duası ayet aralıkları

Otomatik kontroller, mealin anlam bakımından uzman denetimi veya bağımsız hafız/Mushaf son okuması yerine geçmez. Bu yayın öncesi kontroller ayrıca tamamlanmalıdır.

## Android derlemesi
APK iş akışı, son kalite kontrolleri tamamlanana kadar otomatik push derlemesi yapmayacak şekilde geçici olarak manuel tetiklemeye alınmıştır. Son aşamada imzalanmamış debug APK üretilecektir. Google Play yayını için ayrıca imzalı Android App Bundle (AAB), sürümleme, mağaza görselleri ve Veri Güvenliği beyanı hazırlanmalıdır.
