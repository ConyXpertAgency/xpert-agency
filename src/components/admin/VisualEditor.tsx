"use client";

import { useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import Editable from "./Editable";
import { getIcon } from "@/lib/supabase/icons";
import { resolveStorageUrl } from "@/lib/supabase/client";
import { removeAtPath, updatePath } from "@/lib/dataPath";
import { fieldLabel, getGroups } from "@/lib/adminSchema";

type Role = "h1" | "h2" | "p" | "badge" | "btn" | "link";

const IMAGE_RE = /\.(png|jpe?g|gif|svg|webp|avif|bmp)$/i;

const isImageValue = (v: unknown): boolean =>
  typeof v === "string" &&
  (v.startsWith("/uploads/") ||
    IMAGE_RE.test(v) ||
    (/^https?:\/\//.test(v) && IMAGE_RE.test(v)));

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
  lang: string;
  collection: string;
  keyname: string;
}

const VisualEditor = ({
  value,
  onChange,
  onPickIcon,
  onUploadImage,
  lang,
  collection,
  keyname,
}: VisualEditorProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const patch = (path: string[], next: unknown) => {
    onChange(updatePath(value, path, next) as Record<string, unknown>);
  };
  const removeAt = (path: string[]) => {
    onChange(removeAtPath(value, path) as Record<string, unknown>);
  };

  const label = (path: string[]): string => fieldLabel(collection, keyname, path) ?? path[path.length - 1];

  const renderArray = (arr: unknown[], key: string, path: string[]) => {
    const allStrings = arr.every((v) => typeof v === "string");
    return (
      <div className={styles.VArray}>
        <span className={styles.VKey}>
          {label(path)} · {arr.length}
        </span>
        {allStrings ? (
          <>
            {arr.map((item, i) => (
              <div key={`${lang}-${i}`} className={styles.VArrayRow}>
                <Editable
                  value={item as string}
                  onChange={(next) => patch([...path, String(i)], next)}
                  role="p"
                />
                <button
                  className={styles.MiniBtn}
                  onClick={() => removeAt([...path, String(i)])}
                  title="Eliminar línea"
                >
                  ✕
                </button>
              </div>
            ))}
            <button className={styles.AddBtn} onClick={() => patch(path, [...arr, ""])}>
              + añadir línea
            </button>
          </>
        ) : (
          <div className={styles.VCards}>
            {arr.map((item, i) => {
              const obj =
                typeof item === "object" && item !== null ? (item as Record<string, unknown>) : null;
              const display =
                (obj && (String(obj.title ?? obj.name ?? obj.slug ?? obj.label ?? "")).trim()) || `Elemento ${i + 1}`;
              return (
                <div key={`${lang}-${i}`} className={styles.VCard}>
                  <header className={styles.VCardHeader}>
                    <span>
                      {display} <em>[{i}]</em>
                    </span>
                    <button className={styles.MiniBtn} onClick={() => removeAt([...path, String(i)])}>
                      ✕ eliminar
                    </button>
                  </header>
                  {renderNode(item, [...path, String(i)])}
                </div>
              );
            })}
            <button className={styles.AddBtn} onClick={() => patch(path, [...arr, {}])}>
              + añadir elemento
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderLeaf = (key: string, val: unknown, path: string[]): React.ReactNode => {
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
      if (isImageValue(val)) {
        const url = resolveStorageUrl(val);
        return (
          <div className={styles.VField}>
            <span className={styles.VKey}>{label(path)}</span>
            <div className={styles.ImgField}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {url ? <img src={url} alt={label(path)} /> : <span className={styles.Muted}>sin imagen</span>}
              <div>
                <span className={styles.Muted}>{val}</span>
                <button className={styles.AddBtn} onClick={() => onUploadImage(path)}>
                  🖼 Cambiar imagen
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={styles.VField}>
          <span className={styles.VKey}>{label(path)}</span>
          <Editable
            value={val}
            onChange={(next) => patch(path, next)}
            role={roleFor(key)}
            multiline={roleFor(key) === "p" || roleFor(key) === "h1"}
            placeholder={label(path)}
          />
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
    return Object.entries(node as Record<string, unknown>).map(([k, v]) => (
      <div key={k}>{renderLeaf(k, v, [...path, k])}</div>
    ));
  };

  const renderField = (k: string, v: unknown, path: string[]): React.ReactNode => (
    <div key={k}>{renderLeaf(k, v, [...path, k])}</div>
  );

  const topKeys = Object.keys(value);
  const groups = getGroups(collection, keyname);
  const usedKeys = new Set<string>();
  const sections: { label: string; keys: string[] }[] = [];

  if (groups && groups.length > 0) {
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
      {sections.length === 0 && <p className={styles.Muted}>Este apartado está vacío todavía.</p>}
      {sections.map((s) => (
        <section key={s.label} className={styles.VSection}>
          <header className={styles.VSectionHeader}>
            <strong>{s.label}</strong>
            <span>{s.keys.length} campos</span>
          </header>
          <div className={styles.VSectionBody}>
            {s.keys.map((k) => renderField(k, value[k], []))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default VisualEditor;
