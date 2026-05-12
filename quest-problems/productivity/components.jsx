import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   ProductivitySim — slide S, watch d[i] = c[i] - t[i] light up
   the farms Bessie can still reach (d[i] > S).
   ═══════════════════════════════════════════════════════════════ */
const SAMPLE_C  = [3, 5, 7, 9, 12];
const SAMPLE_T  = [4, 2, 3, 3, 8];

export function ProductivitySim({ E }) {
  const [S, setS] = useState(3);
  const N = SAMPLE_C.length;
  const farms = SAMPLE_C.map((c, i) => {
    const ti = SAMPLE_T[i];
    const d = c - ti;
    const arrive = ti + S;
    const ok = arrive < c;            // equivalent to S < d
    return { i, c, ti, d, arrive, ok };
  });
  const reachable = farms.filter(f => f.ok).length;
  const sortedD = [...farms].map(f => f.d).sort((a, b) => a - b);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", textAlign: "center", marginBottom: 8 }}>
        🎚️ {t(E, "Slide wake-up time S", "기상 시간 S 슬라이드")}
      </div>

      {/* Slider */}
      <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#9a3412" }}>S</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: A }}>{S}</span>
        </div>
        <input
          type="range" min={0} max={12} value={S}
          onChange={(e) => setS(parseInt(e.target.value, 10))}
          style={{ width: "100%", accentColor: A }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9a3412" }}>
          <span>0</span><span>12</span>
        </div>
      </div>

      {/* Farm table */}
      <div style={{ background: "#fff", border: "1px solid #fed7aa", borderRadius: 10, padding: 10, marginBottom: 10, overflowX: "auto" }}>
        <table style={{ width: "100%", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, borderCollapse: "collapse", color: C.text }}>
          <thead>
            <tr style={{ color: "#9a3412", fontWeight: 700 }}>
              <th style={{ textAlign: "left", padding: 4 }}>farm</th>
              <th style={{ padding: 4 }}>c</th>
              <th style={{ padding: 4 }}>t</th>
              <th style={{ padding: 4 }}>d=c−t</th>
              <th style={{ padding: 4 }}>t+S</th>
              <th style={{ padding: 4 }}>{t(E, "reach?", "도달?")}</th>
            </tr>
          </thead>
          <tbody>
            {farms.map(f => (
              <tr key={f.i} style={{ background: f.ok ? "#dcfce7" : "transparent", color: f.ok ? "#166534" : C.dim }}>
                <td style={{ padding: 4 }}>{f.i}</td>
                <td style={{ textAlign: "center", padding: 4 }}>{f.c}</td>
                <td style={{ textAlign: "center", padding: 4 }}>{f.ti}</td>
                <td style={{ textAlign: "center", padding: 4, fontWeight: 700, color: f.ok ? "#15803d" : "#9a3412" }}>{f.d}</td>
                <td style={{ textAlign: "center", padding: 4 }}>{f.arrive}{" "}<span style={{ color: C.dim }}>{f.ok ? "<" : "≥"}</span>{" "}{f.c}</td>
                <td style={{ textAlign: "center", padding: 4, fontWeight: 700 }}>{f.ok ? "✓" : "·"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sorted d[] number line */}
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
          {t(E, "sorted d[]  →  count d > S", "정렬된 d[]  →  d > S 개수")}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {sortedD.map((dv, i) => {
            const above = dv > S;
            return (
              <div key={i} style={{
                minWidth: 36, padding: "6px 8px", textAlign: "center",
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800,
                borderRadius: 8,
                background: above ? "#16a34a" : "#fed7aa",
                color: above ? "#fff" : "#9a3412",
                border: above ? "2px solid #15803d" : "1px solid #fdba74",
              }}>{dv}</div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <div style={{ background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
          {t(E, "REACHABLE COUNT", "도달 가능 개수")}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#166534", fontFamily: "'JetBrains Mono',monospace" }}>
          {reachable} / {N}
        </div>
        <div style={{ fontSize: 11, color: "#15803d", marginTop: 4 }}>
          {t(E,
            `farms with d[i] > ${S}`,
            `d[i] > ${S} 인 농장`)}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "from bisect import bisect_left",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "Q = int(data[p])",
  "p += 1",
  "c  = [int(x) for x in data[p:p+N]]",
  "p += N",
  "ti = [int(x) for x in data[p:p+N]]",
  "p += N",
  "",
  "# Reachable farm i iff S + t[i] < c[i]  ⇔  d[i] := c[i] - t[i] > S.",
  "d = sorted(c[i] - ti[i] for i in range(N))",
  "",
  "out = []",
  "for _ in range(Q):",
  "    V = int(data[p]); p += 1   # query is 'V S' — V first, then S",
  "    S = int(data[p])",
  "    p += 1",
  "    reachable = N - bisect_left(d, S + 1)",
  "    out.append('YES' if reachable >= V else 'NO')",
  "",
  "print(chr(10).join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<long long> c(N), ti(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> c[i];",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> ti[i];",
  "    }",
  "    vector<long long> d(N);",
  "    for (int i = 0; i < N; i++) {",
  "        d[i] = c[i] - ti[i];",
  "    }",
  "    sort(d.begin(), d.end());",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        long long V, S;",
  "        cin >> V >> S;   // query is V then S",
  "        // count d[i] > S = N - upper_bound(S)",
  "        long long reachable = N - (upper_bound(d.begin(), d.end(), S) - d.begin());",
  "        if (reachable >= V) {",
  "            cout << \"YES\\n\";",
  "        } else {",
  "            cout << \"NO\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getProductivitySections(E) {
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
        t(E, "upper_bound on a sorted vector — counts how many d[i] > S in O(log N).",
            "정렬된 vector 의 upper_bound — d[i] > S 개수를 O(log N) 으로 셈."),
        t(E, "long long for c, ti, d because values can reach ~10^9 and the difference still fits.",
            "c, ti, d 는 long long — 값이 ~10^9 까지 가능."),
      ],
    },
  ];
}

export function ProductivityProgressiveCode(props) {
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


export function downloadProductivityPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Productivity — Full Study Guide", "Productivity — 종합 풀이 노트");
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

