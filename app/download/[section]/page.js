import Link from "next/link";
import { notFound } from "next/navigation";
import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";
import Icon from "@/components/Icon";

const SECTIONS = {
  desktop: {
    title: "Frox for desktop",
    intro: "A native app for macOS and Windows with local file access and offline history.",
    status: "In development",
    sections: [
      ["What it adds", "Drag files straight from Finder or Explorer, keep your history on disk, and use global shortcuts to summon the assistant over any app."],
      ["How to get it", "The desktop app is on the roadmap. Join the waitlist to be notified when the first build is ready."],
      ["Privacy", "Local history is stored on your machine and encrypted with your OS keychain. You can point it at the cloud account or keep it fully local."],
    ],
  },
  mobile: {
    title: "Frox for mobile",
    intro: "Companion apps for capturing ideas and generating on the go.",
    status: "Planned",
    sections: [
      ["What it adds", "Quick chat, camera-to-image generation, and voice notes that turn into transcripts or audio."],
      ["Availability", "Mobile apps are on the roadmap after the desktop client. Progress is tracked publicly on the roadmap page."],
      ["Until then", "The web app is fully responsive and installs to your home screen as a Progressive Web App."],
    ],
  },
  requirements: {
    title: "System requirements",
    intro: "What you need to run the web app, the SDKs, or the open weights.",
    status: "Reference",
    sections: [
      ["Web app", "Any current version of Chrome, Edge, Firefox, or Safari. JavaScript enabled. A stable connection for streaming responses."],
      ["SDKs", "Python 3.9 or newer, or Node 18 or newer. The Go SDK targets Go 1.21 and above."],
      ["Self-hosting open weights", "A CUDA-capable GPU with at least 16 GB of VRAM for the base chat model. Quantized builds run on less. See the model cards for exact figures."],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export function generateMetadata({ params }) {
  const s = SECTIONS[params.section];
  return { title: s ? s.title : "Download" };
}

export default function DownloadSectionPage({ params }) {
  const s = SECTIONS[params.section];
  if (!s) notFound();

  return (
    <ProsePage
      eyebrow="Download"
      title={s.title}
      intro={s.intro}
      back={{ href: "/download", label: "All downloads" }}
    >
      <Prose>
        <ProseSection title="Status">
          <p className="inline-flex items-center gap-2">
            <Icon name="cornerDownRight" size={15} className="text-accent2" />
            {s.status}
          </p>
        </ProseSection>
        {s.sections.map(([title, text]) => (
          <ProseSection key={title} title={title}>
            <p>{text}</p>
          </ProseSection>
        ))}
        <div className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-textDim">Want to be notified when this ships?</p>
          <Link href="/waitlist" className="btn-primary !py-2 !px-4 text-sm">Join the waitlist</Link>
        </div>
      </Prose>
    </ProsePage>
  );
}