import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* one axis (length N) after t seconds — a triangle wave that bounces
   between 1 and N with period 2(N-1). */
function oneAxis(N, t) {
  const period = 2 * (N - 1);
  const p = ((t % period) + period) % period;
  return N - Math.abs((N - 1) - p);
}

/* ═══════════════════════════════════════════════════════════════
   Mcc21DvdBounceSim — the row and the column are TWO independent
   1-D bouncers. The student steps T; each axis traces a triangle
   wave (1→N→1→N…). We overlay the closed-form formula so they see
   the position comes straight from T, not from stepping. Period is
   2(N-1), so even T = 10^16 is one modulo away.
   ═══════════════════════════════════════════════════════════════ */
const SIM_H = 3; // rows  (matches the PDF's h=3 example)
const SIM_W = 5; // cols  (matches the PDF's w=5 example)
const SIM_TMAX = 16;

export function Mcc21DvdBounceSim({ E }) {
  const [tt, setTt] = useState(0);

  const r = oneAxis(SIM_H, tt); // row from the bottom, 1..H
  const c = oneAxis(SIM_W, tt); // col from the left, 1..W
  const hPeriod = 2 * (SIM_H - 1);
  const wPeriod = 2 * (SIM_W - 1);

  // grid: draw top→bottom, so display row index dr maps to r-value (H - dr)
  const gridRows = [];
  for (let dr = 0; dr < SIM_H; dr++) {
    const rowVal = SIM_H - dr;
    const cells = [];
    for (let col = 1; col <= SIM_W; col++) {
      const isLogo = rowVal === r && col === c;
      const onWall = rowVal === 1 || rowVal === SIM_H || col === 1 || col === SIM_W;
      cells.push(
        <div key={col} style={{
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          background: isLogo ? A : onWall ? "#fef3c7" : "#fff",
          border: `1px solid ${onWall ? "#fcd34d" : "#e5e7eb"}`,
          fontSize: 16,
        }}>{isLogo ? "📀" : ""}</div>
      );
    }
    gridRows.push(<div key={dr} style={{ display: "flex" }}>{cells}</div>);
  }

  // a horizontal 1-D strip of length N, with the dot at `pos`
  const strip = (N, pos, tone) => (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: N }, (_, i) => {
        const v = i + 1;
        const here = v === pos;
        return (
          <div key={v} style={{
            width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontSize: 11, fontWeight: 800,
            fontFamily: "'JetBrains Mono',monospace",
            border: here ? `2px solid ${tone}` : "1px solid #fcd34d",
            background: here ? tone : "#fff",
            color: here ? "#fff" : "#92400e",
          }}>{v}</div>
        );
      })}
    </div>
  );

  const btn = (label, onClick, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 12px", borderRadius: 8, border: `1px solid ${A}`,
      background: disabled ? "#fff" : A, color: disabled ? C.dim : "#fff",
      fontSize: 12, fontWeight: 800, cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.45 : 1, fontFamily: "'JetBrains Mono',monospace",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🎞️ {t(E, "The row and the column bounce on their own", "행과 열은 따로따로 튕겨요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Each second the logo moves one row up and one column right, turning back at the walls. The row (height H) and the column (width W) never affect each other — each is just a dot bouncing 1→N→1→N on its own line.",
            "매 초 로고는 한 행 위로, 한 열 오른쪽으로 움직이고 벽에서 되돌아와요. 행(높이 H)과 열(너비 W)은 서로 전혀 간섭하지 않아요 — 각각 자기 선 위에서 1→N→1→N 으로 튕기는 점 하나일 뿐이에요.")}
        </div>

        {/* T stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          {btn("⏮", () => setTt(0), tt === 0)}
          {btn("◀ T−1", () => setTt((v) => Math.max(0, v - 1)), tt === 0)}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: A, minWidth: 74, textAlign: "center" }}>
            T = {tt}
          </span>
          {btn("T+1 ▶", () => setTt((v) => Math.min(SIM_TMAX, v + 1)), tt === SIM_TMAX)}
        </div>

        {/* grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ border: `2px solid ${A}`, borderRadius: 6, padding: 2, background: "#fff" }}>
            {gridRows}
          </div>
        </div>

        {/* two independent 1-D bouncers */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4, ...NW }}>
              {t(E, "row axis (H = 3)", "행 축 (H = 3)")} → r = <b>{r}</b>
            </div>
            {strip(SIM_H, r, "#0891b2")}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4, ...NW }}>
              {t(E, "col axis (W = 5)", "열 축 (W = 5)")} → c = <b>{c}</b>
            </div>
            {strip(SIM_W, c, "#7c3aed")}
          </div>
        </div>

        {/* closed-form readout */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, ...KA }}>
          <div>
            r = H − |(H−1) − (T mod 2(H−1))| = 3 − |2 − ({tt} mod {hPeriod})| = <b style={{ color: "#22d3ee" }}>{r}</b>
          </div>
          <div>
            c = W − |(W−1) − (T mod 2(W−1))| = 5 − |4 − ({tt} mod {wPeriod})| = <b style={{ color: "#c4b5fd" }}>{c}</b>
          </div>
          <div style={{ marginTop: 6, color: "#fbbf24", fontWeight: 800 }}>
            {t(E, "answer: ", "정답: ")}{r} {c}
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
          {t(E,
            "The row repeats every 2(H−1) = 4 seconds and the column every 2(W−1) = 8 seconds. So even T = 10^16 needs no stepping — one modulo folds T back into the first cycle and the formula gives the answer instantly.",
            "행은 2(H−1) = 4 초마다, 열은 2(W−1) = 8 초마다 똑같이 반복돼요. 그래서 T = 10^16 이라도 한 칸씩 셀 필요가 없어요 — 나머지 연산 한 번이면 T 를 첫 주기로 접어 넣고, 공식이 곧바로 답을 줘요.")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (fast: each axis is an independent triangle wave)
   ================================================================ */
const READ_PY = [
  "Q = int(input())",
  "H = list(map(int, input().split()))",
  "W = list(map(int, input().split()))",
  "T = list(map(int, input().split()))",
];
const ONE_PY = [
  "def one(N, t):",
  "    # one axis bounces between 1 and N, repeating every 2*(N-1)",
  "    p = t % (2 * (N - 1))",
  "    return N - abs((N - 1) - p)",
];
const LOOP_PY = [
  "for i in range(Q):",
  "    # row uses H, column uses W — the same t, two separate waves",
  "    print(one(H[i], T[i]), one(W[i], T[i]))",
];
const FULL_PY = [...READ_PY, "", ...ONE_PY, "", ...LOOP_PY];

const READ_CPP = [
  "int Q;",
  "cin >> Q;",
  "vector<long long> H(Q), W(Q), T(Q);",
  "for (int i = 0; i < Q; i++) cin >> H[i];",
  "for (int i = 0; i < Q; i++) cin >> W[i];",
  "for (int i = 0; i < Q; i++) cin >> T[i];",
];
const ONE_CPP = [
  "long long one(long long N, long long t) {",
  "    // one axis bounces between 1 and N, repeating every 2*(N-1)",
  "    long long p = t % (2 * (N - 1));",
  "    long long d = (N - 1) - p;",
  "    if (d < 0) d = -d;",
  "    return N - d;",
  "}",
];
const LOOP_CPP = [
  "for (int i = 0; i < Q; i++) {",
  "    // row uses H, column uses W — the same t, two separate waves",
  "    cout << one(H[i], T[i]) << ' ' << one(W[i], T[i]) << '\\n';",
  "}",
];
const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  ...ONE_CPP,
  "",
  "int main() {",
  ...READ_CPP.map((l) => "    " + l),
  ...LOOP_CPP.map((l) => "    " + l),
  "    return 0;",
  "}",
];

export { FULL_PY, FULL_CPP };

export function getMcc21DvdSections(E) {
  return [
    {
      label: t(E, "① Read the queries", "① 쿼리 읽기"),
      color: A,
      py: READ_PY, cpp: READ_CPP,
      why: [
        t(E, "There are Q independent test cases. Read H, W, T as three arrays — H[i], W[i], T[i] describe query i.",
            "독립적인 쿼리가 Q 개예요. H, W, T 를 배열 세 개로 읽어요 — H[i], W[i], T[i] 가 i 번째 쿼리를 이뤄요."),
        t(E, "Q ≤ 1000, so reading and answering each query in O(1) is plenty fast.",
            "Q ≤ 1000 이라, 쿼리마다 O(1) 로 답하면 충분히 빨라요."),
      ],
      cppOnly: [
        t(E, "H, W ≤ 10^12 and T ≤ 10^16 overflow int — use long long.",
            "H, W ≤ 10^12, T ≤ 10^16 은 int 를 넘쳐요 — long long 을 써요."),
      ],
    },
    {
      label: t(E, "② One axis = a triangle wave", "② 한 축 = 삼각파"),
      color: "#0891b2",
      py: ONE_PY, cpp: ONE_CPP,
      why: [
        t(E, "Key idea: the row and the column move independently. Each is a dot bouncing 1→N→1 on a line of length N.",
            "핵심: 행과 열은 서로 독립적으로 움직여요. 각각은 길이 N 인 선 위에서 1→N→1 로 튕기는 점 하나예요."),
        t(E, "That bounce repeats every 2(N−1) seconds, so t mod 2(N−1) folds any time into the first cycle. Then N − |(N−1) − p| reads off the position — no stepping.",
            "그 튕김은 2(N−1) 초마다 반복돼요. 그래서 t mod 2(N−1) 로 어떤 시각이든 첫 주기로 접어 넣고, N − |(N−1) − p| 로 위치를 바로 읽어요 — 한 칸씩 세지 않아요."),
        t(E, "Why we can't just step T: T ≤ 10^16 and Q ≤ 1000 means up to 10^19 steps. The formula answers each query in O(1).",
            "T 를 한 칸씩 셀 수 없는 이유: T ≤ 10^16, Q ≤ 1000 이면 최대 10^19 스텝이에요. 공식은 쿼리당 O(1) 로 끝나요."),
      ],
      cppOnly: [
        t(E, "abs on long long: subtract and flip the sign by hand (or use llabs / <cstdlib>).",
            "long long 절댓값: 빼고 부호를 직접 뒤집거나 llabs (<cstdlib>) 를 써요."),
      ],
    },
    {
      label: t(E, "③ Answer each query", "③ 각 쿼리 답 출력"),
      color: "#7c3aed",
      py: LOOP_PY, cpp: LOOP_CPP,
      why: [
        t(E, "For each query, apply the same one() twice: once to H for the row, once to W for the column — using the same T[i].",
            "각 쿼리마다 같은 one() 을 두 번 써요: 행은 H 에, 열은 W 에 — 둘 다 같은 T[i] 로."),
        t(E, "Print 'r c' on its own line, in the original query order.",
            "'r c' 를 쿼리 순서대로 한 줄씩 출력해요."),
      ],
      pyOnly: [
        t(E, "print(a, b) already puts one space between the two numbers.",
            "print(a, b) 는 두 수 사이에 공백 하나를 자동으로 넣어줘요."),
      ],
    },
  ];
}

export function Mcc21DvdProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadMcc21DvdPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Dvd — Full Study Guide", "Mcc21Dvd — 종합 풀이 노트");
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
<div class="sub">MCC · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
