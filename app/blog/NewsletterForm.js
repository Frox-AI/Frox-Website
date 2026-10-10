"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="mt-6 flex items-center justify-center gap-2 text-[14px] text-emerald-400">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        You&apos;re subscribed. Welcome aboard.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        className="flex-1 px-4 py-3 rounded-xl text-sm bg-bgElev border border-border outline-none focus:border-accent/60 transition-colors placeholder:text-textFaint"
      />
      <button type="submit" className="btn-primary shrink-0">Subscribe</button>
    </form>
  );
}
