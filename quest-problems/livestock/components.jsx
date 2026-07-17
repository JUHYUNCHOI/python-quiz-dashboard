// 🔒 USACO_VERIFIED — cpid=965, livestock lineup (2019 Dec Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
// 🔒 2026-07-17 (선생님 "재귀는 힘들어"): 재귀 걷어내기 — 순열 백트래킹 search()/search_perm()
//   → itertools.permutations(cows) (C++: next_permutation). cows 가 알파벳 순이라 사전순
//   열거 → 첫 유효 배열이 답, 재귀와 동일. 로컬: 이전 재귀본과 200+200 랜덤 제약 출력 동일,
//   PY==CPP 교차, clang++ 컴파일. 코드 바뀜 → USACO 재제출로 재확인 권장(cpid=965).
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ────────────────────────────────────────────────────────────────
   ChainSim — visualizes how adjacency constraints form chains
   and how lex-smallest lineup is built. Eye-evident, click-paced.
   ──────────────────────────────────────────────────────────────── */
const SIM_COWS = ["Beatrice","Belinda","Bella","Bessie","Betsy","Blue","Buttercup","Sue"];
// Demo constraint script — produces a non-trivial chain set.
// 1) Bella - Blue, 2) Bella - Bessie, 3) Buttercup - Sue
// → chains: [Blue-Bella-Bessie], [Buttercup-Sue], plus singletons {Beatrice, Belinda, Betsy}
// → lex-smallest: alphabetical pass picks Beatrice, Belinda (singletons), then Bessie's chain
//   (start from Bessie's chain endpoint walked alphabetically) etc.
const SIM_EDGES = [
  ["Bella","Blue"],
  ["Bella","Bessie"],
  ["Buttercup","Sue"],
];

function buildChains(edges) {
  const adj = {}; SIM_COWS.forEach(c => { adj[c] = []; });
  edges.forEach(([a,b]) => { adj[a].push(b); adj[b].push(a); });
  const used = new Set(); const out = [];
  const sorted = [...SIM_COWS].sort();
  for (const c of sorted) {
    if (used.has(c)) continue;
    if (adj[c].length > 1) continue; // not a chain endpoint
    // walk
    let cur = c, prev = null;
    const chain = [];
    while (cur) {
      chain.push(cur); used.add(cur);
      let nxt = null;
      for (const n of adj[cur]) if (n !== prev) { nxt = n; break; }
      prev = cur; cur = nxt;
    }
    out.push(...chain);
  }
  return out;
}

export function ChainSim({ E }) {
  const [step, setStep] = useState(0); // 0..SIM_EDGES.length = adding edges; +1 = show lineup
  const totalSteps = SIM_EDGES.length + 2; // 0..N edges, then lineup reveal

  const activeEdges = SIM_EDGES.slice(0, Math.min(step, SIM_EDGES.length));
  const showLineup = step > SIM_EDGES.length;
  const lineup = showLineup ? buildChains(activeEdges) : null;

  const adj = {}; SIM_COWS.forEach(c => { adj[c] = new Set(); });
  activeEdges.forEach(([a,b]) => { adj[a].add(b); adj[b].add(a); });

  // Group cows into connected components for display
  const visited = new Set();
  const groups = [];
  const sorted = [...SIM_COWS].sort();
  for (const c of sorted) {
    if (visited.has(c)) continue;
    if (adj[c].size > 1) continue;
    let cur = c, prev = null; const chain = [];
    while (cur) {
      chain.push(cur); visited.add(cur);
      let nxt = null;
      for (const n of adj[cur]) if (n !== prev) { nxt = n; break; }
      prev = cur; cur = nxt;
    }
    groups.push(chain);
  }

  const reset = () => setStep(0);
  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps - 1));

  const canNext = step < totalSteps - 1;
  const stepLabels = [
    t(E, "Start: 8 free cows", "시작: 자유로운 8마리"),
    ...SIM_EDGES.map(([a,b]) => t(E, `Add: ${a} ↔ ${b}`, `추가: ${a} ↔ ${b}`)),
    t(E, "Build lex-smallest lineup", "사전순 최소 배열 만들기"),
  ];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12.5, color: "#5b21b6", lineHeight: 1.55 }}>
        <b>🔍 {t(E, "Watch", "관찰")}</b> · {t(E,
          "Each constraint links two cows. Linked cows form chains. Free cows stay alone. Then we pick lex-smallest start each time.",
          "각 제약은 두 소를 잇는 간선. 연결된 소는 체인이 되고, 외톨이는 그대로. 사전순으로 가장 빠른 출발점부터 골라요.")}
      </div>

      <div style={{ background: "#0f172a", borderRadius: 10, padding: "12px 10px", minHeight: 180 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {groups.map((g, gi) => (
            <div key={gi} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: g.length > 1 ? "#1e1b4b" : "#1f2937",
              border: g.length > 1 ? `1.5px solid ${A}` : "1px solid #334155",
              borderRadius: 8, padding: "6px 8px",
            }}>
              {g.map((cow, ci) => (
                <span key={cow} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{
                    background: g.length > 1 ? A : "#475569",
                    color: "#fff", fontSize: 11.5, fontWeight: 700,
                    padding: "4px 8px", borderRadius: 6, fontFamily: "ui-monospace,monospace",
                  }}>{cow}</span>
                  {ci < g.length - 1 && <span style={{ color: A, fontWeight: 800 }}>—</span>}
                </span>
              ))}
            </div>
          ))}
        </div>

        {showLineup && lineup && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed #334155" }}>
            <div style={{ fontSize: 11, color: "#a5b4fc", textAlign: "center", marginBottom: 6, fontWeight: 700, letterSpacing: 0.4 }}>
              ✅ {t(E, "FINAL LINEUP (lex-smallest)", "최종 배열 (사전순 최소)")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
              {lineup.map((c, i) => (
                <span key={i} style={{
                  background: "#15803d", color: "#fff", fontSize: 11.5, fontWeight: 700,
                  padding: "4px 8px", borderRadius: 6, fontFamily: "ui-monospace,monospace",
                }}>{i + 1}. {c}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: C.dim }}>
          {t(E, "Step ", "단계 ")}{step + 1}/{totalSteps} · <span style={{ color: A, fontWeight: 700 }}>{stepLabels[step]}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={reset} style={{
            background: "#fff", color: C.dim, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700,
          }}>{t(E, "↺ Reset", "↺ 처음부터")}</button>
          <button onClick={nextStep} disabled={!canNext} style={{
            background: canNext ? A : "#cbd5e1", color: "#fff",
            border: "none", borderRadius: 8, padding: "5px 14px",
            cursor: canNext ? "pointer" : "default", fontSize: 12, fontWeight: 800,
          }}>
            {step < SIM_EDGES.length ? t(E, "+ Add constraint", "+ 제약 추가")
              : step === SIM_EDGES.length ? t(E, "▶ Build lineup", "▶ 배열 만들기")
              : t(E, "Done", "완료")}
          </button>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "from itertools import permutations",
  "",
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('lineup.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "# 알파벳 순으로 정렬해둔 소 이름 8개",
  "cows = ['Beatrice', 'Belinda', 'Bella', 'Bessie',",
  "        'Betsy', 'Blue', 'Buttercup', 'Sue']",
  "",
  "N = int(lines[0])",
  "# 제약: (a, b) 쌍들 — a 와 b 는 줄에서 인접해야 함",
  "pairs = []",
  "for i in range(1, N + 1):",
  "    parts = lines[i].split()",
  "    # 'X must be milked beside Y' → 첫 단어와 마지막 단어",
  "    a = parts[0]",
  "    b = parts[-1]",
  "    pairs.append((a, b))",
  "",
  "def is_valid(perm):",
  "    for a, b in pairs:",
  "        ia = perm.index(a)",
  "        ib = perm.index(b)",
  "        if abs(ia - ib) != 1:",
  "            return False",
  "    return True",
  "",
  "# cows 가 알파벳 순이라 permutations 는 배열을 '사전순으로' 만들어줘요.",
  "# 처음으로 모든 제약을 만족하는 배열이 곧 답 — 재귀 없이 반복문으로.",
  "answer = []",
  "for perm in permutations(cows):",
  "    if is_valid(perm):",
  "        answer = list(perm)",
  "        break",
  "",
  "with open('lineup.out', 'w') as file:",
  "    for c in answer:",
  "        file.write(c + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <string>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "// 알파벳 순으로 정렬해둔 소 이름 8개",
  "vector<string> cows = {\"Beatrice\", \"Belinda\", \"Bella\", \"Bessie\",",
  "                       \"Betsy\", \"Blue\", \"Buttercup\", \"Sue\"};",
  "// 제약: pairs_a[i] 와 pairs_b[i] 는 인접해야 함",
  "vector<string> pairs_a, pairs_b;",
  "",
  "bool is_valid(vector<string>& perm) {",
  "    for (int k = 0; k < (int)pairs_a.size(); k++) {",
  "        int ia = -1, ib = -1;",
  "        for (int i = 0; i < 8; i++) {",
  "            if (perm[i] == pairs_a[k]) ia = i;",
  "            if (perm[i] == pairs_b[k]) ib = i;",
  "        }",
  "        int diff = ia - ib;",
  "        if (diff < 0) diff = -diff;",
  "        if (diff != 1) return false;",
  "    }",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"lineup.in\");",
  "    ofstream fout(\"lineup.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    fin.ignore();  // 줄바꿈 흡수",
  "    for (int k = 0; k < N; k++) {",
  "        string line;",
  "        getline(fin, line);",
  "        // 'X must be milked beside Y' — 첫 단어와 마지막 단어",
  "        // 공백으로 자르기",
  "        vector<string> tok;",
  "        string cur_word = \"\";",
  "        for (int i = 0; i < (int)line.size(); i++) {",
  "            if (line[i] == ' ') {",
  "                if (!cur_word.empty()) { tok.push_back(cur_word); cur_word = \"\"; }",
  "            } else {",
  "                cur_word += line[i];",
  "            }",
  "        }",
  "        if (!cur_word.empty()) tok.push_back(cur_word);",
  "        pairs_a.push_back(tok[0]);",
  "        pairs_b.push_back(tok[tok.size() - 1]);",
  "    }",
  "",
  "    // cows 가 알파벳 순이라 next_permutation 은 '사전순으로' 배열을 만들어줘요.",
  "    // 처음으로 제약을 만족하는 배열이 곧 답 — 재귀 없이 반복문으로.",
  "    vector<string> answer;",
  "    do {",
  "        if (is_valid(cows)) { answer = cows; break; }",
  "    } while (next_permutation(cows.begin(), cows.end()));",
  "",
  "    for (int i = 0; i < (int)answer.size(); i++) {",
  "        fout << answer[i] << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getLivestockSections(E) {
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
        t(E, "getline + stringstream splits a sentence into words just like Python's split().",
            "getline + stringstream으로 문장을 Python의 split()처럼 단어 단위로 분리."),
        t(E, "map<string, vector<string>> adj stores neighbors keyed by cow name.",
            "map<string, vector<string>> adj으로 소 이름을 키로 이웃 목록 저장."),
      ],
    },
  ];
}

export function LivestockProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadLivestockPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Livestock — Full Study Guide", "Livestock — 종합 풀이 노트");
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

