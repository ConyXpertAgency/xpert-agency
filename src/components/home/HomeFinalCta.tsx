import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { HomeFinalCta as HomeFinalCtaData, Lang } from "@/lib/supabase/types";
import styles from "@/styles/Home/HomeFinalCta.module.css";
import theme from "@/styles/theme/SurfaceThemes.module.css";

interface HomeFinalCtaProps {
  lang: Lang;
  data: HomeFinalCtaData;
}

const HomeFinalCta = ({ lang, data }: HomeFinalCtaProps) => (
  <section className={`${styles.HomeFinalCta} ${theme.LightSurface}`}>
    <div className={styles.HomeFinalCtaInner}>
      <div>
        <strong>{data.title}</strong>
        <p>{data.text}</p>
      </div>
      <Link href={`/${lang}${data.href}`}>
        {data.cta} <FaArrowRight />
      </Link>
    </div>
  </section>
);

export default HomeFinalCta;
