import { C, t } from "@/components/quest/theme";
import { getStallingSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "cows = sorted([int(input()) for _ in range(N)])",
  "stalls = sorted([int(input()) for _ in range(N)])",
  "",
  "# For each cow (sorted), count how many stalls it fits in",
  "# Then multiply choices, subtracting already-assigned stalls",
  "ans = 1",
  "j = 0  # pointer into stalls",
  "for i in range(N):",
  "    # cow i (sorted ascending) can fit in stalls where stall height >= cow height",
  "    while j < N and stalls[j] < cows[i]:",
  "        j += 1",
  "    choices = N - j - i  # available stalls minus already assigned",
  "    # Wait, need to be more careful:",
  "    # After sorting both, cow[i] can use stalls[j..N-1]",
  "    # But i cows before already took i stalls from that range",
  "    # So choices = (N - j) - i",
  "    ans *= (N - j) - i",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows and N stalls, each with height limits.\nCount the number of valid assignments where every cow fits in its stall!", "N마리 소와 N개 축사, 각각 높이 제한이 있어. 모든 소가 축사에 들어가는 유효한 배정 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Just Stalling</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sort both cows and stalls by height. For each cow (smallest first), count available stalls. Multiply the choices together.",
              "핵심: 소와 축사를 높이순 정렬. 각 소(작은 것부터)에 대해 가용 축사 수를 세. 선택지를 곱해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Cows have heights [1,2] and stalls have limits [2,2]. How many valid arrangements?", "소 높이 [1,2], 축사 제한 [2,2]일 때 유효한 배정 수는?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?",
        "소: [1,2], 축사: [2,2]. 유효한 배정 수?"),
      options: [
        t(E, "2 (both cows fit in both stalls)", "2 (두 소 모두 두 축사에 가능)"),
        t(E, "1 (only one way)", "1 (한 가지만 가능)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Cow 1 (height 1) fits both stalls, cow 2 (height 2) fits both. So 2 x 1 = 2 arrangements.",
        "맞아! 소 1(높이 1)은 두 축사 모두 가능, 소 2(높이 2)도 두 축사 모두 가능. 2 x 1 = 2 배정."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?", "소: [1,2], 축사: [2,2]. 유효한 배정은 몇 가지?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. Number of valid arrangements?",
        "소: [1,2], 축사: [2,2]. 유효한 배정 수?"),
      hint: t(E,
        "Sorted: cows=[1,2], stalls=[2,2]. Cow 1 fits 2 stalls, cow 2 fits 1 remaining. 2*1=2.",
        "정렬: 소=[1,2], 축사=[2,2]. 소 1은 2개 가능, 소 2는 1개 남음. 2*1=2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort both arrays, then use two pointers to count choices. O(N log N) time!", "두 배열 정렬 후 투 포인터로 선택지를 세. O(N log N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort cows and stalls. For each cow (ascending), count stalls with sufficient height. Multiply available choices minus already assigned.",
              "소와 축사를 정렬해. 각 소(오름차순)에 대해 높이가 충분한 축사를 세고 이미 배정된 것을 빼서 곱해.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getStallingSections(E),
    },
  ];
}
