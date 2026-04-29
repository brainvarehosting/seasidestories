"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Users, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";

const PRICE_PER_NIGHT = 18000;
const CLEANING_FEE = 2000;
const MIN_NIGHTS = 2;
const WHATSAPP_NUMBER = "919876543210";

function BookingForm() {
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(parseInt(searchParams.get("guests") || "2"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  // Client-side price calculation
  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const subtotal = nights * PRICE_PER_NIGHT;
  const total = subtotal + (nights > 0 ? CLEANING_FEE : 0);
  const isValid = nights >= MIN_NIGHTS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !name || !email || !phone) {
      setError("Please fill all required fields.");
      return;
    }
    if (nights < MIN_NIGHTS) {
      setError(`Minimum stay is ${MIN_NIGHTS} nights.`);
      return;
    }
    setError("");

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `🏖️ *Booking Request — Seaside Stories*\n\n` +
      `👤 *Guest:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Phone:* ${phone}\n` +
      `📅 *Check-in:* ${checkIn}\n` +
      `📅 *Check-out:* ${checkOut}\n` +
      `👥 *Guests:* ${guests}\n` +
      `🌙 *Nights:* ${nights}\n` +
      `💰 *Estimated Total:* ₹${total.toLocaleString()}\n` +
      (message ? `\n💬 *Special Requests:*\n${message}` : "")
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSuccess(true);
  };

  if (success) return (
    <div style={{ textAlign: "center", padding: "100px 24px", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ width: 80, height: 80, background: "#f0fdf4", borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", border: "1px solid #dcfce7" }}>
        <CheckCircle size={40} color="#16a34a" strokeWidth={1} />
      </div>
      <h2 className="heading-md" style={{ marginBottom: 16 }}>Request Sent</h2>
      <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
        Your booking request has been sent via WhatsApp. Our team will review your request and confirm your stay shortly.
      </p>
      <Link href="/" className="btn btn-dark">Return to Home</Link>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
      {/* LEFT — form */}
      <form onSubmit={handleSubmit} id="booking-form" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {/* Dates card */}
        <div style={{ background: "white", padding: 48, border: "1px solid #f1f5f9", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 32 }}>Select Dates</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Arrival</label>
              <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} required 
                style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Departure</label>
              <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} required 
                style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Guests</label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, border: "1px solid #e2e8f0", padding: "8px 16px", background: "#f8fafc" }}>
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={{ width: 40, height: 40, background: "white", border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 20, color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
              <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} style={{ width: 40, height: 40, background: "white", border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 20, color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div style={{ background: "white", padding: 48, border: "1px solid #f1f5f9", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 32 }}>Guest Information</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required 
                style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required 
                  style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required 
                  style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Special Requests</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Tell us about your requirements..." 
                style={{ border: "1px solid #e2e8f0", padding: "16px", outline: "none", fontSize: 14, color: "#0f172a", borderRadius: 0, background: "#f8fafc", resize: "none" }} />
            </div>
          </div>
        </div>
      </form>

      {/* RIGHT — price summary sticky */}
      <div style={{ position: "sticky", top: 120 }}>
        <div style={{ borderRadius: 0, overflow: "hidden", aspectRatio: "16/9", marginBottom: 32, background: "#f1f5f9", position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
          <Image src="/photos/0J6A0268.JPG" alt="Seaside Stories Villa" fill style={{ objectFit: "cover" }} sizes="480px" />
        </div>

        <div style={{ background: "white", padding: 40, border: "1px solid #f1f5f9", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, borderBottom: "1px solid #f1f5f9", paddingBottom: 20 }}>
            <h3 className="heading-md" style={{ fontSize: 24, margin: 0 }}>Summary</h3>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Preliminary</span>
          </div>

          {nights === 0 ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0", fontSize: 15, fontWeight: 300 }}>Select dates to calculate price</p>
          ) : !isValid ? (
            <p style={{ color: "#ef4444", textAlign: "center", padding: "40px 0", fontSize: 15, fontWeight: 500 }}>Minimum stay: {MIN_NIGHTS} nights</p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: "#475569" }}>
                  <span>₹{PRICE_PER_NIGHT.toLocaleString()} × {nights} Nights</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: "#475569" }}>
                  <span>Service & Cleaning</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>₹{CLEANING_FEE.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 18, color: "#0f172a" }}>Estimated Total</span>
                  <span style={{ fontWeight: 700, fontSize: 28, color: "#0f172a" }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}

          {error && (
            <div style={{ background: "#fef2f2", padding: "16px", marginBottom: 24, color: "#b91c1c", fontSize: 14, borderLeft: "4px solid #ef4444" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            form="booking-form"
            disabled={!isValid}
            className="btn btn-dark"
            style={{ width: "100%", padding: "20px", opacity: !isValid ? 0.5 : 1 }}
          >
            Request to Book
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 24, fontWeight: 300 }}>
            Confirmation will be sent via WhatsApp.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1.2fr"] { grid-template-columns: 1fr !important; gap: 48px !important; }
          div[style*="position: sticky"] { position: static !important; }
        }
      `}</style>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#f8fafc" }}>
        {/* Header */}
        <div style={{ background: "#ffffff", borderBottom: "1px solid #f1f5f9", padding: "100px 0 80px" }}>
          <div className="container">
            <p className="label-tag">Reservation</p>
            <h1 className="heading-xl">Book your Stay</h1>
          </div>
        </div>

        <div className="container" style={{ padding: "80px 0" }}>
          <Suspense fallback={<div style={{ textAlign: "center", color: "#94a3b8", padding: "100px" }}>Preparing form…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
