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
        "An integer P (1, 2, or 3) and an array A of N integers are given.\nApply the operation across A in left-to-right order: P=1 → sum, P=2 → product, P=3 → sequential floor-division. Print the result.",
        "정수 P (1, 2, 또는 3) 와 N 개의 정수 배열 A 가 주어져요.\nA 에 대해 왼쪽부터 오른쪽으로 연산 적용: P=1 → 합, P=2 → 곱, P=3 → 순차 정수 나눗셈. 결과를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd22"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Simple Math</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P5</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given an ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "operation code P (1, 2, 3) and array A of N integers", "연산 코드 P (1, 2, 3) 와 N 개의 정수 배열 A")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Apply left-to-right: ", "왼쪽부터 오른쪽으로 적용: ")}
                  <b style={{ color: "#7c3aed" }}>P=1</b>
                  {t(E, " sum all, ", " 합, ")}
                  <b style={{ color: "#7c3aed" }}>P=2</b>
                  {t(E, " product, ", " 곱, ")}
                  <b style={{ color: "#7c3aed" }}>P=3</b>
                  {t(E, " sequential floor-division.",
                        " 순차 정수 나눗셈.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "result of the operation across the array", "배열에 대한 연산의 결과")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
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
        "Branch on P: P=1 sum (use sum()); P=2 product (multiply through); P=3 sequential floor division (start with A[0], floor-divide by each subsequent value).",
        "P 로 분기: P=1 합 (sum() 사용); P=2 곱 (모두 곱); P=3 순차 정수 나눗셈 (A[0] 시작, 이어지는 값으로 정수 나눗셈)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N, P, A", "N, P, A 읽기"), code: "N, P = ...; A = list(...)", color: "#f97316" },
              { n: 2, label: t(E, "P=1 → sum", "P=1 → 합"), code: "if P==1: print(sum(A))", color: "#0891b2" },
              { n: 3, label: t(E, "P=2 → product", "P=2 → 곱"), code: "elif P==2: result = 1; for x: result *= x", color: "#7c3aed" },
              { n: 4, label: t(E, "P=3 → floor div left to right", "P=3 → 왼→오 정수 나눗셈"), code: "else: result = A[0]; for x in A[1:]: result //= x;  print(result)", color: "#16a34a" },
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
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass over the array", "배열 한 번 순회")}</div>
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
