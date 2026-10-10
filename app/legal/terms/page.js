import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Frox.",
};

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of Service"
      updated="October 10, 2026"
      intro="The agreement that governs your use of Frox Studio."
      back={{ href: "/legal/privacy", label: "Privacy Policy" }}
    >
      <Prose>
        <ProseSection title="Acceptance of Terms">
            <p className="text-textDim leading-relaxed">
              By accessing and using Frox, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to
              abide by the above, please do not use this service.
            </p>
        </ProseSection>
        <ProseSection title="Use of Service">
            <p className="text-textDim leading-relaxed">
              Frox provides AI models and tools for text, image, audio, and 3D
              generation. You agree to use the service only for lawful purposes
              and in accordance with these Terms. You are responsible for all
              activity that occurs under your account.
            </p>
        </ProseSection>
        <ProseSection title="Accounts">
            <p className="text-textDim leading-relaxed">
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for safeguarding your
              password and for all activities that occur under your account.
            </p>
        </ProseSection>
        <ProseSection title="Acceptable Use">
            <p className="text-textDim leading-relaxed">
              You agree not to use the service to generate content that is
              unlawful, harmful, defamatory, infringing, or otherwise
              objectionable. We reserve the right to suspend or terminate
              accounts that violate these guidelines.
            </p>
        </ProseSection>
        <ProseSection title="Intellectual Property">
            <p className="text-textDim leading-relaxed">
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Frox and its
              licensors. Content generated through the service is granted to you
              under a non-exclusive, worldwide license.
            </p>
        </ProseSection>
        <ProseSection title="Payment Terms">
            <p className="text-textDim leading-relaxed">
              Paid subscriptions are billed in advance on a recurring basis.
              You will be charged at the beginning of each billing cycle. All
              fees are non-refundable except as required by law.
            </p>
        </ProseSection>
        <ProseSection title="Limitation of Liability">
            <p className="text-textDim leading-relaxed">
              In no event shall Frox be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly.
            </p>
        </ProseSection>
        <ProseSection title="Termination">
            <p className="text-textDim leading-relaxed">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason, including if you
              breach the Terms. Upon termination, your right to use the service
              will immediately cease.
            </p>
        </ProseSection>
        <ProseSection title="Changes to Terms">
            <p className="text-textDim leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new terms on
              this page and updating the "Last updated" date.
            </p>
        </ProseSection>
        <ProseSection title="Contact">
            <p className="text-textDim leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:legal@frox.ai"
                className="text-accent hover:underline"
              >
                legal@frox.ai
              </a>
              .
            </p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}
