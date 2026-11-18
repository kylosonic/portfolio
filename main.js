/* ============================================================
   NAHOM GIRMA — PORTFOLIO
   Main JavaScript — Interactions & Animations
   ============================================================ */

// ==================== MOBILE NAV ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function setNavState(isOpen) {
    navToggle?.setAttribute('aria-expanded', String(isOpen));
    navToggle?.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);

    if (window.innerWidth <= 768) {
        navMenu?.toggleAttribute('inert', !isOpen);
    } else {
        navMenu?.removeAttribute('inert');
    }
}

if (window.innerWidth <= 768) setNavState(false);

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('show-menu');
        navMenu.classList.toggle('show-menu', !isOpen);
        setNavState(!isOpen);
        if (!isOpen) navClose?.focus();
    });
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        setNavState(false);
        navToggle?.focus();
    });
}
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        setNavState(false);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu?.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        setNavState(false);
        navToggle?.focus();
    }

    if (event.key === 'Tab' && navMenu?.classList.contains('show-menu')) {
        const focusable = [navClose, ...navLinks].filter(Boolean);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

document.addEventListener('click', (event) => {
    if (!navMenu?.classList.contains('show-menu')) return;
    if (event.target.closest('.nav')) return;

    navMenu.classList.remove('show-menu');
    setNavState(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu?.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        setNavState(false);
    }
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

// ==================== SCROLL TO TOP BUTTON ====================
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

let scrollFrame = 0;
window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
        scrollHeader();
        scrollActive();
        scrollUp();
        scrollFrame = 0;
    });
}, { passive: true });
scrollHeader();
scrollActive();
scrollUp();

// ==================== DARK / LIGHT THEME ====================
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

let selectedTheme = null;
let selectedIcon = null;
try {
    selectedTheme = localStorage.getItem('selected-theme');
    selectedIcon = localStorage.getItem('selected-icon');
} catch {
    selectedTheme = null;
    selectedIcon = null;
}

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

function updateThemeControl() {
    const isDark = document.body.classList.contains(darkTheme);
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

updateThemeControl();

themeButton?.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    updateThemeControl();
    try {
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    } catch {
        // Theme switching still works when storage is unavailable.
    }
});

// ==================== QUALIFICATION TABS ====================
const qualTabs = document.querySelectorAll('.qualification__tab');
const qualContents = document.querySelectorAll('.qualification__content');

function activateQualificationTab(tab) {
    const target = document.querySelector(tab.dataset.target);
    if (!target) return;

    qualTabs.forEach(item => {
        item.classList.remove('qualification__tab--active');
        item.setAttribute('aria-selected', 'false');
        item.setAttribute('tabindex', '-1');
    });
    qualContents.forEach(content => content.classList.remove('qualification__content--active'));

    tab.classList.add('qualification__tab--active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    target.classList.add('qualification__content--active');
}

qualTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateQualificationTab(tab));
    tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextTab = qualTabs[(index + direction + qualTabs.length) % qualTabs.length];
        activateQualificationTab(nextTab);
        nextTab.focus();
    });
});

// ==================== SKILL MODALS ====================
const skillTriggers = document.querySelectorAll('.skills__card-trigger');
const skillModals = document.querySelectorAll('.skill-modal');
const skillModalCloses = document.querySelectorAll('.skill-modal__close');
let lastFocusedElement = null;

function closeSkillModals(restoreFocus = true) {
    skillModals.forEach(modal => {
        modal.classList.remove('active');
        window.setTimeout(() => {
            if (!modal.classList.contains('active')) modal.hidden = true;
        }, 350);
    });
    document.body.style.overflow = '';

    if (restoreFocus && lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function openSkillModal(trigger) {
    const card = trigger.closest('.skills__card');
    if (!card) return;

    const skillName = card.dataset.skill;
    const modal = document.getElementById('skill-modal-' + skillName);
    if (!modal) return;

    lastFocusedElement = trigger;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
        modal.classList.add('active');
        modal.querySelector('.skill-modal__close')?.focus();
    }, 20);
}

// Open modal from the native button inside each skill card.
skillTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => openSkillModal(trigger));
});

// Close modal on X button
skillModalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
        closeSkillModals();
    });
});

// Close modal on backdrop click
skillModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSkillModals();
        }
    });
});

// Close modal on Escape key and keep keyboard focus inside the open dialog.
document.addEventListener('keydown', (e) => {
    const openModal = document.querySelector('.skill-modal.active');

    if (e.key === 'Escape' && openModal) {
        closeSkillModals();
        return;
    }

    if (e.key === 'Tab') {
        if (!openModal) return;

        const focusable = [...openModal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// ==================== SCROLL REVEAL (Intersection Observer) ====================
const revealElements = document.querySelectorAll('.reveal');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;

            window.setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('active'));
}

// ==================== HERO ENTRANCE ANIMATION ====================
window.addEventListener('load', () => {
    if (reducedMotion.matches) return;

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
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.getElementById(targetId.slice(1));
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPos = target.getBoundingClientRect().top;
            const offsetPos = elementPos + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPos,
                behavior: reducedMotion.matches ? 'auto' : 'smooth'
            });
        }
    });
});

// ==================== PARALLAX BLOBS (subtle) ====================
if (finePointer.matches && !reducedMotion.matches) {
    const blobs = document.querySelectorAll('.hero__blob');
    let parallaxFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
        if (parallaxFrame) return;

        parallaxFrame = window.requestAnimationFrame(() => {
            blobs.forEach((blob, index) => {
                const factor = (index + 1) * 8;
                blob.style.transform = `translate(${pointerX * factor}px, ${pointerY * factor}px)`;
            });
            parallaxFrame = 0;
        });
    }, { passive: true });
}
