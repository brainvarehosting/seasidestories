"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Calendar, CheckCircle, Clock, XCircle, TrendingUp, Users } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  nights: number;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => (window.location.href = "/admin"))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    revenue: bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + b.totalPrice, 0),
    totalGuests: bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + b.guests, 0),
  };

  const recent = bookings.slice(0, 5);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { pending: "badge-pending", confirmed: "badge-confirmed", rejected: "badge-rejected", cancelled: "badge-cancelled" };
    return <span className={map[status] || "badge-pending"}>{status}</span>;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4, letterSpacing: "0.05em" }}>DASHBOARD</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>Welcome back — here&apos;s your overview</p>
        </div>

        {loading ? (
          <p style={{ color: "#92a8b4" }}>Loading...</p>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { icon: Calendar, label: "Total Bookings", value: stats.total, color: "#2d4a54" },
                { icon: Clock, label: "Pending", value: stats.pending, color: "#d97706" },
                { icon: CheckCircle, label: "Confirmed", value: stats.confirmed, color: "#059669" },
                { icon: XCircle, label: "Rejected", value: stats.rejected, color: "#dc2626" },
                { icon: TrendingUp, label: "Revenue (₹)", value: `₹${stats.revenue.toLocaleString()}`, color: "#c278d4" },
                { icon: Users, label: "Total Guests", value: stats.totalGuests, color: "#536b76" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
                  <div style={{ width: 44, height: 44, background: `${color}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 13, color: "#92a8b4", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1.5px solid #e7eef0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", letterSpacing: "0.05em" }}>RECENT BOOKINGS</h2>
                <a href="/admin/bookings" style={{ color: "#c278d4", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View All →</a>
              </div>
              {recent.length === 0 ? (
                <p style={{ padding: 40, textAlign: "center", color: "#92a8b4" }}>No bookings yet. Share your link to get started!</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f7f7e7" }}>
                        {["Guest", "Dates", "Nights", "Amount", "Status", "Date"].map((h) => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((b) => (
                        <tr key={b.id} style={{ borderTop: "1px solid #e7eef0" }}>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "#2d4a54" }}>{b.guestName}</div>
                            <div style={{ fontSize: 12, color: "#92a8b4" }}>{b.guestEmail}</div>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: 13, color: "#536b76" }}>
                            {b.checkIn} → {b.checkOut}
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: 14, color: "#2d4a54", fontWeight: 600 }}>{b.nights}</td>
                          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: "#2d4a54" }}>₹{b.totalPrice.toLocaleString()}</td>
                          <td style={{ padding: "14px 16px" }}>{statusBadge(b.status)}</td>
                          <td style={{ padding: "14px 16px", fontSize: 12, color: "#92a8b4" }}>
                            {new Date(b.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
