// rewritten 2026-06-15 — was wrong-problem (read a G/H string and pair
//   breeds); now solves the REAL USACO 2021 Jan Bronze #2 "Even More Odd
//   Photos" (cpid 1084): read N integer breed IDs, max groups whose sums
//   alternate even/odd. Official SAMPLEs pass (3 and 5; Python + C++ both).
//   USACO re-submit: PENDING.
// NOTE: OddPhotosSim below is the old wrong-problem parity-pairing toy —
//   no longer rendered by any chapter. TODO: sim redesign or delete.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ═══════════════════════════════════════════════════════════════
   OddPhotosSim — interactive parity pairing
   Click two cows: if their ID sum is ODD → pair them into ODD bin.
   If EVEN → pair them into EVEN bin. Track lonely (unpaired) cows.
   Teaches: odd+even=odd, odd+odd=even, even+even=even.
   ═══════════════════════════════════════════════════════════════ */
const _ODDP_PRESETS = [
  { ids: [3, 5, 2, 7, 4] },
  { ids: [2, 4, 6, 8] },
  { ids: [1, 3, 5, 7, 9] },
  { ids: [1, 2, 3, 4, 5, 6] },
];

export function OddPhotosSim({ E }) {
  const [pi, setPi] = useState(0);
  const ids = _ODDP_PRESETS[pi].ids;
  // status[i]: "free" | "selected" | "paired-odd" | "paired-even"
  const [status, setStatus] = useState(() => ids.map(() => "free"));
  const [oddBin, setOddBin] = useState([]);  // arrays of [i, j] pair indices
  const [evenBin, setEvenBin] = useState([]);
  const [flash, setFlash] = useState(null);  // "odd" | "even" | null

  const reset = (idx) => {
    setPi(idx);
    const np = _ODDP_PRESETS[idx].ids;
    setStatus(np.map(() => "free"));
    setOddBin([]);
    setEvenBin([]);
    setFlash(null);
  };

  const click = (i) => {
    if (status[i] !== "free" && status[i] !== "selected") return;
    const sel = status.map((s, k) => (s === "selected" ? k : -1)).filter(k => k >= 0);
    if (status[i] === "selected") {
      // deselect
      const ns = [...status]; ns[i] = "free"; setStatus(ns); return;
    }
    if (sel.length === 0) {
      const ns = [...status]; ns[i] = "selected"; setStatus(ns); return;
    }
    // sel.length === 1 → form a pair
    const j = sel[0];
    const sum = ids[i] + ids[j];
    const ns = [...status];
    if (sum % 2 === 1) {
      ns[i] = "paired-odd"; ns[j] = "paired-odd";
      setOddBin(prev => [...prev, [j, i]]);
      setFlash("odd");
    } else {
      ns[i] = "paired-even"; ns[j] = "paired-even";
      setEvenBin(prev => [...prev, [j, i]]);
      setFlash("even");
    }
    setStatus(ns);
    setTimeout(() => setFlash(null), 600);
  };

  const lonely = status.filter(s => s === "free" || s === "selected").length;

  const cowStyle = (s) => {
    if (s === "paired-odd") return { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e", op: 0.55 };
    if (s === "paired-even") return { bg: "#dbeafe", bd: "#3b82f6", fg: "#1e3a8a", op: 0.55 };
    if (s === "selected") return { bg: "#fce7f3", bd: "#db2777", fg: "#9d174d", op: 1 };
    return { bg: "#fff", bd: C.border, fg: C.text, op: 1 };
  };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_ODDP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            [{p.ids.join(",")}]
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Click two cows. If their ID sum is ODD → ODD-sum pair. EVEN → EVEN-sum pair.",
          "소 두 마리를 클릭. ID 합이 홀수면 → 홀수합 쌍. 짝수면 → 짝수합 쌍.")}
      </div>

      {/* cow row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
        {ids.map((v, i) => {
          const st = cowStyle(status[i]);
          return (
            <button key={i} onClick={() => click(i)} style={{
              width: 56, height: 64, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 10, fontFamily: "'JetBrains Mono',monospace",
              background: st.bg, border: `2px solid ${st.bd}`, color: st.fg,
              opacity: st.op, cursor: status[i].startsWith("paired") ? "default" : "pointer",
              transition: "all .2s",
            }}>
              <div style={{ fontSize: 20 }}>🐄</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 9, color: st.fg, opacity: 0.7 }}>
                {v % 2 === 0 ? "even" : "odd"}
              </div>
            </button>
          );
        })}
      </div>

      {/* bins */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div style={{
          background: "#fffbeb", border: `1.5px solid ${flash === "odd" ? "#f59e0b" : "#fde68a"}`,
          borderRadius: 10, padding: "8px 10px", minHeight: 64,
          boxShadow: flash === "odd" ? "0 0 0 3px #fcd34d55" : "none",
          transition: "box-shadow .3s, border-color .3s",
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
            🟧 {t(E, "ODD-sum pairs", "홀수합 쌍")} ({oddBin.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
            {oddBin.map((p, k) => (
              <span key={k} style={{ background: "#fde68a", padding: "2px 6px", borderRadius: 4, color: "#92400e" }}>
                {ids[p[0]]}+{ids[p[1]]}={ids[p[0]] + ids[p[1]]}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          background: "#eff6ff", border: `1.5px solid ${flash === "even" ? "#3b82f6" : "#bfdbfe"}`,
          borderRadius: 10, padding: "8px 10px", minHeight: 64,
          boxShadow: flash === "even" ? "0 0 0 3px #93c5fd55" : "none",
          transition: "box-shadow .3s, border-color .3s",
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#1e3a8a", marginBottom: 4 }}>
            🟦 {t(E, "EVEN-sum pairs", "짝수합 쌍")} ({evenBin.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
            {evenBin.map((p, k) => (
              <span key={k} style={{ background: "#bfdbfe", padding: "2px 6px", borderRadius: 4, color: "#1e3a8a" }}>
                {ids[p[0]]}+{ids[p[1]]}={ids[p[0]] + ids[p[1]]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* counters */}
      <div style={{
        background: "#fdf2f8", border: `1px solid #fbcfe8`, borderRadius: 10,
        padding: "10px 14px", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, color: "#9d174d", fontWeight: 700 }}>
          💔 {t(E, "lonely cows", "외로운 소")} = {lonely}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
          {t(E,
            "Rule: odd + odd = even, odd + even = odd, even + even = even.",
            "규칙: 홀+홀=짝, 홀+짝=홀, 짝+짝=짝.")}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "ids = list(map(int, input().split()))",
  "",
  "even = sum(1 for x in ids if x % 2 == 0)",
  "odd = N - even",
  "",
  "# Groups alternate: even-sum, odd-sum, even-sum, ...",
  "# Even-sum group = 1 even cow OR 2 odd cows.",
  "# Odd-sum group  = 1 odd cow.",
  "# All cows must be used, so leftover cows pile onto the",
  "# last group (extra evens keep parity; extra odds in pairs).",
  "# Try every group count k, keep the largest that works.",
  "ans = 0",
  "for k in range(N + 1):",
  "    even_groups = (k + 1) // 2   # positions 1,3,5... need even sum",
  "    odd_groups = k // 2          # positions 2,4,6... need odd sum",
  "    if odd_groups > odd:",
  "        continue                 # not enough odds",
  "    odds_left = odd - odd_groups",
  "    if odds_left % 2 != 0:",
  "        continue                 # leftover odds must pair up",
  "    # each even group needs a filler: 1 even OR 2 leftover odds",
  "    if even + odds_left // 2 >= even_groups:",
  "        ans = k",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    int even = 0, odd = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        int x;",
  "        cin >> x;",
  "        if (x % 2 == 0) even++;",
  "        else odd++;",
  "    }",
  "",
  "    // Groups alternate: even-sum, odd-sum, even-sum, ...",
  "    // Even-sum group = 1 even cow OR 2 odd cows.",
  "    // Odd-sum group  = 1 odd cow.",
  "    // All cows must be used: leftover evens keep parity,",
  "    // leftover odds must come in pairs.",
  "    // Try every group count k, keep the largest that works.",
  "    int ans = 0;",
  "    for (int k = 0; k <= N; k++) {",
  "        int evenGroups = (k + 1) / 2;   // positions 1,3,5...",
  "        int oddGroups = k / 2;          // positions 2,4,6...",
  "        if (oddGroups > odd) continue;  // not enough odds",
  "        int oddsLeft = odd - oddGroups;",
  "        if (oddsLeft % 2 != 0) continue; // leftover odds pair up",
  "        // each even group needs 1 even OR 2 leftover odds",
  "        if (even + oddsLeft / 2 >= evenGroups) ans = k;",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getOddPhotosSections(E) {
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
        t(E, "Read IDs one at a time and tally even vs odd with x % 2 — no array needed.",
            "ID 를 하나씩 읽으며 x % 2 로 짝/홀 개수만 세요 — 배열 필요 없음."),
        t(E, "Just loop k from 0..N and keep the largest k that satisfies the two checks.",
            "k 를 0~N 으로 돌리며 두 조건을 만족하는 가장 큰 k 를 답으로."),
      ],
    },
  ];
}

export function OddPhotosProgressiveCode(props) {
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


export function downloadOddPhotosPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "OddPhotos — Full Study Guide", "OddPhotos — 종합 풀이 노트");
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

