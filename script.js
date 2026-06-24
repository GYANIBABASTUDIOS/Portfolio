const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const preloader = document.getElementById("preloader");

menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dots = carousel.querySelector(".carousel-dots");
    let currentIndex = 0;

    const render = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.querySelectorAll("button").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
            dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
        });
    };

    const goToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        render();
    };

    slides.forEach((_slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Show image ${index + 1}`);
        dot.addEventListener("click", () => goToSlide(index));
        dots.appendChild(dot);
    });

   let autoSlide = setInterval(() => {
    goToSlide(currentIndex + 1);
}, 4000);

prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000);
});

nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000);
});
    render();
});

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 500);
});
