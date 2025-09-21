// ===== SMOOTH SCROLLING & NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== MOBILE NAVIGATION TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .doc-card, .example-card, .feature-card, .about-text, .about-features');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // ===== TYPING EFFECT FOR HERO SUBTITLE =====
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #00d4ff';
        
        let index = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // ===== QUANTUM PARTICLE EFFECT =====
    function createQuantumParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00d4ff;
                border-radius: 50%;
                opacity: 0.7;
                pointer-events: none;
                z-index: 1;
            `;
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            hero.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        const animation = particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 0.7
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0.5)`,
                opacity: 0
            }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-out'
        });

        animation.onfinish = () => {
            // Reset particle position and animate again
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            animateParticle(particle);
        };
    }

    // Initialize quantum particles
    createQuantumParticles();

    // ===== CODE BLOCK COPY FUNCTIONALITY =====
    document.querySelectorAll('.code-block').forEach(codeBlock => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--bg-secondary);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: all 0.3s ease;
        `;

        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyBtn);

        codeBlock.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });

        codeBlock.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });

        copyBtn.addEventListener('click', async () => {
            const code = codeBlock.querySelector('code, pre').textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = '✅';
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                copyBtn.textContent = '❌';
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 2000);
            }
        });
    });

    // ===== QUANTUM CIRCUIT ANIMATION =====
    const quantumCircuit = document.querySelector('.quantum-circuit');
    if (quantumCircuit) {
        // Add quantum pulse effect to gates
        const gates = quantumCircuit.querySelectorAll('.gate, .measurement');
        
        gates.forEach((gate, index) => {
            gate.addEventListener('mouseenter', () => {
                gate.style.transform = 'scale(1.1)';
                gate.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            });
            
            gate.addEventListener('mouseleave', () => {
                gate.style.transform = 'scale(1)';
                gate.style.boxShadow = 'none';
            });
        });

        // Animate qubit line
        const qubitLine = quantumCircuit.querySelector('.qubit-line');
        if (qubitLine) {
            setInterval(() => {
                qubitLine.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.8)';
                setTimeout(() => {
                    qubitLine.style.boxShadow = 'none';
                }, 500);
            }, 2000);
        }
    }

    // ===== STATS COUNTER ANIMATION =====
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue === '∞') {
                    // Special animation for infinity symbol
                    let opacity = 0;
                    const infinityAnimation = setInterval(() => {
                        opacity += 0.1;
                        target.style.opacity = opacity;
                        if (opacity >= 1) {
                            clearInterval(infinityAnimation);
                        }
                    }, 100);
                } else if (!isNaN(finalValue)) {
                    // Number counter animation
                    const startValue = 0;
                    const endValue = parseInt(finalValue);
                    const duration = 2000;
                    const increment = endValue / (duration / 50);
                    let currentValue = startValue;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        target.textContent = Math.floor(currentValue);
                        
                        if (currentValue >= endValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        }
                    }, 50);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===== FORM ENHANCEMENT =====
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', () => {
                input.style.borderColor = '#00d4ff';
                input.style.boxShadow = '0 0 0 2px rgba(0, 212, 255, 0.2)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                    input.style.boxShadow = 'none';
                }
            });
        });

        // Form validation and submission feedback
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Reset after animation
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // ===== EASTER EGG: KONAMI CODE =====
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'quantumPulse 0.5s ease-in-out 3';
                
                // Create rainbow effect
                const style = document.createElement('style');
                style.textContent = `
                    .quantum-logo {
                        animation: rainbow 2s linear infinite !important;
                    }
                    @keyframes rainbow {
                        0% { color: #ff0000; }
                        14% { color: #ff7f00; }
                        28% { color: #ffff00; }
                        42% { color: #00ff00; }
                        57% { color: #0000ff; }
                        71% { color: #4b0082; }
                        85% { color: #9400d3; }
                        100% { color: #ff0000; }
                    }
                `;
                document.head.appendChild(style);
                
                konamiIndex = 0;
                
                // Show secret message
                setTimeout(() => {
                    alert('🌈 Quantum Rainbow Mode Activated! 🌈\nYou found the secret quantum state!');
                }, 1000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===== QUANTUM THEME SWITCHER (BONUS) =====
    let isQuantumMode = false;
    
    // Secret key combination to toggle quantum mode
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyQ') {
            toggleQuantumMode();
        }
    });

    function toggleQuantumMode() {
        isQuantumMode = !isQuantumMode;
        
        if (isQuantumMode) {
            document.documentElement.style.setProperty('--primary-color', '#ff00ff');
            document.documentElement.style.setProperty('--secondary-color', '#00ffff');
            document.documentElement.style.setProperty('--accent-color', '#ffff00');
            
            // Add special quantum effects
            document.body.classList.add('quantum-mode');
        } else {
            document.documentElement.style.setProperty('--primary-color', '#00d4ff');
            document.documentElement.style.setProperty('--secondary-color', '#7b68ee');
            document.documentElement.style.setProperty('--accent-color', '#ff6b6b');
            
            document.body.classList.remove('quantum-mode');
        }
    }

    console.log('🚀 CLIQLang website initialized!');
    console.log('💡 Try the Konami code for a surprise!');
    console.log('⚛️ Press Ctrl+Shift+Q for quantum mode!');
});
