"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contact <span className="grad-text">Frox Studio</span>
          </h1>
          <p className="text-textDim text-lg">
            Questions about our models, enterprise plans, or partnerships? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {[
            { title: "Sales", email: "sales@froxstudio.ai", desc: "Enterprise plans & custom models" },
            { title: "Support", email: "support@froxstudio.ai", desc: "Help with your account" },
            { title: "Press", email: "press@froxstudio.ai", desc: "Media & brand inquiries" },
          ].map((c) => (
            <div key={c.title} className="card p-6 text-center">
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-textDim mb-3">{c.desc}</p>
              <a href={`mailto:${c.email}`} className="text-accent text-sm hover:underline">{c.email}</a>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto card p-8">
          {sent ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold mb-2">Message sent</h3>
              <p className="text-textDim">Thanks for reaching out. Our team will get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-textDim">Name</label>
                  <input required className="w-full h-11 px-4 rounded-lg bg-bgElev border border-border text-text text-sm outline-none focus:border-accent/60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-textDim">Email</label>
                  <input type="email" required className="w-full h-11 px-4 rounded-lg bg-bgElev border border-border text-text text-sm outline-none focus:border-accent/60" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textDim">Subject</label>
                <input required className="w-full h-11 px-4 rounded-lg bg-bgElev border border-border text-text text-sm outline-none focus:border-accent/60" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textDim">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-lg bg-bgElev border border-border text-text text-sm outline-none focus:border-accent/60 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full h-11">Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
