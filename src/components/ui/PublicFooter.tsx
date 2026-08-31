import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getUiCopy } from "@/lib/i18n";
import type { Lang, NavItem, Settings } from "@/lib/supabase/types";
import styles from "@/styles/ui/PublicFooter.module.css";

interface PublicFooterProps {
  lang: Lang;
  nav: NavItem[];
  settings: Settings;
}

const SITE_DESCRIPTION =
  "Experts for integrated manufacturing & logistics improvement";

const PublicFooter = ({ lang, nav, settings }: PublicFooterProps) => {
  const copy = getUiCopy(lang).footer;
  const contactLink = nav.find((item) => item.href === "/contact");
  const serviceLinks = nav.filter((item) =>
    ["/services", "/industries", "/cases", "/rbe"].includes(item.href)
  );
  const serviceHrefs = new Set(serviceLinks.map((item) => item.href));
  const primaryLinks = nav.filter(
    (item) => item.href !== "/contact" && !serviceHrefs.has(item.href)
  );
  const socialLinks = [
    { label: "LinkedIn", href: settings.linkedin },
    { label: "Facebook", href: settings.facebook },
    { label: "Instagram", href: settings.instagram },
    { label: "Twitter", href: settings.twitter },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <footer className={styles.PublicFooter}>
      <div className={styles.Inner}>
        <section className={styles.Brand}>
          <Link href={`/${lang}`} aria-label={copy.homeAria}>
            <Image src="/logo_largo_blanco2.webp" alt="Xpert Agency" width={500} height={50} />
          </Link>
          <p>{SITE_DESCRIPTION}</p>
        </section>

        <nav className={styles.Group} aria-label="Footer navigation">
          <strong>{copy.navigation}</strong>
          <ul>
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link href={`/${lang}${item.href}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {serviceLinks.length > 0 && (
          <nav className={styles.Group} aria-label="Footer expertise links">
            <strong>{copy.expertise}</strong>
            <ul>
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={`/${lang}${item.href}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <section className={styles.Group}>
          <strong>{copy.contact}</strong>
          {contactLink && (
            <Link className={styles.ContactLink} href={`/${lang}${contactLink.href}`}>
              {contactLink.label} <FaArrowRight />
            </Link>
          )}
          {settings.contact_email && (
            <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
          )}
          {settings.whatsapp && <a href={settings.whatsapp}>{copy.whatsapp}</a>}
          {socialLinks.length > 0 && (
            <div className={styles.Socials}>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} rel="noreferrer" target="_blank">
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className={styles.Bottom}>
        <span>© {new Date().getFullYear()} Xpert Agency</span>
        <span className={styles.AiDisclosure}>{copy.aiDisclosure}</span>
      </div>
    </footer>
  );
};

export default PublicFooter;
