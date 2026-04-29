"use client";
import AdminSidebar from "@/components/admin/Sidebar";
import { Calendar, MessageSquare, ExternalLink } from "lucide-react";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4, letterSpacing: "0.05em" }}>DASHBOARD</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>Welcome to Seaside Stories management</p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
            <div style={{ width: 52, height: 52, background: "#2d4a5415", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Calendar size={24} color="#2d4a54" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 8 }}>BOOKINGS</h2>
            <p style={{ color: "#92a8b4", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              All booking requests are received via WhatsApp. Check your WhatsApp business account for new requests.
            </p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#25D366", color: "white", fontSize: 13 }}>
              Open WhatsApp →
            </a>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
            <div style={{ width: 52, height: 52, background: "#c278d415", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <MessageSquare size={24} color="#c278d4" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 8 }}>GUEST MESSAGES</h2>
            <p style={{ color: "#92a8b4", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Respond to guest inquiries and special requests directly through WhatsApp.
            </p>
            <a href="mailto:hello@seasidestories.in" className="btn" style={{ background: "#2d4a54", color: "white", fontSize: 13 }}>
              Check Email →
            </a>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
            <div style={{ width: 52, height: 52, background: "#536b7615", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <ExternalLink size={24} color="#536b76" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 8 }}>WEBSITE</h2>
            <p style={{ color: "#92a8b4", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              View the live website and check how it looks to guests.
            </p>
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#141414", color: "white", fontSize: 13 }}>
              View Website →
            </a>
          </div>
        </div>

        {/* Quick info */}
        <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 16 }}>QUICK REFERENCE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { label: "Base Rate", value: "₹18,000/night" },
              { label: "Cleaning Fee", value: "₹2,000" },
              { label: "Security Deposit", value: "₹5,000" },
              { label: "Min. Stay", value: "2 nights" },
              { label: "Check-in", value: "2:00 PM" },
              { label: "Check-out", value: "11:00 AM" },
              { label: "Max Guests", value: "10" },
              { label: "WhatsApp", value: "+91 98765 43210" },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "16px 0", borderBottom: "1px solid #e7eef0" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#92a8b4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#2d4a54" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
