"use client";
import AdminSidebar from "@/components/admin/Sidebar";

export default function PricingPage() {
  const pricing = [
    { label: "Base Rate", value: "₹18,000 / night" },
    { label: "Cleaning Fee", value: "₹2,000 (one-time)" },
    { label: "Security Deposit", value: "₹5,000 (refundable)" },
    { label: "Minimum Stay", value: "2 nights" },
    { label: "Max Guests", value: "10" },
    { label: "Currency", value: "INR (₹)" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4, letterSpacing: "0.05em" }}>PRICING</h1>
          <p style={{ color: "#92a8b4", fontSize: 14 }}>Current pricing configuration</p>
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", maxWidth: 600 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 24 }}>CURRENT RATES</h2>
          {pricing.map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #e7eef0" }}>
              <span style={{ fontSize: 14, color: "#536b76" }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#2d4a54" }}>{value}</span>
            </div>
          ))}
          <p style={{ color: "#92a8b4", fontSize: 13, marginTop: 20, lineHeight: 1.7 }}>
            To update pricing, edit the booking form constants in <code style={{ background: "#f3f2ef", padding: "2px 6px", borderRadius: 4 }}>src/app/book/page.tsx</code> and redeploy.
          </p>
        </div>
      </main>
    </div>
  );
}
