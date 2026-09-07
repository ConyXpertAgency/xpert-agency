"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ui/LogoMarquee.module.css";
import { resolveStorageUrl } from "@/lib/supabase/client";

interface LogoMarqueeProps {
    logos: string[];
    speed?: number;
}

// La animación arranca pausada y solo corre cuando el primer set
// (logos únicos) terminó de cargar/decodificar, o a los 2500ms.
// La segunda copia del loop usa el cache del navegador.
const READY_TIMEOUT_MS = 2500;

const LogoMarquee = ({ logos, speed = 28 }: LogoMarqueeProps) => {
    const [isReady, setIsReady] = useState(false);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const key = (logos ?? []).join("|");

    useEffect(() => {
        setIsReady(false);
        const root = marqueeRef.current;
        if (!root) {
            setIsReady(true);
            return;
        }
        let cancelled = false;
        const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('img[data-first="true"]'));
        const waitFor = (img: HTMLImageElement) => {
            if (img.complete && img.naturalWidth > 0) {
                return typeof img.decode === "function" ? img.decode().catch(() => {}) : Promise.resolve();
            }
            return new Promise<void>((resolve) => {
                const done = () => {
                    if (typeof img.decode === "function") img.decode().then(() => resolve()).catch(() => resolve());
                    else resolve();
                };
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
            });
        };
        const loads = Promise.allSettled(imgs.map(waitFor));
        const timeout = new Promise((resolve) => setTimeout(resolve, READY_TIMEOUT_MS));
        Promise.race([loads, timeout]).then(() => {
            if (!cancelled) setIsReady(true);
        });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    if (!logos || logos.length === 0) return null;

    const loop = [...logos, ...logos];

    return (
        <div className={styles.Marquee} aria-label="Client logos" ref={marqueeRef}>
            <div
                className={styles.Track}
                style={{ animationDuration: `${speed}s`, animationPlayState: isReady ? "running" : "paused" }}
            >
                {loop.map((src, i) => {
                    const url = resolveStorageUrl(src) ?? src;
                    const firstSet = i < logos.length;
                    return (
                        <div key={`${src}-${i}`} className={styles.Item}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={url}
                                alt=""
                                loading="eager"
                                decoding="async"
                                fetchPriority={firstSet && i < 4 ? "high" : "auto"}
                                data-first={firstSet ? "true" : "false"}
                                onError={(e) => {
                                    e.currentTarget.style.opacity = "0";
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogoMarquee;
