"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";
import styles from "@/styles/ui/PublicFooter.module.css";

const CookieSettingsLink = ({ label }: { label: string }) => (
  <button
    type="button"
    className={styles.CookieBtn}
    onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
  >
    {label}
  </button>
);

export default CookieSettingsLink;
