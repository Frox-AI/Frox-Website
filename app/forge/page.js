"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";

/* A simulated agent run so the page demonstrates motion without a backend. */
const RUN_STEPS = [
  { t: "Reading 12 files in src/queue", ms: 420, icon: "folder" },
  { t: "Tracing retry path in worker.ts", ms: 520, icon: "search" },
  { t: "Found: unbounded backoff on 503", ms: 460, icon: "lightbulb" },
  { t: "Patching backoff.ts (+18 −4)", ms: 600, icon: "diff" },
  { t: "Running 48 tests", ms: 700, icon: "checkCircle" },
  { t: "All green — ready for review", ms: 380, icon: "check" },
];

const DIFF = [
  { n: 41, sign: "-", code: "  const delay = base * retry;" },
  { n: 42, sign: "-", code: "  await sleep(delay);" },
  { n: 43, sign: "+", code: "  const delay = Math.min(base * 2 ** retry, 30_000);" },
  { n: 44, sign: "+", code: "  const jitter = Math.random() * 0.3 * delay;" },
  { n: 45, sign: "+", code: "  await sleep(delay * (1 - jitter));" },
  { n: 46, sign: " ", code: "" },
  { n: 47, sign: "+", code: "  metrics.observe('retry.backoff', delay);" },
];

const SESSIONS = [
  { id: "s1", title: "Fix retry backoff", status: "ready", time: "2m" },
  { id: "s2", title: "Migrate to streaming API", status: "ready", time: "18m" },
  { id: "s3", title: "Add rate-limit middleware", status: "failed", time: "1h" },
  { id: "s4", title: "Refactor auth tokens", status: "ready", time: "3h" },
  { id: "s5", title: "Flaky test hunt", status: "running", time: "5h" },
];

const CAPS = [
  { icon: "search", title: "Reads before it writes", body: "Forge traces the actual call path through your repo before proposing a single edit. No shotgun patches." },
  { icon: "diff", title: "Diffs you can audit", body: "Every change arrives as a reviewable diff with the reasoning attached, so you approve or reject per hunk." },
  { icon: "bolt", title: "Runs the suite", body: "It executes your tests and linters itself, and iterates until they pass or it tells you exactly why it stopped." },
  { icon: "branch", title: "Branch per task", body: "Each request gets its own branch and a clean summary you can turn into a PR in one click." },
];

const FLOW = [
  { n: "01", t: "Describe the change", d: "Plain language is enough. Forge asks before it guesses when the intent is ambiguous." },
  { n: "02", t: "Forge explores", d: "It opens files, greps call sites, and builds a model of the area before editing." },
  { n: "03", t: "Review the diff", d: "Accept the whole patch or cherry-pick individual hunks. Nothing merges unattended." },
  { n: "04", t: "Ship", d: "Push a branch, open a PR, or export the patch. Works with whatever forge you already use." },
];

export default function ForgePage() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [session, setSession] = useState("s1");
  const [diffOn, setDiffOn] = useState(true);
  const logRef = useRef(null);
  const timers = useRef([]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    setRunning(false);
  };

  const run = () => {
    reset();
    setRunning(true);
    let acc = 0;
    RUN_STEPS.forEach((s, i) => {
      acc += s.ms;
      timers.current.push(setTimeout(() => setStep(i + 1), acc));
    });
    timers.current.push(setTimeout(() => setRunning(false), acc + 200));
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [step]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const done = step >= RUN_STEPS.length;
  const active = SESSIONS.find((s) => s.id === session) || SESSIONS[0];

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-ink/[0.08]">
        <AnimatedBackground variant="soft" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/[0.07] text-[12.5px] font-medium text-accent">
              <Icon name="forge" size={13} />
              Frox Forge
            </span>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] font-bold tracking-[-0.04em] leading-[1.02] max-w-[15ch]">
              An agent that reads your code <span className="display-em">before</span> it touches it.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] text-textDim leading-relaxed">
              Forge is Frox&apos;s build agent. Point it at a repo, describe the change, and it
              explores the real call path, patches surgically, and runs your suite — showing you every diff first.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={run}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full grad-bg grad-flow text-white text-[14px] font-medium shadow-[0_8px_28px_-10px_var(--accent)]"
              >
                <Icon name="play" size={15} />
                Run a session
              </button>
              <Link href="/docs" className="inline-flex items-center h-11 px-6 rounded-full border border-ink/[0.14] text-[14px] font-medium hover:bg-ink/[0.04] transition-colors">
                Read the docs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= LIVE WORKSPACE ================= */}
      <section className="relative flex-1">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">Workspace</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDiffOn(!diffOn)}
                  className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12.5px] font-medium border transition-colors ${diffOn ? "border-accent/40 bg-accent/[0.08] text-accent" : "border-ink/[0.12] text-textDim hover:bg-ink/[0.04]"}`}
                  aria-pressed={diffOn}
                >
                  <Icon name="diff" size={13} /> Diff
                </button>
                <button
                  onClick={running ? reset : run}
                  className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-ink text-bg text-[12.5px] font-medium hover:opacity-90 transition-opacity"
                >
                  {running ? (
                    <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Stop</>
                  ) : (
                    <><Icon name="play" size={12} /> {done ? "Run again" : "Run"}</>
                  )}
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[240px_1fr] gap-px bg-ink/[0.08] rounded-2xl overflow-hidden border border-ink/[0.09]">
            {/* session rail */}
            <div className="bg-bgElev p-3">
              <p className="px-2 py-2 text-[11px] uppercase tracking-wide text-textFaint">Sessions</p>
              <ul className="space-y-0.5">
                {SESSIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => { setSession(s.id); reset(); }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${session === s.id ? "bg-ink/[0.08]" : "hover:bg-ink/[0.04]"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          s.status === "ready" ? "bg-emerald-500" : s.status === "failed" ? "bg-red-500" : "bg-amber-500"
                        }`}
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] truncate text-textDim">{s.title}</span>
                      </span>
                      <span className="text-[11px] text-textFaint shrink-0">{s.time}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 rule-x-soft">
                <p className="px-2 py-2 text-[11px] uppercase tracking-wide text-textFaint">Selected</p>
                <p className="px-2 text-[13px] font-medium">{active.title}</p>
                <p className="px-2 mt-1 text-[11.5px] text-textFaint font-mono">branch · forge/{active.id}</p>
              </div>
            </div>

            {/* log + diff */}
            <div className="bg-bg min-w-0">
              <div className="flex items-center gap-2 px-4 h-11 border-b border-ink/[0.07]">
                <Icon name="terminal" size={14} className="text-textFaint" />
                <span className="text-[12.5px] text-textFaint font-mono">forge · {active.id}</span>
                <span className="ml-auto flex items-center gap-1.5 text-[11.5px] text-textFaint">
                  {running ? (
                    <><span className="w-1.5 h-1.5 rounded-full bg-amber-500 pulse-dot" /> working</>
                  ) : done ? (
                    <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> complete</>
                  ) : (
                    "idle"
                  )}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                {/* step log */}
                <div ref={logRef} className="space-y-2.5 min-h-[188px]">
                  {step === 0 && !running && (
                    <p className="text-[13px] text-textFaint">Press <span className="text-text">Run</span> to start the session.</p>
                  )}
                  {RUN_STEPS.slice(0, step).map((s, i) => {
                    const current = i === RUN_STEPS.length - 1 && running;
                    return (
                      <div
                        key={s.t}
                        className="flex items-center gap-2.5 msg-in"
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <Icon name={s.icon} size={14} className={current ? "text-accent" : "text-emerald-500"} />
                        <span className="text-[13px] text-textDim font-mono">{s.t}</span>
                        {current && <span className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />}
                      </div>
                    );
                  })}
                </div>

                {/* diff */}
                {diffOn && step >= 4 && (
                  <div className="mt-5 rounded-xl border border-ink/[0.08] overflow-hidden animate-fade-up" style={{ animationDuration: ".3s" }}>
                    <div className="flex items-center gap-2 px-3.5 h-9 border-b border-ink/[0.07] bg-bgElev">
                      <Icon name="fileText" size={12} className="text-textFaint" />
                      <span className="text-[11.5px] font-mono text-textDim">src/queue/backoff.ts</span>
                      <span className="ml-auto flex items-center gap-2.5 text-[11px]">
                        <span className="text-emerald-500">+18</span>
                        <span className="text-red-500">−4</span>
                      </span>
                    </div>
                    <div className="overflow-x-auto font-mono text-[12px] leading-relaxed">
                      {DIFF.map((l, i) => (
                        <div
                          key={l.n}
                          className="flex min-w-max msg-in"
                          style={{
                            animationDelay: `${i * 55}ms`,
                            background: l.sign === "+" ? "color-mix(in srgb, #10a37f 12%, transparent)"
                              : l.sign === "-" ? "color-mix(in srgb, #ef4444 12%, transparent)" : "transparent",
                          }}
                        >
                          <span className="w-10 shrink-0 text-right pr-3 text-textFaint select-none">{l.n}</span>
                          <span
                            className={`w-5 shrink-0 text-center select-none ${l.sign === "+" ? "text-emerald-500" : l.sign === "-" ? "text-red-500" : ""}`}
                          >
                            {l.sign}
                          </span>
                          <span className="pr-4 text-textDim whitespace-pre">{l.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {done && (
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 animate-fade-up" style={{ animationDuration: ".3s" }}>
                    <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[13px] font-medium">
                      <Icon name="check" size={14} /> 48 tests passed
                    </span>
                    <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-ink/[0.12] text-[13px] font-medium hover:bg-ink/[0.04] transition-colors">
                      <Icon name="branch" size={14} /> Open PR
                    </button>
                    <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-ink/[0.12] text-[13px] font-medium hover:bg-ink/[0.04] transition-colors">
                      <Icon name="download" size={14} /> Export patch
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="rule-x">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <p className="kicker">Why Forge</p>
            <h2 className="display-lg mt-4 max-w-[20ch]">Built to be reviewed, not trusted blindly</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 gap-px bg-ink/[0.08] border border-ink/[0.08] rounded-2xl overflow-hidden">
            {CAPS.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="h-full bg-bgElev p-7 tilt">
                  <span className="w-9 h-9 rounded-lg grad-bg grid place-items-center text-white shrink-0">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FLOW ================= */}
      <section className="rule-x">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <p className="kicker">Workflow</p>
            <h2 className="display-lg mt-4 max-w-[22ch]">Four steps, full stop</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/[0.08] border border-ink/[0.08] rounded-2xl overflow-hidden">
            {FLOW.map((f, i) => (
              <Reveal key={f.n} delay={i * 70}>
                <div className="h-full bg-bgElev p-6">
                  <span className="text-[13px] font-mono text-textFaint">{f.n}</span>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{f.t}</h3>
                  <p className="mt-2 text-[13px] text-textDim leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="rule-x relative overflow-hidden">
        <AnimatedBackground variant="panel" />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="display-lg text-balance">Try Forge on your repo</h2>
            <p className="mt-5 text-textDim leading-relaxed">
              Free with any account. Runs locally against your own checkout — your code never leaves your machine
              unless you ask it to open a PR.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/auth/signup" className="inline-flex items-center gap-2 h-11 px-6 rounded-full grad-bg grad-flow text-white text-[14px] font-medium">
                Start with Forge
                <Icon name="chevronRight" size={14} className="opacity-80" />
              </Link>
              <Link href="/chat" className="inline-flex items-center h-11 px-6 rounded-full border border-ink/[0.14] text-[14px] font-medium hover:bg-ink/[0.04] transition-colors">
                Back to chat
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
