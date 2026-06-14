        (function () {
            const root = document.documentElement;

            /* theme */
            const tt = document.getElementById('tt');
            const stored = localStorage.getItem('theme');
            const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (dark) root.classList.add('dark');
            const sync = () => tt.textContent = root.classList.contains('dark') ? '[ dark ]' : '[ light ]'; sync();
            tt.addEventListener('click', () => { root.classList.toggle('dark'); localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); sync(); });

            /* splash with counter */
            window.addEventListener('load', () => {
                const sp = document.getElementById('splash'), sn = document.getElementById('snum');
                let n = 0; const t = setInterval(() => { n += Math.floor(Math.random() * 9) + 3; if (n >= 100) { n = 100; clearInterval(t); } sn.textContent = String(n).padStart(3, '0'); }, 90);
                setTimeout(() => { sp.classList.add('hidden'); document.body.classList.remove('loading'); revealNow(); }, 1700);
            });

            /* mobile menu */
            const burger = document.getElementById('burger'), nav = document.getElementById('nav');
            burger.addEventListener('click', () => { nav.classList.toggle('open'); burger.textContent = nav.classList.contains('open') ? 'Close' : 'Menu'; });
            nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.textContent = 'Menu'; }));

            /* progress */
            const prog = document.getElementById('prog');
            addEventListener('scroll', () => { const h = document.documentElement.scrollHeight - innerHeight; prog.style.width = (scrollY / h * 100) + '%'; });

            /* reveal */
            const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
            document.querySelectorAll('.rv').forEach(el => io.observe(el));
            function revealNow() { document.querySelectorAll('.rv').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }); }

            /* lerped cursor */
            const dot = document.getElementById('dot');
            let mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my;
            addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
            (function loop() { dx += (mx - dx) * .2; dy += (my - dy) * .2; dot.style.left = dx + 'px'; dot.style.top = dy + 'px'; requestAnimationFrame(loop); })();
            document.querySelectorAll('a,button').forEach(el => {
                el.addEventListener('mouseenter', () => dot.classList.add('big'));
                el.addEventListener('mouseleave', () => dot.classList.remove('big'));
            });
        })();