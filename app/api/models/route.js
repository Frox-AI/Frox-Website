import { NextResponse } from "next/server";
import { MODELS, hasUpstream } from "@/lib/frox";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    object: "list",
    live: hasUpstream(),
    data: MODELS.map((m) => ({
      id: m.id,
      object: "model",
      owned_by: "frox-studio",
      modality: m.modality,
      context: m.context,
      description: m.description,
      upstream: m.upstream,
    })),
  });
}
