import Link from "next/link";
import RevealGroup from "@/components/RevealGroup";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About",
  description: "Who we are and how we work.",
};

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2023" },
    { label: "Team", value: "6" },
    { label: "Open weights", value: "3" },
    { label: "Products", value: "5" },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Leads product direction and most of what we publish. Previously ran applied research teams.",
      initials: "SC",
    },
    {
      name: "Marcus Rivera",
      role: "CTO & Co-Founder",
      bio: "Owns the serving and training stack. Fifteen years building distributed infrastructure.",
      initials: "MR",
    },
    {
      name: "Anika Patel",
      role: "ML Engineer",
      bio: "Trains and evaluates the chat and code models. Keeps the model cards honest.",
      initials: "AP",
    },
    {
      name: "Tomas Berg",
      role: "Platform Engineer",
      bio: "Runs deployment, autoscaling, and the on-call rotation. Automates anything he touches twice.",
      initials: "TB",
    },
    {
      name: "Leah Osei",
      role: "Product Designer",
      bio: "Designs the chat and studio interfaces. Prototypes in code when it settles an argument faster.",
      initials: "LO",
    },
    {
      name: "Diego Marchetti",
      role: "Developer Relations",
      bio: "Writes the docs and samples, and files every rough edge he finds as a product issue.",
      initials: "DM",
    },
  ];

  const values = [
    {
      title: "Open by default",
      description:
        "We publish weights, training notes, and postmortems. Sharing is the default; we make the case when something stays private.",
    },
    {
      title: "Honest about limits",
      description:
        "Every model card lists what the model is bad at. We would rather you know before it matters, not after.",
    },
    {
      title: "Fewer things, finished",
      description:
        "We ship a small surface and see it through. Restraint is the point, not a constraint we work around.",
    },
    {
      title: "Listen, then decide",
      description:
        "We read feedback, fix what is broken, and say plainly when we will not do something. No roadmap theatre.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Frox starts",
      description:
        "Sarah and Marcus begin building open-weight language models and the serving stack around them.",
    },
    {
      year: "2024",
      title: "Image generation",
      description:
        "The image API ships, giving the platform a second modality beyond text.",
    },
    {
      year: "2025",
      title: "Audio and 3D",
      description:
        "Text-to-speech, transcription, and 3D asset generation join the same API.",
    },
    {
      year: "2026",
      title: "Open weights on Hugging Face",
      description:
        "We publish the chat and code weights with training notes and known failure modes.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="About"
        title="About Frox Studio"
        sub="A small team building open-weight AI models for text, code, image, audio, and 3D."
      >
        <Link href="/careers" className="btn-primary">See open roles</Link>
        <Link href="/blog" className="btn-secondary">Read the blog</Link>
      </PageHero>

      <div className="container-x pb-24">
        {/* Mission */}
        <section className="mb-20">
          <div className="card rounded-2xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="grad-text">Our Mission</span>
            </h2>
            <p className="text-textDim text-lg leading-relaxed max-w-3xl mx-auto">
              We build open-weight models and the infrastructure around them,
              and we think that's a better deal for the people using them. You
              can call our API, download the weights, or run them on your own
              hardware — the same models, your choice of where they run.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card card-hover rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold grad-text mb-2">
                  {stat.value}
                </div>
                <div className="text-textDim text-sm">{stat.label}</div>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="grad-text">Meet the Team</span>
          </h2>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="card card-hover rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full grad-bg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-textDim text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="grad-text">Our Values</span>
          </h2>
          <RevealGroup className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card card-hover rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-textDim leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </RevealGroup>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="grad-text">Our Journey</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full grad-bg flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-bgCard mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-textDim text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Office */}
        <section className="mb-20">
          <div className="card rounded-2xl p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="grad-text">How We Work</span>
                </h2>
                <p className="text-textDim leading-relaxed mb-6">
                  Frox Studio is a remote-first team with no headquarters. We
                  work across time zones, write things down instead of meeting
                  about them, and get together in person a few times a year.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-textDim text-sm">
                      Remote-first, no central office
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent2" />
                    <span className="text-textDim text-sm">
                      Async by default, written decisions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-textDim text-sm">
                      Two in-person offsites a year
                    </span>
                  </div>
                </div>
              </div>
              <div className="grad-bg rounded-xl h-64 flex items-center justify-center">
                <span className="text-ink/20 text-6xl font-bold">FROX</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
