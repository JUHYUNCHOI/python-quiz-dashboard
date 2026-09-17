import { C, t } from "@/components/quest/theme";
import { SimNav, useTraceStep } from "@/components/quest/TraceStepper";
import { getMcc19RectSections, ConsecutiveDiffScanSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


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
        "아무 두 수라면, 수가 5 개니까 짝이 10 가지 나와요.\n정말 다 확인해봐야 할까요?"),
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
      /* 2026-09-17: 파란 바가 62자였다. 55자 이하 한 문장으로 줄인다.
         "작은 수부터 큰 수 순서" 는 바로 아래 📖 문제 카드가 이미 말한다. */
      narr: t(E,
        "Find the smallest difference between ANY two of the numbers.",
        "아무 두 수를 골랐을 때 차이가 가장 작은 값을 찾아요."),
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
                   "리스트에서 아무 두 수나 골라 봐요.\n그때 나올 수 있는 가장 작은 차이를 출력해요.")}
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
              "5 와 7 의 차이가 2 예요. 10 과 12 도 2 예요.\n이보다 더 가까운 두 수는 없어요.")}
          </div>
        </div>),
    },
    // 1-2: 모든 짝을 다 봐야 하나 — 이 문제의 관찰 (원문 풀이의 핵심)
    {
      type: "reveal",
      narr: t(E,
        "Any two numbers? That is a lot of pairs. Let us look closer.",
        "아무 두 수나 고르면 경우가 아주 많아요. 좀 더 들여다봐요."),
      content: <WhyAdjacentSim E={E} />,
    },

    // 1-3: Quiz
    {
      type: "quiz",
      /* 2026-09-17: narr 이 question 을 그대로 다시 말하고 있었다 (좌표·리스트까지 똑같이).
         형제 quest(mcc20cipher:258)처럼 narr 은 "지금 뭘 볼 차례" 만 말한다. */
      narr: t(E,
        "Check the idea: neighbours are all we need.", "이웃한 두 수만 보면 되는지 직접 확인해봐요."),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Which pair gives the minimum difference?",
        "[1, 3, 5, 6] 에서 이웃한 두 수 중\n차이가 가장 작은 것은 무엇일까요?"),
      options: [
        t(E, "(1,3) → diff 2", "(1,3) → 차이 2"),
        t(E, "(3,5) → diff 2", "(3,5) → 차이 2"),
        t(E, "(5,6) → diff 1", "(5,6) → 차이 1"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! 6-5 = 1 is the smallest difference among consecutive pairs.",
        "맞아요. 이웃한 두 수의 차이 중에서 6 − 5 = 1 이 가장 작아요."),
    },
    // 1-2b: Sim — deep audit of the consecutive scan
    {
      type: "reveal",
      /* 2026-09-17: 57자였다. 무엇을 하는지는 시뮬이 화면에서 보여준다. */
      narr: t(E,
        "Step through the scan yourself, one neighbour at a time.",
        "이웃끼리 한 칸씩 훑는 걸 직접 넘겨봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <ConsecutiveDiffScanSim E={E} />
        </div>
      ),
    },
    // 1-3: Input
    {
      type: "input",
      /* 2026-09-17: 바로 위 퀴즈가 같은 리스트 [1,3,5,6] 을 쓰고 explain 에서
         "6 − 5 = 1 이 가장 작아요" 라고 답까지 말한 뒤, 이 칸이 또 1 을 물었다.
         계산이 아니라 방금 읽은 숫자를 다시 치는 문제가 된다.
         다른 수로 바꾼다 — [2, 9, 11, 16, 19] 의 이웃 차이는 7, 2, 5, 3 이고 답은 2. */
      narr: t(E,
        "Your turn — new numbers this time.", "이번엔 새 수들로 직접 구해볼 차례예요."),
      question: t(E,
        "Sorted list [2, 9, 11, 16, 19]. Min difference = ?",
        "[2, 9, 11, 16, 19] 에서 가장 작은 차이는 얼마일까요?"),
      hint: t(E,
        "Only neighbours can win. Take each neighbour pair's difference, then pick the smallest.",
        "이웃한 두 수끼리만 차이를 구해 보세요.\n그중 가장 작은 것이 답이에요."),
      answer: 2,
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
