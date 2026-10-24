const germanStorageKey = 'kelime-kulubu-german-progress-v1';
const roundSize = 8;
const topics = window.germanTopics;
const byId = new Map(topics.map((topic) => [topic.id, topic]));
const $ = (selector) => document.querySelector(selector);

const introView = $('#intro-view');
const topicsView = $('#topics-view');
const studyView = $('#study-view');
const nameForm = $('#name-form');
const nameInput = $('#german-name');
const topicList = $('#topic-list');
const currentName = $('#current-name');
const studyMode = $('#study-mode');
const studyTitle = $('#study-title');
const studyCount = $('#study-count');
const studyProgress = $('#study-progress');
const cardLabel = $('#card-label');
const germanWord = $('#german-word');
const germanMeaning = $('#german-meaning');
const learningTip = $('#learning-tip');
const answerOptions = $('#answer-options');
const feedback = $('#german-feedback');
const nextButton = $('#next-card');
const audioNote = $('#audio-note');

let profiles;
try {
  profiles = JSON.parse(localStorage.getItem(germanStorageKey) || '{}');
  if (!profiles || typeof profiles !== 'object' || Array.isArray(profiles)) profiles = {};
} catch {
  profiles = {};
}
let profileKey = null;
let topic = null;
let audio = null;
let answered = false;

function save() {
  try { localStorage.setItem(germanStorageKey, JSON.stringify(profiles)); } catch { /* Continue without storage. */ }
}

function profile() { return profiles[profileKey]; }
function state() { return profile().topics[topic.id]; }
function roundsFor(currentTopic) {
  const remainder = currentTopic.items.length % roundSize;
  return Math.max(1, Math.ceil(currentTopic.items.length / roundSize) - (remainder > 0 && remainder < 4 ? 1 : 0));
}
function roundItems() {
  const start = state().round * roundSize;
  const end = state().round === roundsFor(topic) - 1 ? topic.items.length : start + roundSize;
  return topic.items.slice(start, end);
}

function orderForRound() {
  const order = roundItems().map((_, index) => index);
  let seed = `${topic.id}/${state().round}`.split('').reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  for (let index = order.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const swap = seed % (index + 1);
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

function currentItem() {
  const items = roundItems();
  return state().phase === 'quiz' ? items[orderForRound()[state().index]] : items[state().index];
}

function stopAudio() {
  if (audio) { audio.pause(); audio.currentTime = 0; audio = null; }
}

function show(view) {
  stopAudio();
  introView.hidden = view !== 'intro';
  topicsView.hidden = view !== 'topics';
  studyView.hidden = view !== 'study';
  window.scrollTo(0, 0);
}

function renderTopics() {
  topicList.replaceChildren();
  currentName.textContent = profile().name;
  for (const currentTopic of topics) {
    const progress = profile().topics[currentTopic.id];
    const total = roundsFor(currentTopic);
    const finished = progress && progress.round >= total;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'german-topic-card';
    const symbol = document.createElement('span');
    symbol.className = 'german-topic-symbol';
    symbol.textContent = currentTopic.icon;
    const copy = document.createElement('span');
    copy.className = 'german-topic-copy';
    const title = document.createElement('strong');
    title.textContent = currentTopic.title;
    const subtitle = document.createElement('span');
    subtitle.textContent = currentTopic.german;
    const status = document.createElement('small');
    status.textContent = finished ? 'Tamamlandı · Tekrar çalışabilirsin' : progress ? `${progress.round + 1}. bölüm / ${total}` : `${total} kısa bölüm`;
    copy.append(title, subtitle, status);
    const arrow = document.createElement('span');
    arrow.className = 'german-topic-arrow';
    arrow.textContent = '→';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(symbol, copy, arrow);
    button.addEventListener('click', () => openTopic(currentTopic.id));
    topicList.append(button);
  }
  show('topics');
}

function openTopic(id) {
  topic = byId.get(id);
  if (!topic) return;
  if (!profile().topics[id] || profile().topics[id].round >= roundsFor(topic)) {
    profile().topics[id] = { round: 0, phase: 'learn', index: 0 };
    save();
  }
  renderStudy();
  show('study');
}

function makeOption(text, isCorrect) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'german-option';
  button.textContent = text;
  button.addEventListener('click', () => {
    if (answered) return;
    if (isCorrect) {
      answered = true;
      button.classList.add('is-correct');
      feedback.textContent = 'Doğru! Çok güzel.';
      nextButton.disabled = false;
      answerOptions.querySelectorAll('button').forEach((option) => { option.disabled = true; });
    } else {
      button.classList.add('is-wrong');
      button.disabled = true;
      feedback.textContent = 'Bir daha dene. Dinleyip tekrar bakabilirsin.';
    }
  });
  return button;
}

function renderOptions(item) {
  answerOptions.replaceChildren();
  const pool = roundItems().filter((candidate) => candidate[0] !== item[0] && candidate[2] !== item[2]);
  let seed = `${topic.id}/${item[0]}`.split('').reduce((value, char) => (value * 33 + char.charCodeAt(0)) >>> 0, 9);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const swap = seed % (index + 1);
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  if (topic.id === 'numbers') pool.sort((a, b) => Math.abs(Number(a[2]) - Number(item[2])) - Math.abs(Number(b[2]) - Number(item[2])));
  const distractors = pool.slice(0, 3);
  const options = [item, ...distractors];
  for (let index = options.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const swap = seed % (index + 1);
    [options[index], options[swap]] = [options[swap], options[index]];
  }
  options.forEach((option) => answerOptions.append(makeOption(option[2], option[0] === item[0])));
}

function renderStudy() {
  const currentState = state();
  const items = roundItems();
  stopAudio();
  if (currentState.phase === 'done') {
    studyMode.textContent = 'BÖLÜM TAMAMLANDI';
    studyTitle.textContent = topic.title;
    studyCount.textContent = '';
    studyProgress.style.width = '100%';
    cardLabel.textContent = 'HARİKA!';
    germanWord.textContent = 'Gut gemacht!';
    germanMeaning.textContent = 'Bu bölümü bitirdin.';
    learningTip.hidden = true;
    $('.german-audio-actions').hidden = true;
    answerOptions.hidden = true;
    feedback.textContent = '';
    nextButton.disabled = false;
    nextButton.innerHTML = currentState.round + 1 < roundsFor(topic) ? 'Sonraki bölüme geç <span aria-hidden="true">→</span>' : 'Konulara dön <span aria-hidden="true">→</span>';
    return;
  }
  answered = false;
  audioNote.hidden = true;
  const quiz = currentState.phase === 'quiz';
  const item = currentItem();
  studyMode.textContent = quiz ? 'ŞİMDİ SEN SEÇ' : 'DİNLE VE ÖĞREN';
  studyTitle.textContent = topic.title;
  studyCount.textContent = `${currentState.index + 1} / ${items.length}`;
  studyProgress.style.width = `${(currentState.index + 1) / items.length * 100}%`;
  cardLabel.textContent = quiz ? 'BU NE DEMEK?' : 'ÖNCE DİNLE';
  germanWord.textContent = item[1];
  germanMeaning.textContent = quiz ? '' : item[2];
  const number = Number(item[2]);
  learningTip.hidden = quiz || topic.id !== 'numbers' || number < 21 || number > 99 || number % 10 === 0;
  learningTip.textContent = 'İpucu: Almancada önce birler, sonra “und”, en son onlar söylenir.';
  $('.german-audio-actions').hidden = false;
  answerOptions.hidden = !quiz;
  feedback.textContent = '';
  if (quiz) renderOptions(item);
  nextButton.disabled = quiz;
  nextButton.innerHTML = currentState.index === items.length - 1
    ? (quiz ? 'Bölümü bitir <span aria-hidden="true">→</span>' : 'Kendini dene <span aria-hidden="true">→</span>')
    : 'Sonraki <span aria-hidden="true">→</span>';
}

function next() {
  const currentState = state();
  if (currentState.phase === 'done') {
    if (currentState.round + 1 >= roundsFor(topic)) {
      currentState.round = roundsFor(topic);
      save();
      renderTopics();
      return;
    }
    currentState.round += 1;
    currentState.phase = 'learn';
    currentState.index = 0;
  } else if (currentState.index + 1 < roundItems().length) {
    currentState.index += 1;
  } else if (currentState.phase === 'learn') {
    currentState.phase = 'quiz';
    currentState.index = 0;
  } else {
    currentState.phase = 'done';
    currentState.index = 0;
  }
  save();
  renderStudy();
}

function play(rate) {
  if (!topic || state().phase === 'done') return;
  stopAudio();
  const item = currentItem();
  audio = new Audio(`audio/de/${topic.id}-${item[0]}.mp3`);
  audio.playbackRate = rate;
  audio.onerror = () => { audioNote.hidden = false; };
  audio.play().catch(() => { audioNote.hidden = false; });
}

nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim().replace(/\s+/g, ' ').slice(0, 30);
  if (!name) return;
  profileKey = name.toLocaleLowerCase('tr-TR');
  if (!profiles[profileKey]) profiles[profileKey] = { name, topics: {} };
  if (!profiles[profileKey].topics) profiles[profileKey].topics = {};
  profiles[profileKey].name = name;
  save();
  renderTopics();
});
$('#change-name').addEventListener('click', () => show('intro'));
$('#back-to-topics').addEventListener('click', renderTopics);
$('#play-audio').addEventListener('click', () => play(1));
$('#play-slow').addEventListener('click', () => play(0.78));
nextButton.addEventListener('click', next);
