import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export function Prose({ children }) {
  return (
    <div className="container-x pb-24 max-w-3xl">
      <div className="space-y-9">{children}</div>
    </div>
  );
}

export function ProseSection({ title, children }) {
  return (
    <Reveal as="section">
      <h2 className="text-xl font-bold tracking-tight mb-3">
        {/* underline wipes in when the section scrolls into view */}
        <span className="relative inline-block">
          {title}
          <span className="prose-underline absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-accent/50" />
        </span>
      </h2>
      <div className="text-[15px] text-textDim leading-relaxed space-y-3 text-pretty">{children}</div>
    </Reveal>
  );
}

export default function ProsePage({ eyebrow, title, updated, intro, children, back }) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <section className="relative pt-28 pb-10 overflow-hidden">
        {/* drifting grid + breathing glow, matching the marketing hero */}
        <div className="absolute inset-x-0 top-0 h-[340px] grid-bg grid-drift opacity-50 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[320px] hero-glow glow-breathe opacity-40 pointer-events-none" />
        <div className="aurora w-[320px] h-[320px] bg-accent/18 top-[10%] left-[4%] pointer-events-none" data-parallax="12" />
        <div className="aurora w-[280px] h-[280px] bg-accent2/14 bottom-[6%] right-[6%] pointer-events-none" data-parallax="-10" style={{ animationDelay: "3.5s" }} />

        <div className="container-x relative max-w-3xl">
          {back && (
            <Reveal>
              <Link
                href={back.href}
                className="group inline-flex items-center gap-1.5 text-sm text-textFaint hover:text-text mb-5 transition-colors"
              >
                <Icon name="chevronRight" size={14} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                {back.label}
              </Link>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal delay={back ? 50 : 0}>
              <p className="text-[12px] uppercase tracking-widest text-accent2 mb-3">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={back || eyebrow ? 70 : 0}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{title}</h1>
          </Reveal>
          {updated && (
            <Reveal delay={110}>
              <p className="text-sm text-textFaint mt-3">Last updated {updated}</p>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={150}>
              <p className="text-lg text-textDim leading-relaxed mt-5 text-pretty">{intro}</p>
            </Reveal>
          )}
        </div>
      </section>
      {children}
    </div>
  );
}
