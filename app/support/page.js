import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const CHANNELS = [
  { icon: "cornerDownRight", title: "Open a ticket", desc: "Best for account, billing, and bug reports. We reply within one business day.", href: "/support/new", cta: "New ticket" },
  { icon: "book", title: "Browse the help center", desc: "Most questions are answered here already, across every product.", href: "/help", cta: "Open help" },
  { icon: "terminal", title: "Developer support", desc: "API issues, SDKs, and integration questions.", href: "/docs", cta: "Read docs" },
];

export const metadata = {
  title: "Support",
  description: "Get help from the Frox team.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Support"
        title="We're here to help"
        sub="Pick the fastest route for your question. Tickets are answered by engineers, not a script."
      >
        <Link href="/support/new" className="btn-primary">Open a ticket</Link>
        <Link href="/support/status" className="btn-secondary">Check status</Link>
      </PageHero>

      <div className="container-x pb-24">
        <RevealGroup className="grid gap-5 md:grid-cols-3 stagger">
          {CHANNELS.map((c) => (
            <div key={c.title} className="card card-hover p-7 flex flex-col">
              <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white mb-4"><Icon name={c.icon} size={18} /></span>
              <h2 className="font-semibold mb-2">{c.title}</h2>
              <p className="text-sm text-textDim leading-relaxed text-pretty flex-1">{c.desc}</p>
              <Link href={c.href} className="btn-secondary !py-2 !px-4 text-sm mt-5">{c.cta}</Link>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-16 card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-semibold">Security issue?</h2>
            <p className="text-sm text-textDim mt-1 text-pretty">Please report vulnerabilities privately rather than in a public ticket.</p>
          </div>
          <Link href="/security/report" className="btn-secondary shrink-0">Report a vulnerability</Link>
        </div>
      </div>
    </div>
  );
}