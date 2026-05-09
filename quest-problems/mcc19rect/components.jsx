import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ──────────────────────────────────────────────────────────────
   Sim: ConsecutiveDiffScanSim
   Shows a sliding window of size 2 walking across a sorted list,
   computing each adjacent diff and tracking the running minimum.
   ────────────────────────────────────────────────────────────── */
const SIM_LIST = [1, 3, 5, 6, 10, 11];

export function ConsecutiveDiffScanSim({ E }) {
  const [i, setI] = useState(-1);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const N = SIM_LIST.length;

  const stop = () => {
    setRunning(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setI(-1);
  };

  useEffect(() => {
    if (!running) return;
    if (i >= N - 2) {
      setRunning(false);
      return;
    }
    timerRef.current = setTimeout(() => setI(i + 1), 850);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [i, running, N]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const start = () => {
    if (i >= N - 2) setI(-1);
    setRunning(true);
  };

  const stepOnce = () => {
    stop();
    if (i >= N - 2) setI(0);
    else setI(i + 1);
  };

  // Compute diffs scanned so far and current min
  const diffs = [];
  for (let k = 0; k <= i; k++) {
    if (k + 1 < N) diffs.push({ k, d: SIM_LIST[k + 1] - SIM_LIST[k] });
  }
  const minSoFar = diffs.length ? Math.min(...diffs.map(x => x.d)) : null;
  const minIdx = diffs.length ? diffs.findIndex(x => x.d === minSoFar) : -1;

  const cellStyle = (idx) => {
    const isLeft = idx === i;
    const isRight = idx === i + 1;
    const inWindow = isLeft || isRight;
    return {
      width: 48, height: 48,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 8,
      fontWeight: 800, fontSize: 16,
      background: inWindow ? "#bbf7d0" : "#f0fdf4",
      color: inWindow ? "#065f46" : "#166534",
      border: inWindow ? `2px solid ${A}` : "1.5px solid #a7f3d0",
      transition: "all 0.25s ease",
      transform: inWindow ? "translateY(-2px)" : "none",
      boxShadow: inWindow ? `0 4px 10px ${A}33` : "none",
    };
  };

  const btn = (label, onClick, primary) => (
    <button onClick={onClick} style={{
      background: primary ? A : "#fff",
      color: primary ? "#fff" : A,
      border: `1.5px solid ${A}`,
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 12, fontWeight: 800,
      cursor: "pointer",
    }}>{label}</button>
  );

  const curDiff = i >= 0 && i + 1 < N ? SIM_LIST[i + 1] - SIM_LIST[i] : null;

  return (
    <div style={{
      background: "#ecfdf5", border: `1.5px solid ${A}`,
      borderRadius: 12, padding: 14,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 10, letterSpacing: 0.3 }}>
        🔬 {t(E, "Deep Audit — Consecutive Diff Scan", "정밀 점검 — 인접 차이 스캔")}
      </div>

      {/* Array cells */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
        {SIM_LIST.map((v, idx) => (
          <div key={idx} style={cellStyle(idx)}>{v}</div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {SIM_LIST.map((_, idx) => (
          <div key={idx} style={{ width: 48, textAlign: "center", fontSize: 10, color: C.dim }}>
            i={idx}
          </div>
        ))}
      </div>

      {/* Live readout */}
      <div style={{
        background: "#fff", borderRadius: 8, padding: "10px 12px",
        border: "1px solid #a7f3d0", marginBottom: 10, fontSize: 13, color: C.text,
        fontFamily: "JetBrains Mono, monospace",
      }}>
        <div style={{ marginBottom: 4 }}>
          <span style={{ color: C.dim }}>i = </span>
          <b style={{ color: A }}>{i < 0 ? "—" : i}</b>
          {curDiff != null && (
            <>
              <span style={{ color: C.dim, marginLeft: 12 }}>
                a[{i + 1}] − a[{i}] =
              </span>{" "}
              <b style={{ color: A }}>{SIM_LIST[i + 1]} − {SIM_LIST[i]} = {curDiff}</b>
            </>
          )}
        </div>
        <div>
          <span style={{ color: C.dim }}>{t(E, "min_diff so far = ", "지금까지 최솟값 = ")}</span>
          <b style={{ color: "#15803d" }}>{minSoFar == null ? "∞" : minSoFar}</b>
          {i >= N - 2 && minSoFar != null && (
            <span style={{ marginLeft: 10, color: A, fontWeight: 800 }}>
              ✓ {t(E, "done", "완료")}
            </span>
          )}
        </div>
      </div>

      {/* Diff trail */}
      {diffs.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>
            {t(E, "Diffs seen:", "지금까지의 차이:")}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {diffs.map((x, idx) => (
              <span key={idx} style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12, fontWeight: 700,
                padding: "3px 8px", borderRadius: 6,
                background: idx === minIdx ? "#15803d" : "#fff",
                color: idx === minIdx ? "#fff" : "#166534",
                border: idx === minIdx ? "1.5px solid #15803d" : "1px solid #a7f3d0",
              }}>{x.d}</span>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {!running
          ? btn(i >= N - 2 ? t(E, "▶ Replay", "▶ 다시") : t(E, "▶ Play", "▶ 재생"), start, true)
          : btn(t(E, "■ Stop", "■ 정지"), stop, true)}
        {btn(t(E, "Step", "한 칸"), stepOnce, false)}
        {btn(t(E, "Reset", "처음으로"), reset, false)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# List is already sorted (non-decreasing)",
  "min_diff = float('inf')",
  "for i in range(N - 1):",
  "    diff = a[i + 1] - a[i]",
  "    min_diff = min(min_diff, diff)",
  "",
  "print(min_diff)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long N; cin >> N;",
  "    vector<long long> a; { long long _x; while (cin >> _x) a.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    // List is already sorted (non-decreasing)",
  "    auto min_diff = float('inf');",
  "    // for i in range(N - 1):",
  "        auto diff = a[i + 1] - a[i];",
  "        auto min_diff = min(min_diff, diff);",
  "",
  "    cout << min_diff << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc19RectSections(E) {
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
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function Mcc19RectProgressiveCode(props) {
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


export function downloadMcc19RectPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Rect — Full Study Guide", "Mcc19Rect — 종합 풀이 노트");
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

