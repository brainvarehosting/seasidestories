"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GRID = [
  { src: "0J6A0263.JPG" },
  { src: "0J6A0308.JPG" },
  { src: "0J6A0260.JPG" },
  { src: "0J6A0283.JPG" },
  { src: "0J6A0290.JPG" },
  { src: "0J6A0295.JPG" },
  { src: "0J6A0278.JPG" },
  { src: "0J6A0266.JPG" },
];

export default function GalleryPreview() {
  const [lb, setLb] = useState<number | null>(null);
  const prev = () => setLb((i) => (i !== null ? (i - 1 + GRID.length) % GRID.length : 0));
  const next = () => setLb((i) => (i !== null ? (i + 1) % GRID.length : 0));

  return (
    <section className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p className="label-tag">Gallery</p>
            <h2 className="heading-lg">
              The Art of <i style={{ color: "#b2a384" }}>Living</i>
            </h2>
          </div>
          <Link href="/gallery" className="btn btn-outline-dark">
            View Full Gallery
          </Link>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {GRID.map((item, i) => {
            const isFeature = i === 0;
            return (
              <div
                key={item.src}
                onClick={() => setLb(i)}
                className={isFeature ? "gallery-feature" : ""}
                style={{
                  position: "relative", overflow: "hidden", cursor: "pointer",
                  gridColumn: isFeature ? "span 2" : undefined,
                  background: "#f1f5f9",
                }}
              >
                <Image
                  src={`/photos/${item.src}`}
                  alt={`Seaside Stories ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", transition: "transform 1.2s cubic-bezier(0.2, 0, 0.2, 1)" }}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(15,23,42,0)",
                  transition: "background 0.4s ease",
                }}
                className="gallery-overlay"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: 0, transition: "opacity 0.4s ease", color: "white",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase"
                }}
                className="gallery-hint"
                >
                  View Details
                </div>

                {i === GRID.length - 1 && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(15,23,42,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      background: "white", color: "#0f172a",
                      padding: "12px 24px",
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase"
                    }}>Explore All</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .gallery-overlay:hover { background: rgba(15,23,42,0.2) !important; }
        .gallery-overlay:hover + .gallery-hint { opacity: 1 !important; }
      `}</style>

      {/* Lightbox */}
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)} style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(10px)" }}>
          <button onClick={(e) => { e.stopPropagation(); setLb(null); }} style={{
            position: "absolute", top: 24, right: 24, background: "transparent",
            border: "none", color: "white", cursor: "pointer", zIndex: 100, padding: 8
          }}><X size={32} strokeWidth={1} /></button>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
            position: "absolute", left: 16, background: "transparent",
            border: "none", color: "white", cursor: "pointer", zIndex: 100, padding: 8
          }}><ChevronLeft size={40} strokeWidth={1} /></button>

          <div style={{ position: "relative", width: "90vw", height: "80vh" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={`/photos/${GRID[lb].src}`} alt={`Photo ${lb + 1}`}
              fill style={{ objectFit: "contain" }} sizes="90vw" priority />
          </div>

          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
            position: "absolute", right: 16, background: "transparent",
            border: "none", color: "white", cursor: "pointer", zIndex: 100, padding: 8
          }}><ChevronRight size={40} strokeWidth={1} /></button>

          <div style={{
            position: "absolute", bottom: 24, color: "rgba(255,255,255,0.5)",
            fontSize: 12, letterSpacing: "0.2em", fontWeight: 300
          }}>{lb + 1} / {GRID.length}</div>
        </div>
      )}
    </section>
  );
}
