import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLegalDraft,
  isLegalPreviewAllowed,
  LEGAL_REVIEW_COPY,
  type LegalLocale,
  type LegalPageKind,
} from "@/content/legalDraft";
import styles from "@/styles/legal/LegalDraftPage.module.css";

type Props = { lang: LegalLocale; kind: LegalPageKind };

export default function LegalDraftPage({ lang, kind }: Props) {
  // The drafts must not be accessible on the public site until formally approved.
  if (!isLegalPreviewAllowed()) notFound();

  const content = getLegalDraft(kind);
  const labels = LEGAL_REVIEW_COPY[lang];
  const alternate = kind === "legal-statements" ? "privacy-policy" : "legal-statements";

  return (
    <main className={styles.Page}>
      <div className={styles.Inner}>
        <header className={styles.Header}>
          <p className={styles.Eyebrow}>XPERT AGENCY / LEGAL REVIEW</p>
          <h1>{content.title}</h1>
          <p className={styles.Date}>{labels.spanishOnly}</p>
          <div className={styles.Warning} role="note">
            <strong>{labels.draft}</strong>
            <p>{labels.explanation}</p>
          </div>
        </header>

        <div className={styles.Columns}>
          <aside className={styles.Sidebar} aria-label={labels.sections}>
            <strong>{labels.sections}</strong>
            <nav>
              {content.sections.map((section, index) => (
                <a href={`#section-${index + 1}`} key={section.heading}>
                  {section.heading}
                </a>
              ))}
            </nav>
            <Link href={`/${lang}/${alternate}`} className={styles.SwitchLink}>
              {alternate === "privacy-policy" ? "Privacy Policy" : "Legal Statements"}
            </Link>
          </aside>

          <article className={styles.Article} lang="es">
            {content.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className={styles.Section}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={`${index}-${i}`} className={paragraph.includes("[") ? styles.Unverified : undefined}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
