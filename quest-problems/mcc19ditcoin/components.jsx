import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   Mcc19DitcoinDeepAuditSim — pick a price preset, toggle which
   days you SELL on, and watch coins accumulate / profit update
   live. Mirrors the greedy "sell when today == suffix_max" rule
   so students can feel why selling on the highest-future-price
   day is optimal.
   ═══════════════════════════════════════════════════════════════ */
const _DEEP_PRESETS = [
  { label: "[3,1,5]",        prices: [3, 1, 5] },
  { label: "[2,4,1,5,3]",    prices: [2, 4, 1, 5, 3] },
  { label: "[1,2,3,4,5]",    prices: [1, 2, 3, 4, 5] },
  { label: "[5,4,3,2,1]",    prices: [5, 4, 3, 2, 1] },
];

export function Mcc19DitcoinDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _DEEP_PRESETS[pi];
  const [sells, setSells] = useState(() => preset.prices.map(() => false));

  const switchPreset = (newPi) => {
    setPi(newPi);
    setSells(_DEEP_PRESETS[newPi].prices.map(() => false));
  };

  const toggle = (i) => {
    const u = [...sells];
    u[i] = !u[i];
    setSells(u);
  };

  // Walk days, accumulating coins; on a sell-day, sell all coins.
  const N = preset.prices.length;
  const coinsTrace = [];
  const profitTrace = [];
  let coins = 0, profit = 0;
  for (let i = 0; i < N; i++) {
    coins += 1;
    if (sells[i]) {
      profit += coins * preset.prices[i];
      coins = 0;
    }
    coinsTrace.push(coins);
    profitTrace.push(profit);
  }
  const finalProfit = profit;

  // Optimal profit: greedy via suffix_max — sell when prices[i] == suffix_max[i]
  const suffMax = Array(N).fill(0);
  suffMax[N - 1] = preset.prices[N - 1];
  for (let i = N - 2; i >= 0; i--) suffMax[i] = Math.max(preset.prices[i], suffMax[i + 1]);
  let optProfit = 0, optCoins = 0;
  const optSells = preset.prices.map((p, i) => {
    optCoins += 1;
    if (p === suffMax[i]) {
      optProfit += optCoins * p;
      optCoins = 0;
      return true;
    }
    return false;
  });

  const isOptimal = finalProfit === optProfit;
  const reset = () => setSells(preset.prices.map(() => false));
  const showAnswer = () => setSells(optSells);

  const cellW = 56;

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_DEEP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {t(E, "Tap a day to toggle SELL. Coins accumulate +1 per day; on a SELL-day, profit += coins × price and coins reset to 0.",
              "날을 탭해서 매도(SELL) 여부를 토글해. 코인은 매일 +1, 매도일에는 수익 += 코인 × 가격, 코인 0 으로 초기화.")}
      </div>

      {/* timeline grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ display: "inline-block" }}>
          {/* header: day labels */}
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <div style={{ width: cellW + 24, fontSize: 11, color: C.dim, fontWeight: 700, display: "flex", alignItems: "center" }}>
              {t(E, "day", "날")}
            </div>
            {preset.prices.map((_, i) => (
              <div key={i} style={{
                width: cellW, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: A, background: "#fff7ed", borderRadius: 6, border: "1px solid #fdba74",
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {`d${i + 1}`}
              </div>
            ))}
          </div>

          {/* prices row */}
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <div style={{ width: cellW + 24, fontSize: 11, color: "#7c3aed", fontWeight: 700, display: "flex", alignItems: "center" }}>
              {t(E, "price", "가격")}
            </div>
            {preset.prices.map((p, i) => (
              <div key={i} style={{
                width: cellW, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "#7c3aed", background: "#faf5ff", borderRadius: 6, border: "1px solid #d8b4fe",
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {p}
              </div>
            ))}
          </div>

          {/* sell toggle row */}
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <div style={{ width: cellW + 24, fontSize: 11, color: A, fontWeight: 700, display: "flex", alignItems: "center" }}>
              {t(E, "sell?", "매도?")}
            </div>
            {preset.prices.map((_, i) => {
              const on = sells[i];
              return (
                <button key={i} onClick={() => toggle(i)} style={{
                  width: cellW, height: 36, padding: 0, cursor: "pointer",
                  borderRadius: 6, border: `1.5px solid ${on ? A : "#e5e7eb"}`,
                  background: on ? "#fed7aa" : "#f9fafb",
                  color: on ? "#9a3412" : "#cbd5e1",
                  fontSize: 13, fontWeight: 800,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {on ? t(E, "SELL", "매도") : "·"}
                </button>
              );
            })}
          </div>

          {/* coins row (after action) */}
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <div style={{ width: cellW + 24, fontSize: 11, color: "#15803d", fontWeight: 700, display: "flex", alignItems: "center" }}>
              {t(E, "coins", "코인")}
            </div>
            {coinsTrace.map((c, i) => (
              <div key={i} style={{
                width: cellW, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: c === 0 ? C.dim : "#15803d",
                background: c === 0 ? "#f9fafb" : "#f0fdf4", borderRadius: 6,
                border: `1px solid ${c === 0 ? "#e5e7eb" : "#86efac"}`,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {c}
              </div>
            ))}
          </div>

          {/* profit row */}
          <div style={{ display: "flex", gap: 4, marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fdba74" }}>
            <div style={{ width: cellW + 24, fontSize: 11, color: "#9a3412", fontWeight: 800, display: "flex", alignItems: "center" }}>
              {t(E, "profit", "수익")}
            </div>
            {profitTrace.map((p, i) => (
              <div key={i} style={{
                width: cellW, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, color: "#9a3412",
                background: "#fff7ed", borderRadius: 6, border: "1px solid #fdba74",
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* status banner */}
      <div style={{
        margin: "10px auto 8px", maxWidth: 480, textAlign: "center",
        padding: "8px 12px", borderRadius: 10,
        background: isOptimal && finalProfit > 0 ? "#f0fdf4" : "#fff7ed",
        border: `1.5px solid ${isOptimal && finalProfit > 0 ? "#86efac" : "#fdba74"}`,
        color: isOptimal && finalProfit > 0 ? "#15803d" : "#9a3412",
        fontSize: 13, fontWeight: 700,
      }}>
        {t(E, "Your profit: ", "내 수익: ")}<b>{finalProfit}</b>
        {"  ·  "}
        {t(E, "Optimal: ", "최적: ")}<b>{optProfit}</b>
        {isOptimal && finalProfit > 0 ? t(E, "  ✓ Matched!", "  ✓ 일치!") : ""}
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={reset} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "Reset", "초기화")}
        </button>
        <button onClick={showAnswer} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${A}`,
          background: A, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "Show optimal", "최적 보기")}
        </button>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E, "Hint: sell on day i exactly when prices[i] equals the maximum of prices[i..N-1] (no better day ahead).",
              "힌트: prices[i] 가 prices[i..N-1] 중 최댓값일 때(앞으로 더 나은 날이 없을 때) 매도해.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "prices = list(map(int, input().split()))",
  "",
  "# Suffix maximum: best future price from day i onward",
  "suffix_max = [0] * N",
  "suffix_max[N - 1] = prices[N - 1]",
  "for i in range(N - 2, -1, -1):",
  "    suffix_max[i] = max(prices[i], suffix_max[i + 1])",
  "",
  "profit = 0",
  "coins = 0",
  "for i in range(N):",
  "    coins += 1  # earn 1 coin per day",
  "    # Sell all coins if today's price >= all future prices",
  "    if prices[i] == suffix_max[i]:",
  "        profit += coins * prices[i]",
  "        coins = 0",
  "",
  "print(profit)",
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
  "    vector<long long> prices; { long long _x; while (cin >> _x) prices.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    // Suffix maximum: best future price from day i onward",
  "    auto suffix_max = [0] * N;",
  "    // suffix_max[N - 1] = prices[N - 1]",
  "    for (long long i = N - 2; i < -1, -1; i++) {",
  "        // suffix_max[i] = max(prices[i], suffix_max[i + 1])",
  "",
  "    auto profit = 0;",
  "    auto coins = 0;",
  "    for (long long i = 0; i < N; i++) {",
  "        coins += 1  # earn 1 coin per day;",
  "        // Sell all coins if today's price >= all future prices",
  "        if (prices[i] == suffix_max[i]) {",
  "            profit += coins * prices[i];",
  "            auto coins = 0;",
  "",
  "    cout << profit << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc19DitcoinSections(E) {
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

export function Mcc19DitcoinProgressiveCode(props) {
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


export function downloadMcc19DitcoinPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Ditcoin — Full Study Guide", "Mcc19Ditcoin — 종합 풀이 노트");
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

