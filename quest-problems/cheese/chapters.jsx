import { C, t } from "@/components/quest/theme";
import { highlight } from "@/components/quest/shared";
import { getCheeseSections } from "./components";

/* ================================================================
   HELPERS
   ================================================================ */

export function bruteCount(N, carved) {
  const isCarved = new Set(carved.map(([x,y,z]) => `${x},${y},${z}`));
  let count = 0;
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++) {
      let allGone = true;
      for (let z = 0; z < N; z++) if (!isCarved.has(`${x},${y},${z}`)) { allGone = false; break; }
      if (allGone) count++;
    }
  for (let y = 0; y < N; y++)
    for (let z = 0; z < N; z++) {
      let allGone = true;
      for (let x = 0; x < N; x++) if (!isCarved.has(`${x},${y},${z}`)) { allGone = false; break; }
      if (allGone) count++;
    }
  for (let x = 0; x < N; x++)
    for (let z = 0; z < N; z++) {
      let allGone = true;
      for (let y = 0; y < N; y++) if (!isCarved.has(`${x},${y},${z}`)) { allGone = false; break; }
      if (allGone) count++;
    }
  return count;
}

/* ================================================================
   CODE BLOCKS
   ================================================================ */
export const CH_BRUTE = [
  "for _ in range(Q):",
  "    x, y, z = map(int, input().split())",
  "    cheese[x][y][z] = False",
  "    count = 0",
  "    for a in range(N):        # z-방향: N² 직선",
  "        for b in range(N):",
  "            if all(not cheese[a][b][c] for c in range(N)):",
  "                count += 1",
  "    for b in range(N):        # x-방향: N² 직선",
  "        for c in range(N):",
  "            if all(not cheese[a][b][c] for a in range(N)):",
  "                count += 1",
  "    for a in range(N):        # y-방향: N² 직선",
  "        for c in range(N):",
  "            if all(not cheese[a][b][c] for b in range(N)):",
  "                count += 1",
  "    print(count)",
];

export const USER_CODE_ORIG = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "n, q = map(int, input().split())",
  "",
  "xy_dict = defaultdict(int)",
  "yz_dict = defaultdict(int)",
  "xz_dict = defaultdict(int)",
  "",
  "count = 0",
  "for _ in range(q):",
  "  x, y, z = map(int, input().split())",
  "",
  "  xy_dict[(x,y)] += 1",
  "  yz_dict[(y,z)] += 1",
  "  xz_dict[(x,z)] += 1",
  "",
  "  if xy_dict[(x,y)] == n:",
  "    count += 1",
  "    xy_dict[(x,y)] += 1  # ← 불필요한 방어코드",
  "  if yz_dict[(y,z)] == n:",
  "    count += 1",
  "    yz_dict[(y,z)] += 1  # ← 불필요한 방어코드",
  "  if xz_dict[(x,z)] == n:",
  "    count += 1",
  "    xz_dict[(x,z)] += 1  # ← 불필요한 방어코드",
  "  print(count)",
];

export const USER_CODE_CLEAN = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
  "",
  "xy = defaultdict(int)  # z-방향: (x,y) 쌍",
  "yz = defaultdict(int)  # x-방향: (y,z) 쌍",
  "xz = defaultdict(int)  # y-방향: (x,z) 쌍",
  "",
  "count = 0",
  "for _ in range(Q):",
  "  x, y, z = map(int, input().split())",
  "  for d, key in [(xy,(x,y)), (yz,(y,z)), (xz,(x,z))]:",
  "    d[key] += 1",
  "    if d[key] == N:",
  "      count += 1",
  "  print(count)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   
   목표: 아이가 "치즈에서 블록 빼고, 막대 넣는 게임"을 이해
   변경: 어려운 용어 없이 비유로 시작
   ═══════════════════════════════════════════════════════════════ */
export function makeCheeseCh1(E) {
  return [
    // 1-1: 호기심 먼저! (타이틀/USACO 메타는 breadcrumb 와 중복이라 제거)
    {
      type: "reveal",
      narr: t(E,
        "Here's a cube made of cheese cubes, like a Rubik's cube! What happens if you keep removing blocks one by one? Let's find out! 👀",
        "치즈 조각으로 만든 큐브가 있어! 루빅큐브처럼! 여기서 블록을 계속 빼면 무슨 일이 생길까? 알아보자! 👀"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 12, padding: 14, fontSize: 14, color: C.text, lineHeight: 1.9, textAlign: "center" }}>
            {t(E,
              "N×N×N cheese cube → remove blocks → check: can a 1×1×N rod fit through? 📏",
              "N×N×N 치즈 큐브 → 블록을 빼 → 막대가 통과할 수 있을까? 📏")}
          </div>
        </div>),
    },
    // 1-2: 막대 도입 + 관찰 (직접 보고 추론)
    {
      type: "reveal",
      narr: t(E,
        "We try to slide a 1×1×N rod through one row. Look at these 4 cases — which one does the rod fit?",
        "1×1×N 막대를 한 줄로 밀어 넣으려고 해. 4 가지 경우를 봐 — 어느 줄에 들어갈까?"),
      content: (
        <div style={{ padding: 16 }}>
          {/* 막대 정의 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14, fontSize: 13, color: C.text }}>
            <span>{t(E, "Rod (N=3):", "막대 (N=3):")}</span>
            <div style={{ display: "inline-block", width: 96, height: 14, background: "linear-gradient(180deg, #94a3b8, #64748b)", borderRadius: 3, border: "1px solid #475569" }} />
          </div>

          {/* 4 케이스 — 학생이 관찰 */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 8, textAlign: "center", letterSpacing: 0.3 }}>
              {t(E, "👀 OBSERVE — which row lets the rod through?", "👀 관찰 — 어느 줄에 막대가 들어갈까?")}
            </div>
            {[
              { cells: ["cheese", "cheese", "cheese"], works: false, lbl: t(E, "all 3 cheese blocks", "치즈 3 개 다 있음") },
              { cells: ["empty",  "cheese", "cheese"], works: false, lbl: t(E, "1 empty, 2 cheese",   "1 칸 비어 있음") },
              { cells: ["empty",  "empty",  "cheese"], works: false, lbl: t(E, "2 empty, 1 cheese",   "2 칸 비어 있음") },
              { cells: ["empty",  "empty",  "empty" ], works: true,  lbl: t(E, "all 3 empty",         "3 칸 모두 비어 있음") },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 6px",
                borderBottom: i < 3 ? `1px solid #f1f5f9` : "none",
                background: row.works ? "#ecfdf5" : "transparent",
                borderRadius: 6,
              }}>
                {/* row of cells */}
                <div style={{ display: "flex", gap: 2 }}>
                  {row.cells.map((c, j) => (
                    <div key={j} style={{
                      width: 28, height: 28, borderRadius: 4,
                      background: c === "cheese" ? "#fde047" : "#fff",
                      border: `2px solid ${c === "cheese" ? "#ca8a04" : "#cbd5e1"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14,
                    }}>
                      {c === "cheese" ? "🧀" : ""}
                    </div>
                  ))}
                </div>
                {/* rod attempt — visually positioned */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 30, height: 8,
                    background: row.works ? "linear-gradient(180deg, #6ee7b7, #10b981)" : "linear-gradient(180deg, #94a3b8, #64748b)",
                    borderRadius: 2,
                  }} />
                  <span style={{ fontSize: 16, fontWeight: 900, color: row.works ? "#10b981" : "#dc2626" }}>
                    {row.works ? "✓" : "✗"}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: C.dim, flex: 1 }}>{row.lbl}</span>
              </div>
            ))}
          </div>

          {/* 추론 유도 */}
          <div style={{ padding: "10px 12px", background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, fontSize: 13, color: "#92400e", lineHeight: 1.7, textAlign: "center", fontWeight: 700 }}>
            🤔 {t(E,
              "Notice the pattern? Only the LAST one works. Next page: how many cells must be empty?",
              "패턴 보였지? 마지막 줄만 들어가. 다음 페이지: 몇 칸이 비어야 할까?")}
          </div>
        </div>),
    },
    // 1-3: 막대 조건 퀴즈 — 직관적
    {
      type: "quiz",
      narr: t(E,
        "So the rod needs a clear tunnel. How many cells must be empty for it to fit?",
        "막대가 들어가려면 터널이 뚫려야 해. 몇 칸이 비어야 할까?"),
      question: t(E,
        "For the rod to fit through, how many cells on the row must be empty?",
        "막대가 통과하려면, 그 줄에서 몇 칸이 비어야 해?"),
      options: [
        t(E, "Just 1 cell", "1칸만"),
        t(E, "More than half", "절반 이상"),
        t(E, "ALL N cells — the whole row!", "N칸 전부 — 줄 전체!"),
      ], correct: 2,
      explain: t(E,
        "Right! Every single cell on that row must be empty. One block = blocked! 🚫",
        "맞아! 그 줄의 칸이 전부 비어야 해. 1개라도 남으면 막혀! 🚫"),
    },
    // 1-4: 3방향 — 쉬운 설명
    {
      type: "reveal",
      narr: t(E,
        "The rod can go in 3 directions — think of it like poking through the cube from 3 sides!",
        "막대는 3방향으로 꽂을 수 있어 — 큐브를 3면에서 찌르는 거라고 생각해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            {[
              ["→", "#ef4444", t(E, "Left→Right", "왼→오")],
              ["→", "#22c55e", t(E, "Front→Back", "앞→뒤")],
              ["↑", "#3b82f6", t(E, "Bottom→Top", "아래→위")],
            ].map(([arrow, col, label], i) => (
              <div key={i} style={{ background: `${col}15`, border: `2px solid ${col}40`, borderRadius: 12, padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: col }}>{arrow}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: col, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: C.dim, fontWeight: 600 }}>
            {t(E, "3 directions = 3 ways to poke!", "3방향 = 3가지로 찌를 수 있어!")}
          </div>
        </div>),
    },
    // 1-5: 직선 개수 — 직관적 질문
    {
      type: "quiz",
      narr: t(E,
        "In a 2×2×2 cube: each direction has rows. Left→Right has 2×2=4 rows. Same for other 2 directions.",
        "2×2×2 큐브에서: 각 방향에 줄이 있어. 왼→오는 2×2=4줄. 나머지 2방향도 마찬가지."),
      question: t(E,
        "2×2×2 cube: 4 rows per direction × 3 directions = ?",
        "2×2×2 큐브: 방향당 4줄 × 3방향 = 총 몇 줄?"),
      options: ["4", "8", "12", "24"], correct: 2,
      explain: t(E,
        "12 rows total! That's every possible place a 1×1×N rod could fit.",
        "총 12줄! 막대가 들어갈 수 있는 모든 자리야."),
    },

    // 1-6: 입출력 형식 + 제약 (USACO 원문 충실)
    {
      type: "reveal",
      narr: t(E,
        "Now the actual problem format: read N (cube size) and Q (number of carve operations), then Q lines of (x, y, z). After EACH carve, output the count.",
        "실제 문제 형식: N (큐브 크기) 와 Q (제거 횟수) 를 읽고, Q 줄에 (x, y, z) 들어옴. 매 제거 후 답 한 줄씩 출력."),
      content: (
        <div style={{ padding: 16 }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line)", "(첫 줄)")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>x y z</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "× Q lines", "× Q 줄")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "After EACH carve: print the count of rows where a 1×1×N rod fits.",
                  "각 제거 후: 막대가 들어가는 줄의 개수 출력 (한 줄씩 Q 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>2 ≤ N ≤ 1000</div>
              <div>1 ≤ Q ≤ 200,000 (= 2 × 10⁵)</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>0 ≤ x, y, z &lt; N</div>
            </div>
          </div>
        </div>),
    },

    // 1-7: Sample I/O 미리보기 — 다음 탭(시뮬) 에서 같은 케이스 직접 돌릴 거란 다리
    {
      type: "reveal",
      narr: t(E,
        "Here's the sample input/output we'll trace by hand in the Sim tab:",
        "다음 시뮬 탭에서 직접 돌려볼 샘플 입출력:"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {/* Input */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
                <div><span style={{ color: "#fbbf24" }}>2</span> <span style={{ color: "#fbbf24" }}>5</span> <span style={{ color: "#94a3b8", fontSize: 10 }}> {t(E, "// N=2, Q=5", "// N=2, Q=5")}</span></div>
                <div>0 0 0</div>
                <div>1 1 1</div>
                <div>0 1 0</div>
                <div>1 0 0</div>
                <div>1 1 0</div>
              </div>
            </div>
            {/* Output */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
                <div>0</div>
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div style={{ color: "#34d399", fontWeight: 900 }}>5 ←!</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, fontSize: 12, color: "#92400e", lineHeight: 1.7, fontWeight: 600 }}>
            🤔 {t(E,
              "Notice the JUMP: 0 → 0 → 1 → 2 → 5. Why does the last carve add +3 at once? That's the magic we'll uncover. Hit 'Sim' next!",
              "주목: 0 → 0 → 1 → 2 → 5. 왜 마지막 제거가 한꺼번에 +3 추가? 그게 우리가 풀 마법이야. '시뮬' 탭으로!")}
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🧀 시뮬레이션 (3 steps)
   
   핵심 변경: 시뮬 → 놀라움 → 궁금증
   아이가 직접 버튼을 누르면서 "어? +3이 왜 한꺼번에?" 경험
   퀴즈는 놀란 뒤에 던짐
   ═══════════════════════════════════════════════════════════════ */
export function makeCheeseCh2(E) {
  return [
    // 2-1: 시뮬레이터 — 설명 최소화, 직접 해보게
    {
      type: "cheeseSim2",
      narr: t(E,
        "Try it yourself! Press 🧀 Carve to remove blocks one by one. Watch the number change. Something surprising will happen! 👀",
        "직접 해봐! 🧀 제거 버튼을 눌러서 블록을 하나씩 빼봐. 숫자가 어떻게 바뀌는지 봐. 뭔가 놀라운 일이 생길 거야! 👀"),
    },
    // 2-2: 놀라움 포착 → 질문
    {
      type: "quiz",
      narr: t(E,
        "Did you notice? The answer was 0, 0, 1, 2... then suddenly jumped to 5! Three rods fit at once! Why?",
        "봤지? 답이 0, 0, 1, 2... 였다가 갑자기 5로 뛰었어! 막대 3개가 한꺼번에 들어갔어! 왜 그런 걸까?"),
      question: t(E,
        "Why did 3 rods suddenly fit at the same time?",
        "왜 갑자기 막대 3개가 동시에 들어간 거야?"),
      options: [
        t(E, "That last block was blocking 3 different rows at once!", "그 마지막 블록이 3개의 다른 줄을 동시에 막고 있었으니까!"),
        t(E, "The cube got smaller", "큐브가 작아져서"),
        t(E, "Just luck", "우연이야"),
      ], correct: 0,
      explain: t(E,
        "Yes! One block can sit on 3 rows (one per direction). When it's the LAST block on all 3 rows → boom, all 3 open up! 🤯",
        "맞아! 블록 하나가 3개 줄 위에 있어 (방향마다 1개). 그 블록이 3줄 모두의 마지막 블록이면 → 3개가 한꺼번에 뚫려! 🤯"),
    },
    // 2-3: 반대 관찰 — 처음에 왜 안 늘었나
    {
      type: "quiz",
      narr: t(E,
        "But the first block (0,0,0) didn't change anything — the answer stayed at 0. Why?",
        "그런데 첫 번째 블록 (0,0,0)은 아무 변화가 없었어 — 답이 0 그대로였지. 왜?"),
      question: t(E,
        "Why didn't removing the first block open up any rows?",
        "첫 블록을 빼도 왜 아무 줄도 안 뚫렸을까?"),
      options: [
        t(E, "The 3 rows it's on still have other blocks left!", "그 블록이 있던 3개 줄에 아직 다른 블록이 남아있어서!"),
        t(E, "First removal never counts", "첫 번째는 원래 안 세"),
        t(E, "Corner blocks don't matter", "모서리 블록은 상관없어서"),
      ], correct: 0,
      explain: t(E,
        "Exactly! Removing one block from a row of 2 still leaves 1 — not empty yet! You need ALL blocks gone.",
        "맞아! 2칸짜리 줄에서 1개 빼도 1개 남아 — 아직 안 비었어! 전부 빠져야 해."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 💡 패턴 발견 (10 steps)
   
   핵심 변경: "아이가 불편함을 느끼고 → 스스로 방법을 발견"
   
   흐름:
   1. 시뮬 결과 다시 보기 (데이터 정리)
   2. "이거 3×3×3이면 27줄인데, 매번 다 세야 해?" → 불편함
   3. "블록 1개 빼면 영향받는 줄이 몇 개?" → 3개! (발견)
   4. "그럼 3개만 추적하면 되겠네!" → 카운터 개념 도달
   5. 직접 손으로 카운터 추적 (체험)
   ═══════════════════════════════════════════════════════════════ */
export function makeCheeseCh3(E) {
  return [
    // 3-1: 시뮬 결과 정리 — 데이터로 보여주기
    {
      type: "reveal",
      narr: t(E,
        "Let's look at what happened in the simulation more carefully:",
        "시뮬에서 일어난 일을 자세히 정리해보자:"),
      content: (
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
          {[
            ["(0,0,0)", "0 → 0", "+0", "😐", t(E, "Nothing opened", "변화 없음")],
            ["(1,1,1)", "0 → 0", "+0", "😐", t(E, "Still nothing", "여전히 없음")],
            ["(0,1,0)", "0 → 1", "+1", "👀", t(E, "1 row opened!", "1줄 뚫림!")],
            ["(1,0,0)", "1 → 2", "+1", "👀", t(E, "Another row!", "또 1줄!")],
            ["(1,1,0)", "2 → 5", "+3", "🤯", t(E, "3 at once!!", "3개 한꺼번에!!")],
          ].map(([coord, change, delta, emoji, desc], i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", marginBottom: 3,
              background: delta === "+0" ? "#f8f9fc" : delta === "+3" ? C.carryBg : C.okBg,
              borderRadius: 8, border: `1.5px solid ${delta === "+0" ? C.border : delta === "+3" ? C.carryBd : C.okBd}`,
            }}>
              <span style={{ fontWeight: 700, color: C.text, minWidth: 58 }}>{coord}</span>
              <span style={{ color: C.dim, minWidth: 44 }}>{change}</span>
              <span style={{ fontWeight: 800, minWidth: 24, color: delta === "+3" ? C.carry : delta === "+0" ? C.dim : C.ok }}>{delta}</span>
              <span>{emoji}</span>
              <span style={{ fontSize: 11, color: C.dim }}>{desc}</span>
            </div>))}
        </div>),
    },

    // 3-2: 검증 모드 진입 — 브루트 챕터에서 발견한 카운터, 정말 맞나?
    {
      type: "reveal",
      narr: t(E,
        "From the Brute tab you discovered: ① only 3 rows change per carve, ② row state = one number (carved count). Now let's verify by hand that this counter trick is exactly correct.",
        "브루트 탭에서 발견한 것: ① carve 마다 3 줄만 변함, ② 줄 상태 = 숫자 1 개 (빠진 개수). 이제 손으로 검증 — 카운터 트릭이 정확한지."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#92400e", marginBottom: 10, textAlign: "center" }}>
              📏 {t(E, "Counter rule", "카운터 규칙")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
              {[0, 1, 2].map(v => (
                <div key={v} style={{
                  width: 48, height: 48, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 900,
                  background: v === 2 ? C.okBg : "#f8f9fc",
                  border: `2px solid ${v === 2 ? C.okBd : C.border}`,
                  color: v === 2 ? C.ok : C.text,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.dim, textAlign: "center" }}>
              {t(E, "N=2: counter hits 2 → row is clear → +1 to total!", "N=2: 카운터가 2 도달 → 줄 빔 → 총합 +1!")}
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 8, padding: 10, fontSize: 12, color: "#065f46", lineHeight: 1.7, textAlign: "center", fontWeight: 700 }}>
            {t(E,
              "Next: walk through 5 carves on N=2 by hand, watching counters reach N.",
              "다음: N=2 에서 5 번 carve 를 손으로 따라가며 카운터가 N 도달하는 걸 봐요.")}
          </div>
        </div>),
    },

    // 3-6: 손으로 해보기 — (0,0,0) 제거
    {
      type: "input",
      narr: t(E,
        "Let's try it by hand! N=2. We remove (0,0,0). Its 3 counters each go from 0 to 1. But we need 2 to open a row. How many rows opened?",
        "직접 손으로 해보자! N=2. (0,0,0)을 빼. 3개 카운터가 각각 0→1. 근데 줄이 뚫리려면 2가 필요해. 뚫린 줄은 몇 개?"),
      question: t(E,
        "(0,0,0) removed. All 3 counters = 1. Need 2 to open. Rows opened?",
        "(0,0,0) 제거. 카운터 3개 전부 1. 2가 되어야 뚫림. 뚫린 줄?"),
      hint: t(E, "1 is less than 2, so none opened!", "1은 2보다 작으니까 아직 안 뚫렸어!"),
      answer: 0,
    },

    // 3-7: 중간 과정 — narration으로 간략히
    {
      type: "reveal",
      narr: t(E,
        "After 3 removals, some counters hit 2! For example, (0,0,0) and (0,1,0) share the y-row (x=0,z=0) — that counter reached 2, so 1 row opened!",
        "3번 제거 후, 어떤 카운터는 2에 도달했어! 예를 들어 (0,0,0)과 (0,1,0)은 y-줄(x=0,z=0)을 공유해 — 그 카운터가 2가 돼서 1줄 뚫렸어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: C.dim }}>{t(E, "Removals so far:", "지금까지 제거:")} (0,0,0), (1,1,1), (0,1,0)</div>
            <div style={{ marginTop: 8, background: C.okBg, border: `1.5px solid ${C.okBd}`, borderRadius: 8, padding: "6px 12px", fontWeight: 700, color: C.ok }}>
              {t(E, "y-row (0,_,0): counter = 2 = N → opened! 📏", "y-줄 (0,_,0): 카운터 = 2 = N → 뚫렸어! 📏")}
            </div>
            <div style={{ marginTop: 4, color: C.dim, fontSize: 11 }}>
              {t(E, "Total open rows: 1 (after 3rd removal) → 2 (after 4th)", "뚫린 줄: 1개(3번째 후) → 2개(4번째 후)")}
            </div>
          </div>
        </div>),
    },

    // 3-8: 마지막 제거 — 3개 동시!
    {
      type: "input",
      narr: t(E,
        "Last one! Remove (1,1,0). This block sits on 3 rows, and all 3 counters hit 2 at the same time! Previous answer was 2. Now?",
        "마지막! (1,1,0) 제거. 이 블록이 있는 3줄의 카운터가 동시에 2에 도달! 이전 답이 2였어. 이제는?"),
      question: t(E,
        "Previous: 2 rows open. Now +3 more. Total: 2 + 3 = ?",
        "이전: 2줄 뚫림. 이제 +3개 추가. 합계: 2 + 3 = ?"),
      answer: 5,
    },

    // 3-9: 알고리즘 정리 — 쉬운 말로
    {
      type: "reveal",
      narr: t(E,
        "That's the whole trick! Instead of checking millions of rows, just update 3 counters each time!",
        "이게 전부야! 수백만 줄을 확인하는 대신, 매번 카운터 3개만 업데이트!"),
      content: (
        <div style={{ background: C.card, borderRadius: 14, padding: 16, border: "2px solid #d97706", boxShadow: "0 4px 16px rgba(217,119,6,.1)" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "The Counter Trick 🎯", "카운터 트릭 🎯")}
          </div>
          <div style={{ fontSize: 13, lineHeight: 2.2, color: C.text }}>
            <div>① {t(E, "Each row has a counter, starting at 0", "각 줄마다 카운터, 0에서 시작")}</div>
            <div>② {t(E, "Remove block → 3 counters go up by 1", "블록 제거 → 카운터 3개가 +1")}</div>
            <div>③ {t(E, "Counter = N → row is clear → rod fits! 📏", "카운터 = N → 줄이 빔 → 막대 들어감! 📏")}</div>
          </div>
          <div style={{ marginTop: 10, padding: "8px 12px", background: C.okBg, borderRadius: 8, fontWeight: 800, color: C.ok, textAlign: "center", fontSize: 13 }}>
            {t(E, "3 operations per removal — lightning fast! ⚡", "제거마다 연산 3번 — 번개처럼 빨라! ⚡")}
          </div>
        </div>),
    },

    // 3-10: 복잡도 — 체감 비교
    {
      type: "quiz",
      narr: t(E,
        "With the counter trick, each removal only needs 3 operations. For 200,000 removals, how fast is it?",
        "카운터 트릭으로 매번 3번만 하면 돼. 20만 번 제거하면 얼마나 빠를까?"),
      question: t(E,
        "Counter trick: 3 ops per removal. Total for Q removals?",
        "카운터 트릭: 제거당 3번. Q번이면 총?"),
      options: ["O(Q)", "O(QN)", "O(QN²)", "O(QN³)"], correct: 0,
      explain: t(E,
        "O(Q)! Just 200,000 × 3 = 600,000 operations. Done in milliseconds! 🚀",
        "O(Q)! 20만 × 3 = 60만 번이면 끝. 밀리초만에 완료! 🚀"),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 4: 🐍 브루트포스 (4 steps)
   
   핵심 변경: "직접 돌려보고 느린 걸 체감"
   설명 먼저가 아니라 → 실행 먼저 → "이거 왜 이렇게 느려?" 느끼게
   ═══════════════════════════════════════════════════════════════ */
export function makeCheeseCh4(E) {
  return [
    // 4-1: 먼저 직접 돌려보게!
    {
      type: "cheeseRunner",
      narr: t(E,
        "The simplest idea: after each removal, check EVERY row. Try N=3, then N=10, then N=20. Feel the difference! 👀",
        "가장 단순한 방법: 블록 뺄 때마다 모든 줄을 확인하는 거야. N=3, 그다음 N=10, N=20 해봐. 차이를 느껴봐! 👀"),
    },

    // 4-2: 느린 이유 — 체감한 후에 설명
    {
      type: "quiz",
      narr: t(E,
        "Did you feel it getting slower? N=3 was instant, N=20 took a while. Why does it slow down so much?",
        "느려지는 거 느꼈지? N=3은 순식간인데, N=20은 좀 걸렸어. 왜 이렇게 느려지는 걸까?"),
      question: t(E,
        "Why does the brute method get so slow as N grows?",
        "N이 커지면 왜 이렇게 느려져?"),
      options: [
        t(E, "Checking N² rows × N cells each = N³ work per removal!", "N²줄 × N칸씩 = 제거당 N³ 연산!"),
        t(E, "The computer is tired", "컴퓨터가 지쳐서"),
        t(E, "It's the same speed, just feels slow", "속도는 같은데 느낌만"),
      ], correct: 0,
      explain: t(E,
        "N³ per removal! N=20: 8,000 ops. N=1000: 1,000,000,000 ops! That's 125,000× slower!",
        "제거당 N³! N=20: 8,000번. N=1000: 10억 번! 12만 5천 배 느려!"),
    },

    // 4-3: 구체적 숫자 체감
    // 4-3: USACO 제출 결과 시각화 (추상 숫자 대신 그림으로 체감)
    {
      type: "reveal",
      narr: t(E,
        "Submit this brute solution to USACO: first few cases pass slowly, rest all time out:",
        "이 브루트 코드를 USACO 에 제출하면: 앞 몇 개는 간신히 통과, 나머지는 다 시간초과:"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 8, textAlign: "center" }}>
            {t(E, "USACO submission — judge results", "USACO 제출 결과 — 채점")}
          </div>
          <div style={{
            background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14,
            display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
          }}>
            {[
              { n: 1,  pass: true,  label: "12ms" },
              { n: 2,  pass: true,  label: "98ms" },
              { n: 3,  pass: true,  label: "1.2s" },
              { n: 4,  pass: false }, { n: 5,  pass: false }, { n: 6,  pass: false },
              { n: 7,  pass: false }, { n: 8,  pass: false }, { n: 9,  pass: false },
              { n: 10, pass: false }, { n: 11, pass: false }, { n: 12, pass: false },
            ].map(c => (
              <div key={c.n} style={{
                width: 56, padding: "8px 4px", borderRadius: 8, textAlign: "center",
                background: c.pass ? C.okBg : C.noBg,
                border: `1.5px solid ${c.pass ? C.okBd : C.noBd}`,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: c.pass ? C.ok : C.no, lineHeight: 1 }}>
                  {c.pass ? "✓" : "t"}
                </div>
                {c.label && (
                  <div style={{ fontSize: 9, color: C.dim, marginTop: 4 }}>{c.label}</div>
                )}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>#{c.n}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: "10px 12px", background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 10, fontSize: 13, color: C.no, fontWeight: 700, lineHeight: 1.7 }}>
            ❌ {t(E,
              "9 out of 12 cases TLE. Even passing ones at 1.2s are near the limit.",
              "12 개 중 9 개 TLE. 통과한 것들도 1.2초로 한계 근처.")}
          </div>
          <div style={{ marginTop: 8, padding: "8px 12px", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "N=1000, Q=200K: per query = 3M rows × 1000 cells = 3B ops. At 100M ops/sec → 30s/query × 200K = ~70 days. 😱",
              "N=1000, Q=20만: 쿼리당 = 300만 줄 × 1000칸 = 30억 연산. 1억 ops/sec → 쿼리당 30초 × 20만 = ~70 일. 😱")}
          </div>
        </div>),
    },

    // 4-3a: 🔑 1차 개선 사고 디딤돌 — 학생이 자기 머리로 발견
    {
      type: "quiz",
      narr: t(E,
        "Wait — every carve, we re-check ALL 3N² rows. But only ONE block changed. Did all rows really change?",
        "잠깐 — 매번 carve 마다 모든 3N² 줄을 다시 검사해. 근데 변한 건 블록 1 개뿐이야. 정말 모든 줄이 바뀌었을까?"),
      question: t(E,
        "When you carve 1 block, how many rows could possibly change their state?",
        "블록 1 개를 빼면, 상태가 바뀔 수 있는 줄은 최대 몇 개?"),
      hint: t(E,
        "Picture the block — it sits on rows going in 3 directions (left↔right, front↔back, up↔down).",
        "그 블록 머릿속에 그려봐 — 왼↔오, 앞↔뒤, 위↔아래 3 방향 줄 위에 있어."),
      options: [
        t(E, "All 3N² rows might change", "전체 3N² 줄 다 바뀔 수 있음"),
        t(E, "N rows (one per axis)", "N 줄 (축마다 1)"),
        t(E, "Just 3 rows — one per direction!", "딱 3 줄 — 방향마다 1!"),
        t(E, "Just 1 row", "1 줄만"),
      ], correct: 2,
      explain: t(E,
        "EXACTLY 3 rows. So we're wasting time re-checking 3N² − 3 rows that didn't change. Big idea: only check those 3.",
        "정확히 3 줄. 그러면 안 변한 3N² − 3 줄을 다시 검사하는 게 시간 낭비. 핵심 아이디어: 그 3 줄만 검사."),
    },

    // 4-3b: 두 번째 디딤돌 — "이전 답을 어떻게 기억?"
    {
      type: "quiz",
      narr: t(E,
        "Great — only check the 3 affected rows. But to know if a row is empty, we still need its current state. How do we remember each row's state without re-scanning?",
        "좋아 — 영향받는 3 줄만 검사. 근데 줄이 비었는지 알려면 그 줄의 현재 상태가 필요해. 매번 다시 스캔하지 않고 줄별 상태를 어떻게 기억?"),
      question: t(E,
        "What's the smallest piece of info per row that tells us 'is this row empty yet?'",
        "줄마다 '이 줄 다 비었나?' 를 알려주는 가장 작은 정보는?"),
      hint: t(E,
        "We don't need to remember WHICH cells are empty — just HOW MANY have been carved.",
        "어떤 칸이 비었는지 기억할 필요 X — 몇 개 빠졌는지만 세면 됨."),
      options: [
        t(E, "List of every carved cell", "빠진 칸 좌표 전부"),
        t(E, "True/False for each cell (N items)", "각 칸의 True/False (N 개)"),
        t(E, "Just one number: count of carved cells in that row", "한 숫자: 그 줄에서 빠진 칸 개수"),
        t(E, "The first empty position", "처음 비는 위치"),
      ], correct: 2,
      explain: t(E,
        "Just ONE number per row! When count = N, the whole row is empty. Increment 3 counters per carve, check if any hit N. That's it.",
        "줄마다 숫자 1 개! count = N 이면 전체 빔. carve 마다 카운터 3 개 +1, N 도달 체크. 그게 다야."),
    },

    // 4-3c: 디딤돌 마무리 — "그게 카운터 트릭!"
    {
      type: "reveal",
      narr: t(E,
        "You just designed the algorithm yourself! Two insights chained: (1) only 3 rows change per carve, (2) one number per row is enough.",
        "방금 알고리즘을 직접 설계한 거야! 두 통찰의 연결: (1) 한 번에 3 줄만 변함, (2) 줄마다 숫자 1 개면 충분."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)", border: "2px solid #f59e0b", borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10, textAlign: "center" }}>
              🔑 {t(E, "Your idea, step by step", "내가 떠올린 아이디어, 단계별로")}
            </div>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: "#78350f" }}>
              <div>① {t(E, "Brute checks 3N² rows per carve → too slow", "브루트는 carve 당 3N² 줄 검사 → 너무 느려")}</div>
              <div>② {t(E, "BUT only 3 rows actually change per carve", "근데 carve 마다 진짜 변하는 건 3 줄")}</div>
              <div>③ {t(E, "So: track each row's state separately, only update 3", "그래서: 줄별 상태를 따로 추적, 3 개만 업데이트")}</div>
              <div>④ {t(E, "Row state = ONE number (carved count). Done.", "줄 상태 = 숫자 1 개 (빠진 개수). 끝.")}</div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: 12, fontSize: 13, color: "#065f46", lineHeight: 1.7, textAlign: "center", fontWeight: 700 }}>
            ✨ {t(E,
              "This is the 'counter trick'. Next tab: see why it's exactly correct, then write the code.",
              "이게 '카운터 트릭'. 다음 탭: 왜 정확히 맞는지 보고, 코드 작성.")}
          </div>
        </div>),
    },

    // 4-4: 비교 — 한눈에
    {
      type: "reveal",
      narr: t(E,
        "30 seconds PER removal × 200,000 removals = 70 DAYS! \ud83d\ude31 This is way too slow. There must be a smarter way... let's find it in the next tab!",
        "제거 1개에 30초 × 20만 개 = 70일! \ud83d\ude31 \uc774건 \ub108\ubb34 \ub290\ub824... \ub354 \ub611\ub611\ud55c \ubc29\ubc95\uc774 \uc788\uc744 \uac70\uc57c! \ub2e4\uc74c \ud0ed\uc5d0\uc11c \ucc3e\uc544\ubcf4\uc790!"),
      content: (
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, textAlign: "center", padding: 8 }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <div style={{ flex: 1, background: C.noBg, borderRadius: 12, padding: "14px 8px", border: `2px solid ${C.noBd}` }}>
              <div style={{ fontSize: 11, color: C.no, fontWeight: 700 }}>🐌 {t(E, "Brute", "브루트")}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.no, marginTop: 4 }}>O(QN³)</div>
              <div style={{ fontSize: 11, color: C.no, marginTop: 6 }}>≈ 70 {t(E, "days", "일")} 😱</div>
            </div>
            <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 12, padding: "14px 8px", border: "2px dashed #86efac" }}>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>⚡ {t(E, "Better way?", "더 좋은 방법?")}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#16a34a", marginTop: 4 }}>???</div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 6 }}>{t(E, "Next tab! \u2192", "\ub2e4\uc74c \ud0ed\uc5d0\uc11c! \u2192")}</div>
            </div>
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 5: ⚡ 코드 (8 steps)
   
   변경: 용어를 쉬운 말로 먼저 설명한 뒤 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeCheeseCh5(E, lang = "py") {
  return [
    // 5-1: 자료구조 — 쉬운 비유
    {
      type: "reveal",
      narr: t(E,
        "We need to store counters for each row. Think of it like a notebook — for each row, write down how many blocks are gone.",
        "각 줄의 카운터를 저장해야 해. 공책이라고 생각해 — 각 줄마다 '빠진 블록 수'를 적어두는 거야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              {t(E, "3 notebooks — one per direction:", "공책 3권 — 방향마다 1권:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 2 }}>
              <div>📗 xy: <span style={{ color: C.dim }}>{t(E, "which (x,y) pair → z-direction row", "(x,y) 쌍 → z-방향 줄")}</span></div>
              <div>📘 yz: <span style={{ color: C.dim }}>{t(E, "which (y,z) pair → x-direction row", "(y,z) 쌍 → x-방향 줄")}</span></div>
              <div>📙 xz: <span style={{ color: C.dim }}>{t(E, "which (x,z) pair → y-direction row", "(x,z) 쌍 → y-방향 줄")}</span></div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
              {t(E, "Python has a perfect tool: defaultdict(int) — auto-starts at 0!", "Python에 딱 맞는 도구: defaultdict(int) — 자동으로 0 시작!")}
            </div>
          </div>
        </div>),
    },

    // 5-2: defaultdict 예시
    {
      type: "reveal",
      narr: t(E,
        "defaultdict(int) works like magic — if you ask for a key that doesn't exist, it gives you 0!",
        "defaultdict(int)는 마법 같아 — 없는 키를 물어보면 자동으로 0을 줘!"),
      content: (() => {
        const lines = [
          "from collections import defaultdict",
          "",
          "xy = defaultdict(int)",
          "# xy[(3,5)] → 자동으로 0!",
          "xy[(3,5)] += 1",
          "# xy[(3,5)] → 이제 1!",
        ];
        return (
          <div style={{ padding: 12 }}>
            <div style={{ background: "#1e1b2e", borderRadius: 10, padding: "12px 10px", overflowX: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
              {lines.map((l, i) => (
                <div key={i} style={{ display: "flex", minHeight: 20 }}>
                  <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 8, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
                  <span style={{ whiteSpace: "pre" }}>{highlight(l)}</span>
                </div>
              ))}
            </div>
          </div>);
      })(),
    },

    // 5-3: 핵심 조건 퀴즈
    {
      type: "quiz",
      narr: t(E,
        "The counter goes up by 1 each removal. When does the rod fit?",
        "카운터가 제거마다 1씩 올라가. 막대가 들어가는 때는?"),
      question: t(E,
        "Rod fits when counter reaches…?",
        "카운터가 몇이 되면 막대가 들어가?"),
      options: ["0", "N/2", "N", "N²"], correct: 2,
      explain: t(E,
        "N! All blocks removed from that row → completely empty → rod fits!",
        "N! 그 줄의 블록이 전부 빠짐 → 완전히 빔 → 막대 들어감!"),
    },

    // 5-4: 코드 읽기 퀴즈 — 변수 이름의 의미
    {
      type: "quiz",
      narr: t(E,
        "Quick check before code: xy[(x,y)] tracks removals for one specific row. Which direction?",
        "코드 보기 전 짧은 확인: xy[(x,y)]는 특정 줄의 제거 수를 세. 어떤 방향?"),
      question: t(E,
        "xy[(x,y)] counts removals on which row?",
        "xy[(x,y)]는 어떤 방향의 줄?"),
      hint: t(E, "If x and y are fixed, which axis is the row along?", "x와 y가 고정이면 줄이 뻗는 축은?"),
      options: [
        t(E, "z-direction (x,y fixed → z varies)", "z-방향 (x,y 고정 → z가 변함)"),
        t(E, "x-direction", "x-방향"),
        t(E, "y-direction", "y-방향"),
      ], correct: 0,
      explain: t(E,
        "xy pair → z-direction row! The pair tells you which 2 axes are fixed.",
        "xy 쌍 → z-방향 줄! 쌍이 어떤 2축이 고정인지 알려줘."),
    },

    // 5-5: 인터랙티브 코드 위젯 (4 부분 + Python/C++ 토글 + PDF)
    {
      type: "progressive",
      narr: t(E,
        "Pick a part to see code + reasoning. Toggle Python ↔ C++. Save as PDF for later.",
        "버튼 눌러서 부분별 코드 + 이유 확인. Python ↔ C++ 토글. PDF 저장 가능."),
      sections: getCheeseSections(E),
    },

    // 5-6: 샘플 입력 변수 trace — 시뮬에서 본 것과 코드 변수 연결
    {
      type: "reveal",
      narr: t(E,
        "Trace: how the code's xy/yz/xz variables change as the sample input runs through. Match this to the Sim tab!",
        "trace: 샘플 입력이 들어오면 코드의 xy/yz/xz 변수가 어떻게 바뀌는지. 시뮬 탭에서 본 거랑 같아!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Sample: N=2, Q=5", "샘플: N=2, Q=5")}
          </div>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", fontSize: 11 }}>
            <div style={{ display: "grid", gridTemplateColumns: "30px 70px 1fr 50px 60px", padding: "6px 8px", background: "#fef3c7", borderBottom: `1.5px solid ${C.border}`, fontWeight: 800, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
              <span>i</span>
              <span>(x,y,z)</span>
              <span>{t(E, "key updates", "키 업데이트")}</span>
              <span style={{ textAlign: "right" }}>{t(E, "+count", "+count")}</span>
              <span style={{ textAlign: "right" }}>{t(E, "print", "print")}</span>
            </div>
            {[
              { i: 1, c: "(0,0,0)", upd: "xy[(0,0)]=1, yz[(0,0)]=1, xz[(0,0)]=1", hits: 0, total: 0, note: t(E, "all <2", "다 <2") },
              { i: 2, c: "(1,1,1)", upd: "xy[(1,1)]=1, yz[(1,1)]=1, xz[(1,1)]=1", hits: 0, total: 0, note: t(E, "all <2", "다 <2") },
              { i: 3, c: "(0,1,0)", upd: "xy[(0,1)]=1, yz[(1,0)]=1, xz[(0,0)]=2 ✓", hits: 1, total: 1, note: t(E, "xz hit N!", "xz 가 N!") },
              { i: 4, c: "(1,0,0)", upd: "xy[(1,0)]=1, yz[(0,0)]=2 ✓, xz[(1,0)]=1", hits: 1, total: 2, note: t(E, "yz hit N!", "yz 가 N!") },
              { i: 5, c: "(1,1,0)", upd: "xy[(1,1)]=2 ✓, yz[(1,0)]=2 ✓, xz[(1,0)]=2 ✓", hits: 3, total: 5, note: t(E, "all 3 hit N! 🤯", "셋 다 N! 🤯") },
            ].map((r, idx) => (
              <div key={idx} style={{
                display: "grid", gridTemplateColumns: "30px 70px 1fr 50px 60px",
                padding: "7px 8px",
                borderBottom: idx < 4 ? "1px solid #f1f5f9" : "none",
                background: r.hits >= 3 ? "#fef3c7" : (r.hits > 0 ? "#ecfdf5" : "#fff"),
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11, alignItems: "center",
              }}>
                <span style={{ fontWeight: 800, color: C.dim }}>{r.i}</span>
                <span style={{ fontWeight: 700, color: C.text }}>{r.c}</span>
                <span style={{ fontSize: 10, color: C.text }}>{r.upd}</span>
                <span style={{ textAlign: "right", fontWeight: 800, color: r.hits > 0 ? "#10b981" : C.dim }}>+{r.hits}</span>
                <span style={{ textAlign: "right", fontWeight: 900, color: C.accent, fontSize: 13 }}>{r.total}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 8, fontSize: 11, color: "#9a3412", lineHeight: 1.7 }}>
            👀 {t(E,
              "Last row: ONE block (1,1,0) made 3 different counters reach N at the same time → +3 in one go. That's the 'jump' you saw in the sim.",
              "마지막 줄: 블록 1 개 (1,1,0) 가 3 개의 카운터를 동시에 N 으로 → 한 번에 +3. 시뮬에서 본 '점프' 가 이거.")}
          </div>
          <div style={{ marginTop: 6, padding: "8px 10px", background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 8, fontSize: 11, color: "#065f46", lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace" }}>
            ✓ {t(E, "Output column matches sample output: 0, 0, 1, 2, 5", "출력 칼럼이 샘플 출력과 일치: 0, 0, 1, 2, 5")}
          </div>
        </div>),
    },

    // 5-8: 최종 정리
    {
      type: "reveal",
      narr: t(E,
        "That's it! The whole insight: don't re-check everything — just track what changes. 3 counters per removal = done! 🎉",
        "이게 전부야! 핵심: 전부 다시 확인하지 마 — 바뀌는 것만 추적해. 제거당 카운터 3개 = 끝! 🎉"),
      content: (
        <div style={{ textAlign: "center", padding: 8 }}>
          <div style={{ background: "linear-gradient(135deg,#92400e,#d97706)", borderRadius: 14, padding: "20px 16px" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.6 }}>
              {t(E, "Don't re-check everything —", "전부 확인하지 마 —")}
              <br/>
              {t(E, "only track what changes!", "바뀌는 것만 추적해!")}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 8 }}>
              🐌 O(QN³) → ⚡ O(Q)
            </div>
          </div>
        </div>),
    },
  ];
}
