"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import ThemeToggle from "@/components/ThemeToggle";
import Onboarding from "@/components/Onboarding";
import ChatSettings from "@/components/ChatSettings";
import Icon from "@/components/Icon";

const MODELS = [
  { id: "frox-flex", name: "Frox Flex", desc: "Frontier reasoning · 256K context", badge: "F" },
  { id: "frox-code", name: "Frox Code", desc: "Code specialist · 128K context", badge: "C" },
  { id: "frox-image", name: "Frox Image", desc: "Image generation & editing", badge: "I" },
];

const NAV_ITEMS = [
  { label: "Images", icon: "image", href: "/chat?mode=images" },
  { label: "Library", icon: "book", href: "/templates" },
  { label: "Forge", icon: "forge", href: "/forge" },
  { label: "Explore", icon: "compass", href: "/templates" },
];

const STARTERS = [
  { icon: "image", label: "Create an image", prompt: "Create an image of a quiet coastal town at dawn, cinematic lighting." },
  { icon: "pen", label: "Write or edit", prompt: "Write a short, warm product announcement for our new AI model launch." },
  { icon: "globe", label: "Search the web", prompt: "Search the web for the latest on efficient long-context inference and summarize it." },
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function dayLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((startOf(now) - startOf(d)) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return "Previous 7 days";
  return "Older";
}

function timeLabel(ts) {
  const d = new Date(ts);
  if (d.toDateString() === new Date().toDateString())
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

const GROUP_ORDER = ["Today", "Yesterday", "Previous 7 days", "Older"];

function Avatar({ kind }) {
  if (kind === "assistant")
    return (
      <span className="w-7 h-7 shrink-0 rounded-lg grad-bg grid place-items-center text-[11px] font-bold text-white">F</span>
    );
  return (
    <span className="w-7 h-7 shrink-0 rounded-full grad-bg grid place-items-center text-[10px] font-bold text-white">
      GU
    </span>
  );
}

function ActionBtn({ label, onClick, active, children }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`w-7 h-7 grid place-items-center rounded-md transition-colors ${active ? "text-accent" : "text-textFaint hover:text-text hover:bg-ink/[0.06]"}`}
    >
      {children}
    </button>
  );
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  return (
    <ActionBtn
      label={done ? "Copied" : "Copy"}
      active={done}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? (
        <Icon name="check" size={14} className="text-emerald-500" />
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      )}
    </ActionBtn>
  );
}

function Message({ m, streaming, onRegenerate }) {
  const [feedback, setFeedback] = useState(null);
  const isUser = m.role === "user";
  const hasContent = m.content.trim().length > 0;

  if (isUser) {
    return (
      <div className="group py-4 msg-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-3">
          <Avatar kind="user" />
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="text-[15px] text-text leading-relaxed whitespace-pre-wrap break-words">{m.content}</div>
            <div className="mt-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={m.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group py-4 msg-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-3">
        <Avatar kind="assistant" />
        <div className="flex-1 min-w-0">
          <div className={m.error ? "text-[14px] text-red-400" : "chat-bubble"}>
            {streaming && !hasContent ? (
              <span className="flex items-center h-6"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></span>
            ) : (
              <>
                <Markdown text={m.content} />
                {streaming && <span className="caret" />}
              </>
            )}
          </div>
          {!streaming && hasContent && (
            <div className="mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={m.content} />
              <ActionBtn label="Good response" active={feedback === "up"} onClick={() => setFeedback(feedback === "up" ? null : "up")}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M7 10v11M7 10l4.5-7a2 2 0 0 1 3.7 1.3l-.6 3.7h5.9a2 2 0 0 1 2 2.4l-1.4 6.6a2 2 0 0 1-2 1.6H7" /></svg>
              </ActionBtn>
              <ActionBtn label="Bad response" active={feedback === "down"} onClick={() => setFeedback(feedback === "down" ? null : "down")}>
                <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M7 10v11M7 10l4.5-7a2 2 0 0 1 3.7 1.3l-.6 3.7h5.9a2 2 0 0 1 2 2.4l-1.4 6.6a2 2 0 0 1-2 1.6H7" /></svg>
              </ActionBtn>
              <ActionBtn label="Regenerate" onClick={onRegenerate}>
                <Icon name="refresh" size={14} />
              </ActionBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserMenu({ onSettings, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full left-0 mb-2 w-[260px] glass border border-ink/10 rounded-xl shadow-card overflow-hidden z-50 animate-fade-up" style={{ animationDuration: ".18s" }}>
        <div className="p-2">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
            <Avatar kind="user" />
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-text truncate">Guest user</p>
              <p className="text-[11.5px] text-textFaint">Free</p>
            </div>
            <Icon name="chevronRight" size={14} className="ml-auto text-textFaint shrink-0" />
          </div>
          <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="sparkles" size={15} /> Try Plus free
          </Link>
          <Link href="/settings" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="users" size={15} /> Personalization
          </Link>
          <Link href="/settings" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="users" size={15} /> Profile
          </Link>
          <button onClick={onSettings} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="sliders" size={15} /> Settings
          </button>
        </div>
        <div className="border-t border-ink/[0.07] p-2">
          <Link href="/faq" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="help" size={15} /> Help <Icon name="chevronRight" size={14} className="ml-auto text-textFaint" />
          </Link>
          <Link href="/auth/login" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-textDim hover:text-text hover:bg-ink/[0.05] transition-colors">
            <Icon name="logout" size={15} /> Log out
          </Link>
        </div>
      </div>
    </>
  );
}

function ConvItem({ t, active, onSelect, onDelete, onMobile }) {
  return (
    <div className={`group flex items-center rounded-lg transition-colors ${active ? "bg-ink/[0.07]" : "hover:bg-ink/[0.04]"}`}>
      <button onClick={() => { onSelect(t.id); onMobile?.(); }} className="flex-1 flex items-center gap-2 px-3 py-2 text-left min-w-0">
        <span className="text-[13px] text-textDim truncate flex-1">{t.title}</span>
        <span className="text-[11px] text-textFaint shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">{timeLabel(t.updatedAt || Date.now())}</span>
      </button>
      <button onClick={() => onDelete(t.id)} className="p-1.5 mr-1 opacity-0 group-hover:opacity-100 text-textFaint hover:text-red-400 rounded-md hover:bg-ink/[0.06] transition-all" aria-label="Delete">
        <Icon name="trash" size={14} />
      </button>
    </div>
  );
}

function Sidebar({ threads, currentId, onSelect, onNew, onDelete, mobile, onClose, query, setQuery, onSettings, collapsed, onCollapse, projects }) {
  const groups = useMemo(() => {
    const map = new Map();
    for (const t of threads) {
      const g = dayLabel(t.updatedAt || Date.now());
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(t);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ label: g, items: map.get(g) }));
  }, [threads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return threads.filter((t) => t.title.toLowerCase().includes(q));
  }, [threads, query]);

  if (collapsed && !mobile) return null;

  return (
    <aside className={`${mobile ? "fixed inset-0 z-40 flex" : "hidden md:flex"} w-[260px] shrink-0 flex-col bg-bgElev border-r border-ink/[0.06] ${mobile ? "sidebar-in" : ""}`}>
      {mobile && <div className="absolute inset-0 bg-ink/50" onClick={onClose} />}
      <div className="relative flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-1 px-3 pt-3 pb-1">
          <span className="w-6 h-6 rounded-lg grad-bg grid place-items-center text-white text-[10px] font-bold shrink-0">F</span>
          <span className="text-[15px] font-semibold tracking-tight text-text">Frox</span>
          <button onClick={onCollapse} className="ml-auto w-8 h-8 grid place-items-center rounded-lg text-textFaint hover:text-text hover:bg-ink/[0.06] transition-colors" aria-label="Collapse sidebar" title="Collapse sidebar">
            <Icon name="grid" size={15} />
          </button>
        </div>

        <div className="px-3 py-1 space-y-0.5">
          <button onClick={onNew} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-ink/[0.06] text-[14px] font-medium text-text transition-colors">
            <Icon name="edit" size={15} /> New chat
          </button>
          {NAV_ITEMS.map((n) => (
            <Link key={n.label} href={n.href} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-ink/[0.06] text-[14px] text-textDim transition-colors">
              <Icon name={n.icon} size={15} /> {n.label}
            </Link>
          ))}
        </div>

        <div className="px-3 pt-3">
          <p className="text-[11px] uppercase tracking-wide text-textFaint px-3 mb-1">Projects</p>
          {projects.length === 0 ? (
            <p className="px-3 py-1 text-[12.5px] text-textFaint">No projects</p>
          ) : (
            projects.map((p) => (
              <button key={p.id} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-ink/[0.06] text-[14px] text-textDim transition-colors">
                <Icon name="folder" size={15} /> <span className="truncate">{p.name}</span>
              </button>
            ))
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2 min-h-0">
          <div className="relative mb-1">
            <Icon name="search" size={14} className="text-textFaint absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              className="w-full bg-transparent pl-8 pr-3 py-2 text-[13px] text-text placeholder:text-textFaint outline-none"
            />
          </div>

          {filtered ? (
            filtered.length === 0 ? (
              <p className="px-3 py-2 text-[12.5px] text-textFaint">No results.</p>
            ) : (
              filtered.map((t) => (
                <ConvItem key={t.id} t={t} active={t.id === currentId} onSelect={onSelect} onDelete={onDelete} onMobile={onClose} />
              ))
            )
          ) : threads.length === 0 ? (
            <p className="px-3 py-2 text-[12.5px] text-textFaint">No conversations yet.</p>
          ) : (
            groups.map((g) => (
              <div key={g.label} className="mb-2">
                <p className="px-3 py-1 text-[11px] uppercase tracking-wide text-textFaint">{g.label}</p>
                {g.items.map((t) => (
                  <ConvItem key={t.id} t={t} active={t.id === currentId} onSelect={onSelect} onDelete={onDelete} onMobile={onClose} />
                ))}
              </div>
            ))
          )}
        </div>

        <UserMenuWrap onSettings={onSettings} />
      </div>
    </aside>
  );
}

function UserMenuWrap({ onSettings }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-ink/[0.06] p-2 relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-ink/[0.06] transition-colors"
      >
        <Avatar kind="user" />
        <span className="flex-1 text-left min-w-0">
          <span className="block text-[13px] font-medium text-text truncate">Guest user</span>
          <span className="block text-[11px] text-textFaint">Free</span>
        </span>
      </button>
      {open && <UserMenu onSettings={() => { setOpen(false); onSettings(); }} onClose={() => setOpen(false)} />}
    </div>
  );
}

function ModelPicker({ model, setModel, open, setOpen, align = "center" }) {
  const modelObj = MODELS.find((m) => m.id === model) || MODELS[0];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[14px] font-semibold hover:bg-ink/[0.06] transition-colors"
      >
        {modelObj.name}
        <Icon name="chevronRight" size={13} className={`text-textFaint transition-transform ${open ? "rotate-90" : "-rotate-90"}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className={`absolute top-full mt-1.5 w-64 z-20 glass border border-ink/10 rounded-xl p-1 shadow-card animate-fade-up ${align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"}`} style={{ animationDuration: ".18s" }}>
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => { setModel(m.id); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[13px] transition-colors ${m.id === model ? "bg-ink/[0.07]" : "hover:bg-ink/[0.05]"}`}
              >
                <span className="w-6 h-6 rounded-md grad-bg grid place-items-center text-[10px] font-bold text-white shrink-0">{m.badge}</span>
                <span className="min-w-0">
                  <span className="block font-medium text-text">{m.name}</span>
                  <span className="block text-[11.5px] text-textFaint truncate">{m.desc}</span>
                </span>
                {m.id === model && <Icon name="check" size={14} className="text-accent ml-auto shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Composer({ input, setInput, onSend, streaming, onStop, think, setThink, taRef }) {
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 240) + "px";
  }, [input]);

  return (
    <div className="rounded-[26px] border border-ink/[0.12] bg-bgElev focus-within:border-ink/[0.22] transition-colors shadow-[0_2px_12px_-2px_rgb(0_0_0/0.08)]">
      <textarea
        ref={taRef}
        rows={1}
        value={input}
        disabled={streaming}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
        }}
        placeholder="Ask Frox"
        className="w-full resize-none bg-transparent text-[16px] text-text placeholder:text-textFaint outline-none px-5 pt-4 pb-1 disabled:opacity-60"
        style={{ lineHeight: 1.55 }}
      />
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        <div className="flex items-center gap-0.5">
          <button className="w-8 h-8 grid place-items-center rounded-full text-textDim hover:bg-ink/[0.07] transition-colors" title="Add files" aria-label="Add files">
            <Icon name="plus" size={17} />
          </button>
          <button
            onClick={() => setThink(!think)}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-full text-[13px] font-medium transition-colors ${think ? "bg-ink/[0.1] text-text" : "text-textDim hover:bg-ink/[0.06]"}`}
            aria-pressed={think}
          >
            <Icon name="sparkles" size={14} /> Think
          </button>
          <button className="w-8 h-8 grid place-items-center rounded-full text-textDim hover:bg-ink/[0.07] transition-colors" title="Search the web" aria-label="Search the web">
            <Icon name="globe" size={15} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {streaming ? (
            <button onClick={onStop} className="w-8 h-8 rounded-full bg-ink text-bg grid place-items-center transition-transform hover:scale-105" aria-label="Stop generating">
              <span className="w-2.5 h-2.5 bg-current rounded-[2px]" />
            </button>
          ) : (
            <>
              <button className="w-8 h-8 grid place-items-center rounded-full text-textDim hover:bg-ink/[0.07] transition-colors" title="Dictate" aria-label="Dictate">
                <Icon name="mic" size={15} />
              </button>
              <button
                onClick={onSend}
                disabled={!input.trim()}
                className="send-btn w-8 h-8 rounded-full bg-[#10a37f] grid place-items-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Icon name="waveform" size={15} className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [threads, setThreads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(MODELS[0].id);
  const [think, setThink] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("frox_threads_v3");
      if (saved) setThreads(JSON.parse(saved));
      const savedP = localStorage.getItem("frox_projects_v1");
      if (savedP) setProjects(JSON.parse(savedP));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("frox_threads_v3", JSON.stringify(threads)); } catch { /* ignore */ }
  }, [threads]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("prompt");
    if (p) {
      setInput(p);
      window.history.replaceState(null, "", "/chat");
      setTimeout(() => taRef.current?.focus(), 50);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const saveThread = useCallback((threadId, title, full) => {
    setThreads((prev) => {
      const exists = prev.some((t) => t.id === threadId);
      const updated = exists
        ? prev.map((t) => (t.id === threadId ? { ...t, title, messages: full, updatedAt: Date.now() } : t))
        : [{ id: threadId, title, messages: full, updatedAt: Date.now() }, ...prev];
      return updated.slice(0, 60);
    });
    setCurrentId(threadId);
  }, []);

  const runChat = useCallback(async (threadId, title, history, assistantId) => {
    const finish = (content, isError) => {
      const full = [...history, { id: assistantId, role: "assistant", content, ...(isError ? { error: true } : {}) }];
      setMessages(full);
      saveThread(threadId, title, full);
    };

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const payloadMessages = history
        .filter((m) => !m.error)
        .map((m) => ({ role: m.role, content: m.content }));
      if (think && payloadMessages.length) {
        payloadMessages[payloadMessages.length - 1] = {
          role: payloadMessages[payloadMessages.length - 1].role,
          content: payloadMessages[payloadMessages.length - 1].content + "\n\nThink step by step before answering.",
        };
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: payloadMessages, stream: true }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        finish(`**Error:** ${data.error || "Request failed"}`, true);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            if (json.delta) acc += json.delta;
            if (json.error) acc += `\n\n**Error:** ${json.error}`;
          } catch { /* partial */ }
        }
        const finalAcc = acc;
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: finalAcc } : m)));
      }
      finish(acc);
    } catch (err) {
      if (err.name !== "AbortError") finish("**Error:** Network error — please try again.", true);
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [model, think, saveThread]);

  const send = async (overridePrompt) => {
    const prompt = (overridePrompt ?? input).trim();
    if (!prompt || streaming) return;
    setInput("");
    const userMsg = { id: uid(), role: "user", content: prompt };
    const history = [...messages, userMsg];
    const assistantId = uid();
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);
    const title = prompt.length > 42 ? prompt.slice(0, 42) + "…" : prompt;
    await runChat(currentId || uid(), title, history, assistantId);
  };

  const regenerate = () => {
    if (streaming) return;
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === "user" && !m.error);
    if (lastUserIdx === -1) return;
    const trimmed = messages.slice(0, messages.length - lastUserIdx);
    const assistantId = uid();
    setMessages([...trimmed, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);
    const current = threads.find((t) => t.id === currentId);
    runChat(currentId || uid(), current?.title || "New chat", trimmed, assistantId);
  };

  const stop = () => {
    abortRef.current?.abort();
    setStreaming(false);
  };

  const startNew = () => {
    if (streaming) stop();
    setCurrentId(null);
    setMessages([]);
    setQuery("");
    setSideOpen(false);
    setTimeout(() => taRef.current?.focus(), 50);
  };

  const selectThread = (id) => {
    const t = threads.find((x) => x.id === id);
    if (!t) return;
    if (streaming) stop();
    setCurrentId(id);
    setMessages(t.messages);
    setSideOpen(false);
  };

  const deleteThread = (id) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    if (currentId === id) { setCurrentId(null); setMessages([]); }
  };

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      const typing = tag === "TEXTAREA" || tag === "INPUT";
      if (e.key === "/" && !typing) { e.preventDefault(); taRef.current?.focus(); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); startNew(); }
      if (e.key === "Escape") { setModelOpen(false); if (typing) document.activeElement?.blur(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isEmpty = messages.length === 0;
  const composerProps = { input, setInput, onSend: () => send(), streaming, onStop: stop, think, setThink, taRef };

  return (
    <div className="h-dvh flex bg-bg overflow-hidden">
      <Onboarding />
      <ChatSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <Sidebar
        threads={threads}
        projects={projects}
        currentId={currentId}
        onSelect={selectThread}
        onNew={startNew}
        onDelete={deleteThread}
        mobile={sideOpen}
        onClose={() => setSideOpen(false)}
        query={query}
        setQuery={setQuery}
        onSettings={() => setSettingsOpen(true)}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(true)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 flex items-center justify-center px-4 relative">
          {collapsed && (
            <button onClick={() => setCollapsed(false)} className="absolute left-4 w-8 h-8 grid place-items-center rounded-lg hover:bg-ink/[0.06] text-textDim" aria-label="Open sidebar">
              <Icon name="grid" size={15} />
            </button>
          )}
          {!collapsed && (
            <button onClick={() => setSideOpen(true)} className="md:hidden absolute left-4 w-8 h-8 grid place-items-center rounded-lg hover:bg-ink/[0.06] text-textDim" aria-label="Open sidebar">
              <Icon name="grid" size={15} />
            </button>
          )}

          <ModelPicker model={model} setModel={setModel} open={modelOpen} setOpen={setModelOpen} />

          <div className="absolute right-4 flex items-center gap-1">
            <Link href="/developers" className="hidden sm:flex items-center gap-1.5 text-[12.5px] text-textFaint hover:text-text transition-colors">
              API
              <Icon name="chevronRight" size={12} />
            </Link>
            <Link href="/" className="hidden lg:flex items-center gap-1.5 text-[12.5px] text-textFaint hover:text-text transition-colors">
              Site
              <Icon name="chevronRight" size={12} />
            </Link>
            <button onClick={() => setSettingsOpen(true)} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-ink/[0.06] text-textDim transition-colors" aria-label="Settings">
              <Icon name="sliders" size={16} />
            </button>
            <ThemeToggle className="!border-transparent !bg-transparent" />
          </div>
        </header>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10 overflow-y-auto">
            <h1 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-tight text-center mb-6 rise">
              Where should we begin?
            </h1>
            <div className="w-full max-w-2xl rise" style={{ animationDelay: ".08s" }}>
              <Composer {...composerProps} />
              <p className="text-center text-[11px] text-textFaint mt-2.5">Frox can make mistakes. Check important outputs.</p>
            </div>

            <div className="w-full max-w-2xl mt-4 space-y-0.5">
              {STARTERS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => send(s.prompt)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-ink/[0.04] transition-colors text-left sug-in"
                  style={{ animationDelay: `${160 + i * 70}ms` }}
                >
                  <Icon name={s.icon} size={16} className="text-textDim shrink-0" />
                  <span className="text-[14px] text-textDim">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="py-4">
                {messages.map((m, i) => (
                  <Message
                    key={m.id}
                    m={m}
                    streaming={streaming && i === messages.length - 1 && m.role === "assistant"}
                    onRegenerate={regenerate}
                  />
                ))}
              </div>
            </div>
            <div className="shrink-0 px-4 pb-4">
              <div className="max-w-2xl mx-auto">
                <Composer {...composerProps} />
                <p className="text-center text-[11px] text-textFaint mt-2.5">Frox can make mistakes. Check important outputs.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
