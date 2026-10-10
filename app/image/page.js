"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

const STYLES = [
  "Photorealistic",
  "Anime",
  "Oil painting",
  "Digital art",
  "3D render",
  "Pixel art",
];

const RATIOS = ["1:1", "16:9", "9:16", "4:3"];

const EXAMPLES = [
  { prompt: "A misty pine forest at first light, soft volumetric fog", style: "Photorealistic" },
  { prompt: "Rain-slicked neon street, a single figure under an umbrella", style: "Cinematic" },
  { prompt: "Coral reef lit from above, clean water, high detail", style: "Photorealistic" },
  { prompt: "Flat isometric desk scene, muted palette, long shadows", style: "Digital art" },
  { prompt: "Vintage travel poster of a mountain railway", style: "Illustration" },
  { prompt: "Product shot of a ceramic mug on soft fabric, 50mm", style: "Photorealistic" },
];

const FEATURES = [
  { icon: "image", title: "Text-to-image", desc: "Turn a written prompt into a finished image in a single step." },
  { icon: "file", title: "Image-to-image", desc: "Guide a generation with a reference image you already like." },
  { icon: "pen", title: "Inpainting", desc: "Change one region and leave the rest of the frame untouched." },
  { icon: "search", title: "Upscaling", desc: "Raise resolution up to 4x while keeping fine detail intact." },
  { icon: "sparkles", title: "Style transfer", desc: "Apply a reference style across an entire set of images." },
  { icon: "refresh", title: "Batch runs", desc: "Generate variations of one prompt and compare them side by side." },
];

export default function ImagePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageHero
        eyebrow="Product"
        title="Frox Image"
        sub="Generate and edit images from text or existing references, with style presets, upscaling, and batch runs. Everything you make stays in your library."
      >
        <Link href="/auth/signup" className="btn-primary">Get started</Link>
        <Link href="/docs" className="btn-secondary">Read the API docs</Link>
      </PageHero>

      <div className="container-x pb-24 space-y-20">
        <section className="card p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              readOnly
              defaultValue="A quiet harbor at sunrise, long exposure, warm light"
              className="w-full h-28 bg-bg border border-border rounded-xl p-4 text-text placeholder-textFaint focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s, i) => (
                <span
                  key={s}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    i === 0
                      ? "border border-accent bg-accent/10 text-text"
                      : "border border-border text-textDim"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Aspect ratio</label>
            <div className="flex gap-3">
              {RATIOS.map((r, i) => (
                <span
                  key={r}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    i === 0
                      ? "border border-accent bg-accent/10 text-text"
                      : "border border-border text-textDim"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-[#7c5cff] to-[#00d4ff] grid place-items-center border border-border">
            <span className="inline-flex items-center gap-2 text-white/80 text-sm">
              <Icon name="image" size={18} /> Preview
            </span>
          </div>
          <p className="text-xs text-textFaint mt-3">Interface preview. Generation runs in the app.</p>
        </section>

        <section>
          <div className="mb-8 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight">Example prompts</h2>
            <p className="text-textDim mt-2 text-pretty">Starting points you can copy into the studio and adjust.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.map((e) => (
              <div key={e.prompt} className="card p-5">
                <span className="text-[11px] uppercase tracking-widest text-accent2">{e.style}</span>
                <p className="mt-2 text-[15px] leading-relaxed text-pretty">{e.prompt}</p>
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
          <h2 className="text-2xl font-bold tracking-tight text-balance">Bring an idea and see it rendered</h2>
          <p className="mt-3 text-textDim max-w-xl mx-auto text-pretty">
            Frox Image is part of one account and one API. Start free and keep everything you generate.
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
