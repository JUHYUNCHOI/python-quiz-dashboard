import { C, t } from "@/components/quest/theme";
import { getLogicalMoosSections, LogicalMoosSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

const ACCENT = "#4f46e5";       // indigo-600
const TINT   = "#e0e7ff";        // indigo-100
const BORDER = "#a5b4fc";        // indigo-300
const DARK   = "#3730a3";        // indigo-800

export function makeLogicalCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ has a long boolean expression — alternating true/false tokens with and/or operators. Each query asks: can we replace one slice with a single boolean so the whole thing equals the target?",
        "FJ 의 긴 불리언 수식 — true/false 토큰과 and/or 연산자가 번갈아 나와요. 각 쿼리는 묻기: 한 구간을 하나의 불리언으로 바꿔서 전체가 target 과 같아질 수 있을까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧠</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: ACCENT }}>Logical Moos</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: TINT, border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5 }}>
              {t(E,
                "For each query (l, r, target), output 'Y' if some single boolean replacement of tokens l..r makes the whole expression equal target, else 'N'.",
                "각 쿼리 (l, r, target) 에 대해 — l..r 구간을 하나의 불리언으로 교체했을 때 전체 식이 target 이 될 수 있으면 'Y', 없으면 'N'.")}
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 8 }}>
              📖 {t(E, "Setup", "설정")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E,
                "A boolean statement N keywords long (N odd). Odd positions are 'true' or 'false'; even positions are 'and' or 'or'. 'and' has higher precedence than 'or' — evaluate ALL ands first, then ors. Q queries each give (l, r, target): replace tokens at positions l..r (l, r both odd) with ONE boolean — answer 'Y' if some choice makes the result equal target, else 'N'.",
                "N 개 키워드 (N 홀수). 홀수 위치는 'true'/'false', 짝수 위치는 'and'/'or'. 'and' 가 'or' 보다 우선 — and 모두 먼저 계산 후 or. Q 개 쿼리 (l, r, target) — l..r (둘 다 홀수) 구간을 하나의 불리언으로 교체했을 때 target 이 될 수 있으면 'Y', 아니면 'N'.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N &lt; 2·10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>N odd</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ Q ≤ 2·10⁵</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample 1: 5 tokens, 7 queries → 'NYYYNYY'. Walk through query 4 below.",
        "샘플 1: 토큰 5 개, 쿼리 7 개 → 'NYYYNYY'. 4 번 쿼리를 아래에서 따라가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: DARK, marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: DARK, whiteSpace: "pre" }}>
{`5 7
false and true or true
1 1 false
1 3 true
1 5 false
3 3 true
3 3 false
5 5 false
5 5 true`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`NYYYNYY`}
              </div>
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: DARK, marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — query 4 (l=3, r=3, target=true)", "풀이 — 4 번 쿼리 (l=3, r=3, target=true)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Replace position 3 (token 'true' with v):  false and v or true",
                    "위치 3 ('true') 를 v 로 교체:  false and v or true")}
              <br/>
              {t(E, "Pick v = true:  false and true = false  →  false or true = true. ✓ matches target.",
                    "v = true:  false and true = false  →  false or true = true. ✓ target 과 일치.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ answer 'Y' for query 4.", "→ 4 번 쿼리 답 'Y'.")}
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the simulator — pick a preset, then drag l/r and toggle target to see Y/N live. Same color = same AND-chain (broken by OR).",
        "시뮬레이터 — 프리셋 고르고, l/r 끌고 target 토글하면 Y/N 실시간 확인. 같은 색 = 같은 AND-체인 (OR 가 끊음)."),
      content: (<LogicalMoosSim E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "'and' binds tighter than 'or' — evaluate ANDs first.",
        "'and' 가 'or' 보다 우선 — AND 먼저 계산."),
      question: t(E,
        "What does 'true or false and false' evaluate to?",
        "'true or false and false' 의 결과는?"),
      options: ["true", "false"],
      correct: 0,
      explain: t(E,
        "'and' first: false and false = false → 'true or false' → true.",
        "'and' 먼저: false and false = false → 'true or false' → true."),
    },

    {
      type: "input",
      narr: t(E,
        "Per query, try replacing the slice with 'true' AND with 'false' — if either matches the target, answer Y.",
        "쿼리마다 구간을 'true' 와 'false' 둘 다로 교체 시도 — 하나라도 target 과 같으면 Y."),
      question: t(E,
        "'false and true or true', query (l=3, r=3, target=false). Replace position 3 with 'false': 'false and false or true'. Result = ? (1 = true, 0 = false)",
        "'false and true or true', 쿼리 (l=3, r=3, target=false). 위치 3 을 'false' 로 교체: 'false and false or true'. 결과 = ? (1 = true, 0 = false)"),
      hint: t(E,
        "Apply 'and' first, then 'or'.  Step through the three tokens.",
        "'and' 먼저 처리 후 'or'. 토큰 셋을 차례대로."),
      answer: 1,
    },
  ];
}

export function makeLogicalCh2(E, lang = "py") {
  const sections = getLogicalMoosSections(E);
  return [
    ...sections.map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Build evaluate(tokens) using the OR-of-(AND chains) idea, then per query try both replacement values.  Sections build it one piece at a time.",
            "OR-of-(AND 체인) 으로 evaluate(tokens) 작성, 쿼리마다 두 교체값 시도. 아래 섹션이 한 단락씩 쌓아요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
