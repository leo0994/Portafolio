document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const underline = document.querySelector(".underline");
  
    gsap.set(underline, { width: "0px", opacity: 1, left: 0 });
  
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { width: link.offsetWidth, left: link.offsetLeft, duration: 0.3, ease: "power2.out" });
      });
  
      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { width: "0px", opacity: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  });
  