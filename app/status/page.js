import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const SERVICES = [
  { name: "Chat API", uptime: "99.98%", state: "operational" },
  { name: "Image API", uptime: "99.95%", state: "operational" },
  { name: "Voice API", uptime: "99.92%", state: "operational" },
  { name: "Code API", uptime: "99.99%", state: "operational" },
  { name: "3D API", uptime: "99.81%", state: "degraded" },
  { name: "Web app", uptime: "99.99%", state: "operational" },
  { name: "Dashboard", uptime: "100.0%", state: "operational" },
  { name: "Authentication", uptime: "99.99%", state: "operational" },
];

const INCIDENTS = [
  { date: "Oct 4, 2026", title: "Elevated latency on 3D generation", status: "Resolved", body: "A batch of long-running mesh jobs queued behind a stuck worker. The queue was drained and the worker replaced. No data was lost." },
  { date: "Sep 22, 2026", title: "Intermittent voice synthesis failures", status: "Resolved", body: "A TLS certificate rotation caused brief retrieval failures for cached voices. Fixed within 40 minutes with no user action required." },
  { date: "Sep 3, 2026", title: "Scheduled database maintenance", status: "Completed", body: "Routine index rebuild. API availability was unaffected; the dashboard was read-only for 15 minutes." },
];

const STATS = [
  { label: "90-day uptime", value: "99.97%" },
  { label: "Median API latency", value: "240 ms" },
  { label: "Open incidents", value: "0" },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="System status"
        title="Everything looks healthy"
        sub="Live availability for every Frox service. We post incidents here before anywhere else — subscribe below for updates."
      >
        <Link href="/status/history" className="btn-secondary">Incident history</Link>
      </PageHero>

      <div className="container-x pb-24">
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {STATS.map((s) => (
            <div key={s.label} className="card p-6">
              <p className="text-3xl font-bold tracking-tight grad-text">{s.value}</p>
              <p className="text-sm text-textDim mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink/[0.07]">
            <h2 className="font-semibold">Services</h2>
            <span className="text-[13px] text-textFaint">Updated a moment ago</span>
          </div>
          <div className="divide-y divide-ink/[0.06]">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex items-center gap-4 px-6 py-4">
                <span className={`w-2 h-2 rounded-full ${s.state === "operational" ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className="text-[15px] font-medium flex-1">{s.name}</span>
                <span className="hidden sm:block text-sm text-textFaint">{s.uptime}</span>
                <span className={`text-sm capitalize ${s.state === "operational" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}`}>{s.state}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mt-16 mb-6">Recent incidents</h2>
        <div className="space-y-4">
          {INCIDENTS.map((i) => (
            <div key={i.title} className="card p-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[13px] text-textFaint">{i.date}</span>
                <span className="chip !py-0.5 !px-2.5 !text-[11px] text-emerald-600 dark:text-emerald-400">
                  <Icon name="check" size={12} /> {i.status}
                </span>
              </div>
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-textDim mt-2 leading-relaxed text-pretty">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}