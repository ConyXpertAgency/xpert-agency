"use client";

import { useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import Editable from "./Editable";
import MapNodesEditor, { type MapNodeItem } from "./MapNodesEditor";
import { getIcon } from "@/lib/supabase/icons";
import { resolveStorageUrl } from "@/lib/supabase/client";
import { getAtPath, removeAtPath, updatePath } from "@/lib/dataPath";
import { isPlainAdminField } from "@/lib/adminTextPolicy";
import { fieldLabel, getElementTemplate, getGroups } from "@/lib/adminSchema";

type Role = "h1" | "h2" | "p" | "badge" | "btn" | "link";

const IMAGE_RE = /\.(png|jpe?g|gif|svg|webp|avif|bmp)$/i;

const isImageValue = (v: unknown): boolean =>
  typeof v === "string" &&
  (v.startsWith("/uploads/") ||
    IMAGE_RE.test(v) ||
    (/^https?:\/\//.test(v) && IMAGE_RE.test(v)));

// Claves que representan una imagen: siempre se muestran con la UI de imagen,
// aunque estén vacías, y abren el modal de imágenes al añadir un elemento nuevo.
const IMAGE_FIELD_KEYS = new Set(["logo", "image", "img", "background_image", "focus_image"]);

// Preserve older stored values while showing only fields used by the current page.
const UNUSED_FIELD_PATHS: Record<string, string[]> = {
  "rbe/first": ["list.*.icon", "list.*.text"],
  "rbe/third": ["phases.*.icon", "phases.*.subtitle"],
  "rbe/four": ["left.*.icon", "right.*.icon", "extra.icon"],
  "filling_packaging/page": ["international.nodes", "capabilities.steps.*.icon", "capabilities.steps.*.number"],
  "nav/items": ["*.hasDropdown"],
};

const roleFor = (key: string): Role => {
  if (key === "badge") return "badge";
  if (/href|url|link/.test(key)) return "link";
  if (/cta|button/.test(key)) return "btn";
  if (/title|heading|name|slug/.test(key)) return "h1";
  if (/subtitle|description|text|quote|sub|intro|note|privacy|trust|footer/.test(key)) return "p";
  if (/value|label|tag/.test(key)) return "h2";
  return "p";
};

interface VisualEditorProps {
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  onPickIcon: (path: string[]) => void;
  onUploadImage: (path: string[]) => void;
  onOpenSettings: (path: string[], value: string) => void;
  lang: string;
  collection: string;
  keyname: string;
}

const VisualEditor = ({
  value,
  onChange,
  onPickIcon,
  onUploadImage,
  onOpenSettings,
  lang,
  collection,
  keyname,
}: VisualEditorProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const isHiddenField = (path: string[]) => (UNUSED_FIELD_PATHS[`${collection}/${keyname}`] ?? [])
    .includes(path.map((part) => /^\d+$/.test(part) ? "*" : part).join("."));

  const patch = (path: string[], next: unknown) => {
    onChange(updatePath(value, path, next) as Record<string, unknown>);
  };
  const removeAt = (path: string[]) => {
    onChange(removeAtPath(value, path) as Record<string, unknown>);
  };

  const moveItem = (path: string[], index: number, dir: -1 | 1) => {
    const arr = getAtPath(value, path);
    if (!Array.isArray(arr)) return;
    const next = [...arr];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    patch(path, next);
  };

  const label = (path: string[]): string => fieldLabel(collection, keyname, path) ?? path[path.length - 1];

  // Añade un elemento nuevo con su plantilla y, si tiene campo de imagen
  // (p. ej. el logo de una card de partners), abre el modal de imágenes.
  const addArrayItem = (path: string[]) => {
    const arr = getAtPath(value, path);
    if (!Array.isArray(arr)) return;
    const template = getElementTemplate(collection, keyname, path);
    const item = { ...(template ?? {}) };
    patch(path, [...arr, item]);
    const imageKey = Object.keys(item).find(
      (k) => IMAGE_FIELD_KEYS.has(k) && typeof item[k] === "string"
    );
    if (imageKey) onUploadImage([...path, String(arr.length), imageKey]);
  };

  const renderArray = (arr: unknown[], key: string, path: string[]) => {
    const template = getElementTemplate(collection, keyname, path);
    const allStrings = arr.length === 0 ? !template : arr.every((v) => typeof v === "string");
    const isLogoList =
      (collection === "home" && keyname === "trust_band" && path.join(".") === "logos") ||
      (collection === "industries" && keyname === "page" && path.join(".") === "marquee_logos");
    return (
      <div className={styles.VArray}>
        <span className={styles.VKey}>
          {label(path) ?? "Elementos"} · {arr.length}
        </span>
        {allStrings ? (
          <>
            {arr.map((item, i) => (
              <div key={`${lang}-${i}`} className={styles.VArrayRow}>
                <Editable
                  value={item as string}
                  onChange={(next) => patch([...path, String(i)], next)}
                  role="p"
                  plain={isPlainAdminField(collection, keyname, [...path, String(i)])}
                />
                {isLogoList && (
                  <button
                    className={styles.ImageBtn}
                    onClick={() => onUploadImage([...path, String(i)])}
                    title="Seleccionar o subir este logo"
                    aria-label={`Seleccionar o subir logo ${i + 1}`}
                  >
                    Imagen
                  </button>
                )}
                {!isPlainAdminField(collection, keyname, [...path, String(i)]) && <button
                  className={styles.SettingsBtn}
                  onClick={() => onOpenSettings([...path, String(i)], item as string)}
                  title="Propiedades del texto"
                >
                  ⚙
                </button>}
                <button
                  className={styles.ArrowBtn}
                  onClick={() => moveItem(path, i, -1)}
                  disabled={i === 0}
                  title="Subir"
                >
                  ↑
                </button>
                <button
                  className={styles.ArrowBtn}
                  onClick={() => moveItem(path, i, 1)}
                  disabled={i === arr.length - 1}
                  title="Bajar"
                >
                  ↓
                </button>
                <button
                  className={styles.MiniBtn}
                  onClick={() => removeAt([...path, String(i)])}
                  title="Eliminar línea"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className={styles.AddBtn}
              onClick={() => {
                const index = arr.length;
                patch(path, [...arr, ""]);
                if (isLogoList) onUploadImage([...path, String(index)]);
              }}
            >
              {isLogoList ? "+ añadir logo" : "+ añadir línea"}
            </button>
          </>
        ) : (
          <div className={styles.VCards}>
            {arr.map((item, i) => {
              const obj =
                typeof item === "object" && item !== null ? (item as Record<string, unknown>) : null;
              const display =
                (obj && (String(obj.title ?? obj.name ?? obj.slug ?? obj.label ?? "")).trim()) || `Elemento ${i + 1}`;
              const cardId = `${path.join(".")}.${i}`;
              const cardOpen = openCards[cardId] ?? i === 0;
              return (
                <div key={`${lang}-${i}`} className={styles.VCard}>
                  <header className={styles.VCardHeader}>
                    <button
                      type="button"
                      className={styles.VCardToggle}
                      aria-expanded={cardOpen}
                      onClick={() => setOpenCards((prev) => ({ ...prev, [cardId]: !cardOpen }))}
                    >
                      <span>{display} <em>[{i}]</em></span>
                      <span aria-hidden="true">{cardOpen ? "−" : "+"}</span>
                    </button>
                    <div className={styles.VCardActions}>
                      <button
                        className={styles.ArrowBtn}
                        onClick={() => moveItem(path, i, -1)}
                        disabled={i === 0}
                        title="Subir"
                      >
                        ↑
                      </button>
                      <button
                        className={styles.ArrowBtn}
                        onClick={() => moveItem(path, i, 1)}
                        disabled={i === arr.length - 1}
                        title="Bajar"
                      >
                        ↓
                      </button>
                      <button className={styles.MiniBtn} onClick={() => removeAt([...path, String(i)])}>
                        ✕ eliminar
                      </button>
                    </div>
                  </header>
                  {cardOpen && renderNode(item, [...path, String(i)])}
                </div>
              );
            })}
            <button
              className={styles.AddBtn}
              onClick={() => addArrayItem(path)}
            >
              + añadir elemento
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderLeaf = (key: string, val: unknown, path: string[]): React.ReactNode => {
    if (isHiddenField(path)) return null;
    if (collection === "home" && keyname === "global_reach" && key === "nodes" && Array.isArray(val)) {
      return (
        <div className={styles.VField}>
          <span className={styles.VKey}>{label(path)}</span>
          <MapNodesEditor
            nodes={val as MapNodeItem[]}
            onChange={(next) => patch(path, next)}
            onUploadLogo={(index) => onUploadImage([...path, String(index), "logo"])}
          />
        </div>
      );
    }
    const isRbeFocusImage =
      collection === "rbe" &&
      keyname === "second" &&
      path.join(".") === "focus.icon";
    if (
      typeof val === "string" &&
      (isRbeFocusImage || (key !== "icon" && (IMAGE_FIELD_KEYS.has(key) || isImageValue(val))))
    ) {
      const url = resolveStorageUrl(val);
      const emptyLabel = key === "background_image" ? "sin imagen de fondo" : "sin imagen";
      const actionLabel =
        key === "background_image"
          ? val
            ? "Cambiar imagen de fondo"
            : "Subir imagen de fondo"
          : val
            ? "Cambiar imagen"
            : "Seleccionar imagen";
      return (
        <div className={styles.VField}>
          <span className={styles.VKey}>{label(path)}</span>
          <div className={styles.ImgField}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {url ? <img src={url} alt={label(path)} /> : <span className={styles.Muted}>{emptyLabel}</span>}
            <div>
              {val && <span className={styles.Muted}>{val}</span>}
              <button
                className={`${styles.AddBtn} ${styles.ImageBtn}`}
                onClick={() => onUploadImage(path)}
              >
                🖼 {actionLabel}
              </button>
              {val && (
                <button className={styles.MiniBtn} onClick={() => patch(path, "")} title="Quitar imagen">
                  ✕ Quitar
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (typeof val === "string") {
      if (key === "icon") {
        const Icon = getIcon(val);
        return (
          <div className={styles.VField}>
            <span className={styles.VKey}>{label(path)}</span>
            <button className={styles.IconBtn} onClick={() => onPickIcon(path)} title="Cambiar ícono">
              <Icon size={22} />
              <span>{val}</span>
            </button>
          </div>
        );
      }
      return (
        <div className={styles.VField}>
          <span className={styles.VKey}>{label(path)}</span>
          <div className={styles.SettingsFieldRow}>
            <Editable
              value={val}
              onChange={(next) => patch(path, next)}
              role={roleFor(key)}
              multiline={roleFor(key) === "p" || roleFor(key) === "h1"}
              placeholder={label(path)}
              plain={isPlainAdminField(collection, keyname, path)}
            />
            {!isPlainAdminField(collection, keyname, path) && <button
              className={styles.SettingsBtn}
              onClick={() => onOpenSettings(path, val)}
              title="Propiedades del texto"
            >
              ⚙
            </button>}
          </div>
        </div>
      );
    }

    if (typeof val === "number") {
      return (
        <div className={styles.VField}>
          <span className={styles.VKey}>{label(path)}</span>
          <input
            type="number"
            className={styles.NumberInput}
            value={val}
            onChange={(e) => patch(path, Number(e.target.value))}
          />
        </div>
      );
    }

    if (typeof val === "boolean") {
      return (
        <div className={styles.VFieldRow}>
          <span className={styles.VKey}>{label(path)}</span>
          <input type="checkbox" checked={val} onChange={(e) => patch(path, e.target.checked)} />
        </div>
      );
    }

    if (Array.isArray(val)) {
      return <div className={styles.VField}>{renderArray(val, key, path)}</div>;
    }

    if (val !== null && typeof val === "object") {
      const entries = Object.entries(val as Record<string, unknown>);
      const id = path.join(".");
      const open = expanded[id] ?? true;
      return (
        <div className={styles.VField}>
          <button className={styles.ObjectToggle} onClick={() => setExpanded({ ...expanded, [id]: !open })}>
            {open ? "▾" : "▸"} {label(path)} <span className={styles.Muted}>({entries.length})</span>
          </button>
          {open && <div className={styles.VObject}>{renderNode(val, path)}</div>}
        </div>
      );
    }

    return null;
  };

  const renderNode = (node: unknown, path: string[]): React.ReactNode => {
    if (Array.isArray(node)) return renderArray(node, "items", path);
    if (node === null || typeof node !== "object") return null;
    const obj = node as Record<string, unknown>;
    return (
      <>
        {Object.entries(obj).map(([k, v]) => (
          <div key={k}>{renderLeaf(k, v, [...path, k])}</div>
        ))}
      </>
    );
  };

  const renderField = (k: string, v: unknown, path: string[]): React.ReactNode => (
    <div key={k}>{renderLeaf(k, v, [...path, k])}</div>
  );

  const isRootArray = Array.isArray(value);
  const ignoredRootKeys = new Set(["width", "height", "include_default_cases"]);
  const unusedFields: Record<string, string[]> = {
    "cases/page": ["items", "view_all_label", "view_less_label"],
    "rbe/first": ["text", "cards", "cta_secondary", "cta_secondary_href"],
    "settings/general": ["theme"],
  };
  for (const key of unusedFields[`${collection}/${keyname}`] ?? []) ignoredRootKeys.add(key);
  if (collection === "settings" && keyname === "seo" && lang !== "en") {
    ignoredRootKeys.add("rbe");
    ignoredRootKeys.add("filling_packaging");
  }
  const topKeys = isRootArray ? [] : Object.keys(value).filter((key) => !ignoredRootKeys.has(key));
  const groups = getGroups(collection, keyname);
  const usedKeys = new Set<string>();
  const sections: { label: string; keys: string[] }[] = [];

  if (!isRootArray && groups && groups.length > 0) {
    for (const g of groups) {
      const present = g.fields.filter((f) => topKeys.includes(f));
      present.forEach((f) => usedKeys.add(f));
      if (present.length > 0) sections.push({ label: g.label, keys: present });
    }
  }

  const leftover = topKeys.filter((k) => !usedKeys.has(k));
  if (leftover.length > 0) sections.push({ label: "Otros campos", keys: leftover });

  return (
    <div className={styles.VisualEditor}>
      {isRootArray ? (
        renderArray(value as unknown[], "items", [])
      ) : (
        <>
          {sections.length === 0 && <p className={styles.Muted}>Este apartado está vacío todavía.</p>}
          {sections.map((s, index) => {
            const isOpen = openSections[s.label] ?? index === 0;
            return (
            <section key={s.label} className={styles.VSection}>
              <header className={styles.VSectionHeader}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenSections((prev) => ({ ...prev, [s.label]: !isOpen }))}
                >
                  <strong>{s.label}</strong>
                  <span>{s.keys.length} campos</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </header>
              {isOpen && <div className={styles.VSectionBody}>
                {s.keys.map((k) => renderField(k, value[k], []))}
              </div>}
            </section>
          );})}
        </>
      )}
    </div>
  );
};

export default VisualEditor;
