import { C, t } from "@/components/quest/theme";
import { getMcc15IsthmusSections, Mcc15IsthmusDeepAuditSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "count = 0",
  "for i in range(K, N - K):",
  "    # Check if position i is a peak",
  "    is_peak = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] >= a[i - j + 1]:",
  "            is_peak = False",
  "            break",
  "    if is_peak:",
  "        for j in range(0, K):",
  "            if a[i + j] <= a[i + j + 1]:",
  "                is_peak = False",
  "                break",
  "    if is_peak:",
  "        count += 1",
  "        continue",
  "",
  "    # Check if position i is a valley",
  "    is_valley = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] <= a[i - j + 1]:",
  "            is_valley = False",
  "            break",
  "    if is_valley:",
  "        for j in range(0, K):",
  "            if a[i + j] >= a[i + j + 1]:",
  "                is_valley = False",
  "                break",
  "    if is_valley:",
  "        count += 1",
  "",
  "print(count)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A sequence of N heights and a parameter K are given. Position i is a PEAK if its K immediate left neighbors are strictly INCREASING up to i and its K immediate right neighbors are strictly DECREASING from i. A VALLEY is the opposite.\nPrint the TOTAL number of peaks plus valleys.",
        "길이 N 의 높이 수열과 매개변수 K 가 주어져요. 위치 i 가 PEAK 이려면 바로 왼쪽 K 개 이웃이 순증가하여 i 에 도달, 바로 오른쪽 K 개 이웃이 i 에서 순감소. VALLEY 는 그 반대.\nPEAK 와 VALLEY 의 총 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u26f0\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Isthmus</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Print the total number of peaks plus valleys in the sequence.",
                    "수열에서 PEAK 와 VALLEY 의 총 개수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given a ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "sequence of N heights and parameter K", "길이 N 의 높이 수열과 매개변수 K")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "PEAK at i", "PEAK 위치 i")}</b>
                  {t(E, ": K left neighbors STRICTLY INCREASING up to i AND K right neighbors STRICTLY DECREASING from i.",
                        ": 왼쪽 K 개 이웃이 i 까지 순증가, 오른쪽 K 개 이웃이 i 에서 순감소.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "VALLEY at i", "VALLEY 위치 i")}</b>
                  {t(E, ": same but DECREASING then INCREASING.",
                        ": 같은 형태인데 순감소 후 순증가.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL number of peaks plus valleys", "PEAK 와 VALLEY 의 총 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <Mcc15IsthmusDeepAuditSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Sequence [1, 3, 5, 3, 1] with K=2.\nPosition 2 (value 5) has 2 increasing on the left (1<3<5) and 2 decreasing on the right (5>3>1).\nIs it a peak?", "수열 [1, 3, 5, 3, 1]에서 K=2. 위치 2 (값 5)는 왼쪽 2개 증가 (1<3<5), 오른쪽 2개 감소 (5>3>1). 봉우리예요?"),
      question: t(E,
        "[1,3,5,3,1], K=2. How many peaks + valleys?",
        "[1,3,5,3,1], K=2. 봉우리 + 골짜기 개수?"),
      options: [
        "0",
        "1",
        "2",
        "3",
      ],
      correct: 1,
      explain: t(E,
        "Position 2 (value 5) is a peak: left side 1<3<5 (increasing), right side 5>3>1 (decreasing). That's the only peak or valley. Count = 1!",
        "위치 2 (값 5)가 봉우리: 왼쪽 1<3<5 (증가), 오른쪽 5>3>1 (감소). 유일한 봉우리/골짜기예요. 개수 = 1!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For [1,3,5,3,1] with K=2, how many peaks + valleys are there?", "[1,3,5,3,1]에서 K=2일 때, 봉우리 + 골짜기는 몇 개?"),
      question: t(E,
        "[1,3,5,3,1], K=2. Total peaks + valleys = ?",
        "[1,3,5,3,1], K=2. 봉우리 + 골짜기 총 수 = ?"),
      hint: t(E,
        "Check each interior position. How many qualify as a peak or a valley?",
        "안쪽 위치를 하나씩 확인해봐요. 봉우리나 골짜기로 인정되는 건 몇 개?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "For each candidate position i (where K ≤ i < N − K), check the K immediate neighbors on each side. PEAK: left K strictly increasing AND right K strictly decreasing. VALLEY: opposite. Solution code — read part by part. Toggle Python ↔ C++ in header. Sections build it one piece at a time.",
        "각 후보 위치 i (K ≤ i < N − K) 마다 양쪽 K 개 이웃을 확인. PEAK: 왼쪽 K 순증가 AND 오른쪽 K 순감소. VALLEY: 반대. 풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc15IsthmusSections(E),
    },
  ];
}
