import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   PresentsSim — stack with queries, find target then pop
   ═══════════════════════════════════════════════════════════════ */
const _PR_PRESETS = [
  { stack: [3, 1, 4, 2], queries: [4, 2] },
  { stack: [5, 3, 1, 4, 2], queries: [1, 2, 3] },
  { stack: [10, 20, 30], queries: [30, 20, 10] },
];

export function PresentsSim({ E }) {
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const preset = _PR_PRESETS[pi];

  // For each query: 2 sub-steps (find + pop). So total = 2 * |queries|.
  const totalSteps = 2 * preset.queries.length;
  const cur = Math.min(si, totalSteps - 1);

  // Reconstruct stack at this step
  let stack = [...preset.stack];
  let qIdx = 0;
  const isFind = cur % 2 === 0;
  const fullQ = Math.floor(cur / 2);
  for (let q = 0; q < fullQ; q++) {
    const t = preset.queries[q];
    const idx = stack.indexOf(t);
    if (idx !== -1) stack.splice(idx, 1);
  }
  qIdx = fullQ;
  const target = preset.queries[qIdx];
  const targetIdx = stack.indexOf(target);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_PR_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setSi(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i+1}</button>
        ))}
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 11, color: C.dim, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, `Query ${qIdx + 1}/${preset.queries.length}: find ${target}`, `요청 ${qIdx + 1}/${preset.queries.length}: ${target} 찾기`)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", marginBottom: 12 }}>
        {stack.map((v, idx) => {
          const isTarget = v === target;
          const isAbove = idx < targetIdx;
          return (
            <div key={`${idx}-${v}`} style={{
              width: 80, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: isFind ? (isTarget ? "#dcfce7" : (isAbove ? "#fef3c7" : "#fff")) : (isTarget && cur % 2 === 1 ? "#fee2e2" : "#fff"),
              border: `1px solid ${isFind ? (isTarget ? "#16a34a" : (isAbove ? "#f59e0b" : "#e5e7eb")) : (isTarget && cur % 2 === 1 ? "#dc2626" : "#e5e7eb")}`,
              color: isFind ? (isTarget ? "#15803d" : (isAbove ? "#92400e" : C.text)) : C.text,
              opacity: !isFind && isTarget && cur % 2 === 1 ? 0.4 : 1,
              transition: "all .25s",
            }}>{v}</div>
          );
        })}
      </div>

      {/* Output card — just the answer for this query, large.  No prose. */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
        background: "#ede9fe", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "8px 14px", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span style={{ fontSize: 11, color: A, fontWeight: 700 }}>
          {t(E, "output", "출력")}
        </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: targetIdx >= 0 ? "#5b21b6" : "#dc2626" }}>
          {targetIdx >= 0 ? targetIdx : "✗"}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / {totalSteps}</span>
        <button onClick={() => setSi(Math.min(totalSteps - 1, cur + 1))} disabled={cur === totalSteps - 1} style={{
          background: cur === totalSteps - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === totalSteps - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === totalSteps - 1 ? "#b0b5c3" : "#fff", cursor: cur === totalSteps - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

export function PresentsRunner({ E }) {
  const [stackIn, setStackIn] = useState("3 1 4 2");
  const [queriesIn, setQueriesIn] = useState("4 2");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const alive = useRef(false);

  const run = () => {
    const stack = stackIn.trim().split(/\s+/).map(Number);
    const queries = queriesIn.trim().split(/\s+/).map(Number);
    if (stack.some(isNaN) || queries.some(isNaN)) {
      setResults([{ error: t(E, "Invalid input.", "입력이 올바르지 않아요.") }]);
      return;
    }
    setRunning(true); setResults([]);
    alive.current = true;
    const cur = [...stack];
    const out = [];
    let i = 0;
    const tick = () => {
      if (!alive.current || i >= queries.length) {
        setRunning(false);
        return;
      }
      const target = queries[i];
      const idx = cur.indexOf(target);
      if (idx >= 0) {
        out.push(`Q${i+1}: ${target} → ${idx}`);
        cur.splice(idx, 1);
      } else {
        out.push(`Q${i+1}: ${target} not found`);
      }
      setResults([...out]);
      i++;
      const delay = queries.length <= 10 ? 350 : 50;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 100);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: 14 }}>
      <input value={stackIn} onChange={e => setStackIn(e.target.value)} disabled={running} placeholder="stack (top first)"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 8, boxSizing: "border-box" }} />
      <input value={queriesIn} onChange={e => setQueriesIn(e.target.value)} disabled={running} placeholder="queries"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10, boxSizing: "border-box" }} />
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, marginBottom: 10, background: A, color: "#fff",
      }}>{running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run", "▶ 실행")}</button>
      {results.length > 0 && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
          {results.map((r, i) => (<div key={i}>{r.error ? <span style={{ color: "#dc2626" }}>{r.error}</span> : r}</div>))}
        </div>
      )}
    </div>
  );
}

/* Section 1: Input */
const PR_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "stack = list(map(int, input().split()))  # 0번 자리가 맨 위",
];
const PR_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<int> stack(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> stack[i];",
  "    }",
];

/* Section 2: Find target's position */
const PR_FIND_PY = [
  "for _ in range(Q):",
  "    target = int(input())",
  "    pos = stack.index(target)   # 맨 위부터 0 부터 센 위치",
  "    print(pos)                  # 위에 있는 선물 수 = pos",
];
const PR_FIND_CPP = [
  "    for (int q = 0; q < Q; q++) {",
  "        int target;",
  "        cin >> target;",
  "",
  "        int pos = 0;",
  "        while (stack[pos] != target) {        // 맨 위부터 하나씩 훑어요",
  "            pos++;",
  "        }",
  "        cout << pos << endl;",
];

/* Section 3: Remove target */
const PR_POP_PY = [
  "    del stack[:pos + 1]        # target 과 그 위 모두 영영 사라져요",
];
const PR_POP_CPP = [
  "        stack.erase(stack.begin(), stack.begin() + pos + 1);  // target 과 그 위가 사라져요",
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
  "    del stack[:pos + 1]  # target 과 그 위에 있는 것 모두 영영 사라져요",
];
const PR_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<int> stack(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> stack[i];",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int target;",
  "        cin >> target;",
  "        int pos = 0;",
  "        while (stack[pos] != target) {",
  "            pos++;",
  "        }",
  "        cout << pos << endl;",
  "        stack.erase(stack.begin(), stack.begin() + pos + 1);",
  "    }",
  "    return 0;",
  "}",
];

export function getPresentsSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Stack Setup", "📦 1. 입력 받고 스택 만들기"),
      color: A,
      py: PR_INPUT_PY, cpp: PR_INPUT_CPP,
      why: [
        t(E, "Store the stack as an array. Index 0 is the top of the pile.",
            "스택을 리스트 하나에 담아요. 0번 자리가 더미 맨 위예요."),
        t(E, "N, Q ≤ a few thousand → simple array works in time.",
            "N 과 Q 가 수천 정도예요. 단순한 리스트로도 시간 안에 끝나요."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) reads a row of integers cleanly.",
            "list(map(int, input().split())) 로 정수 한 줄을 깔끔하게 읽어요."),
      ],
      cppOnly: [
        t(E, "vector<int> supports both indexed access and element removal.",
            "vector<int> 는 자리로 꺼내기와 원소 지우기를 둘 다 해 줘요."),
      ],
    },
    {
      label: t(E, "🔎 2. Find Target's Position", "🔎 2. 찾는 선물의 위치 구하기"),
      color: "#0891b2",
      py: PR_FIND_PY, cpp: PR_FIND_CPP,
      why: [
        t(E, "Scan from the top. The first index where stack[i] == target tells us how many presents are above.",
            "맨 위부터 하나씩 봐요. stack[i] == target 이 되는 첫 자리 번호가 위에 쌓인 선물 수예요."),
        t(E, "Print pos directly — it equals the number of presents that must be removed.",
            "pos 를 그대로 출력해요. 치워야 할 선물 수와 같으니까요."),
      ],
      pyOnly: [
        t(E, "list.index(value) returns the first matching index — perfect for this.",
            "list.index(value) 는 처음 만난 자리 번호를 돌려줘요. 딱 맞아요."),
      ],
      cppOnly: [
        t(E, "Manual while loop is fine. find() with iterators also works.",
            "while 반복으로 직접 세도 충분해요. 반복자와 find() 를 써도 돼요."),
      ],
    },
    {
      label: t(E, "🗑️ 3. Remove Target", "🗑️ 3. 찾은 선물 치우기"),
      color: "#16a34a",
      py: PR_POP_PY, cpp: PR_POP_CPP,
      why: [
        t(E, "Once handed over, the present is gone. Remaining presents keep their original order.",
            "건네준 선물은 사라져요. 남은 선물은 순서가 그대로예요."),
        t(E, "Total work is O(N·Q) — fine within Bronze constraints.",
            "전체 계산량은 O(N·Q) 예요. Bronze 조건 안에서는 넉넉해요."),
      ],
      pyOnly: [
        t(E, "list.pop(i) removes and returns element at i, shifting the rest.",
            "list.pop(i) 는 i 번째 원소를 빼서 돌려주고, 뒤쪽을 앞으로 당겨요."),
      ],
      cppOnly: [
        t(E, "vector::erase(begin + pos) shifts elements left — same idea as Python pop.",
            "vector::erase(begin + pos) 도 Python 의 pop 처럼 원소를 왼쪽으로 당겨요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: PR_FULL_PY, cpp: PR_FULL_CPP,
      why: [
        t(E, "Loop Q times. Each iteration: read target → find pos → print → remove.",
            "Q 번 반복해요. 한 번마다 target 을 읽고, pos 를 찾고, 출력하고, 치워요."),
        t(E, "Direct simulation — easy to write and debug.",
            "문제 그대로 따라 하는 방법이라 짜기도 고치기도 쉬워요."),
      ],
      pyOnly: [
        t(E, "Python lists are fast enough; .index + .pop is the most readable approach.",
            "Python 리스트는 충분히 빨라요. .index 와 .pop 이 가장 읽기 좋아요."),
      ],
      cppOnly: [
        t(E, "Plain cin/cout — N, Q ≤ a few thousand so no fast I/O needed.",
            "N 과 Q 가 수천 정도예요. 빠른 입출력 없이 cin/cout 으로 충분해요."),
      ],
    },
  ];
}

export function PresentsProgressiveCode(props) {
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

export function downloadPresentsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Feb Bronze · ${t(E, "Self-contained walkthrough", "혼자 공부할 수 있는 풀이")}</div>
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
