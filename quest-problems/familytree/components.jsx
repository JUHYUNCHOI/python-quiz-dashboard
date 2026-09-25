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
          {t(E, "🌳 Pick two cows — watch the LCA walk up", "🌳 두 소를 고르면 공통 조상까지 걸어 올라가요")}
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
              `공통 조상 = ${lca} · X 는 ${pathX.length - 1}칸, Y 는 ${pathY.length - 1}칸 올라갔어요`)}
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
  "    if (depth == 1) {",
  "        return \"mother\";",
  "    }",
  "    if (depth == 2) {",
  "        return \"grand-mother\";",
  "    }",
  "    string s = \"great-\";",
  "    for (int k = 0; k < depth - 3; k++) {",
  "        s += \"great-\";",
  "    }",
  "    return s + \"grand-mother\";",
  "}",
  "",
  "string aunt_name(int depth_diff) {",
  "    if (depth_diff == 1) {",
  "        return \"aunt\";",
  "    }",
  "    string s = \"great-\";",
  "    for (int k = 0; k < depth_diff - 2; k++) {",
  "        s += \"great-\";",
  "    }",
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
  "    int dA = -1;",
  "    int dB = -1;",
  "    for (int i = 0; i < (int)chain_A.size() && lca.empty(); i++) {",
  "        for (int j = 0; j < (int)chain_B.size(); j++) {",
  "            if (chain_A[i] == chain_B[j]) {",
  "                lca = chain_A[i];",
  "                dA = i;",
  "                dB = j;",
  "                break;",
  "            }",
  "        }",
  "    }",
  "    string answer;",
  "    if (lca.empty()) {",
  "        answer = \"NOT RELATED\";",
  "    }",
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
        t(E,
          "What should we print? The family relationship between cows A and B.\nThat relationship depends on their nearest shared ancestor.\nSo follow each cow's mother-chain all the way up, find the first\nancestor the two chains share, and use the distances to name it.",
          "무엇을 출력해야 하나요? 소 A 와 B 의 가계 관계 이름이에요.\n관계는 둘의 가장 가까운 공통 조상으로 정해져요.\n그래서 A, B 각각 엄마 쪽으로 끝까지 올라가 조상 목록을 만들고,\n두 목록에서 처음 겹치는 조상을 찾아 그 거리로 관계를 가려요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더(<iostream>, <vector> …)만 적으면 코드가 뭘 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 을 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function FamilyTreeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ── CodeWalk (선생님 2026-07-14: "앞으로 코드는 모두 이런식으로") ──
   FULL_PY / FULL_CPP 는 위에서 한 글자도 안 바뀐다 — beats 는 그 배열의
   줄 번호(hi:[lo,hi], 0-based, 양끝 포함)만 가리킨다. */
export function getFamilyTreeWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "parent", ko: "자식 → 엄마 사전", en: "child → mother lookup" },
        { v: "chain_A / chain_B", ko: "A·B 각각의 조상 목록(자기 포함)", en: "A's / B's ancestor list, including themselves" },
        { v: "dA / dB", ko: "공통 조상까지 올라간 칸 수", en: "steps up to the shared ancestor" },
      ],
      beats: [
        { hi: [0, 6], bubble: t(E,
          "What should we print? The family relationship between cows A and B. We'll need two naming helpers to build that answer, so prepare them first.",
          "무엇을 출력해야 하나요? 소 A와 B의 가계 관계 이름이에요.\n그 이름을 만들 때 쓸 도우미 함수 둘을 먼저 준비해요.") },
        { hi: [8, 20], bubble: t(E,
          "ancestor_name(depth) turns 'how many steps up' into a word: 1 step is mother, 2 is grand-mother, and each step beyond that adds another great-.",
          "ancestor_name(depth)는 몇 칸 위 조상인지를 이름으로 바꿔요 — 1이면 mother, 2면 grand-mother, 그보다 많으면 great-를 그만큼 붙여요.") },
        { hi: [22, 31], bubble: t(E,
          "aunt_name works the same way for aunts: 1 step over is aunt, further is great-aunt, great-great-aunt, ...",
          "aunt_name도 같은 방식이에요 — 1칸 차이면 aunt, 그보다 멀면 great-를 붙여요.") },
        { hi: [33, 46], bubble: t(E,
          "Now in main, read the cow count N and the two names A, B, then store every mother-child pair in parent.",
          "이제 main에서 소 수 N과 두 소 이름 A, B를 읽고, 엄마-자식 쌍을 parent에 저장해요.") },
        { hi: [47, 61], bubble: t(E,
          "The relationship depends on A and B's nearest shared ancestor. So follow each cow's mother-chain all the way up, building chain_A and chain_B.",
          "관계는 A와 B의 가장 가까운 공통 조상으로 정해져요.\n그러니 A, B 각각 엄마 쪽으로 끝까지 올라가며 조상 목록 chain_A, chain_B를 만들어요.") },
        { hi: [62, 75], bubble: t(E,
          "Compare the two chains and find the first ancestor they share — that's the closest one. dA and dB record how many steps each cow took to reach it.",
          "두 목록을 대조해서 가장 먼저 만나는 공통 조상을 찾아요 — 그게 lca예요.\n그때까지 A, B가 각각 몇 칸 올라갔는지가 dA, dB예요.") },
        { hi: [76, 79], bubble: t(E,
          "No shared ancestor at all means the two cows aren't related.",
          "공통 조상이 아예 없으면 두 소는 관계가 없어요.") },
        { hi: [80, 82], bubble: t(E,
          "If both are 0 steps from the shared ancestor, that ancestor is a parent they both have — siblings. If only one is 0 steps, that cow IS the other's direct ancestor.",
          "둘 다 0칸이면(부모가 같으면) 자매, 한쪽만 0칸이면 그 소가 다른 쪽의 직계 조상이에요.") },
        { hi: [83, 86], bubble: t(E,
          "Both 1 step away (a shared grandparent) is also siblings; one at 1 step is an aunt relationship. Anything else left is cousins.",
          "둘 다 1칸(같은 할머니)이어도 자매, 한쪽만 1칸이면 이모(고모) 관계예요.\n나머지는 전부 사촌이에요.") },
        { hi: [87, 89], bubble: t(E,
          "Write the answer to the output file.",
          "답을 출력 파일에 써요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "parent", ko: "자식 → 엄마 사전", en: "child → mother lookup" },
      { v: "chain_A / chain_B", ko: "A·B 각각의 조상 목록(자기 포함)", en: "A's / B's ancestor list, including themselves" },
      { v: "depth_A / depth_B", ko: "공통 조상까지 올라간 칸 수", en: "steps up to the shared ancestor" },
    ],
    beats: [
      { hi: [0, 8], bubble: t(E,
        "What should we print? The family relationship between cows A and B. Read the cow count N and their two names.",
        "무엇을 출력해야 하나요? 소 A와 B의 가계 관계 이름이에요.\n먼저 소 수 N과 두 소 이름 A, B를 읽어요.") },
      { hi: [10, 16], bubble: t(E,
        "To trace relationships we need to know who's whose mother — so store every mother-child pair in parent.",
        "관계를 알려면 누가 누구의 엄마인지 필요해요.\n그래서 줄마다 엄마-자식 쌍을 parent 사전에 저장해요.") },
      { hi: [18, 23], bubble: t(E,
        "The relationship depends on A and B's nearest shared ancestor. So follow A's mother-chain all the way up, collecting ancestors into chain_A.",
        "관계는 A와 B의 가장 가까운 공통 조상으로 정해져요.\n그러니 A부터 엄마 쪽으로 끝까지 올라가며 조상 목록 chain_A를 만들어요.") },
      { hi: [25, 30], bubble: t(E,
        "Do the same for B, building chain_B.",
        "B도 똑같이 조상 목록 chain_B를 만들어요.") },
      { hi: [32, 44], bubble: t(E,
        "Compare the two chains and find the first ancestor they share — that's the closest one. depth_A and depth_B record how many steps each cow took to reach it.",
        "두 목록을 대조해서 가장 먼저 만나는 공통 조상을 찾아요 — 그게 lca예요.\n그때까지 A, B가 각각 몇 칸 올라갔는지가 depth_A, depth_B예요.") },
      { hi: [46, 55], bubble: t(E,
        "ancestor_name(depth) turns 'how many steps up' into a word: 1 step is mother, 2 is grand-mother, and each step beyond that adds another great-.",
        "ancestor_name(depth)는 몇 칸 위 조상인지를 이름으로 바꿔요 — 1이면 mother, 2면 grand-mother, 그보다 많으면 great-를 그만큼 붙여요.") },
      { hi: [57, 64], bubble: t(E,
        "aunt_name works the same way for aunts: 1 step over is aunt, further is great-aunt, great-great-aunt, ...",
        "aunt_name도 같은 방식이에요 — 1칸 차이면 aunt, 그보다 멀면 great-를 붙여요.") },
      { hi: [66, 75], bubble: t(E,
        "No shared ancestor at all means not related. If both are 0 steps away, that shared ancestor is a parent they both have — siblings. If only one is 0 steps, that cow IS the other's direct ancestor.",
          "공통 조상이 아예 없으면 관계가 없어요.\n둘 다 0칸이면(부모가 같으면) 자매, 한쪽만 0칸이면 그 소가 다른 쪽의 직계 조상이에요.") },
      { hi: [76, 84], bubble: t(E,
        "Both 1 step away (a shared grandparent) is also siblings; one at 1 step is an aunt relationship. Anything else left is cousins.",
        "둘 다 1칸(같은 할머니)이어도 자매, 한쪽만 1칸이면 이모(고모) 관계예요.\n나머지는 전부 사촌이에요.") },
      { hi: [86, 87], bubble: t(E,
        "Write the answer to the output file.",
        "답을 출력 파일에 써요.") },
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


export function downloadFamilyTreePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장'을 선택해요.")}</div>
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

