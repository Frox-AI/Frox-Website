import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Open-Source Licenses" };

const LIBS = [
  ["Next.js", "MIT"],
  ["React", "MIT"],
  ["Tailwind CSS", "MIT"],
  ["Node.js", "MIT"],
  ["Sharp", "Apache-2.0"],
  ["Instrument Serif", "OFL-1.1"],
  ["Inter", "OFL-1.1"],
  ["JetBrains Mono", "OFL-1.1"],
];

export default function LicensesPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Open-Source Licenses"
      updated="October 10, 2026"
      intro="Frox is built on open-source software. We are grateful to the maintainers, and we list the major dependencies here."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <div className="card overflow-hidden divide-y divide-ink/[0.06]">
          {LIBS.map(([name, license]) => (
            <div key={name} className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[15px]">{name}</span>
              <span className="font-mono text-[13px] text-textFaint">{license}</span>
            </div>
          ))}
        </div>
        <ProseSection title="Model weights">
          <p>Core Frox model weights are released under licenses documented on each model card at Hugging Face. Check the card before commercial use.</p>
        </ProseSection>
        <ProseSection title="Full notices">
          <p>Complete license texts ship with the corresponding packages and are available on request at <a className="text-accent hover:underline" href="mailto:legal@froxstudio.ai">legal@froxstudio.ai</a>.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}