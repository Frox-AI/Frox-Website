export default function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-bg opacity-70 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[360px] hero-glow opacity-50 pointer-events-none" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="chip mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-bold tracking-tight text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-balance">
            {title}
          </h1>
          {sub && <p className="mt-5 text-lg text-textDim leading-relaxed text-pretty max-w-2xl">{sub}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}