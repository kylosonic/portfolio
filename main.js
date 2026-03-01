/* ============================================================
   NAHOM GIRMA — PORTFOLIO
   Main JavaScript — Interactions & Animations
   ============================================================ */

// ==================== MOBILE NAV ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ==================== SCROLL HEADER ====================
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector('.nav__link[href*="' + sectionId + '"]');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ==================== SCROLL TO TOP BUTTON ====================
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// ==================== DARK / LIGHT THEME ====================
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// ==================== QUALIFICATION TABS ====================
const qualTabs = document.querySelectorAll('.qualification__tab');
const qualContents = document.querySelectorAll('.qualification__content');

qualTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        // Remove active from all
        qualTabs.forEach(t => t.classList.remove('qualification__tab--active'));
        qualContents.forEach(c => c.classList.remove('qualification__content--active'));

        // Add active
        tab.classList.add('qualification__tab--active');
        target.classList.add('qualification__content--active');
    });
});

// ==================== SCROLL REVEAL (Intersection Observer) ====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animations slightly
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==================== HERO ENTRANCE ANIMATION ====================
window.addEventListener('load', () => {
    // Staggered entrance for hero elements
    const heroPhoto = document.querySelector('.hero__photo');
    const heroName = document.querySelector('.hero__name');
    const heroTitle = document.querySelector('.hero__title');
    const heroBadge = document.querySelector('.hero__badge');

    if (heroPhoto) {
        heroPhoto.style.opacity = '0';
        heroPhoto.style.transform = 'translateY(30px)';
        heroPhoto.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            heroPhoto.style.opacity = '1';
            heroPhoto.style.transform = 'translateY(0)';
        }, 200);
    }
    if (heroName) {
        heroName.style.opacity = '0';
        heroName.style.transform = 'translateY(30px)';
        heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            heroName.style.opacity = '1';
            heroName.style.transform = 'translateY(0)';
        }, 500);
    }
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 700);
    }
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'scale(0.5)';
        heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'scale(1)';
        }, 900);
    }
});

// ==================== SMOOTH ANCHOR SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPos = target.getBoundingClientRect().top;
            const offsetPos = elementPos + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BADGE CLICK -> SCROLL TO CONTACT ====================
const heroBadge = document.getElementById('hero-badge');
if (heroBadge) {
    heroBadge.addEventListener('click', () => {
        const contact = document.getElementById('contact');
        if (contact) {
            const headerOffset = 80;
            const elementPos = contact.getBoundingClientRect().top;
            const offsetPos = elementPos + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPos, behavior: 'smooth' });
        }
    });
}

// ==================== PARALLAX BLOBS (subtle) ====================
window.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.hero__blob');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach((blob, i) => {
        const factor = (i + 1) * 8;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});
