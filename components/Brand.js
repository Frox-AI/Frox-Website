import Link from "next/link";

/**
 * Brand lockup. The mark uses the real /icon.svg asset (self-contained gradient,
 * so it renders identically on light and dark), while the wordmark stays as
 * text so it inherits the current text color in both themes.
 *
 * size:  20 | 24 | 28 | 32  — pixel size of the mark
 * tone:  "default" | "inverse" | "bare"
 */
export function Mark({ size = 28, className = "", rounded = true }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 ${rounded ? "rounded-[22%]" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function Brand({ size = 28, href = "/", showText = true, tone = "default", className = "", textClassName = "" }) {
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
