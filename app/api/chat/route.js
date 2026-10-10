import { NextResponse } from "next/server";
import { getModel, callUpstream, hasUpstream, fallbackText, DEFAULT_MODEL } from "@/lib/frox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimits = globalThis._froxRateLimits || (globalThis._froxRateLimits = new Map());

function checkRateLimit(key, max = 60, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimits.get(key) || { count: 0, reset: now + windowMs };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + windowMs;
  }
  entry.count++;
  rateLimits.set(key, entry);
  return entry.count <= max;
}

function sseStream(producer) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        await producer(send);
      } catch (err) {
        send({ error: err?.message || "stream error" });
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(`chat:${ip}`)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please slow down." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages = [], model: modelId = DEFAULT_MODEL, temperature = 0.7, stream = true } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "`messages` must be a non-empty array" }, { status: 400 });
  }

  const model = getModel(modelId);
  if (!model) {
    return NextResponse.json({ error: `Unknown model: ${modelId}` }, { status: 404 });
  }

  if (model.modality === "image") {
    return NextResponse.json({ error: "Use /api/images for image generation" }, { status: 400 });
  }

  const cleaned = messages
    .filter((m) => m && typeof m.content === "string" && ["system", "user", "assistant"].includes(m.role))
    .map((m) => ({ role: m.role, content: m.content }));

  const lastUser = [...cleaned].reverse().find((m) => m.role === "user")?.content || "";

  // ---- Live upstream (Hugging Face) ----
  if (hasUpstream()) {
    try {
      const upstream = await callUpstream({ model, messages: cleaned, temperature });
      if (!upstream.ok || !upstream.body) {
        const detail = await upstream.text().catch(() => "");
        if (!stream) {
          return NextResponse.json({ error: "Upstream model error", detail }, { status: 502 });
        }
        return new Response(
          sseStream(async (send) => {
            send({ error: `Upstream model error (${upstream.status}). ${detail.slice(0, 300)}` });
          }),
          { headers: sseHeaders() }
        );
      }

      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const out = new ReadableStream({
        async pull(controller) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          const encoder = new TextEncoder();
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              continue;
            }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
            } catch {
              /* ignore keep-alive / partial frames */
            }
          }
        },
      });

      return new Response(out, { headers: sseHeaders() });
    } catch (err) {
      return NextResponse.json({ error: "Upstream request failed", detail: String(err) }, { status: 502 });
    }
  }

  // ---- Fallback / demo mode ----
  const text = fallbackText(model, lastUser);

  if (!stream) {
    return NextResponse.json({ model: model.id, content: text });
  }

  return new Response(
    sseStream(async (send) => {
      const tokens = text.match(/\s+|\S+/g) || [];
      for (const tok of tokens) {
        send({ delta: tok });
        await new Promise((r) => setTimeout(r, 12));
      }
    }),
    { headers: sseHeaders() }
  );
}

function sseHeaders() {
  return {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  };
}

export async function GET() {
  return NextResponse.json({ error: "Use POST to chat" }, { status: 405 });
}
