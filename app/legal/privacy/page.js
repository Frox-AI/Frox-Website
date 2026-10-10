import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = {
  title: "Privacy Policy",
  description: "How Frox collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="October 10, 2026"
      intro="What we collect, why we collect it, and the controls you have over it."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="Information We Collect">
          <p>
            We collect information you provide directly to us, such as when you create an
            account, subscribe to a plan, or contact us for support. This may include your
            name, email address, and payment information.
          </p>
        </ProseSection>

        <ProseSection title="How We Use Your Information">
          <p>
            We use the information we collect to provide, maintain, and improve our
            services, to process transactions, to send you technical notices and support
            messages, and to respond to your comments and questions.
          </p>
        </ProseSection>

        <ProseSection title="Data Sharing">
          <p>
            We do not sell your personal information. We may share information with
            third-party service providers who perform services on our behalf, such as
            payment processing and data analysis, subject to confidentiality obligations.
          </p>
        </ProseSection>

        <ProseSection title="Data Security">
          <p>
            We take reasonable measures to help protect your personal information from
            loss, theft, misuse, and unauthorized access. All data is encrypted in transit
            and at rest using industry-standard protocols.
          </p>
        </ProseSection>

        <ProseSection title="Your Rights">
          <p>
            You have the right to access, correct, or delete your personal information.
            You may also object to or restrict certain processing of your data. To
            exercise these rights, contact us at any time.
          </p>
        </ProseSection>

        <ProseSection title="Cookies">
          <p>
            We use cookies and similar technologies to collect information about your
            browsing activities and to personalize your experience. You can set your
            browser to refuse cookies, but some parts of the service may not function
            properly.
          </p>
        </ProseSection>

        <ProseSection title="Children&apos;s Privacy">
          <p>
            Our service is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under 13. If we become
            aware that we have collected such information, we will take steps to delete it.
          </p>
        </ProseSection>

        <ProseSection title="Changes">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the
            &ldquo;Last updated&rdquo; date.
          </p>
        </ProseSection>

        <ProseSection title="Contact">
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@frox.ai" className="text-accent hover:underline">
              privacy@frox.ai
            </a>
            .
          </p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}
