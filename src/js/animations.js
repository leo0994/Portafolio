// GSAP ya está disponible globalmente desde el CDN en el HTML
console.log("GSAP cargado:", typeof gsap !== 'undefined' ? gsap : 'GSAP no encontrado');

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("desktop-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!nav || navLinks.length === 0) return;

    // Verificar que GSAP esté disponible
    if (typeof gsap === 'undefined') {
        console.error('GSAP no está disponible');
        return;
    }

    const underline = document.createElement("div");
    underline.classList.add("underline-effect");
    nav.appendChild(underline);

    nav.style.position = "relative";

    gsap.set(underline, { width: "0px", opacity: 0, scaleX: 0.5 });

    navLinks.forEach((link) => {
        link.addEventListener("mouseenter", (event) => {
            const linkRect = link.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            gsap.to(underline, {
                width: linkRect.width + "px",
                height: "3px",
                left: linkRect.left - navRect.left + "px",
                top: linkRect.bottom - navRect.top - 2 + "px",
                opacity: 1,
                background: "linear-gradient(90deg, rgb(0, 81, 107), rgb(255, 255, 255), rgb(0, 81, 107)", // ⚡ Rayo en tonos azul, gris y blanco
                boxShadow: "0 0 10px rgb(15, 94, 173)",
                scaleX: 1.3, // Efecto de expansión
                duration: 0.3,
                ease: "power3.out",
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(underline, {
                width: "0px",
                opacity: 0,
                scaleX: 0.5,
                duration: 0.3,
                ease: "power3.in",
            });
        });
    });
});
