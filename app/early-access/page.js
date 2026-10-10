import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const PERKS = [
  "Access to models before public release",
  "Direct line to the team building them",
  "Early weight drops on Hugging Face",
  "Influence over the roadmap, not just visibility into it",
];

export const metadata = {
  title: "Early access",
  description: "Get early access to new Frox models.",
};

export default function EarlyAccessPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Early access"
        title="Work closer to the build"
        sub="Early access is for people who want to use new models while they're rough and tell us what breaks. In exchange you get features first and a real say in what we fix."
      >
        <Link href="/waitlist" className="btn-primary">Request access</Link>
        <Link href="/roadmap" className="btn-secondary">See the roadmap</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-2xl">
        <div className="card p-8">
          <h2 className="font-semibold mb-4">What you get</h2>
          <ul className="space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-textDim">
                <span className="text-accent mt-0.5"><Icon name="check" size={16} /></span>
                {p}
              </li>
            ))}
          </ul>
          <div className="hairline my-6" />
          <h2 className="font-semibold mb-2">What we ask</h2>
          <p className="text-sm text-textDim leading-relaxed text-pretty">
            Use the tools on real work and send honest feedback — including the failures. Early builds change shape quickly, and the people closest to them make the strongest product.
          </p>
          <Link href="/waitlist" className="btn-primary mt-6">Request access</Link>
        </div>
      </div>
    </div>
  );
}