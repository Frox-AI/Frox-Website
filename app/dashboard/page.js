"use client";

const STATS = [
  { label: "API Calls", value: "12,847", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Tokens Used", value: "2.4M", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Active Models", value: "3", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Credits Remaining", value: "$87.50", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ACTIVITIES = [
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", description: "New chat session started with Frox Assistant", time: "2 min ago" },
  { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", description: "Generated 4 images with Flux Pro model", time: "18 min ago" },
  { icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5", description: "Created 3D model from text prompt", time: "1 hr ago" },
  { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", description: "Code editor session completed — 3 files modified", time: "3 hrs ago" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", description: "API key sk_live_4f2a created successfully", time: "Yesterday" },
];

const QUICK_ACTIONS = [
  { label: "New Chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { label: "Generate Image", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Create 3D Model", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" },
  { label: "Open Code Editor", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
];

const WEEKLY_USAGE = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 91 },
  { day: "Fri", value: 64 },
  { day: "Sat", value: 28 },
  { day: "Sun", value: 52 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-10">
          <h1 className="text-4xl font-bold grad-text mb-2">Dashboard</h1>
          <p className="text-lg" style={{ color: "var(--text-dim)" }}>
            Welcome back, Alex
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--text-faint)" }}
                >
                  {stat.label}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={stat.icon} />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--text)" }}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {ACTIVITIES.map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent-2)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={activity.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: "var(--text)" }}>
                      {activity.description}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--text)" }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "var(--bg-elev)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={action.icon} />
                  </svg>
                  <span className="text-xs font-medium" style={{ color: "var(--text-dim)" }}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--text)" }}>
              Weekly Usage
            </h2>
            <div className="flex items-end gap-3 h-40">
              {WEEKLY_USAGE.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg grad-bg transition-all duration-500"
                    style={{ height: `${item.value}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
              Credit Balance
            </h2>
            <p className="text-3xl font-bold grad-text">$87.50</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>of $100 monthly credit</p>
            <div className="mt-4 h-2 rounded-full" style={{ background: "var(--bg-elev)" }}>
              <div className="h-full w-[87%] grad-bg rounded-full" />
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { label: "Chat", pct: "52%" },
                { label: "Image", pct: "31%" },
                { label: "Audio", pct: "17%" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-dim)" }}>{row.label}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Recent API Calls
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(124, 92, 255, 0.12)", color: "var(--accent)" }}>
              Live
            </span>
          </div>
          <div className="space-y-3">
            {[
              { model: "frox-flex", endpoint: "/v1/chat/completions", tokens: "1,204", time: "2 min ago", status: "200" },
              { model: "frox-image", endpoint: "/v1/generations", tokens: "—", time: "18 min ago", status: "200" },
              { model: "frox-code", endpoint: "/v1/chat/completions", tokens: "3,891", time: "1 hr ago", status: "200" },
              { model: "frox-flex", endpoint: "/v1/chat/completions", tokens: "512", time: "3 hrs ago", status: "200" },
              { model: "frox-voice", endpoint: "/v1/audio/speech", tokens: "—", time: "Yesterday", status: "200" },
            ].map((call, i) => (
              <div key={i} className="flex items-center justify-between gap-4 p-3.5 rounded-xl" style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium truncate" style={{ color: "var(--text)" }}>
                      {call.model}
                      <span className="font-normal" style={{ color: "var(--text-faint)" }}> · {call.endpoint}</span>
                    </p>
                    <p className="text-[11.5px]" style={{ color: "var(--text-faint)" }}>{call.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>{call.tokens} tok</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400">{call.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
