/** Plain data fields must not be serialized through contentEditable.innerHTML. */
export function isPlainAdminField(collection: string, keyname: string, path: string[]): boolean {
  if (collection === "contact" && keyname === "teams") return true;
  const key = path[path.length - 1] ?? "";
  const parent = path[path.length - 2] ?? "";
  const field = /^\d+$/.test(key) ? parent : key;
  return /^(?:id|slug|name|firstName|lastName|phone|phones|address|addresses|email|publicEmail|contact_email|recipientKey|organization|country|countries|region|href|url|link)$/i.test(field);
}

/** Unlike textContent, innerText preserves the visible line breaks created by Enter. */
export function readPlainEditable(element: Pick<HTMLElement, "innerText">): string {
  return element.innerText;
}

const markupOrEntity = /<\s*\/?\s*[a-z][^>]*>|&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);/i;

/** Reject malformed Contact payloads without rewriting or losing user content. */
export function validateContactTeamsPlainText(data: unknown): string | null {
  const walk = (value: unknown, path: string): string | null => {
    if (typeof value === "string") return markupOrEntity.test(value) ? path : null;
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const problem = walk(value[i], `${path}[${i}]`);
        if (problem) return problem;
      }
    } else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        const problem = walk(child, path ? `${path}.${key}` : key);
        if (problem) return problem;
      }
    }
    return null;
  };
  return walk(data, "");
}
