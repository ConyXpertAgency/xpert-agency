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
    final_cta: "Final CTA",
  },
  about: { first: "Who we are", second: "How we work" },
  services: { page: "Services page" },
  industries: { page: "Industries page" },
  cases: { page: "Cases page", studies: "Case studies", clients: "Clients / Experience" },
  contact: { page: "Contact page", teams: "Regional contacts" },
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
  home: ["hero", "partners", "global_reach", "roles", "final_cta"],
  about: ["first", "second"],
  services: ["page"],
  industries: ["page"],
  cases: ["page", "studies", "clients"],
  contact: ["page", "teams"],
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
  "home:roles:groups": { id: "", title: "", shortLabel: "", items: [""] },
  "home:roles:stats": { icon: "", value: "", label: "", text: "" },
  "about:first:features": { icon: "", title: "", text: "" },
  "about:first:stats": { icon: "", value: "", label: "", text: "" },
  "about:second:steps": { number: "", icon: "", title: "", text: [""], bullets: [""] },
  "about:second:rbe_bar": { icon: "BiSolidShield", title: "", text: "", cta: "", href: "/rbe" },
  "about:second:stats": { icon: "", value: "", label: "" },
  "services:page:areas": { icon: "", title: "", text: "" },
  "services:page:groups": { id: "", title: "", icon: "", services: [] },
  "services:page:groups.*.services": { icon: "", title: "", text: "" },
  "industries:page:items": { icon: "", title: "", text: "", image: "" },
  "cases:page:items": { title: "", slug: "", description: "", stats: [] },
  "cases:page:items.*.stats": { icon: "", value: "", text: "" },
  "cases:studies:items": {
    id: "",
    slug: "",
    featured: false,
    client: "",
    title: "",
    industry: "",
    country: "",
    summary: "",
    description: "",
    logo: "",
    image: "",
    project: "",
    knowhow: "",
    bullets: [""],
    results: [""],
    stats: [],
    href: "",
  },
  "cases:studies:items.*.stats": { icon: "", value: "", text: "" },
  "cases:clients:items": {
    id: "",
    name: "",
    logo: "",
    industry: "",
    country: "",
    locations: [""],
    type: "client",
    featured: false,
    note: "",
  },
  "contact:page:features": { icon: "", title: "", text: "" },
  "contact:page:methods": { icon: "", title: "", value: "", cta: "", href: "" },
  "contact:page:form.fields": { name: "", label: "", type: "text", required: false },
  "contact:page:form.buttons": { label: "", variant: "full" },
  "contact:teams:items": {
    id: "",
    region: "",
    contacts: [],
  },
  "contact:teams:items.*.contacts": {
    id: "",
    name: "",
    role: "",
    organization: "",
    photo: "",
    countries: [""],
    addresses: [""],
    phones: [""],
    publicEmail: "",
    website: "",
    recipientKey: "",
  },
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
    { label: "Propósito", fields: ["purpose"] },
    { label: "Misión / Visión / Valores", fields: ["cards"] },
    { label: "Estadísticas", fields: ["stats"] },
    { label: "Pie", fields: ["footer"] },
  ],
  "home:global_reach": [
    { label: "Cabecera", fields: ["badge", "title", "description"] },
    { label: "Características", fields: ["features"] },
    { label: "Estadísticas", fields: ["stats"] },
    { label: "Llamada a la acción", fields: ["cta"] },
    { label: "Puntos del mapa", fields: ["nodes"] },
  ],
  "home:roles": [
    { label: "Cabecera", fields: ["badge", "title", "description", "features"] },
    { label: "Categorías del hub", fields: ["groups"] },
    { label: "Capacidades legacy", fields: ["items"] },
    { label: "Estadísticas", fields: ["stats"] },
  ],
  "home:final_cta": [
    { label: "Contenido", fields: ["title", "text", "cta", "href"] },
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
    { label: "Barra RBE", fields: ["rbe_bar"] },
    { label: "Estadísticas", fields: ["stats"] },
  ],
  "services:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "intro"] },
    { label: "Categorías y servicios", fields: ["groups"] },
    { label: "Áreas de servicio (legacy)", fields: ["areas"] },
    { label: "Pie", fields: ["footer"] },
  ],
  "industries:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle"] },
    { label: "Industrias", fields: ["items"] },
    { label: "Tarjeta de información", fields: ["info_card"] },
  ],
  "cases:page": [
    { label: "Cabecera", fields: ["header"] },
    { label: "Secciones", fields: ["featured_title", "studies_title", "clients_title"] },
    { label: "Botones", fields: ["view_all_label", "view_less_label"] },
    { label: "Casos de éxito legacy", fields: ["items"] },
  ],
  "cases:studies": [
    { label: "Case studies", fields: ["items"] },
  ],
  "cases:clients": [
    { label: "Clientes / experiencia", fields: ["items"] },
  ],
  "contact:page": [
    { label: "Cabecera", fields: ["badge", "title", "subtitle", "features"] },
    { label: "Equipo y contacto", fields: ["team_section", "methods"] },
    { label: "Formulario", fields: ["form"] },
  ],
  "contact:teams": [
    { label: "Cabecera", fields: ["title"] },
    { label: "Contactos regionales", fields: ["items"] },
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
  id: "ID estable (técnico, no traducir)",
  shortLabel: "Etiqueta corta",
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
  groups: "Categorías",
  services: "Servicios",
  steps: "Pasos",
  step: "Paso",
  footer: "Pie",
  footer_card: "Tarjeta inferior",
  rbe_bar: "Barra RBE",
  right_card: "Tarjeta derecha",
  header: "Cabecera",
  team_section: "Sección equipo",
  methods: "Métodos de contacto",
  form: "Formulario",
  region: "Región",
  organization: "Organización",
  photo: "Foto",
  countries: "Países",
  addresses: "Direcciones",
  phones: "Teléfonos",
  publicEmail: "Email público",
  website: "Website",
  recipientKey: "Recipient key (técnico, no traducir; no es email)",
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
  nodes: "Puntos en el mapa",
  node: "Punto del mapa",
  country: "País",
  client: "Cliente",
  x: "Posición X (%)",
  y: "Posición Y (%)",
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
  "home:partners:purpose.badge": "Etiqueta (badge)",
  "home:partners:purpose.title": "Título",
  "home:final_cta:title": "Título",
  "home:final_cta:text": "Texto",
  "home:final_cta:cta": "Botón",
  "home:final_cta:href": "Enlace CTA",
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
  "about:second:rbe_bar.icon": "Ícono",
  "about:second:rbe_bar.title": "Título",
  "about:second:rbe_bar.text": "Texto",
  "about:second:rbe_bar.cta": "Botón",
  "about:second:rbe_bar.href": "Enlace CTA",
  "cases:page:header.badge": "Etiqueta (badge)",
  "cases:page:header.title": "Título",
  "cases:page:header.text": "Texto",
  "cases:page:featured_title": "Título destacados",
  "cases:page:studies_title": "Título listado completo",
  "cases:page:clients_title": "Título clientes / experiencia",
  "cases:page:view_all_label": "Botón ver todos",
  "cases:page:view_less_label": "Botón ver menos",
  "cases:studies:items.id": "ID técnico (no traducir)",
  "cases:studies:items.slug": "Slug técnico futuro (no traducir)",
  "cases:studies:items.featured": "Destacado (técnico)",
  "cases:studies:items.client": "Cliente",
  "cases:studies:items.title": "Título",
  "cases:studies:items.industry": "Industria",
  "cases:studies:items.country": "País",
  "cases:studies:items.summary": "Resumen",
  "cases:studies:items.description": "Descripción",
  "cases:studies:items.logo": "Logo",
  "cases:studies:items.image": "Imagen principal",
  "cases:studies:items.project": "Proyecto",
  "cases:studies:items.knowhow": "Know-how",
  "cases:studies:items.bullets": "Bullets",
  "cases:studies:items.results": "Resultados",
  "cases:studies:items.stats": "Métricas",
  "cases:studies:items.href": "Enlace técnico (no traducir)",
  "cases:clients:items.id": "ID técnico (no traducir)",
  "cases:clients:items.name": "Nombre",
  "cases:clients:items.logo": "Logo",
  "cases:clients:items.industry": "Industria",
  "cases:clients:items.country": "País (legacy/simple)",
  "cases:clients:items.locations": "Ubicaciones",
  "cases:clients:items.type": "Tipo técnico (no traducir)",
  "cases:clients:items.featured": "Destacado (técnico)",
  "cases:clients:items.note": "Nota",
  "contact:page:team_section.title": "Título",
  "contact:page:team_section.footer": "Pie",
  "contact:page:form.title": "Título",
  "contact:page:form.subtitle": "Subtítulo",
  "contact:page:form.privacy": "Texto de privacidad",
  "contact:page:form.trust": "Texto de confianza",
  "contact:page:form.footer_note": "Nota al pie",
    "contact:teams:items.id": "ID técnico (no traducir)",
    "contact:teams:items.region": "Región",
  "contact:teams:items.contacts": "Contactos",
  "contact:teams:items.contacts.id": "ID técnico (no traducir)",
  "contact:teams:items.contacts.name": "Nombre",
  "contact:teams:items.contacts.role": "Rol",
  "contact:teams:items.contacts.organization": "Organización",
  "contact:teams:items.contacts.photo": "Foto",
  "contact:teams:items.contacts.countries": "Países",
  "contact:teams:items.contacts.addresses": "Direcciones",
  "contact:teams:items.contacts.phones": "Teléfonos",
  "contact:teams:items.contacts.publicEmail": "Email público",
  "contact:teams:items.contacts.website": "Website",
  "contact:teams:items.contacts.recipientKey": "Recipient key (técnico, no traducir; no es email)",
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

// Puntos por defecto del mapa Global Reach. El sitio los usa cuando la fila
// de la BD no trae "nodes"; el admin los usa para que la sección "Puntos del
// mapa" sea editable aunque la fila guardada sea anterior a este campo.
export const DEFAULT_GLOBAL_REACH_NODES = [
  { country: "United States", label: "NA", x: 8, y: 38 },
  { country: "Mexico", label: "MX", x: 15, y: 48 },
  { country: "Brazil", label: "BR", x: 25, y: 65 },
  { country: "Germany", label: "DE", x: 51, y: 28 },
  { country: "South Africa", label: "ZA", x: 55, y: 55 },
  { country: "China", label: "CN", x: 88, y: 38 },
];
