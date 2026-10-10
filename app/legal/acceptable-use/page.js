import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Acceptable Use Policy" };

export default function AcceptableUsePage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Acceptable Use Policy"
      updated="October 10, 2026"
      intro="This policy describes what you may and may not do with Frox. It applies to everyone using the product, including on free plans."
      back={{ href: "/legal/terms", label: "Terms of Service" }}
    >
      <Prose>
        <ProseSection title="You may">
          <p>Use Frox for personal and commercial projects, build products on the API, fine-tune and self-host open weights, and process content you have the right to use.</p>
        </ProseSection>
        <ProseSection title="You may not">
          <p>Generate sexual content involving minors, content that incites violence, malware, or material that infringes others&apos; rights. Do not attempt to bypass safety systems, abuse rate limits, or use the service to harass people.</p>
        </ProseSection>
        <ProseSection title="Transparency">
          <p>If you publish AI-generated media, label it. Impersonating a real person&apos;s voice or likeness without consent is prohibited.</p>
        </ProseSection>
        <ProseSection title="Enforcement">
          <p>We may rate-limit, suspend, or terminate accounts that violate this policy. For serious violations we may report to the relevant authorities.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}