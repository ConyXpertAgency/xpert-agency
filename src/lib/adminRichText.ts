import sanitizeHtml from "sanitize-html";

const dimension = /^-?\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw)?$/i;
const color = /^(?:#[0-9a-f]{3,8}|rgba?\([\d.,%\s]+\)|transparent|[a-z]+)$/i;
const safeCss = /^(?!.*(?:url\s*\(|expression\s*\(|@|[<>\\]))[a-z0-9#%.,()\s_+\-]+$/i;
const keywords = (values: string) => new RegExp(`^(?:${values})$`, "i");

/** Used only at admin rich-text edit boundaries; public RichText stays unchanged. */
export function sanitizeAdminRichText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: ["p", "div", "br", "span", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "a"],
    allowedAttributes: {
      "*": ["style", "dir"],
      a: ["href", "title", "target", "rel", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedStyles: {
      "*": {
        "font-size": [dimension],
        "font-weight": [keywords("normal|bold|[1-9]00")],
        "font-style": [keywords("normal|italic|oblique")],
        "font-family": [safeCss],
        color: [color],
        background: [color],
        "text-align": [keywords("left|center|right|justify")],
        "line-height": [dimension],
        "letter-spacing": [dimension],
        "word-spacing": [dimension],
        "text-decoration": [keywords("none|underline|overline|line-through|underline overline")],
        "text-transform": [keywords("none|uppercase|lowercase|capitalize")],
        "text-shadow": [safeCss],
        "text-indent": [dimension],
        "white-space": [keywords("normal|nowrap|pre|pre-wrap|pre-line")],
        margin: [safeCss], padding: [safeCss], border: [safeCss],
        "border-radius": [dimension], opacity: [dimension],
        display: [keywords("inline|block|inline-block|flex|grid")],
        width: [dimension, keywords("auto")],
      },
    },
  });
}
