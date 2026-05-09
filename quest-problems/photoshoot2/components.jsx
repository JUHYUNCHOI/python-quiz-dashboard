import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ─────────────────────────────────────────────────────────────
   Swap Counter Sim — interactive walk-through of the greedy
   algorithm. Walks target left→right; each cow whose current
   position falls below the running max counts as one move-left.
   ───────────────────────────────────────────────────────────── */
export function Photoshoot2SwapSim({ E }) {
  // Demo arrangement: current = [3,1,4,2], target = [1,2,3,4]
  const target = [1, 2, 3, 4];
  const current = [3, 1, 4, 2];
  const posMap = {};
  current.forEach((c, i) => { posMap[c] = i; });

  // Step 0 = before any cow visited; step k = after target[k-1] processed.
  const [step, setStep] = useState(0);

  // Re-derive walk state up to current step
  const walk = [];
  let maxPos = -1;
  let moves = 0;
  for (let k = 0; k < target.length; k++) {
    const cow = target[k];
    const p = posMap[cow];
    let needMove = false;
    if (p < maxPos) { moves += 1; needMove = true; }
    else { maxPos = p; }
    walk.push({ cow, p, maxPosAfter: maxPos, movesAfter: moves, needMove });
  }
  const visited = step; // number of target cows processed
  const movesShown = visited > 0 ? walk[visited - 1].movesAfter : 0;
  const maxShown = visited > 0 ? walk[visited - 1].maxPosAfter : -1;
  const lastEv = visited > 0 ? walk[visited - 1] : null;

  const cowEmoji = "🐮";
  const reset = () => setStep(0);
  const nextStep = () => setStep(s => Math.min(target.length, s + 1));

  // Mark which target cows have been processed; among current,
  // highlight the cow just looked at, plus the running-max position.
  const processedSet = new Set(target.slice(0, visited));
  const focusCow = lastEv ? lastEv.cow : null;

  const cellBox = (label, value, color) => (
    <div style={{
      background: "#fff", border: `1.5px solid ${color}`, borderRadius: 8,
      padding: "6px 10px", textAlign: "center", minWidth: 64,
    }}>
      <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  );

  const rowOfCows = (arr, opts) => (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {arr.map((cow, i) => {
        const isFocus = opts.highlightCow === cow;
        const isProcessed = opts.processed && opts.processed.has(cow);
        const isMaxPos = opts.maxIdx === i;
        const bg = isFocus ? "#fed7aa" : isProcessed ? "#fff7ed" : "#fff";
        const border = isFocus ? A : isMaxPos ? "#7c3aed" : "#fdba74";
        return (
          <div key={i} style={{
            width: 50, height: 56,
            background: bg,
            border: `2px solid ${border}`,
            borderRadius: 8,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: isFocus ? `0 0 0 3px ${A}33` : "none",
            transition: "all 180ms ease",
          }}>
            <div style={{ fontSize: 18 }}>{cowEmoji}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: isFocus ? "#9a3412" : C.text }}>{cow}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{
      background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 12,
      padding: 14, marginBottom: 10,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 10, textAlign: "center" }}>
        🎬 {t(E, "Walk-through Sim", "동작 시뮬레이션")}
      </div>

      {/* Target row */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          {t(E, "TARGET (walk left → right)", "목표 순서 (왼쪽 → 오른쪽으로 훑기)")}
        </div>
        {rowOfCows(target, { processed: processedSet, highlightCow: focusCow })}
      </div>

      {/* Current row with maxPos marker */}
      <div style={{ marginTop: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          {t(E, "CURRENT (positions)", "현재 줄 (위치)")}
        </div>
        {rowOfCows(current, { highlightCow: focusCow, maxIdx: maxShown })}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 4 }}>
          {current.map((_, i) => (
            <div key={i} style={{ width: 50, textAlign: "center", fontSize: 10, color: C.dim }}>{i}</div>
          ))}
        </div>
      </div>

      {/* Counters */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        {cellBox(t(E, "step", "스텝"), `${visited}/${target.length}`, "#7c3aed")}
        {cellBox(t(E, "max pos seen", "본 위치 최대"), maxShown < 0 ? "−1" : maxShown, "#7c3aed")}
        {cellBox(t(E, "moves needed", "필요한 이동"), movesShown, A)}
      </div>

      {/* Event line */}
      <div style={{
        background: "#fff", border: "1px dashed #fdba74", borderRadius: 8,
        padding: "8px 10px", fontSize: 12, color: "#9a3412", minHeight: 36,
        textAlign: "center", lineHeight: 1.5,
      }}>
        {!lastEv && t(E,
          "Click NEXT to walk the target order one cow at a time.",
          "다음 버튼을 눌러 목표 순서를 한 마리씩 훑어봐.")}
        {lastEv && lastEv.needMove && t(E,
          `Cow ${lastEv.cow} sits at pos ${lastEv.p}, but max-seen is ${walk[visited-2]?.maxPosAfter ?? -1}. It must move LEFT → moves +1.`,
          `소 ${lastEv.cow}는 위치 ${lastEv.p}, 그런데 본 위치 최대는 ${walk[visited-2]?.maxPosAfter ?? -1}. 왼쪽으로 이동 필요 → 이동 +1.`)}
        {lastEv && !lastEv.needMove && t(E,
          `Cow ${lastEv.cow} sits at pos ${lastEv.p} ≥ max-seen. It is already in order — no move.`,
          `소 ${lastEv.cow}는 위치 ${lastEv.p} ≥ 본 위치 최대. 이미 순서대로 — 이동 없음.`)}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
        <button onClick={nextStep} disabled={visited >= target.length} style={{
          background: visited >= target.length ? "#fed7aa" : A,
          color: "#fff", border: "none", borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800,
          cursor: visited >= target.length ? "default" : "pointer",
        }}>{t(E, "Next ▶", "다음 ▶")}</button>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>{t(E, "↺ Reset", "↺ 처음으로")}</button>
      </div>

      {visited >= target.length && (
        <div style={{
          marginTop: 10, padding: "8px 12px", background: "#dcfce7",
          border: "1.5px solid #86efac", borderRadius: 8, textAlign: "center",
          fontSize: 13, fontWeight: 700, color: "#15803d",
        }}>
          ✅ {t(E,
            `Done! Total moves = ${movesShown}.`,
            `완료! 총 이동 = ${movesShown}.`)}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "target = list(map(int, input().split()))",
  "current = list(map(int, input().split()))",
  "",
  "# Build position map: where each cow is in current",
  "pos = {}",
  "for i, cow in enumerate(current):",
  "    pos[cow] = i",
  "",
  "# Count inversions: cows not in correct relative order",
  "# A cow needs to move left if it appears after",
  "# a cow that should come after it in target",
  "ans = 0",
  "max_pos = -1",
  "for cow in target:",
  "    # Position of this cow in current arrangement",
  "    p = pos[cow]",
  "    if p < max_pos:",
  "        # This cow is to the left of a cow that",
  "        # should come before it -> needs moving",
  "        ans += 1",
  "    else:",
  "        max_pos = p",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N), b(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "    for (int i = 0; i < N; i++) cin >> b[i];",
  "",
  "    // Count adjacent swaps needed to turn a into b",
  "    long long swaps = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        if (a[i] != b[i]) {",
  "            int j = i;",
  "            while (j < N && a[j] != b[i]) j++;",
  "            for (; j > i; j--) { swap(a[j], a[j-1]); swaps++; }",
  "        }",
  "    }",
  "    cout << swaps << \"\n\";",
  "    return 0;",
  "}",
];

export function getPhotoshoot2Sections(E) {
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

export function Photoshoot2ProgressiveCode(props) {
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


export function downloadPhotoshoot2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photoshoot2 — Full Study Guide", "Photoshoot2 — 종합 풀이 노트");
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

