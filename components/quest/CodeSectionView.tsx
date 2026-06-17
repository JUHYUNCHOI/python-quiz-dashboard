"use client";

/**
 * CodeSectionView — Renders ONE section from a quest's `getXxxSections()`
 * data as a standalone code panel: header + "why" notes + lang-specific
 * notes + a copy-button-overlaid code block, plus an optional `aside`
 * (e.g. a sample-input panel highlighting which lines this section reads).
 *
 * Use this when a quest wants to split its progressive code into
 * separate chapter steps (one section per chapter step) instead of
 * cycling through them inside the ProgressiveCodeStepper. Single level
 * of navigation: chapter prev/next walks all sections naturally.
 */

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
  aside?: React.ReactNode;
}

export function CodeSectionView({
  section: s,
  lang = "py",
  E,
}: {
  section: Section;
  lang?: "py" | "cpp";
  E: boolean;
}) {
  const code = lang === "py" ? s.py : s.cpp;
  const langSpecific = lang === "py" ? s.pyOnly ?? [] : s.cppOnly ?? [];
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const [copied, setCopied] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be unavailable in some embeds
    }
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {s.aside && (
          <button
            onClick={() => setShowAside((v) => !v)}
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 7,
              border: `1.5px solid ${s.color}`,
              cursor: "pointer",
              background: showAside ? s.color : "#fff",
              color: showAside ? "#fff" : s.color,
            }}
          >
            📥 {t(E, "Sample input", "샘플 입력")}
          </button>
        )}
        <span style={{ fontSize: 10.5, color: "#6b7280", fontWeight: 700 }}>{langLabel}</span>
      </div>
      <div
        style={{
          marginBottom: 14,
          display: s.aside && showAside ? "grid" : "block",
          gridTemplateColumns: s.aside && showAside ? "minmax(0, 1fr) minmax(200px, 280px)" : undefined,
          gap: s.aside && showAside ? 20 : 0,
        }}
      >
        <div>
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
              border: "1.5px solid #e5e7eb",
              borderTop: "none",
              padding: "10px 12px",
            }}
          >
            {s.why && s.why.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    fontWeight: 800,
                    marginBottom: 6,
                    letterSpacing: 0.5,
                  }}
                >
                  💡 {t(E, "Why this way?", "왜 이렇게?")}
                </div>
                {s.why.map((line, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 12.5,
                      color: "#1f2937",
                      lineHeight: 1.65,
                      marginBottom: 4,
                      display: "flex",
                      gap: 6,
                    }}
                  >
                    <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
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
                  borderTop: "1px dashed #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#6b7280",
                    fontWeight: 800,
                    marginBottom: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {langLabel} {t(E, "specific:", "전용:")}
                </div>
                {langSpecific.map((line, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 12.5,
                      color: "#1f2937",
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
          <div style={{ position: "relative", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
            <button
              onClick={handleCopy}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 6,
                border: `1px solid ${copied ? "#16a34a" : "rgba(255,255,255,0.3)"}`,
                background: copied ? "rgba(22,163,74,0.85)" : "rgba(255,255,255,0.1)",
                color: copied ? "#fff" : "#cbd5e1",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
              title={t(E, "Copy code", "코드 복사")}
            >
              {copied ? `✓ ${t(E, "copied", "복사됨")}` : `📋 ${t(E, "copy", "복사")}`}
            </button>
            <CodeBlock lines={code} lang={lang} />
          </div>
        </div>
        {s.aside && showAside && <div>{s.aside}</div>}
      </div>
    </div>
  );
}

/** Generic helper for InputAside — sample input panel with highlighted lines. */
export function InputAside({
  E,
  lines,
  highlight = [],
  note = null,
}: {
  E: boolean;
  lines: string[];
  highlight?: number[];
  note?: React.ReactNode;
}) {
  const hi = new Set(highlight);
  return (
    <div
      style={{
        background: "#fef3c7",
        border: "1.5px solid #fbbf24",
        borderRadius: 10,
        padding: "8px 10px",
        fontSize: 11.5,
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 800, color: "#92400e", marginBottom: 6, letterSpacing: 0.3 }}>
        📥 {t(E, "Sample input", "샘플 입력")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              background: hi.has(i) ? "#fde68a" : "transparent",
              border: hi.has(i) ? "1.5px solid #f59e0b" : "1.5px solid transparent",
              borderRadius: 4,
              padding: "1px 5px",
              color: hi.has(i) ? "#7c2d12" : "#9ca3af",
              fontWeight: hi.has(i) ? 800 : 500,
              opacity: hi.has(i) ? 1 : 0.7,
            }}
          >
            {line || " "}
          </div>
        ))}
      </div>
      {note && (
        <div
          style={{
            marginTop: 8,
            paddingTop: 6,
            borderTop: "1px dashed #fcd34d",
            fontSize: 11,
            color: "#7c2d12",
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}
