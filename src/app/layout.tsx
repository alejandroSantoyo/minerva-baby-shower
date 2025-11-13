import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

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
      <body
      // className={`${scriptFont.className} ${serifFont.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
