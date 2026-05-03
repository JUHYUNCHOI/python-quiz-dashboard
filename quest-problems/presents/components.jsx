import { useState, useRef } from "react";
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
            padding: "4px 10px", borderRadius: 8, border: `2px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i+1}</button>
        ))}
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 11, color: C.dim, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, `Query ${qIdx + 1}/${preset.queries.length}: find ${target}`, `쿼리 ${qIdx + 1}/${preset.queries.length}: ${target} 찾기`)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", marginBottom: 12 }}>
        {stack.map((v, idx) => {
          const isTarget = v === target;
          const isAbove = idx < targetIdx;
          return (
            <div key={`${idx}-${v}`} style={{
              width: 80, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
              background: isFind ? (isTarget ? "#dcfce7" : (isAbove ? "#fef3c7" : "#fff")) : (isTarget && cur % 2 === 1 ? "#fee2e2" : "#fff"),
              border: `2px solid ${isFind ? (isTarget ? "#16a34a" : (isAbove ? "#f59e0b" : "#e5e7eb")) : (isTarget && cur % 2 === 1 ? "#dc2626" : "#e5e7eb")}`,
              color: isFind ? (isTarget ? "#15803d" : (isAbove ? "#92400e" : C.text)) : C.text,
              opacity: !isFind && isTarget && cur % 2 === 1 ? 0.4 : 1,
              transition: "all .25s",
            }}>{v}</div>
          );
        })}
      </div>

      <div style={{ background: "#ede9fe", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6, textAlign: "center" }}>
        {isFind ? (
          targetIdx >= 0 ? (
            t(E, `Found ${target} at index ${targetIdx} → ${targetIdx} presents above must be removed.`,
                  `${target}을 인덱스 ${targetIdx}에서 찾음 → 위에 ${targetIdx}개 제거 필요.`)
          ) : t(E, "Not found?!", "못 찾음?!")
        ) : (
          t(E, `Output: ${targetIdx >= 0 ? targetIdx : "?"}. Then pop ${target} from stack.`,
                `출력: ${targetIdx >= 0 ? targetIdx : "?"}. ${target}을 스택에서 제거.`)
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / {totalSteps}</span>
        <button onClick={() => setSi(Math.min(totalSteps - 1, cur + 1))} disabled={cur === totalSteps - 1} style={{
          background: cur === totalSteps - 1 ? "#e5e7eb" : A, border: `2px solid ${cur === totalSteps - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800,
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
      setResults([{ error: t(E, "Invalid input.", "잘못된 입력.") }]);
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
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 8, boxSizing: "border-box" }} />
      <input value={queriesIn} onChange={e => setQueriesIn(e.target.value)} disabled={running} placeholder="queries"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10, boxSizing: "border-box" }} />
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 800, marginBottom: 10, background: A, color: "#fff",
      }}>{running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run", "▶ 실행")}</button>
      {results.length > 0 && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
          {results.map((r, i) => (<div key={i}>{r.error ? <span style={{ color: "#dc2626" }}>{r.error}</span> : r}</div>))}
        </div>
      )}
      <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
        <div style={{ fontWeight: 800, color: C.text, marginBottom: 4 }}>{t(E, "⏱ USACO Time Estimate", "⏱ USACO 시간 추정")}</div>
        <div>O(N · Q) — fine for Bronze sizes.</div>
      </div>
    </div>
  );
}

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
