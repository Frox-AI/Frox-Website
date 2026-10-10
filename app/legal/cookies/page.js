import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="October 10, 2026"
      intro="This policy explains which cookies Frox sets, why, and how you can control them."
      back={{ href: "/legal/privacy", label: "Privacy Policy" }}
    >
      <Prose>
        <ProseSection title="Strictly necessary">
          <p>These keep you signed in and protect requests against cross-site forgery. They cannot be turned off because the product does not work without them.</p>
        </ProseSection>
        <ProseSection title="Preferences">
          <p>We store your theme choice and a few interface settings so the app looks the way you left it. These are optional and cleared when you sign out if you ask us to.</p>
        </ProseSection>
        <ProseSection title="Analytics">
          <p>We use a small, privacy-respecting analytics script to understand which pages are used. It does not build a cross-site profile and we do not sell the data.</p>
        </ProseSection>
        <ProseSection title="Managing cookies">
          <p>You can clear or block cookies in your browser at any time. Blocking strictly necessary cookies will prevent sign-in and may break parts of the product.</p>
        </ProseSection>
      </Prose>
    </ProsePage>
  );
}