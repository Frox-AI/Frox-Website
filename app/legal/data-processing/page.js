import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Data Processing" };

export default function DataProcessingPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Data Processing Information"
      updated="October 10, 2026"
      intro="For teams that need to document how Frox processes data on their behalf."
      back={{ href: "/legal/privacy", label: "Privacy Policy" }}
    >
      <Prose>
        <ProseSection title="Roles">
          <p>When you use Frox for your own business, you are the controller of the personal data you submit and Frox acts as a processor. This page summarizes the terms of that arrangement.</p>
        </ProseSection>
        <ProseSection title="What we process">
          <p>Account details, billing records, prompts you submit, and generated outputs. We process these to provide the service and to keep it secure.</p>
        </ProseSection>
        <ProseSection title="Sub-processors">
          <p>We use a limited set of infrastructure and payment providers. A current list is available on request and we notify customers before adding a new sub-processor that handles personal data.</p>
        </ProseSection>
        <ProseSection title="Data location & retention">
          <p>Data is stored in the region you select where available. We retain prompts and outputs according to your plan settings and delete them when you ask.</p>
        </ProseSection>
        <ProseSection title="Requests">
          <p>For a data processing agreement, email <a className="text-accent hover:underline" href="mailto:privacy@froxstudio.ai">privacy@froxstudio.ai</a>.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}