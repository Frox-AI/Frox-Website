import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const POSTS = [
  { date: "Oct 8, 2026", tag: "Release", title: "Frox Voice learns to clone a voice from three seconds", href: "/blog/voice-cloning", desc: "Shorter samples, steadier prosody, and a new consent flow built into every clone." },
  { date: "Sep 30, 2026", tag: "Company", title: "Our open weights are now on Hugging Face", href: "/blog/open-weights", desc: "Two releases, training notes included, and no API key required to run them yourself." },
  { date: "Sep 16, 2026", tag: "Product", title: "Frox Code moves out of beta", href: "/blog/code-ga", desc: "After four months in preview, the code workspace is stable for daily work." },
  { date: "Aug 29, 2026", tag: "Research", title: "Routing between specialists, and what we learned", href: "/blog/router-notes", desc: "A short write-up on when to hand a task from a general model to a specialist." },
];

export const metadata = {
  title: "Newsroom",
  description: "Product announcements and release notes from Frox Studio.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="News"
        title="Announcements and research notes"
        sub="Product releases, company updates, and the occasional write-up of what we are learning while building Frox."
      >
        <Link href="/blog" className="btn-secondary">Read the blog</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-3xl">
        <div className="divide-y divide-ink/[0.07]">
          {POSTS.map((p) => (
            <Link key={p.title} href={p.href} className="block py-7 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="chip !py-0.5 !px-2.5 !text-[11px] text-accent2">{p.tag}</span>
                <span className="text-[13px] text-textFaint">{p.date}</span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight group-hover:text-accent transition-colors text-pretty">{p.title}</h2>
              <p className="text-[14.5px] text-textDim mt-2 leading-relaxed text-pretty">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}