"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", background: "#0f172a" }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.6,
        }}
      >
        <source src="/video/seaside-stories.mp4" type="video/mp4" />
      </video>

      {/* Sophisticated Gradient Overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at center, transparent 0%, rgba(15,23,42,0.4) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, transparent 40%, rgba(15,23,42,0.8) 100%)",
      }} />

      {/* Content Container */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px",
        paddingBottom: 120,
      }}>
        {/* Subtle Location Tag */}
        <div className="reveal" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          color: "#b2a384", marginBottom: 32, letterSpacing: "0.25em",
          fontSize: 12, fontWeight: 600, textTransform: "uppercase"
        }}>
          Kerala&apos;s Exclusive Beach Retreat
        </div>

        {/* Hero Headline — Playfair Display */}
        <h1 className="heading-xl" style={{
          color: "white", marginBottom: 32, maxWidth: 1000,
          letterSpacing: "-0.01em", textShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}>
          Where Every Wave<br />
          <i style={{ color: "#b2a384" }}>Tells a Story</i>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.9)", fontSize: "clamp(18px, 2.5vw, 22px)",
          lineHeight: 1.6, maxWidth: 640, marginBottom: 48, fontWeight: 300,
          fontFamily: "'Inter', sans-serif",
        }}>
          Immerse yourself in the ultimate beachfront luxury. A private sanctuary designed for the discerning traveler.
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/book" className="btn btn-accent" style={{ padding: "18px 48px" }}>
            Check Availability
          </Link>
          <Link href="/gallery" className="btn" style={{ 
            background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(10px)"
          }}>
            Explore the Villa
          </Link>
        </div>
      </div>

      {/* Refined Search Bar */}
      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          background: "white", borderRadius: "8px",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          padding: 8
        }}>
          <div style={{ padding: "12px 24px" }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Check In</label>
            <input type="date" style={{ border: "none", outline: "none", fontSize: 15, width: "100%", color: "#0f172a", background: "transparent" }} />
          </div>
          <div style={{ width: 1, background: "#e2e8f0", margin: "12px 0" }} />
          <div style={{ padding: "12px 24px" }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Check Out</label>
            <input type="date" style={{ border: "none", outline: "none", fontSize: 15, width: "100%", color: "#0f172a", background: "transparent" }} />
          </div>
          <div style={{ width: 1, background: "#e2e8f0", margin: "12px 0" }} />
          <div style={{ padding: "12px 24px" }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Guests</label>
            <select style={{ border: "none", outline: "none", fontSize: 15, width: "100%", color: "#0f172a", background: "transparent", cursor: "pointer" }}>
              <option>2 Adults</option>
              <option>4 Adults</option>
              <option>Full Villa (10+)</option>
            </select>
          </div>
          <button style={{
            background: "#0f172a", color: "white", border: "none", borderRadius: "4px",
            padding: "0 40px", fontSize: 14, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.2s"
          }}>Search</button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 40, left: 40,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", zIndex: 10
      }}>
        <span style={{ writingMode: "vertical-rl", marginBottom: 12 }}>Explore</span>
        <ChevronDown size={14} style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .heading-xl { font-size: 48px !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr auto"] { 
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          div[style*="width: 1"] { display: none !important; }
          button[style*="background: #0f172a"] { padding: 16px !important; margin-top: 8px !important; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
