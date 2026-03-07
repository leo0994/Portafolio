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

function esperarElemento(id, callback, maxIntentos = 50) {
  let intentos = 0;
  const el = document.getElementById(id);
  if (el) return callback(el);
  
  // Esperar si aún no está en el DOM
  const intervalo = setInterval(() => {
    intentos++;
    const el = document.getElementById(id);
    if (el) {
      clearInterval(intervalo);
      callback(el);
    } else if (intentos >= maxIntentos) {
      clearInterval(intervalo);
      console.warn(`Elemento con ID "${id}" no encontrado después de ${maxIntentos} intentos`);
    }
  }, 100); // cada 100ms intenta de nuevo
}

function actualizarBotonesIdioma() {
  const proximoIdioma = i18next.language === "es" ? "EN" : "ES";
  
  // Actualizar botón de escritorio
  esperarElemento("language-toggle", (btn) => {
    btn.innerText = proximoIdioma;
    console.log("✅ Botón de idioma de escritorio actualizado:", proximoIdioma);
  });
  
  // Actualizar botón móvil
  esperarElemento("language-toggle-mobile", (btn) => {
    btn.innerText = proximoIdioma;
    console.log("✅ Botón de idioma móvil actualizado:", proximoIdioma);
  });
}

function toggleIdioma() {
  const nuevoIdioma = i18next.language === "es" ? "en" : "es";
  console.log(`🔄 Cambiando idioma de ${i18next.language} a ${nuevoIdioma}`);
  
  localStorage.setItem("lang", nuevoIdioma);
  
  i18next.changeLanguage(nuevoIdioma).then(() => {
    actualizarTextos();
    actualizarBotonesIdioma();
    // Emitir evento para que otros componentes se actualicen
    window.dispatchEvent(new Event("languageChanged"));
    console.log("✅ Textos actualizados al idioma:", nuevoIdioma);
  }).catch((error) => {
    console.error("❌ Error al cambiar idioma:", error);
  });
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Inicializando sistema de idiomas");
  
  const idiomaGuardado = localStorage.getItem("lang") || "es";
  console.log("💾 Idioma guardado en localStorage:", idiomaGuardado);
  
  i18next.changeLanguage(idiomaGuardado).then(() => {
    actualizarTextos();
    actualizarBotonesIdioma();
    console.log("✅ Sistema de idiomas inicializado con:", idiomaGuardado);
  }).catch((error) => {
    console.error("❌ Error al inicializar idiomas:", error);
  });

  // Configurar eventos para ambos botones
  esperarElemento("language-toggle", (btn) => {
    btn.addEventListener("click", toggleIdioma);
    console.log("✅ Event listener agregado al botón de escritorio");
  });

  esperarElemento("language-toggle-mobile", (btn) => {
    btn.addEventListener("click", toggleIdioma);
    console.log("✅ Event listener agregado al botón móvil");
  });
});

// Exportar funciones para debugging
window.debugLanguage = {
  toggleIdioma,
  actualizarTextos,
  actualizarBotonesIdioma,
  currentLang: () => i18next.language
};


