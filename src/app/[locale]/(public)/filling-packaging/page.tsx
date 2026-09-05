import { locale } from "next/root-params";
import type { Lang } from "@/lib/supabase/types";
import theme from "@/styles/theme/SurfaceThemes.module.css";
import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import Link from "next/link";
import ProjectCase from "@/components/fillingPackaging/ProjectCase";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import GlobalReachMap from "@/components/home/GlobalReachMap";
import { getFillingPackagingPage } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import Image from "next/image";

export default async function Page() {
  const lang = (await locale()) as Lang;
  const data = await getFillingPackagingPage(lang);

  return (
    <main className={`${styles.Page} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
      {/* P01 — HERO: gran visual 90-94% ancho, contenido superpuesto centrado, como PDF */}
      <section className={`${styles.HeroAls} ${theme.DarkSurface}`}>
        <div className={styles.HeroAlsFrame}>
          <div className={styles.HeroAlsPlaceholder}>
            <span>Image slot — Filling line</span>
            <small>Recommended: 1920×850 WebP 180KB, no ALS branding — TEMP</small>
          </div>
          <div className={styles.HeroAlsOverlay} />
          <div className={styles.HeroAlsContent}>
            <h1>
              <span>FILLING & PACKAGING</span>
              <span>TECHNOLOGIES</span>
            </h1>
            <p className={styles.HeroAlsSubtitle}>
              <RichText>{data.hero.subtitle}</RichText>
            </p>
            <div className={styles.HeroAlsCta}>
              <Link href={`/${lang}/filling-packaging#capabilities`}>
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
            {/* TEMP ASSET: p03-machinery-temp.webp extraído de P03 */}
            <Image src="/filling-packaging/p03-machinery-temp.webp" alt="Filling line workstreams" width={1600} height={600} style={{ width: "100%", height: "auto" }} />
          </div>
          <ol className={styles.CapabilitiesWorkflow}>
            <li>INSTALL</li>
            <li className={styles.WorkflowSep}>&gt;</li>
            <li>COMMISSION</li>
            <li className={styles.WorkflowSep}>&gt;</li>
            <li>RAMP UP</li>
            <li className={styles.WorkflowSep}>&gt;</li>
            <li>IMPROVE OEE</li>
            <li className={styles.WorkflowSep}>&gt;</li>
            <li>PREVENT DOWNTIME</li>
          </ol>
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
              <span>12</span>
              <strong>YEARS</strong>
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
          <div className={styles.InternationalRight}>
            <GlobalReachMap nodes={[...(data.international.nodes ?? [])]} />
          </div>
        </div>
      </section>

      {/* P06-P13 — Mantener temporalmente lo actual para compilar */}
      <section className={`${styles.Cases} ${theme.LightSurface}`} id="projects">
        <div className={styles.CasesInner}>
          <header className={styles.SectionHeader}>
            <strong className="details">PROJECT EXPERIENCE</strong>
            <h2>Selected project experience</h2>
            <p className={styles.SectionSubtitle}>Eight documented assignments across beverages, water, liquid foods and pharma — greenfield, modernization and performance recovery.</p>
          </header>
          <ul className={styles.CasesGrid}>
            {data.cases.map((c) => (
              <li key={c.id}>
                <ProjectCase c={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeFinalCta lang={lang} data={data.finalCta} />
    </main>
  );
}
