const questionGroups = [
  { verb: 'be', answer: 'was', sentences: [
    'Yesterday, I _____ at the park.', 'Mia _____ happy with her new book.',
    'My brother _____ first in line.', 'The little cat _____ under the table.',
    'It _____ sunny on Monday.', 'Dad _____ at the library after work.',
    'The soup _____ hot at lunchtime.', 'I _____ sleepy after the long walk.',
    'We _____ ready for the school show.', 'They _____ at the beach last Sunday.',
    'My friends _____ excited about the game.', 'Sam and Ella _____ in the garden.',
    'Mum and I _____ early for the bus.', 'The puppies _____ very small.',
    'You _____ kind to your new classmate.', 'The twins _____ at their grandma’s house.',
  ] },
  { verb: 'beat', answer: 'beat', sentences: [
    'Yesterday, I _____ my brother at chess.', 'Our team _____ the Tigers in the match.',
    'Nora _____ me in a race at school.', 'The red team _____ the blue team at football.',
    'We _____ the other class at basketball.', 'Dad _____ me at table tennis.',
    'Maya _____ her best score in the game.', 'The little horse _____ the big horse in the race.',
    'My cousin _____ me at cards last night.', 'They _____ their friends in the quiz.',
    'Ali _____ me in a board game.', 'Our school _____ the next match.',
    'Lena _____ her sister at badminton.', 'The home team _____ the visitors.',
    'I _____ my dad at checkers.', 'The blue player _____ the champion.',
    'We _____ them in the final game.', 'My friend _____ me by one point.',
  ] },
  { verb: 'become', answer: 'became', sentences: [
    'The caterpillar _____ a butterfly.', 'The sky _____ dark before the storm.',
    'My baby cousin _____ sleepy after lunch.', 'The small seed _____ a tall flower.',
    'The quiet room _____ noisy when we came in.', 'Our little puppy _____ a big dog.',
    'The snow _____ soft and wet in the sun.', 'Reading _____ my favourite part of the day.',
    'The water _____ cold in the fridge.', 'A tiny acorn _____ a big oak tree.',
    'The game _____ more fun when my friends joined.', 'The soup _____ warm after a few minutes.',
    'The room _____ bright when we opened the curtains.', 'The baby bird _____ strong enough to fly.',
    'Our class _____ quiet when the teacher arrived.', 'The path _____ muddy after the rain.',
    'The little idea _____ a fun school project.', 'The day _____ special when Grandma visited.',
  ] },
  { verb: 'begin', answer: 'began', sentences: [
    'The movie _____ at six o’clock.', 'Our lesson _____ after the bell rang.',
    'The race _____ when the whistle blew.', 'The rain _____ during our walk.',
    'The story _____ with a funny surprise.', 'The baby _____ to laugh at the puppet.',
    'The music _____ when I pressed play.', 'The school concert _____ on time.',
    'The game _____ after lunch.', 'The little bird _____ to sing in the morning.',
    'We _____ our art project on Tuesday.', 'The class _____ reading a new book.',
    'The clouds _____ to move across the sky.', 'The clock _____ to ring at seven.',
    'Our trip _____ early on Saturday.', 'The puppy _____ to follow me.',
    'The show _____ with a bright light.', 'I _____ my homework after dinner.',
  ] },
  { verb: 'break', answer: 'broke', sentences: [
    'I _____ my pencil by accident.', 'The toy car _____ when it fell.',
    'Ben _____ a cookie in half.', 'The little branch _____ in the wind.',
    'We _____ the piñata at the party.', 'A wave _____ over the sandcastle.',
    'My crayon _____ while I was colouring.', 'The old chair _____ with a loud sound.',
    'Ella _____ the chocolate bar into pieces.', 'The egg _____ when it hit the floor.',
    'The stick _____ when Max stepped on it.', 'I _____ the biscuit and shared it.',
    'The cup _____, but nobody got hurt.', 'The ice _____ under the warm sun.',
    'Our kite _____ free from the string.', 'The toy robot _____ after it fell off the shelf.',
    'The chocolate _____ into four small squares.', 'He _____ the crackers before adding cheese.',
  ] },
  { verb: 'bring', answer: 'brought', sentences: [
    'Sam _____ his lunch to school.', 'I _____ my teddy bear on the trip.',
    'Mum _____ warm coats for everyone.', 'We _____ a ball to the park.',
    'The children _____ their drawings to class.', 'Dad _____ home a bunch of bananas.',
    'My friend _____ a new game to play.', 'Lily _____ flowers for her teacher.',
    'They _____ their dog to the beach.', 'You _____ a big smile to the party.',
    'Our neighbours _____ cookies for the party.', 'The guide _____ a map for us.',
    'I _____ my favourite book to the sleepover.', 'Ben _____ his little sister a glass of water.',
    'The team _____ their medals to school.', 'Grandpa _____ old photos to show us.',
    'We _____ some snacks for the long ride.', 'A kind helper _____ blankets for the puppies.',
  ] },
  { verb: 'build', answer: 'built', sentences: [
    'They _____ a big sandcastle.', 'We _____ a den from blankets.',
    'My sister _____ a tall tower with blocks.', 'Dad _____ a birdhouse for the garden.',
    'The children _____ a snowman after school.', 'I _____ a bridge with my toy bricks.',
    'Our class _____ a model of a rocket.', 'The beavers _____ a dam in the stream.',
    'Maya _____ a little house for her dolls.', 'We _____ a fort under the table.',
    'The workers _____ a new playground.', 'My brother _____ a robot from boxes.',
    'They _____ a path through the garden.', 'I _____ a tower that reached my knees.',
    'The ants _____ a home under the ground.', 'Grandpa _____ a bench for the park.',
    'Our team _____ a raft for the race.', 'The children _____ a castle from cardboard.',
  ] },
  { verb: 'buy', answer: 'bought', sentences: [
    'Dad _____ apples at the shop.', 'I _____ a blue notebook yesterday.',
    'Mum _____ fresh bread for breakfast.', 'We _____ tickets for the school play.',
    'Ella _____ a birthday card for her friend.', 'They _____ a football at the market.',
    'My uncle _____ a warm hat for winter.', 'I _____ a small plant for my room.',
    'The class _____ paint for the art project.', 'Ben _____ a toy train with his pocket money.',
    'We _____ strawberries from the farm shop.', 'Grandma _____ a new lamp for the living room.',
    'She _____ two pencils before class.', 'Our family _____ a big watermelon.',
    'The children _____ lemonade at the fair.', 'He _____ a gift for his sister.',
    'I _____ a comic book after school.', 'Dad _____ a loaf of bread on his way home.',
  ] },
  { verb: 'can', answer: 'could', sentences: [
    'When I was six, I _____ ride a bike.', 'Nina _____ read when she was five.',
    'We _____ see the moon through the window.', 'My grandpa _____ run very fast as a boy.',
    'The baby _____ walk with help last month.', 'I _____ hear the birds in the garden.',
    'They _____ swim across the small pool.', 'Milo _____ climb the low tree by himself.',
    'You _____ play that song on the piano.', 'My sister _____ count to one hundred.',
    'The little dog _____ jump over the log.', 'We _____ visit the museum on our trip.',
    'I _____ see the mountains from the train.', 'Tom _____ tie his shoes all by himself.',
    'The class _____ answer every question.', 'She _____ speak a little French last year.',
    'Our team _____ finish the puzzle together.', 'The bird _____ fly over the tall fence.',
  ] },
  { verb: 'catch', answer: 'caught', sentences: [
    'Lena _____ the ball.', 'I _____ a big fish with Dad.',
    'The goalkeeper _____ the football near the goal.', 'Mum _____ the keys before they hit the floor.',
    'We _____ butterflies in our nets and let them go.', 'Ben _____ the bus just in time.',
    'The kitten _____ a toy mouse.', 'My brother _____ the frisbee in the park.',
    'Ava _____ the ball with one hand.', 'The dog _____ the stick in mid-air.',
    'I _____ a snowflake on my mitten.', 'They _____ the train at the station.',
    'Our team _____ the ball near the net.', 'The farmer _____ a chicken in the yard.',
    'You _____ the ruler before it fell.', 'The little boy _____ his hat in the wind.',
    'Grandpa _____ the small fish carefully.', 'The goalie _____ every ball in the game.',
  ] },
  { verb: 'choose', answer: 'chose', sentences: [
    'He _____ the blue T-shirt.', 'I _____ the apple for my snack.',
    'Mina _____ a story for bedtime.', 'We _____ the red team name.',
    'They _____ seats near the window.', 'My brother _____ the longest pencil.',
    'The class _____ a song to sing.', 'Dad _____ a funny hat at the shop.',
    'Ella _____ the yellow ribbon for her art.', 'You _____ a great book from the library.',
    'I _____ the chocolate ice cream.', 'Our friends _____ a game to play.',
    'Sam _____ the green crayon from the box.', 'The captain _____ Maya for the team.',
    'We _____ the path beside the river.', 'She _____ a small gift for her cousin.',
    'The children _____ their favourite animal.', 'I _____ the easiest puzzle first.',
  ] },
  { verb: 'come', answer: 'came', sentences: [
    'My cousin _____ to our house.', 'The bus _____ around the corner.',
    'Grandma _____ to watch our school show.', 'A little bird _____ to the window.',
    'My friends _____ over after lunch.', 'The puppy _____ when I called its name.',
    'Dad _____ home before dinner.', 'The first snow _____ in December.',
    'Our teacher _____ into the classroom smiling.', 'The train _____ right on time.',
    'Mia _____ to my birthday party.', 'The moon _____ out after sunset.',
    'A bright idea _____ to me during the walk.', 'The kitten _____ out from under the bed.',
    'They _____ back from the park at five.', 'My aunt _____ to visit us last weekend.',
    'The little duck _____ close to the pond.', 'The story _____ to an exciting end.',
  ] },
  { verb: 'cost', answer: 'cost', sentences: [
    'The toy _____ five lira at the shop.', 'My bus ticket _____ ten lira yesterday.',
    'The bright sticker _____ one lira.', 'Those apples _____ twelve lira at the market.',
    'The little book _____ twenty lira last week.', 'Our ice creams _____ thirty lira altogether.',
    'The blue ball _____ fifteen lira at the store.', 'That big cake _____ one hundred lira.',
    'The pencils _____ two lira each.', 'The museum ticket _____ five lira for children.',
    'My new gloves _____ forty lira at the market.', 'The box of crayons _____ twenty-five lira.',
    'The red kite _____ thirty lira yesterday.', 'Those storybooks _____ ten lira each.',
    'The small plant _____ eight lira at the garden shop.', 'Our snacks _____ twelve lira in total.',
    'The shiny badge _____ three lira at the fair.', 'That warm scarf _____ fifty lira in the shop.',
  ] },
  { verb: 'cut', answer: 'cut', sentences: [
    'I _____ the paper with scissors.', 'Mum _____ the cake into eight pieces.',
    'We _____ coloured shapes for our project.', 'Ben _____ the string with little scissors.',
    'The gardener _____ the grass on Saturday.', 'I _____ my sandwich in half.',
    'Ella _____ a star from yellow paper.', 'Dad _____ the ribbon for the present.',
    'They _____ the old branches in the garden.', 'The children _____ pictures from a magazine.',
    'My brother _____ the wrapping paper carefully.', 'We _____ the apple into small pieces.',
    'She _____ a paper heart for her friend.', 'I _____ the tag off my new shirt.',
    'The cook _____ carrots for the soup.', 'He _____ a small window in the cardboard.',
    'Our class _____ paper strips for the collage.', 'Grandma _____ the bread into thick slices.',
  ] },
];

const questionLimits = { be: 16, beat: 15, become: 14, begin: 14, break: 14, bring: 14, build: 14, buy: 14, can: 14, catch: 14, choose: 14, come: 14, cost: 14, cut: 15 };
const allQuestions = [];
const longestQuestionGroup = Math.max(...questionGroups.map(({ verb }) => questionLimits[verb]));
for (let round = 0; round < longestQuestionGroup; round += 1) {
  questionGroups.forEach(({ verb, answer, sentences }) => {
    if (round < questionLimits[verb]) {
      allQuestions.push({ verb, answer, sentence: sentences[round].replace('_____', '<span class="blank">_____</span>') });
    }
  });
}
const quizSets = Array.from({ length: 10 }, (_, quizIndex) => allQuestions.slice(quizIndex * 20, (quizIndex + 1) * 20));

const welcomeView = document.querySelector('#welcome-view');
const quizView = document.querySelector('#quiz-view');
const finishView = document.querySelector('#finish-view');
const sentenceText = document.querySelector('#sentence-text');
const answerInput = document.querySelector('#answer-input');
const checkButton = document.querySelector('#check-button');
const nextButton = document.querySelector('#next-button');
const feedback = document.querySelector('#answer-feedback');
const hintButton = document.querySelector('#hint-button');
const hintContent = document.querySelector('#verb-hint');
const verbBase = document.querySelector('#verb-base');
const progressCurrent = document.querySelector('#progress-current');
const progressTotal = document.querySelector('#progress-total');
const progressBar = document.querySelector('#progress-bar');
const progressFill = document.querySelector('#progress-fill');
const quizNextPanel = document.querySelector('#quiz-next');
const allQuizzesDonePanel = document.querySelector('#all-quizzes-done');
const nextQuizTitle = document.querySelector('#next-quiz-title');
const continueQuizButton = document.querySelector('#continue-quiz-button');
const nextQuizButton = document.querySelector('#next-quiz-button');
const completedQuizStorageKey = 'gecmis-zaman-kulubu-completed-quizzes';

function loadCompletedQuizzes() {
  try {
    const stored = JSON.parse(localStorage.getItem(completedQuizStorageKey) || '[]');
    return new Set(Array.isArray(stored) ? stored.filter((quiz) => Number.isInteger(quiz) && quiz >= 0 && quiz < quizSets.length) : []);
  } catch {
    return new Set();
  }
}

const completedQuizzes = loadCompletedQuizzes();
let questionIndex = 0;
let correctCount = 0;
let hasAnswered = false;
let selectedQuiz = 0;
let questions = quizSets[selectedQuiz];

progressTotal.textContent = String(questions.length);
document.querySelector('#finish-total').textContent = String(questions.length);
progressBar.setAttribute('aria-valuemax', String(questions.length));

function nextUncompletedQuiz() {
  return quizSets.findIndex((_, quizIndex) => !completedQuizzes.has(quizIndex));
}

function updateHomeProgress() {
  const nextQuiz = nextUncompletedQuiz();
  const allDone = nextQuiz === -1;
  quizNextPanel.hidden = allDone;
  allQuizzesDonePanel.hidden = !allDone;
  if (!allDone) {
    nextQuizTitle.textContent = `Quiz ${nextQuiz + 1} seni bekliyor`;
    continueQuizButton.innerHTML = `Quiz ${nextQuiz + 1}'e başla <span aria-hidden="true">→</span>`;
  }
}

function saveCompletedQuizzes() {
  try {
    localStorage.setItem(completedQuizStorageKey, JSON.stringify([...completedQuizzes]));
  } catch {
    // If browser storage is unavailable, keep progress for this page session only.
  }
}

updateHomeProgress();

function renderQuestion() {
  const question = questions[questionIndex];
  hasAnswered = false;
  answerInput.value = '';
  answerInput.disabled = false;
  answerInput.classList.remove('is-correct', 'is-wrong');
  feedback.textContent = '';
  feedback.classList.remove('is-wrong');
  checkButton.disabled = false;
  nextButton.disabled = true;
  nextButton.innerHTML = questionIndex === questions.length - 1 ? 'Bitir <span aria-hidden="true">✓</span>' : 'Sonraki <span aria-hidden="true">→</span>';
  sentenceText.innerHTML = question.sentence;
  verbBase.textContent = question.verb;
  hintContent.hidden = true;
  hintButton.hidden = false;
  hintButton.textContent = 'İpucu';
  hintButton.setAttribute('aria-expanded', 'false');
  progressCurrent.textContent = String(questionIndex + 1);
  const progress = ((questionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', String(questionIndex + 1));
}

function startQuiz(quizNumber = nextUncompletedQuiz()) {
  if (quizNumber < 0) return;
  selectedQuiz = quizNumber;
  questions = quizSets[selectedQuiz];
  questionIndex = 0;
  correctCount = 0;
  welcomeView.hidden = true;
  finishView.hidden = true;
  quizView.hidden = false;
  renderQuestion();
  window.setTimeout(() => answerInput.focus({ preventScroll: true }), 80);
}

function checkAnswer() {
  if (hasAnswered) return;
  const guess = answerInput.value.trim().toLocaleLowerCase('en');
  if (!guess) {
    feedback.textContent = 'Önce cevabını yazmayı dene.';
    feedback.classList.add('is-wrong');
    answerInput.focus();
    return;
  }

  hasAnswered = true;
  const correct = guess === questions[questionIndex].answer;
  if (correct) {
    correctCount += 1;
    feedback.textContent = 'Evet, doğru cevap!';
    answerInput.classList.add('is-correct');
  } else {
    feedback.innerHTML = `Güzel deneme! Doğru cevap: <b>${questions[questionIndex].answer}</b>.`;
    feedback.classList.add('is-wrong');
    answerInput.classList.add('is-wrong');
  }
  answerInput.disabled = true;
  checkButton.disabled = true;
  nextButton.disabled = false;
  nextButton.focus();
}

function showFinish() {
  completedQuizzes.add(selectedQuiz);
  saveCompletedQuizzes();
  updateHomeProgress();
  quizView.hidden = true;
  finishView.hidden = false;
  document.querySelector('#score-count').textContent = String(correctCount);
  document.querySelector('#finish-total').textContent = String(questions.length);
  document.querySelector('#finish-title').textContent = `Quiz ${selectedQuiz + 1} tamamlandı!`;
  const copy = nextUncompletedQuiz() === -1
    ? 'On quizin tamamını bitirdin. Harika çalıştın!'
    : correctCount === questions.length
      ? 'Bütün cevapları buldun. Sıradaki quiz hazır olduğunda devam edebilirsin.'
      : 'Her deneme yeni bir şey öğretir. Bu quiz tamamlandı; hazırsan sıradakine geçebilirsin.';
  document.querySelector('#finish-copy').textContent = copy;
  nextQuizButton.hidden = nextUncompletedQuiz() === -1;
}

function nextQuestion() {
  if (!hasAnswered) return;
  if (questionIndex === questions.length - 1) {
    showFinish();
    return;
  }
  questionIndex += 1;
  renderQuestion();
  answerInput.focus({ preventScroll: true });
}

continueQuizButton.addEventListener('click', () => startQuiz());
nextQuizButton.addEventListener('click', () => startQuiz());
hintButton.addEventListener('click', () => {
  const isExpanded = hintButton.getAttribute('aria-expanded') === 'true';
  hintContent.hidden = isExpanded;
  hintButton.setAttribute('aria-expanded', String(!isExpanded));
  hintButton.innerHTML = isExpanded ? 'İpucu <span aria-hidden="true">?</span>' : 'İpucunu gizle';
});
checkButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', nextQuestion);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
});
