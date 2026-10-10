"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const SECTIONS = [
  { id: "general", label: "General", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "profile", label: "Profile", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" },
  { id: "appearance", label: "Appearance", icon: "M12 3v2m0 14v2m9-9h-2M5 12H3m14.95-6.95l-1.41 1.41M7.46 16.54l-1.41 1.41m0-11.9l1.41 1.41m9.08 9.08l1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z" },
  { id: "personalization", label: "Personalization", icon: "M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z" },
  { id: "data", label: "Data controls", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { id: "notifications", label: "Notifications", icon: "M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4-5.7V5a2 2 0 1 0-4 0v.3A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" },
  { id: "security", label: "Security", icon: "M7 11V7a5 5 0 0 1 10 0v4M3 11h18v10H3zM8 11V7" },
  { id: "api", label: "API keys", icon: "M15.75 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM4.5 20.25a7.5 7.5 0 0 1 15 0" },
  { id: "billing", label: "Billing", icon: "M12 8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8c1.11 0 2.08.4 2.6 1M12 8V7m0 9v1m0-1c-1.11 0-2.08-.4-2.6-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ACCENTS = [
  { id: "default", label: "Default", css: "#7c6bff" },
  { id: "blue", label: "Blue", css: "#0285FF" },
  { id: "green", label: "Green", css: "#10a37f" },
  { id: "yellow", label: "Yellow", css: "#d97706" },
  { id: "pink", label: "Pink", css: "#db2777" },
  { id: "orange", label: "Orange", css: "#ea580c" },
  { id: "purple", label: "Purple", css: "#9333ea" },
  { id: "black", label: "Black", css: "#18181b" },
];

const NOTIFICATIONS = [
  { id: "email_updates", label: "Email updates", desc: "Product news and newsletters" },
  { id: "email_security", label: "Security alerts", desc: "Sign-ins from new devices" },
  { id: "push_chat", label: "Chat responses", desc: "When Frox finishes a response" },
  { id: "push_weekly", label: "Weekly digest", desc: "Usage summary every Monday" },
];

const SESSIONS = [
  { id: 1, device: "MacBook Pro — Chrome", location: "San Francisco, CA", current: true },
  { id: 2, device: "iPhone 15 — Safari", location: "San Francisco, CA", current: false },
];

const API_KEYS = [
  { id: 1, name: "Production Key", key: "fx_live_4f2a••••••••••••", created: "Aug 12, 2026", lastUsed: "2 min ago" },
  { id: 2, name: "Development Key", key: "fx_test_9b7c••••••••••••", created: "Sep 3, 2026", lastUsed: "3 days ago" },
];

const INVOICES = [
  { date: "Oct 1, 2026", amount: "$0.00", label: "Free tier credit" },
  { date: "Sep 1, 2026", amount: "$0.00", label: "Free tier credit" },
  { date: "Aug 1, 2026", amount: "$0.00", label: "Free tier credit" },
];

function Toggle({ enabled, onChange, label }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${enabled ? "bg-accent" : "bg-ink/[0.12] border border-ink/[0.1]"}`}
    >
      <span
        className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: enabled ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function Row({ label, desc, control }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-ink/[0.06] last:border-0">
      <div className="min-w-0">
        <p className="text-[14.5px] font-medium">{label}</p>
        {desc && <p className="text-[12.5px] text-textFaint mt-0.5">{desc}</p>}
      </div>
      {control}
    </div>
  );
}

function Stepper({ value, onChange, min = 12, max = 20 }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 grid place-items-center rounded-lg border border-ink/10 text-textDim hover:border-ink/25 hover:text-text transition-colors"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="w-10 text-center text-[14px] font-mono">{value}px</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 grid place-items-center rounded-lg border border-ink/10 text-textDim hover:border-ink/25 hover:text-text transition-colors"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

function Card({ title, desc, children }) {
  return (
    <div className="card p-6">
      {title && <h3 className="text-[16px] font-bold tracking-tight">{title}</h3>}
      {desc && <p className="text-[13px] text-textFaint mt-1 mb-4">{desc}</p>}
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl text-sm bg-ink/[0.04] border border-ink/[0.08] outline-none focus:border-accent/50 transition-colors placeholder:text-textFaint";

export default function SettingsPage() {
  const [section, setSection] = useState("general");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Alex Johnson", email: "alex@frox.ai", bio: "Full-stack developer exploring the frontiers of AI." });
  const [appearance, setAppearance] = useState({ theme: "system", accent: "default", fontSize: 14, uiFontSize: 14, density: "comfortable", dyslexicFont: false });
  const [personal, setPersonal] = useState({ personality: "friendly", instructions: "" });
  const [data, setData] = useState({ training: false, memories: true, analytics: true });
  const [notifs, setNotifs] = useState({ email_updates: true, email_security: true, push_chat: true, push_weekly: false });
  const [twoFA, setTwoFA] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("frox_settings");
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.appearance) setAppearance(parsed.appearance);
        if (parsed.personal) setPersonal(parsed.personal);
        if (parsed.data) setData(parsed.data);
        if (parsed.notifs) setNotifs(parsed.notifs);
        if (parsed.twoFA !== undefined) setTwoFA(parsed.twoFA);
      }
    } catch { /* ignore */ }
  }, []);

  const save = () => {
    try {
      localStorage.setItem("frox_settings", JSON.stringify({ profile, appearance, personal, data, notifs, twoFA }));
    } catch { /* ignore */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setAccent = (css) => {
    document.documentElement.style.setProperty("--accent", css);
    setAppearance((a) => ({ ...a, accent: css }));
  };

  return (
    <div className="min-h-screen bg-bg text-text relative overflow-hidden">
      <AnimatedBackground variant="soft" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <div className="mb-8">
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-tight">Settings</h1>
          <p className="text-textDim mt-1.5">Manage your Frox account and preferences.</p>
        </div>

        {saved && (
          <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-[13.5px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Settings saved
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left sidebar — ChatGPT style */}
          <nav className="md:w-56 shrink-0 md:sticky md:top-24 w-full">
            <p className="px-3.5 pb-2 text-[11px] uppercase tracking-widest text-textFaint">Settings</p>
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                    section === s.id ? "bg-ink/[0.07] text-text" : "text-textDim hover:text-text hover:bg-ink/[0.04]"
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                  {s.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main panel */}
          <div className="flex-1 min-w-0 w-full max-w-2xl space-y-5">

            {section === "general" && (
              <>
                <Card title="General" desc="Core app preferences.">
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-textFaint uppercase tracking-wider pt-1 pb-2">Appearance</p>
                    <Row
                      label="Theme"
                      desc="Use light, dark, or match your system"
                      control={
                        <div className="flex items-center gap-1 rounded-full border border-ink/10 p-1">
                          {["light", "dark", "system"].map((t) => (
                            <button
                              key={t}
                              onClick={() => setAppearance({ ...appearance, theme: t })}
                              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium capitalize transition-colors ${appearance.theme === t ? "bg-ink/[0.08] text-text" : "text-textFaint hover:text-textDim"}`}
                            >
                              {t === "system" ? "System" : t}
                            </button>
                          ))}
                        </div>
                      }
                    />
                    <Row
                      label="Accent color"
                      desc="Used for buttons, links, and highlights"
                      control={
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {ACCENTS.map((a) => (
                            <button
                              key={a.id}
                              onClick={() => setAccent(a.css)}
                              title={a.label}
                              aria-label={`Accent: ${a.label}`}
                              className={`w-6 h-6 rounded-full grid place-items-center transition-transform hover:scale-110 ${appearance.accent === a.css ? "ring-2 ring-offset-2 ring-offset-bg ring-ink/40" : ""}`}
                              style={{ background: a.css }}
                            >
                              {appearance.accent === a.css && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              )}
                            </button>
                          ))}
                        </div>
                      }
                    />
                    <Row
                      label="Text size"
                      desc="Adjust the base size used across the UI"
                      control={<Stepper value={appearance.fontSize} onChange={(v) => setAppearance({ ...appearance, fontSize: v })} />}
                    />
                    <Row
                      label="Language"
                      desc="Interface language"
                      control={
                        <select className="px-3 py-1.5 rounded-lg border border-ink/10 bg-ink/[0.04] text-[13px] outline-none focus:border-accent/50">
                          <option>English</option>
                          <option>Deutsch</option>
                          <option>Français</option>
                          <option>Español</option>
                          <option>日本語</option>
                          <option>한국어</option>
                          <option>Português</option>
                          <option>中文</option>
                        </select>
                      }
                    />
                  </div>
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "profile" && (
              <>
                <Card title="Profile" desc="How you appear across Frox. Update your picture, name, and bio.">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-16 h-16 rounded-2xl grad-bg grid place-items-center text-xl font-bold text-white shadow-glow">
                      {profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                    <div>
                      <button className="btn-secondary !py-2 text-[13px]">Change picture</button>
                      <p className="text-[11.5px] text-textFaint mt-1.5">PNG or JPG, at least 256×256.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">Display name</label>
                      <input className={inputCls} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">Email</label>
                      <input className={inputCls} type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">Username</label>
                      <div className="flex items-center">
                        <span className="px-3 py-2.5 rounded-l-xl border border-r-0 border-ink/[0.08] bg-ink/[0.02] text-[13px] text-textFaint">@</span>
                        <input className={`${inputCls} rounded-l-none`} defaultValue="alexj" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">Bio</label>
                      <textarea className={`${inputCls} resize-none`} rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                    </div>
                  </div>
                </Card>

                <Card title="Activity" desc="Your usage at a glance.">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Lifetime tokens", value: "2.4M" },
                      { label: "Day streak", value: "12" },
                      { label: "Longest task", value: "3h 42m" },
                    ].map((s) => (
                      <div key={s.label} className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06] text-center">
                        <p className="text-[18px] font-bold grad-text">{s.value}</p>
                        <p className="text-[11px] text-textFaint mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "appearance" && (
              <>
                <Card title="Appearance" desc="Fine-tune how Frox looks and feels.">
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-textFaint uppercase tracking-wider pt-1 pb-2">Theme</p>
                    <Row
                      label="Color mode"
                      control={
                        <div className="flex items-center gap-1 rounded-full border border-ink/10 p-1">
                          {["light", "dark", "system"].map((t) => (
                            <button
                              key={t}
                              onClick={() => setAppearance({ ...appearance, theme: t })}
                              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium capitalize transition-colors ${appearance.theme === t ? "bg-ink/[0.08] text-text" : "text-textFaint hover:text-textDim"}`}
                            >
                              {t === "system" ? "Match system" : t}
                            </button>
                          ))}
                        </div>
                      }
                    />
                    <Row
                      label="Chat font"
                      desc="Default, Match system, or Dyslexic friendly"
                      control={
                        <select
                          className="px-3 py-1.5 rounded-lg border border-ink/10 bg-ink/[0.04] text-[13px] outline-none focus:border-accent/50"
                          value={appearance.dyslexicFont ? "dyslexic" : "default"}
                          onChange={(e) => setAppearance({ ...appearance, dyslexicFont: e.target.value === "dyslexic" })}
                        >
                          <option value="default">Default</option>
                          <option value="system">Match system</option>
                          <option value="dyslexic">Dyslexic friendly</option>
                        </select>
                      }
                    />
                    <Row
                      label="UI font size"
                      desc="Adjust the base size for interface text"
                      control={<Stepper value={appearance.uiFontSize} onChange={(v) => setAppearance({ ...appearance, uiFontSize: v })} />}
                    />
                    <Row
                      label="Message density"
                      control={
                        <div className="flex items-center gap-1 rounded-full border border-ink/10 p-1">
                          {["compact", "comfortable"].map((d) => (
                            <button
                              key={d}
                              onClick={() => setAppearance({ ...appearance, density: d })}
                              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium capitalize transition-colors ${appearance.density === d ? "bg-ink/[0.08] text-text" : "text-textFaint hover:text-textDim"}`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      }
                    />
                  </div>
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "personalization" && (
              <>
                <Card title="Personality" desc="Sets the default tone for new conversations.">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "friendly", label: "Friendly", desc: "Warm and encouraging" },
                      { id: "pragmatic", label: "Pragmatic", desc: "Direct and concise" },
                      { id: "none", label: "None", desc: "No personality layer" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPersonal({ ...personal, personality: p.id })}
                        className={`p-3.5 rounded-xl border text-left transition-colors ${personal.personality === p.id ? "border-accent/50 bg-accent/10" : "border-ink/10 hover:border-ink/25"}`}
                      >
                        <span className="block text-[13.5px] font-medium">{p.label}</span>
                        <span className="block text-[11.5px] text-textFaint mt-0.5">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card title="Custom instructions" desc="Frox follows these in every new conversation.">
                  <textarea
                    className={`${inputCls} resize-none font-mono text-[13px]`}
                    rows={5}
                    placeholder={"e.g. Answer like a senior engineer. Prefer TypeScript. Always show tradeoffs."}
                    value={personal.instructions}
                    onChange={(e) => setPersonal({ ...personal, instructions: e.target.value })}
                  />
                  <p className="text-[12px] text-textFaint mt-2">Applied to new chats only.</p>
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "data" && (
              <>
                <Card title="Model training" desc="Choose whether your conversations help improve Frox models.">
                  <Row
                    label="Improve the model for everyone"
                    desc="When off, your chats are never used for training. They still appear in your chat history."
                    control={<Toggle enabled={data.training} onChange={() => setData({ ...data, training: !data.training })} label="Improve the model for everyone" />}
                  />
                  <Row
                    label="Memory"
                    desc="Let Frox carry useful context from past chats into future ones."
                    control={<Toggle enabled={data.memories} onChange={() => setData({ ...data, memories: !data.memories })} label="Memory" />}
                  />
                  <Row
                    label="Anonymous analytics"
                    desc="Help us understand which features get used. No content is sent."
                    control={<Toggle enabled={data.analytics} onChange={() => setData({ ...data, analytics: !data.analytics })} label="Anonymous analytics" />}
                  />
                </Card>

                <Card title="Your data">
                  <div className="space-y-3">
                    <button className="btn-secondary w-full justify-between">
                      <span>Export my data</span>
                      <span className="text-[11px] text-textFaint">JSON</span>
                    </button>
                    <button className="btn-secondary w-full justify-between">
                      <span>Export chat history</span>
                      <span className="text-[11px] text-textFaint">Markdown</span>
                    </button>
                  </div>
                </Card>

                <Card title="Danger zone" desc="Irreversible actions.">
                  {!confirmDelete ? (
                    <button onClick={() => setConfirmDelete(true)} className="w-full py-3 rounded-xl border border-red-400/30 text-red-400 text-[14px] font-medium hover:bg-red-400/10 transition-colors">
                      Delete my account
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[13.5px] text-red-400">This permanently deletes your account, keys, and history. Are you sure?</p>
                      <div className="flex gap-2">
                        <button onClick={() => setConfirmDelete(false)} className="btn-secondary flex-1">Cancel</button>
                        <button
                          onClick={() => { setConfirmDelete(false); alert("Account deletion is disabled in demo mode."); }}
                          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[14px] font-semibold hover:bg-red-600 transition-colors"
                        >
                          Yes, delete everything
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "notifications" && (
              <Card title="Notifications" desc="Choose what you want to hear about.">
                {NOTIFICATIONS.map((n) => (
                  <Row
                    key={n.id}
                    label={n.label}
                    desc={n.desc}
                    control={<Toggle enabled={notifs[n.id]} onChange={() => setNotifs({ ...notifs, [n.id]: !notifs[n.id] })} label={n.label} />}
                  />
                ))}
              </Card>
            )}

            {section === "security" && (
              <>
                <Card title="Password">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">Current password</label>
                      <input className={inputCls} type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-textDim mb-1.5">New password</label>
                      <input className={inputCls} type="password" placeholder="••••••••" />
                    </div>
                    <button className="btn-primary !py-2.5 text-[13.5px]">Update password</button>
                  </div>
                </Card>

                <Card>
                  <Row
                    label="Two-factor authentication"
                    desc="Add an extra layer of security to your account."
                    control={<Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} label="Two-factor authentication" />}
                  />
                </Card>

                <Card title="Active sessions">
                  <div className="space-y-3">
                    {SESSIONS.map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                        <div>
                          <p className="text-[13.5px] font-medium">{s.device}</p>
                          <p className="text-[12px] text-textFaint mt-0.5">{s.location}</p>
                        </div>
                        {s.current ? (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/25">Current</span>
                        ) : (
                          <button className="text-[12px] font-medium px-2.5 py-1 rounded-full border border-ink/10 text-textFaint hover:text-red-400 hover:border-red-400/30 transition-colors">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
                <button onClick={save} className="btn-primary">Save changes</button>
              </>
            )}

            {section === "api" && (
              <>
                <Card title="API keys" desc="Keep these secret. Use them to authenticate API requests.">
                  <div className="space-y-3 mb-4">
                    {API_KEYS.map((k) => (
                      <div key={k.id} className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-medium">{k.name}</p>
                          <p className="text-[12px] font-mono text-textFaint truncate">{k.key}</p>
                          <p className="text-[11.5px] text-textFaint mt-0.5">Created {k.created} · Last used {k.lastUsed}</p>
                        </div>
                        <button className="text-[12px] font-medium px-2.5 py-1 rounded-full border border-red-400/25 text-red-400 hover:bg-red-400/10 transition-colors shrink-0">Revoke</button>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary w-full justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Create new key
                  </button>
                </Card>

                <Card title="Bring your own key" desc="Route requests through your own Hugging Face credits.">
                  <div className="flex gap-2">
                    <input className={inputCls} placeholder="hf_xxxxxxxxxxxxxxxx" />
                    <button className="btn-secondary shrink-0">Save</button>
                  </div>
                </Card>
              </>
            )}

            {section === "billing" && (
              <>
                <Card title="Current plan">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[16px] font-bold">Free</p>
                      <p className="text-[12.5px] text-textFaint">$10 credit included · renews monthly</p>
                    </div>
                    <Link href="/pricing" className="btn-primary !py-2 text-[13px]">Upgrade</Link>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] text-textFaint mb-1.5">
                      <span>Credit used</span>
                      <span>$2.50 of $10.00</span>
                    </div>
                    <div className="h-2 rounded-full bg-ink/[0.06] overflow-hidden">
                      <div className="h-full w-[25%] grad-bg rounded-full" />
                    </div>
                  </div>
                </Card>

                <Card title="Payment method">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-6 rounded bg-ink/[0.08] border border-ink/10 grid place-items-center text-[9px] font-bold text-textDim">VISA</span>
                      <span className="text-[13.5px]">•••• 4242</span>
                    </div>
                    <button className="text-[12.5px] font-medium text-accent hover:underline">Update</button>
                  </div>
                </Card>

                <Card title="Billing history">
                  <div className="space-y-2.5">
                    {INVOICES.map((inv) => (
                      <div key={inv.date} className="flex items-center justify-between text-[13px]">
                        <span className="text-textDim">{inv.label}</span>
                        <span className="text-textFaint font-mono">{inv.date} · {inv.amount}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
