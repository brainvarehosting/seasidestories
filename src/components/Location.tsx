import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="section" style={{ background: "#fff" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="label-tag" style={{ justifyContent: "center" }}>Find Us</p>
          <div className="divider divider-center" />
          <h2 className="heading-lg">OUR LOCATION</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 40, alignItems: "start" }}>
          {/* Contact */}
          <div className="card" style={{ padding: 36 }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26, color: "#141414", marginBottom: 28, letterSpacing: "0.03em",
            }}>GET IN TOUCH</h3>

            {[
              { icon: MapPin, label: "Address", value: "Kerala, India · 100m from the beach" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@seasidestories.in" },
              { icon: Clock, label: "Hours", value: "Check-in 2PM · Check-out 11AM" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: 14, paddingBottom: 20, marginBottom: 20, borderBottom: "1px solid #f3f2ef" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#f9f8f5", border: "1px solid #e8e6e1",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={16} color="#2d4a54" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#b0acac", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#141414", fontWeight: 500 }}>{value}</div>
                </div>
              </div>
            ))}

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="btn"
              style={{
                width: "100%", justifyContent: "center",
                background: "#25D366", color: "white", borderRadius: 12,
                fontSize: 14, marginTop: 4,
              }}>
              WhatsApp Us
            </a>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 24, overflow: "hidden", height: 440, boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.1)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d76.2!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3Ab561349b075594c6!2sSeaside+Stories!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Seaside Stories Location"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #location .container > div:last-child { grid-template-columns: 1fr !important; }
          #location .container > div:last-child > div:last-child { height: 300px !important; }
        }
      `}</style>
    </section>
  );
}
