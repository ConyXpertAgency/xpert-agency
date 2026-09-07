import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import styles from "@/styles/Home/HomeFillingPackagingBanner.module.css";

interface Props {
  lang: string;
}

const HomeFillingPackagingBanner = ({ lang }: Props) => (
  <section className={styles.Banner} aria-label="Filling & Packaging">
    <div className={styles.Inner}>
      <div className={styles.Copy}>
        <strong className="details">FILLING & PACKAGING TECHNOLOGIES</strong>
        <h2>Field-proven filling &amp; packaging expertise</h2>
        <p>
          Explore experience across installation, commissioning, ramp-up, modernization and production performance.
        </p>
        <Link href={`/${lang}/filling-packaging`} className={styles.Cta}>
          Explore Filling &amp; Packaging <FaArrowRight />
        </Link>
      </div>
      <div className={styles.Visual} aria-hidden="true">
        <Image
          src="/filling-packaging/linea_produccion.png"
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
