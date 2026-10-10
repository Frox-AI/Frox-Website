"use client";
import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";

const CHANNELS = [
  { title: "Sales", email: "sales@froxstudio.ai", desc: "Enterprise plans and custom models" },
  { title: "Support", email: "support@froxstudio.ai", desc: "Help with your account" },
  { title: "Press", email: "press@froxstudio.ai", desc: "Media and brand inquiries" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Contact"
        title="Contact Frox Studio"
        sub="Questions about our models, enterprise plans, or partnerships? We'd love to hear from you."
      />

      <div className="container-x pb-24 space-y-16">
        <RevealGroup className="grid md:grid-cols-3 gap-5">
          {CHANNELS.map((c) => (
            <div key={c.title} className="card card-hover p-6">
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-textDim mb-3">{c.desc}</p>
              <a href={`mailto:${c.email}`} className="text-accent text-sm hover:opacity-80 transition-opacity">{c.email}</a>
            </div>
          ))}
        </RevealGroup>

        <div className="max-w-2xl card p-8">
          {sent ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold mb-2">Message sent</h3>
              <p className="text-textDim">Thanks for reaching out. Our team will get back to you within 1&ndash;2 business days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] text-text placeholder-textFaint focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] text-text placeholder-textFaint focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] text-text placeholder-textFaint focus:outline-none focus:border-accent transition-colors resize-y"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          )}
        </div>

        <p className="text-sm text-textFaint max-w-2xl">
          Looking for an answer right now? The{" "}
          <Link href="/help" className="text-accent hover:opacity-80 transition-opacity">help center</Link>{" "}
          and the{" "}
          <Link href="/docs" className="text-accent hover:opacity-80 transition-opacity">documentation</Link>{" "}
          cover most common questions.
        </p>
      </div>
    </div>
  );
}
