import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const CATEGORIES = [
  {
    name: "Getting started",
    topics: [
      { href: "/help/getting-started", label: "Create your account and first chat" },
      { href: "/help/account", label: "Plans, billing, and account basics" },
      { href: "/help/faq", label: "Frequently asked questions" },
    ],
  },
  {
    name: "Products",
    topics: [
      { href: "/help/chat", label: "Chat: models, context, and exports" },
      { href: "/help/image", label: "Image: presets, upscaling, and history" },
      { href: "/help/audio", label: "Audio: voices, SFX, and cloning consent" },
      { href: "/help/coding", label: "Code: explain, debug, review, refactor" },
      { href: "/help/3d", label: "3D: image-to-mesh and exports" },
    ],
  },
  {
    name: "Troubleshooting",
    topics: [
      { href: "/help/troubleshooting", label: "Models failing, timeouts, and retries" },
      { href: "/help/billing", label: "Charges, credits, and refunds" },
    ],
  },
];

export const metadata = {
  title: "Help Center",
  description: "Guides and answers for using Frox.",
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Help center"
        title="How can we help?"
        sub="Guides for every Frox product, written by the team that builds them. If your question isn't here, support is one click away."
      >
        <Link href="/support" className="btn-primary">Contact support</Link>
        <Link href="/docs" className="btn-secondary">Developer docs</Link>
      </PageHero>

      <div className="container-x pb-24">
        <RevealGroup className="grid gap-8 md:grid-cols-3 stagger" step={90}>
          {CATEGORIES.map((c) => (
            <div key={c.name}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-textFaint mb-4">{c.name}</h2>
              <ul className="space-y-2.5">
                {c.topics.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-start gap-3 text-[15px] text-textDim hover:text-text transition-colors">
                      <span className="mt-1 text-textFaint group-hover:text-accent transition-colors"><Icon name="cornerDownRight" size={15} /></span>
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-16 card card-hover p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-semibold">Still stuck?</h2>
            <p className="text-sm text-textDim mt-1 text-pretty">Our support team answers within one business day, and usually faster.</p>
          </div>
          <Link href="/support/new" className="btn-primary shrink-0">Open a ticket</Link>
        </div>
      </div>
    </div>
  );
}