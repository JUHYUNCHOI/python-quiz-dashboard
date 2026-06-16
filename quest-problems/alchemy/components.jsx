// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1229
// 🔒 USACO_VERIFIED (rewritten 2026-06-15)
//   Real problem: USACO 2022 US Open Bronze #3 "Alchemy" (cpid 1229).
//   MAXIMIZE units of metal N. Recipe line is "L M ing1..ingM"
//   (L = product, M = #ingredients). Greedy crafting: to make 1 of m,
//   use stock if any else recursively craft each ingredient; a failed
//   attempt must NOT consume stock (work on a copy, commit on success).
//   Python: official sample PASS (output 1) — local verify
//   C++:    official sample PASS (output 1) — local verify (g++ -std=c++17)
//   USACO re-submit PENDING. 코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ================================================================
   Interactive sim: Greedy recipe maker
   Shows the make(metal) recursion in action on a tiny example.
   Student clicks "Make metal 3" — watch stock get consumed, see
   how many total units of N can be crafted before failure.
   ================================================================ */
export function RecipeSimulator({ E }) {
  // Tiny example: metal 1 + metal 2 -> metal 3
  // Start: 3x metal 1, 2x metal 2, 1x metal 3 already
  const INITIAL = { 1: 3, 2: 2, 3: 1 };
  const RECIPES = { 3: [1, 2] };
  const TARGET = 3;

  const [stock, setStock] = useState({ ...INITIAL });
  const [made, setMade] = useState(0);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);

  const fmt = (m) => t(E, `metal ${m}`, `금속 ${m}`);

  const reset = () => {
    setStock({ ...INITIAL });
    setMade(0);
    setLog([]);
  };

  // One full attempt at making one unit of TARGET, with step messages.
  const tryMakeOne = () => {
    if (busy) return;
    setBusy(true);
    const local = { ...stock };
    const trace = [];
    let ok = true;

    const make = (m, depth) => {
      const pad = "  ".repeat(depth);
      if (local[m] > 0) {
        local[m] -= 1;
        trace.push({ pad, kind: "use", text: t(E, `use 1 stock of ${fmt(m)}`, `${fmt(m)} 재고 1개 사용`) });
        return true;
      }
      if (!RECIPES[m]) {
        trace.push({ pad, kind: "fail", text: t(E, `no stock and no recipe for ${fmt(m)} → fail`, `${fmt(m)} 재고도 레시피도 없음 → 실패`) });
        return false;
      }
      trace.push({ pad, kind: "open", text: t(E, `need ${fmt(m)} → try recipe`, `${fmt(m)} 필요 → 레시피 시도`) });
      for (const ing of RECIPES[m]) {
        if (!make(ing, depth + 1)) return false;
      }
      return true;
    };

    trace.push({ pad: "", kind: "head", text: t(E, `attempt #${made + 1}: make ${fmt(TARGET)}`, `시도 #${made + 1}: ${fmt(TARGET)} 만들기`) });
    ok = make(TARGET, 1);
    trace.push({ pad: "", kind: ok ? "ok" : "no", text: ok ? t(E, "success ✓", "성공 ✓") : t(E, "cannot continue ✗", "더 못 만들어요 ✗") });

    if (ok) {
      setStock(local);
      setMade(made + 1);
    }
    setLog(trace);
    setBusy(false);
  };

  const stockEntries = Object.keys(INITIAL).map(Number).sort((a, b) => a - b);

  const colorOf = (m) => (m === 1 ? "#0891b2" : m === 2 ? "#7c3aed" : A);

  return (
    <div style={{
      background: "#fff7ed",
      border: `1.5px solid ${A}`,
      borderRadius: 12,
      padding: 14,
      marginTop: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>
          🧪 {t(E, "Try the greedy algorithm", "탐욕 알고리즘 체험")}
        </div>
        <div style={{ fontSize: 11, color: "#92400e" }}>
          {t(E, "Recipe: metal 1 + metal 2 → metal 3", "레시피: 금속1 + 금속2 → 금속3")}
        </div>
      </div>

      {/* Stock display */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        {stockEntries.map(m => (
          <div key={m} style={{
            background: "#fff",
            border: `1.5px solid ${colorOf(m)}`,
            borderRadius: 10,
            padding: "8px 12px",
            minWidth: 88,
            textAlign: "center",
            opacity: stock[m] === 0 ? 0.45 : 1,
            transition: "opacity 200ms",
          }}>
            <div style={{ fontSize: 11, color: colorOf(m), fontWeight: 700 }}>{fmt(m)}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1f2937", fontFamily: "'JetBrains Mono', monospace" }}>
              {stock[m]}
            </div>
            <div style={{ fontSize: 10, color: C.dim }}>
              {t(E, "in stock", "재고")}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button
          onClick={tryMakeOne}
          disabled={busy}
          style={{
            background: A,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 800,
            cursor: busy ? "default" : "pointer",
          }}
        >
          {t(E, `▶ Make 1 metal ${TARGET}`, `▶ 금속${TARGET} 1개 만들기`)}
        </button>
        <button
          onClick={reset}
          style={{
            background: "#fff",
            color: A,
            border: `1.5px solid ${A}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ↺ {t(E, "Reset", "초기화")}
        </button>
        <div style={{
          background: "#fff",
          border: `1.5px solid ${C.ok}`,
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 12,
          fontWeight: 800,
          color: C.ok,
        }}>
          {t(E, "Total made: ", "총 제작: ")}{made}
        </div>
      </div>

      {/* Trace log */}
      {log.length > 0 && (
        <div style={{
          background: "#1e1b2e",
          color: "#e2e8f0",
          borderRadius: 8,
          padding: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          lineHeight: 1.6,
          maxHeight: 180,
          overflowY: "auto",
        }}>
          {log.map((entry, i) => {
            const tone = entry.kind === "ok" ? "#86efac"
              : entry.kind === "no" || entry.kind === "fail" ? "#fca5a5"
              : entry.kind === "use" ? "#fcd34d"
              : entry.kind === "open" ? "#a5b4fc"
              : "#e2e8f0";
            return (
              <div key={i} style={{ color: tone, whiteSpace: "pre" }}>
                {entry.pad}{entry.text}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: 11, color: "#92400e", marginTop: 8, lineHeight: 1.5 }}>
        💡 {t(E,
          "Click ▶ until it fails — that's the greedy answer. Notice: stock of metal 3 is used first (depth 1), then we fall back to combining 1+2.",
          "▶ 를 실패할 때까지 눌러봐요 — 그게 탐욕 답이에요. 금속3 재고가 먼저 쓰이고(깊이 1), 다음에 1+2 조합으로 넘어가요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "sys.setrecursionlimit(100000)",
  "",
  "N = int(input())",
  "have = [0] + list(map(int, input().split()))   # have[i] = units of metal i (1-indexed)",
  "K = int(input())",
  "recipe = [[] for _ in range(N + 1)]             # recipe[i] = ingredients to make 1 of metal i",
  "for _ in range(K):",
  "    nums = list(map(int, input().split()))",
  "    L, M = nums[0], nums[1]                      # L = product, M = #ingredients",
  "    recipe[L] = nums[2:2 + M]",
  "",
  "# Try to make 1 unit of metal m using a working copy of stock.",
  "def make(m, stock):",
  "    if stock[m] > 0:                # have one ready — use it",
  "        stock[m] -= 1",
  "        return True",
  "    if not recipe[m]:              # no stock and no recipe — give up",
  "        return False",
  "    for ing in recipe[m]:         # craft every ingredient first",
  "        if not make(ing, stock):",
  "            return False",
  "    return True",
  "",
  "ans = 0",
  "while True:",
  "    trial = have[:]               # copy: a failed attempt must not eat stock",
  "    if make(N, trial):",
  "        have = trial              # success — commit the consumption",
  "        ans += 1",
  "    else:",
  "        break",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int N, K;",
  "vector<long long> have;        // have[i] = units of metal i in stock",
  "vector<vector<int>> recipe;    // recipe[i] = ingredients to make 1 of metal i",
  "",
  "// Try to make 1 unit of metal m using a working copy of stock.",
  "bool make(int m, vector<long long> &stock) {",
  "    if (stock[m] > 0) { stock[m]--; return true; }   // have one ready",
  "    if (recipe[m].empty()) return false;             // no stock, no recipe",
  "    for (int ing : recipe[m]) {                      // craft each ingredient",
  "        if (!make(ing, stock)) return false;",
  "    }",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    cin >> N;",
  "    have.assign(N + 1, 0);",
  "    for (int i = 1; i <= N; i++) cin >> have[i];",
  "    cin >> K;",
  "    recipe.assign(N + 1, {});",
  "    for (int k = 0; k < K; k++) {",
  "        int L, M; cin >> L >> M;          // L = product, M = #ingredients",
  "        recipe[L].resize(M);",
  "        for (int j = 0; j < M; j++) cin >> recipe[L][j];",
  "    }",
  "    long long ans = 0;",
  "    while (true) {",
  "        vector<long long> trial = have;   // copy: failed attempt must not eat stock",
  "        if (make(N, trial)) { have = trial; ans++; }   // commit on success",
  "        else break;",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getAlchemySections(E) {
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
        t(E, "Only <iostream> and <vector> needed — no bits/stdc++.h.",
            "필요한 헤더는 <iostream>, <vector> 뿐 — bits/stdc++.h 안 써."),
        t(E, "Pass stock by reference (vector<long long>&) so make() can consume it.",
            "stock 을 참조로 전달 (vector<long long>&) 해야 make() 안에서 소비 가능."),
        t(E, "Copy `have` into `trial` before each attempt; commit only on success.",
            "시도 전마다 have 를 trial 로 복사하고, 성공할 때만 반영."),
      ],
    },
  ];
}

export function AlchemyProgressiveCode(props) {
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


export function downloadAlchemyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Alchemy — Full Study Guide", "Alchemy — 종합 풀이 노트");
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

