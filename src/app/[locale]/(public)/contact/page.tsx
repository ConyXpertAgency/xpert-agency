import { locale } from "next/root-params";
import type { Metadata } from "next";
import styles from '@/styles/contact/Contact.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import { getContactPage, getContactTeams } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import ContactExperience from '@/components/contact/ContactExperience'
import type { Lang } from "@/lib/supabase/types";

const META = {
    en: {
        title: "Contact",
        description:
            "Talk to our team: tell us about your project and we'll get back to you — typically within 1 business day.",
    },
    es: {
        title: "Contacto",
        description:
            "Habla con nuestro equipo: cuéntanos tu proyecto y te responderemos — normalmente en 1 día hábil.",
    },
    de: {
        title: "Kontakt",
        description:
            "Sprechen Sie mit unserem Team: Schildern Sie Ihr Projekt – Antwort in der Regel innerhalb eines Werktages.",
    },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const raw = (await locale()) as string;
    const lang = isValidLocale(raw) ? raw : "en";
    const t = META[lang];
    return pageMetadata({ lang, path: "/contact", title: t.title, description: t.description });
}

const page = async () => {
    const lang = (await locale()) as Lang;
    const [data, teams] = await Promise.all([
        getContactPage(lang),
        getContactTeams(lang),
    ]);

    return (
        <main className={`${styles.ContactPage} ${theme.DarkSurface} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <div className={`AppShell ${styles.ContactContent}`}>
                <ContactExperience pageData={data} teamsData={teams} lang={lang} />
            </div>
        </main>
    )
}

export default page
