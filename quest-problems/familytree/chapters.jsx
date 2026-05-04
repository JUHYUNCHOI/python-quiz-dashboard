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
        "FJ tracks cow mother-child relationships. Given two specific cows X and Y, classify their relationship from the family tree:\nmother / grand-mother / great-...-grand-mother (and the reverse: daughter / grand-daughter / great-...-grand-daughter), siblings, cousins, or unrelated.",
        "FJ 가 소들의 모녀 관계를 추적해요. 특정 두 소 X 와 Y 가 주어지면 가계도에서 둘의 관계를 분류해요:\n엄마 / 할머니 / great-...-할머니 (반대 방향은 딸 / 손녀 / ...), 자매, 사촌, 또는 관계 없음."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf33"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Family Tree</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has a list of ", "FJ 에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "mother → child relationships", "엄마 → 자식 관계 목록")}</b>
                  {t(E, " among cows (a forest of family trees).",
                        " 이 있어요 (가계도들의 숲).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given two cows ", "두 소 ")}
                  <b style={{ color: "#7c3aed" }}>X, Y</b>
                  {t(E, " — figure out their family relationship.",
                        " 가 주어져요 — 둘의 가계 관계를 분류해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print one of: ", "다음 중 하나를 출력: ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(great-)mother / (great-)daughter / siblings / cousins / NOT_RELATED", "(great-)엄마 / (great-)딸 / 자매 / 사촌 / NOT_RELATED")}</b>
                  {t(E, ".", ".")}
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
        "If A is B's mother, how many generations are between them?", "A가 B의 어미면, 둘 사이 세대 수는?"),
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
        "어미와 자식은 정확히 1세대 차이예요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many generations between a mother and her child?", "어미와 자식 사이 세대 수는?"),
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
        "Build A's ancestor chain (with depths) in a dictionary. Walk up from B; the first ancestor we hit that's also in A's chain is the LCA. Compare depths to decide: ancestor / descendant / siblings / cousins / unrelated.",
        "A 의 조상 체인을 깊이와 함께 딕셔너리에 저장. B 에서 위로 올라가며 처음 만나는 A 의 조상이 LCA. 깊이를 비교해서 결정: 조상 / 후손 / 자매 / 사촌 / 무관."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Map child → mother", "자식 → 엄마 매핑"), code: "mother = dict of (child, mom) pairs", color: "#059669" },
              { n: 2, label: t(E, "Build A's ancestor chain", "A 의 조상 체인 구축"), code: "depthA = {A: 0, mom(A): 1, ...}", color: "#0891b2" },
              { n: 3, label: t(E, "Walk up from B until hitting LCA", "B 에서 LCA 만날 때까지 위로"), code: "d = 0; cur = B; while cur not in depthA: cur = mother[cur]; d += 1", color: "#7c3aed" },
              { n: 4, label: t(E, "Classify by (depthA[lca], d)", "(depthA[lca], d) 로 관계 분류"), code: "print mother / grandmother / siblings / cousins / NOT RELATED", color: "#dc2626" },
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
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "walk both ancestor chains once", "조상 체인 각각 한 번 순회")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getFamilyTreeSections(E),
    },
  ];
}
