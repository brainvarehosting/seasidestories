import { clearAuthCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const cookieOptions = clearAuthCookie();
  const cookieStore = await cookies();
  cookieStore.set(cookieOptions.name, cookieOptions.value, { maxAge: 0, path: "/" });
  return Response.json({ success: true });
}
