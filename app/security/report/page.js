import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const STEPS = [
  ["Email us privately", "Send the details to security@froxstudio.ai. Include reproduction steps, impact, and any proof-of-concept. Encrypt with our public key if the report is sensitive."],
  ["We acknowledge", "Expect an acknowledgement within 48 hours. A human will confirm receipt and give you a point of contact."],
  ["We investigate", "We reproduce the issue, assess severity, and keep you updated as we work on a fix. Timelines vary with the bug."],
  ["Coordinated disclosure", "We'll agree on a disclosure date with you, credit you if you'd like, and publish a note once a fix is out."],
];

export const metadata = {
  title: "Report a vulnerability",
  description: "Report a security vulnerability to Frox.",
};

export default function SecurityReportPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Security"
        title="Report a vulnerability"
        sub="We take responsible disclosure seriously and we won't pursue legal action against researchers who follow this process in good faith."
      >
        <a href="mailto:security@froxstudio.ai" className="btn-primary">security@froxstudio.ai</a>
        <Link href="/security" className="btn-secondary">Security overview</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-2xl">
        <RevealGroup as="ol" className="space-y-4 list-in" step={90}>
          {STEPS.map(([title, text], i) => (
            <li key={title} className="card p-6 flex gap-5">
              <span className="w-9 h-9 rounded-full grad-bg grid place-items-center text-white font-bold text-sm shrink-0">{i + 1}</span>
              <div>
                <h2 className="font-semibold mb-1.5">{title}</h2>
                <p className="text-sm text-textDim leading-relaxed text-pretty">{text}</p>
              </div>
            </li>
          ))}
        </RevealGroup>

        <div className="mt-10 card p-6">
          <h2 className="font-semibold mb-3">In scope</h2>
          <ul className="space-y-2 text-sm text-textDim">
            {["froxstudio.ai and subdomains", "The Frox web app and API", "Authentication and account systems"].map((s) => (
              <li key={s} className="flex items-center gap-2.5"><span className="text-accent"><Icon name="check" size={14} /></span>{s}</li>
            ))}
          </ul>
          <p className="text-sm text-textFaint mt-4">Please don&apos;t run automated scans that degrade service, access other users&apos; data, or test on production with destructive payloads.</p>
        </div>
      </div>
    </div>
  );
}