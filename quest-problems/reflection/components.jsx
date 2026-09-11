// 🔒 USACO_VERIFIED — ⚠️ 2026-09-11 풀이 모양 교체. **USACO 재제출 필요 (py · cpp 둘 다).**
//
//   2026-09-11 (선생님: "선생님 코드로 바꿔줘"): 묶음 개수표(painted/count[gr][gc])를 없애고
//     칸에서 거울짝 3 칸을 직접 견주는 flip_cost(grid, i, j) 로 바꿨다.
//     ⚠️ 왜: 표를 채우려면 **모든 칸 N²** 을 돌아야 하는데, 표가 아끼는 게 없다.
//        update 는 표가 없어도 O(1) 이다(짝이 3 개뿐이라 그냥 보면 된다).
//        표를 빼니 처음 훑기가 N² → (N/2)² 로 1/4 이 됐다.
//        파이썬 실측 N=2000·U=10만: 1.08s → 0.62s. bytearray·ord(35/46) 트릭도 같이 걷어냈다.
//     ⚠️ usaco.org 공식 만점 답안은 표(canonical[x][y])를 쓴다 — 우리가 일부러 다르게 간다.
//        C++ 에선 N² 이 공짜라 표가 안 아파서 공식이 그렇게 쓴 것이고,
//        **공식에는 파이썬 만점 답안이 아예 없다**(공식 py 는 2^(n²/4) 브루트, 작은 서브태스크용).
//        답은 같다 — 아래 대조 참고.
//     로컬 대조(2026-09-11): 공식 만점 C++ 과 **랜덤 500건에서 새 py·새 cpp·새 나이브 py·cpp
//        전부 일치**, N=2000·U=10만 큰 입력도 10만 줄 전부 일치.
//
//   이전 이력:
//     Python: 원본 3/16 (dict TLE) → 2026-07-24 2D 배열로 교체(1.22s). 재제출은 안 했다.
//     C++:    15/15 PASS (원본 검증) · 2026-07-13 lambda → 일반 함수 재작성.
//
//   코드 수정 시 USACO 재제출 필요 — 상세: REPO_ROOT/USACO_VERIFICATION.md
import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#0891b2";

// Official Sample 1 input lines.
const RFL_SAMPLE = ["4 5", "..#.", "##.#", "####", "..##", "1 3", "2 3", "4 3", "4 4", "4 4"];

/* ════════════════════════════════════════════════════════════════════
   ReflectionGrid — click any cell to toggle. The 4-cell mirror group
   gets highlighted with its color; live total of min flips at bottom.
   ════════════════════════════════════════════════════════════════════ */
const RFL_PRESETS = [
  { name: "S1: 4×4", N: 4, init: ["..#.", "##.#", "####", "..##"] },
  { name: "Tiny 2×2", N: 2, init: ["#.", ".."] },
];

export function ReflectionGrid({ E }) {
  const [pi, setPi] = useState(0);
  const preset = RFL_PRESETS[pi];
  const N = preset.N;

  // grid stored as flat 2D array of '#' / '.'
  const [grid, setGrid] = useState(() => preset.init.map(row => row.split("")));
  const [hi, setHi] = useState(null); // [rg, cg] of last clicked group

  // Reset grid when preset changes
  if (grid.length !== N) {
    setGrid(preset.init.map(row => row.split("")));
    setHi(null);
  }

  // Compute group counts and total ops
  const counts = new Map();
  for (let r = 1; r <= N; r++) {
    for (let c = 1; c <= N; c++) {
      const rg = Math.min(r, N + 1 - r);
      const cg = Math.min(c, N + 1 - c);
      const key = `${rg},${cg}`;
      counts.set(key, (counts.get(key) ?? 0) + (grid[r-1][c-1] === "#" ? 1 : 0));
    }
  }
  let total = 0;
  for (const cnt of counts.values()) total += Math.min(cnt, 4 - cnt);

  const toggle = (r, c) => {
    const next = grid.map(row => row.slice());
    next[r-1][c-1] = next[r-1][c-1] === "#" ? "." : "#";
    setGrid(next);
    const rg = Math.min(r, N + 1 - r);
    const cg = Math.min(c, N + 1 - c);
    setHi([rg, cg]);
  };

  const cellSize = N <= 4 ? 44 : 32;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {RFL_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setGrid(p.init.map(row => row.split(""))); setHi(null); }}
            style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${pi === i ? A : C.border}`,
              background: pi === i ? "#cffafe" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
            }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ display: "grid", gap: 2, gridTemplateColumns: `repeat(${N}, ${cellSize}px)` }}>
          {grid.map((row, ri) => row.map((ch, ci) => {
            const r = ri + 1, c = ci + 1;
            const rg = Math.min(r, N + 1 - r);
            const cg = Math.min(c, N + 1 - c);
            const inGroup = hi && hi[0] === rg && hi[1] === cg;
            return (
              <button key={`${ri}-${ci}`} onClick={() => toggle(r, c)}
                style={{
                  width: cellSize, height: cellSize, fontSize: cellSize * 0.45, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                  background: ch === "#" ? "#1e293b" : "#fff",
                  color: ch === "#" ? "#f1f5f9" : "#cbd5e1",
                  border: inGroup ? `3px solid ${A}` : `1px solid ${C.border}`,
                  borderRadius: 4, cursor: "pointer", padding: 0,
                }}>{ch === "#" ? "#" : "·"}</button>
            );
          }))}
        </div>
      </div>

      {hi && (() => {
        const cnt = counts.get(`${hi[0]},${hi[1]}`) ?? 0;
        return (
          <div style={{ background: "#ecfeff", border: `1.5px solid ${A}`, borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#155e75", marginBottom: 10, lineHeight: 1.55 }}>
            <b>{t(E, "Group", "묶음")} (rg={hi[0]}, cg={hi[1]}):</b>{" "}
            {t(E, `${cnt} painted of 4 → flip ${Math.min(cnt, 4 - cnt)}.`, `4 중 ${cnt} 칠함 → ${Math.min(cnt, 4 - cnt)} 뒤집기.`)}
          </div>
        );
      })()}

      <div style={{
        display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8,
        background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 10,
        padding: "8px 14px", fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span style={{ fontSize: 11, color: "#15803d", fontWeight: 700 }}>
          {t(E, "flips", "뒤집기")}
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#15803d" }}>{total}</span>
      </div>
      {/* Caption removed — clicking cells + mirror highlight + flip count above are self-evident. */}
    </div>
  );
}

/* Stub legacy exports (App.jsx still imports these names). */
export function ReflectionSim({ E }) { return <ReflectionGrid E={E} />; }
export function ReflectionRunner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   Progressive code: brute (1–4) → smart incremental (5–6).
   ════════════════════════════════════════════════════════════════════ */

const RFL_S1_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, U = map(int, input().split())",
  "",
  "grid = []                     # 그림 N 줄",
  "for _ in range(N):",
  "    grid.append(list(input().rstrip()))",
];
const RFL_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, U;",
  "    cin >> N >> U;",
  "    vector<string> grid(N);",
  "    for (int r = 0; r < N; r++) {",
  "        cin >> grid[r];",
  "    }",
];

const RFL_S2_PY = [
  "# 칸 (i, j) 의 거울짝은 (i, n-1-j) · (n-1-i, j) · (n-1-i, n-1-j) — 나까지 4 칸이 한 묶음.",
  "# 이 묶음을 한 색으로 만들려면 최소 몇 번 뒤집어야 하나?",
  "def flip_cost(grid, i, j):",
  "    n = len(grid)",
  "    diff = 0",
  "",
  "    # 거울짝 3 칸을 하나씩 견줘서, 나와 색이 다른 칸을 센다",
  "    if grid[i][j] != grid[i][n - 1 - j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][n - 1 - j]:",
  "        diff += 1",
  "",
  "    # 나와 다른 diff 칸을 고치거나, 나를 포함한 4 - diff 칸을 고치거나 — 적은 쪽",
  "    return min(diff, 4 - diff)",
];
const RFL_S2_CPP = [
  "// 칸 (i, j) 의 거울짝은 (i, n-1-j) · (n-1-i, j) · (n-1-i, n-1-j) — 나까지 4 칸이 한 묶음.",
  "// 이 묶음을 한 색으로 만들려면 최소 몇 번 뒤집어야 하나?",
  "int flip_cost(vector<string> &grid, int i, int j) {",
  "    int n = grid.size();",
  "    int diff = 0;",
  "",
  "    // 거울짝 3 칸을 하나씩 견줘서, 나와 색이 다른 칸을 센다",
  "    if (grid[i][j] != grid[i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "",
  "    // 적은 쪽만 뒤집으면 된다",
  "    return min(diff, 4 - diff);",
  "}",
];

const RFL_S3_PY = [
  "# 묶음마다 대표 한 칸씩만 보면 된다 — 왼쪽 위 1/4 이 딱 그 대표들이다.",
  "total = 0",
  "for i in range(N // 2):",
  "    for j in range(N // 2):",
  "        total += flip_cost(grid, i, j)",
  "",
  "answers = [total]",
];
const RFL_S3_CPP = [
  "    // 묶음마다 대표 한 칸씩만 보면 된다 — 왼쪽 위 1/4 이 딱 그 대표들이다.",
  "    int total = 0;",
  "    for (int i = 0; i < N / 2; i++) {",
  "        for (int j = 0; j < N / 2; j++) {",
  "            total += flip_cost(grid, i, j);",
  "        }",
  "    }",
  "    cout << total << '\\n';",
];

const RFL_BRUTE_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "# 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수",
  "def flip_cost(grid, i, j):",
  "    n = len(grid)",
  "    diff = 0",
  "",
  "    # 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다",
  "    if grid[i][j] != grid[i][n - 1 - j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][n - 1 - j]:",
  "        diff += 1",
  "",
  "    return min(diff, 4 - diff)",
  "",
  "N, U = map(int, input().split())",
  "",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(list(input().rstrip()))",
  "",
  "def total_cost():",
  "    # 매번 왼쪽 위 1/4 을 처음부터 다시 훑는다 — O(N²)",
  "    s = 0",
  "    for i in range(N // 2):",
  "        for j in range(N // 2):",
  "            s += flip_cost(grid, i, j)",
  "    return s",
  "",
  "print(total_cost())",
  "",
  "for _ in range(U):",
  "    r, c = map(int, input().split())",
  "    r -= 1",
  "    c -= 1",
  "    if grid[r][c] == '#':",
  "        grid[r][c] = '.'",
  "    else:",
  "        grid[r][c] = '#'",
  "    print(total_cost())   # 뒤집을 때마다 전부 다시 셈 — 느림!",
];
const RFL_BRUTE_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "// 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수",
  "int flip_cost(vector<string> &grid, int i, int j) {",
  "    int n = grid.size();",
  "    int diff = 0;",
  "",
  "    // 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다",
  "    if (grid[i][j] != grid[i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "",
  "    return min(diff, 4 - diff);",
  "}",
  "",
  "int main() {",
  "    int N, U;",
  "    cin >> N >> U;",
  "",
  "    vector<string> grid(N);",
  "    for (int r = 0; r < N; r++) {",
  "        cin >> grid[r];",
  "    }",
  "",
  "    for (int q = 0; q <= U; q++) {",
  "        // 매번 왼쪽 위 1/4 을 처음부터 다시 훑는다 — O(N²)",
  "        int total = 0;",
  "        for (int i = 0; i < N / 2; i++) {",
  "            for (int j = 0; j < N / 2; j++) {",
  "                total += flip_cost(grid, i, j);",
  "            }",
  "        }",
  "        cout << total << '\\n';",
  "",
  "        if (q < U) {",
  "            int r, c;",
  "            cin >> r >> c;",
  "            r--;",
  "            c--;",
  "            if (grid[r][c] == '#') {",
  "                grid[r][c] = '.';",
  "            } else {",
  "                grid[r][c] = '#';",
  "            }",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

const RFL_FAST_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "# 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수",
  "def flip_cost(grid, i, j):",
  "    n = len(grid)",
  "    diff = 0",
  "",
  "    # 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다",
  "    if grid[i][j] != grid[i][n - 1 - j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][j]:",
  "        diff += 1",
  "    if grid[i][j] != grid[n - 1 - i][n - 1 - j]:",
  "        diff += 1",
  "",
  "    return min(diff, 4 - diff)",
  "",
  "N, U = map(int, input().split())",
  "",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(list(input().rstrip()))",
  "",
  "# 처음 답 — 묶음마다 대표 한 칸씩, 곧 왼쪽 위 1/4 만 훑는다",
  "total = 0",
  "for i in range(N // 2):",
  "    for j in range(N // 2):",
  "        total += flip_cost(grid, i, j)",
  "",
  "answers = [total]",
  "",
  "for _ in range(U):",
  "    r, c = map(int, input().split())",
  "    r -= 1",
  "    c -= 1",
  "",
  "    total -= flip_cost(grid, r, c)   # 이 묶음의 옛 비용을 빼고",
  "",
  "    if grid[r][c] == '#':            # 칸을 뒤집고",
  "        grid[r][c] = '.'",
  "    else:",
  "        grid[r][c] = '#'",
  "",
  "    total += flip_cost(grid, r, c)   # 새 비용을 더한다",
  "    answers.append(total)",
  "",
  "print('\\n'.join(map(str, answers)))",
];
const RFL_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "// 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수",
  "int flip_cost(vector<string> &grid, int i, int j) {",
  "    int n = grid.size();",
  "    int diff = 0;",
  "",
  "    // 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다",
  "    if (grid[i][j] != grid[i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][j]) {",
  "        diff++;",
  "    }",
  "    if (grid[i][j] != grid[n - 1 - i][n - 1 - j]) {",
  "        diff++;",
  "    }",
  "",
  "    return min(diff, 4 - diff);",
  "}",
  "",
  "int main() {",
  "    int N, U;",
  "    cin >> N >> U;",
  "",
  "    vector<string> grid(N);",
  "    for (int r = 0; r < N; r++) {",
  "        cin >> grid[r];",
  "    }",
  "",
  "    // 처음 답 — 묶음마다 대표 한 칸씩, 곧 왼쪽 위 1/4 만 훑는다",
  "    int total = 0;",
  "    for (int i = 0; i < N / 2; i++) {",
  "        for (int j = 0; j < N / 2; j++) {",
  "            total += flip_cost(grid, i, j);",
  "        }",
  "    }",
  "    cout << total << '\\n';",
  "",
  "    for (int q = 0; q < U; q++) {",
  "        int r, c;",
  "        cin >> r >> c;",
  "        r--;",
  "        c--;",
  "",
  "        total -= flip_cost(grid, r, c);   // 이 묶음의 옛 비용을 빼고",
  "",
  "        if (grid[r][c] == '#') {          // 칸을 뒤집고",
  "            grid[r][c] = '.';",
  "        } else {",
  "            grid[r][c] = '#';",
  "        }",
  "",
  "        total += flip_cost(grid, r, c);   // 새 비용을 더한다",
  "        cout << total << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getReflectionSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N, U, grid", "1️⃣ N, U, grid 읽기"),
      color: A,
      py: RFL_S1_PY, cpp: RFL_S1_CPP,
      why: [
        t(E, "Read N (canvas size, even), U (number of updates), then N rows of '.' and '#'.",
            "N (캔버스 크기, 짝수), U (update 개수), 그 다음 N 줄의 '.' 와 '#' 읽기."),
      ],
      aside: <SampleInputAside E={E} sample={RFL_SAMPLE} highlight={[0, 1, 2, 3, 4]} note={t(E,
        "First 5 lines: \"4 5\" (N=4, U=5), then 4 grid rows.",
        "처음 5 줄: \"4 5\" (N=4, U=5), 그 다음 4 줄의 그리드.")} />,
    },
    {
      label: t(E, "2️⃣ Cost of one group — compare the 3 mirrors", "2️⃣ 묶음 하나의 비용 — 거울짝 3 칸과 견주기"),
      color: "#7c3aed",
      py: RFL_S2_PY, cpp: RFL_S2_CPP,
      why: [
        t(E, "Cell (r, c) shares a group with (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c) — 4 cells total.",
            "칸 (r, c) 는 (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c) 와 같은 묶음이에요. 모두 4 칸."),
        t(E, "So we never need a separate table: from any cell we can reach its 3 mirrors by index.",
            "그래서 따로 표를 만들 필요가 없어요. 아무 칸에서나 거울짝 3 칸을 번호로 바로 찾아가요."),
        t(E, "Count how many of the 3 differ from me. Repaint those, or repaint me and the rest — whichever is fewer.",
            "그중 나와 색이 다른 칸을 세요. 그 칸들을 고치거나, 나를 포함한 나머지를 고치거나 — 적은 쪽이 답이에요."),
      ],
    },
    {
      label: t(E, "3️⃣ Initial total — sum of min(cnt, 4 − cnt)", "3️⃣ 초기 총합 — min(cnt, 4 − cnt) 합"),
      color: "#16a34a",
      py: RFL_S3_PY, cpp: RFL_S3_CPP,
      why: [
        t(E, "For a group of 4 cells with c painted: flip the c minority OR the (4 − c) minority. Min ops = min(c, 4 − c).",
            "4 칸 중 c 칠함: 소수 쪽인 c 또는 (4 − c) 를 뒤집음. 최소 = min(c, 4 − c)."),
        t(E, "Every group has exactly one cell in the top-left quarter, so scanning that quarter visits each group once.",
            "묶음마다 왼쪽 위 1/4 에 칸이 딱 하나씩 있어요. 그래서 1/4 만 훑으면 모든 묶음을 한 번씩 보게 돼요."),
        t(E, "Total over all groups = answer BEFORE any update.",
            "모든 묶음을 더하면 뒤집기 전 답이에요."),
      ],
    },
    {
      label: t(E, "4️⃣ Naive update — rebuild every time", "4️⃣ 나이브 update — 매번 다시 만들기"),
      color: "#dc2626",
      py: RFL_BRUTE_PY, cpp: RFL_BRUTE_CPP,
      why: [
        t(E, "Simplest update: toggle the cell, then scan the whole quarter again. Easy to write but O(N²) per update.",
            "가장 단순한 update: 칸을 뒤집고 1/4 을 통째로 다시 훑기. 쉽지만 update 마다 O(N²)."),
        t(E, "Total: O(U · N²). At U = 10⁵, N = 2000 → 4·10¹¹ ops — TLE.",
            "총: O(U · N²). U = 10⁵, N = 2000 면 4·10¹¹ — TLE."),
      ],
    },
    {
      label: t(E, "5️⃣ Insight — only ONE group changes per update", "5️⃣ 핵심 관찰 — 한 번 뒤집으면 묶음 하나만 바뀌어요"),
      color: "#0891b2",
      py: [
        "# 뒤집기 1 번 = 칸 1 개 토글 → 그 칸이 속한 묶음 하나만 바뀜.",
        "# 나머지 묶음은 그대로. 그래서 1/4 을 다시 훑을 필요가 없다:",
        "#   1) before = flip_cost(grid, r, c)   ← 이 묶음의 옛 비용",
        "#   2) 칸을 뒤집고",
        "#   3) after  = flip_cost(grid, r, c)   ← 새 비용",
        "#   4) total = total - before + after",
        "#",
        "# flip_cost 는 거울짝 3 칸만 보므로 한 번당 O(1).",
      ],
      cpp: [
        "// 같은 인사이트:",
        "//   한 번 뒤집으면 묶음 하나의 비용만 바뀐다.",
        "//   total 에서 그 묶음의 옛 비용을 빼고 새 비용을 더하면 끝.",
        "//   flip_cost 는 거울짝 3 칸만 보므로 O(1) per update.",
      ],
      why: [
        t(E, "An update toggles exactly ONE cell, so exactly ONE group's cost can change.",
            "한 번 뒤집으면 칸 하나만 바뀌니, 비용이 달라지는 묶음도 하나뿐이에요."),
        t(E, "All other groups' contributions to total stay the same.",
            "나머지 묶음들이 더하는 값은 그대로예요."),
        t(E, "So we can update `total` in O(1): subtract the old group cost, add the new one.",
            "그래서 total 을 O(1) 로 갱신: 옛 비용 빼고 새 비용 더하기."),
      ],
    },
    {
      label: t(E, "6️⃣ Final fast code — incremental updates", "6️⃣ 최종 빠른 코드 — 증분 update"),
      color: "#15803d",
      py: RFL_FAST_PY, cpp: RFL_FAST_CPP,
      why: [
        t(E, "One pass over the top-left quarter gives the first answer. No extra table to build.",
            "왼쪽 위 1/4 을 한 번 훑으면 첫 답이 나와요. 따로 만들 표가 없어요."),
        t(E, "Each update: subtract that group's old cost, flip, add the new one — O(1).",
            "뒤집을 때마다 그 묶음의 옛 비용을 빼고, 칸을 뒤집고, 새 비용을 더해요 — O(1)."),
        t(E, "Total: (N/2)² groups + U updates ≤ 10⁶ + 10⁵ ops. Fast enough in Python too.",
            "총: 묶음 (N/2)² 개 + update U 번 ≤ 10⁶ + 10⁵. 파이썬으로도 넉넉해요."),
      ],
    },
  ];
}

export function ReflectionProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ─── Syntax-highlight helpers + PDF (same shape as other quests) ─── */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair"];
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

export function downloadReflectionPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Reflection — Full Study Guide", "🪞 Reflection — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
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
<div class="sub">USACO February 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>${t(E, "Code (6 sections)", "코드 (6 섹션)")}</h2>
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
