import { C, t } from "@/components/quest/theme";
import { getMagicOrbsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "vals = list(map(int, input().split()))",
  "",
  "# Sort values in descending order",
  "vals.sort(reverse=True)",
  "",
  "# Pick the top K orbs for maximum sum",
  "ans = sum(vals[:K])",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N magical orbs, each with a power value.\nYou can pick at most K orbs.\nFind the maximum total power you can collect!", "N개의 마법 구슬이 있고, 각각 파워 값이 있어요. 최대 K개를 고를 수 있어요. 모을 수 있는 최대 총 파워를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd2e"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Magical Orbs</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P3</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Greedy approach - sort by value descending and pick the top K.\nNo complex DP needed!",
              "핵심: 그리디 접근 - 값 내림차순 정렬 후 상위 K개를 골라.\n복잡한 DP 필요 없어요!")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Orbs with values [5, 3, 4], pick 2. Which two should you pick?", "구슬 값이 [5, 3, 4]이고 2개를 골라야 해요. 어떤 두 개를 골라야 할까?"),
      question: t(E,
        "Values [5, 3, 4], pick 2. Best choice?",
        "값 [5, 3, 4], 2개 선택. 최선의 선택은?"),
      options: [
        t(E, "5 and 3 (sum = 8)", "5와 3 (합 = 8)"),
        t(E, "5 and 4 (sum = 9)", "5와 4 (합 = 9)"),
        t(E, "3 and 4 (sum = 7)", "3과 4 (합 = 7)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Pick the two largest values: 5 + 4 = 9.",
        "맞아! 가장 큰 두 값을 골라: 5 + 4 = 9."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Orbs: [5, 3, 4], pick 2. What is the maximum sum?", "구슬: [5, 3, 4], 2개 선택. 최대 합은?"),
      question: t(E,
        "Values [5, 3, 4], K=2. Maximum total power?",
        "값 [5, 3, 4], K=2. 최대 총 파워?"),
      hint: t(E,
        "Sort descending: [5, 4, 3]. Take first 2: 5 + 4 = 9.",
        "내림차순 정렬: [5, 4, 3]. 처음 2개: 5 + 4 = 9."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the array, then sum the first K elements. O(N log N) time!", "배열 정렬 후 처음 K개를 합산해요. O(N log N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Greedy: sort descending, pick top K values.\nThe sorting dominates at O(N log N).",
              "그리디: 내림차순 정렬, 상위 K개 선택.\n정렬이 O(N log N)으로 지배적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMagicOrbsSections(E),
    },
  ];
}
