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
  "        L = int(input_data[idx])",
  "        idx += 1",
  "        R = int(input_data[idx])",
  "        idx += 1",
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
        "1..N 번호의 N 개 램프가 모두 꺼진 상태로 시작해요. M 번의 켜고 끄기 연산이 있고, 각 연산은 범위 [L, R] 의 모든 램프를 켜고 끄기 (ON ↔ OFF) 해요.\n모든 연산 후 켜진 램프의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca1"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Lamp</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P6</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Count lamps left ON after M range-toggle operations on N lamps.", "N \uac1c \ub7a8\ud504\uc5d0 M \ubc88\uc758 \ubc94\uc704 \ud1a0\uae00 \ud6c4 \ucf1c\uc838 \uc788\ub294 \ub7a8\ud504 \uc218\ub97c \uc138\uc694.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N lamps numbered 1..N, all OFF initially", "1..N 번호의 N 개 램프, 모두 꺼진 상태로 시작")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "M operations apply, each ", "M 번의 연산, 각각 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "toggles every lamp in a range [L, R]", "범위 [L, R] 의 모든 램프를 켜고 끄기")}</b>
                  {t(E, " (ON ↔ OFF).", " (ON ↔ OFF).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "For each lamp, count how many of the two operations cover it. Odd count = ON, even count = OFF. Then count the ON lamps.",
        "램프마다 두 연산 중 몇 개가 그 램프를 덮는지 세어 봐요. 홀수면 켜짐, 짝수면 꺼짐. 그 다음 켜진 램프를 세요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Difference array: for each toggle(L, R), do diff[L] += 1, diff[R+1] -= 1. Prefix-sum diff to get toggle COUNT per lamp. Count lamps with ODD toggle counts (those are ON). Sections build it one piece at a time.",
        "차분 배열: toggle(L, R) 마다 diff[L] += 1, diff[R+1] -= 1. 누적합으로 램프별 토글 횟수 계산. 홀수 토글된 램프 카운트 (켜진 것). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc22LampSections(E),
    },
  ];
}
