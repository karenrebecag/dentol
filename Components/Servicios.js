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

    window.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 300);
    });

    function updateSelectorState(source = 'unknown') {
        console.log('updateSelectorState called, currentIndex:', currentIndex, 'source:', source);
        servicioButtons.forEach((btn, index) => {
            btn.classList.remove('active', 'inactive');
            btn.classList.add(index === currentIndex ? 'active' : 'inactive');
        });

        dots.forEach((dot, index) => {
            dot.classList.remove('dot-active', 'dot-inactive');
            dot.classList.add(index === currentIndex ? 'dot-active' : 'dot-inactive');
        });

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

        const targetId = servicioButtons[currentIndex].dataset.target;
        const targetElement = document.querySelector(`#${targetId}`);
        if (targetElement && targetElement !== lastScrollTarget && !isUserScrolling && !isInitialLoad) {
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
            <!-- Unified Servicios -->
            <section class="NivelContent" aria-label="Servicios dentales por nivel">
                <div class="Col50">
                    <section id="nivel1" aria-label="Nivel 1: Preventivo y Básico">
                        <article class="SubContainerServices" data-step="0">
                            <h3 class="HeadingSmall">Consulta y diagnóstico</h3>
                            <p class="Paragraph" lang="es">
                                La consulta y diagnóstico dental en nuestra clínica dental en Cuernavaca es fundamental para una salud bucal óptima. Nuestros especialistas realizan evaluaciones detalladas de dientes, encías y tejidos orales, detectando problemas como caries, enfermedad periodontal o maloclusiones. Usamos radiografías para análisis precisos cuando es necesario, diseñando planes de tratamiento personalizados que previenen afecciones futuras.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Visitas regulares a Dentol aseguran dientes sanos y evitan tratamientos invasivos.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill1/ConsultaYDiagnóstico.jpg" alt="Consulta y diagnóstico dental en Cuernavaca" />
                            <span class="ColumnBullet left-column-bullet" data-step="0"></span>
                        </article>
                        <article class="SubContainerServices" data-step="1">
                            <h3 class="HeadingSmall">Aplicación de flúor</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph" lang="es">
                                La aplicación de flúor fortalece el esmalte dental y previene caries. Es un procedimiento rápido e indoloro que crea una barrera contra ácidos y bacterias, ideal para niños y adultos propensos a caries. En Dentol, complementamos tu higiene diaria con este tratamiento para una sonrisa saludable.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Protege tu sonrisa con flúor en nuestra clínica dental en Cuernavaca.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/ConsultaYDiagnóstico.jpg" alt="Aplicación de flúor dental para prevención de caries" />
                            <span class="ColumnBullet left-column-bullet" data-step="1"></span>
                        </article>
                        <article class="SubContainerServices" data-step="2">
                            <h3 class="HeadingSmall">Técnica de cepillado y uso de hilo dental</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph" lang="es">
                                En Dentol, enseñamos técnicas efectivas de cepillado y uso de hilo dental para una higiene bucal óptima. Recibes una demostración personalizada para cepillar correctamente, con movimientos suaves y circulares, y aprendes a usar el hilo dental sin dañar tus encías, asegurando una limpieza completa.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Mejora tu higiene bucal con la guía de nuestros especialistas en Cuernavaca.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/TécnicaDeCepillado.jpg" alt="Técnica de cepillado dental profesional" />
                            <span class="ColumnBullet left-column-bullet" data-step="2"></span>
                        </article>
                    </section>
                    <section id="nivel2" aria-label="Nivel 2: Restaurativo y Correctivo">
                        <article class="SubContainerServices" data-step="5">
                            <h3 class="HeadingSmall">Resinas</h3>
                            <h4 class="SubHeadingVerde">Según diagnóstico</h4>
                            <p class="Paragraph" lang="es">
                                Reparamos caries o fracturas con resinas del color del diente, restaurando forma y función con resultados naturales. Este tratamiento rápido y seguro conserva la estructura dental, ofreciendo una solución estética en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Mejora tu sonrisa con resinas de alta calidad.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill2/Resinas.jpg" alt="Reparación dental con resinas estéticas" />
                            <span class="ColumnBullet left-column-bullet" data-step="5"></span>
                        </article>
                        <article class="SubContainerServices" data-step="6">
                            <h3 class="HeadingSmall">Brackets</h3>
                            <h4 class="SubHeadingVerde">Controles mensuales</h4>
                            <p class="Paragraph" lang="es">
                                Corregimos problemas de mordida y alineación con brackets tradicionales. Este tratamiento de ortodoncia en Dentol es efectivo, requiere constancia y ofrece resultados funcionales y estéticos duraderos.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Transforma tu sonrisa con ortodoncia profesional en Cuernavaca.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Brackets.jpg" alt="Tratamiento de ortodoncia con brackets" />
                            <span class="ColumnBullet left-column-bullet" data-step="6"></span>
                        </article>
                        <article class="SubContainerServices" data-step="7">
                            <h3 class="HeadingSmall">Ortopedia</h3>
                            <h4 class="SubHeadingVerde">Según etapa de crecimiento</h4>
                            <p class="Paragraph" lang="es">
                                Guiamos el crecimiento de maxilares y dientes en niños y adolescentes con aparatos funcionales. Este tratamiento temprano en Dentol previene problemas futuros, reduciendo la necesidad de procedimientos complejos.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Un tratamiento oportuno para una sonrisa saludable.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Ortopedia.jpg" alt="Ortopedia dental para niños" />
                            <span class="ColumnBullet left-column-bullet" data-step="7"></span>
                        </article>
                    </section>
                    <section id="nivel3" aria-label="Nivel 3: Especializado y Avanzado">
                        <article class="SubContainerServices" data-step="10">
                            <h3 class="HeadingSmall">Coronas</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico</h4>
                            <p class="Paragraph" lang="es">
                                Restauramos dientes dañados con coronas personalizadas que mejoran forma, función y estética. Ideales tras endodoncias o grandes restauraciones, ofrecen durabilidad y naturalidad en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Coronas para una sonrisa fuerte y natural.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/Coronas.jpg" alt="Coronas dentales personalizadas" />
                            <span class="ColumnBullet left-column-bullet" data-step="10"></span>
                        </article>
                        <article class="SubContainerServices" data-step="11">
                            <h3 class="HeadingSmall">Endodoncias</h3>
                            <h4 class="SubHeadingCafe">Según evaluación</h4>
                            <p class="Paragraph" lang="es">
                                Tratamos infecciones internas del diente, preservando la pieza natural y aliviando el dolor. En Dentol, nuestras endodoncias evitan extracciones y cuidan tu salud bucal.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Salva tus dientes con endodoncias especializadas.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Endodoncias.png" alt="Tratamiento de endodoncia profesional" />
                            <span class="ColumnBullet left-column-bullet" data-step="11"></span>
                        </article>
                        <article class="SubContainerServices" data-step="12">
                            <h3 class="HeadingSmall">Apicectomía</h3>
                            <h4 class="SubHeadingCafe">Según evaluación</h4>
                            <p class="Paragraph" lang="es">
                                Realizamos apicectomías para eliminar infecciones persistentes en la raíz dental, preservando el diente y promoviendo la cicatrización ósea con técnicas precisas.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Solución quirúrgica para dientes comprometidos.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Apicectomia.jpg" alt="Apicectomía dental avanzada" />
                            <span class="ColumnBullet left-column-bullet" data-step="12"></span>
                        </article>
                        <article class="SubContainerServices" data-step="13">
                            <h3 class="HeadingSmall">Corona sobre implante</h3>
                            <h4 class="SubHeadingCafe">Según integración</h4>
                            <p class="Paragraph" lang="es">
                                Rehabilitamos dientes perdidos con coronas sobre implantes, diseñadas para verse y funcionar como dientes naturales, ofreciendo resultados duraderos en Dentol.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Recupera tu sonrisa con implantes y coronas.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/CoronaSobreImplante.jpg" alt="Corona sobre implante dental" />
                            <span class="ColumnBullet left-column-bullet" data-step="13"></span>
                        </article>
                        <article class="SubContainerServices" data-step="14">
                            <h3 class="HeadingSmall">Raspado y alisado radicular</h3>
                            <h4 class="SubHeadingCafe">Para enfermedad periodontal</h4>
                            <p class="Paragraph" lang="es">
                                Eliminamos sarro bajo las encías para tratar la inflamación y prevenir pérdida ósea. Este procedimiento en Dentol estabiliza la salud periodontal.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Cuida tus encías con tratamientos especializados.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Raspado.jpg" alt="Raspado y alisado radicular periodontal" />
                            <span class="ColumnBullet left-column-bullet" data-step="14"></span>
                        </article>
                        <article class="SubContainerServices" data-step="15">
                            <h3 class="HeadingSmall">Prótesis removibles</h3>
                            <h4 class="SubHeadingCafe">Controles periódicos</h4>
                            <p class="Paragraph" lang="es">
                                Reemplazamos dientes con prótesis removibles, funcionales y accesibles, que restauran la sonrisa y la masticación en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Sonrisas completas con prótesis prácticas.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Protesis.jpg" alt="Prótesis dentales removibles" />
                            <span class="ColumnBullet left-column-bullet" data-step="15"></span>
                        </article>
                    </section>
                    <section id="nivel4" aria-label="Nivel 4: Quirúrgico y Rehabilitador">
                        <article class="SubContainerServices" data-step="21">
                            <h3 class="HeadingSmall">Extracciones</h3>
                            <h4 class="SubHeadingRojo">Según diagnóstico</h4>
                            <p class="Paragraph" lang="es">
                                Realizamos extracciones seguras de dientes irrecuperables por caries, fracturas o enfermedad periodontal, priorizando tu comodidad y recuperación.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Un paso hacia una sonrisa más saludable.
                            </p>
                            <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill4/Extracciones.jpg" alt="Extracciones dentales seguras" />
                            <span class="ColumnBullet left-column-bullet" data-step="21"></span>
                        </article>
                    </section>
                </div>
                <div class="ScrollIndicator">
                    <div class="ScrollLine"></div>
                </div>
                <div class="Col50 LeftColServices">
                    <section id="nivel1-continuation" aria-label="Continuación Nivel 1">
                        <article class="SubContainerServices" data-step="3">
                            <h3 class="HeadingSmall">Limpieza</h3>
                            <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                            <p class="Paragraph" lang="es">
                                Eliminamos sarro y placa con limpiezas profesionales en Dentol, previniendo caries y enfermedades bucales. Incluye pulido para una sonrisa brillante y saludable.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Mantén tu sonrisa impecable con limpiezas regulares.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Limpieza.jpg" alt="Limpieza dental profesional en Cuernavaca" />
                            <span class="ColumnBullet right-column-bullet" data-step="3"></span>
                        </article>
                        <article class="SubContainerServices" data-step="4">
                            <h3 class="HeadingSmall">Selladores</h3>
                            <h4 class="SubHeadingVerde">2 a 4 años, según desgaste</h4>
                            <p class="Paragraph" lang="es">
                                Aplicamos selladores en molares para prevenir caries, creando una barrera protectora contra bacterias y restos de alimentos. Ideal para niños y adultos en Dentol.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Protege tus dientes con selladores duraderos.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Selladores.jpg" alt="Selladores dentales para prevención de caries" />
                            <span class="ColumnBullet right-column-bullet" data-step="4"></span>
                        </article>
                    </section>
                    <section id="nivel2-continuation" aria-label="Continuación Nivel 2">
                        <article class="SubContainerServices" data-step="8">
                            <h3 class="HeadingSmall">Blanqueamiento</h3>
                            <h4 class="SubHeadingVerde">1-2 veces al año</h4>
                            <p class="Paragraph" lang="es">
                                Aclaramos tus dientes con técnicas seguras que eliminan manchas, logrando una sonrisa brillante en Dentol. Resultados visibles desde la primera sesión.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Luce una sonrisa radiante con nuestro blanqueamiento.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Blanqueamiento.jpg" alt="Blanqueamiento dental profesional" />
                            <span class="ColumnBullet right-column-bullet" data-step="8"></span>
                        </article>
                        <article class="SubContainerServices" data-step="9">
                            <h3 class="HeadingSmall">Alineadores invisibles</h3>
                            <h4 class="SubHeadingVerde">Controles cada 4-6 semanas</h4>
                            <p class="Paragraph" lang="es">
                                Corregimos la alineación dental con alineadores invisibles, cómodos y discretos. En Dentol, ofrecemos ortodoncia efectiva que se adapta a tu estilo de vida.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Sonrisas alineadas sin que nadie lo note.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Alineadores.jpg" alt="Alineadores invisibles para ortodoncia" />
                            <span class="ColumnBullet right-column-bullet" data-step="9"></span>
                        </article>
                    </section>
                    <section id="nivel3-continuation" aria-label="Continuación Nivel 3">
                        <article class="SubContainerServices" data-step="16">
                            <h3 class="HeadingSmall">Incrustaciones</h3>
                            <h4 class="SubHeadingCafe">Según necesidad</h4>
                            <p class="Paragraph" lang="es">
                                Reparamos daños moderados con incrustaciones personalizadas, más resistentes que resinas y menos invasivas que coronas, preservando la estructura dental.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Restauraciones precisas y duraderas en Dentol.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Incrustaciones.jpg" alt="Incrustaciones dentales de alta calidad" />
                            <span class="ColumnBullet right-column-bullet" data-step="16"></span>
                        </article>
                        <article class="SubContainerServices" data-step="17">
                            <h3 class="HeadingSmall">Retratamientos</h3>
                            <h4 class="SubHeadingCafe">Para endodoncias previas</h4>
                            <p class="Paragraph" lang="es">
                                Corregimos endodoncias fallidas, eliminando infecciones y restaurando el diente con tecnología avanzada en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Una segunda oportunidad para tu diente.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Retratamientos.png" alt="Retratamiento de endodoncia especializado" />
                            <span class="ColumnBullet right-column-bullet" data-step="17"></span>
                        </article>
                        <article class="SubContainerServices" data-step="18">
                            <h3 class="HeadingSmall">Puentes fijos</h3>
                            <h4 class="SubHeadingCafe">Según rehabilitación</h4>
                            <p class="Paragraph" lang="es">
                                Reemplazamos dientes ausentes con puentes fijos, uniendo coronas para mejorar mordida y estética. Solución estable en Dentol.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Recupera funcionalidad con puentes duraderos.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/PuentesFijos.jpg" alt="Puentes dentales fijos" />
                            <span class="ColumnBullet right-column-bullet" data-step="18"></span>
                        </article>
                        <article class="SubContainerServices" data-step="19">
                            <h3 class="HeadingSmall">Carillas</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico estético</h4>
                            <p class="Paragraph" lang="es">
                                Transformamos sonrisas con carillas de porcelana o resina, corrigiendo color, forma y alineación para un resultado natural y duradero.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Sonrisas perfectas con carillas en Dentol.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Carillas.jpg" alt="Carillas dentales estéticas" />
                            <span class="ColumnBullet right-column-bullet" data-step="19"></span>
                        </article>
                        <article class="SubContainerServices" data-step="20">
                            <h3 class="HeadingSmall">Prótesis fija</h3>
                            <h4 class="SubHeadingCafe">Según diagnóstico</h4>
                            <p class="Paragraph" lang="es">
                                Reponemos dientes con prótesis fijas cementadas sobre dientes o implantes, ofreciendo estabilidad y estética en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Prótesis fijas para una sonrisa funcional.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/ProtesisFijas.jpg" alt="Prótesis dentales fijas" />
                            <span class="ColumnBullet right-column-bullet" data-step="20"></span>
                        </article>
                    </section>
                    <section id="nivel4-continuation" aria-label="Continuación Nivel 4">
                        <article class="SubContainerServices" data-step="22">
                            <h3 class="HeadingSmall">Rehabilitación</h3>
                            <h4 class="SubHeadingRojo">Plan personalizado</h4>
                            <p class="Paragraph" lang="es">
                                Diseñamos tratamientos integrales en Dentol, combinando prótesis, implantes y endodoncias para restaurar funcionalidad y estética en casos complejos.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Recupera tu calidad de vida con rehabilitación dental.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Rehabilitacion.jpg" alt="Rehabilitación dental integral" />
                            <span class="ColumnBullet right-column-bullet" data-step="22"></span>
                        </article>
                        <article class="SubContainerServices" data-step="23">
                            <h3 class="HeadingSmall">Implantes</h3>
                            <h4 class="SubHeadingRojo">Proceso por fases</h4>
                            <p class="Paragraph" lang="es">
                                Reemplazamos raíces con implantes de titanio, integrados al hueso, soportando coronas o prótesis. La solución más duradera en Dentol Cuernavaca.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Implantes para masticar y sonreír con confianza.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Implantes.jpg" alt="Implantes dentales de titanio" />
                            <span class="ColumnBullet right-column-bullet" data-step="23"></span>
                        </article>
                        <article class="SubContainerServices" data-step="24">
                            <h3 class="HeadingSmall">Cirugía de terceros molares</h3>
                            <h4 class="SubHeadingRojo">Según evaluación</h4>
                            <p class="Paragraph" lang="es">
                                Extraemos muelas del juicio que causan dolor o problemas de alineación, con anestesia local y técnicas de recuperación rápida en Dentol.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Cirugías seguras para tu comodidad bucal.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/CirugiaTercerosMolares.jpg" alt="Extracción de muelas del juicio" />
                            <span class="ColumnBullet right-column-bullet" data-step="24"></span>
                        </article>
                        <article class="SubContainerServices" data-step="25">
                            <h3 class="HeadingSmall">Mini implantes</h3>
                            <h4 class="SubHeadingRojo">Sesión única, según caso</h4>
                            <p class="Paragraph" lang="es">
                                Ofrecemos mini implantes menos invasivos para estabilizar prótesis o reemplazar dientes pequeños, con recuperación rápida en Dentol.
                            </p>
                            <p class="ParagraphBold" lang="es">
                                Mini implantes para soluciones accesibles.
                            </p>
                            <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/MiniImplantes.jpg" alt="Mini implantes dentales" />
                            <span class="ColumnBullet right-column-bullet" data-step="25"></span>
                        </article>
                    </section>
                </div>
            </section>
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

        // Animación para HeadingSmall
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

        // Animación para SubHeading (Verde, Cafe, Rojo)
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

        // Animación para Paragraph y ParagraphBold (sin opacidad)
        gsap.from(step.querySelectorAll('.Paragraph, .ParagraphBold'), {
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: 30, // Solo desplazamiento
            duration: duration,
            stagger: stagger,
            ease: 'power2.out'
        });

        // Animación para imágenes
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
      const line = document.querySelector('.ScrollLine');
      const firstStep = document.querySelector('.SubContainerServices[data-step="0"]');
      const lastStep = document.querySelector('.SubContainerServices[data-step="25"]');

      if (!nivelContent || !line || !firstStep || !lastStep) {
          console.error('ScrollIndicator elements not found:', { nivelContent, line, firstStep, lastStep });
          return;
      }

      // Animar la barra indicadora (ScrollLine)
      gsap.to(line, {
          scrollTrigger: {
              trigger: nivelContent,
              start: 'top =20',
              end: 'bottom center',
              scrub: 0.06,
              pin: '.ScrollIndicator',
              pinSpacing: false
          },
          height: () => {
              const containerHeight = nivelContent.offsetHeight;
              const maxHeight = containerHeight * 0.7;
              return `${maxHeight}px`;
          },
          ease: 'none'
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

      // Configurar IntersectionObserver para los ColumnBullet con delay
      const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.7
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              const step = entry.target.dataset.step;
              const bullet = document.querySelector(`.ColumnBullet[data-step="${step}"]`);
              if (bullet) {
                  clearTimeout(bullet.dataset.timeoutId);

                  const timeoutId = setTimeout(() => {
                      if (entry.isIntersecting) {
                          bullet.classList.remove('inactive');
                          bullet.classList.add('active');
                      } else {
                          bullet.classList.remove('active');
                          bullet.classList.add('inactive');
                      }
                  }, 300);

                  bullet.dataset.timeoutId = timeoutId;
              }
          });
      }, observerOptions);

      // Observar todos los SubContainerServices
      document.querySelectorAll('.SubContainerServices').forEach(step => {
          observer.observe(step);
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
  isInitialLoad = false; // Desactivar la bandera después de la carga inicial
}

window.initServiciosComponent = initServiciosComponent;