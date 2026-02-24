// Scroll to top on page load/refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Cosmic background animation
const canvas = document.getElementById('stars-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

const stars = [];
const starCount = isMobile ? 50 : 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5);
        this.speedY = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5);
        this.opacity = Math.random();
        this.fadeSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeSpeed;

        if (this.opacity <= 0 || this.opacity >= 1) {
            this.fadeSpeed *= -1;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add gradient background
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(26, 26, 62, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
}

// Mouse trail effect with mobile scroll support
let mouseX = 0;
let mouseY = 0;

// Detect if device is mobile
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

console.log('Device type:', isMobileDevice ? 'Mobile' : 'Desktop');

if (!isMobileDevice) {
    // DESKTOP: Mouse trail effect
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.9) {
            createParticle(mouseX, mouseY);
        }
    });
    
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 30;
                const offsetY = (Math.random() - 0.5) * 30;
                createParticle(e.clientX + offsetX, e.clientY + offsetY);
            }, i * 30);
        }
    });
    
    console.log('✨ Desktop particle effects enabled');
} else {
    // MOBILE: Scroll-based particle effects
    let lastScrollY = window.scrollY;
    let lastScrollTime = 0;
    let scrollDirection = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const now = Date.now();
        
        // Only create particles if enough time has passed
        if (now - lastScrollTime > 100) {
            // Determine scroll direction
            scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
            
            // Create particles at random positions on screen during scroll
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
            
            createParticle(x, y);
            
            lastScrollTime = now;
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    // MOBILE: Touch tap effect (not during scroll)
    let touchStartY = 0;
    let touchStartTime = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        const touchEndY = e.changedTouches[0].clientY;
        const touchDistance = Math.abs(touchEndY - touchStartY);
        
        // If it was a tap (not a scroll), create particles
        if (touchDuration < 200 && touchDistance < 10) {
            const x = e.changedTouches[0].clientX;
            const y = e.changedTouches[0].clientY;
            
            // Create burst
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 30;
                    const offsetY = (Math.random() - 0.5) * 30;
                    createParticle(x + offsetX, y + offsetY);
                }, i * 30);
            }
        }
    }, { passive: true });
    
    console.log('✨ Mobile scroll particle effects enabled');
}

function createParticle(x, y) {
    if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
        return;
    }
    
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1200);
}

console.log('✨ Particle system initialized');

// Service panels scroll animation
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-panel').forEach(panel => {
    serviceObserver.observe(panel);
});

// Animated counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create WhatsApp message
    const message = `New Consultation Request:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.countryCode} ${data.phone}\nCountry: ${data.country}\nMessage: ${data.message}`;
    
    const whatsappUrl = `https://wa.me/61415812185?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Thank you! Redirecting you to WhatsApp...');
    contactForm.reset();
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.service-bg').forEach((bg, index) => {
        const speed = 0.5;
        bg.style.transform = `translateY(${scrolled * speed * (index % 2 === 0 ? 1 : -1)}px)`;
    });
});

// Add fade-in animation to elements
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .stat-card, .testimonial-card').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Testimonial auto-scroll
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonialCards.forEach((card, index) => {
        card.style.transform = index === testimonialIndex ? 'scale(1.05)' : 'scale(1)';
        card.style.opacity = index === testimonialIndex ? '1' : '0.7';
    });
    
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
}

setInterval(rotateTestimonials, 4000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🌟 Psychic Rama Website Loaded Successfully 🌟');

// Prevent scrolling beyond footer
window.addEventListener('scroll', () => {
    const footer = document.querySelector('footer');
    if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerBottom = footerRect.bottom;
        const windowHeight = window.innerHeight;
        
        // If footer bottom is at or above window bottom, prevent further scrolling
        if (footerBottom <= windowHeight) {
            const maxScroll = document.documentElement.scrollHeight - windowHeight;
            if (window.scrollY > maxScroll) {
                window.scrollTo(0, maxScroll);
            }
        }
    }
}, { passive: false });

// Set document height to footer bottom on load
window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    if (footer) {
        const footerBottom = footer.offsetTop + footer.offsetHeight;
        document.body.style.height = footerBottom + 'px';
        document.documentElement.style.height = footerBottom + 'px';
    }
});

// Service card navigation
document.querySelectorAll('.service-panel').forEach(panel => {
    panel.addEventListener('click', function() {
        const serviceType = this.getAttribute('data-service');
        const servicePages = {
            'psychic': 'service-psychic.html',
            'birth-chart': 'service-birth-chart.html',
            'love-spell': 'service-love-spell.html',
            'lost-love': 'service-lost-love.html',
            'marriage': 'service-marriage.html',
            'black-magic': 'service-black-magic.html',
            'evil-spirits': 'service-evil-spirits.html',
            'spiritual-healing': 'service-spiritual-healing.html',
            'kali-puja': 'service-kali-puja.html',
            'durga-puja': 'service-durga-puja.html',
            'palm-reading': 'service-palm-reading.html',
            'tarot': 'service-tarot.html',
            'lottery': 'service-lottery.html',
            'voodoo': 'service-voodoo.html',
            'witchcraft': 'service-witchcraft.html',
            'face-reading': 'service-face-reading.html'
        };
        
        if (servicePages[serviceType]) {
            window.location.href = servicePages[serviceType];
        }
    });
});
