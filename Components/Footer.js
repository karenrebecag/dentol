document.addEventListener("DOMContentLoaded", () => {
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
  
    const footerRights = document.createElement("div");
    footerRights.className = "footer_rights_dentol";
    footerRights.innerHTML = `
      <p class="SmallText">Copyright 2025</p>
    `;
    document.body.appendChild(footerRights);
  
    [footer, footerRights].forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(60px)';
    });
  
    function animateFadeUp(element) {
      requestAnimationFrame(() => {
        element.style.transition = 'opacity 1s ease, transform 1s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateFadeUp(entry.target);
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.2
    });
  
    observer.observe(footer);
    observer.observe(footerRights);
  });