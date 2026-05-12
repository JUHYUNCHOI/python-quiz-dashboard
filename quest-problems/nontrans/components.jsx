import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   NonTransDeepAuditSim — pick a pair of 4-sided dice, step through
   every (x, y) outcome, watch each pair classified as X-wins /
   X-loses / tie, tally win vs lose, and let the verdict (X beats Y
   or not) emerge from the count. This is exactly what beats(X, Y)
   does — but at human speed, one pair at a time.
   ═══════════════════════════════════════════════════════════════ */
const _NT_PRESETS = [
  { X: [4, 4, 4, 4], Y: [3, 3, 3, 6], label: "[4,4,4,4] vs [3,3,3,6]" },
  { X: [3, 3, 3, 6], Y: [2, 2, 5, 5], label: "[3,3,3,6] vs [2,2,5,5]" },
  { X: [2, 2, 5, 5], Y: [4, 4, 4, 4], label: "[2,2,5,5] vs [4,4,4,4]" },
  { X: [1, 2, 3, 4], Y: [1, 2, 3, 4], label: "[1,2,3,4] vs [1,2,3,4]" },
];

export function NonTransDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { X, Y } = _NT_PRESETS[pi];
  const [step, setStep] = useState(0);
  const [audited, setAudited] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setStep(0);
    setAudited(false);
  };

  const pairs = [];
  for (let i = 0; i < X.length; i++) {
    for (let j = 0; j < Y.length; j++) {
      const x = X[i], y = Y[j];
      const kind = x > y ? "W" : x < y ? "L" : "T";
      pairs.push({ i, j, x, y, kind });
    }
  }
  const n = pairs.length;

  let win = 0, lose = 0, tie = 0;
  for (let k = 0; k < step; k++) {
    if (pairs[k].kind === "W") win++;
    else if (pairs[k].kind === "L") lose++;
    else tie++;
  }
  const totalWin  = pairs.filter(p => p.kind === "W").length;
  const totalLose = pairs.filter(p => p.kind === "L").length;
  const verdict = totalWin > totalLose ? "BEATS" : "NOT";

  const advance = () => {
    if (step < n) setStep(step + 1);
    else setAudited(true);
  };
  const reset = () => { setStep(0); setAudited(false); };

  const kindBg  = { W: "#dcfce7", L: "#fee2e2", T: "#fef3c7" };
  const kindBd  = { W: "#86efac", L: "#fca5a5", T: "#fde68a" };
  const kindCol = { W: "#166534", L: "#991b1b", T: "#92400e" };
  const kindTxt = (k) => k === "W" ? t(E, "X wins", "X 승")
                       : k === "L" ? t(E, "X loses", "X 패")
                       :              t(E, "tie",   "무승부");

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_NT_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Step through every (x, y) outcome. Each pair is x > y, x < y, or x = y. Tally to decide whether X beats Y.",
          "모든 (x, y) 결과를 한 쌍씩 살펴봐. 각 쌍은 x > y, x < y, 또는 x = y. 합산해서 X 가 Y 를 이기는지 판정해.")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: A, marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>X:</span>
          {X.map((v, k) => (
            <div key={k} style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: `1.5px solid ${A}`, background: "#fff",
              fontSize: 14, fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace",
            }}>{v}</div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0891b2", marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>Y:</span>
          {Y.map((v, k) => (
            <div key={k} style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: `1.5px solid #0891b2`, background: "#fff",
              fontSize: 14, fontWeight: 700, color: "#0891b2", fontFamily: "'JetBrains Mono',monospace",
            }}>{v}</div>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: `auto repeat(${Y.length}, 1fr)`,
        gap: 3, background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: 8, marginBottom: 10, fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
      }}>
        <div></div>
        {Y.map((v, j) => (
          <div key={`h${j}`} style={{ textAlign: "center", color: "#0891b2", fontWeight: 700, padding: "2px 0" }}>y={v}</div>
        ))}
        {X.map((xv, i) => (
          <RowFragment key={`row${i}`} i={i} xv={xv} Y={Y} pairs={pairs} step={step}
            kindBg={kindBg} kindBd={kindBd} kindCol={kindCol} accent={A} />
        ))}
      </div>

      <div style={{
        background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: "8px 10px", marginBottom: 10, fontSize: 12,
        fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 700, color: "#7f1d1d", marginBottom: 4, fontFamily: "inherit" }}>
          {t(E, "Pairs revealed", "공개된 쌍")} ({Math.min(step, n)} / {n})
        </div>
        {step === 0 && (
          <div style={{ color: C.dim, fontStyle: "italic" }}>
            {t(E, "Tap 'Next pair' to reveal the first (x, y) outcome.",
                  "'다음 쌍' 을 눌러 첫 (x, y) 결과를 공개해.")}
          </div>
        )}
        {step > 0 && pairs.slice(Math.max(0, step - 3), step).map((p, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: C.dim, minWidth: 28 }}>#{Math.max(0, step - 3) + k + 1}</span>
            <span style={{ color: A, fontWeight: 700 }}>x={p.x}</span>
            <span style={{ color: C.dim }}>vs</span>
            <span style={{ color: "#0891b2", fontWeight: 700 }}>y={p.y}</span>
            <span style={{ color: C.dim }}>:</span>
            <span style={{ fontWeight: 700 }}>
              {p.x} {p.kind === "W" ? ">" : p.kind === "L" ? "<" : "="} {p.y}
            </span>
            <span style={{
              padding: "1px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              background: kindBg[p.kind], border: `1px solid ${kindBd[p.kind]}`, color: kindCol[p.kind],
            }}>
              {kindTxt(p.kind)}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          win = {win} &nbsp; lose = {lose} &nbsp; tie = {tie}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d" }}>
          {step < n
            ? t(E, "more to go…", "아직 남았어…")
            : t(E, "all 16 pairs counted ✓", "16 쌍 모두 세기 완료 ✓")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={advance} disabled={audited} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: audited ? "#e5e7eb" : A, color: audited ? "#9ca3af" : "#fff",
          fontSize: 12, fontWeight: 700, cursor: audited ? "default" : "pointer",
        }}>
          {step < n
            ? t(E, "▶ Next pair", "▶ 다음 쌍")
            : t(E, "🔍 Reveal verdict", "🔍 판정 공개")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 초기화")}
        </button>
      </div>

      {audited && (
        <div style={{
          background: verdict === "BEATS" ? "#ecfdf5" : "#eff6ff",
          border: `1px solid ${verdict === "BEATS" ? "#6ee7b7" : "#93c5fd"}`,
          borderRadius: 10, padding: "10px 14px",
          color: verdict === "BEATS" ? "#065f46" : "#1e3a8a",
          fontSize: 13, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 800, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            win ({totalWin}) {totalWin > totalLose ? ">" : "≤"} lose ({totalLose}) → {verdict === "BEATS" ? "X beats Y" : "X does NOT beat Y"}
          </div>
          <div style={{ fontSize: 12 }}>
            {verdict === "BEATS"
              ? t(E, "More x > y outcomes than x < y — X beats Y. beats(X, Y) returns True.",
                    "x > y 가 x < y 보다 많음 — X 가 Y 를 이김. beats(X, Y) 는 True.")
              : t(E, "win is not strictly greater than lose — X does NOT beat Y. beats(X, Y) returns False.",
                    "win 이 lose 보다 엄격히 크지 않음 — X 가 Y 를 이기지 못함. beats(X, Y) 는 False.")}
          </div>
        </div>
      )}
    </div>
  );
}

function RowFragment({ i, xv, Y, pairs, step, kindBg, kindBd, kindCol, accent }) {
  return (
    <>
      <div style={{ color: accent, fontWeight: 700, paddingRight: 4 }}>x={xv}</div>
      {Y.map((yv, j) => {
        const idx = i * Y.length + j;
        const revealed = idx < step;
        const isCurrent = idx === step;
        const p = pairs[idx];
        return (
          <div key={`c${i}-${j}`} style={{
            height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 5,
            background: revealed ? kindBg[p.kind] : (isCurrent ? "#fde2e2" : "#fff"),
            border: `1px solid ${revealed ? kindBd[p.kind] : (isCurrent ? accent : "#e5e7eb")}`,
            color: revealed ? kindCol[p.kind] : (isCurrent ? accent : "#cbd5e1"),
            fontWeight: 700,
            boxShadow: isCurrent ? `0 0 0 2px ${accent}33` : "none",
          }}>
            {revealed ? (p.kind === "W" ? ">" : p.kind === "L" ? "<" : "=") : "·"}
          </div>
        );
      })}
    </>
  );
}

const FULL_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    A = list(map(int, input().split()))",
  "    B = list(map(int, input().split()))",
  "",
  "    def beats(X, Y):",
  "        win = sum(1 for x in X for y in Y if x > y)",
  "        lose = sum(1 for x in X for y in Y if x < y)",
  "        return win > lose",
  "",
  "    if not beats(A, B):",
  "        print('no')",
  "        continue",
  "",
  "    found = False",
  "    # Brute force all possible die C (4 sides, values 1-10)",
  "    for c1 in range(1, 11):",
  "        for c2 in range(c1, 11):",
  "            for c3 in range(c2, 11):",
  "                for c4 in range(c3, 11):",
  "                    C_die = [c1, c2, c3, c4]",
  "                    if beats(B, C_die) and beats(C_die, A):",
  "                        found = True",
  "                        break",
  "                if found: break",
  "            if found: break",
  "        if found: break",
  "",
  "    print('yes' if found else 'no')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int _t = 0; _t < T; _t++) {",
  "        // assume 3 elements per group (USACO problem default)",
  "        vector<int> A(3), B(3);",
  "        for (auto& x : A) cin >> x;",
  "        for (auto& x : B) cin >> x;",
  "        auto beats = [&](vector<int>& X, vector<int>& Y) {",
  "            int win = 0, lose = 0;",
  "            for (int x : X) for (int y : Y) {",
  "                if (x > y) win++; else if (x < y) lose++;",
  "            }",
  "            return win > lose;",
  "        };",
  "        cout << (beats(A, B) ? \"yes\" : \"no\") << \"\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getNonTransSections(E) {
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

export function NonTransProgressiveCode(props) {
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


export function downloadNonTransPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "NonTrans — Full Study Guide", "NonTrans — 종합 풀이 노트");
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

