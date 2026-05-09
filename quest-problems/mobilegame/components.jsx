import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   MobileGameSim — play levels one by one, watch total grow
   Bilingual via t(E, EN, KO)
   ═══════════════════════════════════════════════════════════════ */
const _MG_PRESETS = [
  {
    label: { en: "Tiny (3 levels)", ko: "초간단 (3 레벨)" },
    scores: [10, 20, 30],
  },
  {
    label: { en: "Mixed (5 levels)", ko: "혼합 (5 레벨)" },
    scores: [7, 15, 3, 22, 8],
  },
  {
    label: { en: "Big run (6 levels)", ko: "대형 (6 레벨)" },
    scores: [50, 25, 100, 40, 15, 70],
  },
];

const _MG_ICONS = ["🎮", "🕹️", "🎯", "⭐", "💎", "🏆", "🔥", "⚡"];

export function MobileGameSim({ E }) {
  const [pi, setPi] = useState(0);
  const [step, setStep] = useState(0);
  const scores = _MG_PRESETS[pi].scores;
  const N = scores.length;

  // Build running totals up through current step
  const totals = [0];
  for (let i = 0; i < N; i++) totals.push(totals[i] + scores[i]);
  const curTotal = totals[step];
  const maxTotal = totals[N];

  const reset = (newPi) => { setPi(newPi); setStep(0); };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_MG_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {E ? p.label.en : p.label.ko}
          </button>
        ))}
      </div>

      {/* total counter (big phone screen) */}
      <div style={{
        background: "linear-gradient(135deg,#1f2937,#111827)", border: `2px solid ${A}`,
        borderRadius: 14, padding: "12px 16px", marginBottom: 12, textAlign: "center",
        boxShadow: "0 4px 14px rgba(217,119,6,.18)",
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#fcd34d", letterSpacing: 0.6 }}>
          📱 {t(E, "TOTAL SCORE", "총 점수")}
        </div>
        <div style={{
          fontSize: 32, fontWeight: 800, color: "#fbbf24",
          fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.1, marginTop: 2,
          transition: "color 0.2s",
        }}>
          {curTotal}
        </div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
          {t(E, "Levels played", "플레이한 레벨")}: <b style={{ color: "#fbbf24" }}>{step}</b> / {N}
        </div>
      </div>

      {/* level list */}
      <div style={{
        background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10,
        padding: 8, marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", padding: "2px 6px 6px", letterSpacing: 0.4 }}>
          {t(E, "LEVELS (in order)", "레벨 (순서대로)")}
        </div>
        {scores.map((s, i) => {
          const played = i < step;
          const isCurrent = i === step - 1;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 8px", borderRadius: 6, marginBottom: 2,
              background: isCurrent ? "#fde68a" : (played ? "#fef3c7" : "transparent"),
              opacity: played ? 1 : 0.5,
              fontFamily: "'JetBrains Mono',monospace",
              border: isCurrent ? `1px solid ${A}` : "1px solid transparent",
            }}>
              <span style={{ width: 24, color: C.dim, fontSize: 11 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{_MG_ICONS[i % _MG_ICONS.length]}</span>
              <span style={{ minWidth: 80, fontSize: 12, color: C.dim }}>
                {t(E, `Level ${i + 1}`, `레벨 ${i + 1}`)}
              </span>
              <span style={{ fontWeight: 800, color: played ? "#15803d" : C.dim, marginLeft: "auto" }}>
                +{s}
              </span>
              {played && (
                <span style={{
                  fontSize: 10, fontWeight: 800, color: "#92400e",
                  background: "#fcd34d", padding: "2px 6px", borderRadius: 4,
                  fontFamily: "system-ui",
                }}>
                  {t(E, `total = ${totals[i + 1]}`, `합 = ${totals[i + 1]}`)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* progress bar */}
      <div style={{ marginBottom: 10 }}>
        <div style={{
          background: "#fef3c7", border: `1px solid ${A}`, borderRadius: 8,
          height: 12, overflow: "hidden", position: "relative",
        }}>
          <div style={{
            width: `${maxTotal === 0 ? 0 : (curTotal / maxTotal) * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg,${A},#fbbf24)`,
            transition: "width 0.3s",
          }} />
        </div>
        <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginTop: 3 }}>
          {curTotal} / {maxTotal} {t(E, "points", "점")}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setStep(0)} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ⏮ {t(E, "Reset", "처음")}
        </button>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ◀ {t(E, "Back", "뒤로")}
        </button>
        <button onClick={() => setStep(Math.min(N, step + 1))} disabled={step >= N} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: step >= N ? "#e5e7eb" : A,
          color: step >= N ? C.dim : "#fff",
          fontSize: 12, fontWeight: 800, cursor: step >= N ? "default" : "pointer",
        }}>
          {t(E, "Play next level", "다음 레벨 ▶")} ▶
        </button>
        <button onClick={() => setStep(N)} disabled={step >= N} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${A}`,
          background: "#fff", color: step >= N ? C.dim : A,
          fontSize: 12, fontWeight: 700, cursor: step >= N ? "default" : "pointer",
        }}>
          ⏭ {t(E, "Play all", "전부")}
        </button>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 10 }}>
        {t(E,
          "Play levels one by one. Each level adds its score to the total. After all N levels, total = sum(scores).",
          "레벨을 하나씩 플레이. 매 레벨마다 점수가 총합에 더해져요. 모든 N 레벨 후, 총합 = 점수들의 합.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "scores = list(map(int, input().split()))",
  "",
  "# Play all levels, sum all scores",
  "total = sum(scores)",
  "",
  "print(total)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    long long total = 0, x;",
  "    while (N-- && cin >> x) total += x;",
  "    cout << total << \"\n\";",
  "    return 0;",
  "}",
];

export function getMobileGameSections(E) {
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

export function MobileGameProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadMobileGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MobileGame — Full Study Guide", "MobileGame — 종합 풀이 노트");
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

