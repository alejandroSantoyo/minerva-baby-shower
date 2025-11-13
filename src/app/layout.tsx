import type { Metadata } from "next";
import { Italianno, Cormorant } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Fuente para "Cherry on the Top" (Script/Manuscrita)
export const scriptFont = Italianno({
  weight: "400", // El único peso disponible para Italianno
  subsets: ["latin"],
  variable: "--font-script", // Una variable CSS fácil de usar
});

// Fuente para "SHE IS THE" y detalles (Serif Limpia)
export const serifFont = Cormorant({
  weight: ["300", "400", "500"], // Importa varios pesos para flexibilidad
  subsets: ["latin"],
  variable: "--font-serif", // Una variable CSS fácil de usar
});

export const metadata: Metadata = {
  title: "Minerva's Baby Shower",
  description: "App creada con mucho amor para mi hija",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${scriptFont.className} ${serifFont.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
