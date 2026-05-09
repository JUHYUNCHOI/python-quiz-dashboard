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
        "FJ stacked N presents. People ask for specific presents — count how many sit on top of each one before pulling it out.",
        "FJ가 N개의 선물을 쌓아 놓았어요. 사람들이 특정 선물을 요청해요 — 그 선물 위에 쌓인 개수를 세고 빼내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🎁</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Stack of Presents</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Bronze warm-up</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "For each query, print how many presents had to be removed before reaching the target.",
                "쿼리마다 타깃에 도달하기 전 빼내야 했던 선물의 개수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has a ", "FJ에게 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "vertical stack of N presents", "수직으로 쌓인 N개의 선물 더미")}</b>
                  {t(E, ", numbered 1..N. The top of the stack is index 0.",
                        "이 있어요. 1..N 번호를 가지고 있어요. 더미 맨 위가 인덱스 0.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Q queries arrive — each names ONE present FJ should fetch.",
                        "Q개의 요청이 와요 — 각 요청은 FJ가 꺼내야 할 선물 1개를 지정해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must remove all presents ", "FJ는 그 선물 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "above", "위에")}</b>
                  {t(E, " the target first, then take the target itself out (gone forever).",
                        " 있는 선물을 모두 빼내고, 타깃도 꺼내요 (영구 제거).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query, print how many presents had to be removed first.",
                        "각 요청마다, 먼저 빼낸 선물 개수를 출력해요.")}
                </div>
              </div>
            </div>
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
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "BEFORE", "전")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[3,1,4,2].map((v, i) => {
                  const isTarget = v === 4;
                  const isAbove = i < 2;
                  return (
                    <div key={i} style={{
                      width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 7, fontWeight: 700, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                      background: isTarget ? "#dcfce7" : (isAbove ? "#fef2f2" : "#fff"),
                      border: `1px solid ${isTarget ? "#16a34a" : (isAbove ? "#dc2626" : "#cbd5e1")}`,
                      color: isTarget ? "#15803d" : (isAbove ? "#7f1d1d" : C.text),
                    }}>{v}{isTarget ? " ←" : isAbove ? " ✗" : ""}</div>
                  );
                })}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>↑ {t(E, "top", "맨 위")}</div>
              </div>
            </div>
            {/* arrow */}
            <div style={{ fontSize: 24, color: "#8b5cf6", textAlign: "center", fontWeight: 700 }}>→</div>
            {/* AFTER */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "AFTER", "후")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                <div style={{
                  width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 7, fontWeight: 700, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                  background: "#fff", border: `1px solid #cbd5e1`, color: C.text,
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
      type: "reveal",
      narr: t(E,
        "Watch what happens after the first query — 5, 3, and 1 itself are all gone. Only [4, 2] remain.",
        "첫 쿼리 후를 봐 — 5, 3, 그리고 1 자신까지 사라져. [4, 2]만 남아."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10, fontSize: 12, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "Stack starts [5,3,1,4,2] — Query 1: find 1", "스택 [5,3,1,4,2] — 쿼리 1: 1 찾기")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", gap: 6, alignItems: "center" }}>
            {/* BEFORE Q1 */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "BEFORE Q1", "쿼리 1 전")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[5,3,1,4,2].map((v, i) => {
                  const isTarget = v === 1;
                  const isAbove = i < 2;
                  return (
                    <div key={i} style={{
                      width: 60, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
                      background: isTarget ? "#dcfce7" : (isAbove ? "#fef2f2" : "#fff"),
                      border: `1px solid ${isTarget ? "#16a34a" : (isAbove ? "#dc2626" : "#cbd5e1")}`,
                      color: isTarget ? "#15803d" : (isAbove ? "#7f1d1d" : C.text),
                    }}>{v}{isTarget ? " ←" : isAbove ? " ✗" : ""}</div>
                  );
                })}
              </div>
            </div>
            <div style={{ fontSize: 18, color: "#8b5cf6", textAlign: "center", fontWeight: 700 }}>→</div>
            {/* AFTER Q1 */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "AFTER Q1 (now ask Q2)", "쿼리 1 후 (이제 쿼리 2)")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[4,2].map((v, i) => (
                  <div key={i} style={{
                    width: 60, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
                    background: "#fff", border: `1px solid #cbd5e1`, color: C.text,
                  }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            <b>{t(E, "Output for Q1: ", "쿼리 1 출력: ")}</b>
            {t(E, "2 (presents 5 and 3 above 1).  Then 1 itself is removed too.",
                  "2 (1 위에 5와 3).  그 다음 1 자신도 제거.")}
          </div>
          <div style={{ marginTop: 6, background: "#ede9fe", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#5b21b6", lineHeight: 1.5, textAlign: "center" }}>
            {t(E, "👉 Next step asks: in the right stack [4, 2], how many are above 2?",
                  "👉 다음 스텝 질문: 오른쪽 스택 [4, 2]에서, 2 위에 몇 개?")}
          </div>
        </div>),
    },
    {
      type: "input",
      narr: t(E,
        "Two queries in a row — keep track of what's left in the stack after the first one.",
        "쿼리 두 번 연속 — 첫 번째 후 스택에 뭐가 남는지 챙기면서 풀어 봐."),
      question: t(E,
        "Stack starts [5,3,1,4,2]. Query 1 = find 1, then query 2 = find 2. Presents above for query 2?",
        "스택 [5,3,1,4,2]. 쿼리 1 = 1 찾기, 쿼리 2 = 2 찾기. 쿼리 2 의 위 개수?"),
      hint: t(E,
        "After query 1 some presents are gone. Recount from the new stack.",
        "쿼리 1 후 몇 개가 사라졌어. 새 스택에서 다시 세어 봐."),
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
      type: "progressive",
      narr: t(E,
        "For each query: find target's position, print it, then remove.  Sections build the loop one piece at a time.",
        "쿼리마다 타깃 위치 찾기 → 출력 → 제거. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getPresentsSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own stack and queries.",
        "직접 스택과 쿼리 시도."),
    },
  ];
}
