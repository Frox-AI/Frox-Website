"use client";
import { useState } from "react";

const STRENGTH = [
  { label: "Very Weak", color: "#ff4d4f", width: "20%" },
  { label: "Weak", color: "#ff9f43", width: "40%" },
  { label: "Fair", color: "#feca57", width: "60%" },
  { label: "Strong", color: "#48dbfb", width: "80%" },
  { label: "Very Strong", color: "#1dd1a1", width: "100%" },
];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 14) score++;
  return Math.min(score, 5);
}

export default function PasswordInput({ id, placeholder, value, onChange, disabled, showStrength, className = "" }) {
  const [visible, setVisible] = useState(false);
  const strength = getStrength(value || "");
  const level = STRENGTH[strength];

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-11 px-4 pr-12 rounded-lg bg-bgElev border border-border text-text text-sm font-mono outline-none focus:border-accent/60 transition-colors disabled:opacity-50 ${className}`}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-textFaint hover:text-textDim text-xs transition-colors"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {showStrength && value && (
        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-borderSoft overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: level.width, background: level.color }}
            />
          </div>
          <p className="text-xs" style={{ color: level.color }}>
            Password strength: <span className="font-semibold">{level.label}</span>
          </p>
        </div>
      )}
    </div>
  );
}
