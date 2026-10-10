import Link from "next/link";
import Reveal from "@/components/Reveal";
import CodeTabs from "@/components/CodeTabs";
import AnimatedBackground from "@/components/AnimatedBackground";
import Icon from "@/components/Icon";

const MODELS = [
  {
    name: "Frox Flex",
    id: "frox-flex",
    desc: "Frontier reasoning and conversation across a 256K context window.",
    meta: ["256K context", "Text", "Apache 2.0"],
    input: "$1.75 / 1M",
    output: "$14.00 / 1M",
  },
  {
    name: "Frox Code",
    id: "frox-code",
    desc: "A code specialist fluent in 40+ languages, tuned for whole-file changes.",
    meta: ["128K context", "Code", "Apache 2.0"],
    input: "$1.20 / 1M",
    output: "$9.60 / 1M",
  },
  {
    name: "Frox Image",
    id: "frox-image",
    desc: "High-fidelity generation with control over style, composition, and light.",
    meta: ["1024px", "Image", "Open weights"],
    input: "$0.04 / image",
    output: "—",
  },
];

/* Each capability pairs copy with a real, animated product visual rather than a
   decorative gradient box. */
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

const LOGOS = ["Northwind", "Cascade", "Lumen", "Vela", "Stratos", "Nimbus", "Halcyon", "Meridian"];

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

const STUDIO_MODES = [
  {
    icon: "forge",
    title: "Forge",
    desc: "The build agent. It reads your repo, patches surgically, and shows you every diff before anything merges.",
    href: "/forge",
    cta: "Open Forge",
    accent: "from-amber-500/20 to-transparent",
  },
  {
    icon: "sparkles",
    title: "Chat",
    desc: "Reason, draft, and analyze with Flex or Code. Streaming, markdown, and full history.",
    href: "/chat",
    cta: "Start chatting",
    accent: "from-violet-500/20 to-transparent",
  },
  {
    icon: "image",
    title: "Image",
    desc: "Describe it, get four variations. Style presets, aspect ratios, and full generation history.",
    href: "/chat?prompt=Describe%20an%20image",
    cta: "Generate images",
    accent: "from-cyan-500/20 to-transparent",
  },
  {
    icon: "waveform",
    title: "Audio",
    desc: "Compose music, sound effects, and voice. Prompt-to-track with instant playback.",
    href: "/chat?prompt=Compose%20a%20calm%20ambient%20track",
    cta: "Compose audio",
    accent: "from-fuchsia-500/20 to-transparent",
  },
];

const USE_CASES = [
  { icon: "code", title: "Coding", body: "Autocomplete, refactor, debug, and generate whole files across 40+ languages." },
  { icon: "book", title: "Long documents", body: "Drop in a 200-page contract or codebase and ask questions across all of it." },
  { icon: "lightbulb", title: "Agents", body: "Function calling and tool use for customer-facing agents and multi-step workflows." },
  { icon: "fileText", title: "Extraction", body: "Pull structured data out of messy input — invoices, tickets, resumes, logs." },
  { icon: "image", title: "Image generation", body: "Text-to-image and image editing with aspect-ratio and style control." },
  { icon: "waveform", title: "Audio", body: "Speech, music, and sound effects generated through the same endpoint." },
];

const FAQ = [
  { q: "Is Frox free to use?", a: "Yes — every account gets $10 in free credit and full access to Frox Chat. No credit card required." },
  { q: "Are the models open weight?", a: "Flex and Code are Apache 2.0. Download, fine-tune, and self-host them commercially, free of charge." },
  { q: "Do you train on my data?", a: "No. API data is never used for training. You can opt out of even anonymous analytics in Settings → Data controls." },
  { q: "Can I bring my own API key?", a: "Yes. Route requests through your own inference credits from Settings → API keys." },
];

/* ---------- Product visuals ---------- */
function Art({ kind }) {
  const base = "relative h-64 rounded-2xl border border-ink/[0.08] overflow-hidden bg-bgElev p-6";

  if (kind === "reasoning")
    return (
      <div className={`${base} bg-gradient-to-br from-violet-500/[0.09] to-transparent`}>
        <div className="space-y-3">
          {["Analyze the request", "Plan the approach", "Verify the result"].map((s, i) => (
            <div key={s} className="flex items-center gap-3" style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 130}ms both` }}>
              <span className="w-6 h-6 rounded-full grad-bg grid place-items-center text-[11px] font-bold text-white shrink-0">{i + 1}</span>
              <span className="text-[13.5px] text-textDim">{s}</span>
              <span className="ml-auto h-1.5 w-14 rounded-full bg-ink/10" />
            </div>
          ))}
          <div className="mt-6 rounded-xl bg-ink p-3.5 font-mono text-[12px] text-emerald-300">
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={13} /> Answer verified · 0.9s</span>
          </div>
        </div>
      </div>
    );

  if (kind === "modal")
    return (
      <div className={`${base} bg-gradient-to-br from-cyan-500/[0.09] to-transparent grid grid-cols-2 gap-3 content-start`}>
        {[
          { m: "Text", v: "256K" },
          { m: "Image", v: "1024" },
          { m: "Audio", v: "48kHz" },
          { m: "3D", v: "GLB" },
        ].map((x, i) => (
          <div
            key={x.m}
            className="rounded-xl border border-ink/[0.08] bg-bgCard p-4 flex flex-col justify-between"
            style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 90}ms both` }}
          >
            <span className="text-[11.5px] text-textFaint">{x.m}</span>
            <span className="text-[17px] font-semibold tracking-tight">{x.v}</span>
          </div>
        ))}
      </div>
    );

  return (
    <div className={`${base} bg-gradient-to-br from-fuchsia-500/[0.09] to-transparent`}>
      <pre className="font-mono text-[12px] leading-relaxed text-textDim overflow-x-auto">
        <code>
          <span className="text-textFaint">POST /v1/chat/completions</span>{"\n"}
          {"\x20"}<span className="text-violet-400">&quot;model&quot;</span>: <span className="text-emerald-400">&quot;frox-flex&quot;</span>,{"\n"}
          {"\x20"}<span className="text-violet-400">&quot;stream&quot;</span>: <span className="text-cyan-400">true</span>{"\n\n"}
          <span className="inline-flex items-center gap-2 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> 200 OK · streaming
          </span>
        </code>
      </pre>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="container-x relative">
          <Reveal>
            <Link href="/changelog" className="inline-flex items-center gap-2 text-[13px] text-textDim hover:text-text transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Frox Flex 1.5 is now available
              <Icon name="chevronRight" size={13} className="opacity-60" />
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="display-xl mt-8 max-w-[15ch]">
              Frontier models, <span className="display-em">openly</span> hosted.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-[54ch] text-[17px] md:text-[18px] text-textDim leading-relaxed">
              Frox Studio builds open-weight models for chat, code, image, audio, and 3D.
              Call them through one API, or download the weights and run them yourself.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/chat" className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-ink text-bg text-[14.5px] font-medium hover:opacity-90 transition-opacity">
                Start building
                <Icon name="chevronRight" size={14} className="opacity-70" />
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full border border-ink/[0.14] text-[14.5px] font-medium hover:bg-ink/[0.04] transition-colors">
                Read the docs
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-20 rounded-2xl border border-ink/[0.09] bg-bgElev overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-10 border-b border-ink/[0.07]">
                <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                <span className="ml-2 text-[11.5px] text-textFaint font-mono">frox-flex · 256K</span>
              </div>
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex justify-end">
                  <p className="rounded-2xl rounded-br-md bg-ink/[0.05] border border-ink/[0.06] px-4 py-2.5 text-[14.5px] max-w-[85%]">
                    Explain how transformers attend to context in one paragraph.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-7 h-7 rounded-lg grad-bg grid place-items-center text-[11px] font-bold text-white shrink-0">F</span>
                  <p className="text-[14.5px] text-textDim leading-relaxed max-w-[62ch]">
                    Each token builds a <span className="text-text">query</span>, <span className="text-text">key</span>, and{" "}
                    <span className="text-text">value</span>. Attention scores the query against every key, then uses those
                    weights to blend the values — so the model can pull the most relevant context from anywhere in the
                    sequence, in parallel.
                    <span className="inline-flex gap-0.5 ml-1 align-middle"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= LOGOS ================= */}
      <section className="rule-x">
        <div className="container-x py-14">
          <Reveal>
            <p className="text-center text-[12px] uppercase tracking-[0.18em] text-textFaint">Used in production by</p>
          </Reveal>
          <div className="marquee-mask mt-8 overflow-hidden">
            <div className="marquee-track">
              {[...LOGOS, ...LOGOS].map((n, i) => (
                <span
                  key={`${n}-${i}`}
                  className="shrink-0 mx-8 text-[19px] font-semibold tracking-tight text-textDim opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="rule-x">
        <div className="container-x py-14">
          <Reveal>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
              {STATS.map((s, i) => (
                <div key={s.l} className={`text-center ${i ? "md:border-l md:border-ink/[0.08]" : ""}`}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="block text-[clamp(1.8rem,3.6vw,2.5rem)] font-bold tracking-tight">{s.n}</span>
                    <span className="block mt-1.5 text-[13px] text-textFaint">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ================= MODELS ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <Reveal>
            <p className="kicker">Models</p>
            <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="display-lg max-w-[16ch]">One platform, every modality</h2>
              <p className="text-textDim max-w-sm leading-relaxed">
                Pick the right model for the job, or chain them together. Every model is open-weight and production-ready.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-px bg-ink/[0.08] rounded-2xl overflow-hidden border border-ink/[0.08]">
            {MODELS.map((m, i) => (
              <Reveal key={m.id} delay={i * 70}>
                <article className="h-full bg-bgElev p-7 flex flex-col hover:bg-bgCard transition-colors duration-300">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] font-semibold tracking-tight">{m.name}</h3>
                    <code className="text-[11px] font-mono text-textFaint">{m.id}</code>
                  </div>
                  <p className="mt-2.5 text-[14px] text-textDim leading-relaxed flex-1">{m.desc}</p>
                  <dl className="mt-6 pt-5 border-t border-ink/[0.07] grid grid-cols-2 gap-y-3 text-[12.5px]">
                    <div>
                      <dt className="text-textFaint">Input</dt>
                      <dd className="text-text mt-0.5 font-medium">{m.input}</dd>
                    </div>
                    <div>
                      <dt className="text-textFaint">Output</dt>
                      <dd className="text-text mt-0.5 font-medium">{m.output}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {m.meta.map((x) => (
                      <span key={x} className="px-2 py-1 rounded-full border border-ink/[0.1] text-[11.5px] text-textDim">{x}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <Reveal>
            <p className="kicker">Why Frox</p>
            <h2 className="display-lg mt-4 max-w-[18ch]">Built to be used, not just admired</h2>
          </Reveal>

          <div className="mt-16 space-y-24">
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <div>
                    <div className="flex items-baseline gap-3 text-textFaint text-[13px] font-mono">
                      <span>0{i + 1}</span>
                      <span className="h-px flex-1 bg-ink/[0.1] max-w-[80px]" />
                      <span className="text-[12px]">{c.eyebrow}</span>
                    </div>
                    <h3 className="display-md mt-5 text-balance">{c.title}</h3>
                    <p className="mt-4 text-textDim leading-relaxed max-w-lg">{c.body}</p>
                    <ul className="mt-7 space-y-3">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[14.5px]">
                          <Icon name="check" size={15} className="text-accent mt-0.5 shrink-0" />
                          <span className="text-textDim">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={90}>
                  <Art kind={c.art} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DEVELOPER ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <p className="kicker">Developer platform</p>
              <h2 className="display-lg mt-4 max-w-[15ch]">Change a base URL, not your codebase</h2>
              <p className="mt-5 text-textDim leading-relaxed max-w-md">
                OpenAI-compatible endpoints, streaming by default, and official SDKs for Python, JavaScript, Go, and Rust.
                Or self-host the open weights.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/developers" className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-ink text-bg text-[14.5px] font-medium hover:opacity-90 transition-opacity">
                  Get API keys
                  <Icon name="chevronRight" size={14} className="opacity-70" />
                </Link>
                <Link href="/download" className="inline-flex items-center h-11 px-6 rounded-full border border-ink/[0.14] text-[14.5px] font-medium hover:bg-ink/[0.04] transition-colors">
                  Download SDKs
                </Link>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <CodeTabs />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= QUOTES ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <Reveal>
            <p className="kicker">Customers</p>
            <h2 className="display-lg mt-4 max-w-[18ch]">How teams use Frox</h2>
          </Reveal>

          {/* Featured pull-quote gets the space; the rest support it. */}
          <div className="mt-14 grid lg:grid-cols-[1.35fr_1fr] gap-px bg-ink/[0.08] rounded-2xl overflow-hidden border border-ink/[0.08]">
            <Reveal>
              <figure className="h-full bg-bgElev p-8 sm:p-10 flex flex-col justify-between">
                <blockquote className="display-md font-medium leading-[1.25] text-balance">
                  &ldquo;{QUOTES[0].quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full grad-bg grid place-items-center text-[12px] font-bold text-white shrink-0">
                    {QUOTES[0].name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium">{QUOTES[0].name}</span>
                    <span className="block text-[13px] text-textFaint">{QUOTES[0].role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-px bg-ink/[0.08]">
              {QUOTES.slice(1).map((q, i) => (
                <Reveal key={q.name} delay={(i + 1) * 80}>
                  <figure className="h-full bg-bgElev p-7 flex flex-col">
                    <div className="flex gap-0.5 mb-4 text-accent" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.05 2.9l1.9 3.85 4.25.62-3.08 3 .73 4.23-3.8-2-3.8 2 .73-4.23-3.08-3 4.25-.62z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-[14.5px] text-textDim flex-1 leading-relaxed text-pretty">&ldquo;{q.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-ink/[0.07] flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full grad-bg grid place-items-center text-[11px] font-bold text-white shrink-0">
                        {q.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                      <span>
                        <span className="block text-[13.5px] font-medium">{q.name}</span>
                        <span className="block text-[12.5px] text-textFaint">{q.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STUDIO MODES ================= */}
      <section className="rule-x relative overflow-hidden">
        <AnimatedBackground variant="soft" />
        <div className="container-x relative py-24">
          <Reveal>
            <p className="kicker">Studio</p>
            <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="display-lg max-w-[16ch]">One workspace, four modes</h2>
              <p className="text-textDim max-w-sm leading-relaxed">
                Switch between build, chat, image, and audio without losing context.
                Everything shares the same models and account.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STUDIO_MODES.map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <Link href={m.href} className="group h-full flex flex-col rounded-2xl border border-ink/[0.08] bg-bgElev/80 backdrop-blur-sm p-6 tilt">
                  <span className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.accent} border border-ink/[0.07] grid place-items-center mb-6`}>
                    <span className="w-9 h-9 rounded-lg bg-bgCard border border-ink/[0.08] grid place-items-center text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon name={m.icon} size={17} />
                    </span>
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed flex-1">{m.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent">
                    <span className="wipe">{m.cta}</span>
                    <Icon name="chevronRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <Reveal>
            <p className="kicker">Use cases</p>
            <h2 className="display-lg mt-4 max-w-[20ch]">What people actually build</h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/[0.08] border border-ink/[0.08] rounded-2xl overflow-hidden">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.title} delay={i * 50}>
                <div className="h-full bg-bgElev p-7 hover:bg-bgCard transition-colors duration-300">
                  <span className="w-9 h-9 rounded-lg border border-ink/[0.09] bg-bgCard grid place-items-center text-accent">
                    <Icon name={u.icon} size={16} />
                  </span>
                  <h3 className="mt-5 text-[15.5px] font-semibold tracking-tight">{u.title}</h3>
                  <p className="mt-2 text-[13.5px] text-textDim leading-relaxed">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="rule-x">
        <div className="container-x py-24">
          <Reveal>
            <p className="kicker">FAQ</p>
            <h2 className="display-lg mt-4">Quick answers</h2>
          </Reveal>

          <div className="mt-12 max-w-3xl">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <details className="group rule-x-soft">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[16px] font-medium tracking-tight">{f.q}</span>
                    <Icon name="plus" size={16} className="text-textFaint shrink-0 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 -mt-1 text-[14.5px] text-textDim leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-[14px] text-textFaint">
              More questions? <Link href="/faq" className="text-text underline underline-offset-4 hover:opacity-70">Visit the FAQ</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="rule-x relative overflow-hidden">
        <AnimatedBackground variant="panel" />
        <div className="container-x relative py-24 md:py-32">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="display-lg text-balance">Start building with Frox</h2>
              <p className="mt-5 text-textDim leading-relaxed">
                $10 in free credit, no credit card required. Add your own key when you need more.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/chat" className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full grad-bg grad-flow text-white text-[14.5px] font-medium shadow-[0_10px_34px_-12px_var(--accent)]">
                  Try Frox Chat
                  <Icon name="chevronRight" size={14} className="opacity-80" />
                </Link>
                <Link href="/forge" className="sheen inline-flex items-center gap-1.5 h-11 px-6 rounded-full border border-ink/[0.14] text-[14.5px] font-medium hover:bg-ink/[0.04] transition-colors">
                  Open Forge
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
