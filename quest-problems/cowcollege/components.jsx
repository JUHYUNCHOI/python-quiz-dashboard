// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ─────────────────────────────────────────────────────────────
   TuitionSlider — interactive sim for "try every price"
   Student drags price; bars above cut-line turn green (paying),
   below turn gray (skipped). Revenue updates live.
   ───────────────────────────────────────────────────────────── */
export function TuitionSlider({ E, sorted = [1, 2, 3, 4, 5] }) {
  const N = sorted.length;
  const maxV = sorted[N - 1];
  const [price, setPrice] = useState(sorted[Math.floor(N / 2)]);

  // Cows paying: those with c[i] >= price
  const paying = sorted.filter(v => v >= price).length;
  const revenue = price * paying;

  // Best revenue across all candidate prices (only c[i] values matter)
  const best = Math.max(...sorted.map((p, i) => p * (N - i)));
  const isBest = revenue === best;

  // Bar dimensions
  const BAR_W = 36;
  const BAR_GAP = 6;
  const CHART_H = 120;
  const chartW = N * BAR_W + (N - 1) * BAR_GAP;
  const cutY = CHART_H - (price / maxV) * CHART_H;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8 }}>
        {t(E, "Drag the slider — try each price!", "슬라이더를 움직여서 가격을 하나씩 바꿔 봐요!")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.6 }}>
        {t(E,
          "Sorted c = [1, 2, 3, 4, 5]. Green bars = cows paying (c[i] ≥ price). Gray = skip.",
          "정렬된 c = [1, 2, 3, 4, 5] 예요.\n초록 막대는 내는 소(c[i] ≥ 가격), 회색은 안 내는 소예요.")}
      </div>

      {/* Bar chart with horizontal cut-line */}
      <div style={{
        display: "flex", justifyContent: "center", marginBottom: 10,
      }}>
        <div style={{ position: "relative", width: chartW, height: CHART_H + 24 }}>
          {/* Bars */}
          <div style={{
            display: "flex", gap: BAR_GAP, alignItems: "flex-end",
            height: CHART_H, position: "relative",
          }}>
            {sorted.map((v, i) => {
              const isPaying = v >= price;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: BAR_W, height: (v / maxV) * CHART_H,
                    background: isPaying ? C.ok : "#e5e7eb",
                    border: `1.5px solid ${isPaying ? C.ok : C.dimLight}`,
                    borderRadius: "6px 6px 0 0",
                    display: "flex", alignItems: "flex-start", justifyContent: "center",
                    paddingTop: 3, transition: "background 120ms, border-color 120ms",
                  }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: isPaying ? "#fff" : C.dim,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>${v}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cut-line overlay (price) */}
          <div style={{
            position: "absolute", left: -4, right: -4, top: cutY - 1,
            height: 0, borderTop: `2px dashed ${A}`,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: chartW + 6, top: cutY - 10,
            fontSize: 11, fontWeight: 700, color: A,
            fontFamily: "'JetBrains Mono', monospace",
            background: "#fffbeb", border: `1px solid ${A}`,
            padding: "1px 5px", borderRadius: 4, whiteSpace: "nowrap",
          }}>
            ${price}
          </div>
          {/* Index labels under bars */}
          <div style={{
            display: "flex", gap: BAR_GAP, marginTop: 4,
          }}>
            {sorted.map((_, i) => (
              <div key={i} style={{
                width: BAR_W, textAlign: "center",
                fontSize: 10, fontWeight: 600, color: C.dim,
                fontFamily: "'JetBrains Mono', monospace",
              }}>i={i}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: A, minWidth: 56 }}>
          {t(E, "Price", "가격")}
        </span>
        <input
          type="range"
          min={1}
          max={maxV}
          step={1}
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          style={{ flex: 1, accentColor: A }}
        />
        <span style={{
          fontSize: 13, fontWeight: 700, color: A, minWidth: 36, textAlign: "right",
          fontFamily: "'JetBrains Mono', monospace",
        }}>${price}</span>
      </div>

      {/* Live revenue card */}
      <div style={{
        background: isBest ? C.okBg : "#fffbeb",
        border: `1.5px solid ${isBest ? C.okBd : "#fcd34d"}`,
        borderRadius: 10, padding: "10px 12px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "price", "가격")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: A }}>${price}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "cows paying", "내는 소")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{paying}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 600 }}>
            {t(E, "revenue", "수입")}
          </div>
          <div style={{
            fontSize: 16, fontWeight: 700,
            color: isBest ? C.ok : C.text,
          }}>
            {price}×{paying}={revenue}{isBest ? " ★" : ""}
          </div>
        </div>
      </div>

      {isBest && (
        <div style={{
          marginTop: 8, textAlign: "center", fontSize: 12, fontWeight: 700, color: C.ok,
        }}>
          {t(E, "★ Best price found!", "★ 최고 가격 발견!")}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "c = list(map(int, input().split()))",
  "",
  "c.sort()",
  "",
  "best_rev = 0",
  "best_tuition = c[0]",
  "",
  "for i in range(N):",
  "    tuition = c[i]",
  "    cows_paying = N - i",
  "    revenue = tuition * cows_paying",
  "    if revenue > best_rev:",
  "        best_rev = revenue",
  "        best_tuition = tuition",
  "",
  "print(best_rev, best_tuition)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> c(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> c[i];",
  "    }",
  "    sort(c.begin(), c.end());",
  "    long long bestRev = 0;",
  "    long long bestT = c[0];",
  "    for (int i = 0; i < N; i++) {",
  "        long long rev = c[i] * (long long)(N - i);",
  "        if (rev > bestRev) {",
  "            bestRev = rev;",
  "            bestT = c[i];",
  "        }",
  "    }",
  "    cout << bestRev << \" \" << bestT << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowCollegeSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "The answer is the max revenue and the price that makes it.\nOnce sorted, picking c[i] as the price means exactly N-i\ncows can afford it.\nSo we sort, then check the revenue at every c[i] and keep\nthe best one.",
          "답은 최대 총 수입과 그 수입을 만드는 등록금이에요.\n정렬하면 c[i] 를 등록금으로 할 때 딱 N-i 마리가\n낼 수 있어요.\n그래서 정렬한 뒤 c[i] 마다 수입을 계산해\n가장 큰 값을 찾아요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 의 list, map 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, vector, algorithm).",
            "#include 는 배운 헤더(iostream, vector, algorithm)를 하나씩 나눠 적어요."),
        t(E, "tuition * cows can overflow int — long long with explicit cast keeps it safe.",
            "tuition * cows 는 int 범위를 넘을 수 있어서 long long 으로 바꿔 줘요."),
      ],
    },
  ];
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이의 표시용 원본이다 — 절대 안 바꾸고,
   그대로 가져와 beats(설명 말풍선)만 덧붙인다. getCowCollegeSections() 는 PDF 다운로드가
   계속 쓰므로 그대로 둔다. ── */
export function getCowCollegeWalk(E, lang = "py") {
  const vars = [
    { v: "c", ko: "소마다 낼 수 있는 최대 등록금", en: "each cow's max tuition" },
    { v: "best_rev/bestRev", ko: "지금까지 찾은 가장 큰 수입", en: "biggest revenue found so far" },
  ];
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars,
      beats: [
        { hi: [0, 11], bubble: t(E,
          "What do we hand back? The max revenue and the tuition price that makes it. Read N and each cow's max tuition into c — long long, since revenue (price × cows) can get big.",
          "무엇을 내놓아야 하나요? 최대 수입과 그 수입을 만드는 등록금이에요.\nN 과 각 소의 최대 등록금 c 를 읽어요 — 수입(가격 × 소 수)이 커질 수 있어서 long long 을 써요.") },
        { hi: [12, 12], bubble: t(E,
          "Checking every price against every cow one by one would mean N candidates × N cows — way too slow once N is big. Sorting fixes it instantly: once sorted, everyone who can pay c[i] sits at index i or later — that's already N-i cows, no recounting needed.",
          "가격 후보 N 개 × 소 N 마리를 매번 다시 세면 너무 느려요.\n정렬해두면 c[i] 를 낼 수 있는 소가 i 번 자리부터 끝까지 모여요 — 그게 바로 N-i 마리라, 다시 셀 필요가 없어요.") },
        { hi: [13, 14], bubble: t(E,
          "Start tracking the best revenue (0) and the tuition that made it — the cheapest price c[0] always works, since every cow can afford it.",
          "지금까지 가장 큰 수입(0)과 그 등록금을 기억할 자리를 만들어요 — 가장 싼 가격 c[0] 은 모든 소가 낼 수 있어서 늘 성립해요.") },
        { hi: [15, 21], bubble: t(E,
          "Sweep every index i: N-i cows can afford tuition c[i] (the array is sorted, so everything from i onward is ≥ c[i]). Multiply for this price's revenue, and keep it if it beats the best so far.",
          "자리 i 마다 N-i 마리가 등록금 c[i] 를 낼 수 있어요 (정렬돼 있어서 i 번부터 끝까지 전부 c[i] 이상이에요).\n곱해서 이 가격의 수입을 구하고, 지금까지보다 크면 최고 기록으로 남겨요.") },
        { hi: [22, 24], bubble: t(E,
          "Print the best revenue and the tuition price that made it.",
          "가장 큰 수입과 그 등록금을 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars,
    beats: [
      { hi: [0, 1], bubble: t(E,
        "What do we hand back? The max revenue and the tuition price that makes it. Read N and each cow's max tuition into c.",
        "무엇을 내놓아야 하나요? 최대 수입과 그 수입을 만드는 등록금이에요.\nN 과 각 소의 최대 등록금 c 를 읽어요.") },
      { hi: [3, 3], bubble: t(E,
        "Checking every price against every cow one by one would mean N candidates × N cows — way too slow once N is big. Sorting fixes it instantly: once sorted, everyone who can pay c[i] sits at index i or later — that's already N-i cows, no recounting needed.",
        "가격 후보 N 개 × 소 N 마리를 매번 다시 세면 너무 느려요.\n정렬해두면 c[i] 를 낼 수 있는 소가 i 번 자리부터 끝까지 모여요 — 그게 바로 N-i 마리라, 다시 셀 필요가 없어요.") },
      { hi: [5, 6], bubble: t(E,
        "Start tracking the best revenue (0) and the tuition that made it — the cheapest price c[0] always works, since every cow can afford it.",
        "지금까지 가장 큰 수입(0)과 그 등록금을 기억할 자리를 만들어요 — 가장 싼 가격 c[0] 은 모든 소가 낼 수 있어서 늘 성립해요.") },
      { hi: [8, 14], bubble: t(E,
        "Sweep every index i: N-i cows can afford tuition c[i] (the array is sorted, so everything from i onward is ≥ c[i]). Multiply for this price's revenue, and keep it if it beats the best so far.",
        "자리 i 마다 N-i 마리가 등록금 c[i] 를 낼 수 있어요 (정렬돼 있어서 i 번부터 끝까지 전부 c[i] 이상이에요).\n곱해서 이 가격의 수입을 구하고, 지금까지보다 크면 최고 기록으로 남겨요.") },
      { hi: [16, 16], bubble: t(E,
        "Print the best revenue and the tuition price that made it.",
        "가장 큰 수입과 그 등록금을 출력해요.") },
    ],
  };
}

export function CowCollegeProgressiveCode(props) {
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


export function downloadCowCollegePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowCollege — Full Study Guide", "CowCollege — 종합 풀이 노트");
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

