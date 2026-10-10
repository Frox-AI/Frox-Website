"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const MENUS = {
  Product: [
    { href: "/chat", label: "Frox Chat", desc: "Converse with frontier models", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.26-.95L3 20l1.4-3.72A7.96 7.96 0 013 12c0-4.42 4.03-8 9-8s9 3.58 9 8z" },
    { href: "/image", label: "Frox Image", desc: "Generate stunning visuals", icon: "M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { href: "/audio", label: "Frox Voice", desc: "Speech, SFX & music", icon: "M19 11a7 7 0 01-14 0M12 18v4m-4 0h8M12 3a4 4 0 00-4 4v5a4 4 0 008 0V7a4 4 0 00-4-4z" },
    { href: "/code", label: "Frox Code", desc: "Write & ship faster", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { href: "/3d", label: "Frox 3D", desc: "Text & image to 3D", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" },
  ],
  Developers: [
    { href: "/docs", label: "Documentation", desc: "Guides and API reference", icon: "M12 6.25A2.25 2.25 0 0013.5 8.5H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h5.5A2.25 2.25 0 0012 6.25zM12 3v3.25" },
    { href: "/download", label: "SDKs", desc: "Python, JS, Go & more", icon: "M12 10v6m0 0l-3-3m3 3l3-3M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" },
    { href: "/pricing", label: "Pricing", desc: "Plans for every team", icon: "M12 8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8c1.11 0 2.08.4 2.6 1M12 8V7m0 9v1m0-1c-1.11 0-2.08-.4-2.6-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/changelog", label: "Changelog", desc: "What's new", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  ],
  Company: [
    { href: "/about", label: "About", desc: "Our mission & team", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/blog", label: "Blog", desc: "Research and updates", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
    { href: "/careers", label: "Careers", desc: "Join the team", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { href: "/contact", label: "Contact", desc: "Talk to us", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ],
};

function Caret({ open }) {
  return (
    <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobile(false); setOpenMenu(null); }, [pathname]);

  const open = (name) => { clearTimeout(closeTimer.current); setOpenMenu(name); };
  const close = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 120); };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-ink/[0.07]" : "border-b border-transparent"}`}>
      <div className="container-x h-16 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-[17px] tracking-tight pr-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="Frox Studio" className="w-8 h-8 rounded-lg ring-1 ring-ink/10" />
            Frox <span className="text-textDim font-normal">Studio</span>
          </Link>

          <nav className="hidden lg:flex items-center">
            {Object.entries(MENUS).map(([name, items]) => (
              <div key={name} className="relative" onMouseEnter={() => open(name)} onMouseLeave={close}>
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14.5px] font-medium transition-colors ${openMenu === name ? "text-text bg-ink/[0.06]" : "text-textDim hover:text-text"}`}
                >
                  {name}
                  <Caret open={openMenu === name} />
                </button>
                {openMenu === name && (
                  <div className="absolute left-0 top-full pt-2 w-[340px]">
                    <div className="glass border border-ink/10 rounded-2xl p-2 shadow-card animate-fade-up">
                      {items.map((it) => (
                        <Link key={it.href} href={it.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-ink/[0.06] transition-colors">
                          <span className="w-9 h-9 rounded-lg bg-ink/[0.05] border border-ink/[0.08] grid place-items-center shrink-0">
                            <svg className="w-4.5 h-4.5 text-accent" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={it.icon} />
                            </svg>
                          </span>
                          <span>
                            <span className="block text-[14.5px] font-medium">{it.label}</span>
                            <span className="block text-[12.5px] text-textFaint leading-snug">{it.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/pricing" className={`px-3.5 py-2 rounded-lg text-[14.5px] font-medium transition-colors ${pathname === "/pricing" ? "text-text bg-ink/[0.06]" : "text-textDim hover:text-text"}`}>
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/auth/login" className="hidden sm:inline-flex btn-ghost">Log in</Link>
          <Link href="/chat" className="btn-primary !px-5 !py-2.5 text-sm">Start building</Link>
          <button className="lg:hidden w-9 h-9 grid place-items-center rounded-lg hover:bg-ink/[0.06]" onClick={() => setMobile(!mobile)} aria-label="Menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {mobile ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {mobile && (
        <div className="lg:hidden glass border-t border-ink/[0.07] max-h-[80vh] overflow-y-auto">
          <div className="container-x py-4 space-y-4">
            {Object.entries(MENUS).map(([name, items]) => (
              <div key={name}>
                <p className="text-[11px] uppercase tracking-widest text-textFaint px-2 mb-1">{name}</p>
                {items.map((it) => (
                  <Link key={it.href} href={it.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink/[0.06]">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={it.icon} />
                    </svg>
                    <span className="text-[15px]">{it.label}</span>
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/auth/login" className="btn-secondary flex-1">Log in</Link>
              <Link href="/chat" className="btn-primary flex-1">Start building</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
