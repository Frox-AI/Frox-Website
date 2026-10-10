import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const PILLARS = [
  { icon: "lock", title: "Encryption in transit and at rest", desc: "TLS for every request and encrypted storage for prompts and outputs. Keys are rotated on a schedule." },
  { icon: "shieldCheck", title: "Least-privilege access", desc: "Staff access to production is limited, reviewed, and requires multi-factor authentication." },
  { icon: "fileText", title: "No training on your data", desc: "Your prompts and outputs are not used to train our models. Retention is documented and deletion is available." },
  { icon: "globe", title: "Data residency", desc: "Choose where your data is stored. We offer regional hosting for teams that require it." },
  { icon: "search", title: "Monitoring and logging", desc: "Production systems are monitored around the clock, with alerts and audit logs kept for review." },
  { icon: "checkCircle", title: "Responsible disclosure", desc: "Report a vulnerability and we'll acknowledge it, investigate, and credit you once it's fixed." },
];

export const metadata = {
  title: "Security",
  description: "How Frox handles security and privacy.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Security"
        title="Security at Frox Studio"
        sub="What we do to protect your account, your data, and the models we serve. If you find a gap, we want to hear about it."
      >
        <Link href="/security/report" className="btn-primary">Report a vulnerability</Link>
        <Link href="/legal/privacy" className="btn-secondary">Read the privacy policy</Link>
      </PageHero>

      <div className="container-x pb-24 space-y-16">
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 stagger">
          {PILLARS.map((p) => (
            <div key={p.title} className="card card-hover p-6">
              <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white mb-4">
                <Icon name={p.icon} size={18} />
              </span>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-textDim leading-relaxed text-pretty">{p.desc}</p>
            </div>
          ))}
        </RevealGroup>

        <section className="cta-banner rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Report a vulnerability</h2>
          <p className="text-textDim mb-6 max-w-lg mx-auto text-pretty">Found a security issue? We appreciate responsible disclosure.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/security/report" className="btn-primary">Start a report</Link>
            <a href="mailto:security@froxstudio.ai" className="btn-secondary">security@froxstudio.ai</a>
          </div>
        </section>
      </div>
    </div>
  );
}
