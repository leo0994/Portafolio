// src/js/typewriter.js
// Simple typewriter effect for Astro/Vanilla JS

export function typewriterEffect(element, text, speed = 50) {
  if (!element) return;
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
