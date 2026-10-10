"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";

function Item({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`card !rounded-2xl overflow-hidden transition-colors duration-300 ${open ? "border-accent/30 bg-ink/[0.02]" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-ink/[0.03] transition-colors"
      >
        <span className="text-[15.5px] font-semibold tracking-tight text-text">{q}</span>
        <span className={`shrink-0 w-7 h-7 grid place-items-center rounded-full border transition-all duration-300 ${open ? "border-accent/40 bg-accent/10 rotate-45" : "border-ink/10"}`}>
          <svg className={`w-3.5 h-3.5 transition-colors ${open ? "text-accent" : "text-textFaint"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-textDim text-pretty">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ title, faqs }) {
  return (
    <section className="mb-12">
      <Reveal>
        <h2 className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-textFaint mb-4">
          <span className="w-6 h-px bg-accent/50" />
          {title}
        </h2>
      </Reveal>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <Item q={f.q} a={f.a} defaultOpen={i === 0 && title === "General"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
