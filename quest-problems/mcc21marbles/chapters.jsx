import { C, t } from "@/components/quest/theme";
import { getMcc21MarblesSections, Mcc21MarblesBoundarySim } from "./components";

export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "target = sum(a) // N",
  "",
  "# Each adjacent move = 1 marble crossing one boundary.",
  "# Total moves = sum over boundaries i of |how many marbles cross boundary i|",
  "#             = sum |prefix_sum(a[k] - target) for k = 0..i|.",
  "ops = 0",
  "carry = 0",
  "for i in range(N - 1):",
  "    carry += a[i] - target",
  "    ops += abs(carry)",
  "",
  "print(ops)",
];

export function makeMcc21MarblesCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "N boxes in a row hold m[1..N] marbles. The total is divisible by N. One operation: move ONE marble from a box to an adjacent box (left or right).\nPrint the MINIMUM number of operations to equalize all boxes (each box ends with total/N marbles).",
        "한 줄로 늘어선 N 개의 상자에 m[1..N] 개의 구슬이 있어요. 총합이 N 으로 나누어떨어져요. 한 번의 연산: 구슬 1 개를 인접한 상자 (왼쪽 또는 오른쪽) 로 옮기기.\n모든 상자를 같은 개수 (total/N) 로 만드는 데 필요한 최소 연산 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd34"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Marbles and Boxes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Find the minimum number of single-marble moves to make every box hold the same count.", "구슬을 한 개씩 옮겨 모든 상자를 같은 개수로 만드는 최소 이동 횟수를 구해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "N boxes in a row with m[1..N] marbles", "한 줄의 N 개 상자에 m[1..N] 개의 구슬")}</b>
                  {t(E, " (total is divisible by N).",
                        " (총합이 N 으로 나누어떨어짐) 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move 1 marble to an adjacent box", "구슬 1 개를 인접한 상자로 옮기기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum operations to make every box have the same count", "모든 상자를 같은 개수로 만드는 최소 연산 횟수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Watch the imbalance flow across each boundary. Whatever amount of imbalance crosses an edge IS the marbles moved there — the answer is just the sum of |carry| at every edge.",
        "불균형이 각 경계를 어떻게 건너는지 봐요. 경계를 통과하는 불균형의 양이 곧 그 자리에서 옮기는 구슬 수 — 정답은 모든 경계의 |carry| 합."),
      content: <Mcc21MarblesBoundarySim E={E} />,
    },
    {
      type: "quiz",
      narr: t(E,
        "2 boxes with [5, 3]. To equalize to [4, 4], how many marbles do we move?", "상자 2개 [5, 3]. [4, 4]로 같게 만들려면 구슬 몇 개를 옮겨?"),
      question: t(E,
        "Boxes [5, 3]. Move to [4, 4]. How many moves?",
        "상자 [5, 3]. [4, 4]로 이동. 몇 번?"),
      options: [
        t(E, "1 move", "1번"),
        t(E, "2 moves", "2번"),
        t(E, "3 moves", "3번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Move 1 marble from box 1 to box 2.",
        "맞아! 상자 1에서 상자 2로 구슬 1개 이동."),
    },
    {
      type: "input",
      narr: t(E,
        "Boxes [5, 3]. Minimum moves to equalize?", "상자 [5, 3]. 같게 만드는 최소 이동 횟수?"),
      question: t(E,
        "Boxes = [5, 3]. Min moves to make equal?",
        "상자 = [5, 3]. 같게 만드는 최소 이동?"),
      hint: t(E, "Each box should end at 4. How far is each box from 4?", "각 상자가 4가 되어야 해요. 각 상자는 4에서 얼마나 떨어져 있나요?"),
      answer: 1,
    },
  ];
}

export function makeMcc21MarblesCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Each box should end at target = total/N. Walk left to right tracking the running prefix imbalance — each unit of imbalance must be moved across that boundary, contributing 1 to the answer. Sections build it one piece at a time.",
        "각 상자가 target = total/N 이 되어야 해요. 왼쪽부터 오른쪽으로 누적 불균형을 추적 — 단위 불균형 각각이 그 경계를 건너야 하므로 답에 1 기여. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc21MarblesSections(E),
    },
  ];
}
