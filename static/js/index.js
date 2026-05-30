document.addEventListener('DOMContentLoaded', () => {
    const expandBtn = document.getElementById('expandBtn');
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            var grid = document.getElementById('projectsGrid');
            var btn = this;
            if (grid.classList.contains('expanded')) {
                grid.classList.remove('expanded');
                btn.textContent = 'Show more';
            } else {
                grid.classList.add('expanded');
                btn.textContent = 'Show less';
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
});
