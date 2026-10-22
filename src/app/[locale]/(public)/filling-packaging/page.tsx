import { locale } from "next/root-params";
import type { Metadata } from "next";
import type { Lang } from "@/lib/supabase/types";
import { isValidLocale, localizedPath, pageMetadata } from "@/lib/site";
import theme from "@/styles/theme/SurfaceThemes.module.css";
import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import Link from "next/link";
import ProjectExperienceItem from "@/components/fillingPackaging/ProjectExperienceItem";
import P14ContactForm from "@/components/fillingPackaging/P14ContactForm";
import { getFillingPackagingPage, getPageSeo } from "@/lib/data";
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
  const t = await getPageSeo(lang, "filling_packaging", META[lang]);
    return pageMetadata({ lang, path: "/filling-packaging", title: t.title, description: t.description, englishOnly: true });
}

export default async function Page() {
  const lang = (await locale()) as Lang;
  const data = await getFillingPackagingPage(lang);

  return (
    <main className={`${styles.Page} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
      {/* P01 — HERO: gran visual 90-94% ancho, contenido superpuesto centrado, como PDF */}
      <section className={`${styles.HeroAls} ${theme.DarkSurface}`}>
        <div className={styles.HeroAlsFrame} style={data.hero.image ? { backgroundImage: `url("${data.hero.image}")` } : undefined}>
          <div className={styles.HeroAlsOverlay} />
          <div className={styles.HeroAlsContent}>
            <div className={styles.HeroAlsLogo} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/filling-packaging/als-logo.svg" alt="" width={112} height={44} />
            </div>
            <strong className="details"><RichText>{data.hero.badge}</RichText></strong>
            <h1><RichText>{data.hero.title}</RichText></h1>
            <p className={styles.HeroAlsSubtitle}>
              <RichText>{data.hero.subtitle}</RichText>
            </p>
            <div className={styles.HeroAlsCta}>
              <Link href={localizedPath(lang, data.hero.ctaPrimaryHref || "#capabilities")}>
                <Button variant="full" arrow>
                  <RichText>{data.hero.ctaPrimary}</RichText>
                </Button>
              </Link>
              {data.hero.ctaSecondary && <Link href={localizedPath(lang, data.hero.ctaSecondaryHref || "#projects")}>
                <Button variant="outline" arrow>
                  <RichText>{data.hero.ctaSecondary}</RichText>
                </Button>
              </Link>}
            </div>
            {data.hero.facts.length > 0 && <ul className={styles.HeroFacts}>
              {data.hero.facts.map((fact, index) => (
                <li key={`${fact.label ?? fact.value ?? "fact"}-${index}`}>
                  <strong><RichText>{fact.value ?? ""}</RichText></strong>
                  <span><RichText>{fact.label ?? ""}</RichText></span>
                </li>
              ))}
            </ul>}
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
            <h2><RichText>{data.glance.title}</RichText></h2>
            <div className={styles.GlanceTimelineHighlight}>
              <span><RichText>{data.glance.timeline.left.range}</RichText></span>
              <strong><RichText>{data.glance.timeline.left.title}</RichText></strong>
              <p>
                <RichText>{data.glance.timeline.left.text}</RichText>
              </p>
              <small><b><RichText>{data.glance.timeline.right.range}</RichText> · <RichText>{data.glance.timeline.right.title}</RichText></b><br /><RichText>{data.glance.timeline.right.text}</RichText></small>
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
            <h2><RichText>{data.capabilities.title}</RichText></h2>
            <p><RichText>{data.capabilities.subtitle}</RichText></p>
          </header>
          <div className={styles.CapabilitiesAsset}>
            <Image src={data.capabilities.image || "/filling-packaging/linea_produccion.png"} alt="Production line" width={1600} height={900} style={{ width: "100%", height: "auto" }} priority />
          </div>
          <div className={styles.CapabilitiesWorkflowInline} aria-label="Workstreams">
            {data.capabilities.steps.map((step, index) => (
              <span key={step.number || step.title}>
                {index > 0 && <span className={styles.WorkflowSep} aria-hidden="true">&gt;</span>}
                <RichText>{step.title}</RichText>
              </span>
            ))}
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
            <h2><RichText>{data.foundation.title}</RichText></h2>
          </header>
          <div className={styles.FoundationAlsGrid}>
            <article className={styles.FoundationAlsCard}>
              <span>
                <RichText>{data.foundation.left.value}</RichText>
              </span>
              <p>
                <RichText>{data.foundation.left.text}</RichText>
              </p>
            </article>
            <article className={`${styles.FoundationAlsCard} ${styles.FoundationAlsCardLarge}`}>
              <span>
                <RichText>{data.foundation.right.value}</RichText>
              </span>
              <p>
                <RichText>{data.foundation.right.text}</RichText>
              </p>
            </article>
          </div>
          <div className={styles.FoundationBar}>
            {data.capabilities.supporting.map((t) => (
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
            <h2><RichText>{data.international.title}</RichText></h2>
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
      <div id="projects">
        {data.cases.map((c, i) => (
          <ProjectExperienceItem key={c.id} c={c} variant={i % 2 === 0 ? "light" : "dark"} />
        ))}
      </div>

      {/* P14 — CLOSE: full-bleed editorial con X.png + formulario */}
      <section className={styles.CloseAls} aria-label="Close">
        <div className={styles.CloseBg} aria-hidden="true">
          <div className={styles.CloseOverlay} />
        </div>
        <div className={styles.CloseInner}>
          <div className={styles.CloseLeft}>
            <strong className={styles.CloseEyebrow}><RichText>{data.hero.badge}</RichText></strong>
            <h2 className={styles.CloseTitle}>
              <RichText>{data.finalCta.title}</RichText>
            </h2>
            <p className={styles.CloseText}>
              <RichText>{data.finalCta.text}</RichText>
            </p>
            <div className={styles.CloseCta}>
              <Link href={localizedPath(lang, data.finalCta.href)}>
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
