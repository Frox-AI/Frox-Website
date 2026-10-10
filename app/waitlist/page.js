"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [interest, setInterest] = useState("Chat");

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Waitlist"
        title="Get early access to what's next"
        sub="We're rolling out new models and features gradually. Join the list and we'll email you when your spot opens — no spam, one message per release."
      />

      <div className="container-x pb-24 max-w-xl">
        {done ? (
          <div className="card p-8 text-center">
            <span className="w-12 h-12 rounded-full grad-bg grid place-items-center text-white mx-auto mb-4">
              <Icon name="check" size={22} />
            </span>
            <h2 className="text-xl font-bold tracking-tight">You&apos;re on the list</h2>
            <p className="text-textDim mt-2 text-pretty">
              We&apos;ll email <span className="text-text font-medium">{email}</span> when access opens for {interest}. Thanks for the interest.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="card p-7">
            <label className="block text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[15px] text-text placeholder-textFaint focus:outline-none focus:border-accent transition-colors"
            />

            <label className="block text-sm font-medium mb-2 mt-6">I&apos;m most interested in</label>
            <div className="flex flex-wrap gap-2">
              {["Chat", "Image", "Voice", "Code", "3D", "API"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setInterest(opt)}
                  className={`px-3.5 py-2 rounded-lg border text-sm transition-colors ${
                    interest === opt ? "border-accent bg-accent/10 text-text" : "border-ink/10 text-textDim hover:border-ink/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button type="submit" className="btn-primary w-full mt-7">Join the waitlist</button>
            <p className="text-[12.5px] text-textFaint mt-3 text-center">By joining you agree to our <a href="/legal/privacy" className="hover:text-textDim">privacy policy</a>.</p>
          </form>
        )}
      </div>
    </div>
  );
}