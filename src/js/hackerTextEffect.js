// src/js/hackerTextEffect.js
// Efecto hacker para mostrar texto desordenado y luego acomodarlo progresivamente

export function hackerTextEffect(element, finalText, duration = 1000, interval = 30) {
  if (!element) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/';
  let frame = 0;
  const totalFrames = Math.floor(duration / interval);
  const textLength = finalText.length;
  
  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }
  
  function animate() {
    // Calcular cuántas letras ya deberían estar reveladas (progresivo)
    const progress = frame / totalFrames;
    const revealedCount = Math.floor(progress * textLength);
    
    let result = '';
    for (let i = 0; i < textLength; i++) {
      if (i < revealedCount) {
        // Letras ya reveladas - mostrar texto final
        result += finalText[i];
      } else {
        // Letras aún no reveladas - mostrar aleatorio
        result += randomChar();
      }
    }
    
    // Actualizar el elemento
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = result;
    } else {
      element.textContent = result;
    }
    
    frame++;
    if (frame <= totalFrames) {
      setTimeout(animate, interval);
    } else {
      // Asegurar texto final al terminar
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = finalText;
      } else {
        element.textContent = finalText;
      }
    }
  }
  animate();
}
