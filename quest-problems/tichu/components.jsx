import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ================================================================
   Pair Audit Sim — visualize every pair for a small hand of N cards.
   Student slides N (2..7) and steps through pairs one-by-one,
   confirming the count matches C(N,2) = N*(N-1)/2.
   ================================================================ */
export function TichuPairAuditSim({ E }) {
  const [N, setN] = useState(5);
  const [step, setStep] = useState(0);

  const pairs = useMemo(() => {
    const out = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) out.push([i, j]);
    }
    return out;
  }, [N]);

  const total = pairs.length; // C(N,2)
  const formula = `${N} · ${N - 1} / 2 = ${total}`;
  const visible = Math.min(step, total);

  const reset = (newN) => { setN(newN); setStep(0); };
  const next = () => setStep(s => Math.min(s + 1, total));
  const showAll = () => setStep(total);

  // Card layout — circular arrangement so edges (pairs) are easy to see.
  const W = 320, H = 220, cx = W / 2, cy = H / 2;
  const R = N <= 4 ? 70 : 85;
  const cardPos = (i) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * i) / N;
    return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
  };

  const pairKey = (a, b) => `${a}-${b}`;
  const visiblePairs = pairs.slice(0, visible);
  const currentPair = visible > 0 ? pairs[visible - 1] : null;
  const currentKey = currentPair ? pairKey(currentPair[0], currentPair[1]) : null;

  const btnBase = {
    border: `1.5px solid ${A}`, borderRadius: 8, padding: "5px 12px",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
  };

  return (
    <div style={{ background: "#fff7f7", border: `1.5px solid ${A}`, borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: A, letterSpacing: 0.4, marginBottom: 8, textAlign: "center" }}>
        🔍 {t(E, "Pair Audit", "페어 감사")}
      </div>

      {/* N slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>N =</span>
        <input
          type="range" min={2} max={7} value={N}
          onChange={(e) => reset(parseInt(e.target.value, 10))}
          style={{ accentColor: A, width: 140 }}
        />
        <span style={{ fontSize: 14, fontWeight: 800, color: A, minWidth: 18, textAlign: "center" }}>{N}</span>
      </div>

      {/* SVG */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width={W} height={H} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8 }}>
          {/* Pair edges */}
          {visiblePairs.map(([a, b]) => {
            const pa = cardPos(a), pb = cardPos(b);
            const isCur = pairKey(a, b) === currentKey;
            return (
              <line
                key={`e-${a}-${b}`}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={isCur ? A : "#fca5a5"}
                strokeWidth={isCur ? 3 : 1.5}
                strokeOpacity={isCur ? 0.95 : 0.55}
              />
            );
          })}
          {/* Cards */}
          {Array.from({ length: N }).map((_, i) => {
            const p = cardPos(i);
            const inCurrent = currentPair && (currentPair[0] === i || currentPair[1] === i);
            return (
              <g key={`c-${i}`}>
                <rect
                  x={p.x - 16} y={p.y - 22} width={32} height={44} rx={5}
                  fill={inCurrent ? A : "#fff"}
                  stroke={A} strokeWidth={1.8}
                />
                <text
                  x={p.x} y={p.y + 5} textAnchor="middle"
                  fontSize={14} fontWeight={800}
                  fill={inCurrent ? "#fff" : A}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Counter row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8,
        padding: "6px 10px", margin: "8px 0", fontSize: 12,
      }}>
        <span style={{ color: "#7f1d1d", fontWeight: 700 }}>
          {t(E, "Pairs counted", "센 페어")}: <b style={{ color: A }}>{visible}</b> / {total}
        </span>
        <span style={{ color: "#7f1d1d", fontFamily: "JetBrains Mono, monospace" }}>
          C({N},2) = {formula}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={next} disabled={visible >= total}
          style={{ ...btnBase, background: visible >= total ? "#fca5a5" : A, color: "#fff", opacity: visible >= total ? 0.6 : 1 }}>
          ▶ {t(E, "Next pair", "다음 페어")}
        </button>
        <button onClick={showAll}
          style={{ ...btnBase, background: "#fff", color: A }}>
          {t(E, "Show all", "전부 보기")}
        </button>
        <button onClick={() => setStep(0)}
          style={{ ...btnBase, background: "#fff", color: A }}>
          ↺ {t(E, "Reset", "초기화")}
        </button>
      </div>

      {visible >= total && (
        <div style={{
          marginTop: 8, textAlign: "center", fontSize: 12, color: "#15803d",
          background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8,
          padding: "6px 10px", fontWeight: 700,
        }}>
          ✓ {t(E,
            `Confirmed — ${total} pairs match N·(N−1)/2.`,
            `확인 완료 — 페어 ${total} 개가 N·(N−1)/2 와 일치.`)}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "",
  "# C(N, 2) = N * (N-1) / 2",
  "# Number of ways to pick 2 cards from N",
  "result = N * (N - 1) // 2",
  "",
  "print(result)",
];

const FULL_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N; cin >> N;",
  "    cout << N * (N - 1) / 2 << \"\\n\";",
  "    return 0;",
  "}",
];

export function getTichuSections(E) {
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

export function TichuProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadTichuPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Tichu — Full Study Guide", "Tichu — 종합 풀이 노트");
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

