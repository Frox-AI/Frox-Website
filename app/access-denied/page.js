import SystemState from "@/components/SystemState";

export const metadata = { title: "Access denied" };

export default function AccessDeniedPage() {
  return (
    <SystemState
      code="403"
      title="You don't have access to this"
      message="This page is limited to accounts with the right permissions. If you believe you should have access, ask an admin on your team or sign in with a different account."
      icons={["lock"]}
      primary={{ href: "/auth/login", label: "Sign in" }}
      secondary={{ href: "/", label: "Back to home" }}
    />
  );
}