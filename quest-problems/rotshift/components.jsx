// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 1/10 (TLE - O(T*N*K) brute, T up to 10^9)
//   C++:    7/10 (TLE 8-10, T up to 10^9)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ───────────────────────────────────────────────────────────────
   Interactive rotate-and-shift sim — official Sample 1 (N=5, K=3, T=4)
   Press ▶ Step to advance one minute: rotate cows on active
   positions, then shift every active position by +1 (mod N).
   ─────────────────────────────────────────────────────────────── */
const SIM_N = 5;
const SIM_INIT_ACTIVE = [0, 2, 3];
const SIM_T = 4;

function _simStep(state) {
  const { N, active, pos } = state;
  const K = active.length;
  const newPos = pos.slice();
  // 1) rotate
  for (let j = 0; j < K; j++) {
    for (let c = 0; c < N; c++) {
      if (pos[c] === active[j]) {
        newPos[c] = active[(j + 1) % K];
        break;
      }
    }
  }
  // 2) shift
  const newActive = active.map(a => (a + 1) % N);
  return { N, active: newActive, pos: newPos };
}

export function RotShiftSim({ E }) {
  const init = () => ({
    N: SIM_N,
    active: SIM_INIT_ACTIVE.slice(),
    pos: Array.from({ length: SIM_N }, (_, i) => i),
  });
  const [state, setState] = useState(init);
  const [step, setStep] = useState(0);

  const atPos = Array(state.N).fill(-1);
  for (let c = 0; c < state.N; c++) atPos[state.pos[c]] = c;
  const activeSet = new Set(state.active);

  const onStep = () => {
    if (step >= SIM_T) return;
    setState(s => _simStep(s));
    setStep(s => s + 1);
  };
  const onReset = () => { setState(init()); setStep(0); };

  const done = step >= SIM_T;
  const outputLine = atPos.join(" ");

  return (
    <div style={{ background: "#f5f3ff", border: `1.5px solid ${A}`, borderRadius: 14, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#5b21b6" }}>
          🎮 {t(E, "Try it: N=5, active=[0,2,3], T=4", "직접 해봐요: N=5, active=[0,2,3], T=4")}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: done ? "#15803d" : "#5b21b6" }}>
          {t(E, "Minute", "분")} {step} / {SIM_T}
        </div>
      </div>

      {/* positions row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        {Array.from({ length: state.N }, (_, p) => {
          const isActive = activeSet.has(p);
          return (
            <div key={p} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 600 }}>
                {t(E, "p", "위치")}={p}
              </div>
              <div style={{
                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "50%", fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700,
                background: isActive ? "#ddd6fe" : "#f1f5f9",
                border: `2px solid ${isActive ? "#8b5cf6" : "#cbd5e1"}`,
                color: isActive ? "#5b21b6" : "#64748b",
                transition: "all 0.25s ease",
              }}>
                {atPos[p]}
              </div>
              <div style={{ fontSize: 9, color: isActive ? "#8b5cf6" : C.dim, fontWeight: 700 }}>
                {isActive ? (E ? "★ active" : "★ 활성") : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* active set + current state */}
      <div style={{ display: "flex", justifyContent: "center", gap: 14, fontSize: 11, color: "#5b21b6", margin: "10px 0", flexWrap: "wrap" }}>
        <span><b>active</b> = [{state.active.join(", ")}]</span>
        <span><b>{t(E, "cow positions", "소 위치")}</b> = [{state.pos.join(", ")}]</span>
      </div>

      {/* output line */}
      <div style={{
        background: done ? "#dcfce7" : "#fff",
        border: `1.5px solid ${done ? "#16a34a" : "#c4b5fd"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
        color: done ? "#166534" : "#5b21b6", textAlign: "center", fontWeight: 700,
      }}>
        {t(E, "output", "출력")}: {outputLine}
        {done && <span style={{ marginLeft: 8 }}>✓ {t(E, "matches expected '1 2 3 4 0'", "기댓값 '1 2 3 4 0' 과 일치")}</span>}
      </div>

      {/* controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button onClick={onStep} disabled={done} style={{
          background: done ? "#cbd5e1" : A, color: "#fff", border: "none",
          borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700,
          cursor: done ? "not-allowed" : "pointer",
        }}>
          ▶ {t(E, "Step (rotate + shift)", "Step (회전 + 이동)")}
        </button>
        <button onClick={onReset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>
          ↺ {t(E, "Reset", "초기화")}
        </button>
      </div>

      <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        {t(E,
          "Each press: cows on ★ positions cycle one slot forward, then every ★ position itself slides +1 (mod N).",
          "한 번 누를 때마다: ★ 위치 소들이 순환 한 칸 → 그 다음 ★ 위치 자체가 +1 mod N 이동.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "N = int(data[0]); K = int(data[1]); T = int(data[2])",
  "active = [int(data[3 + i]) for i in range(K)]",
  "",
  "pos = list(range(N))   # pos[c] = current position of cow c",
  "",
  "for step in range(T):",
  "    new_pos = pos[:]",
  "    # 1) Rotate: cow at active[j] moves to active[(j+1) % K]",
  "    for j in range(K):",
  "        for c in range(N):",
  "            if pos[c] == active[j]:",
  "                new_pos[c] = active[(j + 1) % K]",
  "                break",
  "    pos = new_pos",
  "    # 2) Shift: active positions all move +1 (mod N)",
  "    active = [(a + 1) % N for a in active]",
  "",
  "# Output: at each position p, which cow is there.",
  "at_position = [0] * N",
  "for c in range(N):",
  "    at_position[pos[c]] = c",
  "print(' '.join(str(x) for x in at_position))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <numeric>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K, T; cin >> N >> K >> T;",
  "    vector<int> active(K);",
  "    for (auto& a : active) cin >> a;",
  "    vector<int> pos(N);",
  "    iota(pos.begin(), pos.end(), 0);",
  "",
  "    for (int _t = 0; _t < T; _t++) {",
  "        // Inverse map: at[p] = cow currently at position p",
  "        vector<int> at(N, -1);",
  "        for (int c = 0; c < N; c++) at[pos[c]] = c;",
  "        vector<int> newPos = pos;",
  "        for (int j = 0; j < K; j++) {",
  "            int cow = at[active[j]];",
  "            if (cow >= 0) newPos[cow] = active[(j + 1) % K];",
  "        }",
  "        pos = newPos;",
  "        for (int j = 0; j < K; j++) active[j] = (active[j] + 1) % N;",
  "    }",
  "",
  "    vector<int> out(N);",
  "    for (int c = 0; c < N; c++) out[pos[c]] = c;",
  "    for (int p = 0; p < N; p++) cout << out[p] << (p + 1 == N ? '\\n' : ' ');",
  "    return 0;",
  "}",
];

export function getRotShiftSections(E) {
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

export function RotShiftProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadRotShiftPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "RotShift — Full Study Guide", "RotShift — 종합 풀이 노트");
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

