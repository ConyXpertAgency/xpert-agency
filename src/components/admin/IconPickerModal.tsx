"use client";

import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import styles from "@/styles/admin/Admin.module.css";

interface IconPickerModalProps {
  onPick: (name: string) => void;
  onClose: () => void;
}

const IconPickerModal = ({ onPick, onClose }: IconPickerModalProps) => {
  const [icons, setIcons] = useState<Record<string, IconType>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    import("@/lib/supabase/allIcons")
      .then((m) => {
        if (!active) return;
        setIcons(m.allIcons);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const names = Object.keys(icons);
    if (!query) return names;
    const q = query.toLowerCase();
    return names.filter((n) => n.toLowerCase().includes(q));
  }, [icons, query]);

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.IconModal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.ModalHeader}>
          <h2>Selecciona un ícono (react-icons)</h2>
          <button className={styles.CloseBtn} onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>
        <input
          autoFocus
          className={styles.SearchInput}
          placeholder="Buscar ícono… (ej. FiTruck, HiOutlineCog)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.IconGrid}>
          {loading && <p className={styles.IconLoading}>Cargando íconos…</p>}
          {!loading &&
            filtered.slice(0, 600).map((name) => {
              const Icon = icons[name];
              return (
                <button
                  key={name}
                  className={styles.IconCell}
                  title={name}
                  onClick={() => onPick(name)}
                >
                  <Icon size={22} />
                  <span>{name}</span>
                </button>
              );
            })}
        </div>
        {!loading && filtered.length === 0 && (
          <p className={styles.IconLoading}>Sin resultados para “{query}”</p>
        )}
      </div>
    </div>
  );
};

export default IconPickerModal;
