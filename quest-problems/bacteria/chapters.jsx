import { C, t } from "@/components/quest/theme";
import { getBacteriaSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "ans = 0",
  "# prefix[i] = cumulative spray effect at position i",
  "prefix = [0] * (N + 1)",
  "",
  "for i in range(N):",
  "    # current value after all previous sprays",
  "    a[i] += prefix[i]",
  "    if a[i] != 0:",
  "        spray = -a[i]",
  "        ans += abs(a[i])",
  "        # spray of power `spray` affects i..N-1",
  "        # patch i gets spray, i+1 gets spray-sign,",
  "        # triangular: patch j gets spray-(j-i)*sign",
  "        # Use difference array for triangular update",
  "        prefix[i] += spray",
  "        if i + 1 <= N:",
  "            prefix[i + 1] += -spray  # cancel linear",
  "    if i + 1 < N:",
  "        prefix[i + 1] += prefix[i]",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N patches of bacteria have deviation values. A sprayer from the right applies a triangular pattern: at power L, the rightmost patch gets L, the next gets L-1, etc. Find the minimum number of applications to zero everything out!",
        "N개의 세균 패치에 편차값이 있어. 오른쪽에서 분무기를 쏘면 삼각형 패턴으로 적용돼: 파워 L이면 맨 오른쪽이 L, 그 다음이 L-1, ... 모든 값을 0으로 만드는 최소 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udda0"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Balancing Bacteria</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Process left to right. Each spray from the right creates a triangular effect. Use greedy + prefix sums to track cumulative spray effects.",
              "핵심: 왼쪽에서 오른쪽으로 처리. 오른쪽에서의 분무는 삼각형 효과를 만들어. 그리디 + 누적합으로 분무 효과를 추적해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Understanding the spray pattern: if we spray at power 2 from the right, patch N gets 2, patch N-1 gets 1. Is this correct?",
        "분무 패턴 이해: 파워 2로 오른쪽에서 분무하면, 패치 N은 2, 패치 N-1은 1을 받아. 맞을까?"),
      question: t(E,
        "Spray power 2 from right: patch N gets 2, patch N-1 gets 1. True?",
        "파워 2로 오른쪽에서 분무: 패치 N은 2, 패치 N-1은 1. 맞아?"),
      options: [
        t(E, "Yes, that's the triangular pattern", "맞아, 삼각형 패턴이야"),
        t(E, "No, both get 2", "아니, 둘 다 2를 받아"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The spray creates a triangular pattern: power L at the rightmost, L-1 at the next, and so on.",
        "맞아! 분무는 삼각형 패턴을 만들어: 맨 오른쪽에 L, 그 다음에 L-1, 이런 식이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If a = [0, 5] (2 patches), how many sprays of power 5 do we need to fix the right patch?",
        "a = [0, 5] (패치 2개)이면, 오른쪽 패치를 고치려면 파워 5 분무가 몇 번 필요해?"),
      question: t(E,
        "a = [0, 5]. Min sprays to make right patch 0? (Each spray adds -1 to right patch)",
        "a = [0, 5]. 오른쪽 패치를 0으로 만드는 최소 분무 횟수? (분무 1회 = 오른쪽에 -1)"),
      hint: t(E,
        "Each spray of power -1 reduces the right patch by 1. We need 5 sprays.",
        "파워 -1의 분무 1회는 오른쪽 패치를 1 줄여줘. 5번 필요해."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Process from left to right using prefix sums to track spray effects. O(N) time!",
        "왼쪽에서 오른쪽으로 누적합을 이용해 분무 효과를 추적해. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Greedy: at each position, compute the current value (original + spray effects). If nonzero, spray to cancel it. Track effects with a prefix sum array.",
              "그리디: 각 위치에서 현재 값 계산 (원래 + 분무 효과). 0이 아니면 분무로 상쇄. 누적합 배열로 효과 추적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBacteriaSections(E),
    },
  ];
}
