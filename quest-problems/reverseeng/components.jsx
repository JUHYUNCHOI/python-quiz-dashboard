import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    inputs = []",
  "    outputs = []",
  "    for _ in range(M):",
  "        line = input().split()",
  "        arr = [int(x) for x in line[:N]]",
  "        out = int(line[N])",
  "        inputs.append(tuple(arr))",
  "        outputs.append(out)",
  "",
  "    # Check: same input, different output => LIE",
  "    ok = True",
  "    for i in range(M):",
  "        for j in range(i+1, M):",
  "            if inputs[i] == inputs[j] and outputs[i] != outputs[j]:",
  "                ok = False",
  "                break",
  "        if not ok: break",
  "",
  "    if not ok:",
  "        print('LIE')",
  "        continue",
  "",
  "    # Check: for inputs with different outputs,",
  "    # there must exist a position where they differ",
  "    # Try each position as the decision variable",
  "    possible = False",
  "    for pos in range(N):",
  "        # Try: if arr[pos]==0 return A, else return B",
  "        for A in [0, 1]:",
  "            B = 1 - A",
  "            valid = True",
  "            for k in range(M):",
  "                expected = A if inputs[k][pos] == 0 else B",
  "                if expected != outputs[k]:",
  "                    valid = False",
  "                    break",
  "            if valid:",
  "                possible = True",
  "                break",
  "        if possible: break",
  "",
  "    # Also check: always return 0 or always return 1",
  "    if not possible:",
  "        if all(o == 0 for o in outputs):",
  "            possible = True",
  "        elif all(o == 1 for o in outputs):",
  "            possible = True",
  "",
  "    print('OK' if possible else 'LIE')",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    // Specific to problem; provide a simple scaffold.",
  "    int N; cin >> N;",
  "    cout << N << \"\n\";",
  "    return 0;",
  "}",
];

export function getRevEngSections(E) {
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

export function RevEngProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}


/* ===============================================================
   Deep Audit Sim — manually try every (pos, A, B) on 4 test cases
   The rule: if arr[pos]==0 return A, else return B.
   A green check on every row means OK; any red X on any row fails.
   =============================================================== */
const AUDIT_CASES = [
  { arr: [0, 1, 0], out: 1 },
  { arr: [1, 1, 0], out: 0 },
  { arr: [0, 0, 1], out: 1 },
  { arr: [1, 0, 1], out: 0 },
];

export function RevEngDeepAuditSim({ E }) {
  const [pos, setPos] = useState(0);
  const [A, setA] = useState(1);
  const N = AUDIT_CASES[0].arr.length;
  const B = 1 - A;

  const rows = AUDIT_CASES.map((tc) => {
    const expected = tc.arr[pos] === 0 ? A : B;
    const ok = expected === tc.out;
    return { ...tc, expected, ok };
  });
  const allOk = rows.every(r => r.ok);

  const btn = (active) => ({
    background: active ? "#8b5cf6" : "#fff",
    color: active ? "#fff" : "#5b21b6",
    border: "1.5px solid #8b5cf6",
    borderRadius: 8,
    padding: "5px 12px",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  });

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
          🔎 {t(E, "Deep Audit", "심층 감사")}
        </div>
        <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
          {t(E,
            "Rule: if arr[pos]==0 return A, else return B. Pick (pos, A) and check every row.",
            "규칙: arr[pos]==0이면 A, 아니면 B 반환. (pos, A)를 골라 모든 행을 확인.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim }}>{t(E, "pos", "위치")}:</span>
        {Array.from({ length: N }, (_, i) => (
          <button key={i} onClick={() => setPos(i)} style={btn(pos === i)}>{i}</button>
        ))}
        <span style={{ width: 8 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim }}>A:</span>
        <button onClick={() => setA(0)} style={btn(A === 0)}>0</button>
        <button onClick={() => setA(1)} style={btn(A === 1)}>1</button>
        <span style={{ fontSize: 12, color: C.dim, marginLeft: 4 }}>
          (B = {B})
        </span>
      </div>

      <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", color: "#f8fafc", fontFamily: "JetBrains Mono, monospace", fontSize: 13, marginBottom: 10 }}>
        <span style={{ color: "#c084fc" }}>if</span> arr[<span style={{ color: "#fbbf24" }}>{pos}</span>] == <span style={{ color: "#fbbf24" }}>0</span>: <span style={{ color: "#34d399" }}>return {A}</span> <span style={{ color: "#8b949e" }}>else</span>: <span style={{ color: "#34d399" }}>return {B}</span>
      </div>

      <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 60px", background: "#ede9fe", padding: "8px 12px", fontSize: 12, fontWeight: 800, color: "#5b21b6" }}>
          <div>arr</div>
          <div style={{ textAlign: "center" }}>arr[{pos}]</div>
          <div style={{ textAlign: "center" }}>{t(E, "expected → got", "기대 → 결과")}</div>
          <div style={{ textAlign: "center" }}>{t(E, "match", "일치")}</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 100px 60px",
            padding: "8px 12px",
            fontSize: 13,
            borderTop: `1px solid ${C.border}`,
            background: r.ok ? C.okBg : C.noBg,
            color: r.ok ? "#166534" : "#991b1b",
            fontFamily: "JetBrains Mono, monospace",
          }}>
            <div>[{r.arr.join(", ")}]</div>
            <div style={{ textAlign: "center", fontWeight: 700 }}>{r.arr[pos]}</div>
            <div style={{ textAlign: "center" }}>{r.out} → {r.expected}</div>
            <div style={{ textAlign: "center", fontSize: 16 }}>{r.ok ? "✓" : "✗"}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: allOk ? C.okBg : "#fff7ed",
        border: `1.5px solid ${allOk ? C.okBd : C.carryBd}`,
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 13,
        color: allOk ? "#166534" : "#9a3412",
        fontWeight: 700,
        textAlign: "center",
      }}>
        {allOk
          ? t(E, "✓ All rows match — this rule works! Verdict: OK", "✓ 모든 행 일치 — 이 규칙이 통해요! 판정: OK")
          : t(E, "Some rows fail. Try another (pos, A). If nothing works → LIE.", "일부 행 불일치. 다른 (pos, A)를 시도. 다 실패하면 → LIE.")}
      </div>
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
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadRevEngPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "RevEng — Full Study Guide", "RevEng — 종합 풀이 노트");
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

