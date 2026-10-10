export default function DocsPage() {
  const navSections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "authentication", label: "Authentication" },
    { id: "chat-api", label: "Chat API" },
    { id: "image-api", label: "Image API" },
    { id: "audio-api", label: "Audio API" },
    { id: "3d-api", label: "3D API" },
    { id: "code-api", label: "Code API" },
    { id: "sdks", label: "SDKs" },
    { id: "rate-limits", label: "Rate Limits" },
    { id: "errors", label: "Errors" },
    { id: "webhooks", label: "Webhooks" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="grad-text">Documentation</span>
          </h1>
          <p className="text-textDim text-lg max-w-2xl">
            Everything you need to integrate Frox into your applications.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="sticky top-32 space-y-1">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-2 rounded-lg text-sm text-textDim hover:text-text hover:bg-bgCard transition-colors"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Quickstart */}
            <section id="getting-started" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Quickstart</h2>
              <p className="text-textDim mb-8 leading-relaxed">
                Get up and running with Frox in minutes. This guide will walk
                you through installing the SDK and making your first API
                request.
              </p>

              {/* Install */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">
                  1. Install the SDK
                </h3>
                <div className="card rounded-xl p-5">
                  <pre className="text-sm text-textDim overflow-x-auto">
                    <code>{`# npm
npm install @frox/sdk

# yarn
yarn add @frox/sdk

# pnpm
pnpm add @frox/sdk`}</code>
                  </pre>
                </div>
              </div>

              {/* First Request */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">
                  2. Make Your First Request
                </h3>
                <div className="card rounded-xl p-5">
                  <pre className="text-sm text-textDim overflow-x-auto">
                    <code>{`import Frox from '@frox/sdk';

const frox = new Frox({
  apiKey: process.env.FROX_API_KEY,
});

async function main() {
  const response = await frox.chat.create({
    model: 'frox-2.0',
    messages: [
      { role: 'user', content: 'Hello, Frox!' }
    ],
  });

  console.log(response.choices[0].message.content);
}

main();`}</code>
                  </pre>
                </div>
              </div>

              {/* Streaming */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">
                  3. Streaming Responses
                </h3>
                <div className="card rounded-xl p-5">
                  <pre className="text-sm text-textDim overflow-x-auto">
                    <code>{`const stream = await frox.chat.create({
  model: 'frox-2.0',
  messages: [
    { role: 'user', content: 'Tell me a story' }
  ],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Authentication</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Frox uses API keys to authenticate requests. You can manage
                your API keys from the dashboard.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`const frox = new Frox({
  apiKey: 'frox_sk_...',
});

// Or use an environment variable
const frox = new Frox({
  apiKey: process.env.FROX_API_KEY,
});`}</code>
                </pre>
              </div>
            </section>

            {/* Chat API */}
            <section id="chat-api" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Chat API</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                The Chat API allows you to create conversational AI experiences
                with support for streaming, function calling, and multimodal
                inputs.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`const response = await frox.chat.create({
  model: 'frox-2.0',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the weather like?' }
  ],
  temperature: 0.7,
  max_tokens: 1024,
});`}</code>
                </pre>
              </div>
            </section>

            {/* Image API */}
            <section id="image-api" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Image API</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Generate stunning images from text descriptions with our
                state-of-the-art diffusion models.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`const image = await frox.images.generate({
  prompt: 'A futuristic city at sunset, cyberpunk style',
  size: '1024x1024',
  quality: 'hd',
  style: 'vivid',
});

console.log(image.data[0].url);`}</code>
                </pre>
              </div>
            </section>

            {/* Audio API */}
            <section id="audio-api" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Audio API</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Convert text to natural-sounding speech and transcribe audio
                with high accuracy.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`// Text to Speech
const speech = await frox.audio.speech.create({
  text: 'Hello, welcome to Frox!',
  voice: 'nova',
  model: 'tts-1',
});

// Speech to Text
const transcription = await frox.audio.transcriptions.create({
  file: audioFile,
  model: 'whisper-1',
});`}</code>
                </pre>
              </div>
            </section>

            {/* 3D API */}
            <section id="3d-api" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">3D API</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Generate 3D models and assets from text descriptions or 2D
                reference images.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`const model = await frox.threeD.generate({
  prompt: 'A low-poly tree with detailed bark texture',
  format: 'glb',
  quality: 'standard',
});

console.log(model.data[0].url);`}</code>
                </pre>
              </div>
            </section>

            {/* Code API */}
            <section id="code-api" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Code API</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Generate, explain, and debug code with AI assistance across
                dozens of programming languages.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`const code = await frox.code.generate({
  prompt: 'Create a Python function to sort a list of dictionaries by a given key',
  language: 'python',
  temperature: 0.2,
});

console.log(code.data[0].content);`}</code>
                </pre>
              </div>
            </section>

            {/* SDKs */}
            <section id="sdks" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">SDKs</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Official SDKs for popular languages and frameworks.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {["JavaScript / TypeScript", "Python", "Go", "Rust"].map(
                  (lang) => (
                    <div key={lang} className="card rounded-xl p-5">
                      <h4 className="font-semibold mb-2">{lang}</h4>
                      <p className="text-textFaint text-sm">
                        Official Frox SDK for {lang}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Rate Limits</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Rate limits are applied per API key and vary by plan. All
                responses include rate limit headers.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1696780800`}</code>
                </pre>
              </div>
            </section>

            {/* Errors */}
            <section id="errors" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Errors</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Frox uses conventional HTTP status codes to indicate the
                success or failure of API requests.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`{
  "error": {
    "code": "invalid_api_key",
    "message": "The provided API key is invalid.",
    "type": "authentication_error"
  }
}`}</code>
                </pre>
              </div>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="mb-16 scroll-mt-32">
              <h2 className="text-3xl font-bold mb-4">Webhooks</h2>
              <p className="text-textDim mb-6 leading-relaxed">
                Subscribe to events in real-time with webhooks. Configure
                endpoints from the dashboard.
              </p>
              <div className="card rounded-xl p-5">
                <pre className="text-sm text-textDim overflow-x-auto">
                  <code>{`{
  "id": "evt_1234567890",
  "object": "event",
  "type": "chat.completed",
  "data": {
    "id": "chat_abc123",
    "status": "completed",
    "usage": { "tokens": 1523 }
  },
  "created": 1696780800
}`}</code>
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
