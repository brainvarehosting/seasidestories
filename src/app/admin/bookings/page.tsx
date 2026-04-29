"use client";
import AdminSidebar from "@/components/admin/Sidebar";
import { MessageSquare } from "lucide-react";

export default function BookingsPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4, letterSpacing: "0.05em" }}>BOOKINGS</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>Manage your booking requests</p>
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: 48, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#25D36615", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <MessageSquare size={28} color="#25D366" />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#2d4a54", marginBottom: 12 }}>WHATSAPP BOOKINGS</h2>
          <p style={{ color: "#92a8b4", fontSize: 15, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 28px" }}>
            All booking requests from the website are sent directly to your WhatsApp business number. Open WhatsApp to view and respond to booking requests.
          </p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#25D366", color: "white", fontSize: 14, padding: "14px 28px" }}>
            Open WhatsApp →
          </a>
        </div>
      </main>
    </div>
  );
}
