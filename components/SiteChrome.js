"use client";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

const BARE_ROUTES = ["/auth", "/chat"];

export default function SiteChrome({ children }) {
  const pathname = usePathname() || "";
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  return (
    <>
      {!bare && <Nav />}
      {!bare && (
        <main className="min-h-screen">{children}</main>
      )}
      {bare && children}
      {!bare && <Footer />}
    </>
  );
}