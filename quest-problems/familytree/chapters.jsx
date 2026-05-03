import { C, t } from "@/components/quest/theme";
import { getFamilyTreeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, A, B = input().split()",
  "N = int(N)",
  "",
  "parent = {}",
  "for _ in range(N):",
  "    mom, child = input().split()",
  "    parent[child] = mom",
  "",
  "# Build ancestor chain for A",
  "ancestors_A = {}",
  "cur, depth = A, 0",
  "while cur:",
  "    ancestors_A[cur] = depth",
  "    cur = parent.get(cur)",
  "    depth += 1",
  "",
  "# Walk up from B to find LCA",
  "cur, depth_B = B, 0",
  "while cur:",
  "    if cur in ancestors_A:",
  "        depth_A = ancestors_A[cur]",
  "        if depth_A == 0 and depth_B > 0:",
  "            rel = 'the mother' if depth_B == 1 else 'an ancestor'",
  "            print(f'{A} is {rel} of {B}')",
  "        elif depth_B == 0 and depth_A > 0:",
  "            rel = 'the child' if depth_A == 1 else 'a descendant'",
  "            print(f'{A} is {rel} of {B}')",
  "        elif depth_A > 0 and depth_B > 0:",
  "            print(f'{A} and {B} are related through a common ancestor')",
  "            # could be siblings or cousins",
  "        else:",
  "            print(f'{A} and {B} are the same cow')",
  "        break",
  "    cur = parent.get(cur)",
  "    depth_B += 1",
  "else:",
  "    print(f'{A} and {B} are not related')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFamilyTreeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given mother-child relationships between cows, classify the relationship between two specific cows. Build ancestor chains and find the Lowest Common Ancestor (LCA)!",
        "소들 간 모녀 관계가 주어지면, 특정 두 소의 관계를 분류해. 조상 체인을 만들고 최소 공통 조상(LCA)을 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf33"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Family Tree</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Build ancestor chain for cow A with depths. Walk up from cow B to find LCA. Compare depths to classify: mother, ancestor, child, descendant, siblings, or unrelated.",
              "핵심: 소 A의 조상 체인을 깊이와 함께 구축. 소 B에서 올라가며 LCA 찾기. 깊이 비교로 분류: 어미, 조상, 자식, 후손, 형제, 무관.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If A is B's mother, how many generations are between them?",
        "A가 B의 어미면, 둘 사이 세대 수는?"),
      question: t(E,
        "A is B's mother. How many generations between them?",
        "A가 B의 어미. 둘 사이 세대 수는?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
      ],
      correct: 1,
      explain: t(E,
        "Mother and child are exactly 1 generation apart!",
        "어미와 자식은 정확히 1세대 차이야!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many generations between a mother and her child?",
        "어미와 자식 사이 세대 수는?"),
      question: t(E,
        "Generations between mother and child?",
        "어미와 자식 사이 세대 수?"),
      hint: t(E,
        "Direct parent-child = 1 generation.",
        "직접 부모-자식 = 1세대."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFamilyTreeCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Build ancestor chain for one cow, then walk up from the other. O(N) time for each chain traversal!",
        "한 소의 조상 체인을 만들고, 다른 소에서 올라가. 각 체인 순회 O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Store A's ancestors in a dictionary with depths. Walk up from B checking if we hit any of A's ancestors. The depths tell us the relationship type.",
              "A의 조상을 깊이와 함께 딕셔너리에 저장. B에서 올라가며 A의 조상과 만나는지 확인. 깊이로 관계 유형 판별.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getFamilyTreeSections(E),
    },
  ];
}
