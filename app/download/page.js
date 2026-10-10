import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealGroup from "@/components/RevealGroup";
import Icon from "@/components/Icon";

const DESKTOP_PLATFORMS = [
  {
    name: "macOS",
    arch: "Apple Silicon",
    file: "frox-desktop-1.5.0-arm64.dmg",
    size: "84 MB",
    version: "v1.5.0",
  },
  {
    name: "macOS",
    arch: "Intel",
    file: "frox-desktop-1.5.0-x64.dmg",
    size: "89 MB",
    version: "v1.5.0",
  },
  {
    name: "Windows",
    arch: "x64",
    file: "Frox-Setup-1.5.0-x64.exe",
    size: "92 MB",
    version: "v1.5.0",
  },
  {
    name: "Windows",
    arch: "ARM",
    file: "Frox-Setup-1.5.0-arm64.exe",
    size: "88 MB",
    version: "v1.5.0",
  },
  {
    name: "Linux",
    arch: "AppImage",
    file: "frox-desktop-1.5.0.AppImage",
    size: "95 MB",
    version: "v1.5.0",
  },
  {
    name: "Linux",
    arch: "deb",
    file: "frox-desktop_1.5.0_amd64.deb",
    size: "91 MB",
    version: "v1.5.0",
  },
];

const MOBILE_PLATFORMS = [
  {
    name: "iOS",
    arch: "iPhone & iPad",
    file: "App Store",
    size: "48 MB",
    version: "v1.5.0",
  },
  {
    name: "Android",
    arch: "Phone & Tablet",
    file: "Google Play",
    size: "44 MB",
    version: "v1.5.0",
  },
];

const REQUIREMENTS = [
  { spec: "OS", min: "macOS 12 / Windows 10 / Ubuntu 22.04", rec: "macOS 14 / Windows 11 / Ubuntu 24.04" },
  { spec: "CPU", min: "Dual-core 64-bit", rec: "Quad-core 64-bit (Apple Silicon or Intel/AMD)" },
  { spec: "RAM", min: "4 GB", rec: "8 GB or more" },
  { spec: "Storage", min: "500 MB available", rec: "1 GB available (SSD recommended)" },
  { spec: "Display", min: "1280 × 720", rec: "1920 × 1080 or higher" },
  { spec: "Network", min: "Broadband connection for cloud models", rec: "Stable 10 Mbps+ connection" },
];

export const metadata = {
  title: "Download",
  description: "Download the Frox desktop and mobile apps.",
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Download"
        title="Download Frox"
        sub="Get Frox on every device. One account, your conversations and settings synced everywhere."
      >
        <Link href="/docs" className="btn-secondary">Read the setup guide</Link>
      </PageHero>

      <div className="container-x pb-24 space-y-16">
        <section>
        <p className="mt-3 text-textDim text-center">
          Version 1.5.0 — released October 2026
        </p>

        <RevealGroup className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESKTOP_PLATFORMS.map((p) => (
            <div key={p.file} className="card card-hover p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-ink/[0.05] border border-ink/10 grid place-items-center text-textDim">
                    <Icon name="monitor" size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-xs text-textFaint">{p.arch}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-accent2 bg-accent/10 border border-accent/30 rounded-md px-2 py-1">
                  {p.version}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-textDim">
                <span>{p.size}</span>
                <span className="text-textFaint">·</span>
                <span className="font-mono text-xs truncate">{p.file}</span>
              </div>

              <a href="https://github.com/Frox-AI" target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full text-center inline-flex items-center justify-center gap-2">
                <Icon name="download" size={15} /> Download
              </a>
            </div>
          ))}
        </RevealGroup>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Mobile app
        </h2>
        <p className="mt-3 text-textDim text-center">
          Take Frox anywhere. Available on iOS and Android.
        </p>

        <RevealGroup className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {MOBILE_PLATFORMS.map((p) => (
            <div key={p.name} className="card card-hover p-6 flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-xl bg-ink/[0.05] border border-ink/10 grid place-items-center text-textDim">
                <Icon name="smartphone" size={26} />
              </span>
              <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
              <p className="text-xs text-textFaint">{p.arch}</p>

              <div className="mt-3 flex items-center gap-3 text-sm text-textDim">
                <span>{p.size}</span>
                <span className="text-textFaint">·</span>
                <span className="font-mono text-xs text-accent2 bg-accent/10 border border-accent/30 rounded-md px-2 py-1">
                  {p.version}
                </span>
              </div>

              <a href="https://github.com/Frox-AI" target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full text-center inline-flex items-center justify-center gap-2">
                <Icon name="download" size={15} /> Get on {p.file}
              </a>
            </div>
          ))}
        </RevealGroup>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          System Requirements
        </h2>

        <div className="card mt-10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-borderSoft bg-bgElev/60">
                <th className="text-left px-5 py-3.5 font-semibold text-textDim">Specification</th>
                <th className="text-left px-5 py-3.5 font-semibold text-textDim">Minimum</th>
                <th className="text-left px-5 py-3.5 font-semibold text-textDim">Recommended</th>
              </tr>
            </thead>
            <tbody>
              {REQUIREMENTS.map((r) => (
                <tr key={r.spec} className="border-b border-borderSoft last:border-0">
                  <td className="px-5 py-3.5 font-medium">{r.spec}</td>
                  <td className="px-5 py-3.5 text-textDim">{r.min}</td>
                  <td className="px-5 py-3.5 text-textDim">{r.rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-textFaint">
          Running into issues? Check the{" "}
          <Link href="/docs" className="text-accent2 hover:opacity-80 transition-opacity">
            installation guide →
          </Link>
        </p>
      </section>
      </div>
    </main>
  );
}
