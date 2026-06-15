// 🔒 USACO_VERIFIED (rewritten to real Milk Exchange 2026-06-15)
//   This quest WAS a different (wrong) made-up problem; rewritten to the
//   real USACO 2024 Feb Bronze #2 "Milk Exchange" (cpid 1396).
//   Reference solution (brute O(N·M) simulation) matches all 3 official
//   samples exactly (3 1 RRL 1 1 1 → 2; 5 20 LLLLL 3 3 2 3 3 → 14;
//   9 5 RRRLRRLLR 5 8 4 9 3 4 9 5 4 → 38). USACO re-submit PENDING.
//   Brute sim TLEs on inputs 9+ (M up to 1e9) — same trade-off as before.
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ──────────────────────────────────────────────────────────────
   Full solution — brute simulation of M minutes
   Real Milk Exchange (USACO 2024 Feb Bronze #2).
   ────────────────────────────────────────────────────────────── */
const EX_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "M = int(data[p])",
  "p += 1",
  "S = data[p]; p += 1               # direction string, e.g. 'RRL'",
  "cap = [int(x) for x in data[p:p+N]]",
  "",
  "# Initial milk equals each cow's capacity",
  "cur = list(cap)",
  "",
  "for t in range(M):",
  "    # 1) every cow with milk passes 1L to its L/R neighbor",
  "    for i in range(N):",
  "        if cur[i] > 0:",
  "            cur[i] -= 1",
  "            j = (i + (1 if S[i] == 'R' else -1)) % N",
  "            cur[j] += 1",
  "    # 2) any cow over its cap loses the overflow",
  "    for i in range(N):",
  "        cur[i] = min(cur[i], cap[i])",
  "",
  "print(sum(cur))",
];

const EX_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "    string S;",
  "    cin >> S;                          // direction string",
  "    vector<int> cap(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> cap[i];",
  "    }",
  "    vector<int> cur = cap;             // initial milk = capacity",
  "",
  "    for (int t = 0; t < M; t++) {",
  "        for (int i = 0; i < N; i++) {",
  "            if (cur[i] > 0) {",
  "                cur[i]--;",
  "                int step;",
  "                if (S[i] == 'R') {",
  "                    step = 1;",
  "                } else {",
  "                    step = -1;",
  "                }",
  "                int j = (i + step + N) % N;",
  "                cur[j]++;",
  "            }",
  "        }",
  "        for (int i = 0; i < N; i++) {",
  "            cur[i] = min(cur[i], cap[i]);",
  "        }",
  "    }",
  "    long long total = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        total += cur[i];",
  "    }",
  "    cout << total << endl;",
  "    return 0;",
  "}",
];

export function getExchangeSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: EX_FULL_PY, cpp: EX_FULL_CPP,
      why: [
        t(E, "Read N, M, the direction string, then the N capacities. Each cow starts full.",
            "N, M, 방향 문자열, 그 다음 용량 N개를 읽어. 각 소는 가득 찬 채로 시작."),
        t(E, "Each minute: every cow with milk gives 1L to its L/R neighbor, then over-cap cells lose the overflow.",
            "매분: 우유 있는 소가 이웃에게 1L 전달, 그 다음 용량 초과는 버림."),
        t(E, "After M minutes, print the total milk left. This brute simulation is O(N·M).",
            "M분 후 남은 총 우유를 출력. 이 단순 시뮬은 O(N·M)."),
      ],
      pyOnly: [
        t(E, "sys.stdin.read().split() grabs every token at once — fast for big inputs.",
            "sys.stdin.read().split()으로 모든 토큰을 한 번에 — 큰 입력에 빠름."),
      ],
      cppOnly: [
        t(E, "Capacities ≤ 10^9 fit in int; only the final sum (up to N·10^9) needs long long.",
            "용량 ≤ 10^9은 int로 충분; 마지막 합계만 long long 필요 (N·10^9까지)."),
        t(E, "(i + step + N) % N keeps the index positive when stepping left.",
            "(i + step + N) % N으로 왼쪽 이동 시에도 인덱스가 음수가 되지 않게."),
      ],
    },
  ];
}

export function ExchangeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ──────────────────────────────────────────────────────────────
   ExchangeSim — STATIC worked-example of the official sample.
   (The old interactive sim was built for the WRONG problem and was
    removed during the rewrite to the real Milk Exchange.)
   // TODO: sim redesign for real problem
   ────────────────────────────────────────────────────────────── */
export function ExchangeSim({ E }) {
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        {t(E, "Worked example — Sample 1 (3 cows, RRL, caps 1 1 1, M=1)",
              "풀이 예제 — 샘플 1 (소 3마리, RRL, 용량 1 1 1, M=1)")}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", margin: "0 auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          <thead>
            <tr>
              {["", t(E, "cow 0", "소 0"), t(E, "cow 1", "소 1"), t(E, "cow 2", "소 2"), t(E, "total", "합계")].map((h, i) => (
                <th key={i} style={{ border: `1px solid ${C.border}`, padding: "5px 10px", color: C.dim, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: t(E, "direction", "방향"), cells: ["R", "R", "L"], tot: "", muted: true },
              { label: t(E, "start (full)", "시작 (가득)"), cells: ["1", "1", "1"], tot: "3" },
              { label: t(E, "after 1 min", "1분 후"), cells: ["0", "1*", "1"], tot: "2" },
            ].map((row, ri) => (
              <tr key={ri}>
                <td style={{ border: `1px solid ${C.border}`, padding: "5px 10px", color: C.dim, fontWeight: 700, whiteSpace: "nowrap" }}>{row.label}</td>
                {row.cells.map((c, ci) => (
                  <td key={ci} style={{
                    border: `1px solid ${C.border}`, padding: "5px 12px", textAlign: "center", fontWeight: 700,
                    color: c.includes("*") ? "#92400e" : (row.muted ? "#16a34a" : A),
                    background: c.includes("*") ? "#fef3c7" : "transparent",
                  }}>{c}</td>
                ))}
                <td style={{ border: `1px solid ${C.border}`, padding: "5px 12px", textAlign: "center", fontWeight: 800, color: row.tot ? "#16a34a" : "transparent" }}>{row.tot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, fontSize: 11.5, color: C.text, lineHeight: 1.7, textAlign: "center" }}>
        {t(E,
          "Cow 0→1 (R), Cow 1→2 (R), Cow 2→1 (L). Cow 1 receives from BOTH sides but cap=1, so 1L overflows (yellow *). Total = 0 + 1 + 1 = 2.",
          "소 0→1 (R), 소 1→2 (R), 소 2→1 (L). 소 1이 양쪽에서 받지만 용량 1 → 1L 넘침 (노랑 *). 합계 = 0 + 1 + 1 = 2.")}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ExchangeRunner — run the real simulation on a chosen sample.
   ────────────────────────────────────────────────────────────── */
const _RUNNER_PRESETS = [
  { label: "3 1 / RRL / 1 1 1", N: 3, M: 1, S: "RRL", cap: [1, 1, 1], out: 2 },
  { label: "5 20 / LLLLL / 3 3 2 3 3", N: 5, M: 20, S: "LLLLL", cap: [3, 3, 2, 3, 3], out: 14 },
  { label: "9 5 / RRRLRRLLR / 5 8 4 9 3 4 9 5 4", N: 9, M: 5, S: "RRRLRRLLR", cap: [5, 8, 4, 9, 3, 4, 9, 5, 4], out: 38 },
];

function _simulate(N, M, S, cap) {
  const cur = cap.slice();
  for (let t = 0; t < M; t++) {
    for (let i = 0; i < N; i++) {
      if (cur[i] > 0) {
        cur[i] -= 1;
        const j = (i + (S[i] === "R" ? 1 : -1) + N) % N;
        cur[j] += 1;
      }
    }
    for (let i = 0; i < N; i++) cur[i] = Math.min(cur[i], cap[i]);
  }
  return cur.reduce((a, b) => a + b, 0);
}

export function ExchangeRunner({ E }) {
  const [pi, setPi] = useState(0);
  const p = _RUNNER_PRESETS[pi];
  const total = _simulate(p.N, p.M, p.S, p.cap);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_RUNNER_PRESETS.map((preset, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{preset.label}</button>
        ))}
      </div>
      <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, textAlign: "center" }}>
        N={p.N}, M={p.M}, S={p.S}<br/>
        cap = [{p.cap.join(", ")}]<br/>
        → {t(E, "total milk after M minutes", "M분 후 총 우유")} = <b>{total}</b>
        {total === p.out && <span> ✅</span>}
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

export function downloadExchangePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "🥛 Milk Exchange — Full Study Guide", "🥛 Milk Exchange — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Feb Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
