import type { ServiceGroup } from "../serviceGroups";
import type { ExpertiseGroup } from "../expertiseGroups";

// Idiomas base del sitio. Se mantiene la unión literal para autocomplete,
// pero se acepta cualquier código nuevo creado desde el admin (fr, pt, ...).
export type Lang = "en" | "es" | "de" | (string & {});

export interface ContentRow {
  collection: string;
  keyname: string;
  lang: Lang;
  data: Record<string, unknown>;
  order_index?: number;
}

export interface TextItem {
  title?: string;
  text?: string;
  icon?: string;
  number?: string;
  value?: string;
  label?: string;
  lines?: string[];
  bullets?: string[];
}

export interface IndustryItem extends TextItem {
  image?: string;
}

/* Apartados con imagen de fondo configurable desde el admin */
export interface SectionBackground {
  background_image?: string;
  /** 0–1: capa oscura sobre la imagen de fondo para legibilidad. */
  background_overlay?: number;
}

/* ───────────────────────────── Home ───────────────────────────── */

export interface HomeHero extends SectionBackground {
  badge: string;
  title: string[];
  subtitle: string;
  cta_primary: string;
  cta_primary_href: string;
  cta_secondary: string;
  cta_secondary_href: string;
  info_cards: TextItem[];
  stat_impact: { title: string; value: string; label: string };
  core_areas_title: string;
  core_areas: string[];
  stat_success: { title: string; value: string; label: string };
  global_delivery: { title: string; text: string };
}

export interface Partner {
  name: string;
  slug: string;
  logo?: string;
  description: string[];
  tags: string[];
}

export interface HomeListCard {
  title: string;
  text?: string;
  image?: string;
  items?: string[];
}

export interface HomePartners extends SectionBackground {
  badge: string;
  title: string;
  description: string[];
  purpose?: {
    badge: string;
    title: string[];
  };
  items: Partner[];
  cards: HomeListCard[];
  stats: TextItem[];
  footer: { text: string; cta: string };
}

export interface GlobalReachNode {
  country: string;
  label: string;
  x: number;
  y: number;
  client?: string;
  description?: string;
  logo?: string;
}

export interface HomeGlobalReach extends SectionBackground {
  badge: string;
  title: string;
  description: string[];
  features: TextItem[];
  stats: TextItem[];
  cta: string;
  nodes?: GlobalReachNode[];
}

export interface HomeRoles extends SectionBackground {
  badge: string;
  title: string;
  description: string[];
  features: TextItem[];
  items: TextItem[];
  groups?: ExpertiseGroup[];
  stats: TextItem[];
}

export interface HomeFinalCta {
  title: string;
  text: string;
  cta: string;
  href: string;
}

/* ───────────────────────────── About ───────────────────────────── */

export interface AboutFirst extends SectionBackground {
  badge: string;
  title: string;
  heading: string[];
  text: string[];
  features: TextItem[];
  stats: TextItem[];
  right_card: { title: string[]; text: string };
}

export interface AboutStep {
  number: string;
  icon?: string;
  title: string;
  text: string[];
  bullets: string[];
}

export interface AboutSecond extends SectionBackground {
  badge: string;
  title: string[];
  text: string[];
  quote: { lines: string[]; author: string; sub: string };
  steps: AboutStep[];
  footer_card: { title: string; text: string };
  rbe_bar?: {
    icon?: string;
    title: string;
    text: string;
    cta: string;
    href: string;
  };
  stats: TextItem[];
}

/* ───────────────────────────── Services ───────────────────────────── */

export interface ServicesPage extends SectionBackground {
  badge: string;
  title: string;
  subtitle: string;
  intro: { title: string; text: string };
  areas: TextItem[];
  groups?: ServiceGroup[];
  footer: { title: string; text: string; cta: string };
}

/* ───────────────────────────── Industries ───────────────────────────── */

export interface IndustriesPage extends SectionBackground {
  badge: string;
  title: string;
  subtitle: string;
  items: IndustryItem[];
  info_card: { title: string; text: string; cta: string; cta_href: string };
}

/* ───────────────────────────── Cases ───────────────────────────── */

export interface CaseStat {
  icon?: string;
  value?: string;
  text: string;
}

export interface CaseItem {
  title: string;
  slug: string;
  description: string;
  image?: string;
  stats: TextItem[];
}

export interface CaseStudy {
  id: string;
  slug?: string;
  featured?: boolean;
  client: string;
  title: string;
  industry?: string;
  country?: string;
  summary?: string;
  description?: string;
  logo?: string;
  image?: string;
  project?: string;
  knowhow?: string;
  bullets?: string[];
  results?: string[];
  stats?: CaseStat[];
  href?: string;
}

export interface CasesStudies {
  items: CaseStudy[];
}

export interface ClientItem {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  country?: string;
  locations?: string[];
  type?: "client" | "project" | "partner" | "experience";
  featured?: boolean;
  note?: string;
}

export interface CasesClients {
  items: ClientItem[];
}

export interface CasesPage extends SectionBackground {
  header: { badge: string; title: string; text: string };
  featured_title?: string;
  studies_title?: string;
  clients_title?: string;
  view_all_label?: string;
  view_less_label?: string;
  /** Legacy/fallback: visible grid still reads this field during the transition. */
  items: CaseItem[];
}

/* ───────────────────────────── Contact ───────────────────────────── */

export interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  cta: string;
  href: string;
}

export interface RegionalContact {
  id: string;
  region?: string;
  name: string;
  role?: string;
  organization?: string;
  photo?: string;
  countries?: string[];
  addresses?: string[];
  phones?: string[];
  publicEmail?: string;
  website?: string;
  recipientKey?: string;
}

export interface ContactRegion {
  id: string;
  region: string;
  contacts: RegionalContact[];
}

export interface ContactTeams {
  title?: string;
  items: ContactRegion[];
}

export interface ContactPage extends SectionBackground {
  badge: string;
  title: string;
  subtitle: string;
  features: TextItem[];
  team_section: { title: string; footer: string };
  methods: ContactMethod[];
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      label: string;
      placeholder?: string;
      type: string;
      required: boolean;
      options?: string[];
    }[];
    privacy: string;
    footer_note: string;
    buttons: { label: string; variant: string }[];
    trust: string;
  };
}

/* ───────────────────────────── RBE ───────────────────────────── */

export interface RbeFirst extends SectionBackground {
  badge: string;
  title: string[];
  subtitle: string;
  text: string;
  cta_primary: string;
  cta_primary_href: string;
  cta_secondary: string;
  cta_secondary_href: string;
  list: TextItem[];
  cards: TextItem[];
  image: string;
}

export interface RbeSecond extends SectionBackground {
  badge: string;
  title: string;
  text: string;
  image: string;
  list: TextItem[];
  text_card: string;
  focus: { icon: string; badge: string; title: string };
}

export interface RbePhase {
  icon: string;
  title: string;
  subtitle: string[];
  items: string[];
}

export interface RbeThird extends SectionBackground {
  title: string;
  subtitle: string;
  phases: RbePhase[];
  image: string;
  footer_title: string;
  footer_text: string;
}

export interface RbeElement {
  icon: string;
  number: string;
  title: string;
  text: string;
}

export interface RbeFour extends SectionBackground {
  title: string;
  subtitle: string;
  left: RbeElement[];
  right: RbeElement[];
  image: string;
  extra: { number: string; title: string; text: string };
}

export interface RbeLetter {
  icon: string;
  letter: string;
  title: string;
  text: string;
}

export interface RbeFive extends SectionBackground {
  title: string;
  subtitle: string;
  image: string;
  items: RbeLetter[];
  footer_text: string;
}

export interface RbeFooter extends SectionBackground {
  title: string;
  text: string;
  contact_name: string;
  contact_phone: string;
  cta: string;
  year: string;
}

/* ───────────────────────────── Nav / Settings ───────────────────────────── */

export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export interface Settings {
  contact_email?: string;
  whatsapp?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  theme?: Record<string, string>;
}
