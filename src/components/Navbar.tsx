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
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    height: 72,
    display: "flex", alignItems: "center",
    transition: "background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
    background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
  };

  const linkColor = scrolled ? "#141414" : "rgba(255,255,255,0.92)";

  return (
    <>
      <nav style={navStyle}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38,
              background: scrolled ? "#2d4a54" : "rgba(255,255,255,0.15)",
              borderRadius: "50%",
              border: scrolled ? "none" : "1.5px solid rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.4s ease", flexShrink: 0, overflow: "hidden",
              backdropFilter: scrolled ? "none" : "blur(4px)",
            }}>
              <Image
                src="/logo.svg"
                alt="Seaside Stories"
                width={28}
                height={28}
                style={{ color: "white", filter: scrolled ? "invert(1)" : "brightness(0) invert(1)" }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 17, lineHeight: 1, letterSpacing: "0.06em",
                color: scrolled ? "#141414" : "white",
                transition: "color 0.4s",
              }}>SEASIDE STORIES</div>
              <div style={{
                fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                color: scrolled ? "#717171" : "rgba(255,255,255,0.65)",
                transition: "color 0.4s", marginTop: 1,
              }}>Kerala, India</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{
                color: linkColor, textDecoration: "none",
                fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 8,
                transition: "all 0.2s", letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >{l.label}</Link>
            ))}
            <Link href="/book" className="btn btn-white" style={{
              marginLeft: 12, fontSize: 13, padding: "10px 22px", borderRadius: 10,
              background: scrolled ? "#141414" : "white",
              color: scrolled ? "white" : "#141414",
              boxShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.15)",
              transition: "all 0.4s",
            }}>
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", color: linkColor, cursor: "pointer", padding: 8, display: "none" }}
            className="md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 99,
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid #e8e6e1", padding: "16px 20px 24px",
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", color: "#141414", textDecoration: "none",
              padding: "13px 0", fontSize: 16, fontWeight: 500,
              borderBottom: "1px solid #f3f2ef",
            }}>{l.label}</Link>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)} className="btn btn-dark" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
            Book Now
          </Link>
        </div>
      )}
    </>
  );
}
