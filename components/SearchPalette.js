"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const INDEX = [
  { group: "Create", items: [
    { title: "Frox Studio — Chat, Image & Audio", desc: "Unified AI workspace", href: "/chat", icon: "sparkles" },
    { title: "Prompt templates", desc: "12 battle-tested prompts", href: "/templates", icon: "lightbulb" },
    { title: "Image gallery", desc: "Example generations", href: "/image", icon: "image" },
    { title: "Audio studio", desc: "Voice, SFX & music", href: "/audio", icon: "waveform" },
  ]},
  { group: "Product", items: [
    { title: "Models", desc: "Flex, Code, Image — open weights", href: "/models", icon: "flask" },
    { title: "Pricing", desc: "Free tier, Pro, Teams", href: "/pricing", icon: "shield" },
    { title: "Changelog", desc: "What's new", href: "/changelog", icon: "refresh" },
    { title: "Roadmap", desc: "What's next", href: "/roadmap", icon: "search" },
    { title: "Security", desc: "Practices & reporting", href: "/security", icon: "shieldCheck" },
    { title: "Status", desc: "Live system status", href: "/status", icon: "checkCircle" },
  ]},
  { group: "Developers", items: [
    { title: "Developer hub", desc: "Quickstart & API reference", href: "/developers", icon: "code" },
    { title: "Documentation", desc: "Guides & API docs", href: "/docs", icon: "book" },
    { title: "SDK downloads", desc: "Python, JS, Go, Rust", href: "/download", icon: "download" },
    { title: "Code workspace", desc: "AI-assisted editor", href: "/code", icon: "terminal" },
  ]},
  { group: "Company", items: [
    { title: "About", desc: "Mission & team", href: "/about", icon: "globe" },
    { title: "Blog", desc: "Research & updates", href: "/blog", icon: "fileText" },
    { title: "Careers", desc: "Open roles", href: "/careers", icon: "pen" },
    { title: "Press kit", desc: "Brand assets", href: "/press", icon: "image" },
    { title: "Contact", desc: "Talk to us", href: "/contact", icon: "file" },
  ]},
  { group: "Account", items: [
    { title: "Dashboard", desc: "Usage & activity", href: "/dashboard", icon: "monitor" },
    { title: "Settings", desc: "Profile, appearance, data", href: "/settings", icon: "check" },
    { title: "FAQ", desc: "Common questions", href: "/faq", icon: "lightbulb" },
    { title: "Help center", desc: "Guides & support", href: "/help", icon: "book" },
  ]},
];

const ICONS = {
  sparkles: "M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z",
  lightbulb: "M15 14h.01M9 18h6M10 22h4M12 2a7 7 0 0 0-4.2 12.6c.6.5 1 1.4 1 2.4h6.4c0-1 .4-1.9 1-2.4A7 7 0 0 0 12 2z",
  image: "M3 4h18v16H3zM8.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM21 16l-5-5L5 20",
  waveform: "M3 12h2M8 4v16M12 7v10M16 4v16M20 12h1",
  flask: "M10 2v6.5L4.5 18A2.5 2.5 0 0 0 6.7 22h10.6a2.5 2.5 0 0 0 2.2-4L14 8.5V2M7.5 14h9M8.5 2h7",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  refresh: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6",
  search: "M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M9 11l3 3L22 4",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M5 21h14",
  terminal: "M4 17l6-6-6-6M12 19h8",
  globe: "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  pen: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  check: "M20 6 9 17l-5-5",
};

function score(item, q) {
  const t = item.title.toLowerCase();
  const d = item.desc.toLowerCase();
  if (t === q) return 3;
  if (t.startsWith(q)) return 2;
  if (t.includes(q)) return 1;
  if (d.includes(q)) return 0.5;
  return -1;
}

export default function SearchPalette({ open, onClose }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      try { setRecent(JSON.parse(localStorage.getItem("frox_recent_searches") || "[]")); } catch { setRecent([]); }
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const flat = [];
    for (const g of INDEX) {
      for (const it of g.items) {
        const s = score(it, query);
        if (s >= 0) flat.push({ ...it, group: g.group, s });
      }
    }
    return flat.sort((a, b) => b.s - a.s).slice(0, 12);
  }, [q]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of results) {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group).push(r);
    }
    return [...map.entries()];
  }, [results]);

  const go = (item) => {
    if (item) {
      const next = [item.href, ...recent.filter((h) => h !== item.href)].slice(0, 5);
      try { localStorage.setItem("frox_recent_searches", JSON.stringify(next)); } catch { /* ignore */ }
      onClose();
      router.push(item.href);
    }
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (results.length) setActive(0);
  }, [results.length]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-ink/10 bg-bgCard shadow-card overflow-hidden"
        style={{ animation: "rise .3s cubic-bezier(.16,1,.3,1) both" }}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-ink/[0.06]">
          <svg className="w-4.5 h-4.5 w-[18px] h-[18px] text-textFaint shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search pages, features, docs…"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-textFaint"
          />
          <kbd className="text-[10.5px] font-mono text-textFaint border border-ink/10 bg-ink/[0.04] rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {q.trim() === "" && (
            <div className="p-2">
              <p className="px-2 pb-2 text-[11px] uppercase tracking-widest text-textFaint">Recent</p>
              {recent.length === 0 ? (
                <p className="px-2 py-3 text-[13px] text-textFaint">Try searching for "pricing", "API", "models", or "templates".</p>
              ) : (
                recent.map((href) => {
                  const item = INDEX.flatMap((g) => g.items).find((i) => i.href === href);
                  if (!item) return null;
                  return (
                    <button
                      key={href}
                      onClick={() => go(item)}
                      className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-ink/[0.05] text-left transition-colors"
                    >
                      <svg className="w-4 h-4 text-textFaint shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[14px] text-textDim">{item.title}</span>
                    </button>
                  );
                })
              )}
            </div>
          )}

          {q.trim() !== "" && grouped.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-[14px] text-textDim">No results for “{q}”</p>
              <p className="text-[12.5px] text-textFaint mt-1">Try a different keyword, or browse the docs.</p>
            </div>
          )}

          {grouped.map(([group, items]) => (
            <div key={group} className="p-2">
              <p className="px-2 pb-1 text-[11px] uppercase tracking-widest text-textFaint">{group}</p>
              {items.map((it) => {
                flatIdx += 1;
                const idx = flatIdx;
                return (
                  <button
                    key={it.href}
                    data-idx={idx}
                    onClick={() => go(it)}
                    onMouseEnter={() => setActive(idx)}
                    className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-left transition-colors ${idx === active ? "bg-ink/[0.07]" : ""}`}
                  >
                    <span className={`w-8 h-8 rounded-lg border grid place-items-center shrink-0 ${idx === active ? "border-accent/30 text-accent" : "border-ink/10 text-textFaint"}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                        <path d={ICONS[it.icon] || ICONS.search} />
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14px] font-medium truncate">{it.title}</span>
                      <span className="block text-[12px] text-textFaint truncate">{it.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 px-4 h-10 border-t border-ink/[0.06] text-[11px] text-textFaint">
          <span className="flex items-center gap-1.5">
            <kbd className="border border-ink/10 bg-ink/[0.04] rounded px-1 py-px font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="border border-ink/10 bg-ink/[0.04] rounded px-1 py-px font-mono">↵</kbd> open
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="border border-ink/10 bg-ink/[0.04] rounded px-1 py-px font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
