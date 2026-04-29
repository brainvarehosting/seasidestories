"use client";
import { useState } from "react";
import Link from "next/link";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const today = new Date().toISOString().split("T")[0];
  const params = checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : "";

  return (
    <section style={{ background: "#f9f8f5", padding: "80px 0" }}>
      <div className="container">
        <div className="booking-widget-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 64,
          alignItems: "center",
        }}>
          {/* Left text */}
          <div>
            <p className="label-tag">Reserve your stay</p>
            <div className="divider" />
            <h2 className="heading-lg" style={{ marginBottom: 20 }}>
              CHECK<br />AVAILABILITY
            </h2>
            <p style={{ color: "#717171", fontSize: 15, lineHeight: 1.85, marginBottom: 32 }}>
              Select your dates to see real-time pricing and availability. No payment needed now — confirm and pay on arrival.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Starting from", value: "₹18,000 / night" },
                { label: "Minimum stay", value: "2 nights" },
                { label: "Check-in", value: "2:00 PM" },
                { label: "Check-out", value: "11:00 AM" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #e8e6e1" }}>
                  <span style={{ fontSize: 13, color: "#717171" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#141414" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: booking card */}
          <div className="card" style={{ padding: 36 }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
              color: "#141414", marginBottom: 6, letterSpacing: "0.03em",
            }}>SELECT DATES</h3>
            <p style={{ fontSize: 13, color: "#717171", marginBottom: 28 }}>Instant price calculation</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Date row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="input-label">Check-in</label>
                  <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="input-label">Check-out</label>
                  <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="input" />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="input-label">Guests</label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16,
                  border: "1.5px solid #e8e6e1", borderRadius: 12, padding: "12px 16px",
                }}>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{
                    width: 30, height: 30, borderRadius: "50%",
                    border: "1.5px solid #e8e6e1", background: "white",
                    cursor: "pointer", fontSize: 18, color: "#141414",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>−</button>
                  <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 600, color: "#141414" }}>
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </span>
                  <button onClick={() => setGuests(Math.min(10, guests + 1))} style={{
                    width: 30, height: 30, borderRadius: "50%",
                    border: "1.5px solid #e8e6e1", background: "white",
                    cursor: "pointer", fontSize: 18, color: "#141414",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>+</button>
                </div>
              </div>

              <Link href={`/book${params}`} className="btn btn-dark" style={{ justifyContent: "center", padding: "15px", fontSize: 14 }}>
                Check Availability
              </Link>

              <p style={{ textAlign: "center", fontSize: 12, color: "#b0acac" }}>
                No charge now · Free cancellation
              </p>
            </div>

            {/* WhatsApp alternative */}
            <div style={{
              marginTop: 24, paddingTop: 24, borderTop: "1px solid #e8e6e1",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, color: "#717171" }}>Prefer to call?</span>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#25D366", color: "white",
                  padding: "8px 16px", borderRadius: 10, fontSize: 12,
                  fontWeight: 600, textDecoration: "none",
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 2C6.495 2 2 6.49 2 12.05c0 1.97.535 3.815 1.46 5.4L2 22l4.657-1.44A9.987 9.987 0 0012.05 22C17.61 22 22 17.51 22 11.95 22 6.49 17.51 2 12.05 2zm0 18.14c-1.7 0-3.375-.46-4.848-1.338l-.348-.206-3.612 1.115 1.072-3.51-.224-.357a8.076 8.076 0 01-1.147-4.104c0-4.49 3.66-8.143 8.15-8.143 4.484 0 8.14 3.653 8.14 8.143 0 4.487-3.656 8.4-8.183 8.4z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .booking-widget-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
