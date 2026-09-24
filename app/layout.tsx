import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050608",
};

export const metadata: Metadata = {
  title: "ZeroGlitch Studio | Game Development Solutions & Full-Cycle Studio",
  description:
    "ZeroGlitch Studio provides enterprise-grade game development solutions: full-cycle production, cross-platform porting, deterministic multiplayer netcode, technical art & shaders, and zero-glitch QA. Creators of Beatstar.",
  keywords: [
    "game development studio",
    "game development solutions",
    "game development services",
    "cross-platform porting",
    "Unity 6 game development",
    "Unreal Engine 5 studio",
    "multiplayer netcode",
    "game performance optimization",
    "Beatstar",
    "ZeroGlitch Studio",
  ],
  authors: [{ name: "ZeroGlitch Studio" }],
  openGraph: {
    title: "ZeroGlitch Studio | Precision Game Development & Solutions",
    description: "End-to-end commercial game development, porting, and engineering with zero glitches.",
    type: "website",
    locale: "en_US",
    siteName: "ZeroGlitch Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050608] text-white selection:bg-[#bc13fe] selection:text-white">
        {children}
      </body>
    </html>
  );
}
