import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* --- Interactive Simulator: move endpoint cows into the gap ---
   Three preset scenarios. Student picks which endpoint to move and where,
   counts moves, and sees when the three positions become consecutive. */
export function SleepyHerdSim({ E }) {
  const SCENARIOS = [
    { label: t(E, "Scenario A · [4, 7, 9]", "예제 A · [4, 7, 9]"), start: [4, 7, 9] },
    { label: t(E, "Scenario B · [2, 5, 10]", "예제 B · [2, 5, 10]"), start: [2, 5, 10] },
    { label: t(E, "Scenario C · [3, 4, 6]", "예제 C · [3, 4, 6]"), start: [3, 4, 6] },
  ];
  const [sIdx, setSIdx] = useState(0);
  const [positions, setPositions] = useState(SCENARIOS[0].start);
  const [moves, setMoves] = useState(0);
  const [picked, setPicked] = useState(null); // "L" | "R" | null

  const sorted = useMemo(() => [...positions].sort((a, b) => a - b), [positions]);
  const a = sorted[0], b = sorted[1], c = sorted[2];
  const consecutive = (b - a === 1) && (c - b === 1);

  // Display range
  const minX = Math.min(...positions) - 1;
  const maxX = Math.max(...positions) + 1;
  const span = Math.max(maxX - minX, 1);

  const reset = (idx = sIdx) => {
    setPositions(SCENARIOS[idx].start);
    setMoves(0);
    setPicked(null);
  };

  const chooseScenario = (idx) => {
    setSIdx(idx);
    setPositions(SCENARIOS[idx].start);
    setMoves(0);
    setPicked(null);
  };

  // Move the picked endpoint to a target slot strictly between the other two.
  const moveTo = (target) => {
    if (consecutive || picked == null) return;
    if (target <= a || target >= c) return; // must be strictly between
    if (target === b) return;                // unoccupied
    const endpoint = picked === "L" ? a : c;
    const next = positions.map((p) => (p === endpoint ? target : p));
    setPositions(next);
    setMoves(moves + 1);
    setPicked(null);
  };

  // Slots strictly between a and c (excluding b)
  const slots = [];
  for (let x = a + 1; x < c; x++) if (x !== b) slots.push(x);

  // px-positioning helper
  const xPct = (val) => ((val - minX) / span) * 100;

  return (
    <div style={{
      background: "#fffbeb",
      border: `1.5px solid ${A}`,
      borderRadius: 12,
      padding: "12px 14px",
      marginTop: 12,
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", letterSpacing: 0.5, marginBottom: 8 }}>
        🐮 {t(E, "TRY IT — move an endpoint cow", "직접 해보기 — 끝점 소를 옮겨봐")}
      </div>

      {/* Scenario picker */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => chooseScenario(i)}
            style={{
              background: i === sIdx ? A : "#fff",
              color: i === sIdx ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Number line */}
      <div style={{ position: "relative", height: 70, background: "#fff", border: "1px dashed #fcd34d", borderRadius: 8, marginBottom: 8 }}>
        {/* tick marks */}
        {Array.from({ length: maxX - minX + 1 }, (_, i) => minX + i).map((x) => {
          const isSlot = slots.includes(x);
          return (
            <div key={x} style={{ position: "absolute", left: `${xPct(x)}%`, top: 0, transform: "translateX(-50%)", textAlign: "center" }}>
              <div style={{ height: 30, width: 1, background: "#e5e7eb", margin: "0 auto" }} />
              <div style={{ fontSize: 10, color: isSlot ? A : C.dim, fontFamily: "'JetBrains Mono',monospace", fontWeight: isSlot ? 700 : 400 }}>{x}</div>
              {isSlot && picked && (
                <button
                  onClick={() => moveTo(x)}
                  title={t(E, "Move here", "여기로 옮기기")}
                  style={{
                    marginTop: 2,
                    width: 18, height: 18,
                    borderRadius: 9,
                    border: `1.5px dashed ${A}`,
                    background: "#fff7ed",
                    color: A,
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: 0,
                    lineHeight: "14px",
                  }}
                >+</button>
              )}
            </div>
          );
        })}
        {/* cows */}
        {sorted.map((p, idx) => {
          const isEndpoint = idx === 0 || idx === 2;
          const isPicked = (picked === "L" && idx === 0) || (picked === "R" && idx === 2);
          return (
            <div
              key={`${p}-${idx}`}
              onClick={() => {
                if (consecutive) return;
                if (idx === 0) setPicked(picked === "L" ? null : "L");
                else if (idx === 2) setPicked(picked === "R" ? null : "R");
              }}
              style={{
                position: "absolute",
                left: `${xPct(p)}%`,
                top: 4,
                transform: "translateX(-50%)",
                fontSize: 22,
                cursor: isEndpoint && !consecutive ? "pointer" : "default",
                filter: isPicked ? "drop-shadow(0 0 6px #d97706)" : "none",
                opacity: isEndpoint || consecutive ? 1 : 0.55,
                transition: "left 0.3s ease",
              }}
            >
              🐄
            </div>
          );
        })}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
        <div style={{ background: "#fff", border: "1px solid #fcd34d", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "moves", "이동")} = <b>{moves}</b>
        </div>
        <div style={{ background: "#fff", border: "1px solid #fcd34d", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
          [{a}, {b}, {c}]
        </div>
        {consecutive ? (
          <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#166534", fontWeight: 700 }}>
            ✓ {t(E, "Consecutive!", "연속 완성!")}
          </div>
        ) : picked ? (
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#9a3412" }}>
            {t(E, `Picked ${picked === "L" ? "left" : "right"} endpoint — click a slot`,
                  `${picked === "L" ? "왼쪽" : "오른쪽"} 끝점 선택됨 — 빈 자리 클릭`)}
          </div>
        ) : (
          <div style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: C.dim }}>
            {t(E, "Click an endpoint cow (left or right)", "끝점 소(왼쪽 또는 오른쪽)를 클릭")}
          </div>
        )}
        <button
          onClick={() => reset()}
          style={{
            marginLeft: "auto",
            background: "#fff",
            color: A,
            border: `1.5px solid ${A}`,
            borderRadius: 8,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >↺ {t(E, "Reset", "초기화")}</button>
      </div>

      <div style={{ fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
        {t(E,
          "Only the LEFTMOST or RIGHTMOST cow can move, and only into an empty slot strictly between the other two. Try to reach a consecutive triple in as few — or as many — moves as you can.",
          "왼쪽 끝 또는 오른쪽 끝 소만 움직일 수 있어, 그것도 다른 두 소 사이의 빈 자리로만. 연속 세 칸을 만드는 데 몇 번이 최소이고 몇 번이 최대인지 직접 시도해봐.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "import sys",
  "sys.stdin = open('herding.in')",
  "sys.stdout = open('herding.out', 'w')",
  "",
  "positions = sorted([int(input()) for _ in range(3)])",
  "a, b, c = positions",
  "",
  "# Gap between first two and last two",
  "gap1 = b - a  # gap between a and b",
  "gap2 = c - b  # gap between b and c",
  "",
  "# --- Maximum moves ---",
  "# Move the closer endpoint one step at a time",
  "# Max = (gap1 - 1) + (gap2 - 1) = total_span - 2",
  "max_moves = (c - a) - 2",
  "",
  "# --- Minimum moves ---",
  "if gap1 == 1 and gap2 == 1:",
  "    # Already consecutive",
  "    min_moves = 0",
  "elif gap1 <= 2 or gap2 <= 2:",
  "    # One gap is 1 or 2: can solve in 1 move",
  "    min_moves = 1",
  "else:",
  "    # Both gaps > 2: need 2 moves",
  "    min_moves = 2",
  "",
  "print(min_moves)",
  "print(max_moves)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    freopen(\"herding.in\", \"r\", stdin);",
  "    freopen(\"herding.out\", \"w\", stdout);",
  "",
  "    long long p[3];",
  "    for (int i = 0; i < 3; i++) cin >> p[i];",
  "    sort(p, p + 3);",
  "    long long a = p[0], b = p[1], c = p[2];",
  "    long long gap1 = b - a, gap2 = c - b;",
  "    long long maxMoves = max(gap1, gap2) - 1;",
  "    long long minMoves = (gap1 == 1 && gap2 == 1) ? 0 : ((gap1 <= 2 || gap2 <= 2) ? 1 : 2);",
  "    cout << minMoves << \"\\n\" << maxMoves << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSleepyHerdSections(E) {
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

export function SleepyHerdProgressiveCode(props) {
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


export function downloadSleepyHerdPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SleepyHerd — Full Study Guide", "SleepyHerd — 종합 풀이 노트");
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

