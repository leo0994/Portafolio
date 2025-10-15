document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const underline = document.querySelector(".underline");
  const header = document.querySelector("header");

  // Subrayado animado en navbar
  if (underline) {
    gsap.set(underline, { width: "0px", opacity: 1, left: 0 });
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          width: link.offsetWidth,
          left: link.offsetLeft,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { width: "0px", opacity: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }

  // Actualiza --anchor-offset según la altura real del header
  function setAnchorOffset() {
    const h = header ? header.getBoundingClientRect().height : 80;
    const extra = 40; // margen de seguridad para que nunca tape el título
    document.documentElement.style.setProperty("--anchor-offset", `${h + extra}px`);
  }

  setAnchorOffset();
  window.addEventListener("resize", setAnchorOffset);

  // Observa cambios en el header (por responsive o cambios de idioma que alteren altura)
  if (header && "ResizeObserver" in window) {
    const ro = new ResizeObserver(() => setAnchorOffset());
    ro.observe(header);
  }
});
  