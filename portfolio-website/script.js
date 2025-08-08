// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initContactForm();
    initAnimations();
    initScrollReveal();
    initParticles();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect with enhanced styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced scroll effects and animations
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroBackground = hero.querySelector('::before');
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Enhanced fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('portfolio-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content, .services-grid, .portfolio-grid');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Enhanced portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach((item, index) => {
                // Hide all items first with staggered animation
                setTimeout(() => {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }, index * 50);

                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hide');
                            item.classList.add('show');
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300 + (index * 50));
            });
        });
    });

    // Initialize portfolio items as visible
    portfolioItems.forEach(item => {
        item.classList.add('show');
    });

    // Enhanced hover effects for portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Enhanced contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission with enhanced animation
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(135deg, #8b5cf6, #ec4899)';

        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
            
            // Add success animation
            submitButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                submitButton.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    });

    // Enhanced form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.borderColor = '#6366f1';
            this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            if (!this.value) {
                this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        ${type === 'success' ? 
            'background: linear-gradient(135deg, #10b981, #059669);' : 
            'background: linear-gradient(135deg, #ef4444, #dc2626);'}
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Initialize enhanced animations
function initAnimations() {
    // Enhanced typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(50px)';
            line.style.animation = `slideInLeft 1s ease forwards ${index * 0.3 + 0.5}s`;
        });
    }

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Animate icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('revealed');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('revealed');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
}

// Particle effect for hero section
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
    `;

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random animation
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    particle.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;

    container.appendChild(particle);

    // Remove and recreate particle after animation
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced scroll to top button
window.addEventListener('scroll', function() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scrollTopBtn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            z-index: 1000;
            transition: all 0.4s ease;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.8);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
            border: 2px solid rgba(99, 102, 241, 0.3);
        `;
        
        scrollTopBtn.addEventListener('click', scrollToTop);
        scrollTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0) scale(1.1)';
            this.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.4)';
        });
        scrollTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
        });
        
        document.body.appendChild(scrollTopBtn);
    }
    
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transform = 'translateY(20px) scale(0.8)';
    }
});

// Enhanced loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<div class="loader"></div>';
    
    // Remove loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 500);
    }, 1000);
    
    document.body.classList.add('loaded');
});

// Mouse cursor trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Limit trail length
    if (mouseTrail.length > 10) {
        mouseTrail.shift();
    }
    
    // Create trail effect on hero section
    if (e.target.closest('.hero')) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    }, 500);
}

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

