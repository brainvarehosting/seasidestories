"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const rooms = [
  {
    title: "The Full Villa",
    description: "Spread across two elegantly designed floors, the entire villa is yours. Perfect for families or groups seeking total privacy and exclusive access to all amenities.",
    img: "/photos/0J6A0308.JPG",
    features: ["2 Dynamic Floors", "5 Bedrooms", "Private Beach Access", "Full Kitchen & Staff"]
  },
  {
    title: "The Master Suite",
    description: "Located on the upper floor with panoramic ocean views, featuring a private terrace and a spa-inspired ensuite bathroom.",
    img: "/photos/0J6A0260.JPG",
    features: ["Upper Floor", "King Size Bed", "Private Terrace", "Ocean View"]
  },
  {
    title: "The Garden Room",
    description: "A tranquil ground-floor escape overlooking our tropical gardens, featuring warm wooden accents and soft coastal breezes.",
    img: "/photos/0J6A0264.JPG",
    features: ["Ground Floor", "Queen Size Bed", "Garden View", "Rain Shower"]
  }
];

export default function RoomsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rooms" className="section" style={{ background: "#f8fafc" }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="label-tag" style={{ justifyContent: "center" }}>Private Sanctuaries</p>
          <h2 className="heading-lg">Rooms & <i style={{ color: "#b2a384" }}>Suites</i></h2>
          <p style={{ maxWidth: 640, margin: "24px auto 0", color: "#475569", fontSize: 18, fontWeight: 300 }}>
            Designed for deep rest and morning inspiration, each space at Seaside Stories is a curated blend of comfort and coastal charm.
          </p>
        </div>

        <div className="rooms-grid">
          {rooms.map((room, i) => {
            const isFullVilla = i === 0;
            return (
              <div
                key={room.title}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.2}s`,
                  gridColumn: isFullVilla ? "span 2" : undefined
                }}
              >
                <div
                  className={`room-card ${!isFullVilla ? "room-card--column" : ""}`}
                  style={{
                    background: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    height: "100%",
                  }}
                >
                  <div
                    className="room-card-image"
                    style={{
                      position: "relative",
                      height: isFullVilla ? 500 : 400,
                      flex: isFullVilla ? 1.4 : "none"
                    }}
                  >
                    <Image
                      src={room.img}
                      alt={room.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes={isFullVilla ? "100vw" : "(max-width: 900px) 100vw, 50vw"}
                    />
                  </div>
                  <div
                    className="room-card-content"
                    style={{
                      padding: isFullVilla ? 60 : 40,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <h3 className="heading-md" style={{ marginBottom: 20, fontSize: 32 }}>{room.title}</h3>
                    <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.8, marginBottom: 32, flex: 1, fontWeight: 300 }}>
                      {room.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", marginBottom: 40 }}>
                      {room.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#0f172a", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          <div style={{ width: 6, height: 1, background: "#b2a384" }} />
                          {f}
                        </div>
                      ))}
                    </div>
                    <Link href="/book" className={isFullVilla ? "btn btn-dark" : "btn btn-outline-dark"} style={{ alignSelf: "flex-start" }}>
                      {isFullVilla ? "Inquire for Full Villa" : "Reserve Room"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
