(function(){
  /* ascii name */
  const art=[" _____  _    _     _   _    _    ","|_   _|/ \\  | |   | | | |  / \\   ","  | | / _ \\ | |   | |_| | / _ \\  ","  | |/ ___ \\| |___|  _  |/ ___ \\ ","  |_/_/   \\_\\_____|_| |_/_/   \\_\\"].join('\n');
  const asciiEl=document.getElementById('ascii');
  asciiEl.textContent=art;

  /* glitch the ascii on click + occasionally */
  function glitch(){asciiEl.classList.remove('glitch');void asciiEl.offsetWidth;asciiEl.classList.add('glitch');}
  asciiEl.addEventListener('click',glitch);
  setInterval(()=>{if(Math.random()>0.6)glitch();},6000);

  /* boot sequence + progress bar */
  const lines=[
    '[ ok ] mounting /dev/talha ...',
    '[ ok ] loading kernel: python, django, flask, html, css, js',
    '[ ok ] starting service: full-stack-python.service',
    '[ ok ] enabling module: web-development',
    '[ ok ] network: github / linkedin / threads reachable',
    '[ ok ] resolving identity ... talha khalid',
    '',
    'welcome. booting portfolio shell ...'
  ];
  const pre=document.getElementById('bootpre');
  const bootBar=document.getElementById('bootBar');
  const bootPct=document.getElementById('bootPct');
  let i=0;
  (function next(){
    if(i<lines.length){
      pre.textContent+=lines[i]+'\n';i++;
      const p=Math.round((i/lines.length)*100);
      bootBar.style.width=p+'%';bootPct.textContent=p+'%';
      setTimeout(next,150);
    } else { bootBar.style.width='100%';bootPct.textContent='100%';setTimeout(finish,420); }
  })();
  function finish(){
    document.getElementById('boot').classList.add('done');
    document.body.classList.remove('boot');
    const blks=[...document.querySelectorAll('#term .blk')];
    blks.forEach((b,k)=>setTimeout(()=>{b.classList.add('in');},k*220));
    typeRole();
    setTimeout(animateBars,700);
  }

  /* live clock + uptime in title bar + neofetch uptime */
  const startTime=Date.now();
  const clockEl=document.getElementById('clock');
  const nfUptime=document.getElementById('nfUptime');
  function fmtUptime(ms){
    const s=Math.floor(ms/1000);const h=Math.floor(s/3600);const m=Math.floor((s%3600)/60);const ss=s%60;
    if(h)return h+'h '+m+'m '+ss+'s';if(m)return m+'m '+ss+'s';return ss+'s';
  }
  function tick(){
    const now=new Date();
    const t=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    if(clockEl)clockEl.innerHTML='🕐 '+t+' <span class="up">· up '+fmtUptime(Date.now()-startTime)+'</span>';
    if(nfUptime)nfUptime.textContent=fmtUptime(Date.now()-startTime);
  }
  setInterval(tick,1000);tick();

  /* animated skill bars */
  function animateBars(){
    document.querySelectorAll('#skillBars .bar-track').forEach(track=>{
      const pct=parseInt(track.getAttribute('data-pct'),10);
      const total=18;const target=Math.round(pct/100*total);let cur=0;
      const iv=setInterval(()=>{
        cur++;
        track.innerHTML='<b>'+'█'.repeat(cur)+'</b>'+'░'.repeat(total-cur);
        if(cur>=target)clearInterval(iv);
      },45);
    });
  }

  /* typed role */
  const roles=['full stack python engineer','python / django developer','flask + web developer','full stack web dev','web & product designer','coffee → code converter ☕'];
  let ri=0,ci=0,del=false;const rEl=document.getElementById('role');
  function typeRole(){
    const c=roles[ri];rEl.textContent=c.substring(0,ci);
    if(!del&&ci<c.length){ci++;setTimeout(typeRole,60);}
    else if(!del&&ci===c.length){del=true;setTimeout(typeRole,1500);}
    else if(del&&ci>0){ci--;setTimeout(typeRole,28);}
    else{del=false;ri=(ri+1)%roles.length;setTimeout(typeRole,260);}
  }

  /* project rows clickable */
  document.querySelectorAll('.proj[data-href]').forEach(r=>{
    r.addEventListener('click',()=>window.open(r.dataset.href,'_blank','noopener'));
  });

  /* ===== mode switch: terminal loader morphs into clean loader ===== */
  const loader=document.getElementById('loader');
  const loaderTerm=document.getElementById('loaderTerm');
  const lcBar=document.getElementById('lcBar');
  const toExec=document.getElementById('toExec');
  const toTerm=document.getElementById('toTerm');
  const toDesign=document.getElementById('toDesign');
  const toDesign2=document.getElementById('toDesign2');
  let switching=false;
  const savedView=localStorage.getItem('view')||'term';
  let currentView=savedView;
  if(savedView!=='term')document.body.classList.add('view-'+savedView);
  const bootLines=['$ ./build --target simple','> compiling views ...','> bundling assets ...','> optimizing layout ...','> done. launching.'];
  function switchView(target){
    if(switching)return;
    if(target===currentView)return;
    if(target==='design' || currentView==='design'){
      if(target==='design'){
        document.body.classList.toggle('from-exec', currentView==='exec');
        localStorage.setItem('lastView', currentView);
      }
      document.body.classList.remove('view-exec','view-design');
      if(target!=='term')document.body.classList.add('view-'+target);
      localStorage.setItem('view',target);
      currentView=target;window.scrollTo(0,0);return;
    }
    switching=true;currentView=target;
    loader.className='loader on';loaderTerm.textContent='';lcBar.style.width='0%';
    let i=0;
    (function typeLine(){
      if(i<bootLines.length){loaderTerm.textContent+=bootLines[i]+'\n';i++;setTimeout(typeLine,170);}
      else setTimeout(morph,360);
    })();
    function morph(){
      loader.classList.add('to-clean');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{lcBar.style.width='100%';}));
      setTimeout(()=>{
        document.body.classList.remove('view-exec','view-design');
        if(target!=='term')document.body.classList.add('view-'+target);
        localStorage.setItem('view',target);window.scrollTo(0,0);
        loader.classList.add('fade');
        setTimeout(()=>{loader.className='loader';switching=false;},520);
      },1050);
    }
  }
  if(toExec)toExec.addEventListener('click',()=>switchView('exec'));
  if(toTerm)toTerm.addEventListener('click',()=>switchView('term'));
  if(toDesign)toDesign.addEventListener('click',()=>switchView('design'));
  if(toDesign2)toDesign2.addEventListener('click',(e)=>{e.preventDefault();switchView('design');});
  document.querySelectorAll('.designBackBtn').forEach(b=>{
    b.addEventListener('click',(e)=>{e.preventDefault();switchView(localStorage.getItem('lastView')||'term');});
  });

  /* ===== designs gallery & lightbox ===== */
  const dgGridTerm=document.getElementById('dgGridTerm');
  const dgGridExec=document.getElementById('dgGridExec');
  const lb=document.getElementById('lb');
  const lbImg=document.getElementById('lbImg');
  const lbClose=document.getElementById('lbClose');
  const lbPrev=document.getElementById('lbPrev');
  const lbNext=document.getElementById('lbNext');
  const lbCount=document.getElementById('lbCount');
  let lbIdx=0;let dImgs=[];
  if(dgGridTerm || dgGridExec){
    for(let i=1;i<=14;i++)dImgs.push(i);
    dImgs.sort(()=>Math.random()-0.5);
    let html='';
    dImgs.forEach((num,i)=>{
      html+=`<a href="#" class="dg-item" data-idx="${i}"><img src="/static/images/designs/${num}.png" alt="Design ${num}" loading="lazy"><div class="cap">Design ${num}</div></a>`;
    });
    if(dgGridTerm) dgGridTerm.innerHTML=html;
    if(dgGridExec) dgGridExec.innerHTML=html;
    document.querySelectorAll('.dg-item').forEach(el=>{
      el.addEventListener('click',e=>{e.preventDefault();lbIdx=parseInt(el.getAttribute('data-idx'));openLb();});
    });
  }
  function openLb(){updateLb();lb.classList.add('on');setTimeout(()=>lb.classList.add('show'),10);}
  function closeLb(){lb.classList.remove('show');setTimeout(()=>lb.classList.remove('on'),300);}
  function updateLb(){lbImg.src=`/static/images/designs/${dImgs[lbIdx]}.png`;lbCount.textContent=`${lbIdx+1} / ${dImgs.length}`;}
  if(lbClose)lbClose.addEventListener('click',closeLb);
  if(lbPrev)lbPrev.addEventListener('click',()=>{lbIdx=(lbIdx-1+dImgs.length)%dImgs.length;updateLb();});
  if(lbNext)lbNext.addEventListener('click',()=>{lbIdx=(lbIdx+1)%dImgs.length;updateLb();});
  if(lb)lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
  document.addEventListener('keydown',e=>{
    if(lb && lb.classList.contains('on')){
      if(e.key==='Escape')closeLb();
      if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+dImgs.length)%dImgs.length;updateLb();}
      if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%dImgs.length;updateLb();}
    }
  });

  /* ===== interactive console ===== */
  const con=document.getElementById('console'),clog=document.getElementById('clog'),cin=document.getElementById('cin');
  const hist=[];let hp=-1;let mtx=null;
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function print(html){const d=document.createElement('div');d.className='res';d.innerHTML=html;clog.appendChild(d);con.scrollTop=con.scrollHeight;}
  function echo(cmd){const d=document.createElement('div');d.className='echo';d.innerHTML='<span class="ps1">talha@khalid</span>:~$ '+esc(cmd);clog.appendChild(d);}

  /* print lines progressively (for hack / sl etc) */
  function typeOut(arr,delay){
    let k=0;
    (function n(){ if(k<arr.length){print(arr[k]);k++;setTimeout(n,delay||120);} })();
  }

  const cmds={
    help:()=>'available commands:\n  <span class="ok">about</span>      who is talha\n  <span class="ok">skills</span>     tech stack\n  <span class="ok">projects</span>   list work (open with: open &lt;name&gt;)\n  <span class="ok">experience</span> work history\n  <span class="ok">contact</span>    ways to reach me\n  <span class="ok">resume</span>     download cv\n  <span class="ok">neofetch</span>   system info\n  <span class="ok">theme</span>      toggle light / dark terminal\n  <span class="ok">clear</span>      wipe the screen\n  <span class="warn">coffee · sudo · matrix · hack · cowsay · banner · history · weather · sl · echo · date</span>  (✨ fun)\n  <span class="dim"># psst: there\'s a hidden konami code 🎮</span>',
    about:()=>'talha khalid — full stack python engineer.\nloves diving into code complexity, ships end-to-end web products, and cares about UI/UX.',
    skills:()=>'python · django · flask · html · css · javascript\n+ tkinter, kivy, rest apis, and whatever a project needs.',
    projects:()=>'<span class="ok">share-beam</span>   flutter / dart / rust\n<span class="ok">ciro-app</span>     python / flutter / django\n<span class="ok">blockx</span>       javascript / chrome extension\n<span class="ok">luxe-perfume</span> django / jinja / js\n<span class="ok">proomo</span>       django / python / js\n\ntip: <span class="warn">open &lt;name&gt;</span> to launch a repo.',
    experience:()=>'2024–now  freelance software developer @ self-employed\n2025–26   full stack python engineer @ yoma org\n2023–24   software engineer intern @ it vision solutions',
    contact:()=>'email     <a href="mailto:talhakhalidlkp@gmail.com">talhakhalidlkp@gmail.com</a>\ngithub    <a href="https://github.com/talha-khallid" target="_blank" rel="noopener noreferrer">@Talha-Khallid</a>\nlinkedin  <a href="https://www.linkedin.com/in/talha-khallid" target="_blank" rel="noopener noreferrer">@Talha-Khallid</a>\nthreads   <a href="https://www.threads.com/@talha_khallid" target="_blank" rel="noopener noreferrer">@Talha_Khallid</a>',
    resume:()=>{window.open('/static/data/resume.pdf','_blank');return 'opening <span class="ok">./resume.pdf</span> ...';},
    date:()=>new Date().toString(),
    whoami:()=>'talha',
    ls:()=>'about  skills  projects  experience  contact  resume',
    pwd:()=>'/home/talha/portfolio',
    repo:()=>{window.open('https://github.com/talha-khallid','_blank','noopener');return 'opening <span class="ok">github.com/talha-khallid</span> ...';},
    social:()=>'github   <a href="https://github.com/talha-khallid" target="_blank" rel="noopener noreferrer">@Talha-Khallid</a>\nlinkedin <a href="https://www.linkedin.com/in/talha-khallid" target="_blank" rel="noopener noreferrer">@Talha-Khallid</a>\nthreads  <a href="https://www.threads.com/@talha_khallid" target="_blank" rel="noopener noreferrer">@Talha_Khallid</a>',
    coffee:()=>'    ( (\n     ) )\n  ........\n  |      |]   brewing... ☕ stay caffeinated.\n  \\      /\n   `----\'',
    sudo:(a)=>'<span class="err">talha is not in the sudoers file. this incident will be reported.</span> 😈',
    matrix:()=>{startMatrix();return '<span class="ok">wake up... entering the matrix. (press any key)</span>';},
    echo:(a)=>a.length?esc(a.join(' ')):'',
    neofetch:()=>'<span class="cyn">  .--.</span>      <span class="ok">talha</span>@<span class="ok">khalid</span>\n<span class="cyn"> |o_o |</span>     ----------------\n<span class="cyn"> |:_/ |  &lt;/&gt;</span>  <span class="grn">os</span>      : TalhaOS x86_64\n<span class="cyn">//   \\ \\</span>   <span class="grn">kernel</span>  : python-3.12\n<span class="cyn">(|   | )</span>    <span class="grn">shell</span>   : zsh 5.9\n<span class="cyn">/\'\\_ _/`\\</span>   <span class="grn">stack</span>   : django / flask / js\n<span class="cyn">\\___)=(__/</span>  <span class="grn">status</span>  : ● available for work\n             <span class="grn">coffee</span>  : <span class="ok">████████</span><span class="dim">░░</span> 80%',
    theme:()=>{const dark=document.body.classList.toggle('dev-dark');localStorage.setItem('devTheme',dark?'dark':'light');return dark?'<span class="ok">dark CRT mode enabled.</span> 🌙':'<span class="ok">light mode enabled.</span> ☀️';},
    history:()=>hist.length?hist.slice().reverse().map((h,i)=>'  '+(i+1)+'  '+esc(h)).join('\n'):'<span class="dim">no history yet.</span>',
    banner:()=>'<span class="grn"> _____  _    _     _   _    _    \n|_   _|/ \\  | |   | | | |  / \\   \n  | | / _ \\ | |   | |_| | / _ \\  \n  | |/ ___ \\| |___|  _  |/ ___ \\ \n  |_/_/   \\_\\_____|_| |_/_/   \\_\\</span>',
    cowsay:(a)=>{const msg=a.length?a.join(' '):'moo! hire talha 🐄';const top=' '+'_'.repeat(msg.length+2);const bot=' '+'-'.repeat(msg.length+2);return esc(top)+'\n&lt; '+esc(msg)+' &gt;\n'+esc(bot)+'\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||';},
    weather:()=>{const w=['☀️ lahore: 33°C, sunny — perfect coding weather','⛅ lahore: 28°C, partly cloudy','🌧️ lahore: 24°C, light rain — extra coffee recommended','🌙 lahore: clear night, 21°C'];return w[Math.floor(Math.random()*w.length)];},
    hack:()=>{typeOut(['<span class="grn">[*] initializing exploit framework...</span>','<span class="grn">[*] scanning ports... 22 80 443 open</span>','<span class="yel">[+] bypassing firewall...</span>','<span class="yel">[+] injecting payload... 38%... 71%... 100%</span>','<span class="ok">[✓] access granted. just kidding 😄 — i build things, not break them.</span>'],260);return null;},
    sl:()=>'      ====        ________\n  _D _|  |_______/        \\__\nch choo!  |  |  ___   ___ \'  |\n  |_______|_|___|___|___|__|\n   choo choo 🚂  (you typed `sl` instead of `ls`)',
    exit:()=>'<span class="warn">nice try — you can\'t escape a portfolio this cool. 😎</span>',
    'rm':(a)=>a.join(' ').includes('-rf')?'<span class="err">whoa! permission denied. that\'s how careers end. 🛑</span>':'<span class="err">rm: missing operand</span>',
    clear:()=>{clog.innerHTML='';return null;}
  };
  const alias={proj:'projects',exp:'experience',work:'projects',cls:'clear',man:'help','?':'help',gh:'repo'};
  function run(raw){
    const line=raw.trim();if(!line){echo('');return;}
    echo(line);
    const parts=line.split(/\s+/);let name=parts[0].toLowerCase();const args=parts.slice(1);
    if(alias[name])name=alias[name];
    const fn=cmds[name];
    if(!fn){print('<span class="err">command not found: '+esc(parts[0])+'</span> — type <span class="ok">help</span>');return;}
    const out=fn(args);if(out!==null&&out!==undefined&&out!=='')print(out);
  }
  cin.addEventListener('keydown',e=>{
    if(e.key==='Enter'){const v=cin.value;if(v.trim())hist.unshift(v);hp=-1;cin.value='';run(v);}
    else if(e.key==='ArrowUp'){if(hist.length){hp=Math.min(hp+1,hist.length-1);cin.value=hist[hp];setTimeout(()=>cin.setSelectionRange(cin.value.length,cin.value.length),0);}e.preventDefault();}
    else if(e.key==='ArrowDown'){if(hp>0){hp--;cin.value=hist[hp];}else{hp=-1;cin.value='';}e.preventDefault();}
    else if(e.key==='Tab'){e.preventDefault();const p=cin.value.toLowerCase();const hit=Object.keys(cmds).find(c=>c.startsWith(p)&&p);if(hit)cin.value=hit;}
  });
  con.addEventListener('click',()=>cin.focus());

  /* restore saved dev theme */
  if(localStorage.getItem('devTheme')==='dark')document.body.classList.add('dev-dark');

  /* konami code easter egg */
  const konami=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kpos=0;
  document.addEventListener('keydown',e=>{
    const k=e.key.length===1?e.key.toLowerCase():e.key;
    if(k===konami[kpos]){kpos++;if(kpos===konami.length){kpos=0;partyMode();}}
    else{kpos=(k===konami[0])?1:0;}
  });
  function partyMode(){
    let n=0;const iv=setInterval(()=>{
      const hue=(n*40)%360;
      document.documentElement.style.setProperty('--grn','hsl('+hue+',70%,45%)');
      document.documentElement.style.setProperty('--cyn','hsl('+((hue+120)%360)+',70%,45%)');
      document.documentElement.style.setProperty('--mag','hsl('+((hue+240)%360)+',70%,50%)');
      n++;if(n>40){clearInterval(iv);document.documentElement.style.removeProperty('--grn');document.documentElement.style.removeProperty('--cyn');document.documentElement.style.removeProperty('--mag');}
    },80);
    glitch();
  }

  /* matrix easter egg */
  function startMatrix(){
    if(mtx)return;
    const cv=document.createElement('canvas');cv.style.cssText='position:fixed;inset:0;z-index:300;background:#000';document.body.appendChild(cv);
    const ctx=cv.getContext('2d');let W,H,cols,drops;
    function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;cols=Math.floor(W/14);drops=Array(cols).fill(1);}
    size();const ch='アイウエオカキクケコサシスセソｱｲｳ01<>{}[];=$#'.split('');
    mtx=setInterval(()=>{ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#5ef38c';ctx.font='14px monospace';
      drops.forEach((y,i)=>{const t=ch[Math.floor(Math.random()*ch.length)];ctx.fillText(t,i*14,y*14);if(y*14>H&&Math.random()>.975)drops[i]=0;drops[i]++;});},55);
    const stop=()=>{clearInterval(mtx);mtx=null;cv.remove();removeEventListener('keydown',stop);removeEventListener('click',stop);};
    addEventListener('keydown',stop);setTimeout(()=>addEventListener('click',stop),300);
  }
})();