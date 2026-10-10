"use client";
import { useEffect, useRef, useState } from "react";
import Markdown from "@/components/Markdown";
import ThemeToggle from "@/components/ThemeToggle";
import Icon from "@/components/Icon";

const SUGGESTIONS = [
  { icon: "lightbulb", label: "Explain a concept", prompt: "Explain how attention works in transformers, with a simple analogy." },
  { icon: "code", label: "Write code", prompt: "Write a Python function to reverse a linked list, with tests." },
  { icon: "pen", label: "Draft something", prompt: "Draft a crisp product announcement for an AI model release." },
  { icon: "search", label: "Analyze", prompt: "Analyze the tradeoffs between fine-tuning and RAG for domain-specific chatbots." },
];

const MODELS = [
  { id: "frox-flex", name: "Frox Flex", desc: "Frontier reasoning · 256K context" },
  { id: "frox-code", name: "Frox Code", desc: "Code specialist · 128K context" },
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function Avatar({ kind, size = "md" }) {
  const cls = size === "md" ? "w-8 h-8 text-[12px]" : "w-7 h-7 text-[11px]";
  if (kind === "assistant")
    return (
      <span className={`${cls} shrink-0 rounded-lg grad-bg grid place-items-center font-bold text-white ring-1 ring-ink/10`}>F</span>
    );
  return (
    <span className={`${cls} shrink-0 rounded-lg bg-ink/[0.07] border border-ink/[0.08] grid place-items-center`}>
      <svg className="w-4 h-4 text-textDim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
      </svg>
    </span>
  );
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="w-7 h-7 grid place-items-center rounded-md text-textFaint hover:text-text hover:bg-ink/[0.06] transition-colors"
      aria-label="Copy"
    >
      {done ? (
        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      )}
    </button>
  );
}

function Message({ m, streaming }) {
  const isUser = m.role === "user";
  return (
    <div className="group py-5 border-b border-ink/[0.05] last:border-0">
      <div className="container-x max-w-3xl flex gap-4">
        <Avatar kind={isUser ? "user" : "assistant"} />
        <div className={`flex-1 min-w-0 ${isUser ? "pt-1" : ""}`}>
          {isUser ? (
            <div className="text-[15.5px] text-text leading-relaxed text-pretty whitespace-pre-wrap">{m.content}</div>
          ) : (
            <>
              <div className="chat-bubble">
                {streaming && !m.content ? (
                  <span className="flex items-center h-6"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></span>
                ) : (
                  <Markdown text={m.content} />
                )}
              </div>
              <div className="mt-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={m.content} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ conversations, currentId, onSelect, onNew, onDelete, mobile, onClose }) {
  return (
    <aside className={`${mobile ? "fixed inset-0 z-40 flex" : "hidden md:flex"} w-[290px] shrink-0 flex-col glass border-r border-ink/[0.07]`}>
      {mobile && <div className="absolute inset-0 bg-ink/50" onClick={onClose} />}
      <div className={`relative flex-1 flex flex-col ${mobile ? "px-0" : ""}`}>
        <button onClick={onNew} className="btn-secondary m-3 flex items-center justify-between !rounded-xl">
          <span className="flex items-center gap-2 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New chat
          </span>
        </button>
        <div className="px-3 text-[11px] uppercase tracking-widest text-textFaint mb-1">Today</div>
        <nav className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
          {conversations.length === 0 && (
            <p className="px-2 py-3 text-[13px] text-textFaint">No conversations yet.</p>
          )}
          {conversations.map((c) => (
            <div key={c.id} className={`group flex items-center rounded-lg ${c.id === currentId ? "bg-ink/[0.07]" : "hover:bg-ink/[0.04]"}`}>
              <button onClick={() => { onSelect(c.id); onClose?.(); }} className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-left min-w-0">
                <svg className="w-3.5 h-3.5 text-textFaint shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.26-.95L3 20l1.4-3.72A7.96 7.96 0 013 12c0-4.42 4.03-8 9-8s9 3.58 9 8z" /></svg>
                <span className="text-[13.5px] text-textDim truncate">{c.title}</span>
              </button>
              <button onClick={() => onDelete(c.id)} className="p-1.5 mr-1 opacity-0 group-hover:opacity-100 text-textFaint hover:text-red-400 rounded-md hover:bg-ink/[0.06] transition-all" aria-label="Delete">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.35 9m-4.78 0L9.26 9m9.97-3.21c.34.05.68.11 1.02.17m-1.02-.17l-1.17 11.05A3 3 0 0113.74 21h-3.48a3 3 0 01-2.98-2.66L6.11 5.79m14.39 0a48.1 48.1 0 00-3.48-.4m-13 0c.34-.06.68-.12 1.02-.17m0 0l1.17 11.05A3 3 0 008.74 21h3.48a3 3 0 002.98-2.66L16.5 5.63m-8.5-1.5c.5-.1.98-.15 1.5-.18.9-.06 1.82-.06 2.75.04.8.09 1.6.23 2.37.42" /></svg>
              </button>
            </div>
          ))}
        </nav>
        <div className="border-t border-ink/[0.06] p-3">
          <button className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg hover:bg-ink/[0.05] text-left">
            <span className="w-7 h-7 rounded-full grad-bg grid place-items-center text-[11px] font-bold">F</span>
            <span className="flex-1 text-[13px] text-textDim">Guest user</span>
            <svg className="w-3.5 h-3.5 text-textFaint" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(MODELS[0].id);
  const [streaming, setStreaming] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const taRef = useRef(null);
  const composerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("frox_chats");
      if (saved) setConversations(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("frox_chats", JSON.stringify(conversations)); } catch { /* ignore */ }
  }, [conversations]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [input]);

  const startNew = () => {
    if (streaming) abortStream();
    setCurrentId(null);
    setMessages([]);
  };

  const selectConv = (id) => {
    const c = conversations.find((x) => x.id === id);
    if (!c) return;
    setCurrentId(id);
    setMessages(c.messages);
  };

  const deleteConv = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentId === id) { setCurrentId(null); setMessages([]); }
  };

  const abortStream = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  };

  const send = async (overridePrompt) => {
    const prompt = (overridePrompt ?? input).trim();
    if (!prompt || streaming) return;
    setInput("");

    const userMsg = { id: uid(), role: "user", content: prompt };
    const nextMessages = [...messages, userMsg];
    const assistantId = uid();
    setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);

    const title = prompt.length > 42 ? prompt.slice(0, 42) + "…" : prompt;
    const convId = currentId || uid();
    const baseConv = { id: convId, title, messages: [] };

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], stream: true }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessages([...nextMessages, { id: assistantId, role: "assistant", content: `**Error:** ${data.error || "Request failed"}` }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            if (json.delta) acc += json.delta;
            if (json.error) acc = acc + `\n\n**Error:** ${json.error}`;
          } catch { /* partial */ }
        }
        setMessages([...nextMessages, { id: assistantId, role: "assistant", content: acc }]);
      }

      setMessages([...nextMessages, { id: assistantId, role: "assistant", content: acc }]);
      setConversations((prev) => {
        const open = typeof window !== "undefined";
        void open;
        const full = [...nextMessages, { id: assistantId, role: "assistant", content: acc }];
        const exists = prev.some((c) => c.id === convId);
        const updated = exists
          ? prev.map((c) => (c.id === convId ? { ...c, messages: full } : c))
          : [{ id: convId, title, messages: full }, ...prev];
        return updated.slice(0, 50);
      });
      setCurrentId(convId);
      composerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "**Error:** Network error — please try again." }]);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="h-dvh flex bg-bg overflow-hidden">
      <Sidebar
        conversations={conversations}
        currentId={currentId}
        onSelect={selectConv}
        onNew={startNew}
        onDelete={deleteConv}
        mobile={sideOpen}
        onClose={() => setSideOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Top bar */}
        <header className="h-[60px] shrink-0 flex items-center justify-between px-4 border-b border-ink/[0.06] bg-ink/[0.02] backdrop-blur">
          <div className="flex items-center gap-2">
            <button onClick={() => setSideOpen(true)} className="md:hidden w-9 h-9 grid place-items-center rounded-lg hover:bg-ink/[0.06] text-textDim" aria-label="Menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" /></svg>
            </button>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="" className="w-7 h-7 rounded-lg ring-1 ring-ink/10" />
              <div className="leading-tight">
                <p className="text-[14px] font-semibold tracking-tight">Frox</p>
                <p className="text-[11px] text-textFaint">Frontier AI, open weights</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            {/* Model selector */}
            <div className="relative">
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-ink/[0.08] bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors text-sm"
            >
              <span className="w-2 h-2 rounded-full grad-bg" />
              <span className="font-medium">{MODELS.find((m) => m.id === model)?.name}</span>
              <svg className={`w-3.5 h-3.5 text-textFaint transition-transform ${modelOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </button>
            {modelOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 z-20 glass border border-ink/10 rounded-xl p-1.5 shadow-card animate-fade-up">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setModel(m.id); setModelOpen(false); }}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left ${m.id === model ? "bg-ink/[0.07]" : "hover:bg-ink/[0.05]"}`}
                  >
                    <span className="w-7 h-7 rounded-lg grad-bg grid place-items-center text-[11px] font-bold shrink-0 mt-0.5">{m.name.split(" ")[1][0]}</span>
                    <span>
                      <span className="block text-sm font-medium">{m.name}</span>
                      <span className="block text-[12px] text-textFaint">{m.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 pt-8">
              <div className="w-12 h-12 rounded-2xl grad-bg grid place-items-center text-lg font-bold mb-4 shadow-glow">F</div>
              <h1 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold tracking-tight text-balance text-center">
                What can I help you<span className="font-display italic font-normal grad-text"> build</span> today?
              </h1>
              <div className="grid sm:grid-cols-2 gap-3 max-w-xl w-full mt-9">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.prompt)}
                    className="card group !bg-ink/[0.02] p-4 text-left hover:!border-ink/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-ink/[0.05] border border-ink/[0.08] grid place-items-center text-accent">
                      <Icon name={s.icon} size={16} />
                    </div>
                    <span className="block mt-3 text-sm font-medium text-text">{s.label}</span>
                    <span className="block mt-1 text-[12.5px] text-textFaint line-clamp-2">{s.prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((m) => (
                <Message key={m.id} m={m} streaming={streaming && m.id === messages[messages.length - 1]?.id && m.role === "assistant"} />
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <div ref={composerRef} className="shrink-0 px-4 pb-4 pt-1 bg-gradient-to-t from-bg via-bg/95 to-transparent">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] focus-within:border-accent/50 transition-colors shadow-card overflow-hidden">
              <textarea
                ref={taRef}
                rows={1}
                value={input}
                disabled={streaming}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Message Frox…"
                className="w-full resize-none bg-transparent text-[15px] text-text placeholder:text-textFaint outline-none px-4 pt-3.5 disabled:opacity-60"
                style={{ lineHeight: 1.5 }}
              />
              <div className="flex items-center justify-between px-2.5 pb-2.5">
                <span className="flex items-center gap-1 text-[11px] text-textFaint pl-2">
                  {streaming ? (
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-accent border-t-transparent animate-spin" />Generating…</span>
                  ) : (
                    <span>Enter to send · Shift+Enter for newline</span>
                  )}
                </span>
                <div className="flex items-center gap-1.5">
                  {streaming && (
                    <button onClick={abortStream} className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-ink/10 text-sm text-textDim hover:bg-ink/[0.06]">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-[2px]" /> Stop
                    </button>
                  )}
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || streaming}
                    className="w-9 h-9 rounded-xl grad-bg grid place-items-center text-white disabled:opacity-25 disabled:cursor-not-allowed transition-opacity shadow-glow"
                    aria-label="Send"
                  >
                    <svg className="w-4.5 h-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-[11px] text-textFaint mt-2.5">Frox can make mistakes. Check important outputs.</p>
          </div>
        </div>
      </main>
    </div>
  );
}