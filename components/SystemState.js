import Link from "next/link";
import Icon from "@/components/Icon";

export default function SystemState({ code, title, message, icons = ["globe"], primary, secondary, children }) {
  return (
    <div className="min-h-screen bg-bg text-text grid place-items-center px-6 py-24">
      <div className="relative w-full max-w-lg text-center">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[240px] hero-glow opacity-40 pointer-events-none" />
        <div className="relative">
          <div className="flex justify-center gap-2 mb-6">
            {icons.map((n) => (
              <span key={n} className="w-11 h-11 rounded-xl bg-ink/[0.04] border border-ink/10 grid place-items-center text-accent">
                <Icon name={n} size={20} />
              </span>
            ))}
          </div>
          {code && <p className="font-mono text-sm text-textFaint mb-2">{code}</p>}
          <h1 className="text-3xl font-bold tracking-tight text-balance">{title}</h1>
          <p className="mt-4 text-textDim leading-relaxed text-pretty">{message}</p>
          {children}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {primary && <Link href={primary.href} className="btn-primary">{primary.label}</Link>}
            {secondary && <Link href={secondary.href} className="btn-secondary">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}