document.addEventListener("DOMContentLoaded", () => {
    // Crear header
    const headerContainer = document.createElement("div");
    headerContainer.className = "header_dentol";
  
    const logo = document.createElement("img");
    logo.src = "assets/Icons/General/DentolLogo.svg";
    logo.alt = "Dentol logo";
    logo.className = "logo_dentol";
  
    const menuButton = document.createElement("button");
    menuButton.innerText = "Menú";
    menuButton.className = "menu_button_dentol";
  
    const overlay = document.createElement("div");
    overlay.className = "menu_overlay_dentol";
    overlay.innerHTML = `
      <div class="menu_content_dentol">
        <div class="menu_top_dentol">
          <img src="assets/Icons/General/DentolLogo.svg" class="logo_overlay_dentol" alt="Dentol logo" />
          <button class="close_button_dentol">&times;</button>
        </div>
        <nav class="nav_links_dentol">
          <a href="/"><span>Home</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/diseno-de-sonrisa"><span>Diseño de sonrisa</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/servicios"><span>Servicios</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/pacientes"><span>Nuestros Pacientes</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/nosotros"><span>Nosotros</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/contacto"><span>Contacto</span><img class="HeaderArrowIcon" src="assets/Icons/General/ArrowRight.svg" alt=""></a>
        </nav>
        <div class="menu_footer_dentol">
          <div class="socials_dentol">
            <a href="https://instagram.com"><img src="assets/Icons/General/Instagram.svg" alt="Instagram" /></a>
            <a href="https://facebook.com"><img src="assets/Icons/General/Facebook.svg" alt="Facebook" /></a>
          </div>
          <div class="WhatsAppButtonWrapper">
            <button class="WhatsAppButton">
              Agenda tu cita
              <div class="icon">
                <img src="assets/Icons/General/WhatsAppIcon.svg" alt="WhatsApp icon" width="28" height="28">
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  
    // Añadir a DOM
    headerContainer.appendChild(logo);
    headerContainer.appendChild(menuButton);
    document.body.appendChild(headerContainer);
    document.body.appendChild(overlay);
  
    // Eventos
    menuButton.addEventListener("click", () => {
      overlay.classList.add("active_dentol");
      overlay.classList.remove("fadeout_dentol");
    });
  
    overlay.querySelector(".close_button_dentol").addEventListener("click", () => {
      overlay.classList.add("fadeout_dentol");
      overlay.classList.remove("active_dentol");
      setTimeout(() => {
        overlay.classList.remove("fadeout_dentol");
      }, 400);
    });
  });