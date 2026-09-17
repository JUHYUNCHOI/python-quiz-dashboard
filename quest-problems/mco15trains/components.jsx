import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ═══════════════════════════════════════════════════════════════
   TrainsAuditSim — student builds a 4-connected train path on a
   tiny grid, sim audits validity + cost vs. optimal Dijkstra cost.
   Reveals WHY the minimum-sum path matters — many valid paths,
   only one (or a few) tie the minimum.
   ═══════════════════════════════════════════════════════════════ */
const _BLK = -1;
const _TRAIN_PRESETS = [
  // 3×3 introductory: small populations, optional detour
  {
    name: "3×3 easy",
    grid: [
      [1, 9, 1],
      [1, 9, 1],
      [1, 1, 1],
    ],
    a: [0, 0], b: [0, 2],
  },
  // 3×3 with a -1 wall forcing a detour
  {
    name: "3×3 wall",
    grid: [
      [2, _BLK, 5],
      [3,    1, 4],
      [9,    2, 1],
    ],
    a: [0, 0], b: [0, 2],
  },
  // 4×4 trickier: greedy fails, Dijkstra wins
  {
    name: "4×4 trap",
    grid: [
      [1, 1, 1, 1],
      [9, 9, 9, 1],
      [1, 1, 1, 1],
      [1, 9, 9, 9],
    ],
    a: [0, 0], b: [3, 0],
  },
];

// Dijkstra over the grid (cost = sum of populations on path, A inclusive).
function _dijkstraTrains(grid, a, b) {
  const N = grid.length, M = grid[0].length;
  const INF = Infinity;
  const dist = Array.from({ length: N }, () => Array(M).fill(INF));
  dist[a[0]][a[1]] = grid[a[0]][a[1]];
  // simple O(N²·M²) Dijkstra (small grids only) — no heap needed
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  while (true) {
    let bx = -1, by = -1, bd = INF;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) {
      if (!visited[i][j] && dist[i][j] < bd) { bd = dist[i][j]; bx = i; by = j; }
    }
    if (bx < 0) break;
    visited[bx][by] = true;
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    for (const [dx, dy] of dirs) {
      const nx = bx + dx, ny = by + dy;
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (grid[nx][ny] === _BLK) continue;
      const nd = bd + grid[nx][ny];
      if (nd < dist[nx][ny]) dist[nx][ny] = nd;
    }
  }
  return dist[b[0]][b[1]];
}

export function TrainsAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _TRAIN_PRESETS[pi];
  const { grid, a, b } = preset;
  const N = grid.length, M = grid[0].length;

  // path = ordered list of [r,c] starting at a
  const [path, setPath] = useState(() => [a]);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setPath([_TRAIN_PRESETS[newPi].a]);
  };

  // utilities
  const inPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);
  const head = path[path.length - 1];
  const isAt = (r, c, [tr, tc]) => r === tr && c === tc;
  const adj = (r, c) => Math.abs(r - head[0]) + Math.abs(c - head[1]) === 1;

  const onCellClick = (r, c) => {
    if (grid[r][c] === _BLK) return;
    // if clicking last cell of path, undo (backtrack)
    if (path.length > 1) {
      const [lr, lc] = path[path.length - 1];
      if (lr === r && lc === c) {
        setPath(path.slice(0, -1));
        return;
      }
    }
    // can't revisit cells in the path
    if (inPath(r, c)) return;
    // must be 4-adjacent to head
    if (!adj(r, c)) return;
    setPath([...path, [r, c]]);
  };

  const reset = () => setPath([a]);

  // audit: at B?
  const reachedB = isAt(head[0], head[1], b);
  const cost = path.reduce((s, [r, c]) => s + grid[r][c], 0);
  const optimal = _dijkstraTrains(grid, a, b);
  const isOptimal = reachedB && cost === optimal;

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_TRAIN_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8, lineHeight: 1.5 }}>
        {t(E,
          "Tap a cell adjacent to the path's head to extend. Tap the head to undo. -1 = blocked.",
          "경로 끝에 붙은 칸을 누르면 이어져요. 끝 칸을 다시 누르면 되돌아가요. -1 은 막힌 칸이에요.")}
      </div>

      {/* grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${M}, 44px)`, gap: 4 }}>
          {grid.map((row, r) => row.map((v, c) => {
            const blocked = v === _BLK;
            const onPath = inPath(r, c);
            const isA = isAt(r, c, a);
            const isB = isAt(r, c, b);
            const isHead = isAt(r, c, head);
            const adjacent = !blocked && !onPath && adj(r, c);
            let bg = "#f3f4f6", bd = "#d1d5db", color = "#374151";
            if (blocked) { bg = "#1f2937"; bd = "#0f172a"; color = "#9ca3af"; }
            else if (onPath) { bg = "#dbeafe"; bd = A; color = "#1e3a8a"; }
            if (isA) { bg = "#dcfce7"; bd = "#16a34a"; color = "#15803d"; }
            if (isB) { bg = isB && reachedB ? "#fde68a" : "#fee2e2"; bd = isB && reachedB ? "#f59e0b" : "#dc2626"; color = isB && reachedB ? "#92400e" : "#991b1b"; }
            if (isHead && !isA) { bd = "#7c3aed"; }
            if (adjacent) { bd = "#60a5fa"; }
            return (
              <button key={`${r}-${c}`} onClick={() => onCellClick(r, c)} disabled={blocked} style={{
                width: 44, height: 44, borderRadius: 6, border: `1.5px solid ${bd}`,
                background: bg, color, cursor: blocked ? "not-allowed" : "pointer",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14,
                position: "relative", padding: 0,
              }}>
                {blocked ? "−1" : v}
                {isA && <div style={{ position: "absolute", top: -8, left: -2, fontSize: 11, fontWeight: 800, color: "#16a34a" }}>A</div>}
                {isB && <div style={{ position: "absolute", top: -8, right: -2, fontSize: 11, fontWeight: 800, color: "#dc2626" }}>B</div>}
              </button>
            );
          }))}
        </div>
      </div>

      {/* path string */}
      <div style={{
        background: "#0f172a", borderRadius: 8, padding: "8px 12px", marginBottom: 8,
        textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        color: "#f8fafc", letterSpacing: 0.5, minHeight: 22,
      }}>
        {path.map(([r, c], i) => (
          <span key={i}>
            {i > 0 && <span style={{ color: "#475569" }}> → </span>}
            <span style={{ color: i === 0 ? "#22c55e" : (i === path.length - 1 && reachedB ? "#fbbf24" : "#93c5fd") }}>
              ({r},{c})={grid[r][c]}
            </span>
          </span>
        ))}
      </div>

      {/* audit result */}
      <div style={{
        background: reachedB ? (isOptimal ? "#dcfce7" : "#fff7ed") : "#fee2e2",
        border: `1px solid ${reachedB ? (isOptimal ? "#16a34a" : "#f59e0b") : "#dc2626"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: reachedB ? (isOptimal ? "#15803d" : "#9a3412") : "#991b1b" }}>
          {reachedB
            ? (isOptimal ? t(E, "🎯 Optimal!", "🎯 제일 좋아요!") : t(E, "✓ Reached B", "✓ B 에 닿았어요"))
            : t(E, "… not at B yet", "… 아직 B 가 아니에요")}
        </div>
        {/* 2026-09-17: 여기가 "다익스트라가 찾은 최소값" 을 **처음부터** 보여주고 있었다.
            다익스트라가 뭔지 한 줄도 설명 안 된 상태에서 이름부터 나왔고, 정답을
            오라클처럼 던져 줘서 학생이 스스로 시도할 이유가 사라졌다.
            최소값은 B 에 닿은 **뒤에만** 드러나고, 이름은 코드 쪽에서 붙인다. */}
        <div style={{ fontSize: 12, fontWeight: 700, color: reachedB ? (isOptimal ? "#15803d" : "#9a3412") : "#991b1b", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, `cost = ${cost}`, `비용 = ${cost}`)}
          {reachedB && <> · {t(E, `best = ${optimal}`, `가장 적은 값 = ${optimal}`)}</>}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <button onClick={reset} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset path", "↻ 경로 지우기")}
        </button>
      </div>

      {/* hint */}
      <div style={{
        background: "#eff6ff", border: `1px solid #93c5fd`, borderRadius: 8, padding: "8px 12px",
        fontSize: 11, color: "#1e3a8a", textAlign: "center", lineHeight: 1.5,
        whiteSpace: "pre-line", wordBreak: "keep-all",
      }}>
        {!reachedB
          ? t(E,
              "Extend the path 4-directionally until you reach B. Cheap-looking cells are not always the cheap route.",
              "4 방향으로 경로를 이어 B 까지 가 봐요.\n싸 보이는 칸을 밟는다고 길 전체가 싸지는 건 아니에요.")
          : (isOptimal
              ? t(E,
                  `Nothing beats ${optimal} on this grid — you found the cheapest route. Now: could a program find it without trying every path?`,
                  `이 격자에서는 ${optimal} 보다 적게는 갈 수 없어요. 가장 싼 길을 찾았어요.\n그럼 컴퓨터는 길을 전부 그려 보지 않고도 이걸 찾을 수 있을까요?`)
              : t(E,
                  `You reached B with ${cost}, but some route costs only ${optimal}. Try again — where did the extra go?`,
                  `B 에 닿았는데 비용이 ${cost} 예요. ${optimal} 로 가는 길이 있어요.\n다시 놓아 봐요 — 더 든 만큼은 어디서 났을까요?`))}
      </div>
    </div>
  );
}


const FULL_PY = [
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

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <tuple>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<vector<int>> grid(N, vector<int>(N));",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = 0; j < N; j++) {",
  "            cin >> grid[i][j];",
  "        }",
  "    }",
  "",
  "    int ax, ay, bx, by;",
  "    cin >> ax >> ay >> bx >> by;",
  "    ax--;  // 0-indexed",
  "    ay--;",
  "    bx--;",
  "    by--;",
  "",
  "    const int INF = 1000000000;",
  "    vector<vector<int>> dist(N, vector<int>(N, INF));",
  "    dist[ax][ay] = grid[ax][ay];                             // 출발 칸 인구도 비용에 포함",
  "",
  "    // (거리, x, y) 최소 힙 — greater<> 로 가장 작은 거리부터 꺼냄",
  "    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<tuple<int,int,int>>> pq;",
  "    pq.push(make_tuple(grid[ax][ay], ax, ay));",
  "    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};",
  "",
  "    while (!pq.empty()) {",
  "        int d, x, y;",
  "        tie(d, x, y) = pq.top();",
  "        pq.pop();",
  "        if (d > dist[x][y]) {                                // 이미 더 좋은 값으로 처리된 칸",
  "            continue;",
  "        }",
  "        if (x == bx && y == by) {                            // B 에 최소 비용 도착 — 끝",
  "            break;",
  "        }",
  "        for (int k = 0; k < 4; k++) {",
  "            int nx = x + dirs[k][0];",
  "            int ny = y + dirs[k][1];",
  "            if (nx >= 0 && nx < N && ny >= 0 && ny < N && grid[nx][ny] != -1) {",
  "                int nd = d + grid[nx][ny];",
  "                if (nd < dist[nx][ny]) {",
  "                    dist[nx][ny] = nd;",
  "                    pq.push(make_tuple(nd, nx, ny));",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    cout << dist[bx][by] << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

/* 2026-09-17: 여기가 **코드 38 줄 + heapq 가 섹션 1 개로 통째로** 나오는 자리였다.
   게다가 why 는 "코드를 한 부분씩 읽어봐요" 라고 했는데 섹션이 하나라 한 부분씩
   읽을 데가 없었다 — 말과 화면이 어긋나 있었다.
   "왜 제일 싼 곳부터 꺼내면 되는지", "왜 우선순위 큐가 필요한지" 도 한 문장이 없었다.
   네 걸음으로 쪼갠다. 코드 배열은 FULL_PY / FULL_CPP 를 slice 만 한다 —
   한 글자도 바뀌지 않는다. */
export function getTrainsSections(E) {
  return [
    {
      label: t(E, "① Read the grid", "① 격자 읽기"),
      color: A,
      py: FULL_PY.slice(0, 13), cpp: FULL_CPP.slice(0, 22),
      why: [
        t(E, "Read N first, then N lines of N numbers into grid. grid[x][y] is the population of one cell.",
            "먼저 N 을 읽고, 그다음 N 줄을 grid 에 담아요.\ngrid[x][y] 는 그 칸 하나에 사는 사람 수예요."),
        t(E, "The last line gives A and B. The problem counts rows and columns from 1, but a list counts from 0 — so subtract 1 from all four.",
            "마지막 줄에 A 와 B 의 자리가 와요.\n문제는 행·열을 1 부터 세는데 리스트는 0 부터 세요.\n그래서 네 값에서 1 씩 빼 둬요."),
      ],
      pyOnly: [
        t(E, "map(int, input().split()) turns one line of text into numbers.",
            "map(int, input().split()) 는 글자 한 줄을 숫자들로 바꿔 줘요."),
      ],
      cppOnly: [
        t(E, "cin >> reads numbers one at a time, so the grid needs two nested loops.",
            "cin >> 은 숫자를 하나씩 읽어요. 그래서 격자는 for 문 두 겹으로 채워요."),
      ],
    },
    {
      label: t(E, "② Make a cost table", "② 비용 표 만들기"),
      color: A,
      py: FULL_PY.slice(13, 22), cpp: FULL_CPP.slice(22, 31),
      why: [
        t(E, "dist[x][y] means: the cheapest cost we know so far for reaching that cell. We don't know any of them yet, so every cell starts at INF (a huge number).",
            "dist[x][y] 는 '지금까지 아는, 그 칸까지 가는 가장 적은 비용' 이에요.\n아직 아는 게 없으니 모든 칸을 INF(아주 큰 수)로 시작해요."),
        t(E, "The people living on the starting cell get displaced too — so dist[A] starts at grid[A], not at 0.",
            "출발 칸에 사는 사람도 옮겨야 해요.\n그래서 dist[A] 는 0 이 아니라 grid[A] 로 시작해요."),
        t(E, "pq holds the cells we still have to look at. Because the cost sits first in each tuple, whatever we pull out of pq is always the cheapest one waiting.",
            "pq 에는 아직 봐야 할 칸을 넣어 둬요.\n묶음의 맨 앞이 비용이라, pq 에서 꺼내면 늘 기다리던 것 중 가장 싼 칸이 나와요."),
      ],
      pyOnly: [
        t(E, "float('inf') is Python's 'bigger than any number' value, so the first real cost always wins the comparison.",
            "float('inf') 는 파이썬에서 '어떤 수보다도 큰 값' 이에요.\n그래서 진짜 비용이 처음 들어올 때 무조건 더 작아요."),
      ],
      cppOnly: [
        t(E, "greater<> is what turns priority_queue from a max-heap into a min-heap — without it you would pull the most expensive cell first.",
            "priority_queue 는 기본이 가장 큰 것부터예요.\ngreater<> 를 줘야 가장 작은 것부터 나와요. 안 주면 제일 비싼 칸부터 꺼내게 돼요."),
      ],
    },
    {
      label: t(E, "③ Always take the cheapest first", "③ 제일 싼 칸부터 꺼내기"),
      color: A,
      py: FULL_PY.slice(22, 29), cpp: FULL_CPP.slice(31, 42),
      why: [
        t(E, "Why is taking the cheapest one safe? Populations are never negative, so a path only ever gets more expensive as it grows. The cheapest cell waiting in pq can never be reached more cheaply by some longer detour — its cost is already final.",
            "왜 가장 싼 것부터 꺼내도 될까요?\n인구는 음수가 없어서, 길이 길어지면 비용은 절대 줄지 않아요.\n그러니 pq 에서 가장 싼 칸은 다른 길로 돌아와도 더 싸질 수 없어요.\n그 값이 이미 그 칸의 최종 답이에요."),
        t(E, "The same cell can get pushed into pq more than once. If what we pulled out is bigger than what the table already says, a better route got there first — skip it.",
            "같은 칸이 pq 에 여러 번 들어갈 수 있어요.\n꺼낸 값이 표에 적힌 값보다 크면, 더 좋은 길이 먼저 다녀간 칸이에요. 건너뛰어요."),
        t(E, "The moment B comes out of pq, B's cost is final — so we stop right there instead of walking the rest of the grid.",
            "B 가 pq 에서 나오는 순간이 곧 B 의 최종 답이에요.\n그래서 남은 칸을 다 보지 않고 거기서 멈춰요."),
        t(E, "This way of spreading — always from the cheapest place you know — has a name: Dijkstra's algorithm.",
            "이렇게 '아는 것 중 가장 싼 곳에서부터 넓혀 가는' 방법에는 이름이 있어요 — 다익스트라예요."),
      ],
    },
    {
      label: t(E, "④ Spread to neighbours, then answer", "④ 이웃으로 넓히고 답 내기"),
      color: A,
      py: FULL_PY.slice(29, 38), cpp: FULL_CPP.slice(42, 59),
      why: [
        t(E, "From the cell we just took, look at its four neighbours. Skip anything outside the grid or marked −1.",
            "방금 꺼낸 칸에서 이웃 네 칸을 봐요.\n격자 밖이거나 −1 인 칸은 건너뛰어요."),
        t(E, "Reaching a neighbour costs 'what it cost to get here' plus 'who lives there'. Write it into the table only when it beats what's already written, and push it so it can be taken later.",
            "이웃까지의 비용은 '여기까지 든 비용 + 그 칸 인구' 예요.\n표에 적힌 값보다 작을 때만 고쳐 적고, 나중에 꺼낼 수 있게 pq 에 넣어요."),
        t(E, "When the loop ends, the table's B slot holds the answer — the same number you were trying to beat on the grid.",
            "반복이 끝나면 표의 B 자리에 답이 남아 있어요.\n앞에서 격자로 이겨 보려 했던 바로 그 값이에요."),
      ],
      cppOnly: [
        t(E, "Split #include into the specific headers this code needs (iostream, vector, queue, tuple).",
            "#include 는 이 코드에 필요한 헤더(iostream, vector, queue, tuple)를 하나씩 나눠 적어요."),
        t(E, "Use int for sums and indices — only switch to a bigger type when sums exceed ~2×10^9.",
            "합계와 자리 번호는 int 로 충분해요 — 2×10^9 을 넘는 큰 합계일 때만 더 큰 타입을 써요."),
      ],
    },
  ];
}

export function TrainsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
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


export function downloadTrainsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Trains — Full Study Guide", "Trains — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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

