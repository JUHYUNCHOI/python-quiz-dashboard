import { C, t } from "@/components/quest/theme";
import { getSleepyHerdSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "positions = sorted([int(input()) for _ in range(3)])",
  "a, b, c = positions",
  "",
  "# Gap between first two and last two",
  "gap1 = b - a  # gap between a and b",
  "gap2 = c - b  # gap between b and c",
  "",
  "# --- Maximum moves ---",
  "# Move the closer endpoint one step at a time",
  "# Max = (gap1 - 1) + (gap2 - 1) = total_span - 2",
  "max_moves = (c - a) - 2",
  "",
  "# --- Minimum moves ---",
  "if gap1 == 1 and gap2 == 1:",
  "    # Already consecutive",
  "    min_moves = 0",
  "elif gap1 <= 2 or gap2 <= 2:",
  "    # One gap is 1 or 2: can solve in 1 move",
  "    min_moves = 1",
  "else:",
  "    # Both gaps > 2: need 2 moves",
  "    min_moves = 2",
  "",
  "print(min_moves)",
  "print(max_moves)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Three cows stand at distinct positions on a number line. The only allowed move: take ONE of the two ENDPOINT cows and place her at any unoccupied position STRICTLY BETWEEN the other two. The goal is to make all three positions CONSECUTIVE integers.\nPrint two numbers: the MIN and MAX possible number of moves to reach a consecutive configuration.",
        "세 마리 소가 수직선의 서로 다른 위치에 있어요. 한 번에 할 수 있는 일: 양 끝에 있는 두 소 중 한 마리를 골라서, 다른 두 소 사이의 비어있는 자리에 옮기기. 세 소의 위치가 연속된 정수가 될 때까지 반복해요.\n끝낼 때까지 걸리는 이동 횟수의 최솟값과 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude34"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Sleepy Cow Herding</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#d97706" }}>{t(E, "3 cows at distinct integer positions", "서로 다른 정수 위치의 3마리 소")}</b>
                  {t(E, " on a number line.", " 가 수직선에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: take one of the ", "한 번의 이동: 양 끝에 있는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two endpoint cows", "두 소 중 한 마리")}</b>
                  {t(E, " and place her at any unoccupied integer ", "를 골라서 다른 두 소 사이의 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "STRICTLY BETWEEN the other two", "비어있는 자리")}</b>
                  {t(E, ".", "에 놓아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "all three positions become CONSECUTIVE integers", "세 소의 위치가 연속한 정수가 되도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MIN and MAX possible number of moves", "이동 횟수의 최솟값과 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Positions [4, 7, 9]. Move 4 to 8, getting [7, 8, 9]. How many moves was that?", "위치 [4, 7, 9]. 4를 8로 옮기면 [7, 8, 9]. 몇 번 이동했을까?"),
      question: t(E,
        "Positions [4,7,9]. Min moves to make consecutive?",
        "위치 [4,7,9]. 연속으로 만드는 최소 이동 횟수?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Move cow at 4 to position 8: [7,8,9] are consecutive. Just 1 move! Gap between 7 and 9 is 2, so min = 1.",
        "4에 있는 소를 8로 이동: [7,8,9] 연속. 1번만! 7과 9 사이 간격이 2라서 최소 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For positions [4,7,9], what is the minimum number of moves?", "위치 [4,7,9]에서 최소 이동 횟수는?"),
      question: t(E,
        "Positions [4,7,9]. Minimum moves?",
        "위치 [4,7,9]. 최소 이동 횟수?"),
      hint: t(E,
        "Gap 7-9 is 2, so we can place the cow at 4 into position 8 in one move.",
        "7-9 간격이 2이므로 4에 있는 소를 8로 1번에 옮길 수 있어요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort positions a < b < c. MAX moves = (c − a) − 2 (move one step at a time). MIN moves: 0 if already consecutive; 1 if one gap is ≤ 2 (move endpoint into the slot); else 2.",
        "위치 정렬 a < b < c. 최대 이동 = (c − a) − 2 (한 칸씩 이동). 최소: 이미 연속이면 0; 한쪽 간격이 ≤ 2 이면 1 (끝점을 그 자리에); 아니면 2."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Sort positions a ≤ b ≤ c", "위치 정렬"), code: "a, b, c = sorted(positions)", color: "#d97706" },
              { n: 2, label: t(E, "Already consecutive? min = 0", "이미 연속? 최소 = 0"), code: "if c-a == 2: min_moves = 0", color: "#7c3aed" },
              { n: 3, label: t(E, "Either gap ≤ 2? min = 1", "간격 ≤ 2? 최소 = 1"), code: "elif b-a ≤ 2 or c-b ≤ 2: min_moves = 1; else 2", color: "#0891b2" },
              { n: 4, label: t(E, "Print min and max", "최소·최대 출력"), code: "print(min_moves);  print((c - a) - 2)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(1)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "constant-time arithmetic", "상수 시간 산술")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSleepyHerdSections(E),
    },
  ];
}
