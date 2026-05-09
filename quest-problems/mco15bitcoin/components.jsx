import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ================================================================
   Pair Inspector Sim — deep-audit the brute-force pairing
   Student clicks any two of 4 fixed mining sites and sees
   dx, dy, dx²+dy² computed live, plus the running max across
   all visited pairs. Bilingual via E flag.
   ================================================================ */
const PI_SITES = [
  { id: 0, x: 1, y: 1, name: "A" },
  { id: 1, x: 5, y: 2, name: "B" },
  { id: 2, x: 2, y: 6, name: "C" },
  { id: 3, x: 6, y: 5, name: "D" },
];

export function BitcoinPairInspector({ E }) {
  const [picked, setPicked] = useState([]); // up to 2 ids
  const [seenMax, setSeenMax] = useState(0);

  const click = (id) => {
    let np;
    if (picked.length === 2) np = [id];
    else if (picked.includes(id)) np = picked.filter((p) => p !== id);
    else np = [...picked, id];
    setPicked(np);
    if (np.length === 2) {
      const a = PI_SITES[np[0]], b = PI_SITES[np[1]];
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      setSeenMax((m) => Math.max(m, d));
    }
  };

  const reset = () => { setPicked([]); setSeenMax(0); };

  // grid: 0..7 in both axes, 36px per unit
  const U = 34, PAD = 22, GRID = 7;
  const SVG = PAD * 2 + U * GRID;
  const px = (x) => PAD + x * U;
  const py = (y) => PAD + (GRID - y) * U; // flip y so up = +y

  const a = picked[0] != null ? PI_SITES[picked[0]] : null;
  const b = picked[1] != null ? PI_SITES[picked[1]] : null;
  const dx = a && b ? a.x - b.x : null;
  const dy = a && b ? a.y - b.y : null;
  const distSq = a && b ? dx * dx + dy * dy : null;

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#9a3412", lineHeight: 1.5,
      }}>
        <b>{t(E, "🔍 Pair Inspector", "🔍 쌍 검사기")}</b> — {t(E,
          "Click any two sites to see dx² + dy². Try all 6 pairs and watch the running max.",
          "두 사이트를 클릭하면 dx² + dy² 가 보여요. 6개 쌍을 모두 시도하며 최댓값을 추적해봐요.")}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
        <svg width={SVG} height={SVG} style={{ background: "#fffaf3", border: `1px solid #fdba74`, borderRadius: 10 }}>
          {/* grid lines */}
          {Array.from({ length: GRID + 1 }).map((_, i) => (
            <g key={`g${i}`}>
              <line x1={px(i)} y1={py(0)} x2={px(i)} y2={py(GRID)} stroke="#fde4c4" strokeWidth={1} />
              <line x1={px(0)} y1={py(i)} x2={px(GRID)} y2={py(i)} stroke="#fde4c4" strokeWidth={1} />
            </g>
          ))}
          {/* axes */}
          <line x1={px(0)} y1={py(0)} x2={px(GRID)} y2={py(0)} stroke="#9a3412" strokeWidth={1.5} />
          <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(GRID)} stroke="#9a3412" strokeWidth={1.5} />
          {/* connecting line if 2 picked */}
          {a && b && (
            <line x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)} stroke={A} strokeWidth={2.5} strokeDasharray="5 4" />
          )}
          {/* dx / dy guides */}
          {a && b && (
            <>
              <line x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(a.y)} stroke="#fbbf24" strokeWidth={1.5} />
              <line x1={px(b.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)} stroke="#fbbf24" strokeWidth={1.5} />
            </>
          )}
          {/* points */}
          {PI_SITES.map((s) => {
            const sel = picked.includes(s.id);
            return (
              <g key={s.id} onClick={() => click(s.id)} style={{ cursor: "pointer" }}>
                <circle cx={px(s.x)} cy={py(s.y)} r={sel ? 11 : 8}
                  fill={sel ? A : "#fff"} stroke={A} strokeWidth={2} />
                <text x={px(s.x)} y={py(s.y) + 4} textAnchor="middle"
                  fontSize={11} fontWeight={800}
                  fill={sel ? "#fff" : A}>{s.name}</text>
                <text x={px(s.x) + 12} y={py(s.y) - 10} fontSize={10} fill="#9a3412">
                  ({s.x},{s.y})
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ flex: "1 1 220px", minWidth: 220 }}>
          <div style={{
            background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
            padding: 10, fontSize: 12, color: C.text, marginBottom: 8,
          }}>
            <div style={{ fontWeight: 700, color: A, marginBottom: 6 }}>
              {t(E, "Picked", "선택")}: {a ? a.name : "·"} , {b ? b.name : "·"}
            </div>
            {a && b ? (
              <div style={{ fontFamily: "ui-monospace, monospace", lineHeight: 1.7 }}>
                <div>dx = {a.x} − {b.x} = <b style={{ color: A }}>{dx}</b></div>
                <div>dy = {a.y} − {b.y} = <b style={{ color: A }}>{dy}</b></div>
                <div>dx² + dy² = {dx * dx} + {dy * dy} = <b style={{ color: "#15803d" }}>{distSq}</b></div>
              </div>
            ) : (
              <div style={{ color: C.dim }}>
                {t(E, "Click two sites on the grid.", "그리드에서 두 사이트를 클릭하세요.")}
              </div>
            )}
          </div>
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10,
            padding: 10, fontSize: 12, color: "#15803d",
          }}>
            <b>{t(E, "Running max", "지금까지 최댓값")}:</b> {seenMax}
            <div style={{ fontSize: 11, color: "#166534", marginTop: 4 }}>
              {t(E, "This is what max_dist tracks across all 6 pairs.",
                  "max_dist 가 6개 쌍 전체에서 추적하는 값이에요.")}
            </div>
          </div>
          <button onClick={reset} style={{
            marginTop: 8, background: "#fff", color: A, border: `1.5px solid ${A}`,
            borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            {t(E, "Reset", "초기화")}
          </button>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "sites = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    sites.append((x, y))",
  "",
  "max_dist = 0",
  "",
  "for i in range(N):",
  "    for j in range(i + 1, N):",
  "        dx = sites[i][0] - sites[j][0]",
  "        dy = sites[i][1] - sites[j][1]",
  "        dist_sq = dx * dx + dy * dy",
  "        max_dist = max(max_dist, dist_sq)",
  "",
  "print(max_dist)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long N; cin >> N;",
  "    auto sites = [];",
  "    for (long long _ = 0; _ < N; _++) {",
  "        long long x, y; cin >> x >> y;",
  "        // sites.append((x, y))",
  "",
  "    auto max_dist = 0;",
  "",
  "    for (long long i = 0; i < N; i++) {",
  "        for (long long j = i + 1; j < N; j++) {",
  "            auto dx = sites[i][0] - sites[j][0];",
  "            auto dy = sites[i][1] - sites[j][1];",
  "            auto dist_sq = dx * dx + dy * dy;",
  "            auto max_dist = max(max_dist, dist_sq);",
  "",
  "    cout << max_dist << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getBitcoinSections(E) {
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

export function BitcoinProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadBitcoinPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Bitcoin — Full Study Guide", "Bitcoin — 종합 풀이 노트");
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

