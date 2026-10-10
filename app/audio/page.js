"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const voices = [
  { name: "Aria", desc: "Warm and expressive, ideal for narration" },
  { name: "Marcus", desc: "Deep and authoritative, great for trailers" },
  { name: "Luna", desc: "Soft and calming, perfect for meditation" },
  { name: "Kai", desc: "Energetic and youthful, built for ads" },
  { name: "Sage", desc: "Measured and clear, suited for education" },
  { name: "Nova", desc: "Bold and dynamic, made for gaming" },
];

const sfxCategories = ["Nature", "Urban", "Sci-Fi", "Fantasy", "Abstract"];
const musicGenres = ["Ambient", "Electronic", "Cinematic", "Lo-Fi", "Orchestral", "Rock"];

const sfxSamples = [
  { name: "Forest Rainfall", duration: "0:12", category: "Nature" },
  { name: "Neon City Streets", duration: "0:09", category: "Urban" },
  { name: "Plasma Charge", duration: "0:07", category: "Sci-Fi" },
  { name: "Crystal Cavern Echo", duration: "0:14", category: "Fantasy" },
  { name: "Glitch Texture", duration: "0:05", category: "Abstract" },
];

const waveHeights = [14, 28, 42, 22, 56, 34, 48, 18, 62, 38, 26, 52, 30, 44, 20, 58, 36, 24, 50, 16, 40, 32, 46, 22, 54, 28, 38, 18, 48, 26];

export default function AudioPage() {
  const [tab, setTab] = useState("tts");
  const [ttsText, setTtsText] = useState("");
  const [voice, setVoice] = useState("Aria");
  const [ttsGenerated, setTtsGenerated] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [sfxPrompt, setSfxPrompt] = useState("");
  const [sfxCategory, setSfxCategory] = useState("Nature");
  const [sfxGenerated, setSfxGenerated] = useState(false);
  const [sfxPlaying, setSfxPlaying] = useState(null);
  const [musicPrompt, setMusicPrompt] = useState("");
  const [musicGenre, setMusicGenre] = useState("Ambient");
  const [musicDuration, setMusicDuration] = useState(30);
  const [musicGenerated, setMusicGenerated] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [samplePlaying, setSamplePlaying] = useState(null);

  const handleTtsGenerate = () => {
    if (!ttsText.trim()) return;
    setTtsGenerated(false);
    setTimeout(() => setTtsGenerated(true), 800);
  };

  const handleSfxGenerate = () => {
    if (!sfxPrompt.trim()) return;
    setSfxGenerated(false);
    setTimeout(() => setSfxGenerated(true), 800);
  };

  const handleMusicGenerate = () => {
    if (!musicPrompt.trim()) return;
    setMusicGenerated(false);
    setTimeout(() => setMusicGenerated(true), 800);
  };

  const tabs = [
    { id: "tts", label: "Text-to-Speech" },
    { id: "sfx", label: "Sound Effects" },
    { id: "music", label: "Music" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <style jsx>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .wave-bar {
          transform-origin: center;
          animation: wave-bar 1.1s ease-in-out infinite;
        }
        .wave-paused .wave-bar {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      <PageHero
        eyebrow="Product"
        title="Frox Voice"
        sub="Generate speech, sound effects, and music, then transcribe audio back to text. Pick a built-in voice or tune one from scratch."
      >
        <Link href="/auth/signup" className="btn-primary">Get started</Link>
        <Link href="/docs" className="btn-secondary">Read the API docs</Link>
      </PageHero>

      <section className="pb-20">
        <div className="container-x">
          <div className="flex gap-2 p-1 rounded-xl mb-8 w-fit mx-auto" style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={
                  tab === t.id
                    ? { background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)", color: "#fff" }
                    : { color: "var(--text-dim)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "tts" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Script Input</h3>
                <textarea
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="w-full h-40 rounded-xl p-4 text-sm resize-none focus:outline-none"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text)" }}
                />
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-dim)" }}>Voice</label>
                  <select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none cursor-pointer"
                    style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text)" }}
                  >
                    {voices.slice(0, 4).map((v) => (
                      <option key={v.name} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleTtsGenerate} className="btn-primary w-full mt-6">
                  Generate Speech
                </button>
              </div>

              <div className="card p-6 flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                {ttsGenerated ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className={`flex items-end gap-1 h-24 mb-6 ${ttsPlaying ? "" : "wave-paused"}`}>
                      {waveHeights.map((h, i) => (
                        <div
                          key={i}
                          className="wave-bar w-1.5 rounded-full"
                          style={{
                            height: `${h}%`,
                            background: "linear-gradient(180deg, #00d4ff 0%, #7c5cff 100%)",
                            animationDelay: `${i * 0.07}s`,
                            animationDuration: `${0.9 + (i % 5) * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTtsPlaying(!ttsPlaying)}
                        className="w-14 h-14 rounded-full flex items-center justify-center glow"
                        style={{ background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)" }}
                      >
                        {ttsPlaying ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                      <div className="text-sm" style={{ color: "var(--text-dim)" }}>
                        <div className="font-medium" style={{ color: "var(--text)" }}>{voice} — Generated Speech</div>
                        <div>0:0{Math.floor(ttsText.length / 40)} / 0:{Math.max(1, Math.ceil(ttsText.length / 20))}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ color: "var(--text-faint)" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4">
                      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                    </svg>
                    <p className="text-sm">Generated audio will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "sfx" && (
            <div>
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Describe Your Sound</h3>
                <input
                  value={sfxPrompt}
                  onChange={(e) => setSfxPrompt(e.target.value)}
                  placeholder="e.g., Thunder rolling across a distant mountain range"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none mb-4"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text)" }}
                />
                <div className="flex flex-wrap gap-2 mb-5">
                  {sfxCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSfxCategory(cat)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={
                        sfxCategory === cat
                          ? { background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)", color: "#fff" }
                          : { background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text-dim)" }
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button onClick={handleSfxGenerate} className="btn-primary">
                  Generate Sound Effect
                </button>
              </div>

              {sfxGenerated && (
                <div className="space-y-3 list-in">
                  <h3 className="text-lg font-semibold">Generated Effects</h3>
                  {sfxSamples.filter((s) => s.category === sfxCategory || sfxCategory === "Abstract").map((sfx, i) => (
                    <div key={i} className="card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setSfxPlaying(sfxPlaying === i ? null : i)}
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: sfxPlaying === i ? "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)" : "var(--bg-elev)", border: "1px solid var(--border-soft)" }}
                        >
                          {sfxPlaying === i ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill={sfxPlaying === i ? "white" : "var(--text)"}><path d="M8 5v14l11-7z"/></svg>
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium">{sfx.name}</div>
                          <div className="text-xs" style={{ color: "var(--text-faint)" }}>{sfx.category} — {sfx.duration}</div>
                        </div>
                      </div>
                      <div className={`flex items-end gap-0.5 h-6 ${sfxPlaying === i ? "" : "wave-paused"}`}>
                        {Array.from({ length: 12 }).map((_, j) => (
                          <div
                            key={j}
                            className="wave-bar w-1 rounded-full"
                            style={{
                              height: `${30 + ((j * 17 + i * 13) % 70)}%`,
                              background: "var(--accent)",
                              animationDelay: `${j * 0.08}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "music" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Compose Music</h3>
                <input
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  placeholder="e.g., Uplifting cinematic orchestral with a heroic theme"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none mb-4"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text)" }}
                />
                <div className="mb-5">
                  <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-dim)" }}>Genre</label>
                  <div className="flex flex-wrap gap-2">
                    {musicGenres.map((g) => (
                      <button
                        key={g}
                        onClick={() => setMusicGenre(g)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                        style={
                          musicGenre === g
                            ? { background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)", color: "#fff" }
                            : { background: "var(--bg-elev)", border: "1px solid var(--border-soft)", color: "var(--text-dim)" }
                        }
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 flex justify-between" style={{ color: "var(--text-dim)" }}>
                    <span>Duration</span>
                    <span style={{ color: "var(--accent)" }}>{musicDuration}s</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={musicDuration}
                    onChange={(e) => setMusicDuration(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "var(--accent)" }}
                  />
                </div>
                <button onClick={handleMusicGenerate} className="btn-primary w-full">
                  Generate Music
                </button>
              </div>

              <div className="card p-6 flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Now Playing</h3>
                {musicGenerated ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div
                      className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${musicPlaying ? "spin-slow" : ""}`}
                      style={{ background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)", boxShadow: "0 0 40px rgba(124,92,255,0.3)" }}
                    >
                      <div className="w-10 h-10 rounded-full" style={{ background: "var(--bg)" }} />
                    </div>
                    <div className="text-center mb-4">
                      <div className="font-medium">{musicGenre} Composition</div>
                      <div className="text-sm" style={{ color: "var(--text-dim)" }}>{musicDuration}s — AI Generated</div>
                    </div>
                    <div className={`flex items-end gap-1 h-16 mb-6 ${musicPlaying ? "" : "wave-paused"}`}>
                      {waveHeights.slice(0, 20).map((h, i) => (
                        <div
                          key={i}
                          className="wave-bar w-1.5 rounded-full"
                          style={{
                            height: `${h}%`,
                            background: "linear-gradient(180deg, #00d4ff 0%, #7c5cff 100%)",
                            animationDelay: `${i * 0.06}s`,
                            animationDuration: `${0.8 + (i % 4) * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setMusicPlaying(!musicPlaying)}
                      className="w-14 h-14 rounded-full flex items-center justify-center glow"
                      style={{ background: "linear-gradient(135deg, #7c5cff 0%, #00d4ff 100%)" }}
                    >
                      {musicPlaying ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ color: "var(--text-faint)" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4">
                      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                    </svg>
                    <p className="text-sm">Your generated track will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Voice Library</h2>
            <p className="text-textDim mt-2 text-pretty">Choose from a set of built-in voices, or clone one from a sample</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {voices.map((v, i) => (
              <div key={v.name} className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? "#7c5cff" : "#00d4ff"} 0%, ${i % 2 === 0 ? "#00d4ff" : "#7c5cff"} 100%)` }}
                  >
                    {v.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>Built-in voice</div>
                  </div>
                </div>
                <p className="text-sm mb-5" style={{ color: "var(--text-dim)" }}>{v.desc}</p>
                <button
                  onClick={() => setSamplePlaying(samplePlaying === i ? null : i)}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  {samplePlaying === i ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      Pause Sample
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      Play Sample
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
