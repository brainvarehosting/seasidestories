"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, DollarSign, Settings, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { href: "/admin/pricing", icon: DollarSign, label: "Pricing" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("ss-admin");
    router.push("/admin");
  };

  return (
    <aside className="admin-sidebar" style={{ display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>
          SEASIDE STORIES
        </div>
        <div style={{ color: "#92a8b4", fontSize: 12, marginTop: 2 }}>Management Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`admin-nav-link${pathname === href ? " active" : ""}`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 0 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-nav-link"
        >
          <ExternalLink size={18} />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="admin-nav-link"
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "#fee2e2" }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
