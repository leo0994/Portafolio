import i18next from "./i18n.js";

function actualizarTextos() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const clave = el.getAttribute("data-i18n");
    const traduccion = i18next.t(clave);

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.setAttribute("placeholder", traduccion);
    } else {
      el.innerText = traduccion;
    }
  });
}

function esperarElemento(id, callback) {
  const el = document.getElementById(id);
  if (el) return callback(el);
  // Esperar si aún no está en el DOM
  const intervalo = setInterval(() => {
    const el = document.getElementById(id);
    if (el) {
      clearInterval(intervalo);
      callback(el);
    }
  }, 100); // cada 100ms intenta de nuevo
}

document.addEventListener("DOMContentLoaded", () => {
  const aplicarIdioma = () => {
    actualizarTextos();
    console.log("🔁 Textos actualizados");
  };

  // Detectar y aplicar el idioma guardado
  const idiomaGuardado = localStorage.getItem("lang") || "es";
  i18next.changeLanguage(idiomaGuardado).then(() => {
    aplicarIdioma();
  });

  function toggleIdioma() {
    const nuevoIdioma = i18next.language === "es" ? "en" : "es";
    localStorage.setItem("lang", nuevoIdioma);
    i18next.changeLanguage(nuevoIdioma).then(() => {
      aplicarIdioma();
      // Actualizar el texto del botón después de cambiar idioma
      esperarElemento("language-toggle", (btn) => (btn.innerText = nuevoIdioma.toUpperCase()));
      esperarElemento("language-toggle-mobile", (btn) => (btn.innerText = nuevoIdioma.toUpperCase()));
    });
  }

  // Asegurarse que ambos botones tengan su evento incluso si están ocultos al inicio
  esperarElemento("language-toggle", (btn) => {
    btn.innerText = i18next.language === "es" ? "EN" : "ES";
    btn.addEventListener("click", toggleIdioma);
  });

  esperarElemento("language-toggle-mobile", (btn) => {
    btn.innerText = i18next.language === "es" ? "EN" : "ES";
    btn.addEventListener("click", toggleIdioma);
  });
});

