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
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* 2026-09-21 PM 판정 (2차): "이 문제 안에서" 는 전치사구고 무엇의
              번호인지 가리키는 명사가 없었다 — 학생이 끝까지 못 알아봤다.
              형제 배지의 "같은 대회" 는 그 자체로 완결된 명사구라 작동했다.
              같은 모양으로 명사를 넣는다 — "코드 부분 N" 꼴(무엇을 세는지
              밝힌다). 모양·색·크기는 그대로, 문구만 바꾼다. */}
          <span
            className="text-[10px] font-semibold whitespace-nowrap"
            style={{ color: accentColor }}
          >
            <span className="hidden sm:inline">{t(E, "Code part", "코드 부분")}</span>
            <span className="sm:hidden">{t(E, "Part", "코드")}</span>
          </span>
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
                  {/* ⚠️ 2026-09-17: 여기가 그냥 <span>{line}</span> 이었다.
                      그래서 글쓴이가 절 단위로 넣어 둔 `\n` 이 **공백으로 뭉개졌다.**
                      실측 quest 40개 · 문자열 160개가 `\n` 을 넣어 두고 있었고
                      **그 줄바꿈이 하나도 화면에 안 나오고 있었다.**
                      선생님이 두 번 말씀하신 한글 줄바꿈 규칙(keep-all + balance +
                      절 단위 `<br />`)이 이 컴포넌트에서만 통째로 빠져 있었다.
                      memory/feedback_korean_linebreak.md */}
                  <span style={{ whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>{line}</span>
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
                  {/* ⚠️ 2026-09-18: why 만 고치고 이 전용 노트는 빠뜨렸다 (2026-09-17). */}
                  <span style={{ whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>{line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          <CodeBlock lines={code} lang={lang} isEn={!!E} />
        </div>
        </div>
        {s.aside && showAside && <div>{s.aside}</div>}
      </div>

    </div>
  );
}
