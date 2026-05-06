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
        "Originally a permutation of 1..N. One number got removed and some entries' signs were flipped (turned negative).\nGiven the resulting list of N−1 (possibly-signed) integers, print the sum of every distinct value that COULD be the missing one.",
        "원래는 1..N 의 순열이었어요. 한 숫자가 제거되고 일부 항목의 부호가 음수로 바뀌었어요.\n결과로 남은 N−1 개의 (부호 가능한) 정수 목록이 주어졌을 때, 빠진 숫자가 될 수 있는 서로 다른 값의 총합을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u2753"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Missing Number</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P5</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Originally a ", "원래는 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "permutation of 1..N", "1..N 의 순열")}</b>
                  {t(E, ".", " 이었어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One number was ", "한 숫자가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "removed", "제거")}</b>
                  {t(E, " and some entries' ", "되고, 일부 항목의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "signs were flipped (turned negative)", "부호가 음수로 변경")}</b>
                  {t(E, ".", "됐어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "sum of every distinct value that could be the missing one", "빠진 숫자가 될 수 있는 서로 다른 값의 총합")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
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
        "Take absolute values to undo sign flips. Build a set of present values; missing values are 1..N not in the set. Sum all missing candidates.",
        "절대값으로 부호 반전 무시. 존재하는 값의 집합 구축; 1..N 중 집합에 없는 것이 빠진 값. 후보 모두 합산."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N-1 (possibly signed) values", "N-1 개 (부호 가능) 값 읽기"), code: "vals = list(map(int, input().split()))", color: "#f97316" },
              { n: 2, label: t(E, "Build set of |v|", "|v| 집합 구축"), code: "present = {abs(v) for v in vals}", color: "#7c3aed" },
              { n: 3, label: t(E, "Sum missing in 1..N", "1..N 중 빠진 합산"), code: "missing_sum = sum(x for x in range(1, N+1) if x not in present)", color: "#0891b2" },
              { n: 4, label: t(E, "Print sum", "합 출력"), code: "print(missing_sum)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "build set + scan 1..N", "집합 구축 + 1..N 스캔")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20MissingSections(E),
    },
  ];
}
