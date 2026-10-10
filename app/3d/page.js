"use client";

import { useState } from "react";

const stylePresets = [
  { id: "realistic", label: "Realistic" },
  { id: "low-poly", label: "Low Poly" },
  { id: "stylized", label: "Stylized" },
  { id: "voxel", label: "Voxel" },
  { id: "clay-render", label: "Clay Render" },
];

const qualityOptions = [
  { id: "draft", label: "Draft" },
  { id: "standard", label: "Standard" },
  { id: "high", label: "High" },
];

const pipelineSteps = [
  {
    id: "text",
    title: "Text Prompt",
    description: "Describe your 3D object in natural language",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    id: "image",
    title: "Image Generation",
    description: "AI generates reference views of the object",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "3d",
    title: "3D Model",
    description: "Reconstruction produces a fully textured mesh",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
  },
];

const features = [
  {
    id: "image-to-3d",
    title: "Image-to-3D",
    description: "Upload a single image and get a fully realized 3D model in seconds",
  },
  {
    id: "multi-view",
    title: "Multi-View Reconstruction",
    description: "AI generates consistent multi-view images for accurate geometry",
  },
  {
    id: "texture-generation",
    title: "Texture Generation",
    description: "Automatic PBR texture maps with materials, roughness, and normals",
  },
  {
    id: "auto-rigging",
    title: "Auto-Rigging",
    description: "Characters come pre-rigged with skeletal weights, ready to animate",
  },
  {
    id: "format-export",
    title: "Format Export",
    description: "Export to GLB, OBJ, FBX, and more for any 3D pipeline or engine",
  },
  {
    id: "remesh-repair",
    title: "Remesh & Repair",
    description: "Automatic mesh cleanup, hole filling, and topology optimization",
  },
];

const gallery = [
  { id: 1, name: "Robot", gradient: "from-violet-600 to-purple-500" },
  { id: 2, name: "Tree", gradient: "from-emerald-600 to-teal-500" },
  { id: 3, name: "Chair", gradient: "from-amber-500 to-orange-500" },
  { id: 4, name: "Car", gradient: "from-rose-500 to-pink-500" },
  { id: 5, name: "Character", gradient: "from-cyan-500 to-blue-500" },
  { id: 6, name: "Building", gradient: "from-slate-500 to-gray-500" },
];

export default function ThreeDPage() {
  const [activeTab, setActiveTab] = useState("text-to-3d");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedQuality, setSelectedQuality] = useState("standard");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold grad-text mb-4">3D Studio</h1>
          <p className="text-lg text-textDim">
            Transform text and images into 3D models with AI
          </p>
        </div>

        {/* Generation Interface */}
        <div className="card p-8 rounded-2xl mb-16">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("text-to-3d")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "text-to-3d"
                  ? "bg-accent text-white"
                  : "border border-border bg-bgCard text-textDim hover:border-accent hover:text-text"
              }`}
            >
              Text-to-3D
            </button>
            <button
              onClick={() => setActiveTab("image-to-3d")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "image-to-3d"
                  ? "bg-accent text-white"
                  : "border border-border bg-bgCard text-textDim hover:border-accent hover:text-text"
              }`}
            >
              Image-to-3D
            </button>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-text text-sm font-medium mb-2">
              {activeTab === "text-to-3d" ? "Prompt" : "Reference Image URL"}
            </label>
            {activeTab === "text-to-3d" ? (
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-bg border border-border rounded-xl p-4 text-text placeholder-[#63636f] focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Describe the 3D object you want to create..."
              />
            ) : (
              <input
                type="text"
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text placeholder-[#63636f] focus:outline-none focus:border-accent transition-colors"
                placeholder="Paste image URL or drag & drop here..."
              />
            )}
          </div>

          {/* Style Presets */}
          <div className="mb-6">
            <label className="block text-text text-sm font-medium mb-3">
              Style
            </label>
            <div className="flex flex-wrap gap-2">
              {stylePresets.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    selectedStyle === style.id
                      ? "border-accent bg-accent/10 text-text"
                      : "border-border bg-bgCard text-textDim hover:border-accent hover:text-text"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selector */}
          <div className="mb-8">
            <label className="block text-text text-sm font-medium mb-3">
              Quality
            </label>
            <div className="flex gap-3">
              {qualityOptions.map((quality) => (
                <button
                  key={quality.id}
                  onClick={() => setSelectedQuality(quality.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    selectedQuality === quality.id
                      ? "border-accent bg-accent/10 text-text"
                      : "border-border bg-bgCard text-textDim hover:border-accent hover:text-text"
                  }`}
                >
                  {quality.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button className="btn-primary w-full py-3 rounded-xl font-semibold text-white mb-8">
            Generate 3D Model
          </button>

          {/* 3D Viewport Placeholder */}
          <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-[#12121a] via-[#0a0a0f] to-[#12121a] border border-dashed border-accent/30 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/40 rotate-12" />
              <div className="absolute top-1/3 left-1/3 w-48 h-48 border border-accent2/30 rotate-6" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-accent/50" />
            </div>
            <div className="relative flex flex-col items-center gap-3">
              <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-textDim text-sm font-medium">3D Preview</p>
            </div>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-8 text-center">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {pipelineSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center text-center w-48">
                  <div className="w-16 h-16 rounded-2xl bg-bgCard border border-border flex items-center justify-center text-accent mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-text font-semibold text-sm mb-1">
                    {step.title}
                  </h3>
                  <p className="text-textDim text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:block mx-4">
                    <svg className="w-8 h-8 text-textFaint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-6">Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="card p-6 rounded-xl border border-border">
                <h3 className="text-text font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-textDim text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">
            Recent Creations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className={`aspect-square bg-gradient-to-br ${item.gradient} rounded-xl flex items-end p-4 border border-border`}
              >
                <p className="text-ink/80 text-sm font-medium drop-shadow">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
