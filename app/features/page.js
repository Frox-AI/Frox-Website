import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const GROUPS = [
  {
    title: "One platform, five models",
    eyebrow: "Products",
    items: [
      { icon: "code", label: "Frox Chat", href: "/chat", desc: "A fast conversational workspace with streaming, markdown, and per-conversation model switching. Built on FineWeb-style open weights." },
      { icon: "file", label: "Frox Image", href: "/image", desc: "Text-to-image generation with style presets, upscaling, and batch runs. Everything stays in your library." },
      { icon: "globe", label: "Frox Voice", href: "/audio", desc: "Neural speech, sound effects, and transcription in one workspace. Pick a voice or tune one from scratch." },
      { icon: "code", label: "Frox Code", href: "/code", desc: "Explain, debug, review, and refactor in 40+ languages. The workspace mirrors a real editor, not a toy." },
      { icon: "pen", label: "Frox 3D", href: "/3d", desc: "Text- and image-to-3D with texture and material controls. Export to GLB, glTF, OBJ, or FBX." },
    ],
  },
  {
    title: "Designed for serious use",
    eyebrow: "Platform",
    items: [
      { icon: "shieldCheck", label: "Privacy first", desc: "Your generations stay in your account. No training on your prompts, no selling your data." },
      { icon: "terminal", label: "Developer API", desc: "A single REST + streaming API for all five models. Python, JavaScript, and Go SDKs." },
      { icon: "checkCircle", label: "Open weights", desc: "Core models are open-source on Hugging Face. Self-host with the same weights we serve." },
      { icon: "refresh", label: "Handoff between models", desc: "Ask Frox Code to produce an image, or have Frox 3D take a finished render and make it a mesh. Models cooperate." },
      { icon: "lock", label: "Workspaces", desc: "Projects, folders, and history organized per product — and a single dashboard that ties them together." },
      { icon: "search", label: "Human review", desc: "Verifier checks on outputs keep quality honest, and you always see when a result was machine-checked." },
    ],
  },
];

export const metadata = {
  title: "Features",
  description: "What you can do with Frox.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Features"
        title="What Frox actually does"
        sub="Five working models, an API, and a workspace that doesn't get in the way. Most of the AI features here are live today — the rest are on the public roadmap."
      >
        <Link href="/chat" className="btn-primary">Open the chat app</Link>
        <Link href="/models" className="btn-secondary">See all models</Link>
      </PageHero>

      <div className="container-x pb-24 space-y-20">
        {GROUPS.map((group, gi) => (
          <section key={group.title}>
            <div className="mb-8 max-w-xl">
              <p className="text-[12px] uppercase tracking-widest text-accent2 mb-2">{group.eyebrow}</p>
              <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
            </div>
            <div className={`grid gap-5 ${gi === 0 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {group.items.map((it) => (
                <div key={it.label} className="card p-6 flex flex-col">
                  <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white mb-4">
                    <Icon name={it.icon} size={18} />
                  </span>
                  <h3 className="font-semibold mb-2">{it.label}</h3>
                  <p className="text-sm text-textDim leading-relaxed text-pretty">{it.desc}</p>
                  {it.href && (
                    <Link href={it.href} className="mt-4 text-sm font-medium text-accent hover:opacity-80 transition-opacity">
                      Try it →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="glass border border-ink/10 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-balance">Try the thing that matters most: a finished workflow</h2>
          <p className="mt-3 text-textDim max-w-xl mx-auto text-pretty">
            Describe a product idea, get a working prototype in the chat, and hand it to Frox Code to verify the code. That&apos;s the flow we optimized for — not a dashboard of buttons.
          </p>
          <Link href="/chat" className="btn-primary mt-6">Start a conversation</Link>
        </section>
      </div>
    </div>
  );
}