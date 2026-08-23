"use client";

import React, { useRef, useState } from "react";
import styles from "@/styles/admin/MapNodes.module.css";
import adminStyles from "@/styles/admin/Admin.module.css";
import { resolveStorageUrl } from "@/lib/supabase/client";

export interface MapNodeItem extends Record<string, unknown> {
  country?: string;
  label?: string;
  x?: number;
  y?: number;
  client?: string;
  description?: string;
  logo?: string;
}

interface MapNodesEditorProps {
  nodes: MapNodeItem[];
  onChange: (next: MapNodeItem[]) => void;
  onUploadLogo?: (index: number) => void;
}

const NEW_NODE: MapNodeItem = { country: "", label: "", x: 50, y: 50, client: "", description: "", logo: "" };

const round1 = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number) => Math.min(100, Math.max(0, n));

const nodeText = (node: MapNodeItem, i: number) =>
  String(node.country || node.label || `Punto ${i + 1}`);

const num = (v: unknown) => Number(v) || 0;

const MapNodesEditor = ({ nodes, onChange, onUploadLogo }: MapNodesEditorProps) => {
  const [selected, setSelected] = useState(0);
  const draggingRef = useRef(false);

  const safeSelected = Math.min(selected, Math.max(0, nodes.length - 1));
  const active = nodes[safeSelected];

  const updateActive = (x: number, y: number) => {
    onChange(nodes.map((n, i) => (i === safeSelected ? { ...n, x: round1(x), y: round1(y) } : n)));
  };

  const setField = (field: keyof MapNodeItem, value: string) => {
    onChange(nodes.map((n, i) => (i === safeSelected ? { ...n, [field]: value } : n)));
  };

  const posFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: clamp(((e.clientX - rect.left) / rect.width) * 100),
      y: clamp(((e.clientY - rect.top) / rect.height) * 100),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const p = posFromEvent(e);
    // Si el clic cae cerca de otro dot, ese pasa a ser el seleccionado
    let target = safeSelected;
    nodes.forEach((n, i) => {
      if (i !== safeSelected && Math.hypot(num(n.x) - p.x, num(n.y) - p.y) < 4) target = i;
    });
    setSelected(target);
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    // El nodo ya seleccionado se mueve al instante; uno recién elegido solo arrastra
    if (target === safeSelected) updateActive(p.x, p.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const p = posFromEvent(e);
    updateActive(p.x, p.y);
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const removeNode = (i: number) => {
    onChange(nodes.filter((_, index) => index !== i));
    setSelected(0);
  };

  const addNode = () => {
    onChange([...nodes, { ...NEW_NODE }]);
    setSelected(nodes.length);
  };

  return (
    <div className={styles.Layout}>
      <div
        className={styles.Canvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {nodes.map((node, i) => (
          <span
            key={i}
            className={`${styles.Dot} ${i === safeSelected ? styles.Active : ""}`}
            style={{ left: `${num(node.x)}%`, top: `${num(node.y)}%` }}
            title={nodeText(node, i)}
          />
        ))}
      </div>

      <p className={styles.Hint}>
        Clic en el mapa para mover el punto seleccionado; clic sobre un dot para elegirlo. Arrastra
        para ajustar fino.
      </p>

      <div className={styles.Chips}>
        {nodes.map((node, i) => (
          <span key={i} className={`${styles.Chip} ${i === safeSelected ? styles.Active : ""}`}>
            <button type="button" onClick={() => setSelected(i)}>
              {nodeText(node, i)}
            </button>
            <button type="button" className={styles.RemoveBtn} onClick={() => removeNode(i)} title="Eliminar punto">
              ✕
            </button>
          </span>
        ))}
        <button type="button" className={adminStyles.AddBtn} onClick={addNode}>
          + añadir punto
        </button>
      </div>

      {active && (
        <>
          <div className={styles.Coords}>
            <label className={styles.CoordField}>
              <span>X (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={num(active.x)}
                onChange={(e) => updateActive(Number(e.target.value), num(active.y))}
              />
            </label>
            <label className={styles.CoordField}>
              <span>Y (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={num(active.y)}
                onChange={(e) => updateActive(num(active.x), Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.FieldsGrid}>
            <label className={styles.Field}>
              <span>Etiqueta</span>
              <input
                value={String(active.label ?? "")}
                onChange={(e) => setField("label", e.target.value)}
                placeholder="NA"
              />
            </label>
            <label className={styles.Field}>
              <span>País</span>
              <input
                value={String(active.country ?? "")}
                onChange={(e) => setField("country", e.target.value)}
                placeholder="United States"
              />
            </label>
            <label className={styles.Field}>
              <span>Cliente</span>
              <input
                value={String(active.client ?? "")}
                onChange={(e) => setField("client", e.target.value)}
              />
            </label>
            <label className={styles.Field}>
              <span>Descripción</span>
              <input
                value={String(active.description ?? "")}
                onChange={(e) => setField("description", e.target.value)}
              />
            </label>
          </div>

          {onUploadLogo && (
            <div className={styles.LogoRow}>
              {resolveStorageUrl(String(active.logo ?? "")) && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={resolveStorageUrl(String(active.logo))} alt="" className={styles.LogoPreview} />
              )}
              <button type="button" className={adminStyles.MiniBtn} onClick={() => onUploadLogo(safeSelected)}>
                🖼 {active.logo ? "Cambiar logo" : "Añadir logo"}
              </button>
              {active.logo ? (
                <button type="button" className={adminStyles.MiniBtn} onClick={() => setField("logo", "")}>
                  ✕ Quitar logo
                </button>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapNodesEditor;
