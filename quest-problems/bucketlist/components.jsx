import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ============================================================
   BucketListSim — drag the time slider, see active cows live.
   Each cow = horizontal bar across her [s, t] interval. Active
   bars light up at the current minute; total buckets sum below.
   ============================================================ */
const _SIM_COWS = [
  { name: "🐄 A", s: 1, e: 5, b: 3, color: "#f97316" },
  { name: "🐮 B", s: 3, e: 8, b: 2, color: "#0891b2" },
  { name: "🐂 C", s: 6, e: 10, b: 4, color: "#a855f7" },
];
const _SIM_T_MIN = 1;
const _SIM_T_MAX = 10;

export function BucketListSim({ E }) {
  const [time, setTime] = useState(4);
  const span = _SIM_T_MAX - _SIM_T_MIN;
  const active = _SIM_COWS.filter(c => time >= c.s && time <= c.e);
  const total = active.reduce((sum, c) => sum + c.b, 0);

  // Compute peak across all minutes for "best so far" hint
  let peak = 0;
  for (let m = _SIM_T_MIN; m <= _SIM_T_MAX; m++) {
    const s = _SIM_COWS.filter(c => m >= c.s && m <= c.e).reduce((a, c) => a + c.b, 0);
    if (s > peak) peak = s;
  }

  const pctOf = (x) => `${((x - _SIM_T_MIN) / span) * 100}%`;
  const widthOf = (s, e) => `${((e - s) / span) * 100}%`;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", marginBottom: 6, textAlign: "center" }}>
          {t(E, "🪣 Bucket Timeline — drag to scrub", "🪣 양동이 타임라인 — 드래그해서 시간 이동")}
        </div>

        {/* Cow bars */}
        <div style={{ position: "relative", padding: "4px 8px 0" }}>
          {_SIM_COWS.map((c, i) => {
            const isActive = time >= c.s && time <= c.e;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 60, fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                  {c.name}
                </div>
                <div style={{ position: "relative", flex: 1, height: 22, background: "#fef3c7", borderRadius: 6 }}>
                  <div style={{
                    position: "absolute",
                    left: pctOf(c.s),
                    width: widthOf(c.s, c.e),
                    top: 0, height: "100%",
                    background: isActive ? c.color : `${c.color}55`,
                    borderRadius: 6,
                    border: isActive ? `2px solid ${c.color}` : `1px solid ${c.color}77`,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 11, fontWeight: 800,
                  }}>
                    {t(E, `${c.b} buckets`, `양동이 ${c.b}`)}
                  </div>
                </div>
                <div style={{ width: 28, fontSize: 11, color: C.dim, textAlign: "right", fontFamily: "'JetBrains Mono',monospace" }}>
                  {c.s}-{c.e}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time axis with current marker */}
        <div style={{ position: "relative", margin: "10px 8px 0", paddingLeft: 60, paddingRight: 28 }}>
          <div style={{ position: "relative", height: 24 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.border }} />
            {Array.from({ length: span + 1 }, (_, i) => i + _SIM_T_MIN).map(m => (
              <div key={m} style={{
                position: "absolute", left: pctOf(m), top: 0,
                transform: "translateX(-50%)",
                fontSize: 10, color: m === time ? A : C.dim,
                fontWeight: m === time ? 800 : 500,
              }}>
                <div style={{ width: 1, height: 6, background: m === time ? A : C.border, margin: "0 auto" }} />
                <div style={{ marginTop: 2 }}>{m}</div>
              </div>
            ))}
            {/* Vertical playhead line */}
            <div style={{
              position: "absolute", left: pctOf(time), top: -160,
              width: 2, height: 168, background: A, opacity: 0.45,
              pointerEvents: "none", transform: "translateX(-1px)",
            }} />
          </div>
        </div>

        {/* Slider */}
        <div style={{ padding: "10px 8px 0", paddingLeft: 60, paddingRight: 28 }}>
          <input
            type="range"
            min={_SIM_T_MIN}
            max={_SIM_T_MAX}
            step={1}
            value={time}
            onChange={e => setTime(Number(e.target.value))}
            style={{ width: "100%", accentColor: A }}
          />
        </div>
      </div>

      {/* Live readout */}
      <div style={{
        background: total === peak ? "#fef3c7" : "#f8fafc",
        border: `2px solid ${total === peak ? A : C.border}`,
        borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ fontSize: 13, color: C.text }}>
          <b style={{ color: A }}>t = {time}</b>
          {" · "}
          {t(E, "active: ", "활성: ")}
          {active.length === 0
            ? <span style={{ color: C.dim }}>{t(E, "none", "없음")}</span>
            : active.map((c, i) => (
                <span key={i} style={{ color: c.color, fontWeight: 700 }}>
                  {c.name}({c.b}){i < active.length - 1 ? " + " : ""}
                </span>
              ))
          }
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: total === peak ? A : C.text }}>
          {t(E, "buckets needed: ", "필요 양동이: ")}
          <span style={{ fontSize: 18 }}>{total}</span>
          {total === peak && total > 0 && (
            <span style={{ marginLeft: 6, fontSize: 11, color: A }}>
              {t(E, "← peak!", "← 최댓값!")}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Drag the slider. The answer is the largest sum you ever see — that's the minimum buckets FJ must own.",
          "슬라이더를 움직여 봐. 가장 큰 합이 정답 — FJ 가 가져야 할 양동이의 최소 수.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "events = []",
  "for _ in range(N):",
  "    s, e, b = map(int, input().split())",
  "    events.append((s, b))     # cow starts",
  "    events.append((e + 1, -b))  # cow ends",
  "",
  "events.sort()",
  "",
  "cur = 0",
  "best = 0",
  "for time, delta in events:",
  "    cur += delta",
  "    best = max(best, cur)",
  "",
  "print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <utility>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<pair<int,int>> events;",
  "    for (int _n = 0; _n < N; _n++) {",
  "        int s, e, b; cin >> s >> e >> b;",
  "        events.push_back({s, b});",
  "        events.push_back({e + 1, -b});",
  "    }",
  "    sort(events.begin(), events.end());",
  "    long long cur = 0, peak = 0;",
  "    for (auto& [t, d] : events) { cur += d; peak = max(peak, cur); }",
  "    cout << peak << \"\\n\";",
  "    return 0;",
  "}",
];

export function getBucketListSections(E) {
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

export function BucketListProgressiveCode(props) {
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


export function downloadBucketListPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "BucketList — Full Study Guide", "BucketList — 종합 풀이 노트");
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

