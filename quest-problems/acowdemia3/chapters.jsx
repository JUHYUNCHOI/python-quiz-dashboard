import { C, t } from "@/components/quest/theme";
import { getAcowdemia3Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "R, C = map(int, input().split())",
  "grid = [input() for _ in range(R)]",
  "",
  "# Each grass cell can mediate at most one friendship.",
  "# A grass cell with >= 2 adjacent cows mediates exactly one friendship.",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "ans = 0",
  "for r in range(R):",
  "    for c in range(C):",
  "        if grid[r][c] != 'G':",
  "            continue",
  "        cows = sum(",
  "            1 for dr, dc in dirs",
  "            if 0 <= r+dr < R and 0 <= c+dc < C and grid[r+dr][c+dc] == 'C'",
  "        )",
  "        if cows >= 2:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "On a grid, every cell is either a cow (C) or grass (G). Two cows become friends through a SHARED grass cell adjacent to both (up/down/left/right).\nEach grass cell can mediate AT MOST ONE friendship. Print the maximum number of friendships possible.",
        "격자 위 각 칸은 소 (C) 또는 풀 (G) 이에요. 두 소 모두에게 상하좌우로 인접한 풀 칸이 있으면 그 풀 칸을 통해 두 소가 친구가 될 수 있어요.\n단, 풀 칸 하나는 최대 한 쌍의 우정만 중재해요. 만들 수 있는 우정의 최대 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Acowdemia III</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Print the maximum number of cow friendships that can be formed through shared adjacent grass cells.",
                "공유된 인접 풀 칸을 통해 만들 수 있는 소들 사이 우정의 최대 개수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A grid where each cell is ", "각 칸이 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>C</code>
                  {t(E, " (cow) or ", " (소) 또는 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>G</code>
                  {t(E, " (grass).", " (풀) 인 격자가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two cows become ", "두 소가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "friends through a shared grass cell", "공유된 풀 칸을 통해 친구")}</b>
                  {t(E, " adjacent to both (up/down/left/right).",
                        " 가 돼요 (그 풀이 두 소 모두에게 상하좌우로 인접).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each grass cell ", "각 풀 칸은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "mediates at most ONE friendship", "최대 1쌍의 우정만 중재")}</b>
                  {t(E, ".", " 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of friendships", "만들 수 있는 우정의 최대 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "If 2 cows are both adjacent to 1 grass cell, what is the maximum number of friendships?", "2마리의 소가 모두 1개의 풀 칸에 인접하면, 최대 우정 수는?"),
      question: t(E,
        "2 cows adjacent to 1 grass cell. Max friendships?",
        "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
      ],
      correct: 1,
      explain: t(E,
        "The 2 cows can become friends through the shared grass cell. That grass cell is used up, so max = 1.",
        "2마리 소가 공유 풀 칸을 통해 친구가 될 수 있어요. 그 풀 칸은 사용되어 최대 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2 cows adjacent to 1 grass cell. How many friendships at most?", "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      question: t(E,
        "2 cows, 1 shared grass cell. Max friendships?",
        "소 2마리, 공유 풀 칸 1개. 최대 우정 수?"),
      hint: t(E,
        "Each grass cell mediates exactly one friendship between two adjacent cows.",
        "각 풀 칸은 인접한 두 소 사이의 정확히 하나의 우정을 중재."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Greedy: scan grass cells left-to-right, top-to-bottom. For each grass cell, find pairs of cows it could connect (its 2 adjacent cow cells). If both cows are still 'free' (haven't been paired yet), match them and increment count. Sections build it one piece at a time.",
        "그리디: 풀 칸을 왼→오, 위→아래로 스캔. 각 풀 칸마다 연결할 수 있는 소 쌍 (인접한 2 마리 소) 을 찾아요. 두 소가 아직 짝이 없으면 매칭하고 카운트 증가. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAcowdemia3Sections(E),
    },
  ];
}
