const ROUTES = [
  ["/", 1, "weekly"],
  ["/features", 0.9, "weekly"],
  ["/models", 0.9, "weekly"],
  ["/pricing", 0.9, "monthly"],
  ["/docs", 0.9, "weekly"],
  ["/chat", 0.8, "daily"],
  ["/code", 0.8, "monthly"],
  ["/image", 0.8, "monthly"],
  ["/audio", 0.8, "monthly"],
  ["/3d", 0.8, "monthly"],
  ["/download", 0.7, "monthly"],
  ["/features", 0.7, "monthly"],
  ["/blog", 0.7, "weekly"],
  ["/news", 0.6, "weekly"],
  ["/changelog", 0.6, "weekly"],
  ["/roadmap", 0.6, "monthly"],
  ["/docs", 0.7, "weekly"],
  ["/integrations", 0.6, "monthly"],
  ["/community", 0.6, "monthly"],
  ["/community/discussions", 0.5, "weekly"],
  ["/explore", 0.6, "weekly"],
  ["/status", 0.5, "daily"],
  ["/status/history", 0.4, "weekly"],
  ["/help", 0.6, "monthly"],
  ["/support", 0.5, "monthly"],
  ["/security", 0.6, "monthly"],
  ["/about", 0.6, "monthly"],
  ["/careers", 0.6, "weekly"],
  ["/partners", 0.5, "monthly"],
  ["/press", 0.5, "monthly"],
  ["/brand", 0.4, "monthly"],
  ["/contact", 0.5, "monthly"],
  ["/early-access", 0.5, "monthly"],
  ["/waitlist", 0.5, "monthly"],
  ["/legal/terms", 0.3, "yearly"],
  ["/legal/privacy", 0.3, "yearly"],
  ["/legal/cookies", 0.3, "yearly"],
  ["/legal/acceptable-use", 0.3, "yearly"],
  ["/legal/community", 0.3, "yearly"],
  ["/legal/licenses", 0.3, "yearly"],
  ["/legal/accessibility", 0.3, "yearly"],
  ["/legal/ai-disclaimer", 0.3, "yearly"],
];

export default function sitemap() {
  const base = "https://froxstudio.ai";
  const seen = new Set();
  const now = new Date();
  return ROUTES
    .filter(([r]) => (seen.has(r) ? false : seen.add(r)))
    .map(([r, priority, changeFrequency]) => ({
      url: `${base}${r === "/" ? "" : r}`,
      lastModified: now,
      changeFrequency,
      priority,
    }));
}
