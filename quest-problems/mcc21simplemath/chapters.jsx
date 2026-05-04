import { C, t } from "@/components/quest/theme";
import { getMcc21SimpleMathSections } from "./components";

export const SOLUTION_CODE = [
  "N, P = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "if P == 1:",
  "    # Sum with addition",
  "    ans = sum(a)",
  "elif P == 2:",
  "    # Product",
  "    ans = 1",
  "    for x in a:",
  "        ans *= x",
  "elif P == 3:",
  "    # Sequential floor division",
  "    ans = a[0]",
  "    for i in range(1, N):",
  "        ans = ans // a[i]",
  "",
  "print(ans)",
];

export function makeMcc21SimpleMathCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Given N, P and array A.\nPerform operations depending on P: P=1 addition, P=2 multiplication, P=3 floor division.\nCompute the result!", "N, P와 배열 A가 주어져. P에 따라 연산 수행: P=1 덧셈, P=2 곱셈, P=3 나눗셈(내림). 결과를 계산해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd22"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Simple Math</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P5</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Branch on P.\nP=1: sum all. P=2: multiply all. P=3: sequential floor division from left to right.",
              "핵심: P에 따라 분기.\nP=1: 모두 더하기.\nP=2: 모두 곱하기.\nP=3: 왼쪽에서 오른쪽으로 순차 나눗셈.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "N=3, P=1, A=[2,3,4]. With addition, what is the sum?", "N=3, P=1, A=[2,3,4]. 덧셈이면 합은?"),
      question: t(E,
        "P=1 (addition), A=[2,3,4]. Result?",
        "P=1 (덧셈), A=[2,3,4]. 결과?"),
      options: [
        t(E, "9", "9"),
        t(E, "24", "24"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 2 + 3 + 4 = 9.",
        "맞아! 2 + 3 + 4 = 9."),
    },
    {
      type: "input",
      narr: t(E,
        "Compute the sum: 2 + 3 + 4 = ?", "합 계산: 2 + 3 + 4 = ?"),
      question: t(E,
        "A = [2, 3, 4], P = 1. Sum = ?",
        "A = [2, 3, 4], P = 1. 합 = ?"),
      hint: t(E, "2 + 3 + 4 = 9", "2 + 3 + 4 = 9"),
      answer: 9,
    },
  ];
}

export function makeMcc21SimpleMathCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Simple branching based on P. O(N) for each operation.", "P에 따른 간단한 분기. 각 연산 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Use if-elif to branch on P.\nIterate through the array once for each operation type.",
              "if-elif로 P에 따라 분기.\n각 연산 유형별로 배열을 한 번 순회.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21SimpleMathSections(E),
    },
  ];
}
