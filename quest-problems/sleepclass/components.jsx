import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   SleepClassSim — pick a divisor d of total, walk the array
   greedily accumulating; each time running sum hits d, close a
   segment. If running sum ever exceeds d, target d fails.
   merges = N − (number of segments).
   ═══════════════════════════════════════════════════════════════ */
const _SC_PRESETS = [
  {
    label: { en: "[1,2,3,1,1,1] · total=9", ko: "[1,2,3,1,1,1] · 총합=9" },
    a: [1, 2, 3, 1, 1, 1],
  },
  {
    label: { en: "[2,2,3] · total=7", ko: "[2,2,3] · 총합=7" },
    a: [2, 2, 3],
  },
  {
    label: { en: "[4,4,4,4] · total=16", ko: "[4,4,4,4] · 총합=16" },
    a: [4, 4, 4, 4],
  },
];

const _SC_COLORS = ["#059669", "#0891b2", "#7c3aed", "#f97316", "#dc2626", "#0d9488"];

function _divisors(n) {
  const out = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d);
  return out;
}

// Greedy partition — returns { segments: [[indices...], ...], failed, failIdx }
function _partition(a, target) {
  const segments = [];
  let curSeg = [];
  let curr = 0;
  for (let i = 0; i < a.length; i++) {
    curr += a[i];
    curSeg.push(i);
    if (curr === target) {
      segments.push(curSeg);
      curSeg = [];
      curr = 0;
    } else if (curr > target) {
      return { segments, failed: true, failIdx: i };
    }
  }
  if (curr !== 0) return { segments, failed: true, failIdx: a.length - 1 };
  return { segments, failed: false, failIdx: -1 };
}

export function SleepClassSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _SC_PRESETS[pi];
  const a = preset.a;
  const total = a.reduce((s, x) => s + x, 0);
  const divs = _divisors(total);
  const [di, setDi] = useState(0);
  const target = divs[Math.min(di, divs.length - 1)];

  const result = _partition(a, target);
  const { segments, failed, failIdx } = result;
  const numSegs = segments.length;
  const merges = failed ? null : a.length - numSegs;

  // index → segIdx (or -1 if failed past failIdx)
  const segOf = new Array(a.length).fill(-1);
  segments.forEach((seg, si) => seg.forEach(i => { segOf[i] = si; }));

  const reset = (newPi) => { setPi(newPi); setDi(0); };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_SC_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {E ? p.label.en : p.label.ko}
          </button>
        ))}
      </div>

      {/* divisor picker */}
      <div style={{
        background: "#ecfdf5", border: `1px solid #6ee7b7`, borderRadius: 10,
        padding: "10px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.4, marginBottom: 6 }}>
          {t(E, `Pick target d (divisor of ${total})`, `목표 d 고르기 (${total} 의 약수)`)}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {divs.map((d, i) => (
            <button key={i} onClick={() => setDi(i)} style={{
              padding: "4px 10px", borderRadius: 6,
              border: `1.5px solid ${i === di ? A : "#d1fae5"}`,
              background: i === di ? A : "#fff",
              color: i === di ? "#fff" : "#065f46",
              fontSize: 12, fontWeight: 800, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* array visualization — boxed by segment */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
        padding: 14, marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 8, letterSpacing: 0.4 }}>
          {t(E, `Walk left→right, accumulate. Close a segment when sum = ${target}.`,
                `왼→오 누적. 합이 ${target} 가 되면 한 구간 마감.`)}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {a.map((v, i) => {
            const seg = segOf[i];
            const isFailIdx = failed && i === failIdx;
            const color = isFailIdx ? "#dc2626" : (seg >= 0 ? _SC_COLORS[seg % _SC_COLORS.length] : "#9ca3af");
            const bg = isFailIdx ? "#fee2e2" : (seg >= 0 ? color + "22" : "#f3f4f6");
            return (
              <div key={i} style={{
                minWidth: 44, padding: "10px 8px",
                background: bg,
                border: `2px solid ${color}`,
                borderRadius: 8,
                textAlign: "center",
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                <div style={{ fontSize: 10, color: C.dim }}>a[{i}]</div>
                <div style={{ fontSize: 16, fontWeight: 800, color }}>{v}</div>
                {seg >= 0 && (
                  <div style={{ fontSize: 9, fontWeight: 800, color, marginTop: 2 }}>
                    seg {seg + 1}
                  </div>
                )}
                {isFailIdx && (
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#dc2626", marginTop: 2 }}>
                    {t(E, "OVER", "초과")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* result panel */}
      <div style={{
        background: failed ? "#fef2f2" : "#ecfdf5",
        border: `1.5px solid ${failed ? "#fca5a5" : A}`,
        borderRadius: 10, padding: "10px 14px",
        display: "flex", gap: 16, alignItems: "center", justifyContent: "center", flexWrap: "wrap",
      }}>
        {failed ? (
          <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b" }}>
            {t(E, `❌ d=${target} fails — running sum overshoots before resetting.`,
                  `❌ d=${target} 실패 — 누적이 ${target} 를 넘겨서 안 맞아.`)}
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#065f46", letterSpacing: 0.4 }}>
                {t(E, "SEGMENTS", "구간 수")}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
                {numSegs}
              </div>
            </div>
            <div style={{ fontSize: 18, color: C.dim }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#065f46", letterSpacing: 0.4 }}>
                {t(E, `MERGES = N − segs = ${a.length} − ${numSegs}`, `합치기 = N − 구간 = ${a.length} − ${numSegs}`)}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
                {merges}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 10 }}>
        {t(E,
          "Try every divisor d of the total. The smallest 'N − segments' across all working d is the answer.",
          "총합의 모든 약수 d 를 시도해. 통과한 d 들 중 'N − 구간 수' 가 가장 작은 게 답.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    a = list(map(int, input().split()))",
  "    total = sum(a)",
  "",
  "    best = N - 1  # worst case: merge all into one",
  "",
  "    # Try each divisor of total as target period length",
  "    for d in range(1, total + 1):",
  "        if total % d != 0:",
  "            continue",
  "        target = d",
  "        # Try to partition into segments summing to target",
  "        merges = 0",
  "        curr = 0",
  "        for x in a:",
  "            curr += x",
  "            if curr == target:",
  "                curr = 0",
  "            elif curr > target:",
  "                break",
  "        else:",
  "            if curr == 0:",
  "                # Number of merges = N - (total // target)",
  "                merges = N - (total // target)",
  "                best = min(best, merges)",
  "",
  "    print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    cin.tie(nullptr);",
  "",
  "    int T;",
  "    cin >> T;",
  "    for (int _t = 0; _t < T; _t++) {",
  "        int N;",
  "        cin >> N;",
  "        vector<long long> a(N);",
  "        long long total = 0;",
  "        for (int i = 0; i < N; i++) { cin >> a[i]; total += a[i]; }",
  "",
  "        long long best = N - 1;",
  "        for (long long d = 1; d <= total; d++) {",
  "            if (total % d != 0) continue;",
  "            // partition into segments summing to d",
  "            long long curr = 0;",
  "            bool ok = true;",
  "            for (long long x : a) {",
  "                curr += x;",
  "                if (curr == d) curr = 0;",
  "                else if (curr > d) { ok = false; break; }",
  "            }",
  "            if (ok && curr == 0) {",
  "                long long merges = N - (total / d);",
  "                best = min(best, merges);",
  "            }",
  "        }",
  "        cout << best << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getSleepClassSections(E) {
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

export function SleepClassProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadSleepClassPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SleepClass — Full Study Guide", "SleepClass — 종합 풀이 노트");
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

