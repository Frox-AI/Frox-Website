"use client";

import { useState } from "react";
import Icon, { LangBadge } from "@/components/Icon";

const FILES = [
  { name: "app.js", badge: "JavaScript", active: true },
  { name: "utils.py", badge: "Python", active: false },
  { name: "config.json", icon: "braces", active: false },
  { name: "api.ts", badge: "TypeScript", active: false },
  { name: "main.go", badge: "Go", active: false },
  { name: "README.md", icon: "fileText", active: false },
];

const CODE_LINES = [
  [
    { text: "import", color: "text-purple-400" },
    { text: " { useState } ", color: "text-gray-300" },
    { text: "from", color: "text-purple-400" },
    { text: " 'react'", color: "text-green-400" },
    { text: ";", color: "text-gray-400" },
  ],
  [],
  [
    { text: "export default function", color: "text-purple-400" },
    { text: " ", color: "text-gray-300" },
    { text: "Counter", color: "text-yellow-300" },
    { text: "() {", color: "text-gray-300" },
  ],
  [
    { text: "  const", color: "text-purple-400" },
    { text: " [count, setCount] = ", color: "text-gray-300" },
    { text: "useState", color: "text-blue-400" },
    { text: "(", color: "text-gray-300" },
    { text: "0", color: "text-orange-400" },
    { text: ");", color: "text-gray-300" },
  ],
  [],
  [
    { text: "  const", color: "text-purple-400" },
    { text: " increment = ", color: "text-gray-300" },
    { text: "()", color: "text-blue-400" },
    { text: " ", color: "text-gray-300" },
    { text: "=>", color: "text-purple-400" },
    { text: " setCount(", color: "text-gray-300" },
    { text: "c", color: "text-blue-400" },
    { text: " ", color: "text-gray-300" },
    { text: "=>", color: "text-purple-400" },
    { text: " c + ", color: "text-gray-300" },
    { text: "1", color: "text-orange-400" },
    { text: ");", color: "text-gray-300" },
  ],
  [],
  [
    { text: "  return", color: "text-purple-400" },
    { text: " (", color: "text-gray-300" },
  ],
  [
    { text: "    <", color: "text-gray-400" },
    { text: "button", color: "text-red-400" },
    { text: " ", color: "text-gray-300" },
    { text: "onClick", color: "text-blue-300" },
    { text: "={increment}>", color: "text-gray-300" },
  ],
  [
    { text: "      Count: {count}", color: "text-gray-200" },
  ],
  [
    { text: "    </", color: "text-gray-400" },
    { text: "button", color: "text-red-400" },
    { text: ">", color: "text-gray-300" },
  ],
  [
    { text: "  );", color: "text-gray-300" },
  ],
  [
    { text: "}", color: "text-gray-300" },
  ],
];

const TABS = [
  {
    id: "explain",
    label: "Explain Code",
    icon: "lightbulb",
    prompt: "Explain what this code does",
    response:
      "This React component renders a button that tracks a count. It uses the useState hook to store the count value, and the increment function updates it by calling setCount with the previous value plus one.",
  },
  {
    id: "debug",
    label: "Debug",
    icon: "terminal",
    prompt: "Find bugs in this code",
    response:
      "No critical bugs found. One suggestion: consider adding a maximum limit or disabling the button after a threshold to prevent performance issues with very large numbers.",
  },
  {
    id: "review",
    label: "Review",
    icon: "search",
    prompt: "Review this code for issues",
    response:
      "Code looks clean and follows React best practices. Minor suggestions: extract the increment logic into a named function for reusability, and consider adding PropTypes or TypeScript types for better maintainability.",
  },
  {
    id: "refactor",
    label: "Refactor",
    icon: "refresh",
    prompt: "Refactor this code",
    response:
      "Refactored version uses useCallback to memoize the increment function and extracts the button into a separate component for better separation of concerns and reusability across your app.",
  },
  {
    id: "tests",
    label: "Generate Tests",
    icon: "flask",
    prompt: "Generate unit tests",
    response:
      "Generated 4 test cases: initial render shows count of 0, clicking increments by 1, multiple clicks accumulate correctly, and the button remains accessible with proper aria-labels.",
  },
  {
    id: "docs",
    label: "Generate Docs",
    icon: "book",
    prompt: "Generate documentation",
    response:
      "Generated JSDoc documentation with parameter descriptions, return type annotations, and usage examples. Also created a README section explaining the Counter component's API and integration guidelines.",
  },
];

const LANGUAGES = [
  { name: "Python", desc: "Data science, ML, automation & web backends" },
  { name: "JavaScript", desc: "Web frontends, Node.js servers & full-stack apps" },
  { name: "TypeScript", desc: "Type-safe JavaScript for scalable applications" },
  { name: "Rust", desc: "Memory-safe systems programming & performance" },
  { name: "Go", desc: "Concurrent services, CLIs & cloud infrastructure" },
  { name: "Java", desc: "Enterprise apps, Android & large-scale systems" },
  { name: "C++", desc: "Game engines, embedded & high-performance code" },
  { name: "Swift", desc: "iOS, macOS & server-side Swift development" },
];

const STATS = [
  { value: "50K+", label: "Developers" },
  { value: "40+", label: "Languages Supported" },
  { value: "95%", label: "Bug Detection Rate" },
];

export default function CodePage() {
  const [activeFile, setActiveFile] = useState("app.js");
  const [activeTab, setActiveTab] = useState("explain");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Frox Code. Ask me anything about your code — explain, debug, review, refactor, or generate tests and docs." },
  ]);

  const currentTab = TABS.find((t) => t.id === activeTab);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "ai", text: currentTab.response },
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bgCard text-sm text-textDim mb-6">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse" />
            Powered by Frox AI
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="grad-text">AI Coding Assistant</span>
          </h1>
          <p className="text-lg text-textDim max-w-2xl mx-auto">
            Write, debug, review, and refactor code with Frox Code
          </p>
        </div>

        {/* Code Editor Interface */}
        <div className="card rounded-2xl overflow-hidden border border-border mb-20 glow">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-bgCard border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-textFaint">frox-workspace — {activeFile}</span>
            <div className="flex items-center gap-2 text-xs text-textFaint">
              <span className="px-2 py-0.5 rounded bg-bgCard border border-border">UTF-8</span>
              <span className="px-2 py-0.5 rounded bg-bgCard border border-border">JavaScript</span>
            </div>
          </div>

          <div className="flex" style={{ minHeight: "480px" }}>
            {/* File Explorer Sidebar */}
            <div className="w-56 bg-bgCard border-r border-border p-3 hidden md:block">
              <p className="text-xs font-semibold text-textFaint uppercase tracking-wider mb-3 px-2">
                Explorer
              </p>
              <div className="space-y-1">
                {FILES.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      activeFile === file.name
                        ? "bg-bgCard text-text border border-border"
                        : "text-textDim hover:bg-bgCard hover:text-text border border-transparent"
                    }`}
                  >
                    {file.badge ? <LangBadge lang={file.badge} size="sm" /> : <Icon name={file.icon} size={14} className="text-textFaint" />}
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 px-2">
                <p className="text-xs text-textFaint mb-2">Frox AI</p>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Assistant ready
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col bg-bg">
              <div className="flex-1 overflow-auto p-4">
                <pre className="text-sm font-mono leading-6">
                  {CODE_LINES.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-textFaint select-none text-xs leading-6">
                        {i + 1}
                      </span>
                      <code>
                        {line.map((token, j) => (
                          <span key={j} className={token.color}>
                            {token.text}
                          </span>
                        ))}
                      </code>
                    </div>
                  ))}
                </pre>
              </div>

              {/* AI Chat Panel */}
              <div className="border-t border-border bg-bgCard">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-borderSoft">
                  <span className="text-accent"><Icon name="sparkles" size={14} /></span>
                  <span className="text-sm font-medium text-text">Frox Code Chat</span>
                  <span className="text-xs text-textFaint ml-auto">Ask anything about your code</span>
                </div>
                <div className="max-h-40 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                          msg.role === "user"
                            ? "bg-accent text-white"
                            : "bg-bgCard border border-border text-textDim"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-3 border-t border-borderSoft">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask Frox about your code..."
                    className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-textFaint focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={handleSend}
                    className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="grad-text">Everything You Need</span>
          </h2>
          <p className="text-textDim text-center mb-10 max-w-xl mx-auto">
            From understanding legacy code to writing production-ready tests — Frox Code has you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-accent text-white glow"
                    : "bg-bgCard border border-border text-textDim hover:text-text hover:border-accent"
                }`}
              >
                <span className="text-textFaint"><Icon name={tab.icon} size={16} /></span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="card rounded-2xl border border-border p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 grid place-items-center text-accent shrink-0">
                <Icon name={currentTab.icon} size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-1">{currentTab.label}</h3>
                <p className="text-sm text-textDim mb-3">
                  <span className="text-textFaint">Prompt: </span>
                  <span className="text-accent2">{currentTab.prompt}</span>
                </p>
                <p className="text-sm text-textDim leading-relaxed">{currentTab.response}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Support */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="grad-text">40+ Languages Supported</span>
          </h2>
          <p className="text-textDim text-center mb-10 max-w-xl mx-auto">
            From mainstream to niche — Frox Code understands your stack.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="card rounded-xl border border-border p-5 hover:border-accent transition-all group"
              >
                <div className="group-hover:scale-110 transition-transform">
                  <LangBadge lang={lang.name} />
                </div>
                <h3 className="font-semibold text-text mb-1">{lang.name}</h3>
                <p className="text-sm text-textDim">{lang.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card rounded-2xl border border-border p-10 glow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold grad-text mb-2">{stat.value}</div>
                <div className="text-textDim">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span className="grad-text">code smarter</span>?
          </h2>
          <p className="text-textDim mb-8 max-w-lg mx-auto">
            Join thousands of developers shipping better code faster with Frox Code.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary px-6 py-3 rounded-lg font-medium">
              Start Coding Free
            </button>
            <button className="btn-secondary px-6 py-3 rounded-lg font-medium">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
