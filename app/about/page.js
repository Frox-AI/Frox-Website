export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2023" },
    { label: "Team Size", value: "45+" },
    { label: "Countries", value: "12" },
    { label: "Models", value: "8" },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI research lead at a major tech company. Sarah leads Frox's vision and strategy.",
      initials: "SC",
    },
    {
      name: "Marcus Rivera",
      role: "CTO & Co-Founder",
      bio: "Distributed systems expert with 15 years of experience building scalable infrastructure.",
      initials: "MR",
    },
    {
      name: "Aisha Patel",
      role: "VP of Engineering",
      bio: "Passionate about developer experience and building tools that empower creators.",
      initials: "AP",
    },
    {
      name: "James Okafor",
      role: "Head of Research",
      bio: "PhD in machine learning. James leads our model training and research initiatives.",
      initials: "JO",
    },
    {
      name: "Elena Volkov",
      role: "Head of Design",
      bio: "Award-winning designer focused on making AI accessible and beautiful for everyone.",
      initials: "EV",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product leader dedicated to building tools that solve real problems for developers.",
      initials: "DK",
    },
  ];

  const values = [
    {
      title: "Openness",
      description:
        "We believe in transparency — with our team, our users, and the broader AI community. Open research, open communication, open source.",
    },
    {
      title: "Safety",
      description:
        "AI safety is not an afterthought. It's built into every model we train, every feature we ship, and every decision we make.",
    },
    {
      title: "Innovation",
      description:
        "We push the boundaries of what's possible with AI, constantly exploring new frontiers in multimodal generation and understanding.",
    },
    {
      title: "Community",
      description:
        "Our users are our partners. We build in public, listen to feedback, and grow together with the developers who use Frox.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Frox Founded",
      description:
        "Sarah and Marcus start Frox with a mission to democratize AI-powered creativity.",
    },
    {
      year: "2023",
      title: "First Model Released",
      description:
        "Launch of Frox 1.0, our first text generation model, to early adopters.",
    },
    {
      year: "2024",
      title: "Image Generation",
      description:
        "Introduced our image generation API, enabling creators to produce stunning visuals from text.",
    },
    {
      year: "2024",
      title: "Series A Funding",
      description:
        "Raised $25M Series A to accelerate research and expand the team.",
    },
    {
      year: "2025",
      title: "Audio & 3D APIs",
      description:
        "Expanded our platform with text-to-speech, speech-to-text, and 3D model generation.",
    },
    {
      year: "2026",
      title: "Frox 2.0",
      description:
        "Our biggest release yet — new models, new tools, and a completely redesigned experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="grad-text">About Frox Studio</span>
          </h1>
          <p className="text-textDim text-lg max-w-2xl mx-auto">
            We're building the future of AI-powered creativity, one model at a
            time.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <div className="card rounded-2xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="grad-text">Our Mission</span>
            </h2>
            <p className="text-textDim text-lg leading-relaxed max-w-3xl mx-auto">
              At Frox Studio, we believe that everyone should have access to
              powerful AI tools that amplify their creativity. Our mission is to
              build the most intuitive, reliable, and versatile AI platform —
              empowering developers, artists, and creators to bring their
              wildest ideas to life.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold grad-text mb-2">
                  {stat.value}
                </div>
                <div className="text-textDim text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="grad-text">Meet the Team</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="card rounded-xl p-6 text-center"
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
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="grad-text">Our Values</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-textDim leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
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
                  <span className="grad-text">Our Office</span>
                </h2>
                <p className="text-textDim leading-relaxed mb-6">
                  Frox Studio is headquartered in San Francisco, with team
                  members distributed across 12 countries. We're a remote-first
                  company that values flexibility, diversity, and collaboration.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-textDim text-sm">
                      San Francisco, CA — HQ
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent2" />
                    <span className="text-textDim text-sm">
                      Remote-first, global team
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-textDim text-sm">
                      Hubs in London, Tokyo, and Berlin
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
