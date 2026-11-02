# Kelime Kulübü

Telefon, tablet ve bilgisayarda kullanılabilen İngilizce, Türkçe ve Almanca derslerini içerir. İngilizcede 400 soruluk düzensiz fiil alıştırması ve 60 soruluk Celebrations Over Time kelime çalışması; Türkçede beş anlam konusunda 100 soru; Almancada başlangıç düzeyinde sekiz sesli konu bulunur. Düzensiz fiillerde yazmalı ve çoktan seçmeli sorular karışıktır; diğer çalışmaların soruları çoktan seçmelidir. Ayrıntılar için [yayın notlarına](YAYIN_NOTLARI.md) bakın.

Çocuklar adlarıyla yerel profil açar ve kaldıkları egzersizden devam eder. Profil, quiz ilerlemesi ve karıştırılmış soru sırası bu tarayıcıda `localStorage` ile saklanır. Cevaplar ve puanlar kaydedilmez; sunucu veya veritabanı kullanılmaz. Profiller cihazlar arasında eşitlenmez. Aynı adı kullanan çocuklar aynı profili açar. Almanca ilerlemesi aynı tarayıcıda, ad bazında ayrı bir kayıtla tutulur.

Almanca çalışması `german.html` üzerinden açılır. Öğretmenin belirttiği sekiz konuyu kapsar: günler, aylar, renkler, 0–100 sayıları, aile, W soruları, ulaşım ve selamlaşma. Uzun konular yaklaşık sekiz kelimelik bölümlere ayrılır. Her bölümde önce dinleme kartları, ardından karıştırılmış çoktan seçmeli sorular vardır. Konu açılınca ve sonraki kelimeye geçilince ses otomatik başlar; Dinle ve Yavaş dinle düğmeleriyle tekrar yapılabilir. Sesler `audio/de/` içindeki 162 statik MP3 dosyasından oynatılır; API anahtarı web sitesine konmaz. Kore ve Aoede sesleri her kelimeye sabit bir dağılımla atanır, böylece aynı kelime tekrar dinlendiğinde sesi değişmez. İngilizceye kayan telaffuzları gidermek için kayıtlar Flash-Lite ve Flash ile açıkça ana dili Almanca olan, sakin ve doğal bir okuma stiliyle yeniden üretilir. Gemini 3.8 kayıtlarında stil, okunan metinden ayrı `speech_metadata` alanında gönderilir. 2 Kasım yenilemesinde günlük kotalar nedeniyle 46 kayıt Flash-Lite, 101 kayıt Flash ve son 15 kayıt önceki İngilizce üretiminde de kullanılan Gemini 3.1 Flash TTS ile hazırlandı. Gemini 3.1 için modelin desteklediği eski talimat biçimi ve açık `de-DE` dil ayarı kullanılır.

Yeni Almanca sesleri yerel bilgisayarda üretmek için Gemini API CLI yapılandırıldıktan sonra `python scripts/generate-german-audio.py --keep-ready` çalıştırılır. Varsayılan model Flash-Lite'tır; `--model` ile değiştirilebilir. Yalnızca belirli konular için örneğin `--topic months --topic colors` kullanılır. Kota dolduğunda tamamlanmış doğal Almanca kayıtlarını koruyup başka TTS modeliyle devam etmek için `--keep-ready --model gemini-3.8-flash-tts` eklenebilir. Kısa ses grupları duraklamalardan ayrılır; parça sayısı kelime sayısıyla eşleşmezse o grup daha küçük gruplarla, gerekirse tek tek yeniden üretilir. `audio/de/manifest.json` aynı metin, model, ses ve stille tamamlanan kayıtları saklar; yarıda kalan üretim devam ettirilebilir. Eski yöntemle üretilmiş ve yeni manifestte bulunmayan kayıtlar yenilenir.

Eski sürümde kaydedilmiş tamamlanan quiz numaraları, aynı tarayıcı ve aynı web adresinde ilk açılan çocuk profiline aktarılır. Eski sürüm sorunun içindeki konumu kaydetmediğinden, açık olan quiz bu aktarımda baştan başlar. `file://` adresindeki tarayıcı verisi GitHub Pages adresine aktarılamaz.

İngilizce sorular ve cevap anahtarı için [SORULAR.md](SORULAR.md), Türkçe sorular ve cevap anahtarı için [TURKCE_SORULAR.md](TURKCE_SORULAR.md) dosyasına bakın. İngilizce çalışmadaki kelime listesi `be` ile başlayıp `forget` ile biter.

## GitHub Pages'ta yayımlama

Önce değişiklikler yerelde hazırlanır ve kullanıcı tarafından denenir. Kullanıcı yayınlanmasını istedikten sonra GitHub'a gönderilir. Ders sayfaları, yerel deneme adımları ve değişiklikler listesinin güncellenmesi için [yerel çalışma planına](YEREL_CALISMA_PLANI.md) bakın.

Ana sayfa ders seçimini gösterir. İngilizce konuları `english.html`, Türkçe çalışması `turkish.html`, Almanca çalışması `german.html` üzerinden açılır. Önceden girilmiş isimler her çalışmanın girişinde seçilebilir; isimler ve ilerleme aynı tarayıcıdaki mevcut kayıtları kullanır.

İngilizceye **Celebrations Over Time – Unit 2** kelime çalışması da eklendi. `english-only/celebrations.html` içinde 20 kelimenin her biri için üç özgün cümle bulunur: 60 çoktan seçmeli boşluk doldurma sorusu. Üç çalışmanın her birinde 20 kelimenin tamamı karışık sırayla gelir. Türkçe kavramsal ipuçları ve ad bazında devam etme vardır; bu egzersizin ilerlemesi `kelime-kulubu-celebrations-profiles-v1` anahtarında ayrı tutulur. İngilizce deposundaki `topics.html` iki İngilizce çalışmaya da giriş sağlar.

Unit 2 seslerini üretmek için `python scripts/generate-celebrations-audio.py` çalıştırılır. Yalnızca altı örnek için `--sample` eklenir. Stil, Gemini Interactions API'deki `speech_metadata.style` alanıyla ayrı gönderilir; kelime ve cümle metnine yönerge eklenmez. Kayıtlar `english-only/audio/en/celebrations/` içinde, üretim bilgileri `manifest.json` dosyasında saklanır. Aynı ayarla tamamlanmış dosyalar tekrar üretilmez. Web sayfası üretim sırasında kullanılan API erişim bilgilerine ihtiyaç duymaz.

1. Dosyaları GitHub deposunun kök dizinine yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçeneğini seçin; `main` dalı ve `/ (root)` klasörünü belirtin.
4. Kaydedilen Pages adresini açın.

Google Fonts yüklenemezse metinler sistem yazı tipleriyle görüntülenir.
