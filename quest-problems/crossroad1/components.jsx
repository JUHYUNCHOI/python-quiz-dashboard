// 🔒 USACO_VERIFIED — cpid=711, crossroad1 (2017 Feb Bronze #1, Why Did Cow Cross)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   CrossRoad1Sim — step through observations one at a time.
   For each (cow, side), show last_side dict update and whether
   a crossing was counted. Helps students *see* the rule:
   "crossing iff cow seen before AND side changed."
   ═══════════════════════════════════════════════════════════════ */
const _CR_PRESETS = [
  {
    label: "case 1",
    obs: [[1, 0], [2, 1], [1, 1], [2, 0], [1, 0]],
  },
  {
    label: "case 2",
    obs: [[3, 0], [3, 0], [3, 1], [3, 1], [3, 0]],
  },
  {
    label: "case 3",
    obs: [[1, 1], [2, 0], [3, 1], [2, 1], [1, 0], [3, 1]],
  },
];

export function CrossRoad1Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const preset = _CR_PRESETS[pi];
  const obs = preset.obs;

  // Replay observations [0 .. stepIdx-1] (stepIdx=0 means "before any step").
  const last = {};
  let crossings = 0;
  let lastEvent = null; // info about the just-processed observation
  for (let i = 0; i < stepIdx; i++) {
    const [cow, side] = obs[i];
    const prev = last[cow];
    let kind = "first"; // first | same | cross
    if (prev !== undefined) {
      if (prev !== side) { crossings += 1; kind = "cross"; }
      else { kind = "same"; }
    }
    last[cow] = side;
    if (i === stepIdx - 1) lastEvent = { cow, side, prev, kind };
  }

  const cowIds = Array.from(new Set(obs.map(o => o[0]))).sort((a, b) => a - b);

  const sideColor = (s) => s === 0 ? "#3b82f6" : "#dc2626";
  const sideLabel = (s) => s === 0 ? "0" : "1";

  const eventBox = () => {
    if (!lastEvent) {
      return t(E, "Press → to process the first observation.", "→ 를 눌러 첫 관찰을 처리해요.");
    }
    const { cow, side, prev, kind } = lastEvent;
    if (kind === "first") {
      return (
        <>
          <b>cow {cow}</b> {t(E, "first seen on side", "처음 봤어요 — 쪽")} <b style={{ color: sideColor(side) }}>{sideLabel(side)}</b>
          {" → "}
          <span style={{ color: C.dim }}>{t(E, "no crossing (no previous side).", "아직 건넌 게 아니에요 (앞서 본 쪽이 없어요).")}</span>
        </>
      );
    }
    if (kind === "same") {
      return (
        <>
          <b>cow {cow}</b>: {t(E, "still on side", "여전히")} <b style={{ color: sideColor(side) }}>{sideLabel(side)}</b>
          {" → "}
          <span style={{ color: C.dim }}>{t(E, "no crossing (same side as before).", "건너지 않았어요 (앞서 본 쪽과 같아요).")}</span>
        </>
      );
    }
    return (
      <>
        <b>cow {cow}</b>: <b style={{ color: sideColor(prev) }}>{sideLabel(prev)}</b> → <b style={{ color: sideColor(side) }}>{sideLabel(side)}</b>{" "}
        <span style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "crossing! +1", "횡단! +1")}</span>
      </>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_CR_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStepIdx(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Observations strip */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "observations (cow, side)", "관찰 (소, 쪽)")}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {obs.map(([cow, side], i) => {
            const done = i < stepIdx;
            const cur = i === stepIdx - 1;
            return (
              <div key={i} style={{
                padding: "4px 8px", borderRadius: 6,
                border: `1.5px solid ${cur ? A : (done ? "#86efac" : C.border)}`,
                background: cur ? "#fffbeb" : (done ? "#f0fdf4" : "#fff"),
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700,
                opacity: done || cur ? 1 : 0.55,
              }}>
                ({cow},<span style={{ color: sideColor(side) }}>{sideLabel(side)}</span>)
              </div>
            );
          })}
        </div>
      </div>

      {/* last_side dict */}
      <div style={{ background: "#f0fdf4", border: `1.5px solid #86efac`, borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text }}>
        <div style={{ marginBottom: 6, fontWeight: 700 }}>last_side = {"{"}</div>
        <div style={{ paddingLeft: 14, lineHeight: 1.7 }}>
          {cowIds.map(c => (
            <div key={c}>
              {c}: {last[c] === undefined
                ? <span style={{ color: C.dim }}>—</span>
                : <b style={{ color: sideColor(last[c]) }}>{sideLabel(last[c])}</b>}
            </div>
          ))}
        </div>
        <div style={{ fontWeight: 700 }}>{"}"}</div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #86efac" }}>
          crossings = <b style={{ color: "#16a34a" }}>{crossings}</b>
        </div>
      </div>

      {/* event narration */}
      <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: "#92400e", lineHeight: 1.6, minHeight: 44 }}>
        {eventBox()}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0} style={{
          background: stepIdx === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${stepIdx === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: stepIdx === 0 ? "#b0b5c3" : A,
          cursor: stepIdx === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{stepIdx} / {obs.length}</span>
        <button onClick={() => setStepIdx(Math.min(obs.length, stepIdx + 1))} disabled={stepIdx === obs.length} style={{
          background: stepIdx === obs.length ? "#e5e7eb" : A, border: `1px solid ${stepIdx === obs.length ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: stepIdx === obs.length ? "#b0b5c3" : "#fff", cursor: stepIdx === obs.length ? "default" : "pointer",
        }}>→</button>
        <button onClick={() => setStepIdx(0)} disabled={stepIdx === 0} style={{
          background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "5px 10px", fontSize: 11, fontWeight: 600, color: C.dim,
          cursor: stepIdx === 0 ? "default" : "pointer", marginLeft: 6,
        }}>{t(E, "reset", "처음")}</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('crossroad.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 각 관찰: (cow, side)",
  "# 같은 cow 가 이전 관찰과 다른 side 면 cross 횟수 증가",
  "last_side = {}",
  "crossings = 0",
  "for i in range(N):",
  "    cow, side = map(int, lines[1 + i].split())",
  "    if cow in last_side:",
  "        if last_side[cow] != side:",
  "            crossings += 1",
  "    last_side[cow] = side",
  "",
  "with open('crossroad.out', 'w') as file:",
  "    file.write(str(crossings) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"crossroad.in\");",
  "    ofstream fout(\"crossroad.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    // 같은 cow 가 이전 관찰과 다른 side 면 cross 횟수 증가",
  "    map<int, int> last_side;",
  "    int crossings = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        int cow, side;",
  "        fin >> cow >> side;",
  "        if (last_side.count(cow) && last_side[cow] != side) {",
  "            crossings++;",
  "        }",
  "        last_side[cow] = side;",
  "    }",
  "    fout << crossings << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCrossRoad1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
            "What should we output? The total number of crossings, summed\nover every cow. So walk through the observations in order, and\nfor each cow, remember the side we last saw her on (last_side).",
            "무엇을 출력해야 하나요? 모든 소를 합친 횡단 총 횟수예요.\n그러니 관찰을 순서대로 하나씩 보면서, 소마다 마지막으로\n본 쪽(last_side)을 적어 둬요."),
        t(E,
            "If we've seen this cow before AND her side is different from\nlast time, she just crossed — add 1 to crossings.",
            "이 소를 전에도 본 적이 있고, 그때 쪽이 지금과 다르면\n방금 건넌 거예요 — crossings 를 1 늘려요."),
        t(E,
            "Then update last_side for this cow to her current side, so the\nnext observation can be compared correctly.",
            "그리고 이 소의 last_side 를 지금 쪽으로 갱신해서,\n다음 관찰과 제대로 비교할 수 있게 해요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "Python 의 map() 덕분에 알고리즘이 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 적어요 — 코드가 하려는 일이 또렷해져요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function CrossRoad1ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이 그대로다 — 배열 내용은 절대
   바꾸지 않고, beats(설명 말풍선)만 덧붙인다. getCrossRoad1Sections() 는 PDF 다운로드가
   계속 쓰므로 그대로 둔다. ── */
export function getCrossRoad1Walk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "last_side", ko: "소마다 마지막으로 본 쪽", en: "the side we last saw each cow on" },
        { v: "crossings", ko: "지금까지 센 횡단 횟수", en: "crossings counted so far" },
      ],
      beats: [
        { hi: [5, 14], bubble: t(E,
          "What should we print? The total number of crossings, summed over every cow. So read N and prepare a place to remember each cow's last side.",
          "무엇을 출력해야 하나요? 모든 소를 합친 횡단 총 횟수예요. 그러니 N 을 읽고, 소마다 마지막으로 본 쪽을 적어 둘 자리를 준비해요.") },
        { hi: [15, 22], bubble: t(E,
          "For each observation, if we've seen this cow before AND her side differs from last time, she just crossed — count it. Then update her last side.",
          "관찰마다, 이 소를 전에 본 적이 있고 그때 쪽이 지금과 다르면 방금 건넌 거예요 — 세요. 그리고 이 소의 마지막 쪽을 갱신해요.") },
        { hi: [23, 25], bubble: t(E,
          "Print the total crossings.",
          "총 횡단 횟수를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "last_side", ko: "소마다 마지막으로 본 쪽", en: "the side we last saw each cow on" },
      { v: "crossings", ko: "지금까지 센 횡단 횟수", en: "crossings counted so far" },
    ],
    beats: [
      { hi: [0, 8], bubble: t(E,
        "What should we output? The total number of crossings, summed over every cow. So read N and prepare a place to remember each cow's last side.",
        "무엇을 출력해야 하나요? 모든 소를 합친 횡단 총 횟수예요. 그러니 N 을 읽고, 소마다 마지막으로 본 쪽을 적어 둘 자리를 준비해요.") },
      { hi: [9, 14], bubble: t(E,
        "For each observation, if we've seen this cow before AND her side differs from last time, she just crossed — count it. Then update last_side for this cow to her current side.",
        "관찰마다, 이 소를 전에 본 적이 있고 그때 쪽이 지금과 다르면 방금 건넌 거예요 — crossings 를 늘려요. 그리고 이 소의 last_side 를 지금 쪽으로 갱신해요.") },
      { hi: [16, 17], bubble: t(E,
        "Write the total crossings.",
        "총 횡단 횟수를 파일에 출력해요.") },
    ],
  };
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


export function downloadCrossRoad1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CrossRoad1 — Full Study Guide", "CrossRoad1 — 종합 풀이 노트");
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

