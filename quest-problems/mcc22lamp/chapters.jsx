import { C, t } from "@/components/quest/theme";
import { getMcc22LampSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1  # number of lamps",
  "    M = int(input_data[idx]); idx += 1  # number of toggle ops",
  "",
  "    # Each toggle operation: toggle lamps from L to R",
  "    toggles = [0] * (N + 2)  # difference array",
  "    for _ in range(M):",
  "        L = int(input_data[idx]); idx += 1",
  "        R = int(input_data[idx]); idx += 1",
  "        toggles[L] += 1",
  "        toggles[R + 1] -= 1",
  "",
  "    # Prefix sum to get toggle count per lamp",
  "    count = 0",
  "    ans = 0",
  "    for i in range(1, N + 1):",
  "        count += toggles[i]",
  "        if count % 2 == 1:  # odd toggles = ON",
  "            ans += 1",
  "",
  "    print(ans)",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N lamps numbered 1..N are all OFF initially. M toggle operations are applied; each operation has a range [L, R] and toggles every lamp in that range (ON↔OFF).\nPrint how many lamps are ON after all operations.",
        "1..N 번호의 N 개 램프가 모두 꺼진 상태로 시작해요. M 번의 토글 연산이 있고, 각 연산은 범위 [L, R] 의 모든 램프를 토글 (ON ↔ OFF) 해요.\n모든 연산 후 켜진 램프의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udca1"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Lamp</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P6</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N lamps numbered 1..N, all OFF initially", "1..N 번호의 N 개 램프, 모두 꺼진 상태로 시작")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "M operations apply, each ", "M 번의 연산, 각각 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "toggles every lamp in a range [L, R]", "범위 [L, R] 의 모든 램프를 토글")}</b>
                  {t(E, " (ON ↔ OFF).", " (ON ↔ OFF).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of lamps that are ON after all operations", "모든 연산 후 켜진 램프의 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "5 lamps all OFF.\nToggle 1-5 (all flip ON), then toggle 2-4 (lamps 2,3,4 flip back OFF).\nWhich lamps are ON?", "5개 램프 모두 꺼짐. 1-5 토글 (모두 켜짐), 그 다음 2-4 토글 (램프 2,3,4 다시 꺼짐). 어떤 램프가 켜져 있어요?"),
      question: t(E,
        "After toggle(1-5) then toggle(2-4): which lamps are ON?",
        "toggle(1-5) 후 toggle(2-4): 어떤 램프가 켜져 있어요?"),
      options: [
        t(E, "Lamps 1 and 5 (toggled once each)", "램프 1과 5 (각각 한 번 토글)"),
        t(E, "Lamps 2, 3, 4 (toggled twice)", "램프 2, 3, 4 (두 번 토글)"),
        t(E, "All 5 lamps", "5개 모두"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Lamps 1 and 5 were toggled once (ON). Lamps 2,3,4 were toggled twice (OFF again). 2 lamps are ON.",
        "맞아! 램프 1과 5는 한 번 토글 (켜짐). 램프 2,3,4는 두 번 토글 (다시 꺼짐). 2개의 램프가 켜져 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many lamps are ON after toggle(1-5) then toggle(2-4)?", "toggle(1-5) 후 toggle(2-4) 후 켜진 램프 수는?"),
      question: t(E,
        "5 lamps, toggle(1-5), toggle(2-4). How many ON?",
        "램프 5개, toggle(1-5), toggle(2-4). 켜진 수?"),
      hint: t(E,
        "Lamp 1: 1 toggle (ON). Lamps 2-4: 2 toggles (OFF). Lamp 5: 1 toggle (ON). Answer: 2.",
        "램프 1: 1번 토글 (켜짐). 램프 2-4: 2번 토글 (꺼짐). 램프 5: 1번 토글 (켜짐). 답: 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Use difference array for range updates in O(1) each, then prefix sum in O(N).\nTotal: O(N + M).", "차분 배열로 범위 업데이트 각 O(1), 누적합 O(N). 총: O(N + M)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N + M)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Difference array trick: for toggle(L,R), increment diff[L] and decrement diff[R+1].\nPrefix sum gives total toggles per position. Count positions with odd toggle count.",
              "차분 배열 트릭: toggle(L,R)에서 diff[L]++ 하고 diff[R+1]-- 해요.\n누적합으로 위치별 총 토글 횟수를 구하고, 홀수인 위치를 세어.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22LampSections(E),
    },
  ];
}
