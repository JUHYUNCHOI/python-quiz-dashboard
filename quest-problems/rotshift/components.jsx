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
        {done && <span style={{ marginLeft: 8 }}>✓ {t(E, "matches expected '1 2 3 4 0'", "기댓값 '1 2 3 4 0' 과 똑같아요")}</span>}
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
          ↺ {t(E, "Reset", "처음으로")}
        </button>
      </div>

      <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        {t(E,
          "Each press: cows on ★ positions cycle one slot forward, then every ★ position itself slides +1 (mod N).",
          "한 번 누르면 ★ 위치의 소들이 한 칸 돌아요. 그 다음 ★ 위치 자체가 +1 (mod N) 만큼 옮겨가요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "from bisect import bisect_right",
  "",
  "N, K, T = map(int, input().split())",
  "active = list(map(int, input().split()))",
  "",
  "result = [0] * N",
  "for p in range(N):",
  "    # slot = the active position closest BEHIND p (sweeps into p first)",
  "    slot = bisect_right(active, p) - 1",
  "    wait = p - active[slot]",
  "    if slot + 1 < K:",
  "        gap = active[slot + 1] - active[slot]",
  "    else:",
  "        gap = N - active[slot]",
  "",
  "    if wait >= T:",
  "        final = p                          # never reached in time",
  "    else:",
  "        hits = (T - 1 - wait) // gap + 1    # how many times p gets swept",
  "        final = (p + hits * gap) % N",
  "",
  "    result[final] = p",
  "",
  "print(' '.join(str(x) for x in result))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    long long T;",
  "    cin >> N >> K >> T;",
  "    vector<long long> active(K);",
  "    for (int i = 0; i < K; i++) {",
  "        cin >> active[i];",
  "    }",
  "",
  "    vector<int> result(N);",
  "    for (int p = 0; p < N; p++) {",
  "        int slot = int(upper_bound(active.begin(), active.end(), p) - active.begin()) - 1;",
  "        long long wait = p - active[slot];",
  "        long long gap;",
  "        if (slot + 1 < K) {",
  "            gap = active[slot + 1] - active[slot];",
  "        } else {",
  "            gap = N - active[slot];",
  "        }",
  "",
  "        long long finalPos;",
  "        if (wait >= T) {",
  "            finalPos = p;",
  "        } else {",
  "            long long hits = (T - 1 - wait) / gap + 1;",
  "            finalPos = (p + hits * gap) % N;",
  "        }",
  "",
  "        result[finalPos] = p;",
  "    }",
  "",
  "    for (int p = 0; p < N; p++) {",
  "        if (p + 1 == N) {",
  "            cout << result[p] << \"\\n\";",
  "        } else {",
  "            cout << result[p] << \" \";",
  "        }",
  "    }",
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
        t(E, "What do we need? After T minutes, which cow ends up at each\nposition p (0..N−1).",
            "무엇을 내놓아야 하나요? T 분 뒤 각 위치 p (0..N−1) 에\n있는 소예요."),
        t(E, "Each minute does two things in order: cows on the K active\npositions rotate one slot, then those active positions shift +1.",
            "매 분 두 가지 일이 순서대로 일어나요. 먼저 활성 위치 K 개의 소들이\n한 칸씩 돌고, 그다음 그 활성 위치들이 +1 씩 옮겨가요."),
        t(E, "T is up to 10^9, so repeating the loop is too slow. But each\nposition p is only ever swept by ONE fixed slot, at a fixed rhythm —\nfind that slot, then jump straight to where p ends up.",
            "T 는 10^9 까지 커서 그대로 반복할 수 없어요. 대신 위치 p 는\n딱 하나의 고정된 슬롯에게만, 일정한 간격으로 휩쓸려요.\n그 슬롯을 찾아서 p 가 도착할 자리로 바로 건너뛰어요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, ...). 그래야 코드가 뭘 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
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
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

