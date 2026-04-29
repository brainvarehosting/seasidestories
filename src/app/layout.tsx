import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seaside Stories – Luxury Beach Villa in Kerala",
  description:
    "Experience coastal tranquility at Seaside Stories, Kerala's premier luxury beach villa. Book your private seaside escape with stunning ocean views, curated experiences, and authentic local charm.",
  keywords: [
    "beach villa Kerala",
    "luxury beach stay",
    "seaside villa India",
    "coastal villa Kerala",
    "private beach villa",
    "villa rental Kerala",
  ],
  openGraph: {
    title: "Seaside Stories – Luxury Beach Villa",
    description:
      "Write your own chapter of relaxation and discovery at Seaside Stories, a luxury coastal villa in Kerala.",
    type: "website",
    images: [{ url: "/photos/0J6A0260.JPG", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seaside Stories – Luxury Beach Villa",
    description: "Curated coastal escapes in Kerala. Book your stay today.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
