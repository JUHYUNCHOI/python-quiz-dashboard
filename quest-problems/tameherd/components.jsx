// 🔒 USACO_VERIFIED — cpid=809, tameherd (2018 Feb Bronze #3, Taming the Herd)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
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
  // DP on counter state — matches the verified FULL_PY algorithm.
  // dp_min[c] / dp_max[c] = min / max breakouts on day i given counter = c.
  // Transitions: c → c+1 (no break) OR any c → 0 (break, +1).
  const N = log.length;
  const INF = 999999;
  const C_MAX = N + 5;

  // Day 0 constraint: log[0] must be 0 or -1 (counter starts at 0).
  if (log[0] !== -1 && log[0] !== 0) {
    return {
      steps: [{ i: 0, v: log[0], note: "day0-bad", breakout: false, ok: false }],
      ok: false, minB: 0, maxB: 0,
    };
  }

  let dpMin = new Array(C_MAX).fill(INF);
  let dpMax = new Array(C_MAX).fill(-1);
  dpMin[0] = 1; dpMax[0] = 1;   // day 0 → counter 0, that initial reset itself counts as 1 breakout

  const steps = [];
  steps.push({
    i: 0, v: log[0],
    note: log[0] === -1 ? "day0-missing" : "day0-zero",
    breakout: true, ok: true,
  });

  for (let i = 1; i < N; i++) {
    const newMin = new Array(C_MAX).fill(INF);
    const newMax = new Array(C_MAX).fill(-1);
    for (let c = 0; c < C_MAX; c++) {
      if (dpMin[c] >= INF) continue;
      // no breakout: counter c → c+1
      if (c + 1 < C_MAX) {
        if (dpMin[c] < newMin[c + 1]) newMin[c + 1] = dpMin[c];
        if (dpMax[c] > newMax[c + 1]) newMax[c + 1] = dpMax[c];
      }
      // breakout: any c → 0, +1 break
      if (dpMin[c] + 1 < newMin[0]) newMin[0] = dpMin[c] + 1;
      if (dpMax[c] + 1 > newMax[0]) newMax[0] = dpMax[c] + 1;
    }
    // Apply log[i] constraint
    if (log[i] !== -1) {
      for (let c = 0; c < C_MAX; c++) {
        if (c !== log[i]) { newMin[c] = INF; newMax[c] = -1; }
      }
    }
    dpMin = newMin;
    dpMax = newMax;

    let anyValid = false;
    for (let c = 0; c < C_MAX; c++) if (dpMin[c] < INF) { anyValid = true; break; }

    let note;
    if (!anyValid) note = "impossible";
    else if (log[i] === -1) note = "missing";
    else if (log[i] === 0) note = "force-zero";
    else note = "force-counter";

    steps.push({ i, v: log[i], note, breakout: log[i] === 0, ok: anyValid });
    if (!anyValid) break;
  }

  let ansMin = INF, ansMax = -1;
  for (let c = 0; c < C_MAX; c++) {
    if (dpMin[c] < ansMin) ansMin = dpMin[c];
    if (dpMax[c] > ansMax) ansMax = dpMax[c];
  }
  const ok = ansMin < INF;
  return { steps, ok, minB: ok ? ansMin : 0, maxB: ok ? ansMax : 0 };
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
    if (s.note === "day0-zero") return t(E, "day 1 starts after a breakout (counter=0)", "1일차는 탈출 직후 (counter=0)");
    if (s.note === "day0-missing") return t(E, "day 1 unknown — counter=0 either way", "1일차 누락 — 어쨌든 counter=0");
    if (s.note === "day0-bad") return t(E, "day 1 ≠ 0 — impossible, answer −1", "1일차가 0 아님 — 불가능, 답 −1");
    if (s.note === "missing") return t(E, "−1 — both options allowed (continue or breakout)", "−1 — 두 가지 다 가능 (이어가기 / 탈출)");
    if (s.note === "force-zero") return t(E, "log=0 → breakout happened today", "log=0 → 오늘 탈출");
    if (s.note === "force-counter") return t(E, `log=${s.v} → counter must equal ${s.v}`, `log=${s.v} → counter 는 ${s.v} 이어야 함`);
    if (s.note === "impossible") return t(E, "constraint not reachable from any prior state — answer −1", "어떤 이전 상태에서도 도달 불가 — 답 −1");
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
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('taming.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "log = list(map(int, lines[1].split()))",
  "",
  "# DP: dp_min[c] = day i 에서 counter 가 c 일 때의 최소 breakout 횟수",
  "# 전이: counter c → c+1 (no break) 또는 counter * → 0 (break, +1)",
  "# day 0 (1-indexed day 1): counter = 0, breakouts = 1",
  "INF = 999999",
  "C_MAX = N + 5",
  "",
  "if log[0] != -1 and log[0] != 0:",
  "    answer = '-1'",
  "else:",
  "    dp_min = [INF] * C_MAX",
  "    dp_max = [-1] * C_MAX",
  "    dp_min[0] = 1",
  "    dp_max[0] = 1",
  "    for i in range(1, N):",
  "        new_min = [INF] * C_MAX",
  "        new_max = [-1] * C_MAX",
  "        for c in range(C_MAX):",
  "            if dp_min[c] >= INF:",
  "                continue",
  "            # no breakout: c → c+1",
  "            if c + 1 < C_MAX:",
  "                if dp_min[c] < new_min[c + 1]:",
  "                    new_min[c + 1] = dp_min[c]",
  "                if dp_max[c] > new_max[c + 1]:",
  "                    new_max[c + 1] = dp_max[c]",
  "            # breakout: * → 0, +1",
  "            if dp_min[c] + 1 < new_min[0]:",
  "                new_min[0] = dp_min[c] + 1",
  "            if dp_max[c] + 1 > new_max[0]:",
  "                new_max[0] = dp_max[c] + 1",
  "        # log[i] 제약",
  "        if log[i] != -1:",
  "            for c in range(C_MAX):",
  "                if c != log[i]:",
  "                    new_min[c] = INF",
  "                    new_max[c] = -1",
  "        dp_min = new_min",
  "        dp_max = new_max",
  "    ans_min = INF",
  "    ans_max = -1",
  "    for c in range(C_MAX):",
  "        if dp_min[c] < ans_min:",
  "            ans_min = dp_min[c]",
  "        if dp_max[c] > ans_max:",
  "            ans_max = dp_max[c]",
  "    if ans_min >= INF:",
  "        answer = '-1'",
  "    else:",
  "        answer = str(ans_min) + ' ' + str(ans_max)",
  "",
  "with open('taming.out', 'w') as file:",
  "    file.write(answer + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"taming.in\");",
  "    ofstream fout(\"taming.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> log(N);",
  "    for (int i = 0; i < N; i++) fin >> log[i];",
  "    // DP: dp[c] = day i 에서 counter 가 c 일 때 min/max breakout",
  "    const int INFV = 999999;",
  "    int C_MAX = N + 5;",
  "    if (log[0] != -1 && log[0] != 0) {",
  "        fout << -1 << \"\\n\";",
  "        return 0;",
  "    }",
  "    vector<int> dp_min(C_MAX, INFV);",
  "    vector<int> dp_max(C_MAX, -1);",
  "    dp_min[0] = 1;",
  "    dp_max[0] = 1;",
  "    for (int i = 1; i < N; i++) {",
  "        vector<int> new_min(C_MAX, INFV);",
  "        vector<int> new_max(C_MAX, -1);",
  "        for (int c = 0; c < C_MAX; c++) {",
  "            if (dp_min[c] >= INFV) continue;",
  "            // no breakout: c → c+1",
  "            if (c + 1 < C_MAX) {",
  "                if (dp_min[c] < new_min[c + 1]) new_min[c + 1] = dp_min[c];",
  "                if (dp_max[c] > new_max[c + 1]) new_max[c + 1] = dp_max[c];",
  "            }",
  "            // breakout: * → 0, +1",
  "            if (dp_min[c] + 1 < new_min[0]) new_min[0] = dp_min[c] + 1;",
  "            if (dp_max[c] + 1 > new_max[0]) new_max[0] = dp_max[c] + 1;",
  "        }",
  "        // log[i] 제약",
  "        if (log[i] != -1) {",
  "            for (int c = 0; c < C_MAX; c++) {",
  "                if (c != log[i]) {",
  "                    new_min[c] = INFV;",
  "                    new_max[c] = -1;",
  "                }",
  "            }",
  "        }",
  "        dp_min = new_min;",
  "        dp_max = new_max;",
  "    }",
  "    int ans_min = INFV, ans_max = -1;",
  "    for (int c = 0; c < C_MAX; c++) {",
  "        if (dp_min[c] < ans_min) ans_min = dp_min[c];",
  "        if (dp_max[c] > ans_max) ans_max = dp_max[c];",
  "    }",
  "    if (ans_min >= INFV) fout << -1 << \"\\n\";",
  "    else fout << ans_min << \" \" << ans_max << \"\\n\";",
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

