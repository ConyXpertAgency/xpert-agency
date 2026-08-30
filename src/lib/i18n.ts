type RolesCopy = {
  allExpertise: string;
  backToAllExpertise: string;
  capabilities: string;
  expertCapabilities: string;
  expertiseMap: string;
  collective: string;
  expertise: string;
  viewGroup: string;
};

type FooterCopy = {
  navigation: string;
  expertise: string;
  contact: string;
  whatsapp: string;
  homeAria: string;
};

export type UiCopy = {
  roles: RolesCopy;
  footer: FooterCopy;
};

export const uiCopy = {
  en: {
    roles: {
      allExpertise: "All expertise",
      backToAllExpertise: "Back to all expertise",
      capabilities: "capabilities",
      expertCapabilities: "Expert capabilities across our network",
      expertiseMap: "Expertise map",
      collective: "Collective",
      expertise: "Expertise",
      viewGroup: "View {title}",
    },
    footer: {
      navigation: "Navigation",
      expertise: "Expertise",
      contact: "Contact",
      whatsapp: "WhatsApp",
      homeAria: "Xpert Agency home",
    },
  },
  es: {
    roles: {
      allExpertise: "Toda la experiencia",
      backToAllExpertise: "Volver a toda la experiencia",
      capabilities: "capacidades",
      expertCapabilities: "Capacidades expertas en toda nuestra red",
      expertiseMap: "Mapa de experiencia",
      collective: "Colectivo",
      expertise: "Experiencia",
      viewGroup: "Ver {title}",
    },
    footer: {
      navigation: "Navegación",
      expertise: "Experiencia",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      homeAria: "Inicio de Xpert Agency",
    },
  },
  de: {
    roles: {
      allExpertise: "Gesamte Expertise",
      backToAllExpertise: "Zurück zur gesamten Expertise",
      capabilities: "Kompetenzen",
      expertCapabilities: "Expertenkompetenzen in unserem Netzwerk",
      expertiseMap: "Expertise-Karte",
      collective: "Kollektiv",
      expertise: "Expertise",
      viewGroup: "{title} ansehen",
    },
    footer: {
      navigation: "Navigation",
      expertise: "Expertise",
      contact: "Kontakt",
      whatsapp: "WhatsApp",
      homeAria: "Xpert Agency Startseite",
    },
  },
} as const satisfies Record<string, UiCopy>;

export type UiCopyLocale = keyof typeof uiCopy;

export function getUiCopy(lang: string): UiCopy {
  return uiCopy[lang as UiCopyLocale] ?? uiCopy.en;
}
