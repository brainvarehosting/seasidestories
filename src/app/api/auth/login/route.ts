import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { signToken, createAuthCookie, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const settings = db.settings.get();

    if (email !== settings.adminEmail) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!verifyPassword(password, settings.adminPasswordHash)) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ email });
    const cookieOptions = createAuthCookie(token);
    const cookieStore = await cookies();
    cookieStore.set(cookieOptions.name, cookieOptions.value, cookieOptions);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
