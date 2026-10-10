import Link from "next/link";

/**
 * Brand lockup built from the real /logo.webp asset.
 *
 * The logo is a dark rounded square, so it reads correctly on both light and
 * dark surfaces without needing a theme variant. The wordmark stays as text so
 * it inherits the current text color in either theme.
 *
 * size: pixel size of the mark
 */
export function Mark({ size = 28, className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.webp"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 rounded-[22%] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function Brand({
  size = 28,
  href = "/",
  showText = true,
  tone = "default",
  className = "",
  textClassName = "",
}) {
  const color = tone === "inverse" ? "text-bg" : "text-text";

  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} />
      {showText && (
        <span className={`font-semibold tracking-tight ${color} ${textClassName}`} style={{ fontSize: Math.round(size * 0.58) }}>
          Frox
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Frox Studio — home" className="inline-flex w-fit hover:opacity-80 transition-opacity">
      {inner}
    </Link>
  );
}
