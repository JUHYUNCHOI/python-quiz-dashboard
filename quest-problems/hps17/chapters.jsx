import { C, t } from "@/components/quest/theme";
import { getHps17Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "plays = [input().strip() for _ in range(N)]",
  "",
  "# beats[c] = the opponent gesture that c defeats",
  "beats = {'H': 'S', 'P': 'H', 'S': 'P'}",
  "idx = {'H': 0, 'P': 1, 'S': 2}",
  "",
  "# pre[i][c] = wins over rounds 0..i-1 if Bessie always plays c",
  "pre = [[0, 0, 0] for _ in range(N + 1)]",
  "for i, g in enumerate(plays):",
  "    for c in 'HPS':",
  "        pre[i + 1][idx[c]] = pre[i][idx[c]] + (1 if g == beats[c] else 0)",
  "",
  "# Try every split k and every (first, second) gesture pair",
  "best = 0",
  "for c1 in 'HPS':",
  "    for c2 in 'HPS':",
  "        for k in range(N + 1):",
  "            wins = pre[k][idx[c1]] + (pre[N][idx[c2]] - pre[k][idx[c2]])",
  "            if wins > best:",
  "                best = wins",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ plays Rock-Paper-Scissors against a cow for N rounds. The cow's gesture each round is recorded as 1, 2, or 3 — but we DON'T know which number maps to Hoof/Paper/Scissors.\nFJ must pick ONE gesture and use it for ALL N rounds. Print the maximum number of rounds FJ can win — over the best mapping AND the best FJ gesture.",
        "FJ가 소와 N라운드 동안 가위바위보를 해요. 매 라운드 소의 제스처는 1, 2, 3 중 하나로 기록되지만, 어떤 숫자가 Hoof/Paper/Scissors 중 무엇인지 우리는 몰라요.\nFJ는 한 가지 제스처를 골라서 N라운드 내내 같은 것만 내야 해요. 가능한 매핑과 FJ 제스처 조합 중에서 FJ가 이길 수 있는 최대 라운드 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u270a"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Hoof, Paper, Scissors</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Print the maximum number of rounds FJ can win.", "FJ가 이길 수 있는 최대 라운드 수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ plays ", "FJ가 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N rounds of Hoof-Paper-Scissors", "N라운드 가위바위보")}</b>
                  {t(E, " against a cow.", " 를 소와 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The cow's gestures are recorded as ", "소의 제스처는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "1, 2, or 3", "1, 2, 3 중 하나")}</b>
                  {t(E, " — but we DON'T know which number means Hoof / Paper / Scissors.",
                        "로 기록되지만, 어느 숫자가 Hoof/Paper/Scissors인지는 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must use the ", "FJ는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "same gesture for ALL N rounds", "N라운드 내내 같은 제스처")}</b>
                  {t(E, ".", "만 내야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of rounds FJ can win", "FJ가 이길 수 있는 최대 라운드 수")}</b>
                  {t(E, " (best over all 6 mappings and 3 FJ gestures).",
                        "를 출력해요 (6가지 매핑과 3가지 제스처 조합 중 최선).")}
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
        "How many permutations of {H, P, S} are there? This is 3 factorial.", "{H, P, S}의 순열은 몇 가지예요? 3 팩토리얼이지."),
      question: t(E,
        "How many permutations of 3 items (3!) exist?",
        "3개 항목의 순열(3!)은 몇 가지?"),
      options: [
        t(E, "3", "3"),
        t(E, "6", "6"),
        t(E, "9", "9"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 3! = 3 x 2 x 1 = 6 permutations.",
        "맞아! 3! = 3 x 2 x 1 = 6가지 순열이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "We try all permutations of {H, P, S}. How many permutations do we check?", "{H, P, S}의 모든 순열을 시도해요. 몇 가지 순열을 확인해요?"),
      question: t(E,
        "How many permutations do we try?",
        "몇 가지 순열을 시도해요?"),
      hint: t(E,
        "Count the permutations of 3 distinct items.",
        "서로 다른 3개 항목의 순열 수를 세어 봐요."),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "There are only 3! = 6 ways to map cow gestures {1,2,3} to {Hoof, Paper, Scissors}, and 3 choices for FJ's fixed gesture. For each of 18 combos, scan all N rounds and count FJ's wins. Take the maximum. Sections build it one piece at a time.",
        "소의 제스처 {1,2,3} 을 {Hoof, Paper, Scissors} 에 매핑하는 방법은 3! = 6 가지뿐, FJ 의 고정 제스처는 3 가지. 18 가지 조합마다 N 라운드를 스캔해 FJ 의 승수를 세고, 최댓값을 채택. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getHps17Sections(E),
    },
  ];
}
