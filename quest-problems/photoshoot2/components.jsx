// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 14/14 on cpid=1204
// 🔒 USACO_VERIFIED (2026-05-13) / C++ rewritten 2026-06-15
//   Python: 14/14 PASS (USACO)
//   C++:    rewritten to the correct leftward-modification greedy (running-max
//           inversion count, mirrors the Python). Local-verified vs both official
//           samples (cpid 1204): S1→0, S2→2. Old code used a wrong adjacent-swap
//           algo (1/14 WA). Pending USACO re-submission to restore the full 14/14 seal.
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ─────────────────────────────────────────────────────────────
   Swap Counter Sim — interactive walk-through of the greedy
   algorithm. Walks target left→right; each cow whose current
   position falls below the running max counts as one move-left.
   ───────────────────────────────────────────────────────────── */
export function Photoshoot2SwapSim({ E }) {
  // Demo arrangement: current = [3,1,4,2], target = [1,2,3,4]
  const target = [1, 2, 3, 4];
  const current = [3, 1, 4, 2];
  const posMap = {};
  current.forEach((c, i) => { posMap[c] = i; });

  // Step 0 = before any cow visited; step k = after target[k-1] processed.
  const [step, setStep] = useState(0);

  // Re-derive walk state up to current step
  const walk = [];
  let maxPos = -1;
  let moves = 0;
  for (let k = 0; k < target.length; k++) {
    const cow = target[k];
    const p = posMap[cow];
    let needMove = false;
    if (p < maxPos) { moves += 1; needMove = true; }
    else { maxPos = p; }
    walk.push({ cow, p, maxPosAfter: maxPos, movesAfter: moves, needMove });
  }
  const visited = step; // number of target cows processed
  const movesShown = visited > 0 ? walk[visited - 1].movesAfter : 0;
  const maxShown = visited > 0 ? walk[visited - 1].maxPosAfter : -1;
  const lastEv = visited > 0 ? walk[visited - 1] : null;

  const cowEmoji = "🐮";
  const reset = () => setStep(0);
  const nextStep = () => setStep(s => Math.min(target.length, s + 1));

  // Mark which target cows have been processed; among current,
  // highlight the cow just looked at, plus the running-max position.
  const processedSet = new Set(target.slice(0, visited));
  const focusCow = lastEv ? lastEv.cow : null;

  const cellBox = (label, value, color) => (
    <div style={{
      background: "#fff", border: `1.5px solid ${color}`, borderRadius: 8,
      padding: "6px 10px", textAlign: "center", minWidth: 64,
    }}>
      <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  );

  const rowOfCows = (arr, opts) => (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {arr.map((cow, i) => {
        const isFocus = opts.highlightCow === cow;
        const isProcessed = opts.processed && opts.processed.has(cow);
        const isMaxPos = opts.maxIdx === i;
        const bg = isFocus ? "#fed7aa" : isProcessed ? "#fff7ed" : "#fff";
        const border = isFocus ? A : isMaxPos ? "#7c3aed" : "#fdba74";
        return (
          <div key={i} style={{
            width: 50, height: 56,
            background: bg,
            border: `2px solid ${border}`,
            borderRadius: 8,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: isFocus ? `0 0 0 3px ${A}33` : "none",
            transition: "all 180ms ease",
          }}>
            <div style={{ fontSize: 18 }}>{cowEmoji}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: isFocus ? "#9a3412" : C.text }}>{cow}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{
      background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 12,
      padding: 14, marginBottom: 10,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 10, textAlign: "center" }}>
        🎬 {t(E, "Walk-through Sim", "동작 시뮬레이션")}
      </div>

      {/* Target row */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          {t(E, "TARGET (walk left → right)", "목표 순서 (왼쪽 → 오른쪽으로 훑기)")}
        </div>
        {rowOfCows(target, { processed: processedSet, highlightCow: focusCow })}
      </div>

      {/* Current row with maxPos marker */}
      <div style={{ marginTop: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>
          {t(E, "CURRENT (positions)", "현재 줄 (위치)")}
        </div>
        {rowOfCows(current, { highlightCow: focusCow, maxIdx: maxShown })}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 4 }}>
          {current.map((_, i) => (
            <div key={i} style={{ width: 50, textAlign: "center", fontSize: 10, color: C.dim }}>{i}</div>
          ))}
        </div>
      </div>

      {/* Counters */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        {cellBox(t(E, "step", "스텝"), `${visited}/${target.length}`, "#7c3aed")}
        {cellBox(t(E, "max pos seen", "본 위치 최대"), maxShown < 0 ? "−1" : maxShown, "#7c3aed")}
        {cellBox(t(E, "moves needed", "필요한 이동"), movesShown, A)}
      </div>

      {/* Event line */}
      <div style={{
        background: "#fff", border: "1px dashed #fdba74", borderRadius: 8,
        padding: "8px 10px", fontSize: 12, color: "#9a3412", minHeight: 36,
        textAlign: "center", lineHeight: 1.5,
      }}>
        {!lastEv && t(E,
          "Click NEXT to walk the target order one cow at a time.",
          "다음 버튼을 눌러 목표 순서를 한 마리씩 훑어봐요.")}
        {lastEv && lastEv.needMove && t(E,
          `Cow ${lastEv.cow} sits at pos ${lastEv.p}, but max-seen is ${walk[visited-2]?.maxPosAfter ?? -1}. It must move LEFT → moves +1.`,
          `소 ${lastEv.cow} 는 위치 ${lastEv.p} 인데 지금까지 본 최대 위치는 ${walk[visited-2]?.maxPosAfter ?? -1} 이에요. 왼쪽으로 옮겨야 해요 → 이동 +1.`)}
        {lastEv && !lastEv.needMove && t(E,
          `Cow ${lastEv.cow} sits at pos ${lastEv.p} ≥ max-seen. It is already in order — no move.`,
          `소 ${lastEv.cow} 는 위치 ${lastEv.p} 로 지금까지 본 최대 위치보다 크거나 같아요. 이미 순서대로라 안 옮겨도 돼요.`)}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
        <button onClick={nextStep} disabled={visited >= target.length} style={{
          background: visited >= target.length ? "#fed7aa" : A,
          color: "#fff", border: "none", borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800,
          cursor: visited >= target.length ? "default" : "pointer",
        }}>{t(E, "Next ▶", "다음 ▶")}</button>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>{t(E, "↺ Reset", "↺ 처음으로")}</button>
      </div>

      {visited >= target.length && (
        <div style={{
          marginTop: 10, padding: "8px 12px", background: "#dcfce7",
          border: "1.5px solid #86efac", borderRadius: 8, textAlign: "center",
          fontSize: 13, fontWeight: 700, color: "#15803d",
        }}>
          ✅ {t(E,
            `Done! Total moves = ${movesShown}.`,
            `다 했어요! 총 이동은 ${movesShown} 번이에요.`)}
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "target = list(map(int, input().split()))",
  "current = list(map(int, input().split()))",
  "",
  "# Build position map: where each cow is in current",
  "pos = {}",
  "for i, cow in enumerate(current):",
  "    pos[cow] = i",
  "",
  "# Count inversions: cows not in correct relative order",
  "# A cow needs to move left if it appears after",
  "# a cow that should come after it in target",
  "ans = 0",
  "max_pos = -1",
  "for cow in target:",
  "    # Position of this cow in current arrangement",
  "    p = pos[cow]",
  "    if p < max_pos:",
  "        # This cow is to the left of a cow that",
  "        # should come before it -> needs moving",
  "        ans += 1",
  "    else:",
  "        max_pos = p",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> target(N), current(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> target[i];",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> current[i];",
  "    }",
  "",
  "    // pos[cow] = index of that cow in the current line",
  "    map<int,int> pos;",
  "    for (int i = 0; i < N; i++) {",
  "        pos[current[i]] = i;",
  "    }",
  "",
  "    // Walk the target order left to right. A cow must be moved",
  "    // left if its current position sits before one we've",
  "    // already locked in (the running max). Otherwise it stays.",
  "    long long ans = 0;",
  "    int maxPos = -1;",
  "    for (int i = 0; i < N; i++) {",
  "        int p = pos[target[i]];",
  "        if (p < maxPos) {",
  "            ans++;",
  "        } else {",
  "            maxPos = p;",
  "        }",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고,
   beats(설명 말풍선)만 덧붙인다. getPhotoshoot2Sections() 는 PDF 다운로드가 계속 쓰므로
   그대로 둔다. ── */
export function getPhotoshoot2Walk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "pos", ko: "소 번호 → current 안 위치", en: "cow number → its index in current" },
        { v: "maxPos", ko: "지금까지 본 위치의 최댓값", en: "largest position seen so far" },
        { v: "ans", ko: "지금까지 센 이동 횟수", en: "move count so far" },
      ],
      beats: [
        { hi: [0, 14], bubble: t(E,
          "What should we output? The minimum number of moves. Read N, then fill the target and current arrays.",
          "무엇을 내놓아야 하나요? 최소 이동 횟수예요.\n먼저 N 을 읽고, target 과 current 배열도 채워요.") },
        { hi: [16, 20], bubble: t(E,
          "We need to know where each cow currently sits, so store cow → its index in current inside pos.",
          "각 소가 지금 어디 있는지 알아야 해서,\npos 에 소 번호 → current 배열 안 위치를 저장해요.") },
        { hi: [22, 26], bubble: t(E,
          "Now walk target left to right. Track the largest position seen so far (maxPos), and start the move count (ans) at 0.",
          "이제 target 을 왼쪽부터 훑어요.\n지금까지 본 위치의 최댓값(maxPos)을 기억해 두고, 이동 횟수(ans)는 0부터 시작해요.") },
        { hi: [27, 34], bubble: t(E,
          "For each cow, check its position p. If p is less than maxPos, it's out of order so ans increases by one; otherwise it becomes the new maxPos.",
          "소마다 위치 p 를 확인해요.\np 가 maxPos 보다 작으면 순서가 어긋난 거라 ans 를 하나 늘리고, 아니면 이 소가 새 maxPos 가 돼요.") },
        { hi: [35, 37], bubble: t(E,
          "Once done, print ans.",
          "다 훑었으면 ans 를 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "pos", ko: "소 번호 → current 안 위치", en: "cow number → its index in current" },
      { v: "max_pos", ko: "지금까지 본 위치의 최댓값", en: "largest position seen so far" },
      { v: "ans", ko: "지금까지 센 이동 횟수", en: "move count so far" },
    ],
    beats: [
      { hi: [0, 2], bubble: t(E,
        "What do we need to output? The minimum number of moves to reach the target order. So first read N, the target order, and the current order.",
        "무엇을 내놓아야 하나요? 목표 순서로 만드는 데 필요한 최소 이동 횟수예요.\n먼저 N, 목표 순서(target), 현재 순서(current)를 읽어요.") },
      { hi: [4, 7], bubble: t(E,
        "To count moves we first need to know where each cow currently sits. So build pos: cow number → its index in current.",
        "그 답을 구하려면 각 소가 지금 어디 있는지부터 알아야 해요.\n그래서 pos 에 소 번호 → 현재 위치를 저장해요.") },
      { hi: [9, 13], bubble: t(E,
        "Now walk the target order left to right. Track the largest current-position seen so far (max_pos), and start the move count (ans) at 0.",
        "이제 목표 순서를 왼쪽부터 훑을 거예요.\n지금까지 본 위치 중 가장 큰 값(max_pos)을 기억해 두고, 이동 횟수(ans)는 0부터 시작해요.") },
      { hi: [14, 22], bubble: t(E,
        "For each cow, check its current position p. If p is less than max_pos, it's out of order and must move (ans += 1); otherwise it becomes the new max_pos.",
        "소마다 현재 위치 p 를 확인해요.\np 가 max_pos 보다 작으면 이 소는 순서가 어긋난 거라 옮겨야 해요(ans += 1). 아니면 이 소가 새 max_pos 가 돼요.") },
      { hi: [24, 24], bubble: t(E,
        "Once the whole target order is walked, print ans — the minimum number of moves.",
        "다 훑었으면 ans 를 출력해요 — 그게 최소 이동 횟수예요.") },
    ],
  };
}

export function getPhotoshoot2Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? The fewest move-left ops to reach the target order.",
            "무엇을 답으로 내야 하나요?\n목표 순서를 맞추는 데 필요한 최소 이동 횟수예요."),
        t(E, "The only move is 'to anywhere farther left', so cows already in the right relative order can stay — only the rest need to move.",
            "동작이 '왼쪽 어디로든 옮기기' 뿐이라\n이미 순서가 맞는 소는 그대로 두고 나머지만 옮기면 돼요."),
        t(E, "So walk the target order and track the largest current-position seen so far. A cow whose current-position falls below that max is out of order — count her.",
            "그래서 목표 순서대로 훑으며 지금까지 본 위치의 최댓값을 기억해요.\n그보다 왼쪽에 있는 소는 순서가 어긋난 소예요 — 그 소를 세요."),
        t(E, "Every counted cow needs exactly one move; the rest are already fine, so the count itself is the answer.",
            "센 소들만 한 번씩 옮기면 나머지는 이미 순서가 맞아요.\n그래서 그 개수가 곧 정답이에요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 의 list, map 덕분에 알고리즘이 짧아져요."),
      ],
      cppOnly: [
        t(E, "std::map<int,int> mirrors Python's dict for the cow→position lookup.",
            "std::map<int,int> 가 Python 의 dict 역할을 해요 — 소로 위치를 찾아요."),
        t(E, "long long for the answer: with N up to 1e5 the move count can exceed int range.",
            "정답은 long long 으로 둬요 — N 이 최대 1e5 라 이동 수가 int 를 넘을 수 있거든요."),
      ],
    },
  ];
}

export function Photoshoot2ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadPhotoshoot2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photoshoot2 — Full Study Guide", "Photoshoot2 — 종합 풀이 노트");
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

