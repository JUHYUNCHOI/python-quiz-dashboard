// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 3/16 (TLE 4-16, Python too slow)
//   C++:    15/15 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

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
            <b>{t(E, "Group", "그룹")} (rg={hi[0]}, cg={hi[1]}):</b>{" "}
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
  "",
  "data = sys.stdin.read().split()",
  "pos = 0                       # 지금 읽을 토큰 위치",
  "N = int(data[pos])",
  "pos += 1",
  "U = int(data[pos])",
  "pos += 1",
  "",
  "grid = []                     # 그림 N 줄",
  "for r in range(N):",
  "    grid.append(list(data[pos]))",
  "    pos += 1",
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
  "# 거울짝 4칸 (r,c)·(r,N+1-c)·(N+1-r,c)·(N+1-r,N+1-c) 은 한 묶음.",
  "# group_of : 어떤 칸이 속한 묶음의 '이름표'를 돌려줌 (r, c 는 1 부터)",
  "def group_of(r, c):",
  "    return (min(r, N + 1 - r), min(c, N + 1 - c))",
  "",
  "# painted[묶음] = 그 묶음 4칸 중 칠해진(#) 칸 수",
  "painted = {}",
  "for r in range(1, N + 1):",
  "    for c in range(1, N + 1):",
  "        g = group_of(r, c)",
  "        painted.setdefault(g, 0)",
  "        if grid[r - 1][c - 1] == '#':",
  "            painted[g] += 1",
];
const RFL_S2_CPP = [
  "    // count[rg][cg] over groups, indices 1..N/2",
  "    int H = N / 2;",
  "    vector<vector<int>> count(H + 1, vector<int>(H + 1, 0));",
  "    for (int r = 1; r <= N; r++) {",
  "        for (int c = 1; c <= N; c++) {",
  "            int rg = min(r, N + 1 - r);",
  "            int cg = min(c, N + 1 - c);",
  "            if (grid[r-1][c-1] == '#') {",
  "                count[rg][cg]++;",
  "            }",
  "        }",
  "    }",
];

const RFL_S3_PY = [
  "# 한 묶음을 같은 색으로 만드는 최소 뒤집기 = 적은 쪽",
  "def min_flips(count):",
  "    return min(count, 4 - count)",
  "",
  "# 처음 답 = 모든 묶음의 최소 뒤집기 합",
  "total = 0",
  "for count in painted.values():",
  "    total += min_flips(count)",
  "",
  "answers = [total]",
];
const RFL_S3_CPP = [
  "    auto flip_cost = [](int cnt) {",
  "        if (cnt < 4 - cnt) {",
  "            return cnt;",
  "        }",
  "        return 4 - cnt;",
  "    };",
  "    int total = 0;",
  "    for (int rg = 1; rg <= H; rg++) {",
  "        for (int cg = 1; cg <= H; cg++) {",
  "            total += flip_cost(count[rg][cg]);",
  "        }",
  "    }",
  "    cout << total << '\\n';",
];

const RFL_BRUTE_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "pos = 0",
  "N = int(data[pos])",
  "pos += 1",
  "U = int(data[pos])",
  "pos += 1",
  "",
  "grid = []",
  "for r in range(N):",
  "    grid.append(list(data[pos]))",
  "    pos += 1",
  "",
  "def group_of(r, c):",
  "    return (min(r, N + 1 - r), min(c, N + 1 - c))",
  "",
  "def total_flips():",
  "    # 매번 모든 묶음을 처음부터 다시 셈 — O(N²)",
  "    painted = {}",
  "    for r in range(1, N + 1):",
  "        for c in range(1, N + 1):",
  "            g = group_of(r, c)",
  "            painted.setdefault(g, 0)",
  "            if grid[r - 1][c - 1] == '#':",
  "                painted[g] += 1",
  "    s = 0",
  "    for count in painted.values():",
  "        s += min(count, 4 - count)",
  "    return s",
  "",
  "print(total_flips())",
  "for _ in range(U):",
  "    r = int(data[pos])",
  "    pos += 1",
  "    c = int(data[pos])",
  "    pos += 1",
  "    if grid[r - 1][c - 1] == '#':",
  "        grid[r - 1][c - 1] = '.'",
  "    else:",
  "        grid[r - 1][c - 1] = '#'",
  "    print(total_flips())   # 뒤집을 때마다 전부 다시 셈 — 느림!",
];
const RFL_BRUTE_CPP = [
  "// (input + count[][] init from earlier sections)",
  "    auto total_flips = [&]() {",
  "        int s = 0;",
  "        for (int rg = 1; rg <= H; rg++) {",
  "            for (int cg = 1; cg <= H; cg++) {",
  "                s += min(count[rg][cg], 4 - count[rg][cg]);",
  "            }",
  "        }",
  "        return s;",
  "    };",
  "    cout << total_flips() << '\\n';",
  "    for (int u = 0; u < U; u++) {",
  "        int r, c;",
  "        cin >> r >> c;",
  "        // toggle and REBUILD count[][] from scratch",
  "        if (grid[r-1][c-1] == '#') {",
  "            grid[r-1][c-1] = '.';",
  "        } else {",
  "            grid[r-1][c-1] = '#';",
  "        }",
  "        // ... re-init count[][] here ... (slow!)",
  "        cout << total_flips() << '\\n';",
  "    }",
];

const RFL_FAST_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "pos = 0",
  "N = int(data[pos])",
  "pos += 1",
  "U = int(data[pos])",
  "pos += 1",
  "",
  "grid = []",
  "for r in range(N):",
  "    grid.append(list(data[pos]))",
  "    pos += 1",
  "",
  "# 거울짝 4칸이 한 묶음. group_of = 그 묶음의 '이름표'",
  "def group_of(r, c):",
  "    return (min(r, N + 1 - r), min(c, N + 1 - c))",
  "",
  "# painted[묶음] = 그 묶음에 칠해진(#) 칸 수 — 한 번만 만들어 둠",
  "painted = {}",
  "for r in range(1, N + 1):",
  "    for c in range(1, N + 1):",
  "        g = group_of(r, c)",
  "        painted.setdefault(g, 0)",
  "        if grid[r - 1][c - 1] == '#':",
  "            painted[g] += 1",
  "",
  "# 한 묶음 맞추는 최소 뒤집기 = 적은 쪽",
  "def min_flips(count):",
  "    return min(count, 4 - count)",
  "",
  "# 처음 답 = 모든 묶음의 최소 뒤집기 합",
  "total = 0",
  "for count in painted.values():",
  "    total += min_flips(count)",
  "",
  "answers = [total]",
  "",
  "# 뒤집기마다 그 묶음 하나만 다시 계산:",
  "#   총합에서 '옛 최소' 를 빼고 '새 최소' 를 더한다",
  "for _ in range(U):",
  "    r = int(data[pos])",
  "    pos += 1",
  "    c = int(data[pos])",
  "    pos += 1",
  "    g = group_of(r, c)",
  "    before = min_flips(painted[g])",
  "",
  "    if grid[r - 1][c - 1] == '#':",
  "        grid[r - 1][c - 1] = '.'",
  "        painted[g] -= 1",
  "    else:",
  "        grid[r - 1][c - 1] = '#'",
  "        painted[g] += 1",
  "",
  "    after = min_flips(painted[g])",
  "    total = total - before + after",
  "    answers.append(total)",
  "",
  "for line in answers:",
  "    print(line)",
];
const RFL_FAST_CPP = [
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
  "",
  "    int H = N / 2;",
  "    vector<vector<int>> count(H + 1, vector<int>(H + 1, 0));",
  "    for (int r = 1; r <= N; r++) {",
  "        for (int c = 1; c <= N; c++) {",
  "            int rg = min(r, N + 1 - r);",
  "            int cg = min(c, N + 1 - c);",
  "            if (grid[r-1][c-1] == '#') {",
  "                count[rg][cg]++;",
  "            }",
  "        }",
  "    }",
  "    auto flip_cost = [](int cnt) {",
  "        if (cnt < 4 - cnt) {",
  "            return cnt;",
  "        }",
  "        return 4 - cnt;",
  "    };",
  "",
  "    int total = 0;",
  "    for (int rg = 1; rg <= H; rg++) {",
  "        for (int cg = 1; cg <= H; cg++) {",
  "            total += flip_cost(count[rg][cg]);",
  "        }",
  "    }",
  "    cout << total << '\\n';",
  "",
  "    for (int u = 0; u < U; u++) {",
  "        int r, c;",
  "        cin >> r >> c;",
  "        int rg = min(r, N + 1 - r);",
  "        int cg = min(c, N + 1 - c);",
  "        int old_cnt = count[rg][cg];",
  "        int new_cnt;",
  "        if (grid[r-1][c-1] == '#') {",
  "            grid[r-1][c-1] = '.';",
  "            new_cnt = old_cnt - 1;",
  "        } else {",
  "            grid[r-1][c-1] = '#';",
  "            new_cnt = old_cnt + 1;",
  "        }",
  "        count[rg][cg] = new_cnt;",
  "        total = total - flip_cost(old_cnt) + flip_cost(new_cnt);",
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
      label: t(E, "2️⃣ Group cells by mirror identity", "2️⃣ 거울 정체로 칸 묶기"),
      color: "#7c3aed",
      py: RFL_S2_PY, cpp: RFL_S2_CPP,
      why: [
        t(E, "Cell (r, c) shares a group with (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c) — 4 cells total.",
            "칸 (r, c) 는 (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c) 와 같은 그룹 — 총 4 칸."),
        t(E, "Use rg = min(r, N+1−r), cg = min(c, N+1−c) as the canonical key. Now every cell maps to a (rg, cg) in [1, N/2] × [1, N/2].",
            "rg = min(r, N+1−r), cg = min(c, N+1−c) 를 그룹 키로. 모든 칸이 [1, N/2] × [1, N/2] 안의 (rg, cg) 에 매핑."),
        t(E, "Count painted cells per group with one O(N²) pass.",
            "한 번의 O(N²) 패스로 그룹마다 칠한 칸 카운트."),
      ],
    },
    {
      label: t(E, "3️⃣ Initial total — sum of min(cnt, 4 − cnt)", "3️⃣ 초기 총합 — min(cnt, 4 − cnt) 합"),
      color: "#16a34a",
      py: RFL_S3_PY, cpp: RFL_S3_CPP,
      why: [
        t(E, "For a group of 4 cells with c painted: flip the c minority OR the (4 − c) minority. Min ops = min(c, 4 − c).",
            "4 칸 중 c 칠함: 소수 쪽인 c 또는 (4 − c) 를 뒤집음. 최소 = min(c, 4 − c)."),
        t(E, "Total over all groups = answer BEFORE any update.",
            "모든 그룹 합 = update 전 답."),
      ],
    },
    {
      label: t(E, "4️⃣ Naive update — rebuild every time", "4️⃣ 나이브 update — 매번 다시 만들기"),
      color: "#dc2626",
      py: RFL_BRUTE_PY, cpp: RFL_BRUTE_CPP,
      why: [
        t(E, "Simplest update: toggle the cell, rebuild group_count from scratch, recompute total. Easy to write but O(N²) per update.",
            "가장 단순한 update: 칸 토글 후 group_count 처음부터 다시, total 재계산. 쉽지만 update 마다 O(N²)."),
        t(E, "Total: O(U · N²). At U = 10⁵, N = 2000 → 4·10¹¹ ops — TLE.",
            "총: O(U · N²). U = 10⁵, N = 2000 면 4·10¹¹ — TLE."),
      ],
    },
    {
      label: t(E, "5️⃣ Insight — only ONE group changes per update", "5️⃣ 인사이트 — update 1 번에 그룹 1 개만 바뀜"),
      color: "#0891b2",
      py: [
        "# 뒤집기 1 번 = 칸 1 개 토글 → 그 칸이 속한 묶음 하나의 count 만 바뀜.",
        "# 나머지 묶음은 그대로. 그래서:",
        "#   1) group_of(r, c) 로 그 칸의 묶음을 찾고",
        "#   2) before = min_flips(그 묶음의 옛 count)",
        "#   3) count 를 ±1 (토글 방향에 따라)",
        "#   4) after  = min_flips(새 count)",
        "#   5) total = total - before + after",
        "#",
        "# 한 번당 O(1).",
      ],
      cpp: [
        "// 같은 인사이트:",
        "//   update 1 번 → 그룹 1 개의 count 만 ±1.",
        "//   total 갱신 = 그 그룹의 새/옛 cost 차이만큼 더해주기.",
        "//   O(1) per update.",
      ],
      why: [
        t(E, "An update toggles exactly ONE cell, so the count of exactly ONE group changes by ±1.",
            "update 는 정확히 한 칸을 토글 → 정확히 한 그룹의 count 가 ±1."),
        t(E, "All other groups' contributions to total stay the same.",
            "나머지 그룹들의 total 기여는 그대로."),
        t(E, "So we can update `total` in O(1): subtract the old group cost, add the new one.",
            "그래서 total 을 O(1) 로 갱신: 옛 비용 빼고 새 비용 더하기."),
      ],
    },
    {
      label: t(E, "6️⃣ Final fast code — incremental updates", "6️⃣ 최종 빠른 코드 — 증분 update"),
      color: "#15803d",
      py: RFL_FAST_PY, cpp: RFL_FAST_CPP,
      why: [
        t(E, "Build group_count once in O(N²). Initial total is one pass over groups.",
            "group_count 한 번 O(N²) 으로 만들기. 초기 total 은 그룹 한 번 훑기."),
        t(E, "Each update: look up the group, adjust its count and total in O(1).",
            "각 update: 그룹 찾고, count 와 total 을 O(1) 로 조정."),
        t(E, "Total: O(N²) build + O(U) updates ≤ 4·10⁶ + 10⁵ = ~4·10⁶ ops. Trivially fast.",
            "총: O(N²) 빌드 + O(U) update ≤ 4·10⁶ + 10⁵ ≈ 4·10⁶. 매우 빠름."),
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
