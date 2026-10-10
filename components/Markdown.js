"use client";
import { Fragment } from "react";

function inline(text, keyPrefix = "i") {
  const parts = [];
  let remaining = text;

  const tokenRe = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  let idx = 0;
  while ((m = tokenRe.exec(remaining))) {
    if (m.index > last) parts.push({ type: "text", value: remaining.slice(last, m.index) });
    const tok = m[0];
    if (tok.startsWith("**")) parts.push({ type: "bold", value: tok.slice(2, -2) });
    else if (tok.startsWith("`")) parts.push({ type: "code", value: tok.slice(1, -1) });
    else if (tok.startsWith("*") && !tok.startsWith("**")) parts.push({ type: "italic", value: tok.slice(1, -1) });
    else {
      const link = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok);
      parts.push({ type: "link", label: link[1], href: link[2] });
    }
    last = m.index + tok.length;
    idx++;
  }
  if (last < remaining.length) parts.push({ type: "text", value: remaining.slice(last) });

  return (
    <Fragment key={keyPrefix + Math.random()}>
      {parts.map((p, i) => {
        if (p.type === "bold") return <strong key={i}>{p.value}</strong>;
        if (p.type === "italic") return <em key={i}>{p.value}</em>;
        if (p.type === "code")
          return (
            <code key={i} className="font-mono text-[0.88em] bg-white/[0.07] border border-white/[0.08] px-1.5 py-0.5 rounded">
              {p.value}
            </code>
          );
        if (p.type === "link")
          return (
            <a key={i} href={p.href} target="_blank" rel="noreferrer" className="text-accent2 underline underline-offset-2 hover:opacity-80">
              {p.label}
            </a>
          );
        return <Fragment key={i}>{p.value}</Fragment>;
      })}
    </Fragment>
  );
}

export default function Markdown({ text }) {
  const lines = (text || "").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ type: "code", lang, value: code.join("\n") });
    } else if (/^(-|\d+\.)\s/.test(line)) {
      const items = [];
      let ordered = false;
      while (i < lines.length && /^(-|\d+\.)\s/.test(lines[i])) {
        ordered = !lines[i].startsWith("-");
        items.push(lines[i].replace(/^(\d+\.|-)\s/, ""));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
    } else if (/^#{1,4}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      blocks.push({ type: "heading", level, value: line.replace(/^#+\s/, "") });
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("```") && !/^(-|\d+\.)\s/.test(lines[i]) && !/^#{1,4}\s/.test(lines[i])) {
        para.push(lines[i]);
        i++;
      }
      blocks.push({ type: "p", value: para.join(" ").replace(/\s{2,}/g, " ") });
    }
  }

  return (
    <div className="prose-frox text-[15px] leading-[1.72] text-textDim">
      {blocks.map((b, bi) => {
        if (b.type === "code")
          return (
            <pre key={bi}>
              <code>{b.value}</code>
            </pre>
          );
        if (b.type === "heading")
          return (
            <h3 key={bi} className={b.level >= 3 ? "text-[15px]" : "text-[16px]"}>
              {inline(b.value, `${bi}-h`)}
            </h3>
          );
        if (b.type === "list")
          return (
            <ul key={bi} style={{ listStyleType: b.ordered ? "decimal" : "disc" }}>
              {b.items.map((it, ii) => (
                <li key={ii}>{inline(it, `${bi}-${ii}`)}</li>
              ))}
            </ul>
          );
        return <p key={bi}>{inline(b.value, `${bi}-p`)}</p>;
      })}
    </div>
  );
}