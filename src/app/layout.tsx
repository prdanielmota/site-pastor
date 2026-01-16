import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-mono", // Using this variable for body text in our setup
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Mota | Portal Advento News",
  description: "Notícias dinâmicas sobre a Igreja Adventista e o mundo religioso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased min-h-screen flex flex-col bg-background`}
      >
        <Navbar />
        <main className="flex-1 border-x-4 border-black container mx-auto bg-white shadow-[8px_0_0_0_rgba(0,0,0,0.1)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
