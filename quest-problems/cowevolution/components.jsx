import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "N = int(input())",
  "populations = []",
  "for _ in range(N):",
  "    K = int(input())",
  "    chars = set()",
  "    for _ in range(K):",
  "        chars.add(input().strip())",
  "    populations.append(chars)",
  "",
  "# Check if any two characteristics 'cross'",
  "# Chars A and B cross if there exist populations with:",
  "#   {A, not B}, {B, not A}, {A, B}",
  "# If any pair crosses, no valid tree exists",
  "",
  "all_chars = set()",
  "for p in populations:",
  "    all_chars |= p",
  "",
  "valid = True",
  "chars = list(all_chars)",
  "for i in range(len(chars)):",
  "    for j in range(i+1, len(chars)):",
  "        a, b = chars[i], chars[j]",
  "        has_a_only = has_b_only = has_both = False",
  "        for p in populations:",
  "            ha, hb = a in p, b in p",
  "            if ha and not hb: has_a_only = True",
  "            if hb and not ha: has_b_only = True",
  "            if ha and hb: has_both = True",
  "        if has_a_only and has_b_only and has_both:",
  "            valid = False",
  "            break",
  "    if not valid: break",
  "",
  "print('yes' if valid else 'no')",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<set<string>> pops(N);",
  "    for (int i = 0; i < N; i++) {",
  "        int K; cin >> K;",
  "        while (K--) { string s; cin >> s; pops[i].insert(s); }",
  "    }",
  "    set<string> chars;",
  "    for (auto& p : pops) for (auto& c : p) chars.insert(c);",
  "    vector<string> charList(chars.begin(), chars.end());",
  "    bool ok = true;",
  "    for (size_t i = 0; i < charList.size() && ok; i++) {",
  "        for (size_t j = i + 1; j < charList.size() && ok; j++) {",
  "            bool a = false, b = false, ab = false;",
  "            for (auto& p : pops) {",
  "                bool hasI = p.count(charList[i]);",
  "                bool hasJ = p.count(charList[j]);",
  "                if (hasI && !hasJ) a = true;",
  "                if (!hasI && hasJ) b = true;",
  "                if (hasI && hasJ) ab = true;",
  "            }",
  "            if (a && b && ab) ok = false;",
  "        }",
  "    }",
  "    cout << (ok ? \"yes\" : \"no\") << \"\n\";",
  "    return 0;",
  "}",
];

export function getCowEvolutionSections(E) {
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

export function CowEvolutionProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


/* ═══════════════════════════════════════════════════════════════
   CowEvolutionSim — pick a pair (A,B), audit every population,
   tally the three crossing flags, decide yes/no.
   ═══════════════════════════════════════════════════════════════ */
const _CE_PRESETS = [
  {
    label: t_label("Valid · nested", "유효 · 포함"),
    pops: [
      ["fly"],
      ["fly", "spot"],
      ["fly", "spot", "horn"],
    ],
  },
  {
    label: t_label("Invalid · cross", "무효 · 교차"),
    pops: [
      ["fly", "spot"],
      ["fly", "horn"],
      ["spot", "horn"],
    ],
  },
  {
    label: t_label("Valid · disjoint", "유효 · 분리"),
    pops: [
      ["fly"],
      ["swim"],
      ["walk", "horn"],
    ],
  },
  {
    label: t_label("Invalid · classic", "무효 · 전형적"),
    pops: [
      ["A", "B"],
      ["B", "C"],
      ["A", "C"],
    ],
  },
];

function t_label(en, ko) { return { en, ko }; }

export function CowEvolutionSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _CE_PRESETS[pi];
  const pops = preset.pops;

  // Collect all distinct characteristics from the chosen preset
  const allChars = [];
  const seen = new Set();
  for (const p of pops) for (const c of p) if (!seen.has(c)) { seen.add(c); allChars.push(c); }

  // Default pair = first two characteristics
  const [aIdx, setAIdx] = useState(0);
  const [bIdx, setBIdx] = useState(1);
  // Reset indices when preset changes
  const safeA = Math.min(aIdx, allChars.length - 1);
  const safeB = Math.min(bIdx, allChars.length - 1);
  const A_char = allChars[safeA];
  const B_char = allChars[safeB] !== A_char ? allChars[safeB] : allChars[(safeB + 1) % allChars.length];

  // Audit each population for the chosen pair
  let aOnly = false, bOnly = false, both = false;
  const rows = pops.map((p, i) => {
    const ha = p.includes(A_char);
    const hb = p.includes(B_char);
    const role =
      ha && hb ? "both"
      : ha ? "aOnly"
      : hb ? "bOnly"
      : "neither";
    if (role === "aOnly") aOnly = true;
    if (role === "bOnly") bOnly = true;
    if (role === "both") both = true;
    return { i, p, ha, hb, role };
  });

  // Auto-scan: do any pair cross across this preset?
  let presetValid = true;
  let crossingPair = null;
  outer:
  for (let i = 0; i < allChars.length; i++) {
    for (let j = i + 1; j < allChars.length; j++) {
      let xa = false, xb = false, xab = false;
      for (const p of pops) {
        const ha = p.includes(allChars[i]);
        const hb = p.includes(allChars[j]);
        if (ha && !hb) xa = true;
        if (!ha && hb) xb = true;
        if (ha && hb) xab = true;
      }
      if (xa && xb && xab) { presetValid = false; crossingPair = [allChars[i], allChars[j]]; break outer; }
    }
  }

  const cross = aOnly && bOnly && both;

  return (
    <div style={{ padding: 14 }}>
      {/* Preset switcher */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_CE_PRESETS.map((pr, i) => (
          <button key={i} onClick={() => { setPi(i); setAIdx(0); setBIdx(1); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{t(E, pr.label.en, pr.label.ko)}</button>
        ))}
      </div>

      {/* Population list */}
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
          🐄 {t(E, "Populations", "집단")} (N = {pops.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {pops.map((p, i) => (
            <div key={i} style={{
              display: "flex", gap: 6, alignItems: "center",
              fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
              padding: "4px 8px", background: "#fff", border: "1px solid #d1fae5", borderRadius: 6,
            }}>
              <span style={{ color: C.dim, fontWeight: 700, minWidth: 30 }}>P{i + 1}:</span>
              <span style={{ color: A, fontWeight: 600 }}>{`{ ${p.join(", ")} }`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pair picker */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
          {t(E, "Pair A:", "쌍 A:")}
          <select value={safeA} onChange={(e) => setAIdx(Number(e.target.value))} style={{
            marginLeft: 6, padding: "3px 6px", borderRadius: 6, border: `1px solid ${A}`,
            color: A, fontWeight: 700, fontSize: 11, background: "#fff",
          }}>
            {allChars.map((c, i) => <option key={i} value={i}>{c}</option>)}
          </select>
        </label>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
          {t(E, "Pair B:", "쌍 B:")}
          <select value={safeB} onChange={(e) => setBIdx(Number(e.target.value))} style={{
            marginLeft: 6, padding: "3px 6px", borderRadius: 6, border: `1px solid ${A}`,
            color: A, fontWeight: 700, fontSize: 11, background: "#fff",
          }}>
            {allChars.map((c, i) => <option key={i} value={i}>{c}</option>)}
          </select>
        </label>
      </div>

      {/* Audit table */}
      <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, marginBottom: 6, textAlign: "center" }}>
          🔍 {t(E, `Auditing pair ( ${A_char}, ${B_char} )`, `( ${A_char}, ${B_char} ) 쌍 검사`)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {rows.map((r) => {
            const bg = r.role === "both" ? "#fef3c7"
                      : r.role === "aOnly" ? "#dbeafe"
                      : r.role === "bOnly" ? "#fce7f3"
                      : "#f1f5f9";
            const bd = r.role === "both" ? "#fbbf24"
                      : r.role === "aOnly" ? "#60a5fa"
                      : r.role === "bOnly" ? "#f472b6"
                      : "#cbd5e1";
            const tag = r.role === "both" ? t(E, "both A,B", "A,B 둘 다")
                       : r.role === "aOnly" ? t(E, "A only", "A 만")
                       : r.role === "bOnly" ? t(E, "B only", "B 만")
                       : t(E, "neither", "둘 다 없음");
            return (
              <div key={r.i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 10px", borderRadius: 6, background: bg, border: `1.5px solid ${bd}`,
                fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span>P{r.i + 1}: <span style={{ color: r.ha ? A : C.dim }}>{A_char}{r.ha ? "✓" : "✗"}</span> · <span style={{ color: r.hb ? A : C.dim }}>{B_char}{r.hb ? "✓" : "✗"}</span></span>
                <span>{tag}</span>
              </div>
            );
          })}
        </div>

        {/* Three flags summary */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
          <FlagPill on={aOnly} label={t(E, "∃ A-only", "A 만 ∃")} />
          <FlagPill on={bOnly} label={t(E, "∃ B-only", "B 만 ∃")} />
          <FlagPill on={both}  label={t(E, "∃ A∧B",   "A∧B ∃")} />
        </div>

        {/* Verdict for this pair */}
        <div style={{
          marginTop: 10, textAlign: "center", padding: "8px 10px", borderRadius: 8,
          background: cross ? "#fef2f2" : "#ecfdf5",
          border: `1.5px solid ${cross ? "#ef4444" : A}`,
          fontSize: 12, fontWeight: 700, color: cross ? "#991b1b" : "#065f46",
        }}>
          {cross
            ? t(E, `Pair (${A_char},${B_char}) CROSSES → no valid tree for this pair.`,
                  `( ${A_char}, ${B_char} ) 쌍 교차 → 이 쌍 때문에 트리 불가.`)
            : t(E, `Pair (${A_char},${B_char}) is fine (one flag missing).`,
                  `( ${A_char}, ${B_char} ) 쌍은 OK (플래그 하나 빠짐).`)}
        </div>
      </div>

      {/* Final verdict for the whole preset (auto-scan) */}
      <div style={{
        textAlign: "center", padding: "10px 12px", borderRadius: 10,
        background: presetValid ? "#dcfce7" : "#fee2e2",
        border: `2px solid ${presetValid ? "#16a34a" : "#dc2626"}`,
        fontSize: 13, fontWeight: 800, color: presetValid ? "#15803d" : "#991b1b",
      }}>
        {presetValid
          ? t(E, "Whole input → print 'yes' (no pair crosses).",
                "전체 입력 → 'yes' 출력 (교차 쌍 없음).")
          : t(E, `Whole input → print 'no' (pair (${crossingPair?.[0]},${crossingPair?.[1]}) crosses).`,
                `전체 입력 → 'no' 출력 ( ( ${crossingPair?.[0]}, ${crossingPair?.[1]} ) 쌍 교차 ).`)}
      </div>
    </div>
  );
}

function FlagPill({ on, label }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 9px", borderRadius: 999,
      background: on ? "#059669" : "#f1f5f9",
      color: on ? "#fff" : "#64748b",
      border: `1px solid ${on ? "#047857" : "#cbd5e1"}`,
      fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
    }}>
      {on ? "✓" : "✗"} {label}
    </span>
  );
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


export function downloadCowEvolutionPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowEvolution — Full Study Guide", "CowEvolution — 종합 풀이 노트");
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

