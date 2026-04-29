import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const pricing = db.pricing.get();
  return Response.json(pricing);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  db.pricing.update(body);
  return Response.json({ success: true });
}
