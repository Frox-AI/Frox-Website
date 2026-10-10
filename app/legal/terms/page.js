export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="grad-text">Terms of Service</span>
          </h1>
          <p className="text-textDim text-lg">Last updated: October 10, 2026</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-textDim leading-relaxed">
              By accessing and using Frox, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to
              abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
            <p className="text-textDim leading-relaxed">
              Frox provides AI-powered tools for text, image, audio, and 3D
              generation. You agree to use the service only for lawful purposes
              and in accordance with these Terms. You are responsible for all
              activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Accounts</h2>
            <p className="text-textDim leading-relaxed">
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for safeguarding your
              password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
            <p className="text-textDim leading-relaxed">
              You agree not to use the service to generate content that is
              unlawful, harmful, defamatory, infringing, or otherwise
              objectionable. We reserve the right to suspend or terminate
              accounts that violate these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-textDim leading-relaxed">
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Frox and its
              licensors. Content generated through the service is granted to you
              under a non-exclusive, worldwide license.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
            <p className="text-textDim leading-relaxed">
              Paid subscriptions are billed in advance on a recurring basis.
              You will be charged at the beginning of each billing cycle. All
              fees are non-refundable except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-textDim leading-relaxed">
              In no event shall Frox be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-textDim leading-relaxed">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason, including if you
              breach the Terms. Upon termination, your right to use the service
              will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-textDim leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new terms on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
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
          </section>
        </div>
      </div>
    </div>
  );
}
