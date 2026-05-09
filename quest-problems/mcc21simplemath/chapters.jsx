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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Simple Math</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E, "Read P, then run the matching operation across the array A.", "P 를 읽고, 배열 A 에 해당하는 연산을 실행해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given an ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "operation code P (1, 2, 3) and array A of N integers", "연산 코드 P (1, 2, 3) 와 N 개의 정수 배열 A")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
      hint: t(E, "Add the three values together.", "세 값을 모두 더해요."),
      answer: 9,
    },
  ];
}

export function makeMcc21SimpleMathCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Branch on P: P=1 sum (use sum()); P=2 product (multiply through); P=3 sequential floor division (start with A[0], floor-divide by each subsequent value). Sections build it one piece at a time.",
        "P 로 분기: P=1 합 (sum() 사용); P=2 곱 (모두 곱); P=3 순차 정수 나눗셈 (A[0] 시작, 이어지는 값으로 정수 나눗셈). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc21SimpleMathSections(E),
    },
  ];
}
