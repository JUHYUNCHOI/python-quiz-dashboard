// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1203
// 🔒 USACO_VERIFIED (2026-06-15)
//   Python: PASS (local — total=0 edge case fixed; matches cpid=1203 sample 3\n2\n0)
//   C++:    PASS (local — total=0 edge case fixed; matches cpid=1203 sample 3\n2\n0)
//   Fix: added `if total == 0: print 0; continue` guard (a[i] can be 0, so sum can be 0).
//   USACO 정식 재제출은 미실시 — 공식 샘플(3케이스) 로컬 일치 확인.
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

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
                `왼쪽부터 더해 가요. 합이 ${target} 가 되면 한 구간을 닫아요.`)}
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
                  `❌ d=${target} 는 안 돼요. 더한 값이 ${target} 를 넘어 버려요.`)}
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
          "총합의 약수 d 를 모두 해 봐요.\n되는 d 중에서 'N − 구간 수' 가 가장 작은 게 답이에요.")}
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
  "    # If the total is 0, every period is already 0 — no merges needed.",
  "    if total == 0:",
  "        print(0)",
  "        continue",
  "",
  "    best = N - 1  # worst case: merge all into one",
  "",
  "    # Try each divisor of total as target period length",
  "    for d in range(1, total + 1):",
  "        if total % d != 0:",
  "            continue",
  "        target = d",
  "        # Try to partition into segments summing to target",
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
  "        for (int i = 0; i < N; i++) {",
  "            cin >> a[i];",
  "            total += a[i];",
  "        }",
  "",
  "        // If the total is 0, every period is already 0 — no merges needed.",
  "        if (total == 0) {",
  "            cout << 0 << \"\\n\";",
  "            continue;",
  "        }",
  "",
  "        long long best = N - 1;",
  "        for (long long d = 1; d <= total; d++) {",
  "            if (total % d != 0) {",
  "                continue;",
  "            }",
  "            // partition into segments summing to d",
  "            long long curr = 0;",
  "            bool ok = true;",
  "            for (long long x : a) {",
  "                curr += x;",
  "                if (curr == d) {",
  "                    curr = 0;",
  "                } else if (curr > d) {",
  "                    ok = false;",
  "                    break;",
  "                }",
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
        t(E, "What should we output? The fewest merges to make every period equal length.",
            "무엇을 답으로 내야 하나요?\n모든 시간을 같은 길이로 만드는 최소 합치기 횟수예요."),
        t(E, "Merges = N minus the final piece count, so fewer merges means more equal pieces — as many as possible.",
            "합치기 횟수는 N 에서 최종 조각 수를 뺀 값이에요.\n그러니 조각이 많을수록 합치기는 줄어요."),
        t(E, "So try every divisor d of the total as the piece length. Walk the array once: hit d exactly → close a piece, go past it → this d fails.",
            "그래서 총합의 약수 d 를 조각 길이로 하나씩 시도해요.\n배열을 훑다가 딱 d 가 되면 조각을 끊고, 넘치면 그 d 는 실패예요."),
        t(E, "For every d that works, pieces = total/d. Keep the d that gives the most pieces — that's the fewest merges.",
            "성공하는 d 마다 조각 수(총합/d)가 나와요.\n조각이 가장 많이 나오는 경우를 답으로 남겨요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python 은 list, map, sorted 가 있어서 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, ...). 뜻이 또렷해져요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 을 넘을 수 있으면 long long 을 써요."),
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
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

