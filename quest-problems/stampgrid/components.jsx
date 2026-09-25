// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 14/14 PASS
//   C++:    14/14 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ─────────────────────────────────────────────────────────────
   StampSimulator — bilingual interactive stamp playground.
   Canvas 4×4 target, L-shape 2×2 stamp with 4 rotations.
   Student picks rotation + top-left position, clicks "Stamp!".
   Cells turn green when matching target, red on mismatch.
   ───────────────────────────────────────────────────────────── */
const TARGET = [
  "**..",
  "**.*",
  ".***",
  "...*",
];
const BASE_STAMP = ["*.", "**"]; // L-shape, K=2
function rot90(g) {
  const R = g.length, C = g[0].length;
  const out = [];
  for (let c = 0; c < C; c++) {
    let row = "";
    for (let r = 0; r < R; r++) row += g[R - 1 - r][c];
    out.push(row);
  }
  return out;
}
function getRotations(stamp) {
  const rs = [stamp];
  for (let i = 0; i < 3; i++) rs.push(rot90(rs[rs.length - 1]));
  return rs;
}
const ROTATIONS = getRotations(BASE_STAMP);

export function StampSimulator({ E }) {
  const N = TARGET.length, K = BASE_STAMP.length;
  const [rot, setRot] = useState(0);
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [canvas, setCanvas] = useState(() => Array.from({ length: N }, () => Array(N).fill(false)));
  const [bad, setBad] = useState(false);

  const stamp = ROTATIONS[rot];
  const maxRC = N - K;

  const stampNow = () => {
    // Legality: stamp's '*' cell must land on target '*'
    let ok = true;
    for (let dr = 0; dr < K && ok; dr++) {
      for (let dc = 0; dc < K && ok; dc++) {
        if (stamp[dr][dc] === "*" && TARGET[pos.r + dr][pos.c + dc] !== "*") ok = false;
      }
    }
    if (!ok) { setBad(true); setTimeout(() => setBad(false), 700); return; }
    const nx = canvas.map(row => row.slice());
    for (let dr = 0; dr < K; dr++) {
      for (let dc = 0; dc < K; dc++) {
        if (stamp[dr][dc] === "*") nx[pos.r + dr][pos.c + dc] = true;
      }
    }
    setCanvas(nx);
  };
  const reset = () => { setCanvas(Array.from({ length: N }, () => Array(N).fill(false))); setBad(false); };

  // Done check: every target '*' covered
  let allCovered = true;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (TARGET[r][c] === "*" && !canvas[r][c]) { allCovered = false; break; }
  }

  const cellSize = 32;
  const previewCell = 22;

  // Render target+canvas combined: green = covered '*', light = uncovered '*', white = '.'
  const renderGrid = () => (
    <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${N}, ${cellSize}px)`, gap: 2, padding: 4, background: "#d1fae5", borderRadius: 8 }}>
      {Array.from({ length: N }).flatMap((_, r) =>
        Array.from({ length: N }).map((__, c) => {
          const isTarget = TARGET[r][c] === "*";
          const covered = canvas[r][c];
          // Highlight where preview stamp would land
          let preview = false;
          if (r >= pos.r && r < pos.r + K && c >= pos.c && c < pos.c + K) {
            if (stamp[r - pos.r][c - pos.c] === "*") preview = true;
          }
          let bg = "#fff";
          let border = "1px solid #e5e7eb";
          if (isTarget && covered) bg = "#10b981"; // covered target — green
          else if (isTarget) bg = "#fef3c7"; // uncovered target — yellow
          else bg = "#f9fafb"; // empty
          if (preview) {
            border = `2px solid ${bad ? "#dc2626" : "#059669"}`;
          }
          return (
            <div key={`${r}-${c}`} style={{
              width: cellSize, height: cellSize, background: bg, border,
              borderRadius: 4, transition: "background .15s",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: covered ? "#fff" : "#9ca3af", fontWeight: 700,
            }}>
              {isTarget ? "★" : ""}
            </div>
          );
        })
      )}
    </div>
  );

  // Render small stamp preview
  const renderStamp = () => (
    <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${K}, ${previewCell}px)`, gap: 2, padding: 3, background: "#a7f3d0", borderRadius: 6 }}>
      {stamp.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <div key={`s-${r}-${c}`} style={{
            width: previewCell, height: previewCell,
            background: ch === "*" ? "#059669" : "#f9fafb",
            border: "1px solid #6ee7b7", borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, color: "#fff", fontWeight: 700,
          }}>{ch === "*" ? "★" : ""}</div>
        ))
      )}
    </div>
  );

  const btn = (active) => ({
    background: active ? "#059669" : "#fff",
    color: active ? "#fff" : "#059669",
    border: "1.5px solid #059669",
    borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700,
    cursor: "pointer", minWidth: 36,
  });

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#059669", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🧪 Stamp Simulator — Cover every ★", "🧪 도장 찍어 보기 — ★ 을 모두 덮기")}
        </div>
        <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 10 }}>
          {t(E, "Pick a rotation + top-left, then press Stamp! Yellow ★ must turn green.",
              "방향과 왼쪽 위 자리를 고른 뒤 도장을 찍어요.\n노란 ★ 이 모두 초록이 되면 성공이에요.")}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
          {/* Target + canvas */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>
              {t(E, "Canvas (4×4)", "캔버스 (4×4)")}
            </div>
            {renderGrid()}
          </div>
          {/* Stamp preview */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>
              {t(E, `Stamp (rot ${rot * 90}°)`, `도장 (회전 ${rot * 90}°)`)}
            </div>
            {renderStamp()}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700 }}>{t(E, "Rotation:", "회전")}</span>
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => setRot(i)} style={btn(rot === i)}>{i * 90}°</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700 }}>{t(E, "Row:", "행")}</span>
            {Array.from({ length: maxRC + 1 }).map((_, i) => (
              <button key={`r${i}`} onClick={() => setPos(p => ({ ...p, r: i }))} style={btn(pos.r === i)}>{i}</button>
            ))}
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginLeft: 6 }}>{t(E, "Col:", "열")}</span>
            {Array.from({ length: maxRC + 1 }).map((_, i) => (
              <button key={`c${i}`} onClick={() => setPos(p => ({ ...p, c: i }))} style={btn(pos.c === i)}>{i}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={stampNow} style={{
              background: "#059669", color: "#fff", border: "none",
              borderRadius: 8, padding: "6px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer",
            }}>📮 {t(E, "Stamp!", "도장 찍기!")}</button>
            <button onClick={reset} style={{
              background: "#fff", color: "#059669", border: "1.5px solid #059669",
              borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>↺ {t(E, "Reset", "처음부터 다시")}</button>
          </div>
        </div>

        {/* Status */}
        <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, fontWeight: 700,
          color: bad ? "#dc2626" : (allCovered ? "#059669" : "#92400e") }}>
          {bad
            ? t(E, "❌ Illegal! Stamp's ★ would land outside target ★.", "❌ 안 돼요! 도장의 ★ 이 비어 있는 칸에 찍혀요.")
            : (allCovered
                ? t(E, "✅ All target ★ covered — pattern is reachable!", "✅ ★ 을 모두 덮었어요 — 이 무늬는 만들 수 있어요!")
                : t(E, "Keep stamping… Yellow ★ still uncovered.", "계속 찍어 봐요. 노란 ★ 이 아직 남아 있어요."))}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "def read_line():",
  "    # \ucc44\uc810\uae30\ub294 \ucf00\uc774\uc2a4 \uc0ac\uc774\uc5d0 \ube48 \uc904\uc744 \ub123\uc5b4\uc694 \u2014 \uadf8\uac74 \uac74\ub108\ub6f0\uc5b4\uc694.",
  "    line = input()",
  "    while line.strip() == \"\":",
  "        line = input()",
  "    return line",
  "",
  "T = int(read_line())",
  "",
  "def rotate90(grid):",
  "    R, C = len(grid), len(grid[0])",
  "    return [''.join(grid[R - 1 - r][c] for r in range(R)) for c in range(C)]",
  "",
  "def solve():",
  "    N = int(read_line())",
  "    canvas = [read_line() for _ in range(N)]",
  "    K = int(read_line())",
  "    stamp = [read_line() for _ in range(K)]",
  "    rotations = [stamp]",
  "    for _ in range(3):",
  "        rotations.append(rotate90(rotations[-1]))",
  "    covered = [[False] * N for _ in range(N)]",
  "    for rot in rotations:",
  "        for r in range(N - K + 1):",
  "            for c in range(N - K + 1):",
  "                ok = True",
  "                for dr in range(K):",
  "                    if not ok:",
  "                        break",
  "                    for dc in range(K):",
  "                        if rot[dr][dc] == '*' and canvas[r + dr][c + dc] != '*':",
  "                            ok = False",
  "                            break",
  "                if not ok:",
  "                    continue",
  "                for dr in range(K):",
  "                    for dc in range(K):",
  "                        if rot[dr][dc] == '*':",
  "                            covered[r + dr][c + dc] = True",
  "    return all(covered[r][c] or canvas[r][c] != '*' for r in range(N) for c in range(N))",
  "",
  "out = []",
  "for _ in range(T):",
  "    if solve():",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "vector<string> rot90(const vector<string>& g) {",
  "    int R = g.size();",
  "    int C = g[0].size();",
  "    vector<string> r(C, string(R, '.'));",
  "    for (int i = 0; i < R; i++)",
  "        for (int j = 0; j < C; j++)",
  "            r[j][R - 1 - i] = g[i][j];",
  "    return r;",
  "}",
  "",
  "bool solve() {",
  "    int N;",
  "    cin >> N;",
  "    vector<string> canvas(N);",
  "    for (auto& row : canvas) {",
  "        cin >> row;",
  "    }",
  "    int K;",
  "    cin >> K;",
  "    vector<string> stamp(K);",
  "    for (auto& row : stamp) {",
  "        cin >> row;",
  "    }",
  "    vector<vector<string>> rots = { stamp };",
  "    for (int i = 0; i < 3; i++) {",
  "        rots.push_back(rot90(rots.back()));",
  "    }",
  "    vector<vector<bool>> covered(N, vector<bool>(N, false));",
  "    for (auto& rot : rots) {",
  "        for (int r = 0; r + K <= N; r++) {",
  "            for (int c = 0; c + K <= N; c++) {",
  "                bool ok = true;",
  "                for (int dr = 0; dr < K && ok; dr++)",
  "                    for (int dc = 0; dc < K && ok; dc++)",
  "                        if (rot[dr][dc] == '*' && canvas[r + dr][c + dc] != '*') {",
  "                            ok = false;",
  "                        }",
  "                if (!ok) {",
  "                    continue;",
  "                }",
  "                for (int dr = 0; dr < K; dr++)",
  "                    for (int dc = 0; dc < K; dc++)",
  "                        if (rot[dr][dc] == '*') {",
  "                            covered[r + dr][c + dc] = true;",
  "                        }",
  "            }",
  "        }",
  "    }",
  "    for (int r = 0; r < N; r++)",
  "        for (int c = 0; c < N; c++)",
  "            if (!covered[r][c] && canvas[r][c] == '*') {",
  "                return false;",
  "            }",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int _t = 0; _t < T; _t++) {",
  "        const char* ans;",
  "        if (solve()) {",
  "            ans = \"YES\";",
  "        } else {",
  "            ans = \"NO\";",
  "        }",
  "        cout << ans << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getStampGridSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "The answer is YES or NO — can we recreate the pattern?\nThe grid is small, so trying every rotation and position\nis still fast enough.\nSo we rotate the stamp 4 ways, try every position, and\ncheck: does it cover every ★ without landing outside?",
          "답은 테스트마다 무늬를 만들 수 있는지 YES 나 NO 예요.\n격자가 작아서 회전과 자리를 다 해봐도 충분히 빨라요.\n그래서 도장을 4방향으로 돌려 자리마다 찍어 보면서,\n★ 을 벗어나지 않고 전부 덮이는지 확인해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector> …).\n그래야 코드가 무엇을 하려는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 을 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function StampGridProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고
   beats(설명 말풍선)만 덧붙인다. getStampGridSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getStampGridWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "canvas", ko: "찍어야 할 목표 무늬", en: "the target pattern to recreate" },
        { v: "rots", ko: "도장의 4가지 회전", en: "the stamp's 4 rotations" },
        { v: "covered", ko: "지금까지 도장이 덮은 칸", en: "cells the stamp has covered so far" },
      ],
      beats: [
        { hi: [4, 12], bubble: t(E,
          "What do we hand back? YES/NO per test case — can every ★ be recreated? We'll need to rotate the stamp 4 ways, so build a 90°-rotation helper first: read it column by column, from the bottom row up.",
          "무엇을 내놓아야 하나요? 케이스마다 무늬를 다시 만들 수 있는지 YES/NO 예요.\n도장을 4방향으로 돌려야 하니, 90도 회전 도우미부터 만들어요 — 맨 아래 행부터 위로, 열 방향으로 읽어요.") },
        { hi: [15, 26], bubble: t(E,
          "Read this case's canvas, then the stamp shape.",
          "이번 케이스의 캔버스를 읽고, 도장 모양도 읽어요.") },
        { hi: [27, 30], bubble: t(E,
          "Build all 4 rotations of the stamp by rotating 3 more times.",
          "도장을 3번 더 돌려서 4가지 회전을 모두 만들어요.") },
        { hi: [32, 43], bubble: t(E,
          "For every rotation, try every top-left position it could land on. A position is only legal if every stamped ★ lands on a canvas ★ — one mismatch stops the check early.",
          "회전마다, 도장을 놓을 수 있는 모든 왼쪽 위 자리를 시도해요.\n찍히는 ★ 이 전부 캔버스의 ★ 위에 떨어져야만 자리가 맞아요 — 하나라도 어긋나면 바로 멈춰요.") },
        { hi: [44, 51], bubble: t(E,
          "If the position is legal, mark every cell the stamp would color as covered.",
          "자리가 맞으면, 도장이 칠할 칸을 전부 covered 로 표시해요.") },
        { hi: [52, 58], bubble: t(E,
          "The pattern is reachable only if every ★ in the canvas ended up covered.",
          "캔버스의 ★ 이 전부 covered 로 표시됐을 때만 그 무늬를 만들 수 있어요.") },
        { hi: [60, 73], bubble: t(E,
          "Read T, run solve() for each test case, and print YES or NO.",
          "T 를 읽고 케이스마다 solve() 를 돌려 YES 또는 NO 를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "canvas", ko: "찍어야 할 목표 무늬", en: "the target pattern to recreate" },
      { v: "rotations", ko: "도장의 4가지 회전", en: "the stamp's 4 rotations" },
      { v: "covered", ko: "지금까지 도장이 덮은 칸", en: "cells the stamp has covered so far" },
    ],
    beats: [
      { hi: [0, 7], bubble: t(E,
        "What do we hand back? YES or NO per test case — can the stamp recreate the pattern? read_line() skips the blank lines between cases, so we always get real input.",
        "무엇을 내놓아야 하나요? 케이스마다 무늬를 다시 만들 수 있는지 YES/NO 예요.\nread_line() 은 케이스 사이 빈 줄을 건너뛰어서, 항상 진짜 입력을 받아요.") },
      { hi: [9, 11], bubble: t(E,
        "A helper to rotate a grid 90°: read it column by column, from the bottom row up.",
        "격자를 90도 돌리는 도우미예요 — 맨 아래 행부터 위로, 열 방향으로 읽어요.") },
      { hi: [13, 20], bubble: t(E,
        "solve() reads one case: the canvas, then the stamp, and builds all 4 rotations by rotating 3 more times.",
        "solve() 는 케이스 하나를 읽어요 — 캔버스, 도장, 그리고 3번 더 돌려서 4가지 회전을 만들어요.") },
      { hi: [21, 34], bubble: t(E,
        "For every rotation, try every top-left position it could land on. A position is only legal if every stamped ★ lands on a canvas ★ — one mismatch stops the check early.",
        "회전마다, 도장을 놓을 수 있는 모든 왼쪽 위 자리를 시도해요.\n찍히는 ★ 이 전부 캔버스의 ★ 위에 떨어져야만 자리가 맞아요 — 하나라도 어긋나면 바로 멈춰요.") },
      { hi: [35, 38], bubble: t(E,
        "If the position is legal, mark every cell the stamp would color as covered.",
        "자리가 맞으면, 도장이 칠할 칸을 전부 covered 로 표시해요.") },
      { hi: [39, 39], bubble: t(E,
        "The pattern is reachable only if every ★ in the canvas ended up covered.",
        "캔버스의 ★ 이 전부 covered 로 표시됐을 때만 그 무늬를 만들 수 있어요.") },
      { hi: [41, 47], bubble: t(E,
        "Run solve() for each test case and collect YES/NO, then print them all.",
        "케이스마다 solve() 를 돌려 YES/NO 를 모으고, 한 번에 출력해요.") },
    ],
  };
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


export function downloadStampGridPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "StampGrid — Full Study Guide", "StampGrid — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
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

