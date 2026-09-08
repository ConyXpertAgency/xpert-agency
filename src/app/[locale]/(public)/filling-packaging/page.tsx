import { locale } from "next/root-params";
import type { Metadata } from "next";
import type { Lang } from "@/lib/supabase/types";
import { isValidLocale, pageMetadata } from "@/lib/site";
import theme from "@/styles/theme/SurfaceThemes.module.css";
import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import Link from "next/link";
import ProjectExperienceItem from "@/components/fillingPackaging/ProjectExperienceItem";
import P14ContactForm from "@/components/fillingPackaging/P14ContactForm";
import { getFillingPackagingPage } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import Image from "next/image";

const META = {
  en: {
    title: "Filling & Packaging Technologies",
    description:
      "Filling and packaging line performance: quality, output and ramp-up support for production operations.",
  },
  es: {
    title: "Tecnologías de llenado y empaque",
    description:
      "Rendimiento de líneas de llenado y empaque: calidad, producción y acompañamiento en arranque.",
  },
  de: {
    title: "Abfüll- und Verpackungstechnologien",
    description:
      "Leistung von Abfüll- und Verpackungslinien: Qualität, Output und Ramp-up-Begleitung.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await locale()) as string;
  const lang = isValidLocale(raw) ? raw : "en";
  const t = META[lang];
    return pageMetadata({ lang, path: "/filling-packaging", title: t.title, description: t.description, englishOnly: true });
}

export default async function Page() {
  const lang = (await locale()) as Lang;
  const data = await getFillingPackagingPage(lang);

  return (
    <main className={`${styles.Page} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
      {/* P01 — HERO: gran visual 90-94% ancho, contenido superpuesto centrado, como PDF */}
      <section className={`${styles.HeroAls} ${theme.DarkSurface}`}>
        <div className={styles.HeroAlsFrame}>
          <div className={styles.HeroAlsOverlay} />
          <div className={styles.HeroAlsContent}>
            <div className={styles.HeroAlsLogo} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/filling-packaging/als-logo.svg" alt="" width={112} height={44} />
            </div>
            <h1>
              <span>FILLING & PACKAGING</span>
              <span>TECHNOLOGIES</span>
            </h1>
            <p className={styles.HeroAlsSubtitle}>
              <RichText>{data.hero.subtitle}</RichText>
            </p>
            <div className={styles.HeroAlsCta}>
              <Link href="/en/filling-packaging#capabilities">
                <Button variant="full" arrow>
                  <RichText>{data.hero.ctaPrimary}</RichText>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* P02 — EXPERIENCE AT A GLANCE: 58/42, izq headline + 2008-2020, der 3 cards apiladas */}
      <section className={`${styles.GlanceAls} ${theme.LightSurface}`}>
        <div className={styles.GlanceAlsInner}>
          <div className={styles.GlanceLeft}>
            <strong className="details">
              <RichText>{data.glance.badge}</RichText>
            </strong>
            <h2>
              THE NEW DIVISION
              <br />
              STARTS WITH PROVEN
              <br />
              FIELD EXPERIENCE
            </h2>
            <div className={styles.GlanceTimelineHighlight}>
              <span>2008 – 2020</span>
              <strong>INSTALLATION & SERVICE</strong>
              <p>
                <RichText>{data.glance.timeline.left.text}</RichText>
              </p>
              <small>Since 2020, the same expertise has been applied through technical advisory and interim assignments in beverage and liquid-food production and supply chain.</small>
            </div>
          </div>
          <ul className={styles.GlanceRightStack}>
            {data.glance.metrics.map((m) => (
              <li key={m.label} className={styles.GlanceMetricCard}>
                <span className={styles.GlanceMetricValue}>
                  <RichText>{m.value}</RichText>
                </span>
                <span className={styles.GlanceMetricLabel}>
                  <RichText>{m.label}</RichText>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* P03 — PROVEN SITE CAPABILITIES: centrado + gran asset + workflow */}
      <section className={`${styles.CapabilitiesAls} ${theme.LightSurface}`} id="capabilities">
        <div className={styles.CapabilitiesAlsInner}>
          <header className={styles.CapabilitiesAlsHeader}>
            <strong className="details">
              <RichText>{data.capabilities.badge}</RichText>
            </strong>
            <h2>THE PROJECT RECORD SPANS SIX CRITICAL WORKSTREAMS.</h2>
            <p>Documented assignments cover beverages, liquid foods and pharma.</p>
          </header>
          <div className={styles.CapabilitiesAsset}>
            <Image src="/filling-packaging/linea_produccion.png" alt="Production line" width={1600} height={900} style={{ width: "100%", height: "auto" }} priority />
          </div>
          <div className={styles.CapabilitiesWorkflowInline} aria-label="Workstreams">
            <span>INSTALL</span>
            <span className={styles.WorkflowSep}>&gt;</span>
            <span>COMMISSION</span>
            <span className={styles.WorkflowSep}>&gt;</span>
            <span>RAMP UP</span>
            <span className={styles.WorkflowSep}>&gt;</span>
            <span>IMPROVE OEE</span>
            <span className={styles.WorkflowSep}>&gt;</span>
            <span>PREVENT DOWNTIME</span>
          </div>
        </div>
      </section>

      {/* P04 — EXPERIENCE FOUNDATION: 35/65 */}
      <section className={`${styles.FoundationAls} ${theme.LightSurface}`}>
        <div className={styles.FoundationAlsInner}>
          <header>
            <strong className="details">
              <RichText>{data.foundation.badge}</RichText>
            </strong>
            <h2>
              EXPERIENCED WHERE LINE
              <br />
              PERFORMANCE IS WON
            </h2>
          </header>
          <div className={styles.FoundationAlsGrid}>
            <article className={styles.FoundationAlsCard}>
              <span>
                <em>12</em> YEARS
              </span>
              <p>
                <RichText>{data.foundation.left.text}</RichText>
              </p>
            </article>
            <article className={`${styles.FoundationAlsCard} ${styles.FoundationAlsCardLarge}`}>
              <span>
                SINCE <em>2020</em>
              </span>
              <p>
                <RichText>{data.foundation.right.text}</RichText>
              </p>
            </article>
          </div>
          <div className={styles.FoundationBar}>
            {["CONSTRUCTION", "COMMISSIONING", "MODERNIZATION", "QUALITY", "IMPROVEMENT"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* P05 — SELECTED INTERNATIONAL EXPERIENCE: 48/52 con globo dominante */}
      <section className={`${styles.InternationalAls} ${theme.LightSurface}`}>
        <div className={styles.InternationalAlsInner}>
          <div className={styles.InternationalLeft}>
            <strong className="details">
              <RichText>{data.international.badge}</RichText>
            </strong>
            <h2>
              PORTFOLIO
              <br />
              ACROSS GREENFIELD,
              <br />
              MODERNIZATION AND
              <br />
              PERFORMANCE RECOVERY
            </h2>
            <ul className={styles.InternationalStatsInline}>
              {data.international.stats.map((s) => (
                <li key={s.label}>
                  <strong>
                    <RichText>{s.value}</RichText>
                  </strong>
                  <span>
                    <RichText>{s.label}</RichText>
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.InternationalIndustries}>
              {data.international.industries.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
            <div className={styles.InternationalRegions}>
              {data.international.regions.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </div>
          <div className={styles.InternationalRight} aria-hidden="true">
            <Image src="/filling-packaging/globe-wireframe.png" alt="" width={1000} height={1000} priority style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      {/* P06–P13 — PROJECT EXPERIENCE 01–08: mapa limpio alternando light/dark */}
      {data.cases.map((c, i) => (
        <ProjectExperienceItem key={c.id} c={c} variant={i % 2 === 0 ? "light" : "dark"} />
      ))}

      {/* P14 — CLOSE: full-bleed editorial con X.png + formulario */}
      <section className={styles.CloseAls} aria-label="Close">
        <div className={styles.CloseBg} aria-hidden="true">
          <div className={styles.CloseOverlay} />
        </div>
        <div className={styles.CloseInner}>
          <div className={styles.CloseLeft}>
            <strong className={styles.CloseEyebrow}>FILLING & PACKAGING TECHNOLOGIES</strong>
            <h2 className={styles.CloseTitle}>
              <span>LET&apos;S BUILD</span>
              <span>THE NEXT LINE</span>
            </h2>
            <p className={styles.CloseText}>
              <RichText>{data.finalCta.text}</RichText>
            </p>
            <div className={styles.CloseCta}>
              <Link href={`/${lang}${data.finalCta.href}`}>
                <Button variant="full" arrow>
                  <RichText>{data.finalCta.cta}</RichText>
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.CloseRight}>
            <P14ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
