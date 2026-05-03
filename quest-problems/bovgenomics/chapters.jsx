import { C, t } from "@/components/quest/theme";
import { getBovGenomicsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "spotted = []",
  "for _ in range(N):",
  "    spotted.append(input().strip())",
  "",
  "plain = []",
  "for _ in range(N):",
  "    plain.append(input().strip())",
  "",
  "ans = 0",
  "for j in range(M):",
  "    s_chars = set(spotted[i][j] for i in range(N))",
  "    p_chars = set(plain[i][j] for i in range(N))",
  "    if len(s_chars & p_chars) == 0:",
  "        ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N spotted cows and N plain cows each have M-character genomes. Count positions where spotted and plain cows have completely different characters (no overlap).",
        "점박이 소 N마리와 무늬 없는 소 N마리가 각각 M글자 유전체를 가져. 점박이와 무늬 없는 소의 문자가 완전히 다른 (겹침 없는) 위치 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\uddec"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Bovine Genomics</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each position j, collect the set of characters from spotted cows and plain cows. If the two sets have no intersection, that position can distinguish them.",
              "핵심: 각 위치 j에서 점박이 소의 문자 집합과 무늬 없는 소의 문자 집합을 모아. 두 집합이 교집합이 없으면 그 위치로 구별 가능해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "At a certain position, spotted cows have {A, A} and plain cows have {C, C}. Is this position a valid distinguishing position?",
        "어떤 위치에서 점박이 소는 {A, A}, 무늬 없는 소는 {C, C}야. 이 위치는 유효한 구별 위치야?"),
      question: t(E,
        "Spotted = {A, A}, Plain = {C, C}. No overlap, so valid?",
        "점박이 = {A, A}, 무늬 없음 = {C, C}. 겹침 없으니 유효?"),
      options: [
        t(E, "Yes, sets {A} and {C} don't overlap", "맞아, 집합 {A}와 {C}는 안 겹쳐"),
        t(E, "No, we need more characters", "아니, 더 많은 문자가 필요해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The spotted set is {A} and the plain set is {C}. They have no intersection, so this position can distinguish the two groups.",
        "맞아! 점박이 집합은 {A}, 무늬 없는 집합은 {C}. 교집합이 없으니 이 위치로 두 그룹을 구별할 수 있어."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If there's exactly 1 valid distinguishing position, what is the answer?",
        "유효한 구별 위치가 정확히 1개라면 답은 뭐야?"),
      question: t(E,
        "How many valid positions if only 1 position has no overlap?",
        "겹침 없는 위치가 1개뿐이면 유효한 위치 수는?"),
      hint: t(E,
        "We simply count positions with no overlap. 1 position = answer is 1.",
        "겹침 없는 위치를 단순히 세면 돼. 1개 위치 = 답은 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each of M positions, collect spotted and plain character sets. Check intersection. O(N*M) time!",
        "M개 위치 각각에서 점박이와 무늬 없는 소의 문자 집합을 모아. 교집합을 확인. O(N*M) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N*M)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each column j, build set of spotted chars and set of plain chars. If their intersection is empty, increment the answer.",
              "각 열 j에서 점박이 문자 집합과 무늬 없는 문자 집합을 만들어. 교집합이 비어 있으면 답을 증가시켜.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBovGenomicsSections(E),
    },
  ];
}
