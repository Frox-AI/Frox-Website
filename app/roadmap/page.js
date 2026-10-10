import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const COLUMNS = [
  {
    label: "Now",
    tone: "emerald",
    note: "Shipping this quarter",
    items: [
      { title: "Chat workspace", done: true, desc: "Streaming, citations, per-thread model switching, and shared links." },
      { title: "Frox Code editor", done: true, desc: "Explain, debug, review, refactor, and generate tests inside a real editor shell." },
      { title: "Voice cloning", done: true, desc: "Match a voice from a short sample, then reuse it across projects." },
      { title: "Usage dashboard", done: true, desc: "Per-product quotas, spend, and exports in one place." },
    ],
  },
  {
    label: "Next",
    tone: "accent",
    note: "In active development",
    items: [
      { title: "Image editing", done: false, desc: "Inpainting, background removal, and outpainting on top of the generator." },
      { title: "Better 3D meshes", done: false, desc: "Cleaner topology and reliable texture baking before we call it stable." },
      { title: "Desktop app", done: false, desc: "Native macOS and Windows clients with local file access." },
      { title: "Team workspaces", done: false, desc: "Shared projects, roles, and billing for small teams." },
    ],
  },
  {
    label: "Later",
    tone: "textFaint",
    note: "On the drawing board",
    items: [
      { title: "Self-serve fine-tuning", done: false, desc: "Upload a dataset, fine-tune a Frox model, and deploy it behind the same API." },
      { title: "Music generation", done: false, desc: "Full-length music stems alongside the existing SFX tools." },
      { title: "Mobile apps", done: false, desc: "Companion apps for chat and image capture." },
      { title: "Agent workflows", done: false, desc: "Chain models together with branching and retries." },
    ],
  },
];

export const metadata = {
  title: "Roadmap",
  description: "What we are building next.",
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Roadmap"
        title="Where Frox is heading"
        sub="We publish this so you can plan around us. Dates slip sometimes — direction doesn't. Items move right when they're not ready."
      >
        <Link href="/waitlist" className="btn-primary">Get updates</Link>
        <Link href="/changelog" className="btn-secondary">What shipped recently</Link>
      </PageHero>

      <div className="container-x pb-24">
        <RevealGroup className="grid gap-6 lg:grid-cols-3 stagger">
          {COLUMNS.map((col) => (
            <div key={col.label} className="card card-hover p-7">
              <div className="flex items-center gap-2.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${col.tone === "emerald" ? "bg-emerald-400" : col.tone === "accent" ? "bg-accent" : "bg-textFaint"}`} />
                <h2 className="text-lg font-bold tracking-tight">{col.label}</h2>
              </div>
              <p className="text-[13px] text-textFaint mb-6">{col.note}</p>
              <ul className="space-y-5 list-in">
                {col.items.map((it) => (
                  <li key={it.title} className="flex gap-3">
                    <span className={`mt-0.5 shrink-0 ${it.done ? "text-emerald-500" : "text-textFaint"}`}>
                      <Icon name={it.done ? "checkCircle" : "cornerDownRight"} size={16} />
                    </span>
                    <div>
                      <p className="text-[14.5px] font-medium">{it.title}</p>
                      <p className="text-[13px] text-textDim leading-relaxed mt-0.5 text-pretty">{it.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealGroup>

        <p className="text-sm text-textFaint mt-10 max-w-2xl">
          Have a request that isn&apos;t listed? Tell us at{" "}
          <a href="mailto:hello@froxstudio.ai" className="text-accent hover:underline">hello@froxstudio.ai</a> — we read everything and vote internally.
        </p>
      </div>
    </div>
  );
}