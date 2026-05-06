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
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Chocolate Bars</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P5</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A row of ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N chocolate bars with sizes a[1..N]", "N 개 초콜릿 바, 크기는 각각 a[i]")}</b>
                  {t(E, ".", " 가 한 줄에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeatedly remove ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent pairs of equal-size bars", "같은 크기의 인접한 두 바")}</b>
                  {t(E, " — after removal, the remaining bars become adjacent and may form new equal pairs.",
                        " 를 반복해서 제거 — 제거 후 남은 바들이 인접해 새로운 짝이 생길 수 있음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
        "(3,3) removes 6, (5,5) removes 10. Total = 16.",
        "(3,3) 제거 = 6, (5,5) 제거 = 10. 총 = 16."),
      answer: 16,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Use a stack: scan bars left to right. If the current bar equals the stack top, pop and add 2× size to the total. Otherwise push.",
        "스택 사용: 바를 왼쪽부터 스캔. 현재 바가 스택 top 과 같으면 pop 하고 2 × 크기를 총합에 더함. 아니면 push."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init empty stack", "빈 스택"), code: "stack = []; total = 0", color: "#8b5cf6" },
              { n: 2, label: t(E, "For each bar", "각 바마다"), code: "for size in bars:", color: "#7c3aed" },
              { n: 3, label: t(E, "Match top? pop + add 2×", "top 과 같음? pop + 2× 더함"), code: "if stack and stack[-1] == size: stack.pop(); total += 2 * size", color: "#0891b2" },
              { n: 4, label: t(E, "Else push", "아니면 push"), code: "else: stack.append(size);  print(total)", color: "#16a34a" },
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
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "each bar pushed/popped at most once", "각 바 최대 한 번 push/pop")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15ChocoSections(E),
    },
  ];
}
