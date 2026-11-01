// Published release history. Update after local review when preparing a release.
(() => {
  const releases = [
    { date: '2026-11-01', label: '1 Kasım 2026', scope: ['home', 'english'], title: 'İngilizce sitesi doğrudan konu seçimiyle açılıyor', items: [
      'İngilizce sitesinin ana adresi artık doğrudan İngilizce konularını gösteriyor.',
      'Düzensiz fiiller ve Celebrations Over Time çalışmalarından biri konu kartıyla seçilebiliyor.',
      'Düzensiz fiiller çalışmasının yeni adresi irregular-verbs.html; öğrenci isimleri ve kayıtlı ilerlemeler korunuyor.'
    ] },
    { date: '2026-11-01', label: '1 Kasım 2026', scope: ['home', 'english'], title: 'Yeni çalışma: Celebrations Over Time – Unit 2', items: [
      '20 kelimeyi öğrenmek için 60 özgün, dört seçenekli boşluk doldurma sorusu eklendi.',
      'Üç çalışmanın her birinde bütün kelimeler yer alıyor. Sorular ve cevap seçenekleri karışık sırada geliyor.',
      'Türkçe kavramsal ipuçları ve anlamlarıyla birlikte açılabilen bir kelime listesi eklendi.',
      '20 kelime ve 60 cümle için toplam 80 ses kaydı hazırlandı. Okuma sakin, açık ve abartısız; üretim yönergeleri seslendirilmiyor.',
      'Doğru cevaptan sonra tamamlanmış cümle okunuyor. Cümleyi yeniden veya yavaş dinlemek, kelimeleri tek tek dinlemek mümkün.',
      'Her öğrenci kendi kaldığı yerden devam ediyor; tamamlanan çalışmalar yeniden karşısına çıkmıyor.'
    ] },
    { date: '2026-11-01', label: '1 Kasım 2026', scope: ['home', 'english'], title: 'İsim yazmanın yanında eski isimlerden seçim', items: [
      'Daha önce bu tarayıcıda kullanılan isimler giriş ekranında düğmelerle gösteriliyor.',
      'Öğrenci kendi ismini seçerek kayıtlı ilerlemesine devam edebiliyor; yeni isim yazma seçeneği de korunuyor.',
      'Mevcut öğrenci kayıtları ve ilerlemeler korunuyor. Kayıtlar aynı cihaz ve tarayıcıda tutuluyor.'
    ] },
    { date: '2026-11-01', label: '1 Kasım 2026', scope: ['home', 'english'], title: 'İngilizce konuları tek ekranda', items: [
      'Düzensiz fiiller ve Celebrations Over Time çalışmaları İngilizce konu ekranında bir araya getirildi.',
      'Düzensiz fiiller çalışmasının mevcut adresi ve kayıtlı ilerlemeleri korundu.',
      'Son yayınlanan değişiklikler ana sayfadan ve İngilizce giriş ekranlarından okunabiliyor.'
    ] },
    { date: '2026-11-01', label: '1 Kasım 2026', scope: ['home'], title: 'Ana sayfa derslere ayrıldı', items: [
      'İngilizce, Türkçe ve Almanca için ayrı ders kartları ve sayfaları oluşturuldu.',
      'Türkçede beş anlam konusuna, Almancada sekiz başlangıç konusuna ders sayfalarından ulaşılıyor.',
      'İngilizce çalışmaları paylaşılabilen ayrı İngilizce sitesinde açılıyor.'
    ] },
    { date: '2026-10-31', label: '31 Ekim 2026', scope: ['home', 'english'], title: 'İngilizce kelimeler bütün quizlere dağıtıldı', items: [
      '23 düzensiz fiil artık bütün quizlerde karışık olarak çalışılıyor.',
      'Her quizde 10 yazmalı ve 10 çoktan seçmeli soru bulunuyor.'
    ] },
    { date: '2026-10-31', label: '31 Ekim 2026', scope: ['home'], title: 'Egzersizlerde ders etiketleri', items: [
      'Egzersiz kartlarına İngilizce, Türkçe ve Almanca etiketleri eklendi.'
    ] },
    { date: '2026-10-25', label: '25 Ekim 2026', scope: ['home', 'english'], title: 'İngilizce ipuçları geliştirildi', items: [
      'Yazmalı sorularda açıklama, dört aday ve fiilin şimdiki hâli sırayla gösteriliyor.',
      'İpucu düğmesi ve açıklamaları büyütüldü, renkleri belirginleştirildi.',
      'İngilizce çalışması ayrı bir adresten de paylaşılabiliyor.'
    ] }
  ];
  document.querySelectorAll('[data-release-notes]').forEach((container) => {
    const heading = document.createElement('h2');
    heading.textContent = 'Son yayınlanan değişiklikler';
    container.append(heading);
    for (const release of releases.filter((item) => item.scope.includes(container.dataset.releaseNotes))) {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      const date = document.createElement('time');
      date.dateTime = release.date;
      date.textContent = release.label;
      const title = document.createElement('span');
      title.textContent = release.title;
      summary.append(date, title);
      const list = document.createElement('ul');
      for (const item of release.items) {
        const li = document.createElement('li');
        li.textContent = item;
        list.append(li);
      }
      details.open = container.querySelector('details') === null;
      details.append(summary, list);
      container.append(details);
    }
  });
})();
