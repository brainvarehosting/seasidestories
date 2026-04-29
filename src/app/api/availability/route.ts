import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");

  if (checkIn && checkOut) {
    const calc = db.pricing.calculateTotal(checkIn, checkOut);
    const config = db.pricing.get();
    // Check availability for all dates
    let available = true;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const current = new Date(start);
    while (current < end) {
      const dateStr = current.toISOString().split("T")[0];
      if (!db.pricing.isDateAvailable(dateStr)) {
        available = false;
        break;
      }
      current.setDate(current.getDate() + 1);
    }
    return Response.json({ available, ...calc, config });
  }

  // Return blocked dates and booked date ranges
  const config = db.pricing.get();
  const confirmedBookings = db.bookings
    .getAll()
    .filter((b) => b.status === "confirmed")
    .map((b) => ({ checkIn: b.checkIn, checkOut: b.checkOut }));

  return Response.json({
    blockedDates: config.blockedDates,
    bookedRanges: confirmedBookings,
    minimumNights: config.minimumNights,
  });
}
