
document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('theme-toggle');
    const body     = document.body;

    const applyTheme = (dark) => {
        body.classList.toggle('dark-theme', dark);
        if (themeBtn) {
            themeBtn.textContent = dark ? '☀️' : '🌙';
            themeBtn.title       = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    };

    // Restore saved preference
    applyTheme(localStorage.getItem('theme') === 'dark');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = !body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyTheme(isDark);
        });
    }

    const locEl = document.getElementById('page-location');
    const modEl = document.getElementById('last-modified');
    if (locEl) locEl.textContent = window.location.href;
    if (modEl) modEl.textContent = document.lastModified;

    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
        const banner = document.getElementById('form-success');
        if (banner) {
            banner.style.display = 'block';
            // Scroll to the contact section smoothly
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }

    const contactForm = document.getElementById('contact-form');
    const nextUrlInput = document.getElementById('form-next-url');
    if (contactForm && nextUrlInput) {
        // Build: https://your-site.vercel.app/index.html?sent=1
        const absoluteRedirect = window.location.origin
            + window.location.pathname
            + '?sent=1';
        // Set it immediately (also handles any pre-render edge cases)
        nextUrlInput.value = absoluteRedirect;
        // Re-confirm on actual submit event (defensive)
        contactForm.addEventListener('submit', () => {
            nextUrlInput.value = window.location.origin
                + window.location.pathname
                + '?sent=1';
        });
    }

    // -- 3a. Single-element reveals (.reveal) --
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target); // fire once
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Targets: section titles, quotes, experience items, teaching cards, badges
    document.querySelectorAll(
        '.section-title, .quote-box, .experience-item, .teaching-card, .achievement-badge, .table-responsive, .contact-container'
    ).forEach((el) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // -- 3b. Staggered group reveals (.reveal-stagger) --
    // Each parent group gets its children revealed with an index-based delay.
    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Find all stagger children within this group
                    entry.target.querySelectorAll('.reveal-stagger').forEach((child, i) => {
                        child.style.setProperty('--stagger-i', i);
                        // Small timeout so the CSS transition-delay is applied first
                        requestAnimationFrame(() => child.classList.add('revealed'));
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    // Card grids — mark each card for stagger, observe the parent grid
    document.querySelectorAll('.card-grid, .skills-container, .hobbies-grid').forEach((grid) => {
        grid.querySelectorAll('.card, .skill-category-card, .hobby-card, .achievement-badge').forEach((child) => {
            child.classList.add('reveal-stagger');
        });
        staggerObserver.observe(grid);
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerH    = document.querySelector('header')?.offsetHeight ?? 80;
            const targetTop  = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });

    const sections   = document.querySelectorAll('section[id]');
    const navLinks   = document.querySelectorAll('nav a[href^="#"]');
    const headerH    = document.querySelector('header')?.offsetHeight ?? 80;

    const activeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.style.color = '';
                        link.style.backgroundColor = '';
                    });
                    const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                    if (active) {
                        active.style.color           = 'var(--primary-color)';
                        active.style.backgroundColor = 'rgba(79,70,229,0.08)';
                    }
                }
            });
        },
        { rootMargin: `-${headerH}px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((s) => activeObserver.observe(s));

    const pageLocEl = document.getElementById('page-location');
    const lastModEl = document.getElementById('last-modified');

    if (pageLocEl) {
        pageLocEl.textContent = window.location.href;
    }

    if (lastModEl) {
        const lastMod = new Date(document.lastModified);
        lastModEl.textContent = lastMod.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

});
