"use client";
import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "code", label: "Code" },
  { id: "writing", label: "Writing" },
  { id: "analysis", label: "Analysis" },
  { id: "creative", label: "Creative" },
  { id: "productivity", label: "Productivity" },
];

const TEMPLATES = [
  {
    id: "explain",
    cat: "analysis",
    icon: "lightbulb",
    title: "Explain like I'm a beginner",
    desc: "Break down a complex topic with analogies and zero jargon.",
    prompt: "Explain [topic] to me like I'm a complete beginner. Use one everyday analogy, define any technical terms you must use, and end with a one-sentence summary.",
  },
  {
    id: "review-code",
    cat: "code",
    icon: "code",
    title: "Ruthless code review",
    desc: "Find bugs, perf issues, and design smells before your PR does.",
    prompt: "Review the code below like a senior engineer on a strict deadline. Rank findings by severity (blocker / major / nit), point out correctness bugs, performance traps, and security issues first, and suggest concrete fixes:\n\n[PASTE CODE]",
  },
  {
    id: "refactor",
    cat: "code",
    icon: "refresh",
    title: "Refactor without fear",
    desc: "Modernize legacy code with a test plan and migration steps.",
    prompt: "Refactor the following code for readability and maintainability. Keep behavior identical. Show the refactored version, explain each change, and list a test plan that would give us confidence the refactor is safe:\n\n[PASTE CODE]",
  },
  {
    id: "debug",
    cat: "code",
    icon: "search",
    title: "Debug detective",
    desc: "Systematic root-cause analysis instead of guess-and-check.",
    prompt: "Help me debug this issue. My hypothesis is [your guess]. Walk me through how you'd verify or falsify it step by step, what to look for in the stack trace, and the most likely root causes ranked by probability:\n\n[ERROR + CODE]",
  },
  {
    id: "email",
    cat: "writing",
    icon: "pen",
    title: "Professional email",
    desc: "Clear, warm, and to the point — no corporate-speak.",
    prompt: "Write a professional email that is [friendly/firm/concise]. Context: [what's happening]. Goal: [what you want the reader to do]. Keep it under 120 words and end with a clear ask.",
  },
  {
    id: "announcement",
    cat: "writing",
    icon: "sparkles",
    title: "Product announcement",
    desc: "A launch post with a hook, the why, and a memorable closer.",
    prompt: "Draft a product announcement for [feature]. Audience: [who cares]. Key benefit: [one sentence]. Give me: a headline under 10 words, a 3-sentence hook, 3 bullet points framed as user outcomes, and a one-line closer with a call to action.",
  },
  {
    id: "compare",
    cat: "analysis",
    icon: "flask",
    title: "Compare tradeoffs",
    desc: "A structured pros/cons breakdown for any decision.",
    prompt: "Compare [option A] vs [option B] for [context/goal]. Give me a decision matrix across cost, time, risk, and long-term maintenance, a recommendation with confidence level, and the one scenario where I'd pick the other option.",
  },
  {
    id: "docs",
    cat: "productivity",
    icon: "fileText",
    title: "Docs from rough notes",
    desc: "Turn scattered notes into structured, readable docs.",
    prompt: "Turn these rough notes into well-structured documentation. Use clear headings, keep sentences short, mark anything ambiguous with a [TODO] instead of guessing, and write it so a new team member can follow without asking questions:\n\n[PASTE NOTES]",
  },
  {
    id: "standup",
    cat: "productivity",
    icon: "checkCircle",
    title: "Standup summary",
    desc: "Blockers-first daily update in three lines.",
    prompt: "Write my daily standup update. Format: Done / Doing / Blockers. Keep each item under 15 words, lead with blockers, and flag anything that needs help from the team. Facts: [yesterday's work], [today's plan], [blockers].",
  },
  {
    id: "brainstorm",
    cat: "creative",
    icon: "lightbulb",
    title: "Brainstorm partner",
    desc: "Ten ideas fast, then pressure-test the best one.",
    prompt: "Brainstorm 10 distinct ideas for [project/goal]. Go for variety — mix safe bets with ambitious ones. Then pick the strongest 2 and pressure-test them: what's the biggest risk for each, and what's the smallest first step?",
  },
  {
    id: "names",
    cat: "creative",
    icon: "sparkles",
    title: "Name generator",
    desc: "Memorable, brandable names with rationale.",
    prompt: "Generate 15 name ideas for [what it is]. Vary the style: descriptive, evocative, compound, and invented words. For each, give a one-line rationale and note if the .com is likely taken. My top 3: [list them] — explain which works best and why.",
  },
  {
    id: "learn",
    cat: "productivity",
    icon: "book",
    title: "Study plan",
    desc: "A 7-day plan to actually learn something new.",
    prompt: "Build me a 7-day study plan to learn [skill/topic] as a [level] learner. Each day: one focused topic, one hands-on exercise, and a 10-minute recall quiz I can do the next morning. Assume 45 minutes per day.",
  },
];

function TemplateCard({ t }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(t.prompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const chatHref = `/chat?prompt=${encodeURIComponent(t.prompt)}`;

  return (
    <div className="card card-hover p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center text-accent shrink-0">
          <Icon name={t.icon} size={18} />
        </span>
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${copied ? "border-emerald-400/30 text-emerald-400 bg-emerald-400/10" : "border-ink/10 text-textDim hover:border-ink/25 hover:text-text"}`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <h3 className="mt-4 text-[15.5px] font-bold tracking-tight">{t.title}</h3>
      <p className="mt-1 text-[13.5px] text-textFaint leading-snug">{t.desc}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-textDim bg-ink/[0.03] border border-ink/[0.06] rounded-xl p-3.5 whitespace-pre-wrap line-clamp-4">{t.prompt}</p>
      <div className="mt-4 pt-4 border-t border-ink/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent2">{t.cat}</span>
        <Link href={chatHref} className="text-[13px] font-semibold text-accent hover:underline underline-offset-4 flex items-center gap-1">
          Use in chat
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.cat === cat);

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Prompt gallery"
        title="Templates that do the heavy lifting"
        sub="Battle-tested prompts for code, writing, analysis, and more. Copy one, or open it in Frox Chat and start iterating immediately."
      >
        <Link href="/chat" className="btn-primary">Open Frox Chat</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-medium border transition-colors ${cat === c.id ? "chip-active" : "border-ink/10 text-textDim hover:border-ink/25 hover:text-text"}`}
            >
              {c.label}
              <span className="ml-1.5 text-[11px] opacity-60">
                {c.id === "all" ? TEMPLATES.length : TEMPLATES.filter((t) => t.cat === c.id).length}
              </span>
            </button>
          ))}
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={70}>
          {list.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </RevealGroup>

        <div className="card p-8 text-center mt-14">
          <h3 className="text-xl font-bold tracking-tight">Have a prompt that works?</h3>
          <p className="text-textDim mt-2 text-[15px] text-pretty max-w-lg mx-auto">
            We add community templates every week. Share yours and we'll feature the best ones here with credit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">Submit a template</Link>
            <Link href="/docs" className="btn-secondary">Prompt engineering guide</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
