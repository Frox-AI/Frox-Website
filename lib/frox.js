// Frox model registry + inference provider abstraction.

export const MODELS = [
  {
    id: "frox-flex",
    name: "Frox Flex",
    provider: "huggingface",
    upstream: "FroxStudio/Flex-Model-LoRA",
    context: 262144,
    modality: "text",
    description: "Frontier reasoning and conversation with a 256K context window.",
  },
  {
    id: "frox-code",
    name: "Frox Code",
    provider: "huggingface",
    upstream: "FroxStudio/Flex-Code-1.0-LoRA",
    context: 131072,
    modality: "code",
    description: "Code-specialized model fluent in 40+ languages.",
  },
  {
    id: "frox-image",
    name: "Frox Image",
    provider: "huggingface",
    upstream: "FroxStudio/Flex-Image-Scratch",
    context: 0,
    modality: "image",
    description: "High-fidelity text-to-image generation.",
  },
];

export const DEFAULT_MODEL = "frox-flex";

export function getModel(id) {
  return MODELS.find((m) => m.id === id) || MODELS.find((m) => m.id === DEFAULT_MODEL);
}

const HF_ROUTER = "https://router.huggingface.co/v1/chat/completions";

export function hasUpstream() {
  return Boolean(process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY);
}

/**
 * Calls the Hugging Face Inference Providers router (OpenAI-compatible).
 * Returns the raw upstream Response so the caller can stream it through.
 */
export async function callUpstream({ model, messages, temperature = 0.7, maxTokens = 1024 }) {
  const token = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
  if (!token) throw new Error("NO_UPSTREAM");

  return fetch(HF_ROUTER, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model.upstream,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    }),
  });
}

/** A friendly canned reply used when no upstream token is configured. */
export function fallbackText(model, userText) {
  const t = (userText || "").trim();
  return `**Frox ${model.name}** here. You asked: “${t.slice(0, 140)}${t.length > 140 ? "…" : ""}”

I'm running in **demo mode** because no \`HF_TOKEN\` is configured on the server yet. Here's what that means:

- The full chat UI, streaming, and API are working end-to-end.
- To route requests to the real **${model.upstream}** model, set an environment variable:

\`\`\`bash
HF_TOKEN=hf_xxxxxxxxxxxx
\`\`\`

Then restart the server. Your next message will hit the live model through the Hugging Face Inference Providers router.

In the meantime, everything else — models, docs, auth, streaming — is fully wired up.`;
}
