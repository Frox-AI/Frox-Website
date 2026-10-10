import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Refund Policy"
      updated="October 10, 2026"
      intro="When we refund, how to ask, and what to expect."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="Subscriptions">
          <p>If a paid plan does not work for you, contact us within 14 days of your first charge for that plan and we will refund it in full. After that window, months already billed are generally non-refundable.</p>
        </ProseSection>
        <ProseSection title="Usage credits">
          <p>Credits that have already been consumed by generations are not refundable. Unused credit balances may be refunded within the same 14-day window.</p>
        </ProseSection>
        <ProseSection title="Service failures">
          <p>If an outage on our side causes a significant loss of paid usage, we will credit your account or refund the affected amount at our discretion.</p>
        </ProseSection>
        <ProseSection title="How to request">
          <p>Email <a className="text-accent hover:underline" href="mailto:billing@froxstudio.ai">billing@froxstudio.ai</a> from your account email with the charge you are asking about. Refunds are returned to the original payment method.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}