import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";
import theme from "@/styles/theme/SurfaceThemes.module.css";

type CaseData = {
  id: string;
  number: string;
  client: string;
  location: string;
  title: string;
  scope?: string;
  outcomes?: string[];
  logo?: string;
};

// P06-P13 — mapping reversible local por id (no toca CMS/Supabase)
// Assets locales ya existentes en public/logos + public/x.png
const CASE_LOGOS: Record<string, string> = {
  "heineken-za-01": "/logos/heineken.png",
  "diageo-scotland-02": "/logos/diageo.png",
  "nestle-us-03": "/logos/nestle.svg",
  "nova-ksa-04": "/logos/nova.png",
  "bayer-de-05": "/logos/bayer.webp",
  "abinbev-ru-06": "/logos/ab-inbev.png",
  "heineken-sea-07": "/logos/heineken.png",
  "predictive-08": "/x.png", // Multiple clients — usar X.png como marca gráfica neutra
};

export default function ProjectExperienceItem({
  c,
  variant = "light",
}: {
  c: CaseData;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  // Resolver logo: CMS (c.logo) tiene prioridad, fallback local reversible por id
  const logoSrc = c.logo || CASE_LOGOS[c.id] || null;
  return (
    <section
      className={`${styles.ExperienceItem} ${isDark ? theme.DarkSurface : theme.LightSurface} ${isDark ? styles.ExperienceDark : styles.ExperienceLight}`}
    >
      <div className={styles.ExperienceInner}>
        {/* LEFT 74% */}
        <div className={styles.ExperienceLeft}>
          <strong className="details">PROJECT EXPERIENCE</strong>
          <h2 className={styles.ExperienceTitle}>{c.title}</h2>

          <div className={styles.ExperienceMetaRow}>
            <div className={styles.ExperienceMetaGroup}>
              <span className={styles.ExperienceMetaLabel}>CLIENT</span>
              <span className={styles.ExperienceMetaValue}>{c.client}</span>
            </div>
            <span className={styles.ExperienceMetaSep} aria-hidden="true">
              |
            </span>
            <div className={styles.ExperienceMetaGroup}>
              <span className={styles.ExperienceMetaLabel}>LOCATION</span>
              <span className={styles.ExperienceMetaValue}>{c.location}</span>
            </div>
          </div>

          <hr className={styles.ExperienceDivider} />

          <div className={styles.ExperienceScopeBlock}>
            <strong className={styles.ExperienceScopeLabel}>SCOPE OF DELIVERY</strong>
            <p className={styles.ExperienceScopeText}>{c.scope}</p>
          </div>

          {c.outcomes && c.outcomes.length > 0 && (
            <div className={styles.ExperienceOutcomes}>
              <strong className={styles.ExperienceOutcomesLabel}>DELIVERED OUTCOMES</strong>
              <ul>
                {c.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT 26% */}
        <div className={styles.ExperienceRight}>
          <div className={styles.ExperienceLogoSlot} aria-hidden="true">
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt={`${c.client} logo`} loading="lazy" />
            ) : (
              <span className={styles.ExperienceLogoPlaceholder}>{c.client.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className={styles.ExperienceNumberBlock}>
            <span className={styles.ExperienceNumber}>{c.number}</span>
            <span className={styles.ExperienceNumberLabel}>INTERNATIONAL ASSIGNMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
