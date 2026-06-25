import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danielmota.org"),
  title: {
    default: "Portal Advento News | Daniel Mota",
    template: "%s | Portal Advento News",
  },
  description:
    "Notícias atualizadas sobre a Igreja Adventista do Sétimo Dia e o mundo religioso — agregadas de fontes oficiais.",
  keywords: [
    "Igreja Adventista",
    "notícias adventistas",
    "IASD",
    "Adventist News",
    "religião",
    "Portal Advento News",
  ],
  authors: [{ name: "Daniel Mota" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://danielmota.org",
    siteName: "Portal Advento News",
    title: "Portal Advento News",
    description:
      "Notícias atualizadas sobre a Igreja Adventista do Sétimo Dia e o mundo religioso.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Advento News",
    description:
      "Notícias atualizadas sobre a Igreja Adventista do Sétimo Dia e o mundo religioso.",
  },
  robots: { index: true, follow: true },
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
        <main className="flex-1 border-x-0 md:border-x-4 border-black container max-w-7xl mx-auto bg-white shadow-none md:shadow-[8px_0_0_0_rgba(0,0,0,0.1)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
