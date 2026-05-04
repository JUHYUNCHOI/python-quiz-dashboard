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
        "FJ has a stack of N presents.\nFor each query, find how many presents must be removed to reach the target.\n🎁", "FJ에게 N개의 선물 더미가 있어요. 각 쿼리마다 목표 선물에 도달하려면 몇 개를 제거해야 하는지 찾자. 🎁"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎁</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Stack of Presents</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Stack of presents (top to bottom).\nFor each query, count presents above the target. Remove the target after finding it!",
              "선물 더미 (위→아래).\n각 쿼리에서 목표 위의 선물 수를 세고, 찾은 후 제거!")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Query: find 4.\nThe 2 presents above 4 must be removed.\nThen 4 is taken out — gone forever.",
        "쿼리: 4 찾기.\n4 위에 있는 2개를 먼저 제거.\n그 다음 4도 꺼내짐 — 영구 제거."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 6, alignItems: "center" }}>
            {/* BEFORE */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "BEFORE", "전")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[3,1,4,2].map((v, i) => {
                  const isTarget = v === 4;
                  const isAbove = i < 2;
                  return (
                    <div key={i} style={{
                      width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 7, fontWeight: 900, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                      background: isTarget ? "#dcfce7" : (isAbove ? "#fef2f2" : "#fff"),
                      border: `2px solid ${isTarget ? "#16a34a" : (isAbove ? "#dc2626" : "#cbd5e1")}`,
                      color: isTarget ? "#15803d" : (isAbove ? "#7f1d1d" : C.text),
                    }}>{v}{isTarget ? " ←" : isAbove ? " ✗" : ""}</div>
                  );
                })}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>↑ {t(E, "top", "맨 위")}</div>
              </div>
            </div>
            {/* arrow */}
            <div style={{ fontSize: 24, color: "#8b5cf6", textAlign: "center", fontWeight: 900 }}>→</div>
            {/* AFTER */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "AFTER", "후")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                <div style={{
                  width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 7, fontWeight: 900, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                  background: "#fff", border: `2px solid #cbd5e1`, color: C.text,
                }}>2</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>↑ {t(E, "top", "맨 위")}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "8px 10px", textAlign: "center", fontSize: 12, color: "#5b21b6", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "Output: 2  (2 presents above 4)", "출력: 2  (4 위에 2개)")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "After removing a present, it's gone from the stack forever.\nThe remaining presents stay in their original order.", "선물을 꺼내면 스택에서 영구히 사라져. 나머지 선물은 원래 순서 유지."),
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
        "Stack = [5,3,1,4,2].\nAfter finding 1 (remove 5,3,1), stack becomes [4,2].\nNow find 2.\nHow many above?", "스택 = [5,3,1,4,2]. 1을 찾은 후 (5,3,1 제거), 스택은 [4,2]. 이제 2를 찾기. 위에 몇 개?"),
      question: t(E, "Stack [4,2], find 2. Presents above?", "스택 [4,2], 2를 찾기. 위의 개수?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Step through find + pop for each query. Yellow = above target, green = target.", "쿼리마다 찾기 + 제거 단계. 노랑 = 타겟 위, 초록 = 타겟."),
    },
  ];
}

export function makePresentsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "For each query: find target's position, print it, then remove.\nThe stack shrinks by 1 each time.",
        "쿼리마다: 타겟 위치 찾기 → 출력 → 제거.\n매번 스택은 1개씩 줄어듦."),
      content: (
        <div style={{ padding: 16 }}>
          {/* algorithm steps as visual cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read target", "타겟 읽기"), code: "target = int(input())", color: "#8b5cf6" },
              { n: 2, label: t(E, "Find position", "위치 찾기"), code: "pos = stack.index(target)", color: "#0891b2" },
              { n: 3, label: t(E, "Print position", "위치 출력"), code: "print(pos)", color: "#16a34a" },
              { n: 4, label: t(E, "Pop the target", "타겟 제거"), code: "stack.pop(pos)", color: "#dc2626" },
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
          {/* complexity */}
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>
              {t(E, "⏱ Complexity", "⏱ 복잡도")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>
              O(N · Q)
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, ".index() scans the list (O(N)) per query", ".index()가 매 쿼리 리스트 스캔 (O(N))")}
            </div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the simulation step by step. Each section reveals one piece.", "시뮬레이션을 단계별로 만들어보자. 각 섹션마다 한 조각씩."),
      sections: getPresentsSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own stack and queries.", "직접 스택과 쿼리 시도."),
    },
  ];
}
