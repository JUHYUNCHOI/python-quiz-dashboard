import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#eab308";

const CHS_SAMPLE = ["2 5", "0 0 0", "1 1 1", "0 1 0", "1 0 0", "1 1 0"];

/* ════════════════════════════════════════════════════════════════════
   CheeseSimulator — N=2 cube, click to carve, see live counts.
   ════════════════════════════════════════════════════════════════════ */
export function CheeseSimulator({ E }) {
  const N = 2;
  const [carved, setCarved] = useState(new Set());

  const toggle = (x, y, z) => {
    const key = `${x},${y},${z}`;
    const next = new Set(carved);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCarved(next);
  };

  // Compute valid placements
  let validZ = 0, validY = 0, validX = 0;
  for (let a = 0; a < N; a++) {
    for (let b = 0; b < N; b++) {
      let cz = 0, cy = 0, cx = 0;
      for (let k = 0; k < N; k++) {
        if (carved.has(`${a},${b},${k}`)) cz++;
        if (carved.has(`${a},${k},${b}`)) cy++;
        if (carved.has(`${k},${a},${b}`)) cx++;
      }
      if (cz === N) validZ++;
      if (cy === N) validY++;
      if (cx === N) validX++;
    }
  }
  const total = validZ + validY + validX;

  const reset = () => setCarved(new Set());

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: C.dim }}>
          {t(E, `2×2×2 cube — click to carve. ${carved.size} carved.`, `2×2×2 큐브 — 클릭해서 파내기. ${carved.size} 칸 파임.`)}
        </div>
        <button onClick={reset} style={{
          padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", cursor: "pointer", color: C.text,
        }}>{t(E, "Reset", "리셋")}</button>
      </div>

      {/* 2 layers (z=0, z=1) shown side by side */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 14 }}>
        {[0, 1].map(z => (
          <div key={z} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>z = {z}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 50px)", gap: 4 }}>
              {[0, 1].flatMap(y => [0, 1].map(x => {
                const key = `${x},${y},${z}`;
                const isCarved = carved.has(key);
                return (
                  <button key={`${x}-${y}-${z}`} onClick={() => toggle(x, y, z)} style={{
                    width: 50, height: 50, padding: 0,
                    background: isCarved ? "#fff" : "#fde047",
                    border: `2px solid ${isCarved ? C.border : "#854d0e"}`,
                    borderRadius: 6, cursor: "pointer",
                    fontSize: 10, color: isCarved ? C.dim : "#854d0e", fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    {isCarved ? "·" : "🧀"}
                    <div style={{ fontSize: 8, marginTop: 2 }}>({x},{y})</div>
                  </button>
                );
              }))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
        {[
          { label: "X-axis", val: validX, color: "#dc2626" },
          { label: "Y-axis", val: validY, color: "#16a34a" },
          { label: "Z-axis", val: validZ, color: "#0891b2" },
        ].map((axis, i) => (
          <div key={i} style={{
            background: "#fff", border: `2px solid ${axis.color}`, borderRadius: 8, padding: "8px 10px", textAlign: "center",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: axis.color }}>{axis.label}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: axis.color, marginTop: 2 }}>{axis.val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", textAlign: "center", fontSize: 14, fontWeight: 800 }}>
        {t(E, `Total valid placements: ${total}`, `총 유효 자리: ${total}`)}
      </div>
    </div>
  );
}

export function CheeseSim({ E }) { return <CheeseSimulator E={E} />; }
export function CheeseRunner({ E }) {
  return <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
    {t(E, "Use the simulator above.", "위 시뮬레이터 사용.")}
  </div>;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 4 sections.
   ════════════════════════════════════════════════════════════════════ */

const CHS_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "Q = int(data[p]); p += 1",
];
const CHS_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q;",
  "    cin >> N >> Q;",
];

const CHS_S2_PY = [
  "# Three N x N count grids — one per axis.",
  "# cz[x][y] = # carved cells in column (x, y, z) over z = 0..N-1",
  "# cy[x][z] = # carved cells in row    (x, y, z) over y = 0..N-1",
  "# cx[y][z] = # carved cells in row    (x, y, z) over x = 0..N-1",
  "cz = [[0] * N for _ in range(N)]",
  "cy = [[0] * N for _ in range(N)]",
  "cx = [[0] * N for _ in range(N)]",
  "carved = set()",
  "valid = 0",
];
const CHS_S2_CPP = [
  "    vector<vector<int>> cz(N, vector<int>(N, 0));",
  "    vector<vector<int>> cy(N, vector<int>(N, 0));",
  "    vector<vector<int>> cx(N, vector<int>(N, 0));",
  "    set<tuple<int, int, int>> carved;",
  "    long long valid = 0;",
];

const CHS_S3_PY = [
  "# Each carve increments 3 row counters (one per axis).",
  "# When a counter hits N, a valid rod placement appears.",
  "for _ in range(Q):",
  "    x = int(data[p]); p += 1",
  "    y = int(data[p]); p += 1",
  "    z = int(data[p]); p += 1",
  "    if (x, y, z) in carved:",
  "        print(valid)",
  "        continue",
  "    carved.add((x, y, z))",
  "    cz[x][y] += 1",
  "    if cz[x][y] == N: valid += 1",
  "    cy[x][z] += 1",
  "    if cy[x][z] == N: valid += 1",
  "    cx[y][z] += 1",
  "    if cx[y][z] == N: valid += 1",
  "    print(valid)",
];
const CHS_S3_CPP = [
  "    while (Q--) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "        auto key = make_tuple(x, y, z);",
  "        if (carved.count(key)) {",
  "            cout << valid << '\\n';",
  "            continue;",
  "        }",
  "        carved.insert(key);",
  "        if (++cz[x][y] == N) valid++;",
  "        if (++cy[x][z] == N) valid++;",
  "        if (++cx[y][z] == N) valid++;",
  "        cout << valid << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

const CHS_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "Q = int(data[p]); p += 1",
  "",
  "cz = [[0] * N for _ in range(N)]",
  "cy = [[0] * N for _ in range(N)]",
  "cx = [[0] * N for _ in range(N)]",
  "carved = set()",
  "valid = 0",
  "",
  "for _ in range(Q):",
  "    x = int(data[p]); p += 1",
  "    y = int(data[p]); p += 1",
  "    z = int(data[p]); p += 1",
  "    if (x, y, z) in carved:",
  "        print(valid)",
  "        continue",
  "    carved.add((x, y, z))",
  "    cz[x][y] += 1",
  "    if cz[x][y] == N: valid += 1",
  "    cy[x][z] += 1",
  "    if cy[x][z] == N: valid += 1",
  "    cx[y][z] += 1",
  "    if cx[y][z] == N: valid += 1",
  "    print(valid)",
];
const CHS_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "#include <tuple>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "",
  "    vector<vector<int>> cz(N, vector<int>(N, 0));",
  "    vector<vector<int>> cy(N, vector<int>(N, 0));",
  "    vector<vector<int>> cx(N, vector<int>(N, 0));",
  "    set<tuple<int, int, int>> carved;",
  "    long long valid = 0;",
  "",
  "    while (Q--) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "        auto key = make_tuple(x, y, z);",
  "        if (carved.count(key)) {",
  "            cout << valid << '\\n';",
  "            continue;",
  "        }",
  "        carved.insert(key);",
  "        if (++cz[x][y] == N) valid++;",
  "        if (++cy[x][z] == N) valid++;",
  "        if (++cx[y][z] == N) valid++;",
  "        cout << valid << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getCheeseSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N and Q", "1️⃣ N 과 Q 읽기"),
      color: A,
      py: CHS_S1_PY, cpp: CHS_S1_CPP,
      why: [
        t(E, "First line: N (cube size) and Q (number of carves).",
            "첫 줄: N (큐브 크기) 와 Q (파낼 횟수)."),
      ],
      aside: <SampleInputAside E={E} sample={CHS_SAMPLE} highlight={[0]} note={t(E,
        "First line: \"2 5\" (N=2, Q=5).",
        "첫 줄: \"2 5\" (N=2, Q=5).")} />,
    },
    {
      label: t(E, "2️⃣ Three N×N row counters + carved set", "2️⃣ N×N 카운터 3 개 + carved 집합"),
      color: "#0891b2",
      py: CHS_S2_PY, cpp: CHS_S2_CPP,
      why: [
        t(E, "For each axis (X, Y, Z), maintain an N×N grid of counts. Each grid entry tracks how many cells in that 'row' have been carved.",
            "각 축 (X, Y, Z) 마다 N×N count 격자. 각 항목은 그 row 에서 몇 칸이 파였는지."),
        t(E, "carved set tracks (x, y, z) triples to skip duplicate carves.",
            "carved 집합은 (x, y, z) 추적해 중복 파내기 방지."),
        t(E, "When a counter reaches N, ALL N cells in that row are empty → a valid rod fits there.",
            "counter 가 N 도달 → 그 row 의 N 칸 전부 비어있음 → 막대 자리 1 개 추가."),
      ],
    },
    {
      label: t(E, "3️⃣ Process each carve incrementally", "3️⃣ 각 파내기 점진적 처리"),
      color: "#16a34a",
      py: CHS_S3_PY, cpp: CHS_S3_CPP,
      why: [
        t(E, "For each (x, y, z): if already carved, no-op (output current valid). Otherwise add to carved.",
            "(x, y, z) 마다: 이미 파였으면 그대로. 아니면 carved 에 추가."),
        t(E, "Increment cz[x][y], cy[x][z], cx[y][z]. Check each: if just hit N, valid++.",
            "cz[x][y], cy[x][z], cx[y][z] 증가. 각각 N 도달 체크 → valid++."),
        t(E, "Output running valid count.",
            "누적 valid 수 출력."),
      ],
    },
    {
      label: t(E, "4️⃣ Full code", "4️⃣ 전체 코드"),
      color: "#dc2626",
      py: CHS_FULL_PY, cpp: CHS_FULL_CPP,
      why: [
        t(E, "All pieces wired together. Each update is O(1) after the initial O(N²) grid alloc.",
            "조각들이 합쳐짐. 초기 O(N²) 할당 후 update 마다 O(1)."),
        t(E, "Total: O(N² + Q). At N = 1000, Q = 2·10⁵ → 1.2 million ops. Fast.",
            "총: O(N² + Q). N = 1000, Q = 2·10⁵ → 120 만 ops. 빠름."),
      ],
    },
  ];
}

export function CheeseProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* PDF helpers */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","set"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair","set","tuple","make_tuple"];
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadCheesePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cheese Block — Full Study Guide", "🧀 Cheese Block — 종합 풀이 노트");
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
<div class="sub">USACO December 2024 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>${t(E, "Code (4 sections)", "코드 (4 섹션)")}</h2>
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
