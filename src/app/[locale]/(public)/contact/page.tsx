import { locale } from "next/root-params";
import styles from '@/styles/contact/Contact.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import { getContactPage, getContactTeams } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import ContactExperience from '@/components/contact/ContactExperience'
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const [data, teams] = await Promise.all([
        getContactPage(lang),
        getContactTeams(lang),
    ]);

    return (
        <main className={`${styles.ContactPage} ${theme.LightSurface} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <div className={`AppShell ${styles.ContactContent}`}>
                <ContactExperience pageData={data} teamsData={teams} />
            </div>
        </main>
    )
}

export default page
