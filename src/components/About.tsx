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
    <section id="about" className="section" style={{ background: "#ffffff" }} ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Images column */}
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{
              borderRadius: 4, overflow: "hidden",
              aspectRatio: "4/5",
              position: "relative",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)",
            }}>
              <Image
                src="/photos/0J6A0260.JPG"
                alt="Seaside Stories Master Suite"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating detail image — hidden on mobile via CSS class */}
            <div className="about-float" style={{
              position: "absolute", bottom: -50, right: -50,
              width: 240, height: 300,
              borderRadius: 4, overflow: "hidden",
              border: "12px solid #ffffff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}>
              <Image
                src="/photos/0J6A0283.JPG"
                alt="Coastal details"
                fill
                style={{ objectFit: "cover" }}
                sizes="240px"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <p className="label-tag">Our Philosophy</p>
            <h2 className="heading-lg" style={{ marginBottom: 32 }}>
              A sanctuary for<br />
              the <i style={{ color: "#b2a384" }}>soul</i>
            </h2>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
              At Seaside Stories, we believe that true luxury lies in the details. Nestled along the tranquil coast of Kerala, our villa is a curated blend of modern elegance and timeless coastal charm.
            </p>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              From the architectural symmetry to the curated local art, every element is designed to evoke a sense of peace. Whether you&apos;re watching the sunset from our private deck or waking up to the sound of waves, your story begins here.
            </p>

            {/* Stats row */}
            <div className="about-stats-grid" style={{ marginBottom: 56, paddingTop: 40, borderTop: "1px solid #e2e8f0" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 42, color: "#0f172a", marginBottom: 4
                  }}>{s.value}</div>
                  <div style={{
                    fontSize: 11, color: "#94a3b8", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.15em"
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/book" className="btn btn-dark">Reserve Your Escape</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
