import Link from "next/link";
import Reveal from "@/components/Reveal";
import CodeTabs from "@/components/CodeTabs";
import Icon from "@/components/Icon";

const MODELS = [
  {
    name: "Frox Flex",
    id: "frox-flex",
    desc: "Frontier reasoning and conversation with a 256K context window. Built for nuance, long documents, and complex instruction following.",
    meta: ["256K context", "Text", "Apache 2.0"],
    accent: "from-violet-500/25 to-indigo-500/5",
  },
  {
    name: "Frox Code",
    id: "frox-code",
    desc: "A code-specialized model fluent in 40+ languages. Autocomplete, refactoring, debugging, and whole-file generation.",
    meta: ["128K context", "Code", "Apache 2.0"],
    accent: "from-cyan-500/25 to-blue-500/5",
  },
  {
    name: "Frox Image",
    id: "frox-image",
    desc: "High-fidelity text-to-image generation with fine-grained control over style, composition, and lighting.",
    meta: ["1024px", "Image", "Open weights"],
    accent: "from-fuchsia-500/25 to-pink-500/5",
  },
];

const CAPABILITIES = [
  {
    eyebrow: "Reasoning",
    title: "Reasoning you can follow",
    body: "Frox models work through hard problems — math, logic, planning, code — step by step, so you can see where an answer came from and correct it when it's wrong.",
    points: ["Chain-of-thought reasoning", "Tool use & function calling", "256K-token context"],
    art: "reasoning",
  },
  {
    eyebrow: "Multimodal",
    title: "Every modality, one API",
    body: "Generate text, images, speech, sound effects, and 3D assets through a single interface. Switch models with one parameter.",
    points: ["Text · Image · Audio · 3D", "Streaming everywhere", "OpenAI-compatible"],
    art: "modal",
  },
  {
    eyebrow: "For developers",
    title: "Swap the base URL, not your code",
    body: "Idiomatic SDKs, drop-in OpenAI compatibility, and a free tier to start on. Point your existing client at Frox and change one line.",
    points: ["Python, JS, Go SDKs", "REST + streaming", "$10 free credit"],
    art: "code",
  },
];

const STATS = [
  { n: "3", l: "Open-weight models" },
  { n: "256K", l: "Max context" },
  { n: "$10", l: "Free starter credit" },
  { n: "4", l: "Official SDKs" },
];

const QUOTES = [
  {
    quote: "We were paying two vendors for reasoning and code. Flex and Code cover both, and the weights are downloadable, so we can pin a version and stop guessing.",
    name: "Priya Nair",
    role: "CTO, Northwind Labs",
  },
  {
    quote: "The OpenAI-compatible endpoint meant changing a base URL and a model name. The migration took an afternoon, most of it testing.",
    name: "Marcus Lee",
    role: "Lead Engineer, Cascade",
  },
  {
    quote: "Concept work used to eat a full day. Now designers sketch in Frox Image, export, and refine in Figma the same day.",
    name: "Sofia Romero",
    role: "Head of Design, Lumen",
  },
];

function Art({ kind }) {
  const base = "relative h-56 rounded-2xl border border-ink/[0.08] overflow-hidden bg-gradient-to-br";
  if (kind === "reasoning")
    return (
      <div className={`${base} from-violet-500/15 to-transparent p-5`}>
        <div className="space-y-3">
          {["Analyze the request", "Plan the approach", "Verify the result"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full grad-bg grid place-items-center text-[11px] font-bold text-white shrink-0">{i + 1}</span>
              <span className="text-sm text-textDim">{s}</span>
              <span className="ml-auto h-1.5 w-16 rounded-full bg-ink/10" />
            </div>
          ))}
          <div className="mt-5 rounded-xl console p-3 font-mono text-[12.5px] text-emerald-300">
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={13} /> Answer verified · 0.9s</span>
          </div>
        </div>
      </div>
    );
  if (kind === "modal")
    return (
      <div className={`${base} from-cyan-500/15 to-transparent p-5 grid grid-cols-2 gap-3`}>
        {["Text", "Image", "Audio", "3D"].map((m, i) => (
          <div key={m} className="rounded-xl border border-ink/[0.08] bg-bgElev p-4 flex flex-col justify-between">
            <span className="text-xs text-textFaint">{m}</span>
            <span className="text-lg font-semibold">{["256K", "1024", "48kHz", "GLB"][i]}</span>
          </div>
        ))}
      </div>
    );
  return (
    <div className={`${base} from-fuchsia-500/15 to-transparent p-5`}>
      <div className="rounded-xl console p-4 font-mono text-[12.5px] leading-relaxed">
        <div className="text-textFaint">POST /v1/chat/completions</div>
        <div className="mt-2 text-violet-300">&quot;model&quot;: <span className="text-emerald-300">&quot;frox-flex&quot;</span></div>
        <div className="text-violet-300">&quot;stream&quot;: <span className="text-cyan-300">true</span></div>
        <div className="mt-3 flex items-center gap-2 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> 200 OK · streaming</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-36 pb-20">
        <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] hero-glow pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[620px] grid-bg pointer-events-none opacity-70" />
        <div className="aurora w-[420px] h-[420px] bg-violet-600/30 top-10 left-[8%]" />
        <div className="aurora w-[380px] h-[380px] bg-cyan-500/20 top-40 right-[6%]" style={{ animationDelay: "3s" }} />

        <div className="container-x relative text-center">
          <Reveal>
            <Link href="/changelog" className="chip mx-auto hover:border-ink/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              Frox Flex 1.5 is now available
              <svg className="w-3.5 h-3.5 text-textFaint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-balance">
              Frontier AI models
              <br />
              for <span className="font-display italic font-normal grad-text pr-2">everyone</span>.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl mx-auto text-[17px] md:text-lg text-textDim text-pretty">
              Frox Studio builds open-weight models for chat, code, image, audio, and 3D — call them through one API, or run the weights yourself.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/chat" className="btn-primary !px-7 !py-3.5 text-[15px]">
                Start chatting free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
              </Link>
              <Link href="/docs" className="btn-secondary !px-7 !py-3.5 text-[15px]">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16M6 16l-4-4 4-4m12 0l4 4-4 4" /></svg>
                Read the docs
              </Link>
            </div>
          </Reveal>

          {/* Product preview */}
          <Reveal delay={240}>
            <div className="mt-16 max-w-3xl mx-auto grad-border p-1.5 shadow-card">
              <div className="rounded-[13px] bg-bgElev/80 overflow-hidden border border-ink/[0.05]">
                <div className="flex items-center gap-2 px-4 h-11 border-b border-ink/[0.06]">
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                  <span className="w-3 h-3 rounded-full bg-ink/10" />
                  <span className="ml-3 text-xs text-textFaint font-mono">frox-flex · 256K</span>
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />live</span>
                </div>
                <div className="p-5 text-left space-y-4">
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-md bg-ink/[0.06] border border-ink/[0.06] px-4 py-2.5 text-sm max-w-[80%]">
                      Explain how transformers attend to context in one paragraph.
                    </div>
                    <span className="w-7 h-7 rounded-lg bg-ink/[0.06] border border-ink/[0.08] grid place-items-center text-[11px] shrink-0">You</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-7 h-7 rounded-lg grad-bg grid place-items-center text-[11px] font-bold shrink-0">F</span>
                    <div className="rounded-2xl rounded-tl-md bg-ink/[0.03] border border-ink/[0.06] px-4 py-3 text-sm text-textDim max-w-[85%]">
                      Each token builds a <span className="text-text">query</span>, <span className="text-text">key</span>, and <span className="text-text">value</span>. Attention scores the query against every key, then uses those weights to blend the values — so the model can pull the most relevant context from anywhere in the sequence, in parallel.
                      <span className="inline-flex gap-0.5 ml-1 align-middle"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Logos */}
          <Reveal delay={300}>
            <div className="mt-16">
              <p className="text-[12px] uppercase tracking-[0.2em] text-textFaint mb-5">Used in production by</p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
                {["Northwind", "Cascade", "Lumen", "Vela", "Stratos", "Nimbus"].map((n) => (
                  <span key={n} className="text-lg font-semibold tracking-tight text-textDim">{n}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== MODELS ===== */}
      <section className="container-x py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow tag">Models</p>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2">One platform, every modality</h2>
            </div>
            <p className="text-textDim max-w-md text-pretty">Pick the right model for the job — or chain them together. Every model is open-weight and production-ready.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <article className="card group h-full p-6 flex flex-col">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${m.accent} border border-ink/[0.06] mb-5 grid place-items-center relative overflow-hidden`}>
                  <span className="font-mono text-xs text-textFaint absolute top-3 left-3">{m.id}</span>
                  <div className="w-12 h-12 rounded-xl grad-bg opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="text-sm text-textDim mt-2 flex-1 text-pretty">{m.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-ink/[0.06]">
                  {m.meta.map((x) => <span key={x} className="chip !py-1 !text-[11.5px]">{x}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="container-x py-20">
        <div className="space-y-24">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div>
                  <p className="eyebrow tag">{c.eyebrow}</p>
                  <h3 className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.03em] mt-3 text-balance">{c.title}</h3>
                  <p className="text-textDim mt-4 text-[16px] text-pretty max-w-lg">{c.body}</p>
                  <ul className="mt-6 space-y-3">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[15px]">
                        <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 grid place-items-center">
                          <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                        <span className="text-textDim">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}><Art kind={c.art} /></Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="container-x py-16">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl border border-ink/[0.08] bg-ink/[0.02] p-8 md:p-12">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold tracking-tight grad-text">{s.n}</div>
                <div className="text-[13px] text-textFaint mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== DEVELOPER ===== */}
      <section className="container-x py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="eyebrow tag">Developer platform</p>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2 text-balance">Change a base URL, not your codebase</h2>
              <p className="text-textDim mt-4 text-[16px] text-pretty max-w-lg">
                OpenAI-compatible endpoints, streaming by default, and official SDKs for Python, JavaScript, Go, and Rust. Or self-host the open weights.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/docs" className="btn-primary">Get API keys</Link>
                <Link href="/download" className="btn-secondary">Download SDKs</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}><CodeTabs /></Reveal>
        </div>
      </section>

      {/* ===== QUOTES ===== */}
      <section className="container-x py-20">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow tag">Customers</p>
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2">How teams use Frox</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 80}>
              <figure className="card h-full p-6 flex flex-col">
                <div className="flex gap-1 mb-4 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.05 2.9l1.9 3.85 4.25.62-3.08 3 .73 4.23-3.8-2-3.8 2 .73-4.23-3.08-3 4.25-.62z" /></svg>
                  ))}
                </div>
                <blockquote className="text-[15px] text-textDim flex-1 text-pretty">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-ink/[0.06] flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full grad-bg grid place-items-center text-xs font-bold">{q.name.split(" ").map((w) => w[0]).join("")}</span>
                  <span>
                    <span className="block text-sm font-medium">{q.name}</span>
                    <span className="block text-xs text-textFaint">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-x py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-ink/[0.1] px-8 py-16 md:px-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/15" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] hero-glow" />
            <div className="relative">
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-[-0.03em] text-balance">Start building with Frox</h2>
              <p className="text-textDim mt-4 max-w-xl mx-auto text-pretty">$10 in free credit, no credit card required. Add your own key when you need more.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/chat" className="btn-primary !px-7 !py-3.5">Try Frox Chat</Link>
                <Link href="/pricing" className="btn-secondary !px-7 !py-3.5">View pricing</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
