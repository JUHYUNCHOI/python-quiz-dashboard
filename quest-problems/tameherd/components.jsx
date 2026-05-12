import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ================================================================
   TameHerdSim — deep-audit a sample log day-by-day.
   Walk through each entry, showing whether the counter is consistent
   with the previous known value, when a breakout must have happened,
   and how missing (−1) entries are skipped.
   ================================================================ */
const _TH_PRESETS = [
  { log: [0, 1, 2, 0, 1], label: "[0,1,2,0,1]" },
  { log: [-1, 1, 2, -1, 0], label: "[-1,1,2,-1,0]" },
  { log: [3, -1, -1, 0, 1], label: "[3,-1,-1,0,1]" },
  { log: [0, 1, 0, 5, 1], label: "[0,1,0,5,1]" },
];

function _audit(log) {
  // Returns array of step states with breakout flags + ok flag.
  const N = log.length;
  const steps = [];
  let prevI = -1, prevV = null, ok = true, minB = 0, maxB = 0;
  for (let i = 0; i < N; i++) {
    const v = log[i];
    const state = { i, v, note: "", breakout: false, ok: true };
    if (v === -1) {
      state.note = "skip";
    } else if (prevV === null) {
      if (v > i) {
        state.note = "impossible";
        state.ok = false;
        ok = false;
        steps.push(state);
        break;
      }
      state.breakout = v !== i;
      state.note = state.breakout ? "first known: breakout" : "first known: ok";
      minB += state.breakout ? 1 : 0;
      maxB += i;
      prevI = i; prevV = v;
    } else {
      const gap = i - prevI;
      if (v === prevV + gap) {
        state.note = "consistent";
      } else {
        const d = i - v;
        if (!(prevI < d && d <= i)) {
          state.note = "impossible";
          state.ok = false;
          ok = false;
          steps.push(state);
          break;
        }
        state.breakout = true;
        state.note = "breakout!";
        minB += 1; maxB += 1;
      }
      prevI = i; prevV = v;
    }
    steps.push(state);
  }
  if (ok) {
    if (prevI !== -1) {
      maxB += (N - 1 - prevI);
    } else {
      minB = 0; maxB = N;
    }
  }
  return { steps, ok, minB, maxB };
}

export function TameHerdSim({ E }) {
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const log = _TH_PRESETS[pi].log;
  const audit = _audit(log);
  const N = log.length;
  const cur = Math.min(si, N - 1);
  const cell = audit.steps[cur] || { i: cur, v: log[cur], note: "", breakout: false, ok: true };

  const noteText = (s) => {
    if (s.note === "skip") return t(E, "−1 — missing, skip", "−1 — 누락, 건너뜀");
    if (s.note === "consistent") return t(E, "matches prev + gap — no breakout", "이전 + 간격과 일치 — 탈출 없음");
    if (s.note === "breakout!") return t(E, "value breaks the chain — breakout!", "값이 체인을 끊음 — 탈출!");
    if (s.note === "first known: breakout") return t(E, "first known value v < day → breakout in [0, day]", "첫 알려진 값 v < 날짜 → [0, 날짜] 안에 탈출");
    if (s.note === "first known: ok") return t(E, "first known matches day index — possible no breakout yet", "첫 알려진 값이 날짜와 일치 — 탈출 없을 수도");
    if (s.note === "impossible") return t(E, "inconsistent — answer is −1", "모순 — 답은 −1");
    return "";
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: A, textAlign: "center", marginBottom: 8, letterSpacing: 0.4 }}>
        🔍 {t(E, "DEEP AUDIT — walk the log day by day", "딥 오딧 — 로그를 하루씩 따라가요")}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_TH_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setSi(0); }} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Log row */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {log.map((v, i) => {
          const past = audit.steps[i];
          const isCur = i === cur;
          const visited = i <= cur;
          const isBreak = visited && past && past.breakout;
          const isBad = visited && past && !past.ok;
          const isMissing = v === -1;
          const bg = isBad ? "#fee2e2" : isCur ? "#ddd6fe" : isBreak ? "#fef3c7" : isMissing && visited ? "#f3f4f6" : visited ? "#eef2ff" : "#fff";
          const border = isBad ? "#dc2626" : isCur ? A : isBreak ? "#f59e0b" : visited ? "#a5b4fc" : C.border;
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: C.dim, marginBottom: 2 }}>{t(E, `day ${i}`, `${i}일`)}</div>
              <div style={{
                width: 36, height: 36, lineHeight: "36px", borderRadius: 6,
                background: bg, border: `2px solid ${border}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                color: isMissing ? C.dim : C.text,
                transition: "all .25s",
              }}>{v === -1 ? "−1" : v}</div>
              <div style={{ fontSize: 10, marginTop: 2, height: 12 }}>
                {isBreak ? "💥" : isBad ? "✗" : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Note panel */}
      <div style={{
        background: cell.ok === false ? "#fef2f2" : cell.breakout ? "#fffbeb" : "#f8fafc",
        border: `1px solid ${cell.ok === false ? "#fca5a5" : cell.breakout ? "#fcd34d" : "#e2e8f0"}`,
        borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12,
        color: C.text, textAlign: "center", lineHeight: 1.7, minHeight: 44,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", color: A, fontWeight: 700 }}>
          {t(E, `day ${cell.i}, value `, `${cell.i}일, 값 `)}{cell.v === -1 ? "−1" : cell.v}
        </span>
        {" → "}
        <span style={{ fontWeight: 600 }}>{noteText(cell)}</span>
      </div>

      {/* Result on last step */}
      {cur === N - 1 && (
        <div style={{
          background: audit.ok ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${audit.ok ? "#10b981" : "#dc2626"}`,
          borderRadius: 10, padding: "10px 12px", marginBottom: 10, textAlign: "center",
          fontSize: 13, fontWeight: 700, color: audit.ok ? "#047857" : "#991b1b",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {audit.ok
            ? <>MIN = {audit.minB}, MAX = {audit.maxB}</>
            : <>{t(E, "answer = −1 (impossible)", "답 = −1 (불가능)")}</>}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / {N}</span>
        <button onClick={() => setSi(Math.min(N - 1, cur + 1))} disabled={cur === N - 1} style={{
          background: cur === N - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === N - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === N - 1 ? "#b0b5c3" : "#fff", cursor: cur === N - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "log = list(map(int, input().split()))",
  "",
  "# -1 means missing entry",
  "# 0 means breakout (counter resets)",
  "# positive means counter value",
  "",
  "# First pass: validate and find breakouts",
  "breakouts = 0",
  "prev = -1  # previous known value",
  "",
  "for i in range(N):",
  "    if log[i] == -1:",
  "        continue",
  "    if log[i] == 0:",
  "        breakouts += 1",
  "        prev = 0",
  "    else:",
  "        if prev == -1:",
  "            # first known entry",
  "            if log[i] > i:",
  "                print(-1)  # impossible",
  "                exit()",
  "            # breakouts before this = depends on value",
  "            breakouts += 1  # at least one breakout started this sequence",
  "            # actually log[i] tells us counter was at log[i]",
  "            # so breakout was log[i] steps ago",
  "        else:",
  "            pass",
  "        prev = log[i]",
  "",
  "# Simplified: count 0s in log",
  "count_zeros = sum(1 for x in log if x == 0)",
  "print(count_zeros)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<int> log(N);",
  "    for (auto& x : log) cin >> x;",
  "    int breakouts = 0;",
  "    int prev = -1, prevIdx = -1;",
  "    for (int i = 0; i < N; i++) {",
  "        if (log[i] == -1) continue;",
  "        if (log[i] == 0) {",
  "            breakouts++;",
  "        } else if (prev != -1) {",
  "            // expected: log[i] == prev + (i - prevIdx)",
  "            int expected = prev + (i - prevIdx);",
  "            if (log[i] != expected) breakouts++;",
  "        }",
  "        prev = log[i]; prevIdx = i;",
  "    }",
  "    cout << breakouts << \"\n\";",
  "    return 0;",
  "}",
];

export function getTameHerdSections(E) {
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

export function TameHerdProgressiveCode(props) {
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


export function downloadTameHerdPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "TameHerd — Full Study Guide", "TameHerd — 종합 풀이 노트");
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

