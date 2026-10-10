"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const TOPICS = ["Account", "Billing", "Bug report", "API / SDKs", "Feature request", "Other"];

export default function NewTicketPage() {
  const [form, setForm] = useState({ topic: "Account", subject: "", body: "", email: "" });
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.body.trim() || !form.email.includes("@")) return;
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Support"
        title="Open a ticket"
        sub="Give us the details up front and we'll route it to the right engineer. The more specific you are, the faster the fix."
      >
        <Link href="/support" className="btn-secondary">Back to support</Link>
      </PageHero>

      <div className="container-x pb-24 max-w-2xl">
        {done ? (
          <div className="card p-8 text-center">
            <span className="w-12 h-12 rounded-full grad-bg grid place-items-center text-white mx-auto mb-4"><Icon name="check" size={22} /></span>
            <h2 className="text-xl font-bold tracking-tight">Ticket received</h2>
            <p className="text-textDim mt-2 text-pretty">We&apos;ve sent a confirmation to <span className="text-text font-medium">{form.email}</span> with your ticket number. Expect a reply within one business day.</p>
            <div className="flex gap-3 justify-center mt-6">
              <Link href="/support/status" className="btn-secondary">Check status</Link>
              <Link href="/help" className="btn-primary">Browse help</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="card p-7 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">What's this about?</label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, topic: t }))}
                    className={`px-3.5 py-2 rounded-lg border text-sm transition-colors ${form.topic === t ? "border-accent bg-accent/10" : "border-ink/10 text-textDim hover:border-ink/20"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com"
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] placeholder-textFaint focus:outline-none focus:border-accent transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input type="text" required value={form.subject} onChange={set("subject")} placeholder="A one-line summary"
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] placeholder-textFaint focus:outline-none focus:border-accent transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Details</label>
              <textarea required rows={6} value={form.body} onChange={set("body")} placeholder="What happened, what you expected, and any error or request ID."
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] placeholder-textFaint focus:outline-none focus:border-accent transition-colors resize-y" />
            </div>

            <button type="submit" className="btn-primary w-full">Submit ticket</button>
          </form>
        )}
      </div>
    </div>
  );
}