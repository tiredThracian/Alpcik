# Geçmiş Zaman Kulübü

Telefon, tablet ve bilgisayarda kullanılabilen, toplam 400 soruluk düzensiz fiil alıştırması. Sorular, 20'şer soruluk 20 quize ayrılır. Her quizte 10 klavyeyle yazma ve 10 çoktan seçmeli soru bulunur.

Çocuklar adlarıyla yerel profil açar ve kaldıkları sorudan devam eder. Profil, quiz ilerlemesi ve karıştırılmış soru sırası bu tarayıcıda `localStorage` ile saklanır. Cevaplar ve puanlar kaydedilmez; sunucu veya veritabanı kullanılmaz. Profiller cihazlar arasında eşitlenmez. Aynı adı kullanan çocuklar aynı profili açar.

Eski sürümde kaydedilmiş tamamlanan quiz numaraları, aynı tarayıcı ve aynı web adresinde ilk açılan çocuk profiline aktarılır. Eski sürüm sorunun içindeki konumu kaydetmediğinden, açık olan quiz bu aktarımda baştan başlar. `file://` adresindeki tarayıcı verisi GitHub Pages adresine aktarılamaz.

Tüm sorular ve cevap anahtarı için [SORULAR.md](SORULAR.md) dosyasına bakın. Görseldeki kelime listesi `be` ile başlayıp `forget` ile biter.

## GitHub Pages'ta yayımlama

1. Dosyaları GitHub deposunun kök dizinine yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçeneğini seçin; `main` dalı ve `/ (root)` klasörünü belirtin.
4. Kaydedilen Pages adresini açın.

Google Fonts yüklenemezse metinler sistem yazı tipleriyle görüntülenir.
