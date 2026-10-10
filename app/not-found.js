import Link from "next/link";
import SystemState from "@/components/SystemState";

export default function NotFound() {
  return (
    <SystemState
      code="404"
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      icons={["search"]}
      primary={{ href: "/", label: "Back to home" }}
      secondary={{ href: "/contact", label: "Contact support" }}
    />
  );
}
