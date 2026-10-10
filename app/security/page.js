import Icon from "@/components/Icon";

const PILLARS = [
  { icon: "shield", title: "Encryption everywhere", desc: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Keys are rotated automatically." },
  { icon: "search", title: "Continuous monitoring", desc: "24/7 threat detection, anomaly alerts, and automated incident response across the platform." },
  { icon: "checkCircle", title: "SOC 2 Type II", desc: "Independently audited controls for security, availability, and confidentiality." },
  { icon: "globe", title: "GDPR & CCPA ready", desc: "Data residency controls, right-to-erasure tooling, and full audit trails built in." },
  { icon: "lock", title: "Zero-trust access", desc: "Least-privilege IAM, hardware security keys, and mandatory MFA for all staff." },
  { icon: "flask", title: "Regular audits & pen tests", desc: "Quarterly third-party penetration tests and an active responsible-disclosure program." },
];

export const metadata = {
  title: "Security",
  description: "How Frox handles security and privacy.",
};

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Security at <span className="grad-text">Frox Studio</span>
          </h1>
          <p className="text-textDim text-lg">
            Security is foundational to everything we build. Here&apos;s how we protect your data and models.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PILLARS.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="w-10 h-10 rounded-lg grad-bg grid place-items-center text-white mb-4">
                <Icon name={p.icon} size={18} />
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-textDim">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="cta-banner rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Report a vulnerability</h2>
          <p className="text-textDim mb-6">Found a security issue? We appreciate responsible disclosure.</p>
          <a href="mailto:security@froxstudio.ai" className="btn-primary inline-flex">security@froxstudio.ai</a>
        </div>
      </div>
    </div>
  );
}
