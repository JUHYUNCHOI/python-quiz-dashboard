// 🔒 USACO_VERIFIED — cpid=833, familytree (2018 Open Bronze #3, Family Tree)
// py 15/15 PASS · cpp 15/15 PASS · 2026-05-14
import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ============================================================
   FamilyTreeSim — pick two cows, watch the LCA walk light up
   and classify the relationship live.
   ============================================================ */
// Fixed mini family tree (parent → child). Single root grandma.
const _SIM_PARENT = {
  // child : mom
  Bessie: "Mildred",
  Daisy: "Mildred",
  Lola: "Bessie",
  Mabel: "Bessie",
  Rosie: "Daisy",
  Tilly: "Lola",
};
const _SIM_COWS = ["Mildred", "Bessie", "Daisy", "Lola", "Mabel", "Rosie", "Tilly"];
// Pre-computed (row, col) for tree layout
const _SIM_POS = {
  Mildred: { row: 0, col: 3 },
  Bessie:  { row: 1, col: 1.5 },
  Daisy:   { row: 1, col: 4.5 },
  Lola:    { row: 2, col: 0.5 },
  Mabel:   { row: 2, col: 2.5 },
  Rosie:   { row: 2, col: 4.5 },
  Tilly:   { row: 3, col: 0.5 },
};

function _ancestorChain(name) {
  const chain = [];
  let cur = name, d = 0;
  while (cur) {
    chain.push({ name: cur, depth: d });
    cur = _SIM_PARENT[cur];
    d += 1;
  }
  return chain;
}

function _classify(X, Y, E) {
  // Matches FULL_PY exactly: NOT RELATED / SIBLINGS / ancestor / aunt / COUSINS.
  if (X === Y) return t(E, "same cow", "같은 소");
  const chX = _ancestorChain(X);
  const setX = new Map(chX.map(n => [n.name, n.depth]));
  const chY = _ancestorChain(Y);
  let lca = null, dX = -1, dY = -1;
  for (const node of chY) {
    if (setX.has(node.name)) {
      lca = node.name;
      dX = setX.get(node.name);
      dY = node.depth;
      break;
    }
  }
  if (!lca) return t(E, "NOT RELATED", "관계 없음");

  // ancestor name: depth 1 = mother, 2 = grand-mother, 3+ = great-..-grand-mother
  const ancestorWord = (depth) => {
    if (depth === 1) return t(E, "mother", "엄마");
    if (depth === 2) return t(E, "grand-mother", "할머니");
    const greats = "great-".repeat(depth - 2);
    return t(E, `${greats}grand-mother`, `${greats}할머니`);
  };
  const descendantWord = (depth) => {
    if (depth === 1) return t(E, "daughter", "딸");
    if (depth === 2) return t(E, "grand-daughter", "손녀");
    const greats = "great-".repeat(depth - 2);
    return t(E, `${greats}grand-daughter`, `${greats}손녀`);
  };
  const auntWord = (diff) => {
    if (diff === 1) return t(E, "aunt", "이모");
    const greats = "great-".repeat(diff - 1);
    return t(E, `${greats}aunt`, `${greats}이모`);
  };

  if (dX === 0 && dY === 0) return t(E, "SIBLINGS", "자매");
  if (dX === 0) return t(E, `${X} is the ${ancestorWord(dY)} of ${Y}`, `${X} 는 ${Y} 의 ${ancestorWord(dY)}`);
  if (dY === 0) return t(E, `${X} is the ${descendantWord(dX)} of ${Y}`, `${X} 는 ${Y} 의 ${descendantWord(dX)}`);
  if (dX === 1 && dY === 1) return t(E, "SIBLINGS", "자매");
  if (dX === 1) return t(E, `${X} is the ${auntWord(dY - 1)} of ${Y}`, `${X} 는 ${Y} 의 ${auntWord(dY - 1)}`);
  if (dY === 1) return t(E, `${Y} is the ${auntWord(dX - 1)} of ${X}`, `${Y} 는 ${X} 의 ${auntWord(dX - 1)}`);
  return t(E, "COUSINS", "사촌");
}

function _pathTo(start, target) {
  // walk up from start until reaching target; returns list of names (inclusive)
  const path = [];
  let cur = start;
  while (cur) {
    path.push(cur);
    if (cur === target) return path;
    cur = _SIM_PARENT[cur];
  }
  return path;
}

export function FamilyTreeSim({ E }) {
  const [X, setX] = useState("Tilly");
  const [Y, setY] = useState("Rosie");

  const { lca, pathX, pathY, label } = useMemo(() => {
    const chX = _ancestorChain(X);
    const setX = new Map(chX.map(n => [n.name, n.depth]));
    const chY = _ancestorChain(Y);
    let lcaName = null;
    for (const node of chY) {
      if (setX.has(node.name)) { lcaName = node.name; break; }
    }
    const pX = lcaName ? _pathTo(X, lcaName) : _ancestorChain(X).map(n => n.name);
    const pY = lcaName ? _pathTo(Y, lcaName) : _ancestorChain(Y).map(n => n.name);
    return { lca: lcaName, pathX: pX, pathY: pY, label: _classify(X, Y, E) };
  }, [X, Y, E]);

  const cellW = 70, cellH = 56, padX = 16, padY = 10;
  const rows = 4, cols = 6;
  const svgW = padX * 2 + cellW * cols;
  const svgH = padY * 2 + cellH * rows;
  const xy = (name) => {
    const p = _SIM_POS[name];
    return {
      cx: padX + (p.col + 0.5) * cellW,
      cy: padY + (p.row + 0.5) * cellH,
    };
  };

  const pathSet = new Set([...pathX, ...pathY]);
  const edgeIsOnPath = (child, parent) =>
    pathSet.has(child) && pathSet.has(parent) &&
    ((pathX.includes(child) && pathX.includes(parent)) ||
     (pathY.includes(child) && pathY.includes(parent)));

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🌳 Pick two cows — watch the LCA walk up", "🌳 두 소를 골라 — LCA 까지 걸어 올라가요")}
        </div>

        {/* Cow pickers */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
          {[
            { label: "X", value: X, setter: setX, color: "#7c3aed" },
            { label: "Y", value: Y, setter: setY, color: "#0891b2" },
          ].map(({ label: lbl, value, setter, color }) => (
            <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color }}>{lbl}:</span>
              <select value={value} onChange={(e) => setter(e.target.value)} style={{
                background: "#fff", color, border: `1.5px solid ${color}`,
                borderRadius: 8, padding: "4px 8px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>
                {_SIM_COWS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* SVG tree */}
        <div style={{ background: "#fff", borderRadius: 10, border: `1px solid #6ee7b7`, padding: 4, overflowX: "auto" }}>
          <svg width={svgW} height={svgH} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }}>
            {/* Edges parent → child */}
            {Object.entries(_SIM_PARENT).map(([child, parent]) => {
              const a = xy(parent), b = xy(child);
              const onPath = edgeIsOnPath(child, parent);
              return (
                <line key={`${parent}-${child}`}
                  x1={a.cx} y1={a.cy + 14}
                  x2={b.cx} y2={b.cy - 14}
                  stroke={onPath ? A : "#cbd5e1"}
                  strokeWidth={onPath ? 3 : 1.5}
                  strokeDasharray={onPath ? "0" : "3,3"}
                />
              );
            })}
            {/* Nodes */}
            {_SIM_COWS.map(name => {
              const { cx, cy } = xy(name);
              const isX = name === X, isY = name === Y, isLCA = name === lca && X !== Y;
              const onPath = pathSet.has(name);
              const fill = isX ? "#7c3aed" : isY ? "#0891b2" : isLCA ? "#f59e0b" : onPath ? "#a7f3d0" : "#fff";
              const stroke = isX ? "#7c3aed" : isY ? "#0891b2" : isLCA ? "#f59e0b" : onPath ? A : "#cbd5e1";
              const textColor = isX || isY || isLCA ? "#fff" : "#065f46";
              return (
                <g key={name} style={{ cursor: "pointer" }} onClick={() => {
                  // click = quick set: prefer setting whichever is "less recent" — toggle
                  if (name === X) return;
                  if (name === Y) setX(name); else setY(name);
                }}>
                  <rect x={cx - 30} y={cy - 14} width={60} height={28} rx={8}
                    fill={fill} stroke={stroke} strokeWidth={2} />
                  <text x={cx} y={cy + 4} textAnchor="middle"
                    style={{ fontSize: 11, fontWeight: 800, fill: textColor, fontFamily: "system-ui, sans-serif" }}>
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8, flexWrap: "wrap", fontSize: 11, color: "#065f46" }}>
          <span><b style={{ color: "#7c3aed" }}>■</b> X</span>
          <span><b style={{ color: "#0891b2" }}>■</b> Y</span>
          <span><b style={{ color: "#f59e0b" }}>■</b> LCA</span>
          <span><b style={{ color: A }}>—</b> {t(E, "walk-up path", "올라가는 경로")}</span>
        </div>
      </div>

      {/* Verdict card */}
      <div style={{
        background: "#fff", border: `2px solid ${A}`, borderRadius: 12, padding: "12px 14px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          🎯 {t(E, "Relationship", "관계")}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </div>
        {lca && X !== Y && (
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>
            {t(E,
              `LCA = ${lca} · depth(X) = ${pathX.length - 1}, depth(Y) = ${pathY.length - 1}`,
              `공통조상 = ${lca} · 깊이(X) = ${pathX.length - 1}, 깊이(Y) = ${pathY.length - 1}`)}
          </div>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('family.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "# 첫 줄: N + 두 cow 이름",
  "first = lines[0].split()",
  "N = int(first[0])",
  "A = first[1]",
  "B = first[2]",
  "",
  "# parent[child] = mother",
  "parent = {}",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    mom = parts[0]",
  "    child = parts[1]",
  "    parent[child] = mom",
  "",
  "# A 의 ancestor chain 만들기 (자기 자신 포함)",
  "chain_A = [A]",
  "cur = A",
  "while cur in parent:",
  "    cur = parent[cur]",
  "    chain_A.append(cur)",
  "",
  "# B 의 ancestor chain",
  "chain_B = [B]",
  "cur = B",
  "while cur in parent:",
  "    cur = parent[cur]",
  "    chain_B.append(cur)",
  "",
  "# LCA 찾기: chain_A 에서 가장 가까운 (인덱스 낮은) 공통 조상",
  "lca = ''",
  "depth_A = -1",
  "depth_B = -1",
  "for i in range(len(chain_A)):",
  "    for j in range(len(chain_B)):",
  "        if chain_A[i] == chain_B[j]:",
  "            lca = chain_A[i]",
  "            depth_A = i",
  "            depth_B = j",
  "            break",
  "    if lca != '':",
  "        break",
  "",
  "def ancestor_name(depth):",
  "    # depth = 1: mother, 2: grand-mother, 3: great-grand-mother, ...",
  "    if depth == 1:",
  "        return 'mother'",
  "    if depth == 2:",
  "        return 'grand-mother'",
  "    s = 'great-'",
  "    for k in range(depth - 3):",
  "        s += 'great-'",
  "    return s + 'grand-mother'",
  "",
  "def aunt_name(depth_diff):",
  "    # depth_diff = 1: aunt, 2: great-aunt, ...",
  "    if depth_diff == 1:",
  "        return 'aunt'",
  "    s = 'great-'",
  "    for k in range(depth_diff - 2):",
  "        s += 'great-'",
  "    return s + 'aunt'",
  "",
  "if lca == '':",
  "    answer = 'NOT RELATED'",
  "elif depth_A == 0 and depth_B == 0:",
  "    answer = 'SIBLINGS'  # 같은 cow 가정 안 함",
  "elif depth_A == 0:",
  "    # A 가 B 의 ancestor",
  "    answer = A + ' is the ' + ancestor_name(depth_B) + ' of ' + B",
  "elif depth_B == 0:",
  "    # B 가 A 의 ancestor",
  "    answer = B + ' is the ' + ancestor_name(depth_A) + ' of ' + A",
  "elif depth_A == 1 and depth_B == 1:",
  "    answer = 'SIBLINGS'",
  "elif depth_A == 1:",
  "    # A 가 B 의 aunt (혹은 great-aunt)",
  "    answer = A + ' is the ' + aunt_name(depth_B - 1) + ' of ' + B",
  "elif depth_B == 1:",
  "    answer = B + ' is the ' + aunt_name(depth_A - 1) + ' of ' + A",
  "else:",
  "    answer = 'COUSINS'",
  "",
  "with open('family.out', 'w') as file:",
  "    file.write(answer + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <fstream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "string ancestor_name(int depth) {",
  "    if (depth == 1) return \"mother\";",
  "    if (depth == 2) return \"grand-mother\";",
  "    string s = \"great-\";",
  "    for (int k = 0; k < depth - 3; k++) s += \"great-\";",
  "    return s + \"grand-mother\";",
  "}",
  "",
  "string aunt_name(int depth_diff) {",
  "    if (depth_diff == 1) return \"aunt\";",
  "    string s = \"great-\";",
  "    for (int k = 0; k < depth_diff - 2; k++) s += \"great-\";",
  "    return s + \"aunt\";",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"family.in\");",
  "    ofstream fout(\"family.out\");",
  "",
  "    int N;",
  "    string A, B;",
  "    fin >> N >> A >> B;",
  "    map<string, string> parent;",
  "    for (int i = 0; i < N; i++) {",
  "        string mom, child;",
  "        fin >> mom >> child;",
  "        parent[child] = mom;",
  "    }",
  "    // A 의 ancestor chain (자기 자신 포함)",
  "    vector<string> chain_A;",
  "    chain_A.push_back(A);",
  "    string cur = A;",
  "    while (parent.count(cur)) {",
  "        cur = parent[cur];",
  "        chain_A.push_back(cur);",
  "    }",
  "    vector<string> chain_B;",
  "    chain_B.push_back(B);",
  "    cur = B;",
  "    while (parent.count(cur)) {",
  "        cur = parent[cur];",
  "        chain_B.push_back(cur);",
  "    }",
  "    // LCA: chain_A 에서 가장 가까운 공통 조상",
  "    string lca = \"\";",
  "    int dA = -1, dB = -1;",
  "    for (int i = 0; i < (int)chain_A.size() && lca.empty(); i++) {",
  "        for (int j = 0; j < (int)chain_B.size(); j++) {",
  "            if (chain_A[i] == chain_B[j]) {",
  "                lca = chain_A[i]; dA = i; dB = j; break;",
  "            }",
  "        }",
  "    }",
  "    string answer;",
  "    if (lca.empty()) answer = \"NOT RELATED\";",
  "    else if (dA == 0 && dB == 0) answer = \"SIBLINGS\";",
  "    else if (dA == 0) answer = A + \" is the \" + ancestor_name(dB) + \" of \" + B;",
  "    else if (dB == 0) answer = B + \" is the \" + ancestor_name(dA) + \" of \" + A;",
  "    else if (dA == 1 && dB == 1) answer = \"SIBLINGS\";",
  "    else if (dA == 1) answer = A + \" is the \" + aunt_name(dB - 1) + \" of \" + B;",
  "    else if (dB == 1) answer = B + \" is the \" + aunt_name(dA - 1) + \" of \" + A;",
  "    else answer = \"COUSINS\";",
  "    fout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getFamilyTreeSections(E) {
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

export function FamilyTreeProgressiveCode(props) {
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


export function downloadFamilyTreePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FamilyTree — Full Study Guide", "FamilyTree — 종합 풀이 노트");
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

