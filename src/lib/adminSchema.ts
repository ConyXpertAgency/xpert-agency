// Etiquetas y estructura de grupos del editor visual del admin.

export const LANGS = ["en", "es", "de"] as const;

export const COLLECTION_LABELS: Record<string, string> = {
  home: "🏠 Home",
  about: "ℹ️ About",
  services: "🛠 Services",
  industries: "🏭 Industries",
  cases: "📁 Cases",
  contact: "✉️ Contact",
  rbe: "⚡ RBE",
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
  rbe: {
    first: "Hero",
    second: "The challenge",
    third: "3-phase model",
    four: "10+1 elements",
    five: "What does RBE mean?",
    footer: "Contact / footer",
  },
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
  "rbe",
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
  rbe: ["first", "second", "third", "four", "five", "footer"],
  nav: ["items"],
  settings: ["general"],
};

export function isUsedSection(collection: string, keyname: string): boolean {
  return USED_SECTIONS[collection]?.includes(keyname) ?? false;
}

// Plantillas para los elementos que se añaden a los arrays del editor visual.
// La clave usa "*" para los índices numéricos en rutas anidadas.
export const ELEMENT_TEMPLATES: Record<string, Record<string, unknown>> = {
  "home:hero:info_cards": { title: "", text: "" },
  "home:partners:items": { name: "", slug: "", logo: "", description: [""], tags: [""] },
  "home:partners:cards": { title: "", text: "", image: "", items: [""] },
  "home:partners:stats": { icon: "", value: "", label: "" },
  "home:global_reach:features": { icon: "", title: "", text: "" },
  "home:global_reach:stats": { icon: "", value: "", label: "", text: "" },
  "home:global_reach:nodes": { country: "", label: "", x: 50, y: 50, client: "", description: "", logo: "" },
  "home:roles:features": { icon: "", title: "" },
  "home:roles:items": { title: "", text: "" },
  "home:roles:stats": { icon: "", value: "", label: "", text: "" },
  "about:first:features": { icon: "", title: "", text: "" },
  "about:first:stats": { icon: "", value: "", label: "", text: "" },
  "about:second:steps": { number: "", icon: "", title: "", text: [""], bullets: [""] },
  "about:second:stats": { icon: "", value: "", label: "" },
  "services:page:areas": { icon: "", title: "", text: "" },
  "industries:page:items": { icon: "", title: "", text: "" },
  "cases:page:items": { title: "", slug: "", description: "", stats: [] },
  "cases:page:items.*.stats": { icon: "", value: "", text: "" },
  "contact:page:features": { icon: "", title: "", text: "" },
  "contact:page:methods": { icon: "", title: "", value: "", cta: "", href: "" },
  "contact:page:form.fields": { name: "", label: "", type: "text", required: false },
  "contact:page:form.buttons": { label: "", variant: "full" },
  "rbe:first:list": { icon: "", title: "", text: "" },
  "rbe:first:cards": { number: "", title: "", text: "" },
  "rbe:second:list": { number: "", text: "" },
  "rbe:third:phases": { icon: "", title: "", subtitle: [""], items: [""] },
  "rbe:four:left": { icon: "", number: "", title: "", text: "" },
  "rbe:four:right": { icon: "", number: "", title: "", text: "" },
  "rbe:five:items": { icon: "", letter: "", title: "", text: "" },
  "nav:items": { href: "/", label: "" },
};

export function getElementTemplate(
  collection: string,
  keyname: string,
  path: string[]
): Record<string, unknown> | undefined {
  const normalized = path.map((p) => (/^\d+$/.test(p) ? "*" : p)).join(".");
  const key = normalized ? `${collection}:${keyname}:${normalized}` : `${collection}:${keyname}`;
  return ELEMENT_TEMPLATES[key];
}

// Apartados que admiten imagen de fondo configurable desde el admin.
const BACKGROUND_SECTIONS = new Set([
  "home:hero",
  "home:partners",
  "home:global_reach",
  "home:roles",
  "about:first",
  "about:second",
  "services:page",
  "industries:page",
  "cases:page",
  "contact:page",
  "rbe:first",
  "rbe:second",
  "rbe:third",
  "rbe:four",
  "rbe:five",
  "rbe:footer",
]);

export function supportsBackground(collection: string, keyname: string): boolean {
  return BACKGROUND_SECTIONS.has(`${collection}:${keyname}`);
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
    { label: "Misión / Visión / Valores", fields: ["cards"] },
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
  "rbe:first": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "text"] },
    { label: "Botones", fields: ["cta_primary", "cta_primary_href", "cta_secondary", "cta_secondary_href"] },
    { label: "Pilares", fields: ["list"] },
    { label: "Fases (cards)", fields: ["cards"] },
  ],
  "rbe:second": [
    { label: "Cabecera", fields: ["badge", "title", "text", "image"] },
    { label: "Riesgos", fields: ["list"] },
    { label: "Tarjeta de texto", fields: ["text_card"] },
    { label: "RBE focus", fields: ["focus"] },
  ],
  "rbe:third": [
    { label: "Cabecera", fields: ["title", "subtitle"] },
    { label: "Fases", fields: ["phases"] },
    { label: "Pie", fields: ["footer_title", "footer_text"] },
  ],
  "rbe:four": [
    { label: "Cabecera", fields: ["title", "subtitle"] },
    { label: "Elementos (izquierda)", fields: ["left"] },
    { label: "Elementos (derecha)", fields: ["right"] },
    { label: "Elemento +1", fields: ["extra"] },
  ],
  "rbe:five": [
    { label: "Cabecera", fields: ["title", "subtitle", "image"] },
    { label: "Significado RBE", fields: ["items"] },
    { label: "Pie", fields: ["footer_text"] },
  ],
  "rbe:footer": [
    { label: "Tarjeta de contacto", fields: ["title", "text"] },
    { label: "Contacto", fields: ["contact_name", "contact_phone"] },
    { label: "Botones", fields: ["cta"] },
    { label: "Pie", fields: ["year"] },
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
  background_image: "Imagen de fondo",
  background_overlay: "Oscurecimiento del fondo (0–1)",
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
  cards: "Tarjetas",
  card: "Tarjeta",
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
  footer_title: "Título del pie",
  footer_text: "Texto del pie",
  text_card: "Tarjeta de texto",
  letter: "Letra",
  contact_name: "Nombre de contacto",
  contact_phone: "Teléfono de contacto",
  year: "Año",
  phases: "Fases",
  phase: "Fase",
  left: "Elementos (izquierda)",
  right: "Elementos (derecha)",
  extra: "Elemento +1",
  list: "Lista",
  tags: "Etiquetas",
  tag: "Etiqueta",
  hasDropdown: "Flecha de submenú",
  type: "Tipo",
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
  "rbe:second:focus.icon": "Logo (imagen)",
  "rbe:second:focus.badge": "Etiqueta (badge)",
  "rbe:second:focus.title": "Título",
  "rbe:four:extra.number": "Número",
  "rbe:four:extra.title": "Título",
  "rbe:four:extra.text": "Texto",
};

export function getGroups(collection: string, keyname: string): FieldGroup[] | undefined {
  const base = GROUP_SCHEMAS[`${collection}:${keyname}`];
  if (supportsBackground(collection, keyname)) {
    return [
      { label: "Fondo", fields: ["background_image", "background_overlay"] },
      ...(base ?? []),
    ];
  }
  return base;
}

// Etiquetas para campos dentro de arrays (los índices se sustituyen por "*").
const WILDCARD_PATH_LABELS: Record<string, string> = {
  "nav:items:items.*.label": "Texto del menú",
  "nav:items:items.*.href": "Enlace (URL)",
  "nav:items:items.*.hasDropdown": "Flecha de submenú",
};

export function fieldLabel(collection: string, keyname: string, path: string[]): string | undefined {
  const joined = path.join(".");
  const pathKey = `${collection}:${keyname}:${joined}`;
  if (PATH_LABELS[pathKey]) return PATH_LABELS[pathKey];
  const wildcard = `${collection}:${keyname}:${path
    .map((p) => (/^\d+$/.test(p) ? "*" : p))
    .join(".")}`;
  if (WILDCARD_PATH_LABELS[wildcard]) return WILDCARD_PATH_LABELS[wildcard];
  const leaf = path[path.length - 1];
  return KEY_LABELS[leaf];
}
