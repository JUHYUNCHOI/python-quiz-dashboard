// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 4/12 (WA - algorithm wrong (counts 1-blocks))
//   C++:    4/12 (WA - same as py (counts 1-blocks))
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* ─────────────────────────────────────────────────────────────
   InfectionSim — pick initial sources, watch the wave spread.
   Eye-evident proof: a single source only ever makes ODD-sized
   blocks (1, 3, 5, 7...). An even-sized block can never come
   from just one source. (Counting "runs" is NOT the answer —
   see the code chapter for why.)
   ───────────────────────────────────────────────────────────── */
export function InfectionSim({ E }) {
  const N = 9;
  const [sources, setSources] = useState(() => Array(N).fill(false));
  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  // Compute infection state at given day
  const stateAt = (d) => {
    const out = sources.slice();
    for (let step = 0; step < d; step++) {
      const next = out.slice();
      for (let i = 0; i < N; i++) {
        if (out[i]) { if (i > 0) next[i - 1] = true; if (i + 1 < N) next[i + 1] = true; }
      }
      for (let i = 0; i < N; i++) out[i] = next[i];
    }
    return out;
  };

  const cur = stateAt(day);
  const sourceCount = sources.filter(Boolean).length;
  const sickCount = cur.filter(Boolean).length;
  const maxDay = N; // enough nights to cover any spread

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => {
      setDay((d) => {
        if (d >= maxDay) { setPlaying(false); return d; }
        return d + 1;
      });
    }, 700);
    return () => clearTimeout(timerRef.current);
  }, [playing, day, maxDay]);

  const reset = () => { setDay(0); setPlaying(false); };
  const toggleSource = (i) => {
    if (day !== 0) return; // only when at day 0
    const u = sources.slice(); u[i] = !u[i]; setSources(u); setPlaying(false);
  };
  const stepOnce = () => { if (day < maxDay) { setDay(day + 1); setPlaying(false); } };

  // Suggest two presets — eye-evident lessons
  const setPreset = (which) => {
    const u = Array(N).fill(false);
    if (which === "one") u[4] = true;                          // 1 source middle
    if (which === "split") { u[1] = true; u[6] = true; }       // 2 sources, gap
    setSources(u); setDay(0); setPlaying(false);
  };

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: A }}>
          🦠 {t(E, "Spread Simulator", "감염 시뮬레이터")}
        </div>
        <div style={{ fontSize: 11, color: C.dim }}>
          {t(E, "Click cows to mark Day 0 sources, then play.", "소를 눌러 0일차 감염을 표시한 뒤 재생해요.")}
        </div>
      </div>

      {/* Row of cows */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {cur.map((sick, i) => {
          const isSource = sources[i];
          const justInfected = sick && !isSource && day > 0 && !stateAt(day - 1)[i];
          return (
            <button
              key={i}
              onClick={() => toggleSource(i)}
              disabled={day !== 0}
              style={{
                width: 44, height: 52,
                borderRadius: 10,
                border: isSource ? "2.5px solid #dc2626" : sick ? "2px solid #f59e0b" : `1.5px solid ${C.border}`,
                background: isSource ? "#fee2e2" : sick ? "#fef3c7" : "#f8fafc",
                color: sick ? "#991b1b" : C.text,
                fontSize: 22,
                cursor: day === 0 ? "pointer" : "default",
                transition: "all 0.4s",
                transform: justInfected ? "scale(1.15)" : "scale(1)",
                position: "relative",
              }}
              title={isSource ? t(E, "Day 0 source", "0일차 감염원") : ""}
            >
              {sick ? "🐮" : "🐄"}
              <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, fontSize: 9, color: C.dim }}>{i}</div>
            </button>
          );
        })}
      </div>

      {/* Final state string */}
      <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: 14, marginBottom: 10, color: C.text }}>
        {t(E, "State", "상태")}: <b style={{ color: A }}>"{cur.map(b => b ? "1" : "0").join("")}"</b>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "space-around", gap: 8, marginBottom: 10, fontSize: 12 }}>
        <div style={{ background: "#fee2e2", padding: "4px 10px", borderRadius: 6, color: "#991b1b" }}>
          {t(E, "Day 0 sources", "0일차 감염")}: <b>{sourceCount}</b>
        </div>
        <div style={{ background: "#dbeafe", padding: "4px 10px", borderRadius: 6, color: "#1e40af" }}>
          {t(E, "Night", "밤")}: <b>{day}</b>
        </div>
        <div style={{ background: "#fef3c7", padding: "4px 10px", borderRadius: 6, color: "#92400e" }}>
          {t(E, "Sick now", "현재 감염")}: <b>{sickCount}</b>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setPlaying(p => !p)} disabled={sourceCount === 0 || day >= maxDay}
          style={{ background: A, color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: sourceCount === 0 || day >= maxDay ? 0.4 : 1 }}>
          {playing ? `⏸ ${t(E, "Pause", "일시정지")}` : `▶ ${t(E, "Play", "재생")}`}
        </button>
        <button onClick={stepOnce} disabled={sourceCount === 0 || day >= maxDay}
          style={{ background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: sourceCount === 0 || day >= maxDay ? 0.4 : 1 }}>
          ⏭ {t(E, "Step", "한 밤")}
        </button>
        <button onClick={reset}
          style={{ background: "#fff", color: C.dim, border: `1.5px solid ${C.border}`, borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          ↺ {t(E, "Reset", "처음")}
        </button>
        <button onClick={() => setPreset("one")}
          style={{ background: "#f5f3ff", color: A, border: `1px dashed ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
          {t(E, "Preset: 1 in middle", "예: 가운데 1개")}
        </button>
        <button onClick={() => setPreset("split")}
          style={{ background: "#f5f3ff", color: A, border: `1px dashed ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
          {t(E, "Preset: 2 with gap", "예: 떨어진 2개")}
        </button>
      </div>

      {/* Insight callout */}
      {day > 0 && sourceCount === 1 && sickCount === 2 * day + 1 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#15803d" }}>
          💡 {t(E,
            `1 source, ${day} night(s) → block size = 2×${day}+1 = ${sickCount}. Always ODD (1,3,5,7...). An EVEN-size block can never come from 1 source.`,
            `감염원 1마리, ${day}일 밤 → 덩어리 크기 2×${day}+1 = ${sickCount}칸. 항상 홀수예요 (1,3,5,7...). 짝수 크기 덩어리는 감염원 1마리로 못 만들어요.`)}
        </div>
      )}
      {day > 0 && sourceCount > 1 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#15803d" }}>
          💡 {t(E,
            `${sourceCount} sources, ${countRuns(cur)} run(s) of 1s so far.`,
            `감염원 ${sourceCount}마리, 지금 1 덩어리는 ${countRuns(cur)}개예요.`)}
        </div>
      )}
    </div>
  );
}

function countRuns(arr) {
  let n = 0, prev = false;
  for (const v of arr) { if (v && !prev) n++; prev = v; }
  return n;
}

/* ─────────────────────────────────────────────────────────────
   RunsViz — given a final-state string, highlight each run of 1s
   and its length. Eye-evident: some blocks are odd, some are
   even — counting blocks alone is NOT the answer (an even block
   needs more than 1 source; see the code chapter for the exact
   count).
   ───────────────────────────────────────────────────────────── */
export function RunsViz({ E, str = "01110110" }) {
  const chars = str.split("");
  const ODD = A;          // purple = odd-length block
  const EVEN = "#dc2626"; // red = even-length block
  // Assign group id per run of 1s
  let g = -1; let prev = "0";
  const groupOf = chars.map((c) => {
    if (c === "1" && prev !== "1") g++;
    prev = c;
    return c === "1" ? g : -1;
  });
  const numGroups = g + 1;
  const groupLens = Array(numGroups).fill(0);
  groupOf.forEach((gi) => { if (gi >= 0) groupLens[gi]++; });
  const hasEven = groupLens.some((len) => len % 2 === 0);

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: A, marginBottom: 8 }}>
        🔍 {t(E, "Block sizes", "덩어리 크기")}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {chars.map((c, i) => {
          const gi = groupOf[i];
          const isEven = gi >= 0 && groupLens[gi] % 2 === 0;
          const color = gi >= 0 ? (isEven ? EVEN : ODD) : "#94a3b8";
          return (
            <div key={i} style={{
              width: 36, height: 44,
              borderRadius: 8,
              border: `2px solid ${gi >= 0 ? color : C.border}`,
              background: gi >= 0 ? `${color}15` : "#f8fafc",
              color: gi >= 0 ? color : C.dim,
              fontFamily: "monospace", fontWeight: 800, fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              {c}
              {gi >= 0 && (
                <div style={{ position: "absolute", top: -9, left: 0, right: 0, fontSize: 9, color, fontWeight: 700 }}>
                  {groupLens[gi]}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 8, fontSize: 11 }}>
        <span style={{ color: ODD }}>■ {t(E, "odd-size block", "홀수 크기 덩어리")}</span>
        <span style={{ color: EVEN }}>■ {t(E, "even-size block", "짝수 크기 덩어리")}</span>
      </div>
      <div style={{ marginTop: 8, padding: "6px 10px", background: hasEven ? "#fef2f2" : "#f5f3ff", borderRadius: 6, fontSize: 11, color: hasEven ? "#b91c1c" : "#5b21b6", textAlign: "center", wordBreak: "keep-all" }}>
        {hasEven
          ? t(E, "The red block is even-sized — it can't come from just 1 source. Counting blocks alone isn't enough.",
                  "빨간 덩어리는 짝수 크기예요 — 감염원 1마리로는 못 만들어요. 덩어리 개수만 세면 부족해요.")
          : t(E, "All blocks here are odd-sized.",
                  "여기 있는 덩어리는 모두 홀수 크기예요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "s = input().strip()",
  "",
  "# Break the string into runs (blocks) of consecutive 1s.",
  "blocks = []",
  "run_len = 0",
  "for i in range(N):",
  "    if s[i] == '1':",
  "        run_len += 1",
  "    else:",
  "        if run_len > 0:",
  "            blocks.append(run_len)",
  "        run_len = 0",
  "if run_len > 0:",
  "    blocks.append(run_len)",
  "",
  "if len(blocks) == 0:",
  "    print(0)",
  "else:",
  "    # A source spreading for D nights covers a window of size",
  "    # W = 2*D + 1 (always odd). A bigger W needs the same or",
  "    # fewer sources, so we want the LARGEST W that still fits",
  "    # every block exactly -- no window may leak into a 0.",
  "    #",
  "    # A block touching the string's edge can use W up to",
  "    # 2*block - 1, since the edge blocks the spread on that side.",
  "    # An EVEN interior block can never split into equal odd",
  "    # windows without leaking, so its limit is block - 1.",
  "    # An ODD interior block allows W up to block.",
  "    best_window = -1",
  "    first_idx = 0",
  "    last_idx = len(blocks) - 1",
  "",
  "    if s[0] == '1':",
  "        limit = 2 * blocks[first_idx] - 1",
  "        if best_window == -1 or limit < best_window:",
  "            best_window = limit",
  "        first_idx += 1",
  "",
  "    if s[N - 1] == '1':",
  "        limit = 2 * blocks[last_idx] - 1",
  "        if best_window == -1 or limit < best_window:",
  "            best_window = limit",
  "        last_idx -= 1",
  "",
  "    for i in range(first_idx, last_idx + 1):",
  "        block = blocks[i]",
  "        if block % 2 == 0:",
  "            limit = block - 1",
  "        else:",
  "            limit = block",
  "        if best_window == -1 or limit < best_window:",
  "            best_window = limit",
  "",
  "    total = 0",
  "    for block in blocks:",
  "        total += (block + best_window - 1) // best_window",
  "",
  "    print(total)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    string s;",
  "    cin >> s;",
  "",
  "    vector<int> blocks;",
  "    int runLen = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        if (s[i] == '1') {",
  "            runLen++;",
  "        } else {",
  "            if (runLen > 0) {",
  "                blocks.push_back(runLen);",
  "            }",
  "            runLen = 0;",
  "        }",
  "    }",
  "    if (runLen > 0) {",
  "        blocks.push_back(runLen);",
  "    }",
  "",
  "    if (blocks.empty()) {",
  "        cout << 0 << \"\\n\";",
  "        return 0;",
  "    }",
  "",
  "    int bestWindow = -1;",
  "    int firstIdx = 0;",
  "    int lastIdx = (int)blocks.size() - 1;",
  "",
  "    if (s[0] == '1') {",
  "        int limit = 2 * blocks[firstIdx] - 1;",
  "        if (bestWindow == -1 || limit < bestWindow) {",
  "            bestWindow = limit;",
  "        }",
  "        firstIdx++;",
  "    }",
  "",
  "    if (s[N - 1] == '1') {",
  "        int limit = 2 * blocks[lastIdx] - 1;",
  "        if (bestWindow == -1 || limit < bestWindow) {",
  "            bestWindow = limit;",
  "        }",
  "        lastIdx--;",
  "    }",
  "",
  "    for (int i = firstIdx; i <= lastIdx; i++) {",
  "        int block = blocks[i];",
  "        int limit;",
  "        if (block % 2 == 0) {",
  "            limit = block - 1;",
  "        } else {",
  "            limit = block;",
  "        }",
  "        if (bestWindow == -1 || limit < bestWindow) {",
  "            bestWindow = limit;",
  "        }",
  "    }",
  "",
  "    int total = 0;",
  "    for (int block : blocks) {",
  "        total += (block + bestWindow - 1) / bestWindow;",
  "    }",
  "",
  "    cout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowntactSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we need? The smallest number of cows sick on day 0 to reach\nthis final string of 0s and 1s, after ANY number of nights D.",
            "무엇을 내놓아야 하나요? 이 최종 문자열이 나오려면 0일차에 감염돼\n있어야 했던 소의 최소 수예요. 며칠 밤이 지났는지(D)도 우리가 골라요."),
        t(E, "Key idea: D nights turns one source into a window of 2D+1 ones. A bigger\nwindow always needs fewer sources, so pick the LARGEST window that still\nfits every run of 1s exactly (no leaking into a neighboring 0).",
            "핵심 아이디어: D 일이 지나면 감염원 하나가 2D+1 칸짜리 창이 돼요.\n창이 클수록 감염원이 적게 필요하니, 1 덩어리마다 딱 맞고 옆의 0으로\n새지 않는 가장 큰 창을 골라요."),
        t(E, "A run touching the string's edge can use a wider window (edge blocks the\nleak). A run with EVEN length can't be split evenly, so it loses 1.\nThen just sum ceil(run / window) over every run.",
            "문자열 끝에 닿은 덩어리는 창을 더 넓게 써도 돼요 (끝에서는 샐 곳이\n없으니까). 길이가 짝수인 덩어리는 딱 맞게 못 나눠서 1을 손해 봐요.\n그다음 덩어리마다 ceil(길이 / 창)을 더해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, string, vector).",
            "#include 는 배운 헤더(iostream, string, vector)를 하나씩 나눠 적어요."),
      ],
    },
  ];
}

export function CowntactProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
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


export function downloadCowntactPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cowntact — Full Study Guide", "Cowntact — 종합 풀이 노트");
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

