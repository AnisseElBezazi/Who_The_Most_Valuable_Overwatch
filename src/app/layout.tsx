import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who's the Most Valuable Overwatch Player",
  description: "Compare Overwatch player stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
