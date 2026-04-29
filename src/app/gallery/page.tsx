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
      <main style={{ paddingTop: 72, background: "#fff" }}>
        {/* Clean header */}
        <div style={{ padding: "64px 0 48px", textAlign: "center", background: "#fff" }}>
          <div className="container">
            <p className="label-tag" style={{ justifyContent: "center" }}>Visual Stories</p>
            <div className="divider divider-center" />
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>OUR GALLERY</h1>
            <p style={{ color: "#717171", fontSize: 16, maxWidth: 440, margin: "0 auto" }}>
              {ALL_PHOTOS.length} moments captured along Kerala&apos;s coastline.
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{
          padding: "0 24px 80px",
          columns: 3,
          columnGap: 8,
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          {ALL_PHOTOS.map((photo, i) => (
            <div
              key={photo}
              onClick={() => setLb(i)}
              style={{
                breakInside: "avoid",
                marginBottom: 8,
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                background: "#f3f2ef",
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
                  transition: "transform 0.5s ease",
                }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLb(null); }} style={{
            position: "absolute", top: 20, right: 20,
            background: "rgba(255,255,255,0.1)", border: "none", color: "white",
            borderRadius: "50%", width: 48, height: 48, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={20} /></button>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
            position: "absolute", left: 16,
            background: "rgba(255,255,255,0.1)", border: "none", color: "white",
            borderRadius: "50%", width: 52, height: 52, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronLeft size={26} /></button>

          <div style={{ position: "relative", width: "min(92vw, 1200px)", height: "min(88vh, 820px)" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={`/photos/${ALL_PHOTOS[lb]}`} alt={`Photo ${lb + 1}`}
              fill style={{ objectFit: "contain" }} sizes="92vw" priority />
          </div>

          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
            position: "absolute", right: 16,
            background: "rgba(255,255,255,0.1)", border: "none", color: "white",
            borderRadius: "50%", width: 52, height: 52, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronRight size={26} /></button>

          <div style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.06em",
            background: "rgba(0,0,0,0.4)", padding: "6px 16px", borderRadius: 20,
          }}>{lb + 1} / {ALL_PHOTOS.length}</div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          main > div:last-child { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          main > div:last-child { columns: 1 !important; }
        }
      `}</style>
    </>
  );
}
