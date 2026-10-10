"use client";

import { useState } from "react";

const TABS = ["Profile", "Security", "Notifications", "API Keys"];

const NOTIFICATIONS = [
  { id: "email_updates", label: "Email Updates", description: "Receive product updates and newsletters via email", type: "email" },
  { id: "email_security", label: "Security Alerts", description: "Get notified about sign-ins from new devices", type: "email" },
  { id: "push_chat", label: "Chat Responses", description: "Push notifications when Frox finishes a response", type: "push" },
  { id: "push_mentions", label: "Mentions", description: "Push notifications when you are mentioned", type: "push" },
  { id: "push_weekly", label: "Weekly Digest", description: "Weekly summary of your usage and activity", type: "push" },
];

const MOCK_API_KEYS = [
  { id: 1, name: "Production Key", key: "sk_live_4f2a••••••••••••••••", created: "Aug 12, 2026", lastUsed: "2 min ago" },
  { id: 2, name: "Development Key", key: "sk_test_9b7c••••••••••••••••", created: "Sep 3, 2026", lastUsed: "3 days ago" },
];

const MOCK_SESSIONS = [
  { id: 1, device: "MacBook Pro — Chrome", location: "San Francisco, CA", current: true },
  { id: 2, device: "iPhone 15 — Safari", location: "San Francisco, CA", current: false },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors duration-200"
      style={{ background: enabled ? "var(--accent)" : "var(--bg-elev)", border: "1px solid var(--border)" }}
    >
      <span
        className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200"
        style={{ width: "18px", height: "18px", transform: enabled ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [notifications, setNotifications] = useState({
    email_updates: true,
    email_security: true,
    push_chat: true,
    push_mentions: false,
    push_weekly: false,
  });
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold grad-text mb-2">Settings</h1>
          <p className="text-lg" style={{ color: "var(--text-dim)" }}>
            Manage your account preferences
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)" : "var(--bg-elev)",
                color: activeTab === tab ? "#fff" : "var(--text-dim)",
                border: activeTab === tab ? "none" : "1px solid var(--border)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Profile" && (
          <div className="card p-8 max-w-2xl">
            <div className="flex items-center gap-5 mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white grad-bg glow"
              >
                A
              </div>
              <div>
                <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>Alex Johnson</h2>
                <p className="text-sm" style={{ color: "var(--text-faint)" }}>Member since January 2026</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>Name</label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>Email</label>
                <input
                  type="email"
                  defaultValue="alex@frox.ai"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Full-stack developer exploring the frontiers of AI."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6 max-w-2xl">
            <div className="card p-8">
              <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--text)" }}>Change Password</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-dim)" }}>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <button className="btn-primary">Update Password</button>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>Two-Factor Authentication</h2>
                  <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>Add an extra layer of security to your account</p>
                </div>
                <Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} />
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--text)" }}>Active Sessions</h2>
              <div className="space-y-4">
                {MOCK_SESSIONS.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{session.device}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{session.location}</p>
                    </div>
                    {session.current ? (
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(124, 92, 255, 0.15)", color: "var(--accent)" }}>
                        Current
                      </span>
                    ) : (
                      <button className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "var(--bg-card)", color: "var(--text-faint)", border: "1px solid var(--border)" }}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="card p-8 max-w-2xl">
            <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--text)" }}>Notification Preferences</h2>
            <div className="space-y-5">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border-soft)" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{notif.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{notif.description}</p>
                  </div>
                  <span className="text-xs font-medium mr-3 uppercase" style={{ color: "var(--text-faint)" }}>{notif.type}</span>
                  <Toggle
                    enabled={notifications[notif.id]}
                    onChange={() => setNotifications((prev) => ({ ...prev, [notif.id]: !prev[notif.id] }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "API Keys" && (
          <div className="space-y-6 max-w-2xl">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>Your API Keys</h2>
                <button className="btn-primary text-sm py-2 px-4">Create New Key</button>
              </div>
              <div className="space-y-4">
                {MOCK_API_KEYS.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{apiKey.name}</p>
                      <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-faint)" }}>{apiKey.key}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
                        Created {apiKey.created} · Last used {apiKey.lastUsed}
                      </p>
                    </div>
                    <button
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/15 transition-colors"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
