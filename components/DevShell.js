"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Mark } from "@/components/Brand";

const NAV = [
  { href: "/developers", label: "Overview" },
  { href: "/docs", label: "API Reference" },
  { href: "/download", label: "SDKs" },
  { href: "/status", label: "Status" },
];

export default function DevShell({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = "#0a0a0c";
    return () => {
      try {
        const t = localStorage.getItem("frox_theme");
        const dark = t === "dark" || ((!t || t === "system") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.dataset.theme = dark ? "dark" : "light";
      } catch { /* ignore */ }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#e4e4e7]">
      <header className="fixed top-0 inset-x-0 z-50 h-12 border-b border-white/[0.07] bg-[#0a0a0c]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/developers" className="flex items-center gap-2 font-mono text-[13px] font-semibold tracking-tight text-white">
              <Mark size={16} />
              frox<span className="text-[#10a37f]">/</span>dev
            </Link>
            <nav className="hidden sm:flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-2.5 py-1 rounded-md text-[12.5px] font-mono transition-colors ${
                    pathname.startsWith(n.href) ? "text-white bg-white/[0.08]" : "text-[#8b8b95] hover:text-[#c4c4cc]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/chat" className="font-mono text-[12px] text-[#8b8b95] hover:text-white transition-colors">
              → Try the API
            </Link>
            <Link
              href="/auth/signup"
              className="font-mono text-[12px] px-3 py-1.5 rounded-md bg-[#10a37f] text-white hover:bg-[#0e8f70] transition-colors"
            >
              Get API key
            </Link>
          </div>
        </div>
      </header>

      {/* Dev-platform backdrop: same motion language as the marketing site but
          tuned to the dark shell, so the section feels related yet distinct. */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 grid-bg grid-drift opacity-[0.35]" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full blur-[130px] opacity-30"
          style={{ background: "radial-gradient(closest-side, rgba(16,163,127,.35), transparent 70%)" }}
        />
        <div className="aurora w-[380px] h-[380px] opacity-25" style={{ background: "rgba(16,163,127,.20)", top: "18%", left: "6%" }} />
        <div
          className="aurora w-[320px] h-[320px] opacity-20"
          style={{ background: "rgba(124,107,255,.18)", top: "46%", right: "8%", animationDelay: "3.5s" }}
        />
        <div className="absolute inset-0 noise opacity-[0.05]" />
      </div>

      <div className="flex-1 pt-12 relative">{children}</div>

      <footer className="border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-[11.5px] text-[#63636f]">
            <Link href="/" className="text-[#8b8b95] hover:text-white transition-colors">← froxstudio.ai</Link>
            <span className="mx-2 text-[#2a2a32]">|</span> Developer platform
          </div>
          <div className="flex items-center gap-4 font-mono text-[11.5px] text-[#63636f]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10a37f]" />
              All systems operational
            </span>
            <Link href="/docs" className="hover:text-[#8b8b95] transition-colors">Docs</Link>
            <Link href="/security" className="hover:text-[#8b8b95] transition-colors">Security</Link>
            <Link href="/legal/terms" className="hover:text-[#8b8b95] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
