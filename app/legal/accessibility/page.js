import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Accessibility Statement" };

export default function AccessibilityStatementPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Accessibility Statement"
      updated="October 10, 2026"
      intro="Our target is WCAG 2.2 Level AA across the product, and we are honest about where we have not reached it yet."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="What we support">
          <p>Full keyboard navigation, visible focus states, semantic landmarks, and support for light and dark themes. Text is sized to remain legible when zoomed to 200%.</p>
        </ProseSection>
        <ProseSection title="Motion and contrast">
          <p>Animations respect the <span className="font-mono text-[13px]">prefers-reduced-motion</span> setting, and color choices are tested for contrast in both themes.</p>
        </ProseSection>
        <ProseSection title="Known gaps">
          <p>Some live generation canvases still need better screen-reader descriptions, and a few marketing pages are not fully audited. We are addressing these in order of impact.</p>
        </ProseSection>
        <ProseSection title="Tell us">
          <p>If something is hard to use, email <a className="text-accent hover:underline" href="mailto:access@froxstudio.ai">access@froxstudio.ai</a> and we will work with you on a fix or a workaround.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}