import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pacu Jalur - Festival Perahu Tradisional Kuantan Singingi",
  description: "Jelajahi warisan budaya Pacu Jalur di Kuantan Singingi, Riau. Festival perahu tradisional dengan penari anak Togak Luan yang telah menjadi viral dunia.",
  keywords: "Pacu Jalur, Festival Perahu, Kuantan Singingi, Riau, Budaya Tradisional, Togak Luan, Pariwisata Indonesia",
  icons: {
    icon: [
      { url: '/sampan.png', sizes: '32x32', type: 'image/png' },
      { url: '/sampan.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/sampan.png',
    apple: '/sampan.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
