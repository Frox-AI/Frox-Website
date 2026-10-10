import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "AI Limitations & Disclaimer" };

export default function AiDisclaimerPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="AI Limitations & Disclaimer"
      updated="October 10, 2026"
      intro="Frox models are powerful and imperfect. Please read this before relying on their output."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="Models can be wrong">
          <p>Generative systems produce confident, plausible text and media that may be inaccurate, outdated, or fabricated. Treat outputs as drafts, not as verified facts.</p>
        </ProseSection>
        <ProseSection title="No professional advice">
          <p>Frox does not provide legal, medical, financial, or safety advice. Do not use it as a substitute for a qualified professional.</p>
        </ProseSection>
        <ProseSection title="Review before use">
          <p>Verify code before running it, check facts before publishing them, and review generated media for rights and appropriateness.</p>
        </ProseSection>
        <ProseSection title="Availability">
          <p>Models change over time. We may update, retrain, or retire a model, and behavior on the same prompt can differ between versions.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}