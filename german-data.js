// Each card has a stable ID so a child's progress survives content reordering.
function makeGermanNumbers() {
  const small = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const tens = { 20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig', 60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig' };
  return Array.from({ length: 101 }, (_, number) => {
    let word;
    if (number < 20) word = small[number];
    else if (number === 100) word = 'hundert';
    else {
      const ten = Math.floor(number / 10) * 10;
      const unit = number % 10;
      word = unit ? `${unit === 1 ? 'ein' : small[unit]}und${tens[ten]}` : tens[ten];
    }
    return [`n-${number}`, word, String(number)];
  });
}

window.germanTopics = [
  { id: 'days', title: 'Haftanın günleri', german: 'Wochentage', icon: 'Mo', items: [
    ['montag', 'Montag', 'Pazartesi'], ['dienstag', 'Dienstag', 'Salı'],
    ['mittwoch', 'Mittwoch', 'Çarşamba'], ['donnerstag', 'Donnerstag', 'Perşembe'],
    ['freitag', 'Freitag', 'Cuma'], ['samstag', 'Samstag', 'Cumartesi'],
    ['sonntag', 'Sonntag', 'Pazar'],
  ] },
  { id: 'months', title: 'Aylar', german: 'Monate', icon: '12', items: [
    ['januar', 'Januar', 'Ocak'], ['februar', 'Februar', 'Şubat'],
    ['maerz', 'März', 'Mart'], ['april', 'April', 'Nisan'],
    ['mai', 'Mai', 'Mayıs'], ['juni', 'Juni', 'Haziran'],
    ['juli', 'Juli', 'Temmuz'], ['august', 'August', 'Ağustos'],
    ['september', 'September', 'Eylül'], ['oktober', 'Oktober', 'Ekim'],
    ['november', 'November', 'Kasım'], ['dezember', 'Dezember', 'Aralık'],
  ] },
  { id: 'colors', title: 'Renkler', german: 'Farben', icon: '◐', items: [
    ['rot', 'rot', 'kırmızı'], ['blau', 'blau', 'mavi'],
    ['gelb', 'gelb', 'sarı'], ['gruen', 'grün', 'yeşil'],
    ['schwarz', 'schwarz', 'siyah'], ['weiss', 'weiß', 'beyaz'],
    ['orange', 'orange', 'turuncu'], ['rosa', 'rosa', 'pembe'],
    ['braun', 'braun', 'kahverengi'], ['lila', 'lila', 'mor'],
  ] },
  { id: 'numbers', title: 'Sayılar', german: 'Zahlen · 0–100', icon: '42', items: makeGermanNumbers() },
  { id: 'family', title: 'Aile', german: 'Familie', icon: '♡', items: [
    ['mutter', 'die Mutter', 'anne'], ['vater', 'der Vater', 'baba'],
    ['schwester', 'die Schwester', 'kız kardeş'], ['bruder', 'der Bruder', 'erkek kardeş'],
    ['oma', 'die Oma', 'büyükanne'], ['opa', 'der Opa', 'büyükbaba'],
    ['tochter', 'die Tochter', 'kız çocuk'], ['sohn', 'der Sohn', 'erkek çocuk'],
  ] },
  { id: 'questions', title: 'Soru kelimeleri', german: 'W-Fragen', icon: '?', items: [
    ['was', 'Was?', 'Ne?'], ['wo', 'Wo?', 'Nerede?'],
    ['woher', 'Woher?', 'Nereden?'], ['wohin', 'Wohin?', 'Nereye?'],
    ['wann', 'Wann?', 'Ne zaman?'], ['wer', 'Wer?', 'Kim?'],
    ['wie', 'Wie?', 'Nasıl?'], ['warum', 'Warum?', 'Neden?'],
  ] },
  { id: 'transport', title: 'Ulaşım', german: 'Verkehrsmittel', icon: '→', items: [
    ['bus', 'der Bus', 'otobüs'], ['auto', 'das Auto', 'araba'],
    ['fahrrad', 'das Fahrrad', 'bisiklet'], ['zug', 'der Zug', 'tren'],
    ['flugzeug', 'das Flugzeug', 'uçak'], ['schiff', 'das Schiff', 'gemi'],
    ['strassenbahn', 'die Straßenbahn', 'tramvay'], ['taxi', 'das Taxi', 'taksi'],
  ] },
  { id: 'greetings', title: 'Selamlaşma', german: 'Begrüßung & Abschied', icon: '✳', items: [
    ['hallo', 'Hallo!', 'Merhaba!'], ['guten-morgen', 'Guten Morgen!', 'Günaydın!'],
    ['guten-tag', 'Guten Tag!', 'İyi günler!'], ['guten-abend', 'Guten Abend!', 'İyi akşamlar!'],
    ['tschuess', 'Tschüss!', 'Hoşça kal!'], ['auf-wiedersehen', 'Auf Wiedersehen!', 'Hoşça kalın!'],
    ['bis-bald', 'Bis bald!', 'Yakında görüşürüz!'], ['gute-nacht', 'Gute Nacht!', 'İyi geceler!'],
  ] },
];
