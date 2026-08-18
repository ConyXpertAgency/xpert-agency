import React from "react";

interface RichTextProps {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "strong" | "em" | "div" | "li";
  className?: string;
  children?: React.ReactNode;
}

const RichText = ({ as: Tag = "span", className, children }: RichTextProps) => {
  const text = children == null ? "" : String(children);
  const cls = [className, "rt"].filter(Boolean).join(" ");
  return <Tag className={cls} dangerouslySetInnerHTML={{ __html: text }} />;
};

export default RichText;
