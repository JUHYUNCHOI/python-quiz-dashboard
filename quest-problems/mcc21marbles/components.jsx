import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";
const KA = { wordBreak: "keep-all" };

// Concept sim: walk left→right over D = A - B, carrying the running prefix
// imbalance across each boundary. The absolute value of the carry at each
// boundary is exactly how many single-marble adjacent moves must cross it —
// so the answer is the sum of |carry| over all boundaries.
export function Mcc21MarblesBoundarySim({ E }) {
  const START = [2, 2, 2, 6, 3];   // A — official sample
  const TARGET = [1, 2, 3, 4, 5];  // B — official sample  → answer 4
  const N = START.length;
  const [step, setStep] = useState(0); // 0..N-1, boundary index after box `step`

  const diff = (i) => START[i] - TARGET[i];
  // carry after processing box i = sum_{k<=i} (A[k] - B[k])
  const carry = (i) => {
    let s = 0;
    for (let k = 0; k <= i; k++) s += diff(k);
    return s;
  };
  // total ops up to (not including) boundary `s`  (boundaries 0..s-1)
  const opsUpTo = (s) => {
    let total = 0;
    for (let i = 0; i < s; i++) total += Math.abs(carry(i));
    return total;
  };

  const cur = step;             // current boundary being highlighted (0..N-2), N-1 = done
  const done = cur >= N - 1;
  const liveCarry = done ? carry(N - 2) : carry(cur);
  const liveOps = done ? opsUpTo(N - 1) : opsUpTo(cur) + Math.abs(liveCarry);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center", ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
          🔍 {t(E, "Carry-across Sim", "경계 넘기기 시뮬")}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.5 }}>
          {t(E,
            "Each box's D = A − B. Walk left → right: the running total MUST cross each boundary — that's exactly the marbles moved there.",
            "각 상자의 D = A − B. 왼쪽 → 오른쪽으로: 누적 합은 반드시 그 경계를 건너야 해요 — 그게 그 자리에서 옮기는 구슬 수예요.")}
        </div>
      </div>

      {/* Boxes: A (start) row, B (target) row, boundaries between */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 0, marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>
        {START.map((v, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{
              minWidth: 60, padding: "8px 6px", borderRadius: 8,
              border: `2px solid ${i <= cur ? "#dc2626" : "#e5e7eb"}`,
              background: i <= cur ? "#fef2f2" : "#fff",
              textAlign: "center",
              transition: "all .25s",
            }}>
              <div style={{ fontSize: 9, color: C.dim }}>{t(E, "box", "상자")} {i}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: i <= cur ? "#dc2626" : C.text }}>{v}</div>
              <div style={{ fontSize: 10, color: "#7c3aed" }}>→ {TARGET[i]}</div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>
                {t(E, "D ", "D ")}{diff(i) >= 0 ? "+" : ""}{diff(i)}
              </div>
            </div>
            {i < N - 1 && (
              <div style={{
                width: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
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
        <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", ...KA }}>
          <div style={{ fontSize: 10, color: C.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {t(E, "Carry across edge", "경계 통과 carry")} {done ? N - 2 : cur}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#dc2626", fontFamily: "JetBrains Mono, monospace" }}>
            {liveCarry >= 0 ? "+" : ""}{liveCarry}
          </div>
          <div style={{ fontSize: 10, color: C.dim }}>
            {liveCarry > 0 && t(E, "→ surplus flows right", "→ 남는 구슬이 오른쪽으로")}
            {liveCarry < 0 && t(E, "← marbles pulled left", "← 구슬이 왼쪽으로 당겨짐")}
            {liveCarry === 0 && t(E, "balanced — no crossing", "균형 — 통과 없음")}
          </div>
        </div>
        <div style={{ background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 10px", ...KA }}>
          <div style={{ fontSize: 10, color: "#b91c1c", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {t(E, "Total ops so far", "지금까지 총 이동")}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#b91c1c", fontFamily: "JetBrains Mono, monospace" }}>
            {liveOps}
          </div>
          <div style={{ fontSize: 10, color: "#b91c1c" }}>
            {t(E, "= sum of |carry|", "= |carry| 의 합")}
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
        <div style={{ marginTop: 12, background: "#fff1f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", textAlign: "center", ...KA }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#b91c1c" }}>
            ✅ {t(E,
              `Answer = sum of |carry| at each boundary = ${liveOps}`,
              `정답 = 각 경계에서 |carry| 의 합 = ${liveOps}`)}
          </div>
          <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 4 }}>
            {t(E,
              "Each boundary must pass exactly the accumulated imbalance — one O(N) pass.",
              "각 경계는 쌓인 불균형만큼을 정확히 넘겨야 해요 — O(N) 한 번 훑기.")}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "A = list(map(int, input().split()))",
  "B = list(map(int, input().split()))",
  "",
  "# D[i] = A[i] - B[i] : surplus (+) or shortage (-) at box i.",
  "# 경계마다 넘겨야 하는 구슬 = D 의 누적(prefix). 답 = 그 |누적| 의 합.",
  "ops = 0",
  "carry = 0",
  "for i in range(N):",
  "    carry += A[i] - B[i]",
  "    ops += abs(carry)",
  "",
  "print(ops)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<long long> A(N), B(N);",
  "    for (int i = 0; i < N; i++) cin >> A[i];",
  "    for (int i = 0; i < N; i++) cin >> B[i];",
  "",
  "    // carry = running prefix of D = A - B; answer = sum of |carry|.",
  "    long long ops = 0, carry = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        carry += A[i] - B[i];",
  "        ops += (carry < 0 ? -carry : carry);",
  "    }",
  "    cout << ops << \"\\n\";",
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
        t(E, "Reformulate with D[i] = A[i] − B[i]: box i has a surplus (D>0) or a shortage (D<0). Marbles only cross boundaries between neighbors.",
            "D[i] = A[i] − B[i] 로 바꿔 생각해요: 상자 i 는 남거나(D>0) 모자라요(D<0). 구슬은 이웃 사이의 경계만 건너요."),
        t(E, "Whatever imbalance sits to the LEFT of a boundary must cross it. That amount is the running prefix of D, so the answer = sum of |prefix| at every boundary — one left-to-right O(N) pass.",
            "경계 왼쪽에 남은 불균형은 반드시 그 경계를 건너야 해요. 그 양이 D 의 누적(prefix) 이므로, 답 = 경계마다 |누적| 의 합 — 왼쪽부터 O(N) 한 번 훑기."),
        t(E, "Use 64-bit (long long): sum(A) can reach 5·10¹¹, far beyond 32-bit range.",
            "64비트(long long) 사용: sum(A) 가 5·10¹¹ 까지라 32비트 범위를 훌쩍 넘어요."),
      ],
      pyOnly: [
        t(E, "Python ints are unbounded, so abs(carry) never overflows — no special type needed.",
            "Python 정수는 크기 제한이 없어서 abs(carry) 가 넘칠 일이 없어요 — 특별한 타입 불필요."),
      ],
      cppOnly: [
        t(E, "Declare A, B, carry, ops as long long — totals up to 5·10¹¹ overflow a 32-bit int.",
            "A, B, carry, ops 를 long long 으로 — 합이 5·10¹¹ 까지라 32비트 int 는 넘쳐요."),
        t(E, "Read A fully, then B fully (two separate loops) — they arrive on two lines.",
            "A 를 다 읽고 그다음 B 를 다 읽어요 (반복문 두 개) — 두 줄로 들어와요."),
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
