import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Discussions",
  description: "Long-form threads from the Frox community.",
};

const THREADS = [
  {
    title: "Best settings for consistent character art",
    by: "@mira",
    tag: "Image",
    replies: 12,
    ago: "2h ago",
    excerpt: "I keep getting drift between frames. Pinning a seed helped, but so did dropping the guidance scale to 6.5.",
  },
  {
    title: "Streaming tokens into a React Native app",
    by: "@sam_dev",
    tag: "Code",
    replies: 8,
    ago: "6h ago",
    excerpt: "Fetch with a ReadableStream reader works fine, but make sure to cancel the reader on unmount or you'll leak.",
  },
  {
    title: "Frox Code vs. a general model for refactors",
    by: "@yuki",
    tag: "Discussion",
    replies: 21,
    ago: "1d ago",
    excerpt: "For mechanical refactors the specialist wins on speed. For anything that needs design judgment I still reach for Flex.",
  },
  {
    title: "Voice cloning consent flow — how strict is it?",
    by: "@helena",
    tag: "Audio",
    replies: 5,
    ago: "2d ago",
    excerpt: "You need a recorded consent statement naming the speaker. It felt heavy at first, but it's the right call.",
  },
];

export default function DiscussionsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Community"
        title="Discussions"
        sub="Long-form threads about what works, what doesn't, and how people actually use Frox."
      >
        <a href="https://huggingface.co/FroxStudio" target="_blank" rel="noreferrer" className="btn-primary">Open on Hugging Face</a>
        <Link href="/legal/community" className="btn-secondary">Read the guidelines</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Recent</h2>
          <span className="text-sm text-textFaint">{THREADS.length} threads</span>
        </div>
        <RevealGroup className="space-y-3">
          {THREADS.map((t) => (
            <div key={t.title} className="card card-hover p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="chip !py-0.5 !px-2.5 !text-[11px] text-accent2">{t.tag}</span>
                <span className="text-[12.5px] text-textFaint">{t.by} · {t.ago}</span>
              </div>
              <h3 className="font-semibold leading-snug">{t.title}</h3>
              <p className="text-sm text-textDim mt-2 leading-relaxed text-pretty">{t.excerpt}</p>
              <div className="flex items-center gap-1.5 text-[12.5px] text-textFaint mt-3">
                <Icon name="cornerDownRight" size={13} /> {t.replies} replies
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
