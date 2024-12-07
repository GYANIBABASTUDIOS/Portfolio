// Toggle Navigation Menu for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});

// Fade-In Animation on Scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

fadeInElements.forEach(el => observer.observe(el));
