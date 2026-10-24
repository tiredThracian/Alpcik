# Kelime Kulübü

Telefon, tablet ve bilgisayarda kullanılabilen üç egzersiz içerir: 400 soruluk düzensiz fiil alıştırması, eş anlam, zıt anlam, eş sesli, mecaz anlam, terim anlam konularında 100 Türkçe sorusu ve başlangıç düzeyinde sesli Almanca çalışması. İngilizce quizlerde yazmalı ve çoktan seçmeli sorular karışıktır; Türkçe ve Almanca soruların tamamı çoktan seçmelidir.

Çocuklar adlarıyla yerel profil açar ve kaldıkları egzersizden devam eder. Profil, quiz ilerlemesi ve karıştırılmış soru sırası bu tarayıcıda `localStorage` ile saklanır. Cevaplar ve puanlar kaydedilmez; sunucu veya veritabanı kullanılmaz. Profiller cihazlar arasında eşitlenmez. Aynı adı kullanan çocuklar aynı profili açar. Almanca ilerlemesi aynı tarayıcıda, ad bazında ayrı bir kayıtla tutulur.

Almanca çalışması `german.html` üzerinden açılır. Öğretmenin belirttiği sekiz konuyu kapsar: günler, aylar, renkler, 0–100 sayıları, aile, W soruları, ulaşım ve selamlaşma. Uzun konular yaklaşık sekiz kelimelik bölümlere ayrılır. Her bölümde önce dinleme kartları, ardından karıştırılmış çoktan seçmeli sorular vardır. Sesler `audio/de/` içindeki 162 statik MP3 dosyasından oynatılır; API anahtarı web sitesine konmaz. Kore ve Aoede sesleri her kelimeye sabit bir dağılımla atanır, böylece aynı kelime tekrar dinlendiğinde sesi değişmez. Bu sürümde günlük kota nedeniyle ilk 100 dosya Gemini 3.8 Flash TTS, kalan 62 dosya Gemini 3.8 Flash-Lite TTS ile üretilmiştir.

Yeni Almanca sesleri yerel bilgisayarda üretmek için Gemini API CLI yapılandırıldıktan sonra `python scripts/generate-german-audio.py` çalıştırılır. Flash-Lite modeli seçmek için `--model gemini-3.8-flash-lite-tts` eklenir. Betik mevcut MP3 dosyalarını atlar; yarıda kesilirse tekrar çalıştırılabilir.

Eski sürümde kaydedilmiş tamamlanan quiz numaraları, aynı tarayıcı ve aynı web adresinde ilk açılan çocuk profiline aktarılır. Eski sürüm sorunun içindeki konumu kaydetmediğinden, açık olan quiz bu aktarımda baştan başlar. `file://` adresindeki tarayıcı verisi GitHub Pages adresine aktarılamaz.

İngilizce sorular ve cevap anahtarı için [SORULAR.md](SORULAR.md), Türkçe sorular ve cevap anahtarı için [TURKCE_SORULAR.md](TURKCE_SORULAR.md) dosyasına bakın. İngilizce çalışmadaki kelime listesi `be` ile başlayıp `forget` ile biter.

## GitHub Pages'ta yayımlama

1. Dosyaları GitHub deposunun kök dizinine yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçeneğini seçin; `main` dalı ve `/ (root)` klasörünü belirtin.
4. Kaydedilen Pages adresini açın.

Google Fonts yüklenemezse metinler sistem yazı tipleriyle görüntülenir.
