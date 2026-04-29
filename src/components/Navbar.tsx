"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/#about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#amenities", label: "Amenities" },
    { href: "/#location", label: "Location" },
  ];

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    height: 80,
    display: "flex", alignItems: "center",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.05)" : "none",
  };

  const linkColor = scrolled ? "#0f172a" : "rgba(255,255,255,0.95)";

  return (
    <>
      <nav style={navStyle}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
            <div style={{
              width: 44, height: 44, position: "relative",
              background: scrolled ? "#0f172a" : "transparent",
              border: scrolled ? "none" : "1px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.4s ease", flexShrink: 0,
            }}>
              <Image
                src="/logo.svg"
                alt="Seaside Stories"
                width={28}
                height={28}
                style={{ filter: scrolled ? "brightness(0) invert(1)" : "brightness(0) invert(1)" }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, lineHeight: 1, letterSpacing: "0.01em",
                color: scrolled ? "#0f172a" : "white",
                transition: "color 0.4s",
              }}>Seaside Stories</div>
              <div style={{
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: scrolled ? "#b2a384" : "rgba(255,255,255,0.7)",
                transition: "color 0.4s", marginTop: 4, fontWeight: 700
              }}>Kerala, India</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{
                color: linkColor, textDecoration: "none",
                fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 0,
                transition: "all 0.3s", letterSpacing: "0.1em", textTransform: "uppercase"
              }}
              className="nav-link"
              >{l.label}</Link>
            ))}
            <Link href="/book" className={scrolled ? "btn btn-dark" : "btn btn-white"} style={{
              marginLeft: 24, fontSize: 13, padding: "14px 32px", borderRadius: 4,
            }}>
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ 
              background: "none", 
              border: "none", 
              color: linkColor, 
              cursor: "pointer", 
              padding: 8,
              display: "none"
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 80, left: 0, right: 0, zIndex: 999,
          background: "#ffffff", padding: "40px 24px",
          display: "flex", flexDirection: "column", gap: 8,
          boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
          animation: "slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", color: "#0f172a", textDecoration: "none",
              padding: "20px 0", fontSize: 13, fontWeight: 700,
              borderBottom: "1px solid #f1f5f9", letterSpacing: "0.15em", textTransform: "uppercase"
            }}>{l.label}</Link>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)} className="btn btn-dark" style={{ marginTop: 32, width: "100%", justifyContent: "center", padding: "20px" }}>
            Book Now
          </Link>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: #b2a384 !important; opacity: 0.8; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hidden.md\\:flex { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
