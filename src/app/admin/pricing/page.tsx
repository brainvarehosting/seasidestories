"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Plus, Trash2, Save, Ban } from "lucide-react";
interface PricingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
}

interface PricingConfig {
  defaultPricePerNight: number;
  minimumNights: number;
  cleaningFee: number;
  securityDeposit: number;
  currency: string;
  periods: PricingPeriod[];
  blockedDates: string[];
}

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function PricingAdmin() {
  const [config, setConfig] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newBlockDate, setNewBlockDate] = useState("");

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then(setConfig)
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!config) return;
    setSaving(true);
    await fetch("/api/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addPeriod = () => {
    if (!config) return;
    setConfig({
      ...config,
      periods: [...config.periods, { id: genId(), name: "New Period", startDate: "", endDate: "", pricePerNight: config.defaultPricePerNight }],
    });
  };

  const updatePeriod = (id: string, updates: Partial<PricingPeriod>) => {
    if (!config) return;
    setConfig({
      ...config,
      periods: config.periods.map((p) => p.id === id ? { ...p, ...updates } : p),
    });
  };

  const deletePeriod = (id: string) => {
    if (!config) return;
    setConfig({ ...config, periods: config.periods.filter((p) => p.id !== id) });
  };

  const addBlockDate = () => {
    if (!config || !newBlockDate) return;
    if (config.blockedDates.includes(newBlockDate)) return;
    setConfig({ ...config, blockedDates: [...config.blockedDates, newBlockDate].sort() });
    setNewBlockDate("");
  };

  const removeBlockDate = (date: string) => {
    if (!config) return;
    setConfig({ ...config, blockedDates: config.blockedDates.filter((d) => d !== date) });
  };

  if (loading || !config) return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32 }}><p style={{ color: "#92a8b4" }}>Loading...</p></main>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7e7" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#2d4a54", marginBottom: 4 }}>PRICING</h1>
            <p style={{ color: "#92a8b4", fontSize: 14 }}>Manage nightly rates and availability</p>
          </div>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, border: "none", fontSize: 14, cursor: "pointer" }}>
            <Save size={16} />
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-cols-1 md:grid-cols-2">
          {/* Base Settings */}
          <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 24 }}>BASE SETTINGS</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Default Price / Night (₹)", key: "defaultPricePerNight" },
                { label: "Minimum Nights", key: "minimumNights" },
                { label: "Cleaning Fee (₹)", key: "cleaningFee" },
                { label: "Security Deposit (₹)", key: "securityDeposit" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#536b76", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
                  <input
                    type="number"
                    value={(config as unknown as Record<string, number>)[key]}
                    onChange={(e) => setConfig({ ...config, [key]: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Pricing */}
          <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 8px rgba(45,74,84,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54" }}>SEASONAL RATES</h2>
              <button onClick={addPeriod} style={{ display: "flex", alignItems: "center", gap: 6, background: "#e7eef0", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#2d4a54" }}>
                <Plus size={14} /> Add Period
              </button>
            </div>

            {config.periods.length === 0 ? (
              <p style={{ color: "#92a8b4", textAlign: "center", padding: "24px 0", fontSize: 14 }}>No seasonal rates. Default price applies all year.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {config.periods.map((period) => (
                  <div key={period.id} style={{ border: "1.5px solid #e7eef0", borderRadius: 16, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <input value={period.name} onChange={(e) => updatePeriod(period.id, { name: e.target.value })} className="input-field" style={{ fontWeight: 700, maxWidth: "60%" }} placeholder="Period name" />
                      <button onClick={() => deletePeriod(period.id)} style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <Trash2 size={14} color="#dc2626" />
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <div>
                        <label style={{ fontSize: 10, fontWeight: 700, color: "#92a8b4", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>From</label>
                        <input type="date" value={period.startDate} onChange={(e) => updatePeriod(period.id, { startDate: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label style={{ fontSize: 10, fontWeight: 700, color: "#92a8b4", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>To</label>
                        <input type="date" value={period.endDate} onChange={(e) => updatePeriod(period.id, { endDate: e.target.value })} className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 10, fontWeight: 700, color: "#92a8b4", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>Price / Night (₹)</label>
                      <input type="number" value={period.pricePerNight} onChange={(e) => updatePeriod(period.id, { pricePerNight: parseFloat(e.target.value) })} className="input-field" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blocked Dates */}
          <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 8px rgba(45,74,84,0.08)", gridColumn: "1 / -1" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#2d4a54", marginBottom: 20 }}>BLOCKED DATES</h2>
            <p style={{ color: "#92a8b4", fontSize: 13, marginBottom: 20 }}>Block specific dates to mark them as unavailable (maintenance, personal use, etc.)</p>

            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input type="date" value={newBlockDate} onChange={(e) => setNewBlockDate(e.target.value)} className="input-field" style={{ maxWidth: 200 }} />
              <button onClick={addBlockDate} style={{ display: "flex", alignItems: "center", gap: 6, background: "#2d4a54", color: "white", border: "none", borderRadius: 12, padding: "0 20px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                <Ban size={14} /> Block Date
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {config.blockedDates.length === 0 ? (
                <p style={{ color: "#92a8b4", fontSize: 14 }}>No blocked dates</p>
              ) : config.blockedDates.map((date) => (
                <div key={date} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fee2e2", borderRadius: 8, padding: "6px 12px" }}>
                  <span style={{ fontSize: 13, color: "#991b1b", fontWeight: 600 }}>{date}</span>
                  <button onClick={() => removeBlockDate(date)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", lineHeight: 1, padding: 0, fontSize: 16 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
