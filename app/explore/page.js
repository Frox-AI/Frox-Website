import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const TABS = [
  { label: "Prompts", n: "1,240+", desc: "Community prompts that reliably produce good results, tagged by model." },
  { label: "Images", n: "8,700+", desc: "Public generations people chose to share, with the prompt still attached." },
  { label: "3D", n: "410+", desc: "Printable and renderable meshes made with Frox 3D." },
  { label: "Audio", n: "1,900+", desc: "Voices, sound effects, and short clips from across the platform." },
];

const FEATURED = [
  { title: "Isometric city kit", by: "@mira", tag: "3D", grad: "from-violet-500/30 to-cyan-500/20" },
  { title: "Noir office scenes", by: "@dorian", tag: "Image", grad: "from-slate-500/30 to-indigo-500/20" },
  { title: "Calm narration voice", by: "@helena", tag: "Audio", grad: "from-emerald-500/30 to-teal-500/20" },
  { title: "Refactor recipes", by: "@yuki", tag: "Code", grad: "from-amber-500/30 to-rose-500/20" },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Explore"
        title="Made with Frox, shared by people"
        sub="A look at what the community is building. Everything here was published publicly by its creator, and prompts are shown alongside results."
      >
        <Link href="/community" className="btn-secondary">Join the community</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {TABS.map((t) => (
            <div key={t.label} className="card p-6">
              <p className="text-2xl font-bold tracking-tight grad-text">{t.n}</p>
              <p className="font-medium mt-1">{t.label}</p>
              <p className="text-[13px] text-textDim mt-2 leading-relaxed text-pretty">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
          <span className="text-sm text-textFaint">Updated weekly</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((f) => (
            <div key={f.title} className="card overflow-hidden group cursor-pointer">
              <div className={`h-40 bg-gradient-to-br ${f.grad} grid place-items-center`}>
                <Icon name="sparkles" size={26} className="text-white/70" />
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-accent2">{f.tag}</p>
                <p className="font-medium mt-1 group-hover:text-accent transition-colors">{f.title}</p>
                <p className="text-[12.5px] text-textFaint mt-0.5">by {f.by}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-textFaint mt-10">Public galleries are opt-in. Nothing you generate is shared unless you choose to share it.</p>
      </div>
    </div>
  );
}