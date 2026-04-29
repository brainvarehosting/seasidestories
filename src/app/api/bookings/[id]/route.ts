import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const booking = db.bookings.getById(id);
  if (!booking) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(booking);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const updated = db.bookings.update(id, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const deleted = db.bookings.delete(id);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
