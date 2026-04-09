import { C, t } from "@/components/quest/theme";

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
        "Build a nested menu tree. Add items to parent categories. Count total items using tree traversal / recursion.",
        "중첩 메뉴 트리를 만들어. 부모 카테고리에 항목 추가. 트리 순회 / 재귀로 전체 항목 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udccb"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Smallest Menu Ever</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P6</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Build a tree from parent-child relationships. Use DFS/recursion to count all nodes.",
              "핵심: 부모-자식 관계로 트리 구축. DFS/재귀로 모든 노드 수 세기.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A menu with 3 layers: top has 2 items, each has 2 sub-items. Total items (excluding root)?",
        "3층 메뉴: 상위 2개, 각각 하위 2개. 총 항목 수 (루트 제외)?"),
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
        "2 top-level items, each with 2 children. Total items?",
        "상위 2개, 각각 자식 2개. 총 항목 수?"),
      question: t(E,
        "2 items + 2*2 sub-items = ?",
        "2개 항목 + 2*2개 하위 = ?"),
      hint: t(E, "2 + 4 = 6", "2 + 4 = 6"),
      answer: 6,
    },
  ];
}

export function makeMcc21MenuCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Build tree with dictionary, then DFS to count. O(N) time.",
        "딕셔너리로 트리 구축, DFS로 카운트. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Use defaultdict for adjacency list. Recursive DFS counts all nodes in the tree.",
              "인접 리스트에 defaultdict 사용. 재귀 DFS로 트리의 모든 노드 수 세기.")}
          </div>
        </div>),
    },
    {
      type: "code",
      narr: t(E, "Here's the tree traversal solution!", "트리 순회 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
