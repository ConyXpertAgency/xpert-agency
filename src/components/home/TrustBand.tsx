"use client";

import styles from "@/styles/Home/TrustBand.module.css";
import { resolveStorageUrl } from "@/lib/supabase/client";

interface TrustBandProps {
  logos: string[];
  caption: string;
  /** Duración total de una vuelta. Por defecto escala con el nº de logos (≈3s por logo). */
  speed?: number;
}

/**
 * Franja de confianza/industrias: marquee horizontal infinito en grises,
 * solo CSS (sin dependencias, sin <marquee>). Pensada para ir justo
 * debajo del hero del home. Los logos se resuelven con los assets
 * existentes del proyecto (helper getTrustBandLogos en el server).
 */
const TrustBand = ({ logos, caption, speed }: TrustBandProps) => {
  if (!logos || logos.length === 0) return null;
  const duration = speed ?? logos.length * 3;

  const renderHalf = (hidden: boolean) => (
    <div className={styles.TrustBandHalf} aria-hidden={hidden || undefined}>
      {logos.map((src) => {
        const url = resolveStorageUrl(src) ?? src;
        return (
          <span key={`${hidden ? "b" : "a"}-${src}`} className={styles.TrustBandItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
            />
          </span>
        );
      })}
    </div>
  );

  return (
    <section className={styles.TrustBand} aria-label={caption}>
      <div className={styles.TrustBandCard}>
        <p className={styles.TrustBandCaption}>{caption}</p>
        <div className={styles.TrustBandViewport}>
          <div className={styles.TrustBandTrack} style={{ animationDuration: `${duration}s` }}>
            {renderHalf(false)}
            {renderHalf(true)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBand;
