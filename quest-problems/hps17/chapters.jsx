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
        "FJ plays Hoof, Paper, Scissors against a cow for N rounds.\nThe cow's gestures (1, 2, 3) map to H, P, S but we don't know which is which.\nFJ uses a SINGLE gesture for ALL rounds.\nFind the maximum wins by trying all possible mappings.", "FJ가 소와 N라운드 동안 가위바위보(Hoof, Paper, Scissors)를 해.\n소의 제스처(1, 2, 3)가 H, P, S에 대응하는데 어떤 대응인지 몰라.\nFJ는 모든 라운드에서 같은 제스처를 써.\n모든 가능한 매핑을 시도해서 최대 승수를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u270a"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Hoof, Paper, Scissors</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: There are 3! = 6 ways to map {1,2,3} to {H,P,S}. For each mapping and each FJ gesture choice, count wins. Take the maximum.",
              "핵심: {1,2,3}을 {H,P,S}에 매핑하는 방법은 3! = 6가지. 각 매핑과 FJ 제스처 선택마다 승수를 세고 최댓값을 취해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "How many permutations of {H, P, S} are there? This is 3 factorial.", "{H, P, S}의 순열은 몇 가지야? 3 팩토리얼이지."),
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
        "맞아! 3! = 3 x 2 x 1 = 6가지 순열이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "We try all permutations of {H, P, S}. How many permutations do we check?", "{H, P, S}의 모든 순열을 시도해. 몇 가지 순열을 확인해?"),
      question: t(E,
        "How many permutations do we try?",
        "몇 가지 순열을 시도해?"),
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
        "Try all 6 permutations, and for each try all 3 FJ choices.\nFor each combo, scan N rounds.\nTotal: O(18N) = O(N).", "6가지 순열을 모두 시도하고, 각각에 대해 FJ의 3가지 선택을 시도해. 각 조합마다 N라운드를 스캔. 총: O(18N) = O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Brute force: 6 mappings x 3 FJ choices x N rounds. Since 18 is constant, it's O(N).",
              "브루트포스: 6가지 매핑 x 3가지 FJ 선택 x N 라운드. 18은 상수이므로 O(N).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getHps17Sections(E),
    },
  ];
}
