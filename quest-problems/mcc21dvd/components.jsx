import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   Mcc21DvdBounceSim — step-by-step audit of the bouncing DVD logo.
   Student picks a preset, advances one step at a time, and watches
   each (x, y) update + which wall flipped which component. Reveals
   exactly when dx or dy changes sign.
   ═══════════════════════════════════════════════════════════════ */
const _DVD_PRESETS = [
  { W: 5, H: 4, x0: 0, y0: 0, dx0: 1,  dy0: 1,  T: 8 },
  { W: 6, H: 5, x0: 2, y0: 1, dx0: 1,  dy0: 1,  T: 10 },
  { W: 4, H: 6, x0: 3, y0: 5, dx0: -1, dy0: -1, T: 9 },
];

function _simulateDvd(p, steps) {
  let { x0: x, y0: y, dx0: dx, dy0: dy, W, H } = p;
  const trace = [{ step: 0, x, y, dx, dy, flipX: false, flipY: false }];
  for (let s = 1; s <= steps; s++) {
    x += dx;
    y += dy;
    let flipX = false, flipY = false;
    if (x <= 0 || x >= W - 1) { dx = -dx; flipX = true; }
    if (y <= 0 || y >= H - 1) { dy = -dy; flipY = true; }
    trace.push({ step: s, x, y, dx, dy, flipX, flipY });
  }
  return trace;
}

export function Mcc21DvdBounceSim({ E }) {
  const [pi, setPi] = useState(0);
  const [step, setStep] = useState(0);
  const p = _DVD_PRESETS[pi];

  const trace = _simulateDvd(p, p.T);
  const cur = trace[Math.min(step, p.T)];
  const prev = step > 0 ? trace[step - 1] : null;

  const pickPreset = (i) => { setPi(i); setStep(0); };
  const stepFwd = () => setStep((s) => Math.min(s + 1, p.T));
  const stepBack = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  // Build grid cells, marking the current logo cell + the prior cell
  const cellSize = Math.min(40, Math.floor(280 / Math.max(p.W, p.H)));
  const rows = [];
  for (let r = 0; r < p.H; r++) {
    const cells = [];
    for (let c = 0; c < p.W; c++) {
      const isLogo = (c === cur.x && r === cur.y);
      const isPrev = prev && (c === prev.x && r === prev.y);
      const onWall = (c === 0 || c === p.W - 1 || r === 0 || r === p.H - 1);
      cells.push(
        <div key={c} style={{
          width: cellSize, height: cellSize,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isLogo ? "#d97706" : (isPrev ? "#fde68a" : (onWall ? "#fef3c7" : "#fff")),
          color: isLogo ? "#fff" : "#92400e",
          border: `1px solid ${onWall ? "#fcd34d" : "#e5e7eb"}`,
          fontSize: 14, fontWeight: 700,
        }}>
          {isLogo ? "📀" : (isPrev ? "·" : "")}
        </div>
      );
    }
    rows.push(<div key={r} style={{ display: "flex" }}>{cells}</div>);
  }

  const flipMsg = (() => {
    if (step === 0) return t(E, "Pick a preset and step forward to watch it bounce.",
                                "프리셋 골라서 단계를 진행해봐. 튕기는 걸 볼 수 있어.");
    if (cur.flipX && cur.flipY) return t(E, "💥 Hit a corner — both dx and dy flipped.",
                                            "💥 모서리 충돌 — dx, dy 둘 다 반전.");
    if (cur.flipX) return t(E, "↔️ Hit a vertical wall — dx flipped.", "↔️ 좌우 벽 — dx 반전.");
    if (cur.flipY) return t(E, "↕️ Hit a horizontal wall — dy flipped.", "↕️ 위아래 벽 — dy 반전.");
    return t(E, "Free flight — no wall this step.", "자유 비행 — 이번 단계는 벽 안 만남.");
  })();

  const btnStyle = (active) => ({
    padding: "5px 10px", borderRadius: 8,
    border: `1px solid ${active ? A : C.border}`,
    background: active ? A : "transparent",
    color: active ? "#fff" : C.dim,
    fontSize: 12, fontWeight: 700, cursor: "pointer",
    fontFamily: "'JetBrains Mono',monospace",
  });

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_DVD_PRESETS.map((q, i) => (
          <button key={i} onClick={() => pickPreset(i)} style={btnStyle(i === pi)}>
            {q.W}×{q.H} · ({q.x0},{q.y0}) · ({q.dx0 > 0 ? "+" : "-"}{Math.abs(q.dx0)},{q.dy0 > 0 ? "+" : "-"}{Math.abs(q.dy0)}) · T={q.T}
          </button>
        ))}
      </div>

      {/* grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ border: `2px solid ${A}`, borderRadius: 6, padding: 2, background: "#fffbeb" }}>
          {rows}
        </div>
      </div>

      {/* step status */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 10,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, fontSize: 12,
        fontFamily: "'JetBrains Mono',monospace", textAlign: "center",
      }}>
        <div><div style={{ color: C.dim, fontSize: 10 }}>{t(E, "step", "단계")}</div><b style={{ color: A }}>{cur.step}/{p.T}</b></div>
        <div><div style={{ color: C.dim, fontSize: 10 }}>(x, y)</div><b style={{ color: A }}>({cur.x}, {cur.y})</b></div>
        <div><div style={{ color: C.dim, fontSize: 10 }}>dx</div><b style={{ color: cur.flipX ? "#dc2626" : A }}>{cur.dx > 0 ? "+1" : "-1"}</b></div>
        <div><div style={{ color: C.dim, fontSize: 10 }}>dy</div><b style={{ color: cur.flipY ? "#dc2626" : A }}>{cur.dy > 0 ? "+1" : "-1"}</b></div>
      </div>

      <div style={{
        background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10,
        padding: "8px 12px", textAlign: "center", marginBottom: 10,
        fontSize: 12, color: "#92400e", minHeight: 18,
      }}>
        {flipMsg}
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8 }}>
        <button onClick={reset} style={btnStyle(false)}>⏮ {t(E, "Reset", "처음")}</button>
        <button onClick={stepBack} disabled={step === 0} style={{ ...btnStyle(false), opacity: step === 0 ? 0.4 : 1 }}>◀ {t(E, "Back", "뒤로")}</button>
        <button onClick={stepFwd} disabled={step >= p.T} style={{ ...btnStyle(true), opacity: step >= p.T ? 0.4 : 1 }}>{t(E, "Step ▶", "단계 ▶")}</button>
      </div>

      {step >= p.T && (
        <div style={{
          background: "#fff7ed", border: `1px solid ${A}`, borderRadius: 10,
          padding: "10px 14px", textAlign: "center",
        }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
            {t(E, `Final position after T = ${p.T} steps`, `T = ${p.T} 단계 후 최종 위치`)}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
            print({cur.x}, {cur.y})
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "W, H = map(int, input().split())",
  "x, y = map(int, input().split())",
  "dx, dy = 1, 1",
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    x += dx",
  "    y += dy",
  "    if x <= 0 or x >= W - 1:",
  "        dx = -dx",
  "    if y <= 0 or y >= H - 1:",
  "        dy = -dy",
  "",
  "print(x, y)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long W, H; cin >> W >> H;",
  "    long long x, y; cin >> x >> y;",
  "    // dx, dy = 1, 1",
  "    long long T; cin >> T;",
  "",
  "    for (long long _ = 0; _ < T; _++) {",
  "        x += dx;",
  "        y += dy;",
  "        if (x <= 0 or x >= W - 1) {",
  "            auto dx = -dx;",
  "        if (y <= 0 or y >= H - 1) {",
  "            auto dy = -dy;",
  "",
  "    cout << x, y << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc21DvdSections(E) {
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

