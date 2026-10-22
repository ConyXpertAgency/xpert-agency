import type { Lang } from "./supabase/types";

export type SeoEntry = { title: string; description: string };
export type SeoPageKey = "site" | "home" | "about" | "services" | "industries" | "cases" | "contact" | "rbe" | "filling_packaging";

export const SEO_DEFAULTS: Record<Lang, Record<SeoPageKey, SeoEntry>> = {
  en: {
    site: { title: "Xpert Agency", description: "Experts for integrated manufacturing & logistics improvement" },
    home: { title: "Xpert Agency", description: "Experts for integrated manufacturing & logistics improvement, delivering projects across Europe, the Americas and Asia." },
    about: { title: "About us", description: "Who we are: deep manufacturing, logistics and supply chain expertise, from strategy to implementation and continuous improvement." },
    services: { title: "Services", description: "Expert-led transformation: process optimization, automation, project and interim management, lean, supply chain and systems integration." },
    industries: { title: "Industries", description: "Manufacturing, food & beverage, retail, warehousing & logistics, consumer goods and industrial operations." },
    cases: { title: "Cases", description: "Proven impact across industries and challenges: manufacturing and logistics results delivered with our clients." },
    contact: { title: "Contact", description: "Talk to our team: tell us about your project and we'll get back to you — typically within 1 business day." },
    rbe: { title: "RBE™ Ramp-up & Risk Mitigation", description: "RBE™ interim management: prepare, safeguard and preform — elevate performance safely and quickly." },
    filling_packaging: { title: "Filling & Packaging Technologies", description: "Filling and packaging line performance: quality, output and ramp-up support for production operations." },
  },
  es: {
    site: { title: "Xpert Agency", description: "Expertos en mejora integral de manufactura y logística" },
    home: { title: "Xpert Agency", description: "Expertos en mejora integral de manufactura y logística, con proyectos en Europa, América y Asia." },
    about: { title: "Quiénes somos", description: "Quiénes somos: experiencia en manufactura, logística y cadena de suministro, de la estrategia a la mejora continua." },
    services: { title: "Servicios", description: "Transformación liderada por expertos: optimización de procesos, automatización, gestión de proyectos e interina, lean y cadena de suministro." },
    industries: { title: "Industrias", description: "Manufactura, alimentos y bebidas, retail, almacenaje y logística, bienes de consumo y operaciones industriales." },
    cases: { title: "Casos", description: "Impacto probado en industrias y retos: resultados en manufactura y logística junto a nuestros clientes." },
    contact: { title: "Contacto", description: "Habla con nuestro equipo: cuéntanos tu proyecto y te responderemos — normalmente en 1 día hábil." },
    rbe: { title: "RBE™ Ramp-up y mitigación de riesgos", description: "Interim management RBE™: preparar, proteger y rendir — eleva el desempeño de forma segura y rápida." },
    filling_packaging: { title: "Tecnologías de llenado y empaque", description: "Rendimiento de líneas de llenado y empaque: calidad, producción y acompañamiento en arranque." },
  },
  de: {
    site: { title: "Xpert Agency", description: "Experten für integrierte Verbesserung von Fertigung und Logistik" },
    home: { title: "Xpert Agency", description: "Experten für integrierte Verbesserung von Fertigung und Logistik – mit Projekten in Europa, Amerika und Asien." },
    about: { title: "Über uns", description: "Wer wir sind: fundierte Expertise in Fertigung, Logistik und Supply Chain – von der Strategie bis zur kontinuierlichen Verbesserung." },
    services: { title: "Leistungen", description: "Expertengestützte Transformation: Prozessoptimierung, Automatisierung, Projekt- und Interim-Management, Lean und Supply Chain." },
    industries: { title: "Branchen", description: "Fertigung, Lebensmittel, Handel, Lager & Logistik, Konsumgüter und industrieller Betrieb." },
    cases: { title: "Referenzen", description: "Nachgewiesene Wirkung über Branchen und Herausforderungen: Ergebnisse in Fertigung und Logistik." },
    contact: { title: "Kontakt", description: "Sprechen Sie mit unserem Team: Schildern Sie Ihr Projekt – Antwort in der Regel innerhalb eines Werktages." },
    rbe: { title: "RBE™ Ramp-up & Risikominderung", description: "RBE™ Interim-Management: vorbereiten, absichern, leisten – Leistung sicher und schnell steigern." },
    filling_packaging: { title: "Abfüll- und Verpackungstechnologien", description: "Leistung von Abfüll- und Verpackungslinien: Qualität, Output und Ramp-up-Begleitung." },
  },
};
