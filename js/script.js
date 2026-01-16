// Pockáme na nacítanie celého HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOADER LOGIKA ---
    const countElement = document.getElementById('count');
    const loader = document.getElementById('loader');
    let currentCount = 0;

    if (loader) {
        const interval = setInterval(() => {
            currentCount++;
            if (countElement) countElement.innerText = currentCount;
            
            if (currentCount >= 100) {
                clearInterval(interval);
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.add('loaded');
                    document.body.style.overflow = 'auto';
                }, 600);
            }
        }, 15);
    }

    // --- 2. ZMENA TEXTU V TABE (Ked odídeš z webu) ---
    const originalTitle = document.title;
    window.addEventListener("blur", () => { document.title = "Hey! Come Back! \u{1F440}"; });
    window.addEventListener("focus", () => { document.title = originalTitle; });

    // --- 3. FLAIR KURZOR (Pohyb a Smooth Hover) ---
    const flair = document.querySelector('.flair');

    if (flair) {
        window.addEventListener("mousemove", (e) => {
            // Pouívame requestAnimationFrame pre maximálnu plynulost
            window.requestAnimationFrame(() => {
                flair.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            });
        });

        // Hladáme všetky prvky, ktoré majú spustit zväcšenie
        const items = document.querySelectorAll('a, button, .nav-item, .logo img');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => flair.classList.add('flair--hover'));
            item.addEventListener('mouseleave', () => flair.classList.remove('flair--hover'));
        });
    }
});

// --- 4. FLUID ENGINE (Nacítanie kninice dymu) ---
const fluidScript = document.createElement('script');
fluidScript.src = "https://webgl-fluid-simulation.netlify.app/scripts/script.js";
document.head.appendChild(fluidScript);

fluidScript.onload = () => {
    window.config = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        DENSITY_DISSIPATION: 3.0, 
        VELOCITY_DISSIPATION: 1.0,
        PRESSURE: 0.8,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SHADING: true,
        COLORFUL: false, 
        PAUSED: false,
        BACK_COLOR: { r: 255, g: 255, b: 255 },
        TRANSPARENT: true,
    };

    window.updatePointerColor = () => {
        return { r: 0.31, g: 0.94, b: 0.71 }; // Mentolová
    };
};