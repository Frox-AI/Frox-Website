const PATHS = {
  check: ["M20 6 9 17l-5-5"],
  checkCircle:
    ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "m9 11 3 3L22 4"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  shieldCheck: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"],
  search: ["M21 21l-4.35-4.35", "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"],
  globe: [
    "M2 12h20",
    "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  ],
  lock: ["M7 11V7a5 5 0 0 1 10 0v4", "M3 11h18v10H3z"],
  flask: [
    "M10 2v6.5L4.5 18A2.5 2.5 0 0 0 6.7 22h10.6a2.5 2.5 0 0 0 2.2-4L14 8.5V2",
    "M7.5 14h9",
    "M8.5 2h7",
  ],
  terminal: ["m4 17 6-6-6-6", "M12 19h8"],
  braces: ["M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"],
  lightbulb: ["M15 14h.01M9 18h6M10 22h4", "M12 2a7 7 0 0 0-4.2 12.6c.6.5 1 1.4 1 2.4h6.4c0-1 .4-1.9 1-2.4A7 7 0 0 0 12 2z"],
  pen: ["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"],
  code: ["m16 18 6-6-6-6", "M8 6l-6 6 6 6"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  fileText: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M8 13h8", "M8 17h5"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  refresh: ["M21 12a9 9 0 1 1-2.64-6.36", "M21 3v6h-6"],
  sparkles: ["M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z"],
  cornerDownRight: ["m15 10 5 5-5 5", "M4 4v7a4 4 0 0 0 4 4h12"],
  download: ["M12 3v12", "m7 10 5 5 5-5", "M5 21h14"],
  monitor: ["M3 4h18v12H3z", "M8 20h8", "M12 16v4"],
  smartphone: ["M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", "M11 18h2"],
  image: ["M3 4h18v16H3z", "M8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z", "m21 16-5-5L5 20"],
  cube: ["M12 2 21 8v8l-9 5-9-5V8z", "M3.5 8 12 13l8.5-5", "M12 12v9"],
  waveform: ["M3 12h2M8 4v16M12 7v10M16 4v16M20 12h1"],
};

const ICONS = Object.fromEntries(
  Object.entries(PATHS).map(([name, paths]) => [
    name,
    function Icon({ size = 16, className = "", ...props }) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>
      );
    },
  ])
);

export default function Icon({ name, ...props }) {
  const C = ICONS[name] || ICONS.check;
  return <C {...props} />;
}

export const LANG_BADGES = {
  Python: { label: "Py", className: "from-amber-400 to-blue-500" },
  JavaScript: { label: "JS", className: "from-yellow-300 to-yellow-600 text-black" },
  TypeScript: { label: "TS", className: "from-blue-400 to-blue-600" },
  Rust: { label: "Rs", className: "from-orange-400 to-red-500" },
  Go: { label: "Go", className: "from-cyan-400 to-cyan-600" },
  Java: { label: "Jv", className: "from-red-400 to-orange-500" },
  "C++": { label: "C++", className: "from-blue-500 to-indigo-600" },
  Swift: { label: "Sw", className: "from-orange-400 to-pink-500" },
  JSON: { label: "{" , className: "from-zinc-400 to-zinc-600" },
  Markdown: { label: "M↓", className: "from-zinc-300 to-zinc-500" },
};

export function LangBadge({ lang, size = "md" }) {
  const meta = LANG_BADGES[lang];
  if (!meta) return null;
  const dims = size === "sm" ? "h-5 w-5 text-[9px] rounded-[5px]" : "h-8 w-8 text-[11px] rounded-lg";
  return (
    <span className={`grid place-items-center font-bold bg-gradient-to-br text-white ${meta.className} ${dims} shrink-0`} aria-hidden="true">
      {meta.label}
    </span>
  );
}