import { C, t } from "@/components/quest/theme";
import { getHerdleSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "for _ in range(int(input())):",
  "    answer = [[input().split() for _ in range(3)] for _ in range(2)]",
  "    guess  = [[input().split() for _ in range(3)] for _ in range(2)]",
  "    # Flatten to 3x3 grids",
  "    ans = [input().split() for _ in range(3)]",
  "    gue = [input().split() for _ in range(3)]",
  "",
  "    green = 0",
  "    yellow = 0",
  "    remaining_ans = {}",
  "    remaining_gue = {}",
  "",
  "    # Count greens first",
  "    for r in range(3):",
  "        for c in range(3):",
  "            if ans[r][c] == gue[r][c]:",
  "                green += 1",
  "            else:",
  "                remaining_ans[ans[r][c]] = remaining_ans.get(ans[r][c], 0) + 1",
  "                remaining_gue[gue[r][c]] = remaining_gue.get(gue[r][c], 0) + 1",
  "",
  "    # Count yellows from remaining",
  "    for breed in remaining_gue:",
  "        if breed in remaining_ans:",
  "            yellow += min(remaining_gue[breed], remaining_ans[breed])",
  "",
  "    print(green)",
  "    print(yellow)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A Wordle-style game on a 3×3 grid of cow breeds. You're given the secret answer grid AND the player's guess grid.\nFor each guess cell: GREEN if the breed matches the same cell in the answer; otherwise YELLOW if that breed appears elsewhere in the answer (limited by remaining count).\nCount GREEN cells and YELLOW cells.",
        "3×3 소 품종 그리드로 하는 Wordle 게임이에요. 비밀 정답 그리드와 플레이어의 추측 그리드가 주어져요.\n각 추측 칸에 대해: 같은 위치의 정답과 같으면 GREEN, 아니라면 그 품종이 정답 다른 곳에 남아있으면 YELLOW (남은 개수만큼만).\nGREEN 칸과 YELLOW 칸의 수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udfe9"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Herdle</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "3×3 grids of cow breeds (letters)", "3×3 소 품종 그리드 (문자)")}</b>
                  {t(E, " are given — the secret ", " 두 개가 주어져요 — 정답 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "answer", "answer")}</b>
                  {t(E, " grid and the player's ", " 그리드와 플레이어의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "guess", "guess")}</b>
                  {t(E, " grid.", " 그리드.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "GREEN", "GREEN")}</b>
                  {t(E, ": guess cell exactly equals the same cell in the answer.",
                        ": 추측 칸이 정답의 같은 칸과 정확히 같음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#ca8a04" }}>{t(E, "YELLOW", "YELLOW")}</b>
                  {t(E, ": breed appears somewhere ELSE in the answer (not GREEN). Each answer-cell can supply at most one YELLOW.",
                        ": 그 품종이 정답의 다른 칸에 있음 (GREEN 아님). 정답 칸 하나는 최대 1개의 YELLOW만 만들 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the count of GREEN cells, then YELLOW cells", "GREEN 칸 개수와 YELLOW 칸 개수")}</b>
                  {t(E, ".", "를 차례로 출력해요.")}
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
        "If the answer grid is all 'A' and the guess grid is also all 'A', every cell matches exactly!", "정답 그리드가 전부 'A'이고 추측 그리드도 전부 'A'이면, 모든 셀이 정확히 일치해요!"),
      question: t(E,
        "Answer grid: all 'A'. Guess grid: all 'A'. How many green and yellow tiles?",
        "정답 그리드: 전부 'A'. 추측 그리드: 전부 'A'. 초록과 노란 타일 수는?"),
      options: [
        t(E, "9 green, 0 yellow", "초록 9, 노랑 0"),
        t(E, "0 green, 9 yellow", "초록 0, 노랑 9"),
        t(E, "9 green, 9 yellow", "초록 9, 노랑 9"),
      ],
      correct: 0,
      explain: t(E,
        "All 9 positions match exactly, so 9 green, 0 yellow. Yellows only count non-green matches.",
        "9개 위치 모두 정확히 일치하므로 초록 9, 노랑 0. 노랑은 초록이 아닌 매칭만 세."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Both grids are all 'A'. How many green tiles?", "두 그리드가 모두 'A'야. 초록 타일은 몇 개?"),
      question: t(E,
        "Answer=all 'A', Guess=all 'A'. Green count?",
        "정답=전부 'A', 추측=전부 'A'. 초록 개수?"),
      hint: t(E,
        "Every cell matches, so all 9 are green.",
        "모든 셀이 일치하니까 9개 다 초록이에요."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "First pass over 9 cells: count GREEN (exact matches) and remember which guess letters / answer letters are still available. Second pass: count YELLOWs by matching available guess letters with available answer letters.",
        "9 칸을 한 번 훑으면서: GREEN (정확한 일치) 을 세고, 남은 추측 글자 / 정답 글자를 기록. 두 번째 패스: 남은 추측 글자와 남은 정답 글자를 매칭해서 YELLOW 개수."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getHerdleSections(E),
    },
  ];
}
