"use client";

import { useCallback, useEffect, useState } from "react";
import { getUiCopy } from "@/lib/i18n";
import {
  OPEN_CONSENT_EVENT,
  loadConsent,
  pushConsentUpdate,
  saveConsent,
} from "@/lib/consent";
import styles from "@/styles/consent/Consent.module.css";

interface Draft {
  analytics: boolean;
  marketing: boolean;
}

type View = "banner" | "panel";

const ConsentBanner = ({ lang }: { lang: string }) => {
  const t = getUiCopy(lang).consent;
  const [view, setView] = useState<View | null>(null);
  const [draft, setDraft] = useState<Draft>({ analytics: false, marketing: false });

  // Primera decisión: aplicar preferencia guardada o mostrar banner.
  useEffect(() => {
    const stored = loadConsent();
    if (stored) {
      pushConsentUpdate(stored);
      return;
    }
    setView("banner");
  }, []);

  // "Cookie settings" del footer reabre el panel.
  useEffect(() => {
    const open = () => {
      const stored = loadConsent();
      if (stored) setDraft({ analytics: stored.analytics, marketing: stored.marketing });
      setView("panel");
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const apply = useCallback((prefs: Draft) => {
    const record = saveConsent(prefs);
    pushConsentUpdate(record);
    setView(null);
  }, []);

  if (!view) return null;

  const toggle = (key: keyof Draft) =>
    setDraft((d) => ({ ...d, [key]: !d[key] }));

  return (
    <section className={styles.Banner} role="dialog" aria-label={t.title} aria-live="polite">
      <div className={styles.Copy}>
        <strong>{t.title}</strong>
        <p>{t.text}</p>
      </div>

      {view === "banner" ? (
        <div className={styles.Actions}>
          <button type="button" className={`${styles.Btn} ${styles.Accept}`} onClick={() => apply({ analytics: true, marketing: true })}>
            {t.acceptAll}
          </button>
          <button type="button" className={`${styles.Btn} ${styles.Reject}`} onClick={() => apply({ analytics: false, marketing: false })}>
            {t.reject}
          </button>
          <button type="button" className={`${styles.Btn} ${styles.Custom}`} onClick={() => setView("panel")}>
            {t.customize}
          </button>
        </div>
      ) : (
        <div className={styles.Panel}>
          <div className={styles.Row}>
            <div>
              <strong>{t.necessary}</strong>
              <p>{t.necessaryDesc}</p>
            </div>
            <span className={styles.Locked}>{t.alwaysOn}</span>
          </div>
          <div className={styles.Row}>
            <div>
              <strong>{t.analytics}</strong>
              <p>{t.analyticsDesc}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.analytics}
              aria-label={t.analytics}
              className={`${styles.Switch} ${draft.analytics ? styles.On : ""}`}
              onClick={() => toggle("analytics")}
            >
              <span />
            </button>
          </div>
          <div className={styles.Row}>
            <div>
              <strong>{t.marketing}</strong>
              <p>{t.marketingDesc}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.marketing}
              aria-label={t.marketing}
              className={`${styles.Switch} ${draft.marketing ? styles.On : ""}`}
              onClick={() => toggle("marketing")}
            >
              <span />
            </button>
          </div>
          <div className={styles.Actions}>
            <button type="button" className={`${styles.Btn} ${styles.Accept}`} onClick={() => apply(draft)}>
              {t.save}
            </button>
            <button type="button" className={`${styles.Btn} ${styles.Reject}`} onClick={() => apply({ analytics: true, marketing: true })}>
              {t.acceptAll}
            </button>
            <button type="button" className={`${styles.Btn} ${styles.Custom}`} onClick={() => apply({ analytics: false, marketing: false })}>
              {t.reject}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsentBanner;
