import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   Mcc19CandyDeepAuditSim — pick N, step through each elimination
   round, watch odd-position people drop, see who survives.
   ═══════════════════════════════════════════════════════════════ */
const _MCC_PRESETS = [
  { n: 4,  label: "N=4"  },
  { n: 6,  label: "N=6"  },
  { n: 8,  label: "N=8"  },
  { n: 10, label: "N=10" },
  { n: 13, label: "N=13" },
];

export function Mcc19CandyDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { n: N } = _MCC_PRESETS[pi];

  // history[r] = { alive: [original numbers alive at start of round r], eliminated: [...] }
  const buildHistory = (n) => {
    const h = [];
    let cur = Array.from({ length: n }, (_, i) => i + 1);
    h.push({ alive: [...cur], eliminated: [] });
    while (cur.length > 1) {
      const elim = cur.filter((_, i) => (i + 1) % 2 === 1);
      const surv = cur.filter((_, i) => (i + 1) % 2 === 0);
      h.push({ alive: surv, eliminated: elim, prev: [...cur] });
      cur = surv;
    }
    return h;
  };

  const history = buildHistory(N);
  const totalRounds = history.length - 1;
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setRound(0);
    setDone(false);
  };

  const advance = () => {
    if (round < totalRounds) setRound(round + 1);
    else setDone(true);
  };
  const reset = () => { setRound(0); setDone(false); };

  const cur = history[round];
  const survivor = history[totalRounds].alive[0];

  // Render a row of numbered candy chips. If `prev` provided, mark odd positions as eliminated.
  const renderRow = (people, prev) => {
    const list = prev || people;
    return (
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 6 }}>
        {list.map((num, i) => {
          const odd = (i + 1) % 2 === 1;
          const eliminated = !!prev && odd;
          return (
            <div key={`${num}-${i}`} style={{
              minWidth: 36, height: 44, padding: "0 8px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              borderRadius: 10,
              background: eliminated ? "#f3f4f6" : "#fef2f2",
              border: `1.5px solid ${eliminated ? "#d1d5db" : "#dc2626"}`,
              color: eliminated ? "#9ca3af" : "#7f1d1d",
              textDecoration: eliminated ? "line-through" : "none",
              boxShadow: eliminated ? "none" : "0 1px 2px rgba(220,38,38,0.15)",
              opacity: eliminated ? 0.55 : 1,
            }}>
              <div style={{ fontSize: 14, lineHeight: 1 }}>🍬</div>
              <div style={{ fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>
                {num}
              </div>
              <div style={{ fontSize: 8, color: C.dim, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>
                #{i + 1}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_MCC_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Step through each round. Odd-position candies (#1, #3, #5, …) drop out; the rest renumber from 1.",
          "한 라운드씩 살펴봐. 홀수 위치 사탕 (#1, #3, #5, …) 이 탈락하고, 나머지가 1 부터 다시 번호 매겨져요.")}
      </div>

      {/* Round header */}
      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
        padding: "6px 10px", marginBottom: 8, textAlign: "center",
        fontSize: 12, fontWeight: 700, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace",
      }}>
        {round === 0
          ? t(E, `Round 0 — start: ${N} people lined up`, `라운드 0 — 시작: ${N} 명 정렬`)
          : t(E,
              `Round ${round}: ${cur.prev.length} → ${cur.alive.length} (eliminated ${cur.eliminated.length})`,
              `라운드 ${round}: ${cur.prev.length} → ${cur.alive.length} (탈락 ${cur.eliminated.length})`)}
      </div>

      {/* Visualization */}
      <div style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: "10px 8px", marginBottom: 10, minHeight: 70,
      }}>
        {round === 0
          ? renderRow(cur.alive, null)
          : renderRow(cur.alive, cur.prev)}
        {round > 0 && (
          <div style={{
            fontSize: 11, color: C.dim, textAlign: "center", marginTop: 6,
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            {t(E,
              `Eliminated this round: [${cur.eliminated.join(", ")}]   ·   Surviving: [${cur.alive.join(", ")}]`,
              `이번 라운드 탈락: [${cur.eliminated.join(", ")}]   ·   생존: [${cur.alive.join(", ")}]`)}
          </div>
        )}
      </div>

      {/* Tally */}
      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "alive", "생존")} = {cur.alive.length} &nbsp; {t(E, "round", "라운드")} = {round} / {totalRounds}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d" }}>
          {round < totalRounds
            ? t(E, "more rounds to go…", "더 많은 라운드 남았어…")
            : t(E, "one survivor ✓", "한 명 생존 ✓")}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={advance} disabled={done} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: done ? "#e5e7eb" : A, color: done ? "#9ca3af" : "#fff",
          fontSize: 12, fontWeight: 700, cursor: done ? "default" : "pointer",
        }}>
          {round < totalRounds
            ? t(E, "▶ Next round", "▶ 다음 라운드")
            : t(E, "🔍 Reveal survivor", "🔍 생존자 공개")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 초기화")}
        </button>
      </div>

      {/* Verdict */}
      {done && (
        <div style={{
          background: "#ecfdf5", border: "1px solid #6ee7b7",
          borderRadius: 10, padding: "10px 14px",
          color: "#065f46", fontSize: 13, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 800, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, `N=${N} → survivor = ${survivor}`, `N=${N} → 생존자 = ${survivor}`)}
          </div>
          <div style={{ fontSize: 12 }}>
            {t(E,
              `After ${totalRounds} round${totalRounds === 1 ? "" : "s"} of odd-position elimination, only person ${survivor} remains. Notice the survivor is always the largest power of 2 that is ≤ N.`,
              `홀수 위치 탈락을 ${totalRounds} 라운드 반복하면 ${survivor} 번만 남아. 생존자는 항상 N 이하의 가장 큰 2의 거듭제곱이라는 점이 보여.`)}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "",
  "# Simulate: people in a queue numbered 1..N",
  "people = list(range(1, N + 1))",
  "",
  "while len(people) > 1:",
  "    # Remove people at odd positions (1-indexed)",
  "    people = [people[i] for i in range(len(people)) if (i + 1) % 2 == 0]",
  "",
  "print(people[0])",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long N; cin >> N;",
  "",
  "    // Simulate: people in a queue numbered 1..N",
  "    auto people = list(range(1, N + 1));",
  "",
  "    while (len(people) > 1) {",
  "        // Remove people at odd positions (1-indexed)",
  "        auto people = [people[i] for i in range(len(people)) if (i + 1) % 2 == 0];",
  "",
  "    cout << people[0] << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc19CandySections(E) {
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

export function Mcc19CandyProgressiveCode(props) {
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


export function downloadMcc19CandyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Candy — Full Study Guide", "Mcc19Candy — 종합 풀이 노트");
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

