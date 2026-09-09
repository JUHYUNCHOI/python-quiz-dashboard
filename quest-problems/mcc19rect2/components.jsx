import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   숨은 꼭짓점 찾기 — 좌표를 세어 보는 시뮬

   2026-09-09: 전에는 XOR 비트 검사기였다. 그런데 **원문 풀이는 XOR 을 안 쓴다**:
     "세 점의 x 좌표 중 둘은 같다. 다른 하나가 네 번째 점의 x 다. y 도 마찬가지."
   비트는 어디서도 안 가르치고, mcc19candy 에서 초6 학생이 "비트" 때문에
   그만두고 싶어했다. 세는 방식으로 바꿨다 — 곱셈도 필요 없다.
   - Bilingual (E flag), theme-matched (green A = #059669).
   - Student picks one of 3 preset 3-corner sets, sees the rectangle
   ═══════════════════════════════════════════════════════════════ */
const RECT_PRESETS = [
  { id: "A", c1: [0, 0], c2: [2, 0], c3: [0, 3], hidden: [2, 3] },
  { id: "B", c1: [1, 1], c2: [4, 1], c3: [1, 5], hidden: [4, 5] },
  { id: "C", c1: [2, 3], c2: [2, 7], c3: [6, 3], hidden: [6, 7] },
];

/* 세 값 중 **혼자 나온 것**을 찾는다. 나머지 둘은 같은 값이다.
   (직사각형이면 각 x 좌표가 네 꼭짓점 중 정확히 두 번 나오기 때문이다.) */
function loneValue(a, b, c) {
  const val = a === b ? c : (a === c ? b : a);
  const pair = a === b ? a : (a === c ? a : b);   // 두 번 나온 값
  return { a, b, c, val, pair };
}

export function Mcc19Rect2AuditSim({ E }) {
  const [pid, setPid] = useState("A");
  const [reveal, setReveal] = useState(false);
  const p = RECT_PRESETS.find(r => r.id === pid) || RECT_PRESETS[0];
  const corners = [p.c1, p.c2, p.c3];
  const all4 = [...corners, p.hidden];
  const xs = all4.map(c => c[0]);
  const ys = all4.map(c => c[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const W = 240, H = 200, padPx = 24;
  const sx = (x) => padPx + ((x - minX) / Math.max(1, maxX - minX)) * (W - 2 * padPx);
  const sy = (y) => H - padPx - ((y - minY) / Math.max(1, maxY - minY)) * (H - 2 * padPx);
  const tx = loneValue(p.c1[0], p.c2[0], p.c3[0]);
  const ty = loneValue(p.c1[1], p.c2[1], p.c3[1]);

  const cornerDot = (c, i, hidden) => (
    <g key={i}>
      <circle cx={sx(c[0])} cy={sy(c[1])} r={7}
        fill={hidden ? (reveal ? "#fbbf24" : "#fff") : A}
        stroke={hidden ? "#d97706" : A}
        strokeWidth={2}
        strokeDasharray={hidden && !reveal ? "3 3" : "0"} />
      <text x={sx(c[0]) + 10} y={sy(c[1]) - 8} fontSize={11} fill={hidden ? "#92400e" : "#065f46"} fontWeight={700}>
        {hidden && !reveal ? "?" : `(${c[0]},${c[1]})`}
      </text>
    </g>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#ecfdf5", border: `1.5px solid #6ee7b7`, borderRadius: 12,
        padding: 12, marginBottom: 10,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          🔎 {t(E, "Find the hidden corner", "숨은 꼭짓점 찾기")}
        </div>
        <div style={{ fontSize: 12, color: "#065f46", marginBottom: 8, lineHeight: 1.5 }}>
          {t(E,
            "Pick a rectangle and look at the three corners you know. Where must the fourth one be?",
            "직사각형을 골라 알고 있는 세 꼭짓점을 봐요. 네 번째는 어디 있어야 할까요?")}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {RECT_PRESETS.map(r => (
            <button key={r.id}
              onClick={() => { setPid(r.id); setReveal(false); }}
              style={{
                padding: "5px 12px", fontSize: 12, fontWeight: 700,
                borderRadius: 6, cursor: "pointer",
                border: `1.5px solid ${A}`,
                background: pid === r.id ? A : "#fff",
                color: pid === r.id ? "#fff" : A,
              }}>
              {t(E, `Preset ${r.id}`, `프리셋 ${r.id}`)}
            </button>
          ))}
          <button onClick={() => setReveal(v => !v)}
            style={{
              padding: "5px 12px", fontSize: 12, fontWeight: 700,
              borderRadius: 6, cursor: "pointer", marginLeft: "auto",
              border: `1.5px solid #d97706`,
              background: reveal ? "#d97706" : "#fff",
              color: reveal ? "#fff" : "#d97706",
            }}>
            {reveal
              ? t(E, "🙈 Hide 4th", "🙈 4 번째 숨기기")
              : t(E, "🔓 show the answer", "🔓 답 보기")}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg width={W} height={H} style={{
          background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8,
        }}>
          {/* axes */}
          <line x1={padPx} y1={H - padPx} x2={W - padPx} y2={H - padPx} stroke="#cbd5e1" strokeWidth={1} />
          <line x1={padPx} y1={padPx} x2={padPx} y2={H - padPx} stroke="#cbd5e1" strokeWidth={1} />
          {/* rectangle outline (only when revealed) */}
          {reveal && (
            <rect
              x={sx(minX)} y={sy(maxY)}
              width={sx(maxX) - sx(minX)} height={sy(minY) - sy(maxY)}
              fill="none" stroke={A} strokeWidth={2} strokeDasharray="4 3" />
          )}
          {corners.map((c, i) => cornerDot(c, i, false))}
          {cornerDot(p.hidden, 99, true)}
        </svg>

        <div style={{
          flex: "1 1 260px", minWidth: 240,
          background: "#0f172a", color: "#e2e8f0", borderRadius: 8,
          padding: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 12, lineHeight: 1.55,
        }}>
          <div style={{ color: "#94a3b8", marginBottom: 6 }}>
            {t(E, "// the three x values", "// 알고 있는 x 좌표 셋")}
          </div>
          {[p.c1[0], p.c2[0], p.c3[0]].map((v, i) => (
            <div key={i}>
              x{i + 1} = {v}
              {reveal && (
                <span style={{ color: v === tx.pair ? "#64748b" : "#fbbf24" }}>
                  {v === tx.pair ? t(E, "   (twice)", "   (두 번 나옴)") : t(E, "   (once)", "   (한 번만)")}
                </span>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px dashed #334155", margin: "4px 0", paddingTop: 4 }}>
            x4 = {reveal
              ? <b style={{ color: "#fbbf24" }}>{tx.val}</b>
              : <span style={{ color: "#475569" }}>?</span>}
          </div>
          <div style={{ height: 8 }} />
          <div style={{ color: "#94a3b8", marginBottom: 6 }}>
            {t(E, "// the three y values", "// 알고 있는 y 좌표 셋")}
          </div>
          {[p.c1[1], p.c2[1], p.c3[1]].map((v, i) => (
            <div key={i}>
              y{i + 1} = {v}
              {reveal && (
                <span style={{ color: v === ty.pair ? "#64748b" : "#fbbf24" }}>
                  {v === ty.pair ? t(E, "   (twice)", "   (두 번 나옴)") : t(E, "   (once)", "   (한 번만)")}
                </span>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px dashed #334155", margin: "4px 0", paddingTop: 4 }}>
            y4 = {reveal
              ? <b style={{ color: "#fbbf24" }}>{ty.val}</b>
              : <span style={{ color: "#475569" }}>?</span>}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 10, padding: "8px 12px", fontSize: 12,
        background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8,
        color: "#92400e", lineHeight: 1.7,
        whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance",
      }}>
        💡 {t(E,
          "In a rectangle the same x value shows up at two corners. Among your three, one x appears twice and one appears alone — the lonely one belongs to the missing corner. Same for y.",
          "직사각형에서는 같은 x 값이 두 꼭짓점에 나와요.\n가진 셋 중 하나는 두 번, 하나는 한 번만 나와요.\n한 번만 나온 그 값이 빠진 꼭짓점의 x 예요. y 도 똑같아요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# 세 x 좌표 중 둘은 같아요. 한 번만 나온 값이 네 번째 점의 x 예요.",
  "if x1 == x2:",
  "    x4 = x3",
  "elif x1 == x3:",
  "    x4 = x2",
  "else:",
  "    x4 = x1",
  "",
  "# y 도 똑같이 해요.",
  "if y1 == y2:",
  "    y4 = y3",
  "elif y1 == y3:",
  "    y4 = y2",
  "else:",
  "    y4 = y1",
  "",
  "print(x4, y4)",
];

const FULL_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long x1, y1, x2, y2, x3, y3;",
  "    cin >> x1 >> y1;",
  "    cin >> x2 >> y2;",
  "    cin >> x3 >> y3;",
  "",
  "    // 세 x 좌표 중 둘은 같아요. 한 번만 나온 값이 답이에요.",
  "    long long x4;",
  "    if (x1 == x2) {",
  "        x4 = x3;",
  "    } else if (x1 == x3) {",
  "        x4 = x2;",
  "    } else {",
  "        x4 = x1;",
  "    }",
  "",
  "    long long y4;",
  "    if (y1 == y2) {",
  "        y4 = y3;",
  "    } else if (y1 == y3) {",
  "        y4 = y2;",
  "    } else {",
  "        y4 = y1;",
  "    }",
  "",
  "    cout << x4 << \" \" << y4 << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc19Rect2Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "Python's print(x4, y4) inserts the space between the two numbers for you. In C++ you write that space yourself.",
            "Python 의 print(x4, y4) 는 두 수 사이 공백을 알아서 넣어요. C++ 에서는 그 공백을 직접 적어야 해요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers you've learned (iostream, vector, string).",
            "#include 는 배운 헤더들로 (iostream, vector, string) 나눠 적어."),
        t(E, "Use int for sums and indices — only switch to a bigger type when sums exceed ~2×10^9.",
            "합계·인덱스는 int 로 충분 — 2×10^9 넘는 큰 합계만 더 큰 타입 고려."),
      ],
    },
  ];
}

export function Mcc19Rect2ProgressiveCode(props) {
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


export function downloadMcc19Rect2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Rect2 — Full Study Guide", "Mcc19Rect2 — 종합 풀이 노트");
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

