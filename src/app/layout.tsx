import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice Notes App",
  description: "Record and save your voice notes with real-time transcription",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-gray-900">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
