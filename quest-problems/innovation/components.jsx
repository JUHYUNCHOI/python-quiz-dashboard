import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ============================================================
   InnovationSim — slide K = "take K shortest tasks"
   Tasks show as horizontal duration bars. Sorted ascending.
   Live readout: time used vs H, count completed, fits/overflow.
   Student sees the greedy peak — biggest K with time_used ≤ H.
   ============================================================ */
const _SIM_TASKS = [2, 3, 1, 4, 2];
const _SIM_H = 8;

export function InnovationSim({ E }) {
  // Sorted ascending — index of bar shown corresponds to "Kth shortest"
  const sorted = [..._SIM_TASKS].sort((a, b) => a - b);
  const N = sorted.length;
  const maxBar = Math.max(...sorted);
  const [k, setK] = useState(0);

  // Time used by taking the k shortest
  let used = 0;
  for (let i = 0; i < k; i++) used += sorted[i];
  const fits = used <= _SIM_H;

  // Greedy peak: largest K with prefix sum ≤ H
  let bestK = 0, sum = 0;
  for (let i = 0; i < N; i++) {
    if (sum + sorted[i] <= _SIM_H) { sum += sorted[i]; bestK = i + 1; }
    else break;
  }

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a8a", marginBottom: 8, textAlign: "center" }}>
          {t(E, "📅 Tasks sorted shortest → longest", "📅 작업을 짧은 순 → 긴 순으로 정렬")}
        </div>

        {/* Sorted task bars */}
        <div style={{ padding: "4px 8px 0" }}>
          {sorted.map((dur, i) => {
            const taken = i < k;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 60, fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                  {t(E, `task ${i + 1}`, `작업 ${i + 1}`)}
                </div>
                <div style={{ position: "relative", flex: 1, height: 22, background: "#dbeafe", borderRadius: 6 }}>
                  <div style={{
                    width: `${(dur / maxBar) * 100}%`,
                    height: "100%",
                    background: taken ? A : `${A}55`,
                    borderRadius: 6,
                    border: taken ? `2px solid ${A}` : `1px solid ${A}77`,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 11, fontWeight: 800,
                  }}>
                    {t(E, `${dur} h`, `${dur}시간`)}
                  </div>
                </div>
                <div style={{ width: 32, fontSize: 11, color: taken ? A : C.dim, textAlign: "right", fontWeight: taken ? 800 : 500 }}>
                  {taken ? t(E, "take", "선택") : "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* H budget bar */}
        <div style={{ margin: "12px 8px 0", paddingLeft: 60, paddingRight: 32 }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>
            {t(E, `Time used / H = ${_SIM_H}`, `사용 시간 / H = ${_SIM_H}`)}
          </div>
          <div style={{ position: "relative", height: 16, background: "#fef3c7", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${Math.min(100, (used / _SIM_H) * 100)}%`,
              height: "100%",
              background: fits ? "#22c55e" : "#dc2626",
              transition: "all 0.15s",
            }} />
            {!fits && (
              <div style={{
                position: "absolute", top: 0, right: 0, height: "100%",
                display: "flex", alignItems: "center", paddingRight: 6,
                fontSize: 10, fontWeight: 800, color: "#fff",
              }}>
                {t(E, "OVER!", "초과!")}
              </div>
            )}
          </div>
        </div>

        {/* Slider */}
        <div style={{ padding: "12px 8px 0", paddingLeft: 60, paddingRight: 32 }}>
          <input
            type="range"
            min={0}
            max={N}
            step={1}
            value={k}
            onChange={e => setK(Number(e.target.value))}
            style={{ width: "100%", accentColor: A }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.dim, marginTop: 2 }}>
            <span>0</span><span>{N}</span>
          </div>
        </div>
      </div>

      {/* Live readout */}
      <div style={{
        background: k === bestK ? "#dbeafe" : "#f8fafc",
        border: `2px solid ${k === bestK ? A : C.border}`,
        borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ fontSize: 13, color: C.text }}>
          <b style={{ color: A }}>K = {k}</b>
          {" · "}
          {t(E, "time used: ", "사용 시간: ")}
          <span style={{ color: fits ? "#15803d" : "#dc2626", fontWeight: 700 }}>{used}</span>
          {" / "}{_SIM_H}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: k === bestK ? A : C.text }}>
          {t(E, "tasks done: ", "완료 작업: ")}
          <span style={{ fontSize: 18 }}>{fits ? k : "—"}</span>
          {k === bestK && (
            <span style={{ marginLeft: 6, fontSize: 11, color: A }}>
              {t(E, "← greedy peak!", "← 그리디 최댓값!")}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Slide K. Tasks are already sorted shortest-first — picking shortest fits the most. The biggest K that stays green is the answer.",
          "K 를 움직여 봐. 짧은 순으로 정렬했으니 — 짧은 것부터 고르면 가장 많이 들어가요. 초록색을 유지하는 가장 큰 K 가 정답이에요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, H = map(int, input().split())",
  "tasks = list(map(int, input().split()))",
  "",
  "# Sort tasks by duration (greedy)",
  "tasks.sort()",
  "",
  "count = 0",
  "time_left = H",
  "for dur in tasks:",
  "    if time_left >= dur:",
  "        time_left -= dur",
  "        count += 1",
  "    else:",
  "        break",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, H; cin >> N >> H;",
  "    vector<int> tasks(N);",
  "    for (auto& x : tasks) cin >> x;",
  "    sort(tasks.begin(), tasks.end());",
  "    int count = 0, left = H;",
  "    for (int d : tasks) {",
  "        if (left >= d) {",
  "            left -= d;",
  "            count++;",
  "        }",
  "    }",
  "    cout << count << \"\n\";",
  "    return 0;",
  "}",
];

export function getInnovationSections(E) {
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
        t(E, "Range-for with auto& iterates the sorted vector without manual indexing.",
            "auto& 범위 for로 정렬된 vector를 인덱스 없이 순회."),
        t(E, "sort + linear pass = O(N log N) — perfectly fast for the greedy.",
            "sort + 선형 패스 = O(N log N) — 탐욕법에 충분히 빠름."),
      ],
    },
  ];
}

export function InnovationProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadInnovationPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Innovation — Full Study Guide", "Innovation — 종합 풀이 노트");
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

