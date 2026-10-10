export const metadata = {
  title: "Privacy Policy",
  description: "How Frox collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="grad-text">Privacy Policy</span>
          </h1>
          <p className="text-textDim text-lg">Last updated: October 10, 2026</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-textDim leading-relaxed">
              We collect information you provide directly to us, such as when
              you create an account, subscribe to a plan, or contact us for
              support. This may include your name, email address, and payment
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-textDim leading-relaxed">
              We use the information we collect to provide, maintain, and
              improve our services, to process transactions, to send you
              technical notices and support messages, and to respond to your
              comments and questions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
            <p className="text-textDim leading-relaxed">
              We do not sell your personal information. We may share
              information with third-party service providers who perform
              services on our behalf, such as payment processing and data
              analysis, subject to confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-textDim leading-relaxed">
              We take reasonable measures to help protect your personal
              information from loss, theft, misuse, and unauthorized access.
              All data is encrypted in transit and at rest using industry-standard
              protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-textDim leading-relaxed">
              You have the right to access, correct, or delete your personal
              information. You may also object to or restrict certain processing
              of your data. To exercise these rights, contact us at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-textDim leading-relaxed">
              We use cookies and similar technologies to collect information
              about your browsing activities and to personalize your experience.
              You can set your browser to refuse cookies, but some parts of the
              service may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-textDim leading-relaxed">
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such information, we
              will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes</h2>
            <p className="text-textDim leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-textDim leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@frox.ai"
                className="text-accent hover:underline"
              >
                privacy@frox.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
