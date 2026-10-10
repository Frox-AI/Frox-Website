import Reveal from "@/components/Reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Shared backdrop: every marketing page opens with the same motion
          language, so pages feel related without looking identical. */}
      <AnimatedBackground variant="soft" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <p className="chip mb-5 w-fit inline-flex items-center gap-2">
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
