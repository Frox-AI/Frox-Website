import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import { JOBS } from "@/lib/content";

export function generateStaticParams() {
  return JOBS.map((job) => ({ jobId: job.id }));
}

export function generateMetadata({ params }) {
  const job = JOBS.find((j) => j.id === params.jobId);
  return { title: job ? `${job.title} — Careers` : "Careers" };
}

export default function JobDetailPage({ params }) {
  const job = JOBS.find((j) => j.id === params.jobId);
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow={`${job.team} · ${job.location} · ${job.type}`}
        title={job.title}
        sub={job.summary}
      >
        <a href="mailto:careers@froxstudio.ai" className="btn-primary">Apply by email</a>
        <Link href="/careers" className="btn-secondary">Back to careers</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-3xl">
        <div className="space-y-9">
          <section>
            <h2 className="text-xl font-bold tracking-tight mb-3">About the role</h2>
            <p className="text-[15px] text-textDim leading-relaxed text-pretty">{job.about}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-3">What you&apos;ll do</h2>
            <ul className="space-y-2.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-textDim">
                  <span className="text-accent mt-0.5"><Icon name="check" size={15} /></span>
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-3">What we&apos;re looking for</h2>
            <ul className="space-y-2.5">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-textDim">
                  <span className="text-accent2 mt-0.5"><Icon name="check" size={15} /></span>
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <div className="card p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h2 className="font-semibold">How to apply</h2>
              <p className="text-sm text-textDim mt-1">Send a short note and links to work you&apos;re proud of. No cover letter template required.</p>
            </div>
            <a href="mailto:careers@froxstudio.ai" className="btn-primary shrink-0">careers@froxstudio.ai</a>
          </div>

          <p className="text-sm text-textFaint">
            Frox is remote-first and hires across time zones. We review every application and reply either way.
          </p>
        </div>
      </div>
    </div>
  );
}