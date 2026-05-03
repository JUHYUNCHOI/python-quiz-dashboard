import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#0284c7";

/* Section 1: Read N, Q + words */
const LM_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "words = input().split()   # ['true','and','false','or',...]",
];
const LM_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<string> words(N);",
  "    for (int i = 0; i < N; i++) cin >> words[i];",
];

/* Section 2: evaluate function (and binds tighter than or) */
const LM_EVAL_PY = [
  "def evaluate(tokens):",
  "    # Group consecutive 'and' chains, then OR them together",
  "    cur = (tokens[0] == 'true')",
  "    or_groups = [cur]",
  "    i = 1",
  "    while i < len(tokens):",
  "        op  = tokens[i]",
  "        val = (tokens[i+1] == 'true')",
  "        if op == 'and':",
  "            or_groups[-1] = or_groups[-1] and val",
  "        else:   # 'or' starts a new chain",
  "            or_groups.append(val)",
  "        i += 2",
  "    return any(or_groups)",
];
const LM_EVAL_CPP = [
  "    auto evaluate = [&](const vector<string>& tk) {",
  "        bool result = false;",
  "        bool group = (tk[0] == \"true\");",
  "        for (size_t i = 1; i < tk.size(); i += 2) {",
  "            bool v = (tk[i+1] == \"true\");",
  "            if (tk[i] == \"and\") group = group && v;",
  "            else { result = result || group; group = v; }",
  "        }",
  "        return result || group;",
  "    };",
];

/* Section 3: process queries */
const LM_QUERY_PY = [
  "out = []",
  "for _ in range(Q):",
  "    parts = input().split()",
  "    l, r = int(parts[0]) - 1, int(parts[1]) - 1",
  "    target = (parts[2] == 'true')",
  "",
  "    ok = False",
  "    for rep in ('true', 'false'):",
  "        new_tokens = words[:l] + [rep] + words[r+1:]",
  "        if evaluate(new_tokens) == target:",
  "            ok = True",
  "            break",
  "    out.append('Y' if ok else 'N')",
  "",
  "print(''.join(out))",
];
const LM_QUERY_CPP = [
  "    string out;",
  "    while (Q--) {",
  "        int l, r;",
  "        string tgt;",
  "        cin >> l >> r >> tgt;",
  "        l--; r--;",
  "        bool target = (tgt == \"true\");",
  "",
  "        bool ok = false;",
  "        for (string rep : {string(\"true\"), string(\"false\")}) {",
  "            vector<string> nt;",
  "            nt.reserve(N);",
  "            for (int i = 0; i < l; i++) nt.push_back(words[i]);",
  "            nt.push_back(rep);",
  "            for (int i = r + 1; i < N; i++) nt.push_back(words[i]);",
  "            if (evaluate(nt) == target) { ok = true; break; }",
  "        }",
  "        out += (ok ? 'Y' : 'N');",
  "    }",
  "    cout << out << '\\n';",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const LM_FULL_PY = [
  "N, Q = map(int, input().split())",
  "words = input().split()",
  "",
  "def evaluate(tokens):",
  "    cur = (tokens[0] == 'true')",
  "    groups = [cur]",
  "    i = 1",
  "    while i < len(tokens):",
  "        v = (tokens[i+1] == 'true')",
  "        if tokens[i] == 'and':",
  "            groups[-1] = groups[-1] and v",
  "        else:",
  "            groups.append(v)",
  "        i += 2",
  "    return any(groups)",
  "",
  "out = []",
  "for _ in range(Q):",
  "    parts = input().split()",
  "    l, r = int(parts[0]) - 1, int(parts[1]) - 1",
  "    target = (parts[2] == 'true')",
  "    ok = False",
  "    for rep in ('true', 'false'):",
  "        nt = words[:l] + [rep] + words[r+1:]",
  "        if evaluate(nt) == target:",
  "            ok = True; break",
  "    out.append('Y' if ok else 'N')",
  "print(''.join(out))",
];
const LM_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q; cin >> N >> Q;",
  "    vector<string> words(N);",
  "    for (int i = 0; i < N; i++) cin >> words[i];",
  "",
  "    auto evaluate = [&](const vector<string>& tk) {",
  "        bool result = false;",
  "        bool group = (tk[0] == \"true\");",
  "        for (size_t i = 1; i < tk.size(); i += 2) {",
  "            bool v = (tk[i+1] == \"true\");",
  "            if (tk[i] == \"and\") group = group && v;",
  "            else { result = result || group; group = v; }",
  "        }",
  "        return result || group;",
  "    };",
  "",
  "    string out;",
  "    while (Q--) {",
  "        int l, r; string tgt; cin >> l >> r >> tgt;",
  "        l--; r--;",
  "        bool target = (tgt == \"true\");",
  "        bool ok = false;",
  "        for (string rep : {string(\"true\"), string(\"false\")}) {",
  "            vector<string> nt;",
  "            for (int i = 0; i < l; i++) nt.push_back(words[i]);",
  "            nt.push_back(rep);",
  "            for (int i = r + 1; i < N; i++) nt.push_back(words[i]);",
  "            if (evaluate(nt) == target) { ok = true; break; }",
  "        }",
  "        out += (ok ? 'Y' : 'N');",
  "    }",
  "    cout << out << '\\n';",
  "    return 0;",
  "}",
];

export function getLogicalMoosSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Words", "📦 1. 입력 + 토큰들"),
      color: A,
      py: LM_INPUT_PY, cpp: LM_INPUT_CPP,
      why: [
        t(E, "Read N tokens — they alternate value, op, value, op, ... (so length N is odd).",
            "N개 토큰 — 값, 연산자, 값, ... 교대 (길이 N은 홀수)."),
      ],
      pyOnly: [
        t(E, "input().split() splits on whitespace into a list of strings.",
            "input().split()이 공백으로 문자열 리스트로 분리."),
      ],
      cppOnly: [
        t(E, "vector<string> reads each token with cin >> word.",
            "vector<string>로 cin >> word로 토큰 읽기."),
      ],
    },
    {
      label: t(E, "🧮 2. Evaluate (and binds tighter than or)", "🧮 2. 평가 (and가 or보다 우선)"),
      color: "#0891b2",
      py: LM_EVAL_PY, cpp: LM_EVAL_CPP,
      why: [
        t(E, "Walk left-to-right. Keep a 'current AND-chain' value. On 'and': fold into chain. On 'or': start a new chain.",
            "좌→우 진행. 현재 AND-체인 값 유지. 'and'면 체인에 합치고, 'or'면 새 체인 시작."),
        t(E, "Final answer = OR of all chains.",
            "최종 답 = 모든 체인의 OR."),
      ],
      pyOnly: [
        t(E, "any(groups) does the final OR-reduction over the group list.",
            "any(groups)로 그룹 리스트 위 최종 OR."),
      ],
      cppOnly: [
        t(E, "A lambda capturing nothing is fine — pure function over its input.",
            "캡처 없는 람다 — 입력만 사용하는 순수 함수."),
      ],
    },
    {
      label: t(E, "❓ 3. Per-Query Try Both Replacements", "❓ 3. 쿼리마다 두 교체 시도"),
      color: "#16a34a",
      py: LM_QUERY_PY, cpp: LM_QUERY_CPP,
      why: [
        t(E, "We can replace words[l..r] with a SINGLE 'true' or 'false'. Try both — if either matches the target, answer Y.",
            "words[l..r]을 하나의 'true' 또는 'false'로 교체 가능. 두 가지 시도 — 하나라도 target과 같으면 Y."),
        t(E, "Build the new token list and re-evaluate. Total: O(Q · N).",
            "새 토큰 리스트를 만들고 재평가. 총: O(Q · N)."),
      ],
      pyOnly: [
        t(E, "Slicing words[:l] + [rep] + words[r+1:] is the cleanest way.",
            "슬라이싱 words[:l] + [rep] + words[r+1:]이 가장 깔끔."),
      ],
      cppOnly: [
        t(E, "Build via push_back — vector::insert is also fine but slower in tight loops.",
            "push_back으로 구성 — vector::insert도 가능하지만 반복문에선 느림."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: LM_FULL_PY, cpp: LM_FULL_CPP,
      why: [
        t(E, "Read input → define evaluate → loop Q queries → print Y/N string.",
            "입력 읽기 → evaluate 정의 → Q개 쿼리 루프 → Y/N 문자열 출력."),
        t(E, "Brute force is enough for Bronze constraints.",
            "Bronze 제약에는 완전탐색으로 충분."),
      ],
    },
  ];
}

export function LogicalMoosProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>💡 {t(E, "Why this way?", "왜 이렇게?")}</div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span><span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>{langLabel} {t(E, "specific:", "전용:")}</div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span><span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}><CodeBlock lines={code} /></div>
          </div>
        );
      })}
    </div>
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadLogicalMoosPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Logical Moos — Full Study Guide", "🧠 Logical Moos — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
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
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
