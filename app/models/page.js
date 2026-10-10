import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const MODELS = [
  {
    id: "flex",
    name: "Frox Flex",
    tag: "Chat · Reasoning",
    desc: "Our general-purpose model for conversation, analysis, and drafting. Strong at staying on-topic and following instructions through long threads.",
    strengths: ["256K context window", "Streaming with citations", "Tool-call formatting stable across sessions"],
    href: "/chat",
    badge: "Live",
  },
  {
    id: "code",
    name: "Frox Code",
    tag: "Coding",
    desc: "A code specialist tuned for real editing sessions rather than narrow benchmarks. Handles multi-file changes and keeps diffs readable.",
    strengths: ["40+ language syntax awareness", "Explain, debug, review, refactor", "128K context"],
    href: "/code",
    badge: "Live",
  },
  {
    id: "image",
    name: "Frox Image",
    tag: "Text → Image",
    desc: "Image generation tuned for variety, prompt adherence, and clean edges. Good enough for drafts and presentable enough for real use.",
    strengths: ["Style presets", "Upscale and variations", "Full generation history"],
    href: "/image",
    badge: "Live",
  },
  {
    id: "audio",
    name: "Frox Voice",
    tag: "Speech · SFX",
    desc: "Neural voices and sound-effects generation. Record a few seconds to match a voice, or design one from parameters.",
    strengths: ["Voice cloning from short samples", "Speech, SFX, and music stems", "Transcription included"],
    href: "/audio",
    badge: "Live",
  },
  {
    id: "3d",
    name: "Frox 3D",
    tag: "Text / Image → 3D",
    desc: "Turn a prompt or a reference image into a textured mesh. The pipeline is early and honest about it — see the roadmap.",
    strengths: ["Image-to-3D first pass", "GLB/glTF export", "Mesh repair tools"],
    href: "/3d",
    badge: "Beta",
  },
];

export const metadata = {
  title: "Models",
  description: "Open-weight models for every modality.",
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Models"
        title="Five models. One API. Open weights."
        sub="Every model below runs on the same platform and speaks the same API. Core weights are open-source on Hugging Face, so you can self-host what we serve."
      >
        <Link href="/docs" className="btn-primary">Read the docs</Link>
        <a href="https://huggingface.co/FroxStudio" className="btn-secondary" target="_blank" rel="noreferrer">Weights on Hugging Face</a>
      </PageHero>

      <div className="container-x pb-24">
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((m) => (
            <div key={m.id} className="card card-hover p-7 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="w-11 h-11 rounded-xl grad-bg grid place-items-center font-bold text-white">{m.name.split(" ")[1][0].toUpperCase()}</span>
                <span className={`chip !text-[12px] ${m.badge === "Live" ? "!text-emerald-600 dark:!text-emerald-400" : "!text-accent2"}`}>{m.badge}</span>
              </div>
              <h2 className="mt-5 text-xl font-bold tracking-tight">{m.name}</h2>
              <p className="text-[12.5px] uppercase tracking-widest text-accent2 mt-0.5">{m.tag}</p>
              <p className="mt-3 text-sm text-textDim leading-relaxed text-pretty">{m.desc}</p>
              <ul className="mt-5 space-y-2.5 text-[13.5px] text-textDim">
                {m.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5"><Icon name="check" size={14} /></span>
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={m.href} className="mt-6 btn-secondary !py-2 !px-4 text-sm mt-auto">Open {m.name.split(" ")[1]}</Link>
            </div>
          ))}

          <div className="card card-hover p-7 flex flex-col justify-between border-dashed !border-ink/15">
            <div>
              <span className="w-11 h-11 rounded-xl bg-ink/[0.05] border border-ink/10 grid place-items-center text-textFaint">
                <Icon name="sparkles" size={18} />
              </span>
              <h2 className="mt-5 text-xl font-bold tracking-tight">Next up</h2>
              <p className="mt-3 text-sm text-textDim leading-relaxed text-pretty">
                We&apos;re training a dedicated voice model for SFX and music. Watch the <Link href="/roadmap" className="text-accent hover:underline">roadmap</Link> or get on the{" "}
                <Link href="/waitlist" className="text-accent hover:underline">waitlist</Link>.
              </p>
            </div>
            <Link href="/waitlist" className="btn-secondary !py-2 !px-4 text-sm mt-6">Join the waitlist</Link>
          </div>
        </RevealGroup>

        <div className="mt-16 glass border border-ink/10 rounded-3xl p-8 sm:p-10">
          <RevealGroup className="grid md:grid-cols-3 gap-8">
            {[
              { n: "Same API", d: "Swap models with one JSON field. No per-model SDKs to learn." },
              { n: "Host anywhere", d: "Open weights mean your data never has to leave your cloud." },
              { n: "Readable releases", d: "Each model gets a card with training notes, limits, and evals." },
            ].map((b) => (
              <div key={b.n}>
                <h3 className="font-semibold mb-1.5">{b.n}</h3>
                <p className="text-sm text-textDim leading-relaxed">{b.d}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
}