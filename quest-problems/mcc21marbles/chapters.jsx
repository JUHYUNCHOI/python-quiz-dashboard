import { C, t } from "@/components/quest/theme";

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
        "N marbles are distributed among boxes. Move marbles between adjacent boxes to equalize. Find the minimum number of operations.",
        "N개의 구슬이 상자에 분배되어 있어. 인접한 상자 사이로 구슬을 옮겨서 같게 만들어. 최소 이동 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd34"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Marbles and Boxes</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P3</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Calculate the target per box (total/N). Count excess marbles; each move transfers one marble. Total moves = sum of |excess| / 2.",
              "핵심: 상자당 목표 계산 (total/N). 초과 구슬 수 세기; 각 이동은 구슬 1개 전달. 총 이동 = |초과| 합 / 2.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "2 boxes with [5, 3]. To equalize to [4, 4], how many marbles do we move?",
        "상자 2개 [5, 3]. [4, 4]로 같게 만들려면 구슬 몇 개를 옮겨?"),
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
        "Boxes [5, 3]. Minimum moves to equalize?",
        "상자 [5, 3]. 같게 만드는 최소 이동 횟수?"),
      question: t(E,
        "Boxes = [5, 3]. Min moves to make equal?",
        "상자 = [5, 3]. 같게 만드는 최소 이동?"),
      hint: t(E, "Move 1 marble from first to second box.", "첫 번째에서 두 번째 상자로 구슬 1개 이동."),
      answer: 1,
    },
  ];
}

export function makeMcc21MarblesCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Calculate target value, then sum absolute differences. O(N) time.",
        "목표값 계산 후 절대 차이 합산. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Compute target = total / N. Sum |a[i] - target| for all i, then divide by 2 (each move fixes two boxes).",
              "target = total / N 계산. 모든 i에 대해 |a[i] - target| 합산, 2로 나누기 (각 이동이 두 상자 수정).")}
          </div>
        </div>),
    },
    {
      type: "code",
      narr: t(E, "Here's the solution!", "풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
