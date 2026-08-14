# Xpert.agency - Cambios consolidados para implementacion

Usa este archivo como resumen operativo. No sustituye a `02-prompts-copilot.md`; sirve para orientar a Copilot con menos contexto.

## Regla principal

Implementar solo cambios solicitados por la clienta. No inventar mejoras, textos, metricas, casos, servicios, industrias, partners ni redisenos no pedidos.

## Fuentes

- `02-prompts-copilot.md`: prompts listos por seccion.
- `03-web-vieja-source-of-truth.md`: contenido editorial real de la web vieja.
- `04-audio-citas-clave.md`: momentos clave de la llamada.

## S1 - Hero

Cambiar logo si existe version oficial, titulo, subtitulo, tarjetas inferiores, Productivity a +25%, Core Focus Areas, Effectiveness a 90% y agregar paises al mapa si es editable. Mantener layout, imagen, navegacion y estructura.

## S2 - Expert Network ✅ COMPLETADO

Agregar Manuel como pendiente si no hay foto/datos. Mantener texto marcado OK. Agregar bloque institucional con About, Mision, Vision y Valores de la web vieja. Actualizar metricas a 20+ Experts, 25+ Countries, 300+ Projects y 95% Client Satisfaction.

Cambios aplicados: perfiles actualizados (nombres, slugs, tags, descripciones alineados con web vieja) en `src/lib/data.ts`. Stats actualizados. Bloque Mission/Vision/Values agregado en `src/components/home/Second.tsx` + `src/styles/Home/Second.module.css`. Tipo `HomePartners` extendido con campo `about` en `src/lib/supabase/types.ts`. TODO de Manuel dejado en data.ts.

## S3 - Global Reach ✅ COMPLETADO

Mantener textos principales. Actualizar indicadores a 5 Continents Served, 50+ Cross-border Projects, 10+ Languages Supported, Delivering Impact Across Borders. Agregar paises al mapa si es editable.

Cambios aplicados: actualizado array `stats` en `src/lib/data.ts` (getHomeGlobalReach). Mapa sigue siendo visual/hardcodeado — TODO pendiente para agregar puntos cuando sea data-driven.

## S4 - Expertise

Cambiar titulo a "The expertise in process improvements". Usar areas reales de expertise de la web vieja. La llamada pide buscar una presentacion mejor: Expertise al centro y capabilities alrededor, tipo medusa. Pendiente expertise de Manuel.

## S5 - About / Who We Are ✅ COMPLETADO

Usar About real de la web vieja como base editorial. Sustituir lista por Interim Experts, Trainers & Coaches, Interim Managers y Consultants. Mantener Global Perspective. Actualizar metricas y mapa si aplica.

Cambios aplicados: texto introductorio actualizado, features reemplazados con 4 roles en `src/lib/data.ts` (getAboutFirst). Stats actualizados a 45+ Years / 25+ Countries / 300+ Projects / 20+ Experts. TODO agregado para puntos del mapa cuando sea data-driven. Tarjeta Global Perspective y componente First.tsx sin cambios.

## S6 - Methodology

Cambiar titulo a "A proven methodology. Measurable results." Usar pasos: Data mining analysis & diagnosis, Survey & quick wins, Improvement roadmap, Agile and classic project management, Performance measurement. Elmar dara detalle. RBE va como pagina/contenido adicional separado.

## S7 - Services

No es solo cambiar nombres. La llamada pide cambiar la presentacion para mostrar todos los servicios, de forma creativa tipo lluvia de ideas/pulpo. Usar areas de negocio reales de la web vieja. Pendientes servicios de Manuel.

## S8 - Industries ✅ COMPLETADO

Mostrar solo: Manufacturing, Food & Beverage, Retail & E-commerce, Warehousing & Logistics, Consumer Goods. Eliminar Industrial Operations. No incluir Chemical Plants, Oil & Gas, Power Plants, Building/Construction ni Traffic/Road Infrastructure. Boton View all services debe ir a Services.

Cambio aplicado: eliminado `Industrial Operations` del array `items` en `src/lib/data.ts` (getIndustriesPage). `cta_href` ya apuntaba a `/services`. Ninguna industria prohibida presente.

## S9 - Cases

Cambiar Case Studies a Cases y hacerlo mas pequeno. Usar casos reales. Mostrar solo 6 destacados y mandar el resto a View all cases. Considerar logos/iconos de clientes si existen assets; si no, dejar pendiente.

## S10 - Contact

Cambiar titulo a Get in contact. Mantener formulario. Mostrar equipos regionales con datos reales de la web vieja. Nota: la revision menciona America - Manuel, pero la web vieja tiene America - Cony; no reemplazar sin confirmar.

## S11 - Delete

Eliminar S11 por completo. No borrar plantilla interna de Case Detail si existe.

## Orden recomendado

1. S11
2. S8
3. S10
4. S3
5. S2
6. S5
7. S6
8. S9
9. S1
10. S4
11. S7

S4 y S7 se dejan al final porque requieren decisiones visuales mas abiertas.
