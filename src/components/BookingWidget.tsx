"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Users, ArrowRight, X } from "lucide-react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
}

function CalendarPicker({
  checkIn, checkOut, onSelect, onClose
}: {
  checkIn: string; checkOut: string;
  onSelect: (d: string) => void;
  onClose: () => void;
}) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [month, setMonth] = useState(() => {
    const d = checkIn ? new Date(checkIn) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = month.getFullYear();
  const mon  = month.getMonth();
  const firstDay = new Date(year, mon, 1).getDay();
  const daysInMonth = new Date(year, mon + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(year, mon, i));

  const isoStr = (d: Date) => d.toISOString().split("T")[0];
  const isSelected = (d: Date) => isoStr(d) === checkIn || isoStr(d) === checkOut;
  const isInRange  = (d: Date) => checkIn && checkOut && isoStr(d) > checkIn && isoStr(d) < checkOut;
  const isPast     = (d: Date) => d < today;
  const isToday    = (d: Date) => isoStr(d) === isoStr(today);

  return (
    <div className="calendar-popup">
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 20px 0",
        borderBottom: "1px solid #f1f5f9", paddingBottom: 16
      }}>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#94a3b8", padding: 8, display: "flex", alignItems: "center"
        }}><X size={20} /></button>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#b2a384", marginBottom: 4 }}>
            {checkIn && !checkOut ? "Select check-out" : checkIn && checkOut ? "Dates selected" : "Select check-in"}
          </div>
          {checkIn && (
            <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>
              {formatDate(checkIn)}{checkOut ? ` → ${formatDate(checkOut)}` : ""}
            </div>
          )}
        </div>

        <div style={{ width: 36 }} />
      </div>

      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <button
          onClick={() => setMonth(new Date(year, mon - 1, 1))}
          style={{ width: 40, height: 40, border: "1.5px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}
        >
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#0f172a" }}>
          {month.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setMonth(new Date(year, mon + 1, 1))}
          style={{ width: 40, height: 40, border: "1.5px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "0 12px", marginBottom: 8 }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, padding: "0 12px 20px" }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const sel = isSelected(d);
          const range = isInRange(d);
          const past = isPast(d);
          const tod = isToday(d);
          return (
            <button
              key={i}
              disabled={past}
              onClick={() => !past && onSelect(isoStr(d))}
              className={`calendar-day${sel ? " selected" : ""}${range ? " in-range" : ""}${tod ? " today" : ""}`}
              style={{
                minHeight: 44,
                fontSize: 15,
                fontWeight: sel ? 700 : 400,
                color: sel ? "white" : past ? "#cbd5e1" : "#0f172a",
                background: sel ? "#0f172a" : range ? "#f0ede7" : "transparent",
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {/* Clear button */}
      {(checkIn || checkOut) && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
          <button onClick={() => { onSelect("__clear__"); }} style={{
            width: "100%", padding: "12px", background: "transparent",
            border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 13, color: "#64748b",
            fontWeight: 600, letterSpacing: "0.05em", borderRadius: 4
          }}>
            Clear Dates
          </button>
        </div>
      )}
    </div>
  );
}

export default function BookingWidget() {
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests]     = useState(2);
  const [showCal, setShowCal]   = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowCal(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent body scroll when calendar open on mobile
  useEffect(() => {
    if (showCal && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showCal]);

  const handleSelect = (d: string) => {
    if (d === "__clear__") { setCheckIn(""); setCheckOut(""); return; }
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(d); setCheckOut("");
    } else if (d < checkIn) {
      setCheckIn(d); setCheckOut("");
    } else {
      setCheckOut(d);
      setTimeout(() => setShowCal(false), 400);
    }
  };

  const params = checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : "";

  return (
    <section id="book" className="section" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="booking-widget-grid">

          {/* Left – info */}
          <div className="booking-left-sticky">
            <p className="label-tag">Private Sanctuary</p>
            <h2 className="heading-lg" style={{ marginBottom: 32, lineHeight: 1.1 }}>
              Secure Your<br />
              <i style={{ color: "#b2a384" }}>Coastal Retreat</i>
            </h2>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}>
              An exclusive beachfront estate available for full-property buyouts or individual room stays.
            </p>
            <div className="booking-stats-grid" style={{ paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
              {[
                { label: "Capacity",   value: "Up to 12 Guests" },
                { label: "From",       value: "₹18,000 / Night" },
                { label: "Location",   value: "Beachfront, Kerala" },
                { label: "Inclusions", value: "Staff & Chef" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>{label}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – booking card */}
          <div>
            <div style={{ background: "white", boxShadow: "0 20px 60px rgba(15,23,42,0.08)", border: "1px solid #f1f5f9" }}>
              <div className="booking-card-inner">
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, marginBottom: 10 }}>
                    Check Availability
                  </h3>
                  <div style={{ width: 40, height: 2, background: "#b2a384", margin: "0 auto" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                  {/* Date Trigger */}
                  <div ref={wrapRef} style={{ position: "relative" }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b", marginBottom: 10 }}>
                      Travel Dates
                    </label>
                    <button
                      onClick={() => setShowCal(!showCal)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        border: showCal ? "2px solid #b2a384" : "1.5px solid #e2e8f0",
                        background: "#f8fafc", padding: "16px 20px", cursor: "pointer",
                        borderRadius: 4, transition: "border-color 0.2s", gap: 12,
                        minHeight: 60,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                        <CalIcon size={20} color={checkIn ? "#b2a384" : "#94a3b8"} />
                        <span style={{ fontSize: 15, color: checkIn ? "#0f172a" : "#94a3b8", fontWeight: checkIn ? 600 : 400 }}>
                          {checkIn ? formatDate(checkIn) : "Add check-in date"}
                        </span>
                      </div>
                      <ArrowRight size={16} color="#cbd5e1" />
                      <span style={{ fontSize: 15, color: checkOut ? "#0f172a" : "#94a3b8", fontWeight: checkOut ? 600 : 400, flex: 1, textAlign: "right" }}>
                        {checkOut ? formatDate(checkOut) : "Add check-out"}
                      </span>
                    </button>

                    {showCal && (
                      <CalendarPicker
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onSelect={handleSelect}
                        onClose={() => setShowCal(false)}
                      />
                    )}
                  </div>

                  {/* Guest counter */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b", marginBottom: 10 }}>
                      Guests
                    </label>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 0,
                      border: "1.5px solid #e2e8f0", borderRadius: 4, background: "#f8fafc",
                      overflow: "hidden", minHeight: 60
                    }}>
                      <button
                        onClick={() => setGuests(g => Math.max(1, g - 1))}
                        style={{ width: 56, height: 60, background: "white", border: "none", borderRight: "1.5px solid #e2e8f0", cursor: "pointer", fontSize: 22, color: "#0f172a", fontWeight: 300, flexShrink: 0 }}
                      >−</button>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <Users size={18} color="#b2a384" />
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                      </div>
                      <button
                        onClick={() => setGuests(g => Math.min(12, g + 1))}
                        style={{ width: 56, height: 60, background: "white", border: "none", borderLeft: "1.5px solid #e2e8f0", cursor: "pointer", fontSize: 22, color: "#0f172a", fontWeight: 300, flexShrink: 0 }}
                      >+</button>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/book${params}`}
                    className="btn btn-dark"
                    style={{ width: "100%", padding: "20px", fontSize: 14, letterSpacing: "0.12em", minHeight: 60 }}
                  >
                    Confirm & Inquire
                  </Link>

                  <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: -8 }}>
                    Best price guaranteed · No hidden fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile calendar backdrop */}
      {showCal && (
        <div
          onClick={() => setShowCal(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
            zIndex: 150, display: "none"
          }}
          className="cal-backdrop"
        />
      )}

      <style>{`
        @media (max-width: 640px) {
          .cal-backdrop { display: block !important; }
        }
      `}</style>
    </section>
  );
}
