import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ─────────────────────────────────────────────────────────────
   Deep-Audit Sim — try a[0] = 1, 2, …, N. For each candidate,
   chain a[i+1] = b[i] − a[i], then audit: is the result a valid
   permutation of {1..N}? Stop at the first SMALLEST a[0] that
   passes. Demo: N=4, b=[3,4,7] → a[0]=1 fails, a[0]=2 succeeds.
   ───────────────────────────────────────────────────────────── */
export function Photo20AuditSim({ E }) {
  // Fixed demo so kids can step through deterministically.
  const N = 4;
  const b = [3, 4, 7];

  // Build all candidate chains in advance.
  const candidates = [];
  for (let a0 = 1; a0 <= N; a0++) {
    const a = [a0];
    for (let i = 0; i < N - 1; i++) a.push(b[i] - a[a.length - 1]);
    const sorted = [...a].sort((x, y) => x - y);
    let valid = sorted.length === N;
    for (let i = 0; i < N && valid; i++) if (sorted[i] !== i + 1) valid = false;
    candidates.push({ a0, a, valid });
  }

  // step counts how many candidates we've tried (0..N). After step k we
  // know the result of the first k candidates. Find the winner index.
  const winnerIdx = candidates.findIndex(c => c.valid);
  const maxStep = winnerIdx >= 0 ? winnerIdx + 1 : N;
  const [step, setStep] = useState(0);

  const tried = candidates.slice(0, step);
  const cur = step > 0 ? candidates[step - 1] : null;

  const reset = () => setStep(0);
  const nextStep = () => setStep(s => Math.min(maxStep, s + 1));

  // Range check helper: each a[i] must be in 1..N.
  const isInRange = (v) => v >= 1 && v <= N;
  const seenDup = (arr, idx) => arr.slice(0, idx).includes(arr[idx]);

  const cellBox = (label, value, color) => (
    <div style={{
      background: "#fff", border: `1.5px solid ${color}`, borderRadius: 8,
      padding: "6px 10px", textAlign: "center", minWidth: 64,
    }}>
      <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  );

  const renderChain = (cand) => {
    const arr = cand.a;
    return (
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
        {arr.map((v, i) => {
          const inRange = isInRange(v);
          const dup = inRange && seenDup(arr, i);
          const bad = !inRange || dup;
          return (
            <div key={i} style={{
              width: 50, height: 56,
              background: bad ? "#fee2e2" : "#dbeafe",
              border: `2px solid ${bad ? "#ef4444" : A}`,
              borderRadius: 8,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              transition: "all 180ms ease",
            }}>
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>a[{i}]</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: bad ? "#b91c1c" : "#1e3a8a" }}>{v}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Build a human-readable audit line for the current candidate.
  const auditLine = (cand) => {
    if (!cand) return null;
    if (cand.valid) {
      return t(E,
        `a[0] = ${cand.a0} ✓ chain = [${cand.a.join(", ")}] is a valid permutation of 1..${N}. WINNER!`,
        `a[0] = ${cand.a0} ✓ 사슬 = [${cand.a.join(", ")}] 는 1..${N} 의 유효한 순열. 정답!`);
    }
    const arr = cand.a;
    let badIdx = -1;
    let reason = "";
    for (let i = 0; i < arr.length; i++) {
      if (!isInRange(arr[i])) { badIdx = i; reason = "oob"; break; }
      if (seenDup(arr, i)) { badIdx = i; reason = "dup"; break; }
    }
    if (reason === "oob") {
      return t(E,
        `a[0] = ${cand.a0} → a[${badIdx}] = ${arr[badIdx]} is outside 1..${N}. Reject, try next.`,
        `a[0] = ${cand.a0} → a[${badIdx}] = ${arr[badIdx]} 는 1..${N} 범위 밖. 탈락, 다음 시도.`);
    }
    if (reason === "dup") {
      return t(E,
        `a[0] = ${cand.a0} → a[${badIdx}] = ${arr[badIdx]} duplicates an earlier value. Reject, try next.`,
        `a[0] = ${cand.a0} → a[${badIdx}] = ${arr[badIdx]} 는 앞에 이미 등장한 값. 탈락, 다음 시도.`);
    }
    return t(E,
      `a[0] = ${cand.a0} → chain not a permutation of 1..${N}. Reject.`,
      `a[0] = ${cand.a0} → 1..${N} 의 순열 아님. 탈락.`);
  };

  return (
    <div style={{
      background: "#eff6ff", border: `1.5px solid ${A}`, borderRadius: 12,
      padding: 14, marginBottom: 10,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 10, textAlign: "center" }}>
        🔍 {t(E, "Deep-Audit Sim", "꼼꼼 검증 시뮬")}
      </div>

      {/* Given input */}
      <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 10px", marginBottom: 10, textAlign: "center", fontSize: 12, color: "#1e3a8a" }}>
        {t(E, "Given", "주어진 값")}: <b>N = {N}</b>, <b>b = [{b.join(", ")}]</b>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
          {t(E, "Try a[0] = 1, 2, … and chain a[i+1] = b[i] − a[i].",
              "a[0] = 1, 2, … 를 시도하고, a[i+1] = b[i] − a[i] 로 사슬을 이어요.")}
        </div>
      </div>

      {/* Current candidate */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          {cur
            ? t(E, `Trying a[0] = ${cur.a0}`, `시도 중: a[0] = ${cur.a0}`)
            : t(E, "Press NEXT to start auditing.", "다음을 눌러 검증을 시작.")}
        </div>
        {cur && renderChain(cur)}
      </div>

      {/* Counters */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        {cellBox(t(E, "tried", "시도"), `${step}/${N}`, "#7c3aed")}
        {cellBox(t(E, "winner a[0]", "정답 a[0]"), winnerIdx >= 0 && step > winnerIdx ? candidates[winnerIdx].a0 : "?", A)}
      </div>

      {/* Audit log */}
      <div style={{
        background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8,
        padding: "8px 10px", fontSize: 12, color: "#1e3a8a", minHeight: 36,
        textAlign: "center", lineHeight: 1.5,
      }}>
        {!cur && t(E,
          "Each candidate gets audited: in-range? duplicates? sorted = 1..N?",
          "후보마다 검증해요: 범위 안인가? 중복 있나? 정렬하면 1..N 인가?")}
        {cur && auditLine(cur)}
      </div>

      {/* Tried list (history) */}
      {tried.length > 1 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
          {tried.slice(0, -1).map((c) => (
            <div key={c.a0} style={{
              background: "#fff", border: `1px solid ${c.valid ? "#86efac" : "#fca5a5"}`,
              borderRadius: 6, padding: "3px 8px", fontSize: 11, color: c.valid ? "#15803d" : "#b91c1c",
              fontWeight: 700,
            }}>
              {c.valid ? "✓" : "✗"} a[0]={c.a0}
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
        <button onClick={nextStep} disabled={step >= maxStep} style={{
          background: step >= maxStep ? "#bfdbfe" : A,
          color: "#fff", border: "none", borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800,
          cursor: step >= maxStep ? "default" : "pointer",
        }}>{t(E, "Next ▶", "다음 ▶")}</button>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>{t(E, "↺ Reset", "↺ 처음으로")}</button>
      </div>

      {step >= maxStep && winnerIdx >= 0 && (
        <div style={{
          marginTop: 10, padding: "8px 12px", background: "#dcfce7",
          border: "1.5px solid #86efac", borderRadius: 8, textAlign: "center",
          fontSize: 13, fontWeight: 700, color: "#15803d",
        }}>
          ✅ {t(E,
            `Lex-smallest answer: a = [${candidates[winnerIdx].a.join(", ")}].`,
            `사전순 최소 정답: a = [${candidates[winnerIdx].a.join(", ")}].`)}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "b = list(map(int, input().split()))",
  "",
  "for a0 in range(1, N + 1):",
  "    a = [a0]",
  "    valid = True",
  "    for i in range(N - 1):",
  "        a_next = b[i] - a[-1]",
  "        a.append(a_next)",
  "    # Check if valid permutation of 1..N",
  "    if sorted(a) == list(range(1, N + 1)):",
  "        print(' '.join(map(str, a)))",
  "        break",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<int> b(N - 1);",
  "    for (auto& x : b) cin >> x;",
  "    for (int a0 = 1; a0 <= N; a0++) {",
  "        vector<int> a = {a0};",
  "        for (int i = 0; i + 1 < N; i++) a.push_back(b[i] - a.back());",
  "        vector<int> sorted_a = a;",
  "        sort(sorted_a.begin(), sorted_a.end());",
  "        bool ok = true;",
  "        for (int i = 0; i < N; i++) if (sorted_a[i] != i + 1) { ok = false; break; }",
  "        if (ok) {",
  "            for (int i = 0; i < N; i++) cout << a[i] << \" \n\"[i == N - 1];",
  "            return 0;",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getPhoto20Sections(E) {
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

export function Photo20ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadPhoto20PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photo20 — Full Study Guide", "Photo20 — 종합 풀이 노트");
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

