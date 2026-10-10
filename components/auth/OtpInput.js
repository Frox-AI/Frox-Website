"use client";
import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";

export default function OtpInput({ value, onChange, length = 6, disabled }) {
  const inputs = useRef([]);
  const [focused, setFocused] = useState(-1);
  const chars = (value || "").padEnd(length, " ").slice(0, length).split("");

  useEffect(() => {
    if (value?.length < length) inputs.current[value.length]?.focus();
  }, [value, length]);

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, "");
    if (!v) return;
    const next = (value || "").slice(0, i) + v.slice(-1) + (value || "").slice(i + 1);
    onChange(next.slice(0, length));
    if (i < length - 1) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const v = value || "";
      if (v[i]) {
        onChange(v.slice(0, i) + v.slice(i + 1));
      } else if (i > 0) {
        inputs.current[i - 1]?.focus();
        onChange(v.slice(0, i - 1) + v.slice(i));
      }
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, length);
    if (pasted) onChange(pasted);
  };

  return (
    <div className="flex justify-center gap-2.5 my-4" onPaste={handlePaste}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={c.trim()}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(-1)}
          className={`w-12 h-14 text-center text-xl font-mono font-bold rounded-xl border bg-bgElev outline-none transition-all disabled:opacity-50 ${
            focused === i ? "border-accent ring-2 ring-accent/20" : "border-border"
          } text-text`}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
