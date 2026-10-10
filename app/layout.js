import "./globals.css";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";

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
    "Frox Studio builds open-weight AI models for chat, code, image, audio, and 3D. A simple API, a beautiful chat experience, and production-ready SDKs.",
  keywords: ["Frox Studio", "AI", "LLM", "open weights", "chat", "API", "image generation", "3D AI"],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Frox Studio — Frontier AI models for everyone",
    description: "Open-weight AI models for chat, code, image, audio, and 3D.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem("frox_theme");var dark=t==="dark"||((!t||t==="system")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var mode=dark?"dark":"light";document.documentElement.dataset.theme=mode;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=mode==="dark"?"#07070a":"#ffffff";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
