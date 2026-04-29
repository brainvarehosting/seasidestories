"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Curated selection of best photos for preview — mixed orientations for visual interest
const GRID = [
  { src: "0J6A0263.JPG", span: "col-span-2 row-span-2" },
  { src: "0J6A0266.JPG", span: "" },
  { src: "0J6A0269.JPG", span: "" },
  { src: "0J6A0273.JPG", span: "" },
  { src: "0J6A0278.JPG", span: "" },
  { src: "0J6A0285.JPG", span: "" },
  { src: "0J6A0290.JPG", span: "" },
  { src: "0J6A0295.JPG", span: "" },
];

export default function GalleryPreview() {
  const [lb, setLb] = useState<number | null>(null);
  const prev = () => setLb((i) => (i !== null ? (i - 1 + GRID.length) % GRID.length : 0));
  const next = () => setLb((i) => (i !== null ? (i + 1) % GRID.length : 0));

  return (
    <section className="section" style={{ background: "#f9f8f5" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <p className="label-tag">Visual Stories</p>
            <div className="divider" />
            <h2 className="heading-lg">
              GLIMPSES OF<br />PARADISE
            </h2>
          </div>
          <Link href="/gallery" className="btn btn-ghost" style={{ marginBottom: 8 }}>
            All {48} Photos →
          </Link>
        </div>

        {/* Grid — Airbnb-style asymmetric */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "280px 280px",
          gap: 8,
          borderRadius: 24,
          overflow: "hidden",
        }}>
          {/* Feature photo — spans 2 cols and 2 rows */}
          {GRID.map((item, i) => {
            const isFeature = i === 0;
            return (
              <div
                key={item.src}
                onClick={() => setLb(i)}
                style={{
                  position: "relative", overflow: "hidden", cursor: "pointer",
                  gridColumn: isFeature ? "span 2" : undefined,
                  gridRow: isFeature ? "span 2" : undefined,
                  background: "#e8e6e1",
                }}
              >
                <Image
                  src={`/photos/${item.src}`}
                  alt={`Seaside Stories ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(20,20,20,0)",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(20,20,20,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(20,20,20,0)"; }}
                />
                {/* Last tile — "show all" overlay */}
                {i === GRID.length - 1 && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(20,20,20,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      background: "white", color: "#141414",
                      padding: "10px 20px", borderRadius: 10,
                      fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
                    }}>Show all 48 photos</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLb(null); }} style={{
            position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)",
            border: "none", color: "white", borderRadius: "50%", width: 44, height: 44,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={20} /></button>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
            position: "absolute", left: 20, background: "rgba(255,255,255,0.1)",
            border: "none", color: "white", borderRadius: "50%", width: 48, height: 48,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronLeft size={24} /></button>

          <div style={{ position: "relative", width: "min(90vw, 1100px)", height: "min(86vh, 760px)" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={`/photos/${GRID[lb].src}`} alt={`Photo ${lb + 1}`}
              fill style={{ objectFit: "contain" }} sizes="90vw" priority />
          </div>

          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
            position: "absolute", right: 20, background: "rgba(255,255,255,0.1)",
            border: "none", color: "white", borderRadius: "50%", width: 48, height: 48,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronRight size={24} /></button>

          <div style={{
            position: "absolute", bottom: 20, color: "rgba(255,255,255,0.5)",
            fontSize: 12, letterSpacing: "0.06em",
          }}>{lb + 1} / {GRID.length}</div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: auto !important; }
        }
      `}</style>
    </section>
  );
}
