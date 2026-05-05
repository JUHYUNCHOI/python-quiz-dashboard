"use client";
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

interface Section {
  label: string;
  color: string;
  py: string[];
  cpp: string[];
  why?: string[];
  pyOnly?: string[];
  cppOnly?: string[];
}

interface Props {
  E: boolean;
  lang?: "py" | "cpp";
  sections: Section[];
  accentColor?: string;
}

/**
 * Step-by-step progressive code viewer.
 * Renders ONE section at a time with prev/next navigation, instead of
 * dumping all sections in a long scroll. Used by every quest's
 * <XxxProgressiveCode> wrapper via re-export.
 */
export function ProgressiveCodeStepper({
  E,
  lang = "py",
  sections,
  accentColor = "#7c5cfc",
}: Props) {
  const [idx, setIdx] = useState(0);
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const safeIdx = Math.min(Math.max(idx, 0), sections.length - 1);
  const s = sections[safeIdx];
  const code = lang === "py" ? s.py : s.cpp;
  const langSpecific = lang === "py" ? s.pyOnly ?? [] : s.cppOnly ?? [];
  const isFirst = safeIdx === 0;
  const isLast = safeIdx === sections.length - 1;

  return (
    <div style={{ padding: 14 }}>
      {/* Top bar: language + step counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          fontSize: 11,
          color: C.dim,
          fontWeight: 700,
        }}
      >
        <span>
          {t(
            E,
            `${langLabel}  (change in header ↑)`,
            `${langLabel}  (위 헤더에서 변경)`
          )}
        </span>
        <span style={{ color: accentColor, fontWeight: 800, fontSize: 13 }}>
          {safeIdx + 1} / {sections.length}
        </span>
      </div>

      {/* Single section */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            background: s.color,
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "10px 10px 0 0",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          {s.label}
        </div>
        <div
          style={{
            background: "#fff",
            border: `1.5px solid ${C.border}`,
            borderTop: "none",
            padding: "10px 12px",
          }}
        >
          {s.why && s.why.length > 0 && (
            <>
              <div
                style={{
                  fontSize: 11,
                  color: C.dim,
                  fontWeight: 800,
                  marginBottom: 6,
                  letterSpacing: 0.5,
                }}
              >
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div
                  key={`w${j}`}
                  style={{
                    fontSize: 12.5,
                    color: C.text,
                    lineHeight: 1.65,
                    marginBottom: 4,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}
                  >
                    •
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </>
          )}
          {langSpecific.length > 0 && (
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: `1px dashed ${C.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: C.dim,
                  fontWeight: 800,
                  marginBottom: 4,
                  letterSpacing: 0.5,
                }}
              >
                {langLabel} {t(E, "specific:", "전용:")}
              </div>
              {langSpecific.map((line, j) => (
                <div
                  key={`l${j}`}
                  style={{
                    fontSize: 12.5,
                    color: C.text,
                    lineHeight: 1.65,
                    marginBottom: 4,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      color: lang === "py" ? "#16a34a" : "#0891b2",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          <CodeBlock lines={code} lang={lang} />
        </div>
      </div>

      {/* Prev / dots / Next nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          marginTop: 6,
        }}
      >
        <button
          onClick={() => setIdx(Math.max(0, safeIdx - 1))}
          disabled={isFirst}
          style={{
            background: isFirst ? "#e5e7eb" : "#fff",
            border: `2px solid ${isFirst ? "#e5e7eb" : accentColor}`,
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 800,
            color: isFirst ? "#b0b5c3" : accentColor,
            cursor: isFirst ? "default" : "pointer",
          }}
        >
          ← {t(E, "Previous", "이전")}
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: i === safeIdx ? accentColor : "#fff",
                border: `1.5px solid ${i === safeIdx ? accentColor : C.border}`,
                color: i === safeIdx ? "#fff" : C.dim,
                fontSize: 11,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIdx(Math.min(sections.length - 1, safeIdx + 1))}
          disabled={isLast}
          style={{
            background: isLast ? "#e5e7eb" : accentColor,
            border: `2px solid ${isLast ? "#e5e7eb" : accentColor}`,
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 800,
            color: isLast ? "#b0b5c3" : "#fff",
            cursor: isLast ? "default" : "pointer",
          }}
        >
          {t(E, "Next", "다음")} →
        </button>
      </div>
    </div>
  );
}
