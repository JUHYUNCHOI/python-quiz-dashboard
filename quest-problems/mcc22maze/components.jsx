import { useState, Fragment } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";
const KA = { wordBreak: "keep-all" };

/* ════════════════════════════════════════════════════════════
   Mcc22MazeConnectSim — the CONNECTIVITY sim for the real problem.
   Pick a small grid, then clear whole rows / columns of walls and
   watch whether (top-left) reaches (bottom-right). Shows the op
   count and the 0 / 1 / 2 answer live.
   Bilingual via E prop. Theme: red (#dc2626).
   ════════════════════════════════════════════════════════════ */
const PRESETS = [
  {
    en: "already open · 0", ko: "이미 이어짐 · 0",
    grid: ["...", "##.", "..."],
  },
  {
    en: "one clear · 1", ko: "한 번이면 · 1",
    grid: [".#.", ".#.", ".#."],
  },
  {
    en: "needs two · 2", ko: "두 번 필요 · 2",
    grid: [".###", "####", "####", "###."],
  },
];

// flood-fill the component of open cells that contains (0,0)
function startComponent(n, isOpen) {
  const seen = Array.from({ length: n }, () => Array(n).fill(false));
  if (!isOpen(0, 0)) return seen;
  const stack = [[0, 0]];
  seen[0][0] = true;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] && isOpen(nr, nc)) {
        seen[nr][nc] = true;
        stack.push([nr, nc]);
      }
    }
  }
  return seen;
}

export function Mcc22MazeConnectSim({ E }) {
  const [pi, setPi] = useState(1); // start on the "needs 1" case
  const [rows, setRows] = useState(() => new Set());
  const [cols, setCols] = useState(() => new Set());

  const grid = PRESETS[pi].grid;
  const n = grid.length;

  const isOpen = (r, c) => grid[r][c] === "." || rows.has(r) || cols.has(c);
  const comp = startComponent(n, isOpen);
  const connected = comp[n - 1][n - 1];
  const ops = rows.size + cols.size;

  const loadPreset = (idx) => { setPi(idx); setRows(new Set()); setCols(new Set()); };
  const toggle = (set, setter, k) => {
    const nx = new Set(set);
    if (nx.has(k)) nx.delete(k); else nx.add(k);
    setter(nx);
  };
  const reset = () => { setRows(new Set()); setCols(new Set()); };

  const cellSize = 40;
  const rowBtnW = 44;

  const colBtn = (c) => {
    const on = cols.has(c);
    return (
      <button key={`c${c}`} onClick={() => toggle(cols, setCols, c)} style={{
        height: 26, borderRadius: 6, cursor: "pointer",
        fontSize: 11, fontWeight: 800, fontFamily: "monospace",
        border: `1.5px solid ${on ? A : "#cbd5e1"}`,
        background: on ? A : "#fff", color: on ? "#fff" : "#64748b",
      }}>{c}</button>
    );
  };
  const rowBtn = (r) => {
    const on = rows.has(r);
    return (
      <button onClick={() => toggle(rows, setRows, r)} style={{
        width: rowBtnW, height: cellSize, borderRadius: 6, cursor: "pointer",
        fontSize: 11, fontWeight: 800, fontFamily: "monospace",
        border: `1.5px solid ${on ? A : "#cbd5e1"}`,
        background: on ? A : "#fff", color: on ? "#fff" : "#64748b",
      }}>{r}</button>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center", ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
          🧨 {t(E, "Clear a Row or Column", "행/열 부수기 놀이터")}
        </div>
        <div style={{ fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.55 }}>
          {t(E,
            "One operation = pick a whole row or column and smash every wall in it. Try to link the top-left (S) to the bottom-right (G) with the FEWEST operations.",
            "조작 1번 = 한 행 또는 한 열을 골라 그 안의 벽을 전부 부숴요. 좌상단 (S) 과 우하단 (G) 을 최소 조작으로 이어봐요.")}
        </div>
      </div>

      {/* preset switcher */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => loadPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, cursor: "pointer",
            fontSize: 11.5, fontWeight: 700, ...KA,
            border: `1.5px solid ${i === pi ? A : "#e5e7eb"}`,
            background: i === pi ? "#fee2e2" : "#fff", color: i === pi ? "#7f1d1d" : "#64748b",
          }}>{t(E, p.en, p.ko)}</button>
        ))}
      </div>

      {/* grid with row/col clear buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `${rowBtnW}px repeat(${n}, ${cellSize}px)`,
          gap: 4,
        }}>
          {/* top-left corner spacer */}
          <div />
          {/* column-clear buttons */}
          {Array.from({ length: n }, (_, c) => colBtn(c))}
          {/* rows */}
          {grid.map((row, r) => (
            <Fragment key={r}>
              {rowBtn(r)}
              {row.split("").map((ch, c) => {
                const open = isOpen(r, c);
                const inComp = comp[r][c];
                const isStart = r === 0 && c === 0;
                const isGoal = r === n - 1 && c === n - 1;
                let bg = "#475569";               // wall
                if (open) bg = inComp ? "#fca5a5" : "#e2e8f0"; // reachable vs open-but-cut-off
                if (isGoal && inComp) bg = "#86efac";
                const border = isStart ? "2px solid #15803d"
                  : isGoal ? `2px solid ${A}` : "1px solid #334155";
                return (
                  <div key={c} style={{
                    width: cellSize, height: cellSize, background: bg, border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, borderRadius: 5, fontFamily: "monospace",
                    color: open ? "#0f172a" : "#cbd5e1",
                  }}>
                    {isStart ? "S" : isGoal ? "G" : open ? "" : "#"}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10, ...KA }}>
        {t(E, "Tap a number to clear that row / column. Tap again to undo.",
             "숫자를 누르면 그 행/열을 부숴요. 다시 누르면 취소.")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <button onClick={reset} style={{
          background: "#fff", color: "#475569", border: "1.5px solid #cbd5e1", borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음")}</button>
      </div>

      {/* verdict */}
      <div style={{
        background: connected ? "#f0fdf4" : "#fef2f2",
        border: `1.5px solid ${connected ? "#86efac" : "#fca5a5"}`,
        borderRadius: 10, padding: "10px 14px", textAlign: "center", ...KA,
      }}>
        <div style={{ fontSize: 13, color: C.text }}>
          {t(E, "operations used: ", "사용한 조작: ")}
          <b style={{ color: A, fontSize: 15 }}>{ops}</b>
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, fontWeight: 800, color: connected ? "#15803d" : "#b91c1c" }}>
          {connected
            ? t(E, `✅ S reaches G — done in ${ops} operation${ops === 1 ? "" : "s"}!`,
                   `✅ S 가 G 에 닿았어요 — 조작 ${ops}번!`)
            : t(E, "❌ S can't reach G yet — clear another row or column.",
                   "❌ 아직 S 가 G 에 못 닿아요 — 행이나 열을 더 부숴요.")}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
        {t(E,
          "You never need more than 2: clearing the TOP row and the LAST column always links the two corners. So the answer is only ever 0, 1, or 2.",
          "2번을 넘길 일은 없어요: 맨 윗 행과 맨 오른쪽 열을 부수면 두 모서리는 언제나 이어져요. 그래서 정답은 늘 0, 1, 2 중 하나예요.")}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE — split into teachable sections (DSU connectivity)
   ================================================================ */
const S1_PY = [
  "import sys",
  "",
  "class DSU:                       # 유니온-파인드 (되돌리기 지원)",
  "    def __init__(self, n):",
  "        self.p = list(range(n))  # 각 칸의 대표",
  "        self.sz = [1]*n          # 묶음 크기",
  "        self.history = []        # 합친 기록 (되돌리기용)",
  "    def find(self, x):",
  "        while self.p[x] != x: x = self.p[x]",
  "        return x",
  "    def union(self, a, b):",
  "        ra, rb = self.find(a), self.find(b)",
  "        if ra == rb: self.history.append(None); return",
  "        if self.sz[ra] < self.sz[rb]: ra, rb = rb, ra",
  "        self.p[rb] = ra; self.sz[ra] += self.sz[rb]",
  "        self.history.append((rb, ra))",
  "    def snapshot(self): return len(self.history)",
  "    def rollback_to(self, mark):",
  "        while len(self.history) > mark:",
  "            op = self.history.pop()",
  "            if op is None: continue",
  "            rb, ra = op",
  "            self.sz[ra] -= self.sz[rb]; self.p[rb] = rb",
];

const S2_PY = [
  "def solve_case(n, grid):",
  "    if n == 1: return 0",
  "    def cid(r, c): return r*n + c      # 칸 (r,c) 에 번호 붙이기",
  "    dsu = DSU(n*n)",
  "",
  "    # 원래 통로끼리 인접하면 같은 묶음으로",
  "    for r in range(n):",
  "        for c in range(n):",
  "            if grid[r][c] != '.': continue",
  "            for dr, dc in ((0,1),(1,0)):",
  "                nr, nc = r+dr, c+dc",
  "                if 0<=nr<n and 0<=nc<n and grid[nr][nc]=='.':",
  "                    dsu.union(cid(r,c), cid(nr,nc))",
  "",
  "    S, G = cid(0,0), cid(n-1,n-1)",
  "    if dsu.find(S) == dsu.find(G): return 0   # 이미 이어짐",
];

const S3_PY = [
  "    # 각 '행'을 하나씩 시험 삼아 부숴보기",
  "    for i in range(n):",
  "        mark = dsu.snapshot()",
  "        for c in range(n-1): dsu.union(cid(i,c), cid(i,c+1))   # 그 행을 통로로",
  "        for c in range(n):                                     # 위·아래 통로와 연결",
  "            if i>0   and grid[i-1][c]=='.': dsu.union(cid(i,c), cid(i-1,c))",
  "            if i<n-1 and grid[i+1][c]=='.': dsu.union(cid(i,c), cid(i+1,c))",
  "        ok = dsu.find(S) == dsu.find(G)",
  "        dsu.rollback_to(mark)                                  # 원상복구",
  "        if ok: return 1",
  "",
  "    # 각 '열'도 똑같이 시험",
  "    for j in range(n):",
  "        mark = dsu.snapshot()",
  "        for r in range(n-1): dsu.union(cid(r,j), cid(r+1,j))",
  "        for r in range(n):",
  "            if j>0   and grid[r][j-1]=='.': dsu.union(cid(r,j), cid(r,j-1))",
  "            if j<n-1 and grid[r][j+1]=='.': dsu.union(cid(r,j), cid(r,j+1))",
  "        ok = dsu.find(S) == dsu.find(G)",
  "        dsu.rollback_to(mark)",
  "        if ok: return 1",
  "",
  "    return 2                                                   # 하나로는 안 되면 2",
];

const S4_PY = [
  "def main():",
  "    data = sys.stdin.buffer.read().split()   # 테스트가 많아 한 번에 읽기",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        grid = [data[idx+i].decode() for i in range(n)]",
  "        idx += n",
  "        out.append(str(solve_case(n, grid)))",
  "    sys.stdout.write(\"\\n\".join(out) + \"\\n\")",
  "",
  "main()",
];

const S1_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "struct DSU {                       // union-find with rollback",
  "    vector<int> p, sz;",
  "    vector<pair<int,int>> hist;    // (rb, ra); (-1,-1) = no-op",
  "    DSU(int n): p(n), sz(n, 1) { for (int i=0;i<n;i++) p[i]=i; }",
  "    int find(int x){ while (p[x]!=x) x=p[x]; return x; }",
  "    void unite(int a, int b){",
  "        int ra=find(a), rb=find(b);",
  "        if (ra==rb){ hist.push_back({-1,-1}); return; }",
  "        if (sz[ra]<sz[rb]) swap(ra, rb);",
  "        p[rb]=ra; sz[ra]+=sz[rb]; hist.push_back({rb, ra});",
  "    }",
  "    int snapshot(){ return (int)hist.size(); }",
  "    void rollback_to(int mark){",
  "        while ((int)hist.size() > mark){",
  "            auto [rb, ra] = hist.back(); hist.pop_back();",
  "            if (rb < 0) continue;",
  "            sz[ra] -= sz[rb]; p[rb] = rb;",
  "        }",
  "    }",
  "};",
];

const S2_CPP = [
  "int solve_case(int n, vector<string>& g){",
  "    if (n == 1) return 0;",
  "    auto cid = [&](int r, int c){ return r*n + c; };",
  "    DSU dsu(n*n);",
  "    for (int r=0;r<n;r++)",
  "        for (int c=0;c<n;c++){",
  "            if (g[r][c] != '.') continue;",
  "            if (c+1<n && g[r][c+1]=='.') dsu.unite(cid(r,c), cid(r,c+1));",
  "            if (r+1<n && g[r+1][c]=='.') dsu.unite(cid(r,c), cid(r+1,c));",
  "        }",
  "    int S = cid(0,0), G = cid(n-1,n-1);",
  "    if (dsu.find(S) == dsu.find(G)) return 0;",
];

const S3_CPP = [
  "    for (int i=0;i<n;i++){                 // try clearing each row",
  "        int mark = dsu.snapshot();",
  "        for (int c=0;c+1<n;c++) dsu.unite(cid(i,c), cid(i,c+1));",
  "        for (int c=0;c<n;c++){",
  "            if (i>0   && g[i-1][c]=='.') dsu.unite(cid(i,c), cid(i-1,c));",
  "            if (i+1<n && g[i+1][c]=='.') dsu.unite(cid(i,c), cid(i+1,c));",
  "        }",
  "        bool ok = dsu.find(S) == dsu.find(G);",
  "        dsu.rollback_to(mark);",
  "        if (ok) return 1;",
  "    }",
  "    for (int j=0;j<n;j++){                 // try clearing each column",
  "        int mark = dsu.snapshot();",
  "        for (int r=0;r+1<n;r++) dsu.unite(cid(r,j), cid(r+1,j));",
  "        for (int r=0;r<n;r++){",
  "            if (j>0   && g[r][j-1]=='.') dsu.unite(cid(r,j), cid(r,j-1));",
  "            if (j+1<n && g[r][j+1]=='.') dsu.unite(cid(r,j), cid(r,j+1));",
  "        }",
  "        bool ok = dsu.find(S) == dsu.find(G);",
  "        dsu.rollback_to(mark);",
  "        if (ok) return 1;",
  "    }",
  "    return 2;",
  "}",
];

const S4_CPP = [
  "int main(){",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--){",
  "        int n; cin >> n;",
  "        vector<string> g(n);",
  "        for (int i=0;i<n;i++) cin >> g[i];",
  "        cout << solve_case(n, g) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc22MazeSections(E) {
  return [
    {
      label: t(E, "① Union-Find (with rollback)", "① 유니온-파인드 (되돌리기)"),
      color: A,
      py: S1_PY, cpp: S1_CPP,
      why: [
        t(E, "The problem asks 'can the two corners be connected?' — that's a CONNECTIVITY question, not a shortest-path one. Union-Find joins cells into groups; two corners in the same group means 'linked'.",
            "이 문제는 '두 모서리가 이어지나?' 를 물어요 — 최단 거리가 아니라 '연결' 문제예요. 유니온-파인드는 칸들을 묶음으로 합쳐요; 두 모서리가 같은 묶음이면 '이어짐'."),
        t(E, "We keep a history of every merge, so after test-clearing one row we can rollback_to and undo it — instead of rebuilding the whole structure for every row and column.",
            "합칠 때마다 기록을 남겨서, 한 행을 시험 삼아 부순 뒤 rollback_to 로 되돌릴 수 있어요 — 행·열마다 처음부터 다시 만들 필요가 없어요."),
      ],
    },
    {
      label: t(E, "② Grid → groups · already linked? (0)", "② 격자를 묶음으로 · 이미 이어졌나? (0)"),
      color: A,
      py: S2_PY, cpp: S2_CPP,
      why: [
        t(E, "Give each cell a number cid(r,c), then union every pair of neighbouring open cells. That captures the maze's current connectivity.",
            "각 칸에 번호 cid(r,c) 를 붙이고, 인접한 두 통로를 union 해요. 이러면 지금 미로의 연결 상태가 담겨요."),
        t(E, "If S (top-left) and G (bottom-right) are already the same group with nothing cleared, the answer is 0.",
            "아무것도 안 부쉈는데 S(왼위)와 G(오른아래)가 이미 같은 묶음이면 답은 0."),
      ],
    },
    {
      label: t(E, "③ Try one row / one column (1), else 2", "③ 행 하나 / 열 하나 시험 (1), 아니면 2"),
      color: A,
      py: S3_PY, cpp: S3_CPP,
      why: [
        t(E, "Clearing row i turns that whole row into a corridor: union its cells side-by-side, then union them with any open cell just above or below.",
            "행 i 를 부수면 그 행 전체가 통로가 돼요: 옆칸끼리 union 하고, 바로 위·아래의 통로와도 union 해요."),
        t(E, "Check S–G after each single row/column. rollback_to(mark) cleans it up before trying the next one, so every attempt starts fresh.",
            "행·열 하나마다 S–G 를 확인하고, rollback_to(mark) 로 깨끗이 되돌린 뒤 다음을 시험해요 — 매 시도가 새 출발이에요."),
        t(E, "If any single clear links them, the answer is 1. If none does, the answer is 2 — clearing the top row plus the last column always works, so it never exceeds 2.",
            "하나라도 이어지면 답 1. 아무것도 안 되면 답 2 — 맨 윗 행+맨 오른쪽 열이면 늘 되니까 2를 넘지 않아요."),
      ],
    },
    {
      label: t(E, "④ Read input · solve each test", "④ 입력 읽기 · 테스트마다 풀기"),
      color: A,
      py: S4_PY, cpp: S4_CPP,
      why: [
        t(E, "Up to 100000 tests, so read all input at once instead of calling input() over and over.",
            "테스트가 최대 10만 개라, input() 을 반복하지 않고 입력을 한 번에 읽어요."),
        t(E, "For each test, solve_case returns 0, 1, or 2; collect them and print at the end.",
            "각 테스트마다 solve_case 가 0/1/2 를 돌려줘요; 모아 두었다가 마지막에 출력."),
      ],
      pyOnly: [
        t(E, "data[idx+i].decode() turns each raw byte-row from stdin into a normal string.",
            "data[idx+i].decode() 로 stdin 의 바이트 줄을 보통 문자열로 바꿔요."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) speeds up cin for the large number of tests.",
            "ios::sync_with_stdio(false) 로 많은 테스트에서 cin 을 빠르게 해요."),
      ],
    },
  ];
}

export function Mcc22MazeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","class","self"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","swap"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadMcc22MazePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Maze — Full Study Guide", "Mcc22Maze — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
