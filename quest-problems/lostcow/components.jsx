// 🔒 USACO_VERIFIED — cpid=735, lostcow (2017 Open Bronze #1)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   LostCowSim — visualize FJ zigzagging on a number line
   ═══════════════════════════════════════════════════════════════ */
function _buildLegs(x, y, maxLegs = 30) {
  // ⚠️ Matches the verified algorithm: target is from the START x, not from pos.
  const legs = [];   // each leg: { from, to, dir, step, dist, foundY }
  let pos = x;
  let direction = 1;
  let step = 1;
  let total = 0;
  for (let n = 0; n < maxLegs; n++) {
    const target = x + direction * step;     // ← from x (start), not pos
    const lo = Math.min(pos, target), hi = Math.max(pos, target);
    if (lo <= y && y <= hi) {
      total += Math.abs(y - pos);
      legs.push({ from: pos, to: y, dir: direction, step, dist: Math.abs(y - pos), foundY: true, totalAfter: total });
      return legs;
    }
    const legDist = Math.abs(target - pos);
    total += legDist;
    legs.push({ from: pos, to: target, dir: direction, step, dist: legDist, foundY: false, totalAfter: total });
    pos = target;
    direction *= -1;
    step *= 2;
  }
  return legs;
}

const _LC_PRESETS = [
  { x: 3, y: 6 },
  { x: 5, y: -2 },
  { x: 0, y: 7 },
  { x: 10, y: 3 },
];

export function LostCowSim({ E }) {
  const [pi, setPi] = useState(0);
  const [legIdx, setLegIdx] = useState(0);
  const { x, y } = _LC_PRESETS[pi];
  const legs = _buildLegs(x, y);
  const cur = Math.min(legIdx, legs.length - 1);

  // Compute axis range based on all positions touched so far
  const positions = [x, y];
  for (let i = 0; i <= cur; i++) {
    positions.push(legs[i].to);
  }
  const minX = Math.min(...positions) - 2;
  const maxX = Math.max(...positions) + 2;
  const range = maxX - minX;
  const W = 360;
  const H = 100;
  const px = (val) => ((val - minX) / range) * W;

  const totalSoFar = cur >= 0 ? legs[cur].totalAfter : 0;
  const finalLeg = legs[cur];

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_LC_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setLegIdx(0); }} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            x={p.x}, y={p.y}
          </button>
        ))}
      </div>

      {/* number line */}
      <svg width={W} height={H} style={{ display: "block", margin: "0 auto" }}>
        {/* axis */}
        <line x1={0} y1={H/2} x2={W} y2={H/2} stroke="#cbd5e1" strokeWidth="2" />
        {/* tick marks at integer positions if range small enough */}
        {range <= 30 && Array.from({ length: maxX - minX + 1 }, (_, k) => minX + k).map(v => (
          <g key={v}>
            <line x1={px(v)} y1={H/2 - 4} x2={px(v)} y2={H/2 + 4} stroke="#cbd5e1" strokeWidth="1" />
            <text x={px(v)} y={H/2 + 18} fontSize="9" fill="#94a3b8" textAnchor="middle">{v}</text>
          </g>
        ))}
        {/* legs traversed */}
        {legs.slice(0, cur + 1).map((leg, i) => {
          const arcHeight = 25 + (i % 2) * 10;
          const yArc = leg.dir > 0 ? H/2 - arcHeight : H/2 + arcHeight;
          const cx = (px(leg.from) + px(leg.to)) / 2;
          const dStr = `M ${px(leg.from)} ${H/2} Q ${cx} ${yArc} ${px(leg.to)} ${H/2}`;
          const isCurrent = i === cur;
          return (
            <g key={i}>
              <path d={dStr} stroke={isCurrent ? A : "#9ca3af"} strokeWidth={isCurrent ? 2.5 : 1.5} fill="none" />
              {isCurrent && (
                <text x={cx} y={yArc - 3} fontSize="10" fill={A} textAnchor="middle" fontWeight="800">
                  {leg.dir > 0 ? "+" : "−"}{leg.step}
                </text>
              )}
            </g>
          );
        })}
        {/* x marker (start) */}
        <circle cx={px(x)} cy={H/2} r="5" fill="#3b82f6" />
        <text x={px(x)} y={H/2 - 14} fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="800">x</text>
        {/* y marker (cow) */}
        <circle cx={px(y)} cy={H/2} r="5" fill="#16a34a" />
        <text x={px(y)} y={H/2 - 14} fontSize="10" fill="#16a34a" textAnchor="middle" fontWeight="800">🐄 y</text>
        {/* current position */}
        {cur >= 0 && (
          <circle cx={px(finalLeg.to)} cy={H/2} r="4" fill={A} />
        )}
      </svg>

      <div style={{ background: "#fef2f2", border: `1.5px solid #fca5a5`, borderRadius: 10, padding: "8px 12px", marginTop: 10, marginBottom: 10, textAlign: "center", fontSize: 13, color: A, fontWeight: 600 }}>
        {finalLeg.foundY
          ? t(E, `🐄 Found! Total walked = ${totalSoFar}`, `🐄 찾았어요! 걸은 거리는 모두 ${totalSoFar}`)
          : t(E, `Leg ${cur + 1}: ${finalLeg.dir > 0 ? "+" : "−"}${finalLeg.step} → pos = ${finalLeg.to}, total = ${totalSoFar}`,
                `${cur + 1}번째 다리예요. ${finalLeg.dir > 0 ? "+" : "−"}${finalLeg.step} 만큼 걸어서 위치는 ${finalLeg.to}, 여기까지 걸은 거리는 ${totalSoFar}`)}
      </div>

      {/* nav */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setLegIdx(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === 0 ? "#b0b5c3" : A, cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {cur + 1} / {legs.length}
        </span>
        <button onClick={() => setLegIdx(Math.min(legs.length - 1, cur + 1))} disabled={cur === legs.length - 1} style={{
          background: cur === legs.length - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === legs.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === legs.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === legs.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LostCowDoublingSim — feel the +1, -2, +4, -8 doubling pattern
   ═══════════════════════════════════════════════════════════════ */
export function LostCowDoublingSim({ E }) {
  const [n, setN] = useState(1);
  const maxN = 10;

  // legs: leg i has size 2^i and direction (i even → +, odd → −)
  const legs = Array.from({ length: n }, (_, i) => ({
    idx: i,
    size: Math.pow(2, i),
    dir: i % 2 === 0 ? 1 : -1,
  }));
  const total = legs.reduce((s, l) => s + l.size, 0);
  const maxSize = Math.pow(2, maxN - 1);
  const W = 360;
  const barH = 16;
  const gap = 4;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 2 }}>
          {t(E, "🔢 The Doubling Pattern", "🔢 두 배씩 커지는 모양")}
        </div>
        <div style={{ fontSize: 11, color: C.dim }}>
          {t(E, "Each leg is twice as long as the one before. Watch the total explode.",
                "다리마다 길이가 두 배가 돼요. 합계가 얼마나 빨리 커지는지 봐요.")}
        </div>
      </div>

      {/* bars */}
      <svg width={W} height={n * (barH + gap) + 4} style={{ display: "block", margin: "0 auto" }}>
        {legs.map((leg) => {
          const w = (leg.size / maxSize) * (W - 70);
          const y0 = leg.idx * (barH + gap) + 2;
          const fill = leg.dir > 0 ? "#dc2626" : "#0891b2";
          const sign = leg.dir > 0 ? "+" : "−";
          return (
            <g key={leg.idx}>
              <text x={0} y={y0 + barH - 4} fontSize="10" fill={C.dim} fontWeight="700"
                    fontFamily="'JetBrains Mono',monospace">
                {`#${leg.idx + 1}`}
              </text>
              <rect x={28} y={y0} width={Math.max(w, 4)} height={barH} rx="3" fill={fill} opacity="0.85" />
              <text x={28 + Math.max(w, 4) + 6} y={y0 + barH - 4} fontSize="10"
                    fill={fill} fontWeight="800" fontFamily="'JetBrains Mono',monospace">
                {sign}{leg.size}
              </text>
            </g>
          );
        })}
      </svg>

      {/* totals readout */}
      <div style={{
        background: "#fef2f2", border: `1.5px solid #fca5a5`, borderRadius: 10,
        padding: "8px 12px", marginTop: 10, marginBottom: 10,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        fontSize: 12, color: A, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span>{t(E, `Legs: ${n}`, `다리: ${n}개`)}</span>
        <span>{t(E, `Last leg: ${legs[n - 1]?.size ?? 0}`, `마지막 다리: ${legs[n - 1]?.size ?? 0}`)}</span>
        <span>{t(E, `Total walked: ${total}`, `총 거리: ${total}`)}</span>
      </div>

      {/* nav */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setN(Math.max(1, n - 1))} disabled={n === 1} style={{
          background: n === 1 ? "#e5e7eb" : "#fff", border: `1px solid ${n === 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: n === 1 ? "#b0b5c3" : A, cursor: n === 1 ? "default" : "pointer",
        }}>{t(E, "− leg", "− 다리")}</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {n} / {maxN}
        </span>
        <button onClick={() => setN(Math.min(maxN, n + 1))} disabled={n === maxN} style={{
          background: n === maxN ? "#e5e7eb" : A, border: `1px solid ${n === maxN ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: n === maxN ? "#b0b5c3" : "#fff", cursor: n === maxN ? "default" : "pointer",
        }}>{t(E, "+ leg", "+ 다리")}</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "After 10 legs FJ has already walked 1023 steps — but he could be 512 away from x. The doubling guarantees he overshoots y in O(log) tries.",
          "다리 10 개를 걸으면 걸은 거리는 1023 칸이고, x 에서 512 칸 떨어진 곳까지 닿아요.\n다리 길이가 두 배씩 늘어나니까, 소가 아무리 멀리 있어도 다리 몇 개면 지나쳐요.\n그래서 다리 수는 O(log) 만큼만 늘어요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LostCowRunner — input x, y, see total distance live
   ═══════════════════════════════════════════════════════════════ */
export function LostCowRunner({ E }) {
  const [xInput, setXInput] = useState("3");
  const [yInput, setYInput] = useState("6");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [livePos, setLivePos] = useState(0);
  const [liveTotal, setLiveTotal] = useState(0);
  const [liveLeg, setLiveLeg] = useState(0);
  const alive = useRef(false);

  const run = () => {
    const x = parseInt(xInput);
    const y = parseInt(yInput);
    if (isNaN(x) || isNaN(y)) {
      setResult({ error: t(E, "Invalid: x and y must be integers.", "x 와 y 는 정수로 넣어 주세요.") });
      return;
    }
    if (x === y) {
      setResult({ done: true, total: 0, legs: 0 });
      return;
    }
    setRunning(true); setResult(null);
    setLivePos(x); setLiveTotal(0); setLiveLeg(0);
    alive.current = true;

    let pos = x;
    let direction = 1;
    let step = 1;
    let total = 0;
    let legCount = 0;

    const tick = () => {
      if (!alive.current) {
        setResult({ stopped: true, lastTotal: total, lastLeg: legCount });
        setRunning(false); return;
      }
      const target = pos + direction * step;
      const lo = Math.min(pos, target), hi = Math.max(pos, target);
      if (lo <= y && y <= hi) {
        total += Math.abs(y - pos);
        legCount++;
        setLivePos(y); setLiveTotal(total); setLiveLeg(legCount);
        setResult({ done: true, total, legs: legCount });
        setRunning(false);
        return;
      }
      total += step;
      pos = target;
      direction *= -1;
      step *= 2;
      legCount++;
      setLivePos(pos); setLiveTotal(total); setLiveLeg(legCount);
      setTimeout(tick, 350);
    };
    setTimeout(tick, 100);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <input value={xInput} onChange={e => setXInput(e.target.value)} disabled={running} placeholder="x"
          style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, textAlign: "center" }} />
        <input value={yInput} onChange={e => setYInput(e.target.value)} disabled={running} placeholder="y"
          style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, textAlign: "center" }} />
      </div>
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>
        {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run zigzag", "▶ 지그재그 실행")}
      </button>
      {(running || result?.done) && (
        <div style={{ background: "#fef2f2", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: A, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", textAlign: "center" }}>
          {t(E, `Leg ${liveLeg} · pos = ${livePos} · total = ${liveTotal}`, `${liveLeg}번째 다리 · 위치 = ${livePos} · 여기까지 = ${liveTotal}`)}
        </div>
      )}
      {result?.error && (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>{result.error}</div>
      )}
      {result?.done && (
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 13, fontWeight: 600 }}>
          {t(E, `✅ Total distance = ${result.total} (in ${result.legs} legs)`, `✅ 총 거리 = ${result.total} (${result.legs}개 다리)`)}
        </div>
      )}
    </div>
  );
}

/* Section 1: input */
const LC_INPUT_PY = [
  "# USACO 이전 contest 는 파일 입출력 사용",
  "with open('lostcow.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "x, y = map(int, lines[0].split())",
];
const LC_INPUT_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "using namespace std;",
  "",
  "long long abs_ll(long long x) {",
  "    if (x < 0) {",
  "        return -x;",
  "    }",
  "    return x;",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest 는 파일 입출력 사용",
  "    ifstream fin(\"lostcow.in\");",
  "    ofstream fout(\"lostcow.out\");",
  "",
  "    long long x, y;",
  "    fin >> x >> y;",
];

/* Section 2: setup state */
const LC_STATE_PY = [
  "pos = x        # 지금 발 위치 (처음엔 x 에서 시작)",
  "direction = 1  # +1 오른쪽, -1 왼쪽",
  "step = 1       # 이번 leg 의 거리 — 매번 두 배",
  "total = 0      # 누적 걸은 거리",
];
const LC_STATE_CPP = [
  "    long long pos = x;",
  "    long long direction = 1;",
  "    long long step = 1;",
  "    long long total = 0;",
];

/* Section 3: zigzag loop — target 은 시작 x 기준! */
const LC_LOOP_PY = [
  "while True:",
  "    # ⚠️ target 은 항상 시작 x 에서 계산 (현재 pos 가 아니라!)",
  "    target = x + direction * step",
  "",
  "    # 지금 pos 에서 target 사이에 y 가 있으면 도달",
  "    if pos <= target:",
  "        lo, hi = pos, target",
  "    else:",
  "        lo, hi = target, pos",
  "    if lo <= y <= hi:",
  "        total += abs(y - pos)",
  "        break",
  "",
  "    # 한 leg 다 걷고 방향 반전, step 은 두 배",
  "    total += abs(target - pos)",
  "    pos = target",
  "    direction = -direction",
  "    step = step * 2",
];
const LC_LOOP_CPP = [
  "    while (true) {",
  "        // ⚠️ target 은 항상 시작 x 기준",
  "        long long target = x + direction * step;",
  "",
  "        long long lo = pos;",
  "        if (target < lo) {",
  "            lo = target;",
  "        }",
  "        long long hi = pos;",
  "        if (target > hi) {",
  "            hi = target;",
  "        }",
  "        if (lo <= y && y <= hi) {",
  "            total += abs_ll(y - pos);",
  "            break;",
  "        }",
  "        total += abs_ll(target - pos);",
  "        pos = target;",
  "        direction = -direction;",
  "        step = step * 2;",
  "    }",
  "",
  "    fout << total << \"\\n\";",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const LC_FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('lostcow.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "x, y = map(int, lines[0].split())",
  "",
  "# 매 step k: target = x + direction * 2^(k-1)",
  "# (시작 위치 x 로부터 2배씩 멀어지는 zig-zag)",
  "pos = x",
  "direction = 1",
  "step = 1",
  "total = 0",
  "",
  "while True:",
  "    target = x + direction * step  # 시작 위치 x 기준",
  "    if pos <= target:",
  "        lo = pos",
  "        hi = target",
  "    else:",
  "        lo = target",
  "        hi = pos",
  "    if lo <= y <= hi:",
  "        total += abs(y - pos)",
  "        break",
  "    total += abs(target - pos)",
  "    pos = target",
  "    direction = -direction",
  "    step = step * 2",
  "",
  "with open('lostcow.out', 'w') as file:",
  "    file.write(str(total) + '\\n')",
];
const LC_FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "using namespace std;",
  "",
  "long long abs_ll(long long x) {",
  "    if (x < 0) {",
  "        return -x;",
  "    }",
  "    return x;",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"lostcow.in\");",
  "    ofstream fout(\"lostcow.out\");",
  "",
  "    long long x, y;",
  "    fin >> x >> y;",
  "",
  "    long long pos = x;",
  "    long long direction = 1;",
  "    long long step = 1;",
  "    long long total = 0;",
  "    // 매 step k: target = x + direction * 2^(k-1) (시작 위치 x 기준)",
  "    while (true) {",
  "        long long target = x + direction * step;",
  "        long long lo = pos;",
  "        if (target < lo) {",
  "            lo = target;",
  "        }",
  "        long long hi = pos;",
  "        if (target > hi) {",
  "            hi = target;",
  "        }",
  "        if (lo <= y && y <= hi) {",
  "            total += abs_ll(y - pos);",
  "            break;",
  "        }",
  "        total += abs_ll(target - pos);",
  "        pos = target;",
  "        direction = -direction;",
  "        step = step * 2;",
  "    }",
  "    fout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getLostCowSections(E) {
  return [
    {
      label: t(E, "📦 1. Read x, y", "📦 1. x, y 읽기"),
      color: A,
      py: LC_INPUT_PY, cpp: LC_INPUT_CPP,
      why: [
        t(E, "x = FJ's start, y = the cow's position. Both can be very large — use 64-bit.",
            "x 는 FJ 가 시작하는 자리, y 는 소가 있는 자리예요.\n둘 다 아주 클 수 있어서 64비트 정수를 써요."),
      ],
    },
    {
      label: t(E, "🧭 2. Setup Walk State", "🧭 2. 걷기 준비하기"),
      color: "#0891b2",
      py: LC_STATE_PY, cpp: LC_STATE_CPP,
      why: [
        t(E, "We track 4 things: current position, current direction, leg length, total walked.",
            "네 가지를 계속 적어 둬요. 지금 위치, 방향, 다리 길이, 걸은 총 거리예요."),
        t(E, "Direction starts +1 (right) and flips each leg. Step size doubles each leg.",
            "방향은 +1 (오른쪽) 로 시작해서 다리마다 뒤집어요.\n다리 길이는 다리마다 두 배가 돼요."),
      ],
    },
    {
      label: t(E, "🔁 3. Zigzag Until We Pass y", "🔁 3. y를 지나갈 때까지 지그재그"),
      color: "#16a34a",
      py: LC_LOOP_PY, cpp: LC_LOOP_CPP,
      why: [
        t(E, "⚠️ target is computed from the starting x, NOT from pos. The zigzag pattern is 1, 2, 4, 8… measured from x, alternating direction.",
            "⚠️ target 은 지금 pos 가 아니라 시작점 x 를 기준으로 구해요.\n1, 2, 4, 8 … 이 늘 x 에서부터 방향을 바꿔 가며 커지거든요."),
        t(E, "If y lies between pos and target, FJ finds the cow on this leg — add |y - pos| and stop.",
            "y 가 pos 와 target 사이에 있으면 이번 다리에서 소를 만나요.\n그러면 |y - pos| 만 더하고 끝내요."),
        t(E, "Otherwise walk the full leg distance (|target − pos|), then flip direction and double the step.",
            "아니면 이 다리를 끝까지 걸어요.\n|target − pos| 를 더하고, 방향을 뒤집고, step 을 두 배로 해요."),
      ],
      pyOnly: [
        t(E, "if/else assigns lo, hi cleanly — both branches in 2 lines.",
            "if/else 로 lo 와 hi 를 두 줄에 정해요."),
      ],
      cppOnly: [
        t(E, "Ternary ? : keeps min/max inline without extra <algorithm> overhead.",
            "? : 를 써서 min/max 를 그 자리에서 구해요. <algorithm> 을 안 써도 돼요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: LC_FULL_PY, cpp: LC_FULL_CPP,
      why: [
        t(E, "Step doubles each leg, so the loop runs O(log |x - y|) times — extremely fast.",
            "다리 길이가 두 배씩 커지니까 반복은 O(log |x - y|) 번이면 끝나요. 아주 빨라요."),
      ],
    },
  ];
}

export function LostCowProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 LC_FULL_PY/CPP 배열을 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (이 파일 헤더가 USACO_VERIFIED 라 그 이름 패턴은 보호 변수로 간주된다). ── */
export function getLostCowWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = LC_FULL_CPP;
    return {
      code,
      vars: [
        { v: "pos", ko: "지금 발 위치", en: "current foot position" },
        { v: "direction", ko: "걷는 방향 (+1/-1)", en: "walking direction (+1/-1)" },
        { v: "step", ko: "이번 다리 길이 — 매번 두 배", en: "this leg's length — doubles each time" },
        { v: "total", ko: "지금까지 걸은 거리", en: "total distance walked so far" },
      ],
      beats: [
        { hi: [0, 17], bubble: t(E,
          "What do we need to know first? Where FJ starts (x) and where the cow is (y) — both can be huge, so read them as 64-bit. abs_ll is a small helper to get absolute value without a library.",
          "먼저 뭘 알아야 할까요? FJ 가 시작하는 자리 x 와 소가 있는 자리 y 예요.\n둘 다 아주 클 수 있어서 64비트로 읽어요. abs_ll 은 절댓값을 구하는 작은 도우미예요.") },
        { hi: [19, 23], bubble: t(E,
          "How do we track the zigzag as we walk? 4 things: current position, current direction, this leg's length, and total distance so far. Direction starts +1 and step starts 1 — both will grow/flip each leg.",
          "지그재그를 걸으면서 뭘 계속 적어 둬야 할까요? 지금 위치, 방향, 다리 길이, 총 거리 — 네 가지예요.\n방향은 +1 로, 다리 길이는 1 로 시작해서 매 다리마다 바뀌어요.") },
        { hi: [24, 33], bubble: t(E,
          "Where does this leg end? target — always measured from the START x, not from pos. Then figure out the range [lo, hi] this leg covers, so we can check whether y falls inside it.",
          "이번 다리는 어디서 끝날까요? target 이에요 — 지금 pos 가 아니라 항상 시작점 x 를 기준으로 구해요.\n그다음 이 다리가 덮는 범위 [lo, hi] 를 구해서, 그 사이에 y 가 있는지 볼 준비를 해요.") },
        { hi: [34, 36], bubble: t(E,
          "Does y fall inside this leg? If so, FJ finds the cow partway through — add only |y - pos| (not the whole leg) and stop.",
          "y 가 이번 다리 안에 있나요? 있으면 이 다리 도중에 소를 찾은 거예요 — 다리 전체가 아니라 |y - pos| 만 더하고 끝내요.") },
        { hi: [37, 41], bubble: t(E,
          "Not found yet? Then walk the FULL leg, flip direction, and double the step for the next leg.",
          "아직 못 찾았으면요? 이번 다리를 끝까지 다 걷고, 방향을 뒤집고, 다음 다리는 두 배로 늘려요.") },
        { hi: [43, 45], bubble: t(E,
          "Print the total distance. Step doubles each leg, so this loop only runs O(log |x-y|) times — extremely fast.",
          "총 거리를 출력해요. 다리 길이가 매번 두 배가 되니까 반복은 O(log |x-y|) 번이면 끝나요 — 아주 빨라요.") },
      ],
    };
  }
  const code = LC_FULL_PY;
  return {
    code,
    vars: [
      { v: "pos", ko: "지금 발 위치", en: "current foot position" },
      { v: "direction", ko: "걷는 방향 (+1/-1)", en: "walking direction (+1/-1)" },
      { v: "step", ko: "이번 다리 길이 — 매번 두 배", en: "this leg's length — doubles each time" },
      { v: "total", ko: "지금까지 걸은 거리", en: "total distance walked so far" },
    ],
    beats: [
      { hi: [0, 4], bubble: t(E,
        "What do we need to know first? Where FJ starts (x) and where the cow is (y). USACO's older contests use file I/O, so read the input file's first line and split it.",
        "먼저 뭘 알아야 할까요? FJ 가 시작하는 자리 x 와 소가 있는 자리 y 예요.\nUSACO 옛날 문제는 파일 입출력을 쓰니까, 입력 파일 첫 줄을 읽어서 나눠요.") },
      { hi: [6, 11], bubble: t(E,
        "How do we track the zigzag as we walk? 4 things: current position, current direction, this leg's length, and total distance so far. Direction starts +1 and step starts 1.",
        "지그재그를 걸으면서 뭘 계속 적어 둬야 할까요? 지금 위치, 방향, 다리 길이, 총 거리 — 네 가지예요.\n방향은 +1 로, 다리 길이는 1 로 시작해요.") },
      { hi: [13, 20], bubble: t(E,
        "Where does this leg end? target — always measured from the START x, not from pos. Then figure out the range [lo, hi] this leg covers, so we can check whether y falls inside it.",
        "이번 다리는 어디서 끝날까요? target 이에요 — 지금 pos 가 아니라 항상 시작점 x 를 기준으로 구해요.\n그다음 이 다리가 덮는 범위 [lo, hi] 를 구해서, 그 사이에 y 가 있는지 볼 준비를 해요.") },
      { hi: [21, 23], bubble: t(E,
        "Does y fall inside this leg? If so, FJ finds the cow partway through — add only |y - pos| (not the whole leg) and stop.",
        "y 가 이번 다리 안에 있나요? 있으면 이 다리 도중에 소를 찾은 거예요 — 다리 전체가 아니라 |y - pos| 만 더하고 끝내요.") },
      { hi: [24, 27], bubble: t(E,
        "Not found yet? Then walk the FULL leg, flip direction, and double the step for the next leg.",
        "아직 못 찾았으면요? 이번 다리를 끝까지 다 걷고, 방향을 뒤집고, 다음 다리는 두 배로 늘려요.") },
      { hi: [29, 30], bubble: t(E,
        "Write the total distance to the output file. Step doubles each leg, so this loop only runs O(log |x-y|) times — extremely fast.",
        "총 거리를 출력 파일에 적어요. 다리 길이가 매번 두 배가 되니까 반복은 O(log |x-y|) 번이면 끝나요 — 아주 빨라요.") },
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

export function downloadLostCowPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "🐄 The Lost Cow — Full Study Guide", "🐄 The Lost Cow — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2017 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
