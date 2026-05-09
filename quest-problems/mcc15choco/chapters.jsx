import { C, t } from "@/components/quest/theme";
import { getMcc15ChocoSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "bars = list(map(int, input().split()))",
  "",
  "stack = []",
  "total = 0",
  "",
  "for bar in bars:",
  "    if stack and stack[-1] == bar:",
  "        # Adjacent equal pair found",
  "        total += 2 * bar",
  "        stack.pop()",
  "    else:",
  "        stack.append(bar)",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A row of N chocolate bars with sizes a[1..N]. You can repeatedly remove ADJACENT pairs of equal-size bars (after removal, the remaining bars become adjacent).\nPrint the TOTAL chocolate length removed.",
        "N 개 초콜릿 바가 한 줄에 있고, 크기는 각각 a[i] 예요. 같은 크기의 인접한 두 바를 반복해서 제거할 수 있어요 (제거 후 남은 바가 인접하게 돼요).\n제거한 초콜릿 총 길이를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf6b"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Chocolate Bars</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Print the total length of chocolate removed by repeatedly popping adjacent equal-size pairs.", "인접한 같은 크기의 짝을 반복해서 제거한 초콜릿 총 길이를 출력해요.")}
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
                  {t(E, "A row of ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N chocolate bars with sizes a[1..N]", "N 개 초콜릿 바, 크기는 각각 a[i]")}</b>
                  {t(E, ".", " 가 한 줄에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeatedly remove ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent pairs of equal-size bars", "같은 크기의 인접한 두 바")}</b>
                  {t(E, " — after removal, the remaining bars become adjacent and may form new equal pairs.",
                        " 를 반복해서 제거 — 제거 후 남은 바들이 인접해 새로운 짝이 생길 수 있음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL length of chocolate removed", "제거한 초콜릿 총 길이")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "Bars: [3, 3, 5, 5].\nRemove (3,3) for length 6, then (5,5) for length 10.\nTotal = 16.\nWhat's the total removed?", "바: [3, 3, 5, 5]. (3,3) 제거하면 길이 6, 그 다음 (5,5) 제거하면 길이 10. 총 = 16. 총 제거 길이는?"),
      question: t(E,
        "Bars [3,3,5,5]. Total length removed?",
        "바 [3,3,5,5]. 제거한 총 길이?"),
      options: [
        "6",
        "10",
        "16",
        "8",
      ],
      correct: 2,
      explain: t(E,
        "Remove (3,3): 2*3=6. Remove (5,5): 2*5=10. Total = 6+10 = 16!",
        "(3,3) 제거: 2*3=6. (5,5) 제거: 2*5=10. 총 = 6+10 = 16!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For bars [3,3,5,5], what is the total length removed?", "바 [3,3,5,5]에서 제거한 총 길이는?"),
      question: t(E,
        "Bars [3,3,5,5]. Total removed length = ?",
        "바 [3,3,5,5]. 제거한 총 길이 = ?"),
      hint: t(E,
        "Each pair contributes 2 × size. Add up both pairs.",
        "각 짝은 2 × 크기만큼 기여해요. 두 짝의 값을 더해봐요."),
      answer: 16,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Use a stack: scan bars left to right. If the current bar equals the stack top, pop and add 2× size to the total. Otherwise push. Sections build it one piece at a time.",
        "스택 사용: 바를 왼쪽부터 스캔. 현재 바가 스택 top 과 같으면 pop 하고 2 × 크기를 총합에 더함. 아니면 push. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc15ChocoSections(E),
    },
  ];
}
