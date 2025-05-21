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
            <button class="ServicioButton Pill Pill1 active" data-index="0" data-target="nivel1" aria-label="Seleccionar Nivel 1: Preventivo y Básico">
              <img src="/assets/Icons/Servicios/Pill1.svg" alt="Nivel 1" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle1">Nivel 1</div>
                <div class="PillSubTitle1">Preventivo y Básico</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill2 inactive" data-index="1" data-target="nivel2" aria-label="Seleccionar Nivel 2: Restaurativo y Correctivo">
              <img src="/assets/Icons/Servicios/Pill2.svg" alt="Nivel 2" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle2">Nivel 2</div>
                <div class="PillSubTitle2">Restaurativo y Correctivo</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill3 inactive" data-index="2" data-target="nivel3" aria-label="Seleccionar Nivel 3: Especializado y Avanzado">
              <img src="/assets/Icons/Servicios/Pill3.svg" alt="Nivel 3" class="PillIcon">
              <div class="ServicioText">
                <div class="PillTitle3">Nivel 3</div>
                <div class="PillSubTitle3">Especializado y Avanzado</div>
              </div>
            </button>
            <button class="ServicioButton Pill Pill4 inactive" data-index="3" data-target="nivel4" aria-label="Seleccionar Nivel 4: Quirúrgico y Rehabilitador">
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
          <button id="prevServicio" class="NavArrow disabled" type="button" aria-label="Servicio anterior">
            <img src="/assets/Icons/General/ArrowLeft.svg" alt="">
          </button>
          <span class="dot dot-active" data-slide="0" role="tab" aria-selected="true"></span>
          <span class="dot dot-inactive" data-slide="1" role="tab" aria-selected="false"></span>
          <span class="dot dot-inactive" data-slide="2" role="tab" aria-selected="false"></span>
          <span class="dot dot-inactive" data-slide="3" role="tab" aria-selected="false"></span>
          <button id="nextServicio" class="NavArrow" type="button" aria-label="Siguiente servicio">
            <img src="/assets/Icons/General/ArrowRight.svg" alt="">
          </button>
        </div>
      </div>

      <div id="ServiciosContent">
        <!-- Nivel 1 -->
        <section class="NivelContent" id="Nivel1Content">
          <div class="Col50Left RightColServices">
            <div id="nivel1">
              <div class="SubContainerServices" id="SubContainerServices0" data-step="0">
                <h3 class="HeadingSmall">Consulta y diagnóstico</h3>
                <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                <p class="Paragraph">
                  La consulta y diagnóstico dental es esencial para mantener una salud bucal óptima. Nuestros especialistas realizan una evaluación detallada de dientes, encías y tejidos orales para detectar problemas como caries, enfermedad periodontal o maloclusiones. En algunos casos, se utilizan radiografías para un análisis más preciso. <br><br>
                  Este servicio permite diseñar un plan de tratamiento personalizado y prevenir afecciones antes de que avancen. También es el momento ideal para resolver dudas sobre higiene bucal, alimentación y hábitos que pueden afectar la salud dental.
                </p>
                <p class="ParagraphBold">
                  Asistir regularmente a una consulta odontológica ayuda a mantener dientes sanos y prevenir procedimientos más invasivos en el futuro.
                </p>
                <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill1/ConsultaYDiagnóstico.jpg" loading="lazy" alt="Consulta y diagnóstico" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices3" data-step="1">
                <h3 class="HeadingSmall">Limpieza</h3>
                <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                <p class="Paragraph">
                  Eliminamos sarro y placa acumulada en dientes y encías, previniendo caries y enfermedades bucales. Utilizamos herramientas especializadas para remover residuos, seguido de un pulido para suavizar la superficie dental y prevenir nuevas acumulaciones. Este procedimiento mejora la salud bucal, el aliento y la apariencia de la sonrisa.
                </p>
                <p class="ParagraphBold">
                  Una sonrisa sana comienza con prevención y visitas dentales regulares.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Limpieza.jpg" loading="lazy" alt="Limpieza" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices1" data-step="2">
                <h3 class="HeadingSmall">Aplicación de flúor</h3>
                <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                <p class="Paragraph">
                  El flúor fortalece el esmalte dental y previene la formación de caries. Su aplicación es rápida, indolora y actúa como una barrera protectora contra ácidos y bacterias. Se recomienda especialmente en niños y personas propensas a la caries. Complementa la higiene diaria y refuerza la salud bucal.
                </p>
                <p class="ParagraphBold">
                  Protege tu sonrisa con flúor y previene la aparición de caries.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/AplicacionFluor.jpg" loading="lazy" alt="Aplicación de flúor" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>

          <!-- Contenedor de indicador de scroll (barra1) -->
          <div class="progress-container barra1">
            <div class="vertical-line" id="myBar1"></div>
            <div class="vertical-line" id="lineTwo"></div>
          </div>

          <div class="Col50Right LeftColServices">
            <div id="nivel1-continuation">
              <div class="SubContainerServices" id="SubContainerServices4" data-step="3">
                <h3 class="HeadingSmall">Selladores</h3>
                <h4 class="SubHeadingVerde">2 a 4 años, según desgaste</h4>
                <p class="Paragraph">
                  Los selladores son una capa protectora que se aplica en las superficies de masticación de los molares para prevenir caries. Crean una barrera que impide la acumulación de bacterias y restos de alimentos en las fisuras del esmalte. Son ideales para niños y adolescentes, pero también benefician a adultos con alto riesgo de caries.
                </p>
                <p class="ParagraphBold">
                  Previene caries con selladores y protege tu sonrisa por más tiempo.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/Selladores.jpg" loading="lazy" alt="Selladores" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices2" data-step="4">
                <h3 class="HeadingSmall">Técnica de cepillado y uso de hilo dental</h3>
                <h4 class="SubHeadingVerde">Recomendado cada 6 meses</h4>
                <p class="Paragraph">
                  Nuestros especialistas te enseñan y refuerzan la técnica adecuada de cepillado y uso de hilo dental para asegurar una higiene bucal efectiva. Durante tu consulta, recibirás una demostración personalizada sobre cómo cepillar tus dientes correctamente, utilizando el movimiento suave y circular para evitar dañar el esmalte o las encías. Además, te explicarán cómo llegar a todas las áreas de tu boca, incluyendo las superficies posteriores y los molares. <br> <br>
                  El uso de hilo dental también se enseña para que puedas eliminar la placa entre los dientes, donde el cepillo no alcanza. Nuestros profesionales te guiarán en la forma correcta de usarlo, asegurándose de que no dañes las encías al pasarlo entre los dientes.
                </p>
                <p class="ParagraphBold">
                  Tener la guía de un especialista te garantiza que estás realizando ambos pasos correctamente.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill1/TécnicaDeCepillado.jpg" loading="lazy" alt="Técnica de cepillado" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>
        </section>

        <!-- Nivel 2 -->
        <section class="NivelContent" id="Nivel2Content">
          <div class="Col50Left RightColServices">
            <div id="nivel2">
              <div class="SubContainerServices" id="SubContainerServices5" data-step="0">
                <h3 class="HeadingSmall">Resinas</h3>
                <h4 class="SubHeadingVerde">Según diagnóstico y necesidad del paciente</h4>
                <p class="Paragraph">
                  Reparamos caries o fracturas dentales utilizando resinas del color del diente, para restaurar la forma y función sin comprometer la estética. Es un tratamiento rápido, seguro y con resultados naturales. Además, permite conservar al máximo la estructura dental original.
                </p>
                <p class="ParagraphBold">
                  Pequeños retoques que hacen una gran diferencia en tu sonrisa.
                </p>
                <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill2/Resinas.jpg" loading="lazy" alt="Resinas" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices8" data-step="1">
                <h3 class="HeadingSmall">Blanqueamiento</h3>
                <h4 class="SubHeadingVerde">Recomendado una o dos veces al año</h4>
                <p class="Paragraph">
                  Eliminamos manchas y aclaramos el tono de tus dientes con técnicas profesionales que cuidan tu esmalte y tu salud bucal. Ideal para quienes buscan una sonrisa más brillante y segura. El procedimiento es sencillo y ofrece resultados visibles desde la primera sesión.
                </p>
                <p class="ParagraphBold">
                  Una sonrisa luminosa es una sonrisa que se nota.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Blanqueamiento.jpg" loading="lazy" alt="Blanqueamiento" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices6" data-step="2">
                <h3 class="HeadingSmall">Brackets</h3>
                <h4 class="SubHeadingVerde">Controles mensuales</h4>
                <p class="Paragraph">
                  Alineamos tu dentadura corrigiendo problemas de mordida y posición dental con sistemas de ortodoncia convencionales. Es una opción efectiva y confiable para lograr resultados funcionales y estéticos. Requiere constancia y cuidado, pero los beneficios son duraderos.
                </p>
                <p class="ParagraphBold">
                  Transformar tu sonrisa es un proceso… y vale totalmente la pena.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Brackets.jpg" loading="lazy" alt="Brackets" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>

          <!-- Contenedor de indicador de scroll (barra2) -->
          <div class="progress-container barra2">
            <div class="vertical-line" id="myBar2"></div>
            <div class="vertical-line" id="lineTwo"></div>
          </div>

          <div class="Col50Right LeftColServices">
            <div id="nivel2-continuation">
              <div class="SubContainerServices" id="SubContainerServices9" data-step="3">
                <h3 class="HeadingSmall">Alineadores invisibles</h3>
                <h4 class="SubHeadingVerde">Controles cada 4 a 6 semanas</h4>
                <p class="Paragraph">
                  Corrigen la posición de tus dientes de forma cómoda, removible y discreta. Los alineadores invisibles son ideales para quienes buscan resultados efectivos sin alterar su rutina ni su imagen. Además, permiten mantener una mejor higiene bucal durante el tratamiento.
                </p>
                <p class="ParagraphBold">
                  Ortodoncia a tu ritmo, sin que nadie lo note.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Alineadores.jpg" loading="lazy" alt="Alineadores invisibles" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices7" data-step="4">
                <h3 class="HeadingSmall">Ortopedia</h3>
                <h4 class="SubHeadingVerde">Según etapa de crecimiento</h4>
                <p class="Paragraph">
                  Guiamos el crecimiento y desarrollo de los maxilares y dientes en niños y adolescentes para prevenir problemas futuros. Utilizamos aparatos funcionales adaptados a cada etapa de crecimiento. Un abordaje temprano puede evitar tratamientos más complejos a futuro.
                </p>
                <p class="ParagraphBold">
                  Un tratamiento a tiempo puede marcar la diferencia de por vida.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill2/Ortopedia.jpg" loading="lazy" alt="Ortopedia" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>
        </section>

        <!-- Nivel 3 -->
        <section class="NivelContent" id="Nivel3Content">
          <div class="Col50Left RightColServices">
            <div id="nivel3">
              <div class="SubContainerServices" id="SubContainerServices10" data-step="0">
                <h3 class="HeadingSmall">Coronas</h3>
                <h4 class="SubHeadingCafe">Según diagnóstico y rehabilitación dental</h4>
                <p class="Paragraph">
                  Recubrimos dientes dañados o debilitados con coronas personalizadas que restauran su forma, tamaño y función. Son ideales para proteger piezas después de una endodoncia o grandes restauraciones. También mejoran la estética y la mordida.
                </p>
                <p class="ParagraphBold">
                  Una solución fuerte, duradera y con apariencia natural.
                </p>
                <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/Coronas.jpg" loading="lazy" alt="Coronas" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices16" data-step="1">
                <h3 class="HeadingSmall">Incrustaciones</h3>
                <h4 class="SubHeadingCafe">Según necesidad clínica</h4>
                <p class="Paragraph">
                  Reparamos daños moderados en piezas dentales con incrustaciones que se adaptan perfectamente al diente. Son más resistentes que una resina y menos invasivas que una corona completa. Ideales para conservar estructura dental sana.
                </p>
                <p class="ParagraphBold">
                  Precisión, durabilidad y cuidado en un solo tratamiento.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Incrustaciones.jpg" loading="lazy" alt="Incrustaciones" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices11" data-step="2">
                <h3 class="HeadingSmall">Endodoncias</h3>
                <h4 class="SubHeadingCafe">Evaluación y seguimiento según cada caso</h4>
                <p class="Paragraph">
                  Tratamos infecciones o lesiones en el interior del diente, eliminando la pulpa dañada para conservar la pieza natural. Es una alternativa eficaz para evitar extracciones y aliviar el dolor.
                </p>
                <p class="ParagraphBold">
                  Salvar un diente también es cuidar tu salud integral.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Endodoncias.png" loading="lazy" alt="Endodoncias" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices17" data-step="3">
                <h3 class="HeadingSmall">Retratamientos</h3>
                <h4 class="SubHeadingCafe">Cuando una endodoncia previa presenta complicaciones</h4>
                <p class="Paragraph">
                  Revisamos y corregimos tratamientos de conductos que no sanaron correctamente, eliminando infecciones y restaurando la función del diente. Requiere precisión, experiencia y tecnología especializada.
                </p>
                <p class="ParagraphBold">
                  Una segunda oportunidad para tu pieza dental.
                </p>
                <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill3/Retratamientos.png" loading="lazy" alt="Retratamientos" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices12" data-step="4">
                <h3 class="HeadingSmall">Apicectomía</h3>
                <h4 class="SubHeadingCafe">Según evaluación endodóntica</h4>
                <p class="Paragraph">
                  Es un procedimiento quirúrgico que elimina la punta de la raíz y el tejido infectado cuando un tratamiento de conducto no es suficiente. Conservamos la pieza natural y favorecemos la cicatrización ósea.
                </p>
                <p class="ParagraphBold">
                  Precisión quirúrgica para preservar tu sonrisa.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Apicectomia.jpg" loading="lazy" alt="Apicectomía" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices18" data-step="5">
                <h3 class="HeadingSmall">Puentes fijos</h3>
                <h4 class="SubHeadingCafe">Según plan de rehabilitación</h4>
                <p class="Paragraph">
                  Reemplazamos uno o más dientes ausentes uniendo coronas a piezas adyacentes. Son una solución estable, funcional y estética que mejora la mordida y la pronunciación.
                </p>
                <p class="ParagraphBold">
                  Un puente entre la funcionalidad y la confianza.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/PuentesFijos.jpg" loading="lazy" alt="Puentes fijos" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>

          <!-- Contenedor de indicador de scroll (barra3) -->
          <div class="progress-container barra3">
            <div class="vertical-line" id="myBar3"></div>
            <div class="vertical-line" id="lineTwo"></div>
          </div>

          <div class="Col50Right LeftColServices">
            <div id="nivel3-continuation">
              <div class="SubContainerServices" id="SubContainerServices13" data-step="6">
                <h3 class="HeadingSmall">Corona sobre implante</h3>
                <h4 class="SubHeadingCafe">Colocación en fases, según integración del implante</h4>
                <p class="Paragraph">
                  Rehabilitamos dientes perdidos colocando una corona sobre un implante previamente integrado al hueso. La corona se diseña a medida para que se vea y funcione como un diente natural.
                </p>
                <p class="ParagraphBold">
                  Recupera tu sonrisa con seguridad y naturalidad.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/CoronaSobreImplante.jpg" loading="lazy" alt="Corona sobre implante" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices19" data-step="7">
                <h3 class="HeadingSmall">Carillas</h3>
                <h4 class="SubHeadingCafe">Según diagnóstico estético</h4>
                <p class="Paragraph">
                  Corrigen color, forma y alineación de los dientes frontales con láminas delgadas de porcelana o resina adheridas a la superficie. Son ideales para transformar la sonrisa de forma rápida y duradera.
                </p>
                <p class="ParagraphBold">
                  Una sonrisa renovada, sin perder tu esencia.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Carillas.jpg" loading="lazy" alt="Carillas" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices14" data-step="8">
                <h3 class="HeadingSmall">Raspado y Alisado Radicular</h3>
                <h4 class="SubHeadingCafe">Recomendado en casos de enfermedad periodontal</h4>
                <p class="Paragraph">
                  Eliminamos sarro acumulado bajo la encía para tratar la inflamación y evitar la pérdida ósea. Es un procedimiento fundamental para estabilizar enfermedades periodontales.
                </p>
                <p class="ParagraphBold">
                  Salud gingival profunda para conservar tus dientes.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Raspado.jpg" loading="lazy" alt="Raspado y alisado radicular" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices20" data-step="9">
                <h3 class="HeadingSmall">Prótesis fija</h3>
                <h4 class="SubHeadingCafe">Según diagnóstico de rehabilitación</h4>
                <p class="Paragraph">
                  Reponemos piezas perdidas con estructuras fijas que se cementan sobre dientes o implantes. Ofrecen estabilidad, comodidad y un resultado estético de alta calidad.
                </p>
                <p class="ParagraphBold">
                  Funcionalidad y estética que se integran a tu día a día.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/ProtesisFijas.jpg" loading="lazy" alt="Prótesis fija" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices15" data-step="10">
                <h3 class="HeadingSmall">Prótesis removibles</h3>
                <h4 class="SubHeadingCafe">Controles periódicos recomendados</h4>
                <p class="Paragraph">
                  Reemplazamos varios dientes con estructuras que el paciente puede retirar. Son una alternativa funcional y accesible para recuperar la sonrisa y la masticación.
                </p>
                <p class="ParagraphBold">
                  Una opción flexible para volver a sonreír con confianza.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill3/Protesis.jpg" loading="lazy" alt="Prótesis removibles" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>
        </section>

        <!-- Nivel 4 -->
        <section class="NivelContent" id="Nivel4Content">
          <div class="Col50Left RightColServices">
            <div id="nivel4">
              <div class="SubContainerServices" id="SubContainerServices21" data-step="0">
                <h3 class="HeadingSmall">Extracciones</h3>
                <h4 class="SubHeadingRojo">Según diagnóstico clínico</h4>
                <p class="Paragraph">
                  Removemos piezas dentales cuando ya no pueden recuperarse por caries avanzadas, fracturas o enfermedad periodontal. Realizamos el procedimiento de forma segura, cuidando tu bienestar y recuperación.
                </p>
                <p class="ParagraphBold">
                  A veces decir adiós a un diente es el primer paso hacia una sonrisa más sana.
                </p>
                <img class="imgServices imgServices_borderLeft" src="/assets/Icons/Servicios/Pill4/Extracciones.jpg" loading="lazy" alt="Extracciones" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices24" data-step="1">
                <h3 class="HeadingSmall">Cirugía de terceros molares</h3>
                <h4 class="SubHeadingRojo">Según desarrollo y evaluación radiográfica</h4>
                <p class="Paragraph">
                  Extraemos muelas del juicio cuando causan dolor, presión o problemas de alineación. Se realiza bajo anestesia local y con técnicas que favorecen una recuperación rápida.
                </p>
                <p class="ParagraphBold">
                  Tu comodidad y salud bucal siempre son nuestra prioridad.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/CirugiaTercerosMolares.jpg" loading="lazy" alt="Cirugía de terceros molares" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices22" data-step="2">
                <h3 class="HeadingSmall">Rehabilitación</h3>
                <h4 class="SubHeadingRojo">Según plan integral personalizado</h4>
                <p class="Paragraph">
                  Diseñamos tratamientos que restauran la funcionalidad y estética bucal en casos complejos, combinando diferentes especialidades como prótesis, implantes o endodoncia. Cada plan se adapta a tus necesidades y objetivos.
                </p>
                <p class="ParagraphBold">
                  Recuperar tu sonrisa es también recuperar calidad de vida.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Rehabilitacion.jpg" loading="lazy" alt="Rehabilitación" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>

          <!-- Contenedor de indicador de scroll (barra4) -->
          <div class="progress-container barra4">
            <div class="vertical-line" id="myBar4"></div>
            <div class="vertical-line" id="lineTwo"></div>
          </div>

          <div class="Col50Right LeftColServices">
            <div id="nivel4-continuation">
              <div class="SubContainerServices" id="SubContainerServices25" data-step="3">
                <h3 class="HeadingSmall">Mini implantes</h3>
                <h4 class="SubHeadingRojo">Colocación en una sola sesión (según caso)</h4>
                <p class="Paragraph">
                  Son una alternativa menos invasiva que los implantes tradicionales, ideales para estabilizar prótesis removibles o reemplazar dientes pequeños. Requieren menor tiempo de recuperación y son más accesibles.
                </p>
                <p class="ParagraphBold">
                  Soluciones pequeñas, con grandes beneficios para tu sonrisa.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/MiniImplantes.jpg" loading="lazy" alt="Mini implantes" />
                <span class="dot inactive"></span>
              </div>
              <div class="SubContainerServices" id="SubContainerServices23" data-step="4">
                <h3 class="HeadingSmall">Implantes</h3>
                <h4 class="SubHeadingRojo">Proceso por fases, con controles postoperatorios</h4>
                <p class="Paragraph">
                  Reemplazamos raíces dentales con tornillos de titanio que se integran al hueso, sobre los que colocamos coronas, puentes o prótesis. Son la opción más duradera y estable para recuperar piezas perdidas.
                </p>
                <p class="ParagraphBold">
                  Vuelve a masticar, hablar y sonreír con total confianza.
                </p>
                <img class="imgServices imgServices_borderRight" src="/assets/Icons/Servicios/Pill4/Implantes.jpg" loading="lazy" alt="Implantes" />
                <span class="dot inactive"></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    return container;
}

function initServiciosComponent(targetId) {
    const target = document.getElementById(targetId);
    if (!target) {
        console.error('Target element not found:', targetId);
        return;
    }
    const serviciosComponent = createServiciosComponent();
    target.appendChild(serviciosComponent);

    // Verificar dependencias de GSAP
    if (!window.gsap || !window.ScrollTrigger || !window.ScrollToPlugin) {
        console.error('GSAP dependencies missing. Please include GSAP, ScrollTrigger, and ScrollToPlugin.');
        target.innerHTML = '<p>Error: No se pudo cargar el componente de servicios. Por favor, intenta de nuevo más tarde.</p>';
        return;
    }
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Forzar scroll al inicio
    window.scrollTo(0, 0);

    const servicioButtons = document.querySelectorAll('.ServicioButton');
    const allButtons = document.querySelectorAll('.ServiciosSelector button');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevServicio');
    const nextBtn = document.getElementById('nextServicio');
    const selector = document.querySelector('.ServiciosSelector');

    if (!selector) {
        console.error('ServiciosSelector not found. Check HTML structure.');
        return;
    }

    let currentIndex = 0;
    let isAnimating = false;
    let lastScrollTarget = null;
    let isUserScrolling = false;
    let scrollTimeout = null;
    let isInitialLoad = true;

    // Retrasar la activación del auto-scroll para evitar interferencias con ScrollTrigger
    setTimeout(() => {
        isInitialLoad = false;
    }, 1000);

    // Detectar desplazamiento manual
    window.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 500);
    });

    function updateSelectorState(source = 'unknown') {
        // Actualizar clases de botones
        servicioButtons.forEach((btn, index) => {
            btn.classList.remove('active', 'inactive');
            btn.classList.add(index === currentIndex ? 'active' : 'inactive');
        });

        // Actualizar clases y ARIA de puntos
        dots.forEach((dot, index) => {
            dot.classList.remove('dot-active', 'dot-inactive');
            dot.classList.add(index === currentIndex ? 'dot-active' : 'dot-inactive');
            dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
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

        // Desplazamiento automático al anclaje del botón activo
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

    // Lógica para las barras de progreso y puntitos en todos los niveles
    function handleNivelScroll() {
        const niveles = [
            { id: 'Nivel1Content', barId: 'myBar1' },
            { id: 'Nivel2Content', barId: 'myBar2' },
            { id: 'Nivel3Content', barId: 'myBar3' },
            { id: 'Nivel4Content', barId: 'myBar4' }
        ];

        niveles.forEach(nivel => {
            const nivelContent = document.querySelector(`#${nivel.id}`);
            if (!nivelContent) return;

            // Calcular progreso de la barra
            const rect = nivelContent.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const containerTop = rect.top + scrollTop;
            const containerHeight = nivelContent.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollPosition = Math.max(0, scrollTop - containerTop);
            const maxScroll = containerHeight - windowHeight;
            const scrolled = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;

            const myBar = document.getElementById(nivel.barId);
            if (myBar) {
                myBar.style.height = Math.min(scrolled, 100) + '%';
            }
        });

        // Actualizar estado de los puntitos
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const isCentered = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

            if (isCentered) {
                dot.classList.remove('inactive');
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
                dot.classList.add('inactive');
            }
        });
    }

    function initGSAPAnimations() {
        const steps = document.querySelectorAll('.SubContainerServices');
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
            ScrollTrigger.create({
                trigger: nivel,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => {
                    if (!isAnimating && currentIndex !== index) {
                        currentIndex = index;
                        updateSelectorState('scrollTriggerEnter');
                    }
                },
                onEnterBack: () => {
                    if (!isAnimating && currentIndex !== index) {
                        currentIndex = index;
                        updateSelectorState('scrollTriggerEnterBack');
                    }
                }
            });
        });
    }

    // Añadir navegación por teclado
    servicioButtons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

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

    // Añadir el evento de scroll para las barras y puntitos
    window.addEventListener('scroll', handleNivelScroll);
    handleNivelScroll();

    initGSAPAnimations();
    updateSelectorState('initial');
}

window.initServiciosComponent = initServiciosComponent;
