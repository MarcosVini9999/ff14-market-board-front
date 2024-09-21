import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const trajanpro = localFont({
  src: "./fonts/TrajanPro-Regular.ttf",
  variable: "--font-ff",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FFXIV's Market Board",
  description: "FFXIV's Market Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${trajanpro.variable} antialiased`}>{children}</body>
    </html>
  );
}
