"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, ArrowRight, X } from "lucide-react";

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
    const days: (Date | null)[] = [];
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
    <section id="book" className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="booking-widget-grid">

          {/* Left: Editorial info */}
          <div className="booking-left-sticky" style={{ position: "sticky", top: 140 }}>
            <p className="label-tag">Private Sanctuary</p>
            <h2 className="heading-lg" style={{ marginBottom: 40, lineHeight: 1.1 }}>
              Secure Your<br />
              <i style={{ color: "#b2a384" }}>Coastal Retreat</i>
            </h2>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.8, fontWeight: 300, marginBottom: 48 }}>
              Seaside Stories is an exclusive beachfront estate available for full-property buyouts or individual room stays during select seasons.
            </p>

            <div className="booking-stats-grid" style={{ paddingTop: 40, borderTop: "1px solid #f1f5f9" }}>
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

          {/* Right: Calendar card */}
          <div style={{ position: "relative" }}>
            <div className="booking-card-padding" style={{
              background: "#ffffff",
              boxShadow: "0 60px 120px -20px rgba(15, 23, 42, 0.12)",
              border: "1px solid #f1f5f9",
            }}>
              <div style={{ marginBottom: 48, textAlign: "center" }}>
                <h3 className="heading-md" style={{ fontSize: 32, marginBottom: 12 }}>Check Availability</h3>
                <div style={{ width: 40, height: 2, background: "#b2a384", margin: "0 auto" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Date Selector */}
                <div style={{ position: "relative" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: 12 }}>Travel Dates</span>
                  <div
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      alignItems: "center",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      padding: "18px 20px",
                      cursor: "pointer",
                      outline: showCalendar ? "2px solid #b2a384" : "none"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <CalendarIcon size={16} color={checkIn ? "#b2a384" : "#cbd5e1"} />
                      <span style={{ fontSize: 14, color: checkIn ? "#0f172a" : "#94a3b8", fontWeight: checkIn ? 600 : 400 }}>
                        {checkIn ? new Date(checkIn).toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "Check In"}
                      </span>
                    </div>
                    <ArrowRight size={14} color="#cbd5e1" style={{ margin: "0 12px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 14, color: checkOut ? "#0f172a" : "#94a3b8", fontWeight: checkOut ? 600 : 400 }}>
                        {checkOut ? new Date(checkOut).toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "Check Out"}
                      </span>
                    </div>
                  </div>

                  {/* Calendar Dropdown */}
                  {showCalendar && (
                    <div ref={calendarRef} className="calendar-overlay">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          style={{ background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer", padding: 8 }}>
                          <ChevronLeft size={18} />
                        </button>
                        <span style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          style={{ background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer", padding: 8 }}>
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                          <div key={day} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#94a3b8", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>{day}</div>
                        ))}
                        {getDaysInMonth(currentMonth).map((date, i) => (
                          <div
                            key={i}
                            onClick={() => date && handleDateClick(date)}
                            style={{
                              aspectRatio: "1/1",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 13,
                              cursor: date && date >= today ? "pointer" : "default",
                              color: date && isSelected(date) ? "white" : (!date ? "transparent" : (date < today ? "#cbd5e1" : "#0f172a")),
                              background: date && isSelected(date) ? "#0f172a" : (date && isInRange(date) ? "#f1f5f9" : "transparent"),
                              fontWeight: date && (isSelected(date) || isInRange(date)) ? 700 : 400,
                              transition: "all 0.2s ease",
                              borderRadius: 2,
                            }}
                          >
                            {date?.getDate()}
                          </div>
                        ))}
                      </div>

                      <button onClick={() => setShowCalendar(false)}
                        style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Guest counter */}
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: 12 }}>Guests</span>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16,
                    border: "1px solid #e2e8f0", padding: "12px 20px", background: "#f8fafc"
                  }}>
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{
                      width: 40, height: 40, background: "white", border: "1px solid #e2e8f0",
                      cursor: "pointer", fontSize: 20, color: "#0f172a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>−</button>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                      <Users size={16} color="#b2a384" />
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                    <button onClick={() => setGuests(Math.min(12, guests + 1))} style={{
                      width: 40, height: 40, background: "white", border: "1px solid #e2e8f0",
                      cursor: "pointer", fontSize: 20, color: "#0f172a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>+</button>
                  </div>
                </div>

                <Link href={`/book${params}`} className="btn btn-dark" style={{ padding: "22px", fontSize: 14 }}>
                  Confirm & Inquire
                </Link>

                <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8" }}>
                  Best price guaranteed when booking directly with our concierge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
