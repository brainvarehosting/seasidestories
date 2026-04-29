import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import GalleryPreview from "@/components/GalleryPreview";
import Amenities from "@/components/Amenities";
import BookingWidget from "@/components/BookingWidget";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

// Reviews data
const reviews = [
  {
    name: "Priya & Rahul",
    from: "Bangalore",
    stars: 5,
    text: "The most magical stay of our lives. Waking up to the sound of waves every morning was pure bliss. Every detail was perfect.",
    img: "0J6A0296.JPG",
  },
  {
    name: "Sarah & James",
    from: "London, UK",
    stars: 5,
    text: "Absolutely stunning villa. The ocean views are breathtaking. We've stayed in many luxury properties — this is genuinely special.",
    img: "0J6A0299.JPG",
  },
  {
    name: "Anjali Family",
    from: "Mumbai",
    stars: 5,
    text: "Took the whole family here for a reunion. The beach access and privacy are unparalleled. We're already planning next year's stay.",
    img: "0J6A0303.JPG",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <GalleryPreview />

        {/* Full-bleed photo break — editorial moment */}
        <div style={{ position: "relative", height: "60vh", overflow: "hidden", minHeight: 400 }}>
          <Image
            src="/photos/0J6A0265.JPG"
            alt="Seaside Stories"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority={false}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(20,20,20,0.75) 0%, rgba(20,20,20,0.2) 60%, transparent 100%)",
            display: "flex", alignItems: "center",
          }}>
            <div className="container">
              <p style={{
                color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16,
              }}>The Experience</p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 76px)",
                color: "white", lineHeight: 0.96, marginBottom: 24, maxWidth: 520,
              }}>
                FEEL THE OCEAN<br />EVERY MORNING
              </h2>
              <Link href="/book" className="btn btn-white" style={{ fontSize: 14 }}>
                Book Your Stay →
              </Link>
            </div>
          </div>
        </div>

        <Amenities />
        <BookingWidget />

        {/* Reviews */}
        <section className="section" style={{ background: "#f9f8f5" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="label-tag" style={{ justifyContent: "center" }}>Guest Stories</p>
              <div className="divider divider-center" />
              <h2 className="heading-lg">WHAT GUESTS SAY</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {reviews.map((r) => (
                <div key={r.name} className="card card-hover" style={{ padding: 32, display: "flex", flexDirection: "column" }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#2d4a54"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>

                  <p style={{ color: "#141414", fontSize: 15, lineHeight: 1.8, marginBottom: 24, flex: 1, fontStyle: "italic" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid #e8e6e1" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#e8e6e1" }}>
                      <Image src={`/photos/${r.img}`} alt={r.name} width={44} height={44} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#141414" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "#717171" }}>{r.from}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
            @media (max-width: 600px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* Final CTA — dark, editorial */}
        <section style={{
          background: "#2d4a54", padding: "100px 0",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", maxWidth: 640, padding: "0 24px" }}>
            <p style={{
              color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20,
            }}>Limited Dates Available</p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 88px)",
              color: "white", lineHeight: 0.94, marginBottom: 24,
            }}>
              YOUR STORY<br />AWAITS
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>
              From ₹18,000 per night. Private beach access. Curated coastal living.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn btn-white" style={{ fontSize: 15, padding: "15px 36px" }}>
                Book Now
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 500,
                  padding: "15px 28px", borderRadius: 12,
                  border: "1.5px solid rgba(255,255,255,0.25)", textDecoration: "none",
                  background: "rgba(255,255,255,0.08)", transition: "all 0.2s",
                }}
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </section>

        <Location />
      </main>
      <Footer />
    </>
  );
}
