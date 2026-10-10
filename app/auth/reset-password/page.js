import ResetForm from "@/components/auth/ResetForm";

export const metadata = {
  title: "Reset password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage({ searchParams }) {
  // Token is read on the server so the form renders immediately — no
  // useSearchParams/Suspense, so there is no "Loading…" flash on first paint.
  const token = typeof searchParams?.token === "string" ? searchParams.token : "";
  return <ResetForm token={token} />;
}
