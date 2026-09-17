import { C, t } from "@/components/quest/theme";
import { getMcc20KnightSections, KnightExactSim } from "./components";

const KA = { wordBreak: "keep-all" };

// Full solution (Python) — precompute min knight moves with one BFS,
// then answer each query with:  exactly K  <=>  K >= min and (K - min) even.
export const SOLUTION_CODE = [
  "from collections import deque",
  "",
  "MOVES = [(-2,-1),(-2,1),(-1,-2),(-1,2),",
  "         (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "M = 4",
  "LO, HI = -M, 2000 + M",
  "SIZE = HI - LO + 1",
  "best = []",
  "for _ in range(SIZE):         # 줄마다 [-1, -1, …] 하나씩",
  "    best.append([-1] * SIZE)",
  "best[0 - LO][0 - LO] = 0",
  "q = deque([(0, 0)])",
  "while q:",
  "    x, y = q.popleft()",
  "    for dx, dy in MOVES:",
  "        nx, ny = x + dx, y + dy",
  "        if LO <= nx <= HI and LO <= ny <= HI and best[nx - LO][ny - LO] == -1:",
  "            best[nx - LO][ny - LO] = best[x - LO][y - LO] + 1",
  "            q.append((nx, ny))",
  "",
  "T = int(input())",
  "out = []",
  "for _ in range(T):",
  "    K, X, Y, A, B = map(int, input().split())",
  "    dx, dy = abs(X - A), abs(Y - B)",
  "    need = best[dx - LO][dy - LO]",
  "    if K >= need and (K - need) % 2 == 0:",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

export function makeMcc20KnightCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A knight sits on an INFINITE chessboard (negative squares exist too) at (X, Y). It wants to be at (A, B) after EXACTLY K moves — not fewer, not more.\nFor each query, print YES if that's possible, otherwise NO.",
        "정확히 K번 움직여서 목표 칸에 닿을 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"♞"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>Knight</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Decide whether the knight can go from (X, Y) to (A, B) in exactly K moves.",
                "나이트가 (X, Y) 에서 (A, B) 로 정확히 K번에 갈 수 있는지 판단해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The board is ", "체스판은 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "infinite in every direction", "모든 방향으로 무한")}</b>
                  {t(E, " — coordinates can be negative.", " 이에요 — 좌표가 음수일 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each move is an ", "한 번의 이동은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "L-shape: 2 in one axis, 1 in the other (8 possible moves)", "L 자 — 한 축으로 2 칸, 다른 축으로 1 칸 (8 가지)")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Start at ", "시작 ")}<b style={{ color: "#2563eb" }}>(X, Y)</b>
                  {t(E, ", want to be at ", ", 도착 ")}<b style={{ color: "#2563eb" }}>(A, B)</b>
                  {t(E, " after ", " 를 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "exactly K moves", "정확히 K번")}</b>
                  {t(E, ".", " 움직인 뒤에 있고 싶어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>YES</b>{t(E, " or ", " 또는 ")}<b style={{ color: "#15803d" }}>NO</b>
                  {t(E, " for each of the T queries.", " 를 T 개의 질문마다 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. Each query is 5 numbers: K X Y A B. The knight in question 2 can't cross a huge distance in only 5 moves, so it's NO.",
        "질문 하나는 숫자 다섯 개로 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of queries", "질문 개수")}</div>
              <div>• {t(E, "then T lines, each: ", "그다음 T 줄, 각 줄: ")}<b style={{ fontFamily: "'JetBrains Mono',monospace" }}>K X Y A B</b></div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 400,  −1000 ≤ X, Y, A, B ≤ 1000,  1 ≤ K ≤ 100000.",
                    "크기는 1 ≤ T ≤ 400,  −1000 ≤ X, Y, A, B ≤ 1000,  1 ≤ K ≤ 100000 이에요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>3</div>
              <div>2 0 0 3 3</div>
              <div>5 -2 -2 100 100</div>
              <div>2 0 0 1 2</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>NO</div>
              <div style={{ fontWeight: 800 }}>NO</div>
            </div>
          </div>

          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            <div><b style={{ color: "#15803d" }}>{t(E, "Q1", "1번")}</b> {t(E, "(0,0)→(3,3) in 2: yes — e.g. (0,0)→(1,2)→(3,3). ", "(0,0)→(3,3) 를 2번: 가능 — 예: (0,0)→(1,2)→(3,3). ")}<b style={{ color: "#15803d" }}>YES</b></div>
            <div><b style={{ color: "#b91c1c" }}>{t(E, "Q2", "2번")}</b> {t(E, "(−2,−2)→(100,100): way too far for only 5 moves. ", "(−2,−2)→(100,100): 5번으론 너무 멀어요. ")}<b style={{ color: "#b91c1c" }}>NO</b></div>
            <div><b style={{ color: "#b91c1c" }}>{t(E, "Q3", "3번")}</b> {t(E, "(0,0)→(1,2) takes 1 move, yet 2 moves cannot do it. Why not? ", "(0,0)→(1,2) 는 1 번이면 가요. 그런데 2 번으로는 못 가요. 왜 그럴까요? ")}<b style={{ color: "#b91c1c" }}>NO</b></div>
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Play with it. Pick a target square to see its minimum moves, then nudge K. Green = reachable in exactly K.",
        "목표 칸을 고르고 K 를 바꿔 봐요. 초록이면 도착할 수 있어요."),
      content: (<KnightExactSim E={E} />),
    },

    // 1-4: understanding check — minimum
    {
      type: "quiz",
      narr: t(E,
        "Now count it yourself, on paper if you like.",
        "이번엔 직접 세어 봐요."),
      question: t(E,
        "Knight at (0,0). What is the MINIMUM number of moves to reach (1,2)?",
        "나이트 (0,0). (1,2) 에 도달하는 최소 이동 횟수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 0,
      explain: t(E,
        "(0,0) → (1,2) is exactly one knight move (1 in one axis, 2 in the other).",
        "(0,0) → (1,2) 는 정확히 나이트 이동 한 번 (한 축 1, 다른 축 2)."),
    },

    // 1-5: understanding check — the exactly-K twist (parity)
    {
      type: "quiz",
      narr: t(E,
        "This time it has to be EXACTLY K moves, not at least K.",
        "이번엔 K 번 이상이 아니라 정확히 K 번이어야 해요."),
      question: t(E,
        "A square needs a MINIMUM of 2 moves. In which K can the knight land there in EXACTLY K moves?",
        "어떤 칸이 최소 2번 필요해요. 정확히 K번에 도착 가능한 K 는?"),
      options: [
        t(E, "K = 4", "K = 4"),
        t(E, "K = 5", "K = 5"),
        t(E, "K = 3", "K = 3"),
      ],
      correct: 0,
      explain: t(E,
        "K = 4 works: two extra moves are spent by stepping out and coming right back. K = 3 or 5 leave one move over, and one move can never be undone. Why? Colour the board like a chessboard — an L-move covers 1 + 2 = 3 squares, an odd number, so every move flips the colour. Even move counts land on one colour, odd counts on the other, so the number of moves can only change by 2.",
        "K = 4 는 돼요. 남는 2 번은 한 칸 나갔다 바로 돌아오면서 쓰면 되니까요.\nK = 3, 5 는 1 번이 남는데, 1 번은 되돌릴 방법이 없어요.\n왜 그럴까요. 판을 체스판처럼 두 색으로 칠해 봐요.\nL자 이동은 1 칸 + 2 칸 = 3 칸, 홀수라서 움직일 때마다 색이 반드시 바뀌어요.\n그래서 짝수 번이면 출발한 색, 홀수 번이면 반대 색에 있어요.\n목표 칸의 색은 정해져 있으니 이동 횟수는 2 씩만 달라질 수 있어요."),
    },
  ];
}

export function makeMcc20KnightCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way explores every square the knight could be on after each of K moves — that region grows huge (up to ~K² squares), times 400 queries. The fast way finds the MINIMUM moves to each offset once with BFS, then each query is a tiny check: K ≥ min and (K − min) even.",
        "BFS 로 최소 이동만 구해 두면 질문은 금방 답해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: spread the knight out K moves, for every query", "느림: 질문마다 K 번씩 직접 펼쳐 보기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
                {t(E,
                  "The first idea is simple: for one query, mark every square reachable in 1 move, then in 2, and keep going K times, then look at (A,B). It is easy to write and it is correct. But K goes up to 100000, and after K moves the marked area has grown to about K² squares — far more than 10^9 for a single query. There are up to 400 queries, and we would start over from scratch for each one.",
                  "제일 먼저 떠오르는 방법은 간단해요.\n질문 하나를 잡고 1 번에 갈 수 있는 칸을 전부 표시하고,\n그다음 2 번에 갈 수 있는 칸을 표시하고, K 번까지 반복한 뒤\n목표 칸이 표시됐는지 보는 거예요. 짜기 쉽고 답도 맞아요.\n그런데 K 가 최대 100000 이에요.\nK 번 펼치면 표시한 칸이 K² 개쯤 되니까 질문 하나에 10^9 개가 넘어요.\n게다가 질문이 400 개인데 질문마다 처음부터 다시 펼쳐야 해요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: BFS once, then min + parity", "빠름: BFS 한 번, 그다음 최소 + 홀짝")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Reduce (X,Y)→(A,B) to the offset (dx,dy). One BFS from (0,0) fills every minimum. Each query: K ≥ min AND (K − min) even.",
                      "(X,Y)→(A,B) 를 차이 (dx,dy) 로 줄여요. (0,0) 에서 BFS 를 한 번 돌려 모든 최소를 채워요. 질문마다 K ≥ 최소 이고 (K − 최소) 가 짝수인지만 보면 돼요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },

    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc20KnightSections(E),
    },
  ];
}
