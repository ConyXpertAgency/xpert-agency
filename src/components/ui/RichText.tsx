import React from "react";

interface RichTextProps {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "strong" | "em" | "div" | "li";
  className?: string;
  children?: React.ReactNode;
}

const PM_ATTR_RE = /\s*data-pm-slice="[^"]*"/gi;
const P_ADJACENT_RE = /<\/p\s*>\s*<p(\s[^>]*)?>/gi;
const P_OPEN_RE = /<p(\s[^>]*)?>/gi;
const P_CLOSE_RE = /<\/p\s*>/gi;
const EDGE_BR_RE = /^(?:\s*<br\s*\/?>)+(?:\s*<br\s*\/?>)*|(?:\s*<br\s*\/?>)+$/i;

function toSafeInline(html: string): string {
  let out = html.replace(PM_ATTR_RE, "").trim();
  if (!out || !/<\/?p(\s|>)/i.test(out)) return out;
  out = out
    .replace(P_ADJACENT_RE, "<br/>")
    .replace(P_OPEN_RE, "")
    .replace(P_CLOSE_RE, "")
    .trim();
  return out.replace(EDGE_BR_RE, "");
}

const RichText = ({ as: Tag = "span", className, children }: RichTextProps) => {
  const text = children == null ? "" : toSafeInline(String(children));
  const cls = [className, "rt"].filter(Boolean).join(" ");
  return <Tag className={cls} dangerouslySetInnerHTML={{ __html: text }} />;
};

export default RichText;
