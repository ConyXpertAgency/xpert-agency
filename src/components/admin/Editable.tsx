"use client";

import { useEffect, useRef } from "react";
import { sanitizeAdminRichText } from "@/lib/adminRichText";
import { readPlainEditable } from "@/lib/adminTextPolicy";
import styles from "@/styles/admin/Admin.module.css";

interface EditableProps {
  value: string;
  onChange: (next: string) => void;
  role: "h1" | "h2" | "p" | "badge" | "btn" | "link";
  multiline?: boolean;
  placeholder?: string;
  plain?: boolean;
}

const Editable = ({ value, onChange, role, multiline = false, placeholder, plain = false }: EditableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (plain) {
      if (el.textContent !== value) el.textContent = value;
    } else {
      const safe = sanitizeAdminRichText(value);
      if (el.innerHTML !== safe) el.innerHTML = safe;
    }
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
      style={plain ? { whiteSpace: "pre-wrap" } : undefined}
      onFocus={(e) => {
        e.currentTarget.dataset.active = "true";
      }}
      onBlur={(e) => {
        e.currentTarget.dataset.active = "false";
        onChange(plain ? readPlainEditable(e.currentTarget) : sanitizeAdminRichText(e.currentTarget.innerHTML));
      }}
      onInput={(e) => onChange(plain ? readPlainEditable(e.currentTarget) : sanitizeAdminRichText(e.currentTarget.innerHTML))}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const node = document.createTextNode(text);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        onChange(plain ? readPlainEditable(e.currentTarget) : sanitizeAdminRichText(e.currentTarget.innerHTML));
      }}
    />
  );
};

export default Editable;
