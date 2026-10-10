import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function LoginPage({ searchParams }) {
  // Read the redirect target on the server so the form renders immediately —
  // no useSearchParams/Suspense, so there is no "Loading…" flash on first paint.
  const next =
    typeof searchParams?.next === "string" && searchParams.next.startsWith("/")
      ? searchParams.next
      : "/dashboard";

  return <LoginForm next={next} />;
}
