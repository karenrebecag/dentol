function createServiciosComponent() {
    const container = document.createElement('div');
    container.classList.add('ServiciosComponent');

    container.innerHTML = `
      <div class="StickyBar">
        <div class="ServiciosSelectorWrapper">
          <img src="/assets/Icons/Servicios/LeftGradient.png" class="Gradient LeftGradient" draggable="false" alt="">
          <img src="/assets/Icons/Servicios/RightGradient.png" class="Gradient RightGradient" draggable="false" alt="">
          <div class="ServiciosSelector">
            <button class="InvisiblePill" aria-hidden="true"></button>
            <button class="ServicioButton Pill Pill1" data-index="0" data-target="nivel1">
              <img src="/assets/Icons/Servicios/Pill1.svg" alt="Nivel 1" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle1">Nivel 1</div>
                <div class="PillSubTitle1">Preventivo y Básico</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill2" data-index="1" data-target="nivel2">
              <img src="/assets/Icons/Servicios/Pill2.svg" alt="Nivel 2" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle2">Nivel 2</div>
                <div class="PillSubTitle2">Restaurativo y Correctivo</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill3" data-index="2" data-target="nivel3">
              <img src="/assets/Icons/Servicios/Pill3.svg" alt="Nivel 3" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle3">Nivel 3</div>
                <div class="PillSubTitle3">Especializado y Avanzado</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill4" data-index="3" data-target="nivel4">
              <img src="/assets/Icons/Servicios/Pill4.svg" alt="Nivel 4" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle4">Nivel 4</div>
                <div class="PillSubTitle4">Quirúrgico y Rehabilitador</div>
              </div>
            </button>
            <button class="InvisiblePill" aria-hidden="true"></button>
          </div>
        </div>

        <div class="ServiciosNavDots">
          <button id="prevServicio" class="NavArrow" type="button">
            <img src="/assets/Icons/General/ArrowLeft.svg" alt="Servicio anterior">
          </button>
          <span class="dot" data-slide="0"></span>
          <span class="dot" data-slide="1"></span>
          <span class="dot" data-slide="2"></span>
          <span class="dot" data-slide="3"></span>
          <button id="nextServicio" class="NavArrow" type="button">
            <img src="/assets/Icons/General/ArrowRight.svg" alt="Siguiente servicio">
          </button>
        </div>
      </div>

      <div id="ServiciosContent"></div>
    `;

    return container;
}

function initServiciosComponent(targetId) {
    console.log('initServiciosComponent called with targetId:', targetId);
    const target = document.getElementById(targetId);
    if (!target) {
        console.error('Target element not found:', targetId);
        return;
    }
    const serviciosComponent = createServiciosComponent();
    target.appendChild(serviciosComponent);
    console.log('ServiciosComponent appended to target');

    // Force scroll to top on initialization
    window.scrollTo(0, 0);

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof ScrollToPlugin === 'undefined') {
        console.error('GSAP, ScrollTrigger, or ScrollToPlugin not loaded');
        return;
    }
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const servicioButtons = document.querySelectorAll('.ServicioButton');
    const allButtons = document.querySelectorAll('.ServiciosSelector button');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevServicio');
    const nextBtn = document.getElementById('nextServicio');
    const serviciosContent = document.getElementById('ServiciosContent');
    const selector = document.querySelector('.ServiciosSelector');

    if (!serviciosContent || !selector) {
        console.error('ServiciosContent or ServiciosSelector not found');
        return;
    }

    let currentIndex = 0;
    let isAnimating = false;
    let lastScrollTarget = null;
    let isUserScrolling = false;
    let scrollTimeout = null;
    let isInitialLoad = true;

    // Delay enabling auto-scroll to prevent ScrollTrigger interference
    setTimeout(() => {
        isInitialLoad = false;
        console.log('isInitialLoad set to false after delay');
    }, 1000);

    // Detectar desplazamiento manual
    window.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 300);
    });

    function updateSelectorState(source = 'unknown') {
        console.log('updateSelectorState called, currentIndex:', currentIndex, 'source:', source, 'isInitialLoad:', isInitialLoad);
        // Actualizar clases de botones
        servicioButtons.forEach((btn, index) => {
            btn.classList.remove('active', 'inactive');
            btn.classList.add(index === currentIndex ? 'active' : 'inactive');
        });

        // Actualizar clases de puntos
        dots.forEach((dot, index) => {
            dot.classList.remove('dot-active', 'dot-inactive');
            dot.classList.add(index === currentIndex ? 'dot-active' : 'dot-inactive');
        });

        // Controlar visibilidad de tres botones
        allButtons.forEach((button, index) => {
            let startIndex, endIndex;
            if (currentIndex === 0) {
                startIndex = 0;
                endIndex = 2;
            } else if (currentIndex === 1) {
                startIndex = 1;
                endIndex = 3;
            } else if (currentIndex === 2) {
                startIndex = 2;
                endIndex = 4;
            } else if (currentIndex === 3) {
                startIndex = 3;
                endIndex = 5;
            }
            button.style.display = (index >= startIndex && index <= endIndex) ? 'flex' : 'none';
        });

        // Animar deslizamiento del selector
        const activeButton = servicioButtons[currentIndex];
        if (activeButton && selector && !isAnimating) {
            isAnimating = true;
            const selectorRect = selector.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            const buttonCenter = activeButton.offsetLeft + activeButton.offsetWidth / 2;
            const containerCenter = selector.offsetWidth / 2;
            const newX = -(buttonCenter - containerCenter);

            gsap.to(selector, {
                x: newX,
                duration: 0.24,
                ease: 'elastic.out(1, 0.5)',
                onComplete: () => {
                    isAnimating = false;
                }
            });
        }

        // Desplazamiento automático al anclaje del botón activo, pero no durante carga inicial
        if (!isInitialLoad) {
            const targetId = servicioButtons[currentIndex].dataset.target;
            const targetElement = document.querySelector(`#${targetId}`);
            if (targetElement && targetElement !== lastScrollTarget && !isUserScrolling) {
                lastScrollTarget = targetElement;
                gsap.to(window, {
                    scrollTo: {
                        y: targetElement,
                        offsetY: document.querySelector('.StickyBar').offsetHeight
                    },
                    duration: 0.2,
                    ease: 'power3.out'
                });
            }
        }

        updateButtons();
    }

    function updateButtons() {
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex === servicioButtons.length - 1);
        prevBtn.classList.toggle('disabled', prevBtn.disabled);
        nextBtn.classList.toggle('disabled', nextBtn.disabled);
    }

    function updateContent(index) {
        console.log('updateContent called with index:', index);
        const nivelHTML = `
            <!-- ============= Unified Servicios =================-->
            <div class="NivelContent">
                <div class="Col50Left RightColServices">
                    <div id="nivel1">



                        <div class="SubContainerServices" id="SubContainerServices0" data-step="0">
                            <h3 class="HeadingSmall">Consulta y diagnóstico</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses </h4>
                            <p class="Paragraph"> 
                                La consulta y diagnóstico dental es esencial para mantener una 
                                salud bucal óptima. Nuestros especialistas realizan una 
                                evaluación detallada de dientes, encías y tejidos orales para 
                                detectar problemas como caries, enfermedad periodontal o 
                                maloclusiones. En algunos casos, se utilizan radiografías 
                                para un análisis más preciso. <br>
                                Este servicio permite diseñar un plan de tratamiento 
                                personalizado y prevenir afecciones antes de que avancen. 
                                También es el momento ideal para resolver dudas sobre higiene 
                                bucal, alimentación y hábitos que pueden afectar la salud dental.
                            </p>
                            <p class="ParagraphBold"> 
                                Asistir regularmente a una consulta odontológica ayuda a 
                                mantener dientes sanos y prevenir procedimientos más 
                                invasivos en el futuro.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill1/ConsultaYDiagnóstico.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="0"></span>
                        </div>


                        <div class="SubContainerServices" id="SubContainerServices1" data-step="1">
                            <h3 class="HeadingSmall">Aplicación de flúor</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph"> 
                                El flúor fortalece el esmalte dental y previene la formación de caries. 
                                Su aplicación es rápida, indolora y actúa como una barrera protectora contra 
                                ácidos y bacterias. Se recomienda especialmente en niños y personas propensas 
                                a la caries. Complementa la higiene diaria y refuerza la salud bucal.
                                <br> 
                                <br>
                                Este servicio permite diseñar un plan de tratamiento 
                                personalizado y prevenir afecciones antes de que avancen. 
                                También es el momento ideal para resolver dudas sobre higiene 
                                bucal, alimentación y hábitos que pueden afectar la salud dental.
                            </p>
                            <p class="ParagraphBold"> 
                                Protege tu sonrisa con flúor y previene la aparición de caries.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/ConsultaYDiagnóstico.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="1"></span>
                        </div>


                        <div class="SubContainerServices" id="SubContainerServices2" data-step="2">
                            <h3 class="HeadingSmall">Técnica de cepillado y uso de hilo dental</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph">     
                                Nuestros especialistas te enseñan y refuerzan la técnica 
                                adecuada de cepillado y uso de hilo dental para asegurar una 
                                higiene bucal efectiva. Durante tu consulta, recibirás una 
                                demostración personalizada sobre cómo cepillar tus dientes 
                                correctamente, utilizando el movimiento suave y circular para 
                                evitar dañar el esmalte o las encías. Además, te explicarán cómo 
                                llegar a todas las áreas de tu boca, incluyendo las superficies 
                                posteriores y los molares.
                                <br>
                                El uso de hilo dental también se enseña para que puedas eliminar 
                                la placa entre los dientes, donde el cepillo no alcanza. 
                                Nuestros profesionales te guiarán en la forma correcta de usarlo, 
                                asegurándose de que no dañes las encías al pasarlo entre los dientes.
                                <br> 
                                <br>
                                Tener la guía de un especialista te 
                                garantiza que estás realizando ambos pasos correctamente
                            </p>
                            <p class="ParagraphBold"> 
                                Protege tu sonrisa con flúor y previene la aparición de caries.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/TécnicaDeCepillado.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="2"></span>
                        </div>
                    </div>



                    <div id="nivel2">



                        <div class="SubContainerServices" id="SubContainerServices5" data-step="5">
                            <h3 class="HeadingSmall">Resinas</h3>
                            <h4 class="SubHeadingVerde">Según diagnóstico y necesidad del paciente</h4>
                            <p class="Paragraph"> 
                                Reparamos caries o fracturas dentales utilizando 
                                resinas del color del diente, para restaurar la forma y 
                                función sin comprometer la estética. Es un tratamiento rápido, 
                                seguro y con resultados naturales. Además, permite conservar al
                                máximo la estructura dental original.
                            </p>
                            <p class="ParagraphBold"> 
                                Pequeños retoques que hacen una gran diferencia en tu sonrisa.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill2/Resinas.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="5"></span>
                        </div>



                        <div class="SubContainerServices" id="SubContainerServices6" data-step="6">
                            <h3 class="HeadingSmall">Brackets</h3>
                            <h4 class="SubHeadingVerde">Controles mensuales</h4>
                            <p class="Paragraph"> 
                                Alineamos tu dentadura corrigiendo problemas de mordida 
                                y posición dental con sistemas de ortodoncia convencionales. 
                                Es una opción efectiva y confiable para lograr resultados funcionales 
                                y estéticos. Requiere constancia y cuidado, pero los beneficios son 
                                duraderos.
                            </p>
                            <p class="ParagraphBold"> 
                                Transformar tu sonrisa es un proceso… y vale totalmente la pena.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Brackets.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="6"></span>
                        </div>




                        <div class="SubContainerServices" id="SubContainerServices7" data-step="7">
                            <h3 class="HeadingSmall">Ortopedia</h3>
                            <h4 class="SubHeadingVerde">Según etapa de crecimiento</h4>
                            <p class="Paragraph">     
                                Guiamos el crecimiento y desarrollo de los maxilares y dientes en niños 
                                y adolescentes para prevenir problemas futuros. Utilizamos aparatos 
                                funcionales adaptados a cada etapa de crecimiento. Un abordaje temprano 
                                puede evitar tratamientos más complejos a futuro.
                            </p>
                            <p class="ParagraphBold"> 
                                Un tratamiento a tiempo puede marcar la diferencia de por vida.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Ortopedia.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="7"></span>
                        </div>


                    </div>
                    <div id="nivel3">




                        <div class="SubContainerServices" id="SubContainerServices10" data-step="10">
                            <h3 class="HeadingSmall">Coronas</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico y rehabilitación dental</h4>
                            <p class="Paragraph"> 
                                Recubrimos dientes dañados o debilitados con coronas personalizadas 
                                que restauran su forma, tamaño y función. Son ideales para proteger piezas 
                                después de una endodoncia o grandes restauraciones. También mejoran la estética y la mordida.
                            </p>
                            <p class="ParagraphBold"> 
                                Una solución fuerte, duradera y con apariencia natural.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/Coronas.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="10"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices11" data-step="11">
                            <h3 class="HeadingSmall">Endodoncias</h3>
                            <h4 class="SubHeadingCafe">Evaluación y seguimiento según cada caso</h4>
                            <p class="Paragraph"> 
                                Tratamos infecciones o lesiones en el interior del diente, 
                                eliminando la pulpa dañada para conservar la pieza natural. 
                                Es una alternativa eficaz para evitar extracciones y aliviar el dolor.
                                <br> 
                                <br>
                            </p>
                            <p class="ParagraphBold"> 
                                Salvar un diente también es cuidar tu salud integral.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Endodoncias.png" />
                            <span class="ColumnBullet left-column-bullet" data-step="11"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices12" data-step="12">
                            <h3 class="HeadingSmall">Apicectomía</h3>
                            <h4 class="SubHeadingCafe">Según evaluación endodóntica</h4>
                            <p class="Paragraph">     
                                Es un procedimiento quirúrgico que elimina la punta de la raíz y 
                                el tejido infectado cuando un tratamiento de conducto no es suficiente. 
                                Conservamos la pieza natural y favorecemos la cicatrización ósea.
                                <br> 
                                <br>
                            </p>
                            <p class="ParagraphBold"> 
                                Precisión quirúrgica para preservar tu sonrisa.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Apicectomia.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="12"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices13" data-step="13">
                            <h3 class="HeadingSmall">Corona sobre implante</h3>
                            <h4 class="SubHeadingCafe">Colocación en fases, según integración del implante</h4>
                            <p class="Paragraph"> 
                                Rehabilitamos dientes perdidos colocando una corona sobre un 
                                implante previamente integrado al hueso. 
                                La corona se diseña a medida para que se vea y funcione como un diente natural.
                            </p>
                            <p class="ParagraphBold"> 
                                Recupera tu sonrisa con seguridad y naturalidad.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/CoronaSobreImplante.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="13"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices14" data-step="14">
                            <h3 class="HeadingSmall">Raspado y Alisado Radicular</h3>
                            <h4 class="SubHeadingCafe">Recomendado en casos de enfermedad periodontal</h4>
                            <p class="Paragraph"> 
                                Eliminamos sarro acumulado bajo 
                                la encía para tratar la inflamación y evitar 
                                la pérdida ósea. Es un procedimiento fundamental para estabilizar 
                                enfermedades periodontales.
                                <br> 
                                <br>
                            </p>
                            <p class="ParagraphBold"> 
                                Salud gingival profunda para conservar tus dientes.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Raspado.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="14"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices15" data-step="15">
                            <h3 class="HeadingSmall">Prótesis removibles</h3>
                            <h4 class="SubHeadingCafe">Controles periódicos recomendados</h4>
                            <p class="Paragraph">     
                                Reemplazamos varios dientes con estructuras que el paciente 
                                puede retirar. Son una alternativa funcional y accesible para recuperar 
                                la sonrisa y la masticación.
                                <br> 
                                <br>
                            </p>
                            <p class="ParagraphBold"> 
                                Una opción flexible para volver a sonreír con confianza.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Protesis.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="15"></span>
                        </div>
                    </div>
                    <div id="nivel4">
                        <div class="SubContainerServices" id="SubContainerServices21" data-step="21">
                            <h3 class="HeadingSmall">Extracciones</h3>
                            <h4 class="SubHeadingRojo">Según diagnóstico clínico</h4>
                            <p class="Paragraph"> 
                                Removemos piezas dentales cuando ya no pueden recuperarse por 
                                caries avanzadas, fracturas o enfermedad periodontal. 
                                Realizamos el procedimiento de forma segura, cuidando tu 
                                bienestar y recuperación.
                            </p>
                            <p class="ParagraphBold"> 
                                A veces decir adiós a un diente es 
                                el primer paso hacia una sonrisa más sana.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill4/Extracciones.jpg" />
                            <span class="ColumnBullet left-column-bullet" data-step="21"></span>
                        </div>
                    </div>
                </div>
                <div class="ScrollIndicator">
                    <div class="ScrollLine"></div>
                </div>
                <div class="Col50Right LeftColServices">
                    <div id="nivel1-continuation">
                        <div class="SubContainerServices" id="SubContainerServices3" data-step="3">
                            <h3 class="HeadingSmall">Limpieza</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph"> 
                                Eliminamos sarro y placa acumulada en dientes y encías, 
                                previniendo caries y enfermedades bucales. 
                                Utilizamos herramientas especializadas para 
                                remover residuos, seguido de un pulido para suavizar la 
                                superficie dental y prevenir nuevas acumulaciones. 
                                Este procedimiento mejora la salud bucal, el aliento y 
                                la apariencia de la sonrisa.
                            </p>
                            <p class="ParagraphBold"> 
                                Una sonrisa sana comienza con prevención y 
                                visitas dentales regulares.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Limpieza.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="3"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices4" data-step="4">
                            <h3 class="HeadingSmall">Selladores</h3>
                            <h4 class="SubHeadingVerde">2 a 4 años, según desgaste</h4>
                            <p class="Paragraph"> 
                                Los selladores son una capa protectora que se 
                                aplica en las superficies de masticación de los 
                                molares para prevenir caries. Crean una barrera 
                                que impide la acumulación de bacterias y restos de 
                                alimentos en las fisuras del esmalte. 
                                Son ideales para niños y adolescentes, pero también 
                                benefician a adultos con alto riesgo de caries.
                            </p>
                            <p class="ParagraphBold"> 
                                Previene caries con selladores y protege tu sonrisa por más tiempo.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Selladores.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="4"></span>
                        </div>
                    </div>
                    <div id="nivel2-continuation">
                        <div class="SubContainerServices" id="SubContainerServices8" data-step="8">
                            <h3 class="HeadingSmall">Blanqueamiento</h3>
                            <h4 class="SubHeadingVerde">Recomendado una o dos veces al año</h4>
                            <p class="Paragraph"> 
                                Eliminamos manchas y aclaramos el tono de tus dientes con técnicas 
                                profesionales que cuidan tu esmalte y tu salud bucal. 
                                Ideal para quienes buscan una sonrisa más brillante y segura. 
                                El procedimiento es sencillo y ofrece resultados visibles desde la primera sesión.
                            </p>
                            <p class="ParagraphBold"> 
                                Una sonrisa luminosa es una sonrisa que se nota.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Blanqueamiento.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="8"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices9" data-step="9">
                            <h3 class="HeadingSmall">Alineadores invisibles</h3>
                            <h4 class="SubHeadingVerde">Controles cada 4 a 6 semanas</h4>
                            <p class="Paragraph"> 
                                Corrigen la posición de tus dientes de forma cómoda, 
                                removible y discreta. Los alineadores invisibles son ideales para 
                                quienes buscan resultados efectivos sin alterar su rutina ni su imagen. 
                                Además, permiten mantener una mejor higiene bucal durante el tratamiento.
                            </p>
                            <p class="ParagraphBold"> 
                                Ortodoncia a tu ritmo, sin que nadie lo note.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Alineadores.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="9"></span>
                        </div>
                    </div>
                    <div id="nivel3-continuation">
                        <div class="SubContainerServices" id="SubContainerServices16" data-step="16">
                            <h3 class="HeadingSmall">Incrustaciones</h3>
                            <h4 class="SubHeadingCafe">Según necesidad clínica</h4>
                            <p class="Paragraph"> 
                                Reparamos daños moderados en piezas dentales con
                                incrustaciones que se adaptan perfectamente al diente. 
                                Son más resistentes que una resina y menos invasivas que 
                                una corona completa. Ideales para conservar estructura dental sana.
                            </p>
                            <p class="ParagraphBold"> 
                                Precisión, durabilidad y cuidado en un solo tratamiento.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Incrustaciones.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="16"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices17" data-step="17">
                            <h3 class="HeadingSmall">Retratamientos</h3>
                            <h4 class="SubHeadingCafe">Cuando una endodoncia previa presenta complicaciones</h4>
                            <p class="Paragraph"> 
                                Revisamos y corregimos tratamientos de conductos que no 
                                sanaron correctamente, eliminando infecciones y restaurando 
                                la función del diente. Requiere precisión, experiencia y tecnología 
                                especializada.
                            </p>
                            <p class="ParagraphBold"> 
                                Una segunda oportunidad para tu pieza dental.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Retratamientos.png" />
                            <span class="ColumnBullet right-column-bullet" data-step="17"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices18" data-step="18">
                            <h3 class="HeadingSmall">Puentes fijos</h3>
                            <h4 class="SubHeadingCafe">Según plan de rehabilitación</h4>
                            <p class="Paragraph"> 
                                Reemplazamos uno o más dientes ausentes uniendo coronas 
                                a piezas adyacentes. Son una solución estable, funcional 
                                y estética que mejora la mordida y la pronunciación.
                            </p>
                            <p class="ParagraphBold"> 
                                Un puente entre la funcionalidad y la confianza.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/PuentesFijos.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="18"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices19" data-step="19">
                            <h3 class="HeadingSmall">Carillas</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico estético</h4>
                            <p class="Paragraph"> 
                                Corrigen color, forma y alineación de los dientes 
                                frontales con láminas delgadas de porcelana o resina 
                                adheridas a la superficie. Son ideales para transformar 
                                la sonrisa de forma rápida y duradera.
                            </p>
                            <p class="ParagraphBold"> 
                                Una sonrisa renovada, sin perder tu esencia.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Carillas.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="19"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices20" data-step="20">
                            <h3 class="HeadingSmall">Prótesis fija</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico de rehabilitación</h4>
                            <p class="Paragraph"> 
                                Reponemos piezas perdidas con estructuras fijas que 
                                se cementan sobre dientes o implantes. Ofrecen estabilidad, 
                                comodidad y un resultado estético de alta calidad.
                            </p>
                            <p class="ParagraphBold"> 
                                Funcionalidad y estética que se integran a tu día a día.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/ProtesisFijas.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="20"></span>
                        </div>
                    </div>
                    <div id="nivel4-continuation">
                        <div class="SubContainerServices" id="SubContainerServices22" data-step="22">
                            <h3 class="HeadingSmall">Rehabilitación</h3>
                            <h4 class="SubHeadingRojo">Según plan integral personalizado</h4>
                            <p class="Paragraph"> 
                                Diseñamos tratamientos que restauran la funcionalidad y 
                                estética bucal en casos complejos, combinando diferentes 
                                especialidades como prótesis, implantes o endodoncia. 
                                Cada plan se adapta a tus necesidades y objetivos.
                                <br> 
                                <br>
                            </p>
                            <p class="ParagraphBold"> 
                                Recuperar tu sonrisa es también recuperar calidad de vida.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Rehabilitacion.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="22"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices23" data-step="23">
                            <h3 class="HeadingSmall">Implantes</h3>
                            <h4 class="SubHeadingRojo">Proceso por fases, con controles postoperatorios</h4>
                            <p class="Paragraph">     
                                Reemplazamos raíces dentales con tornillos de titanio 
                                que se integran al hueso, sobre los que colocamos coronas, 
                                puentes o prótesis. Son la opción más duradera y estable para 
                                recuperar piezas perdidas.
                                <br>
                                <br>
                                Tener la guía de un especialista te 
                                garantiza que estás realizando ambos pasos correctamente
                            </p>
                            <p class="ParagraphBold"> 
                                Vuelve a masticar, hablar y sonreír con total confianza.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Implantes.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="23"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices24" data-step="24">
                            <h3 class="HeadingSmall">Cirugía de terceros molares</h3>
                            <h4 class="SubHeadingRojo">Según desarrollo y evaluación radiográfica</h4>
                            <p class="Paragraph"> 
                                Extraemos muelas del juicio cuando causan dolor, 
                                presión o problemas de alineación. Se realiza bajo 
                                anestesia local y con técnicas que favorecen una recuperación rápida.
                            </p>
                            <p class="ParagraphBold"> 
                                Tu comodidad y salud bucal siempre son nuestra prioridad.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/CirugiaTercerosMolares.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="24"></span>
                        </div>
                        <div class="SubContainerServices" id="SubContainerServices25" data-step="25">
                            <h3 class="HeadingSmall">Mini implantes</h3>
                            <h4 class="SubHeadingRojo">Colocación en una sola sesión (según caso)</h4>
                            <p class="Paragraph"> 
                                Son una alternativa menos invasiva que 
                                los implantes tradicionales, ideales para 
                                estabilizar prótesis removibles o reemplazar 
                                dientes pequeños. Requieren menor tiempo de recuperación 
                                y son más accesibles.
                            </p>
                            <p class="ParagraphBold"> 
                                Soluciones pequeñas, con grandes beneficios para tu sonrisa.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/MiniImplantes.jpg" />
                            <span class="ColumnBullet right-column-bullet" data-step="25"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        serviciosContent.innerHTML = nivelHTML;
        console.log('ServiciosContent HTML set:', serviciosContent.innerHTML.substring(0, 100) + '...');
        initGSAPAnimations();
        initScrollIndicator();
    }

    function initGSAPAnimations() {
        console.log('Initializing GSAP animations');
        const steps = document.querySelectorAll('.SubContainerServices');
        console.log('Found steps:', steps.length);

        steps.forEach((step, index) => {
            const duration = gsap.utils.clamp(0.5, 1, window.innerWidth / 1000);
            const stagger = gsap.utils.clamp(0.1, 0.3, window.innerWidth / 2000);

            gsap.from(step.querySelector('.HeadingSmall'), {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: -50,
                opacity: 0,
                duration: duration,
                ease: 'power3.out'
            });

            gsap.from(step.querySelector('.SubHeadingVerde, .SubHeadingCafe, .SubHeadingRojo'), {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                x: -30,
                opacity: 0,
                duration: duration,
                delay: stagger,
                ease: 'power2.out'
            });

            gsap.from(step.querySelector('.imgServices'), {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8,
                opacity: 0,
                duration: duration + 0.2,
                ease: 'back.out(1.7)'
            });
        });

        // Detectar niveles al desplazarse
        const niveles = ['#nivel1', '#nivel2', '#nivel3', '#nivel4'];
        niveles.forEach((nivel, index) => {
            console.log('Setting up ScrollTrigger for', nivel, 'index:', index);
            ScrollTrigger.create({
                trigger: nivel,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => {
                    console.log('Entered nivel:', nivel, 'index:', index);
                    if (!isAnimating && currentIndex !== index) {
                        currentIndex = index;
                        updateSelectorState('scrollTriggerEnter');
                    }
                },
                onEnterBack: () => {
                    console.log('Entered back nivel:', nivel, 'index:', index);
                    if (!isAnimating && currentIndex !== index) {
                        currentIndex = index;
                        updateSelectorState('scrollTriggerEnterBack');
                    }
                }
            });
        });
    }

    function initScrollIndicator() {
        console.log('Initializing ScrollIndicator');
        const nivelContent = document.querySelector('.NivelContent');
        const scrollIndicator = document.querySelector('.ScrollIndicator');
        const line = document.querySelector('.ScrollLine');
        const steps = document.querySelectorAll('.SubContainerServices');

        if (!nivelContent || !scrollIndicator || !line || !steps.length) {
            console.error('ScrollIndicator elements not found:', { nivelContent, scrollIndicator, line, steps });
            return;
        }

        // Ensure ScrollLine starts at height 0 and has a default color
        gsap.set(line, { height: '0px', backgroundColor: '#d6e1b6' });

        let activeStep = -1; // Track the currently active step
        let previousActiveStep = -1; // Track the previous active step to detect changes
        const stepStates = Array.from(steps).map(() => false); // Track active state for each step
        const bulletHeights = Array(steps.length).fill(0); // Store fixed heights for each bullet

        // Pre-calculate fixed heights for each SubContainerServices (center position)
        steps.forEach((step, index) => {
            const stepNum = parseInt(step.dataset.step);
            const bullet = document.querySelector(`.ColumnBullet[data-step="${stepNum}"]`);
            if (!bullet) return;

            // Calculate the fixed height when the SubContainerServices first becomes active
            ScrollTrigger.create({
                trigger: step,
                start: 'top center',
                end: 'top center',
                onEnter: () => {
                    const scrollIndicatorRect = scrollIndicator.getBoundingClientRect();
                    const stepRect = step.getBoundingClientRect();
                    // Calculate the center (50% vertical position) of the SubContainerServices
                    const stepCenter = stepRect.top + stepRect.height / 2;
                    const height = stepCenter - scrollIndicatorRect.top;
                    bulletHeights[index] = Math.max(height, 0); // Store the fixed height
                    console.log(`Fixed height for step ${stepNum}: ${bulletHeights[index]}px`);
                }
            });
        });

        // Use ScrollTrigger to monitor each SubContainerServices and toggle active states
        steps.forEach((step, index) => {
            const stepNum = parseInt(step.dataset.step);
            const bullet = document.querySelector(`.ColumnBullet[data-step="${stepNum}"]`);
            if (!bullet) return;

            ScrollTrigger.create({
                trigger: step,
                start: 'top 70%', // Adjusted to reduce overlap
                end: 'bottom 30%', // Adjusted to reduce overlap
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    stepStates[index] = true;
                    updateActiveStep(true); // Scrolling down
                    console.log(`Bullet activated for step ${stepNum} (onEnter)`);
                },
                onLeave: () => {
                    stepStates[index] = false;
                    updateActiveStep(false); // Scrolling down
                    console.log(`Bullet deactivated for step ${stepNum} (onLeave)`);
                },
                onEnterBack: () => {
                    stepStates[index] = true;
                    updateActiveStep(false); // Scrolling up
                    console.log(`Bullet activated for step ${stepNum} (onEnterBack)`);
                },
                onLeaveBack: () => {
                    stepStates[index] = false;
                    updateActiveStep(true); // Scrolling up
                    console.log(`Bullet deactivated for step ${stepNum} (onLeaveBack)`);
                }
            });
        });

        // Function to update the active step, ScrollLine height, and auto-scroll
        function updateActiveStep(isScrollingDown) {
            let highestActiveStep = -1;
            let lowestActiveStep = Infinity;

            // Determine the highest and lowest active steps
            stepStates.forEach((isActive, index) => {
                if (isActive) {
                    const stepNum = parseInt(steps[index].dataset.step);
                    const bullet = document.querySelector(`.ColumnBullet[data-step="${stepNum}"]`);
                    if (bullet) {
                        bullet.classList.remove('inactive');
                        bullet.classList.add('active');
                    }
                    if (stepNum > highestActiveStep) {
                        highestActiveStep = stepNum;
                    }
                    if (stepNum < lowestActiveStep) {
                        lowestActiveStep = stepNum;
                    }
                } else {
                    const stepNum = parseInt(steps[index].dataset.step);
                    const bullet = document.querySelector(`.ColumnBullet[data-step="${stepNum}"]`);
                    if (bullet) {
                        bullet.classList.remove('active');
                        bullet.classList.add('inactive');
                    }
                }
            });

            // Always use the highest active step as the predominant one
            if (highestActiveStep >= 0) {
                activeStep = highestActiveStep;
            } else {
                activeStep = -1;
            }

            // Update ScrollLine height and auto-scroll only if the active step has changed
            if (activeStep !== previousActiveStep) {
                // Update ScrollLine height
                if (activeStep >= 0) {
                    const stepIndex = Array.from(steps).findIndex(step => parseInt(step.dataset.step) === activeStep);
                    if (stepIndex >= 0 && bulletHeights[stepIndex] > 0) {
                        gsap.to(line, {
                            height: `${bulletHeights[stepIndex]}px`,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                        console.log(`ScrollLine snapped to step ${activeStep}, height: ${bulletHeights[stepIndex]}px`);

                        // Auto-scroll to the center of the predominant active SubContainerServices
                        const predominantStep = steps[stepIndex];
                        if (predominantStep && !isUserScrolling) {
                            const stepRect = predominantStep.getBoundingClientRect();
                            const stepCenter = stepRect.top + stepRect.height / 2;
                            const viewportCenter = window.innerHeight / 2;
                            const scrollOffset = stepCenter - viewportCenter;

                            gsap.to(window, {
                                scrollTo: {
                                    y: window.scrollY + scrollOffset,
                                    autoKill: true
                                },
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                            console.log(`Auto-scrolling to center of step ${activeStep}`);
                        }
                    }
                } else {
                    gsap.to(line, {
                        height: '0px',
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                    console.log('ScrollLine reset to height: 0px');
                }

                previousActiveStep = activeStep; // Update the previous active step
            }
        }

        // Pin ScrollIndicator to keep it in view
        ScrollTrigger.create({
            trigger: nivelContent,
            start: 'top center-=400',
            end: () => {
                const lastStep = document.querySelector('#SubContainerServices21'); // Stop at the last active step
                if (!lastStep) return 'bottom bottom';
                const lastStepRect = lastStep.getBoundingClientRect();
                const nivelContentRect = nivelContent.getBoundingClientRect();
                return `bottom+=${lastStepRect.top - nivelContentRect.top + lastStepRect.height}`;
            },
            pin: '.ScrollIndicator',
            pinSpacing: false
        });

        // Cambiar el color de ScrollLine según el nivel activo
        const niveles = [
            { selector: '#nivel1', color: '#d4e1b1' },
            { selector: '#nivel2', color: '#7F9B44' },
            { selector: '#nivel3', color: '#E2DAAC' },
            { selector: '#nivel4', color: '#732525' }
        ];

        niveles.forEach(nivel => {
            ScrollTrigger.create({
                trigger: nivel.selector,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => {
                    gsap.set(line, { backgroundColor: nivel.color });
                    console.log(`ScrollLine color changed to ${nivel.color} for ${nivel.selector}`);
                },
                onEnterBack: () => {
                    gsap.set(line, { backgroundColor: nivel.color });
                    console.log(`ScrollLine color changed back to ${nivel.color} for ${nivel.selector}`);
                }
            });
        });
    }

    servicioButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating) {
                currentIndex = index;
                updateSelectorState('buttonClick');
            }
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating) {
                currentIndex = index;
                updateSelectorState('dotClick');
            }
        });
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex > 0 && !isAnimating) {
            currentIndex--;
            updateSelectorState('prevButton');
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex < servicioButtons.length - 1 && !isAnimating) {
            currentIndex++;
            updateSelectorState('nextButton');
        }
    });

    updateContent(currentIndex);
    updateSelectorState('initial');
}

window.initServiciosComponent = initServiciosComponent;