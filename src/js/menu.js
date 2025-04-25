document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  if (!menuToggle || !mobileMenu || !closeMenu) return;

  // Mostrar menú (slide in)
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");

    gsap.to(mobileMenu, {
      x: "-100%", // entra desde la derecha
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // Ocultar menú (slide out)
  closeMenu.addEventListener("click", () => {
    gsap.to(mobileMenu, {
      x: "100%", // sale hacia la derecha
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      },
    });
  });
});
