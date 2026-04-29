"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, ArrowRight, X } from "lucide-react";
import { clsx } from "clsx";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Array();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (date < today) return;
    const dateStr = date.toISOString().split("T")[0];

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else {
      if (dateStr < checkIn) {
        setCheckIn(dateStr);
        setCheckOut("");
      } else {
        setCheckOut(dateStr);
        // On mobile, maybe keep it open, but for now we close on second select
        setTimeout(() => setShowCalendar(false), 300);
      }
    }
  };

  const isSelected = (date: Date) => {
    const str = date.toISOString().split("T")[0];
    return str === checkIn || str === checkOut;
  };

  const isInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const str = date.toISOString().split("T")[0];
    return str > checkIn && str < checkOut;
  };

  const params = checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : "";

  return (
    <section id="book" className="section" style={{ background: "#ffffff", padding: "140px 0" }}>
      <div className="container">
        <div className="booking-widget-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 120,
          alignItems: "start",
        }}>
          {/* Left Content: Editorial Presentation */}
          <div style={{ position: "sticky", top: 140 }}>
            <p className="label-tag">Private Sanctuary</p>
            <h2 className="heading-lg" style={{ marginBottom: 40, lineHeight: 1.1 }}>
              Secure Your <br />
              <i style={{ color: "#b2a384" }}>Coastal Retreat</i>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.8, fontWeight: 300 }}>
                Seaside Stories is an exclusive beachfront estate available only for full-property buyouts or individual room stays during select seasons. 
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 64px", paddingTop: 40, borderTop: "1px solid #f1f5f9" }}>
                {[
                  { label: "Villa Capacity", value: "Up to 12 Guests" },
                  { label: "Average Rate", value: "₹24,000 / Night" },
                  { label: "Location", value: "Beachfront, Kerala" },
                  { label: "Inclusions", value: "Chef & Staff" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>{label}</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: "#0f172a" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Premium Calendar Module */}
          <div style={{ position: "relative" }}>
            <div style={{ 
              background: "#ffffff", 
              padding: "60px", 
              boxShadow: "0 60px 120px -20px rgba(15, 23, 42, 0.12)",
              border: "1px solid #f1f5f9",
              borderRadius: 0
            }}>
              <div style={{ marginBottom: 48, textAlign: "center" }}>
                <h3 className="heading-md" style={{ fontSize: 32, marginBottom: 12 }}>Check Availability</h3>
                <div style={{ width: 40, height: 2, background: "#b2a384", margin: "0 auto" }}></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                {/* Date Selection Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b" }}>Travel Dates</span>
                  <div 
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      padding: "18px 24px",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      outline: showCalendar ? "2px solid #b2a384" : "none"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <CalendarIcon size={18} color={checkIn ? "#b2a384" : "#cbd5e1"} />
                      <span style={{ fontSize: 15, color: checkIn ? "#0f172a" : "#94a3b8", fontWeight: checkIn ? 600 : 400 }}>
                        {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Check In"}
                      </span>
                    </div>
                    <ArrowRight size={16} color="#cbd5e1" style={{ margin: "0 20px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 15, color: checkOut ? "#0f172a" : "#94a3b8", fontWeight: checkOut ? 600 : 400 }}>
                        {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Check Out"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guest Counter */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b" }}>Number of Guests</span>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 24,
                    border: "1px solid #e2e8f0", padding: "12px 24px", background: "#f8fafc"
                  }}>
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{
                      width: 44, height: 44, background: "white", border: "1px solid #e2e8f0",
                      cursor: "pointer", fontSize: 24, color: "#0f172a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s"
                    }} className="counter-btn">−</button>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                      <Users size={18} color="#b2a384" />
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                    <button onClick={() => setGuests(Math.min(12, guests + 1))} style={{
                      width: 44, height: 44, background: "white", border: "1px solid #e2e8f0",
                      cursor: "pointer", fontSize: 24, color: "#0f172a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s"
                    }} className="counter-btn">+</button>
                  </div>
                </div>

                <Link href={`/book${params}`} className="btn btn-dark" style={{ padding: "24px", fontSize: 16, letterSpacing: "0.15em" }}>
                  Confirm & Inquire
                </Link>

                <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>
                  Best price guaranteed when booking directly with our concierge.
                </p>
              </div>
            </div>

            {/* Float Calendar Overlay — High-end Animation */}
            {showCalendar && (
              <div 
                ref={calendarRef}
                style={{
                  position: "absolute",
                  top: "20%", left: "-10%", right: "-10%",
                  background: "white",
                  zIndex: 100,
                  boxShadow: "0 50px 100px rgba(15, 23, 42, 0.25)",
                  padding: 40,
                  border: "1px solid #e2e8f0",
                  animation: "calendarAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer", padding: 10 }}>
                    <ChevronLeft size={20} />
                  </button>
                  <span style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer", padding: 10 }}>
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94a3b8", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>{day}</div>
                  ))}
                  {getDaysInMonth(currentMonth).map((date, i) => (
                    <div 
                      key={i}
                      onClick={() => date && handleDateClick(date)}
                      style={{
                        aspectRatio: "1/1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        cursor: date && date >= today ? "pointer" : "default",
                        color: date && isSelected(date) ? "white" : (!date ? "transparent" : (date < today ? "#cbd5e1" : "#0f172a")),
                        background: date && isSelected(date) ? "#0f172a" : (date && isInRange(date) ? "#f1f5f9" : "transparent"),
                        fontWeight: date && (isSelected(date) || isInRange(date)) ? 700 : 400,
                        transition: "all 0.3s ease",
                        position: "relative"
                      }}
                      className={clsx(date && date >= today && "calendar-day-hover")}
                    >
                      {date?.getDate()}
                      {date && isSelected(date) && (
                        <div style={{ position: "absolute", bottom: 6, width: 4, height: 4, borderRadius: "50%", background: "#b2a384" }}></div>
                      )}
                    </div>
                  ))}
                </div>

                <button onClick={() => setShowCalendar(false)} style={{ position: "absolute", top: 15, right: 15, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes calendarAppear {
          from { opacity: 0; transform: scale(0.95) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .calendar-day-hover:hover {
          background: #f8fafc !important;
          color: #b2a384 !important;
          transform: scale(1.1);
          z-index: 2;
        }
        .counter-btn:hover {
          border-color: #b2a384 !important;
          color: #b2a384 !important;
        }
        @media (max-width: 1200px) {
          .booking-widget-grid { gap: 64px !important; }
        }
        @media (max-width: 1024px) {
          .booking-widget-grid { grid-template-columns: 1fr !important; gap: 80px !important; }
          #book div[style*="position: sticky"] { position: static !important; }
          #book div[style*="left: -10%"] { left: 0 !important; right: 0 !important; top: 0 !important; }
        }
        @media (max-width: 640px) {
          #book div[style*="padding: 60px"] { padding: 40px 24px !important; }
          .heading-lg { font-size: 44px !important; }
          #book div[style*="padding: 40"] { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}
