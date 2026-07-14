// CodeWalk — 코드를 '한 조각씩 밝히며' 그 조각 바로 위에 설명 말풍선.
// (선생님 2026-07-13: "코드 위에 설명을 안 읽게 되더라" — 설명 블록을 코드와 떨어뜨리면
//  눈이 코드로 바로 가서 설명을 건너뜀. 그래서 설명을 '지금 밝아진 줄'에 붙임.)
//
// (선생님 2026-07-13 추가: "코드가 길면 버튼 누르기 힘들고, 말풍선이 위에 있으면 설명할 때
//  안 보인다." → 코드를 '고정 높이 창'으로 만들고, 지금 밝아진 줄을 창 맨 위로 자동 스크롤.
//  말풍선·코드창·버튼이 항상 한 화면에 같이 보이게. 페이지가 길어지지 않음.)
//
// 사용:
//   <CodeWalk E={E} lang="py" code={[...lines]} accent="#16a34a" beats={[
//     { hi: [0, 3], bubble: t(E, "...", "...") },   // hi = 밝힐 줄 범위 (0-based, 양끝 포함)
//   ]} />

import { useRef, useEffect } from "react";
import { t } from "@/components/quest/theme";
import { highlight } from "@/components/quest/shared";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

// vars(선택): [{ v:"seq", ko:"수열", en:"the sequence" }, ...] — 코드창 위에 '변수 뜻' 범례로 항상 표시.
// (선생님 2026-07-13: 코드 깊이 들어가면 "n이 뭐였지? seq가 뭐였지?" 함 → 늘 보이는 리마인더)
export function CodeWalk({ E, code, lang = "py", beats, accent = "#16a34a", vars = null }) {
  const { idx, setIdx, total } = useTraceStep(beats.length);
  const beat = beats[Math.min(idx, beats.length - 1)];
  const [lo, hi] = beat.hi;
  const done = idx >= beats.length - 1;
  const bColor = done ? "#6ee7b7" : "#fbbf24";

  // 코드창: 스텝 바뀔 때마다 지금 밝아진 첫 줄(lo)을 창 맨 위로 스크롤.
  // box.children[lo] 로 직접 찾음 (ref 콜백 타이밍에 안 의존 → 앞/뒤 이동 모두 안정적).
  const boxRef = useRef(null);
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const row = box.children[lo];   // lo 번째 코드 줄 div (box 직속 자식이 각 줄)
    if (row) box.scrollTop = Math.max(0, row.offsetTop - 12);
  }, [idx, lo]);

  return (
    <div style={{ padding: 16 }}>
      {/* 말풍선 — 지금 밝아진 코드 조각을 설명 (코드창 바로 위, 항상 보임) */}
      <div style={{ maxWidth: 560, margin: "0 auto 8px", position: "relative", zIndex: 5 }}>
        <div style={{
          background: done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`,
          borderRadius: 12, padding: "11px 14px", fontSize: 13,
          color: done ? "#065f46" : "#92400e", lineHeight: 1.55, minHeight: 42,
          display: "flex", alignItems: "center", justifyContent: "center",
          textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line",
          boxShadow: "0 4px 14px rgba(0,0,0,.08)",
        }}>💬 {beat.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto",
          borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
          borderTop: `10px solid ${bColor}` }} />
      </div>

      {/* 변수 뜻 범례 — 늘 보이게 (코드 깊이 들어가도 "n이 뭐였지?" 안 하게) */}
      {vars && vars.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, maxWidth: 640, margin: "0 auto 8px" }}>
          {vars.map((vr, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11.5, padding: "2px 9px", borderRadius: 999,
              background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", wordBreak: "keep-all",
            }}>
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#0f172a" }}>{vr.v}</code>
              <span style={{ color: "#94a3b8" }}>=</span>
              <span style={{ fontWeight: 600 }}>{t(E, vr.en, vr.ko)}</span>
            </span>
          ))}
        </div>
      )}

      {/* 코드 — 고정 높이 창, 밝아진 줄로 자동 스크롤.
          배경/글자색은 다른 레슨(CodeBlock)과 동일한 gray-900. 흐림 없이 전부 또렷,
          강조는 '밝은 왼쪽 막대 + 살짝 밝은 배경'만 (선생님 2026-07-13: 어둡지 않게). */}
      <div ref={boxRef} style={{
        background: "#111827", borderRadius: 12, padding: "12px 10px",
        overflowY: "auto", overflowX: "auto",
        maxHeight: "min(48vh, 380px)",
        fontFamily: "'JetBrains Mono',monospace",
        // ligature 끄기 — != 를 ≠ 로 합치지 말고 그대로 (선생님 2026-07-13)
        fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0',
        fontSize: 13.5, lineHeight: 1.85, maxWidth: 640, margin: "0 auto",
        position: "relative",
        boxShadow: "inset 0 -10px 12px -10px rgba(0,0,0,.4)",   // 아래에 더 있다는 힌트
      }}>
        {code.map((line, i) => {
          const isHot = i >= lo && i <= hi;
          return (
            <div key={i}
              style={{
                display: "flex", alignItems: "flex-start",
                background: isHot ? "#1f2b3e" : "transparent",   // gray-900 보다 살짝 밝게 (어둡지 않음)
                borderLeft: isHot ? `4px solid ${bColor}` : "4px solid transparent",
                borderRadius: isHot ? 5 : 0,
                padding: "1px 6px 1px 6px",
                opacity: 1,                                       // 흐림 없음 — 모든 줄 또렷
                transition: "background .2s",
              }}>
              <span style={{ color: isHot ? "#a3b3c9" : "#5b6675", width: 24, textAlign: "right", marginRight: 12, flexShrink: 0, userSelect: "none", fontSize: 11.5 }}>{i + 1}</span>
              <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1, minWidth: 0 }}>
                {highlight(line, lang)}
              </span>
            </div>
          );
        })}
      </div>

      {/* 진행 표시: 지금 몇 번째 조각인지 (코드창 바로 아래) */}
      <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", fontWeight: 700, margin: "8px 0 2px" }}>
        {t(E, `part ${idx + 1} of ${total}`, `${total} 조각 중 ${idx + 1} 번째`)}
      </div>

      {/* 버튼 — 코드창이 고정 높이라 항상 여기, 스크롤 없이 닿음 */}
      <div style={{ marginTop: 4 }}>
        <SimNav idx={idx} total={total} onIdx={setIdx} accent={accent} showLabels isEn={E} />
      </div>
    </div>
  );
}
