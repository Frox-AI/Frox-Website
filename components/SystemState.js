import Link from "next/link";
import Icon from "@/components/Icon";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";

export default function SystemState({ code, title, message, icons = ["globe"], primary, secondary, children }) {
  return (
    <div className="min-h-screen bg-bg text-text grid place-items-center px-6 py-24 relative overflow-hidden">
      <AnimatedBackground variant="soft" />

      <div className="relative w-full max-w-lg text-center">
        <div className="flex justify-center gap-2 mb-6">
          {icons.map((n, i) => (
            <Reveal key={n} delay={i * 90}>
              <span className="w-11 h-11 rounded-xl bg-bgElev border border-ink/[0.09] grid place-items-center text-accent hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
                <Icon name={n} size={20} />
              </span>
            </Reveal>
          ))}
        </div>

        {code && (
          <Reveal delay={120}>
            <p className="font-mono text-sm text-textFaint mb-2">
              <span className="inline-block typing-dot" />
              {code}
            </p>
          </Reveal>
        )}

        <Reveal delay={170}>
          <h1 className="text-3xl font-bold tracking-tight text-balance">{title}</h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-4 text-textDim leading-relaxed text-pretty">{message}</p>
        </Reveal>

        {children && (
          <Reveal delay={270}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {primary && (
              <Link href={primary.href} className="btn-primary inline-flex items-center gap-1.5">
                {primary.label}
                <Icon name="chevronRight" size={14} className="opacity-70" />
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className="btn-secondary inline-flex items-center gap-1.5">
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
