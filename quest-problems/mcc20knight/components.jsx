import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

// 8 knight L-moves: (dr, dc) — 2 in one axis, 1 in the perpendicular.
const KNIGHT_MOVES = [
  { dr: -2, dc: -1 }, { dr: -2, dc:  1 },
  { dr: -1, dc: -2 }, { dr: -1, dc:  2 },
  { dr:  1, dc: -2 }, { dr:  1, dc:  2 },
  { dr:  2, dc: -1 }, { dr:  2, dc:  1 },
];

export function KnightMovesSim({ E }) {
  const N = 5;            // 5x5 mini board, knight in center
  const SR = 2, SC = 2;
  const [pickedIdx, setPickedIdx] = useState(null);
  const picked = pickedIdx == null ? null : KNIGHT_MOVES[pickedIdx];
  const targetR = picked ? SR + picked.dr : null;
  const targetC = picked ? SC + picked.dc : null;

  const reachable = (r, c) =>
    KNIGHT_MOVES.some(m => SR + m.dr === r && SC + m.dc === c);

  const cellSize = 44;

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12,
        padding: 12, marginBottom: 12, fontSize: 12, color: "#1e3a8a", lineHeight: 1.55,
      }}>
        <b style={{ color: A }}>{t(E, "Try a move", "이동 해 보기")}</b>
        {t(E,
          " — click any blue ★ cell. The knight (♞) jumps in an L-shape: 2 in one axis, 1 in the other.",
          " — 파란 ★ 칸 아무거나 눌러 봐요. 나이트 (♞) 가 L 자로 점프 — 한 축 2 칸, 다른 축 1 칸.")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${N}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${N}, ${cellSize}px)`,
          border: `2px solid ${A}`, borderRadius: 8, overflow: "hidden",
          boxShadow: "0 2px 8px rgba(37,99,235,.15)",
        }}>
          {Array.from({ length: N * N }, (_, k) => {
            const r = Math.floor(k / N), c = k % N;
            const isStart = r === SR && c === SC;
            const isTarget = picked && r === targetR && c === targetC;
            const isReach = reachable(r, c);
            const checker = (r + c) % 2 === 0 ? "#f1f5f9" : "#cbd5e1";
            let bg = checker;
            if (isReach) bg = "#dbeafe";
            if (isTarget) bg = "#86efac";
            const showKnight = picked ? isTarget : isStart;
            const trailKnight = picked && isStart;
            return (
              <button
                key={k}
                disabled={!isReach}
                onClick={() => {
                  const idx = KNIGHT_MOVES.findIndex(m => SR + m.dr === r && SC + m.dc === c);
                  if (idx >= 0) setPickedIdx(idx);
                }}
                style={{
                  background: bg,
                  border: "1px solid #94a3b8",
                  cursor: isReach ? "pointer" : "default",
                  fontSize: 22, fontWeight: 700,
                  color: trailKnight ? "#94a3b8" : "#1e293b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 0,
                  transition: "background .25s ease",
                }}
                title={isReach ? `(${r},${c})` : ""}
              >
                {showKnight ? "♞" : trailKnight ? "·" : (isReach ? "★" : "")}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
        {KNIGHT_MOVES.map((m, i) => {
          const active = pickedIdx === i;
          const sign = (n) => (n > 0 ? `+${n}` : `${n}`);
          return (
            <button key={i} onClick={() => setPickedIdx(i)} style={{
              background: active ? A : "#fff",
              color: active ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 11, fontWeight: 700,
              cursor: "pointer",
              fontFamily: "monospace",
            }}>
              ({sign(m.dr)},{sign(m.dc)})
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: "center", fontSize: 12, color: C.dim, minHeight: 18 }}>
        {picked ? (
          <span>
            <b style={{ color: A }}>(+{picked.dr},{picked.dc})</b>
            {" "}
            {t(E, "→ knight moves to", "→ 나이트 이동")}
            {" "}
            <b style={{ color: "#15803d" }}>({targetR},{targetC})</b>
            {". "}
            {t(E, "One axis ±2, the other ±1.", "한 축 ±2, 다른 축 ±1.")}
          </span>
        ) : (
          <span>{t(E, "Pick one of the 8 ★ cells (or a button below).", "8 개의 ★ 칸 중 하나를 골라요 (또는 아래 버튼).")}</span>
        )}
      </div>
    </div>
  );
}


const FULL_PY = [
  "from collections import deque",
  "",
  "N = int(input())",
  "sr, sc = map(int, input().split())",
  "tr, tc = map(int, input().split())",
  "",
  "moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),",
  "         (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "dist = [[-1]*N for _ in range(N)]",
  "dist[sr][sc] = 0",
  "q = deque([(sr, sc)])",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    if r == tr and c == tc:",
  "        print(dist[r][c])",
  "        break",
  "    for dr, dc in moves:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<N and 0<=nc<N and dist[nr][nc]==-1:",
  "            dist[nr][nc] = dist[r][c] + 1",
  "            q.append((nr, nc))",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "",
  "    long long N; cin >> N;",
  "    long long sr, sc; cin >> sr >> sc;",
  "    long long tr, tc; cin >> tr >> tc;",
  "",
  "    auto moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),;",
  "            // (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "    auto dist = [[-1]*N for _ in range(N)];",
  "    // dist[sr][sc] = 0",
  "    auto q = deque([(sr, sc)]);",
  "",
  "    while (q) {",
  "        // r, c = q.popleft()",
  "        if (r == tr and c == tc) {",
  "            cout << dist[r][c] << \"\\n\";",
  "            break;",
  "        // for dr, dc in moves:",
  "            // nr, nc = r+dr, c+dc",
  "            if (0<=nr<N and 0<=nc<N and dist[nr][nc]==-1) {",
  "                // dist[nr][nc] = dist[r][c] + 1",
  "                // q.append((nr, nc))",
  "",
  "    return 0;",
  "}",
];

export function getMcc20KnightSections(E) {
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
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function Mcc20KnightProgressiveCode(props) {
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


export function downloadMcc20KnightPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Knight — Full Study Guide", "Mcc20Knight — 종합 풀이 노트");
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

