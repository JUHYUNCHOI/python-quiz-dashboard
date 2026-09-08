import { C, t } from "@/components/quest/theme";
import { SimNav, useTraceStep } from "@/components/quest/TraceStepper";
import { getMcc19RectSections, ConsecutiveDiffScanSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# List is already sorted (non-decreasing)",
  "min_diff = float('inf')",
  "for i in range(N - 1):",
  "    diff = a[i + 1] - a[i]",
  "    min_diff = min(min_diff, diff)",
  "",
  "print(min_diff)",
];


const KA = { wordBreak: "keep-all" };
const G = "#059669";

/* ─────────────────────────────────────────────────────────────
   WhyAdjacentSim — "모든 쌍을 다 봐야 하나?" 를 학생이 직접 확인한다.

   2026-09-08. 원문(ioimalaysia.org/competition/mcc/2019-editorial)의 풀이는
   "모든 쌍을 다 보는 게 naive. 그런데 정렬돼 있으니 **인접만 보면 된다는 걸 관찰**할 수 있다"
   이다. 그 관찰이 이 문제의 전부인데, 우리 화면엔 그 자리가 없었다.

   숫자는 원문 예제 [1, 5, 7, 10, 12] 를 그대로 쓴다.
   1 과 10 의 차이 9 = 4 + 2 + 3 (사이 간격들의 합). 그래서 멀리 떨어진 짝은
   사이 간격 하나보다 작아질 수 없다. 검산: 4+2+3 = 9 = 10−1 ✅
   ───────────────────────────────────────────────────────────── */
const NUMS = [1, 5, 7, 10, 12];
const GAPS = [4, 2, 3, 2];          // 이웃 간격 — 검산: 1+4=5, 5+2=7, 7+3=10, 10+2=12 ✅

function WhyAdjacentSim({ E }) {
  const { safe, setIdx, total } = useTraceStep(4);
  const far = [0, 3];               // 1 과 10

  const SAY = [
    t(E, "Any two numbers — that is 10 different pairs here. Do we really have to check them all?",
        "아무 두 수라면 여기선 짝이 10가지예요.\n정말 다 확인해봐야 할까요?"),
    t(E, "Take a far-apart pair: 1 and 10. Their difference is 9.",
        "멀리 떨어진 짝을 하나 봐요. 1 과 10.\n차이는 9 예요."),
    t(E, "Now look at the steps between them: 4, then 2, then 3. Add them: 4 + 2 + 3 = 9. The same 9.",
        "이제 그 사이 칸들을 봐요. 4, 2, 3.\n더하면 4 + 2 + 3 = 9.\n아까 그 9 와 똑같아요."),
    t(E, "A far pair is always the steps in between, added up. Adding more can never make it smaller — so only the steps between neighbours can win.",
        "멀리 떨어진 짝의 차이는 언제나 사이 칸들을 더한 것이에요.\n더 더하면 작아질 리가 없죠.\n그러니 가장 작은 차이는 이웃한 두 수 사이에서만 나와요."),
  ];

  return (
    <div style={{ padding: 16, ...KA }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 10 }}>
          🔍 {t(E, "Do we have to check every pair?", "짝을 다 확인해야 할까?")}
        </div>

        <div style={{ position: "relative", marginBottom: 14 }}>
          <div style={{
            background: safe === 3 ? "#ecfdf5" : "#fffbeb",
            border: `1.5px solid ${safe === 3 ? "#6ee7b7" : "#fbbf24"}`,
            borderRadius: 10, padding: "10px 13px",
            fontSize: 12.5, lineHeight: 1.75, color: C.text,
            whiteSpace: "pre-line", textWrap: "balance", ...KA,
          }}>
            {safe > 0 && (
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 5 }}>
                ↓ {safe === 1 ? t(E, "these two", "이 두 수 얘기예요")
                              : t(E, "the steps in between", "사이 칸들 얘기예요")}
              </div>
            )}
            💬 {SAY[safe]}
          </div>
          <div style={{
            position: "absolute", left: 26, bottom: -7, width: 12, height: 12,
            background: safe === 3 ? "#ecfdf5" : "#fffbeb",
            borderRight: `1.5px solid ${safe === 3 ? "#6ee7b7" : "#fbbf24"}`,
            borderBottom: `1.5px solid ${safe === 3 ? "#6ee7b7" : "#fbbf24"}`,
            transform: "rotate(45deg)",
          }} />
        </div>

        {/* 수들과 사이 칸 */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginBottom: 12, flexWrap: "wrap" }}>
          {NUMS.map((v, i) => (
            <div key={v} style={{ display: "flex", alignItems: "flex-end" }}>
              <div style={{
                minWidth: 42, textAlign: "center", padding: "8px 6px", borderRadius: 9,
                border: `2px solid ${safe >= 1 && (i === far[0] || i === far[1]) ? "#b45309" : "#d1fae5"}`,
                background: safe >= 1 && (i === far[0] || i === far[1]) ? "#fffbeb" : "#fff",
                fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: C.text,
              }}>{v}</div>
              {i < NUMS.length - 1 && (
                <div style={{
                  minWidth: 34, textAlign: "center", paddingBottom: 9,
                  fontSize: 11.5, fontWeight: 800,
                  color: safe >= 2 && i >= far[0] && i < far[1] ? "#b45309" : "#94a3b8",
                }}>
                  {safe >= 2 && i >= far[0] && i < far[1] ? GAPS[i] : "·"}
                </div>
              )}
            </div>
          ))}
        </div>

        {safe >= 1 && (
          <div style={{
            background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: "9px 12px",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.8,
            marginBottom: 12, ...KA,
          }}>
            <div>10 − 1 = <b style={{ color: "#fbbf24" }}>9</b></div>
            {safe >= 2 && <div>4 + 2 + 3 = <b style={{ color: "#fbbf24" }}>9</b></div>}
          </div>
        )}

        {safe === 3 && (
          <div style={{
            background: "#065f46", color: "#fff", borderRadius: 10,
            padding: "12px 14px", marginBottom: 12, textAlign: "center", ...KA,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 0.5, marginBottom: 4 }}>
              {t(E, "SO WE ONLY NEED", "그래서 볼 것은")}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.5 }}>
              {t(E, "just the neighbours, one step at a time.",
                   "이웃한 두 수만 한 칸씩 보면 돼요.")}
            </div>
          </div>
        )}

        <SimNav idx={safe} total={total} onIdx={setIdx} accent={G} showLabels isEn={E} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19RectCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-08: 미션이 답을 미리 말하고 있었다.
         원문(ioimalaysia.org/competition/mcc/2019-editorial, 직접 확인):
           "find the minimum differences between **any two numbers**"
         이고, "정렬돼 있으니 인접만 보면 된다" 는 **풀이의 관찰**이지 문제가 아니다.
         우리는 그 관찰을 1쪽 미션에 적어놔서 이 문제의 유일한 생각거리를 지웠다. */
      narr: t(E,
        "You get a list of numbers, small to large.\nFind the smallest difference between ANY two of them.",
        "작은 수부터 큰 수 순서로 놓인 수들이 주어져요.\n그중 아무 두 수나 골랐을 때, 차이가 가장 작은 값을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📏</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Rectangle (Min Diff)</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E, "Pick any two numbers from the list. Print the smallest difference you can get.",
                   "리스트에서 아무 두 수나 골랐을 때, 가장 작은 차이를 출력하기.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {/* 2026-09-08: 1쪽은 "오름차순", 5쪽은 "비내림차순" 이라고 서로 다르게 불렀다.
                      학생: "다른 말인데 뜻이 같은 건지 다른 건지 화면이 안 알려줌."
                      둘 다 버리고 풀어 쓴다. 같은 수가 이웃할 수 있다는 것까지 한 번에. */}
                  {t(E, "You get ", "수 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N numbers, lined up small to large", "N 개가 작은 것부터 큰 것 순서로")}</b>
                  {t(E, " — the same number may appear twice in a row.", " 놓여 있어요. 같은 수가 이웃해 있을 수도 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest difference between any two of them", "아무 두 수를 골랐을 때 나올 수 있는 가장 작은 차이")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 입력 형식이 없으면 샘플의 숫자가 무슨 뜻인지 알 수가 없다.
              근거: memory/feedback_problem_statement_readable.md */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E,
                  <>Line 1: N<br />Line 2: the N numbers, small to large</>,
                  <>첫 줄: N<br />둘째 줄: 수 N개 (작은 것부터 큰 것 순서)</>)}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E,
                  <>The smallest difference<br />between any two of them</>,
                  <>아무 두 수의 차이 중<br />가장 작은 값</>)}
              </div>
            </div>
          </div>

          {/* ③ 원문에 있는 공식 예제. 화면엔 없었다. (원문: numbers = [1, 5, 7, 10, 12] → 2) */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>5</div>
              <div>1 5 7 10 12</div>
            </div>
            <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>2</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.65, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "5 and 7 differ by 2. So do 10 and 12. No other pair is closer.",
              "5 와 7 의 차이가 2 예요. 10 과 12 도 2 고요. 이보다 가까운 짝은 없어요.")}
          </div>
        </div>),
    },
    // 1-2: 모든 짝을 다 봐야 하나 — 이 문제의 관찰 (원문 풀이의 핵심)
    {
      type: "reveal",
      narr: t(E,
        "Any two numbers? That is a lot of pairs. Let us look closer.",
        "아무 두 수라면 짝이 많아요. 좀 더 들여다봐요."),
      content: <WhyAdjacentSim E={E} />,
    },

    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For the sorted list [1, 3, 5, 6], which consecutive pair has the smallest difference?", "정렬된 리스트 [1, 3, 5, 6]에서 어떤 연속 쌍의 차이가 가장 작을까?"),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Which pair gives the minimum difference?",
        "정렬된 리스트 [1, 3, 5, 6]. 어떤 쌍이 최소 차이를 줘요?"),
      options: [
        t(E, "(1,3) → diff 2", "(1,3) → 차이 2"),
        t(E, "(3,5) → diff 2", "(3,5) → 차이 2"),
        t(E, "(5,6) → diff 1", "(5,6) → 차이 1"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! 6-5 = 1 is the smallest difference among consecutive pairs.",
        "맞아! 6-5 = 1이 연속 쌍 중 가장 작은 차이에요."),
    },
    // 1-2b: Sim — deep audit of the consecutive scan
    {
      type: "reveal",
      narr: t(E,
        "Watch the scan crawl across the sorted list, comparing each pair and tracking the smallest diff so far.",
        "정렬된 리스트를 한 칸씩 훑으면서 인접 쌍의 차이를 비교하고, 지금까지의 최솟값을 갱신해요."),
      content: (
        <div style={{ padding: 16 }}>
          <ConsecutiveDiffScanSim E={E} />
        </div>
      ),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now compute it yourself! List = [1, 3, 5, 6]. What is the minimum difference?", "이제 직접 계산해봐요! 리스트 = [1, 3, 5, 6]. 최소 차이는?"),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Min difference = ?",
        "정렬된 리스트 [1, 3, 5, 6]. 최소 차이 = ?"),
      hint: t(E,
        "Compute each consecutive diff (3-1, 5-3, 6-5), then pick the smallest.",
        "인접한 차이 (3-1, 5-3, 6-5) 를 각각 구한 뒤 가장 작은 걸 골라요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19RectCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      /* 전에는 여기서 "비내림차순이라 …" 라며 결론을 통보했다. 그 말은 어디서도 정의된 적이
         없었고(학생이 걸렸다), 관찰은 이제 앞 쪽에서 학생이 직접 한다. */
      narr: t(E, "We only look at neighbours — one pass down the list.",
                 "이웃끼리만 보면 돼요. 한 번만 훑어요."),
      sections: getMcc19RectSections(E),
    },
  ];
}
