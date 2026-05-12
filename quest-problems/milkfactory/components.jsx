import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ================================================================
   Belt-Graph Reachability Sim
   - Student types belt list, picks a candidate station.
   - Sim flows milk from every station along belts and checks if
     all reach the candidate. Auto-detects the central station.
   ================================================================ */
export function MilkFactoryBeltSim({ E }) {
  const [N, setN] = useState(4);
  const [edgesText, setEdgesText] = useState("1 2\n3 2\n4 2");
  const [candidate, setCandidate] = useState(2);

  const parsed = useMemo(() => {
    const lines = edgesText.split(/\n+/).map(s => s.trim()).filter(Boolean);
    const edges = [];
    let bad = false;
    for (const ln of lines) {
      const parts = ln.split(/\s+/).map(Number);
      if (parts.length !== 2 || parts.some(x => !Number.isInteger(x) || x < 1 || x > N)) {
        bad = true; continue;
      }
      edges.push([parts[0], parts[1]]);
    }
    return { edges, bad };
  }, [edgesText, N]);

  // Forward graph: u -> [v]. We want every u to reach `candidate`.
  const reachInfo = useMemo(() => {
    const adj = Array.from({ length: N + 1 }, () => []);
    for (const [a, b] of parsed.edges) adj[a].push(b);
    // For each station, walk forward and see if it lands on candidate.
    const reaches = new Array(N + 1).fill(false);
    for (let s = 1; s <= N; s++) {
      const seen = new Set([s]);
      const stack = [s];
      let ok = (s === candidate);
      while (stack.length && !ok) {
        const u = stack.pop();
        for (const v of adj[u]) {
          if (v === candidate) { ok = true; break; }
          if (!seen.has(v)) { seen.add(v); stack.push(v); }
        }
      }
      reaches[s] = ok;
    }
    const allReach = reaches.slice(1, N + 1).every(Boolean);

    // Find any station that all others reach (the "central" one).
    let answer = -1;
    for (let c = 1; c <= N; c++) {
      let all = true;
      for (let s = 1; s <= N; s++) {
        if (s === c) continue;
        const seen = new Set([s]);
        const stack = [s];
        let ok = false;
        while (stack.length && !ok) {
          const u = stack.pop();
          for (const v of adj[u]) {
            if (v === c) { ok = true; break; }
            if (!seen.has(v)) { seen.add(v); stack.push(v); }
          }
        }
        if (!ok) { all = false; break; }
      }
      if (all) { answer = c; break; }
    }

    // Layout: place stations on a circle.
    const cx = 180, cy = 130, R = 92;
    const pos = [null];
    for (let i = 1; i <= N; i++) {
      const ang = -Math.PI / 2 + ((i - 1) * 2 * Math.PI) / N;
      pos.push({ x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) });
    }
    return { adj, reaches, allReach, answer, pos };
  }, [parsed.edges, N, candidate]);

  const stationFill = (i) => {
    if (i === candidate) return "#2563eb";
    if (reachInfo.reaches[i]) return "#22c55e";
    return "#ef4444";
  };
  const stationStroke = (i) => i === candidate ? "#1e3a8a" : "#0f172a";

  const setNclamped = (val) => {
    const v = Math.max(2, Math.min(8, Number(val) || 2));
    setN(v);
    if (candidate > v) setCandidate(1);
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5 }}>
          🧪 {t(E, "Belt-Graph Sim", "벨트 그래프 시뮬")}
        </div>
        <div style={{ fontSize: 12, color: "#1e3a8a", marginTop: 4, lineHeight: 1.5 }}>
          {t(E,
            "Type belts (one 'a b' per line, meaning a→b). Pick a candidate station — green = milk from that station can reach the candidate.",
            "벨트를 한 줄에 'a b' (a→b 방향) 로 입력해. 후보 역을 골라 — 초록 = 그 역에서 후보 역으로 우유가 도달 가능.")}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
            {t(E, "Stations N", "역 개수 N")}
          </label>
          <input
            type="number" min={2} max={8} value={N}
            onChange={(e) => setNclamped(e.target.value)}
            style={{ width: "100%", padding: "6px 8px", fontSize: 13, border: `1.5px solid ${C.border}`, borderRadius: 6, marginTop: 2 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
            {t(E, "Candidate station", "후보 역")}
          </label>
          <select
            value={candidate}
            onChange={(e) => setCandidate(Number(e.target.value))}
            style={{ width: "100%", padding: "6px 8px", fontSize: 13, border: `1.5px solid ${C.border}`, borderRadius: 6, marginTop: 2, background: "#fff" }}
          >
            {Array.from({ length: N }, (_, i) => i + 1).map(s => (
              <option key={s} value={s}>{t(E, `Station ${s}`, `역 ${s}`)}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
          {t(E, "Belts (one 'a b' per line)", "벨트 (한 줄에 'a b')")}
        </label>
        <textarea
          value={edgesText}
          onChange={(e) => setEdgesText(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "6px 8px", fontSize: 12, fontFamily: "JetBrains Mono, monospace", border: `1.5px solid ${C.border}`, borderRadius: 6, marginTop: 2, resize: "vertical" }}
        />
        {parsed.bad && (
          <div style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>
            {t(E, "Some lines were skipped (must be 'a b' with 1 ≤ a,b ≤ N).", "일부 줄을 건너뛰었어요 ('a b' 형식, 1 ≤ a,b ≤ N).")}
          </div>
        )}
      </div>

      <div style={{ background: "#0f172a", borderRadius: 10, padding: 8, marginBottom: 10, display: "flex", justifyContent: "center" }}>
        <svg width={360} height={260} style={{ maxWidth: "100%" }}>
          <defs>
            <marker id="mfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>
          {parsed.edges.map(([a, b], idx) => {
            const pa = reachInfo.pos[a], pb = reachInfo.pos[b];
            if (!pa || !pb) return null;
            const dx = pb.x - pa.x, dy = pb.y - pa.y;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len, uy = dy / len;
            const r = 18;
            return (
              <line key={idx}
                x1={pa.x + ux * r} y1={pa.y + uy * r}
                x2={pb.x - ux * r} y2={pb.y - uy * r}
                stroke="#94a3b8" strokeWidth={2}
                markerEnd="url(#mfArrow)"
              />
            );
          })}
          {Array.from({ length: N }, (_, i) => i + 1).map(s => {
            const p = reachInfo.pos[s];
            return (
              <g key={s}>
                <circle cx={p.x} cy={p.y} r={18} fill={stationFill(s)} stroke={stationStroke(s)} strokeWidth={2} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="#fff">{s}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11, color: C.dim, marginBottom: 10 }}>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#2563eb", borderRadius: "50%", marginRight: 4 }} />{t(E, "Candidate", "후보")}</span>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#22c55e", borderRadius: "50%", marginRight: 4 }} />{t(E, "Reaches candidate", "후보로 도달")}</span>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#ef4444", borderRadius: "50%", marginRight: 4 }} />{t(E, "Cannot reach", "도달 불가")}</span>
      </div>

      <div style={{
        background: reachInfo.allReach ? "#dcfce7" : "#fef2f2",
        border: `1.5px solid ${reachInfo.allReach ? "#16a34a" : "#dc2626"}`,
        borderRadius: 8, padding: "8px 12px", fontSize: 13, color: reachInfo.allReach ? "#166534" : "#991b1b", lineHeight: 1.5,
      }}>
        <b>{reachInfo.allReach
          ? t(E, "✓ All stations reach this candidate.", "✓ 모든 역에서 이 후보로 도달!")
          : t(E, "✗ Some stations cannot reach this candidate.", "✗ 일부 역에서 이 후보로 도달 불가.")}</b>
        <div style={{ marginTop: 4, fontSize: 12, color: C.dim }}>
          {t(E, "Auto-detected answer for this graph: ", "이 그래프의 정답: ")}
          <b style={{ color: A }}>{reachInfo.answer === -1 ? "-1" : reachInfo.answer}</b>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "# adj[u] = list of nodes u can reach",
  "# We want a node reachable FROM all others",
  "# Reverse: find node that can reach all others",
  "# Or: for each node, check if all others can reach it",
  "",
  "# Build reverse adjacency list",
  "radj = [[] for _ in range(N+1)]",
  "for _ in range(N-1):",
  "    a, b = map(int, input().split())",
  "    radj[b].append(a)  # edge a->b means b can be reached from a",
  "",
  "# For each candidate node, BFS/DFS on reverse graph",
  "from collections import deque",
  "",
  "for candidate in range(1, N+1):",
  "    visited = set()",
  "    q = deque([candidate])",
  "    visited.add(candidate)",
  "    while q:",
  "        u = q.popleft()",
  "        for v in radj[u]:",
  "            if v not in visited:",
  "                visited.add(v)",
  "                q.append(v)",
  "    if len(visited) == N:",
  "        print(candidate)",
  "        break",
  "else:",
  "    print(-1)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<vector<int>> radj(N + 1);   // radj[b] = nodes from which b is reachable",
  "    for (int i = 0; i < N - 1; i++) {",
  "        int a, b; cin >> a >> b;",
  "        radj[b].push_back(a);",
  "    }",
  "    for (int cand = 1; cand <= N; cand++) {",
  "        vector<bool> vis(N + 1, false);",
  "        queue<int> q;",
  "        q.push(cand);",
  "        vis[cand] = true;",
  "        int cnt = 1;",
  "        while (!q.empty()) {",
  "            int u = q.front();",
  "            q.pop();",
  "            for (int v : radj[u]) {",
  "                if (!vis[v]) {",
  "                    vis[v] = true;",
  "                    cnt++;",
  "                    q.push(v);",
  "                }",
  "            }",
  "        }",
  "        if (cnt == N) {",
  "            cout << cand << \"\n\";",
  "            return 0;",
  "        }",
  "    }",
  "    cout << -1 << \"\n\";",
  "    return 0;",
  "}",
];

export function getMilkFactorySections(E) {
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
        t(E, "queue<int> from <queue> is the standard BFS frontier container.",
            "<queue>의 queue<int>가 BFS 프런티어의 표준 컨테이너."),
        t(E, "vector<vector<int>> radj(N + 1) sizes for 1-indexed nodes 1..N.",
            "vector<vector<int>> radj(N + 1)으로 1-기반 노드 1..N 크기 확보."),
      ],
    },
  ];
}

export function MilkFactoryProgressiveCode(props) {
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


export function downloadMilkFactoryPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MilkFactory — Full Study Guide", "MilkFactory — 종합 풀이 노트");
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

