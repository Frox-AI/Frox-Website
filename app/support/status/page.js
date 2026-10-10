import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const TICKETS = [
  { id: "FRX-1042", subject: "Image upscale stuck at 90%", state: "In progress", updated: "2h ago", tone: "amber" },
  { id: "FRX-1039", subject: "Invoice for September", state: "Waiting on you", updated: "1d ago", tone: "accent" },
  { id: "FRX-1021", subject: "API key rotation question", state: "Resolved", updated: "5d ago", tone: "emerald" },
];

const TONE = { amber: "text-amber-500", accent: "text-accent", emerald: "text-emerald-600 dark:text-emerald-400" };

export const metadata = {
  title: "Ticket status",
  description: "Check the status of your support tickets.",
};

export default function SupportStatusPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Support"
        title="Your tickets"
        sub="Track the status of open requests. We email you on every update, so this page is a convenience, not a requirement."
      >
        <Link href="/support/new" className="btn-primary">Open a ticket</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-3xl">
        <div className="card overflow-hidden divide-y divide-ink/[0.06]">
          {TICKETS.map((t) => (
            <div key={t.id} className="flex items-center gap-4 px-6 py-4">
              <span className="font-mono text-[13px] text-textFaint w-20 shrink-0">{t.id}</span>
              <span className="flex-1 text-[15px] text-pretty">{t.subject}</span>
              <span className="hidden sm:block text-[13px] text-textFaint">{t.updated}</span>
              <span className={`text-[13px] font-medium w-28 text-right ${TONE[t.tone]}`}>{t.state}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-textFaint mt-8 flex items-center gap-2">
          <Icon name="check" size={14} /> All times shown in your local timezone.
        </p>
      </div>
    </div>
  );
}