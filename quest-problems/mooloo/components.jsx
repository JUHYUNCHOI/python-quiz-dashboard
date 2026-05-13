// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   MoolooMergeSim — number line with viewing days; step through
   the greedy scan and watch subscriptions extend or split.
   ═══════════════════════════════════════════════════════════════ */
const _MM_PRESETS = [
  { days: [1, 2, 3, 10],       K: 2, label: "[1,2,3,10] K=2" },
  { days: [1, 5, 9, 12],       K: 3, label: "[1,5,9,12] K=3" },
  { days: [2, 4, 7, 8, 9, 20], K: 3, label: "[2,4,7,8,9,20] K=3" },
];

// Run greedy and return list of subscriptions: { start, end, indices: [..] }
function _runGreedy(days, K) {
  const subs = [];
  let i = 0;
  while (i < days.length) {
    const start = days[i];
    let end = days[i];
    const idx = [i];
    i++;
    while (i < days.length && days[i] - end <= K) {
      end = days[i];
      idx.push(i);
      i++;
    }
    subs.push({ start, end, indices: idx });
  }
  return subs;
}

export function MoolooMergeSim({ E }) {
  const [pi, setPi] = useState(0);
  const [stage, setStage] = useState(0);

  const preset = _MM_PRESETS[pi];
  const days = preset.days;
  const K = preset.K;
  const subs = _runGreedy(days, K);

  // stage 0: show days only; stages 1..subs.length: reveal subscriptions one by one
  const maxStage = subs.length;
  const revealed = Math.min(stage, maxStage);

  // SVG layout
  const W = 340, H = 130;
  const padX = 24;
  const minD = days[0];
  const maxD = days[days.length - 1];
  const span = Math.max(1, (maxD + K) - (minD - 1));
  const sx = (d) => padX + ((d - (minD - 1)) / span) * (W - 2 * padX);
  const lineY = 78;

  // Cost summary
  const partialSubs = subs.slice(0, revealed);
  const partialCost = partialSubs.reduce((s, sub) => s + (sub.end - sub.start + 1) + K, 0);
  const totalCost = subs.reduce((s, sub) => s + (sub.end - sub.start + 1) + K, 0);

  const subColors = ["#f97316", "#7c3aed", "#0ea5e9", "#16a34a", "#dc2626", "#d97706"];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 8 }}>
        {t(E, "Greedy Subscription Merge", "그리디 구독 병합")}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_MM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStage(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      <svg width={W} height={H} style={{ display: "block", margin: "0 auto", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8 }}>
        {/* number line */}
        <line x1={padX - 8} y1={lineY} x2={W - padX + 8} y2={lineY} stroke="#94a3b8" strokeWidth="1.5" />

        {/* subscription bars (revealed) */}
        {partialSubs.map((sub, si) => {
          const color = subColors[si % subColors.length];
          const x1 = sx(sub.start);
          const x2 = sx(sub.end + K); // includes K-day grace period
          const xCore = sx(sub.end);
          return (
            <g key={si}>
              {/* core (start..end) solid */}
              <rect x={x1 - 6} y={lineY - 14} width={(xCore - x1) + 12} height={28} rx={6}
                    fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" />
              {/* grace (end..end+K) dashed */}
              {K > 0 && (
                <rect x={xCore} y={lineY - 10} width={x2 - xCore} height={20} rx={4}
                      fill={color} fillOpacity="0.05" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
              )}
              <text x={(x1 + xCore) / 2} y={lineY - 18} fontSize="10" fill={color} textAnchor="middle" fontWeight="800">
                {(sub.end - sub.start + 1)}+{K}={(sub.end - sub.start + 1) + K}
              </text>
            </g>
          );
        })}

        {/* day dots */}
        {days.map((d, i) => {
          const inSub = partialSubs.some(s => s.indices.includes(i));
          return (
            <g key={i}>
              <circle cx={sx(d)} cy={lineY} r="5" fill={inSub ? A : "#cbd5e1"} stroke="#fff" strokeWidth="1.5" />
              <text x={sx(d)} y={lineY + 22} fontSize="11" fill={C.text} textAnchor="middle" fontWeight="700" fontFamily="'JetBrains Mono',monospace">{d}</text>
            </g>
          );
        })}
      </svg>

      <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "8px 12px", marginTop: 10, marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7 }}>
        {revealed === 0 && (
          <>{t(E, `${days.length} viewing days, K=${K}. Press → to start scanning.`,
                  `시청일 ${days.length}개, K=${K}. → 눌러서 스캔 시작.`)}</>
        )}
        {revealed > 0 && revealed < maxStage && (
          <>
            {t(E, `Subscription ${revealed}: days ${partialSubs[revealed-1].start}→${partialSubs[revealed-1].end}, cost ${(partialSubs[revealed-1].end - partialSubs[revealed-1].start + 1) + K}`,
                  `구독 ${revealed}: ${partialSubs[revealed-1].start}→${partialSubs[revealed-1].end}일, 비용 ${(partialSubs[revealed-1].end - partialSubs[revealed-1].start + 1) + K}`)}
            <br/>{t(E, `Cost so far: ${partialCost}`, `현재까지 비용: ${partialCost}`)}
          </>
        )}
        {revealed === maxStage && maxStage > 0 && (
          <>
            {t(E, `${maxStage} subscription${maxStage>1?"s":""} total.`, `총 ${maxStage}개 구독.`)}
            <br/><b style={{ color: A }}>{t(E, `Total cost = ${totalCost}`, `총 비용 = ${totalCost}`)}</b>
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0} style={{
          background: stage === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${stage === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 700, color: stage === 0 ? "#b0b5c3" : A,
          cursor: stage === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{revealed} / {maxStage}</span>
        <button onClick={() => setStage(Math.min(maxStage, stage + 1))} disabled={stage >= maxStage} style={{
          background: stage >= maxStage ? "#e5e7eb" : A, border: `1px solid ${stage >= maxStage ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 700,
          color: stage >= maxStage ? "#b0b5c3" : "#fff", cursor: stage >= maxStage ? "default" : "pointer",
        }}>→</button>
      </div>

      <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
        {t(E, "Solid bar = active days · Dashed = K-day grace period (the activation fee).",
              "실선 = 활성 일수 · 점선 = K일 유예 (켜는 비용).")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "N = int(data[0]); K = int(data[1])",
  "days = sorted(int(x) for x in data[2:2 + N])",
  "",
  "total_cost = 0",
  "i = 0",
  "while i < N:",
  "    start = days[i]",
  "    end = days[i]",
  "    i += 1",
  "    while i < N and days[i] - end <= K:",
  "        end = days[i]",
  "        i += 1",
  "    total_cost += (end - start + 1) + K",
  "",
  "print(total_cost)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K; cin >> N >> K;",
  "    vector<long long> days(N);",
  "    for (int i = 0; i < N; i++) cin >> days[i];",
  "    sort(days.begin(), days.end());",
  "",
  "    long long total = 0;",
  "    int i = 0;",
  "    while (i < N) {",
  "        long long start = days[i], end = days[i];",
  "        i++;",
  "        while (i < N && days[i] - end <= K) { end = days[i]; i++; }",
  "        total += (end - start + 1) + K;",
  "    }",
  "    cout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMoolooSections(E) {
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

export function MoolooProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadMoolooPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooloo — Full Study Guide", "Mooloo — 종합 풀이 노트");
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

