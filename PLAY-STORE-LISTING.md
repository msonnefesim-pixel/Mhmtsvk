# Google Play mağaza sayfası taslağı — Kur'an-ı Kerim

Bu dosya yayın öncesi mağaza metni ve eksik varlıkların çalışma taslağıdır. Play Console'a henüz gönderilmemiştir.

## Uygulama adı
Kur'an-ı Kerim

## Kısa açıklama
Arapça Kur’an, Türkçe meal, dualar, Esma-ül Hüsna ve zikir araçları.

## Tam açıklama
Kur’an-ı Kerim uygulaması, Kur’an okumayı ve günlük manevi alışkanlıklarını kolayca takip etmeyi isteyenler için sade bir kullanım sunar.

**Kur’an-ı Kerim**
- Arapça Uthmani metin ve Türkçe meal birlikte.
- 114 sureyi listeden seçme ve sureler arasında kolayca gezinme.
- Yazı boyutunu ihtiyacına göre ayarlama.
- İnternet bağlantısı olmadan uygulama içinde bulunan Kur’an metni ve meal kayıtlarını okuma.

**Kur’an duaları ve Esma-ül Hüsna**
- Kur’an’da yer alan duaları Arapça metinleri ve Türkçe mealleriyle inceleme.
- Esma-ül Hüsna'nın 99 isimlik yaygın tertibini ve Türkçe anlamlarını görüntüleme.

**Zikir ve tesbih araçları**
- Zikirmatik ile zikirlerini sayma ve geçmişini cihazında takip etme.
- Animasyonlu Tesbih Çekme alanında boncukları ilerletme.
- 33, 66 ve 99 sayılarında titreşimli geri bildirim.

**Okuma takibi**
- Kaldığın sure ve ayete geri dönme.
- Beğendiğin ayetleri favorilerine ekleme.
- Günlük, haftalık ve aylık okuma hedeflerini takip etme.
- Seçtiğin ayet ve sözleri paylaşma.

**Kaynak ve gizlilik**
Arapça metin Tanzil Project Uthmani 1.1 kaynağından, Türkçe meal QuranEnc / Rowwad Translation Center'ın 1.0.4 sürümünden alınmıştır. Kaynak ve kullanım koşulları uygulamada belirtilir. Okuma ilerlemesi, favoriler ve sayaç kayıtları cihazında saklanır. Android sürümünde reklamlar yalnızca izin verilen yardımcı ekranlarda yer alabilir; Kur’an ve meal okuma, Zikirmatik ve Tesbih Çekme ekranlarında reklam gösterilmez. Reklam tercihleri için gerekli olduğunda Google'ın rıza ve gizlilik seçenekleri sunulur.

Uygulama dini içerikleri kolay erişilebilir biçimde sunmayı amaçlar. Otomatik içerik kontrolleri, bağımsız dinî uzman veya hafız son okumasının yerine geçmez.

## Mağaza kategorisi için öneri
Kitaplar ve Referans / Eğitim kategorilerinden Play Console'da uygun olanı seçip son ekranda doğrula. Nihai kategori seçimi henüz yapılmadı.

## Yayın öncesi mağaza varlıkları
- [ ] 512 × 512 px yüksek çözünürlüklü PNG uygulama simgesi (şu an depoda SVG simgeler var; Play yüklemesi için PNG dışa aktarımı gerekiyor).
- [ ] 1024 × 500 px özellik grafiği.
- [ ] Telefon ekran görüntüleri: en az 2, tercihen 4–6 adet; gerçek son sürümden alınmalı. Kur’an okuma, sure seçimi, dualar, Esma-ül Hüsna, Zikirmatik ve Tesbih ekranları dengeli gösterilmeli.
- [ ] Ekran görüntülerinde gerçek kullanıcı verisi, bildirim, reklam yanıltması veya doğrulanmamış iddia bulunmamalı.
- [ ] Gizlilik politikası URL'si yayın öncesi normal tarayıcıda açılarak doğrulanmalı: https://msonnefesim-pixel.github.io/Mhmtsvk/privacy.html
- [ ] Destek e-postası Play Console iletişim alanına girilmeli. Bu adres kaynak depoya veya uygulama arayüzüne eklenmeyecek.
- [ ] Uygulama simgesi, özellik grafiği ve ekran görüntülerinin son sürümle aynı olduğu kontrol edilmeli.

## Play Console'da kullanıcı/hesap sahibi tarafından tamamlanacak beyanlar
- [ ] Uygulama erişimi: giriş/üyelik yok; inceleme ekibinin erişimi engellenmiyor.
- [ ] Reklamlar: Android sürümünde AdMob SDK bulunduğu için reklam içeriyor beyanı doğru şekilde işaretlenmeli.
- [ ] Hedef kitle ve içerik: geliştirici gerçek hedef kitleyi seçmeli; çocuklara yönelik olduğu varsayılmamalı.
- [ ] İçerik derecelendirme anketi doldurulmalı.
- [ ] Veri güvenliği: AdMob SDK'nın toplama/paylaşım kategorileri, nihai AAB'nin bağımlılık ve manifest incelemesiyle doğrulandıktan sonra beyan edilmeli. "Hiç veri toplanmıyor" seçeneği varsayılmamalı.
- [ ] Uygulama kategorisi, iletişim bilgileri ve ülke/bölge bilgileri doğrulanmalı.
- [ ] Play Console'un hesap/kimlik doğrulama ve test şartları tamamlanmalı.

## Teknik yayın kapıları — henüz tamamlanmadı
- [x] V94 JavaScript ve uygulama yapısı ön kontrolü.
- [x] Tanzil Uthmani 1.1 yerel metin bütünlük kontrolü.
- [x] 114 surenin Türkçe meal uç noktası, ayet sırası ve boş olmayan kayıt kontrolü.
- [x] Android release preflight: API 36, paket kimliği, sürüm numarası, birleştirilmiş manifest ve SDK bağımlılık grafiği.
- [x] AdMob uygulama kimliği yapılandırıldı; Google'ın test banner kimliği etkin, gerçek banner kimliği devre dışı.
- [ ] Android gerçek cihaz testi: ilk açılış, çevrimdışı okuma, sure seçimi, dualar, Esma, zikir, tesbih, ekran dönüşü ve uygulamadan çıkıp dönme.
- [ ] UMP rıza akışı ve reklam gizlilik seçenekleri gerçek cihazda test edilmeli.
- [ ] Reklamın yalnızca izin verilen yardımcı ekranlarda çıktığı; Kur’an/meal, Zikirmatik ve Tesbih ekranlarında görünmediği doğrulanmalı.
- [ ] Arapça metin ve meal bağımsız bir uzman/hafız tarafından son kez okunmalı; otomatik denetim bunun yerine geçmez.
- [ ] Nihai AAB oluşturulmalı, imza ve versionCode kontrol edilmeli.
- [ ] AAB içindeki nihai manifest ve SDK listesi yeniden incelenmeli; Veri Güvenliği beyanı son pakete göre kesinleştirilmeli.
- [ ] Önce kapalı test, sonra Play incelemesi ve yayın.

## Bilinçli olarak henüz yapılmayanlar
- Gerçek AdMob banner birimi etkinleştirilmedi; kullanıcı tarafından sağlanan üretim reklam birimi kimliği kodda kullanılmıyor.
- APK veya AAB oluşturulmadı.
- Google Play'e uygulama yüklenmedi veya yayınlanmadı.
- Sesli sureler, dağıtım/ticari kullanım izni doğrulanmadığı için uygulamaya eklenmedi.
