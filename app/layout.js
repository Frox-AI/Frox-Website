import "./globals.css";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import AppShell from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://froxstudio.ai"),
  title: {
    default: "Frox Studio — Frontier AI models for everyone",
    template: "%s · Frox Studio",
  },
  description:
    "Frox Studio builds open-weight AI models for chat, code, image, audio, and 3D. One API, chat, and production-ready SDKs.",
  keywords: ["Frox Studio", "AI", "LLM", "open weights", "chat", "API", "image generation", "3D AI"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#5b46e8" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Frox Studio — Frontier AI models for everyone",
    description: "Open-weight AI models for chat, code, image, audio, and 3D.",
    type: "website",
    siteName: "Frox Studio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Frox Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frox Studio — Frontier AI models for everyone",
    description: "Open-weight AI models for chat, code, image, audio, and 3D.",
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem("frox_theme");var dark=t==="dark"||((!t||t==="system")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var mode=dark?"dark":"light";document.documentElement.dataset.theme=mode;var m=document.querySelector('meta[name="theme-color"]:not([media])');if(m)m.content=mode==="dark"?"#141413":"#f0eee6";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
