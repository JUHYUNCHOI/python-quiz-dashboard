import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ----------------------------------------------------------------
   SocDist1Sim — bilingual deep-audit sim for the title page

   2026-09-25 재작성 — 이전 버전은 **다른 문제**(Silver, cpid 1038: 구간 M 개에
   소 N 마리를 배치)를 그리고 있었다. 진짜 문제(Bronze, cpid 1035)는:
     길이 N 인 0/1 문자열 하나(1 = 이미 소가 있음) + 빈 칸에 소 2마리를 더 넣어서
     이웃한 두 소 사이 최소 거리를 최대로 만들기.
   퀴즈(1-2)·입력(1-3)이 이미 쓰는 예제 "10001"(0번·4번에 소) 을 그대로 쓴다 —
   같은 예제가 미션 → 시뮬 → 퀴즈 → 코드로 이어지게.

   여기서 보여주는 계산은 🔒 FULL_PY 의 `can_place(D, 2)` 와 **같은 논리**다:
     기존 소와 소 사이 빈 구간의 길이를 구하고, 그 안에 D 간격으로 몇 자리가
     남는지 (구간길이 − D) ÷ D 로 센다. 이 예제는 소가 양쪽 끝(0, 4)에 있어서
     "사이" 구간 하나만 있다 — 끝보다 바깥쪽(맨 앞 왼쪽·맨 뒤 오른쪽) 구간은
     길이 0이라 화면에 안 그려진다(코드에는 그 경우도 있어 함께 계산은 해둔다).
   검산: D=1→3자리(✓, 2마리 이상), D=2→1자리(✗), D=3,4→0자리(✗) → 가장 좋은 D=1,
   퀴즈 1-2·입력 1-3 의 정답(1)과 일치.
   --------------------------------------------------------------- */
export function SocDist1Sim({ E }) {
  const N = 5;
  const S = "10001";                              // 퀴즈·입력과 같은 예제
  const ones = [];
  for (let i = 0; i < N; i++) if (S[i] === "1") ones.push(i);
  const NEED = 2;                                 // 새로 넣을 소
  const MAX_X = N - 1;                            // D 가 가질 수 있는 가장 큰 값
  const [D, setD] = useState(1);

  // can_place(D, NEED) 와 같은 논리 — 빈 구간마다 D 간격으로 몇 자리가 남는지 센다.
  // renderA/renderB = 그 구간에 **실제로 비어 있는 칸**의 범위(칸 번호, 양끝 포함).
  // 이 범위는 D 가 바뀌어도 움직이지 않는다 — 소가 이미 있는 칸(0, 4)은 절대 포함하지 않는다
  // (전엔 a,b 를 그대로 배경 상자에 써서 기존 소 칸까지 덮어 겹쳐 보였다 — see-screen 실측으로 발견).
  function regionsFor(d) {
    const segs = [];
    if (ones.length === 0) {
      const cap = Math.floor((N - 1) / d) + 1;
      segs.push({ renderA: 0, renderB: N - 1, cap, pos: Array.from({ length: cap }, (_, i) => i * d) });
      return segs;
    }
    if (ones[0] > 0) {
      const cap = Math.floor(ones[0] / d);
      segs.push({ renderA: 0, renderB: ones[0] - 1, cap, pos: Array.from({ length: cap }, (_, i) => ones[0] - (i + 1) * d).reverse() });
    }
    for (let k = 1; k < ones.length; k++) {
      const a = ones[k - 1], b = ones[k];
      const cap = Math.max(0, Math.floor((b - a - d) / d));
      segs.push({ renderA: a + 1, renderB: b - 1, cap, pos: Array.from({ length: cap }, (_, i) => a + (i + 1) * d) });
    }
    const lastOne = ones[ones.length - 1];
    if (lastOne < N - 1) {
      const cap = Math.floor((N - 1 - lastOne) / d);
      segs.push({ renderA: lastOne + 1, renderB: N - 1, cap, pos: Array.from({ length: cap }, (_, i) => lastOne + (i + 1) * d) });
    }
    return segs;
  }

  const segs = regionsFor(D);
  const totalCap = segs.reduce((s, x) => s + x.cap, 0);
  const feasible = totalCap >= NEED;
  const newPositions = segs.flatMap((s) => s.pos).slice(0, NEED); // 필요한 만큼만 표시

  // 이 예제에서 가장 좋은 D — D 를 1부터 늘려가며 직접 스캔
  const bestD = (() => {
    let best = 0;
    for (let d = 1; d <= MAX_X; d++) {
      if (regionsFor(d).reduce((s, x) => s + x.cap, 0) >= NEED) best = d;
    }
    return best;
  })();
  const isBest = D === bestD;

  const U = 46;
  const totalW = N * U;

  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, `Try it · stalls = "${S}" (cows already at 0, 4)`, `직접 해봐요 · 칸 = "${S}" (0번, 4번에 소)`)}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          D = <b>{D}</b>
        </div>
        <div style={{
          background: feasible ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${feasible ? "#16a34a" : "#dc2626"}`,
          borderRadius: 8, padding: "4px 10px", fontSize: 11,
          color: feasible ? "#166534" : "#7f1d1d",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {t(E, "room for new cows", "새로 넣을 자리")} = <b>{totalCap}</b> / {NEED} {feasible ? "✓" : "✗"}
        </div>
        {isBest && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
            {t(E, "★ best D", "★ 가장 좋은 D")}
          </div>
        )}
      </div>

      {/* Stall row */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "16px 10px", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ position: "relative", width: totalW, height: 90, margin: "0 auto" }}>
          {/* D 로 검사 중인 빈 구간 — 자리가 있으면 빨갛게, 없으면 회색.
              renderA..renderB 는 실제로 비어 있는 칸만 (기존 소 칸은 절대 포함 안 함). */}
          {segs.filter((sgm) => sgm.renderB >= sgm.renderA).map((sgm, si) => (
            <div key={`seg-${si}`} style={{
              position: "absolute",
              left: sgm.renderA * U + 4, top: 38,
              width: (sgm.renderB - sgm.renderA + 1) * U - 8, height: 26,
              background: sgm.cap > 0 ? "linear-gradient(180deg, #fee2e2, #fecaca)" : "#f1f5f9",
              border: `1.5px dashed ${sgm.cap > 0 ? "#fca5a5" : "#cbd5e1"}`,
              borderRadius: 10,
            }} />
          ))}

          {/* 칸 번호 */}
          {Array.from({ length: N }, (_, i) => (
            <div key={`cell-${i}`} style={{
              position: "absolute", left: i * U, top: 64, width: U, textAlign: "center",
              fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace",
            }}>{i}</div>
          ))}

          {/* 이미 있던 소 */}
          {ones.map((pos, i) => (
            <div key={`old-${i}`} style={{ position: "absolute", left: pos * U + U / 2 - 14, top: 14, width: 28, fontSize: 22, textAlign: "center" }}>
              <div>{"🐄"}</div>
              <div style={{ fontSize: 9, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -2 }}>{pos}</div>
            </div>
          ))}

          {/* 새로 놓을 소 (필요한 2마리, D 가 바뀌면 자리도 바뀐다).
              고리(테두리 원)는 라벨과 겹치지 않게 크기를 고정한다 —
              전엔 라벨에 marginTop:-2 를 줘서 고리 배경과 겹쳐 보였다(see-screen 실측). */}
          {newPositions.map((pos, i) => (
            <div key={`new-${i}`} style={{
              position: "absolute", left: pos * U + U / 2 - 16, top: 11, width: 32,
              textAlign: "center", transition: "left .2s ease-out",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 999, background: "#fecaca",
                border: "2px solid #dc2626", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto", fontSize: 18,
              }}>{"🐄"}</div>
              <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{pos}</div>
            </div>
          ))}

          {/* 부족한 만큼 ✗ 표시 */}
          {!feasible && Array.from({ length: NEED - totalCap }, (_, mi) => (
            <div key={`miss-${mi}`} style={{ position: "absolute", right: 4 + mi * 22, top: 0, fontSize: 16, opacity: 0.55 }}>
              {"🐄"}<span style={{ position: "absolute", left: 0, top: 0, fontSize: 18, color: "#dc2626" }}>✗</span>
            </div>
          ))}
        </div>
      </div>

      {/* D 슬라이더 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Drag to change minimum gap D", "끌어서 최소 간격 D 를 바꿔 봐요")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim }}>1</span>
          <input
            type="range" min={1} max={MAX_X} value={D}
            onChange={(e) => setD(parseInt(e.target.value, 10))}
            style={{ width: 220, accentColor: A }}
          />
          <span style={{ fontSize: 11, color: C.dim }}>{MAX_X}</span>
        </div>
      </div>

      {/* Insight box */}
      <div style={{ marginTop: 10, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.55, wordBreak: "keep-all" }}>
        <b style={{ color: A }}>{t(E, "Why binary search?", "왜 이분 탐색?")}</b>{" "}
        {t(E,
          <>Bigger D → less room for the 2 new cows. So {"{D : 2 more cows fit}"} is a downward-true range —<br />the biggest such D is the answer.</>,
          <>D 가 커질수록 새로 넣을 자리가 줄어요.<br />그래서 '2마리가 들어가는 D' 는 작은 쪽이 모두 참이라, 그중 가장 큰 D 가 답이에요.</>)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('socdist1.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "s = lines[1].strip()",
  "",
  "# 현재 점유된 stall 위치들 (0-indexed)",
  "ones = []",
  "for i in range(N):",
  "    if s[i] == '1':",
  "        ones.append(i)",
  "",
  "# D 만큼의 최소 거리로 cows 마리 더 추가 가능한지 확인",
  "def can_place(D, cows):",
  "    # 이미 존재하는 1들 사이 최소 거리가 D 이상이어야 함",
  "    for k in range(1, len(ones)):",
  "        if ones[k] - ones[k-1] < D:",
  "            return False",
  "    # 각 gap 에 새 cow 몇 마리 넣을 수 있는지",
  "    placed = 0",
  "    if not ones:",
  "        # 빈 stall만 있는 경우: 0, D, 2D, ... 배치",
  "        placed = (N - 1) // D + 1",
  "    else:",
  "        # 1과 1 사이 gap",
  "        for k in range(1, len(ones)):",
  "            gap = ones[k] - ones[k-1]",
  "            placed += (gap - D) // D",
  "        # 왼쪽 끝 ~ 첫 1",
  "        placed += ones[0] // D",
  "        # 마지막 1 ~ 오른쪽 끝",
  "        placed += (N - 1 - ones[-1]) // D",
  "    return placed >= cows",
  "",
  "# Binary search 최대 D",
  "lo, hi = 1, N",
  "ans = 1",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if can_place(mid, 2):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "",
  "with open('socdist1.out', 'w') as file:",
  "    file.write(str(ans) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int N;",
  "vector<int> ones;",
  "",
  "// D 만큼의 최소 거리로 cows 마리 더 추가 가능한지 확인",
  "bool can_place(int D, int cows) {",
  "    // 이미 존재하는 1들 사이 최소 거리가 D 이상이어야 함",
  "    for (int k = 1; k < (int)ones.size(); k++) {",
  "        if (ones[k] - ones[k-1] < D) {",
  "            return false;",
  "        }",
  "    }",
  "    int placed = 0;",
  "    if (ones.empty()) {",
  "        // 빈 stall만 있는 경우: 0, D, 2D, ... 배치",
  "        placed = (N - 1) / D + 1;",
  "    } else {",
  "        // 1과 1 사이 gap",
  "        for (int k = 1; k < (int)ones.size(); k++) {",
  "            int gap = ones[k] - ones[k-1];",
  "            placed += (gap - D) / D;",
  "        }",
  "        // 왼쪽 끝 ~ 첫 1",
  "        placed += ones[0] / D;",
  "        // 마지막 1 ~ 오른쪽 끝",
  "        placed += (N - 1 - ones.back()) / D;",
  "    }",
  "    return placed >= cows;",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"socdist1.in\");",
  "    ofstream fout(\"socdist1.out\");",
  "",
  "    fin >> N;",
  "    string s;",
  "    fin >> s;",
  "",
  "    // 현재 점유된 stall 위치들 (0-indexed)",
  "    for (int i = 0; i < N; i++) {",
  "        if (s[i] == '1') {",
  "            ones.push_back(i);",
  "        }",
  "    }",
  "",
  "    // Binary search 최대 D",
  "    int lo = 1;",
  "    int hi = N;",
  "    int ans = 1;",
  "    while (lo <= hi) {",
  "        int mid = (lo + hi) / 2;",
  "        if (can_place(mid, 2)) {",
  "            ans = mid;",
  "            lo = mid + 1;",
  "        } else {",
  "            hi = mid - 1;",
  "        }",
  "    }",
  "    fout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSocDist1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? The largest minimum distance guaranteed between any two of the N cows once we add 2 more.",
            "무엇을 출력해야 하나요?\n소 2마리를 더 놓았을 때\n어떤 두 소든 보장되는 최소 거리의\n가장 큰 값이에요."),
        t(E, "Trying every distance D one by one is slow. But 'can 2 more cows fit with gaps of at least D?' gets harder as D grows and easier as D shrinks — it flips exactly once. So we test the middle and keep halving toward the side that works. That way of searching is called binary search.",
            "거리 D 를 하나씩 다 시도하면 느려요.\n그런데 'D 이상 거리로 2마리를 더 놓을 수 있나?'\n라는 질문은 D 가 커질수록 어려워지고\n작아질수록 쉬워져요 — 딱 한 번만 뒤집혀요.\n그래서 가운데를 찍어 보고 되는 쪽으로 절반씩 좁혀 가요.\n이렇게 찾는 걸 이분 탐색이라고 불러요."),
        t(E, "So the code binary-searches D, and for each candidate D checks the gaps between existing cows and how many new cows still fit.",
            "그래서 코드는 D 를 이분 탐색하면서\n기존 소들 사이 간격과\n새로 몇 마리를 더 넣을 수 있는지 확인해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 넣으면 코드가 무엇을 쓰는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function SocDist1ProgressiveCode(props) {
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


export function downloadSocDist1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SocDist1 — Full Study Guide", "SocDist1 — 종합 풀이 노트");
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

