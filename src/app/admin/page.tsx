"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("care@brainvare.com");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simple client-side password check for admin access
    if (email === "care@brainvare.com" && password === "admin123") {
      sessionStorage.setItem("ss-admin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2d4a54 0%, #1c1c1c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>
            SEASIDE STORIES
          </div>
          <div style={{ color: "#92a8b4", fontSize: 14, marginTop: 4 }}>Admin Panel</div>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: 40, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#2d4a54", marginBottom: 8, letterSpacing: "0.05em" }}>
            SIGN IN
          </h1>
          <p style={{ color: "#92a8b4", fontSize: 14, marginBottom: 32 }}>Access the management dashboard</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#536b76", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Mail size={13} /> Email
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" required />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#536b76", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Lock size={13} /> Password
              </label>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Enter password" autoComplete="current-password" required style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? "Hide password" : "Show password"} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#536b76" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p style={{ fontSize: 11, color: "#92a8b4", marginTop: 4 }}>Default: admin123</p>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", borderRadius: 12, padding: "12px 16px", color: "#991b1b", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-ocean" style={{ width: "100%", padding: "14px", fontSize: 16, border: "none", marginTop: 8, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#536b76", fontSize: 13, marginTop: 24 }}>
          <a href="/" style={{ color: "#92a8b4", textDecoration: "none" }}>← Back to website</a>
        </p>
      </div>
    </div>
  );
}
