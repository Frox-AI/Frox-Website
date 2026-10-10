"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#ffffff", color: "#141419", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "32rem", textAlign: "center" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#8a8a99", marginBottom: "0.5rem" }}>500</p>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 700, margin: 0 }}>Something broke on our side</h1>
            <p style={{ marginTop: "1rem", color: "#55555f", lineHeight: 1.6 }}>
              This isn&apos;t your fault. The error has been logged. Try again in a moment.
            </p>
            <button
              onClick={() => reset()}
              style={{ marginTop: "2rem", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", background: "#141419", color: "#fff", fontSize: "0.95rem", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
