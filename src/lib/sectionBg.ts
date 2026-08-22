import type { CSSProperties } from "react";
import { resolveStorageUrl } from "./supabase/client";

interface SectionBackgroundData {
  background_image?: string | null;
  background_overlay?: number | null;
}

// Difuminado hacia el color de fondo de la web en los cuatro bordes,
// para que la imagen se integre con el resto de la página.
const FADE_HORIZONTAL =
  "linear-gradient(to right, var(--color-bg-primary), transparent 14%, transparent 86%, var(--color-bg-primary))";
const FADE_VERTICAL =
  "linear-gradient(to bottom, var(--color-bg-primary), transparent 18%, transparent 82%, var(--color-bg-primary))";

// Clase que activa la capa de fondo (.SectionBackdrop::after en globals.css):
// se extiende al 100dvw de ancho y a toda la altura del apartado,
// quedando por detrás del contenido.
export function sectionBgClass(section?: SectionBackgroundData | null): string {
  return resolveStorageUrl(section?.background_image) ? "SectionBackdrop" : "";
}

// Variables CSS con las capas de fondo (difuminado + oscurecido + imagen).
// Devuelve undefined cuando no hay imagen configurada.
export function sectionBgStyle(section?: SectionBackgroundData | null): CSSProperties | undefined {
  const url = resolveStorageUrl(section?.background_image);
  if (!url) return undefined;
  const overlay = section?.background_overlay ?? 0;
  const layers = [FADE_VERTICAL, FADE_HORIZONTAL];
  if (typeof overlay === "number" && overlay > 0) {
    layers.push(
      `linear-gradient(rgba(0, 0, 0, ${Math.min(overlay, 1)}), rgba(0, 0, 0, ${Math.min(overlay, 1)}))`,
    );
  }
  return {
    "--section-bg-image": [...layers, `url("${url}")`].join(", "),
  } as CSSProperties;
}
