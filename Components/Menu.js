document.addEventListener("DOMContentLoaded", () => {
  // Crear header
  const headerContainer = document.createElement("div");
  headerContainer.className = "header_dentol";

	const logoLink = document.createElement("a");
logoLink.href = "/"; 

  const logo = document.createElement("img");
	logo.href="/";
  logo.src = "/assets/Icons/General/DentolLogo.svg";
  logo.alt = "Dentol logo";
  logo.className = "logo_dentol";

	logoLink.appendChild(logo);
	document.body.appendChild(logoLink); 
	
  const menuButton = document.createElement("button");
  menuButton.innerText = "Menú";
  menuButton.className = "menu_button_dentol";

  const overlay = document.createElement("div");
  overlay.className = "menu_overlay_dentol";
  overlay.innerHTML = `
      <div class="menu_content_dentol">
        <div class="menu_top_dentol">
<a href="/">
          <img src="/assets/Icons/General/DentolLogo.svg" class="logo_overlay_dentol" alt="Dentol logo" />
</a>
          <button class="close_button_dentol">&times;</button>
        </div>
        <nav class="nav_links_dentol">
          <a href="/"><span>Home</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/diseno-de-sonrisa"><span>Diseño de sonrisa</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/servicios"><span>Servicios</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/pacientes"><span>Nuestros Pacientes</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/nosotros"><span>Nosotros</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
          <a href="/contacto"><span>Contacto</span><img class="HeaderArrowIcon" src="/assets/Icons/General/ArrowRight.svg" alt=""></a>
        </nav>
        <div class="menu_footer_dentol">
          <div class="socials_dentol">
           <a href="https://www.instagram.com/dentolsmilestudio/" target="_blank">
<svg class="insta" width="800px" height="800px" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill=""/> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill=""/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill=""/> </g>

</svg>



</a>
            <a href="https://www.facebook.com/DentolClinik" target="_blank">
<svg class="face" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
<style type="text/css">
	.st0{fill:;}
</style>
<g id="SVGRepo_bgCarrier">
</g>
<g id="SVGRepo_tracerCarrier">
</g>
<g id="SVGRepo_iconCarrier">
	<path class="st0" d="M48.6,0.3H38.5c-9.9,0-16.2,6.1-16.2,15.6v7.2H12v13h10.2v27.6h14.3V36.1h11.7v-13H36.5V17
		c0-2.9,0.7-4.4,4.9-4.4h7.2L48.6,0.3z"/>
</g>
</svg>


</a>
          </div>
          <div class="WhatsAppButtonWrapper">
           
<a href="https://api.whatsapp.com/send?phone=5217771349319&text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita.%20" target="_blank">
 <button class="primary" style="width: 14rem"> 
			<span class="circle" aria-hidden="true" style="text-align:left">
				<!--<span class="icon whatsapp" style="background: none"> -->
					<img class="whats" src="/images/whatsapp.svg" alt="WhatsApp" style="top: 10px; position: absolute; left: 10px;" /> 
				<!--</span>-->
			</span> 

			<span class="button-text">Agenda tu cita</span> </button></a>

          </div>
        </div>
      </div>
    `;

  // Añadir header y overlay al DOM
  headerContainer.appendChild(logoLink);
  headerContainer.appendChild(menuButton);
  document.body.appendChild(headerContainer);
  document.body.appendChild(overlay);

  // Eventos del botón Menú
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

  // ==== OBSERVADOR DE SECCIÓN PARA OCULTAR HEADER ====
  const tryObserveServicios = () => {
    const header = document.querySelector('.header_dentol');
    const targetSection = document.querySelector('.ServiciosComponent,.footer_dentol');

    if (header && targetSection) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            header.classList.add('header_hidden_dentol');
          } else {
            header.classList.remove('header_hidden_dentol');
          }
        });
      }, {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px"
      });

      observer.observe(targetSection);
    } else {
      setTimeout(tryObserveServicios, 100);
    }
  };

  tryObserveServicios();
});
