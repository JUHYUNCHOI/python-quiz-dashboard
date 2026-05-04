import { C, t } from "@/components/quest/theme";
import { getMcc20MissingSections } from "./components";

export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Sum of 1..N",
  "total = N * (N + 1) // 2",
  "given_sum = sum(abs(x) for x in a)",
  "",
  "# The missing number contributes to make total",
  "# But signs may be shuffled, so we consider",
  "# all possible missing values",
  "present = set(abs(x) for x in a)",
  "possible = []",
  "for v in range(1, N + 1):",
  "    if v not in present:",
  "        possible.append(v)",
  "",
  "print(sum(possible))",
];

export function makeMcc20MissingCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A permutation of 1 to N with one number missing and some signs shuffled.\nFind the sum of all possible missing values.", "1부터 N까지의 순열에서 하나가 빠지고 일부 부호가 바뀌었어. 가능한 빠진 값의 합을 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2753"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Missing Number</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P5</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Take absolute values to ignore sign changes.\nFind which number from 1..N is not present. Sum all missing candidates.",
              "핵심: 절대값으로 부호 변경 무시.\n1..N에서 없는 숫자 찾기. 빠진 후보 모두 합산.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Permutation of 1-3, given [1, 3]. Which number is missing?", "1-3 순열, [1, 3]이 주어져. 빠진 숫자는?"),
      question: t(E,
        "Permutation of {1,2,3}, given [1,3]. Missing number?",
        "순열 {1,2,3}, [1,3] 주어짐. 빠진 숫자?"),
      options: [
        t(E, "2", "2"),
        t(E, "1", "1"),
        t(E, "3", "3"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 2 is the only number from {1,2,3} not in the given array.",
        "맞아! {1,2,3}에서 주어진 배열에 없는 유일한 숫자는 2."),
    },
    {
      type: "input",
      narr: t(E,
        "Sum of possible missing values when missing number is 2?", "빠진 숫자가 2일 때 가능한 빠진 값의 합?"),
      question: t(E,
        "Missing = {2}. Sum of possible missing values?",
        "빠진 = {2}. 가능한 빠진 값의 합?"),
      hint: t(E, "Only one possible value: 2", "가능한 값 하나: 2"),
      answer: 2,
    },
  ];
}

export function makeMcc20MissingCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Use set of absolute values to find missing numbers. O(N) time.", "절대값의 집합으로 빠진 숫자 찾기. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Build a set of abs(a[i]).\nCheck each number 1..N. If not in set, add to answer.",
              "abs(a[i])의 집합 구축.\n1..N의 각 숫자 확인. 집합에 없으면 답에 추가.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20MissingSections(E),
    },
  ];
}
