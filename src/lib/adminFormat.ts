function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function getActiveEditable(): HTMLElement | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  const node = range.commonAncestorContainer;
  const el = node.nodeType === 1 ? node : node.parentElement;
  return el instanceof Element ? el.closest("[data-editable]") : null;
}

export function wrapActiveSelection(before: string, after: string, middleText?: string) {
  const editable = getActiveEditable();
  if (!editable) return;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const text = middleText ?? range.toString();
  const span = document.createElement("span");
  span.innerHTML = before + escapeHtml(text) + after;
  range.deleteContents();
  range.insertNode(span);

  const lastNode = span.lastChild;
  if (lastNode) {
    const r = document.createRange();
    r.setStart(lastNode, lastNode.textContent?.length ?? 0);
    r.collapse(true);
    sel.removeAllRanges();
    sel.addRange(r);
  }
  editable.dispatchEvent(new InputEvent("input", { bubbles: true }));
}

export function insertAtSelection(text: string) {
  const editable = getActiveEditable();
  if (!editable) return;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
  const r = document.createRange();
  r.setStart(range.endContainer, range.endOffset);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
  editable.dispatchEvent(new InputEvent("input", { bubbles: true }));
}

/* ── Inline style utilities ─────────────────────────────── */

export function parseInlineStyles(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {};
  if (!styleString) return styles;
  styleString.split(";").forEach((decl) => {
    const colonIdx = decl.indexOf(":");
    if (colonIdx < 0) return;
    const prop = decl.slice(0, colonIdx).trim().toLowerCase();
    const val = decl.slice(colonIdx + 1).trim();
    if (prop && val) styles[prop] = val;
  });
  return styles;
}

export function serializeInlineStyles(styles: Record<string, string>): string {
  return Object.entries(styles)
    .filter(([, v]) => v !== "" && v !== undefined)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

export function applyInlineStyles(html: string, styles: Record<string, string>): string {
  if (!html) return "";
  const keys = Object.keys(styles).filter((k) => styles[k] !== "" && styles[k] !== undefined);
  if (keys.length === 0) return html;

  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const firstChild = tmp.firstElementChild;

  if (
    firstChild &&
    firstChild.tagName === "SPAN" &&
    firstChild.getAttribute("style")
  ) {
    const existing = parseInlineStyles(firstChild.getAttribute("style")!);
    Object.assign(existing, styles);
    const serialized = serializeInlineStyles(existing);
    if (serialized) firstChild.setAttribute("style", serialized);
    else firstChild.removeAttribute("style");
    if (!firstChild.getAttribute("style")) {
      const parent = firstChild.parentNode;
      while (firstChild.firstChild) parent!.insertBefore(firstChild.firstChild, firstChild);
      parent!.removeChild(firstChild);
    }
    return tmp.innerHTML;
  }

  const serialized = serializeInlineStyles(styles);
  if (!serialized) return html;
  return `<span style="${serialized}">${html}</span>`;
}

export function removeInlineStyles(html: string, props: string[]): string {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const firstChild = tmp.firstElementChild;
  if (!firstChild || firstChild.tagName !== "SPAN" || !firstChild.getAttribute("style"))
    return html;

  const existing = parseInlineStyles(firstChild.getAttribute("style")!);
  for (const p of props) delete existing[p];
  const serialized = serializeInlineStyles(existing);
  if (serialized) firstChild.setAttribute("style", serialized);
  else {
    const parent = firstChild.parentNode;
    while (firstChild.firstChild) parent!.insertBefore(firstChild.firstChild, firstChild);
    parent!.removeChild(firstChild);
  }
  return tmp.innerHTML;
}
