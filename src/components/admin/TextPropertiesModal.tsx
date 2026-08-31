"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "@/styles/admin/Admin.module.css";

interface TextPropertiesModalProps {
  value: string;
  onApply: (next: string) => void;
  onClose: () => void;
}

type InputType = "text" | "select" | "color";

interface PropMeta {
  category: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const ALL_PROPS = [
  "font-size", "font-weight", "font-style", "font-family",
  "color", "background",
  "text-align", "line-height", "letter-spacing", "word-spacing",
  "text-decoration", "text-transform", "text-shadow", "text-indent", "white-space",
  "margin", "padding", "border", "border-radius", "opacity", "display", "width",
];

const FONTS = [
  "inherit", "Arial, sans-serif", "Helvetica, sans-serif", "Georgia, serif",
  "Times New Roman, serif", "Courier New, monospace", "Verdana, sans-serif",
  "system-ui, sans-serif", "var(--font-geist-sans), system-ui, sans-serif",
];

const PROPS: Record<string, PropMeta> = {
  "font-size":       { category: "Typography", label: "font-size",       type: "text",   placeholder: "16px" },
  "font-weight":     { category: "Typography", label: "font-weight",     type: "select", options: [
    { value: "", label: "inherit" }, { value: "100", label: "100 Thin" }, { value: "200", label: "200 Extra Light" },
    { value: "300", label: "300 Light" }, { value: "400", label: "400 Normal" }, { value: "500", label: "500 Medium" },
    { value: "600", label: "600 Semi Bold" }, { value: "700", label: "700 Bold" }, { value: "800", label: "800 Extra Bold" },
    { value: "900", label: "900 Black" },
  ]},
  "font-style":      { category: "Typography", label: "font-style",      type: "select", options: [
    { value: "", label: "inherit" }, { value: "normal", label: "normal" },
    { value: "italic", label: "italic" }, { value: "oblique", label: "oblique" },
  ]},
  "font-family":     { category: "Typography", label: "font-family",     type: "select", options: [
    { value: "", label: "inherit" }, ...FONTS.map((f) => ({ value: f, label: f })),
  ]},
  "color":           { category: "Color",      label: "color",           type: "color",  placeholder: "#000000" },
  "background":      { category: "Color",      label: "background",      type: "color",  placeholder: "transparent" },
  "text-align":      { category: "Text",       label: "text-align",      type: "select", options: [
    { value: "", label: "inherit" }, { value: "left", label: "left" }, { value: "center", label: "center" },
    { value: "right", label: "right" }, { value: "justify", label: "justify" },
  ]},
  "line-height":     { category: "Text",       label: "line-height",     type: "text",   placeholder: "1.5" },
  "letter-spacing":  { category: "Text",       label: "letter-spacing",  type: "text",   placeholder: "0.05em" },
  "word-spacing":    { category: "Text",       label: "word-spacing",    type: "text",   placeholder: "0.1em" },
  "text-decoration": { category: "Text",       label: "text-decoration", type: "select", options: [
    { value: "", label: "none" }, { value: "underline", label: "underline" },
    { value: "overline", label: "overline" }, { value: "line-through", label: "line-through" },
    { value: "underline overline", label: "underline overline" },
  ]},
  "text-transform":  { category: "Text",       label: "text-transform",  type: "select", options: [
    { value: "", label: "none" }, { value: "uppercase", label: "uppercase" },
    { value: "lowercase", label: "lowercase" }, { value: "capitalize", label: "capitalize" },
  ]},
  "text-shadow":     { category: "Text",       label: "text-shadow",     type: "text",   placeholder: "2px 2px 4px rgba(0,0,0,0.3)" },
  "text-indent":     { category: "Text",       label: "text-indent",     type: "text",   placeholder: "0" },
  "white-space":     { category: "Text",       label: "white-space",     type: "select", options: [
    { value: "", label: "inherit" }, { value: "normal", label: "normal" }, { value: "nowrap", label: "nowrap" },
    { value: "pre", label: "pre" }, { value: "pre-wrap", label: "pre-wrap" }, { value: "pre-line", label: "pre-line" },
  ]},
  "margin":          { category: "Box",        label: "margin",          type: "text",   placeholder: "0" },
  "padding":         { category: "Box",        label: "padding",         type: "text",   placeholder: "0" },
  "border":          { category: "Box",        label: "border",          type: "text",   placeholder: "1px solid #000" },
  "border-radius":   { category: "Box",        label: "border-radius",   type: "text",   placeholder: "8px" },
  "opacity":         { category: "Box",        label: "opacity",         type: "text",   placeholder: "1" },
  "display":         { category: "Box",        label: "display",         type: "select", options: [
    { value: "", label: "inherit" }, { value: "inline", label: "inline" }, { value: "block", label: "block" },
    { value: "inline-block", label: "inline-block" }, { value: "flex", label: "flex" }, { value: "grid", label: "grid" },
  ]},
  "width":           { category: "Box",        label: "width",           type: "text",   placeholder: "auto" },
};

const CATEGORIES = ["Typography", "Color", "Text", "Box"];

function serializeCss(css: Record<string, string>): string {
  return Object.entries(css)
    .filter(([, v]) => v !== "" && v !== undefined)
    .map(([k, v]) => `${k}:${v}`)
    .join("; ");
}

/* Prevent sidebar clicks from clearing the editor selection */
const stopFocusSteal = (e: React.MouseEvent) => e.preventDefault();

const TextPropertiesModal = ({ value, onApply, onClose }: TextPropertiesModalProps) => {
  const [selectedProp, setSelectedProp] = useState<string | null>(null);
  const [selectionProps, setSelectionProps] = useState<Record<string, string>>({});
  const [hasSelection, setHasSelection] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const editorHasFocus = useRef(false);

  useEffect(() => {
    if (!editorRef.current || !value) return;
    editorRef.current.innerHTML = value;
  }, [value]);

  /* Track selection — only clear when user clicks/changes selection INSIDE the editor */
  const handleSelectionChange = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorRef.current) return;

    const range = sel.getRangeAt(0);
    const isInsideEditor = editorRef.current.contains(range.commonAncestorContainer);

    if (isInsideEditor) {
      const hasText = !range.collapsed && range.toString().length > 0;
      if (hasText) {
        /* New selection inside editor → save it */
        savedRange.current = range.cloneRange();
        setHasSelection(true);

        const props: Record<string, string> = {};
        const parent = range.commonAncestorContainer;
        const el = parent.nodeType === Node.ELEMENT_NODE ? parent as HTMLElement : parent.parentElement;
        if (el && el.getAttribute("style")) {
          el.getAttribute("style")!.split(";").forEach((decl) => {
            const [prop, ...rest] = decl.split(":");
            if (prop && rest.length) props[prop.trim()] = rest.join(":").trim();
          });
        }
        setSelectionProps(props);
      } else if (editorHasFocus.current) {
        /* Clicked inside editor without selecting — only clear if editor had focus */
        /* Don't clear yet, let user re-select */
      }
    }
    /* If selection moved outside editor (sidebar clicks), do nothing — keep saved state */
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [handleSelectionChange]);

  /* Apply a CSS property to the saved selection */
  const applyToSelection = useCallback((prop: string, val: string) => {
    if (!savedRange.current || !editorRef.current) return;

    const range = savedRange.current;
    const sel = window.getSelection();
    if (!sel) return;

    /* Restore the saved range into the editor */
    editorRef.current.focus();
    sel.removeAllRanges();
    sel.addRange(range);

    if (val === "") {
      const parent = range.commonAncestorContainer;
      const el = parent.nodeType === Node.ELEMENT_NODE ? parent as HTMLElement : parent.parentElement;
      if (el && el.tagName === "SPAN" && el.getAttribute("style")) {
        const textNode = document.createTextNode(el.textContent ?? "");
        el.parentNode?.replaceChild(textNode, el);
      }
    } else {
      const span = document.createElement("span");
      const parent = range.commonAncestorContainer;
      const parentEl = parent.nodeType === Node.ELEMENT_NODE ? parent as HTMLElement : parent.parentElement;
      if (parentEl && parentEl.tagName === "SPAN" && parentEl.getAttribute("style")) {
        parentEl.getAttribute("style")!.split(";").forEach((decl) => {
          const [p, ...rest] = decl.split(":");
          if (p && rest.length) span.style.setProperty(p.trim(), rest.join(":").trim());
        });
      }
      span.style.setProperty(prop, val);
      range.surroundContents(span);
    }

    /* Re-select the range after modification to keep selection alive */
    const newRange = sel.getRangeAt(0);
    savedRange.current = newRange.cloneRange();
    setHasSelection(true);

    /* Update selectionProps */
    setSelectionProps((prev) => {
      const next = { ...prev };
      if (val === "") delete next[prop];
      else next[prop] = val;
      return next;
    });
  }, []);

  const toggleInline = useCallback((tag: string) => {
    document.execCommand("insertHTML", false, `<${tag}>${window.getSelection()?.toString() ?? ""}</${tag}>`);
  }, []);

  const activeMeta = selectedProp ? PROPS[selectedProp] : null;

  const handleApply = () => {
    if (editorRef.current) {
      onApply(editorRef.current.innerHTML);
    }
    onClose();
  };

  const handleClearAll = () => {
    if (editorRef.current) {
      const text = editorRef.current.textContent ?? "";
      editorRef.current.innerHTML = text;
      onApply(text);
    }
    onClose();
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (selectedProp) setSelectedProp(null);
      else onClose();
    }
  };

  return (
    <div className={styles.ModalOverlay} onClick={onClose} onKeyDown={handleKeyDown}>
      <div className={`${styles.IconModal} ${styles.SettingsModal}`} onClick={(e) => e.stopPropagation()}>
        <header className={styles.ModalHeader}>
          <h2>Text Properties</h2>
          <button className={styles.CloseBtn} onClick={onClose}>✕</button>
        </header>

        <div className={styles.SettingsBody}>
          {/* Col 1: Property list — preventDefault on mousedown to keep editor selection */}
          <div className={styles.SettingsPropList} onMouseDown={stopFocusSteal}>
            {CATEGORIES.map((cat) => {
              const expanded = expandedCats[cat] ?? false;
              return (
              <div key={cat} className={styles.SettingsPropGroup}>
                <button
                  className={`${styles.SettingsPropGroupTitle} ${expanded ? styles.SettingsPropGroupOpen : ""}`}
                  onClick={() => toggleCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className={styles.SettingsPropCaret}>{expanded ? "▾" : "▸"}</span>
                </button>
                {expanded && ALL_PROPS.filter((p) => PROPS[p].category === cat).map((p) => {
                  const val = hasSelection ? selectionProps[p] : undefined;
                  const isActive = selectedProp === p;
                  return (
                    <button
                      key={p}
                      className={`${styles.SettingsPropItem} ${isActive ? styles.SettingsPropItemActive : ""}`}
                      onClick={() => setSelectedProp(isActive ? null : p)}
                    >
                      <span className={styles.SettingsPropLabel}>{p}</span>
                      <span className={`${styles.SettingsPropValue} ${val ? styles.SettingsPropValueSet : ""}`}>
                        {val || "\u2014"}
                      </span>
                    </button>
                  );
                })}
              </div>
              );
            })}
          </div>

          {/* Col 2: Property detail — preventDefault on mousedown */}
          <div className={styles.SettingsDetailPanel} onMouseDown={stopFocusSteal}>
            {activeMeta ? (
              <div className={styles.SettingsDetailContent}>
                <div className={styles.SettingsDetailHeader}>
                  <span className={styles.SettingsDetailPropName}>{activeMeta.label}</span>
                  <span className={styles.SettingsDetailCategory}>
                    {hasSelection ? "on selection" : activeMeta.category}
                  </span>
                </div>
                <div className={styles.SettingsDetailField}>
                  {activeMeta.type === "select" && activeMeta.options ? (
                    <select
                      className={styles.SettingsDetailSelect}
                      value={selectionProps[activeMeta.label] ?? ""}
                      onChange={(e) => applyToSelection(activeMeta.label, e.target.value)}
                    >
                      {activeMeta.options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : activeMeta.type === "color" ? (
                    <div className={styles.SettingsDetailColorRow}>
                      <input
                        type="color"
                        className={styles.SettingsDetailColorPicker}
                        value={selectionProps[activeMeta.label]?.startsWith("#") ? selectionProps[activeMeta.label] : "#000000"}
                        onChange={(e) => applyToSelection(activeMeta.label, e.target.value)}
                      />
                      <input
                        type="text"
                        className={styles.SettingsDetailInput}
                        placeholder={activeMeta.placeholder}
                        value={selectionProps[activeMeta.label] ?? ""}
                        onChange={(e) => applyToSelection(activeMeta.label, e.target.value)}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className={styles.SettingsDetailInput}
                      placeholder={activeMeta.placeholder}
                      value={selectionProps[activeMeta.label] ?? ""}
                      onChange={(e) => applyToSelection(activeMeta.label, e.target.value)}
                    />
                  )}
                </div>
                <button
                  className={styles.SettingsDetailClear}
                  onClick={() => applyToSelection(activeMeta.label, "")}
                >
                  Clear value
                </button>
              </div>
            ) : (
              <div className={styles.SettingsDetailEmpty}>
                <div className={styles.SettingsDetailEmptyIcon}>{"\u2699"}</div>
                <span>
                  {hasSelection
                    ? "Select a property to apply to the selection"
                    : "Select text in the editor, then a property"}
                </span>
              </div>
            )}
          </div>

          {/* Col 3: Editor */}
          <div className={styles.SettingsPreviewPanel}>
            <div className={styles.SettingsPreviewLabel}>
              Editor
              {hasSelection && <span className={styles.SettingsHoverBadge} style={{ background: "#6391ff" }}>selection active</span>}
            </div>
            <div className={styles.SettingsPreviewBox}>
              <div className={styles.EditorToolbar} onMouseDown={stopFocusSteal}>
                <button title="Negrita" onClick={() => toggleInline("strong")}>B</button>
                <button title="Cursiva" onClick={() => toggleInline("em")}>I</button>
                <button title="Subrayado" onClick={() => toggleInline("u")}>U</button>
                <button title="Tachado" onClick={() => toggleInline("s")}>S</button>
              </div>
              <div
                ref={editorRef}
                className={styles.SettingsEditorContent}
                contentEditable
                suppressContentEditableWarning
                onFocus={() => { editorHasFocus.current = true; }}
                onBlur={() => { editorHasFocus.current = false; }}
                style={{
                  color: "var(--color-text-primary)",
                  minHeight: "120px",
                  padding: "12px",
                  outline: "none",
                  lineHeight: "1.6",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.SettingsFooter} onMouseDown={stopFocusSteal}>
          <button className={styles.SettingsClearBtn} onClick={handleClearAll}>Clear all</button>
          <button className={styles.SettingsResetBtn} onClick={handleReset}>Reset</button>
          <button className={styles.SettingsCancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.SettingsApplyBtn} onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default TextPropertiesModal;
