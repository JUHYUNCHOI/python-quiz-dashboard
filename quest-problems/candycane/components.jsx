import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* --- Interactive Simulator: cows eat candy canes --- */
// Uses the official sample: cows [3,2,5], canes [6,1] → final [7,2,7]
export function CandyCaneSim({ E }) {
  const initCows = [3, 2, 5];
  const canes = [6, 1];
  // Each event: process cow `i` against cane `c` with current bottom = `taken`.
  // We pre-build the timeline so each click is one cow's bite (or skip).
  const buildTimeline = () => {
    const events = [];
    let h = [...initCows];
    for (let c = 0; c < canes.length; c++) {
      let taken = 0;
      for (let i = 0; i < h.length; i++) {
        const before = h[i];
        let ate = 0;
        if (h[i] > taken) {
          const inc = Math.min(canes[c], h[i]) - taken;
          if (inc > 0) { ate = inc; h[i] += inc; taken += inc; }
        }
        const caneDone = taken >= canes[c];
        events.push({
          caneIdx: c, caneH: canes[c], cowIdx: i,
          before, ate, after: h[i], taken,
          heights: [...h], caneDone, isLastCow: i === h.length - 1,
        });
        if (caneDone) break;
      }
    }
    return events;
  };
  const timeline = buildTimeline();

  const [step, setStep] = useState(-1);  // -1 = initial state, 0..n-1 after each bite
  const ev = step >= 0 ? timeline[step] : null;
  const heights = ev ? ev.heights : initCows;
  const caneIdx = ev ? ev.caneIdx : 0;
  const caneH = canes[caneIdx];
  const taken = ev ? ev.taken : 0;
  const cowIdx = ev ? ev.cowIdx : -1;
  const done = step >= timeline.length - 1;

  const next = () => { if (!done) setStep(step + 1); };
  const reset = () => setStep(-1);

  // Visual scale: 1 unit = 22px high
  const U = 22;
  const maxCaneTop = Math.max(...canes);
  const maxCowH = Math.max(...heights, ...initCows);
  const colHeight = (Math.max(maxCaneTop, maxCowH) + 1) * U;

  const palette = ["#dc2626", "#0891b2", "#15803d"];

  return (
    <div style={{ padding: "10px 8px" }}>
      {/* Sample input badge */}
      <div style={{ textAlign: "center", marginBottom: 10, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "Sample · cows = [3, 2, 5], canes = [6, 1]", "샘플 · 소 = [3, 2, 5], 캔디 = [6, 1]")}
      </div>

      {/* Status bar */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Cane", "캔디")} {caneIdx + 1}/{canes.length} · h = <b>{caneH}</b>
        </div>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          taken = <b>{taken}</b> / {caneH}
        </div>
        {ev && (
          <div style={{
            background: ev.ate > 0 ? "#dcfce7" : "#f1f5f9",
            border: `1px solid ${ev.ate > 0 ? "#16a34a" : "#cbd5e1"}`,
            borderRadius: 8, padding: "4px 10px", fontSize: 11,
            color: ev.ate > 0 ? "#166534" : C.dim,
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            {t(E, "Cow", "소")} {ev.cowIdx + 1} {ev.ate > 0
              ? `${t(E, "ate", "먹음")} ${ev.ate} → h = ${ev.after}`
              : t(E, "can't reach (skip)", "닿지 못함 (skip)")}
          </div>
        )}
      </div>

      {/* Stage: candy cane on left, cows in a row */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, height: colHeight + 30 }}>
          {/* Candy cane */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: colHeight + 30 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", marginBottom: 2 }}>
              🍬 {t(E, "Cane", "캔디")} {caneIdx + 1}
            </div>
            <div style={{ position: "relative", width: 26, height: colHeight, background: "#f8f9fc", borderRadius: 6, border: `1px dashed ${C.border}`, overflow: "hidden" }}>
              {/* Eaten part (bottom up to taken) — pale */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: taken * U, background: "repeating-linear-gradient(45deg, #fee2e2, #fee2e2 4px, #fff 4px, #fff 8px)", borderTop: taken > 0 ? "1px dashed #fca5a5" : "none" }} />
              {/* Remaining cane (taken to caneH) — solid red */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: taken * U, height: (caneH - taken) * U, background: "linear-gradient(180deg, #fca5a5, #dc2626)", borderRadius: "4px 4px 0 0", boxShadow: "inset 0 0 0 1px #b91c1c", transition: "all .25s" }} />
              {/* Cane top label */}
              <div style={{ position: "absolute", left: -6, right: -6, bottom: caneH * U - 1, fontSize: 9, color: "#7f1d1d", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>{caneH}</div>
              {/* taken marker */}
              {taken > 0 && (
                <div style={{ position: "absolute", left: -6, right: -6, bottom: taken * U - 1, fontSize: 9, color: "#dc2626", fontWeight: 700, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", borderTop: "1px solid #dc2626" }}>{taken}</div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: colHeight, background: C.border }} />

          {/* Cows */}
          {heights.map((h, i) => {
            const active = ev && cowIdx === i;
            const color = palette[i % palette.length];
            const grew = ev && cowIdx === i && ev.ate > 0;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: colHeight + 30 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 2 }}>
                  🐄 {t(E, "Cow", "소")} {i + 1}
                </div>
                <div style={{ position: "relative", width: 30, height: colHeight }}>
                  {/* Cow body — height bar */}
                  <div style={{
                    position: "absolute", left: 0, right: 0, bottom: 0,
                    height: h * U,
                    background: active ? `linear-gradient(180deg, ${color}cc, ${color})` : `${color}55`,
                    border: `1.5px solid ${color}`,
                    borderRadius: "6px 6px 0 0",
                    transition: "height .35s ease-out",
                    boxShadow: active ? `0 0 0 3px ${color}33` : "none",
                  }} />
                  {/* Reach line at top of cow */}
                  <div style={{ position: "absolute", left: -4, right: -4, bottom: h * U - 1, fontSize: 9, fontWeight: 700, color, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>{h}</div>
                  {grew && (
                    <div style={{ position: "absolute", left: 0, right: 0, top: -16, fontSize: 11, color: "#16a34a", fontWeight: 800, textAlign: "center" }}>+{ev.ate}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Heights row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          <span style={{ color: C.dim }}>h =</span>
          {heights.map((h, i) => (
            <span key={i} style={{
              color: ev && cowIdx === i ? palette[i] : C.text,
              fontWeight: ev && cowIdx === i ? 800 : 600,
            }}>
              {h}{i < heights.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>↻ {t(E, "Reset", "초기화")}</button>
        <button onClick={next} disabled={done} style={{
          background: done ? "#cbd5e1" : A, color: "#fff",
          border: `1.5px solid ${done ? "#cbd5e1" : A}`,
          borderRadius: 8, padding: "6px 18px", fontSize: 12, fontWeight: 800,
          cursor: done ? "default" : "pointer",
        }}>
          {done ? t(E, "✓ Done", "✓ 완료") : t(E, "▶ Next bite", "▶ 다음 한 입")}
        </button>
      </div>

      {/* Final-state callout */}
      {done && (
        <div style={{ marginTop: 10, background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#166534", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Final heights:", "최종 키:")} <b>{heights.join(", ")}</b> {t(E, "→ matches sample output 7, 2, 7", "→ 샘플 출력 7, 2, 7 와 일치")}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "M = int(data[p])",
  "p += 1",
  "heights = [int(data[p + i]) for i in range(N)]",
  "p += N",
  "canes   = [int(data[p + i]) for i in range(M)]",
  "",
  "for curr in canes:",
  "    bottom = 0",
  "    for i in range(N):",
  "        if heights[i] > bottom:",
  "            eat = min(curr, heights[i]) - bottom",
  "            if eat > 0:",
  "                heights[i] += eat   # cow grows",
  "                bottom += eat",
  "        if bottom >= curr:",
  "            break",
  "",
  "for x in heights:",
  "    print(x)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "    vector<long long> heights(N);",
  "    for (int i = 0; i < N; i++) cin >> heights[i];",
  "",
  "    for (int m = 0; m < M; m++) {",
  "        long long h;",
  "        cin >> h;",
  "        long long bottom = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            if (heights[i] > bottom) {",
  "                long long eat = min(heights[i], h) - bottom;",
  "                if (eat > 0) {",
  "                    heights[i] += eat;",
  "                    bottom += eat;",
  "                }",
  "            }",
  "            if (bottom >= h) break;",
  "        }",
  "    }",
  "",
  "    for (int i = 0; i < N; i++) cout << heights[i] << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCandyCaneSections(E) {
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
        t(E, "Split #include into specific headers (iostream, vector, algorithm).",
            "#include 는 배운 헤더들로 (iostream, vector, algorithm) 나눠 적어."),
        t(E, "Heights can grow large after many bites — long long is the safe type.",
            "여러 번 먹으면 키가 커질 수 있어 — long long 으로 안전하게."),
      ],
    },
  ];
}

export function CandyCaneProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadCandyCanePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CandyCane — Full Study Guide", "CandyCane — 종합 풀이 노트");
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

