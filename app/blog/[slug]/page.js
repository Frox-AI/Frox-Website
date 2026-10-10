import Link from "next/link";
import { notFound } from "next/navigation";
import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";
import { POSTS } from "@/lib/content";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  return { title: post ? post.title : "Article" };
}

export default function BlogPostPage({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <ProsePage
      eyebrow={post.tag}
      title={post.title}
      intro={post.excerpt}
      back={{ href: "/blog", label: "All articles" }}
    >
      <div className="container-x pb-8 max-w-3xl">
        <div className="flex items-center gap-3 text-[13px] text-textFaint border-b border-ink/[0.07] pb-6">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
      <Prose>
        {post.body.map(([title, text]) => (
          <ProseSection key={title} title={title}>
            <p>{text}</p>
          </ProseSection>
        ))}

        <div className="hairline my-2" />
        <section>
          <h2 className="text-lg font-semibold mb-5">Keep reading</h2>
          <div className="grid sm:grid-cols-3 gap-4 not-prose">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="card p-5">
                <span className="text-[11px] uppercase tracking-widest text-accent2">{o.tag}</span>
                <p className="font-medium mt-2 leading-snug text-pretty">{o.title}</p>
                <p className="text-[12.5px] text-textFaint mt-2">{o.readTime}</p>
              </Link>
            ))}
          </div>
        </section>
      </Prose>
    </ProsePage>
  );
}