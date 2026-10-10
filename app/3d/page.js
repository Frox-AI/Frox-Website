"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const STYLES = [
  { id: "realistic", label: "Realistic" },
  { id: "low-poly", label: "Low Poly" },
  { id: "stylized", label: "Stylized" },
  { id: "voxel", label: "Voxel" },
];

const QUALITY_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "high", label: "High" },
  { id: "ultra", label: "Ultra" },
];

const QUALITIES = [
  { id: "draft", label: "Draft" },
  { id: "standard", label: "Standard" },
  { id: "high", label: "High" },
];

const PIPELINE = [
  { icon: "pen", title: "Describe it", desc: "Start from a prompt or a single reference image." },
  { icon: "image", label: "Views", title: "Multi-view", desc: "The model renders consistent views to lock down geometry." },
  { id: "mesh", title: "Reconstruct", desc: "Those views become one textured mesh with PBR materials." },
  { icon: "download", title: "Export", desc: "Download GLB, glTF, OBJ, or FBX for your pipeline or engine." },
];

const FEATURES = [
  { icon: "image", title: "Image-to-3D", desc: "Upload a single image and get a fully realized model back." },
  { icon: "refresh", title: "Multi-view reconstruction", desc: "Consistent views produce accurate geometry, not guesswork." },
  { icon: "sparkles", title: "Texture generation", desc: "PBR maps with materials, roughness, and normals, generated for you." },
  { icon: "cube", title: "Auto-rigging", desc: "Characters come with skeletal weights, ready to animate." },
  { icon: "download", title: "Format export", desc: "GLB, glTF, OBJ, and FBX for any pipeline or engine." },
  { icon: "checkCircle", title: "Remesh & repair", desc: "Automatic cleanup, hole filling, and topology optimization." },
];

export default function ThreeDPage() {
  const [tab, setTab] = useState("text");
  const [style, setStyle] = useState("realistic");
  const [quality, setQuality] = useState("standard");

  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Product"
        title="Frox 3D"
        sub="Turn a description or a single image into a textured mesh, then export it to the tool you already use. Materials, rigging, and cleanup are handled for you."
      >
        <Link href="/auth/signup" className="btn-primary">Get started</Link>
        <Link href="/docs" className="btn-secondary">Read the API docs</Link>
      </PageHero>

      <div className="container-x pb-24 space-y-20">
        <section className="card p-8">
          <div className="inline-flex gap-2 mb-8">
            {[
              { id: "text", label: "Text-to-3D" },
              { id: "image", label: "Image-to-3D" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-accent text-white" : "border border-border text-textDim hover:text-text"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {tab === "text" ? "Prompt" : "Reference image"}
            </label>
            {tab === "text" ? (
              <textarea
                readOnly
                defaultValue="A weathered brass desk lamp, articulated arm"
                className="w-full h-24 bg-bg border border-border rounded-xl p-4 text-text focus:outline-none resize-none"
              />
            ) : (
              <input
                readOnly
                defaultValue="/reference/lamp.png"
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text focus:outline-none"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    style === s.id ? "border-accent bg-accent/10 text-text" : "border-border text-textDim hover:text-text"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Quality</label>
            <div className="flex gap-3">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    quality === q.id ? "border-accent bg-accent/10 text-text" : "border-border text-textDim hover:text-text"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-[#12121a] via-[#0a0a0f] to-[#12121a] border border-dashed border-accent/30 grid place-items-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/40 rotate-12" />
              <div className="absolute top-1/3 left-1/3 w-48 h-48 border border-accent2/30 rotate-6" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-accent/50" />
            </div>
            <span className="relative inline-flex items-center gap-2 text-white/70 text-sm">
              <Icon name="cube" size={18} /> 3D preview
            </span>
          </div>
          <p className="text-xs text-textFaint mt-3">Interface preview. Generation runs in the app.</p>
        </section>

        <section>
          <div className="mb-8 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
            <p className="text-textDim mt-2 text-pretty">From prompt to mesh in four steps.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((step, i) => (
              <div key={step.title} className="card p-6">
                <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white mb-4">
                  <Icon name={step.icon} size={18} />
                </span>
                <p className="text-[12px] uppercase tracking-widest text-accent2 mb-1">Step {i + 1}</p>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-textDim leading-relaxed text-pretty">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight">Capabilities</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6">
                <span className="w-10 h-10 rounded-xl grad-bg grid place-items-center text-white mb-4">
                  <Icon name={f.icon} size={18} />
                </span>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-textDim leading-relaxed text-pretty">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass border border-ink/10 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-balance">Go from an idea to a mesh</h2>
          <p className="mt-3 text-textDim max-w-xl mx-auto text-pretty">
            Frox 3D is part of one account and one API. Export anything you make, royalty-free.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/auth/signup" className="btn-primary">Get started</Link>
            <Link href="/pricing" className="btn-secondary">See pricing</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
