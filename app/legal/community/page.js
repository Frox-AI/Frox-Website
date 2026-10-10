import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Community Rules" };

export default function CommunityRulesPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Community Rules"
      updated="October 10, 2026"
      intro="The short version: be useful, be kind, be honest about what is yours."
      back={{ href: "/community", label: "Community" }}
    >
      <Prose>
        <ProseSection title="Be specific">
          <p>Show your prompt, your input, and what you expected. Vague posts get vague answers.</p>
        </ProseSection>
        <ProseSection title="Be respectful">
          <p>Criticize ideas, not people. Harassment, slurs, and targeted abuse lead to removal and a ban.</p>
        </ProseSection>
        <ProseSection title="Credit work">
          <p>Share prompts and assets you have the right to share, and credit remixes of other people&apos;s work.</p>
        </ProseSection>
        <ProseSection title="No spam or self-promotion dumps">
          <p>Occasional links to your projects are fine when they are on-topic. Mass posting and affiliate links are not.</p>
        </ProseSection>
        <ProseSection title="Keep it legal">
          <p>The acceptable use policy applies here too. Do not share generated content that violates it.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}