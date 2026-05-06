import { C, t } from "@/components/quest/theme";
import { getHps17Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from itertools import permutations",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "gestures = [input().strip() for _ in range(N)]",
  "",
  "# Map 1,2,3 to H,P,S in all 6 permutations",
  "labels = ['H', 'P', 'S']",
  "best = 0",
  "",
  "for perm in permutations(labels):",
  "    mapping = {str(i+1): perm[i] for i in range(3)}",
  "    wins = 0",
  "    for g in gestures:",
  "        mine = mapping[g]",
  "        # H beats S, S beats P, P beats H",
  "        # Count wins if opponent plays optimally?",
  "        # Actually: we pick our gesture per round",
  "        # We need to maximize our wins given fixed mapping",
  "        pass",
  "    # Simpler: for each round, FJ picks gesture",
  "    # that beats opponent's gesture under this mapping",
  "    # Just count how many rounds FJ can win",
  "",
  "# Correct approach: try all 6 mappings of (1,2,3)->(H,P,S)",
  "# For each mapping, count how many FJ wins",
  "# FJ always picks the winning gesture",
  "",
  "best = 0",
  "for perm in permutations(labels):",
  "    wins = 0",
  "    for g in gestures:",
  "        cow_gesture = perm[int(g)-1]",
  "        # FJ picks the gesture that beats cow's",
  "        wins += 1  # FJ can always win each round",
  "    best = max(best, wins)",
  "",
  "# Wait - re-read: FJ uses SAME gesture every game",
  "# So FJ picks one gesture, count wins across all rounds",
  "best = 0",
  "for perm in permutations(labels):",
  "    for fj_choice in labels:",
  "        wins = 0",
  "        for g in gestures:",
  "            cow_g = perm[int(g)-1]",
  "            if (fj_choice=='H' and cow_g=='S') or \\",
  "               (fj_choice=='S' and cow_g=='P') or \\",
  "               (fj_choice=='P' and cow_g=='H'):",
  "                wins += 1",
  "        best = max(best, wins)",
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
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Hoof, Paper, Scissors</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ plays ", "FJ가 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N rounds of Hoof-Paper-Scissors", "N라운드 가위바위보")}</b>
                  {t(E, " against a cow.", " 를 소와 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The cow's gestures are recorded as ", "소의 제스처는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "1, 2, or 3", "1, 2, 3 중 하나")}</b>
                  {t(E, " — but we DON'T know which number means Hoof / Paper / Scissors.",
                        "로 기록되지만, 어느 숫자가 Hoof/Paper/Scissors인지는 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must use the ", "FJ는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "same gesture for ALL N rounds", "N라운드 내내 같은 제스처")}</b>
                  {t(E, ".", "만 내야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
        "3! = 6.",
        "3! = 6."),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "There are only 3! = 6 ways to map cow gestures {1,2,3} to {Hoof, Paper, Scissors}, and 3 choices for FJ's fixed gesture. For each of 18 combos, scan all N rounds and count FJ's wins. Take the maximum.",
        "소의 제스처 {1,2,3} 을 {Hoof, Paper, Scissors} 에 매핑하는 방법은 3! = 6 가지뿐, FJ 의 고정 제스처는 3 가지. 18 가지 조합마다 N 라운드를 스캔해 FJ 의 승수를 세고, 최댓값을 채택."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N rounds (cow gestures)", "N 라운드 읽기 (소 제스처)"), code: "rounds = list(map(int, input()))", color: "#2563eb" },
              { n: 2, label: t(E, "Try every {1,2,3} → {H,P,S} mapping", "모든 {1,2,3} → {H,P,S} 매핑"), code: "for mapping in permutations(['H','P','S']): ...", color: "#7c3aed" },
              { n: 3, label: t(E, "Try every FJ gesture", "FJ 의 모든 제스처 시도"), code: "for fj in 'HPS': wins = sum(beats(fj, mapping[r-1]) for r in rounds)", color: "#0891b2" },
              { n: 4, label: t(E, "Print max wins over all 18", "18 조합 중 최대 승수 출력"), code: "print(max_wins)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "constant 18 combos × N rounds = O(N)", "상수 18 조합 × N 라운드 = O(N)")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getHps17Sections(E),
    },
  ];
}
