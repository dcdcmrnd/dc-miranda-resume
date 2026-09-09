import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import { VideoPreviewProvider } from "@/hooks/useVideoPreview";
import VideoPreviewLayer from "@/components/ProjectUI/VideoPreviewLayer";
import ScrollReveal from "@/components/Motion/ScrollReveal";
import CustomCursor from "@/components/Cursor/CustomCursor";

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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <VideoPreviewProvider>
          <Navigation />
          {children}
          <VideoPreviewLayer />
          <ScrollReveal />
          <CustomCursor />
        </VideoPreviewProvider>
      </body>
    </html>
  );
}
