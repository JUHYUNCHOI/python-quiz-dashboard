import { C, t } from "@/components/quest/theme";
import { getMcc21MenuSections } from "./components";

export const SOLUTION_CODE = [
  "import sys",
  "from collections import defaultdict",
  "",
  "input = sys.stdin.readline",
  "N = int(input())",
  "children = defaultdict(list)",
  "",
  "for _ in range(N):",
  "    line = input().split()",
  "    parent = line[0]",
  "    child = line[1]",
  "    children[parent].append(child)",
  "",
  "def count(node):",
  "    total = 1  # count self",
  "    for c in children[node]:",
  "        total += count(c)",
  "    return total",
  "",
  "print(count('root'))",
];

export function makeMcc21MenuCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We're building a nested menu — categories can contain other categories or leaf items. We're given a list of \"add child X under parent Y\" operations.\nPrint the TOTAL number of items in the menu (across all nesting levels) at the end.",
        "중첩 메뉴를 만들어요 — 카테고리 안에 다른 카테고리나 잎 항목이 들어갈 수 있어요. \"부모 Y 아래에 자식 X 추가\" 연산 목록이 주어져요.\n마지막에 메뉴의 모든 중첩 레벨을 합한 총 항목 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udccb"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Smallest Menu Ever</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P6</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Build a ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "nested menu tree", "중첩 메뉴 트리")}</b>
                  {t(E, " — categories can contain other categories or leaf items.",
                        " 를 만들어요 — 카테고리 안에 다른 카테고리나 잎 항목이 들어가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Apply a list of ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "\"add child X under parent Y\" operations", "\"부모 Y 아래에 자식 X 추가\" 연산")}</b>
                  {t(E, ".", " 목록을 적용해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL number of items at the end (all levels)", "마지막에 모든 레벨을 합한 총 항목 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A menu with 3 layers: top has 2 items, each has 2 sub-items.\nTotal items (excluding root)?", "3층 메뉴: 상위 2개, 각각 하위 2개. 총 항목 수 (루트 제외)?"),
      question: t(E,
        "Top layer: 2 items. Each has 2 sub-items. Total items?",
        "상위: 2개. 각각 하위 2개. 총 항목 수?"),
      options: [
        t(E, "6 (2 + 4)", "6 (2 + 4)"),
        t(E, "4", "4"),
        t(E, "8", "8"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 2 top items + 2*2 = 4 sub-items = 6 total.",
        "맞아! 상위 2개 + 2*2 = 4개 하위 = 총 6개."),
    },
    {
      type: "input",
      narr: t(E,
        "2 top-level items, each with 2 children. Total items?", "상위 2개, 각각 자식 2개. 총 항목 수?"),
      question: t(E,
        "2 items + 2*2 sub-items = ?",
        "2개 항목 + 2*2개 하위 = ?"),
      hint: t(E, "2 + 4 = 6", "2 + 4 = 6"),
      answer: 6,
    },
  ];
}

export function makeMcc21MenuCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Apply each \"add child X under parent Y\" operation by appending X to children[Y]. After all ops, do a DFS from the root counting nodes.",
        "각 \"부모 Y 아래에 자식 X 추가\" 연산을 children[Y] 에 X 추가로 적용. 모든 연산 후 루트에서 DFS 로 노드 카운트."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init adjacency dict", "인접 딕셔너리 초기화"), code: "children = defaultdict(list)", color: "#8b5cf6" },
              { n: 2, label: t(E, "Process add operations", "add 연산 처리"), code: "for parent, child in ops: children[parent].append(child)", color: "#7c3aed" },
              { n: 3, label: t(E, "DFS count nodes", "DFS 노드 카운트"), code: "def dfs(node): return 1 + sum(dfs(c) for c in children[node])", color: "#0891b2" },
              { n: 4, label: t(E, "Print total", "총 출력"), code: "print(dfs(root))", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "linear in number of operations and nodes", "연산과 노드 수에 선형")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21MenuSections(E),
    },
  ];
}
