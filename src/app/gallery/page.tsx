"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_PHOTOS = [
  "0J6A0260.JPG","0J6A0261.JPG","0J6A0262.JPG","0J6A0263.JPG","0J6A0264.JPG",
  "0J6A0265.JPG","0J6A0266.JPG","0J6A0267.JPG","0J6A0268.JPG","0J6A0269.JPG",
  "0J6A0270.JPG","0J6A0271.JPG","0J6A0272.JPG","0J6A0273.JPG","0J6A0274.JPG",
  "0J6A0275.JPG","0J6A0276.JPG","0J6A0277.JPG","0J6A0278.JPG","0J6A0279.JPG",
  "0J6A0280.JPG","0J6A0281.JPG","0J6A0283.JPG","0J6A0284.JPG","0J6A0285.JPG",
  "0J6A0286.JPG","0J6A0287.JPG","0J6A0288.JPG","0J6A0289.JPG","0J6A0290.JPG",
  "0J6A0291.JPG","0J6A0292.JPG","0J6A0293.JPG","0J6A0294.JPG","0J6A0295.JPG",
  "0J6A0296.JPG","0J6A0297.JPG","0J6A0298.JPG","0J6A0299.JPG","0J6A0300.JPG",
  "0J6A0301.JPG","0J6A0302.JPG","0J6A0303.JPG","0J6A0304.JPG","0J6A0305.JPG",
  "0J6A0306.JPG","0J6A0307.JPG","0J6A0308.JPG",
];

export default function GalleryPage() {
  const [lb, setLb] = useState<number | null>(null);
  const prev = () => setLb((i) => i !== null ? (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length : 0);
  const next = () => setLb((i) => i !== null ? (i + 1) % ALL_PHOTOS.length : 0);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, background: "#ffffff" }}>
        {/* Header */}
        <div style={{ padding: "100px 0 80px", textAlign: "center", background: "#f8fafc" }}>
          <div className="container">
            <p className="label-tag" style={{ justifyContent: "center" }}>The Collection</p>
            <h1 className="heading-xl" style={{ marginBottom: 24 }}>Gallery</h1>
            <p style={{ color: "#475569", fontSize: 18, maxWidth: 500, margin: "0 auto", fontWeight: 300 }}>
              {`A visual exploration of Kerala's most intimate beach retreat. ${ALL_PHOTOS.length} curated moments of peace.`}
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{
          padding: "80px 24px",
          columns: 3,
          columnGap: 16,
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {ALL_PHOTOS.map((photo, i) => (
            <div
              key={photo}
              onClick={() => setLb(i)}
              style={{
                breakInside: "avoid",
                marginBottom: 16,
                borderRadius: 0,
                overflow: "hidden",
                cursor: "pointer",
                background: "#f1f5f9",
                position: "relative",
              }}
            >
              <Image
                src={`/photos/${photo}`}
                alt={`Seaside Stories ${i + 1}`}
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 1.2s cubic-bezier(0.2, 0, 0.2, 1)",
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="gallery-item"
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)} style={{ background: "rgba(15,23,42,0.98)", backdropFilter: "blur(10px)" }}>
          <button onClick={(e) => { e.stopPropagation(); setLb(null); }} style={{
            position: "absolute", top: 40, right: 40,
            background: "transparent", border: "none", color: "white",
            cursor: "pointer", zIndex: 100
          }}><X size={32} strokeWidth={1} /></button>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
            position: "absolute", left: 40,
            background: "transparent", border: "none", color: "white",
            cursor: "pointer", zIndex: 100
          }}><ChevronLeft size={48} strokeWidth={1} /></button>

          <div style={{ position: "relative", width: "90vw", height: "80vh" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={`/photos/${ALL_PHOTOS[lb]}`} alt={`Photo ${lb + 1}`}
              fill style={{ objectFit: "contain" }} sizes="90vw" priority />
          </div>

          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
            position: "absolute", right: 40,
            background: "transparent", border: "none", color: "white",
            cursor: "pointer", zIndex: 100
          }}><ChevronRight size={48} strokeWidth={1} /></button>

          <div style={{
            position: "absolute", bottom: 40, color: "rgba(255,255,255,0.5)",
            fontSize: 12, letterSpacing: "0.2em", fontWeight: 300
          }}>{lb + 1} / {ALL_PHOTOS.length}</div>
        </div>
      )}

      <style>{`
        .gallery-item:hover { transform: scale(1.05); }
        @media (max-width: 900px) {
          main > div:last-child { columns: 2 !important; }
        }
        @media (max-width: 600px) {
          main > div:last-child { columns: 1 !important; }
        }
      `}</style>
    </>
  );
}
