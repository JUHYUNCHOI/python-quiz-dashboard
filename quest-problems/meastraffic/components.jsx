import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ================================================================
   Range Propagation Sim — editable bounds, play to propagate
   Eye-evident: a 4-segment highway where the student edits each
   segment's bounds (sensor lo/hi or ramp k), then presses Play to
   watch the [min,max] flow propagate left→right one segment at a
   time. Forward pass only — keeps the visual simple.
   ================================================================ */
export function TrafficPropagateSim({ E }) {
  // Initial scenario: sensor → on-ramp → sensor → off-ramp
  const INITIAL = [
    { typ: "none", lo: 10, hi: 20, label: t(E, "Sensor", "센서") },
    { typ: "on",   lo: 5,  hi: 10, label: t(E, "On-ramp", "진입로") },
    { typ: "none", lo: 12, hi: 40, label: t(E, "Sensor", "센서") },
    { typ: "off",  lo: 2,  hi: 8,  label: t(E, "Off-ramp", "출구로") },
  ];
  const [segs, setSegs] = useState(INITIAL);
  const [step, setStep] = useState(0);   // 0..segs.length (number of propagations done)
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  // Propagate forward to compute [lo,hi] AFTER each segment index
  // ranges[0] = after segment 0 (= sensor's range); ranges[i] = after applying segs[i]
  const ranges = [];
  let lo = segs[0].lo, hi = segs[0].hi;
  ranges.push({ lo, hi });
  for (let i = 1; i < segs.length; i++) {
    const s = segs[i];
    if (s.typ === "none") { lo = Math.max(lo, s.lo); hi = Math.min(hi, s.hi); }
    else if (s.typ === "on")  { lo += s.lo; hi += s.hi; }
    else if (s.typ === "off") { lo -= s.hi; hi -= s.lo; }
    if (lo < 0) lo = 0;
    if (hi < lo) hi = lo; // empty range guard, visual only
    ranges.push({ lo, hi });
  }

  useEffect(() => {
    if (!playing) return;
    if (step >= segs.length) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setStep(s => s + 1), 700);
    return () => clearTimeout(timerRef.current);
  }, [playing, step, segs.length]);

  const reset = () => { setPlaying(false); setStep(0); };
  const play = () => {
    if (step >= segs.length) setStep(0);
    setPlaying(true);
  };

  const updateSeg = (i, field, val) => {
    setPlaying(false); setStep(0);
    setSegs(prev => prev.map((s, k) => k === i ? { ...s, [field]: Math.max(0, Number(val) || 0) } : s));
  };
  const cycleType = (i) => {
    if (i === 0) return; // first segment locked as sensor (provides initial range)
    const order = ["none", "on", "off"];
    setPlaying(false); setStep(0);
    setSegs(prev => prev.map((s, k) => {
      if (k !== i) return s;
      const next = order[(order.indexOf(s.typ) + 1) % 3];
      return { ...s, typ: next, label: next === "none" ? t(E, "Sensor", "센서") : next === "on" ? t(E, "On-ramp", "진입로") : t(E, "Off-ramp", "출구로") };
    }));
  };

  const TYPE_COLOR = {
    none: { fg: "#0891b2", bg: "#cffafe", bd: "#67e8f9" },
    on:   { fg: "#16a34a", bg: "#dcfce7", bd: "#86efac" },
    off:  { fg: "#dc2626", bg: "#fee2e2", bd: "#fca5a5" },
  };
  const opLabel = (s) => s.typ === "none" ? `[${s.lo}, ${s.hi}]` : s.typ === "on" ? `+[${s.lo}, ${s.hi}]` : `−[${s.lo}, ${s.hi}]`;

  return (
    <div style={{
      background: "#f8fafc", border: `1.5px dashed ${A}`, borderRadius: 12,
      padding: 14, marginTop: 6, marginBottom: 6,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: A, letterSpacing: 0.5, marginBottom: 8 }}>
        🧪 {t(E, "Try it: edit bounds, press Play to propagate", "직접 해보기: 값을 바꾸고 Play 로 전파해 봐")}
      </div>

      {/* Highway segments row */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {segs.map((s, i) => {
          const c = TYPE_COLOR[s.typ];
          const active = step > i; // propagation has reached AFTER segment i
          const current = step === i + 1; // just-applied segment
          return (
            <div key={i} style={{
              minWidth: 92,
              background: c.bg, border: `2px solid ${current ? A : c.bd}`,
              borderRadius: 10, padding: "6px 8px", textAlign: "center",
              boxShadow: current ? `0 0 0 3px ${A}33` : "none",
              transition: "box-shadow 200ms, border-color 200ms",
            }}>
              <button onClick={() => cycleType(i)} disabled={i === 0} title={t(E, "Click to change type", "클릭해서 타입 변경")} style={{
                background: "transparent", border: "none", padding: 0, cursor: i === 0 ? "default" : "pointer",
                fontSize: 10, fontWeight: 800, color: c.fg, letterSpacing: 0.3,
              }}>
                {s.label}{i === 0 ? " 🔒" : " ↻"}
              </button>
              <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 4 }}>
                <input type="number" value={s.lo} min={0} onChange={e => updateSeg(i, "lo", e.target.value)} style={{
                  width: 36, padding: "2px 4px", fontSize: 11, fontWeight: 700,
                  border: `1px solid ${c.bd}`, borderRadius: 4, textAlign: "center", color: c.fg, background: "#fff",
                }} />
                <input type="number" value={s.hi} min={0} onChange={e => updateSeg(i, "hi", e.target.value)} style={{
                  width: 36, padding: "2px 4px", fontSize: 11, fontWeight: 700,
                  border: `1px solid ${c.bd}`, borderRadius: 4, textAlign: "center", color: c.fg, background: "#fff",
                }} />
              </div>
              <div style={{ fontSize: 10, color: c.fg, marginTop: 3, fontWeight: 600 }}>{opLabel(s)}</div>
              {/* Range label after this segment */}
              <div style={{
                marginTop: 6, fontSize: 11, fontWeight: 800,
                color: active ? "#5b21b6" : "#cbd5e1",
                opacity: active ? 1 : 0.4, transition: "opacity 250ms, color 250ms",
              }}>
                {active ? `→ [${ranges[i].lo}, ${ranges[i].hi}]` : "→ [?, ?]"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={play} disabled={playing} style={{
          background: playing ? "#cbd5e1" : A, color: "#fff",
          border: "none", borderRadius: 8, padding: "5px 14px",
          fontSize: 12, fontWeight: 800, cursor: playing ? "default" : "pointer",
        }}>
          ▶ {t(E, "Play", "재생")}
        </button>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 8, padding: "5px 12px",
          fontSize: 12, fontWeight: 800, cursor: "pointer",
        }}>
          ↺ {t(E, "Reset", "리셋")}
        </button>
        <div style={{ fontSize: 11, color: C.dim, marginLeft: 4 }}>
          {t(E, "Step", "단계")} {step}/{segs.length}
        </div>
      </div>

      {/* Final range banner */}
      <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: C.text }}>
        {step >= segs.length ? (
          <span><b style={{ color: "#15803d" }}>{t(E, "End flow", "끝 유량")}:</b>{" "}
            <b style={{ color: A }}>[{ranges[segs.length - 1].lo}, {ranges[segs.length - 1].hi}]</b>
          </span>
        ) : (
          <span style={{ color: C.dim }}>
            {t(E, "Press Play to watch the range tighten as it travels right.",
                  "Play 를 눌러 범위가 오른쪽으로 가며 좁아지는 걸 봐.")}
          </span>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "segments = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    typ = parts[0]        # 'none', 'on', 'off'",
  "    lo = int(parts[1])",
  "    hi = int(parts[2])",
  "    segments.append((typ, lo, hi))",
  "",
  "# Forward pass: propagate flow from start to end",
  "fwd_lo, fwd_hi = segments[0][1], segments[0][2]",
  "for i in range(1, N):",
  "    typ, lo, hi = segments[i]",
  "    if typ == 'none':",
  "        fwd_lo = max(fwd_lo, lo)",
  "        fwd_hi = min(fwd_hi, hi)",
  "    elif typ == 'on':",
  "        fwd_lo += lo",
  "        fwd_hi += hi",
  "    elif typ == 'off':",
  "        fwd_lo -= hi",
  "        fwd_hi -= lo",
  "    fwd_lo = max(fwd_lo, 0)",
  "",
  "# Backward pass: propagate flow from end to start",
  "bwd_lo, bwd_hi = segments[-1][1], segments[-1][2]",
  "for i in range(N-2, -1, -1):",
  "    typ, lo, hi = segments[i+1]",
  "    if typ == 'none':",
  "        pass  # sensor doesn't change flow",
  "    elif typ == 'on':",
  "        # reverse: on-ramp added, so subtract going back",
  "        bwd_lo -= hi",
  "        bwd_hi -= lo",
  "    elif typ == 'off':",
  "        # reverse: off-ramp removed, so add going back",
  "        bwd_lo += lo",
  "        bwd_hi += hi",
  "    bwd_lo = max(bwd_lo, 0)",
  "    cur_lo, cur_hi = segments[i][1], segments[i][2]",
  "    bwd_lo = max(bwd_lo, cur_lo)",
  "    bwd_hi = min(bwd_hi, cur_hi)",
  "",
  "print(bwd_lo, bwd_hi)",
  "print(fwd_lo, fwd_hi)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <tuple>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<tuple<string, int, int>> segs(N);",
  "    for (auto& [typ, lo, hi] : segs) cin >> typ >> lo >> hi;",
  "    auto& [t0, l0, h0] = segs[0];",
  "    int fLo = l0;",
  "    int fHi = h0;",
  "    for (int i = 1; i < N; i++) {",
  "        auto& [typ, lo, hi] = segs[i];",
  "        if (typ == \"none\") {",
  "            fLo = max(fLo, lo);",
  "            fHi = min(fHi, hi);",
  "        } else if (typ == \"on\") {",
  "            fLo += lo;",
  "            fHi += hi;",
  "        } else if (typ == \"off\") {",
  "            fLo -= hi;",
  "            fHi -= lo;",
  "        }",
  "    }",
  "    cout << fLo << \" \" << fHi << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMeasTrafficSections(E) {
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
        t(E, "tuple<string, int, int> bundles type + lo + hi into one row.",
            "tuple<string, int, int>로 type + lo + hi를 한 행에 묶음."),
        t(E, "Structured binding auto& [typ, lo, hi] reads each tuple slot like a field.",
            "구조화 바인딩 auto& [typ, lo, hi]으로 각 튜플 값을 필드처럼 읽음."),
      ],
    },
  ];
}

export function MeasTrafficProgressiveCode(props) {
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


export function downloadMeasTrafficPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MeasTraffic — Full Study Guide", "MeasTraffic — 종합 풀이 노트");
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

