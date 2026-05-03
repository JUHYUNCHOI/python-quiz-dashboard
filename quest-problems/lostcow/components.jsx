import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* Section 1: input */
const LC_INPUT_PY = [
  "x, y = map(int, input().split())",
];
const LC_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long x, y;",
  "    cin >> x >> y;",
];

/* Section 2: setup state */
const LC_STATE_PY = [
  "pos = x        # current position",
  "direction = 1  # +1 right, -1 left",
  "step = 1       # leg length, doubles each turn",
  "total = 0      # accumulated walked distance",
];
const LC_STATE_CPP = [
  "    long long pos = x;",
  "    long long direction = 1;",
  "    long long step = 1;",
  "    long long total = 0;",
];

/* Section 3: zigzag loop */
const LC_LOOP_PY = [
  "while True:",
  "    target = pos + direction * step",
  "    lo, hi = (pos, target) if pos <= target else (target, pos)",
  "    if lo <= y <= hi:                # we pass y on this leg",
  "        total += abs(y - pos)",
  "        break",
  "    total += step                    # walk the full leg",
  "    pos = target",
  "    direction *= -1",
  "    step *= 2                        # next leg is twice as long",
  "",
  "print(total)",
];
const LC_LOOP_CPP = [
  "    while (true) {",
  "        long long target = pos + direction * step;",
  "        long long lo = min(pos, target), hi = max(pos, target);",
  "        if (lo <= y && y <= hi) {",
  "            total += llabs(y - pos);",
  "            break;",
  "        }",
  "        total += step;",
  "        pos = target;",
  "        direction *= -1;",
  "        step *= 2;",
  "    }",
  "    cout << total << '\\n';",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const LC_FULL_PY = [
  "x, y = map(int, input().split())",
  "",
  "pos = x",
  "direction = 1",
  "step = 1",
  "total = 0",
  "",
  "while True:",
  "    target = pos + direction * step",
  "    lo, hi = (pos, target) if pos <= target else (target, pos)",
  "    if lo <= y <= hi:",
  "        total += abs(y - pos)",
  "        break",
  "    total += step",
  "    pos = target",
  "    direction *= -1",
  "    step *= 2",
  "",
  "print(total)",
];
const LC_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    long long x, y; cin >> x >> y;",
  "",
  "    long long pos = x, direction = 1, step = 1, total = 0;",
  "    while (true) {",
  "        long long target = pos + direction * step;",
  "        long long lo = min(pos, target), hi = max(pos, target);",
  "        if (lo <= y && y <= hi) { total += llabs(y - pos); break; }",
  "        total += step;",
  "        pos = target;",
  "        direction *= -1;",
  "        step *= 2;",
  "    }",
  "    cout << total << '\\n';",
  "    return 0;",
  "}",
];

export function getLostCowSections(E) {
  return [
    {
      label: t(E, "📦 1. Read x, y", "📦 1. x, y 읽기"),
      color: A,
      py: LC_INPUT_PY, cpp: LC_INPUT_CPP,
      why: [
        t(E, "x = FJ's start, y = the cow's position. Both can be very large — use 64-bit.",
            "x = FJ 시작 위치, y = 소 위치. 둘 다 매우 클 수 있어 64비트 사용."),
      ],
    },
    {
      label: t(E, "🧭 2. Setup Walk State", "🧭 2. 걷기 상태 셋업"),
      color: "#0891b2",
      py: LC_STATE_PY, cpp: LC_STATE_CPP,
      why: [
        t(E, "We track 4 things: current position, current direction, leg length, total walked.",
            "4가지 추적: 현재 위치, 방향, 다리 길이, 총 걸은 거리."),
        t(E, "Direction starts +1 (right) and flips each leg. Step size doubles each leg.",
            "방향은 +1 (오른쪽) 시작해 매 다리마다 반전. 스텝 크기는 매 다리마다 두 배."),
      ],
    },
    {
      label: t(E, "🔁 3. Zigzag Until We Pass y", "🔁 3. y를 지나갈 때까지 지그재그"),
      color: "#16a34a",
      py: LC_LOOP_PY, cpp: LC_LOOP_CPP,
      why: [
        t(E, "Each iteration computes target = pos + direction · step.",
            "매 반복: target = pos + direction · step 계산."),
        t(E, "If y lies between pos and target, FJ finds the cow on this leg — add |y - pos| and stop.",
            "y가 pos와 target 사이면 이번 다리에서 소를 찾음 — |y - pos| 더하고 종료."),
        t(E, "Otherwise add the full leg, advance, flip direction, double the step.",
            "아니면 전체 다리 더하고, 진행, 방향 반전, 스텝 두 배."),
      ],
      pyOnly: [
        t(E, "Tuple unpacking lo, hi = ... keeps the comparison clean.",
            "튜플 언팩으로 lo, hi = ... 비교를 깔끔하게."),
      ],
      cppOnly: [
        t(E, "min/max from <algorithm> (via bits/stdc++.h) gives the [lo, hi] window in one line.",
            "min/max로 [lo, hi] 윈도우를 한 줄에."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: LC_FULL_PY, cpp: LC_FULL_CPP,
      why: [
        t(E, "Step doubles each leg, so the loop runs O(log |x - y|) times — extremely fast.",
            "스텝이 두 배씩 커지니 루프는 O(log |x - y|) — 매우 빠름."),
      ],
    },
  ];
}

export function LostCowProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>💡 {t(E, "Why this way?", "왜 이렇게?")}</div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span><span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>{langLabel} {t(E, "specific:", "전용:")}</div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span><span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}><CodeBlock lines={code} /></div>
          </div>
        );
      })}
    </div>
  );
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadLostCowPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "🐄 The Lost Cow — Full Study Guide", "🐄 The Lost Cow — 종합 풀이 노트");
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
<div class="sub">USACO 2017 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
