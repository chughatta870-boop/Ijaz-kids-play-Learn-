/* =========================================================
   Ijaz Kids Play & Learn
   M Ijaz · GHS 124/NB
   ========================================================= */

/* ---------- DATA ---------- */
const ENGLISH = [
  ["A","Apple","🍎"],["B","Ball","⚽"],["C","Cat","🐱"],["D","Dog","🐶"],
  ["E","Elephant","🐘"],["F","Fish","🐟"],["G","Goat","🐐"],["H","Hat","🎩"],
  ["I","Ice Cream","🍦"],["J","Juice","🧃"],["K","Kite","🪁"],["L","Lion","🦁"],
  ["M","Monkey","🐒"],["N","Nest","🪺"],["O","Orange","🍊"],["P","Parrot","🦜"],
  ["Q","Queen","👸"],["R","Rabbit","🐰"],["S","Sun","☀️"],["T","Tiger","🐯"],
  ["U","Umbrella","☂️"],["V","Van","🚐"],["W","Watch","⌚"],["X","Xylophone","🎼"],
  ["Y","Yak","🐃"],["Z","Zebra","🦓"]
];

const URDU = [
  ["ا","انار","🍎"],["ب","بکری","🐐"],["پ","پنکھا","🪭"],["ت","تتلی","🦋"],
  ["ٹ","ٹماٹر","🍅"],["ث","ثمر","🍇"],["ج","جہاز","✈️"],["چ","چاند","🌙"],
  ["ح","حلوہ","🍮"],["خ","خرگوش","🐰"],["د","دروازہ","🚪"],["ڈ","ڈبہ","📦"],
  ["ذ","ذرہ","✨"],["ر","روٹی","🥖"],["ڑ","بھاڑ","🔥"],["ز","زیبرا","🦓"],
  ["ژ","ژالہ","❄️"],["س","سیب","🍎"],["ش","شیر","🦁"],["ص","صابن","🧼"],
  ["ض","ضرب","➗"],["ط","طوطا","🦜"],["ظ","ظرف","🍽️"],["ع","عینک","👓"],
  ["غ","غبارہ","🎈"],["ف","فیل","🐘"],["ق","قمقمہ","💡"],["ک","کتاب","📖"],
  ["گ","گھوڑا","🐴"],["ل","لومڑی","🦊"],["م","مچھلی","🐟"],["ن","نل","🚰"],
  ["و","ولی","🧑"],["ہ","ہاتھی","🐘"],["ھ","دو چشمی ہے","🔤"],["ء","ہمزہ","🔤"],
  ["ی","یخنی","🍲"],["ے","بڑی یے","🔤"]
];

const NUM_WORDS_EN = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"];
const NUM_WORDS_UR = ["صفر","ایک","دو","تین","چار","پانچ","چھ","سات","آٹھ","نو","دس",
  "گیارہ","بارہ","تیرہ","چودہ","پندرہ","سولہ","سترہ","اٹھارہ","انیس","بیس"];
const COUNT_EMOJI = ["⭐","🍎","🎈","🐶","🌸","🍓","🚗","🐟","🍩","🦋"];

const NUMBERS = Array.from({length:20},(_,i)=>i+1);

const COLORS = [
  ["Red","سرخ","#FF4757"],["Blue","نیلا","#3742FA"],["Green","سبز","#2ED573"],
  ["Yellow","پیلا","#FFD32A"],["Orange","نارنجی","#FF7F27"],["Purple","جامنی","#9C27B0"],
  ["Pink","گلابی","#FF6B9D"],["Black","کالا","#2d3436"],["White","سفید","#dfe6e9"],
  ["Brown","بھورا","#8D5524"],["Grey","سرمئی","#95A5A6"],["Gold","سنہری","#D4AC0D"]
];

const SHAPES = [
  ["Circle","دائرہ", `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#FF6B9D"/></svg>`],
  ["Square","مربع", `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="8" fill="#0984E3"/></svg>`],
  ["Triangle","مثلث", `<svg viewBox="0 0 100 100"><polygon points="50,8 92,90 8,90" fill="#00B894"/></svg>`],
  ["Rectangle","مستطیل", `<svg viewBox="0 0 100 100"><rect x="6" y="26" width="88" height="48" rx="8" fill="#FDCB6E"/></svg>`],
  ["Star","ستارہ", `<svg viewBox="0 0 100 100"><polygon points="50,4 61,37 96,37 68,58 79,92 50,71 21,92 32,58 4,37 39,37" fill="#F1C40F"/></svg>`],
  ["Heart","دل", `<svg viewBox="0 0 100 100"><path d="M50 88 C 10 60,4 32,26 18 C 40 10,50 22,50 30 C 50 22,60 10,74 18 C 96 32,90 60,50 88 Z" fill="#FF4757"/></svg>`],
  ["Oval","بیضوی", `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="46" ry="30" fill="#9C27B0"/></svg>`],
  ["Diamond","ہیرا", `<svg viewBox="0 0 100 100"><polygon points="50,6 92,50 50,94 8,50" fill="#00CEC9"/></svg>`],
  ["Pentagon","پنج ضلع", `<svg viewBox="0 0 100 100"><polygon points="50,6 95,40 78,92 22,92 5,40" fill="#E17055"/></svg>`],
  ["Hexagon","شش ضلع", `<svg viewBox="0 0 100 100"><polygon points="28,8 72,8 96,50 72,92 28,92 4,50" fill="#6C5CE7"/></svg>`]
];

/* ---------- STATE ---------- */
let currentTab = "english";
let muted = false;
let stars = new Set(JSON.parse(localStorage.getItem('ijaz_kids_stars')||'[]'));
let quizScore = 0;
let quizAnswer = null;

/* ---------- HELPERS ---------- */
function saveStars(){ localStorage.setItem('ijaz_kids_stars', JSON.stringify([...stars])); }
function updateStarsUI(){ document.getElementById('starsCount').textContent = stars.size; }

function speak(text, lang){
  if(muted) return;
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || 'en-US';
    u.rate = 0.85;
    u.pitch = 1.15;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith((lang||'en').toLowerCase().slice(0,2)));
    if(match) u.voice = match;
    window.speechSynthesis.speak(u);
  }catch(e){ /* speech not supported */ }
}

function vibrate(ms){ if(navigator.vibrate) navigator.vibrate(ms); }

function confettiBurst(){
  const layer = document.getElementById('confettiLayer');
  const emojis = ["🎉","✨","⭐","🎈","🌟","💖"];
  for(let i=0;i<14;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left = Math.random()*100+'vw';
    el.style.animationDuration = (1.6+Math.random()*1.2)+'s';
    el.style.fontSize = (14+Math.random()*16)+'px';
    layer.appendChild(el);
    setTimeout(()=>el.remove(), 3000);
  }
}

function markStar(id){
  if(!stars.has(id)){ stars.add(id); saveStars(); updateStarsUI(); }
}

function showScreen(id){
  ['homeScreen','categoryScreen','quizScreen'].forEach(s=>{
    document.getElementById(s).classList.toggle('hidden', s!==id);
  });
}

function mascotSay(text){
  const bubble = document.getElementById('speechBubble');
  bubble.textContent = text;
  bubble.classList.remove('hidden');
  clearTimeout(mascotSay._t);
  mascotSay._t = setTimeout(()=>bubble.classList.add('hidden'), 2600);
}

/* ---------- CATEGORY RENDERING ---------- */
const CAT_TITLES = {
  english:"English Alphabet", urdu:"اردو حروفِ تہجی", numbers:"Numbers & Counting",
  colors:"Colors / رنگ", shapes:"Shapes / اشکال"
};

function openCategory(tab){
  currentTab = tab;
  document.getElementById('catTitle').textContent = CAT_TITLES[tab];
  document.getElementById('catTitle').classList.toggle('urdu-font', tab==='urdu');
  showScreen('categoryScreen');
  renderGrid();
  // auto show first item
  selectIndex(0, false);
}

function renderGrid(){
  const grid = document.getElementById('itemsGrid');
  grid.innerHTML = '';
  let list, render;

  if(currentTab==='english'){
    list = ENGLISH;
    render = (item,i)=> `<span>${item[0]}</span><small>${item[2]}</small>`;
  } else if(currentTab==='urdu'){
    list = URDU;
    render = (item,i)=> `<span class="urdu-font">${item[0]}</span><small>${item[2]}</small>`;
  } else if(currentTab==='numbers'){
    list = NUMBERS;
    render = (item,i)=> `<span>${item}</span><small>${COUNT_EMOJI[i%COUNT_EMOJI.length]}</small>`;
  } else if(currentTab==='colors'){
    list = COLORS;
    render = null; // custom below
  } else if(currentTab==='shapes'){
    list = SHAPES;
    render = null; // custom below
  }

  list.forEach((item,i)=>{
    const btn = document.createElement('button');
    const id = currentTab+'-'+i;
    if(currentTab==='colors'){
      btn.className = 'item-tile color-tile';
      btn.style.background = item[2];
      btn.textContent = item[0];
    } else if(currentTab==='shapes'){
      btn.className = 'item-tile shape-tile';
      btn.innerHTML = item[2] + `<small>${item[0]}</small>`;
    } else {
      btn.className = 'item-tile';
      btn.innerHTML = render(item,i);
    }
    if(stars.has(id)){
      const badge = document.createElement('span');
      badge.className = 'star-badge'; badge.textContent='⭐';
      btn.appendChild(badge);
    }
    btn.addEventListener('click', ()=> selectIndex(i, true));
    grid.appendChild(btn);
  });
}

function selectIndex(i, doSpeak){
  const tiles = document.querySelectorAll('#itemsGrid .item-tile');
  tiles.forEach(t=>t.classList.remove('active'));
  if(tiles[i]) tiles[i].classList.add('active');

  const stageEmoji = document.getElementById('stageEmoji');
  const stageBig = document.getElementById('stageBig');
  const stageWord = document.getElementById('stageWord');
  const countingRow = document.getElementById('countingRow');
  countingRow.classList.add('hidden');
  countingRow.innerHTML = '';
  stageBig.classList.remove('urdu-font');

  let text, lang, id;

  if(currentTab==='english'){
    const [letter,word,emoji] = ENGLISH[i];
    stageEmoji.textContent = emoji;
    stageBig.textContent = letter;
    stageWord.textContent = word;
    text = `${letter}. ${word}`; lang='en-US'; id='english-'+i;
  } else if(currentTab==='urdu'){
    const [letter,word,emoji] = URDU[i];
    stageEmoji.textContent = emoji;
    stageBig.textContent = letter; stageBig.classList.add('urdu-font');
    stageWord.textContent = word; stageWord.classList.add('urdu-font');
    text = `${letter} ${word}`; lang='ur-PK'; id='urdu-'+i;
  } else if(currentTab==='numbers'){
    const n = NUMBERS[i];
    stageEmoji.textContent = '🔢';
    stageBig.textContent = n;
    stageWord.textContent = NUM_WORDS_EN[n] + ' / ' + NUM_WORDS_UR[n];
    id = 'numbers-'+i;
    animateCounting(n);
    speakCounting(n);
    markStar(id); updateStarsUI(); renderStarBadgeSafe(i);
    vibrate(15);
    return; // counting handles its own flow
  } else if(currentTab==='colors'){
    const [nameEn,nameUr,hex] = COLORS[i];
    stageEmoji.textContent = '🎨';
    stageBig.textContent = '●';
    stageBig.style.color = hex;
    stageWord.textContent = nameEn + ' / ' + nameUr;
    text = nameEn; lang='en-US'; id='colors-'+i;
  } else if(currentTab==='shapes'){
    const [nameEn,nameUr,svg] = SHAPES[i];
    stageEmoji.innerHTML = svg.replace('viewBox="0 0 100 100"','viewBox="0 0 100 100" style="width:60px;height:60px"');
    stageBig.textContent = '';
    stageWord.textContent = nameEn + ' / ' + nameUr;
    text = nameEn; lang='en-US'; id='shapes-'+i;
  }

  stageBig.classList.remove('bounce-active'); void stageBig.offsetWidth; stageBig.classList.add('bounce-active');

  if(doSpeak){
    speak(text, lang);
    vibrate(15);
    confettiBurstSmall();
  }
  markStar(id);
  renderStarBadgeSafe(i);
}

function renderStarBadgeSafe(i){
  const tiles = document.querySelectorAll('#itemsGrid .item-tile');
  const tile = tiles[i];
  if(tile && !tile.querySelector('.star-badge')){
    const badge = document.createElement('span');
    badge.className='star-badge'; badge.textContent='⭐';
    tile.appendChild(badge);
  }
}

function confettiBurstSmall(){
  if(Math.random()<0.35) confettiBurst();
}

function animateCounting(n){
  const row = document.getElementById('countingRow');
  row.classList.remove('hidden');
  row.innerHTML = '';
  const emoji = COUNT_EMOJI[Math.floor(Math.random()*COUNT_EMOJI.length)];
  for(let k=1;k<=n;k++){
    setTimeout(()=>{
      const s = document.createElement('span');
      s.textContent = emoji;
      row.appendChild(s);
    }, k*160);
  }
}

function speakCounting(n){
  if(muted) return;
  window.speechSynthesis.cancel();
  let k=1;
  function next(){
    if(k>n) return;
    const u = new SpeechSynthesisUtterance(String(k));
    u.lang='en-US'; u.rate=1.05; u.pitch=1.2;
    u.onend = ()=>{ k++; next(); };
    window.speechSynthesis.speak(u);
  }
  next();
}

/* ---------- QUIZ ---------- */
function newQuiz(){
  const pools = ['english','urdu','numbers','colors','shapes'];
  const pool = pools[Math.floor(Math.random()*pools.length)];
  let question, options, correctIdx;

  if(pool==='english'){
    const idx = Math.floor(Math.random()*ENGLISH.length);
    const item = ENGLISH[idx];
    question = `Which letter is for <span class="qbig">${item[2]}</span>`;
    let opts = [item[0]];
    while(opts.length<4){ const r=ENGLISH[Math.floor(Math.random()*ENGLISH.length)][0]; if(!opts.includes(r)) opts.push(r); }
    opts.sort(()=>Math.random()-0.5);
    correctIdx = opts.indexOf(item[0]);
    options = opts;
    quizAnswer = {text:`${item[0]} for ${item[1]}`, lang:'en-US'};
  } else if(pool==='urdu'){
    const idx = Math.floor(Math.random()*URDU.length);
    const item = URDU[idx];
    question = `<span class="urdu-font">اس تصویر کا حرف چنیں</span> <span class="qbig">${item[2]}</span>`;
    let opts=[item[0]];
    while(opts.length<4){ const r=URDU[Math.floor(Math.random()*URDU.length)][0]; if(!opts.includes(r)) opts.push(r); }
    opts.sort(()=>Math.random()-0.5);
    correctIdx = opts.indexOf(item[0]);
    options = opts;
    quizAnswer = {text:`${item[0]} ${item[1]}`, lang:'ur-PK'};
  } else if(pool==='numbers'){
    const n = NUMBERS[Math.floor(Math.random()*10)];
    const emoji = COUNT_EMOJI[Math.floor(Math.random()*COUNT_EMOJI.length)];
    question = `Count and choose the number<br><span class="qbig">${emoji.repeat(n)}</span>`;
    let opts=[n];
    while(opts.length<4){ const r=Math.max(1,n+Math.floor(Math.random()*5)-2); if(!opts.includes(r)) opts.push(r); }
    opts.sort(()=>Math.random()-0.5);
    correctIdx = opts.indexOf(n);
    options = opts.map(String);
    quizAnswer = {text:String(n), lang:'en-US'};
  } else if(pool==='colors'){
    const idx = Math.floor(Math.random()*COLORS.length);
    const item = COLORS[idx];
    question = `Which one is <b>${item[0]}</b> color?`;
    let opts=[idx];
    while(opts.length<4){ const r=Math.floor(Math.random()*COLORS.length); if(!opts.includes(r)) opts.push(r); }
    opts.sort(()=>Math.random()-0.5);
    correctIdx = opts.indexOf(idx);
    options = opts.map(o=>`<span style="display:inline-block;width:34px;height:34px;border-radius:50%;background:${COLORS[o][2]}"></span>`);
    quizAnswer = {text:item[0], lang:'en-US'};
  } else {
    const idx = Math.floor(Math.random()*SHAPES.length);
    const item = SHAPES[idx];
    question = `Which shape is <b>${item[0]}</b>?`;
    let opts=[idx];
    while(opts.length<4){ const r=Math.floor(Math.random()*SHAPES.length); if(!opts.includes(r)) opts.push(r); }
    opts.sort(()=>Math.random()-0.5);
    correctIdx = opts.indexOf(idx);
    options = opts.map(o=>`<span style="display:inline-block;width:36px;height:36px">${SHAPES[o][2]}</span>`);
    quizAnswer = {text:item[0], lang:'en-US'};
  }

  document.getElementById('quizQuestion').innerHTML = question;
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  document.getElementById('quizFeedback').textContent = '';
  options.forEach((opt,i)=>{
    const b = document.createElement('button');
    b.className='quiz-opt';
    b.innerHTML = opt;
    b.addEventListener('click', ()=> handleQuizAnswer(i===correctIdx, b));
    optWrap.appendChild(b);
  });
}

function handleQuizAnswer(isCorrect, btn){
  document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
  const fb = document.getElementById('quizFeedback');
  if(isCorrect){
    btn.classList.add('correct');
    quizScore++;
    document.getElementById('quizScore').textContent = quizScore;
    fb.textContent = '🎉 Shabash! Correct!';
    speak(quizAnswer.text, quizAnswer.lang);
    confettiBurst();
    vibrate([20,30,20]);
  } else {
    btn.classList.add('wrong');
    fb.textContent = '🙂 Try again next time!';
    speak(quizAnswer.text, quizAnswer.lang);
    vibrate(40);
  }
  setTimeout(newQuiz, 1700);
}

/* ---------- EVENTS ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 1300);

  updateStarsUI();

  document.querySelectorAll('.menu-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const tab = card.dataset.tab;
      vibrate(15);
      if(tab==='quiz'){
        showScreen('quizScreen');
        quizScore = 0;
        document.getElementById('quizScore').textContent = 0;
        newQuiz();
      } else {
        openCategory(tab);
      }
    });
  });

  document.getElementById('homeBtn').addEventListener('click', ()=>{
    showScreen('homeScreen');
    mascotSay("Chalo phir seekhtay hain! 😊");
  });

  document.getElementById('backBtn').addEventListener('click', ()=> showScreen('homeScreen'));
  document.getElementById('quizBackBtn').addEventListener('click', ()=> showScreen('homeScreen'));

  document.getElementById('repeatBtn').addEventListener('click', ()=>{
    const active = document.querySelector('#itemsGrid .item-tile.active');
    const idx = active ? [...document.querySelectorAll('#itemsGrid .item-tile')].indexOf(active) : 0;
    selectIndex(idx, true);
  });

  document.getElementById('muteBtn').addEventListener('click', (e)=>{
    muted = !muted;
    e.target.textContent = muted ? '🔇' : '🔊';
    if(muted) window.speechSynthesis.cancel();
  });

  document.getElementById('mascot').addEventListener('click', ()=>{
    const msgs = ["Hi! I'm your learning buddy! 🦉","Tap any card to start! ✨","You're doing great! ⭐","Chalo kuch naya seekhtay hain!"];
    mascotSay(msgs[Math.floor(Math.random()*msgs.length)]);
    speak("Hi! I am your learning buddy!", 'en-US');
  });

  // handle PWA shortcut deep-links (?tab=english / numbers / quiz / urdu / colors / shapes)
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if(tabParam){
    if(tabParam === 'quiz'){
      showScreen('quizScreen');
      quizScore = 0;
      document.getElementById('quizScore').textContent = 0;
      newQuiz();
    } else if(['english','urdu','numbers','colors','shapes'].includes(tabParam)){
      openCategory(tabParam);
    }
  }

  // preload voices
  if('speechSynthesis' in window){ window.speechSynthesis.getVoices(); }

  // register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
});
