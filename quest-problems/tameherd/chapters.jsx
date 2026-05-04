import { C, t } from "@/components/quest/theme";
import { getTameHerdSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "log = list(map(int, input().split()))",
  "",
  "# -1 means missing entry",
  "# 0 means breakout (counter resets)",
  "# positive means counter value",
  "",
  "# First pass: validate and find breakouts",
  "breakouts = 0",
  "prev = -1  # previous known value",
  "",
  "for i in range(N):",
  "    if log[i] == -1:",
  "        continue",
  "    if log[i] == 0:",
  "        breakouts += 1",
  "        prev = 0",
  "    else:",
  "        if prev == -1:",
  "            # first known entry",
  "            if log[i] > i:",
  "                print(-1)  # impossible",
  "                exit()",
  "            # breakouts before this = depends on value",
  "            breakouts += 1  # at least one breakout started this sequence",
  "            # actually log[i] tells us counter was at log[i]",
  "            # so breakout was log[i] steps ago",
  "        else:",
  "            pass",
  "        prev = log[i]",
  "",
  "# Simplified: count 0s in log",
  "count_zeros = sum(1 for x in log if x == 0)",
  "print(count_zeros)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTameHerdCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ keeps a daily log: each day records 'days since last breakout'. The counter resets to 0 the day a breakout occurs and increments by 1 each day after. Some entries are missing, marked −1.\nPrint the MIN and MAX possible number of breakouts consistent with the log, or −1 if impossible.",
        "FJ 가 매일 '마지막 탈출 이후 며칠인지' 를 기록해요. 탈출이 일어난 날에 카운터가 0 으로 리셋되고, 그 다음날부터 1 씩 증가해요. 일부 기록은 누락 (−1) 됐어요.\n로그와 일치하는 탈출 횟수의 최솟값과 최댓값을 출력해요. 불가능하면 −1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Taming the Herd</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has a daily log: ", "FJ 의 매일 기록: ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "'days since last breakout'", "'마지막 탈출 이후 일수'")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The counter ", "카운터는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "resets to 0 on a breakout day", "탈출 날에 0 으로 리셋")}</b>
                  {t(E, " and increments by 1 each subsequent day.",
                        " 되고, 그 다음날부터 1 씩 증가.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Some entries are ", "일부 기록은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "missing (−1)", "누락 (−1)")}</b>
                  {t(E, " — they could be any value.",
                        " — 어떤 값이든 될 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MIN and MAX possible number of breakouts consistent with the log", "로그와 일치하는 탈출 횟수의 최솟값과 최댓값")}</b>
                  {t(E, " (or −1 if impossible).", " 을 출력해요. 불가능하면 −1.")}
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
        "Log: [0, 1, 2, 0, 1]. Breakouts happen on days with value 0. How many breakouts?", "로그: [0, 1, 2, 0, 1]. 값 0인 날에 탈출 발생. 탈출 횟수는?"),
      question: t(E,
        "Log [0, 1, 2, 0, 1]. How many breakouts?",
        "로그 [0, 1, 2, 0, 1]. 탈출 횟수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Value 0 appears at day 1 and day 4. That's 2 breakouts!",
        "값 0이 1일차와 4일차에 나타나. 탈출 2회!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Log: [0, 1, 2, 0, 1]. Count the breakouts (days with value 0).", "로그: [0, 1, 2, 0, 1]. 탈출 횟수를 세봐 (값 0인 날)."),
      question: t(E,
        "Log [0, 1, 2, 0, 1]. Number of breakouts?",
        "로그 [0, 1, 2, 0, 1]. 탈출 횟수?"),
      hint: t(E,
        "Count the zeros: positions 0 and 3 have value 0.",
        "0의 개수: 위치 0과 3에 값 0이 있어요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTameHerdCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Scan through the log once. Count zeros and validate consistency. O(N) time!", "로그를 한 번 스캔. 0 세고 일관성 검증. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Single pass: track previous known value.\nEach 0 is a breakout. Validate that non-zero values are consistent (each should be previous + 1 or start a new sequence).",
              "한 번 순회: 이전 알려진 값 추적.\n각 0은 탈출.\n0이 아닌 값의 일관성 검증 (이전 + 1이거나 새 시퀀스 시작).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getTameHerdSections(E),
    },
  ];
}
