// Výber elementov
const scene = document.querySelector(".parallax-scene");
const card = document.querySelector(".hero-card");
const content = document.querySelector(".hero-content");
const cursor = document.querySelector(".cursor");
const blob = document.querySelector(".glass-blob");
const tag = document.querySelector(".card-tag");
const titles = document.querySelectorAll(".text-small, .text-large");

// 1. ÚVODNÁ ANIMÁCIA (Spustí sa raz pri načítaní)
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.to(card, { 
    opacity: 1, 
    scale: 1, 
    duration: 1.8, 
    delay: 0.5 
})
.to(tag, { 
    opacity: 1, 
    duration: 1 
}, "-=1")
.to(titles, { 
    opacity: 1, 
    y: 0, 
    duration: 1.5, 
    stagger: 0.2 
}, "-=1.2");

// 2. POHYB KURZORA
window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { 
        x: e.clientX, 
        y: e.clientY, 
        xPercent: -50, 
        yPercent: -50, 
        duration: 0.5,
        ease: "power2.out"
    });
});

// --- DYNAMIC TAB TITLE ---
let originalTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Hey! Come back! 👀";
});

window.addEventListener("focus", () => {
    document.title = originalTitle;
});

// 3. PARALLAX EFEKT (Náklon karty a pohyb blobu)
const cardRX = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3" });
const cardRY = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3" });
const blobX = gsap.quickTo(blob, "x", { duration: 1.5, ease: "power2.out" });
const blobY = gsap.quickTo(blob, "y", { duration: 1.5, ease: "power2.out" });

scene.addEventListener("mousemove", (e) => {
    const { width, height, left, top } = scene.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const normX = (mouseX / width - 0.5);
    const normY = (mouseY / height - 0.5);

    cardRX(normY * -15); // Náklon hore/dole
    cardRY(normX * 15);  // Náklon vľavo/vpravo
    
    // Blob sa hýbe opačne pre hĺbkový efekt
    blobX(normX * -80);
    blobY(normY * -80);
});

// Reset pri odchode myši zo scény
scene.addEventListener("mouseleave", () => {
    cardRX(0);
    cardRY(0);
    blobX(0);
    blobY(0);
});

// Hover efekt na menu linky
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3.5, duration: 0.3 }));
    link.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
});