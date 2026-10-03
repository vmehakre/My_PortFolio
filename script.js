document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================== PRELOADER ==================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Smooth fade out
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600); // matches the transition time
        });
        
        // Safety timeout in case load event takes too long
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 3000);
    }

    /* ==================== MOBILE MENU TOGGLE ==================== */
    const navToggle = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu-bar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Change hamburger icon to close icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-menu-3-line';
            }
        });
    }

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
            }
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.className = 'ri-menu-3-line';
            }
        });
    });

    /* ==================== STICKY HEADER ==================== */
    const header = document.querySelector('.header');
    const scrollHeader = () => {
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    };
    window.addEventListener('scroll', scrollHeader);
    scrollHeader(); // trigger on initial load check

    /* ==================== BACK TO TOP BUTTON ==================== */
    const scrollUp = document.getElementById('scroll-up');
    const showScrollUp = () => {
        if (scrollUp) {
            if (window.scrollY >= 350) {
                scrollUp.classList.add('show-scroll');
            } else {
                scrollUp.classList.remove('show-scroll');
            }
        }
    };
    window.addEventListener('scroll', showScrollUp);
    showScrollUp();

    /* ==================== ACTIVE SECTION LINK HIGHLIGHTING ==================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // offsets offset height of navbar
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);
    scrollActive();

    /* ==================== SCROLL REVEAL ANIMATION ==================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // animation only triggers once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before elements enter full view
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==================== CONTACT FORM SUBMISSION ==================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('contact-form-feedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Set sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="ri-loader-4-line ri-spin"></i>';
            formFeedback.className = 'form-feedback';
            formFeedback.innerText = '';
            
            // Simulate API transmission delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Show success message
                formFeedback.classList.add('success');
                formFeedback.innerText = 'Thank you! Your message has been sent successfully.';
                
                // Reset form values
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formFeedback.innerText = '';
                    formFeedback.className = 'form-feedback';
                }, 5000);
            }, 1800);
        });
    }

    /* ==================== ROLE TYPING ANIMATION ==================== */
    const typingRoleElement = document.getElementById('typing-role');
    if (typingRoleElement) {
        const roles = ["Python Full Stack Developer", "Backend Enthusiast", "Problem Solver"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeRole = () => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingRoleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingRoleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(typeRole, typingSpeed);
        };

        setTimeout(typeRole, 1000);
    }

    /* ==================== SCREENSHOT SLIDER/CAROUSEL ==================== */
    const initSlider = (sliderId) => {
        const sliderContainer = document.getElementById(sliderId);
        if (sliderContainer) {
            const slides = sliderContainer.querySelectorAll('.project-slide');
            const dots = sliderContainer.querySelectorAll('.slider-dot');
            const prevBtn = sliderContainer.querySelector('.prev-btn');
            const nextBtn = sliderContainer.querySelector('.next-btn');
            
            let currentSlide = 0;
            let slideInterval;
            const intervalTime = 4000; // auto-play 4 seconds

            const changeSlide = (index) => {
                // Remove active classes
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                // Set new index with wrapping bounds
                currentSlide = (index + slides.length) % slides.length;
                
                // Add active classes
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            };

            const nextSlide = () => {
                changeSlide(currentSlide + 1);
            };

            const prevSlide = () => {
                changeSlide(currentSlide - 1);
            };

            // Event listeners
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);

            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    changeSlide(idx);
                    resetTimer();
                });
            });

            // Auto-play timer
            const startTimer = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            };

            const resetTimer = () => {
                clearInterval(slideInterval);
                startTimer();
            };

            // Pause on hover
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            sliderContainer.addEventListener('mouseleave', startTimer);

            // Initialize auto-play
            startTimer();
        }
    };

    // Initialize all sliders
    initSlider('studenthire-slider');
    initSlider('lungcancer-slider');
});
