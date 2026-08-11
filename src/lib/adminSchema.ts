// Etiquetas y estructura de grupos del editor visual del admin.

export const LANGS = ["en", "es", "de"] as const;

export const COLLECTION_LABELS: Record<string, string> = {
  home: "🏠 Home",
  about: "ℹ️ About",
  services: "🛠 Services",
  industries: "🏭 Industries",
  cases: "📁 Cases",
  contact: "✉️ Contact",
  nav: "🧭 Navigation",
  settings: "⚙️ Settings",
};

export const SECTION_LABELS: Record<string, Record<string, string>> = {
  home: {
    hero: "Hero",
    partners: "Partners / Experts",
    global_reach: "Global Reach",
    roles: "Roles & Capabilities",
  },
  about: { first: "Who we are", second: "How we work" },
  services: { page: "Services page" },
  industries: { page: "Industries page" },
  cases: { page: "Cases page" },
  contact: { page: "Contact page" },
  nav: { items: "Navigation" },
  settings: { general: "General settings" },
};

export const SECTION_ORDER = [
  "home",
  "about",
  "services",
  "industries",
  "cases",
  "contact",
  "nav",
  "settings",
];

// Apartados que el sitio realmente consume (getters en lib/data.ts).
// Todo lo que no esté aquí se considera contenido antiguo / sin uso y se
// muestra marcado como "deprecated" al final de la barra lateral.
export const USED_SECTIONS: Record<string, string[]> = {
  home: ["hero", "partners", "global_reach", "roles"],
  about: ["first", "second"],
  services: ["page"],
  industries: ["page"],
  cases: ["page"],
  contact: ["page"],
  nav: ["items"],
  settings: ["general"],
};

export function isUsedSection(collection: string, keyname: string): boolean {
  return USED_SECTIONS[collection]?.includes(keyname) ?? false;
}

export interface FieldGroup {
  label: string;
  fields: string[];
}

// Orden y agrupación de los campos de cada apartado.
const GROUP_SCHEMAS: Record<string, FieldGroup[]> = {
  "home:hero": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "cta_primary", "cta_secondary", "cta_primary_href", "cta_secondary_href"] },
    { label: "Tarjetas de información", fields: ["info_cards"] },
    { label: "Estadísticas", fields: ["stat_impact", "stat_success"] },
    { label: "Áreas clave", fields: ["core_areas_title", "core_areas"] },
    { label: "Entrega global", fields: ["global_delivery"] },
  ],
  "home:partners": [
    { label: "Cabecera", fields: ["badge", "title", "description"] },
    { label: "Perfiles de expertos", fields: ["items"] },
    { label: "Estadísticas", fields: ["stats"] },
    { label: "Pie", fields: ["footer"] },
  ],
  "home:global_reach": [
    { label: "Cabecera", fields: ["badge", "title", "description"] },
    { label: "Características", fields: ["features"] },
    { label: "Estadísticas", fields: ["stats"] },
    { label: "Llamada a la acción", fields: ["cta"] },
  ],
  "home:roles": [
    { label: "Cabecera", fields: ["badge", "title", "description", "features"] },
    { label: "Capacidades", fields: ["items"] },
    { label: "Estadísticas", fields: ["stats"] },
  ],
  "about:first": [
    { label: "Cabecera", fields: ["badge", "title", "heading", "text"] },
    { label: "Características", fields: ["features"] },
    { label: "Estadísticas", fields: ["stats"] },
    { label: "Tarjeta derecha", fields: ["right_card"] },
  ],
  "about:second": [
    { label: "Cabecera", fields: ["badge", "title", "text", "quote"] },
    { label: "Metodología (pasos)", fields: ["steps"] },
    { label: "Tarjeta inferior", fields: ["footer_card"] },
    { label: "Estadísticas", fields: ["stats"] },
  ],
  "services:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "intro"] },
    { label: "Áreas de servicio", fields: ["areas"] },
    { label: "Pie", fields: ["footer"] },
  ],
  "industries:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle"] },
    { label: "Industrias", fields: ["items"] },
    { label: "Tarjeta de información", fields: ["info_card"] },
  ],
  "cases:page": [
    { label: "Cabecera", fields: ["header"] },
    { label: "Casos de éxito", fields: ["items"] },
  ],
  "contact:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "features"] },
    { label: "Equipo y contacto", fields: ["team_section", "methods"] },
    { label: "Formulario", fields: ["form"] },
  ],
};

const KEY_LABELS: Record<string, string> = {
  badge: "Etiqueta (badge)",
  title: "Título",
  subtitle: "Subtítulo",
  text: "Texto",
  description: "Descripción",
  heading: "Título destacado",
  intro: "Introducción",
  quote: "Cita",
  author: "Autor",
  sub: "Subnota",
  lines: "Líneas",
  bullets: "Viñetas",
  number: "Número",
  icon: "Ícono",
  slug: "Slug / etiqueta",
  name: "Nombre",
  logo: "Logo / imagen",
  img: "Imagen",
  image: "Imagen",
  href: "Enlace (URL)",
  url: "URL",
  link: "Enlace",
  footer_icon: "Íconos del pie",
  cta: "Llamada a la acción",
  cta_href: "Enlace CTA",
  cta_primary: "Botón principal",
  cta_secondary: "Botón secundario",
  cta_primary_href: "Enlace botón principal",
  cta_secondary_href: "Enlace botón secundario",
  info_cards: "Tarjetas de info",
  info_card: "Tarjeta de info",
  core_areas: "Áreas clave",
  core_areas_title: "Título de áreas clave",
  global_delivery: "Entrega global",
  stat_impact: "Estadística de impacto",
  stat_success: "Estadística de éxito",
  stats: "Estadísticas",
  stat: "Estadística",
  value: "Valor",
  label: "Etiqueta",
  features: "Características",
  feature: "Característica",
  items: "Elementos",
  item: "Elemento",
  areas: "Áreas",
  area: "Área",
  steps: "Pasos",
  step: "Paso",
  footer: "Pie",
  footer_card: "Tarjeta inferior",
  right_card: "Tarjeta derecha",
  header: "Cabecera",
  team_section: "Sección equipo",
  methods: "Métodos de contacto",
  form: "Formulario",
  fields: "Campos del formulario",
  options: "Opciones",
  required: "Obligatorio",
  placeholder: "Placeholder",
  buttons: "Botones",
  button: "Botón",
  variant: "Variante",
  privacy: "Texto de privacidad",
  trust: "Texto de confianza",
  footer_note: "Nota al pie",
  tags: "Etiquetas",
  tag: "Etiqueta",
};

const PATH_LABELS: Record<string, string> = {
  "home:hero:stat_impact.title": "Título",
  "home:hero:stat_impact.value": "Valor",
  "home:hero:stat_impact.label": "Etiqueta",
  "home:hero:stat_success.title": "Título",
  "home:hero:stat_success.value": "Valor",
  "home:hero:stat_success.label": "Etiqueta",
  "home:partners:footer.text": "Texto",
  "home:partners:footer.cta": "Botón",
  "services:page:intro.title": "Título",
  "services:page:intro.text": "Texto",
  "services:page:footer.title": "Título",
  "services:page:footer.text": "Texto",
  "services:page:footer.cta": "Botón",
  "industries:page:info_card.title": "Título",
  "industries:page:info_card.text": "Texto",
  "industries:page:info_card.cta": "Botón",
  "industries:page:info_card.cta_href": "Enlace CTA",
  "about:first:right_card.title": "Título",
  "about:first:right_card.text": "Texto",
  "about:second:quote.lines": "Líneas de la cita",
  "about:second:quote.author": "Autor",
  "about:second:quote.sub": "Subnota",
  "about:second:footer_card.title": "Título",
  "about:second:footer_card.text": "Texto",
  "cases:page:header.badge": "Etiqueta (badge)",
  "cases:page:header.title": "Título",
  "cases:page:header.text": "Texto",
  "contact:page:team_section.title": "Título",
  "contact:page:team_section.footer": "Pie",
  "contact:page:form.title": "Título",
  "contact:page:form.subtitle": "Subtítulo",
  "contact:page:form.privacy": "Texto de privacidad",
  "contact:page:form.trust": "Texto de confianza",
  "contact:page:form.footer_note": "Nota al pie",
};

export function getGroups(collection: string, keyname: string): FieldGroup[] | undefined {
  return GROUP_SCHEMAS[`${collection}:${keyname}`];
}

export function fieldLabel(collection: string, keyname: string, path: string[]): string | undefined {
  const joined = path.join(".");
  const pathKey = `${collection}:${keyname}:${joined}`;
  if (PATH_LABELS[pathKey]) return PATH_LABELS[pathKey];
  const leaf = path[path.length - 1];
  return KEY_LABELS[leaf];
}
