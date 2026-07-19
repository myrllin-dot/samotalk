// ============ 動物語錄機 ============
(function(){
  const qText = document.getElementById('quote-text');
  const qSource = document.getElementById('quote-source');
  const qBtn = document.getElementById('quote-btn');
  if(!qText || !qBtn) return;

  const quotes = [
    ["「太陽出來了，把拔要起床了啊，他已經睡了這麼久！」","小波，7個月大的貓，關於早晨叫醒主人這件事"],
    ["「我沒有不吃飯，是肚子裡好像有石頭，喝水比較不痛。」","一隻突然厭食的老貓"],
    ["「打是情、罵是愛啊——你哪來這種電視劇台詞？我常聽媽媽在說的。」","綠豆，愛捉弄兄弟的貓"],
    ["「我只是看他們平常都在尖叫、跑來跑去，所以我也對他們尖叫、撲倒他們，可是他們都不喜歡。」","一隻試著理解小孩的狗"],
    ["「這裡就是我喜歡的地方。」","墨子，曾經流浪、後來被留下來的貓"],
    ["「我喜歡踩起來有不同溫度的地方，很熱的時候踩冰冰的，很冷的時候踩熱熱的。」","饅頭，21個月大的貓"],
    ["「不要罵我，帶著我一起認識她，告訴我要怎麼做，我會學著當一個姊姊。」","一隻第一次成為姊姊的狗"],
    ["「我沒有覺得怎樣，但可以睡就好。」","露露，13歲，個性淡定的貓"],
    ["「謝謝你來找我，也謝謝你願意聽我把話說完。」","來自多個個案結尾的共同心聲"],
    ["「我知道，一個家要養那麼多隻貓咪並不容易，我很樂意貢獻我的愛。」","墨子"],
    ["「我尿床媽媽還是很疼我啊，她最疼我了！」","一隻總是很有安全感的狗"],
    ["「我全部都記得，包含以前的和現在的事，都在我身體裡。」","一隻曾經流浪、後來被留下的貓"]
  ];
  let qIndex = -1;
  function nextQuote(){
    let next;
    do { next = Math.floor(Math.random()*quotes.length); } while(next === qIndex && quotes.length>1);
    qIndex = next;
    qText.style.opacity = 0;
    qSource.style.opacity = 0;
    setTimeout(()=>{
      qText.textContent = quotes[qIndex][0];
      qSource.textContent = "— " + quotes[qIndex][1];
      qText.style.opacity = 1;
      qSource.style.opacity = 1;
    }, 250);
  }
  qBtn.addEventListener('click', nextQuote);
})();

// ============ 小測驗 ============
(function(){
  const steps = document.querySelectorAll('.q-step');
  if(!steps.length) return;
  const progress = document.querySelectorAll('#q-progress i');
  const resultBox = document.getElementById('q-result');
  let current = 0;
  let score = 0;

  function showStep(i){
    steps.forEach(s => s.classList.remove('active'));
    if(i < steps.length){ steps[i].classList.add('active'); }
    progress.forEach((bar, idx) => {
      bar.style.width = idx < i ? '100%' : (idx === i ? '30%' : '0%');
    });
  }

  document.querySelectorAll('.q-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      score += parseInt(opt.dataset.v, 10);
      current += 1;
      if(current < steps.length){
        showStep(current);
      } else {
        progress.forEach(bar => bar.style.width = '100%');
        steps.forEach(s => s.classList.remove('active'));
        resultBox.classList.add('active');
        renderResult(score);
      }
    });
  });

  function renderResult(score){
    const tag = document.getElementById('q-result-tag');
    const title = document.getElementById('q-result-title');
    const desc = document.getElementById('q-result-desc');
    if(score >= 7){
      tag.textContent = 'LV.3 心有靈犀';
      title.textContent = '你們已經在用同一種語言了';
      desc.textContent = '你對牠的觀察很細膩，很多時候不需要言語，你們已經在互相理解了。偶爾還是可以透過一次深度溝通，聽聽牠更深層、說不出口的想法。';
    } else if(score >= 4){
      tag.textContent = 'LV.2 翻譯官新手';
      title.textContent = '你很願意懂牠，只是有時候還在猜';
      desc.textContent = '你會停下來觀察，也願意調整自己的解讀，這已經很難得。一次動物溝通，也許能幫你把猜測，變成確定。';
    } else {
      tag.textContent = 'LV.1 剛開始學聽';
      title.textContent = '牠一直在說，你們只是還沒對到頻道';
      desc.textContent = '沒關係，多數的照護人都是從這裡開始的。動物的表達方式和人很不一樣，一次溝通，或許能幫你打開一扇新的窗。';
    }
  }

  const restartBtn = document.getElementById('q-restart');
  if(restartBtn){
    restartBtn.addEventListener('click', () => {
      current = 0; score = 0;
      resultBox.classList.remove('active');
      progress.forEach(bar => bar.style.width = '0%');
      showStep(0);
    });
  }

  showStep(0);
})();

// ============ 個案篩選（cases.html 專用） ============
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  if(!filterBtns.length) return;
  const cases = document.querySelectorAll('.case');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cases.forEach(c => {
        const tags = (c.dataset.tags || '').split(',');
        if(f === 'all' || tags.includes(f)){
          c.classList.remove('hidden');
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });
})();
