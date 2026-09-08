import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DC Miranda — AI-Powered Web, Software & Automation",
  description:
    "DC Miranda: web design & development, AI-powered software, automation, and GoHighLevel systems. Design it. Build it. Automate it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
