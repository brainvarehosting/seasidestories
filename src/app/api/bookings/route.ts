import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = db.bookings.getAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return Response.json(bookings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkIn, checkOut, guestName, guestEmail, guestPhone, guests, message } = body;

    if (!checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pricing = db.pricing;
    const config = pricing.get();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return Response.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nights < config.minimumNights) {
      return Response.json({ error: `Minimum stay is ${config.minimumNights} nights` }, { status: 400 });
    }

    // Check availability
    const current = new Date(checkInDate);
    while (current < checkOutDate) {
      const dateStr = current.toISOString().split("T")[0];
      if (!pricing.isDateAvailable(dateStr)) {
        return Response.json({ error: `Date ${dateStr} is not available` }, { status: 409 });
      }
      current.setDate(current.getDate() + 1);
    }

    const calc = pricing.calculateTotal(checkIn, checkOut);

    const booking = db.bookings.create({
      checkIn,
      checkOut,
      guestName,
      guestEmail,
      guestPhone,
      guests: parseInt(guests) || 1,
      totalPrice: calc.total,
      nights: calc.nights,
      message,
    });

    return Response.json(booking, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
