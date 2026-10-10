"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import DevShell from "@/components/DevShell";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/chat");
  const isDev = pathname.startsWith("/developers") || pathname.startsWith("/docs") || pathname.startsWith("/download");

  // Tag the document so CSS can give the chat app its own neutral palette.
  useEffect(() => {
    const root = document.documentElement;
    if (isChat) root.setAttribute("data-surface", "chat");
    else root.removeAttribute("data-surface");
    return () => root.removeAttribute("data-surface");
  }, [isChat]);

  if (isChat) return <>{children}</>;
  if (isDev) return <DevShell>{children}</DevShell>;
  return <SiteChrome>{children}</SiteChrome>;
}
