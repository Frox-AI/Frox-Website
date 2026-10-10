import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const SPACES = [
  { title: "Discussions", desc: "Long-form threads about how people use Frox, what works, and what doesn't.", icon: "cornerDownRight" },
  { title: "Questions", desc: "A Q&A space where builders help each other unblock their projects.", icon: "lightbulb" },
  { title: "Challenges", desc: "Monthly prompts with a theme. Share what you make and see the rest.", icon: "sparkles" },
  { title: "Events", desc: "Office hours and community calls, recorded for anyone who misses them.", icon: "globe" },
];

export const metadata = {
  title: "Community",
  description: "Join the Frox community.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Community"
        title="A place to share and ask"
        sub="The Frox community is where people show what they built, trade prompts, and compare notes. Be generous, be specific, and assume good intent."
      >
        <a href="https://huggingface.co/FroxStudio" target="_blank" rel="noreferrer" className="btn-primary">Visit us on Hugging Face</a>
        <Link href="/legal/community" className="btn-secondary">Read the guidelines</Link>
      </PageHero>

      <div className="container-x pb-24">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 stagger">
          {SPACES.map((s) => (
            <div key={s.title} className="card card-hover p-7">
              <span className="w-10 h-10 rounded-xl bg-ink/[0.05] border border-ink/10 grid place-items-center text-accent mb-4">
                <Icon name={s.icon} size={18} />
              </span>
              <h2 className="font-semibold mb-2">{s.title}</h2>
              <p className="text-sm text-textDim leading-relaxed text-pretty">{s.desc}</p>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-16 glass border border-ink/10 rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-xl font-bold tracking-tight">New here? Start a thread.</h2>
          <p className="text-textDim mt-2 max-w-lg mx-auto text-pretty">Introduce yourself with something you made and something you&apos;re stuck on. Both are welcome.</p>
          <Link href="/community/discussions" className="btn-primary mt-6">Open discussions</Link>
        </div>
      </div>
    </div>
  );
}