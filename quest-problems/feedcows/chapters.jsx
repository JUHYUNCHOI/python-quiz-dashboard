import { C, t } from "@/components/quest/theme";
import { getFeedCowsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "# covered_g[i] = True if cow i is covered by a G patch",
  "# covered_h[i] = True if cow i is covered by an H patch",
  "patches = 0",
  "last_g = -1  # rightmost position covered by G patch",
  "last_h = -1  # rightmost position covered by H patch",
  "",
  "for i in range(N):",
  "    if s[i] == 'G' and i > last_g:",
  "        # Place G patch as far right as possible",
  "        patches += 1",
  "        last_g = i + K  # covers i to i+K",
  "    elif s[i] == 'H' and i > last_h:",
  "        # Place H patch as far right as possible",
  "        patches += 1",
  "        last_h = i + K  # covers i to i+K",
  "",
  "print(patches)",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeFeedCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows of breed G or H stand in a line.\nPlace grass patches (type G or H).\nEach cow must have a matching patch within K positions.\nMinimize the number of patches!", "N마리의 소가 G 또는 H 품종으로 줄 서 있어. 풀 패치 (G 또는 H 타입)를 놓아. 각 소는 K 위치 이내에 맞는 패치가 있어야 해. 패치 수를 최소화해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf3e"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Feeding the Cows</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Greedy left to right. When a cow isn't covered, place a patch at position i+K (as far right as possible) to cover the maximum range [i, i+K] for that breed.",
              "핵심: 왼쪽에서 오른쪽으로 그리디. 소가 커버되지 않으면, 최대 범위 [i, i+K]를 커버하도록 위치 i+K에 패치를 놓아 (가능한 한 오른쪽에).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "breeds = \"GH\", K = 0.\nEach cow can only reach its own position.\nHow many patches needed?", "breeds = \"GH\", K = 0. 각 소는 자기 위치만 도달 가능. 패치 몇 개 필요?"),
      question: t(E,
        "\"GH\", K = 0. How many patches?",
        "\"GH\", K = 0. 패치 몇 개?"),
      options: [
        t(E, "2 (one G at pos 0, one H at pos 1)", "2개 (G 하나 위치 0, H 하나 위치 1)"),
        t(E, "1 (one patch covers both)", "1개 (하나로 둘 다 커버)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! K=0 means each patch only covers its own position, and patches must match breed. So we need 1 G patch and 1 H patch = 2 total.",
        "맞아! K=0이면 패치는 자기 위치만 커버하고, 품종이 맞아야 해. G 패치 1개 + H 패치 1개 = 총 2개."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GGG\", K = 1.\nA patch at position 1 covers positions 0, 1, 2.\nHow many patches minimum?", "breeds = \"GGG\", K = 1. 위치 1의 패치는 위치 0, 1, 2를 커버해. 최소 패치 수는?"),
      question: t(E,
        "\"GGG\", K = 1. Min patches?",
        "\"GGG\", K = 1. 최소 패치 수?"),
      hint: t(E,
        "Greedy: cow 0 is uncovered, place G patch. It covers positions 0 to 0+1=1. Cow 2 is uncovered, place another. But actually: patch at pos 0+K=1 covers 0 to 1+0? No: a patch at position p covers [p-K, p+K]? No, cow at pos i needs patch within K. So patch at pos 1 covers cows 0,1,2. Answer: 1.",
        "그리디: 소 0이 미커버, G 패치 놓아. 위치 0+K=1에 놓으면 소 0, 1, 2 모두 커버. 답: 1."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeFeedCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedy scan left to right. When cow i is uncovered, place patch at i+K. O(N) time!", "왼쪽에서 오른쪽으로 그리디 스캔. 소 i가 미커버면, i+K에 패치 배치. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Track the rightmost covered position for each breed separately. When a cow of breed B at position i is not covered (i > last_B), place a patch at i and set last_B = i + K.",
              "각 품종별로 가장 오른쪽 커버 위치를 추적해. 위치 i의 품종 B 소가 미커버 (i > last_B)면, i에 패치를 놓고 last_B = i + K로 설정.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getFeedCowsSections(E),
    },
  ];
}
