// Immediately start the loader logic to run concurrently with page rendering
(function() {
    // Immediately apply saved theme to avoid flashing
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    const splash = document.getElementById('splash-screen');
    const bar = document.getElementById('splash-loader-bar');
    const body = document.body;

    if (!splash || !bar) return;

    let progress = 0;
    
    // We want the progress to complete in around 800ms - 1100ms
    const intervalTime = 16; // ~60fps updates
    const totalTime = 800 + Math.random() * 300; 
    const increments = 100 / (totalTime / intervalTime);

    const loaderInterval = setInterval(() => {
        // Add natural organic variation to the loader speed
        const jitter = (Math.random() - 0.25) * 1.5; 
        progress += increments + jitter;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);
            
            bar.style.width = '100%';
            
            // Smoothly exit splash screen
            setTimeout(() => {
                splash.classList.add('fade-out');
                if (body) {
                    body.classList.remove('loading');
                }
                
                // Completely remove from DOM after CSS transition (0.6s) to free up resources
                setTimeout(() => {
                    splash.remove();
                }, 600);
            }, 180);
        } else {
            const displayProgress = Math.max(0, Math.floor(progress));
            bar.style.width = displayProgress + '%';
        }
    }, intervalTime);
})();

document.addEventListener('DOMContentLoaded', () => {
    const expandBtn = document.getElementById('expandBtn');
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            var grid = document.getElementById('projectsGrid');
            var btn = this;
            if (grid.classList.contains('expanded')) {
                grid.classList.remove('expanded');
                btn.innerHTML = 'show more';
            } else {
                grid.classList.add('expanded');
                btn.innerHTML = 'show less';
            }
        });
    }

    const expExpandBtn = document.getElementById('expExpandBtn');
    if (expExpandBtn) {
        expExpandBtn.addEventListener('click', function() {
            var grid = document.getElementById('expGrid');
            var btn = this;
            if (grid.classList.contains('expanded')) {
                grid.classList.remove('expanded');
                btn.innerHTML = 'show more';
            } else {
                grid.classList.add('expanded');
                btn.innerHTML = 'show less';
            }
        });
    }

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // Theme toggle click handler
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
