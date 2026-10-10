import Link from "next/link";
import PageHero from "@/components/PageHero";
import { POSTS } from "@/lib/content";

const CATEGORIES = ["All", "Product", "Research", "Tutorials", "Company", "Release"];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Blog"
        title="Notes from the Frox team"
        sub="Release notes, research write-ups, and tutorials. We write about the parts that were hard, not just the parts that shipped."
      />

      <div className="container-x pb-24">
        <Link href={`/blog/${featured.slug}`} className="card block overflow-hidden group mb-14 hover:!border-ink/20">
          <div className="grad-bg h-56 md:h-72 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <span className="absolute inset-0 grid place-items-center font-display text-7xl text-white/25">Frox</span>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="chip !py-0.5 !px-2.5 !text-[11px] text-accent2">{featured.tag}</span>
              <span className="text-textFaint text-[13px]">{featured.date}</span>
              <span className="text-textFaint text-[13px]">{featured.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors text-pretty">{featured.title}</h2>
            <p className="text-textDim mt-3 leading-relaxed max-w-2xl text-pretty">{featured.excerpt}</p>
            <p className="text-sm text-textFaint mt-5">By {featured.author}</p>
          </div>
        </Link>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat, i) => (
            <span key={cat} className={`chip !text-[13px] ${i === 0 ? "chip-active" : ""}`}>{cat}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group flex flex-col">
              <div className="h-36 grad-bg opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="chip !py-0.5 !px-2.5 !text-[11px] text-accent2">{post.tag}</span>
                  <span className="text-textFaint text-[12.5px]">{post.date}</span>
                </div>
                <h3 className="text-[17px] font-semibold leading-snug mb-2 group-hover:text-accent transition-colors text-pretty">{post.title}</h3>
                <p className="text-textDim text-sm leading-relaxed flex-1 text-pretty">{post.excerpt}</p>
                <span className="text-textFaint text-[12.5px] mt-4">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="card p-10 text-center mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Get new posts by email</h2>
          <p className="text-textDim mt-2 max-w-md mx-auto text-pretty">Release notes and research write-ups, roughly twice a month. Unsubscribe in one click.</p>
          <Link href="/news" className="btn-primary mt-6">See announcements</Link>
        </div>
      </div>
    </div>
  );
}