"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save } from "lucide-react";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setSettings)
      .catch(() => (window.location.href = "/admin"))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: "villaName", label: "Villa Name" },
    { key: "contactPhone", label: "Contact Phone" },
    { key: "contactEmail", label: "Contact Email" },
    { key: "whatsapp", label: "WhatsApp Number" },
    { key: "instagram", label: "Instagram URL" },
    { key: "facebook", label: "Facebook URL" },
    { key: "address", label: "Address" },
    { key: "checkInTime", label: "Check-in Time" },
    { key: "checkOutTime", label: "Check-out Time" },
    { key: "maxGuests", label: "Max Guests" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4 }}>SETTINGS</h1>
            <p style={{ color: "#92a8b4", fontSize: 14 }}>Manage villa information and contact details</p>
          </div>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, border: "none", fontSize: 14, cursor: "pointer" }}>
            <Save size={16} />
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {loading ? (
          <p style={{ color: "#92a8b4" }}>Loading...</p>
        ) : (
          <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", maxWidth: 640 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#536b76", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="input-field"
                    placeholder={label}
                  />
                </div>
              ))}

              <div style={{ borderTop: "1.5px solid #e7eef0", paddingTop: 24 }}>
                <h3 style={{ fontWeight: 700, color: "#2d4a54", fontSize: 15, marginBottom: 4 }}>Admin Email</h3>
                <p style={{ color: "#92a8b4", fontSize: 13, marginBottom: 12 }}>Used for admin login. Edit data/settings.json directly to change.</p>
                <input type="email" value={settings.adminEmail || ""} disabled className="input-field" style={{ background: "#f7f7e7", color: "#92a8b4" }} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
