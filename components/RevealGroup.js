"use client";
import { useEffect, useRef } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveals children as they scroll into view.
 * Children are staggered automatically unless they opt out with `data-no-stagger`.
 * Content is visible by default when JS has not yet run, so a failed
 * IntersectionObserver (or a disabled observer) can never hide the page.
 */
export default function RevealGroup({
  children,
  as: Tag = "div",
  className = "",
  step = 70,
  max = 420,
  threshold = 0.1,
  from = 22,
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const kids = Array.from(el.children);
    if (!kids.length) return;

    if (prefersReduced()) {
      el.classList.add("is-revealed");
      kids.forEach((k) => k.classList.add("in"));
      return;
    }

    el.classList.add("is-armed");
    let n = 0;
    for (const kid of kids) {
      if (kid.hasAttribute("data-no-stagger")) continue;
      kid.classList.add("reveal");
      kid.style.setProperty("--reveal-from", `${from}px`);
      kid.style.transitionDelay = `${Math.min(n * step, max)}ms`;
      n += 1;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) {
            if (!once) e.target.classList.remove("in");
            continue;
          }
          e.target.classList.add("in");
          if (once) io.unobserve(e.target);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    kids.forEach((k) => io.observe(k));

    return () => io.disconnect();
  }, [step, max, threshold, from, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
