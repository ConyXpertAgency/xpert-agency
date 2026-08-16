export type Lang = "en" | "es" | "de";

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
  value?: string;
  label?: string;
  lines?: string[];
  bullets?: string[];
}

/* ───────────────────────────── Home ───────────────────────────── */

export interface HomeHero {
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
  items?: string[];
}

export interface HomePartners {
  badge: string;
  title: string;
  description: string[];
  items: Partner[];
  cards: HomeListCard[];
  stats: TextItem[];
  footer: { text: string; cta: string };
}

export interface HomeGlobalReach {
  badge: string;
  title: string;
  description: string[];
  features: TextItem[];
  stats: TextItem[];
  cta: string;
}

export interface HomeRoles {
  badge: string;
  title: string;
  description: string[];
  features: TextItem[];
  items: TextItem[];
  stats: TextItem[];
}

/* ───────────────────────────── About ───────────────────────────── */

export interface AboutFirst {
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

export interface AboutSecond {
  badge: string;
  title: string[];
  text: string[];
  quote: { lines: string[]; author: string; sub: string };
  steps: AboutStep[];
  footer_card: { title: string; text: string };
  stats: TextItem[];
}

/* ───────────────────────────── Services ───────────────────────────── */

export interface ServicesPage {
  badge: string;
  title: string;
  subtitle: string;
  intro: { title: string; text: string };
  areas: TextItem[];
  footer: { title: string; text: string; cta: string };
}

/* ───────────────────────────── Industries ───────────────────────────── */

export interface IndustriesPage {
  badge: string;
  title: string;
  subtitle: string;
  items: TextItem[];
  info_card: { title: string; text: string; cta: string; cta_href: string };
}

/* ───────────────────────────── Cases ───────────────────────────── */

export interface CaseItem {
  title: string;
  slug: string;
  description: string;
  image?: string;
  stats: TextItem[];
}

export interface CasesPage {
  header: { badge: string; title: string; text: string };
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

export interface ContactPage {
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
