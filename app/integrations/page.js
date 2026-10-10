import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const INTEGRATIONS = [
  { name: "Python SDK", desc: "First-class client with streaming, retries, and typed responses.", cat: "Language" },
  { name: "JavaScript SDK", desc: "Works in Node and the browser, with edge-runtime support.", cat: "Language" },
  { name: "Go SDK", desc: "Small dependency footprint for backend services.", cat: "Language" },
  { name: "VS Code", desc: "Use Frox Code without leaving your editor.", cat: "Tool" },
  { name: "JetBrains", desc: "Inline explanation and refactoring for IDEs from JetBrains.", cat: "Tool" },
  { name: "Zapier", desc: "Trigger generations from thousands of connected apps.", cat: "Automation" },
  { name: "n8n", desc: "Self-hosted workflow automation with Frox nodes.", cat: "Automation" },
  { name: "LangChain", desc: "Drop-in model provider for existing chains.", cat: "Framework" },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Integrations"
        title="Frox everywhere you already work"
        sub="Official SDKs and community-built connectors. If you've built something with the API, we're happy to list it here."
      >
        <Link href="/docs" className="btn-primary">Read the API docs</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((it) => (
            <div key={it.name} className="card p-6">
              <span className="text-[11px] uppercase tracking-widest text-textFaint">{it.cat}</span>
              <h2 className="font-semibold mt-2 mb-1.5">{it.name}</h2>
              <p className="text-[13px] text-textDim leading-relaxed text-pretty">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white shrink-0"><Icon name="terminal" size={18} /></span>
            <div>
              <h2 className="font-semibold">Built an integration?</h2>
              <p className="text-sm text-textDim mt-1 text-pretty">Send us the link and a one-line description. We list community integrations that are actively maintained.</p>
            </div>
          </div>
          <a href="mailto:developers@froxstudio.ai" className="btn-secondary shrink-0">Submit an integration</a>
        </div>
      </div>
    </div>
  );
}