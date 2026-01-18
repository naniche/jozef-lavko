const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.4,
        ease: "power2.out"
    });
});

const links = document.querySelectorAll('a, .project-item');
links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 4, duration: 0.3 });
    });
    link.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});

// Funkcia pre zmenu Title v prehliadači, keď používateľ odíde z karty
let originalTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Hey! Come back! 👀";
});

window.addEventListener("focus", () => {
    document.title = originalTitle;
});