"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "general", label: "General" },
  { id: "personalization", label: "Personalization" },
  { id: "data", label: "Data controls" },
  { id: "security", label: "Security" },
  { id: "api", label: "API keys" },
  { id: "billing", label: "Billing" },
];

function hexToRgbTriplet(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return "124 107 255";
  return `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}`;
}

function applyAccent(hex) {
  const root = document.documentElement;
  root.style.setProperty("--accent-rgb", hexToRgbTriplet(hex));
  root.style.setProperty("--accent", hex);
}

const ACCENTS = [
  { label: "Default", css: "#7c6bff" },
  { label: "Blue", css: "#0285ff" },
  { label: "Green", css: "#10a37f" },
  { label: "Yellow", css: "#d97706" },
  { label: "Pink", css: "#db2777" },
  { label: "Orange", css: "#ea580c" },
  { label: "Purple", css: "#9333ea" },
  { label: "Black", css: "#18181b" },
];

function Toggle({ enabled, onChange, label }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0 ${
        enabled ? "bg-accent" : "bg-ink/[0.14] border border-ink/[0.1]"
      }`}
    >
      <span
        className="absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white transition-transform duration-200"
        style={{ transform: enabled ? "translateX(16px)" : "translateX(0)" }}
      />
    </button>
  );
}

function Row({ label, desc, control, last }) {
  return (
    <div className={`py-3.5 flex items-center justify-between gap-6 ${last ? "" : "border-b border-ink/[0.06]"}`}>
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-text">{label}</p>
        {desc && <p className="text-[12.5px] text-textFaint mt-0.5 leading-snug">{desc}</p>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function Stepper({ value, onChange, min = 12, max = 20 }) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 grid place-items-center rounded-md text-textFaint hover:bg-ink/[0.06] hover:text-text transition-colors"
        aria-label="Decrease"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M5 12h14" /></svg>
      </button>
      <span className="w-9 text-center text-[12.5px] font-mono text-textDim">{value}px</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 grid place-items-center rounded-md text-textFaint hover:bg-ink/[0.06] hover:text-text transition-colors"
        aria-label="Increase"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-ink/10 bg-ink/[0.03] p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors capitalize ${
            value === o.id ? "bg-ink/[0.09] text-text shadow-sm" : "text-textFaint hover:text-textDim"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ChatSettings({ open, onClose }) {
  const [section, setSection] = useState("general");
  const [cfg, setCfg] = useState({
    theme: "system",
    accent: "#7c6bff",
    fontSize: 15,
    personality: "friendly",
    instructions: "",
    training: false,
    memories: true,
    twoFA: false,
    autoTitle: true,
  });

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem("frox_chat_settings");
      if (raw) {
        const saved = JSON.parse(raw);
        setCfg((c) => ({ ...c, ...saved }));
        if (saved.accent) applyAccent(saved.accent);
      }
    } catch { /* ignore */ }
  }, [open]);

  if (!open) return null;

  const set = (patch) => {
    const next = { ...cfg, ...patch };
    setCfg(next);
    try { localStorage.setItem("frox_chat_settings", JSON.stringify(next)); } catch { /* ignore */ }
    if (patch.accent) applyAccent(patch.accent);
    if (patch.theme) {
      const root = document.documentElement;
      const dark = patch.theme === "dark" || (patch.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      root.setAttribute("data-theme", dark ? "dark" : "light");
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl h-[min(640px,88vh)] rounded-2xl border border-ink/10 bg-bg shadow-card overflow-hidden flex flex-col"
        style={{ animation: "rise .28s cubic-bezier(.16,1,.3,1) both" }}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-ink/[0.07] shrink-0">
          <h2 className="text-[16px] font-semibold">Settings</h2>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg text-textFaint hover:text-text hover:bg-ink/[0.06] transition-colors" aria-label="Close settings">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 flex min-h-0">
          <nav className="w-44 shrink-0 border-r border-ink/[0.07] p-2 overflow-y-auto hidden sm:block">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  section === s.id ? "bg-ink/[0.08] text-text" : "text-textDim hover:text-text hover:bg-ink/[0.04]"
                }`}
              >
                {s.label}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-ink/[0.06] px-1">
              <Link href="/settings" className="block px-2 py-1.5 text-[12px] text-textFaint hover:text-accent transition-colors">
                Account settings →
              </Link>
            </div>
          </nav>

          <div className="flex-1 overflow-y-auto p-6 min-w-0">
            {section === "general" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">General</h3>
                <p className="text-[13px] text-textFaint mb-5">Core preferences for this app.</p>

                <Row label="Theme" desc="Light, dark, or match your system" control={
                  <Segmented value={cfg.theme} onChange={(v) => set({ theme: v })} options={[{ id: "light", label: "Light" }, { id: "dark", label: "Dark" }, { id: "system", label: "System" }]} />
                } />
                <Row label="Accent color" control={
                  <div className="flex items-center gap-1.5 flex-wrap justify-end max-w-[190px]">
                    {ACCENTS.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => set({ accent: a.css })}
                        title={a.label}
                        aria-label={`Accent ${a.label}`}
                        className={`w-5 h-5 rounded-full grid place-items-center transition-transform hover:scale-110 ${cfg.accent === a.css ? "ring-2 ring-offset-1 ring-offset-bg ring-ink/40" : ""}`}
                        style={{ background: a.css }}
                      >
                        {cfg.accent === a.css && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                } />
                <Row label="Text size" desc="Size of message text" control={<Stepper value={cfg.fontSize} onChange={(v) => set({ fontSize: v })} />} last />
              </div>
            )}

            {section === "personalization" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">Personalization</h3>
                <p className="text-[13px] text-textFaint mb-5">How Frox responds to you.</p>

                <Row label="Personality" desc="Default tone for new chats" control={
                  <Segmented value={cfg.personality} onChange={(v) => set({ personality: v })} options={[{ id: "friendly", label: "Friendly" }, { id: "pragmatic", label: "Pragmatic" }, { id: "none", label: "None" }]} />
                } />
                <Row label="Custom instructions" desc="Applied to every new conversation" control={
                  <span className="text-[12px] text-textFaint">Enabled</span>
                } />
                <div className="mt-4">
                  <textarea
                    className="w-full px-3.5 py-3 rounded-xl text-[13px] bg-ink/[0.03] border border-ink/[0.08] outline-none focus:border-accent/50 transition-colors resize-none"
                    rows={5}
                    placeholder="e.g. Answer concisely. Prefer TypeScript examples. Always mention tradeoffs."
                    value={cfg.instructions}
                    onChange={(e) => set({ instructions: e.target.value })}
                  />
                </div>
              </div>
            )}

            {section === "data" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">Data controls</h3>
                <p className="text-[13px] text-textFaint mb-5">Manage how your data is used.</p>

                <Row
                  label="Improve the model for everyone"
                  desc="When off, your chats are never used for training. They still appear in your history."
                  control={<Toggle enabled={cfg.training} onChange={() => set({ training: !cfg.training })} label="Improve the model for everyone" />}
                />
                <Row
                  label="Memory"
                  desc="Let Frox carry useful context from past chats into future ones."
                  control={<Toggle enabled={cfg.memories} onChange={() => set({ memories: !cfg.memories })} label="Memory" />}
                />
                <Row
                  label="Archive chats automatically"
                  desc="Move inactive chats out of your sidebar after 30 days."
                  control={<Toggle enabled={cfg.autoTitle} onChange={() => set({ autoTitle: !cfg.autoTitle })} label="Archive chats automatically" />}
                  last
                />

                <div className="mt-5 flex gap-2">
                  <button className="btn-secondary !py-2 text-[12.5px]">Export my data</button>
                  <button className="btn-secondary !py-2 text-[12.5px]">Delete account</button>
                </div>
              </div>
            )}

            {section === "security" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">Security</h3>
                <p className="text-[13px] text-textFaint mb-5">Protect your account.</p>

                <Row
                  label="Two-factor authentication"
                  desc="Add an extra layer of security to your account."
                  control={<Toggle enabled={cfg.twoFA} onChange={() => set({ twoFA: !cfg.twoFA })} label="Two-factor authentication" />}
                />
                <Row label="Change password" control={
                  <button className="btn-secondary !py-1.5 !px-3 text-[12.5px]">Change</button>
                } />
                <Row label="Active sessions" desc="2 devices signed in" control={
                  <button className="btn-secondary !py-1.5 !px-3 text-[12.5px]">Manage</button>
                } last />
              </div>
            )}

            {section === "api" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">API keys</h3>
                <p className="text-[13px] text-textFaint mb-5">Keys for programmatic access.</p>

                <div className="space-y-2.5 mb-4">
                  {[
                    { name: "Production", key: "fx_live_••••••••4f2a", last: "2 min ago" },
                    { name: "Development", key: "fx_test_••••••••9b7c", last: "3 days ago" },
                  ].map((k) => (
                    <div key={k.name} className="flex items-center justify-between p-3 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-text">{k.name}</p>
                        <p className="text-[11.5px] font-mono text-textFaint truncate">{k.key}</p>
                      </div>
                      <span className="text-[11px] text-textFaint shrink-0 ml-3">{k.last}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary !py-2 text-[13px]">Create new key</button>
              </div>
            )}

            {section === "billing" && (
              <div>
                <h3 className="text-[16px] font-bold tracking-tight mb-1">Billing</h3>
                <p className="text-[13px] text-textFaint mb-5">Your plan and usage.</p>

                <div className="p-4 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[15px] font-bold text-text">Free</p>
                      <p className="text-[12px] text-textFaint">$10 credit included</p>
                    </div>
                    <Link href="/pricing" className="btn-primary !py-1.5 !px-3 text-[12.5px]">Upgrade</Link>
                  </div>
                  <div className="flex justify-between text-[11.5px] text-textFaint mb-1.5">
                    <span>Credit used</span>
                    <span>$2.50 / $10.00</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink/[0.08] overflow-hidden">
                    <div className="h-full w-[25%] grad-bg rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}