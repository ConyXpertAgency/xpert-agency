/**
 * Consent Mode v2 + persistencia local. Sin PII: solo booleanos,
 * timestamp y versión. Ningún identificador personal.
 */

export const CONSENT_STORAGE_KEY = "xpert-consent-v1";
export const CONSENT_VERSION = 1;
export const OPEN_CONSENT_EVENT = "xpert:open-consent";

export interface ConsentPrefs {
  analytics: boolean;
  marketing: boolean;
  ts: number;
  v: number;
}

export interface ConsentGtmParams {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
}

export const CONSENT_DEFAULTS: ConsentGtmParams = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export function consentToGtm(prefs: Pick<ConsentPrefs, "analytics" | "marketing">): ConsentGtmParams {
  return {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  };
}

export function loadConsent(): ConsentPrefs | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return {
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
      v: typeof parsed.v === "number" ? parsed.v : 0,
    };
  } catch {
    return null;
  }
}

export function saveConsent(prefs: Pick<ConsentPrefs, "analytics" | "marketing">): ConsentPrefs {
  const record: ConsentPrefs = { ...prefs, ts: Date.now(), v: CONSENT_VERSION };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // almacenamiento no disponible: se aplica en sesión sin persistir
  }
  return record;
}

/** Envía el update de Consent Mode v2 vía el stub gtag (definido pre-GTM). */
export function pushConsentUpdate(prefs: Pick<ConsentPrefs, "analytics" | "marketing">): void {
  try {
    window.gtag?.("consent", "update", consentToGtm(prefs));
  } catch {
    // gtag aún no disponible: el default denied sigue vigente
  }
}

declare global {
  interface Window {
    gtag?: (...args: [string, string, Record<string, string>] | unknown[]) => void;
  }
}
