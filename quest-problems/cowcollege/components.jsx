import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ─────────────────────────────────────────────────────────────
   TuitionSlider — interactive sim for "try every price"
   Student drags price; bars above cut-line turn green (paying),
   below turn gray (skipped). Revenue updates live.
   ───────────────────────────────────────────────────────────── */
export function TuitionSlider({ E, sorted = [1, 2, 3, 4, 5] }) {
  const N = sorted.length;
  const maxV = sorted[N - 1];
  const [price, setPrice] = useState(sorted[Math.floor(N / 2)]);

  // Cows paying: those with c[i] >= price
  const paying = sorted.filter(v => v >= price).length;
  const revenue = price * paying;

  // Best revenue across all candidate prices (only c[i] values matter)
  const best = Math.max(...sorted.map((p, i) => p * (N - i)));
  const isBest = revenue === best;

  // Bar dimensions
  const BAR_W = 36;
  const BAR_GAP = 6;
  const CHART_H = 120;
  const chartW = N * BAR_W + (N - 1) * BAR_GAP;
  const cutY = CHART_H - (price / maxV) * CHART_H;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8 }}>
        {t(E, "Drag the slider — try each price!", "슬라이더를 움직여 — 가격을 시도해봐!")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.6 }}>
        {t(E,
          "Sorted c = [1, 2, 3, 4, 5]. Green bars = cows paying (c[i] ≥ price). Gray = skip.",
          "정렬된 c = [1, 2, 3, 4, 5]. 초록 막대 = 내는 소 (c[i] ≥ 가격). 회색 = 안 냄.")}
      </div>

      {/* Bar chart with horizontal cut-line */}
      <div style={{
        display: "flex", justifyContent: "center", marginBottom: 10,
      }}>
        <div style={{ position: "relative", width: chartW, height: CHART_H + 24 }}>
          {/* Bars */}
          <div style={{
            display: "flex", gap: BAR_GAP, alignItems: "flex-end",
            height: CHART_H, position: "relative",
          }}>
            {sorted.map((v, i) => {
              const isPaying = v >= price;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: BAR_W, height: (v / maxV) * CHART_H,
                    background: isPaying ? C.ok : "#e5e7eb",
                    border: `1.5px solid ${isPaying ? C.ok : C.dimLight}`,
                    borderRadius: "6px 6px 0 0",
                    display: "flex", alignItems: "flex-start", justifyContent: "center",
                    paddingTop: 3, transition: "background 120ms, border-color 120ms",
                  }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: isPaying ? "#fff" : C.dim,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>${v}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cut-line overlay (price) */}
          <div style={{
            position: "absolute", left: -4, right: -4, top: cutY - 1,
            height: 0, borderTop: `2px dashed ${A}`,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: chartW + 6, top: cutY - 10,
            fontSize: 11, fontWeight: 700, color: A,
            fontFamily: "'JetBrains Mono', monospace",
            background: "#fffbeb", border: `1px solid ${A}`,
            padding: "1px 5px", borderRadius: 4, whiteSpace: "nowrap",
          }}>
            ${price}
          </div>
          {/* Index labels under bars */}
          <div style={{
            display: "flex", gap: BAR_GAP, marginTop: 4,
          }}>
            {sorted.map((_, i) => (
              <div key={i} style={{
                width: BAR_W, textAlign: "center",
                fontSize: 10, fontWeight: 600, color: C.dim,
                fontFamily: "'JetBrains Mono', monospace",
              }}>i={i}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: A, minWidth: 56 }}>
          {t(E, "Price", "가격")}
        </span>
        <input
          type="range"
          min={1}
          max={maxV}
          step={1}
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          style={{ flex: 1, accentColor: A }}
        />
        <span style={{
          fontSize: 13, fontWeight: 700, color: A, minWidth: 36, textAlign: "right",
          fontFamily: "'JetBrains Mono', monospace",
        }}>${price}</span>
      </div>

      {/* Live revenue card */}
      <div style={{
        background: isBest ? C.okBg : "#fffbeb",
        border: `1.5px solid ${isBest ? C.okBd : "#fcd34d"}`,
        borderRadius: 10, padding: "10px 12px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "price", "가격")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: A }}>${price}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "cows paying", "내는 소")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{paying}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "revenue", "수입")}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 700,
            color: isBest ? C.ok : C.text,
          }}>
            {price}×{paying}={revenue}{isBest ? " ★" : ""}
          </div>
        </div>
      </div>

      {isBest && (
        <div style={{
          marginTop: 8, textAlign: "center", fontSize: 12, fontWeight: 700, color: C.ok,
        }}>
          {t(E, "★ Best price found!", "★ 최고 가격 발견!")}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "c = list(map(int, input().split()))",
  "",
  "c.sort()",
  "",
  "best_rev = 0",
  "best_tuition = c[0]",
  "",
  "for i in range(N):",
  "    tuition = c[i]",
  "    cows_paying = N - i",
  "    revenue = tuition * cows_paying",
  "    if revenue > best_rev:",
  "        best_rev = revenue",
  "        best_tuition = tuition",
  "",
  "print(best_rev, best_tuition)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> c(N);",
  "    for (int i = 0; i < N; i++) cin >> c[i];",
  "    sort(c.begin(), c.end());",
  "    long long bestRev = 0;",
  "    long long bestT = c[0];",
  "    for (int i = 0; i < N; i++) {",
  "        long long rev = c[i] * (long long)(N - i);",
  "        if (rev > bestRev) {",
  "            bestRev = rev;",
  "            bestT = c[i];",
  "        }",
  "    }",
  "    cout << bestRev << \" \" << bestT << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowCollegeSections(E) {
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
        t(E, "tuition * cows can overflow int — long long with explicit cast keeps it safe.",
            "tuition * cows 는 int 범위 초과 가능 — long long 캐스팅으로 안전하게."),
      ],
    },
  ];
}

export function CowCollegeProgressiveCode(props) {
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


export function downloadCowCollegePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowCollege — Full Study Guide", "CowCollege — 종합 풀이 노트");
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

