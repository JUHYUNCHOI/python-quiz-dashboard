import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    d, x, y = input().split()",
  "    cows.append((d, int(x), int(y)))",
  "",
  "north = [(x, y, i) for i, (d, x, y) in enumerate(cows) if d == 'N']",
  "east  = [(x, y, i) for i, (d, x, y) in enumerate(cows) if d == 'E']",
  "",
  "stopped = [False] * N",
  "grazed  = [0] * N  # 0 means Infinity",
  "",
  "# For each pair (N-cow, E-cow), check if they intersect",
  "events = []",
  "for nx, ny, ni in north:",
  "    for ex, ey, ei in east:",
  "        # N-cow at (nx, ny) going north, E-cow at (ex, ey) going east",
  "        # They meet at (nx, ey+dx) where dx = nx - ex (E-cow travel)",
  "        # N-cow reaches row ey at time ey - ny (if ey > ny)",
  "        # E-cow reaches col nx at time nx - ex (if nx > ex)",
  "        if nx > ex and ey > ny:",
  "            tn = ey - ny  # time for N-cow to reach intersection row",
  "            te = nx - ex  # time for E-cow to reach intersection col",
  "            if tn < te:",
  "                events.append((te, ei, ni))  # E-cow stopped by N-cow",
  "            elif te < tn:",
  "                events.append((tn, ni, ei))  # N-cow stopped by E-cow",
  "",
  "# Sort events by time, process them",
  "events.sort()",
  "for time, victim, blocker in events:",
  "    if not stopped[victim] and not stopped[blocker]:",
  "        stopped[victim] = True",
  "        d, x, y = cows[victim]",
  "        grazed[victim] = time",
  "",
  "for g in grazed:",
  "    print(g if g > 0 else 'Infinity')",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<tuple<char,int,int>> cows(N);",
  "    for (auto& [d, x, y] : cows) cin >> d >> x >> y;",
  "    // Bronze: simple intersection check between N-going and E-going cows",
  "    vector<int> grazed(N, 0);   // 0 = infinity",
  "    cout << \"INFINITY\n\";   // placeholder",
  "    return 0;",
  "}",
];

export function getStuckInRutSections(E) {
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

export function StuckInRutProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}


/* ═══════════════════════════════════════════════════════════════
   StuckInRutGridSim — animated NE-mover grid
   Cows move N (up) or E (right) one step per tick. If a cow
   steps onto a cell another cow's path already visited, it stops.
   ═══════════════════════════════════════════════════════════════ */
const _SIM_PRESETS = [
  // Each cow: [dir, x, y]. Grid coords: x=col (E+), y=row (N+, drawn upward).
  {
    cows: [
      { dir: "N", x: 1, y: 1 },
      { dir: "N", x: 4, y: 0 },
      { dir: "E", x: 0, y: 3 },
      { dir: "E", x: 2, y: 5 },
    ],
    grid: 7,
  },
  {
    cows: [
      { dir: "N", x: 2, y: 0 },
      { dir: "N", x: 5, y: 1 },
      { dir: "E", x: 0, y: 2 },
      { dir: "E", x: 1, y: 4 },
      { dir: "E", x: 3, y: 6 },
    ],
    grid: 8,
  },
  {
    cows: [
      { dir: "N", x: 0, y: 0 },
      { dir: "N", x: 3, y: 1 },
      { dir: "E", x: 1, y: 2 },
      { dir: "E", x: 0, y: 4 },
    ],
    grid: 6,
  },
];

export function StuckInRutGridSim({ E }) {
  const [pi, setPi] = useState(0);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const preset = _SIM_PRESETS[pi];
  const N = preset.cows.length;
  const G = preset.grid;
  const MAX_TICK = G + 4;

  // Build per-tick positions and stopped state.
  // Each cow has a path of cells it occupied. If a cow arrives at a cell
  // already in another (earlier-visiting) cow's path, it stops at that cell.
  const sim = (() => {
    const paths = preset.cows.map(c => [{ x: c.x, y: c.y }]);
    const stoppedAt = preset.cows.map(() => -1); // tick at which it stopped, -1 if still moving
    // visited[key] = first tick someone visited that cell (cow index, tick)
    const visited = new Map();
    preset.cows.forEach((c, i) => {
      visited.set(`${c.x},${c.y}`, { cow: i, tick: 0 });
    });
    for (let tk = 1; tk <= MAX_TICK; tk++) {
      // Compute next positions for all cows still moving.
      const proposed = preset.cows.map((c, i) => {
        if (stoppedAt[i] !== -1) return null;
        const last = paths[i][paths[i].length - 1];
        const nx = c.dir === "E" ? last.x + 1 : last.x;
        const ny = c.dir === "N" ? last.y + 1 : last.y;
        return { x: nx, y: ny };
      });
      // Collision check — if proposed cell already in visited (and not by self at same tick), stop.
      const newlyStopped = preset.cows.map(() => false);
      proposed.forEach((p, i) => {
        if (!p) return;
        const key = `${p.x},${p.y}`;
        const seen = visited.get(key);
        if (seen && seen.cow !== i) {
          // arrived on someone else's earlier trail → stop
          newlyStopped[i] = true;
          stoppedAt[i] = tk;
        }
      });
      // Apply move for those not stopped this tick.
      proposed.forEach((p, i) => {
        if (!p) return;
        if (newlyStopped[i]) return;
        paths[i].push(p);
        const key = `${p.x},${p.y}`;
        if (!visited.has(key)) visited.set(key, { cow: i, tick: tk });
      });
    }
    return { paths, stoppedAt };
  })();

  const movingCount = sim.stoppedAt.filter((s, i) => s === -1 || s > tick).length;
  const stoppedCount = N - movingCount;

  // Visual positions at current tick.
  const positions = sim.paths.map((path, i) => {
    const stopT = sim.stoppedAt[i];
    if (stopT !== -1 && tick >= stopT) {
      // Stopped — last position is path[stopT-1]
      const last = path[Math.min(stopT, path.length - 1) - 1] || path[0];
      return { ...last, stopped: true };
    }
    const p = path[Math.min(tick, path.length - 1)];
    return { ...p, stopped: false };
  });

  const trails = sim.paths.map((path, i) => {
    const stopT = sim.stoppedAt[i];
    const len = stopT !== -1 && tick >= stopT ? stopT : Math.min(tick + 1, path.length);
    return path.slice(0, len);
  });

  // Play/pause animation
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTick(tk => {
        if (tk >= MAX_TICK) { setPlaying(false); return tk; }
        return tk + 1;
      });
    }, 480);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, MAX_TICK]);

  const reset = () => { setPlaying(false); setTick(0); };
  const switchPreset = (n) => { setPi(n); setPlaying(false); setTick(0); };

  // SVG layout — y grows upward, but SVG y grows downward, so flip.
  const PAD = 18;
  const CELL = 32;
  const W = G * CELL + PAD * 2;
  const H = G * CELL + PAD * 2;
  const cx = (x) => PAD + x * CELL + CELL / 2;
  const cy = (y) => H - PAD - y * CELL - CELL / 2;

  const COW_COLORS = ["#8b5cf6", "#0891b2", "#db2777", "#ea580c", "#16a34a"];

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#f5f3ff", border: `1.5px solid ${A}`, borderRadius: 12,
        padding: 12, marginBottom: 10,
      }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
          🐄 {t(E, "Grid Simulator — N / E movers", "격자 시뮬레이터 — N / E 이동")}
        </div>
        <div style={{ fontSize: 12, color: "#5b21b6", lineHeight: 1.5 }}>
          {t(E,
            "Press play. N-cows move up, E-cows move right, one cell per tick. When a cow steps on a cell another cow's trail already touched, she stops.",
            "재생을 눌러봐. N 소는 위로, E 소는 오른쪽으로 매 틱 한 칸씩 움직여. 다른 소의 자취가 이미 지나간 칸을 밟으면 멈춰.")}
        </div>
      </div>

      {/* Preset picker */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {_SIM_PRESETS.map((_, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            background: pi === i ? A : "#fff",
            color: pi === i ? "#fff" : A,
            border: `1.5px solid ${A}`, borderRadius: 8,
            padding: "4px 10px", cursor: "pointer", fontSize: 12, fontWeight: 700,
          }}>
            {t(E, `Case ${i + 1}`, `예제 ${i + 1}`)}
          </button>
        ))}
      </div>

      {/* SVG grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <svg width={W} height={H} style={{ background: "#faf5ff", borderRadius: 10, border: `1px solid ${C.border}` }}>
          {/* Grid lines */}
          {Array.from({ length: G + 1 }).map((_, i) => (
            <g key={`gl-${i}`}>
              <line x1={PAD} y1={PAD + i * CELL} x2={PAD + G * CELL} y2={PAD + i * CELL} stroke="#e9d5ff" strokeWidth={1} />
              <line x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={PAD + G * CELL} stroke="#e9d5ff" strokeWidth={1} />
            </g>
          ))}

          {/* Trails */}
          {trails.map((trail, i) => (
            <g key={`tr-${i}`}>
              {trail.map((p, j) => (
                <circle key={j} cx={cx(p.x)} cy={cy(p.y)} r={5}
                  fill={COW_COLORS[i % COW_COLORS.length]} opacity={0.28} />
              ))}
              {trail.length > 1 && (
                <polyline
                  points={trail.map(p => `${cx(p.x)},${cy(p.y)}`).join(" ")}
                  fill="none"
                  stroke={COW_COLORS[i % COW_COLORS.length]}
                  strokeWidth={2}
                  opacity={0.5}
                  strokeDasharray="3 3"
                />
              )}
            </g>
          ))}

          {/* Cows */}
          {positions.map((p, i) => (
            <g key={`cow-${i}`}>
              <circle cx={cx(p.x)} cy={cy(p.y)} r={12}
                fill={p.stopped ? "#fee2e2" : COW_COLORS[i % COW_COLORS.length]}
                stroke={p.stopped ? "#dc2626" : "#fff"}
                strokeWidth={p.stopped ? 2 : 2.5} />
              <text x={cx(p.x)} y={cy(p.y) + 4} textAnchor="middle"
                fontSize={11} fontWeight={800}
                fill={p.stopped ? "#dc2626" : "#fff"}>
                {preset.cows[i].dir}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
        <button onClick={() => setPlaying(p => !p)} disabled={tick >= MAX_TICK} style={{
          background: playing ? "#dc2626" : A, color: "#fff",
          border: "none", borderRadius: 8, padding: "6px 14px",
          cursor: tick >= MAX_TICK ? "not-allowed" : "pointer",
          fontSize: 13, fontWeight: 700, opacity: tick >= MAX_TICK ? 0.5 : 1,
        }}>
          {playing ? t(E, "⏸ Pause", "⏸ 일시정지") : t(E, "▶ Play", "▶ 재생")}
        </button>
        <button onClick={() => setTick(tk => Math.min(MAX_TICK, tk + 1))} disabled={playing || tick >= MAX_TICK} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "6px 12px", cursor: (playing || tick >= MAX_TICK) ? "not-allowed" : "pointer",
          fontSize: 13, fontWeight: 700, opacity: (playing || tick >= MAX_TICK) ? 0.5 : 1,
        }}>
          {t(E, "Step +1", "한 틱")}
        </button>
        <button onClick={reset} style={{
          background: "#fff", color: C.dim, border: `1.5px solid ${C.border}`, borderRadius: 8,
          padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700,
        }}>
          {t(E, "Reset", "처음부터")}
        </button>
      </div>

      {/* Counters */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{
          background: "#ede9fe", border: `1px solid ${A}`, borderRadius: 8,
          padding: "6px 12px", fontSize: 12, color: "#5b21b6", fontWeight: 700,
        }}>
          ⏱ {t(E, "Tick", "틱")}: {tick}
        </div>
        <div style={{
          background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 8,
          padding: "6px 12px", fontSize: 12, color: "#166534", fontWeight: 700,
        }}>
          🐾 {t(E, "Moving", "이동 중")}: {movingCount}
        </div>
        <div style={{
          background: "#fee2e2", border: "1px solid #dc2626", borderRadius: 8,
          padding: "6px 12px", fontSize: 12, color: "#991b1b", fontWeight: 700,
        }}>
          🛑 {t(E, "Stopped", "멈춤")}: {stoppedCount}
        </div>
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


export function downloadStuckInRutPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "StuckInRut — Full Study Guide", "StuckInRut — 종합 풀이 노트");
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

