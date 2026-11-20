import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SecurityRules from "@/components/SecurityRules";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Infocod | Sistemas de Información a Medida",
  description: "Desarrollo de sistemas de información con calidad asegurada. Creamos soluciones tecnológicas adaptadas a tus necesidades.",
  keywords: "Software, SaaS, Sistemas de Información, Desarrollo Web, QA, Infocod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-[#F5F7FA] text-[#2E3440] selection:bg-[#4F8EF7] selection:text-white flex flex-col font-sans">
        <SecurityRules />
        <Navbar />
        <main className="flex-grow pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

