import { C, t } from "@/components/quest/theme";
import { getMcc21CarrotsSections } from "./components";

export const SOLUTION_CODE = [
  "N, D = map(int, input().split())",
  "c = list(map(int, input().split()))",
  "",
  "# Count triples (i, j, k) with i < j < k whose carrot sum is divisible by D",
  "count = 0",
  "for i in range(N):",
  "    for j in range(i+1, N):",
  "        for k in range(j+1, N):",
  "            if (c[i] + c[j] + c[k]) % D == 0:",
  "                count += 1",
  "",
  "print(count)",
];

export function makeMcc21CarrotsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A rabbit has N baskets, basket i with c[i] carrots, and a target divisor D. Pick 3 distinct baskets whose carrot total is divisible by D.\nPrint how many such triples exist.",
        "토끼에게 N 개의 바구니가 있고, i 번 바구니에 c[i] 당근, 목표 약수 D 가 주어져요. 합이 D 로 나누어떨어지는 서로 다른 3 개 바구니를 골라요.\n그런 세 개 조합의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udd55"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Carrots</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A rabbit has ", "토끼에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N baskets with c[i] carrots each", "각 c[i] 당근의 N 개 바구니")}</b>
                  {t(E, " and a divisor ", " 와 약수 ")}
                  <b style={{ color: "#7c3aed" }}>D</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Pick ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "3 distinct baskets", "서로 다른 3 개 바구니")}</b>
                  {t(E, " whose carrot total is divisible by D.",
                        " 를 골라요. 합이 D 로 나누어떨어지게요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of such valid triples", "조건에 맞는 세 개 조합의 개수")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Given baskets [3, 6, 9], their sum is 18. Is 18 divisible by 3?", "바구니 [3, 6, 9]의 합은 18이에요. 18은 3으로 나누어떨어질까?"),
      question: t(E,
        "Baskets [3, 6, 9]. Sum = 18. Is 18 divisible by 3?",
        "바구니 [3, 6, 9]. 합 = 18. 18은 3으로 나누어떨어져요?"),
      options: [
        t(E, "Yes, 18 / 3 = 6", "맞아, 18 / 3 = 6"),
        t(E, "No, it has remainder", "아니, 나머지가 있어"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 18 / 3 = 6 with no remainder.",
        "맞아! 18 / 3 = 6, 나머지 없어요."),
    },
    {
      type: "input",
      narr: t(E,
        "What is the sum of baskets [3, 6, 9]?", "바구니 [3, 6, 9]의 합은?"),
      question: t(E,
        "Baskets = [3, 6, 9]. What is their sum?",
        "바구니 = [3, 6, 9]. 합은 얼마예요?"),
      hint: t(E, "3 + 6 + 9 = ?", "3 + 6 + 9 = ?"),
      answer: 18,
    },
  ];
}

export function makeMcc21CarrotsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Triple nested loops over all distinct triples (i, j, k). For each, check if c[i] + c[j] + c[k] is divisible by D. Count valid triples.",
        "모든 서로 다른 삼중조합 (i, j, k) 에 대해 삼중 반복. c[i] + c[j] + c[k] 가 D 로 나누어떨어지는지 확인. 유효한 조합의 수 카운트."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21CarrotsSections(E),
    },
  ];
}
