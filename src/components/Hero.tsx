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
    <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", background: "#2d4a54" }}>
      {/* Video */}
      <video ref={videoRef} autoPlay muted loop playsInline style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: 0.7,
      }}>
        <source src="/video/seaside-stories.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.1) 40%, rgba(20,20,20,0.6) 75%, rgba(20,20,20,0.85) 100%)",
      }} />

      {/* Center content */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px",
        paddingBottom: 160,
      }}>
        {/* Logo mark */}
        <div style={{
          width: 80, height: 80, marginBottom: 24,
          border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)",
        }}>
          <Image src="/logo.svg" alt="Seaside Stories" width={56} height={56}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.95 }}
          />
        </div>

        {/* Location tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.9)", padding: "5px 14px", borderRadius: 20,
          fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: 20,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c278d4", display: "inline-block" }} />
          Kerala, India
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 12vw, 140px)",
          lineHeight: 0.92, letterSpacing: "0.01em",
          color: "white", marginBottom: 20,
        }}>
          Seaside<br />
          <span style={{ color: "#c278d4" }}>Stories</span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.8)", fontSize: "clamp(15px, 2vw, 18px)",
          lineHeight: 1.7, maxWidth: 460, marginBottom: 36, fontWeight: 300,
        }}>
          Write your own chapter of relaxation, discovery, and connection on Kerala&apos;s pristine coastline.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/book" className="btn btn-white" style={{ padding: "14px 32px", fontSize: 14, borderRadius: 12 }}>
            Book Your Stay
          </Link>
          <Link href="/gallery" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500,
            padding: "14px 24px", borderRadius: 12,
            border: "1.5px solid rgba(255,255,255,0.3)", textDecoration: "none",
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"}
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* Bottom booking bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 24px 32px",
      }}>
        <div style={{
          maxWidth: 880, margin: "0 auto",
          background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 8px 48px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
        }}>
          <HeroField label="Check in" placeholder="Add date" type="date" />
          <div style={{ width: 1, background: "#e8e6e1", margin: "16px 0" }} />
          <HeroField label="Check out" placeholder="Add date" type="date" />
          <div style={{ width: 1, background: "#e8e6e1", margin: "16px 0" }} />
          <HeroField label="Guests" placeholder="1 guest" type="number" />
          <div style={{ display: "flex", alignItems: "center", padding: "12px 16px" }}>
            <Link href="/book" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "#c278d4", color: "white", border: "none",
              borderRadius: 14, padding: "14px 22px", cursor: "pointer",
              fontSize: 13, fontWeight: 600, gap: 6, textDecoration: "none",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#9b4ab0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#c278d4"; }}
            >
              Search →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 120, right: 32,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <ChevronDown size={14} style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @media (max-width: 768px) {
          .hero-bar { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function HeroField({ label, placeholder, type }: { label: string; placeholder: string; type: string }) {
  return (
    <div style={{ padding: "16px 20px", cursor: "pointer" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#141414", marginBottom: 4 }}>
        {label}
      </div>
      <input
        type={type === "number" ? "number" : "date"}
        placeholder={placeholder}
        min={type === "number" ? "1" : undefined}
        max={type === "number" ? "10" : undefined}
        defaultValue={type === "number" ? "2" : undefined}
        style={{
          border: "none", outline: "none", fontSize: 14, color: "#717171",
          background: "transparent", width: "100%", fontFamily: "inherit", cursor: "pointer",
        }}
      />
    </div>
  );
}
