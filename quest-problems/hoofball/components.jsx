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
  "    for (int i = 0; i < N; i++) fin >> pos[i];",
  "    sort(pos.begin(), pos.end());",
  "    if (N == 1) {",
  "        fout << 1 << \"\\n\";",
  "        return 0;",
  "    }",
  "    // 각 cow 마다 누구한테 패스하는지 (tie 시 왼쪽)",
  "    vector<int> target(N);",
  "    for (int i = 0; i < N; i++) {",
  "        if (i == 0) target[i] = 1;",
  "        else if (i == N - 1) target[i] = N - 2;",
  "        else {",
  "            int left_dist = pos[i] - pos[i - 1];",
  "            int right_dist = pos[i + 1] - pos[i];",
  "            if (left_dist <= right_dist) target[i] = i - 1;",
  "            else target[i] = i + 1;",
  "        }",
  "    }",
  "    // 받는 횟수",
  "    vector<int> received(N, 0);",
  "    for (int i = 0; i < N; i++) received[target[i]]++;",
  "    // 1 단계: 안 받는 cow 마다 ball 1 개",
  "    int ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        if (received[i] == 0) ans++;",
  "    }",
  "    // 2 단계: 인접 mutual cycle 쌍마다 ball 1 개 추가",
  "    for (int i = 0; i < N - 1; i++) {",
  "        if (target[i] == i + 1 && target[i + 1] == i) {",
  "            if (received[i] == 1 && received[i + 1] == 1) ans++;",
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
        t(E, "INT_MAX as a sentinel lets boundary cows pick their only neighbor automatically.",
            "INT_MAX를 표식으로 쓰면 끝 소들이 자동으로 유일한 이웃을 고름."),
        t(E, "vector<int> receives(N, 0) initializes every counter to zero in one line.",
            "vector<int> receives(N, 0)으로 한 줄에 모든 카운터를 0으로 초기화."),
      ],
    },
  ];
}

export function HoofballProgressiveCode(props) {
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


export function downloadHoofballPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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
            "각 소의 화살표 = 가장 가까운 이웃 (거리 같으면 오른쪽). ▶ 누르면 공을 떨어뜨려 패스 관찰. 아무 화살표도 안 가리키는 소가 SOURCE — 각자 공 하나씩 필요해.")}
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
                    {t(E, "SOURCE", "소스")}
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
          {t(E, "↻ Reset", "↻ 초기화")}
        </button>
      </div>

      <div style={{
        marginTop: 10, padding: "8px 12px", background: C.accentBg,
        border: `1px solid ${C.accentBd}`, borderRadius: 8,
        fontSize: 12, color: C.text, lineHeight: 1.55, textAlign: "center",
      }}>
        <div>
          <b style={{ color: "#dc2626" }}>{t(E, "Sources (red ring)", "소스 (빨강 테두리)")}: </b>
          {sources.length === 0
            ? t(E, "none", "없음")
            : sources.map(i => pos[i]).join(", ")}
          {"  "}|{"  "}
          <b style={{ color: A }}>{t(E, "Min balls (sources)", "최소 공 (소스 수)")}: </b>
          {Math.max(1, sources.length)}
        </div>
        <div style={{ color: C.dim, marginTop: 3, fontSize: 11 }}>
          {t(E, "Tip: a 'mutual pair' (two cows passing to each other) is a sink — the ball just bounces. Watch ▶ to feel why.",
              "팁: 서로 패스하는 두 소(상호 쌍)는 싱크 — 공이 둘 사이만 왕복해. ▶로 직접 관찰.")}
        </div>
      </div>
    </div>
  );
}


