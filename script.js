/**
 * Personal Portfolio Interactive Controller
 * Author: Dong Van Quoc
 */
document.addEventListener('DOMContentLoaded', () => {
    const THEME_STORAGE_KEY = 'dvq_portfolio_theme';

    // 1. Theme Management (Dark / Light Mode)
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');

    const getPreferredTheme = () => {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved === 'dark' || saved === 'light') return saved;
        } catch (_) {
            // Ignore storage access errors
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggleBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            const label = btn.querySelector('.theme-label');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            if (label) {
                label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
            }
        });
    };

    let currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    themeToggleBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
            try {
                localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
            } catch (_) {
                // Ignore storage errors
            }
        });
    });

    // 2. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    mainNav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            });
        });
    }

    // 3. Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const selectedFilter = btn.getAttribute('data-filter') || 'all';

                filterButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                projectCards.forEach((card) => {
                    const categories = (card.getAttribute('data-category') || '').split(/\s+/);
                    const matches = selectedFilter === 'all' || categories.includes(selectedFilter);
                    card.classList.toggle('hidden', !matches);
                });
            });
        });
    }

    // 4. Scroll-Spy Active Navigation Highlighting
    const sections = document.querySelectorAll('main section[id], .container section[id]');
    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
        const updateActiveNav = () => {
            const scrollPosition = window.scrollY + 140;
            let currentSectionId = sections[0].getAttribute('id');

            sections.forEach((sec) => {
                if (sec.offsetTop <= scrollPosition) {
                    currentSectionId = sec.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${currentSectionId}`);
            });
        };

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    // 5. Info Button Popup Toggle (Touch & Keyboard Accessible)
    const infoButton = document.getElementById('infoButton');
    const infoPopup = document.getElementById('infoPopup');

    if (infoButton && infoPopup) {
        infoButton.addEventListener('click', (e) => {
            e.stopPropagation();
            infoPopup.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            infoPopup.classList.remove('show');
        });
    }
});

