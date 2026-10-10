import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";

const ASSETS = [
  { name: "Logo pack (SVG + PNG)", size: "1.2 MB", note: "Primary mark, wordmark, and app icon in light and dark." },
  { name: "Brand guidelines", size: "PDF · 3.4 MB", note: "Clear space, color, and typography rules." },
  { name: "Product screenshots", size: "18 MB", note: "High-resolution captures of each product surface." },
  { name: "Founder headshots", size: "6.1 MB", note: "Approved portraits for editorial use." },
];

export const metadata = {
  title: "Press",
  description: "Press assets and facts about Frox.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Press & media"
        title="Resources for journalists"
        sub="Assets and facts for covering Frox accurately. Need something that isn't listed? Email the press desk and we will send it over."
      >
        <a href="mailto:press@froxstudio.ai" className="btn-primary">Email the press desk</a>
      </PageHero>

      <div className="container-x pb-24 max-w-3xl">
        <RevealGroup className="card overflow-hidden divide-y divide-ink/[0.06]">
          {ASSETS.map((a) => (
            <div key={a.name} className="flex items-center gap-4 px-6 py-5">
              <div className="flex-1">
                <p className="font-medium">{a.name}</p>
                <p className="text-[13px] text-textDim mt-0.5">{a.note}</p>
              </div>
              <span className="text-[13px] text-textFaint hidden sm:block">{a.size}</span>
              <button className="btn-secondary !py-2 !px-4 text-sm" disabled>Download</button>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-12 card p-7">
          <h2 className="font-semibold mb-3">Boilerplate</h2>
          <p className="text-sm text-textDim leading-relaxed text-pretty">
            Frox Studio builds open-weight AI models for chat, code, image, voice, and 3D. Its models run on a single platform and API, and core weights are released publicly so teams can self-host. Frox Studio is headquartered remotely and was founded in 2024.
          </p>
        </div>

        <p className="text-sm text-textFaint mt-8">Looking for logos and colors instead? See the <Link href="/brand" className="text-accent hover:underline">brand assets</Link> page.</p>
      </div>
    </div>
  );
}