"use client";

import { useEffect, useState } from "react";

const ICONS = {
  light: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  dark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  auto: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
};

function applyTheme(theme) {
  let resolved = theme;
  if (theme === "system" || theme === null) {
    const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    resolved = dark ? "dark" : "light";
  }
  if (theme !== null) {
    try {
      if (theme === "system") localStorage.removeItem("frox_theme");
      else localStorage.setItem("frox_theme", theme);
    } catch (e) {}
  }
  document.documentElement.dataset.theme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = resolved === "dark" ? "#07070a" : "#ffffff";
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    let stored = "system";
    try {
      stored = localStorage.getItem("frox_theme") || "system";
    } catch (e) {}
    setTheme(stored);
    applyTheme(stored);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      setTheme(stored);
      if (stored === "system") applyTheme("system");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const cycle = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${theme}. Click to change.`}
      title={
        theme === "light" ? "Light theme — click for dark"
        : theme === "dark" ? "Dark theme — click for system"
        : "System theme — click for light"
      }
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bgCard text-textDim transition hover:border-border hover:text-text hover:bg-surface ${className}`}
    >
      {ICONS[theme] || ICONS.auto}
    </button>
  );
}