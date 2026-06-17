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
  /** Optional sidebar JSX (e.g. a sample-input panel highlighting which
   *  lines this section reads). When present, the section renders in a
   *  2-column layout on wide screens. */
  aside?: React.ReactNode;
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
  const [showAside, setShowAside] = useState(false);
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const safeIdx = Math.min(Math.max(idx, 0), sections.length - 1);
  const s = sections[safeIdx];
  const code = lang === "py" ? s.py : s.cpp;
  const langSpecific = lang === "py" ? s.pyOnly ?? [] : s.cppOnly ?? [];

  return (
    <div style={{ padding: 14 }}>
      {/* Top bar: dot section selector + language hint */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: i === safeIdx ? accentColor : "#fff",
                border: `1.5px solid ${i === safeIdx ? accentColor : C.border}`,
                color: i === safeIdx ? "#fff" : C.dim,
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {s.aside && (
            <button
              onClick={() => setShowAside((v) => !v)}
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 7,
                border: `1.5px solid ${accentColor}`,
                cursor: "pointer",
                background: showAside ? accentColor : "#fff",
                color: showAside ? "#fff" : accentColor,
              }}
            >
              📥 {t(E, "Sample input", "샘플 입력")}
            </button>
          )}
          <span style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>
            {langLabel}
          </span>
        </div>
      </div>

      {/* Single section. With `aside` set, render side-by-side: code on the
          left, sample-input panel on the right with a clear gap between them. */}
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
        {s.aside && showAside && <div>{s.aside}</div>}
      </div>

    </div>
  );
}
