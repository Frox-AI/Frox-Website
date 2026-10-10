"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchPalette from "@/components/SearchPalette";
import Icon from "@/components/Icon";

/* Big editorial links on the left of a panel + a dense resource list on the right,
   mirroring the OpenAI / Anthropic mega-menu pattern. */
const MENUS = {
  Product: {
    featured: [
      { href: "/chat", label: "Frox Chat" },
      { href: "/forge", label: "Frox Forge" },
      { href: "/image", label: "Frox Image" },
      { href: "/audio", label: "Frox Voice" },
      { href: "/code", label: "Frox Code" },
      { href: "/3d", label: "Frox 3D" },
    ],
    columns: [
      {
        title: "Explore",
        links: [
          { href: "/models", label: "Models" },
          { href: "/templates", label: "Prompt library" },
          { href: "/changelog", label: "Changelog" },
          { href: "/blog", label: "Blog" },
        ],
      },
    ],
  },
  Developers: {
    featured: [
      { href: "/developers", label: "Overview" },
      { href: "/docs", label: "Documentation" },
      { href: "/pricing", label: "Pricing" },
      { href: "/status", label: "Status" },
    ],
    columns: [
      {
        title: "Resources",
        links: [
          { href: "/docs", label: "API reference" },
          { href: "/download", label: "SDKs" },
          { href: "/docs#quickstart", label: "Quickstart" },
          { href: "/changelog", label: "Changelog" },
          { href: "/security", label: "Security" },
        ],
      },
    ],
  },
  Company: {
    featured: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "News" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
    columns: [
      {
        title: "More",
        links: [
          { href: "/faq", label: "FAQ" },
          { href: "/press", label: "Press" },
          { href: "/legal/privacy", label: "Privacy" },
          { href: "/legal/terms", label: "Terms" },
        ],
      },
    ],
  },
};

const TOP_LINKS = [
  { href: "/models", label: "Models" },
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
];

function Caret({ open }) {
  return (
    <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobile(false); setOpenMenu(null); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && pathname !== "/chat") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname]);

  const open = (name) => { clearTimeout(closeTimer.current); setOpenMenu(name); };
  const close = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140); };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? "bg-bg/85 backdrop-blur-xl border-b border-ink/[0.07]" : "border-b border-transparent"}`}>
      <div className="container-x h-[60px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-2 pr-4 shrink-0" aria-label="Frox Studio home">
            <span className="w-[26px] h-[26px] rounded-[7px] grad-bg grid place-items-center text-white text-[11px] font-bold">F</span>
            <span className="font-semibold text-[16px] tracking-tight">Frox</span>
          </Link>

          <nav className="hidden lg:flex items-center">
            {Object.entries(MENUS).map(([name, menu]) => (
              <div key={name} className="relative" onMouseEnter={() => open(name)} onMouseLeave={close}>
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[14px] transition-colors ${openMenu === name ? "text-text" : "text-textDim hover:text-text"}`}
                  aria-expanded={openMenu === name}
                >
                  {name}
                  <Caret open={openMenu === name} />
                </button>
                {openMenu === name && (
                  <div className="absolute left-0 top-full pt-3 w-[560px]">
                    <div className="mega p-6 grid grid-cols-[1.1fr_1fr] gap-8 animate-fade-up" style={{ animationDuration: ".2s" }}>
                      <div className="space-y-1">
                        {menu.featured.map((f) => (
                          <Link
                            key={f.href}
                            href={f.href}
                            className="block text-[19px] font-medium tracking-tight text-textDim hover:text-text transition-colors leading-snug py-0.5"
                          >
                            {f.label}
                          </Link>
                        ))}
                      </div>
                      {menu.columns.map((col) => (
                        <div key={col.title}>
                          <p className="kicker mb-3">{col.title}</p>
                          <ul className="space-y-2.5">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="text-[13.5px] text-textDim hover:text-text transition-colors inline-flex items-center gap-1">
                                  {l.label}
                                  <Icon name="chevronRight" size={12} className="opacity-50" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {TOP_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-[14px] transition-colors ${pathname === l.href ? "text-text" : "text-textDim hover:text-text"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:grid place-items-center w-8 h-8 rounded-full text-textDim hover:text-text hover:bg-ink/[0.06] transition-colors"
            aria-label="Search"
          >
            <Icon name="search" size={16} />
          </button>
          <ThemeToggle />
          <Link href="/auth/login" className="hidden sm:inline-flex items-center gap-1 h-8 px-3.5 rounded-full border border-ink/[0.12] text-[13.5px] font-medium hover:bg-ink/[0.05] transition-colors">
            Log in
            <Icon name="chevronRight" size={12} className="opacity-60 -rotate-90" />
          </Link>
          <Link href="/chat" className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-ink text-bg text-[13.5px] font-medium hover:opacity-90 transition-opacity">
            Try Frox
            <Icon name="chevronRight" size={12} className="opacity-70" />
          </Link>
          <button className="lg:hidden w-8 h-8 grid place-items-center rounded-md hover:bg-ink/[0.06]" onClick={() => setMobile(!mobile)} aria-label="Menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {mobile ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      {mobile && (
        <div className="lg:hidden bg-bg border-t border-ink/[0.07] max-h-[80vh] overflow-y-auto">
          <div className="container-x py-6 space-y-6">
            {Object.entries(MENUS).map(([name, menu]) => (
              <div key={name}>
                <p className="kicker mb-2">{name}</p>
                <div className="space-y-1">
                  {menu.featured.map((f) => (
                    <Link key={f.href} href={f.href} className="block py-1.5 text-[17px] font-medium tracking-tight">{f.label}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="rule-x-soft pt-4">
              <div className="space-y-1">
                {TOP_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="block py-1.5 text-[15px] text-textDim">{l.label}</Link>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Link href="/auth/login" className="flex-1 inline-flex items-center justify-center h-10 rounded-full border border-ink/[0.12] text-[14px] font-medium">Log in</Link>
              <Link href="/chat" className="flex-1 inline-flex items-center justify-center h-10 rounded-full bg-ink text-bg text-[14px] font-medium">Try Frox</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
