"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { value: "10+", label: "Guests capacity" },
  { value: "4.9", label: "★ Average rating" },
  { value: "100m", label: "To the beach" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section" style={{ background: "#fff" }} ref={ref}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          {/* Images column */}
          <div className="reveal" style={{ position: "relative" }}>
            {/* Main image */}
            <div style={{
              borderRadius: 24, overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.12)",
            }}>
              <Image
                src="/photos/0J6A0270.JPG"
                alt="Seaside Stories villa"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating image */}
            <div style={{
              position: "absolute", bottom: -32, right: -32,
              width: 200, height: 240,
              borderRadius: 20, overflow: "hidden",
              border: "4px solid #fff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}>
              <Image
                src="/photos/0J6A0284.JPG"
                alt="Villa detail"
                fill
                style={{ objectFit: "cover" }}
                sizes="200px"
              />
            </div>

            {/* Stat badge */}
            <div style={{
              position: "absolute", top: 32, left: -24,
              background: "#2d4a54", color: "white",
              borderRadius: 16, padding: "20px 24px",
              boxShadow: "0 8px 32px rgba(45,74,84,0.35)",
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, lineHeight: 1 }}>100m</div>
              <div style={{ fontSize: 12, color: "#92a8b4", letterSpacing: "0.06em", textTransform: "uppercase" }}>from the beach</div>
            </div>
          </div>

          {/* Text column */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="label-tag">About Seaside Stories</p>
            <div className="divider" />
            <h2 className="heading-lg" style={{ marginBottom: 24 }}>
              WHERE THE SEA<br />TELLS YOUR STORY
            </h2>
            <p style={{ color: "#717171", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              Nestled along Kerala&apos;s pristine coastline, Seaside Stories is more than a villa — it&apos;s a sanctuary where the rhythm of the waves becomes the soundtrack of your most cherished memories.
            </p>
            <p style={{ color: "#717171", fontSize: 16, lineHeight: 1.85, marginBottom: 40 }}>
              Every corner has been thoughtfully curated to celebrate the beauty of the coast, local heritage, and the art of doing absolutely nothing — except feeling completely alive.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, marginBottom: 44, paddingBottom: 40, borderBottom: "1px solid #e8e6e1" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, lineHeight: 1, color: "#141414" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#717171", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/book" className="btn btn-dark">Reserve Your Stay →</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
