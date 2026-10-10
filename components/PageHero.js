import Reveal from "@/components/Reveal";

export default function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-bg grid-drift opacity-70 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[360px] hero-glow glow-breathe opacity-50 pointer-events-none" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <p className="chip mb-5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent2 pulse-dot" />
                {eyebrow}
              </p>
            </Reveal>
          )}
          {title && (
            <Reveal delay={eyebrow ? 60 : 0}>
              <h1 className="font-bold tracking-tight text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-balance">
                {title}
              </h1>
            </Reveal>
          )}
          {sub && (
            <Reveal delay={eyebrow || title ? 120 : 0}>
              <p className="mt-5 text-lg text-textDim leading-relaxed text-pretty max-w-2xl">{sub}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={eyebrow || title || sub ? 180 : 0}>
              <div className="mt-8 flex flex-wrap gap-3">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
