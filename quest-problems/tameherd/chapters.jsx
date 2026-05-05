import { C, t } from "@/components/quest/theme";
import { getTameHerdSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "log = list(map(int, input().split()))",
  "",
  "# log[i] = -1 means missing; otherwise it's the counter value on day i.",
  "# Between two known days (i1, v1) and (i2, v2):",
  "#   if v2 == v1 + (i2 - i1)  -> no breakout in between",
  "#   else: there must have been a breakout at some day d in (i1, i2]",
  "#         such that v2 == i2 - d.",
  "# Validate consistency, then count MIN and MAX breakouts.",
  "",
  "MIN = 0",
  "MAX = 0",
  "prev_i = -1",
  "prev_v = None",
  "ok = True",
  "",
  "for i in range(N):",
  "    v = log[i]",
  "    if v == -1:",
  "        continue",
  "    if prev_v is None:",
  "        if v > i:",
  "            ok = False",
  "            break",
  "        MIN += 0 if v == i else 1",
  "        MAX += i",
  "    else:",
  "        gap = i - prev_i",
  "        if v == prev_v + gap:",
  "            pass",
  "        else:",
  "            d = i - v",
  "            if not (prev_i < d <= i):",
  "                ok = False",
  "                break",
  "            MIN += 1",
  "            MAX += 1",
  "    prev_i, prev_v = i, v",
  "",
  "if not ok:",
  "    print(-1)",
  "else:",
  "    if prev_i != -1:",
  "        MAX += (N - 1 - prev_i)",
  "    else:",
  "        MIN, MAX = 0, N",
  "    print(MIN, MAX)",
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
        "FJ 가 매일 '마지막 탈출 이후 며칠인지' 를 기록해요. 탈출이 일어난 날에 카운터가 0 으로 리셋되고, 그 다음날부터 1 씩 증가해요. 일부 기록은 누락돼서 −1 로 표시돼요.\n로그와 일치하는 탈출 횟수의 최솟값과 최댓값을 출력해요. 불가능하면 −1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
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
                  <b style={{ color: "#dc2626" }}>{t(E, "missing (−1)", "누락돼서 −1 로 표시")}</b>
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
        "Walk the log once, tracking the previous known value. Each 0 marks a breakout. For non-zero values, verify consistency: this should be previous + 1, OR a new sequence starting from 0/breakout.",
        "로그를 한 번 순회, 이전 알려진 값 추적. 0 은 탈출 표시. 0 이 아닌 값은 일관성 확인: 이전 + 1 이거나 새 시퀀스 시작 (0/탈출)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init prev_known = -1", "prev_known = -1 초기화"), code: "prev = -1; min_b = 0; max_b = 0", color: "#8b5cf6" },
              { n: 2, label: t(E, "Scan log entries", "로그 순회"), code: "for i, x in enumerate(log):", color: "#7c3aed" },
              { n: 3, label: t(E, "Validate each non-missing value", "결손 아닌 값 검증"), code: "if x == 0: count breakout;  elif x != -1: check vs prev", color: "#0891b2" },
              { n: 4, label: t(E, "Print min, max, exact (if known)", "min, max, 정확값 출력"), code: "print(min_breakouts, max_breakouts, exact)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan", "선형 한 번 스캔")}</div>
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
