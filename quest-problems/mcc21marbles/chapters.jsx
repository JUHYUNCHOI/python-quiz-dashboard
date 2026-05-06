import { C, t } from "@/components/quest/theme";
import { getMcc21MarblesSections } from "./components";

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
        "Each box should end at target = total/N. Walk left to right tracking the running prefix imbalance — each unit of imbalance must be moved across that boundary, contributing 1 to the answer.",
        "각 상자가 target = total/N 이 되어야 해요. 왼쪽부터 오른쪽으로 누적 불균형을 추적 — 단위 불균형 각각이 그 경계를 건너야 하므로 답에 1 기여."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Compute target value", "목표값 계산"), code: "target = sum(m) // N", color: "#dc2626" },
              { n: 2, label: t(E, "Sweep, accumulate diff", "스윕, 차이 누적"), code: "cur = 0;  for i: cur += m[i] - target", color: "#7c3aed" },
              { n: 3, label: t(E, "Add absolute diff to answer", "|cur| 를 답에 추가"), code: "ops += abs(cur)", color: "#0891b2" },
              { n: 4, label: t(E, "Print total ops", "총 ops 출력"), code: "print(ops)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear sweep", "선형 한 번 스윕")}</div>
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
