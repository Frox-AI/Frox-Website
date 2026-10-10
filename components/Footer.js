import Link from "next/link";

const COLUMNS = [
  {
    title: "Models",
    links: [
      { label: "Frox Chat", href: "/chat" },
      { label: "Frox Image", href: "/image" },
      { label: "Frox Voice", href: "/audio" },
      { label: "Frox Code", href: "/code" },
      { label: "Frox 3D", href: "/3d" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "SDKs", href: "/download" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/[0.07] mt-24 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] hero-glow opacity-40 pointer-events-none" />
      <div className="container-x relative py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-[17px] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="Frox Studio" className="w-8 h-8 rounded-lg ring-1 ring-ink/10" />
              Frox <span className="text-textDim font-normal">Studio</span>
            </Link>
            <p className="text-sm text-textFaint max-w-xs text-pretty">
              Open-weight AI models and infrastructure for the next generation of applications.
            </p>
            <div className="flex gap-2 mt-5">
              {[
                { label: "GitHub", d: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.7.8.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" },
                { label: "X", d: "M18.9 1.2h3.68l-8.04 9.2L24 22.8h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.2h7.6l5.24 6.93L18.9 1.2zm-1.3 19.4h2L6.5 3.3H4.34l13.26 17.3z" },
                { label: "Hugging Face", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 17c-2.3 0-4.3-1.5-5-3.5h10c-.7 2-2.7 3.5-5 3.5z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 grid place-items-center rounded-lg border border-ink/[0.08] bg-ink/[0.03] text-textDim hover:text-text hover:border-ink/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="text-[12px] uppercase tracking-widest text-textFaint mb-4">{col.title}</h5>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-textDim hover:text-text transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-textFaint">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            All systems operational
          </div>
          <span>© 2026 Frox Studio. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
