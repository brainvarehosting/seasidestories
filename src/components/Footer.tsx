"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    { heading: "Explore", links: [{ label: "About", href: "/#about" }, { label: "Gallery", href: "/gallery" }, { label: "Amenities", href: "/#amenities" }, { label: "Location", href: "/#location" }] },
    { heading: "Stay", links: [{ label: "Book Now", href: "/book" }, { label: "Check Availability", href: "/book" }, { label: "View Gallery", href: "/gallery" }] },
    { heading: "Contact", links: [{ label: "hello@seasidestories.in", href: "mailto:hello@seasidestories.in" }, { label: "+91 98765 43210", href: "tel:+919876543210" }, { label: "WhatsApp", href: "https://wa.me/919876543210" }] },
  ];

  return (
    <footer style={{ background: "#141414", color: "white", padding: "64px 0 32px" }}>
      <div className="container">
        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: 48, marginBottom: 56, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Image src="/logo.svg" alt="Seaside Stories" width={24} height={24}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.06em" }}>SEASIDE STORIES</div>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Kerala, India</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.8, maxWidth: 240 }}>
              Kerala&apos;s most intimate seaside villa experience. Write your own chapter.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
                {col.heading}
              </h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} style={{
                  display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none",
                  fontSize: 14, marginBottom: 12, transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "white"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
                >{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            © {year} Seaside Stories. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
            Made with <Heart size={11} color="#c278d4" fill="#c278d4" /> in Kerala
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
