// 🔒 USACO_VERIFIED — 2026-06-16 C++17 AC 12/12 (cpid=1085)
import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ════════════════════════════════════════════════════════════════
   StallingAssignmentSim
   Visual sim of the "biggest cow first" assignment algorithm.
   Cows sorted ascending → process from tallest down. Each step,
   show which stalls fit the current cow (limit ≥ height), subtract
   already-assigned, and multiply choices into the running answer.
   ════════════════════════════════════════════════════════════════ */
export function StallingAssignmentSim({ E }) {
  // Fixed example so students can predict and verify
  const cows = [2, 4, 4]; // sorted ascending
  const stalls = [3, 4, 5]; // sorted ascending
  const N = cows.length;

  // step: -1 = not started, 0..N-1 = processed cows[N-1-step] just now, N = done
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    if (step >= N) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setStep(s => s + 1), 950);
    return () => clearTimeout(timerRef.current);
  }, [playing, step, N]);

  const reset = () => { setPlaying(false); setStep(-1); };

  // For each processed step k (0..step-1), compute which cow it processed,
  // which stalls fit, and how many choices remained.
  // Algorithm: process cows from tallest (index N-1) to shortest (index 0).
  // After processing k cows, k stalls have been used.
  // For cow index i = N-1-k, "fits" = count of stalls with limit >= cow height.
  // choices = fits - k.
  const history = [];
  let runningAns = 1;
  let killed = false;
  for (let k = 0; k <= Math.min(step, N - 1); k++) {
    const cowIdx = N - 1 - k;
    const cowH = cows[cowIdx];
    const fits = stalls.filter(s => s >= cowH).length;
    const choices = fits - k;
    if (choices <= 0) { killed = true; runningAns = 0; }
    else if (!killed) runningAns *= choices;
    history.push({ k, cowIdx, cowH, fits, choices, runningAns });
  }

  const currentCowIdx = step >= 0 && step < N ? N - 1 - step : -1;
  const usedCount = step >= 0 ? Math.min(step + 1, N) : 0;

  const finalAns = step >= N - 1 ? runningAns : null;

  return (
    <div style={{
      background: "#f0fdf4",
      border: `1.5px solid ${A}`,
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
    }}>
      <div style={{
        fontSize: 12, fontWeight: 800, color: "#065f46",
        letterSpacing: 0.4, marginBottom: 8, textAlign: "center",
      }}>
        🧪 {t(E, "Try It — Assign Cows To Stalls", "직접 해보기 — 소를 축사에 배정")}
      </div>

      <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.5, marginBottom: 10, textAlign: "center" }}>
        {t(E,
          "Watch the algorithm: process the TALLEST cow first. Count how many stalls fit her, subtract already-used stalls, and multiply.",
          "알고리즘 관찰: 가장 큰 소부터 처리. 자기 키 ≤ 인 축사 수에서 이미 쓴 축사를 빼고, 곱해.")}
      </div>

      {/* Stalls row */}
      <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, color: "#0e7490" }}>
        🏚️ {t(E, "Stalls (limits)", "축사 (제한)")}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
        {stalls.map((s, i) => {
          // A stall is "used" if it's among the largest `usedCount` stalls that fit each processed cow.
          // Greedy mental model: tallest cow takes the largest fitting stall, etc.
          // Mark stalls as used if their rank from the top is < usedCount AND they fit some processed cow.
          const used = i >= N - usedCount;
          const fitsCurrent = currentCowIdx >= 0 && s >= cows[currentCowIdx] && !used;
          return (
            <div key={i} style={{
              width: 56, height: 56,
              borderRadius: 10,
              background: used ? "#d1fae5" : fitsCurrent ? "#fef3c7" : "#fff",
              border: `2px solid ${used ? A : fitsCurrent ? "#f59e0b" : "#a7f3d0"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontWeight: 800, color: used ? A : "#1f2937",
              transition: "all .25s",
              opacity: used ? 0.7 : 1,
              position: "relative",
            }}>
              <div style={{ fontSize: 18 }}>{used ? "🐄" : "🏚️"}</div>
              <div style={{ fontSize: 11 }}>≤{s}</div>
            </div>
          );
        })}
      </div>

      {/* Cows row */}
      <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, color: A }}>
        🐄 {t(E, "Cows (heights, sorted)", "소 (키, 정렬됨)")}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {cows.map((c, i) => {
          const isCurrent = i === currentCowIdx;
          const processed = step >= 0 && i > currentCowIdx && currentCowIdx !== -1
            ? false
            : (i > N - 1 - step);
          // Simpler: processed = cows whose index > currentCowIdx (already done in earlier steps)
          const done = step >= 0 && i > N - 1 - (step);
          return (
            <div key={i} style={{
              width: 56, height: 56,
              borderRadius: 10,
              background: isCurrent ? "#fef3c7" : done ? "#d1fae5" : "#fff",
              border: `2px solid ${isCurrent ? "#f59e0b" : done ? A : "#a7f3d0"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontWeight: 800, color: isCurrent ? "#92400e" : done ? A : "#1f2937",
              transition: "all .25s",
              transform: isCurrent ? "translateY(-4px) scale(1.05)" : "none",
              boxShadow: isCurrent ? "0 4px 12px rgba(245,158,11,.35)" : "none",
            }}>
              <div style={{ fontSize: 18 }}>🐄</div>
              <div style={{ fontSize: 11 }}>{c}</div>
            </div>
          );
        })}
      </div>

      {/* Step explanation */}
      <div style={{
        background: "#fff",
        border: "1px solid #a7f3d0",
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 10,
        fontSize: 12,
        color: "#065f46",
        minHeight: 38,
      }}>
        {step === -1 && (
          <span>{t(E, "Press Step or Auto to start.", "Step 또는 Auto를 눌러 시작.")}</span>
        )}
        {step >= 0 && step < N && (() => {
          const h = history[step];
          return (
            <span>
              <b>{t(E, `Step ${step + 1}: Cow height ${h.cowH}`, `${step + 1}단계: 소 키 ${h.cowH}`)}</b>
              {" — "}
              {t(E,
                `${h.fits} stalls fit, ${step} already used → choices = ${h.fits} − ${step} = ${h.choices}. ans × ${h.choices} = ${h.runningAns}.`,
                `맞는 축사 ${h.fits}개, 이미 사용 ${step}개 → 선택 = ${h.fits} − ${step} = ${h.choices}. ans × ${h.choices} = ${h.runningAns}.`)}
            </span>
          );
        })()}
        {step >= N && (
          <span>
            <b style={{ color: A }}>
              {t(E, `Done! Final answer = ${finalAns}`, `완료! 최종 답 = ${finalAns}`)}
            </b>
            {" "}
            {t(E,
              "(multiply the choices from each step).",
              "(각 단계 선택 수를 모두 곱한 값).")}
          </span>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => { setPlaying(false); setStep(s => Math.min(s + 1, N)); }}
          disabled={step >= N}
          style={{
            background: step >= N ? "#d1d5db" : A,
            color: "#fff", border: "none", borderRadius: 8,
            padding: "6px 14px", fontWeight: 700, fontSize: 12,
            cursor: step >= N ? "not-allowed" : "pointer",
          }}>
          ▶ {t(E, "Step", "한 단계")}
        </button>
        <button
          onClick={() => { if (step >= N) setStep(-1); setPlaying(p => !p); }}
          style={{
            background: playing ? "#f59e0b" : "#fff",
            color: playing ? "#fff" : A,
            border: `1.5px solid ${playing ? "#f59e0b" : A}`,
            borderRadius: 8,
            padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>
          {playing ? `⏸ ${t(E, "Pause", "일시정지")}` : `⚡ ${t(E, "Auto", "자동")}`}
        </button>
        <button
          onClick={reset}
          style={{
            background: "#fff", color: C.dim,
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>
          ↻ {t(E, "Reset", "초기화")}
        </button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "cows = list(map(int, input().split()))      # heights, one line",
  "stalls = list(map(int, input().split()))    # limits, one line",
  "",
  "# Process the TALLEST cow first: she has the fewest stalls that fit.",
  "# Sort cows DESCENDING, stalls ASCENDING.",
  "cows.sort(reverse=True)",
  "stalls.sort()",
  "",
  "ans = 1",
  "for i in range(N):",
  "    # How many stalls have limit >= this cow's height?",
  "    fits = sum(1 for s in stalls if s >= cows[i])",
  "    # i taller cows already took i of those stalls.",
  "    choices = fits - i",
  "    if choices <= 0:",
  "        ans = 0",
  "        break",
  "    ans *= choices",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<long long> cows(N), stalls(N);",
  "    for (auto& x : cows) cin >> x;",
  "    for (auto& x : stalls) cin >> x;",
  "    // Tallest cow first: she fits in the fewest stalls.",
  "    sort(cows.rbegin(), cows.rend());   // descending",
  "    sort(stalls.begin(), stalls.end()); // ascending",
  "    long long ans = 1;",
  "    for (int i = 0; i < N; i++) {",
  "        // count stalls whose limit >= this cow's height",
  "        long long fits = 0;",
  "        for (int k = 0; k < N; k++) if (stalls[k] >= cows[i]) fits++;",
  "        // i taller cows already used i of those stalls",
  "        long long choices = fits - i;",
  "        if (choices <= 0) { ans = 0; break; }",
  "        ans *= choices;",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getStallingSections(E) {
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

export function StallingProgressiveCode(props) {
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


export function downloadStallingPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Stalling — Full Study Guide", "Stalling — 종합 풀이 노트");
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

