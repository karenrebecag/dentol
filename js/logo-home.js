// JavaScript Document

document.addEventListener('DOMContentLoaded', () => {
  const elementoA = document.getElementsByClassName('logo_dentol');
  const elementoB = document.getElementById('logo-dentol-banner');

   if (!elementoA || !elementoB) {
    console.warn('No se encontraron los elementos A o B');
    return;
  }

  // Ocultar A al iniciar
  elementoA[0].style.display = 'none';


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        elementoA[0].style.display = 'none';
      } else {
        elementoA[0].style.display = 'block';
      }
    });
  }, {
    threshold: 0.01
  });

  observer.observe(elementoB);
});