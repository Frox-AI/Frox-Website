import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const TIERS = [
  { name: "Cloud providers", desc: "Reference integrations that let Frox models run inside regional clouds so data stays in-country." },
  { name: "Model hosts", desc: "Registered listings for running Frox open weights on managed inference platforms." },
  { name: "Developer tools", desc: "Editors, notebook environments, and CI systems that ship Frox templates out of the box." },
  { name: "Hardware", desc: "Vendors tuning kernels and quantization profiles for our model family." },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Partners"
        title="Build with Frox"
        sub="We work with infrastructure providers and tool makers to make Frox models easy to run wherever your data already lives."
      >
        <a href="mailto:partners@froxstudio.ai" className="btn-primary">Become a partner</a>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.name} className="card p-7">
              <span className="w-10 h-10 rounded-xl bg-ink/[0.05] border border-ink/10 grid place-items-center text-accent mb-4">
                <Icon name="cornerDownRight" size={18} />
              </span>
              <h2 className="font-semibold mb-2">{t.name}</h2>
              <p className="text-sm text-textDim leading-relaxed text-pretty">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass border border-ink/10 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold tracking-tight">Interested in a technical partnership?</h2>
            <p className="text-textDim mt-2 text-pretty">Tell us what you build and where Frox would fit. We reply to every serious inquiry within a few days.</p>
          </div>
          <a href="mailto:partners@froxstudio.ai" className="btn-primary shrink-0">Contact partnerships</a>
        </div>

        <p className="text-sm text-textFaint mt-8">See developer integration details on the <Link href="/integrations" className="text-accent hover:underline">integrations</Link> page.</p>
      </div>
    </div>
  );
}