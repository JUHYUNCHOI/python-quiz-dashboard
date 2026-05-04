import { C, t } from "@/components/quest/theme";
import { getMcc19ElimSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "# Sliding window: find longest substring with at most K zeros",
  "left = 0",
  "zero_count = 0",
  "best = 0",
  "",
  "for right in range(N):",
  "    if s[right] == '0':",
  "        zero_count += 1",
  "    while zero_count > K:",
  "        if s[left] == '0':",
  "            zero_count -= 1",
  "        left += 1",
  "    best = max(best, right - left + 1)",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given a binary string of length N and a limit K, you may delete at most K zeros from the string. After deletion, the remaining characters re-pack into a single string.\nPrint the LONGEST run of consecutive 1s achievable.",
        "길이 N 의 이진 문자열과 한계 K 가 주어져요. 문자열에서 최대 K 개의 0 을 지울 수 있어요. 지운 뒤 남은 문자가 한 문자열로 재조합돼요.\n달성 가능한 가장 긴 연속 1 의 길이를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🔢</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Elimination</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P5</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "binary string of length N", "길이 N 의 이진 문자열")}</b>
                  {t(E, " and a limit ", " 와 한계 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You may ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "delete at most K zeros", "최대 K 개의 0 을 지우기")}</b>
                  {t(E, ". The remaining characters re-pack into a single string.",
                        " 가능. 지운 뒤 남은 문자가 한 문자열로 재조합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "LONGEST run of consecutive 1s achievable", "달성 가능한 가장 긴 연속 1 의 길이")}</b>
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
        "String = \"10110\", K=1.\nIf we remove the 0 at position 2, we get \"11_10\" → \"1110\" streak of 4.\nOr remove pos 4: \"1011_\" → streak 3.\nBest is 4!", "문자열 = \"10110\", K=1.\n위치 2의 0을 제거하면 \"11_10\" → \"1110\" 연속 4.\n위치 4 제거: \"1011_\" → 연속 3.\n최선은 4!"),
      question: t(E,
        "\"10110\", K=1. What's the longest 1-streak after removing one 0?",
        "\"10110\", K=1. 0 하나를 제거한 후 가장 긴 1-연속은?"),
      options: [
        t(E, "3", "3"),
        t(E, "4", "4"),
        t(E, "5", "5"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Remove the 0 at index 2: window [0..3] = \"1_110\" has 4 ones with 1 zero removed.",
        "맞아! 인덱스 2의 0 제거: 윈도우 [0..3] = \"1_110\"에서 0 하나 제거로 1이 4개."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "\"10110\", K=1. Maximum consecutive 1s after removing at most 1 zero?", "\"10110\", K=1. 최대 1개의 0을 제거한 후 최대 연속 1의 수?"),
      question: t(E,
        "\"10110\", K=1. Longest streak = ?",
        "\"10110\", K=1. 가장 긴 연속 = ?"),
      hint: t(E,
        "Window [0,3] covers \"1011\" with 1 zero → length 4.",
        "윈도우 [0,3]이 \"1011\"을 포함하고 0이 1개 → 길이 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sliding window with two pointers. Expand the right side; if zeros in window > K, shrink left until back ≤ K. Track the maximum window size.",
        "투 포인터 슬라이딩 윈도우. 오른쪽으로 확장; 윈도우 안 0 의 수가 K 초과면 왼쪽을 줄여서 ≤ K. 최대 윈도우 크기 추적."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init pointers and zero count", "포인터, 0 카운트 초기화"), code: "l = zeros = best = 0", color: "#2563eb" },
              { n: 2, label: t(E, "Expand right", "오른쪽 확장"), code: "for r in range(N): if s[r] == '0': zeros += 1", color: "#7c3aed" },
              { n: 3, label: t(E, "Shrink left if zeros > K", "0 > K 면 왼쪽 축소"), code: "while zeros > K: if s[l]=='0': zeros -= 1; l += 1", color: "#0891b2" },
              { n: 4, label: t(E, "Track max window size", "최대 윈도우 크기"), code: "best = max(best, r - l + 1);  print(best)", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "each element visited at most twice", "각 원소 최대 두 번 방문")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19ElimSections(E),
    },
  ];
}
