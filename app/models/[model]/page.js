import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const MODELS = {
  chat: {
    title: "Frox Chat",
    tag: "Conversation · Reasoning",
    sub: "A conversational model tuned to stay useful across long threads, not just the first reply.",
    app: "/chat",
    features: [
      ["256K context", "Hold entire documents and codebases in the conversation without losing the thread."],
      ["Streaming responses", "Text arrives as it is generated, with markdown, tables, and code rendered live."],
      ["Tool-ready output", "Structured JSON and function-call formatting that stays stable across sessions."],
      ["Shared threads", "Publish a read-only snapshot of any conversation and revoke it later."],
    ],
    specs: [["Context", "256K tokens"], ["Modality", "Text in, text out"], ["Weights", "Open on Hugging Face"], ["Best for", "Analysis, drafting, research"]],
  },
  image: {
    title: "Frox Image",
    tag: "Text → Image",
    sub: "Image generation balancing prompt adherence with visual variety.",
    app: "/image",
    features: [
      ["Style presets", "Keep a consistent look across a set of images with one click."],
      ["Upscale & variations", "Enlarge a result or explore nearby options without rewriting the prompt."],
      ["Reproducible library", "Every image is saved with its prompt so a good result stays repeatable."],
      ["Batch runs", "Queue several prompts at once and review them together."],
    ],
    specs: [["Resolution", "Up to 2048px"], ["Modality", "Text in, image out"], ["Styles", "Presets + custom"], ["Best for", "Concept art, drafts, marketing"]],
  },
  voice: {
    title: "Frox Voice",
    tag: "Speech · TTS",
    sub: "Natural speech synthesis with voices you can pick, tune, or clone with consent.",
    app: "/audio",
    features: [
      ["Voice library", "Ready-made voices for narration, ads, and dialogue."],
      ["Voice design", "Adjust pitch, pace, and timbre to build a voice from scratch."],
      ["Consent-based cloning", "Match a voice from a short sample with a recorded consent statement."],
      ["Transcription", "Speech-to-text runs in the same workspace for round-tripping."],
    ],
    specs: [["Sample rate", "48 kHz"], ["Modality", "Text in, audio out"], ["Languages", "Multilingual"], ["Best for", "Narration, accessibility, demos"]],
  },
  sfx: {
    title: "Frox Sound Effects",
    tag: "Audio · SFX",
    sub: "Generate one-off sound effects from a description, without a sample library.",
    app: "/audio",
    features: [
      ["Text-to-SFX", "Describe a sound and get a clip ready for editing."],
      ["Duration control", "Set the length you need instead of trimming after the fact."],
      ["Collections", "Group effects into sets for a project and reuse them."],
      ["Stem-friendly export", "Download clean files that drop straight into a timeline."],
    ],
    specs: [["Length", "0.5–20 seconds"], ["Format", "WAV, MP3"], ["Modality", "Text in, audio out"], ["Best for", "Games, video, prototypes"]],
  },
  coding: {
    title: "Frox Coding",
    tag: "Code",
    sub: "A code specialist built for editing sessions rather than trivia.",
    app: "/code",
    features: [
      ["Explain & review", "Understand unfamiliar code and get reviews that lead with correctness."],
      ["Debug & refactor", "Trace symptoms back to causes and refactor without changing behavior."],
      ["Tests & docs", "Generate tests and documentation you can edit before committing."],
      ["40+ languages", "Syntax-aware across mainstream and niche languages."],
    ],
    specs: [["Context", "128K tokens"], ["Languages", "40+"], ["Weights", "Open on Hugging Face"], ["Best for", "Editing, reviews, legacy code"]],
  },
  "3d": {
    title: "Frox 3D",
    tag: "Text / Image → 3D",
    sub: "Turn a prompt or reference image into a textured mesh. Early, and honest about it.",
    app: "/3d",
    features: [
      ["Image-to-3D", "A clean reference image reconstructs best — clear subject, simple background."],
      ["Text-to-3D", "Prompt simple objects directly; complex scenes work better from an image."],
      ["Repair tools", "Fill holes and smooth noise before export."],
      ["Multiple formats", "Export GLB or glTF, with OBJ and FBX through the converter."],
    ],
    specs: [["Status", "Beta"], ["Formats", "GLB, glTF, OBJ, FBX"], ["Modality", "Text/image in, mesh out"], ["Best for", "Props, blockouts, prototyping"]],
  },
};

export function generateStaticParams() {
  return Object.keys(MODELS).map((model) => ({ model }));
}

export function generateMetadata({ params }) {
  const m = MODELS[params.model];
  return { title: m ? m.title : "Models" };
}

export default function ModelDetailPage({ params }) {
  const m = MODELS[params.model];
  if (!m) notFound();

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero eyebrow={m.tag} title={m.title} sub={m.sub}>
        <Link href={m.app} className="btn-primary">Open {m.title}</Link>
        <Link href="/models" className="btn-secondary">All models</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-5">Capabilities</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {m.features.map(([title, text]) => (
                <div key={title} className="card p-6">
                  <span className="w-9 h-9 rounded-lg bg-ink/[0.05] border border-ink/10 grid place-items-center text-accent mb-3">
                    <Icon name="check" size={16} />
                  </span>
                  <h3 className="font-semibold mb-1.5">{title}</h3>
                  <p className="text-[13.5px] text-textDim leading-relaxed text-pretty">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:pt-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Specifications</h2>
              <dl className="space-y-3 text-sm">
                {m.specs.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <dt className="text-textFaint">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="hairline my-5" />
              <Link href={m.app} className="btn-primary w-full">Try {m.title.split(" ")[1]}</Link>
              <Link href="/docs" className="btn-secondary w-full mt-2.5">API reference</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}