"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";

/* ---------- static data ---------- */
const KPIS = [
  { key: "mrr", label: "MRR", value: 184320, fmt: "usd", delta: +12.4 },
  { key: "users", label: "Active users", value: 48210, fmt: "int", delta: +8.1 },
  { key: "tokens", label: "Tokens / day", value: 9.4, fmt: "b", delta: +23.7 },
  { key: "churn", label: "Churn", value: 1.9, fmt: "pct", delta: -0.4 },
];

const SERIES = {
  mrr: [92, 96, 101, 108, 112, 119, 124, 131, 138, 146, 152, 161, 168, 176, 184],
  users: [21, 23, 24, 27, 29, 31, 33, 36, 38, 40, 42, 44, 45, 47, 48],
  tokens: [2.1, 2.6, 2.4, 3.1, 3.8, 4.2, 4.0, 5.1, 5.6, 6.2, 6.9, 7.4, 8.1, 8.8, 9.4],
  churn: [3.8, 3.6, 3.4, 3.5, 3.1, 2.9, 3.0, 2.7, 2.6, 2.4, 2.5, 2.3, 2.1, 2.0, 1.9],
};

const USERS = [
  { id: "u1", name: "Priya Nair", email: "priya@northwind.io", plan: "Enterprise", spend: 12400, status: "active", joined: "Mar 12" },
  { id: "u2", name: "Marcus Lee", email: "marcus@cascade.dev", plan: "Pro", spend: 2180, status: "active", joined: "Apr 02" },
  { id: "u3", name: "Sofia Romero", email: "sofia@lumen.studio", plan: "Pro", spend: 1640, status: "active", joined: "Apr 28" },
  { id: "u4", name: "Tomás Ibarra", email: "tomas@vela.co", plan: "Team", spend: 890, status: "past_due", joined: "May 15" },
  { id: "u5", name: "Ana Kovač", email: "ana@stratos.si", plan: "Free", spend: 0, status: "active", joined: "Jun 02" },
  { id: "u6", name: "Ben Osei", email: "ben@nimbus.app", plan: "Pro", spend: 3120, status: "suspended", joined: "Jun 19" },
];

const QUEUE = [
  { id: "q1", t: "Verify new signup", m: "ana@stratos.si", p: "low", age: "2m" },
  { id: "q2", t: "Refund request #4471", m: "billing@lumen.studio", p: "high", age: "18m" },
  { id: "q3", t: "Flagged chat (policy)", m: "u_48210", p: "high", age: "41m" },
  { id: "q4", t: "Rate-limit increase", m: "ops@cascade.dev", p: "normal", age: "1h" },
  { id: "q5", t: "Invoice mismatch", m: "finance@northwind.io", p: "normal", age: "3h" },
];

const INCIDENTS = [
  { s: "resolved", t: "Elevated latency on frox-image", w: "14m", when: "2d ago" },
  { s: "resolved", t: "Streaming reconnect failures", w: "38m", when: "6d ago" },
  { s: "resolved", t: "Partial auth outage (EU)", w: "9m", when: "13d ago" },
];

const MODELS_USAGE = [
  { n: "Frox Flex", pct: 54, c: "var(--accent)" },
  { n: "Frox Code", pct: 31, c: "#0891c6" },
  { n: "Frox Image", pct: 11, c: "#c026d3" },
  { n: "Frox Voice", pct: 4, c: "#ea580c" },
];

/* ---------- helpers ---------- */
function fmtNum(v, kind) {
  if (kind === "usd") return "$" + v.toLocaleString("en-US");
  if (kind === "b") return v.toFixed(1) + "B";
  if (kind === "pct") return v.toFixed(1) + "%";
  return v >= 1000 ? (v / 1000).toFixed(1) + "k" : String(v);
}

/* Count a number up when it scrolls into view. */
function CountUp({ to, kind }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const dur = 1100;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        setN(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{fmtNum(kind === "usd" || kind === "pct" ? Math.round(n * 10) / 10 : Math.round(n), kind)}</span>;
}

/* Animated sparkline area chart. */
function Spark({ data, color = "var(--accent)" }) {
  const [w, setW] = useState(240);
  const gid = useMemo(() => `g${Math.random().toString(36).slice(2, 8)}`, []);
  const { line, area } = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const span = max - min || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = 52 - ((v - min) / span) * 44;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return { line: `M${pts.join(" L")}`, area: `M${pts.join(" L")} L${w},60 L0,60 Z` };
  }, [data, w]);

  return (
    <svg viewBox={`0 0 ${w} 60`} className="w-full h-16 overflow-visible" preserveAspectRatio="none" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} style={{ animation: "fade-in .8s ease both" }} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: "draw-line 1.4s cubic-bezier(.16,1,.3,1) both" }}
      />
    </svg>
  );
}

const STATUS_STYLE = {
  active: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  past_due: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
  suspended: "bg-red-500/12 text-red-500",
  resolved: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
};

const PRIORITY_STYLE = {
  high: "text-red-500",
  normal: "text-textDim",
  low: "text-textFaint",
};

const NAV = [
  { icon: "grid", label: "Overview" },
  { icon: "users", label: "Users" },
  { icon: "layers", label: "Models" },
  { icon: "shieldCheck", label: "Moderation" },
  { icon: "fileText", label: "Audit log" },
  { icon: "sliders", label: "Settings" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("mrr");
  const [range, setRange] = useState("30d");
  const [q, setQ] = useState("");
  const [nav, setNav] = useState("Overview");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return USERS;
    return USERS.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.plan.toLowerCase().includes(s));
  }, [q]);

  const kpi = KPIS.find((k) => k.key === tab);

  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* ============ SIDEBAR ============ */}
      <aside className="hidden lg:flex w-[236px] shrink-0 flex-col border-r border-ink/[0.07] bg-bgElev sticky top-0 h-dvh">
        <div className="p-4 flex items-center gap-2.5 border-b border-ink/[0.07]">
          <span className="w-7 h-7 rounded-lg grad-bg grid place-items-center text-white text-[11px] font-bold">F</span>
          <span className="text-[14px] font-semibold tracking-tight">Frox Admin</span>
        </div>
        <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
          {NAV.map((n) => (
            <button
              key={n.label}
              onClick={() => setNav(n.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                nav === n.label ? "bg-ink/[0.08] text-text font-medium" : "text-textDim hover:bg-ink/[0.04]"
              }`}
            >
              <Icon name={n.icon} size={15} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-2.5 border-t border-ink/[0.07]">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] text-textDim hover:bg-ink/[0.04] transition-colors">
            <Icon name="logout" size={15} /> Back to site
          </Link>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-14 flex items-center gap-4 px-5 sm:px-7 border-b border-ink/[0.07] bg-bg/85 backdrop-blur-xl">
          <h1 className="text-[15px] font-semibold tracking-tight">{nav}</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textFaint pointer-events-none" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search users"
                className="w-52 h-8 pl-8 pr-3 rounded-full bg-bgElev border border-ink/[0.08] text-[13px] outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-bgElev border border-ink/[0.08] p-0.5">
              {["24h", "7d", "30d"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`h-7 px-3 rounded-full text-[12px] font-medium transition-colors ${range === r ? "bg-ink/[0.08] text-text" : "text-textFaint hover:text-textDim"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="w-8 h-8 grid place-items-center rounded-full text-textDim hover:bg-ink/[0.06] transition-colors" aria-label="Notifications">
              <Icon name="clock" size={15} />
            </button>
            <span className="w-8 h-8 rounded-full grad-bg grid place-items-center text-white text-[11px] font-bold">AD</span>
          </div>
        </header>

        <div className="px-5 sm:px-7 py-7 space-y-7">
          {/* ============ KPIs ============ */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {KPIS.map((k, i) => {
              const up = k.delta >= 0;
              const good = k.key === "churn" ? !up : up;
              return (
                <Reveal key={k.key} delay={i * 60}>
                  <button
                    onClick={() => setTab(k.key)}
                    className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 tilt ${
                      tab === k.key ? "border-accent/40 bg-bgCard shadow-[0_16px_38px_-24px_var(--accent)]" : "border-ink/[0.08] bg-bgElev hover:bg-bgCard"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12.5px] text-textFaint">{k.label}</span>
                      <span className={`inline-flex items-center gap-1 text-[11.5px] font-medium ${good ? "text-emerald-500" : "text-red-500"}`}>
                        <Icon name={up ? "chevronRight" : "chevronLeft"} size={11} className={up ? "-rotate-45" : "rotate-45"} />
                        {Math.abs(k.delta)}%
                      </span>
                    </div>
                    <div className="mt-2.5 text-[clamp(1.5rem,2.4vw,1.9rem)] font-bold tracking-tight">
                      <CountUp to={k.value} kind={k.fmt} />
                    </div>
                    <div className="mt-3 -mx-1">
                      <Spark data={SERIES[k.key]} color={tab === k.key ? "var(--accent)" : "var(--fg-subtle)"} />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* ============ MIDDLE ROW ============ */}
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
            <Reveal delay={80}>
              <div className="h-full rounded-2xl border border-ink/[0.08] bg-bgElev p-6 relative overflow-hidden">
                <AnimatedBackground variant="panel" className="opacity-25" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[12.5px] text-textFaint">{kpi.label} · last {range}</p>
                    <p className="mt-1 text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-tight">
                      <CountUp to={kpi.value} kind={kpi.fmt} />
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {KPIS.map((k) => (
                      <button
                        key={k.key}
                        onClick={() => setTab(k.key)}
                        className={`h-7 px-2.5 rounded-full text-[11.5px] font-medium transition-colors ${tab === k.key ? "grad-bg text-white" : "bg-ink/[0.05] text-textFaint hover:text-textDim"}`}
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative mt-5">
                  <Spark data={SERIES[tab]} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="h-full rounded-2xl border border-ink/[0.08] bg-bgElev p-6">
                <p className="text-[12.5px] text-textFaint mb-5">Usage by model</p>
                <div className="space-y-4">
                  {MODELS_USAGE.map((m, i) => (
                    <div key={m.n}>
                      <div className="flex items-center justify-between text-[13px] mb-1.5">
                        <span className="text-textDim">{m.n}</span>
                        <span className="text-textFaint">{m.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink/[0.07] overflow-hidden">
                        <div
                          className="h-full rounded-full msg-in"
                          style={{ width: `${m.pct}%`, background: m.c, animationDelay: `${i * 90}ms`, animationName: "wipe-in" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ============ USERS ============ */}
          <Reveal delay={180}>
            <div className="rounded-2xl border border-ink/[0.08] bg-bgElev overflow-hidden">
              <div className="flex items-center justify-between px-5 h-12 border-b border-ink/[0.07]">
                <p className="text-[13px] font-semibold">Users</p>
                <span className="text-[12px] text-textFaint">{filtered.length} of {USERS.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11.5px] uppercase tracking-wide text-textFaint">
                      <th className="px-5 py-2.5 font-medium">User</th>
                      <th className="px-5 py-2.5 font-medium">Plan</th>
                      <th className="px-5 py-2.5 font-medium">Spend</th>
                      <th className="px-5 py-2.5 font-medium">Joined</th>
                      <th className="px-5 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13.5px]">
                    {filtered.map((u, i) => (
                      <tr
                        key={u.id}
                        className="border-t border-ink/[0.05] hover:bg-ink/[0.02] transition-colors msg-in"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-full bg-ink/[0.06] grid place-items-center text-[10px] font-semibold text-textDim shrink-0">
                              {u.name.split(" ").map((w) => w[0]).join("")}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-text">{u.name}</span>
                              <span className="block text-[12px] text-textFaint truncate">{u.email}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-textDim">{u.plan}</td>
                        <td className="px-5 py-3 text-textDim">{u.spend ? "$" + u.spend.toLocaleString("en-US") : "—"}</td>
                        <td className="px-5 py-3 text-textFaint">{u.joined}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11.5px] font-medium ${STATUS_STYLE[u.status]}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {u.status.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-textFaint text-[13px]">No users match &ldquo;{q}&rdquo;.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* ============ BOTTOM ROW ============ */}
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal delay={220}>
              <div className="h-full rounded-2xl border border-ink/[0.08] bg-bgElev p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-semibold">Moderation queue</p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] text-textFaint">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 pulse-dot" /> {QUEUE.length} open
                  </span>
                </div>
                <ul className="space-y-1">
                  {QUEUE.map((item, i) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-ink/[0.04] transition-colors msg-in cursor-pointer"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.p === "high" ? "bg-red-500" : "bg-ink/20"}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] truncate">{item.t}</span>
                        <span className="block text-[11.5px] text-textFaint truncate">{item.m}</span>
                      </span>
                      <span className={`text-[11.5px] shrink-0 ${PRIORITY_STYLE[item.p]}`}>{item.p}</span>
                      <span className="text-[11.5px] text-textFaint shrink-0 w-8 text-right">{item.age}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="h-full rounded-2xl border border-ink/[0.08] bg-bgElev p-6">
                <p className="text-[13px] font-semibold mb-4">Recent incidents</p>
                <ul className="space-y-1">
                  {INCIDENTS.map((inc, i) => (
                    <li
                      key={inc.t}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-ink/[0.04] transition-colors msg-in"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <Icon name="checkCircle" size={15} className="text-emerald-500 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] truncate">{inc.t}</span>
                        <span className="block text-[11.5px] text-textFaint">{inc.when}</span>
                      </span>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE.resolved}`}>{inc.w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
