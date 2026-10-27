import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import { getUiCopy } from "@/lib/i18n";
import { ELMAR_LINKEDIN_URL, localizedPath, publicContactEmail } from "@/lib/site";
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
  const copy = { ...getUiCopy(lang).footer, ...settings.footer };
  const siteDescription = copy.description || SITE_DESCRIPTION;
  const contactEmail = publicContactEmail(settings.contact_email);
  // The CMS setting currently contains an unapproved number. Only the
  // explicitly approved Mexico WhatsApp may appear in the public footer.
  const whatsappHref = "https://wa.me/525534315953";
  const contactLink = nav.find((item) => item.href === "/contact");
  const serviceLinks = nav.filter((item) =>
    ["/services", "/industries", "/filling-packaging", "/cases", "/rbe"].includes(item.href)
  );
  const serviceHrefs = new Set(serviceLinks.map((item) => item.href));
  const primaryLinks = nav.filter(
    (item) => item.href !== "/contact" && !serviceHrefs.has(item.href)
  );
  const baseSocialLinks = [
    { label: "LinkedIn", href: settings.linkedin },
    { label: "Facebook", href: settings.facebook },
    { label: "Instagram", href: settings.instagram },
    { label: "Twitter", href: settings.twitter },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));
  // Asegurar enlace al LinkedIn de Elmar aunque el CMS no lo tenga configurado.
  const hasElmarLinkedIn = baseSocialLinks.some((item) =>
    item.href.includes("linkedin.com/in/elmar-beckord")
  );
  const socialLinks = hasElmarLinkedIn
    ? baseSocialLinks
    : [
        ...baseSocialLinks,
        {
          label: baseSocialLinks.some((s) => s.label === "LinkedIn")
            ? "LinkedIn Elmar Beckord"
            : "LinkedIn",
          href: ELMAR_LINKEDIN_URL,
        },
      ];

  return (
    <footer className={styles.PublicFooter}>
      <div className={styles.Inner}>
        <section className={styles.Brand}>
          <Link href={`/${lang}`} aria-label={copy.homeAria}>
            <Image src="/logo_largo_blanco2.webp" alt="Xpert Agency" width={500} height={50} />
          </Link>
          <p>{siteDescription}</p>
        </section>

        <nav className={styles.Group} aria-label="Footer navigation">
          <strong>{copy.navigation}</strong>
          <ul>
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link href={localizedPath(lang, item.href)}>{item.label}</Link>
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
                  <Link href={localizedPath(lang, item.href)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <section className={styles.Group}>
          <strong>{copy.contact}</strong>
          {contactLink && (
            <Link className={styles.ContactLink} href={localizedPath(lang, contactLink.href)}>
              {contactLink.label} <FaArrowRight />
            </Link>
          )}
          {contactEmail && (
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          )}
          <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label={`${copy.whatsapp}: México 55 3431 5953`}>
            <FaWhatsapp aria-hidden="true" />
          </a>
          {socialLinks.length > 0 && (
            <div className={styles.Socials}>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} rel="noreferrer" target="_blank" aria-label={item.label}>
                  {item.label.startsWith("LinkedIn") ? <FaLinkedinIn aria-hidden="true" />
                    : item.label === "Facebook" ? <FaFacebookF aria-hidden="true" />
                    : item.label === "Instagram" ? <FaInstagram aria-hidden="true" />
                    : <FaTwitter aria-hidden="true" />}
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className={styles.Bottom}>
        <span>© {new Date().getFullYear()} Xpert Agency</span>
        <span className={styles.AiDisclosure}>{copy.aiDisclosure}</span>
        <CookieSettingsLink label={copy.cookieSettings} />
      </div>
    </footer>
  );
};

export default PublicFooter;
