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
        "You have a row of chocolate bars with different sizes.\nYou can remove adjacent pairs of equal-size bars.\nMaximize the total length removed!\nUse a stack to greedily match pairs.", "다양한 크기의 초콜릿 바가 한 줄로 있어. 같은 크기의 인접한 쌍을 제거할 수 있어. 제거한 총 길이를 최대화해! 스택으로 탐욕적으로 쌍을 매칭해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf6b"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Chocolate Bars</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P5</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Use a stack. Push each bar. If the top of the stack equals the current bar, pop and add 2*size to the total. This greedily removes adjacent equal pairs.",
              "핵심: 스택 사용. 각 바를 푸시. 스택 top이 현재 바와 같으면 팝하고 2*크기를 총합에 더해. 인접한 같은 쌍을 탐욕적으로 제거.")}
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
        "Each bar is pushed and popped at most once, so the stack solution is O(N)!", "각 바는 최대 한 번 push/pop 되니까 스택 풀이는 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Stack-based greedy: scan left to right. If the current bar matches the stack top, pop and accumulate. Otherwise push. Each element is handled at most twice.",
              "스택 기반 그리디: 왼쪽에서 오른쪽으로 스캔. 현재 바가 스택 top과 같으면 팝하고 누적. 아니면 push. 각 원소는 최대 2번 처리.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15ChocoSections(E),
    },
  ];
}
