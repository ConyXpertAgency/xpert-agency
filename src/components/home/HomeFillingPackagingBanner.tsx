import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import styles from "@/styles/Home/HomeFillingPackagingBanner.module.css";
import type { HomeFillingBanner, Lang } from "@/lib/supabase/types";
import { localizedPath } from "@/lib/site";

const HomeFillingPackagingBanner = ({ data, lang }: { data: HomeFillingBanner; lang: Lang }) => (
  <section className={styles.Banner} aria-label={data.badge}>
    <div className={styles.Inner}>
      <div className={styles.Copy}>
        <strong className="details">{data.badge}</strong>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
        <Link href={localizedPath(lang, data.href)} className={styles.Cta}>
          {data.cta} <FaArrowRight />
        </Link>
      </div>
      <div className={styles.Visual} aria-hidden="true">
        <Image
          src={data.image}
          alt=""
          width={800}
          height={500}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>
    </div>
  </section>
);

export default HomeFillingPackagingBanner;
