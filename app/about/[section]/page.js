import Link from "next/link";
import { notFound } from "next/navigation";
import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";
import Icon from "@/components/Icon";

const SECTIONS = {
  mission: {
    title: "Our mission",
    intro: "Make capable AI something anyone can run, inspect, and trust.",
    body: [
      ["Why we exist", "Frontier models were becoming powerful but opaque and expensive to reach. We think the opposite direction — open weights, honest benchmarks, and a fair price — produces better software and a healthier ecosystem."],
      ["What we optimize for", "Useful work over leaderboard rank. A model that reliably helps you finish a task matters more than one that wins a benchmark by a point."],
      ["How we measure success", "People building real things with Frox, and being able to take their work to another host if they choose. Open weights keep us honest."],
    ],
  },
  team: {
    title: "The team",
    intro: "A small, remote group of engineers and researchers who ship.",
    people: [
      ["A. Rahman", "Co-founder, CEO", "Previously led applied ML teams. Cares about evaluation that reflects real use."],
      ["J. Okafor", "Co-founder, CTO", "Systems and inference infrastructure. Wrote the first version of the router."],
      ["M. Lindqvist", "Head of Research", "Training and fine-tuning. Maintains the model cards."],
      ["S. Cho", "Design", "Interface and brand. Believes tools should feel calm."],
      ["D. Weber", "Engineering", "APIs, SDKs, and reliability."],
      ["P. Nair", "Engineering", "Image, audio, and 3D pipelines."],
    ],
    body: [
      ["Working with us", "We are remote-first and async by default. If that sounds like your kind of place, see the current openings."],
    ],
  },
  research: {
    title: "Research & innovation",
    intro: "What we're working on, and what we publish.",
    body: [
      ["Specialists over one giant model", "Instead of one model that does everything adequately, we train specialists and route between them. It is cheaper to serve and easier to evaluate."],
      ["Routing and verification", "A router decides which specialist handles a request, and a verifier checks the result before it ships. Both are areas we actively research."],
      ["Publishing", "We release weights and write-up notes for our models. Not everything works, and we say so in the training notes rather than hiding the failures."],
      ["Open questions", "How to evaluate quality without a benchmark that models can overfit to, and how to hand tasks between specialists without losing context."],
    ],
  },
  technology: {
    title: "Our technology",
    intro: "How a request travels through Frox.",
    body: [
      ["One API, many models", "Every product talks to the same API surface. A request names a model and the platform handles streaming, retries, and billing."],
      ["The router", "A lightweight classifier inspects the request and picks the specialist best suited to it, whether that's chat, code, or media generation."],
      ["The verifier", "For tasks where correctness matters, a second pass checks the output and can request a retry or a correction before you see it."],
      ["Serving", "Models run on our own inference stack with quantization profiles tuned per family. The open weights let you reproduce the same behavior on your hardware."],
    ],
  },
  "responsible-ai": {
    title: "Responsible AI",
    intro: "What we will not build, and the safeguards we do build.",
    body: [
      ["Consent for voices and likeness", "Voice cloning requires a consent statement, and we prohibit impersonation. We would rather lose a use case than enable abuse."],
      ["No training on your data", "Your prompts and generations are not used to train our models. This is a product decision, not a setting you have to hunt for."],
      ["Safety systems", "Prompts and outputs pass through safety checks. They are imperfect, we log their performance, and we tune them publicly through our model cards."],
      ["Honest limits", "We publish what each model is bad at. Marketing that hides failure modes is the thing that erodes trust in this field."],
    ],
  },
};

const ICONS = { mission: "globe", team: "cornerDownRight", research: "lightbulb", technology: "terminal", "responsible-ai": "shieldCheck" };

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export function generateMetadata({ params }) {
  const s = SECTIONS[params.section];
  return { title: s ? s.title : "About" };
}

export default function AboutSectionPage({ params }) {
  const s = SECTIONS[params.section];
  if (!s) notFound();

  return (
    <ProsePage
      eyebrow="About Frox"
      title={s.title}
      intro={s.intro}
      back={{ href: "/about", label: "About Frox" }}
    >
      <Prose>
        {s.people && (
          <div className="grid sm:grid-cols-2 gap-5 not-prose">
            {s.people.map(([name, role, bio]) => (
              <div key={name} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full grad-bg grid place-items-center text-white text-sm font-bold">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <p className="font-medium leading-tight">{name}</p>
                    <p className="text-[13px] text-accent2">{role}</p>
                  </div>
                </div>
                <p className="text-[13.5px] text-textDim leading-relaxed text-pretty">{bio}</p>
              </div>
            ))}
          </div>
        )}
        {s.body.map(([title, text]) => (
          <ProseSection key={title} title={title}>
            <p>{text}</p>
          </ProseSection>
        ))}
        <div className="card p-6 flex items-center gap-4">
          <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white shrink-0"><Icon name={ICONS[params.section]} size={18} /></span>
          <p className="text-sm text-textDim">
            Learn more on the <Link href="/about" className="text-accent hover:underline">About</Link> page, or read our latest notes on the <Link href="/blog" className="text-accent hover:underline">blog</Link>.
          </p>
        </div>
      </Prose>
    </ProsePage>
  );
}