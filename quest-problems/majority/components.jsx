import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   MajoritySim — visualize distance-1 + distance-2 pair scan
   ═══════════════════════════════════════════════════════════════ */
const _MJ_PRESETS = [
  { name: "[1,2,2,2,3]", arr: [1,2,2,2,3] },     // 2 valid
  { name: "[3,2,3]",     arr: [3,2,3] },          // 3 valid (distance 2!)
  { name: "[1,2,3,1,2,3]", arr: [1,2,3,1,2,3] },  // -1
  { name: "[1,1,1,2,2,2]", arr: [1,1,1,2,2,2] },  // 1 2 valid
];

export function MajoritySim({ E }) {
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const arr = _MJ_PRESETS[pi].arr;
  // trace: at each i, check (i,i+1) AND (i,i+2). One step per i.
  const found = new Set();
  const trace = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const match1 = arr[i] === arr[i + 1];
    const match2 = i + 2 < arr.length && arr[i] === arr[i + 2];
    if (match1) found.add(arr[i]);
    if (match2) found.add(arr[i]);
    trace.push({ i, match1, match2, foundSoFar: new Set(found) });
  }
  trace.push({ i: -1, foundSoFar: new Set(found), done: true });
  const cur = Math.min(si, trace.length - 1);
  const step = trace[cur];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_MJ_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setSi(0); }} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
        {arr.map((v, idx) => {
          const isAnchor = idx === step.i;
          const isPair1  = idx === step.i + 1;
          const isPair2  = idx === step.i + 2;
          let bg = "#fff", border = "#e5e7eb", color = C.text;
          if (isAnchor) { bg = "#fef3c7"; border = "#f59e0b"; color = "#92400e"; }
          if (isPair1) {
            if (step.match1) { bg = "#dcfce7"; border = "#16a34a"; color = "#15803d"; }
            else             { bg = "#fee2e2"; border = "#fca5a5"; color = "#991b1b"; }
          }
          if (isPair2) {
            if (step.match2) { bg = "#dbeafe"; border = "#3b82f6"; color = "#1e3a8a"; }
            else             { bg = "#fef2f2"; border = "#fecaca"; color = "#991b1b"; }
          }
          return (
            <div key={idx} style={{
              width: 38, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: bg, border: `1.5px solid ${border}`, color, transition: "all .2s",
            }}>{v}</div>
          );
        })}
      </div>

      <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginBottom: 10 }}>
        {t(E, "🟡 anchor   🟢 dist-1 match   🔵 dist-2 match",
              "🟡 기준   🟢 거리-1 일치   🔵 거리-2 일치")}
      </div>

      <div style={{
        background: step.done ? (step.foundSoFar.size > 0 ? "#dcfce7" : "#fef2f2") : "#fff",
        border: `1.5px solid ${step.done ? (step.foundSoFar.size > 0 ? "#86efac" : "#fca5a5") : C.border}`,
        borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 13, color: C.text, textAlign: "center",
      }}>
        {step.done ? (
          step.foundSoFar.size > 0 ? (
            <div>
              <div style={{ fontWeight: 600, color: "#15803d" }}>{t(E, "✅ Done. Output:", "✅ 완료. 출력:")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#15803d", fontWeight: 600, marginTop: 4 }}>
                {[...step.foundSoFar].sort((a,b) => a-b).join(" ")}
              </div>
            </div>
          ) : (
            <div style={{ color: "#7f1d1d", fontWeight: 600 }}>{t(E, "❌ No close pair → output -1", "❌ 가까운 쌍 없음 → -1 출력")}</div>
          )
        ) : (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {`i = ${step.i}:  (${arr[step.i]}, ${arr[step.i + 1]}) ${step.match1 ? "✓" : "✗"}  ·  ${arr[step.i + 2] !== undefined ? `(${arr[step.i]}, ${arr[step.i + 2]}) ${step.match2 ? "✓" : "✗"}` : "—"}`}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              {t(E, `Found so far: {${[...step.foundSoFar].sort((a,b)=>a-b).join(", ")}}`,
                    `지금까지 찾은 값: {${[...step.foundSoFar].sort((a,b)=>a-b).join(", ")}}`)}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / {trace.length}</span>
        <button onClick={() => setSi(Math.min(trace.length - 1, cur + 1))} disabled={cur === trace.length - 1} style={{
          background: cur === trace.length - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === trace.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === trace.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === trace.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* MajorityRunner — input array, see live scan */
export function MajorityRunner({ E }) {
  const [input, setInput] = useState("1 2 2 2 3");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [liveI, setLiveI] = useState(-1);
  const [liveFound, setLiveFound] = useState([]);
  const alive = useRef(false);

  const run = () => {
    const arr = input.trim().split(/\s+/).map(Number);
    if (arr.some(isNaN) || arr.length < 2) {
      setResult({ error: t(E, "Invalid: enter integers, at least 2.", "잘못된 입력: 정수 2개 이상.") });
      return;
    }
    setRunning(true); setResult(null); setLiveI(-1); setLiveFound([]);
    alive.current = true;
    const found = new Set();
    let i = 0;
    const tick = () => {
      if (!alive.current) { setRunning(false); return; }
      if (i >= arr.length - 1) {
        const sorted = [...found].sort((a,b) => a-b);
        setResult({ done: true, found: sorted });
        setRunning(false);
        return;
      }
      if (arr[i] === arr[i + 1]) found.add(arr[i]);
      if (i + 2 < arr.length && arr[i] === arr[i + 2]) found.add(arr[i]);
      setLiveI(i); setLiveFound([...found].sort((a,b)=>a-b));
      i++;
      const delay = arr.length <= 20 ? 250 : 30;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 100);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: 14 }}>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={running} placeholder="space-separated array"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10, boxSizing: "border-box" }} />
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>{running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run scan", "▶ 스캔 실행")}</button>
      {(running || result?.done) && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
          <div>i = {liveI}, found = {`{${liveFound.join(", ")}}`}</div>
        </div>
      )}
      {result?.error && (<div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>{result.error}</div>)}
      {result?.done && (
        <div style={{ background: result.found.length > 0 ? "#dcfce7" : "#fef2f2", border: `1px solid ${result.found.length > 0 ? "#16a34a" : "#dc2626"}`, borderRadius: 10, padding: "10px 12px", color: result.found.length > 0 ? "#15803d" : "#7f1d1d", fontSize: 13, fontWeight: 600 }}>
          {result.found.length > 0 ? `✅ ${result.found.join(", ")}` : "❌ -1"}
        </div>
      )}
    </div>
  );
}

/* Section 1: read T cases + per-case input */
const MJ_INPUT_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1     # number of test cases",
  "",
  "for _ in range(T):",
  "    N = int(data[idx])",
  "    idx += 1",
  "    a = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
];
const MJ_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        vector<int> a(N);",
  "        for (int i = 0; i < N; i++) cin >> a[i];",
];

/* Section 2: pair scan at distance 1 AND 2 */
const MJ_SCAN_PY = [
  "    valid = set()",
  "    for i in range(N - 1):",
  "        if a[i] == a[i + 1]:                  # distance 1",
  "            valid.add(a[i])",
  "        if i + 2 < N and a[i] == a[i + 2]:    # distance 2",
  "            valid.add(a[i])",
];
const MJ_SCAN_CPP = [
  "        set<int> valid;",
  "        for (int i = 0; i + 1 < N; i++) {",
  "            if (a[i] == a[i + 1]) valid.insert(a[i]);             // distance 1",
  "            if (i + 2 < N && a[i] == a[i + 2]) valid.insert(a[i]); // distance 2",
  "        }",
];

/* Section 3: emit sorted output (or -1) per case */
const MJ_OUT_PY = [
  "    if not valid:",
  "        print(-1)",
  "    else:",
  "        print(' '.join(str(x) for x in sorted(valid)))",
];
const MJ_OUT_CPP = [
  "        if (valid.empty()) cout << -1 << '\\n';",
  "        else {",
  "            bool first = true;",
  "            for (int x : valid) {                                  // set is sorted",
  "                if (!first) cout << ' ';",
  "                cout << x;",
  "                first = false;",
  "            }",
  "            cout << '\\n';",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const MJ_FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx])",
  "idx += 1",
  "",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx])",
  "    idx += 1",
  "    a = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
  "",
  "    valid = set()",
  "    for i in range(N - 1):",
  "        if a[i] == a[i + 1]:",
  "            valid.add(a[i])",
  "        if i + 2 < N and a[i] == a[i + 2]:",
  "            valid.add(a[i])",
  "",
  "    if not valid:",
  "        out.append('-1')",
  "    else:",
  "        out.append(' '.join(str(x) for x in sorted(valid)))",
  "",
  "print(chr(10).join(out))",
];
const MJ_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        vector<int> a(N);",
  "        for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "        set<int> valid;",
  "        for (int i = 0; i + 1 < N; i++) {",
  "            if (a[i] == a[i + 1]) valid.insert(a[i]);",
  "            if (i + 2 < N && a[i] == a[i + 2]) valid.insert(a[i]);",
  "        }",
  "",
  "        if (valid.empty()) cout << -1 << '\\n';",
  "        else {",
  "            bool first = true;",
  "            for (int x : valid) {",
  "                if (!first) cout << ' ';",
  "                cout << x;",
  "                first = false;",
  "            }",
  "            cout << '\\n';",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getMajoritySections(E) {
  return [
    {
      label: t(E, "📦 1. Read T cases + per-case input", "📦 1. T 케이스 + 케이스별 입력"),
      color: A,
      py: MJ_INPUT_PY, cpp: MJ_INPUT_CPP,
      why: [
        t(E, "First line: T (number of test cases). For each case: N then N preferences.",
            "첫 줄: T (테스트 수). 각 케이스: N 줄과 선호도 N개."),
        t(E, "Reading everything via sys.stdin.read().split() avoids per-line parsing overhead and handles values that are space-OR-newline separated.",
            "sys.stdin.read().split() 로 한 번에 읽으면 줄 단위 파싱 오버헤드 없고 공백/줄바꿈 다 처리."),
      ],
      pyOnly: [
        t(E, "Index pointer `idx` walks through the token list one at a time.",
            "포인터 `idx` 가 토큰 리스트를 하나씩 진행."),
      ],
      cppOnly: [
        t(E, "vector<int> a(N) sized exactly to N keeps memory tight.",
            "vector<int> a(N)로 메모리 정확하게."),
      ],
    },
    {
      label: t(E, "🔎 2. Pair Scan (distance 1 + 2)", "🔎 2. 쌍 스캔 (거리 1 + 2)"),
      color: "#0891b2",
      py: MJ_SCAN_PY, cpp: MJ_SCAN_CPP,
      why: [
        t(E, "Editorial fact: a type x is achievable iff some pair of cows at distance 1 OR distance 2 both like x.",
            "Editorial 핵심: 어떤 타입 x 가 가능 ↔ 거리 1 또는 거리 2 의 두 소가 둘 다 x 를 좋아함."),
        t(E, "Why distance 2? Cows at i and i+2 with cow i+1 between → focus group of 3 → cow i+1 switches to that type.",
            "왜 거리 2? i 와 i+2 두 소 사이에 i+1 → 3 명 포커스 그룹 → 가운데 소가 그 타입으로 바뀜."),
      ],
      pyOnly: [
        t(E, "set() automatically dedupes — adding the same value twice is harmless.",
            "set()이 자동 중복 제거 — 같은 값 두 번 add 해도 괜찮음."),
      ],
      cppOnly: [
        t(E, "set<int> dedupes AND keeps sorted order — perfect for this output format.",
            "set<int>이 중복 제거 + 정렬 유지 — 출력 형식에 딱 맞음."),
      ],
    },
    {
      label: t(E, "🖨️ 3. Print Sorted (or -1)", "🖨️ 3. 정렬 출력 (또는 -1)"),
      color: "#16a34a",
      py: MJ_OUT_PY, cpp: MJ_OUT_CPP,
      why: [
        t(E, "If no near-pair was found for this case, print -1.",
            "이 케이스에서 가까운 쌍을 못 찾으면 -1 출력."),
        t(E, "Otherwise print the valid hay types in ascending order, separated by spaces (one line per case).",
            "있으면 가능한 건초 종류를 오름차순으로 공백 구분 한 줄 (케이스마다 한 줄)."),
      ],
      pyOnly: [
        t(E, "sorted(result) yields the values in order without mutating the set.",
            "sorted(result)로 set 변경 없이 정렬 값 얻기."),
      ],
      cppOnly: [
        t(E, "Range-for over set<int> already iterates in sorted order.",
            "set<int>의 range-for은 이미 정렬 순서로 순회."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: MJ_FULL_PY, cpp: MJ_FULL_CPP,
      why: [
        t(E, "Single O(N) pass — extremely efficient for the constraints.",
            "단일 O(N) 패스 — 제약 조건에 매우 효율적."),
      ],
    },
  ];
}

export function MajorityProgressiveCode(props) {
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

export function downloadMajorityPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Majority Opinion — Full Study Guide", "🗳️ Majority Opinion — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Jan Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
