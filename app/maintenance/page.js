import SystemState from "@/components/SystemState";

export const metadata = { title: "Under maintenance" };

export default function MaintenancePage() {
  return (
    <SystemState
      code="Scheduled maintenance"
      title="We'll be right back"
      message="Frox is getting a routine upgrade. Generation is paused for a few minutes and resumes automatically — nothing you've saved is affected."
      icons={["refresh", "shieldCheck"]}
      primary={{ href: "/status", label: "Follow on status" }}
      secondary={{ href: "/", label: "Back to home" }}
    />
  );
}