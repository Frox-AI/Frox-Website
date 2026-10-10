export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/chat", "/settings", "/dashboard"],
    },
    sitemap: "https://froxstudio.ai/sitemap.xml",
  };
}
