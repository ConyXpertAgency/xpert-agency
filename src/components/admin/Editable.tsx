"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/admin/Admin.module.css";

interface EditableProps {
  value: string;
  onChange: (next: string) => void;
  role: "h1" | "h2" | "p" | "badge" | "btn" | "link";
  multiline?: boolean;
  placeholder?: string;
}

const Editable = ({ value, onChange, role, multiline = false, placeholder }: EditableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) el.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-editable
      className={`${styles.Editable} ${styles[`EditableRole_${role}`] ?? ""} ${
        multiline ? styles.EditableMultiline : ""
      }`}
      data-placeholder={placeholder}
      onFocus={(e) => {
        e.currentTarget.dataset.active = "true";
      }}
      onBlur={(e) => {
        e.currentTarget.dataset.active = "false";
        onChange(e.currentTarget.innerHTML);
      }}
      onInput={(e) => onChange(e.currentTarget.innerHTML)}
    />
  );
};

export default Editable;
