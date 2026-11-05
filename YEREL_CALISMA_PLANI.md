# Ders yapısı ve yerel değerlendirme

## 4–5 Kasım 2026 — Kelime quizi, yayın talebi alındı; güncel liste bekleniyor

- Kullanıcı yeni kelime listesi bildirdi ancak liste mesajda bulunmuyor. Fotoğraf veya metin istendi; yeni kelimeler teyit edilmeden eklenmedi. Mevcut cümle egzersizlerinin içeriği ve öğrenci ilerlemeleri bu aşamada değişmedi.
- İngilizce konu ekranlarına Verb ↔ Past Simple adlı ayrı quiz eklendi. Mevcut 23 fiilin tamamı her quizde birer kez, rastgele sırada sorulur. İlk hâli ve geçmiş zaman hâli, yazmalı ve çoktan seçmeli olarak karıştırılır.
- Bu modun öğrenci kayıtları ayrıdır: `kelime-kulubu-verb-quiz-profiles-v1`. Soru bazında kalıcı çözülmüş listesi tutulmaz. Tamamlanmış quizler ve yalnızca devam eden quizin sırası/konumu saklanır. Aynı kelime sonraki quizde tekrar sorulur.
- Yanlış cevapta doğru cevap açığa çıkarılmaz, yeniden denenebilir. Doğru cevapta Sonraki açılır. Son sorudan sonra quiz tamamlanır; sıradaki quiz yeni bir karışımla başlar.
- Soru açılınca verilen kelime, doğru cevapta cevap otomatik seslendirilir. Hazır İngilizce kelime MP3 dosyaları kullanılır; Kelimeyi dinle, Yavaş dinle ve doğru cevaptan sonra Cevabı dinle düğmeleri vardır. Birden fazla doğru biçim (was/were) sırayla okunur; gezinirken önceki okuma kesilir.
- Önceki düğmesiyle aynı quizin önceki sorularına dönülebilir. Bu quizde doğru cevaplanan konuma kadar olan sorular cevaplarıyla kilitli açılır; tekrar cevaplamak gerekmez. Bu geçici ilerleme yeni quizin kelimelerini filtrelemez ve quiz tamamlanınca kaldırılır.
- 5 Kasım: Çoktan seçmeli kelime quizinde soru açılınca sorulan kelime okunur; bir şık seçilince o şıktaki kelime seslendirilir. Was/were gibi birden fazla biçim içeren şıklar sırayla okunur. Yeni şık seçilince önceki ses durur; doğruluk Kontrol et ile değerlendirilir.
- İsim seçici, bu yeni modda kullanılan isimleri de diğer derslere taşır. Eski kayıtlar silinmez.
- Yerel adres: `http://127.0.0.1:8766/english-only/verb-quiz.html`. Kullanıcı 5 Kasım'da bu hâliyle yayınlanmasını istedi. Güncel liste geldiğinde cümle egzersizleri de genişletilecek ve bütün kelimelerden karışık seçim korunacak.

## 2 Kasım 2026 — Almanca düzeltmesi, yayın talebi alındı

- Konu açılınca ve Sonraki ile yeni kelimeye geçilince ses otomatik başlar. Bu, öğrenme kartlarında ve quizde uygulanır; bölüm sonu ekranında ses başlatılmaz.
- Geçişte veya sayfadan ayrılınca önceki ses durur. Eski sesin hata bildirimi yeni kelimede gösterilmez.
- Almanca MP3 dosyaları, Flash-Lite / Flash ve mevcut Kore/Aoede dağılımıyla yeniden üretilir. Stil alanında açıkça Almanya Almancası ve doğal Almanca telaffuz istenir; yönergeler okuma metnine eklenmez. Flash-Lite günlük kotası dolduğu için tamamlanan dosyalar korunarak kalanları Flash ile üretmek için `--model gemini-3.8-flash-tts --keep-ready` kullanılır. Günlük kota hatasında yeniden denenmez; kısa hız sınırlarında beklenir.
- 162 kaydın tamamı yenilendi: 46 Flash-Lite, 101 Flash, 15 Gemini 3.1 Flash TTS. Son modelde eski TTS talimat biçimi ve açık Almanca dil ayarı kullanılır. Üretim kaydı `audio/de/manifest.json` dosyasındadır.
- Ses ve uygulama URL'leri sürümlendi; eski telaffuzların önbellekten gelmesi önlenir.
- Öğrenci kayıtları ve ilerleme aynı anahtarlarla korunur. Kullanıcının 2 Kasım yayın talebiyle GitHub Pages yayınına dahil edildi.

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

### 2 Kasım 2026 — Almancada önceki karta dönme (yayın talebi alındı)

- Öğrenme kartlarına ve quiz sorularına Önceki düğmesi eklendi. Öğrenme/quiz ve bölüm sınırları arasında da geri dönülebilir; ilk kartta düğme pasiftir.
- Geri dönülen kelimenin sesi otomatik çalar. Doğru cevaplanmış quiz soruları kilitli ve doğru seçenek işaretli açılır; yeniden çözmek gerekmez.
- Çözülmüş sorular isim bazında saklanır. Eski kayıtlardaki ilerleme de korunarak bu yapıya aktarılır.

### 2 Kasım 2026 — İngilizcede yanlış cevaptan sonra yeniden deneme (yayın talebi alındı)

- Düzensiz fiillerde yanlış cevap doğru cevabı açığa çıkarmaz; öğrenciye yeniden denemesi söylenir. Yazmalı ve çoktan seçmeli sorularda doğru cevaba kadar tekrar denenebilir, ipuçları kullanılabilir.
- Yanlış cevap soruyu çözülmüş olarak kaydetmez, Sonraki düğmesini açmaz ve tamamlanmış cümleyi seslendirmez. Doğru cevapta başarı mesajı ve cümle sesi gelir, Sonraki açılır.
- Ana uygulamadaki İngilizce kodu da eşitlendi. Unit 2 zaten yeniden denemeye izin veriyordu.
- Yerel inceleme adresi: `http://127.0.0.1:8766/english-only/irregular-verbs.html`.

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
