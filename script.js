// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Handle navbar background on scroll
function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll);

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.section-header, .about-text, .quote-card, .clinic-card, .feature-card, .invest-card, .cause-card, .story-card, .book-card, .connect-card, .value-item, .portfolio-item').forEach(el => {
    el.classList.add('animate-element');
    animateOnScroll.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .feature-card.animate-element,
    .cause-card.animate-element,
    .book-card.animate-element,
    .connect-card.animate-element,
    .value-item.animate-element,
    .portfolio-item.animate-element {
        transition-delay: calc(var(--delay, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Add staggered delays to grouped elements
document.querySelectorAll('.feature-card, .cause-card, .book-card, .connect-card, .value-item, .portfolio-item').forEach((el, index) => {
    el.style.setProperty('--delay', index % 6);
});

// ===== Counter Animation for Stats =====
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasK = text.includes('K');
    const hasCr = text.includes('Cr');

    let value = parseFloat(text.replace(/[^0-9.]/g, ''));

    if (hasK) {
        value = value;
    }

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
            current = value;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (hasK) {
            displayValue = current.toFixed(1);
        }

        let suffix = '';
        if (hasPlus) suffix += '+';
        if (hasK) suffix = 'K' + (hasPlus ? '+' : '');
        if (hasCr) suffix = ' Cr' + (hasPlus ? '+' : '');

        element.textContent = displayValue + suffix;
    }, stepTime);
}

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

function handleParallax() {
    if (window.innerWidth > 768) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }
}

window.addEventListener('scroll', handleParallax);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for navbar scroll state
    handleNavScroll();

    // Log welcome message
    console.log('%c Welcome to Dr. Aniruddha Malpani\'s Website ',
        'background: #1a365d; color: #d69e2e; font-size: 16px; padding: 10px; border-radius: 5px;');
});

// ===== Preloader (optional enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
