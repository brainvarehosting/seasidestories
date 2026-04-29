"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Users, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

interface PriceCalc {
  available: boolean;
  nights: number;
  subtotal: number;
  cleaningFee: number;
  total: number;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(parseInt(searchParams.get("guests") || "2"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [priceCalc, setPriceCalc] = useState<PriceCalc | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!checkIn || !checkOut) { setPriceCalc(null); return; }
    setLoading(true);
    fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`)
      .then((r) => r.json()).then(setPriceCalc).catch(() => {}).finally(() => setLoading(false));
  }, [checkIn, checkOut]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !name || !email || !phone) { setError("Please fill all required fields."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut, guestName: name, guestEmail: email, guestPhone: phone, guests, message }),
      });
      if (res.ok) setSuccess(true);
      else { const d = await res.json(); setError(d.error || "Something went wrong."); }
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  };

  if (success) return (
    <div style={{ textAlign: "center", padding: "80px 24px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ width: 72, height: 72, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <CheckCircle size={36} color="#14532d" />
      </div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: "#141414", marginBottom: 12 }}>REQUEST SENT!</h2>
      <p style={{ color: "#717171", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
        We&apos;ll confirm your booking at <strong>{email}</strong> within 24 hours.
      </p>
      <a href="/" className="btn btn-dark">← Back to Home</a>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "start" }}>
      {/* LEFT — form */}
      <form onSubmit={handleSubmit}>
        {/* Dates card */}
        <div className="card" style={{ padding: 32, marginBottom: 16 }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#141414", marginBottom: 24 }}>YOUR STAY</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label className="input-label"><Calendar size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Check-in *</label>
              <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} required className="input" />
            </div>
            <div>
              <label className="input-label"><Calendar size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Check-out *</label>
              <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} required className="input" />
            </div>
          </div>
          <div>
            <label className="input-label"><Users size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Guests</label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, border: "1.5px solid #e8e6e1", borderRadius: 12, padding: "12px 16px" }}>
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px solid #e8e6e1", background: "white", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>−</button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{guests} {guests === 1 ? "guest" : "guests"}</span>
              <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px solid #e8e6e1", background: "white", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div className="card" style={{ padding: 32 }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#141414", marginBottom: 24 }}>YOUR DETAILS</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label className="input-label"><User size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Full Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required className="input" />
            </div>
            <div>
              <label className="input-label"><Mail size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="input" />
            </div>
            <div>
              <label className="input-label"><Phone size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Phone *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required className="input" />
            </div>
            <div>
              <label className="input-label"><MessageSquare size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />Special Requests</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Dietary needs, arrival time, celebrations…" className="input" style={{ resize: "vertical" }} />
            </div>
          </div>
        </div>
      </form>

      {/* RIGHT — price summary sticky */}
      <div style={{ position: "sticky", top: 88 }}>
        {/* Photo card */}
        <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", marginBottom: 16, background: "#f3f2ef" }}>
          <Image src="/photos/0J6A0268.JPG" alt="Villa" fill style={{ objectFit: "cover" }} sizes="480px" />
        </div>

        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#141414" }}>PRICE SUMMARY</span>
            <span style={{ fontSize: 13, color: "#717171" }}>No payment now</span>
          </div>

          {!checkIn || !checkOut ? (
            <p style={{ color: "#b0acac", textAlign: "center", padding: "20px 0", fontSize: 14 }}>Select dates to see pricing</p>
          ) : loading ? (
            <p style={{ color: "#b0acac", textAlign: "center", padding: "20px 0" }}>Calculating…</p>
          ) : priceCalc ? (
            <>
              {!priceCalc.available && (
                <div style={{ display: "flex", gap: 8, background: "#fee2e2", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                  <AlertCircle size={14} color="#7f1d1d" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ color: "#7f1d1d", fontSize: 13 }}>These dates aren&apos;t available. Please select different dates.</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#717171" }}>
                  <span>Accommodation ({priceCalc.nights} nights)</span>
                  <span style={{ fontWeight: 600, color: "#141414" }}>₹{priceCalc.subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#717171" }}>
                  <span>Cleaning fee</span>
                  <span style={{ fontWeight: 600, color: "#141414" }}>₹{priceCalc.cleaningFee.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: "1.5px solid #e8e6e1", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: 22, color: "#141414" }}>₹{priceCalc.total.toLocaleString()}</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "#b0acac", marginTop: 12, lineHeight: 1.6 }}>
                + ₹5,000 refundable security deposit collected at check-in.
              </p>
            </>
          ) : null}

          {error && (
            <div style={{ display: "flex", gap: 8, background: "#fee2e2", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
              <AlertCircle size={14} color="#7f1d1d" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ color: "#7f1d1d", fontSize: 13 }}>{error}</span>
            </div>
          )}

          <button type="submit" form="" onClick={(e) => {
            e.preventDefault();
            document.querySelector("form")?.requestSubmit();
          }}
            disabled={submitting || (priceCalc !== null && !priceCalc.available)}
            className="btn btn-dark"
            style={{ width: "100%", justifyContent: "center", marginTop: 16, padding: "15px", fontSize: 15, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Sending request…" : "Request to Book"}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#b0acac", marginTop: 10 }}>
            Free cancellation · Instant confirmation
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          form ~ div { position: static !important; }
        }
      `}</style>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72, minHeight: "100vh", background: "#f9f8f5" }}>
        {/* Hero */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e1", padding: "48px 0 40px" }}>
          <div className="container">
            <p className="label-tag">Reserve Your Stay</p>
            <div className="divider" />
            <h1 className="heading-xl">BOOK NOW</h1>
          </div>
        </div>

        <div className="container" style={{ padding: "48px 40px" }}>
          <Suspense fallback={<div style={{ textAlign: "center", color: "#717171", padding: "60px" }}>Loading…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
