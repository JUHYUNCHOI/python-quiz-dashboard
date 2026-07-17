import { C, t } from "@/components/quest/theme";
import { getMcc21MenuSections } from "./components";

export const SOLUTION_CODE = [
  "import sys",
  "from collections import defaultdict",
  "",
  "input = sys.stdin.readline",
  "children = defaultdict(list)",
  "",
  "N = int(input())",
  "for _ in range(N):",
  "    line = input().split()",
  "    parent = line[0]",
  "    child = line[1]",
  "    children[parent].append(child)",
  "",
  "# count every node with a stack, top to bottom (no recursion)",
  "total = 0",
  "stack = ['root']",
  "while stack:",
  "    node = stack.pop()          # take one node to count",
  "    total += 1                  # this node counts as 1",
  "    for c in children[node]:",
  "        stack.append(c)         # add its children to the to-count list",
  "",
  "print(total)",
];

export function makeMcc21MenuCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We're building a nested menu — categories can contain other categories or leaf items. We're given a list of \"add child X under parent Y\" operations.\nPrint the TOTAL number of items in the menu (across all nesting levels) at the end.",
        "중첩 메뉴를 만들어요 — 카테고리 안에 다른 카테고리나 끝 항목이 들어갈 수 있어요. \"부모 Y 아래에 자식 X 추가\" 연산 목록이 주어져요.\n마지막에 메뉴의 모든 중첩 레벨을 합한 총 항목 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udccb"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Smallest Menu Ever</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Build the menu tree from add-child operations, then count every item across all nesting levels.", "추가 연산으로 메뉴 트리를 만들고, 모든 중첩 레벨의 항목 수를 세요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Build a ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "nested menu tree", "중첩 메뉴 트리")}</b>
                  {t(E, " — categories can contain other categories or leaf items.",
                        " 를 만들어요 — 카테고리 안에 다른 카테고리나 끝 항목이 들어가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Apply a list of ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "\"add child X under parent Y\" operations", "\"부모 Y 아래에 자식 X 추가\" 연산")}</b>
                  {t(E, ".", " 목록을 적용해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
      type: "reveal",
      narr: t(E,
        "Here's what input actually looks like — 5 operations that build a tiny menu, with a tree drawing of what the children map ends up holding. The answer counts every node including 'root'.",
        "실제 입력이 어떻게 생겼는지 봐요 — 5 개 연산이 작은 메뉴를 만들고, children 맵이 결국 어떤 트리를 가리키는지 그림으로 봐요. 답은 'root' 포함 모든 노드 수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10, textAlign: "center" }}>
            📥 {t(E, "Sample Input → Output", "예시 입력 → 출력")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ background: "#1e1e2e", borderRadius: 8, padding: "10px 12px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#e6edf3", lineHeight: 1.7 }}>
              <div style={{ color: "#8b5cf6", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              5<br/>
              root drinks<br/>
              root food<br/>
              drinks coffee<br/>
              drinks tea<br/>
              food pizza
            </div>
            <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "10px 12px", fontSize: 12, lineHeight: 1.7 }}>
              <div style={{ color: "#15803d", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#15803d", textAlign: "center", marginTop: 6 }}>6</div>
              <div style={{ fontSize: 11, color: "#15803d", textAlign: "center" }}>{t(E, "(root + 5 items)", "(root + 5 항목)")}</div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 12, lineHeight: 1.8, color: "#5b21b6", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 8, fontFamily: "inherit" }}>{t(E, "After applying the 5 operations:", "5 개 연산 적용 후:")}</div>
            <div>root</div>
            <div>├─ drinks</div>
            <div>│&nbsp;&nbsp; ├─ coffee</div>
            <div>│&nbsp;&nbsp; └─ tea</div>
            <div>└─ food</div>
            <div>&nbsp;&nbsp;&nbsp; └─ pizza</div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "Count: root(1) + drinks(1) + coffee(1) + tea(1) + food(1) + pizza(1) = ", "개수: root(1) + drinks(1) + coffee(1) + tea(1) + food(1) + pizza(1) = ")}<b style={{ color: "#15803d" }}>6</b>
          </div>
        </div>
      ),
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
        "Now a different menu: 3 top-level items, each with 2 children. Total items?", "이번엔 다른 메뉴: 상위 3개, 각각 자식 2개. 총 항목 수?"),
      question: t(E,
        "3 items + 3*2 sub-items = ?",
        "3개 항목 + 3*2개 하위 = ?"),
      hint: t(E, "Count tops, then add (tops × children-per-top).", "상위를 세고, (상위 × 상위마다 자식 수)를 더해요."),
      answer: 9,
    },
  ];
}

export function makeMcc21MenuCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Apply each \"add child X under parent Y\" operation by appending X to children[Y]. After all ops, walk the tree from the root with a stack (no recursion), counting every node. Sections build it one piece at a time.",
        "각 \"부모 Y 아래에 자식 X 추가\" 연산을 children[Y] 에 X 추가로 적용. 모든 연산 후 루트에서 스택으로 (재귀 없이) 트리를 훑으며 노드를 세요. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc21MenuSections(E),
    },
  ];
}
