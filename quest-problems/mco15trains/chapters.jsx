import { C, t } from "@/components/quest/theme";
import { getTrainsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import heapq",
  "",
  "N = int(input())",
  "grid = []",
  "for i in range(N):",
  "    row = list(map(int, input().split()))",
  "    grid.append(row)",
  "",
  "ax, ay, bx, by = map(int, input().split())",
  "ax -= 1  # 0-indexed",
  "ay -= 1",
  "bx -= 1",
  "by -= 1",
  "",
  "INF = float('inf')",
  "dist = []",
  "for _ in range(N):            # 줄마다 [INF, INF, …] 하나씩",
  "    dist.append([INF] * N)",
  "dist[ax][ay] = grid[ax][ay]",
  "",
  "pq = [(grid[ax][ay], ax, ay)]",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "while pq:",
  "    d, x, y = heapq.heappop(pq)",
  "    if d > dist[x][y]:",
  "        continue",
  "    if x == bx and y == by:",
  "        break",
  "    for dx, dy in dirs:",
  "        nx, ny = x + dx, y + dy",
  "        if 0 <= nx < N and 0 <= ny < N and grid[nx][ny] != -1:",
  "            nd = d + grid[nx][ny]",
  "            if nd < dist[nx][ny]:",
  "                dist[nx][ny] = nd",
  "                heapq.heappush(pq, (nd, nx, ny))",
  "",
  "print(dist[bx][by])",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrainsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        /* 2026-09-17: 한국어는 55자로 줄였는데 영어만 4문장 313자짜리 벽으로 남아 있었다
           (check-bilingual-drift.py 가 잡은 자리). 자세한 내용은 바로 아래 📖 카드가 한다. */
        "Find the path from A to B that displaces the fewest people.",
        "A 에서 B 까지 철도를 놓을 때 옮기는 인구가 가장 적은 길을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude82"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Trains</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Find the minimum total population displaced by a train path from A to B on an N×N grid.", "N×N 격자에서 A 에서 B 까지 철도 경로가 옮기는 인구 총합의 최솟값을 구해요.")}
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
                  {t(E, "An ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N × N grid with populations per cell (or −1 if blocked)", "각 칸의 인구 수를 가진 N × N 격자 (−1 = 막힘)")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Build a train path from cell ", "칸 A 에서 칸 B 까지 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "A to cell B moving up/down/left/right", "상하좌우로 이동하며 경로 놓기")}</b>
                  {t(E, " between non-blocked cells. Cost = sum of populations along the path.",
                        " (막혀있지 않은 칸 사이). 비용 = 지나는 칸들의 인구 합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MINIMUM total displaced population", "옮긴 인구 총합의 최솟값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 (mcc19rect2 4-박스 표준)
       2026-09-17: 형식 카드가 없어서, 학생이 코드의 input() 을 보고서야
       "몇 줄에 뭐가 들어오나" 를 역추론하고 있었다. */
    {
      type: "reveal",
      narr: t(E,
        "N, then N rows of the grid, then A and B.",
        "N 한 줄, 격자 N 줄, 그다음 A 와 B 의 자리가 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#1e3a8a", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— side of the grid", "— 격자 한 변의 길이")}</span></div>
              <div><span style={{ color: "#1e3a8a", fontWeight: 800 }}>N × N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— N lines, N populations each (−1 = blocked)", "— N 줄, 줄마다 인구 N 개 (−1 은 막힌 칸)")}</span></div>
              <div><span style={{ color: "#1e3a8a", fontWeight: 800 }}>ax ay bx by</span> <span style={{ color: C.dim, fontSize: 11 }}>{/* 2026-09-17 (잣대 ⑥): '행·열' 을 뜻풀이 없이 썼다. 코드 쪽에서 또 나오는 말이라 여기서 한 번 푼다. */}
{t(E, "— row/col of A, then of B (row from the top, col from the left, counted from 1)", "— A 의 행·열, B 의 행·열 (행 = 위에서 몇 번째, 열 = 왼쪽에서 몇 번째. 1 부터 셈)")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the smallest total population a path from A to B can displace.",
                    "한 줄에 A 에서 B 까지 옮기게 되는 인구의 최솟값을 적어요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#1e3a8a", whiteSpace: "pre" }}>
{`3
1 9 1
1 9 1
1 1 1
1 1 1 3`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`7`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic", whiteSpace: "pre-line" }}>
              {t(E, "A is the top-left cell, B the top-right. Why is the answer 7? — lay the path yourself on the next page.",
                    "A 는 왼쪽 위, B 는 오른쪽 위 칸이에요.\n왜 답이 7 일까? — 다음 쪽에서 직접 길을 놓아 봐요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {/* 2026-09-17: 원문 N 상한을 못 찾았다. 지어내지 않고 이 방법이 감당하는 크기를 적는다. */}
              {t(E, "Each cell holds a population of 0 or more, or −1 for blocked. We could not find the original limit on N. What we can say: this method looks at each cell only a few times, so a 1000 × 1000 grid (a million cells) is within reach.",
                    "칸마다 인구는 0 이상이고, −1 은 막힌 칸이에요.\n원문에서 N 이 얼마까지인지는 확인하지 못했어요.\n대신 이 방법이 감당하는 크기를 적어요 — 칸 하나를 몇 번씩만 보기 때문에\n1000 × 1000 격자(칸 100 만 개)까지도 감당할 수 있어요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Audit sim — build a path on the grid, then see whether it can be beaten
    {
      type: "auditSim",
      narr: t(E,
        "Lay your own track from A to B and watch the cost add up.",
        "A 에서 B 까지 철도를 직접 놓아 봐요."),
    },
    // 1-4: Quiz
    {
      type: "quiz",
      /* 2026-09-17: narr 이 question 을 그대로 다시 말했다. narr 은 "지금 뭘 볼 차례" 만. */
      narr: t(E,
        "Now answer it yourself.",
        "이번엔 직접 답해 볼 차례예요."),
      /* 2026-09-17: 질문 뒤 괄호가 "(상/하/좌/우)" 라서 **문제가 답을 그대로 말하고**
         있었다. 보기가 '4방향' 하나뿐인 셈이라 아무것도 안 묻는 퀴즈였다. */
      question: t(E,
        "How many directions can tracks be laid on the grid?",
        "격자에서 철도를 놓을 수 있는 방향은 몇 개일까요?"),
      options: [
        t(E, "4 directions", "4방향"),
        t(E, "8 directions (including diagonals)", "8방향 (대각선 포함)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Only 4-directional movement (up, down, left, right) is allowed on the grid.",
        "맞아요! 격자에서는 4방향(상, 하, 좌, 우)으로만 움직일 수 있어요."),
    },
    /* 1-5: Input
       2026-09-17: 여기 입력칸이 바로 위 퀴즈와 **똑같은 질문**("몇 방향?", 답 4)이었다.
       방금 정답과 이유까지 들은 걸 한 쪽 넘겨서 또 답하는, 새 정보가 0 인 쪽이었다.
       대신 아직 아무도 말해주지 않은 것을 묻는다 — **출발 칸도 비용에 들어간다**. */
    {
      type: "input",
      narr: t(E,
        "Add up the cost of going straight across.",
        "곧장 가로지르는 길의 비용을 직접 더해 봐요."),
      question: t(E,
        "Three cells in a row hold populations 1, 9 and 1. You start on the left cell and lay track straight to the right cell. Cost?",
        "칸 세 개가 나란히 있고, 사는 사람이 차례로 1 명 · 9 명 · 1 명이에요.\n맨 왼쪽 칸에서 출발해 맨 오른쪽 칸까지 곧장 가면 비용은 얼마일까요?"),
      hint: t(E,
        "Add the population of every cell the track sits on — the starting cell counts too.",
        "철도가 놓이는 칸의 인구를 모두 더해요. 출발 칸도 함께 세요."),
      answer: 11,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrainsCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Four steps: read the grid, make a cost table, take the cheapest, spread.",
        "싼 칸부터 넓혀 가는 코드를 네 걸음으로 나눠 읽어요."),
      sections: getTrainsSections(E),
    },
  ];
}
