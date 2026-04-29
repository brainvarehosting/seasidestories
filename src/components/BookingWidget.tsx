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
    <section id="book" className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="booking-widget-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "center",
        }}>
          {/* Left text */}
          <div>
            <p className="label-tag">Availability</p>
            <h2 className="heading-lg" style={{ marginBottom: 32 }}>
              Plan your <i style={{ color: "#b2a384" }}>Escape</i>
            </h2>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Select your preferred dates to see availability. Our villa offers exclusive privacy for discerning guests seeking a serene beachfront retreat.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px", paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
              {[
                { label: "Starting from", value: "₹18,000 / Night" },
                { label: "Minimum stay", value: "2 Nights" },
                { label: "Check-in", value: "2:00 PM" },
                { label: "Check-out", value: "11:00 AM" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>{label}</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#0f172a" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: booking card */}
          <div style={{ 
            background: "#ffffff", 
            padding: 60, 
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.08)",
            border: "1px solid #f1f5f9"
          }}>
            <h3 className="heading-md" style={{ marginBottom: 40, fontSize: 32 }}>Select Dates</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Date row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Arrival</label>
                  <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} 
                    style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Departure</label>
                  <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} 
                    style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
                </div>
              </div>

              {/* Guests */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Guests</label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16,
                  border: "1px solid #e2e8f0", padding: "8px 16px", background: "#f8fafc"
                }}>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{
                    width: 40, height: 40, background: "white", border: "1px solid #e2e8f0",
                    cursor: "pointer", fontSize: 20, color: "#0f172a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>−</button>
                  <span style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 600, color: "#0f172a" }}>
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                  <button onClick={() => setGuests(Math.min(10, guests + 1))} style={{
                    width: 40, height: 40, background: "white", border: "1px solid #e2e8f0",
                    cursor: "pointer", fontSize: 20, color: "#0f172a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>+</button>
                </div>
              </div>

              <Link href={`/book${params}`} className="btn btn-dark" style={{ padding: "20px" }}>
                Check Availability
              </Link>

              <div style={{
                marginTop: 16, paddingTop: 32, borderTop: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 300 }}>Assisted Booking</span>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  style={{
                    color: "#0f172a", fontSize: 13, fontWeight: 700, textDecoration: "none",
                    borderBottom: "1px solid #b2a384", paddingBottom: 2, letterSpacing: "0.05em", textTransform: "uppercase"
                  }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .booking-widget-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
        @media (max-width: 640px) {
          #book div[style*="padding: 60"] { padding: 32px !important; }
        }
      `}</style>
    </section>
  );
}
