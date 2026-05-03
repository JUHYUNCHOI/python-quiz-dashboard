import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* Section 1: Input */
const PR_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "stack = list(map(int, input().split()))  # index 0 = top",
];
const PR_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<int> stack(N);",
  "    for (int i = 0; i < N; i++) cin >> stack[i];",
];

/* Section 2: Find target's position */
const PR_FIND_PY = [
  "for _ in range(Q):",
  "    target = int(input())",
  "    pos = stack.index(target)   # 0-based position from top",
  "    print(pos)                  # presents above = pos",
];
const PR_FIND_CPP = [
  "    while (Q--) {",
  "        int target;",
  "        cin >> target;",
  "",
  "        int pos = 0;",
  "        while (stack[pos] != target) pos++;   // linear scan from top",
  "        cout << pos << '\\n';",
];

/* Section 3: Remove target */
const PR_POP_PY = [
  "    stack.pop(pos)              # target taken out, others stay in order",
];
const PR_POP_CPP = [
  "        stack.erase(stack.begin() + pos);     // remove target, keep order",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: Full code */
const PR_FULL_PY = [
  "N, Q = map(int, input().split())",
  "stack = list(map(int, input().split()))",
  "",
  "for _ in range(Q):",
  "    target = int(input())",
  "    pos = stack.index(target)",
  "    print(pos)",
  "    stack.pop(pos)",
];
const PR_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<int> stack(N);",
  "    for (int i = 0; i < N; i++) cin >> stack[i];",
  "",
  "    while (Q--) {",
  "        int target;",
  "        cin >> target;",
  "        int pos = 0;",
  "        while (stack[pos] != target) pos++;",
  "        cout << pos << '\\n';",
  "        stack.erase(stack.begin() + pos);",
  "    }",
  "    return 0;",
  "}",
];

export function getPresentsSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Stack Setup", "📦 1. 입력 + 스택 셋업"),
      color: A,
      py: PR_INPUT_PY, cpp: PR_INPUT_CPP,
      why: [
        t(E, "Store the stack as an array. Index 0 is the top of the pile.",
            "스택을 배열로 저장. 인덱스 0이 더미 맨 위."),
        t(E, "N, Q ≤ a few thousand → simple array works in time.",
            "N, Q가 수천 정도라 단순 배열로 시간 통과."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) reads a row of integers cleanly.",
            "list(map(int, input().split()))로 정수 한 줄 깔끔하게 읽기."),
      ],
      cppOnly: [
        t(E, "vector<int> supports both indexed access and element removal.",
            "vector<int>는 인덱스 접근과 원소 제거 모두 지원."),
      ],
    },
    {
      label: t(E, "🔎 2. Find Target's Position", "🔎 2. 타깃 위치 찾기"),
      color: "#0891b2",
      py: PR_FIND_PY, cpp: PR_FIND_CPP,
      why: [
        t(E, "Scan from the top. The first index where stack[i] == target tells us how many presents are above.",
            "맨 위부터 스캔. stack[i] == target인 첫 인덱스가 위에 있는 개수."),
        t(E, "Print pos directly — it equals the number of presents that must be removed.",
            "pos를 그대로 출력 — 제거해야 할 선물 수와 동일."),
      ],
      pyOnly: [
        t(E, "list.index(value) returns the first matching index — perfect for this.",
            "list.index(value)가 첫 매칭 인덱스 반환 — 딱 맞음."),
      ],
      cppOnly: [
        t(E, "Manual while loop is fine. find() with iterators also works.",
            "수동 while 루프로 충분. 반복자 + find()도 가능."),
      ],
    },
    {
      label: t(E, "🗑️ 3. Remove Target", "🗑️ 3. 타깃 제거"),
      color: "#16a34a",
      py: PR_POP_PY, cpp: PR_POP_CPP,
      why: [
        t(E, "Once handed over, the present is gone. Remaining presents keep their original order.",
            "건네주면 선물은 사라짐. 나머지는 원래 순서 유지."),
        t(E, "Total work is O(N·Q) — fine within Bronze constraints.",
            "총 작업은 O(N·Q) — Bronze 제약 안에서 충분."),
      ],
      pyOnly: [
        t(E, "list.pop(i) removes and returns element at i, shifting the rest.",
            "list.pop(i)는 i번째 원소 제거 후 반환, 뒤쪽 원소를 당김."),
      ],
      cppOnly: [
        t(E, "vector::erase(begin + pos) shifts elements left — same idea as Python pop.",
            "vector::erase(begin + pos)이 원소를 왼쪽으로 당김 — Python pop과 동일."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: PR_FULL_PY, cpp: PR_FULL_CPP,
      why: [
        t(E, "Loop Q times. Each iteration: read target → find pos → print → remove.",
            "Q번 반복. 매 반복: target 읽기 → pos 찾기 → 출력 → 제거."),
        t(E, "Direct simulation — easy to write and debug.",
            "직접 시뮬레이션 — 작성과 디버깅이 쉬움."),
      ],
      pyOnly: [
        t(E, "Python lists are fast enough; .index + .pop is the most readable approach.",
            "Python 리스트는 충분히 빠름; .index + .pop이 가장 읽기 좋음."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) trims input time when Q is high.",
            "Q가 많을 때 ios::sync_with_stdio(false)로 입력 시간 단축."),
      ],
    },
  ];
}

export function PresentsProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadPresentsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Stack of Presents — Full Study Guide", "🎁 Stack of Presents — 종합 풀이 노트");
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
<div class="sub">USACO 2025 Feb Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
