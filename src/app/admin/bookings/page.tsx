"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { CheckCircle, XCircle, Trash2, MessageSquare, Search } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  nights: number;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
  createdAt: string;
  notes?: string;
  message?: string;
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [note, setNote] = useState("");

  const load = () => {
    fetch("/api/bookings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => (window.location.href = "/admin"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
    if (selected?.id === id) setSelected((s) => s ? { ...s, status: status as Booking["status"] } : null);
  };

  const saveNote = async () => {
    if (!selected) return;
    await fetch(`/api/bookings/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: note }),
    });
    load();
    setSelected((s) => s ? { ...s, notes: note } : null);
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    load();
    setSelected(null);
  };

  const filtered = bookings.filter((b) => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search && !b.guestName.toLowerCase().includes(search.toLowerCase()) && !b.guestEmail.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { pending: "badge-pending", confirmed: "badge-confirmed", rejected: "badge-rejected", cancelled: "badge-cancelled" };
    return <span className={map[status] || "badge-pending"}>{status}</span>;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4 }}>BOOKINGS</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>{bookings.length} total bookings</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#92a8b4" }} />
            <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field" style={{ paddingLeft: 40 }} />
          </div>
          {["all", "pending", "confirmed", "rejected", "cancelled"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid", borderColor: filter === f ? "#2d4a54" : "#dbe1e4", background: filter === f ? "#2d4a54" : "white", color: filter === f ? "white" : "#536b76", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 20 }}>
          {/* Table */}
          <div style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", overflow: "hidden" }}>
            {loading ? (
              <p style={{ padding: 40, textAlign: "center", color: "#92a8b4" }}>Loading...</p>
            ) : filtered.length === 0 ? (
              <p style={{ padding: 40, textAlign: "center", color: "#92a8b4" }}>No bookings found</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f7f7e7" }}>
                      {["Guest", "Dates", "Nights / Guests", "Amount", "Status", "Actions"].map((h) => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => { setSelected(b); setNote(b.notes || ""); }}
                        style={{ borderTop: "1px solid #e7eef0", cursor: "pointer", background: selected?.id === b.id ? "#e7eef0" : "white", transition: "background 0.15s" }}
                      >
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#2d4a54" }}>{b.guestName}</div>
                          <div style={{ fontSize: 12, color: "#92a8b4" }}>{b.guestEmail}</div>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#536b76" }}>
                          {b.checkIn}<br />{b.checkOut}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#536b76" }}>
                          {b.nights} nights · {b.guests} guests
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 700, color: "#2d4a54" }}>₹{b.totalPrice.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>{statusBadge(b.status)}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {b.status === "pending" && (
                              <>
                                <button onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "confirmed"); }} title="Confirm" style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "#d1fae5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <CheckCircle size={14} color="#065f46" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "rejected"); }} title="Reject" style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "#fee2e2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <XCircle size={14} color="#991b1b" />
                                </button>
                              </>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); deleteBooking(b.id); }} title="Delete" style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "#f7f7e7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Trash2 size={14} color="#dc2626" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", padding: 24, height: "fit-content" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#2d4a54" }}>BOOKING DETAIL</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#92a8b4" }}>×</button>
              </div>

              {[
                { label: "Name", value: selected.guestName },
                { label: "Email", value: selected.guestEmail },
                { label: "Phone", value: selected.guestPhone },
                { label: "Check-in", value: selected.checkIn },
                { label: "Check-out", value: selected.checkOut },
                { label: "Nights", value: selected.nights },
                { label: "Guests", value: selected.guests },
                { label: "Total", value: `₹${selected.totalPrice.toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e7eef0" }}>
                  <span style={{ fontSize: 12, color: "#92a8b4", fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#2d4a54", fontWeight: 600 }}>{value}</span>
                </div>
              ))}

              {selected.message && (
                <div style={{ marginTop: 16, padding: 12, background: "#f7f7e7", borderRadius: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                    <MessageSquare size={12} /> Guest Message
                  </div>
                  <p style={{ fontSize: 13, color: "#536b76", lineHeight: 1.6, margin: 0 }}>{selected.message}</p>
                </div>
              )}

              {/* Status Actions */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Update Status</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["pending", "confirmed", "rejected", "cancelled"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid", borderColor: selected.status === s ? "#2d4a54" : "#dbe1e4", background: selected.status === s ? "#2d4a54" : "white", color: selected.status === s ? "white" : "#536b76", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Internal Notes</p>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="input-field" style={{ resize: "vertical" }} placeholder="Add internal notes..." />
                <button onClick={saveNote} className="btn-ocean" style={{ marginTop: 8, fontSize: 13, padding: "8px 20px", border: "none" }}>Save Note</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
