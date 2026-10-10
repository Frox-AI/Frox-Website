"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    perUser: false,
    desc: "For individuals getting started with AI.",
    features: ["100 messages per day", "Basic models", "Community support"],
    cta: "Get started free",
    popular: false,
  },
  {
    name: "Pro",
    monthly: 20,
    yearly: 16,
    perUser: false,
    desc: "For professionals who need the full power of Frox.",
    features: [
      "Unlimited messages",
      "All models, including flagship",
      "Priority support",
      "API access",
    ],
    cta: "Start Pro trial",
    popular: true,
  },
  {
    name: "Team",
    monthly: 50,
    yearly: 40,
    perUser: true,
    desc: "For teams building AI products together.",
    features: [
      "Everything in Pro",
      "Shared workspace",
      "Admin controls",
      "SSO authentication",
    ],
    cta: "Start Team trial",
    popular: false,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    perUser: false,
    desc: "For organizations with advanced needs.",
    features: [
      "Everything in Team",
      "Dedicated infrastructure",
      "99.99% uptime SLA",
      "Custom fine-tuning",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Upgrades take effect immediately and we prorate the difference. Downgrades apply at the end of your current billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes. Pro and Team both come with a 14-day free trial — no credit card required. You get full access to every feature of the plan, and we'll notify you before the trial ends so you never get charged unexpectedly.",
  },
  {
    q: "What happens if I exceed the Free plan limit?",
    a: "Nothing bad. Your conversations pause until the next day's window resets, and we'll send you a friendly heads-up at 80% usage. You can upgrade to Pro at any time to remove the limit entirely.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. Enterprise customers can pay via invoice, wire transfer, or ACH with annual billing.",
  },
  {
    q: "Do you offer discounts for nonprofits or open source?",
    a: "Yes. Registered nonprofits, educational institutions, and open source projects get 50% off any plan. Reach out to our sales team with proof of status and we'll set it up.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-bg text-text">
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="hero-glow absolute inset-x-0 top-0 h-[500px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Pricing <span className="grad-text">Plans</span>
          </h1>
          <p className="mt-5 text-lg text-textDim max-w-2xl mx-auto">
            Start free and scale as you grow. Every plan includes access to our
            open models, transparent pricing, and no hidden fees — ever.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-bgElev p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                !yearly ? "grad-bg text-white" : "text-textDim hover:text-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                yearly ? "grad-bg text-white" : "text-textDim hover:text-text"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  yearly ? "bg-ink/20 text-white" : "bg-accent/15 text-accent"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`card relative p-6 flex flex-col ${
                  plan.popular ? "border-2 border-accent glow" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 grad-bg text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-textFaint min-h-[40px]">{plan.desc}</p>

                <div className="mt-4 flex items-end gap-1.5">
                  {price === null ? (
                    <span className="text-4xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-textFaint text-sm mb-1.5">
                        /{plan.perUser ? "user " : ""}mo
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-xs text-textFaint h-4">
                  {price !== null && price > 0
                    ? yearly
                      ? "Billed annually"
                      : "Billed monthly"
                    : ""}
                </p>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-textDim">
                      <span className="text-accent2 mt-0.5"><Icon name="check" size={14} /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`mt-6 w-full text-center ${
                    plan.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-textFaint">
          All prices in USD. Need a custom plan?{" "}
          <a href="#" className="text-accent2 hover:underline">
            Talk to sales →
          </a>
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Frequently asked <span className="grad-text">questions</span>
        </h2>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold">{faq.q}</span>
                <span
                  className={`text-accent2 text-xl transition-transform duration-200 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <p className="px-5 pb-5 text-sm text-textDim">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
