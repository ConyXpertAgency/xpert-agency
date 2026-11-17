import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/supabase/types";
import styles from "@/styles/Home/LaCostenaFeature.module.css";

const COPY: Record<Lang, { eyebrow: string; description: string; link: string; disclaimer: string }> = {
  en: { eyebrow: "FEATURED CASE · MEXICO", description: "Automated warehousing and distribution, with picking, packing and SAP-based warehouse management.", link: "View case", disclaimer: "Illustrative AI-generated image · Pending commercial approval" },
  es: { eyebrow: "CASO DESTACADO · MÉXICO", description: "Automatización de almacenes y distribución, con preparación de pedidos y gestión logística basada en SAP.", link: "Ver caso", disclaimer: "Ilustración generada con IA · Pendiente de aprobación comercial" },
  de: { eyebrow: "REFERENZPROJEKT · MEXIKO", description: "Automatisierte Lagerhaltung und Distribution mit Kommissionierung, Verpackung und SAP-gestützter Lagerverwaltung.", link: "Referenz ansehen", disclaimer: "KI-generierte Illustration · Kommerzielle Freigabe ausstehend" },
};

const RESULTS_COPY: Record<Lang, string> = { en: "View results", es: "Ver resultados", de: "Ergebnisse ansehen" };

export default function LaCostenaFeature({ lang, variant = "home" }: { lang: Lang; variant?: "home" | "cases" }) {
  const copy = COPY[lang];
  const isCases = variant === "cases";
  return (
    <section className={`${styles.Banner} ${isCases ? styles.Cases : styles.Home}`} aria-label="La Costeña">
      <div className={styles.Content}>
        <p className={styles.Eyebrow}>{copy.eyebrow}</p>
        <Image className={styles.Logo} src="/logos/la-costena-logo-extracto.png" alt="La Costeña" width={1170} height={546} priority />
        <p className={styles.Description}>{copy.description}</p>
        <Link className={styles.Link} href={isCases ? "#la-costena" : `/${lang}/cases#la-costena`}>{isCases ? RESULTS_COPY[lang] : copy.link}<span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.Photo} aria-hidden="true" />
      <p className={styles.Disclaimer}>{copy.disclaimer}</p>
    </section>
  );
}
