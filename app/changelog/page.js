const ENTRIES = [
  {
    version: "1.5.0",
    date: "October 2, 2026",
    tag: "Latest",
    items: [
      "Released Flex Model LoRA with 256K context window",
      "Added streaming responses to the Chat API",
      "Improved inference latency by 32% on average",
      "New SDKs for Python, JavaScript, and Go",
    ],
  },
  {
    version: "1.4.0",
    date: "September 14, 2026",
    tag: "",
    items: [
      "Launched Flex Code 1.0 for code generation",
      "Added fine-tuning API support",
      "Introduced rate limit headers",
      "New usage dashboard with per-model breakdowns",
    ],
  },
  {
    version: "1.3.0",
    date: "August 21, 2026",
    tag: "",
    items: [
      "Image generation endpoint now supports 1024px output",
      "Added webhook support for async jobs",
      "Improved error messages across all endpoints",
    ],
  },
];

export const metadata = {
  title: "Changelog",
  description: "Every change we ship, in order.",
};

export default function ChangelogPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Product <span className="grad-text">Changelog</span>
        </h1>
        <p className="text-textDim text-lg mb-14">New updates and improvements to Frox Studio.</p>

        <div className="space-y-12">
          {ENTRIES.map((e) => (
            <div key={e.version} className="relative pl-8 border-l border-borderSoft">
              <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full grad-bg" />
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl font-bold">{e.version}</h2>
                {e.tag && <span className="text-xs px-2.5 py-0.5 rounded-full grad-bg text-white font-semibold">{e.tag}</span>}
                <span className="text-sm text-textFaint">{e.date}</span>
              </div>
              <ul className="space-y-2">
                {e.items.map((it) => (
                  <li key={it} className="text-textDim flex gap-2.5">
                    <span className="text-accent mt-1.5">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
