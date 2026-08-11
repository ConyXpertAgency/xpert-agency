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
