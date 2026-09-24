import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";
const KA = { wordBreak: "keep-all" };

// Concept sim: a table filled one row at a time, one row per box i.
// Row i = one loop iteration of the fast code (carry += A[i]-B[i]; ops += abs(carry)).
// 2026-09-24: rebuilt from a boundary-walk sim to a fill-the-table sim (teacher's
// hand-drawn spec) so this page and the ch2 code page count the exact same way —
// see components.jsx FULL_PY / getMcc21MarblesWalk for the code this table mirrors.
export function Mcc21MarblesBoundarySim({ E }) {
  const START = [2, 2, 2, 6, 3];   // A — official sample
  const TARGET = [1, 2, 3, 4, 5];  // B — official sample  → answer 4
  const N = START.length;
  const [step, setStep] = useState(0); // 0..N-1 — rows 0..step are filled in

  const diff = (i) => START[i] - TARGET[i];
  // carry after box i = sum_{k<=i} (A[k] - B[k])  — matches code var `carry`
  const carry = (i) => {
    let s = 0;
    for (let k = 0; k <= i; k++) s += diff(k);
    return s;
  };
  // running answer after box i (inclusive) = sum of |carry(k)| for k<=i
  const ansAt = (i) => {
    let total = 0;
    for (let k = 0; k <= i; k++) total += Math.abs(carry(k));
    return total;
  };

  const done = step >= N - 1;

  // 2026-09-24: one line per row explaining what this box did to the running
  // carry — this text lives INSIDE the new row, so "무엇이 바뀌나" and
  // "왜 바뀌나" sit in the same place (no separate floating message box).
  const meaningLine = (i) => {
    const prev = i === 0 ? 0 : carry(i - 1);
    const cur = carry(i);
    const dir = cur >= 0 ? `${i}→${i + 1}` : `${i + 1}→${i}`;
    if (cur === 0) {
      if (prev !== 0) {
        return E
          ? `The ${Math.abs(prev)} carried over covers this box's gap. No move needed.`
          : `넘어온 ${Math.abs(prev)}개로 부족분을 채워요. 이동 없음.`;
      }
      return E ? `This box balances on its own. Nothing crosses.`
               : `이 상자는 그대로 맞아요. 건너가는 것도 없어요.`;
    }
    const amt = Math.abs(cur);
    if (prev === 0) {
      return E ? `${amt} left over → ${amt} moves ${dir}.`
               : `${amt}개 남음 → ${dir}로 ${amt}개 이동.`;
    }
    if (prev === cur) {
      return E ? `The ${amt} carried over passes straight through ${dir}.`
               : `넘어온 ${amt}개가 그대로 ${dir}로 이동.`;
    }
    return E
      ? `${Math.abs(prev)} carried over, this box adds more → ${amt} moves ${dir}.`
      : `넘어온 ${Math.abs(prev)}개에 더해져 ${amt}개가 ${dir}로 이동.`;
  };

  const headers = [
    { ko: "i", en: "i" },
    { ko: "Aᵢ", en: "Aᵢ" },
    { ko: "Bᵢ", en: "Bᵢ" },
    { ko: "Aᵢ−Bᵢ", en: "Aᵢ−Bᵢ" },
    { ko: "이전 cur", en: "prev cur" },
    { ko: "새 cur", ko2: "(이전+차이)", en: "new cur", en2: "(prev+diff)" },
    { ko: "|cur|", en: "|cur|" },
    { ko: "ans", en: "ans" },
    { ko: "의미", en: "meaning" },
  ];
  const th = { padding: "5px 6px", fontSize: 9.5, color: "#7f1d1d", fontWeight: 700, borderBottom: "1.5px solid #fca5a5", whiteSpace: "nowrap" };
  const td = { padding: "6px 6px", fontSize: 11, color: C.text, fontFamily: "JetBrains Mono, monospace", textAlign: "center", borderBottom: "1px solid #fee2e2" };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "8px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5 }}>
          🔍 {t(E, "Fill the table, box by box", "표를 한 줄씩 채워요")}
        </div>
      </div>

      {/* Boxes — pure map: position + processed/not. Numbers live in the table below,
          not here, so no value is shown twice on this screen. */}
      <div style={{ overflowX: "auto", marginBottom: 10, paddingBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, width: "min-content", margin: "0 auto" }}>
          {START.map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                border: `2px solid ${i <= step ? "#dc2626" : "#e5e7eb"}`,
                background: i <= step ? "#fef2f2" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, color: i <= step ? "#dc2626" : C.dim,
                transition: "all .2s",
              }}>{i}</div>
              {i < N - 1 && (
                <div style={{
                  width: 22, textAlign: "center", fontSize: 13, fontWeight: 800,
                  color: i < step ? "#dc2626" : "#cbd5e1",
                }}>
                  {i < step ? (carry(i) === 0 ? "·" : carry(i) > 0 ? "→" : "←") : "│"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* The table — this IS the sim. New row = the one thing that changes each click.
          2026-09-24: table-layout:fixed + % widths so "의미" (the most useful column)
          wraps to 2-3 lines instead of getting clipped off-screen on 375px mobile
          (a fixed minWidth pushed it past the right edge with no scroll hint). */}
      <div style={{ overflowX: "auto", marginBottom: 10 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 320, tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "5%" }} /><col style={{ width: "7%" }} /><col style={{ width: "7%" }} />
            <col style={{ width: "9%" }} /><col style={{ width: "10%" }} /><col style={{ width: "12%" }} />
            <col style={{ width: "8%" }} /><col style={{ width: "8%" }} /><col style={{ width: "34%" }} />
          </colgroup>
          <thead>
            <tr>
              {headers.map((h, hi) => (
                <th key={hi} style={th}>
                  {t(E, h.en, h.ko)}
                  {(h.ko2 || h.en2) && <div style={{ fontWeight: 400, fontSize: 8.5 }}>{t(E, h.en2, h.ko2)}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: step + 1 }, (_, i) => i).map((i) => {
              const isNew = i === step;
              return (
                <tr key={i} style={{ background: isNew ? "#fff1f2" : "transparent" }}>
                  <td style={{ ...td, fontWeight: isNew ? 800 : 400 }}>{i}</td>
                  <td style={td}>{START[i]}</td>
                  <td style={td}>{TARGET[i]}</td>
                  <td style={td}>{diff(i) >= 0 ? "+" : ""}{diff(i)}</td>
                  <td style={td}>{i === 0 ? 0 : carry(i - 1)}</td>
                  <td style={{ ...td, fontWeight: 800, color: "#dc2626" }}>{carry(i) >= 0 ? "+" : ""}{carry(i)}</td>
                  <td style={td}>{Math.abs(carry(i))}</td>
                  <td style={{ ...td, fontWeight: 800, color: "#b91c1c" }}>{ansAt(i)}</td>
                  <td style={{ ...td, textAlign: "left", fontFamily: "inherit", fontSize: 10, lineHeight: 1.4, color: "#7f1d1d", whiteSpace: "normal", wordBreak: "keep-all", overflowWrap: "break-word" }}>{meaningLine(i)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: 10, color: C.dim, marginBottom: 12, ...KA }}>
        {t(E, "|cur| is cur with the sign dropped — always 0 or more.", "|cur| 은 cur 에서 부호만 뺀 값이에요. 항상 0 이상이에요.")}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          background: step === 0 ? "#f1f5f9" : "#fff", color: step === 0 ? "#cbd5e1" : "#dc2626",
          border: `1.5px solid ${step === 0 ? "#e2e8f0" : "#dc2626"}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: step === 0 ? "not-allowed" : "pointer",
        }}>← {t(E, "Back", "이전")}</button>
        <button onClick={() => setStep(Math.min(N - 1, step + 1))} disabled={done} style={{
          background: done ? "#f1f5f9" : "#dc2626", color: done ? "#cbd5e1" : "#fff",
          border: `1.5px solid ${done ? "#e2e8f0" : "#dc2626"}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: done ? "not-allowed" : "pointer",
        }}>{t(E, "Next box", "다음 상자")} →</button>
        <button onClick={() => setStep(0)} style={{
          background: "#fff", color: "#64748b", border: "1.5px solid #cbd5e1", borderRadius: 8,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음으로")}</button>
      </div>

      {done && (
        <div style={{ marginTop: 12, background: "#fff1f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", textAlign: "center", ...KA }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#b91c1c" }}>
            ✅ {t(E, `Table filled — ans = ${ansAt(N - 1)}`, `표가 다 찼어요 — ans = ${ansAt(N - 1)}`)}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "N = 5",
  "A = [2, 2, 2, 6, 3]",
  "B = [1, 2, 3, 4, 5]",
  "",
  "# D[i] = A[i] - B[i] — 상자 i 에 남는 양(+) 이나 모자란 양(-) 이에요",
  "# 경계마다 넘겨야 하는 구슬 = D 의 누적(prefix). 답 = 그 |누적| 의 합.",
  "ops = 0",
  "carry = 0",
  "for i in range(N):",
  "    carry += A[i] - B[i]",
  "    ops += abs(carry)",
  "",
  "print(ops)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int N = 5;",
  "    vector<long long> A = {2, 2, 2, 6, 3};",
  "    vector<long long> B = {1, 2, 3, 4, 5};",
  "",
  "    // carry 는 D = A - B 를 앞에서부터 더해 온 값이고, 답은 |carry| 를 다 더한 값이에요",
  "    long long ops = 0;",
  "    long long carry = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        carry += A[i] - B[i];",
  "        if (carry < 0) {",
  "            ops += -carry;",
  "        } else {",
  "            ops += carry;",
  "        }",
  "    }",
  "    cout << ops << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc21MarblesSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Three lines come in: N, then A, then B. Position i pairs them — box i must go from A[i] to B[i].",
            "입력은 세 줄이에요. N, 그다음 A, 그다음 B 예요.\n같은 자리 i 끼리 짝이라, 상자 i 는 A[i] 에서 B[i] 로 가야 해요."),
        t(E, "Reformulate with D[i] = A[i] − B[i]: box i has a surplus (D>0) or a shortage (D<0). Marbles only cross boundaries between neighbors.",
            "D[i] = A[i] − B[i] 로 바꿔 생각해요.\n상자 i 는 구슬이 남거나(D>0) 모자라요(D<0).\n구슬은 이웃 사이의 경계만 건너요."),
        t(E, "Whatever imbalance sits to the LEFT of a boundary must cross it. That amount is the carry — the running total of D — so the answer = sum of |carry| at every boundary.",
            "경계 왼쪽에 남은 차이는 반드시 그 경계를 건너요.\n그 양이 바로 누적(carry), 곧 D 를 더해 온 값이에요.\n그래서 답은 경계마다 |누적| 을 더한 값이에요."),
        t(E, "No array is needed: carry adds A[i]−B[i] as it walks, and ops adds |carry| at the same moment — one pass, no extra memory.",
            "배열을 따로 만들 필요가 없어요.\ncarry 가 A[i]−B[i] 를 더해 가고, 그 자리에서 ops 에 |carry| 를 더해요.\n한 번만 훑고 여분 메모리도 안 써요."),
        t(E, "Why abs()? A carry of +3 sends 3 marbles right, −3 pulls 3 left. Either way it costs 3 moves.",
            "왜 abs 냐면, 누적이 +3 이면 구슬 3 개가 오른쪽으로,\n−3 이면 3 개가 왼쪽으로 가요.\n어느 쪽이든 옮기는 횟수는 3 번이라 절댓값을 더해요."),
      ],
      pyOnly: [
        t(E, "Python ints are unbounded, so abs(carry) never overflows — no special type needed.",
            "Python 정수는 크기 제한이 없어서 abs(carry) 가 넘칠 일이 없어요. 특별한 타입을 쓰지 않아도 돼요."),
      ],
      cppOnly: [
        /* 2026-09-09: why(항상 보임)에 있던 C++ 타입 얘기를 여기로 옮겼다.
           MCC 는 codeLang="py" 고정이라 파이썬 학생이 볼 일이 없다. */
        /* 2026-09-17: "64비트 정수" 는 학생 말이 아니다 — 답이 커서 큰 수를 담는 칸이
           필요하다는 뜻으로 바꿔 쓴다. (\n 은 쓰지 않는다 — Stepper 가 뭉갠다) */
        t(E, "Use long long: sum(A) can reach 5·10¹¹ (500 billion), which is far more than a plain int can hold.",
            "sum(A) 가 5·10¹¹(5000억)까지 커져요. 보통 int 칸에는 안 들어가요. 그래서 더 큰 수를 담는 long long 을 써요."),
        t(E, "Declare A, B, carry and ops as long long — an int would silently wrap around.",
            "A, B, carry, ops 를 모두 long long 으로 적어요. int 로 두면 값이 조용히 망가져요."),
        t(E, "Read A fully, then B fully (two separate loops) — they arrive on two lines.",
            "A 를 다 읽고 그다음 B 를 다 읽어요. 두 줄로 들어오니까 반복문을 두 개 써요."),
      ],
    },
  ];
}

export function Mcc21MarblesProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}

/* CodeWalk — 코드 줄에 붙는 말풍선 (2026-09-23, PM 판정 3단계, mcc21menu 를 본떴다).
   MCC 는 파이썬 전용이라(feedback_mcc_is_python_only.md) C++ beats 는 안 만든다.
   말풍선은 "지금 마주한 질문" 으로 연다 — 파일 순서를 읊지 않는다
   (check-codewalk-thinking-order.py). 1장 시뮬(Mcc21MarblesBoundarySim)에서
   걸었던 "경계를 하나씩 건너기" 를 그대로 코드로 잇는다. */
const _MARBLES_VARS = [
  { v: "A", ko: "시작 개수 (상자별)", en: "starting counts" },
  { v: "B", ko: "목표 개수 (상자별)", en: "target counts" },
  { v: "carry", ko: "지금까지 쌓인 차이", en: "running difference so far" },
  { v: "ops", ko: "지금까지 건넌 구슬 수 (답)", en: "marbles crossed so far (the answer)" },
];
export function getMcc21MarblesWalk(E) {
  return { code: FULL_PY, vars: _MARBLES_VARS, beats: [
    { hi: [0, 4], bubble: t(E,
        "What do we need before we start?\nThe box count (N) and the start/target counts (A, B).",
        "무엇부터 알아야 하나요?\n상자 개수(N)와 시작 개수(A), 목표 개수(B) 가 있어야 해요.") },
    { hi: [5, 8], bubble: t(E,
        "How do we tally the crossings?\ncarry tracks the running difference, ops totals the crossings — both start at 0.",
        "건너는 구슬을 어떻게 모아 셀까요?\ncarry 는 지금까지 쌓인 차이, ops 는 건넌 구슬 수예요.\n둘 다 0 부터 시작해요.") },
    { hi: [9, 10], bubble: t(E,
        "Walking the boxes left to right?\nEach box adds A[i]-B[i] to carry — the same boundary you crossed in the sim.",
        "상자를 왼쪽부터 하나씩 보면요?\n상자 i 의 차이 A[i]-B[i] 를 carry 에 더해요.\n앞 시뮬의 그 경계예요.") },
    { hi: [11, 11], bubble: t(E,
        "How many cross at that edge?\nExactly abs(carry) — add that to ops.",
        "그 경계에서 몇 개가 건너나요?\ncarry 의 절댓값만큼요. 그 수를 ops 에 더해요.") },
    { hi: [12, 13], bubble: t(E,
        "Once every box is done?\nops already holds the answer — print it.",
        "상자를 다 훑었으면요?\nops 가 바로 답이에요. 그대로 출력해요.") },
  ] };
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


export function downloadMcc21MarblesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Marbles — Full Study Guide", "Mcc21Marbles — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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
