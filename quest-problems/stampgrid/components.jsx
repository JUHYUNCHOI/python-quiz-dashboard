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
          {t(E, "🧪 Stamp Simulator — Cover every ★", "🧪 도장 시뮬레이터 — 모든 ★ 덮기")}
        </div>
        <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 10 }}>
          {t(E, "Pick a rotation + top-left, then press Stamp! Yellow ★ must turn green.",
              "회전 + 좌상단 선택 후 도장 찍기! 노란 ★ 가 모두 초록이 되어야 해.")}
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
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700 }}>{t(E, "Rotation:", "회전:")}</span>
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => setRot(i)} style={btn(rot === i)}>{i * 90}°</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700 }}>{t(E, "Row:", "행:")}</span>
            {Array.from({ length: maxRC + 1 }).map((_, i) => (
              <button key={`r${i}`} onClick={() => setPos(p => ({ ...p, r: i }))} style={btn(pos.r === i)}>{i}</button>
            ))}
            <span style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginLeft: 6 }}>{t(E, "Col:", "열:")}</span>
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
            }}>↺ {t(E, "Reset", "초기화")}</button>
          </div>
        </div>

        {/* Status */}
        <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, fontWeight: 700,
          color: bad ? "#dc2626" : (allCovered ? "#059669" : "#92400e") }}>
          {bad
            ? t(E, "❌ Illegal! Stamp's ★ would land outside target ★.", "❌ 불가능! 도장의 ★ 이 비어있는 칸에 찍혀.")
            : (allCovered
                ? t(E, "✅ All target ★ covered — pattern is reachable!", "✅ 모든 ★ 덮음 — 이 패턴은 만들 수 있어!")
                : t(E, "Keep stamping… Yellow ★ still uncovered.", "계속 찍어봐… 노란 ★ 이 아직 남아 있어."))}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "p = 0",
  "T = int(data[p])",
  "p += 1",
  "",
  "def rotate90(grid):",
  "    R, C = len(grid), len(grid[0])",
  "    return [''.join(grid[R - 1 - r][c] for r in range(R)) for c in range(C)]",
  "",
  "def solve():",
  "    global p",
  "    N = int(data[p])",
  "    p += 1",
  "    canvas = [data[p + i] for i in range(N)]",
  "    p += N",
  "    K = int(data[p])",
  "    p += 1",
  "    stamp = [data[p + i] for i in range(K)]",
  "    p += K",
  "    rotations = [stamp]",
  "    for _ in range(3):",
  "        rotations.append(rotate90(rotations[-1]))",
  "    covered = [[False] * N for _ in range(N)]",
  "    for rot in rotations:",
  "        for r in range(N - K + 1):",
  "            for c in range(N - K + 1):",
  "                ok = True",
  "                for dr in range(K):",
  "                    if not ok: break",
  "                    for dc in range(K):",
  "                        if rot[dr][dc] == '*' and canvas[r + dr][c + dc] != '*':",
  "                            ok = False",
  "                            break",
  "                if not ok: continue",
  "                for dr in range(K):",
  "                    for dc in range(K):",
  "                        if rot[dr][dc] == '*':",
  "                            covered[r + dr][c + dc] = True",
  "    return all(covered[r][c] or canvas[r][c] != '*' for r in range(N) for c in range(N))",
  "",
  "out = []",
  "for _ in range(T):",
  "    out.append('YES' if solve() else 'NO')",
  "print(chr(10).join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "vector<string> rot90(const vector<string>& g) {",
  "    int R = g.size(), C = g[0].size();",
  "    vector<string> r(C, string(R, '.'));",
  "    for (int i = 0; i < R; i++)",
  "        for (int j = 0; j < C; j++)",
  "            r[j][R - 1 - i] = g[i][j];",
  "    return r;",
  "}",
  "",
  "bool solve() {",
  "    int N; cin >> N;",
  "    vector<string> canvas(N);",
  "    for (auto& row : canvas) cin >> row;",
  "    int K; cin >> K;",
  "    vector<string> stamp(K);",
  "    for (auto& row : stamp) cin >> row;",
  "    vector<vector<string>> rots = { stamp };",
  "    for (int i = 0; i < 3; i++) rots.push_back(rot90(rots.back()));",
  "    vector<vector<bool>> covered(N, vector<bool>(N, false));",
  "    for (auto& rot : rots) {",
  "        for (int r = 0; r + K <= N; r++) {",
  "            for (int c = 0; c + K <= N; c++) {",
  "                bool ok = true;",
  "                for (int dr = 0; dr < K && ok; dr++)",
  "                    for (int dc = 0; dc < K && ok; dc++)",
  "                        if (rot[dr][dc] == '*' && canvas[r + dr][c + dc] != '*') ok = false;",
  "                if (!ok) continue;",
  "                for (int dr = 0; dr < K; dr++)",
  "                    for (int dc = 0; dc < K; dc++)",
  "                        if (rot[dr][dc] == '*') covered[r + dr][c + dc] = true;",
  "            }",
  "        }",
  "    }",
  "    for (int r = 0; r < N; r++)",
  "        for (int c = 0; c < N; c++)",
  "            if (!covered[r][c] && canvas[r][c] == '*') return false;",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int _t = 0; _t < T; _t++) cout << (solve() ? \"YES\" : \"NO\") << '\\n';",
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
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function StampGridProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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

