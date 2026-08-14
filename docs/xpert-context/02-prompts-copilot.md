# Xpert.agency - Prompts de implementacion para Copilot

Este documento contiene prompts listos para pegar en Copilot Chat dentro de VS Code. Estan pensados para aplicar los cambios de Xpert.agency seccion por seccion, respetando las notas de la clienta, el audio, la presentacion visual y la web vieja como fuente editorial.

Regla base: no pedirle a Copilot que "mejore" o "rediseñe" de forma abierta. Cada prompt debe ejecutarse con limites claros.

---

## Prompt Maestro - Contexto general

Pega esto al inicio de la sesion de Copilot Chat antes de trabajar secciones:

```text
Estoy trabajando en el sitio de Xpert.agency. Necesito implementar cambios solicitados por la clienta a partir de una revision visual, anotaciones manuscritas, audio de llamada y contenido recuperado de la web vieja.

Reglas obligatorias:
- No inventes nuevos textos, metricas, servicios, casos, industrias, paises, partners ni mejoras visuales no solicitadas.
- Mantén el layout y estilo existente salvo donde el prompt de la seccion indique explicitamente cambiar presentacion o diseno.
- Si falta informacion del cliente, deja placeholders claros o comentarios internos, no inventes contenido.
- Usa el contenido real de la web vieja cuando el prompt lo indique.
- Conserva el lenguaje visual actual del sitio.
- Implementa solo la seccion indicada en cada prompt.
- Al final dime exactamente que archivos modificaste y que queda pendiente.

Contenido fuente confirmado:
- About: Xpert.agency desde Alemania impulsa la transformacion industrial global; 45+ anos; manufactura, logistica, procesos de negocio, mejora continua, automatizacion, transformacion digital y reingenieria de operaciones.
- Enfoque: experiencias en trabajo de equipo en taller, basadas en datos de proceso y ejecucion/puesta en marcha de proyectos.
- Mision: Construir eficientes puentes de comunicacion entre las personas y la infraestructura industrial; permitir que clientes alcancen objetivos con consultoria, soluciones y servicios innovadores y calidad en automatizacion de procesos; mejorar competitividad de forma rapida y centrada en resultados.
- Vision: Con nuestra pasion por la automatizacion de procesos; guiar a nuestros clientes hacia un futuro exitoso.
- Valores: satisfaccion de demandas del cliente; confianza/fiabilidad; compromiso; flexibilidad/multidisciplinaridad; calidad de servicio y gestion.
- Partners web vieja: Elmar A. Beckord, Lic. Maria Concepcion Lona Romero, Eduardo Benitez, Wissam El Khoury.
- Casos reales web vieja: Pistor AG, Almarai, FENIX Outdoor Supply, Schuh Schmid, Birkenstock e-commerce hub, Landmark channel distribution, HYMMEN Pisos, XOX Snacks, Giesecke+Devrient, Zeitfracht Medien, Weig-Karton, Kymmene Papier.
```

---

## Prompt S1 - Hero

```text
Implementa solo la seccion S1 / Hero de Xpert.agency.

Cambios confirmados:
- Cambiar el logo por la version oficial si existe en assets. Si no existe, deja el logo actual y agrega comentario TODO para reemplazarlo.
- Verificar que la X coincida con el logotipo oficial si hay archivo disponible.
- Cambiar titulo principal a: "Experts in integration, improvement and engineering."
- Cambiar subtitulo a: "Process efficiency, automation, digital transformation and operational effectiveness."
- Actualizar las tres tarjetas inferiores:
  1. "45+ years" / "Experience + delivering results."
  2. "International reach" / "Projects across the continents."
  3. "Measurable solutions" / "Measurable solutions, data driven."
- Cambiar Productivity de +27% a +25%.
- Mantener texto de Productivity: "Average increase".
- Actualizar Core Focus Areas a:
  - Process Optimization
  - Automation & Digitalization
  - Supply Chain Excellence
  - Operational Reengineering
- Cambiar Effectiveness de 98% a 90%.
- Texto inferior de Effectiveness: "On time / In scope / In budget".
- En Global Project Delivery, mantener el diseno y solo agregar paises al mapa si el mapa esta controlado por datos.
- Paises nuevos a considerar: South Africa, Malaysia, Thailand, Vietnam, Myanmar, Scotland, Russia, Morocco.

Dejar igual:
- Estructura general del hero.
- Layout.
- Navegacion.
- Imagen principal/fondo.
- Distribucion de tarjetas.

Pendiente:
- Si no hay logo oficial o no esta claro como editar el mapa, no inventes. Deja TODO puntual.

Criterio de aceptacion:
- Solo cambia S1.
- No cambies estilos globales salvo que sea necesario para que el contenido quepa.
- Reporta archivos modificados y pendientes.
```

---

## Prompt S2 - Expert Network

```text
Implementa solo la seccion S2 / Our Expert Network.

Cambios confirmados:
- Mantener el titulo actual si no hay instruccion contraria.
- Mantener el texto introductorio marcado como OK.
- Agregar perfil faltante de Manuel si hay datos/foto disponibles. Si no hay foto o datos, dejar placeholder elegante o TODO, sin inventar.
- Verificar que los perfiles existentes correspondan con los partners de la web vieja:
  - Elmar A. Beckord: Gerente de Logistica, Ingeniero, Formador. Areas: Gestion de Proyectos, Gestion Logistica, Mejora de Procesos, Ingenieria Logistica, Capacitacion y Coaching.
  - Lic. Maria Concepcion Lona Romero: Gerente, Marketing, Contadora, Recursos Humanos. Areas: Gestion de Recursos Humanos, Ventas y Administracion de Negocios, Marketing de Proyectos y Productos, Relaciones Publicas, Coaching.
  - Eduardo Benitez: Gestion de Calidad. Areas: Mineria de Procesos, Contratacion, Control de Gestion, Coaching.
  - Wissam El Khoury: Co-Fundador ALS. Areas: Warehouse Constructions, Integrated Logistics Systems, Automation Expert, Car-parking, Systems Airport Logistics.
- Agregar bloque institucional corto usando contenido real de la web vieja:
  - About: Xpert.agency desde Alemania impulsa transformacion industrial global con 45+ anos de experiencia en manufactura, logistica, procesos de negocio, mejora continua, automatizacion, transformacion digital y reingenieria de operaciones.
  - Mision, Vision y Valores.
- Actualizar indicadores a:
  - 20+ Experts
  - 25+ Countries
  - 300+ Projects
  - 95% Client Satisfaction

Dejar igual:
- Layout.
- Diseno de tarjetas.
- Distribucion.
- Fondo.
- Navegacion.
- CTA.

Pendiente:
- Foto e informacion de Manuel.
- Confirmar si Countries debe quedarse en 25+ o ajustarse por consistencia con otras secciones.

Criterio de aceptacion:
- No redisenar la galeria.
- No inventar perfil de Manuel.
- Usar contenido real de Mission/Vision/Values, no copy nuevo.
```

---

## Prompt S3 - Global Reach

```text
Implementa solo la seccion S3 / Global Reach / Delivering Impact Across Borders.

Cambios confirmados:
- Mantener todos los textos principales actuales. La clienta dijo que todos los textos estan OK.
- Mantener estructura e iconos de indicadores inferiores.
- Actualizar indicadores:
  1. "5 Continents Served"
  2. "50+ Cross-border Projects"
  3. "10+ Languages Supported"
  4. "Delivering Impact Across Borders"
- Mantener diseno del mapa.
- Si el mapa es data-driven, agregar puntos para:
  - South Africa
  - Malaysia
  - Thailand
  - Vietnam
  - Myanmar
  - Scotland
  - Russia
  - Morocco

Dejar igual:
- Layout completo.
- Hero.
- Descripcion lateral.
- Lista de beneficios.
- CTA.
- Tipografia.
- Fondo.
- Colores.

Pendiente:
- Si el mapa no es editable por datos, deja TODO o comentario explicando donde debe ajustarse.
- Unificar cifra oficial de paises si aparece contradiccion con 25+, 33+ o 35+ en otras secciones.

Criterio de aceptacion:
- No reescribir textos principales.
- No cambiar composicion visual.
```

---

## Prompt S4 - Roles & Capabilities / Expertise

```text
Implementa solo la seccion S4 / Roles & Capabilities / Expertise.

Contexto clave:
En la llamada la clienta pidio buscar una presentacion mas adecuada para expertise. Describio una idea tipo "medusa": "Expertise" al centro y alrededor las capabilities. Esto no es solo cambio de texto.

Cambios confirmados:
- Cambiar titulo principal a: "The expertise in process improvements"
- Actualizar texto introductorio para comunicar que Xpert.agency proporciona organizational excellence mediante una red de senior experts que ejecutan proyectos y servicios en manufacturing y logistics environments.
- Sustituir contenido de tarjetas/capabilities por areas reales de expertise desde la web vieja:
  - Gestion del Cambio
  - Mejora Continua
  - Simulacion de Procesos
  - Soporte Post-Implementacion
  - Desarrollo de Indicadores de Desempeno (KPI)
  - Pruebas y Validacion de Soluciones
  - Optimizacion de la Cadena de Suministro
  - Monitoreo y Mantenimiento de Sistemas Preventivo y Correctivo
  - Integracion de Sistemas
  - Auditor de Procesos
  - Consultor en Sostenibilidad Logistica
  - Experto en Cadena de E-Commerce y Logistica
  - Formador o Capacitador en Logistica y Cadena de Suministro
  - Consultor en Lean Management
  - Consultor en Gestion de Proyectos
  - Experto en Automatizacion de Procesos (RPA)
  - Consultor en Cadena de Suministro
  - Automatizacion de sistemas
  - Mejora Lean de fabrica
  - Gestion interina
  - Gestion de proyectos (PMI)
  - Capacitacion y coaching

Presentacion visual:
- Si puedes hacerlo de forma segura con el sistema actual, cambia la presentacion para acercarla a un esquema con "Expertise" al centro y capabilities alrededor.
- Si eso implica un rediseño grande, prepara la estructura de datos y deja el layout actual temporalmente, con TODO claro para la nueva visualizacion.

Dejar igual:
- Navegacion.
- Fondo.
- Colores.
- Estilo visual general.
- CTA inferior.

Pendiente:
- Expertise adicional de Manuel.

Criterio de aceptacion:
- No inventar nuevas capabilities.
- No borrar CTA.
- Si haces visual tipo mapa, debe ser responsive y no romper mobile.
```

---

## Prompt S5 - About / Who We Are

```text
Implementa solo la seccion S5 / About Xpert.agency / Who We Are.

Cambios confirmados:
- Mantener titulo "Who we are" si no hay instruccion contraria.
- Actualizar texto introductorio usando el sentido real de la web vieja:
  "Xpert.agency, based in Germany, helps organizations optimize manufacturing, logistics and business processes through integrated continuous improvement, automation, digital transformation and operational reengineering solutions."
- Comunicar que son una red internacional de expertos, no solo consultores.
- Sustituir lista actual por:
  - Interim Experts
  - Trainers & Coaches
  - Interim Managers
  - Consultants
- Usar como respaldo editorial:
  - About
  - Enfoque
  - Mision
  - Vision
  - Valores
  - roles/areas reales de la web vieja
- Actualizar indicadores:
  - 20+ Experts
  - 25+ Countries
  - 300+ Projects
  - Client Satisfaction
- Actualizar mapa con paises nuevos si aplica y si el mapa es editable por datos.

Dejar igual:
- Tarjeta Global Perspective: diseno, imagen y composicion.
- Layout general.

Pendiente:
- Confirmar cifra final de Client Satisfaction.
- Confirmar si Countries debe cambiar por consistencia global.
- Informacion adicional de Manuel si modifica esta seccion.

Criterio de aceptacion:
- No duplicar todo el About largo si rompe la seccion; resumir conservando significado.
- No cambiar la tarjeta Global Perspective salvo datos/mapa.
```

---

## Prompt S6 - How We Work / Methodology

```text
Implementa solo la seccion S6 / How We Work / Methodology.

Cambios confirmados:
- Cambiar titulo a: "A proven methodology. Measurable results."
- Cambiar intro para describir que combinan experiencia operativa, analisis y ejecucion en proyectos de manufactura y logistica.
- Cambiar los 5 pasos a:
  1. Data mining analysis & diagnosis
  2. Survey & quick wins
  3. Improvement roadmap
  4. Agile and classic project management
  5. Performance measurement
- Eliminar los bullets actuales de cada aspecto.
- Dejar estructura preparada para que Elmar proporcione el contenido detallado de cada paso.
- Si aun no existe contenido final de Elmar, usar descripciones breves como placeholders marcados TODO, sin inventar metodologia detallada.
- Agregar o preparar enlace/pagina adicional de RBE con todos los metodos, sin meter todo RBE dentro de esta seccion.

Contenido RBE fuente:
- RBE es contenido independiente en ingles.
- RBE significa Rapid Business Elevating.
- Foco: risk mitigation para ramp-up.
- Fases: Preparing, Safeguarding, Performing.
- 10+1 elements: RBE Survey, Three Phase Model, Interim Management Team, Claim Management, FMEA / What-If Analysis, Comprehensive Tests, Embedded Tools, Systems Training, Operations Training, Visualization & Reporting, Improvement Waves.

Dejar igual:
- Quote superior: "We don't just advise..."
- Continuous Improvement Cycle / barra inferior, conservando concepto.

Pendiente:
- Elmar dara los puntos de cada aspecto.
- Confirmar si indicadores inferiores se reemplazan por metricas globales.

Criterio de aceptacion:
- No saturar esta seccion con todo RBE.
- Preparar ruta/enlace hacia pagina RBE si la arquitectura existe.
```

---

## Prompt S7 - Services

```text
Implementa solo la seccion S7 / Services.

Contexto clave:
El audio confirma que aqui no es solo cambiar nombres. La clienta dijo cambiar diseno porque son todos los servicios que se dan, y propuso algo creativo tipo lluvia de ideas / pulpo.

Cambios confirmados:
- Cambiar la presentacion de Services para poder mostrar todos los servicios.
- Usar las areas reales de negocio/capacidades de la web vieja:
  - Gestion del Cambio
  - Mejora Continua
  - Simulacion de Procesos
  - Soporte Post-Implementacion
  - Desarrollo de Indicadores de Desempeno (KPI)
  - Pruebas y Validacion de Soluciones
  - Optimizacion de la Cadena de Suministro
  - Monitoreo y Mantenimiento de Sistemas Preventivo y Correctivo
  - Integracion de Sistemas
  - Auditor de Procesos
  - Consultor en Sostenibilidad Logistica
  - Experto en Cadena de E-Commerce y Logistica
  - Formador o Capacitador en Logistica y Cadena de Suministro
  - Consultor en Lean Management
  - Consultor en Gestion de Proyectos
  - Experto en Automatizacion de Procesos (RPA)
  - Consultor en Cadena de Suministro
  - Automatizacion de sistemas
  - Mejora Lean de fabrica
  - Gestion interina
  - Gestion de proyectos (PMI)
  - Capacitacion y coaching
- Si ya hay tarjetas existentes, reemplazar nombres/contenido con esta lista real.
- Si el diseno actual no soporta tantos servicios, crear una solucion compacta y responsive tipo grupos/chips/nodos, manteniendo el estilo visual del sitio.

Dejar igual:
- Hero.
- Encabezado general.
- CTA inferior, salvo ajustes necesarios para que conviva con la nueva presentacion.

Pendiente:
- Servicios adicionales de Manuel.

Criterio de aceptacion:
- No inventar categorias nuevas si no son necesarias.
- No mezclar Services con Cases o Industries.
- Debe verse bien en mobile; no debe convertirse en una lista gigante ilegible.
```

---

## Prompt S8 - Industries

```text
Implementa solo la seccion S8 / Industries.

Cambios confirmados:
- Mantener unicamente estas cinco industrias en la version nueva:
  - Manufacturing
  - Food & Beverage
  - Retail & E-commerce
  - Warehousing & Logistics
  - Consumer Goods
- Eliminar por completo:
  - Industrial Operations
- No comunicar experiencia en:
  - Chemical Plants
  - Oil & Gas
  - Power Plants
  - Building / Construction
  - Traffic / Road Infrastructure
- Conectar el boton "View all services" con la seccion o pagina Services.

Contraste web vieja:
- La web vieja tenia: Automotriz, Moda, Alimentos & Bebidas, Medios Impresos, Transportes Aereo/Maritimo/Ferroviario/Carreteras, Plantas Industriales de Fabricacion, Bienes de Consumo, Electronica y Semiconductores.
- No copies automaticamente todas las industrias viejas; la clienta pidio reducir el alcance visible a las cinco anteriores.

Dejar igual:
- Hero.
- Titulo Industries.
- Subtitulo.
- Texto descriptivo.
- Diseno de tarjetas.
- Fotografias.
- Hover.
- Espaciados.
- CTA inferior Cross-industry expertise.

Criterio de aceptacion:
- Solo quedan 5 industrias visibles.
- El boton View all services navega correctamente a Services.
- No aparecen industrias prohibidas.
```

---

## Prompt S9 - Cases

```text
Implementa solo la seccion S9 / Cases.

Cambios confirmados:
- Cambiar encabezado "Case Studies" por "Cases".
- Hacer ese encabezado mas pequeno/discreto.
- Mantener el texto lateral "We partner with organizations worldwide..." si existe.
- Sustituir casos ficticios por clientes reales.
- Mostrar solo 6 casos principales en la pagina principal.
- El resto debe ir a View all cases.
- Crear/preparar una pagina o listado View all cases si la arquitectura ya existe. Si no existe, deja TODO y link preparado.

Usar estos 12 casos reales de la web vieja:
1. Pistor AG - Swiss (CH)
2. Almarai - KSA
3. FENIX Outdoor Supply
4. Schuh Schmid
5. Birkenstock e-commerce hub
6. Landmark channel distribution
7. HYMMEN Pisos
8. XOX Snacks
9. Giesecke+Devrient (G+D)
10. Zeitfracht Medien
11. Weig-Karton
12. Kymmene Papier

Resultados disponibles:
- Pistor: personal >30%, plazo >30%, cadena de temperatura, desperdicios >20%.
- Almarai: plantilla >50%, plazo >30%, cadena de temperatura, residuos >20%.
- FENIX: gestion de procesos, pruebas ERP.
- Schuh Schmid: planificacion de sistema, RfP, analisis de evaluacion.
- Birkenstock: plantilla >20%, plazo >30%, proteccion de proceso, desperdicios >20%.
- Landmark: personal >70%, plazo >50%, manejo eficiente, desperdicios >40%.
- HYMMEN: ventas +10%, merma -20%, respuesta 50% mas rapida.
- XOX: ventas +17%, merma -23%, respuesta 60% mas rapida.
- G+D: merma -17%, respuesta 35% mas rapida; incremento en ventas incompleto en fuente.
- Zeitfracht: ventas +13%, merma -23%, respuesta 13% mas rapida.
- Weig-Karton: ventas +18%, merma -34%, respuesta 19% mas rapida.
- Kymmene Papier: ventas +23%, merma -15%, respuesta 19% mas rapida.

Decision de llamada:
- Explorar mostrar logos/iconos de clientes en vez de una lista aburrida. Si ya existen logos, usarlos. Si no existen, usar nombres en texto y dejar TODO para logos.

Dejar igual:
- Layout.
- Tarjetas.
- Grid.
- Fotografias si no hay assets reales mejores.
- Metricas y CTA, ajustando solo contenido.

Pendiente:
- Elegir cuales 6 casos iran destacados en portada. Si no hay decision, usa los primeros 6 de la lista vieja y deja TODO para confirmar seleccion.
- Definir View all cases.

Criterio de aceptacion:
- No usar nombres ficticios.
- No inventar resultados.
- Si un dato esta incompleto, marcarlo como pendiente.
```

---

## Prompt S10 - Contact

```text
Implementa solo la seccion S10 / Contact.

Cambios confirmados:
- Cambiar titulo principal de "Ready to improve your operations?" a "Get in contact".
- Mantener texto inferior tipo "share your goals..." si existe.
- Mantener formulario completo.
- Organizar responsables por region.

Contenido real de contacto:
- Contacto general: elmar.beckord@outlook.de
- WhatsApp: +52 55 2654 8997

Equipos regionales de la web vieja:
- Equipo Europa:
  - Muenchen Area, Germany: Ludwig-Thoma Str.9, Brunnthal / Otterloh.
  - West Yorkshire, UK: Wakefield, The Picasso Building, Caldervale Road.
  - Contacto local: Elmar A. Beckord.
  - TEL. +49 171 8892 788; +55 52 3431 5953.
  - xpert.agency@hotmail.com
- Equipo America:
  - Mexico City (CDMX): Calle Nueva Jersey 17, Benito Juarez, Col. Napoles.
  - Belo Horizonte, Brasil: Minas Gerais (MG), Rua Eloi Mendes 419.
  - Contacto local: Lic. Maria Concepcion Lona Romero.
  - TEL. +52 55 34315953.
  - coniromero8@gmail.com
- Equipo Arabe:
  - Dubai, UAE: Dubai JLT, Cluster X, Jumeirah Lake Towers.
  - Velenje, Slovenia: Spodnja Stajerska, Presernova Cesta 8.
  - Contacto local: Wissam El Khoury.
  - TEL. +971 58540 4180.
  - info@als.systems
- Equipo Asia:
  - Sansia TownShip, No.39, Ln.240, Datong Rd., Taipei County 237 Taiwan (R.O.C.).
  - Contacto: Eduardo Benitez.
  - Telefono: +49 171 8892 788; +55 52 3431 5953.

Nota:
- La anotacion nueva menciona America - Manuel, pero la web vieja tiene America - Cony. No inventes datos de Manuel; deja pendiente si debe reemplazar o complementar a Cony.

Dejar igual:
- Campos del formulario.
- Diseno del formulario.
- Botones.
- Layout.
- Validaciones.

Pendiente:
- Foto de Manuel.
- Informacion de Manuel.
- Confirmar region/rol de Eduardo.
- Confirmar si America queda con Manuel, Cony o ambos.

Criterio de aceptacion:
- Contacto muestra regiones claramente.
- Formulario no se rompe.
- No borrar datos fuente sin comentario.
```

---

## Prompt S11 - Delete

```text
Implementa solo S11.

Cambio confirmado:
- Eliminar la seccion S11 por completo.
- La llamada confirma que en la once es delete y no hay necesidad de tenerla.

Instrucciones:
- Busca la seccion S11 o el componente/pagina correspondiente.
- Si es una seccion del home, retirarla del render y de la navegacion si aplica.
- Si hay datos, imports o componentes que quedan sin uso, limpialos solo si es seguro.
- No eliminar la plantilla de Case Detail si existe como pagina interna; S11 delete se refiere a la seccion marcada para eliminar, no necesariamente a todas las paginas de cases.

Criterio de aceptacion:
- S11 ya no aparece en el sitio.
- No se rompe el flujo S10 -> Cases/otras paginas.
- No borrar contenido de casos por error.
```

---

## Prompt QA Final

```text
Haz una revision final de los cambios implementados para Xpert.agency.

Verifica:
- S1 tiene titulo, subtitulo, tarjetas, Productivity, Core Focus Areas y Effectiveness correctos.
- S2 conserva layout, agrega contenido institucional y no inventa Manuel.
- S3 mantiene textos principales y actualiza indicadores/mapa si aplica.
- S4 usa expertise real y no inventa capabilities.
- S5 usa About real, enfoque y lista de perfiles correcta.
- S6 tiene los 5 pasos nuevos y RBE queda como pagina/enlace separado.
- S7 muestra servicios reales y soporta todos sin verse como lista rota.
- S8 solo muestra 5 industrias permitidas y no contiene industrias prohibidas.
- S9 usa casos reales, encabezado Cases y solo 6 destacados.
- S10 dice Get in contact, conserva formulario y muestra equipos regionales.
- S11 no aparece.
- No hay texto placeholder visible salvo TODO internos o marcadores intencionales.
- No hay cambios de layout no pedidos.
- La pagina funciona en desktop y mobile.

Entrega:
- Lista de archivos modificados.
- Cambios hechos por seccion.
- Pendientes que requieren decision del cliente.
- Riesgos o datos inconsistentes encontrados.
```

