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
    <footer style={{ background: "#0f172a", color: "white", padding: "100px 0 40px" }}>
      <div className="container">
        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 64, marginBottom: 80, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 0, border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Image src="/logo.svg" alt="Seaside Stories" width={28} height={28}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, letterSpacing: "0.02em" }}>Seaside Stories</div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#b2a384", textTransform: "uppercase", fontWeight: 700 }}>Kerala, India</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, maxWidth: 300, fontWeight: 300 }}>
              An exclusive beach retreat where luxury meets the rhythm of the ocean. Experience Kerala&apos;s most intimate villa stay.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>
                {col.heading}
              </p>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} style={{
                  display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none",
                  fontSize: 14, marginBottom: 16, transition: "all 0.3s ease", fontWeight: 300
                }}
                className="footer-link"
                >{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 300 }}>
            © {year} Seaside Stories Villa. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 32 }}>
             <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, display: "flex", alignItems: "center", gap: 8, fontWeight: 300 }}>
              Made with <Heart size={12} color="#b2a384" strokeWidth={1} /> in Kerala
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #b2a384 !important; transform: translateX(4px); }
        @media (max-width: 1024px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
