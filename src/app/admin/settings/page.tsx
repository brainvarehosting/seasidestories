"use client";
import AdminSidebar from "@/components/admin/Sidebar";

export default function SettingsPage() {
  const settings = [
    { label: "Villa Name", value: "Seaside Stories" },
    { label: "Contact Phone", value: "+91 98765 43210" },
    { label: "Contact Email", value: "hello@seasidestories.in" },
    { label: "WhatsApp", value: "+91 98765 43210" },
    { label: "Instagram", value: "@seasidestories" },
    { label: "Address", value: "Kerala, India" },
    { label: "Check-in Time", value: "2:00 PM" },
    { label: "Check-out Time", value: "11:00 AM" },
    { label: "Max Guests", value: "10" },
    { label: "Admin Email", value: "care@brainvare.com" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4, letterSpacing: "0.05em" }}>SETTINGS</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>Villa configuration</p>
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", maxWidth: 600 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 24 }}>VILLA DETAILS</h2>
          {settings.map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #e7eef0" }}>
              <span style={{ fontSize: 14, color: "#536b76" }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#2d4a54" }}>{value}</span>
            </div>
          ))}
          <p style={{ color: "#92a8b4", fontSize: 13, marginTop: 20, lineHeight: 1.7 }}>
            To update settings, edit the configuration files and redeploy the website.
          </p>
        </div>
      </main>
    </div>
  );
}
