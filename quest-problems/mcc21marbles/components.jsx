import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

// Deep-audit sim: walk left→right, carry the running prefix imbalance across
// each boundary. The absolute value of the carry at each boundary is exactly
// how many single-marble adjacent moves must cross it — i.e. the answer.
export function Mcc21MarblesBoundarySim({ E }) {
  const SAMPLE = [7, 2, 6, 1]; // total 16, target 4
  const target = SAMPLE.reduce((a, b) => a + b, 0) / SAMPLE.length;
  const N = SAMPLE.length;
  const [step, setStep] = useState(0); // 0..N-1, boundary index after box `step`

  // carry after processing box i = sum_{k<=i} (a[k] - target)
  const carry = (i) => {
    let s = 0;
    for (let k = 0; k <= i; k++) s += SAMPLE[k] - target;
    return s;
  };
  // total ops up to and including boundary `step-1` (boundaries 0..step-1)
  const opsUpTo = (s) => {
    let total = 0;
    for (let i = 0; i < s; i++) total += Math.abs(carry(i));
    return total;
  };

  const cur = step;       // current boundary being highlighted (0..N-2), or N-1 = done
  const done = cur >= N - 1;
  const liveCarry = done ? carry(N - 2) : carry(cur);
  const liveOps = done ? opsUpTo(N - 1) : opsUpTo(cur) + Math.abs(liveCarry);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
          🔍 {t(E, "Deep-Audit Sim", "심층 시뮬")}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.5 }}>
          {t(E,
            "Walk left → right. The running imbalance MUST cross each boundary — that's exactly the marbles we move there.",
            "왼쪽 → 오른쪽으로 걸어가요. 누적 불균형은 반드시 그 경계를 건너야 해요 — 그게 그 자리에서 옮기는 구슬 수예요.")}
        </div>
      </div>

      {/* Boxes + boundaries */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 0, marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>
        {SAMPLE.map((v, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{
              minWidth: 56, padding: "10px 6px", borderRadius: 8,
              border: `2px solid ${i <= cur ? "#dc2626" : "#e5e7eb"}`,
              background: i <= cur ? "#fef2f2" : "#fff",
              textAlign: "center",
              transition: "all .25s",
            }}>
              <div style={{ fontSize: 10, color: C.dim }}>a[{i}]</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: i <= cur ? "#dc2626" : C.text }}>{v}</div>
              <div style={{ fontSize: 9, color: C.dim }}>
                {t(E, "diff ", "차이 ")}{v - target >= 0 ? "+" : ""}{v - target}
              </div>
            </div>
            {i < N - 1 && (
              <div style={{
                width: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                color: i === cur && !done ? "#dc2626" : "#cbd5e1",
                fontWeight: 800, fontSize: 11,
                transform: i === cur && !done ? "scale(1.15)" : "scale(1)",
                transition: "all .2s",
              }}>
                <div style={{ fontSize: 9 }}>{t(E, "edge", "경계")}{i}</div>
                <div style={{ fontSize: 16 }}>{i <= cur ? (carry(i) === 0 ? "·" : (carry(i) > 0 ? "→" : "←")) : "│"}</div>
                <div>{i <= cur ? Math.abs(carry(i)) : ""}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live state */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {t(E, "Carry across edge", "경계 통과 carry")} {done ? N - 2 : cur}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#dc2626", fontFamily: "JetBrains Mono, monospace" }}>
            {liveCarry >= 0 ? "+" : ""}{liveCarry}
          </div>
          <div style={{ fontSize: 10, color: C.dim }}>
            {liveCarry > 0 && t(E, "→ marbles flow right", "→ 구슬이 오른쪽으로")}
            {liveCarry < 0 && t(E, "← marbles flow left", "← 구슬이 왼쪽으로")}
            {liveCarry === 0 && t(E, "balanced — no crossing", "균형 — 통과 없음")}
          </div>
        </div>
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: "#15803d", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {t(E, "Total ops so far", "지금까지 총 이동")}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#15803d", fontFamily: "JetBrains Mono, monospace" }}>
            {liveOps}
          </div>
          <div style={{ fontSize: 10, color: "#15803d" }}>
            target = {target}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button onClick={() => setStep(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#f1f5f9" : "#fff", color: cur === 0 ? "#cbd5e1" : "#dc2626",
          border: `1.5px solid ${cur === 0 ? "#e2e8f0" : "#dc2626"}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: cur === 0 ? "not-allowed" : "pointer",
        }}>← {t(E, "Back", "이전")}</button>
        <button onClick={() => setStep(Math.min(N - 1, cur + 1))} disabled={done} style={{
          background: done ? "#f1f5f9" : "#dc2626", color: done ? "#cbd5e1" : "#fff",
          border: `1.5px solid ${done ? "#e2e8f0" : "#dc2626"}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: done ? "not-allowed" : "pointer",
        }}>{t(E, "Cross next edge", "다음 경계 통과")} →</button>
        <button onClick={() => setStep(0)} style={{
          background: "#fff", color: "#64748b", border: "1.5px solid #cbd5e1", borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "초기화")}</button>
      </div>

      {done && (
        <div style={{ marginTop: 12, background: "#f0fdf4", border: "1.5px solid #15803d", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>
            ✅ {t(E,
              `Answer = sum of |carry| at each edge = ${liveOps}`,
              `정답 = 각 경계에서 |carry| 의 합 = ${liveOps}`)}
          </div>
          <div style={{ fontSize: 11, color: "#15803d", marginTop: 4 }}>
            {t(E,
              "That's exactly what SOLUTION_CODE computes — one pass, O(N).",
              "이것이 SOLUTION_CODE 가 계산하는 값 — 한 번 훑기, O(N).")}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "total = sum(a)",
  "target = total // N",
  "extra = total % N",
  "",
  "ops = 0",
  "for i in range(N):",
  "    diff = a[i] - target - (1 if i < extra else 0)",
  "    ops += abs(diff)",
  "",
  "print(ops // 2)",
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
  "    vector<long long> a; { long long _x; while (cin >> _x) a.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    auto total = sum(a);",
  "    auto target = total // N;",
  "    auto extra = total % N;",
  "",
  "    auto ops = 0;",
  "    for (long long i = 0; i < N; i++) {",
  "        auto diff = a[i] - target - (1 if i < extra else 0);",
  "        ops += abs(diff);",
  "",
  "    cout << ops // 2 << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc21MarblesSections(E) {
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

export function Mcc21MarblesProgressiveCode(props) {
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


export function downloadMcc21MarblesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Marbles — Full Study Guide", "Mcc21Marbles — 종합 풀이 노트");
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

