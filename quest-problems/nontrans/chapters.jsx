import { C, t } from "@/components/quest/theme";
import { getNonTransSections, NonTransDeepAuditSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given two dice A, B, does a die C exist making A beats B beats C beats A?",
        "A→B, B→C, C→A 로 이어지는 주사위 C 가 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfb2"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Non-Transitive Dice</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print 'yes' if a die C exists with A beats B, B beats C, and C beats A — otherwise 'no'.",
                "A 가 B 를, B 가 C 를, C 가 A 를 이기는 주사위 C 가 있으면 'yes' 를, 없으면 'no' 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "two 4-sided dice A and B", "두 개의 4면 주사위 A 와 B")}</b>
                  {t(E, " — each face is an integer in [1, 10] (faces can repeat).",
                        " 가 주어져요. 각 면은 [1, 10] 사이 정수예요 (같은 값이 여러 면에 있어도 돼요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Die X beats die Y", "주사위 X 가 Y 를 이긴다")}</b>
                  {t(E, " if among the 16 (x, y) outcomes, more have x > y than y > x.",
                        "는 건, 16가지 (x, y) 결과 중 x > y 인 쪽이 y > x 인 쪽보다 많다는 뜻이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're told ", "조건: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "A beats B", "A 가 B 를 이겨요")}</b>
                  {t(E, ". Find a 4-sided die C (faces in [1, 10]) such that ", ". 4면 주사위 C (면 ∈ [1, 10]) 를 찾되 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "B beats C and C beats A", "B 가 C 를 이기고, C 가 A 를 이기도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "그런 C 가 존재하면 ")}
                  <b style={{ color: "#15803d" }}>'yes'</b>
                  {t(E, " if such a C exists, otherwise ", " , 없으면 ")}
                  <b style={{ color: "#15803d" }}>'no'</b>
                  {t(E, ".", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1180) — 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? T test cases, then T lines of 8 numbers each.",
        "테스트 케이스 개수 T 다음, 8개 숫자로 된 줄이 T번 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>{t(E, "8 numbers", "정수 8개")}</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— die A's 4 faces, then die B's 4 faces, on one line", "— 주사위 A 의 4면, 이어서 B 의 4면, 한 줄에")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats T times", "↑ 이 줄이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "'yes' or 'no' for each test case, one per line (T lines).",
                  "테스트 케이스마다 'yes' 또는 'no' 를 한 줄씩 출력해요 (T 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>{t(E, "each face value is an integer from 1 to 10", "각 면의 값은 1~10 사이 정수")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "the same value can appear on multiple faces of one die", "같은 값이 한 주사위의 여러 면에 있어도 돼요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "'A beats B' means A is more likely to roll a higher value than B.\nWhat does this mean mathematically?", "'A 가 B 를 이긴다' 는 걸 수로 나타내면 어떻게 될까요?"),
      question: t(E,
        "Die A 'beats' die B means:",
        "주사위 A 가 B 를 '이긴다' 는 건 무슨 뜻일까요?"),
      options: [
        t(E, "More (a,b) pairs where a > b than a < b", "a > b 인 (a,b) 쌍이 a < b 인 쌍보다 많아요"),
        t(E, "Sum of A's sides > sum of B's sides", "A 의 면 합이 B 의 면 합보다 커요"),
        t(E, "Max of A > max of B", "A 의 최댓값이 B 의 최댓값보다 커요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! We compare all 16 pairs (4x4). If A wins more matchups than B, A beats B.",
        "맞아요! 16개 쌍(4x4)을 모두 견줘서 A 가 이기는 쌍이 더 많으면 A 가 B 를 이기는 거예요."),
    },
    // 1-3: Deep audit sim — step through every (x, y) pair, watch
    // beats(X, Y) build up one outcome at a time. Try the rock-paper-
    // scissors-style cycle (4444 ▶ 3336 ▶ 2255 ▶ 4444) yourself.
    {
      type: "reveal",
      narr: t(E,
        "Pick a dice pair, then tap 'Next pair' — watch the win/lose tally build up.",
        "쌍을 하나씩 열어 보며 win / lose 가 쌓이는 걸 봐요."),
      content: <NonTransDeepAuditSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "A=[1,2,3,4] vs B=[1,2,3,4].\nSame dice!\nDoes A beat B?\nCount pairs where a>b vs a<b.\nThey're equal, so no.\nEnter 0 for no.", "같은 주사위라 a>b 와 a<b 가 같아요. 그래서 답은 0 이에요."),
      question: t(E,
        "A=[1,2,3,4], B=[1,2,3,4]. Does A beat B? (1=yes, 0=no)",
        "A=[1,2,3,4], B=[1,2,3,4] 예요. A 가 B 를 이길까요? (1=예, 0=아니오)"),
      hint: t(E,
        "Compare a > b vs a < b counts across all 16 pairs. Is one strictly greater?",
        "16 쌍에서 a > b 와 a < b 가 몇 개인지 세어 봐요. 한쪽이 더 많나요?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Each die face is in 1..10, so we can brute-force C — enumerate all sorted 4-face dice.",
        "C 의 면이 1..10 뿐이라 후보를 하나씩 다 해 볼 수 있어요."),
      sections: getNonTransSections(E),
    },
  ];
}
