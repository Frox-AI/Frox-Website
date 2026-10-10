import PageHero from "@/components/PageHero";
import FaqAccordion from "./FaqAccordion";

const SECTIONS = [
  {
    title: "General",
    faqs: [
      {
        q: "What is Frox Studio?",
        a: "Frox Studio is an AI platform built around open-weight models for chat, code, image, audio, and 3D. You can call the models through one API, use the hosted apps, or download the weights and run them yourself — no lock-in either way.",
      },
      {
        q: "Are the models really open weight?",
        a: "Yes. Flex and Code are released under Apache 2.0, which means you can download, fine-tune, and deploy them commercially without paying us a cent. Model cards, evaluation results, and training data documentation are published for every release.",
      },
      {
        q: "How is Frox different from closed frontier models?",
        a: "You get comparable quality for most tasks, plus full control: pin a specific version, audit the weights, self-host for data residency, and never worry about a provider deprecating the model your product depends on. Where we trail the frontier, we say so on each model card.",
      },
      {
        q: "Do I need a credit card to start?",
        a: "No. Every account starts with $10 in free credit and full access to Frox Chat — no card required. You only add a payment method when you need more than the free tier offers.",
      },
    ],
  },
  {
    title: "Models & API",
    faqs: [
      {
        q: "Which models are available right now?",
        a: "Frox Flex (frontier reasoning, 256K context), Frox Code (code specialist, 128K context), and Frox Image (text-to-image up to 1024px). Voice and 3D models are in public beta — see the roadmap for what's next.",
      },
      {
        q: "Is the API OpenAI-compatible?",
        a: "Yes. Point any OpenAI client at our base URL, swap in your Frox API key, and change the model name. Chat completions, streaming, and function calling all work as-is. Official SDKs for Python, JavaScript, Go, and Rust are available too.",
      },
      {
        q: "How fast is streaming?",
        a: "Responses stream token-by-token over server-sent events with first-token latency typically under 400ms on Flex. You can abort a generation at any time client-side without charge for the partial output.",
      },
      {
        q: "Can I fine-tune the models myself?",
        a: "Yes — Flex and Code both support LoRA and full fine-tuning on your own data through a simple jobs API. Open weights mean you can also train outside our platform entirely and self-host the result.",
      },
    ],
  },
  {
    title: "Pricing",
    faqs: [
      {
        q: "What happens when my free credit runs out?",
        a: "Nothing breaks — chat continues at a reduced rate (5 requests per minute) and you can upgrade whenever you're ready. We email you at 80% and 100% usage so there are never surprises on a bill.",
      },
      {
        q: "Do you offer plans for teams?",
        a: "The Teams plan adds shared workspaces, per-seat billing, SSO/SAML, audit logs, and a 99.9% uptime SLA. There's also an enterprise tier with dedicated capacity, custom data residency, and a solutions engineer.",
      },
      {
        q: "Can I get a refund?",
        a: "Unused credit is refundable within 30 days of purchase, no questions asked. If you believe you were billed incorrectly, contact support and we review every case manually.",
      },
    ],
  },
  {
    title: "Privacy & safety",
    faqs: [
      {
        q: "Do you train on my data?",
        a: "No. Data sent through the API is never used to train models, and never sold. On the hosted free tier, conversations are retained for 30 days for abuse prevention only; paid plans are zero-retention by default.",
      },
      {
        q: "What content does Frox refuse to generate?",
        a: "We decline CSAM, targeted disinformation, instructions for weapons of mass destruction, and a small set of adjacent categories detailed in the Acceptable Use Policy. The refusal rate per category is published in our transparency report.",
      },
      {
        q: "How do you handle harmful outputs?",
        a: "Every output passes through a safety layer, and the models are aligned to refuse clearly harmful requests while staying helpful for ambiguous ones. You can tune sensitivity per request with the safety parameter, and report misses directly from the chat UI.",
      },
    ],
  },
];

export const metadata = {
  title: "FAQ",
  description: "Answers about Frox models, pricing, privacy, safety, and the API.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Help center"
        title="Frequently asked questions"
        sub="Everything you need to know about Frox — models, pricing, privacy, and safety. Can't find your answer? We're one message away."
      />

      <div className="container-x pb-24 max-w-3xl">
        {SECTIONS.map((s) => (
          <FaqAccordion key={s.title} title={s.title} faqs={s.faqs} />
        ))}

        <div className="mt-16 text-center rounded-3xl border border-ink/10 bg-ink/[0.02] px-8 py-14 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[200px] hero-glow opacity-60 pointer-events-none" />
          <h2 className="relative text-2xl font-bold tracking-tight">Still stuck?</h2>
          <p className="relative text-textDim mt-3 max-w-md mx-auto text-pretty">
            Our support team answers every message — median first response is under two hours on business days.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary">Contact support</a>
            <a href="/help" className="btn-secondary">Browse all help topics</a>
          </div>
        </div>
      </div>
    </div>
  );
}
