import { C, t } from "@/components/quest/theme";
import { getMcc22MazeSections, Mcc22MazeConnectSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (verified DSU connectivity — answer is 0 / 1 / 2)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "class DSU:",
  "    def __init__(self, n):",
  "        self.p = list(range(n)); self.sz = [1]*n; self.history = []",
  "    def find(self, x):",
  "        while self.p[x] != x: x = self.p[x]",
  "        return x",
  "    def union(self, a, b):",
  "        ra, rb = self.find(a), self.find(b)",
  "        if ra == rb: self.history.append(None); return",
  "        if self.sz[ra] < self.sz[rb]: ra, rb = rb, ra",
  "        self.p[rb] = ra; self.sz[ra] += self.sz[rb]; self.history.append((rb, ra))",
  "    def snapshot(self): return len(self.history)",
  "    def rollback_to(self, mark):",
  "        while len(self.history) > mark:",
  "            op = self.history.pop()",
  "            if op is None: continue",
  "            rb, ra = op; self.sz[ra] -= self.sz[rb]; self.p[rb] = rb",
  "",
  "def solve_case(n, grid):",
  "    if n == 1: return 0",
  "    def cid(r, c): return r*n + c",
  "    dsu = DSU(n*n)",
  "    for r in range(n):",
  "        for c in range(n):",
  "            if grid[r][c] != '.': continue",
  "            for dr, dc in ((0,1),(1,0)):",
  "                nr, nc = r+dr, c+dc",
  "                if 0<=nr<n and 0<=nc<n and grid[nr][nc]=='.': dsu.union(cid(r,c), cid(nr,nc))",
  "    S, G = cid(0,0), cid(n-1,n-1)",
  "    if dsu.find(S) == dsu.find(G): return 0",
  "    for i in range(n):",
  "        mark = dsu.snapshot()",
  "        for c in range(n-1): dsu.union(cid(i,c), cid(i,c+1))",
  "        for c in range(n):",
  "            if i>0 and grid[i-1][c]=='.': dsu.union(cid(i,c), cid(i-1,c))",
  "            if i<n-1 and grid[i+1][c]=='.': dsu.union(cid(i,c), cid(i+1,c))",
  "        ok = dsu.find(S) == dsu.find(G); dsu.rollback_to(mark)",
  "        if ok: return 1",
  "    for j in range(n):",
  "        mark = dsu.snapshot()",
  "        for r in range(n-1): dsu.union(cid(r,j), cid(r+1,j))",
  "        for r in range(n):",
  "            if j>0 and grid[r][j-1]=='.': dsu.union(cid(r,j), cid(r,j-1))",
  "            if j<n-1 and grid[r][j+1]=='.': dsu.union(cid(r,j), cid(r,j+1))",
  "        ok = dsu.find(S) == dsu.find(G); dsu.rollback_to(mark)",
  "        if ok: return 1",
  "    return 2",
  "",
  "def main():",
  "    data = sys.stdin.buffer.read().split()",
  "    idx = 0; T = int(data[idx]); idx += 1; out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        grid = [data[idx+i].decode() for i in range(n)]; idx += n",
  "        out.append(str(solve_case(n, grid)))",
  "    sys.stdout.write(\"\\n\".join(out)+\"\\n\")",
  "main()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem  (title → I/O + sample → concept sim → quiz)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "An n × n grid of open (.) and blocked (#) cells. You move between adjacent OPEN cells. One operation: pick a whole row or column and smash every wall in it.\nFind the MINIMUM operations so the bottom-right corner becomes reachable from the top-left.",
        "n × n 격자, 통로(.) 와 벽(#). 인접한 통로 칸 사이를 오가요. 조작 한 번: 한 행이나 열을 골라 그 안의 벽을 전부 부숴요.\n좌상단에서 우하단에 닿을 수 있게 만드는 최소 조작 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udff0"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Maze</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Make the two corners reachable using as FEW row/column clears as possible.",
                "행/열 부수기를 최대한 적게 써서 두 모서리가 이어지게 만들어요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "n × n grid", "n × n 격자")}</b>
                  {t(E, " of open cells (.) and walls (#). You may walk between ", " — 통로(.) 와 벽(#). ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent open cells", "인접한 통로 칸")}</b>
                  {t(E, " (up/down/left/right).", " 사이를 상하좌우로 오가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "One operation", "조작 한 번")}</b>
                  {t(E, ": pick a whole ", ": 한 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "row or column", "행 또는 열")}</b>
                  {t(E, " and turn every wall in it into an open cell. Repeat as many times as you like.",
                        " 을 골라 그 안의 벽을 전부 통로로 바꿔요. 원하는 만큼 반복할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 조작 횟수")}</b>
                  {t(E, " so the bottom-right corner (n, n) becomes reachable from the top-left corner (1, 1).",
                        " 를 출력해요. 우하단 (n, n) 이 좌상단 (1, 1) 에서 도달 가능해지도록.")}
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
        "Read the input format and the official example. Both corners are always open, and the answer is one small number per test.",
        "입력 형식과 공식 예제를 봐요. 두 모서리는 항상 통로이고, 답은 테스트마다 작은 수 하나예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 개수")}</div>
              <div>• {t(E, "per test: ", "테스트마다: ")}<b>n</b>{t(E, ", then ", ", 그다음 ")}<b>n</b>{t(E, " grid rows of . and #", " 줄의 격자 (. 와 #)")}</div>
              <div>• {t(E, "corners (1,1) and (n,n) are always open (.)", "모서리 (1,1) 과 (n,n) 은 항상 통로 (.)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: T ≤ 100000, n ≤ 1000, and the total of all n² ≤ 1000000.",
                   "제약: T ≤ 100000, n ≤ 1000, 모든 n² 의 합 ≤ 1000000.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>2</div>
              <div>4</div>
              <div>..##</div>
              <div>#.##</div>
              <div>#..#</div>
              <div>##..</div>
              <div>3</div>
              <div>.#.</div>
              <div>.#.</div>
              <div>.#.</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 80 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>0</div>
              <div style={{ fontWeight: 800 }}>1</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Test 1 is already connected corner to corner → 0. In test 2 the middle column is all walls, splitting left from right; clear that one column → 1.",
              "테스트 1 은 이미 모서리끼리 이어져 있어요 → 0. 테스트 2 는 가운데 열이 전부 벽이라 좌우가 나뉘어요; 그 열 하나만 부수면 → 1.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel it. Clear rows/columns and watch the reachable area (shaded) grow from S — try each preset and find the fewest operations.",
        "직접 느껴봐요. 행/열을 부수면 S 에서 닿는 영역(색칠)이 넓어져요 — 각 예시에서 최소 조작을 찾아봐요."),
      content: <Mcc22MazeConnectSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Clearing the top row plus the last column always builds an L-shaped corridor that touches both corners — so two operations always suffice.",
        "맨 윗 행 + 맨 오른쪽 열을 부수면 두 모서리에 모두 닿는 ㄱ자 통로가 생겨요 — 그래서 두 번이면 언제나 충분해요."),
      question: t(E,
        "Why can the answer NEVER be 3 or more?",
        "왜 정답이 절대 3 이상이 될 수 없을까요?"),
      options: [
        t(E, "Clearing the top row + the last column always links the two corners (2 ops).",
             "맨 윗 행 + 맨 오른쪽 열을 부수면 두 모서리가 항상 이어져요 (조작 2번)."),
        t(E, "The grid is always small enough to walk through.",
             "격자가 항상 걸어서 지날 만큼 작기 때문."),
        t(E, "There are at most 2 walls in any grid.",
             "격자에 벽이 최대 2개뿐이라서."),
      ],
      correct: 0,
      explain: t(E,
        "Right. That L-shaped corridor reaches (1,1) and (n,n), so 2 always works — the answer is only ever 0, 1, or 2.",
        "맞아요. 그 ㄱ자 통로가 (1,1) 과 (n,n) 에 닿으니 2번이면 늘 돼요 — 정답은 항상 0, 1, 2 중 하나예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code  (slow-vs-fast plan → progressive code)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every combination of row/column clears — that explodes. The fast way uses the fact that the answer is only 0, 1, or 2, and checks connectivity with Union-Find.",
        "느린 방법은 행/열 부수기의 모든 조합을 시도해요 — 폭발해요. 빠른 방법은 '정답은 0, 1, 2 뿐' 이라는 사실을 쓰고, 연결 여부는 유니온-파인드로 확인해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every subset of rows/columns", "느림: 행/열의 모든 조합 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "2^(2n) combinations, each re-searching the whole maze. Hopeless.",
                     "2^(2n) 가지 조합, 매번 미로 전체를 다시 탐색. 불가능해요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: the answer is only 0, 1, or 2", "빠름: 정답은 0, 1, 2 뿐")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E, "① already connected? → 0.  ② any single row or column clear connects? → 1.  ③ otherwise → 2.",
                     "① 이미 이어졌나? → 0.  ② 행 하나·열 하나로 이어지나? → 1.  ③ 아니면 → 2.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22MazeSections(E),
    },
  ];
}
