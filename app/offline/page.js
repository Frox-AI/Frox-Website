import SystemState from "@/components/SystemState";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <SystemState
      code="You're offline"
      title="No connection"
      message="We can't reach the network right now. Check your connection and try again. Anything you had open is safe and will reload once you're back."
      icons={["globe"]}
      primary={{ href: "/", label: "Retry" }}
      secondary={{ href: "/help/troubleshooting", label: "Troubleshooting help" }}
    />
  );
}