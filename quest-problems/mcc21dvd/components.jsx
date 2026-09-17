import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* one axis (length N) after t seconds — a triangle wave that bounces
   between 1 and N with period 2(N-1). */
function oneAxis(N, t) {
  const period = 2 * (N - 1);
  const p = ((t % period) + period) % period;
  return N - Math.abs((N - 1) - p);
}

/* ═══════════════════════════════════════════════════════════════
   Mcc21DvdBounceSim — the row and the column are TWO independent
   1-D bouncers. The student steps T; each axis traces a triangle
   wave (1→N→1→N…). We overlay the closed-form formula so they see
   the position comes straight from T, not from stepping. Period is
   2(N-1), so even T = 10^16 is one modulo away.
   ═══════════════════════════════════════════════════════════════ */
const SIM_H = 3; // rows  (matches the PDF's h=3 example)
const SIM_W = 5; // cols  (matches the PDF's w=5 example)
const SIM_TMAX = 16;

export function Mcc21DvdBounceSim({ E }) {
  const [tt, setTt] = useState(0);
  /* 2026-09-17: 시뮬을 열면 T=0 에서, 아무것도 누르기 전에 닫힌 공식 박스
     (r = H − |(H−1) − (T mod 2(H−1))|) 와 "행은 4 초마다 되풀이돼요" 가 이미 떠 있었다.
     학생이 격자를 한 번도 안 넘겨 보고 답을 먼저 읽었다.
     mcc21carrots 와 같은 방식으로 `touched` 뒤로 미룬다 — T 를 한 번이라도 넘기면
     그때 공식과 주기가 드러난다. 그 전엔 격자와 1 줄 띠만 보인다. */
  const [maxT, setMaxT] = useState(0);
  const go = (v) => { setTt(v); setMaxT((m) => Math.max(m, v)); };

  const r = oneAxis(SIM_H, tt); // row from the bottom, 1..H
  const c = oneAxis(SIM_W, tt); // col from the left, 1..W
  const hPeriod = 2 * (SIM_H - 1);
  const wPeriod = 2 * (SIM_W - 1);
  /* 한 바퀴(행이 1 로 되돌아오는 데 걸리는 시간)를 직접 넘겨 본 뒤에야 공식을 연다.
     첫 클릭에 바로 열면 "되풀이되네?" 를 느낄 틈이 없다. */
  const cycled = maxT >= hPeriod;
  const rowTrail = Array.from({ length: maxT + 1 }, (_, i) => oneAxis(SIM_H, i));

  // grid: draw top→bottom, so display row index dr maps to r-value (H - dr)
  const gridRows = [];
  for (let dr = 0; dr < SIM_H; dr++) {
    const rowVal = SIM_H - dr;
    const cells = [];
    for (let col = 1; col <= SIM_W; col++) {
      const isLogo = rowVal === r && col === c;
      const onWall = rowVal === 1 || rowVal === SIM_H || col === 1 || col === SIM_W;
      cells.push(
        <div key={col} style={{
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          background: isLogo ? A : onWall ? "#fef3c7" : "#fff",
          border: `1px solid ${onWall ? "#fcd34d" : "#e5e7eb"}`,
          fontSize: 16,
        }}>{isLogo ? "📀" : ""}</div>
      );
    }
    gridRows.push(<div key={dr} style={{ display: "flex" }}>{cells}</div>);
  }

  // a horizontal 1-D strip of length N, with the dot at `pos`
  const strip = (N, pos, tone) => (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: N }, (_, i) => {
        const v = i + 1;
        const here = v === pos;
        return (
          <div key={v} style={{
            width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontSize: 11, fontWeight: 800,
            fontFamily: "'JetBrains Mono',monospace",
            border: here ? `2px solid ${tone}` : "1px solid #fcd34d",
            background: here ? tone : "#fff",
            color: here ? "#fff" : "#92400e",
          }}>{v}</div>
        );
      })}
    </div>
  );

  const btn = (label, onClick, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 12px", borderRadius: 8, border: `1px solid ${A}`,
      background: disabled ? "#fff" : A, color: disabled ? C.dim : "#fff",
      fontSize: 12, fontWeight: 800, cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.45 : 1, fontFamily: "'JetBrains Mono',monospace",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🎞️ {t(E, "Follow the logo one second at a time", "로고를 한 초씩 따라가 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line", ...KA }}>
          {cycled
            ? t(E,
                "The row (height H) and the column (width W) never affect each other. Each is just a dot bouncing 1→N→1→N on its own line, and each one repeats.",
                "행(높이 H)과 열(너비 W)은 서로 영향을 주지 않아요.\n각각 자기 축 위에서 1→N→1→N 으로 튕기는 점 하나예요.\n그리고 둘 다 일정한 간격으로 똑같이 되풀이돼요.")
            : t(E,
                "Step T and watch the two strips below the grid. When does the row come back to where it was?",
                "T 를 하나씩 넘기면서 격자 아래 '행 축' 을 봐요.\n행은 언제 원래 자리로 돌아올까요?")}
        </div>

        {/* T stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          {btn("⏮", () => go(0), tt === 0)}
          {btn("◀ T−1", () => go(Math.max(0, tt - 1)), tt === 0)}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: A, minWidth: 74, textAlign: "center" }}>
            T = {tt}
          </span>
          {btn("T+1 ▶", () => go(Math.min(SIM_TMAX, tt + 1)), tt === SIM_TMAX)}
        </div>

        {/* grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ border: `2px solid ${A}`, borderRadius: 6, padding: 2, background: "#fff" }}>
            {gridRows}
          </div>
        </div>

        {/* two independent 1-D bouncers */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4, ...NW }}>
              {t(E, "row axis (H = 3)", "행 축 (H = 3)")} → r = <b>{r}</b>
            </div>
            {strip(SIM_H, r, "#0891b2")}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4, ...NW }}>
              {t(E, "col axis (W = 5)", "열 축 (W = 5)")} → c = <b>{c}</b>
            </div>
            {strip(SIM_W, c, "#7c3aed")}
          </div>
        </div>

        {/* 걸어온 행 발자취 — 공식보다 먼저, 되풀이가 눈에 보이게 */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, ...KA }}>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>
            {t(E, "row so far (t = 0 →)", "지금까지 지나온 행 (t = 0 부터)")}
          </div>
          <div>
            {rowTrail.map((v, i) => (
              <span key={i}>
                {i > 0 ? <span style={{ color: "#475569" }}> → </span> : null}
                <b style={{ color: i === tt ? "#fbbf24" : "#22d3ee" }}>{v}</b>
              </span>
            ))}
          </div>
          <div style={{ marginTop: 6, color: "#fbbf24", fontWeight: 800 }}>
            {t(E, "now: ", "지금: ")}r = {r}, c = {c}
          </div>
        </div>

        {/* 2026-09-17: 여기부터는 **한 바퀴를 직접 넘겨 본 뒤에만** 보인다. */}
        {cycled ? (
          <>
            <div style={{ marginTop: 10, background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, ...KA }}>
              <div>
                r = H − |(H−1) − (T mod 2(H−1))| = 3 − |2 − ({tt} mod {hPeriod})| = <b style={{ color: "#22d3ee" }}>{r}</b>
              </div>
              <div>
                c = W − |(W−1) − (T mod 2(W−1))| = 5 − |4 − ({tt} mod {wPeriod})| = <b style={{ color: "#c4b5fd" }}>{c}</b>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The row repeats every 2(H−1) = 4 seconds and the column every 2(W−1) = 8 seconds. So even T = 10^16 needs no stepping — one modulo folds T back into the first cycle.",
                "행은 2(H−1) = 4 초마다, 열은 2(W−1) = 8 초마다 되풀이돼요.\n그래서 T 가 아무리 커도 한 칸씩 셀 필요가 없어요.\n나머지 계산 한 번이면 T 가 첫 바퀴 안으로 접혀 들어가요.")}
            </div>
          </>
        ) : (
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line", ...KA }}>
            {t(E,
              "Keep stepping until the row comes back to 1. How many seconds did that take?",
              "행이 1 로 돌아올 때까지 계속 넘겨 봐요.\n몇 초가 걸렸나요?")}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (fast: each axis is an independent triangle wave)
   ================================================================ */
const READ_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "Q = 4",
  "H = [3, 2, 7, 36]",
  "W = [5, 2, 2, 28]",
  "T = [5, 5, 0, 127]",
];
const ONE_PY = [
  "def one(N, t):",
  "    # 한 방향은 1 과 N 사이를 오가요. 2*(N-1) 마다 되풀이돼요",
  "    p = t % (2 * (N - 1))",
  "    return N - abs((N - 1) - p)",
];
const LOOP_PY = [
  "for i in range(Q):",
  "    # 세로는 H, 가로는 W 를 써요 — 같은 t 인데 따로 움직여요",
  "    print(one(H[i], T[i]), one(W[i], T[i]))",
];
const FULL_PY = [...READ_PY, "", ...ONE_PY, "", ...LOOP_PY];

const READ_CPP = [
  "// 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "int Q = 4;",
  "vector<long long> H = {3, 2, 7, 36};",
  "vector<long long> W = {5, 2, 2, 28};",
  "vector<long long> T = {5, 5, 0, 127};",
];
const ONE_CPP = [
  "long long one(long long N, long long t) {",
  "    // 한 방향은 1 과 N 사이를 오가요. 2*(N-1) 마다 되풀이돼요",
  "    long long p = t % (2 * (N - 1));",
  "    long long d = (N - 1) - p;",
  "    if (d < 0) {",
  "        d = -d;",
  "    }",
  "    return N - d;",
  "}",
];
const LOOP_CPP = [
  "for (int i = 0; i < Q; i++) {",
  "    // 세로는 H, 가로는 W 를 써요 — 같은 t 인데 따로 움직여요",
  "    cout << one(H[i], T[i]) << ' ' << one(W[i], T[i]) << '\\n';",
  "}",
];
const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  ...ONE_CPP,
  "",
  "int main() {",
  ...READ_CPP.map((l) => "    " + l),
  ...LOOP_CPP.map((l) => "    " + l),
  "    return 0;",
  "}",
];

export { FULL_PY, FULL_CPP };

export function getMcc21DvdSections(E) {
  return [
    {
      label: t(E, "① Read the queries", "① 물음 읽기"),
      color: A,
      py: READ_PY, cpp: READ_CPP,
      why: [
        t(E, "There are Q independent test cases.",
            "서로 상관없는 물음이 Q 개 있어요."),
        /* 2026-09-17: 74 자가 한 덩어리였다. Stepper 는 \n 을 뭉개니 항목을 나눈다. */
        t(E, "Read H, W and T as three arrays, and query i is H[i], W[i], T[i].",
            "H, W, T 를 배열 세 개로 읽으면 i 번째 물음이 H[i], W[i], T[i] 가 돼요."),
        t(E, "Q ≤ 1000, so answering each query directly with a formula (no loop) is plenty fast.",
            "Q ≤ 1000 이라서 물음 하나를 반복 없이 식으로 답하면 충분히 빨라요."),
      ],
      cppOnly: [
        t(E, "H, W ≤ 10^12 and T ≤ 10^16 overflow int — use long long.",
            "H, W ≤ 10^12 와 T ≤ 10^16 은 int 로는 넘쳐요. long long 을 써요."),
      ],
    },
    {
      label: t(E, "② One axis on its own (1→N→1)", "② 한 축만 떼어 보기 (1→N→1)"),
      color: "#0891b2",
      py: ONE_PY, cpp: ONE_CPP,
      why: [
        t(E, "Key idea: the row and the column move independently. Each is a dot bouncing 1→N→1 on a line of length N.",
            "여기가 핵심이에요. 행과 열은 서로 상관없이 움직여요. 각각은 길이가 N 인 선 위에서 1→N→1 로 튕기는 점 하나예요."),
        t(E, "Going up takes N−1 seconds and coming back down takes N−1 more, so the whole trip repeats every 2(N−1) seconds. p = t mod 2(N−1) is 'how far into this trip we are'.",
            "올라가는 데 N−1 초, 다시 내려오는 데 N−1 초가 걸려요. 그래서 한 바퀴는 2(N−1) 초예요. p = t mod 2(N−1) 은 '이번 바퀴에서 몇 초가 지났나' 를 알려줘요."),
        t(E, "Inside one trip the dot is at the top exactly when p = N−1. So (N−1) − p is the gap to the top: positive on the way up, negative on the way down. We only care how far from the top it is, so take the absolute value and subtract it from N: N − |(N−1) − p|.",
            "한 바퀴 안에서 점이 꼭대기 N 에 있는 때는 p = N−1 인 순간이에요. 그러니 (N−1) − p 는 꼭대기에서 얼마나 떨어져 있는지예요. 올라가는 중이면 +, 내려가는 중이면 − 로 나오는데 우리는 떨어진 거리만 알면 되니까 절댓값을 씌워요. 그 거리만큼 꼭대기 N 에서 빼면 N − |(N−1) − p| 가 돼요."),
        t(E, "Why we can't just step T: T ≤ 10^16 and Q ≤ 1000 means up to 10^19 steps. The formula answers each query directly, with no loop.",
            "T 를 한 초씩 세면 왜 안 될까요. T ≤ 10^16 에 Q ≤ 1000 이면 많게는 10^19 번을 세야 해요. 공식은 반복 없이 물음 하나를 끝내요."),
      ],
      cppOnly: [
        t(E, "abs on long long: subtract and flip the sign by hand (or use llabs / <cstdlib>).",
            "long long 의 절댓값은 이렇게 구해요. 빼고 나서 부호를 직접 뒤집거나 llabs (<cstdlib>) 를 써요."),
      ],
    },
    {
      label: t(E, "③ Answer each query", "③ 물음마다 답 출력"),
      color: "#7c3aed",
      py: LOOP_PY, cpp: LOOP_CPP,
      why: [
        t(E, "For each query, apply the same one() twice: once to H for the row, once to W for the column — using the same T[i].",
            "물음마다 같은 one() 을 두 번 불러요. 행은 H 로, 열은 W 로 구하고 T[i] 는 둘 다 똑같이 넣어요."),
        t(E, "Print 'r c' on its own line, in the original query order.",
            "'r c' 를 물음이 들어온 순서 그대로 한 줄씩 출력해요."),
      ],
      pyOnly: [
        t(E, "print(a, b) already puts one space between the two numbers.",
            "print(a, b) 는 두 수 사이에 공백 하나를 자동으로 넣어줘요."),
      ],
    },
  ];
}

export function Mcc21DvdProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadMcc21DvdPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Dvd — Full Study Guide", "Mcc21Dvd — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
