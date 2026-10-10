"use client";

import { useState } from "react";
import Link from "next/link";
import Icon, { LangBadge } from "@/components/Icon";
import Reveal from "@/components/Reveal";

const QUICKSTART = {
  Python: `from frox import Frox

client = Frox(api_key="fx-…")

# One call. Streaming by default.
stream = client.chat.stream(
    model="frox-flex",
    messages=[{"role": "user", "content": "Design a REST API"}],
)

for chunk in stream:
    print(chunk.text, end="")`,
  JavaScript: `import Frox from "@froxstudio/sdk";

const client = new Frox({ apiKey: process.env.FROX_KEY });

const stream = await client.chat.stream({
  model: "frox-flex",
  messages: [{ role: "user", content: "Design a REST API" }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`,
  Go: `client := frox.New(frox.WithAPIKey(os.Getenv("FROX_KEY")))

stream, err := client.Chat.Stream(ctx, frox.ChatRequest{
    Model: "frox-flex",
    Messages: []frox.Message{
        {Role: "user", Content: "Design a REST API"},
    },
})`,
  cURL: `curl https://api.froxstudio.ai/v1/chat/completions \\
  -H "Authorization: Bearer $FROX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "frox-flex",
    "messages": [{"role": "user", "content": "Hi"}]
  }'`,
};

/* "Powered by our frontier models" — mirrors the OpenAI platform model table. */
const PLATFORM_MODELS = [
  {
    name: "Frox Flex",
    id: "frox-flex",
    input: "$1.75",
    output: "$14.00",
    per: "per 1M tokens",
    specs: ["256K context", "32K max output", "Knowledge cut-off: Aug 2026"],
    tier: "Frontier",
  },
  {
    name: "Frox Code",
    id: "frox-code",
    input: "$1.20",
    output: "$9.60",
    per: "per 1M tokens",
    specs: ["128K context", "16K max output", "Knowledge cut-off: Aug 2026"],
    tier: "Specialized",
  },
  {
    name: "Frox Image",
    id: "frox-image",
    input: "$0.04",
    output: "—",
    per: "per image",
    specs: ["1024px output", "Style presets", "Image-to-image"],
    tier: "Multimodal",
  },
];

/* Model family sized by task, like the Claude "right-sized for any task" block. */
const FAMILY = [
  { name: "Frox Flash", tag: "Light & fast", body: "Our fastest model for lightweight actions and high-volume classification, extraction, and routing." },
  { name: "Frox Flex", tag: "Balanced", body: "The best combination of performance and speed for efficient, high-throughput everyday work." },
  { name: "Frox Reason", tag: "Powerful", body: "Highest-performing model for complex analysis, long multi-step tasks, and higher-order math and coding." },
];

const ENDPOINTS = [
  { method: "POST", path: "/v1/chat/completions", desc: "Chat with streaming, tool calling, and 256K context.", tag: "Text" },
  { method: "POST", path: "/v1/generations", desc: "Text-to-image up to 1024px with style and ratio control.", tag: "Image" },
  { method: "POST", path: "/v1/audio/speech", desc: "Text-to-speech and music generation.", tag: "Audio" },
  { method: "POST", path: "/v1/fine-tunes", desc: "Fine-tune Flex or Code with LoRA on your data.", tag: "Training" },
  { method: "GET", path: "/v1/models", desc: "List available models, context windows, and pricing.", tag: "Text" },
  { method: "POST", path: "/v1/embeddings", desc: "Embeddings for search, clustering, and RAG pipelines.", tag: "Text" },
];

const SDKS = [
  { name: "Python", lang: "Python", install: "pip install frox-sdk" },
  { name: "JavaScript", lang: "TypeScript", install: "npm install @froxstudio/sdk" },
  { name: "Go", lang: "Go", install: "go get github.com/froxstudio/frox-go" },
  { name: "Rust", lang: "Rust", install: "cargo add frox" },
];

/* Capability cards — the OpenAI "Voice / Video / Image" trio. */
const CAPABILITIES = [
  { icon: "waveform", title: "Voice", body: "Build natural-sounding voice agents with the Realtime API. Streaming speech in and out with interruption handling." },
  { icon: "image", title: "Image", body: "Generate and edit images from a text prompt or a reference, with aspect-ratio and style control." },
  { icon: "sparkles", title: "Agents", body: "Function calling, tool use, and structured output for customer-facing agents and multi-step workflows." },
];

const USE_CASES = [
  { title: "Coding", body: "Frox Code constantly improves on coding, math, and reasoning — completing multi-file engineering work that would otherwise take a full day." },
  { title: "Agents", body: "Superior instruction following, tool selection, error correction, and grounded reasoning for complex AI workflows." },
  { title: "Productivity", body: "Extract structured data from documents, categorize and summarize survey responses, and wrangle large text corpora." },
  { title: "Customer support", body: "Handle ticket triage, on-demand complex questions using rich context awareness, and multi-step support workflows." },
];

const GUARANTEES = [
  { icon: "shieldCheck", title: "Your data is yours", body: "API data is never used for training. Retention is zero by default on every plan." },
  { icon: "lock", title: "SOC 2 Type II", body: "Independently audited controls covering security, availability, and confidentiality." },
  { icon: "globe", title: "99.99% uptime", body: "Multi-region serving with automatic failover and a published status page." },
];

function Tabs({ tab, setTab }) {
  return (
    <div className="flex gap-1 border-b border-ink/[0.08] overflow-x-auto">
      {Object.keys(QUICKSTART).map((k) => (
        <button
          key={k}
          onClick={() => setTab(k)}
          className={`relative px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${tab === k ? "text-text" : "text-textFaint hover:text-textDim"}`}
        >
          {k}
          {tab === k && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent" />}
        </button>
      ))}
    </div>
  );
}

export default function DevelopersPage() {
  const [tab, setTab] = useState("Python");
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* ============ HERO ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <Reveal>
            <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-textFaint">frox/dev</p>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-[-0.035em] leading-[1.03] max-w-[16ch]">
              Build leading AI products on Frox&apos;s platform
            </h1>
            <p className="mt-6 text-[17px] text-textDim leading-relaxed max-w-[58ch]">
              One endpoint for text, image, audio, and 3D. OpenAI-compatible, streaming by default,
              and backed by open weights you can run yourself.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/auth/signup" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-text text-bg text-[14px] font-medium hover:opacity-90 transition-opacity">
                Start building
                <Icon name="chevronRight" size={14} className="opacity-70" />
              </Link>
              <Link href="/forge" className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-ink/[0.14] text-[14px] font-medium hover:bg-ink/[0.04] transition-colors">
                <Icon name="forge" size={15} />
                Try Forge
              </Link>
              <Link href="/contact" className="inline-flex items-center h-11 px-6 rounded-full border border-ink/[0.14] text-[14px] font-medium hover:bg-ink/[0.04] transition-colors">
                Contact sales
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FRONTIER MODELS ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">Powered by our frontier models</h2>
            <p className="mt-4 text-[15px] text-textDim max-w-[60ch] leading-relaxed">
              Designed for real-world utility, with the context and output limits to handle production workloads.
            </p>
          </Reveal>

          <div className="mt-10 space-y-px bg-ink/[0.08] rounded-xl overflow-hidden border border-ink/[0.08]">
            {PLATFORM_MODELS.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div className="bg-bg p-6 sm:p-7 grid md:grid-cols-[1.3fr_1fr_1.4fr] gap-6 items-start hover:bg-bgElev transition-colors">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[17px] font-semibold tracking-tight">{m.name}</h3>
                      <span className="px-2 py-0.5 rounded-full border border-ink/[0.12] text-[11px] text-textFaint">{m.tier}</span>
                    </div>
                    <code className="mt-1.5 block text-[11.5px] font-mono text-textFaint">{m.id}</code>
                  </div>
                  <dl className="grid grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <dt className="text-textFaint">Input</dt>
                      <dd className="mt-0.5 font-medium">{m.input}</dd>
                    </div>
                    <div>
                      <dt className="text-textFaint">Output</dt>
                      <dd className="mt-0.5 font-medium">{m.output}</dd>
                    </div>
                    <p className="col-span-2 text-[11.5px] text-textFaint -mt-1">{m.per}</p>
                  </dl>
                  <div className="flex flex-col gap-3">
                    <ul className="space-y-1.5">
                      {m.specs.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[12.5px] text-textDim">
                          <Icon name="check" size={13} className="text-accent mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link href="/docs" className="inline-flex items-center gap-1 text-[13px] text-accent hover:underline">
                      Learn more
                      <Icon name="chevronRight" size={12} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 rounded-xl border border-ink/[0.08] bg-bgElev p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[14px] text-textDim">Learn how to migrate from another provider to Frox in an afternoon.</p>
              <Link href="/docs" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent shrink-0">
                View migration guide
                <Icon name="chevronRight" size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUICKSTART ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">Developer quickstart</h2>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em]">
              Make your first API request in minutes
            </h3>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 rounded-xl border border-ink/[0.09] overflow-hidden bg-bgElev">
              <Tabs tab={tab} setTab={setTab} />
              <div className="relative">
                <pre className="p-5 sm:p-6 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-textDim">
                  <code>{QUICKSTART[tab]}</code>
                </pre>
                <button
                  onClick={() => copy(QUICKSTART[tab])}
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-ink/[0.1] bg-bg text-[11.5px] text-textDim hover:text-text transition-colors"
                >
                  <Icon name={copied ? "check" : "fileText"} size={12} />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/[0.08] rounded-xl overflow-hidden border border-ink/[0.08]">
            {SDKS.map((s, i) => (
              <Reveal key={s.name} delay={i * 50}>
                <div className="h-full bg-bg p-5">
                  <LangBadge lang={s.lang} />
                  <p className="mt-3 font-mono text-[11.5px] text-textDim break-all">{s.install}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">Capabilities</h2>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em] max-w-[20ch]">
              The all-in-one platform for agents
            </h3>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-3 gap-px bg-ink/[0.08] rounded-xl overflow-hidden border border-ink/[0.08]">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="h-full bg-bg p-6 hover:bg-bgElev transition-colors">
                  <span className="w-9 h-9 rounded-lg border border-ink/[0.1] bg-bgElev grid place-items-center text-accent">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <h4 className="mt-5 text-[15.5px] font-semibold tracking-tight">{c.title}</h4>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODEL FAMILY ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">The Frox model family</h2>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em] max-w-[22ch]">
              Right-sized for any task
            </h3>
          </Reveal>

          <div className="mt-10 space-y-px bg-ink/[0.08] rounded-xl overflow-hidden border border-ink/[0.08]">
            {FAMILY.map((f, i) => (
              <Reveal key={f.name} delay={i * 60}>
                <div className="bg-bg p-6 sm:p-7 grid sm:grid-cols-[220px_1fr] gap-4 hover:bg-bgElev transition-colors">
                  <div>
                    <h4 className="text-[16px] font-semibold tracking-tight">{f.name}</h4>
                    <p className="mt-1 text-[12px] text-textFaint">{f.tag}</p>
                  </div>
                  <p className="text-[14px] text-textDim leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">Use cases</h2>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.title} delay={i * 60}>
                <div>
                  <h4 className="text-[15.5px] font-semibold tracking-tight">{u.title}</h4>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENDPOINTS ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.15em] text-textFaint">API reference</h2>
            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.03em]">Endpoints</h3>
          </Reveal>

          <div className="mt-10 divide-y divide-ink/[0.07] border-y border-ink/[0.07]">
            {ENDPOINTS.map((e, i) => (
              <Reveal key={e.path} delay={i * 40}>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-ink/[0.02] transition-colors px-2 -mx-2 rounded">
                  <div className="flex items-center gap-3 sm:w-[340px] shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold w-[52px] text-center ${e.method === "GET" ? "text-emerald-400 bg-emerald-400/10" : "text-sky-400 bg-sky-400/10"}`}>
                      {e.method}
                    </span>
                    <code className="font-mono text-[13px]">{e.path}</code>
                  </div>
                  <p className="text-[13.5px] text-textDim flex-1">{e.desc}</p>
                  <span className="text-[11.5px] text-textFaint shrink-0">{e.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GUARANTEES ============ */}
      <section className="border-b border-ink/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g.title} delay={i * 60}>
                <div>
                  <Icon name={g.icon} size={18} className="text-accent" />
                  <h4 className="mt-4 text-[15px] font-semibold tracking-tight">{g.title}</h4>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SELF-SERVE vs SALES ============ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-px bg-ink/[0.08] rounded-xl overflow-hidden border border-ink/[0.08]">
            <Reveal>
              <div className="h-full bg-bg p-7">
                <h3 className="text-[16px] font-semibold tracking-tight">Self-serve</h3>
                <p className="mt-2 text-[13.5px] text-textDim">Launch your own generative AI solution with:</p>
                <ul className="mt-5 space-y-2.5">
                  {["Access to all Frox models", "Usage-based tiers", "Automatically increasing rate limits", "Simple pay-as-you-go pricing", "Prompting guides & developer documentation"].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[13.5px] text-textDim">
                      <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
                      {x}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className="mt-7 inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-text text-bg text-[13.5px] font-medium hover:opacity-90 transition-opacity">
                  Start building
                </Link>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="h-full bg-bg p-7">
                <h3 className="text-[16px] font-semibold tracking-tight">Enterprise</h3>
                <p className="mt-2 text-[13.5px] text-textDim">Need custom rate limits or hands-on support?</p>
                <ul className="mt-5 space-y-2.5">
                  {["Custom rate limits", "Billing via monthly invoices", "Prompting support", "Deployment support", "Dedicated onboarding", "SOC 2 reports & DPA"].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[13.5px] text-textDim">
                      <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
                      {x}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-7 inline-flex items-center gap-1.5 h-10 px-5 rounded-full border border-ink/[0.14] text-[13.5px] font-medium hover:bg-ink/[0.04] transition-colors">
                  Speak with sales
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
