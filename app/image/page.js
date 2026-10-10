"use client";

const styles = [
  { id: "photorealistic", label: "Photorealistic" },
  { id: "anime", label: "Anime" },
  { id: "oil-painting", label: "Oil Painting" },
  { id: "digital-art", label: "Digital Art" },
  { id: "3d-render", label: "3D Render" },
  { id: "pixel-art", label: "Pixel Art" },
];

const aspectRatios = [
  { id: "1:1", label: "1:1", width: "100%", height: "100%" },
  { id: "16:9", label: "16:9", width: "100%", height: "56.25%" },
  { id: "9:16", label: "9:16", width: "56.25%", height: "100%" },
  { id: "4:3", label: "4:3", width: "100%", height: "75%" },
];

const recentGenerations = [
  { id: 1, gradient: "from-purple-600 to-blue-500", prompt: "A mystical forest at twilight" },
  { id: 2, gradient: "from-pink-500 to-rose-400", prompt: "Cyberpunk city in the rain" },
  { id: 3, gradient: "from-emerald-500 to-teal-400", prompt: "Underwater coral kingdom" },
  { id: 4, gradient: "from-orange-500 to-amber-400", prompt: "Desert oasis at sunset" },
  { id: 5, gradient: "from-indigo-600 to-violet-500", prompt: "Futuristic space station" },
  { id: 6, gradient: "from-cyan-500 to-blue-400", prompt: "Frozen arctic landscape" },
];

const features = [
  { id: "text-to-image", title: "Text-to-Image", description: "Turn a text prompt into an image in one step" },
  { id: "image-to-image", title: "Image-to-Image", description: "Upload reference images to guide the generation process" },
  { id: "inpainting", title: "Inpainting", description: "Edit specific regions of an image while preserving the rest" },
  { id: "upscaling", title: "Upscaling", description: "Increase image resolution up to 4x while keeping detail" },
  { id: "style-transfer", title: "Style Transfer", description: "Apply artistic styles like Van Gogh or Picasso to any image" },
  { id: "batch-generation", title: "Batch Generation", description: "Generate multiple variations simultaneously for faster workflows" },
];

export default function ImagePage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold grad-text mb-4">Image Studio</h1>
          <p className="text-lg text-textDim">
            Generate images from text descriptions with the Frox Image model
          </p>
        </div>

        {/* Generation Interface */}
        <div className="card p-8 rounded-2xl mb-16">
          <div className="mb-6">
            <label className="block text-text text-sm font-medium mb-2">
              Prompt
            </label>
            <textarea
              className="w-full h-32 bg-bg border border-border rounded-xl p-4 text-text placeholder-[#63636f] focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Describe the image you want to generate..."
            />
          </div>

          {/* Style Presets */}
          <div className="mb-6">
            <label className="block text-text text-sm font-medium mb-3">
              Style
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  className="px-4 py-2 rounded-lg border border-border bg-bgCard text-textDim text-sm hover:border-accent hover:text-text transition-all"
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="mb-8">
            <label className="block text-text text-sm font-medium mb-3">
              Aspect Ratio
            </label>
            <div className="flex gap-3">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio.id}
                  className="px-4 py-2 rounded-lg border border-border bg-bgCard text-textDim text-sm hover:border-accent hover:text-text transition-all"
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button className="btn-primary w-full py-3 rounded-xl font-semibold text-white">
            Generate Image
          </button>

          {/* Mock Generated Image Area */}
          <div className="mt-8">
            <div className="aspect-square w-full max-w-lg mx-auto bg-gradient-to-br from-[#7c5cff] to-[#00d4ff] rounded-2xl flex items-center justify-center border border-border">
              <p className="text-ink/60 text-sm text-center px-8">
                Generated images will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Recent Generations Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text mb-6">Recent Generations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentGenerations.map((img) => (
              <div
                key={img.id}
                className={`aspect-square bg-gradient-to-br ${img.gradient} rounded-xl flex items-end p-4 border border-border`}
              >
                <p className="text-ink/80 text-sm font-medium drop-shadow">
                  {img.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="card p-6 rounded-xl border border-border">
                <h3 className="text-text font-semibold mb-2">{feature.title}</h3>
                <p className="text-textDim text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
