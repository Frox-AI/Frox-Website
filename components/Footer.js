import Link from "next/link";
import { Mark } from "@/components/Brand";

const GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Frox Chat", href: "/chat" },
      { label: "Frox Forge", href: "/forge" },
      { label: "Frox Image", href: "/image" },
      { label: "Frox Voice", href: "/audio" },
      { label: "Frox Code", href: "/code" },
      { label: "Frox 3D", href: "/3d" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/features" },
      { label: "Explore", href: "/explore" },
      { label: "Integrations", href: "/integrations" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Models", href: "/models" },
      { label: "Prompt library", href: "/templates" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Overview", href: "/developers" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs#authentication" },
      { label: "SDKs", href: "/download" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Discussions", href: "/community" },
      { label: "News", href: "/news" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Security", href: "/security" },
      { label: "Waitlist", href: "/waitlist" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
      { label: "Admin", href: "/admin" },
      { label: "Support", href: "/support" },
      { label: "Status", href: "/status" },
      { label: "Sign in", href: "/auth/login" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function Footer() {
  return (
    <footer className="mt-auto rule-x">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Frox Studio — home">
              <Mark size={26} />
              <span className="font-semibold text-[16px] tracking-tight">Frox</span>
            </Link>
            <p className="mt-4 text-[13.5px] text-textFaint max-w-[26ch] leading-relaxed">
              Open-weight models for text, code, image, audio, and 3D. Run them here or on your own hardware.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[13px] text-textFaint">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>

          {GROUPS.map((g) => (
            <div key={g.title}>
              <h5 className="text-[13px] font-semibold text-text mb-3.5">{g.title}</h5>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13.5px] text-textDim hover:text-text transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-x-soft mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-textFaint">
          <span>© 2026 Frox Studio</span>
          <div className="flex items-center gap-5">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-text transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
