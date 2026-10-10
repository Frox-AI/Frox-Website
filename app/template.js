"use client";

import { useEffect, useRef } from "react";

/**
 * Per-route transition wrapper. Next.js re-mounts this on every navigation,
 * which is what makes an enter animation replay per page.
 *
 * It also drives a thin progress bar at the top of the viewport and scrolls
 * to top on navigation, so moving between long pages feels intentional.
 */
export default function Template({ children }) {
  const bar = useRef(null);

  useEffect(() => {
    // Land at the top of the new page rather than preserving the old offset.
    window.scrollTo(0, 0);

    const el = bar.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "0";
      return;
    }

    // Restart the sweep from 0 on every mount.
    el.style.transition = "none";
    el.style.transform = "translateX(-100%)";
    el.style.opacity = "1";
    // Force a reflow so the reset is committed before the transition runs.
    void el.offsetWidth;
    el.style.transition = "transform .7s cubic-bezier(.16,1,.3,1), opacity .3s ease .55s";
    el.style.transform = "translateX(0)";

    const t = setTimeout(() => { el.style.opacity = "0"; }, 850);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* route progress sweep */}
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[200] h-[2px] w-full origin-left opacity-0"
        style={{
          background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
          transform: "translateX(-100%)",
          pointerEvents: "none",
        }}
      />
      <div className="route-enter">{children}</div>
    </>
  );
}
