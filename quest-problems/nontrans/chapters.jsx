import { C, t } from "@/components/quest/theme";
import { getNonTransSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    A = list(map(int, input().split()))",
  "    B = list(map(int, input().split()))",
  "",
  "    def beats(X, Y):",
  "        win = sum(1 for x in X for y in Y if x > y)",
  "        lose = sum(1 for x in X for y in Y if x < y)",
  "        return win > lose",
  "",
  "    if not beats(A, B):",
  "        print('no')",
  "        continue",
  "",
  "    found = False",
  "    # Brute force all possible die C (4 sides, values 1-10)",
  "    for c1 in range(1, 11):",
  "        for c2 in range(c1, 11):",
  "            for c3 in range(c2, 11):",
  "                for c4 in range(c3, 11):",
  "                    C_die = [c1, c2, c3, c4]",
  "                    if beats(B, C_die) and beats(C_die, A):",
  "                        found = True",
  "                        break",
  "                if found: break",
  "            if found: break",
  "        if found: break",
  "",
  "    print('yes' if found else 'no')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given two 4-sided dice A and B where A beats B (more likely to roll higher), can we find a die C such that B beats C and C beats A?\nThis is the non-transitive property!", "A가 B를 이기는(더 높은 값을 굴릴 확률이 높은) 4면 주사위 A, B가 주어질 때, B가 C를 이기고 C가 A를 이기는 주사위 C를 찾을 수 있을까?\n이것이 비이행성이야!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfb2"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Non-Transitive Dice</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: 'A beats B' means more (a,b) pairs have a>b than a<b.\nBrute force all C with sides 1-10 (only 10^4 combinations since we can sort).",
              "핵심: 'A가 B를 이긴다'는 a>b인 (a,b) 쌍이 a<b인 쌍보다 많다는 뜻.\nC의 면을 1-10으로 브루트포스 (정렬하면 10^4 조합).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "'A beats B' means A is more likely to roll a higher value than B.\nWhat does this mean mathematically?", "'A가 B를 이긴다'는 A가 B보다 높은 값을 굴릴 확률이 높다는 뜻이야. 수학적으로 어떤 의미일까?"),
      question: t(E,
        "Die A 'beats' die B means:",
        "주사위 A가 B를 '이긴다'는 뜻은:"),
      options: [
        t(E, "More (a,b) pairs where a > b than a < b", "a > b인 (a,b) 쌍이 a < b인 쌍보다 많다"),
        t(E, "Sum of A's sides > sum of B's sides", "A의 면 합 > B의 면 합"),
        t(E, "Max of A > max of B", "A의 최댓값 > B의 최댓값"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! We compare all 16 pairs (4x4). If A wins more matchups than B, A beats B.",
        "맞아! 16개 쌍(4x4)을 모두 비교해서 A가 이기는 매치업이 더 많으면 A가 B를 이기는 거야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A=[1,2,3,4] vs B=[1,2,3,4].\nSame dice!\nDoes A beat B?\nCount pairs where a>b vs a<b.\nThey're equal, so no.\nEnter 0 for no.", "A=[1,2,3,4] vs B=[1,2,3,4]. 같은 주사위! A가 B를 이겨? a>b와 a<b 쌍 수가 같으니 아니야. 아니면 0을 입력해."),
      question: t(E,
        "A=[1,2,3,4], B=[1,2,3,4]. Does A beat B? (1=yes, 0=no)",
        "A=[1,2,3,4], B=[1,2,3,4]. A가 B를 이겨? (1=예, 0=아니오)"),
      hint: t(E,
        "Equal dice have equal win/loss counts. Neither beats the other.",
        "같은 주사위는 승/패 수가 같아. 누구도 이기지 못해."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Since die sides range 1-10, we only need to check sorted combinations: C(10+3,4) = 715 possibilities.\nWith 16 comparisons each, very fast!", "주사위 면이 1-10이니 정렬된 조합만 확인: C(10+3,4) = 715가지. 각각 16번 비교, 매우 빨라!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(10^4 x 16)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Brute force all possible die C with sorted sides (c1 <= c2 <= c3 <= c4).\nCheck if B beats C and C beats A.",
              "정렬된 면(c1 <= c2 <= c3 <= c4)으로 가능한 주사위 C를 전부 시도.\nB가 C를 이기고 C가 A를 이기는지 확인.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getNonTransSections(E),
    },
  ];
}
