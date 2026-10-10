"use client";

import Link from "next/link";
import { Mark } from "@/components/Brand";
import { useEffect, useRef, useState } from "react";

/* Rotating wordmark used in the brand panel. */
const ROTATING = ["reason", "code", "images", "audio", "3D", "agents"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
      <span key={ROTATING[i]} className="inline-block msg-in" style={{ animationDuration: ".5s" }}>
        {ROTATING[i]}
      </span>
    </span>
  );
}

export default function AuthLayout({ children, title, subtitle, footer }) {
  const panelRef = useRef(null);

  // Pointer parallax on the brand panel orbs (transform-only, rAF-throttled).
  useEffect(() => {
    const root = panelRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = root.querySelectorAll("[data-drift]");
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      layers.forEach((el) => {
        const d = parseFloat(el.dataset.drift) || 12;
        el.style.translate = `${cx * d}px ${cy * d}px`;
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-bg">
      {/* ============ BRAND PANEL (Claude-style editorial) ============ */}
      <div ref={panelRef} className="hidden lg:flex flex-col justify-between p-12 xl:p-16 relative overflow-hidden bg-bgElev border-r border-ink/[0.07]">
        {/* animated backdrop */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full blur-[110px] bg-accent/22 aurora" data-drift="20" />
          <div className="absolute bottom-[-8rem] right-[-6rem] w-[520px] h-[520px] rounded-full blur-[130px] bg-accent2/18 aurora" data-drift="-16" style={{ animationDelay: "3s" }} />
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 noise" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-text hover:opacity-80 transition-opacity w-fit">
            <Mark size={36} />
            <span className="font-semibold text-[17px] tracking-tight">Frox</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-[clamp(2.1rem,3.4vw,3.1rem)] font-bold tracking-[-0.035em] leading-[1.06] text-balance">
            One account for <Rotator />
          </h1>
          <p className="mt-5 text-textDim leading-relaxed">
            Sign in to chat, write code, generate images, audio, and 3D from one place.
            Every model is open-weight — call it here or run it on your own hardware.
          </p>

          <ul className="mt-9 space-y-3.5">
            {[
              "Open weights — download and self-host",
              "OpenAI-compatible — change one base URL",
              "Streaming everywhere, by default",
              "No card required to start",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3 text-[14.5px] text-textDim sug-in" style={{ animationDelay: `${i * 90}ms` }}>
                <span className="w-5 h-5 rounded-full grad-bg grid place-items-center text-white shrink-0 mt-px">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-[13px] text-textFaint">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
          All systems operational
        </div>
      </div>

      {/* ============ FORM PANEL ============ */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-[120px] bg-accent/16 aurora" />
          <div className="absolute inset-0 noise" />
        </div>

        <div className="relative w-full max-w-[400px]">
          <div className="lg:hidden mb-8 flex items-center justify-center gap-2.5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Mark size={32} />
              <span className="font-semibold text-[16px] tracking-tight">Frox</span>
            </Link>
          </div>

          <div className="text-center mb-8 rise">
            <h2 className="text-[clamp(1.6rem,3vw,2rem)] font-bold tracking-[-0.03em]">{title}</h2>
            {subtitle && <p className="mt-2 text-textDim text-[14.5px]">{subtitle}</p>}
          </div>

          {/* asymmetric "peak" card — Claude's signature shape */}
          <div className="relative rise" style={{ animationDelay: ".08s" }}>
            <div className="absolute -inset-px rounded-[20px_20px_20px_6px] grad-border opacity-40" aria-hidden="true" />
            <div className="relative rounded-[20px_20px_20px_6px] border border-ink/[0.09] bg-bgCard p-6 sm:p-7 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px grad-bg" aria-hidden="true" />
              {children}
            </div>
          </div>

          {footer && <div className="mt-6 text-center text-[14px] text-textDim">{footer}</div>}

          <p className="mt-8 text-center text-[12px] text-textFaint">
            By continuing you agree to our{" "}
            <Link href="/legal/terms" className="underline underline-offset-2 hover:text-textDim transition-colors">Terms</Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-textDim transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
