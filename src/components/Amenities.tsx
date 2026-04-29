"use client";
import { Waves, Wifi, ChefHat, Car, Sun, Camera, Utensils, Shield, Music, Sunset } from "lucide-react";

const cols = [
  {
    heading: "Outdoors",
    items: [
      { icon: Waves, label: "Private Beach Access" },
      { icon: Sun, label: "Infinity Pool" },
      { icon: Utensils, label: "Barbecue Area" },
      { icon: Sunset, label: "Sunset Terrace" },
    ],
  },
  {
    heading: "Indoors",
    items: [
      { icon: ChefHat, label: "Fully Equipped Kitchen" },
      { icon: Music, label: "Entertainment System" },
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Camera, label: "Photography Spots" },
    ],
  },
  {
    heading: "Services",
    items: [
      { icon: Shield, label: "24/7 Security" },
      { icon: Car, label: "Private Parking" },
    ],
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="section" style={{ background: "#fff" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          {/* Left: heading */}
          <div>
            <p className="label-tag">Villa Features</p>
            <div className="divider" />
            <h2 className="heading-lg" style={{ marginBottom: 24 }}>
              WHAT&apos;S<br />INCLUDED
            </h2>
            <p style={{ color: "#717171", fontSize: 15, lineHeight: 1.8 }}>
              Every amenity thoughtfully curated so you can focus on what matters — pure, uninterrupted relaxation.
            </p>
          </div>

          {/* Right: amenities grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, paddingTop: 8 }}>
            {cols.map((col) => (
              <div key={col.heading}>
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#141414",
                  marginBottom: 24, paddingBottom: 12,
                  borderBottom: "1.5px solid #141414",
                }}>
                  {col.heading}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {col.items.map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "#f9f8f5", border: "1px solid #e8e6e1",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={16} color="#2d4a54" />
                      </div>
                      <span style={{ fontSize: 14, color: "#141414", fontWeight: 500 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #amenities .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #amenities .container > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #amenities .container > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
