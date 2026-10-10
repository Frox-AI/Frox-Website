import Link from "next/link";
import Icon from "@/components/Icon";

export function Prose({ children }) {
  return (
    <div className="container-x pb-24 max-w-3xl">
      <div className="space-y-9">{children}</div>
    </div>
  );
}

export function ProseSection({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight mb-3">{title}</h2>
      <div className="text-[15px] text-textDim leading-relaxed space-y-3 text-pretty">{children}</div>
    </section>
  );
}

export default function ProsePage({ eyebrow, title, updated, intro, children, back }) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[320px] hero-glow opacity-40 pointer-events-none" />
        <div className="container-x relative max-w-3xl">
          {back && (
            <Link href={back.href} className="inline-flex items-center gap-1.5 text-sm text-textFaint hover:text-text mb-5">
              <Icon name="cornerDownRight" size={14} /> {back.label}
            </Link>
          )}
          {eyebrow && <p className="text-[12px] uppercase tracking-widest text-accent2 mb-3">{eyebrow}</p>}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{title}</h1>
          {updated && <p className="text-sm text-textFaint mt-3">Last updated {updated}</p>}
          {intro && <p className="text-lg text-textDim leading-relaxed mt-5 text-pretty">{intro}</p>}
        </div>
      </section>
      {children}
    </div>
  );
}