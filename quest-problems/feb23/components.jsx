// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 2/20 (WA/TLE - brute 2^|F| too slow)
//   C++:    2/20 (WA/TLE same as py)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   Feb23DeepAuditSim — for a small string with F's, toggle each F
   between B/E, see excitement update live, then "Audit all 2^|F|"
   to enumerate every assignment and collect distinct values.
   ═══════════════════════════════════════════════════════════════ */
const _FEB_PRESETS = [
  { s: "BEEF",   label: "BEEF (1×F)" },
  { s: "BFFE",   label: "BFFE (2×F)" },
  { s: "FBFEF",  label: "FBFEF (3×F)" },
  { s: "BFEFB",  label: "BFEFB (2×F)" },
];

function _excitement(arr) {
  let c = 0;
  for (let i = 0; i + 1 < arr.length; i++) if (arr[i] === arr[i + 1]) c++;
  return c;
}

export function Feb23DeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { s } = _FEB_PRESETS[pi];

  // Position-indexed state for each F: 'B' | 'E'. Non-F characters ignored.
  const fPositions = [];
  for (let i = 0; i < s.length; i++) if (s[i] === "F") fPositions.push(i);

  const [choices, setChoices] = useState(() => fPositions.map(() => "B"));
  const [audited, setAudited] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    const ns = _FEB_PRESETS[newPi].s;
    const nf = [];
    for (let i = 0; i < ns.length; i++) if (ns[i] === "F") nf.push(i);
    setChoices(nf.map(() => "B"));
    setAudited(false);
  };

  // Build current assignment
  const arr = s.split("");
  fPositions.forEach((p, idx) => { arr[p] = choices[idx] || "B"; });
  const curExcite = _excitement(arr);

  // Adjacent-pair flags for highlight
  const matchFlags = arr.map((_, i) => i + 1 < arr.length && arr[i] === arr[i + 1]);

  // Audit: enumerate all 2^|F| → distinct excitement set
  const nf = fPositions.length;
  const auditResults = [];
  const distinctSet = new Set();
  for (let mask = 0; mask < (1 << nf); mask++) {
    const a = s.split("");
    for (let j = 0; j < nf; j++) a[fPositions[j]] = ((mask >> j) & 1) ? "B" : "E";
    const ex = _excitement(a);
    auditResults.push({ str: a.join(""), ex });
    distinctSet.add(ex);
  }
  const distinctSorted = [...distinctSet].sort((x, y) => x - y);

  const toggleF = (idx) => {
    const u = [...choices];
    u[idx] = u[idx] === "B" ? "E" : "B";
    setChoices(u);
    setAudited(false);
  };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_FEB_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E, "Tap an F to flip it between B and E. Watch the excitement change live.",
              "F 를 탭해서 B 와 E 사이를 토글해 봐. 흥분도가 실시간으로 변해.")}
      </div>

      {/* clickable letter row with adjacent-match underline */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4, flexWrap: "wrap" }}>
        {arr.map((ch, i) => {
          const isF = s[i] === "F";
          const fIdx = fPositions.indexOf(i);
          const matched = matchFlags[i];
          const bg = ch === "B" ? "#dbeafe" : "#dcfce7";
          const border = ch === "B" ? "#93c5fd" : "#86efac";
          const color = ch === "B" ? "#1d4ed8" : "#166534";
          const ring = matched ? "0 0 0 2px #fca5a5" : "none";
          return (
            <button
              key={i}
              onClick={() => isF && toggleF(fIdx)}
              disabled={!isF}
              title={isF ? t(E, "click to flip", "클릭해서 토글") : ""}
              style={{
                width: 38, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: bg, border: `1.5px solid ${border}`, color,
                cursor: isF ? "pointer" : "default",
                position: "relative", padding: 0,
                boxShadow: ring,
                outline: isF ? `2px dashed ${A}` : "none",
                outlineOffset: isF ? -4 : 0,
              }}
            >
              {ch}
            </button>
          );
        })}
      </div>

      {/* origin row showing where F's were */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {s.split("").map((ch, i) => (
          <div key={i} style={{
            width: 38, textAlign: "center", fontSize: 10,
            color: ch === "F" ? A : "#94a3b8", fontWeight: ch === "F" ? 700 : 400,
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            {ch === "F" ? "F" : "·"}
          </div>
        ))}
      </div>

      {/* current excitement */}
      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d" }}>
          {t(E, "Current string", "현재 문자열")}: <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>{arr.join("")}</code>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#991b1b", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "excitement", "흥분도")} = {curExcite}
        </div>
      </div>

      {/* audit button */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={() => setAudited(true)} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: A, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, `🔍 Audit all 2^${nf} = ${1 << nf} assignments`,
                `🔍 모든 2^${nf} = ${1 << nf} 가지 점검`)}
        </button>
      </div>

      {/* audit panel */}
      {audited && (
        <div style={{
          background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10,
          padding: 10, fontSize: 11.5, color: "#9a3412", lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: "#7c2d12" }}>
            {t(E, "All assignments → excitement", "모든 할당 → 흥분도")}
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 4, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace",
          }}>
            {auditResults.map((r, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #fed7aa", borderRadius: 6,
                padding: "3px 6px", fontSize: 11, color: "#7c2d12",
                display: "flex", justifyContent: "space-between", gap: 4,
              }}>
                <span>{r.str}</span>
                <b>{r.ex}</b>
              </div>
            ))}
          </div>
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8,
            padding: "6px 10px", color: "#166534", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
          }}>
            {t(E, "distinct set", "서로 다른 값")} = {"{"}{distinctSorted.join(", ")}{"}"} →
            {" "}{t(E, "count", "개수")}={distinctSorted.length}, min={distinctSorted[0]}, max={distinctSorted[distinctSorted.length - 1]}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "s = data[1]",
  "",
  "f_positions = [i for i, c in enumerate(s) if c == 'F']",
  "n_f = len(f_positions)",
  "",
  "results = set()",
  "for mask in range(1 << n_f):",
  "    arr = list(s)",
  "    for j in range(n_f):",
  "        arr[f_positions[j]] = 'B' if (mask >> j) & 1 else 'E'",
  "    excitement = 0",
  "    for i in range(len(arr) - 1):",
  "        if arr[i] == arr[i + 1]:",
  "            excitement += 1",
  "    results.add(excitement)",
  "",
  "print(len(results))",
  "print(min(results))",
  "print(max(results))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    string s; cin >> s;",
  "",
  "    vector<int> fpos;",
  "    for (int i = 0; i < (int)s.size(); i++) if (s[i] == 'F') fpos.push_back(i);",
  "    int nf = fpos.size();",
  "",
  "    set<int> results;",
  "    for (int mask = 0; mask < (1 << nf); mask++) {",
  "        string arr = s;",
  "        for (int j = 0; j < nf; j++)",
  "            arr[fpos[j]] = ((mask >> j) & 1) ? 'B' : 'E';",
  "        int excitement = 0;",
  "        for (int i = 0; i + 1 < (int)arr.size(); i++)",
  "            if (arr[i] == arr[i + 1]) excitement++;",
  "        results.insert(excitement);",
  "    }",
  "",
  "    cout << results.size() << '\\n';",
  "    cout << *results.begin() << '\\n';",
  "    cout << *results.rbegin() << '\\n';",
  "    return 0;",
  "}",
];

export function getFeb23Sections(E) {
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

export function Feb23ProgressiveCode(props) {
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


export function downloadFeb23PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Feb23 — Full Study Guide", "Feb23 — 종합 풀이 노트");
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

