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
        "참/거짓이 and·or 로 길게 이어진 수식이에요.\n한 구간만 바꿔서 원하는 답을 만들 수 있을까요?"),
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
                "물음 (l, r, target) 마다 답해요. l..r 구간을 참/거짓 하나로 바꿔서 전체 식이 target 이 될 수 있으면 'Y', 없으면 'N' 을 적어요.")}
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 8 }}>
              📖 {t(E, "Setup", "문제 설명")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E,
                "A boolean statement N keywords long (N odd). Odd positions are 'true' or 'false'; even positions are 'and' or 'or'. 'and' has higher precedence than 'or' — evaluate ALL ands first, then ors. Q queries each give (l, r, target): replace tokens at positions l..r (l, r both odd) with ONE boolean — answer 'Y' if some choice makes the result equal target, else 'N'.",
                "낱말 N 개로 된 수식이에요 (N 은 홀수). 홀수 번째 자리에는 'true' 나 'false' 가, 짝수 번째 자리에는 'and' 나 'or' 가 와요. 'and' 를 'or' 보다 먼저 계산해요. 'and' 를 모두 끝낸 다음에 'or' 를 계산해요. 물음은 Q 개예요. 물음마다 (l, r, target) 이 주어지고, l..r 자리(둘 다 홀수)를 참/거짓 하나로 바꿔서 target 을 만들 수 있으면 'Y', 못 만들면 'N' 을 적어요.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N &lt; 200,000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>N odd</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ Q ≤ 200,000</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample 1: 5 tokens, 7 queries → 'NYYYNYY'. Walk through query 4 below.",
        "샘플 1 은 낱말 5 개에 물음 7 개예요.\n답은 'NYYYNYY' 예요.\n네 번째 물음을 아래에서 같이 따라가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식 예제")}
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
              🔍 {t(E, "Walkthrough — query 4 (l=3, r=3, target=true)", "풀이 — 네 번째 물음 (l=3, r=3, target=true)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Replace position 3 (token 'true' with v):  false and v or true",
                    "3 번 자리('true')를 v 로 바꿔요:  false and v or true")}
              <br/>
              {t(E, "Pick v = true:  false and true = false  →  false or true = true. ✓ matches target.",
                    "v 를 true 로 고르면  false and true = false  →  false or true = true. ✓ target 과 같아요.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ answer 'Y' for query 4.", "→ 네 번째 물음의 답은 'Y' 예요.")}
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the simulator — pick a preset, then drag l/r and toggle target to see Y/N live. Same color = same AND-chain (broken by OR).",
        "예제를 하나 고르고 l 과 r 을 끌어 보세요.\ntarget 을 바꾸면 Y/N 이 바로 보여요.\n같은 색은 같은 AND 묶음이에요. OR 를 만나면 묶음이 끊겨요."),
      content: (<LogicalMoosSim E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "'and' binds tighter than 'or' — evaluate ANDs first.",
        "'and' 를 'or' 보다 먼저 계산해요."),
      question: t(E,
        "What does 'true or false and false' evaluate to?",
        "'true or false and false' 를 계산하면 무엇이 될까요?"),
      options: ["true", "false"],
      correct: 0,
      explain: t(E,
        "'and' first: false and false = false → 'true or false' → true.",
        "'and' 를 먼저 계산해요. false and false = false 이고, 'true or false' 는 true 예요."),
    },

    {
      type: "input",
      narr: t(E,
        "Per query, try replacing the slice with 'true' AND with 'false' — if either matches the target, answer Y.",
        "물음마다 그 구간을 'true' 로도 바꿔 보고 'false' 로도 바꿔 봐요.\n하나라도 target 과 같으면 Y 예요."),
      question: t(E,
        "'false and true or true', query (l=3, r=3, target=false). Replace position 3 with 'false': 'false and false or true'. Result = ? (1 = true, 0 = false)",
        "'false and true or true' 에서 물음은 (l=3, r=3, target=false) 예요. 3 번 자리를 'false' 로 바꾸면 'false and false or true' 가 돼요. 결과는 무엇일까요? (1 = true, 0 = false)"),
      hint: t(E,
        "Apply 'and' first, then 'or'.  Step through the three tokens.",
        "'and' 를 먼저 하고 그다음에 'or' 를 해요. 낱말 셋을 차례대로 보세요."),
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
            "Sweep the line once forward and once backward, storing what sits before and after every token. Then each question is answered in one step.",
            "앞에서 한 번, 뒤에서 한 번 훑으며\n토큰마다 «앞에 무엇이 있고 뒤에 무엇이 있는지» 를 담아 둬요.\n그러면 물음마다 한 걸음이면 끝나요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
