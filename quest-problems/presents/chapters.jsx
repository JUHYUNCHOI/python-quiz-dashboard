import { C, t } from "@/components/quest/theme";
import { getPresentsSections } from "./components";

export const SOLUTION_CODE = [
  "N, Q = map(int, input().split())",
  "stack = list(map(int, input().split()))  # top to bottom",
  "",
  "# For each query: which present to find",
  "# Must remove all presents above it",
  "for _ in range(Q):",
  "    target = int(input())",
  "    # Find position of target in stack",
  "    pos = stack.index(target)",
  "    # Must remove pos presents above it (0-indexed: remove 0..pos-1)",
  "    print(pos)",
  "    # Remove target from stack (it's taken out)",
  "    stack.pop(pos)",
];

export function makePresentsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ has a stack of N presents. For each query, find how many presents must be removed to reach the target. 🎁",
        "FJ에게 N개의 선물 더미가 있어. 각 쿼리마다 목표 선물에 도달하려면 몇 개를 제거해야 하는지 찾자. 🎁"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎁</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Stack of Presents</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Stack of presents (top to bottom). For each query, count presents above the target. Remove the target after finding it!",
              "선물 더미 (위→아래). 각 쿼리에서 목표 위의 선물 수를 세고, 찾은 후 제거!")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Stack = [3, 1, 4, 2]. Query: find 4. Must remove 3 and 1 (2 presents). Then 4 is taken out. Stack becomes [2].",
        "스택 = [3, 1, 4, 2]. 쿼리: 4를 찾기. 3과 1을 제거해야 해 (2개). 4를 꺼내면 스택은 [2]."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            {[3,1,4,2].map((v, i) => (
              <div key={i} style={{
                width: 60, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontWeight: 900, fontSize: 18, fontFamily: "'JetBrains Mono',monospace",
                background: v === 4 ? C.okBg : i < 2 ? C.noBg : "#fff",
                border: `2px solid ${v === 4 ? C.okBd : i < 2 ? C.noBd : C.border}`,
                color: v === 4 ? C.ok : i < 2 ? C.no : C.text,
              }}>{v}</div>
            ))}
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
              {t(E, "↑ Top of stack", "↑ 스택 맨 위")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "After removing a present, it's gone from the stack forever. The remaining presents stay in their original order.",
        "선물을 꺼내면 스택에서 영구히 사라져. 나머지 선물은 원래 순서 유지."),
      question: t(E,
        "Stack = [5,3,1,4,2]. Find present 1. How many presents above it?",
        "스택 = [5,3,1,4,2]. 선물 1을 찾기. 위에 몇 개?"),
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain: t(E, "5 and 3 are above 1 → 2 presents to remove!", "5와 3이 1 위에 있어 → 2개 제거!"),
    },
    {
      type: "input",
      narr: t(E,
        "Stack = [5,3,1,4,2]. After finding 1 (remove 5,3,1), stack becomes [4,2]. Now find 2. How many above?",
        "스택 = [5,3,1,4,2]. 1을 찾은 후 (5,3,1 제거), 스택은 [4,2]. 이제 2를 찾기. 위에 몇 개?"),
      question: t(E, "Stack [4,2], find 2. Presents above?", "스택 [4,2], 2를 찾기. 위의 개수?"),
      answer: 1,
    },
  ];
}

export function makePresentsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Simple simulation: use a list, find index with .index(), print position, then pop. O(NQ) total.",
        "간단한 시뮬레이션: 리스트에서 .index()로 위치 찾고, 출력하고, pop. 총 O(NQ)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>
            O(NQ)
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
            {t(E, "Q queries × N search each", "Q개 쿼리 × N 탐색")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the simulation step by step. Each section reveals one piece.",
        "시뮬레이션을 단계별로 만들어보자. 각 섹션마다 한 조각씩."),
      sections: getPresentsSections(E),
    },
  ];
}
