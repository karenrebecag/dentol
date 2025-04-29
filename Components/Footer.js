document.addEventListener("DOMContentLoaded", () => {
  // Crear footer
  const footer = document.createElement("footer");
  footer.className = "footer_dentol";
  footer.innerHTML = `
    <div>
      <div class="footer_top_dentol">
        <div class="footer_logo_dentol">
          <img src="assets/Icons/General/DentolVerde.svg" alt="Dentol Logo" />
        </div>

        <div class="footer_column_dentol">
          <h4 class="SubHeadingWhite">Horarios de atención</h4>
          <p class="ParagraphWhite">Lunes a viernes de<br>11 am – 5:00 pm</p>
        </div>

        <div class="footer_column_dentol">
          <h4 class="SubHeadingWhite">Dirección</h4>
          <p class="ParagraphWhite">
            Paseo del Conquistador 407-B,<br>
            Colonia Lomas de Cortés,<br>
            Cuernavaca, Morelos, México, 62240
          </p>
        </div>

        <div class="footer_column_dentol">
          <h4 class="SubHeadingWhite">Teléfonos</h4>
          <p class="ParagraphWhite">777 177 00 34<br>777 134 93 19</p>
        </div>
      </div>

      <hr class="footer_line_dentol" />

      <div class="footer_bottom_dentol">
        <div class="footer_socials_dentol">
          <a href="https://instagram.com" target="_blank">
            <img src="assets/Icons/General/Instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com" target="_blank">
            <img src="assets/Icons/General/Facebook.svg" alt="Facebook" />
          </a>
        </div>

        <div class="footer_whatsapp_dentol">
          <button class="WhatsAppButtonGreen">
            Agenda tu cita
            <div class="icon">
              <img src="assets/Icons/General/WhatsAppIcon.svg" alt="WhatsApp icon" width="28" height="28">
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // Crear derechos de autor
  const footerRights = document.createElement("div");
  footerRights.className = "footer_rights_dentol";
  footerRights.innerHTML = `
    <p class="SmallText">Copyright 2025</p>
  `;
  document.body.appendChild(footerRights);

  // Estado inicial de footer y derechos
  [footer, footerRights].forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(60px)';
  });

  function animateFadeUp(element) {
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 500ms ease, transform 500ms ease';
      element.style.opacity = '';
      element.style.transform = 'translateY(0)';
    });
  }

  // Observer para animar entrada del footer
  const observerFade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateFadeUp(entry.target);
        observerFade.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observerFade.observe(footer);
  observerFade.observe(footerRights);

  // ===== OCULTAR HEADER AL ENTRAR FOOTER O SERVICIOS =====
  const observeHeader = () => {
    const header = document.querySelector('.header_dentol');
    const servicios = document.querySelector('.ServiciosComponent');
    const footerSection = document.querySelector('.footer_dentol');

    if (header && (servicios || footerSection)) {
      const observerHideHeader = new IntersectionObserver(entries => {
        let anyVisible = entries.some(entry => entry.isIntersecting);
        if (anyVisible) {
          header.classList.add('header_hidden_dentol');
        } else {
          header.classList.remove('header_hidden_dentol');
        }
      }, {
        threshold: 0.01,
        rootMargin: '0px 0px -500px 0px' // Detecta 300px antes de que entre completamente
      });

      if (servicios) observerHideHeader.observe(servicios);
      if (footerSection) observerHideHeader.observe(footerSection);
    } else {
      setTimeout(observeHeader, 100);
    }
  };

  observeHeader();
});