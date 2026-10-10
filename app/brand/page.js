import Link from "next/link";
import PageHero from "@/components/PageHero";

const COLORS = [
  { name: "Iris", hex: "#6a55f7", usage: "Primary accent" },
  { name: "Lagoon", hex: "#0891c6", usage: "Secondary accent" },
  { name: "Ink", hex: "#101012", usage: "Text on light" },
  { name: "Paper", hex: "#ffffff", usage: "Surface on light" },
  { name: "Slate", hex: "#57575f", usage: "Muted text" },
];

export const metadata = {
  title: "Brand",
  description: "Frox logos, colors, and usage guidelines.",
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Brand"
        title="The Frox brand kit"
        sub="Use these assets when referencing Frox in articles, integrations, or partner material. Please don't alter the mark's proportions or colors."
      >
        <button className="btn-primary" disabled>Download full kit</button>
      </PageHero>

      <div className="container-x pb-24 max-w-4xl">
        <section className="mb-14">
          <h2 className="text-xl font-bold tracking-tight mb-5">Logo</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { bg: "bg-white", label: "On light", border: true },
              { bg: "bg-[#07070a]", label: "On dark", border: false },
              { bg: "bg-bgCard", label: "On surface", border: true },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl ${s.bg} ${s.border ? "border border-ink/10" : ""} p-8 grid place-items-center`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.webp" alt="Frox" className="w-14 h-14 rounded-xl" />
                <span className={`mt-4 text-[12.5px] ${s.bg === "bg-[#07070a]" ? "text-white/50" : "text-textFaint"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-bold tracking-tight mb-5">Color</h2>
          <div className="grid sm:grid-cols-5 gap-4">
            {COLORS.map((c) => (
              <div key={c.name} className="card overflow-hidden">
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="text-[13.5px] font-medium">{c.name}</p>
                  <p className="text-[12px] text-textFaint font-mono">{c.hex}</p>
                  <p className="text-[11.5px] text-textDim mt-1">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-5">Typography</h2>
          <div className="card p-7 space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-3xl font-bold tracking-tight">Inter</span>
              <span className="text-sm text-textFaint">Interface, headings</span>
            </div>
            <div className="hairline !my-0" />
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-3xl">Instrument Serif</span>
              <span className="text-sm text-textFaint">Accent emphasis</span>
            </div>
            <div className="hairline !my-0" />
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-2xl">JetBrains Mono</span>
              <span className="text-sm text-textFaint">Code, data</span>
            </div>
          </div>
        </section>

        <p className="text-sm text-textFaint mt-10">
          Questions about usage? Write to <a href="mailto:brand@froxstudio.ai" className="text-accent hover:underline">brand@froxstudio.ai</a>.
          Press-specific resources live on the <Link href="/press" className="text-accent hover:underline">press</Link> page.
        </p>
      </div>
    </div>
  );
}