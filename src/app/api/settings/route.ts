import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const settings = db.settings.get();
  const { adminPasswordHash: _, ...safe } = settings;
  return Response.json(safe);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const current = db.settings.get();
  db.settings.update({ ...current, ...body, adminPasswordHash: current.adminPasswordHash });
  return Response.json({ success: true });
}
