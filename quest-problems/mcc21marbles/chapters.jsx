import { C, t } from "@/components/quest/theme";
import { getMcc21MarblesSections } from "./components";

export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "total = sum(a)",
  "target = total // N",
  "extra = total % N",
  "",
  "ops = 0",
  "for i in range(N):",
  "    diff = a[i] - target - (1 if i < extra else 0)",
  "    ops += abs(diff)",
  "",
  "print(ops // 2)",
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
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd34"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Marbles and Boxes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P3</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "N boxes in a row with m[1..N] marbles", "한 줄의 N 개 상자에 m[1..N] 개의 구슬")}</b>
                  {t(E, " (total is divisible by N).",
                        " (총합이 N 으로 나누어떨어짐) 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move 1 marble to an adjacent box", "구슬 1 개를 인접한 상자로 옮기기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
      hint: t(E, "Move 1 marble from first to second box.", "첫 번째에서 두 번째 상자로 구슬 1개 이동."),
      answer: 1,
    },
  ];
}

export function makeMcc21MarblesCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Calculate target value, then sum absolute differences. O(N) time.", "목표값 계산 후 절대 차이 합산. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Compute target = total / N.\nSum abs(a[i] - target) for all i, then divide by 2 (each move fixes two boxes).",
              "target = total / N 계산.\n모든 i에 대해 abs(a[i] - target) 합산, 2로 나누기 (각 이동이 두 상자 수정).")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21MarblesSections(E),
    },
  ];
}
