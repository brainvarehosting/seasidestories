import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="label-tag" style={{ justifyContent: "center" }}>Directions</p>
          <h2 className="heading-lg">Our <i style={{ color: "#b2a384" }}>Location</i></h2>
        </div>

        <div className="location-grid">
          {/* Contact */}
          <div style={{
            background: "#f8fafc",
            padding: 48,
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            border: "1px solid #f1f5f9"
          }}>
            <h3 className="heading-md" style={{ marginBottom: 40, fontSize: 32 }}>Get in Touch</h3>

            {[
              { icon: MapPin, label: "Address", value: "Seaside Stories, Kerala, India" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@seasidestories.in" },
              { icon: Clock, label: "Arrival", value: "Check-in 2PM · Check-out 11AM" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: 20, paddingBottom: 24, marginBottom: 24, borderBottom: "1px solid #e2e8f0" }}>
                <div style={{
                  width: 44, height: 44,
                  background: "#ffffff", border: "1px solid #f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={18} color="#b2a384" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, color: "#0f172a", fontWeight: 600 }}>{value}</div>
                </div>
              </div>
            ))}

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="btn btn-dark"
              style={{ width: "100%", marginTop: 16 }}>
              Inquire via WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="location-map-height" style={{
            overflow: "hidden",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)",
            border: "1px solid #f1f5f9"
          }}>
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
    </section>
  );
}
