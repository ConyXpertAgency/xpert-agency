type RolesCopy = {
  headingBadge: string;
  headingTitle: string;
  allExpertise: string;
  backToAllExpertise: string;
  capabilities: string;
  expertCapabilities: string;
  expertiseMap: string;
  collective: string;
  expertise: string;
  viewGroup: string;
  interactionHint: string;
};

type FooterCopy = {
  navigation: string;
  expertise: string;
  contact: string;
  whatsapp: string;
  homeAria: string;
  aiDisclosure: string;
  cookieSettings: string;
};

type ConsentCopy = {
  title: string;
  text: string;
  acceptAll: string;
  reject: string;
  customize: string;
  save: string;
  necessary: string;
  necessaryDesc: string;
  alwaysOn: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
};

type ServicesCopy = {
  allServices: string;
  service: string;
  services: string;
};

export type UiCopy = {
  roles: RolesCopy;
  footer: FooterCopy;
  services: ServicesCopy;
  consent: ConsentCopy;
};

export const uiCopy = {
  en: {
    roles: {
      headingBadge: "Roles and Responsibilities",
      headingTitle: "Expertise, Processes and Context",
      allExpertise: "All expertise",
      backToAllExpertise: "Back to all expertise",
      capabilities: "capabilities",
      expertCapabilities: "Expert capabilities across our network",
      expertiseMap: "Expertise map",
      collective: "Collective",
      expertise: "Expertise",
      viewGroup: "View {title}",
      interactionHint: "Select a category to explore its capabilities",
    },
    footer: {
      navigation: "Navigation",
      expertise: "Expertise",
      contact: "Contact",
      whatsapp: "WhatsApp",
      homeAria: "Xpert Agency home",
      aiDisclosure: "Developed with AI-assisted tools and human review.",
      cookieSettings: "Cookie settings",
    },
    consent: {
      title: "Your privacy choices",
      text: "We use analytics cookies to understand how our website is used. Marketing cookies are only used with your consent.",
      acceptAll: "Accept all",
      reject: "Reject non-essential",
      customize: "Customize",
      save: "Save preferences",
      necessary: "Necessary",
      necessaryDesc: "Required for the site to function.",
      alwaysOn: "Always on",
      analytics: "Analytics",
      analyticsDesc: "Helps us understand usage (anonymous statistics).",
      marketing: "Marketing",
      marketingDesc: "Used for marketing measurement only with consent.",
    },
    services: {
      allServices: "All services",
      service: "service",
      services: "services",
    },
  },
  es: {
    roles: {
      headingBadge: "Roles y responsabilidades",
      headingTitle: "Experiencia, procesos y contexto",
      allExpertise: "Toda la experiencia",
      backToAllExpertise: "Volver a toda la experiencia",
      capabilities: "capacidades",
      expertCapabilities: "Capacidades expertas en toda nuestra red",
      expertiseMap: "Mapa de experiencia",
      collective: "Colectivo",
      expertise: "Experiencia",
      viewGroup: "Ver {title}",
      interactionHint: "Selecciona una categoría para explorar sus capacidades",
    },
    footer: {
      navigation: "Navegación",
      expertise: "Experiencia",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      homeAria: "Inicio de Xpert Agency",
      aiDisclosure: "Desarrollado con herramientas asistidas por IA y revisión humana.",
      cookieSettings: "Configuración de cookies",
    },
    consent: {
      title: "Tus opciones de privacidad",
      text: "Usamos cookies de análisis para entender cómo se utiliza nuestro sitio. Las cookies de marketing solo se usan con tu consentimiento.",
      acceptAll: "Aceptar todo",
      reject: "Rechazar no esenciales",
      customize: "Personalizar",
      save: "Guardar preferencias",
      necessary: "Necesarias",
      necessaryDesc: "Necesarias para el funcionamiento del sitio.",
      alwaysOn: "Siempre activas",
      analytics: "Analítica",
      analyticsDesc: "Nos ayuda a entender el uso (estadísticas anónimas).",
      marketing: "Marketing",
      marketingDesc: "Solo para medición de marketing con consentimiento.",
    },
    services: {
      allServices: "Todos los servicios",
      service: "servicio",
      services: "servicios",
    },
  },
  de: {
    roles: {
      headingBadge: "Rollen und Verantwortlichkeiten",
      headingTitle: "Expertise, Prozesse und Kontext",
      allExpertise: "Gesamte Expertise",
      backToAllExpertise: "Zurück zur gesamten Expertise",
      capabilities: "Kompetenzen",
      expertCapabilities: "Expertenkompetenzen in unserem Netzwerk",
      expertiseMap: "Expertise-Karte",
      collective: "Kollektiv",
      expertise: "Expertise",
      viewGroup: "{title} ansehen",
      interactionHint: "Kategorie auswählen, um Kompetenzen zu entdecken",
    },
    footer: {
      navigation: "Navigation",
      expertise: "Expertise",
      contact: "Kontakt",
      whatsapp: "WhatsApp",
      homeAria: "Xpert Agency Startseite",
      aiDisclosure: "Mit KI-gestützten Werkzeugen entwickelt und menschlich überprüft.",
      cookieSettings: "Cookie-Einstellungen",
    },
    consent: {
      title: "Deine Auswahl zum Datenschutz",
      text: "Wir verwenden Analyse-Cookies, um zu verstehen, wie unsere Website genutzt wird. Marketing-Cookies werden nur mit deiner Zustimmung verwendet.",
      acceptAll: "Alle akzeptieren",
      reject: "Nicht essenzielle ablehnen",
      customize: "Anpassen",
      save: "Auswahl speichern",
      necessary: "Notwendig",
      necessaryDesc: "Für den Betrieb der Website erforderlich.",
      alwaysOn: "Immer aktiv",
      analytics: "Analyse",
      analyticsDesc: "Hilft uns, die Nutzung zu verstehen (anonyme Statistiken).",
      marketing: "Marketing",
      marketingDesc: "Nur mit Zustimmung für Marketing-Messung.",
    },
    services: {
      allServices: "Alle Leistungen",
      service: "Leistung",
      services: "Leistungen",
    },
  },
} as const satisfies Record<string, UiCopy>;

export type UiCopyLocale = keyof typeof uiCopy;

export function getUiCopy(lang: string): UiCopy {
  return uiCopy[lang as UiCopyLocale] ?? uiCopy.en;
}
