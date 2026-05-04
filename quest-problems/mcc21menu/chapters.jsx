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
        "Build tree with dictionary, then DFS to count. O(N) time.", "딕셔너리로 트리 구축, DFS로 카운트. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Use defaultdict for adjacency list.\nRecursive DFS counts all nodes in the tree.",
              "인접 리스트에 defaultdict 사용.\n재귀 DFS로 트리의 모든 노드 수 세기.")}
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
