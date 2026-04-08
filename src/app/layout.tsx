import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AOSEP - Algerian Open Systems & Education Platform",
    template: "%s | AOSEP",
  },
  description:
    "Find the best global opportunities for Algerian students - scholarships, internships, and exchange programs matched to your profile.",
  keywords: "Algeria, scholarship, internship, study abroad, AOSEP, education, opportunities",
  authors: [{ name: "AOSEP Team" }],
  creator: "AOSEP",
  publisher: "AOSEP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aosep.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aosep.org",
    title: "AOSEP - Algerian Open Systems & Education Platform",
    description:
      "Find the best global opportunities for Algerian students - scholarships, internships, and exchange programs matched to your profile.",
    siteName: "AOSEP",
  },
  twitter: {
    card: "summary_large_image",
    title: "AOSEP - Algerian Open Systems & Education Platform",
    description:
      "Find the best global opportunities for Algerian students - scholarships, internships, and exchange programs matched to your profile.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
