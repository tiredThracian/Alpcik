# Kelime Kulübü

Telefon, tablet ve bilgisayarda kullanılabilen iki egzersiz içerir: 400 soruluk düzensiz fiil alıştırması ve eş anlam, zıt anlam, eş sesli, mecaz anlam, terim anlam konularında 100 Türkçe sorusu. İngilizce quizlerde yazmalı ve çoktan seçmeli sorular karışıktır; Türkçe soruların tamamı çoktan seçmelidir.

Çocuklar adlarıyla yerel profil açar ve kaldıkları egzersizden devam eder. Profil, quiz ilerlemesi ve karıştırılmış soru sırası bu tarayıcıda `localStorage` ile saklanır. Cevaplar ve puanlar kaydedilmez; sunucu veya veritabanı kullanılmaz. Profiller cihazlar arasında eşitlenmez. Aynı adı kullanan çocuklar aynı profili açar.

Eski sürümde kaydedilmiş tamamlanan quiz numaraları, aynı tarayıcı ve aynı web adresinde ilk açılan çocuk profiline aktarılır. Eski sürüm sorunun içindeki konumu kaydetmediğinden, açık olan quiz bu aktarımda baştan başlar. `file://` adresindeki tarayıcı verisi GitHub Pages adresine aktarılamaz.

İngilizce sorular ve cevap anahtarı için [SORULAR.md](SORULAR.md), Türkçe sorular ve cevap anahtarı için [TURKCE_SORULAR.md](TURKCE_SORULAR.md) dosyasına bakın. İngilizce çalışmadaki kelime listesi `be` ile başlayıp `forget` ile biter.

## GitHub Pages'ta yayımlama

1. Dosyaları GitHub deposunun kök dizinine yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçeneğini seçin; `main` dalı ve `/ (root)` klasörünü belirtin.
4. Kaydedilen Pages adresini açın.

Google Fonts yüklenemezse metinler sistem yazı tipleriyle görüntülenir.
