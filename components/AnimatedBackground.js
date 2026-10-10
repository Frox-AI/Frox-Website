"use client";

import { useEffect, useRef } from "react";

/**
 * Layered animated backdrop. Everything is fixed/absolute and pointer-events-none,
 * so it never intercepts clicks or affects layout.
 *
 * variant:
 *   "hero"  — aurora orbs + drifting grid + grain, brightest
 *   "soft"  — two slow orbs, used behind mid-page sections
 *   "panel" — contained conic sheen for cards / CTA blocks
 */
export default function AnimatedBackground({ variant = "hero", className = "" }) {
  const ref = useRef(null);

  // Pointer parallax: orbs drift a few px toward the cursor. Transform-only,
  // rAF-throttled, and disabled for reduced-motion users.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = root.querySelectorAll("[data-parallax]");
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.parallax) || 10;
        el.style.translate = `${cx * depth}px ${cy * depth}px`;
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (variant === "panel") {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <div className="absolute -inset-1/2 conic-sheen opacity-70" />
        <div className="absolute inset-0 noise" />
      </div>
    );
  }

  if (variant === "soft") {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <div
          className="absolute w-[420px] h-[420px] rounded-full aurora bg-violet-500/25 top-[10%] left-[6%]"
          data-parallax="14"
        />
        <div
          className="absolute w-[380px] h-[380px] rounded-full aurora bg-cyan-500/20 bottom-[0%] right-[8%]"
          data-parallax="-10"
          style={{ animationDelay: "4s" }}
        />
        <div className="absolute inset-0 noise" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* soft colour wash */}
      <div className="absolute top-[-14rem] left-1/2 -translate-x-1/2 w-[1200px] h-[760px] hero-glow glow-breathe" />
      {/* drifting grid */}
      <div className="absolute inset-x-0 top-0 h-[680px] grid-bg grid-drift opacity-60" />
      {/* parallax aurora orbs */}
      <div className="aurora w-[440px] h-[440px] bg-violet-600/30 top-[6%] left-[6%]" data-parallax="18" />
      <div className="aurora w-[400px] h-[400px] bg-cyan-500/22 top-[30%] right-[4%]" data-parallax="-14" style={{ animationDelay: "3s" }} />
      <div className="aurora w-[340px] h-[340px] bg-fuchsia-500/18 bottom-[4%] left-[38%]" data-parallax="8" style={{ animationDelay: "6s" }} />
      {/* orbiting ring */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[720px] h-[720px] orbit-ring" />
      {/* film grain ties the layers together */}
      <div className="absolute inset-0 noise" />
    </div>
  );
}
