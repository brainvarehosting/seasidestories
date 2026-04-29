import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RoomsSection from "@/components/RoomsSection";
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
        <RoomsSection />
        
        {/* Full-bleed photo break — editorial moment */}
        <div style={{ position: "relative", height: "80vh", overflow: "hidden", minHeight: 600 }}>
          <Image
            src="/photos/0J6A0284.JPG"
            alt="Seaside Stories Exterior"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority={false}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.1) 50%, rgba(15,23,42,0.6) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
          }}>
            <div className="container" style={{ maxWidth: 800 }}>
              <p style={{
                color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32,
              }}>The Experience</p>
              <h2 className="heading-xl" style={{ color: "white", marginBottom: 40 }}>
                Wake up to the<br />
                <i style={{ color: "#b2a384" }}>ocean&apos;s whisper</i>
              </h2>
              <Link href="/book" className="btn btn-white" style={{ padding: "18px 48px" }}>
                Begin Your Journey
              </Link>
            </div>
          </div>
        </div>

        <GalleryPreview />
        <Amenities />
        <BookingWidget />

        {/* Reviews */}
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p className="label-tag" style={{ justifyContent: "center" }}>Guest Stories</p>
              <h2 className="heading-lg">Loved by <i style={{ color: "#b2a384" }}>Travelers</i></h2>
            </div>

            <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {reviews.map((r) => (
                <div key={r.name} style={{ background: "white", padding: 48, boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#b2a384"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>

                  <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8, marginBottom: 40, flex: 1, fontWeight: 300, fontStyle: "italic" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 32, borderTop: "1px solid #f1f5f9" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                      <Image src={`/photos/${r.img}`} alt={r.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{r.name}</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.from}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 1024px) {
              .reviews-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 768px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* Final CTA — professional, luxury dark */}
        <section style={{
          background: "#0f172a", padding: "160px 0",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden"
        }}>
          {/* Subtle background glow */}
          <div style={{ 
            position: "absolute", width: "100%", height: "100%", 
            background: "radial-gradient(circle at 50% 50%, rgba(178,163,132,0.1) 0%, transparent 70%)",
          }} />
          
          <div style={{ textAlign: "center", maxWidth: 800, padding: "0 24px", position: "relative", zIndex: 1 }}>
            <p style={{
              color: "#b2a384", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 32,
            }}>Escape the Ordinary</p>
            <h2 className="heading-xl" style={{ color: "white", marginBottom: 40 }}>
              Your story starts <i style={{ color: "#b2a384" }}>here</i>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, lineHeight: 1.8, marginBottom: 56, fontWeight: 300 }}>
              Experience Kerala&apos;s most exclusive beach retreat. Limited dates available for private bookings.
            </p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn btn-accent" style={{ padding: "20px 60px" }}>
                Book Your Stay
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  color: "white", fontSize: 14, fontWeight: 600,
                  padding: "20px 48px", borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.2)", textDecoration: "none",
                  background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                  transition: "all 0.4s ease", textTransform: "uppercase", letterSpacing: "0.1em"
                }}
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>

          <style>{`
            .btn-whatsapp:hover {
              border-color: #b2a384 !important;
              background: rgba(178,163,132,0.1) !important;
              color: #b2a384 !important;
            }
          `}</style>
        </section>

        <Location />
      </main>
      <Footer />
    </>
  );
}
