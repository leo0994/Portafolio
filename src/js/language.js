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

function actualizarBotonesIdioma() {
  const proximoIdioma = i18next.language === "es" ? "EN" : "ES";
  esperarElemento("language-toggle", (btn) => (btn.innerText = proximoIdioma));
  esperarElemento("language-toggle-mobile", (btn) => (btn.innerText = proximoIdioma));
}

function toggleIdioma() {
  const nuevoIdioma = i18next.language === "es" ? "en" : "es";
  localStorage.setItem("lang", nuevoIdioma);
  i18next.changeLanguage(nuevoIdioma).then(() => {
    actualizarTextos();
    actualizarBotonesIdioma();
    console.log("🔁 Textos actualizados");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("lang") || "es";
  i18next.changeLanguage(idiomaGuardado).then(() => {
    actualizarTextos();
    actualizarBotonesIdioma();
  });

  // Asegurarse que ambos botones tengan su evento incluso si están ocultos al inicio
  esperarElemento("language-toggle", (btn) => {
    btn.addEventListener("click", toggleIdioma);
  });

  esperarElemento("language-toggle-mobile", (btn) => {
    btn.addEventListener("click", toggleIdioma);
  });
});


