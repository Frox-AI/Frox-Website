import Link from "next/link";
import PageHero from "@/components/PageHero";
import { JOBS } from "@/lib/content";

const VALUES = [
  { title: "Ship, then refine", desc: "We prefer a rough thing in front of users over a perfect thing in a doc." },
  { title: "Write it down", desc: "Async-first means decisions live in writing, not in someone's head." },
  { title: "Say what's true", desc: "About the product, the roadmap, and the work. Especially when it's inconvenient." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Careers"
        title="Build Frox with us"
        sub="We're a small remote team building open-weight AI models. If you like owning a problem end to end and hate busywork, you'll fit here."
      >
        <a href="mailto:careers@froxstudio.ai" className="btn-primary">Say hello</a>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6">
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-textDim leading-relaxed text-pretty">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Open positions</h2>
          <span className="text-sm text-textFaint">{JOBS.length} roles · all remote</span>
        </div>
        <div className="space-y-3">
          {JOBS.map((j) => (
            <Link key={j.id} href={`/careers/${j.id}`} className="card p-5 flex items-center justify-between gap-4 hover:!border-ink/20">
              <div>
                <h3 className="font-semibold">{j.title}</h3>
                <p className="text-sm text-textFaint mt-0.5">{j.team} · {j.location} · {j.type}</p>
              </div>
              <span className="text-accent text-sm whitespace-nowrap">View role →</span>
            </Link>
          ))}
        </div>

        <p className="text-sm text-textFaint mt-10">
          Don&apos;t see your role? Email <a href="mailto:careers@froxstudio.ai" className="text-accent hover:underline">careers@froxstudio.ai</a> and tell us what you&apos;d build.
        </p>
      </div>
    </div>
  );
}