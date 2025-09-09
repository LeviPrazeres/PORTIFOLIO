// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroButtons = document.querySelectorAll('.hero-buttons button');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobile Navigation Toggle
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

// Smooth scrolling for navigation links
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

// Hero button actions
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Ver Projetos')) {
            document.querySelector('#projetos').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (button.textContent.includes('Sobre Mim')) {
            document.querySelector('#sobre').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator action
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#sobre').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .certificate-card, .course-card, .skill-item').forEach(el => {
    observer.observe(el);
});

// Certificate and project button actions
document.querySelectorAll('.btn-certificate').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Certificado disponível para visualização!');
    });
});

document.querySelectorAll('.btn-project').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Código do projeto disponível no GitHub!');
    });
});

// Form validation for contact (if form exists)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        alert('Mensagem enviada com sucesso! Retornarei em breve.');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Social links actions
document.querySelectorAll('.social-link, .social-icon').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        } else {
            alert('Link para rede social ainda não configurado!');
        }
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateY(-5px)';
        skill.style.transition = 'transform 0.3s ease';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(0)';
    });
});

// Project cards interactive effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Contact information click to copy
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => {
        const text = item.textContent.trim();
        
        if (text.includes('@') || text.includes('+')) {
            navigator.clipboard.writeText(text).then(() => {
                // Create temporary feedback
                const feedback = document.createElement('span');
                feedback.textContent = ' (Copiado!)';
                feedback.style.color = '#28a745';
                feedback.style.fontSize = '12px';
                item.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            }).catch(() => {
                alert('Não foi possível copiar. Texto: ' + text);
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation for hero elements
    const heroElements = [
        '.hero-subtitle',
        '.hero-title', 
        '.hero-description',
        '.hero-buttons',
        '.hero-social'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

// Initialize hero elements as hidden
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = [
        '.hero-subtitle',
        '.hero-title', 
        '.hero-description',
        '.hero-buttons',
        '.hero-social'
    ];
    
    heroElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('🚀 Portfolio JavaScript carregado com sucesso!');