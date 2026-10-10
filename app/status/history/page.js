import Link from "next/link";
import PageHero from "@/components/PageHero";

const BY_YEAR = [
  {
    year: "2026",
    entries: [
      { date: "Oct 4", title: "Elevated latency on 3D generation", dur: "1h 12m", impact: "Minor" },
      { date: "Sep 22", title: "Intermittent voice synthesis failures", dur: "40m", impact: "Minor" },
      { date: "Sep 3", title: "Scheduled database maintenance", dur: "15m", impact: "None" },
      { date: "Jul 18", title: "Chat API rate-limit misconfiguration", dur: "26m", impact: "Minor" },
      { date: "May 30", title: "Image CDN cache stampede", dur: "8m", impact: "Minor" },
      { date: "Mar 9", title: "Auth token validation delay", dur: "22m", impact: "Moderate" },
      { date: "Jan 21", title: "Dashboard deploy rollback", dur: "11m", impact: "None" },
    ],
  },
  {
    year: "2025",
    entries: [
      { date: "Dec 14", title: "Code API timeout spike", dur: "34m", impact: "Minor" },
      { date: "Oct 2", title: "Storage region failover", dur: "1h 4m", impact: "Moderate" },
      { date: "Aug 27", title: "Voice library search index rebuild", dur: "19m", impact: "None" },
    ],
  },
];

const IMPACT_STYLE = {
  None: "text-textFaint",
  Minor: "text-amber-500",
  Moderate: "text-orange-500",
};

export const metadata = {
  title: "Status history",
  description: "Incident history for Frox services.",
};

export default function StatusHistoryPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Incident history"
        title="A record we keep honest"
        sub="Every incident, including the small ones. If something degraded — even briefly — it is listed here with how long it lasted."
      >
        <Link href="/status" className="btn-secondary">Back to status</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-3xl">
        {BY_YEAR.map((y) => (
          <section key={y.year} className="mb-12">
            <h2 className="text-xl font-bold tracking-tight mb-4">{y.year}</h2>
            <div className="card overflow-hidden divide-y divide-ink/[0.06]">
              {y.entries.map((e) => (
                <div key={e.date + e.title} className="flex items-center gap-4 px-5 py-4">
                  <span className="text-[13px] text-textFaint w-14 shrink-0">{e.date}</span>
                  <span className="text-[14.5px] flex-1 text-pretty">{e.title}</span>
                  <span className="hidden sm:block text-[13px] text-textFaint">{e.dur}</span>
                  <span className={`text-[12px] font-medium w-16 text-right ${IMPACT_STYLE[e.impact]}`}>{e.impact}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}