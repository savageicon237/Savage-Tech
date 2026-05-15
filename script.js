// ============ EMAILJS CONFIGURATION (REPLACE WITH YOUR KEYS) ============
// Step 1: Go to emailjs.com and sign up (free)
// Step 2: Add Email Service (connect your Gmail)
// Step 3: Create Email Template with these variables:
//         {{from_name}}, {{from_email}}, {{phone}}, {{service}}, {{message}}
// Step 4: Copy your keys below

const EMAILJS_PUBLIC_KEY = "5Hd33KSB9u3B7gHEl";
const EMAILJS_SERVICE_ID = "service_mxukbgl ";
const EMAILJS_TEMPLATE_ID = "    template_yzk74dn ";

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}

// ============ PRELOADER ============
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// ============ CUSTOM CURSOR ============
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
}

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 7, 15, 0.98)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.background = 'rgba(7, 7, 15, 0.95)';
        navbar.style.padding = '0';
    }
});

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target;
        }
    });
};

// Trigger counters when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

counters.forEach(counter => {
    const parent = counter.closest('.stat');
    if (parent) counterObserver.observe(parent);
});

// ============ PARTICLES EFFECT ============
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// ============ MOBILE MENU ============
function toggleMenu() {
    const menu = document.getElementById('mobileNav');
    if (menu) menu.classList.toggle('show');
}

function closeMenu() {
    const menu = document.getElementById('mobileNav');
    if (menu) menu.classList.remove('show');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ============ PORTFOLIO DATA ============
const portfolioItems = [
    { title: "TechJar Computers", category: "web", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=TechJar" },
    { title: "George's Corner Restaurant", category: "web", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=Restaurant" },
    { title: "Savage Brand Identity", category: "branding", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=Branding" },
    { title: "Local Business Ad Campaign", category: "marketing", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=Marketing" },
    { title: "Corporate Website", category: "web", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=Corporate" },
    { title: "Startup Branding Package", category: "branding", image: "https://placehold.co/600x400/1a1a2e/6366f1?text=Startup+Brand" }
];

function loadPortfolio(filter = 'all') {
    const container = document.getElementById('portfolioGrid');
    if (!container) return;
    
    const filtered = filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === filter);
    
    container.innerHTML = filtered.map(item => `
        <div class="portfolio-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.category === 'web' ? 'Web Development' : item.category === 'branding' ? 'Branding' : 'Digital Marketing'}</p>
            </div>
        </div>
    `).join('');
}

// Portfolio filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        loadPortfolio(filter);
    });
});

// ============ TESTIMONIALS DATA ============
const testimonials = [
    { name: "John D.", role: "Business Owner", text: "Savage Tech transformed our online presence completely. Our sales have increased by 200% since launching our new website!", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Sarah M.", role: "Restaurant Owner", text: "The branding work they did for our restaurant is exceptional. We've received so many compliments!", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Paul T.", role: "Startup Founder", text: "Professional, creative, and delivered ahead of schedule. Highly recommend Savage Tech for any digital project.", image: "https://randomuser.me/api/portraits/men/2.jpg" }
];

function loadTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;
    
    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <i class="fas fa-quote-left"></i>
            <p>${t.text}</p>
            <div class="client-info">
                <img src="${t.image}" alt="${t.name}">
                <div>
                    <h4>${t.name}</h4>
                    <span>${t.role}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============ CONTACT FORM WITH EMAILJS BACKEND ============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone')?.value || '';
        const service = document.getElementById('service')?.value || '';
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showStatus('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare email content
        const fullMessage = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interested In: ${service || 'Not specified'}

Message:
${message}
        `;
        
        // Send to lilicon2331@gmail.com via EmailJS
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name: name,
                    from_email: email,
                    phone: phone || 'Not provided',
                    service: service || 'Not specified',
                    message: message,
                    to_email: "lilicon2331@gmail.com"
                });
                
                showStatus('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Email error:', error);
                showStatus('Failed to send message. Please WhatsApp us directly or try again.', 'error');
            }
        } else {
            // Fallback - store in localStorage (for testing without EmailJS)
            const messages = JSON.parse(localStorage.getItem('savageTechMessages') || '[]');
            messages.push({ name, email, phone, service, message, date: new Date().toISOString() });
            localStorage.setItem('savageTechMessages', JSON.stringify(messages));
            showStatus('Message saved locally! (EmailJS not configured - check console for setup instructions)', 'warning');
            contactForm.reset();
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function showStatus(message, type) {
    if (!formStatus) return;
    
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b'
    };
    
    formStatus.innerHTML = `<div style="padding: 12px; border-radius: 10px; margin-top: 15px; background: rgba(${type === 'success' ? '34,197,94' : type === 'error' ? '239,68,68' : '245,158,11'}, 0.1); color: ${colors[type]};">${message}</div>`;
    
    setTimeout(() => {
        formStatus.innerHTML = '';
    }, 5000);
}

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .value-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============ SCROLL REVEAL FOR SECTIONS ============
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ============ SMOOTH SCROLL FOR NAVIGATION ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#0') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============ INITIALIZE ALL ============
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio('all');
    loadTestimonials();
    
    // Add animation classes
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});