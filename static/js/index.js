// Dynamic Studio Portfolio Interactions

function initPortfolio() {
    // 1. Preloader fade sequence
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500); // Fades out after 1.5 seconds loading completion
    }

    // 2. Smooth Scrolling using Lenis directly on the document body
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 3. Scroll Reveal Entrance Animations
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealCheck = () => {
        const triggerBottom = window.innerHeight * 0.88;
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealCheck);
    revealCheck(); // Initial check on load

    // 4. Simulated Interactive GitHub Contribution Pulse Grid
    const pulseGrid = document.getElementById('github-pulse-grid');
    if (pulseGrid) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Generate 180 tiles (6 months of coding)
        for (let i = 0; i < 180; i++) {
            const sq = document.createElement('div');
            sq.className = 'gh-sq';
            
            // Distribute randomized contribution densities matching real github
            const randVal = Math.random();
            let contribs = 0;
            let colorClass = 'var(--github-light)';
            
            if (randVal > 0.88) {
                contribs = Math.floor(Math.random() * 4) + 6; // Heavy days
                colorClass = 'var(--github-4)';
            } else if (randVal > 0.72) {
                contribs = Math.floor(Math.random() * 3) + 3; // Moderate days
                colorClass = 'var(--github-3)';
            } else if (randVal > 0.52) {
                contribs = Math.floor(Math.random() * 2) + 2; // Soft days
                colorClass = 'var(--github-2)';
            } else if (randVal > 0.3) {
                contribs = 1; // Minimal days
                colorClass = 'var(--github-1)';
            }
            
            sq.style.backgroundColor = colorClass;
            
            // Calculate exact calendar date going backward from today
            const date = new Date();
            date.setDate(date.getDate() - (180 - i));
            const dateString = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            
            const label = contribs === 0 
                ? `No contributions on ${dateString}` 
                : `${contribs} contribution${contribs > 1 ? 's' : ''} on ${dateString}`;
            
            // Hover Tooltip Triggers
            sq.addEventListener('mouseenter', (e) => {
                let tooltip = document.querySelector('.gh-tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'gh-tooltip';
                    tooltip.style.position = 'absolute';
                    tooltip.style.backgroundColor = '#0f172a';
                    tooltip.style.color = '#ffffff';
                    tooltip.style.padding = '6px 12px';
                    tooltip.style.borderRadius = '6px';
                    tooltip.style.fontSize = '11px';
                    tooltip.style.fontWeight = '600';
                    tooltip.style.zIndex = '99999';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.style.opacity = '0';
                    tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                    tooltip.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    tooltip.style.transform = 'translateY(5px)';
                    document.body.appendChild(tooltip);
                }
                
                tooltip.textContent = label;
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
                
                // Position above the square grid node
                const rect = sq.getBoundingClientRect();
                const tooltipX = rect.left + window.scrollX - tooltip.offsetWidth / 2 + rect.width / 2;
                const tooltipY = rect.top + window.scrollY - tooltip.offsetHeight - 8;
                
                tooltip.style.left = `${tooltipX}px`;
                tooltip.style.top = `${tooltipY}px`;
            });
            
            sq.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.gh-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(5px)';
                }
            });
            
            pulseGrid.appendChild(sq);
        }
    }

    // 5. Giant Email Connection Click-to-Copy Utility
    const emailLink = document.getElementById('huge-email-link');
    const copyTooltip = document.getElementById('copy-tooltip');
    
    if (emailLink && copyTooltip) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const rawEmail = 'talhakhalidlkp@gmail.com';
            
            navigator.clipboard.writeText(rawEmail).then(() => {
                copyTooltip.textContent = 'Copied to clipboard!';
                copyTooltip.classList.add('show');
                
                // Reset tooltip after 2.5 seconds
                setTimeout(() => {
                    copyTooltip.classList.remove('show');
                    setTimeout(() => {
                        copyTooltip.textContent = 'Click to copy';
                    }, 400);
                }, 2500);
            });
        });

        emailLink.addEventListener('mouseenter', () => {
            copyTooltip.classList.add('show');
        });

        emailLink.addEventListener('mouseleave', () => {
            if (copyTooltip.textContent !== 'Copied to clipboard!') {
                copyTooltip.classList.remove('show');
            }
        });
    }

    // 6. Smooth Scrolling for Navigation anchors
    const navAnchors = document.querySelectorAll('.nav-links a, .drawer-links a, .hero-actions a');
    navAnchors.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Bulletproof execution trigger checking document readyState
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// 7. Responsive Mobile Drawer Toggles
function toggleMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}
