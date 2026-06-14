(function(){
  const root=document.documentElement;

  /* theme */
  const tt=document.getElementById('tt');
  const stored=localStorage.getItem('theme');
  if(stored==='light')root.classList.add('light');
  tt.addEventListener('click',()=>{root.classList.toggle('light');localStorage.setItem('theme',root.classList.contains('light')?'light':'dark');});

  /* ascii name */
  const art=[
" _____  _    _     _   _    _    ",
"|_   _|/ \\  | |   | | | |  / \\   ",
"  | | / _ \\ | |   | |_| | / _ \\  ",
"  | |/ ___ \\| |___|  _  |/ ___ \\ ",
"  |_/_/   \\_\\_____|_| |_/_/   \\_\\"
  ].join('\n');
  document.getElementById('ascii').textContent=art;

  /* boot sequence */
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
  const pre=document.getElementById('bootpre');let i=0;
  (function next(){
    if(i<lines.length){pre.textContent+=lines[i]+'\n';i++;setTimeout(next,150);}
    else setTimeout(finish,420);
  })();

  function finish(){
    document.getElementById('boot').classList.add('done');
    document.body.classList.remove('boot');
    const blks=[...document.querySelectorAll('.blk')];
    blks.forEach((b,k)=>setTimeout(()=>b.classList.add('in'),k*260));
    typeRole();
  }

  /* typed role */
  const roles=['full stack python engineer','python / django developer','flask + web developer','full stack web dev'];
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
  let switching=false;

  if(localStorage.getItem('view')==='exec')document.body.classList.add('view-exec');

  const bootLines=['$ ./build --target simple','> compiling views ...','> bundling assets ...','> optimizing layout ...','> done. launching.'];

  function switchView(toSimple){
    if(switching)return;switching=true;
    loader.className='loader on';
    loaderTerm.textContent='';lcBar.style.width='0%';
    /* phase 1: terminal-style typing */
    let i=0;
    (function typeLine(){
      if(i<bootLines.length){loaderTerm.textContent+=bootLines[i]+'\n';i++;setTimeout(typeLine,170);}
      else setTimeout(morph,360);
    })();
    /* phase 2: morph terminal -> clean loader */
    function morph(){
      loader.classList.add('to-clean');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{lcBar.style.width='100%';}));
      /* phase 3: swap view + reveal */
      setTimeout(()=>{
        document.body.classList.toggle('view-exec',toSimple);
        localStorage.setItem('view',toSimple?'exec':'term');
        window.scrollTo(0,0);
        loader.classList.add('fade');
        setTimeout(()=>{loader.className='loader';switching=false;},520);
      },1050);
    }
  }
  if(toExec)toExec.addEventListener('click',()=>switchView(true));
  if(toTerm)toTerm.addEventListener('click',()=>switchView(false));

  /* interactive console */
  const con=document.getElementById('console'),clog=document.getElementById('clog'),cin=document.getElementById('cin');
  const hist=[];let hp=-1;let mtx=null;
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function print(html){const d=document.createElement('div');d.className='res';d.innerHTML=html;clog.appendChild(d);con.scrollTop=con.scrollHeight;}
  function echo(cmd){const d=document.createElement('div');d.className='echo';d.innerHTML='<span class="ps1">talha@khalid</span>:~$ '+esc(cmd);clog.appendChild(d);}

  const cmds={
    help:()=>'available commands:\n  <span class="ok">about</span>      who is talha\n  <span class="ok">skills</span>     tech stack\n  <span class="ok">projects</span>   list work (open with: open &lt;name&gt;)\n  <span class="ok">experience</span> work history\n  <span class="ok">contact</span>    ways to reach me\n  <span class="ok">resume</span>     download cv\n  <span class="ok">theme</span>      toggle light/dark\n  <span class="ok">clear</span>      wipe the screen\n  <span class="warn">coffee · sudo · matrix · echo · date</span>  (✨ fun)',
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
    theme:()=>{root.classList.toggle('light');localStorage.setItem('theme',root.classList.contains('light')?'light':'dark');return 'theme → <span class="ok">'+(root.classList.contains('light')?'light':'dark')+'</span>';},
    coffee:()=>'    ( (\n     ) )\n  ........\n  |      |]   brewing... ☕ stay caffeinated.\n  \\      /\n   `----\'',
    sudo:(a)=>'<span class="err">talha is not in the sudoers file. this incident will be reported.</span> 😈',
    matrix:()=>{startMatrix();return '<span class="ok">wake up... entering the matrix. (press any key)</span>';},
    echo:(a)=>a.length?esc(a.join(' ')):'',
    open:(a)=>{const m={'share-beam':'https://github.com/talha-khallid/Share-Beam','ciro-app':'https://github.com/talha-khallid/Ciro-App','blockx':'https://github.com/talha-khallid/BlockX','luxe-perfume':'https://github.com/talha-khallid/Luxe-Perfume'};const k=(a[0]||'').toLowerCase();if(m[k]){window.open(m[k],'_blank','noopener');return 'launching <span class="ok">'+k+'</span> ...';}return '<span class="err">no project named \''+esc(a[0]||'')+'\'. try: projects</span>';},
    clear:()=>{clog.innerHTML='';return null;}
  };
  const alias={ proj:'projects', exp:'experience', work:'projects', cls:'clear', man:'help', '?':'help' };

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