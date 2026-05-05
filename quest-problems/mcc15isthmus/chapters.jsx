import { C, t } from "@/components/quest/theme";
import { getMcc15IsthmusSections } from "./components";

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
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Isthmus</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P4</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given a ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "sequence of N heights and parameter K", "길이 N 의 높이 수열과 매개변수 K")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "PEAK at i", "PEAK 위치 i")}</b>
                  {t(E, ": K left neighbors STRICTLY INCREASING up to i AND K right neighbors STRICTLY DECREASING from i.",
                        ": 왼쪽 K 개 이웃이 i 까지 순증가, 오른쪽 K 개 이웃이 i 에서 순감소.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "VALLEY at i", "VALLEY 위치 i")}</b>
                  {t(E, ": same but DECREASING then INCREASING.",
                        ": 같은 형태인데 순감소 후 순증가.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL number of peaks plus valleys", "PEAK 와 VALLEY 의 총 개수")}</b>
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
        "Only position 2 (value 5) qualifies as a peak. No valleys exist. Answer: 1",
        "위치 2 (값 5)만 봉우리로 인정돼요. 골짜기는 없어요. 답: 1"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each candidate position i (where K ≤ i < N − K), check the K immediate neighbors on each side. PEAK: left K strictly increasing AND right K strictly decreasing. VALLEY: opposite.",
        "각 후보 위치 i (K ≤ i < N − K) 마다 양쪽 K 개 이웃을 확인. PEAK: 왼쪽 K 순증가 AND 오른쪽 K 순감소. VALLEY: 반대."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Iterate valid positions", "유효 위치 순회"), code: "for i in range(K, N-K):", color: "#2563eb" },
              { n: 2, label: t(E, "Check K-strict-increasing left", "왼쪽 K 순증가 확인"), code: "left = all(h[i-K..i] strictly inc)", color: "#7c3aed" },
              { n: 3, label: t(E, "Check K-strict-decreasing right", "오른쪽 K 순감소 확인"), code: "right = all(h[i..i+K] strictly dec)", color: "#0891b2" },
              { n: 4, label: t(E, "Count peaks + valleys", "PEAK + VALLEY 합산"), code: "count += peak or valley;  print(count)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N · K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N positions × O(K) checks", "N 위치 × O(K) 검사")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15IsthmusSections(E),
    },
  ];
}
