import { C, t } from "@/components/quest/theme";
import { getAcowdemia2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "# order[a][b] = True if a always before b",
  "before = [[False]*(N) for _ in range(N)]",
  "",
  "for _ in range(M):",
  "    K = int(input())",
  "    authors = list(map(int, input().split()))",
  "    for i in range(K):",
  "        for j in range(i+1, K):",
  "            before[authors[i]][authors[j]] = True",
  "",
  "for a in range(N):",
  "    for b in range(N):",
  "        if a != b:",
  "            if before[a][b] and not before[b][a]:",
  "                print('YES')  # a more senior",
  "            else:",
  "                print('UNDETERMINED')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "In academic papers, author order can indicate seniority.\nIf author A always appears before author B in every paper they co-author, A may be more senior.", "학술 논문에서 저자 순서는 선임 여부를 나타낼 수 있어. 저자 A가 공동 저술한 모든 논문에서 항상 B 앞에 나타나면, A가 더 선임일 수 있어."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc68\u200d\ud83d\udd2c"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Acowdemia II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each pair, track if one always appears before the other. If A before B in all shared papers and not vice versa, A is more senior.",
              "핵심: 각 쌍에 대해 한쪽이 항상 앞에 나타나는지 추적. 모든 공동 논문에서 A가 B 앞이고 반대는 없으면 A가 더 선임.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In author list [A, B, C], A appears before B.\nIf this is the only paper, can we say A is more senior than B?", "저자 목록 [A, B, C]에서 A가 B 앞에 나와. 이것이 유일한 논문이면, A가 B보다 선임이라고 할 수 있을까?"),
      question: t(E,
        "List [A,B,C]: A always before B. A more senior or equal?",
        "목록 [A,B,C]: A가 항상 B 앞. A가 더 선임 또는 동등?"),
      options: [
        t(E, "Yes, A is more senior", "네, A가 더 선임"),
        t(E, "No, we can't tell from one paper", "아니요, 논문 하나로는 알 수 없어"),
      ],
      correct: 0,
      explain: t(E,
        "If A always appears before B in all co-authored papers, we conclude A is more senior (or equal).",
        "공동 저술한 모든 논문에서 A가 항상 B 앞에 나타나면, A가 더 선임(또는 동등)이라고 결론."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2 publications: [A,B] and [B,A].\nWhat is the relationship between A and B?\nEnter 0 for undetermined.", "2개의 논문: [A,B]와 [B,A]. A와 B의 관계는? 판단 불가이면 0을 입력해."),
      question: t(E,
        "Pubs [A,B] and [B,A]. Relationship? (0=undetermined)",
        "논문 [A,B]와 [B,A]. 관계? (0=판단 불가)"),
      hint: t(E,
        "A is before B in one paper, B before A in another. Neither always first, so undetermined.",
        "한 논문에서 A가 B 앞, 다른 논문에서 B가 A 앞. 어느 쪽도 항상 먼저가 아니므로 판단 불가."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each publication, record all pairwise orderings.\nThen check each pair.\nO(N^2 * M) time.", "각 논문에 대해 모든 쌍의 순서를 기록. 그런 다음 각 쌍을 확인. O(N^2 * M) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N^2 * M)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Track a boolean matrix: before[a][b] = true if a appeared before b in any paper. If before[a][b] and not before[b][a], a is more senior.",
              "불리언 행렬 추적: before[a][b] = 어떤 논문에서 a가 b 앞에 나타났으면 true. before[a][b]이고 before[b][a]가 아니면, a가 더 선임.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getAcowdemia2Sections(E),
    },
  ];
}
