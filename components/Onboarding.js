"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "frox_onboarded_v1";

const STEPS = [
  {
    icon: "sparkles",
    title: "Welcome to Frox Studio",
    body: "One workspace for chat, image, and audio — powered by open-weight models. Let's get you set up in three quick steps.",
    points: ["Chat with frontier models", "Generate images from text", "Create audio & sound effects"],
  },
  {
    icon: "code",
    title: "Bring your own key, or start free",
    body: "Every account gets $10 in free credit. When you're ready, add your Hugging Face token in Settings to route requests to the real model weights.",
    points: ["Works out of the box in demo mode", "Drop-in OpenAI-compatible API", "Open weights — no lock-in"],
  },
  {
    icon: "keyboard",
    title: "Power-user shortcuts",
    body: "A few shortcuts worth knowing before you dive in.",
    points: ["/ focuses the composer", "⌘K starts a new chat", "Shift+Enter adds a newline", "Esc closes menus"],
  },
];

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let onboarded = false;
    let fromSignup = false;
    try {
      onboarded = localStorage.getItem(STORAGE_KEY) === "1";
      fromSignup = new URLSearchParams(window.location.search).get("onboard") === "1";
    } catch { /* ignore */ }
    if (!onboarded || fromSignup) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("onboard")) {
      window.history.replaceState(null, "", "/chat");
    }
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 350);
  };

  if (!visible) return null;

  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${leaving ? "opacity-0" : "opacity-100"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Frox"
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

      <div
        className={`relative w-full max-w-md rounded-3xl border border-ink/10 bg-bgCard shadow-card overflow-hidden transition-all duration-300 ${leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        style={{ animation: "rise .5s cubic-bezier(.16,1,.3,1) both" }}
      >
        <div className="h-1 grad-bg" />

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-11 h-11 rounded-2xl grad-bg grid place-items-center text-white shadow-glow shrink-0">
              <Icon name={s.icon} size={20} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-textFaint">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>

          <h2 className="text-[22px] font-bold tracking-tight text-balance">{s.title}</h2>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-textDim text-pretty">{s.body}</p>

          <ul className="mt-5 space-y-2.5">
            {s.points.map((p, i) => (
              <li
                key={p}
                className="flex items-center gap-3 text-[14px] text-text"
                style={{ animation: `dropIn .4s cubic-bezier(.16,1,.3,1) ${150 + i * 80}ms both` }}
              >
                <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 grid place-items-center shrink-0">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-accent" : "w-1.5 bg-ink/15 hover:bg-ink/25"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {!last && (
                <button onClick={close} className="btn-ghost text-[13.5px]">
                  Skip
                </button>
              )}
              <button
                onClick={() => (last ? close() : setStep(step + 1))}
                className="btn-primary !px-5 !py-2.5 text-[14px]"
              >
                {last ? "Start creating" : "Continue"}
                {!last && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon({ name, size = 16 }) {
  const PATHS = {
    sparkles: ["M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z"],
    code: ["m16 18 6-6-6-6", "M8 6l-6 6 6 6"],
    keyboard: [
      "M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      "M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6",
    ],
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(PATHS[name] || PATHS.sparkles).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
