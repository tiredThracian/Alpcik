# Ders yapısı ve yerel değerlendirme

## İngilizce açılış ekranı — yayın talebi alındı

İngilizce sitesinin ana adresi (`index.html`) doğrudan `topics.html` sayfasına yönlenir. Düzensiz fiiller sayfası `irregular-verbs.html` adresine taşınmıştır; konu kartları ve ana sitenin İngilizce bağlantısı güncellenmiştir. İlerleme aynı tarayıcı kayıtlarından okunur. Yerelde hazırlandıktan sonra kullanıcı yayınlanmasını istedi.

## 1 Kasım 2026 sürümü — yerelde değerlendirilen değişiklikler

- Ana sayfa yalnızca dersleri gösterir: İngilizce, Türkçe ve Almanca.
- `english.html` İngilizce konularının girişidir. Düzensiz fiiller kartı, yayında ayrı İngilizce sitesini; localhost veya dosya önizlemesinde `english-only/index.html` dosyasını açar.
- `turkish.html` Türkçe girişidir; isimden sonra beş anlam konusunu gösterir.
- `german.html` mevcut sekiz konuya ulaşan Almanca girişidir.
- Üç çalışmanın isim girişinde eski isimler düğmelerle seçilebilir. Yeni isim yazma da devam eder.
- İsimler mevcut İngilizce/Türkçe ve Almanca kayıtlarından birleştirilir; ilerleme kayıtlarının anahtarları değişmez.
- Ana sayfa ve bağımsız İngilizce girişinde son yayınlanan değişiklikler bulunur. Bu listeye henüz yayınlanmamış geliştirmeler eklenmez.
- İngilizcede **Celebrations Over Time – Unit 2** eklendi: teyit edilen 20 kelime için 60 özgün çoktan seçmeli boşluk doldurma sorusu. Her biri bütün kelimeleri içeren üç çalışma, karışık sorular ve seçenekler, Türkçe kavramsal ipuçları, kelime listesi ve ad bazında devam etme bulunur. Belirsiz son el yazısı kelime dahil edilmez.
- İngilizce deposunda `topics.html` iki konuya giriş sağlar; eski `index.html` düzensiz fiiller adresi korunur. Yeni egzersiz `celebrations.html` üzerinden açılır. Yeni ilerleme ayrı bir kayıt anahtarı kullanır; mevcut İngilizce/Türkçe/Almanca ilerlemeleri değiştirilmez.
- Unit 2 sesleri için `python scripts/generate-celebrations-audio.py` kullanılır; `--sample` yalnızca üç kelime ve üç cümleyi üretir. Flash-Lite / Kore ile sakin okuma stili, okunan metinden ayrı `speech_metadata.style` alanında gönderilir. Önceki yöntemde metne eklenen yönergeler de seslendirildiği için kullanılmaz. Her dosya ayrı üretilir; duraklamadan dosya ayırma yapılmaz. API hız sınırı gözetilir. Üretim kaydı `manifest.json` içindedir; aynı metin/model/stil ile üretilmiş dosyalar atlanır, eski yönergeli örnekler yeniden üretilir. Örnek sayfası `english-only/audio-preview.html` adresindedir. Egzersizde doğru cevaptan sonra otomatik cümle sesi, yeniden/yavaş dinleme ve kelime listesinden tek tek dinleme bulunur. Ses URL'leri eski yönergeli örneklerin önbellekte kalmasını önleyecek şekilde sürümlüdür.

## Yerelde deneme

Proje klasöründe `python -m http.server 8766 --bind 127.0.0.1` çalıştırıp `http://127.0.0.1:8766/` adresini açın. Ana siteden İngilizceye giderken de yerel kopya açılır.

Önerilen kısa değerlendirme:

1. Ana sayfadan üç derse girip ana sayfaya dönün.
2. Bir isim yazın, öğrenci değiştirin ve aynı ismi listeden seçin.
3. Türkçe veya Almanca konularından birinde ilerleyin; yeniden girişte devam durumuna bakın.
4. İngilizcede bir quiz açın; ses, cevap ve ipuçlarına bakın.
5. Telefon genişliğinde ders kartlarına, isimlere ve değişiklikler listesine bakın.

Yerel adresin kayıtları canlı sitenin kayıtlarından ayrıdır. Canlı kayıtları taşımak veya temizlemek gerekmez.

## Yayın akışı

1. Değişiklikleri yerelde hazırla.
2. Kullanıcı yerelde dener; geri bildirimleri uygula.
3. Kullanıcı yayınlanmasını istediğinde yeni sürümün tarihli notunu `release-notes.js` içine ekle. Ana sayfa için `home`, İngilizceyi etkileyen notlar için ayrıca `english` kapsamını kullan.
4. Ortak `styles.css`, `profile-picker.js` ve `release-notes.js` dosyalarını İngilizce deposundaki kopyalarıyla eşitle; değişen dosyaların URL sürümlerini güncelle.
5. İki depodaki değişiklikleri ayrı değerlendirip yayınla. `english-only/` klasörü bağımsız depodur; ana depoya ekleme.

Yerel değerlendirmeden sonra kullanıcı bu sürümün GitHub'a gönderilip Pages'ta yayınlanmasını istedi. Sonraki geliştirmeler için de aynı yerel deneme ve ardından yayın talebi akışı geçerlidir.
