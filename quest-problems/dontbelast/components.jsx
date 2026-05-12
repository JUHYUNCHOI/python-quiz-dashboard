import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   DontBeLastSim — bilingual interactive milk-log
   Student adjusts each cow's gallons, sees totals sorted live,
   and sees who is the second-lowest (or 'Tie').
   ═══════════════════════════════════════════════════════════════ */
const COWS = ["Bessie", "Elsie", "Daisy", "Gertie", "Annabelle", "Maggie", "Henrietta"];
const COW_EMOJI = {
  Bessie: "🐄", Elsie: "🐮", Daisy: "🌼", Gertie: "🐂",
  Annabelle: "🐃", Maggie: "🐏", Henrietta: "🐐",
};

const _PRESETS = [
  { label: { en: "Spec example", ko: "문제 예시" }, milk: { Bessie: 7, Elsie: 0, Daisy: 0, Gertie: 0, Annabelle: 0, Maggie: 0, Henrietta: 0 } },
  { label: { en: "Two-way tie", ko: "두 마리 동률" }, milk: { Bessie: 5, Elsie: 5, Daisy: 0, Gertie: 0, Annabelle: 0, Maggie: 0, Henrietta: 0 } },
  { label: { en: "Clear order", ko: "확실한 순위" }, milk: { Bessie: 12, Elsie: 3, Daisy: 8, Gertie: 1, Annabelle: 9, Maggie: 6, Henrietta: 4 } },
  { label: { en: "All zero", ko: "모두 0" }, milk: { Bessie: 0, Elsie: 0, Daisy: 0, Gertie: 0, Annabelle: 0, Maggie: 0, Henrietta: 0 } },
];

export function DontBeLastSim({ E }) {
  const [pi, setPi] = useState(0);
  const [milk, setMilk] = useState({ ..._PRESETS[0].milk });

  const applyPreset = (i) => {
    setPi(i);
    setMilk({ ..._PRESETS[i].milk });
  };

  const setOne = (cow, raw) => {
    const v = Math.max(0, Math.min(99, parseInt(raw, 10) || 0));
    setMilk((m) => ({ ...m, [cow]: v }));
    setPi(-1);
  };

  // Sort cows by total ascending, stable by COWS order
  const ranking = COWS
    .map((c, idx) => ({ cow: c, total: milk[c], idx }))
    .sort((a, b) => a.total - b.total || a.idx - b.idx);

  const distinctVals = Array.from(new Set(ranking.map((r) => r.total))).sort((a, b) => a - b);
  let resultLabel; let resultColor; let secondVal = null;
  let winners = [];
  if (distinctVals.length < 2) {
    resultLabel = "Tie";
    resultColor = A;
  } else {
    secondVal = distinctVals[1];
    winners = ranking.filter((r) => r.total === secondVal).map((r) => r.cow);
    if (winners.length === 1) {
      resultLabel = winners[0];
      resultColor = "#15803d";
    } else {
      resultLabel = "Tie";
      resultColor = A;
    }
  }

  return (
    <div style={{ padding: 14 }}>
      {/* Preset row */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_PRESETS.map((p, i) => (
          <button
            key={i}
            onClick={() => applyPreset(i)}
            style={{
              padding: "5px 10px", borderRadius: 8,
              border: `1px solid ${i === pi ? A : C.border}`,
              background: i === pi ? A : "transparent",
              color: i === pi ? "#fff" : C.dim,
              fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}
          >
            {E ? p.label.en : p.label.ko}
          </button>
        ))}
      </div>

      {/* Editable milk inputs */}
      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5",
        borderRadius: 10, padding: "10px 12px", marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", marginBottom: 8, textAlign: "center", letterSpacing: 0.4 }}>
          🥛 {t(E, "Edit each cow's total gallons", "각 소의 총 갤런을 수정해 봐")}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: 8,
        }}>
          {COWS.map((cow) => (
            <label key={cow} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8,
              padding: "6px 4px",
            }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{COW_EMOJI[cow]}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{cow}</span>
              <input
                type="number"
                min={0}
                max={99}
                value={milk[cow]}
                onChange={(e) => setOne(cow, e.target.value)}
                style={{
                  width: 56, padding: "3px 4px", textAlign: "center",
                  border: `1.5px solid ${C.border}`, borderRadius: 6,
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                  color: A,
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Sorted ranking */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, letterSpacing: 0.4 }}>
          📊 {t(E, "Sorted by total (lowest first)", "총량 오름차순 정렬")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ranking.map((r, idx) => {
            const isMin = r.total === distinctVals[0];
            const isSecond = secondVal !== null && r.total === secondVal;
            const isAnswer = isSecond && winners.length === 1;
            const bg = isAnswer ? "#dcfce7" : isSecond ? "#fef3c7" : isMin ? "#e0e7ff" : "#f8fafc";
            const bd = isAnswer ? "#16a34a" : isSecond ? "#f59e0b" : isMin ? "#6366f1" : C.border;
            const tag = isAnswer
              ? t(E, "2nd-lowest ← answer", "두 번째로 적음 ← 정답")
              : isSecond
                ? t(E, "tied for 2nd → Tie", "두 번째 동률 → Tie")
                : isMin
                  ? t(E, "lowest", "최솟값")
                  : "";
            return (
              <div
                key={r.cow}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: bg, border: `1px solid ${bd}`, borderRadius: 8,
                  padding: "5px 10px",
                }}
              >
                <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, width: 18 }}>#{idx + 1}</span>
                <span style={{ fontSize: 16 }}>{COW_EMOJI[r.cow]}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, flex: 1 }}>{r.cow}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                  color: A, minWidth: 28, textAlign: "right",
                }}>{r.total}</span>
                {tag && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: bd, marginLeft: 4 }}>{tag}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <div style={{
        background: "#fff7ed", border: `1.5px solid ${resultColor}`, borderRadius: 10,
        padding: "10px 14px", textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, letterSpacing: 0.4 }}>
          {t(E, "Distinct totals, sorted", "고유 총량 오름차순")}: {distinctVals.join(", ") || "—"}
        </div>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 6 }}>
          {distinctVals.length < 2
            ? t(E, "Fewer than 2 distinct totals → no clear 2nd place", "고유 총량이 2개 미만 → 2등이 없음")
            : t(E, `2nd-lowest distinct value = ${secondVal}`, `두 번째 고유값 = ${secondVal}`)}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: resultColor, fontFamily: "'JetBrains Mono',monospace" }}>
          {resultLabel}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
          {t(E, "= what the program prints", "= 프로그램이 출력하는 답")}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "cows = ['Bessie','Elsie','Daisy','Gertie','Annabelle','Maggie','Henrietta']",
  "milk = {c: 0 for c in cows}",
  "",
  "N = int(input())",
  "for _ in range(N):",
  "    parts = input().split()",
  "    name = parts[0]",
  "    amt = int(parts[1])",
  "    milk[name] += amt",
  "",
  "vals = sorted(set(milk.values()))",
  "if len(vals) < 2:",
  "    print('Tie')",
  "else:",
  "    second = vals[1]",
  "    winners = [c for c in cows if milk[c] == second]",
  "    if len(winners) == 1:",
  "        print(winners[0])",
  "    else:",
  "        print('Tie')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    vector<string> cows = {\"Bessie\", \"Elsie\", \"Daisy\", \"Gertie\", \"Annabelle\", \"Maggie\", \"Henrietta\"};",
  "    map<string, int> milk;",
  "    for (int i = 0; i < (int)cows.size(); i++) {",
  "        milk[cows[i]] = 0;",
  "    }",
  "    int N;",
  "    cin >> N;",
  "    for (int i = 0; i < N; i++) {",
  "        string name;",
  "        int m;",
  "        cin >> name >> m;",
  "        milk[name] += m;",
  "    }",
  "    // Find second-lowest milk amount",
  "    vector<pair<int, string>> sorted_;",
  "    for (int i = 0; i < (int)cows.size(); i++) {",
  "        sorted_.push_back({milk[cows[i]], cows[i]});",
  "    }",
  "    sort(sorted_.begin(), sorted_.end());",
  "    if (sorted_[0].first == sorted_[1].first) {",
  "        cout << \"Tie\\n\";",
  "    } else {",
  "        cout << sorted_[1].second << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getDontBeLastSections(E) {
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
        t(E, "map<string,int> tracks milk total per cow name.",
            "map<string,int>로 소 이름별 우유 합계를 추적."),
        t(E, "Sort a vector of (milk, name) pairs to find the second-lowest.",
            "(우유, 이름) 페어 벡터를 정렬해서 두 번째로 적은 값을 찾기."),
      ],
    },
  ];
}

export function DontBeLastProgressiveCode(props) {
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


export function downloadDontBeLastPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "DontBeLast — Full Study Guide", "DontBeLast — 종합 풀이 노트");
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

