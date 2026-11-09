/**
 * Xpert Agency: borradores NO aprobados extraídos de la propuesta legal de
 * Google Docs del 27/10/2026. No son declaraciones legales finales.
 *
 * Para incorporar textos validados posteriormente, sustituye los arreglos
 * por las versiones aprobadas (EN/ES/DE) y registra aprobación por idioma.
 * No habilitar publicación sin revisión profesional y aprobación empresarial.
 */

export type LegalPageKind = "legal-statements" | "privacy-policy";
export type LegalLocale = "en" | "es" | "de";
export type LegalSection = { heading: string; paragraphs: readonly string[] };
export type LegalDocument = {
  title: string;
  sections: readonly LegalSection[];
};

// Nunca habilitar estas páginas en producción mientras las políticas sigan sin aprobar.
export const LEGAL_PAGES_APPROVED = false;

// Fuente: propuesta en español, 27 octubre 2026. NO crear traducciones legales
// definitivas desde ChatGPT; EN/DE muestran el borrador ES en Preview.
const SPANISH_DRAFTS: Record<LegalPageKind, LegalDocument> = {
  "legal-statements": {
    title: "Legal Statements / Aviso legal",
    sections: [
      {
        heading: "1. Identificación del proveedor",
        paragraphs: [
          "El sitio web www.xpert-im.agency es operado por:",
          "Nombre comercial: Xpert Agency",
          "Razón social o denominación legal: [CONFIRMAR]",
          "País y domicilio legal: [CONFIRMAR]",
          "Representante legal autorizado: [CONFIRMAR]",
          "Correo empresarial oficial: [CONFIRMAR BUZÓN FUNCIONAL]",
          "Teléfono de contacto: [CONFIRMAR]",
          "Registro mercantil y número de inscripción: [SI CORRESPONDE]",
          "Número o identificación fiscal: [SI CORRESPONDE]",
          "Autoridad supervisora y/o información profesional reglamentada: [SI CORRESPONDE]",
        ],
      },
      {
        heading: "2. Actividad del sitio",
        paragraphs: [
          "Xpert Agency presenta servicios profesionales relacionados con consultoría, manufactura, logística, automatización y mejora de procesos empresariales. El sitio permite conocer servicios, experiencia, proyectos y medios de contacto, y enviar solicitudes de información comercial.",
        ],
      },
      {
        heading: "3. Propiedad intelectual",
        paragraphs: [
          "Los contenidos, marcas, imágenes, fotografías, logotipos y materiales del sitio se encuentran sujetos a los derechos de sus respectivos titulares. Xpert Agency debe confirmar qué materiales son propios, cuáles son de terceros y las autorizaciones de uso disponibles.",
        ],
      },
      {
        heading: "4. Información comercial",
        paragraphs: [
          "Las descripciones de servicios y resultados presentadas en el sitio tienen fines informativos. Las condiciones concretas de cualquier contratación deberán constar en el presupuesto, propuesta o acuerdo correspondiente.",
        ],
      },
      {
        heading: "5. Enlaces y servicios externos",
        paragraphs: [
          "El sitio puede dirigir a plataformas externas, como LinkedIn y WhatsApp. Las condiciones y políticas de esas plataformas son independientes. El alcance exacto de las responsabilidades y los avisos pertinentes deberá revisarse.",
        ],
      },
      {
        heading: "6. Menciones obligatorias adicionales",
        paragraphs: [
          "[RESERVADO PARA REQUISITOS DE IDENTIFICACIÓN, REGISTRO, RESPONSABILIDAD O INFORMACIÓN PROFESIONAL QUE SEAN REALMENTE APLICABLES A LA ENTIDAD OPERADORA.]",
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy / Política de privacidad",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          "Entidad responsable: [RAZÓN SOCIAL Y DOMICILIO LEGAL POR CONFIRMAR].",
          "Contacto para privacidad y ejercicio de derechos: [CORREO CORPORATIVO VERIFICADO POR XPERT AGENCY].",
        ],
      },
      {
        heading: "2. Datos tratados",
        paragraphs: [
          "El formulario de contacto del sitio contempla los siguientes campos: nombre, nombre de la empresa, correo electrónico, área de interés, mensaje o descripción del proyecto y contacto/equipo regional seleccionado.",
          "Según el funcionamiento técnico efectivo del alojamiento y la medición, podrían procesarse datos técnicos de conexión o uso. Antes de declarar categorías concretas, verificar registros, cookies, scripts, direcciones IP y herramientas efectivamente activas.",
        ],
      },
      {
        heading: "3. Finalidades",
        paragraphs: [
          "Los datos proporcionados en el formulario se emplean para recibir solicitudes, responder consultas, identificar el equipo regional seleccionado, hacer seguimiento comercial solicitado y enviar confirmación de recepción.",
          "Las finalidades adicionales —por ejemplo, comunicaciones promocionales— deberán declararse separadamente y contar con la base jurídica o consentimiento que corresponda.",
        ],
      },
      {
        heading: "4. Base jurídica del tratamiento",
        paragraphs: [
          "[DETERMINAR LA BASE JURÍDICA APLICABLE A CADA FINALIDAD Y TERRITORIO. NO PRESUPONER CONSENTIMIENTO PARA TODOS LOS TRATAMIENTOS.]",
        ],
      },
      {
        heading: "5. Proveedores tecnológicos y destinatarios",
        paragraphs: [
          "Vercel: alojamiento y ejecución del sitio.",
          "Resend: envío de los correos del formulario y sus confirmaciones.",
          "Supabase: gestión del contenido del CMS; no se ha verificado que almacene las solicitudes enviadas desde el formulario.",
          "Google Tag Manager: contenedor de herramientas de medición; determinar qué etiquetas se ejecutan realmente.",
          "LinkedIn y WhatsApp: plataformas externas a las que dirigen ciertos enlaces.",
          "La empresa deberá revisar acuerdos con proveedores, categorías de datos, subencargados, localizaciones y transferencias internacionales pertinentes. Esta relación es provisional y debe confirmarse.",
        ],
      },
      {
        heading: "6. Cookies y preferencias",
        paragraphs: [
          "El sitio incorpora un panel de preferencias para tecnologías necesarias, analítica y marketing, accesible desde Cookie Settings.",
          "Las elecciones de analítica y marketing se registran localmente en el navegador y se transmiten como actualizaciones de consentimiento a Google Tag Manager. La presencia de ese control no demuestra por sí sola qué cookies o etiquetas se instalan.",
          "[PENDIENTE: INVENTARIO REAL DE COOKIES/ETIQUETAS, FINALIDADES, PROVEEDOR, DURACIÓN Y MECANISMO DE RETIRADA DEL CONSENTIMIENTO.]",
        ],
      },
      {
        heading: "7. Conservación",
        paragraphs: [
          "[DEFINIR PERÍODOS DE CONSERVACIÓN O CRITERIOS PARA SOLICITUDES COMERCIALES, CORREOS, REGISTROS TÉCNICOS Y DATOS QUE DEBAN RETENERSE POR LEY.]",
        ],
      },
      {
        heading: "8. Derechos de las personas",
        paragraphs: [
          "Se informará de los derechos exigibles conforme a la normativa aplicable, sus canales de ejercicio, plazos y, cuando corresponda, la autoridad ante la cual presentar una reclamación.",
          "Si aplica RGPD, revisar los derechos previstos en dicha normativa; si aplica la ley mexicana, incorporar los mecanismos pertinentes para derechos ARCO.",
          "Canal de contacto: [CONFIRMAR]",
        ],
      },
      {
        heading: "9. Seguridad",
        paragraphs: [
          "La empresa deberá aprobar una descripción general y veraz de las medidas técnicas y organizativas existentes, sin revelar detalles que comprometan la seguridad.",
        ],
      },
      {
        heading: "10. Actualizaciones y vigencia",
        paragraphs: [
          "Procedimiento de cambios y comunicación de actualizaciones: [CONFIRMAR].",
          "Fecha de entrada en vigor: [PENDIENTE DE APROBACIÓN].",
        ],
      },
    ],
  },
};

export const LEGAL_REVIEW_COPY: Record<LegalLocale, {
  draft: string;
  explanation: string;
  spanishOnly: string;
  source: string;
  sections: string;
}> = {
  es: {
    draft: "Borrador pendiente de revisión legal",
    explanation: "Este contenido es una propuesta de trabajo, no una política legal aprobada. Los datos pendientes están identificados y la empresa debe validarlos antes de su publicación.",
    spanishOnly: "Contenido base en español (27 de octubre de 2026)",
    source: "Fuente: borrador compartido con Xpert Agency",
    sections: "Apartados",
  },
  en: {
    draft: "Draft — legal review pending",
    explanation: "This is a working draft, not an approved legal notice or policy. The Spanish source text is shown here for internal review; an approved English version is still required.",
    spanishOnly: "Spanish source draft (27 October 2026) — English version pending",
    source: "Source: working draft shared with Xpert Agency",
    sections: "Sections",
  },
  de: {
    draft: "Entwurf — rechtliche Prüfung ausstehend",
    explanation: "Dies ist ein Arbeitsentwurf, keine genehmigte Rechtsmitteilung oder Datenschutzerklärung. Zur internen Prüfung wird der spanische Ausgangstext angezeigt; eine genehmigte deutsche Fassung fehlt noch.",
    spanishOnly: "Spanischer Ausgangsentwurf (27. Oktober 2026) — deutsche Fassung ausstehend",
    source: "Quelle: Arbeitsentwurf für Xpert Agency",
    sections: "Abschnitte",
  },
};

export function getLegalDraft(kind: LegalPageKind): LegalDocument {
  return SPANISH_DRAFTS[kind];
}

/** Do not expose unapproved legal drafts on public production. */
export function isLegalPreviewAllowed(): boolean {
  return process.env.VERCEL_ENV === "preview" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV === "development");
}
