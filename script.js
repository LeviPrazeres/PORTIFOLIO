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
        if (button.textContent.includes('Ver Projetos') || button.textContent.includes('View Projects')) {
            document.querySelector('#projetos').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (button.textContent.includes('Sobre Mim') || button.textContent.includes('About Me')) {
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
document.querySelectorAll('.btn-certificate').forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Map certificates to their respective PDF files
        const certificateFiles = [
            'diploma-tecnologia.pdf',           // Diploma de Tecnólogo
            'certificado-algoritmo.pdf',        // Algoritmo
            'certificado-html-modulo1.pdf',     // HTML5 e CSS3 Módulo 1
            'certificado-html-modulo2.pdf'      // HTML5 e CSS3 Módulo 2
        ];
        
        if (certificateFiles[index]) {
            window.open(certificateFiles[index], '_blank');
        } else {
            alert('Certificado disponível para visualização!');
        }
    });
});

document.querySelectorAll('.btn-project').forEach(button => {
    button.addEventListener('click', (e) => {
        // Only prevent default if it's not a link with href
        if (!button.hasAttribute('href')) {
            e.preventDefault();
            alert('Código do projeto disponível no GitHub!');
        }
        // If it has href, let the link work normally
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

// Initialize typing effect after page load - DISABLED
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 80);
//         }, 500);
//     }
// });

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

// Parallax effect and fade out for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        // Parallax effect
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Fade out effect when scrolling down
        const fadeStart = window.innerHeight * 0.1; // Start fading at 10% of viewport height
        const fadeEnd = window.innerHeight * 0.5; // Complete fade at 50% of viewport height
        
        if (scrolled > fadeStart) {
            const fadeProgress = Math.min((scrolled - fadeStart) / (fadeEnd - fadeStart), 1);
            const opacity = 1 - fadeProgress;
            heroImage.style.opacity = opacity;
            heroImage.style.transition = 'opacity 0.3s ease';
        } else {
            heroImage.style.opacity = '1';
        }
    }
});

// Loading animation - DISABLED FOR STATIC DISPLAY
// window.addEventListener('load', () => {
//     document.body.classList.add('loaded');
//     
//     // Stagger animation for hero elements
//     const heroElements = [
//         '.hero-subtitle',
//         '.hero-title', 
//         '.hero-description',
//         '.hero-buttons',
//         '.hero-social'
//     ];
//     
//     heroElements.forEach((selector, index) => {
//         const element = document.querySelector(selector);
//         if (element) {
//             setTimeout(() => {
//                 element.style.opacity = '1';
//                 element.style.transform = 'translateY(0)';
//             }, index * 200);
//         }
//     });
// });

// Initialize hero elements as hidden - DISABLED FOR STATIC DISPLAY
// document.addEventListener('DOMContentLoaded', () => {
//     const heroElements = [
//         '.hero-subtitle',
//         '.hero-title', 
//         '.hero-description',
//         '.hero-buttons',
//         '.hero-social'
//     ];
//     
//     heroElements.forEach(selector => {
//         const element = document.querySelector(selector);
//         if (element) {
//             element.style.opacity = '0';
//             element.style.transform = 'translateY(20px)';
//             element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         }
//     });
// });

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

// Translation system
const translations = {
    pt: {
        // Navigation
        'nav-sobre': 'Sobre',
        'nav-formacao': 'Formação',
        'nav-certificados': 'Certificados',
        'nav-habilidades': 'Habilidades',
        'nav-projetos': 'Projetos',
        'nav-contato': 'Contato',
        'brand-title': 'Analista e Desenvolvedor de Sistemas',
        
        // Hero Section
        'hero-title': 'ESTUDANTE DE ADS &<br>DESENVOLVEDOR WEB',
        'hero-description': 'Olá, me chamo Levi<br>Focado em criar experiências digitais modernas e funcionais. Cursando Análise e Desenvolvimento de Sistemas com paixão por tecnologias web e design de interfaces.',
        'btn-projects': 'Ver Projetos ↓',
        'btn-about': 'Sobre Mim',
        
        // About Section
        'about-subtitle': 'SOBRE MIM',
        'about-title': 'Desenvolvedor em formação com foco em experiências digitais',
        'about-text-1': 'Sou formado em Análise e Desenvolvimento de Sistemas, apaixonado por criar soluções web que combinam funcionalidade e design. Minha jornada na programação começou com curiosidade e evoluiu para uma dedicação constante ao aprendizado.',
        'about-text-2': 'Tenho experiência prática com desenvolvimento front-end e back-end, sempre buscando as melhores práticas e tecnologias mais atuais do mercado.',
        'tag-1': 'Proativo',
        'tag-2': 'Detalhista',
        'tag-3': 'Criativo',
        'tag-4': 'Colaborativo',
        
        // Education Section
        'education-subtitle': 'FORMAÇÃO ACADÊMICA',
        'education-title': 'Minha jornada educacional',
        'education-course': 'Análise e Desenvolvimento de Sistemas',
        'education-institution': 'Uniasselvi',
        'education-period': '2023 - 2025 (formado)',
        'education-description': 'Curso tecnólogo focado em desenvolvimento de software, análise de sistemas, banco de dados e metodologias ágeis, com aprofundamento em programação web, mobile e gestão de projetos de TI. Formação voltada para a aplicação prática de soluções tecnológicas inovadoras, alinhadas às demandas do mercado de software.',
        'course-1-title': 'Desenvolvimento Web Completo',
        'course-1-platform': 'Plataforma Online • 2023',
        'course-1-description': 'JavaScript, React, Node.js, MongoDB, Lua, C# - Do front-end ao back-end.',
        'course-2-title': 'Banco de Dados e SQL',
        'course-2-platform': 'Certificação • 2023',
        'course-2-description': 'Modelagem, otimização e administração de bancos relacionais.',
        
        // Certificates Section
        'certificates-subtitle': 'CERTIFICAÇÕES',
        'certificates-title': 'Meus certificados',
        'cert-1-title': 'Diploma de Tecnólogo em Análise e Desenvolvimento de Sistemas',
        'cert-1-platform': 'Curso Superior de Tecnologia',
        'cert-1-year': '11 de agosto de 2025',
        'cert-2-title': 'Algoritmo',
        'cert-2-platform': 'Curso em videoaula',
        'cert-2-year': '16 de dezembro de 2024',
        'cert-3-title': 'Curso HTML5 e CSS3: Módulo 1 de 5',
        'cert-3-platform': 'Curso em videoaula',
        'cert-3-year': '27 de dezembro de 2024',
        'cert-4-title': 'Curso HTML5 e CSS3: Módulo 2 de 5',
        'cert-4-platform': 'Curso em videoaula',
        'cert-4-year': '24 de abril de 2025',
        'btn-certificate': 'Ver certificado',
        
        // Skills Section
        'skills-subtitle': 'HABILIDADES',
        'skills-title': 'Tecnologias & Ferramentas',
        'skills-frontend': 'Frontend',
        'skills-backend': 'Backend',
        'skills-tools': 'Ferramentas',
        
        // Projects Section
        'projects-subtitle': 'PROJETOS',
        'projects-title': 'Alguns dos meus trabalhos',
        'project-1-title': 'ClientNexus - Sistema de Gerenciamento de Clientes',
        'project-1-description': 'Um sistema moderno e responsivo para gerenciamento de clientes, construído com tecnologias de ponta e interface intuitiva. Inclui dashboard completo, relatórios avançados e tema noturno elegante.',
        'project-2-title': 'Stylus Concept - Catálogo Online',
        'project-2-description': 'Catálogo online de moda com visualização de produtos, filtros avançados e integração com WhatsApp para contato.',
        'btn-code': 'Código',
        'btn-site': 'Ver Site',
        
        // Contact Section
        'contact-subtitle': 'PRECISA DE UM DESENVOLVEDOR?',
        'contact-title': 'Vamos trabalhar juntos →',
        'contact-info-title': 'Informações de contato',
        'contact-info-text': 'Sinta-se à vontade para entrar em contato comigo a qualquer momento. Prefiro conversar por email, especialmente porque podemos estar em fusos horários diferentes.',
        'availability-title': 'Disponibilidade atual',
        'availability-text': 'Atualmente trabalho em vários projetos pessoais, mas estarei feliz em discutir novas oportunidades.',
        'availability-status': 'Disponível para novos projetos',
        'social-title': 'Me siga em',
        
        // Footer
        'footer-quote': 'Sempre aprendendo, sempre evoluindo',
        'footer-copyright': '© 2025 Levi. Todos os direitos reservados.'
    },
    en: {
        // Navigation
        'nav-sobre': 'About',
        'nav-formacao': 'Education',
        'nav-certificados': 'Certificates',
        'nav-habilidades': 'Skills',
        'nav-projetos': 'Projects',
        'nav-contato': 'Contact',
        'brand-title': 'Systems Analyst and Developer',
        
        // Hero Section
        'hero-title': 'ADS STUDENT &<br>WEB DEVELOPER',
        'hero-description': 'Hello, my name is Levi<br>Focused on creating modern and functional digital experiences. Studying Systems Analysis and Development with passion for web technologies and interface design.',
        'btn-projects': 'View Projects ↓',
        'btn-about': 'About Me',
        
        // About Section
        'about-subtitle': 'ABOUT ME',
        'about-title': 'Developer in training focused on digital experiences',
        'about-text-1': 'I graduated in Systems Analysis and Development, passionate about creating web solutions that combine functionality and design. My programming journey started with curiosity and evolved into constant dedication to learning.',
        'about-text-2': 'I have practical experience with front-end and back-end development, always seeking best practices and the most current market technologies.',
        'tag-1': 'Proactive',
        'tag-2': 'Detail-oriented',
        'tag-3': 'Creative',
        'tag-4': 'Collaborative',
        
        // Education Section
        'education-subtitle': 'ACADEMIC BACKGROUND',
        'education-title': 'My educational journey',
        'education-course': 'Systems Analysis and Development',
        'education-institution': 'Uniasselvi',
        'education-period': '2023 - 2025 (graduated)',
        'education-description': 'Technology course focused on software development, systems analysis, databases and agile methodologies, with deepening in web programming, mobile and IT project management. Training aimed at practical application of innovative technological solutions, aligned with software market demands.',
        'course-1-title': 'Complete Web Development',
        'course-1-platform': 'Online Platform • 2023',
        'course-1-description': 'JavaScript, React, Node.js, MongoDB, Lua, C# - From front-end to back-end.',
        'course-2-title': 'Database and SQL',
        'course-2-platform': 'Certification • 2023',
        'course-2-description': 'Modeling, optimization and administration of relational databases.',
        
        // Certificates Section
        'certificates-subtitle': 'CERTIFICATIONS',
        'certificates-title': 'My certificates',
        'cert-1-title': 'Technology Diploma in Systems Analysis and Development',
        'cert-1-platform': 'Higher Technology Course',
        'cert-1-year': 'August 11, 2025',
        'cert-2-title': 'Algorithm',
        'cert-2-platform': 'Video course',
        'cert-2-year': 'December 16, 2024',
        'cert-3-title': 'HTML5 and CSS3 Course: Module 1 of 5',
        'cert-3-platform': 'Video course',
        'cert-3-year': 'December 27, 2024',
        'cert-4-title': 'HTML5 and CSS3 Course: Module 2 of 5',
        'cert-4-platform': 'Video course',
        'cert-4-year': 'April 24, 2025',
        'btn-certificate': 'View certificate',
        
        // Skills Section
        'skills-subtitle': 'SKILLS',
        'skills-title': 'Technologies & Tools',
        'skills-frontend': 'Frontend',
        'skills-backend': 'Backend',
        'skills-tools': 'Tools',
        
        // Projects Section
        'projects-subtitle': 'PROJECTS',
        'projects-title': 'Some of my work',
        'project-1-title': 'ClientNexus - Customer Management System',
        'project-1-description': 'A modern and responsive customer management system, built with cutting-edge technologies and intuitive interface. Includes complete dashboard, advanced reports and elegant dark theme.',
        'project-2-title': 'Stylus Concept - Online Catalog',
        'project-2-description': 'Online fashion catalog with product visualization, advanced filters and WhatsApp integration for contact.',
        'btn-code': 'Code',
        'btn-site': 'View Site',
        
        // Contact Section
        'contact-subtitle': 'NEED A DEVELOPER?',
        'contact-title': 'Let\'s work together →',
        'contact-info-title': 'Contact information',
        'contact-info-text': 'Feel free to contact me at any time. I prefer to talk via email, especially since we might be in different time zones.',
        'availability-title': 'Current availability',
        'availability-text': 'I currently work on various personal projects, but I\'ll be happy to discuss new opportunities.',
        'availability-status': 'Available for new projects',
        'social-title': 'Follow me',
        
        // Footer
        'footer-quote': 'Always learning, always evolving',
        'footer-copyright': '© 2025 Levi. All rights reserved.'
    }
};

// Language management
let currentLanguage = localStorage.getItem('language') || 'pt';

// Function to translate content
function translateContent(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.innerHTML = translations[language][key];
            }
        }
    });
    
    // Update document language
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    
    // Save language preference
    localStorage.setItem('language', language);
    currentLanguage = language;
}

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    // Add data-translate attributes to elements
    addTranslateAttributes();
    
    // Set initial language
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        translateContent(currentLanguage);
        
        // Add language change listener
        languageSelector.addEventListener('change', (e) => {
            translateContent(e.target.value);
        });
    }
});

// Function to add translate attributes to elements
function addTranslateAttributes() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navKeys = ['nav-sobre', 'nav-formacao', 'nav-certificados', 'nav-habilidades', 'nav-projetos', 'nav-contato'];
    navLinks.forEach((link, index) => {
        if (navKeys[index]) link.setAttribute('data-translate', navKeys[index]);
    });
    
    // Brand title
    const brandTitle = document.querySelector('.brand-title');
    if (brandTitle) brandTitle.setAttribute('data-translate', 'brand-title');
    
    // Hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.setAttribute('data-translate', 'hero-title');
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.setAttribute('data-translate', 'hero-description');
    
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) btnPrimary.setAttribute('data-translate', 'btn-projects');
    
    const btnSecondary = document.querySelector('.btn-secondary');
    if (btnSecondary) btnSecondary.setAttribute('data-translate', 'btn-about');
    
    // Section subtitles and titles
    const subtitles = document.querySelectorAll('.section-subtitle');
    const subtitleKeys = ['about-subtitle', 'education-subtitle', 'certificates-subtitle', 'skills-subtitle', 'projects-subtitle', 'contact-subtitle'];
    subtitles.forEach((subtitle, index) => {
        if (subtitleKeys[index]) subtitle.setAttribute('data-translate', subtitleKeys[index]);
    });
    
    const titles = document.querySelectorAll('.section-title');
    const titleKeys = ['about-title', 'education-title', 'certificates-title', 'skills-title', 'projects-title', 'contact-title'];
    titles.forEach((title, index) => {
        if (titleKeys[index]) title.setAttribute('data-translate', titleKeys[index]);
    });
    
    // About section
    const aboutTexts = document.querySelectorAll('.about-text p');
    if (aboutTexts[0]) aboutTexts[0].setAttribute('data-translate', 'about-text-1');
    if (aboutTexts[1]) aboutTexts[1].setAttribute('data-translate', 'about-text-2');
    
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        tag.setAttribute('data-translate', `tag-${index + 1}`);
    });
    
    // Education section
    const educationCourse = document.querySelector('.education-card h3');
    if (educationCourse) educationCourse.setAttribute('data-translate', 'education-course');
    
    const educationInstitution = document.querySelector('.education-institution');
    if (educationInstitution) educationInstitution.setAttribute('data-translate', 'education-institution');
    
    const educationPeriod = document.querySelector('.education-period');
    if (educationPeriod) educationPeriod.setAttribute('data-translate', 'education-period');
    
    const educationDescription = document.querySelector('.education-description');
    if (educationDescription) educationDescription.setAttribute('data-translate', 'education-description');
    
    // Courses
    const courseTitles = document.querySelectorAll('.course-card h4');
    courseTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `course-${index + 1}-title`);
    });
    
    const coursePlatforms = document.querySelectorAll('.course-platform');
    coursePlatforms.forEach((platform, index) => {
        platform.setAttribute('data-translate', `course-${index + 1}-platform`);
    });
    
    const courseDescriptions = document.querySelectorAll('.course-description');
    courseDescriptions.forEach((description, index) => {
        description.setAttribute('data-translate', `course-${index + 1}-description`);
    });
    
    // Certificates
    const certTitles = document.querySelectorAll('.certificate-card h3');
    certTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `cert-${index + 1}-title`);
    });
    
    const certPlatforms = document.querySelectorAll('.certificate-platform');
    certPlatforms.forEach((platform, index) => {
        platform.setAttribute('data-translate', `cert-${index + 1}-platform`);
    });
    
    const certYears = document.querySelectorAll('.certificate-year');
    certYears.forEach((year, index) => {
        year.setAttribute('data-translate', `cert-${index + 1}-year`);
    });
    
    const btnCertificates = document.querySelectorAll('.btn-certificate');
    btnCertificates.forEach(btn => {
        btn.setAttribute('data-translate', 'btn-certificate');
    });
    
    // Skills section headings
    const skillsSections = document.querySelectorAll('.skills-section h3');
    const skillsKeys = ['skills-frontend', 'skills-backend', 'skills-tools'];
    skillsSections.forEach((section, index) => {
        if (skillsKeys[index]) section.setAttribute('data-translate', skillsKeys[index]);
    });
    
    // Projects
    const projectTitles = document.querySelectorAll('.project-content h3');
    projectTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `project-${index + 1}-title`);
    });
    
    const projectDescriptions = document.querySelectorAll('.project-content p');
    projectDescriptions.forEach((description, index) => {
        description.setAttribute('data-translate', `project-${index + 1}-description`);
    });
    
    const btnProjects = document.querySelectorAll('.btn-project');
    btnProjects.forEach(btn => {
        btn.setAttribute('data-translate', 'btn-code');
    });
    
    const btnSites = document.querySelectorAll('.btn-site');
    btnSites.forEach(btn => {
        btn.setAttribute('data-translate', 'btn-site');
    });
    
    // Contact section
    const contactInfoTitle = document.querySelector('.contact-info h3');
    if (contactInfoTitle) contactInfoTitle.setAttribute('data-translate', 'contact-info-title');
    
    const contactInfoText = document.querySelector('.contact-info p');
    if (contactInfoText) contactInfoText.setAttribute('data-translate', 'contact-info-text');
    
    const availabilityTitle = document.querySelector('.availability h3');
    if (availabilityTitle) availabilityTitle.setAttribute('data-translate', 'availability-title');
    
    const availabilityText = document.querySelector('.availability p');
    if (availabilityText) availabilityText.setAttribute('data-translate', 'availability-text');
    
    const availabilityStatus = document.querySelector('.availability-status span:last-child');
    if (availabilityStatus) availabilityStatus.setAttribute('data-translate', 'availability-status');
    
    const socialTitle = document.querySelector('.social-links h3');
    if (socialTitle) socialTitle.setAttribute('data-translate', 'social-title');
    
    // Footer
    const footerQuote = document.querySelector('.footer-quote');
    if (footerQuote) footerQuote.setAttribute('data-translate', 'footer-quote');
    
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) footerCopyright.setAttribute('data-translate', 'footer-copyright');
}

console.log('🚀 Portfolio JavaScript carregado com sucesso!');