// 🔒 USACO_VERIFIED — cpid=808, hoofball (2018 Feb Bronze #2, Hoof Paper Scissors)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('hoofball.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "pos = list(map(int, lines[1].split()))",
  "pos.sort()",
  "",
  "# 각 cow 마다 누구한테 패스하는지 (가까운 쪽, tie 시 왼쪽)",
  "target = [0] * N",
  "for i in range(N):",
  "    if i == 0:",
  "        target[i] = 1",
  "    elif i == N - 1:",
  "        target[i] = N - 2",
  "    else:",
  "        left_dist = pos[i] - pos[i - 1]",
  "        right_dist = pos[i + 1] - pos[i]",
  "        if left_dist <= right_dist:",
  "            target[i] = i - 1",
  "        else:",
  "            target[i] = i + 1",
  "",
  "# 각 cow 가 몇 번 받는지",
  "received = [0] * N",
  "for i in range(N):",
  "    received[target[i]] += 1",
  "",
  "# 1 단계: 아무도 안 주는 cow 마다 ball 1 개",
  "ans = 0",
  "for i in range(N):",
  "    if received[i] == 0:",
  "        ans += 1",
  "",
  "# 2 단계: 서로만 패스하는 인접 쌍 (mutual cycle) 마다 ball 1 개 추가",
  "for i in range(N - 1):",
  "    if target[i] == i + 1 and target[i + 1] == i:",
  "        if received[i] == 1 and received[i + 1] == 1:",
  "            ans += 1",
  "",
  "with open('hoofball.out', 'w') as file:",
  "    file.write(str(ans) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"hoofball.in\");",
  "    ofstream fout(\"hoofball.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> pos(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> pos[i];",
  "    }",
  "    sort(pos.begin(), pos.end());",
  "    if (N == 1) {",
  "        fout << 1 << \"\\n\";",
  "        return 0;",
  "    }",
  "    // 각 cow 마다 누구한테 패스하는지 (tie 시 왼쪽)",
  "    vector<int> target(N);",
  "    for (int i = 0; i < N; i++) {",
  "        if (i == 0) {",
  "            target[i] = 1;",
  "        }",
  "        else if (i == N - 1) target[i] = N - 2;",
  "        else {",
  "            int left_dist = pos[i] - pos[i - 1];",
  "            int right_dist = pos[i + 1] - pos[i];",
  "            if (left_dist <= right_dist) {",
  "                target[i] = i - 1;",
  "            }",
  "            else target[i] = i + 1;",
  "        }",
  "    }",
  "    // 받는 횟수",
  "    vector<int> received(N, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        received[target[i]]++;",
  "    }",
  "    // 1 단계: 안 받는 cow 마다 ball 1 개",
  "    int ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        if (received[i] == 0) {",
  "            ans++;",
  "        }",
  "    }",
  "    // 2 단계: 인접 mutual cycle 쌍마다 ball 1 개 추가",
  "    for (int i = 0; i < N - 1; i++) {",
  "        if (target[i] == i + 1 && target[i + 1] == i) {",
  "            if (received[i] == 1 && received[i + 1] == 1) {",
  "                ans++;",
  "            }",
  "        }",
  "    }",
  "    fout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getHoofballSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "What should we print? The minimum starting balls so every cow is touched.\nFirst find who each cow passes to (nearest neighbor) and how many passes\neach cow receives.\nA cow with zero passes needs her own ball — so does a mutual pair that\nonly throws to each other, since no ball from outside ever reaches them.",
          "무엇을 출력해야 하나요? 모두가 공을 만지는 데 필요한 시작 공의 최소 개수예요.\n먼저 소마다 누구에게 던지는지(가장 가까운 이웃) 정하고, 몇 번 받는지 세요.\n아무도 안 던져주는 소는 공을 따로 줘야 해요.\n서로한테만 던지는 짝도 바깥에서 오는 공이 없어 공을 하나 더 줘야 해요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 은 list, map 덕분에 알고리즘을 짧게 쓸 수 있어요."),
      ],
      cppOnly: [
        t(E, "INT_MAX as a sentinel lets boundary cows pick their only neighbor automatically.",
            "INT_MAX 를 표식으로 두면 양 끝 소가 저절로 하나뿐인 이웃을 고르게 돼요."),
        t(E, "vector<int> receives(N, 0) initializes every counter to zero in one line.",
            "vector<int> receives(N, 0) 한 줄로 세는 칸을 모두 0 으로 두고 시작해요."),
      ],
    },
  ];
}

export function HoofballProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이의 표시용 사본이다 — 배열 내용은
   절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. getHoofballSections() 는
   PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getHoofballWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "target", ko: "각 소가 패스하는 상대", en: "who each cow passes to" },
        { v: "received", ko: "각 소가 받는 횟수", en: "how many passes each cow receives" },
        { v: "ans", ko: "필요한 시작 공 개수", en: "starting balls needed" },
      ],
      beats: [
        { hi: [6, 17], bubble: t(E,
          "We'll need to know each cow's neighbors, so read all the positions and sort them along the line first.",
          "소마다 이웃을 알아야 하니, 먼저 모든 위치를 읽고 줄 위에서 정렬해요.") },
        { hi: [18, 21], bubble: t(E,
          "With just one cow there's no one to pass to — she needs her own ball, so handle that case right away.",
          "소가 한 마리뿐이면 패스할 상대가 없어요 — 공을 하나 줘야 하니 이 경우는 바로 처리해요.") },
        { hi: [22, 37], bubble: t(E,
          "Every cow passes to her nearest neighbor (ties go left) — record that in target.",
          "소마다 가장 가까운 이웃에게 패스해요 (거리가 같으면 왼쪽) — target 에 기록해요.") },
        { hi: [38, 42], bubble: t(E,
          "Now count, for each cow, how many passes she receives.",
          "이제 소마다 몇 번 패스를 받는지 세요.") },
        { hi: [43, 49], bubble: t(E,
          "A cow nobody passes to (received 0) needs her own starting ball — count those.",
          "아무도 패스해주지 않는 소(받은 횟수 0)는 자기 공이 필요해요 — 그런 소를 세요.") },
        { hi: [50, 57], bubble: t(E,
          "Why give that pair an extra ball? A pair that only passes to each other (and to no one else) forms a closed loop no outside ball ever reaches.",
          "왜 그 짝에 공을 하나 더 줄까요? 서로에게만 패스하는 짝(다른 곳으로는 안 감)은 바깥 공이 닿지 않는 닫힌 고리이기 때문이에요.") },
        { hi: [58, 60], bubble: t(E,
          "Write the total number of starting balls needed.",
          "필요한 시작 공의 총 개수를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "target", ko: "각 소가 패스하는 상대", en: "who each cow passes to" },
      { v: "received", ko: "각 소가 받는 횟수", en: "how many passes each cow receives" },
      { v: "ans", ko: "필요한 시작 공 개수", en: "starting balls needed" },
    ],
    beats: [
      { hi: [0, 6], bubble: t(E,
        "We'll need to know each cow's neighbors, so read all the positions and sort them along the line first.",
        "소마다 이웃을 알아야 하니, 먼저 모든 위치를 읽고 줄 위에서 정렬해요.") },
      { hi: [8, 21], bubble: t(E,
        "Every cow passes to her nearest neighbor (ties go left) — record that in target.",
        "소마다 가장 가까운 이웃에게 패스해요 (거리가 같으면 왼쪽) — target 에 기록해요.") },
      { hi: [23, 26], bubble: t(E,
        "Now count, for each cow, how many passes she receives.",
        "이제 소마다 몇 번 패스를 받는지 세요.") },
      { hi: [28, 32], bubble: t(E,
        "A cow nobody passes to (received 0) needs her own starting ball — count those.",
        "아무도 패스해주지 않는 소(받은 횟수 0)는 자기 공이 필요해요 — 그런 소를 세요.") },
      { hi: [34, 38], bubble: t(E,
        "Why give that pair an extra ball? A pair that only passes to each other (and to no one else) forms a closed loop no outside ball ever reaches.",
        "왜 그 짝에 공을 하나 더 줄까요? 서로에게만 패스하는 짝(다른 곳으로는 안 감)은 바깥 공이 닿지 않는 닫힌 고리이기 때문이에요.") },
      { hi: [40, 41], bubble: t(E,
        "Write the total number of starting balls needed.",
        "필요한 시작 공의 총 개수를 출력해요.") },
    ],
  };
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


export function downloadHoofballPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Hoofball — Full Study Guide", "Hoofball — 종합 풀이 노트");
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


/* ─────────────────────────────────────────────────────────────
   HoofballPassSim — interactive nearest-neighbor passing viz
   Cows on a number line. Each cow points to its nearest neighbor.
   Press ▶ to drop a ball at a "source" cow and watch passes ripple.
   Cows that never get pointed to are SOURCES — each needs its own ball.
   ───────────────────────────────────────────────────────────── */
const HBPRESETS = [
  { id: "tri",  label: "[1, 5, 10]",            pos: [1, 5, 10] },
  { id: "five", label: "[1, 3, 6, 10, 15]",     pos: [1, 3, 6, 10, 15] },
  { id: "pair", label: "[2, 4, 9, 11]",         pos: [2, 4, 9, 11] },
  { id: "six",  label: "[1, 2, 5, 9, 12, 13]",  pos: [1, 2, 5, 9, 12, 13] },
];

function hbComputeTargets(pos) {
  const N = pos.length;
  const target = new Array(N).fill(-1);
  if (N === 1) return target;
  for (let i = 0; i < N; i++) {
    if (i === 0) target[i] = 1;
    else if (i === N - 1) target[i] = N - 2;
    else {
      const ld = pos[i] - pos[i - 1];
      const rd = pos[i + 1] - pos[i];
      // tie → right (matches problem statement; solution uses left ties via different sign)
      target[i] = (rd <= ld) ? i + 1 : i - 1;
    }
  }
  return target;
}

export function HoofballPassSim({ E }) {
  const [presetId, setPresetId] = useState("tri");
  const preset = HBPRESETS.find(p => p.id === presetId) || HBPRESETS[0];
  const pos = preset.pos;
  const N = pos.length;
  const target = hbComputeTargets(pos);

  const received = new Array(N).fill(0);
  for (let i = 0; i < N; i++) if (target[i] >= 0) received[target[i]]++;
  const sources = [];
  for (let i = 0; i < N; i++) if (received[i] === 0) sources.push(i);

  const [playing, setPlaying] = useState(false);
  const [ballAt, setBallAt] = useState(null);
  const [touched, setTouched] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [seedIdx, setSeedIdx] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
  useEffect(() => () => clearTimer(), []);

  useEffect(() => {
    clearTimer();
    setPlaying(false);
    setBallAt(null);
    setTouched(new Set());
    setHistory([]);
    setSeedIdx(0);
  }, [presetId]);

  const startSeed = (idx) => {
    clearTimer();
    setBallAt(idx);
    setTouched(prev => { const n = new Set(prev); n.add(idx); return n; });
    setHistory([idx]);
  };

  const stepOnce = () => {
    setBallAt(curr => {
      if (curr == null) return curr;
      const nxt = target[curr];
      if (nxt < 0) return curr;
      setTouched(prev => { const n = new Set(prev); n.add(nxt); return n; });
      setHistory(h => [...h.slice(-3), nxt]);
      return nxt;
    });
  };

  const play = () => {
    if (playing) { clearTimer(); setPlaying(false); return; }
    setPlaying(true);
    if (ballAt == null) {
      const seeds = sources.length ? sources : [0];
      startSeed(seeds[seedIdx % seeds.length]);
    }
  };

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => {
      const last = history[history.length - 1];
      const nxt = last != null ? target[last] : null;
      if (last != null && nxt != null && target[nxt] === last && history.length >= 2) {
        // mutual pair — ball just bounces. Move on to next seed.
        const seeds = sources.length ? sources : [0];
        const next = (seedIdx + 1) % seeds.length;
        if (next === 0 || seeds.length === 0) { setPlaying(false); return; }
        setSeedIdx(next);
        startSeed(seeds[next]);
        return;
      }
      stepOnce();
    }, 700);
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, ballAt, history, seedIdx]);

  const reset = () => {
    clearTimer();
    setPlaying(false);
    setBallAt(null);
    setTouched(new Set());
    setHistory([]);
    setSeedIdx(0);
  };

  const W = 560, H = 200;
  const minP = pos[0], maxP = pos[N - 1];
  const padX = 40;
  const span = Math.max(1, maxP - minP);
  const xOf = p => padX + ((p - minP) / span) * (W - padX * 2);
  const cy = 110;

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 10, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
          {"🎮 "}{t(E, "Sim", "시뮬")}
        </div>
        <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
          {t(E,
            "Each cow's arrow points to her nearest neighbor (ties → right). Press ▶ to drop a ball and watch passes. Cows that no arrow points to are SOURCES — each needs its own ball.",
            "소의 화살표는 가장 가까운 이웃을 가리켜요 (거리가 같으면 오른쪽이에요). ▶ 를 누르면 공을 떨어뜨려 넘어가는 모습을 볼 수 있어요.\n아무 화살표도 안 가리키는 소를 '시작 소' 라고 불러요.\n시작 소는 공을 받을 데가 없으니 공을 하나씩 따로 줘야 해요.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
        {HBPRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => setPresetId(p.id)}
            style={{
              background: p.id === presetId ? A : "#fff",
              color: p.id === presetId ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{
        background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: 6, overflowX: "auto",
      }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: "block", margin: "0 auto" }}>
          <defs>
            <marker id="hbarrow" viewBox="0 0 10 10" refX="9" refY="5"
                    markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
            </marker>
            <marker id="hbarrowActive" viewBox="0 0 10 10" refX="9" refY="5"
                    markerUnits="strokeWidth" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={A} />
            </marker>
          </defs>

          <line x1={padX - 10} y1={cy + 30} x2={W - padX + 10} y2={cy + 30}
                stroke={C.dimLight} strokeWidth="2" />
          {pos.map((p, i) => (
            <g key={`tick-${i}`}>
              <line x1={xOf(p)} y1={cy + 26} x2={xOf(p)} y2={cy + 34}
                    stroke={C.dim} strokeWidth="1.5" />
              <text x={xOf(p)} y={cy + 50} textAnchor="middle" fontSize="11" fill={C.dim}>
                {p}
              </text>
            </g>
          ))}

          {target.map((tg, i) => {
            if (tg < 0) return null;
            const x1 = xOf(pos[i]);
            const x2 = xOf(pos[tg]);
            const dir = x2 > x1 ? 1 : -1;
            const cyArc = cy - 40 - (dir > 0 ? 0 : 12);
            const active = ballAt === i;
            const stroke = active ? A : "#7c3aed";
            const sw = active ? 3 : 1.8;
            const dx1 = x1 + dir * 14;
            const dx2 = x2 - dir * 14;
            return (
              <path
                key={`arr-${i}`}
                d={`M ${dx1} ${cy - 14} Q ${(dx1 + dx2) / 2} ${cyArc} ${dx2} ${cy - 14}`}
                fill="none"
                stroke={stroke}
                strokeWidth={sw}
                opacity={active ? 1 : 0.6}
                markerEnd={active ? "url(#hbarrowActive)" : "url(#hbarrow)"}
              />
            );
          })}

          {pos.map((p, i) => {
            const isSrc = received[i] === 0;
            const hasTouched = touched.has(i);
            const hasBall = ballAt === i;
            const fill = hasBall ? A : (hasTouched ? C.okBg : (isSrc ? "#fff" : "#f1f5f9"));
            const stroke = hasBall ? A : (isSrc ? "#dc2626" : (hasTouched ? C.ok : C.dim));
            return (
              <g key={`cow-${i}`}>
                <circle cx={xOf(p)} cy={cy} r="16" fill={fill} stroke={stroke} strokeWidth="2.5" />
                <text x={xOf(p)} y={cy + 5} textAnchor="middle" fontSize="16">
                  {hasBall ? "⚽" : "🐄"}
                </text>
                {isSrc && !hasBall && (
                  <text x={xOf(p)} y={cy - 24} textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">
                    {t(E, "SOURCE", "시작 소")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
        <button onClick={play} style={{
          background: playing ? "#fff" : A, color: playing ? A : "#fff",
          border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>
          {playing ? t(E, "⏸ Pause", "⏸ 정지") : t(E, "▶ Play", "▶ 재생")}
        </button>
        <button onClick={() => { clearTimer(); setPlaying(false); stepOnce(); }} disabled={ballAt == null} style={{
          background: "#fff", color: A,
          border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 13, fontWeight: 800,
          cursor: ballAt == null ? "not-allowed" : "pointer",
          opacity: ballAt == null ? 0.5 : 1,
        }}>
          {t(E, "Step", "한 칸")}
        </button>
        <button onClick={reset} style={{
          background: "#fff", color: C.dim,
          border: `1.5px solid ${C.border}`, borderRadius: 8,
          padding: "6px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 처음부터 다시")}
        </button>
      </div>

      <div style={{
        marginTop: 10, padding: "8px 12px", background: C.accentBg,
        border: `1px solid ${C.accentBd}`, borderRadius: 8,
        fontSize: 12, color: C.text, lineHeight: 1.55, textAlign: "center",
      }}>
        <div>
          <b style={{ color: "#dc2626" }}>{t(E, "Sources (red ring)", "시작 소 (빨강 테두리)")}: </b>
          {sources.length === 0
            ? t(E, "none", "없음")
            : sources.map(i => pos[i]).join(", ")}
          {"  "}|{"  "}
          <b style={{ color: A }}>{t(E, "Min balls (sources)", "최소 공 (시작 소 수)")}: </b>
          {Math.max(1, sources.length)}
        </div>
        <div style={{ color: C.dim, marginTop: 3, fontSize: 11 }}>
          {t(E, "Tip: a 'mutual pair' (two cows passing to each other) is a sink — the ball just bounces. Watch ▶ to feel why.",
              "서로를 가리키는 두 소는 공을 둘 사이에서만 주고받아요. 그래서 공이 더 멀리 가지 못해요.\n▶ 로 직접 봐요.")}
        </div>
      </div>
    </div>
  );
}


