// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme
setTheme(getCurrentTheme());

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }

            // Calculate scroll position
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Smooth scroll animation
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without scrolling
            history.pushState(null, '', targetId);
        }
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = ["I'm a Full Stack Developer", "I'm a Java Backend Developer", "I'm a Frontend Developer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 200); // Quick pause before next phrase
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 80); // Faster typing/deleting speed
    }
}

// Start typing animation with shorter initial delay
setTimeout(typeEffect, 500);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('section');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for reveal animation
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-in-out';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Skills Animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Cursor Effects
const handleMouseMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / element.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / element.clientHeight) * 100;
    element.style.setProperty('--x', `${x}%`);
    element.style.setProperty('--y', `${y}%`);
};

// Add cursor effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
});

// Add cursor effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mousemove', (e) => handleMouseMove(e, item));
});

// Custom cursor effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('custom-cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('custom-cursor-hover');
    });
});

// Magnetic effect for social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = '';
    });
});

// Add ripple effect to buttons
const addRippleEffect = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
};

document.querySelectorAll('.download-btn, #contact-form button').forEach(button => {
    button.addEventListener('click', addRippleEffect);
});

// Add this to your existing styles.css
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .download-btn, #contact-form button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(styleSheet);

// Enhanced Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)';
    sectionObserver.observe(section);
});

// Add smooth scroll behavior to HTML
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent scroll chaining
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    isScrolling = true;
    
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 66); // Debounce scroll events
});

// Add active class to nav links on scroll
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Add animation order to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.setProperty('--animation-order', index);
});

// Education Section Accordion
document.addEventListener('DOMContentLoaded', () => {
    const educationItems = document.querySelectorAll('.education-item');
    
    // Function to handle item click
    const handleItemClick = (clickedItem) => {
        // Toggle active class on clicked item
        const isActive = clickedItem.classList.contains('active');
        
        // Optional: Close other items (comment out for multiple open items)
        educationItems.forEach(item => {
            item.classList.remove('active');
            const content = item.querySelector('.education-content');
            content.style.maxHeight = null;
        });
        
        // Toggle clicked item
        if (!isActive) {
            clickedItem.classList.add('active');
            const content = clickedItem.querySelector('.education-content');
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    };
    
    // Add click event listeners
    educationItems.forEach(item => {
        const header = item.querySelector('.education-header');
        header.addEventListener('click', () => handleItemClick(item));
        
        // Add hover effect for year badge
        const yearBadge = item.querySelector('.year-badge');
        header.addEventListener('mouseenter', () => {
            yearBadge.style.transform = 'scale(1.1)';
        });
        
        header.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                yearBadge.style.transform = 'scale(1)';
            }
        });
    });
    
    // Open first item by default
    handleItemClick(educationItems[0]);
});

// Education Section Scroll Functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.education-scroll');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const prevButton = document.querySelector('.scroll-button.prev');
    const nextButton = document.querySelector('.scroll-button.next');
    const items = document.querySelectorAll('.education-item');
    let currentIndex = 0;

    // Update active dot
    const updateDots = (index) => {
        scrollDots.forEach(dot => dot.classList.remove('active'));
        scrollDots[index].classList.add('active');
    };

    // Scroll to specific item
    const scrollToItem = (index) => {
        const item = items[index];
        const scrollLeft = item.offsetLeft - (scrollContainer.offsetWidth - item.offsetWidth) / 2;
        scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        currentIndex = index;
        updateDots(index);
    };

    // Handle dot clicks
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToItem(index));
    });

    // Handle button clicks
    prevButton?.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        scrollToItem(currentIndex);
    });

    nextButton?.addEventListener('click', () => {
        currentIndex = Math.min(items.length - 1, currentIndex + 1);
        scrollToItem(currentIndex);
    });

    // Handle scroll events
    let isScrolling;
    scrollContainer.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const itemWidth = items[0].offsetWidth;
            const scrollPosition = scrollContainer.scrollLeft;
            const newIndex = Math.round(scrollPosition / itemWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots(currentIndex);
            }
        }, 100);
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = Math.max(0, currentIndex - 1);
            scrollToItem(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = Math.min(items.length - 1, currentIndex + 1);
            scrollToItem(currentIndex);
        }
    });

    // Initial scroll to first item
    scrollToItem(0);
}); 