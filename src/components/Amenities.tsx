"use client";
import { Waves, Wifi, ChefHat, Car, Sun, Camera, Utensils, Shield, Music, Sunset } from "lucide-react";

const cols = [
  {
    heading: "Coastal Living",
    items: [
      { icon: Waves, label: "Direct Beach Access" },
      { icon: Sun, label: "Private Infinity Pool" },
      { icon: Sunset, label: "Ocean View Terrace" },
      { icon: Utensils, label: "Outdoor Dining Area" },
    ],
  },
  {
    heading: "Comforts",
    items: [
      { icon: ChefHat, label: "Gourmet Kitchen" },
      { icon: Wifi, label: "Starlink High-Speed WiFi" },
      { icon: Music, label: "Surround Sound System" },
      { icon: Shield, label: "Smart Home Security" },
    ],
  },
  {
    heading: "Experience",
    items: [
      { icon: ChefHat, label: "Private Chef (Request)" },
      { icon: Car, label: "Chauffeur Service" },
      { icon: Sunset, label: "Yoga & Wellness Deck" },
      { icon: Camera, label: "Curated Photo Ops" },
    ],
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: 100, alignItems: "start" }}>
          {/* Left: heading */}
          <div>
            <p className="label-tag">Curated Amenities</p>
            <h2 className="heading-lg" style={{ marginBottom: 32 }}>
              Designed for <i style={{ color: "#b2a384" }}>Perfection</i>
            </h2>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.8, fontWeight: 300 }}>
              Every element of Seaside Stories has been thoughtfully curated to ensure your stay is as seamless as it is beautiful. From the gourmet kitchen to the private wellness deck, every detail matters.
            </p>
          </div>

          {/* Right: amenities grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, paddingTop: 12 }}>
            {cols.map((col) => (
              <div key={col.heading}>
                <p style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#0f172a",
                  marginBottom: 32, paddingBottom: 16,
                  borderBottom: "1px solid #e2e8f0",
                }}>
                  {col.heading}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {col.items.map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 0,
                        background: "#f8fafc", 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, border: "1px solid #f1f5f9"
                      }}>
                        <Icon size={18} color="#b2a384" strokeWidth={1.5} />
                      </div>
                      <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500, letterSpacing: "0.02em" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #amenities .container > div { grid-template-columns: 1fr !important; gap: 64px !important; }
          #amenities .container > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          #amenities .container > div > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
