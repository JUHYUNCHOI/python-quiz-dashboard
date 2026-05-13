import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   CrossRoad3Sim — step through cows in arrival order, advancing
   the gate's free-time. For each cow we show:
     • whether the gate is free before/after cow arrives
     • new current_time after this cow finishes
   ═══════════════════════════════════════════════════════════════ */
const _CR3_PRESETS = [
  { label: "A(0,5) B(3,2)",       cows: [["A", 0, 5], ["B", 3, 2]] },
  { label: "A(0,3) B(1,5) C(10,2)", cows: [["A", 0, 3], ["B", 1, 5], ["C", 10, 2]] },
  { label: "Out-of-order × 3",     cows: [["A", 5, 2], ["B", 0, 4], ["C", 2, 3]] },
  { label: "Spread-out × 3",       cows: [["A", 0, 2], ["B", 5, 3], ["C", 10, 1]] },
];

// Sort by arrival, then walk and produce per-step traces.
function _cr3Trace(rawCows) {
  const sorted = [...rawCows].sort((a, b) => a[1] - b[1]);
  const trace = [];
  let cur = 0;
  for (const [name, arr, dur] of sorted) {
    const waited = cur < arr;
    const start = waited ? arr : cur;
    const finish = start + dur;
    trace.push({ name, arr, dur, before: cur, waited, start, finish });
    cur = finish;
  }
  return { sorted, trace, finalTime: cur };
}

export function CrossRoad3Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const preset = _CR3_PRESETS[pi];
  const { sorted, trace, finalTime } = _cr3Trace(preset.cows);

  const cur = stepIdx > 0 ? trace[stepIdx - 1] : null;
  const curTime = stepIdx > 0 ? trace[stepIdx - 1].finish : 0;

  const colorGate = "#8b5cf6";
  const colorWait = "#0891b2";
  const colorPass = "#16a34a";

  const eventBox = () => {
    if (!cur) return t(E, "Press → to process the first cow (sorted by arrival).",
                       "→ 를 눌러 첫 소를 처리해요 (도착순 정렬).");
    return (
      <>
        <div>
          {t(E, "Cow ", "소 ")}
          <b style={{ color: colorGate }}>{cur.name}</b>
          {t(E, " (arrives at ", " (도착 ")}<b>{cur.arr}</b>
          {t(E, ", takes ", ", 소요 ")}<b>{cur.dur}</b>{t(E, " sec)", "초)")}
        </div>
        <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          {t(E, "gate free at ", "문 비는 시각 ")}
          <b>{cur.before}</b>{" → "}
          {cur.waited
            ? <span style={{ color: colorWait, fontWeight: 800 }}>
                {t(E, `gate idle, wait until t=${cur.arr}`, `문 놀고 있음, t=${cur.arr} 까지 대기`)}
              </span>
            : <span style={{ color: "#9a3412", fontWeight: 800 }}>
                {t(E, `cow queues — gate busy past her arrival`, `소가 대기 — 문이 도착시각 이후까지 사용 중`)}
              </span>}
        </div>
        <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          {t(E, "start ", "시작 ")}<b>{cur.start}</b>
          {t(E, " + dur ", " + 소요 ")}<b>{cur.dur}</b>{" → "}
          <span style={{ color: colorPass, fontWeight: 800 }}>
            {t(E, `finishes at t=${cur.finish}`, `t=${cur.finish} 에 끝남`)}
          </span>
        </div>
      </>
    );
  };

  const cowRow = (c, idx) => {
    const done = idx < stepIdx - 1;
    const isCur = idx === stepIdx - 1;
    const tr = idx < stepIdx ? trace[idx] : null;
    const bg = isCur ? "#f5f3ff" : (done ? "#fff" : "#fff");
    const bd = isCur ? colorGate : (done ? "#c4b5fd" : C.border);
    const fg = done || isCur ? C.text : C.dim;
    return (
      <div key={idx} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "6px 10px", borderRadius: 8,
        border: `1.5px solid ${bd}`, background: bg,
        opacity: done || isCur ? 1 : 0.5,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
      }}>
        <div style={{ fontWeight: 800, color: colorGate, minWidth: 18 }}>{c[0]}</div>
        <div style={{ color: fg }}>arr=<b>{c[1]}</b></div>
        <div style={{ color: fg }}>dur=<b>{c[2]}</b></div>
        {tr && (
          <div style={{ marginLeft: "auto", color: colorPass, fontWeight: 700 }}>
            → finish=<b>{tr.finish}</b>
          </div>
        )}
        {isCur && !tr && (
          <div style={{ marginLeft: "auto", color: colorGate, fontWeight: 700 }}>
            ⏳ {t(E, "now", "처리 중")}
          </div>
        )}
      </div>
    );
  };

  // Timeline strip — shows gate-busy intervals so far.
  const tMax = Math.max(finalTime, ...preset.cows.map(c => c[1] + c[2])) + 1;
  const timeline = () => {
    const cells = [];
    for (let i = 0; i < tMax; i++) {
      // figure out which cow (if any) is occupying the gate at time i
      let owner = null;
      for (let k = 0; k < stepIdx; k++) {
        const tr = trace[k];
        if (i >= tr.start && i < tr.finish) { owner = tr; break; }
      }
      const filled = !!owner;
      const isCurOwner = owner && cur && owner.name === cur.name;
      cells.push(
        <div key={i} style={{
          flex: "0 0 auto", width: 20, height: 22,
          borderRight: i === tMax - 1 ? `1px solid ${C.border}` : "none",
          borderTop: `1.5px solid ${C.border}`, borderBottom: `1.5px solid ${C.border}`,
          borderLeft: i === 0 ? `1px solid ${C.border}` : "none",
          background: filled ? (isCurOwner ? colorGate : "#c4b5fd") : "#fff",
          color: filled ? "#fff" : C.dim,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700,
        }}>{filled ? owner.name : ""}</div>
      );
    }
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "flex-start", overflowX: "auto" }}>
          {cells}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", overflowX: "auto", marginTop: 2 }}>
          {Array.from({ length: tMax }).map((_, i) => (
            <div key={i} style={{ flex: "0 0 auto", width: 20, textAlign: "center", fontSize: 9, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{i}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_CR3_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStepIdx(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Sorted cow list */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "cows sorted by arrival time", "도착 시각 순으로 정렬된 소들")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sorted.map((c, i) => cowRow(c, i))}
        </div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}`, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          current_time = <b style={{ color: colorPass }}>{curTime}</b>
          <span style={{ color: C.dim }}>{"  ("}{stepIdx}/{trace.length}{")"}</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "gate timeline (each cell = 1 sec)", "문 사용 타임라인 (한 칸 = 1초)")}
        </div>
        {timeline()}
      </div>

      {/* event narration */}
      <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: "#5b21b6", lineHeight: 1.6, minHeight: 60 }}>
        {eventBox()}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0} style={{
          background: stepIdx === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${stepIdx === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: stepIdx === 0 ? "#b0b5c3" : A,
          cursor: stepIdx === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{stepIdx} / {trace.length}</span>
        <button onClick={() => setStepIdx(Math.min(trace.length, stepIdx + 1))} disabled={stepIdx === trace.length} style={{
          background: stepIdx === trace.length ? "#e5e7eb" : A, border: `1px solid ${stepIdx === trace.length ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: stepIdx === trace.length ? "#b0b5c3" : "#fff", cursor: stepIdx === trace.length ? "default" : "pointer",
        }}>→</button>
        <button onClick={() => setStepIdx(0)} disabled={stepIdx === 0} style={{
          background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "5px 10px", fontSize: 11, fontWeight: 600, color: C.dim,
          cursor: stepIdx === 0 ? "default" : "pointer",
        }}>{t(E, "reset", "초기화")}</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "import sys",
  "sys.stdin = open('cowqueue.in')",
  "sys.stdout = open('cowqueue.out', 'w')",
  "",
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    a, d = map(int, input().split())",
  "    cows.append((a, d))",
  "",
  "# Sort by arrival time",
  "cows.sort()",
  "",
  "current_time = 0",
  "for arrival, duration in cows:",
  "    # If gate is free before cow arrives, wait for cow",
  "    if current_time < arrival:",
  "        current_time = arrival",
  "    current_time += duration",
  "",
  "print(current_time)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <utility>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    freopen(\"cowqueue.in\", \"r\", stdin);",
  "    freopen(\"cowqueue.out\", \"w\", stdout);",
  "",
  "    int N; cin >> N;",
  "    vector<pair<int,int>> cows(N);",
  "    for (auto& [a, d] : cows) cin >> a >> d;",
  "    sort(cows.begin(), cows.end());",
  "    int curEnd = 0, used = 0;",
  "    for (auto& [a, d] : cows) {",
  "        int start = max(a, curEnd);",
  "        curEnd = start + d;",
  "        used++;",
  "    }",
  "    cout << used << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCrossRoad3Sections(E) {
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

export function CrossRoad3ProgressiveCode(props) {
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


export function downloadCrossRoad3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CrossRoad3 — Full Study Guide", "CrossRoad3 — 종합 풀이 노트");
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

