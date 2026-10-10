import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Copyright Policy" };

export default function CopyrightPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Copyright Policy"
      updated="October 10, 2026"
      intro="How Frox handles copyright, and how to report infringement."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="Your content">
          <p>You keep ownership of the inputs you provide. Outputs are yours to use subject to our terms and any third-party rights that may apply to prompts you supply.</p>
        </ProseSection>
        <ProseSection title="Reporting infringement">
          <p>Send notices to <a className="text-accent hover:underline" href="mailto:copyright@froxstudio.ai">copyright@froxstudio.ai</a> with the work at issue, the location on our service, your contact details, and a statement that you are authorized to act.</p>
        </ProseSection>
        <ProseSection title="Counter-notice">
          <p>If your content was removed in error you may submit a counter-notice with the same contact details, and we will review it in line with applicable law.</p>
        </ProseSection>
        <ProseSection title="Repeat infringers">
          <p>Accounts that repeatedly infringe copyright may be terminated.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}