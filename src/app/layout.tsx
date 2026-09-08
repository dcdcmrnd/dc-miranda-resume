import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import { VideoPreviewProvider } from "@/hooks/useVideoPreview";
import VideoPreviewLayer from "@/components/ProjectUI/VideoPreviewLayer";

export const metadata: Metadata = {
  title: "DC Miranda — Full-Stack Web Developer",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <VideoPreviewProvider>
          <Navigation />
          {children}
          <VideoPreviewLayer />
        </VideoPreviewProvider>
      </body>
    </html>
  );
}
