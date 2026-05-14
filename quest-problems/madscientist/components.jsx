import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ================================================================
   MismatchRunsSim — bilingual scan-the-rows simulation
   Shows two cow patterns A, B (length N over {G, H}).
   Click "Scan" to walk through index i; component highlights mismatch
   positions and counts contiguous runs of mismatches = answer.
   ================================================================ */
const _MS_PRESETS = [
  { A: "HH",       B: "GG"       },
  { A: "HGH",      B: "GHG"      },
  { A: "HHGG",     B: "GHGG"     },
  { A: "GHHGGH",   B: "HHGHGG"   },
  { A: "HGHGHGHG", B: "HGGGHHGG" },
];

export function MismatchRunsSim({ E }) {
  const [pi, setPi] = useState(1);
  const [i, setI] = useState(0);
  const { A: SA, B: SB } = _MS_PRESETS[pi];
  const N = SA.length;

  // up to current scan index i (exclusive when 0, inclusive when > 0)
  // i=0 means "not started"; i=1 means "scanned position 0", up to i=N "all scanned"
  const scannedThrough = i; // number of positions scanned
  let runs = 0;
  let inDiff = false;
  for (let k = 0; k < scannedThrough; k++) {
    if (SA[k] !== SB[k]) {
      if (!inDiff) { runs += 1; inDiff = true; }
    } else inDiff = false;
  }

  const reset = (idx) => { setPi(idx); setI(0); };
  const cellSize = N <= 4 ? 38 : N <= 6 ? 34 : 30;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 8, textAlign: "center" }}>
        🔬 {t(E, "Scan the rows — count mismatch runs", "행을 스캔 — 다른 구간 묶음 세기")}
      </div>

      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_MS_PRESETS.map((p, idx) => (
          <button key={idx} onClick={() => reset(idx)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${idx === pi ? A : C.border}`,
            background: idx === pi ? A : "transparent", color: idx === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            N={p.A.length}
          </button>
        ))}
      </div>

      {/* index ruler */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ width: 36 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: N }).map((_, k) => (
            <div key={k} style={{
              width: cellSize, textAlign: "center", fontSize: 10, color: C.dim,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{k}</div>
          ))}
        </div>
      </div>

      {/* row A */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ width: 36, fontWeight: 800, color: A, textAlign: "right", paddingRight: 8, lineHeight: `${cellSize}px` }}>A</div>
        <div style={{ display: "flex", gap: 4 }}>
          {SA.split("").map((c, k) => {
            const scanned = k < scannedThrough;
            const isMis = scanned && SA[k] !== SB[k];
            return (
              <div key={k} style={{
                width: cellSize, height: cellSize, lineHeight: `${cellSize}px`, textAlign: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15,
                background: !scanned ? "#f1f5f9" : isMis ? "#fee2e2" : "#dcfce7",
                color: !scanned ? C.dim : isMis ? "#b91c1c" : "#166534",
                border: `1.5px solid ${!scanned ? C.border : isMis ? "#f87171" : "#86efac"}`,
                borderRadius: 6,
              }}>{c}</div>
            );
          })}
        </div>
      </div>

      {/* row B */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ width: 36, fontWeight: 800, color: A, textAlign: "right", paddingRight: 8, lineHeight: `${cellSize}px` }}>B</div>
        <div style={{ display: "flex", gap: 4 }}>
          {SB.split("").map((c, k) => {
            const scanned = k < scannedThrough;
            const isMis = scanned && SA[k] !== SB[k];
            return (
              <div key={k} style={{
                width: cellSize, height: cellSize, lineHeight: `${cellSize}px`, textAlign: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15,
                background: !scanned ? "#f1f5f9" : isMis ? "#fee2e2" : "#dcfce7",
                color: !scanned ? C.dim : isMis ? "#b91c1c" : "#166534",
                border: `1.5px solid ${!scanned ? C.border : isMis ? "#f87171" : "#86efac"}`,
                borderRadius: 6,
              }}>{c}</div>
            );
          })}
        </div>
      </div>

      {/* diff marker row */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ width: 36 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: N }).map((_, k) => {
            const scanned = k < scannedThrough;
            const isMis = scanned && SA[k] !== SB[k];
            return (
              <div key={k} style={{
                width: cellSize, height: 18, lineHeight: "18px", textAlign: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 12,
                color: !scanned ? "transparent" : isMis ? "#b91c1c" : "#94a3b8",
              }}>{!scanned ? "·" : isMis ? "✗" : "="}</div>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${A}`,
          background: i === 0 ? "#fed7aa" : "#fff", color: A,
          fontSize: 12, fontWeight: 800, cursor: i === 0 ? "not-allowed" : "pointer",
          opacity: i === 0 ? 0.5 : 1,
        }}>⟵ {t(E, "Back", "뒤로")}</button>
        <button onClick={() => setI(Math.min(N, i + 1))} disabled={i >= N} style={{
          padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${A}`,
          background: i >= N ? "#fed7aa" : A, color: i >= N ? A : "#fff",
          fontSize: 12, fontWeight: 800, cursor: i >= N ? "not-allowed" : "pointer",
          opacity: i >= N ? 0.6 : 1,
        }}>🔍 {t(E, "Scan next", "다음 스캔")} ⟶</button>
        <button onClick={() => setI(N)} style={{
          padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`,
          background: "#fff", color: C.dim, fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>{t(E, "Scan all", "전부 스캔")}</button>
        <button onClick={() => setI(0)} style={{
          padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`,
          background: "#fff", color: C.dim, fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "리셋")}</button>
      </div>

      {/* counter */}
      <div style={{
        background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "10px 14px", textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>
          {t(E, "Scanned", "스캔됨")}: {scannedThrough} / {N}
          {inDiff && i > 0 && i < N ? <span style={{ marginLeft: 8, color: "#b91c1c" }}>· {t(E, "inside a mismatch run", "다른 구간 안")}</span> : null}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "mismatch runs", "다른 구간 수")} = <span style={{ color: "#b91c1c" }}>{runs}</span>
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
          {i < N
            ? t(E, "Each run of consecutive ✗ becomes one flip.", "연속된 ✗ 묶음 하나가 한 번의 뒤집기.")
            : t(E, "Answer = number of mismatch runs = minimum flips.", "답 = 다른 구간 수 = 최소 뒤집기 수.")}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('breedflip.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "A = lines[1].strip()",
  "B = lines[2].strip()",
  "",
  "# A[i] != B[i] 인 연속 구간 개수 = flip 필요 횟수",
  "flips = 0",
  "in_diff = False",
  "for i in range(N):",
  "    if A[i] != B[i]:",
  "        if not in_diff:",
  "            flips += 1",
  "            in_diff = True",
  "    else:",
  "        in_diff = False",
  "",
  "with open('breedflip.out', 'w') as file:",
  "    file.write(str(flips) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"breedflip.in\");",
  "    ofstream fout(\"breedflip.out\");",
  "",
  "    int N; fin >> N;",
  "    string A, B; fin >> A >> B;",
  "    // A[i] != B[i] 인 연속 구간 개수 = flip 필요 횟수",
  "    int blocks = 0;",
  "    bool inBlock = false;",
  "    for (int i = 0; i < N; i++) {",
  "        if (A[i] != B[i]) {",
  "            if (!inBlock) {",
  "                blocks++;",
  "                inBlock = true;",
  "            }",
  "        } else {",
  "            inBlock = false;",
  "        }",
  "    }",
  "    fout << blocks << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMadSciSections(E) {
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
        t(E, "A bool flag inBlock tracks whether we're currently inside a mismatch run.",
            "bool 플래그 inBlock으로 현재 불일치 구간 안인지 추적."),
        t(E, "Compare strings char-by-char: A[i] != B[i] for direct character mismatch.",
            "A[i] != B[i]로 문자별 직접 비교."),
      ],
    },
  ];
}

export function MadSciProgressiveCode(props) {
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


export function downloadMadSciPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MadSci — Full Study Guide", "MadSci — 종합 풀이 노트");
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

