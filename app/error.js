"use client";

import SystemState from "@/components/SystemState";

export default function Error({ error, reset }) {
  return (
    <SystemState
      code="500"
      title="Something broke on our side"
      message="This isn't your fault. The error has been logged and the team is already looking at it. Try again in a moment."
      icons={["terminal", "search"]}
      secondary={{ href: "/status", label: "Check system status" }}
    >
      <div className="mt-8 flex justify-center">
        <button onClick={() => reset()} className="btn-primary">
          Try again
        </button>
      </div>
    </SystemState>
  );
}
