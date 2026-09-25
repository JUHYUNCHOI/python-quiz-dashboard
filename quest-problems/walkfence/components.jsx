// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 6/11 (TLE 7-11)
//   C++:    6/11 (TLE 7-11, O(NP))
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useRef, useEffect } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#16a34a";

/* ═══════════════════════════════════════════════════════════════
   WalkFenceSim — visualize fence + cow walking shorter perimeter
   ═══════════════════════════════════════════════════════════════ */
const _WF_PRESETS = [
  { posts: [[0,0],[4,0],[4,3],[0,3]], cow: [[0,0],[0,3]] },           // square
  { posts: [[0,0],[4,0],[4,3],[2,3],[2,5],[0,5]], cow: [[0,0],[2,5]] }, // L shape
  { posts: [[0,0],[6,0],[6,4],[0,4]], cow: [[2,0],[6,2]] },            // rectangle
];

export function WalkFenceSim({ E }) {
  const [pi, setPi] = useState(0);
  const [stage, setStage] = useState(0); // 0 = show fence, 1 = show cow points + perimeter
  const preset = _WF_PRESETS[pi];
  const posts = preset.posts;
  const P = posts.length;

  // compute perimeter + cumulative
  let perimeter = 0;
  const cum = [0];
  for (let i = 0; i < P; i++) {
    const j = (i + 1) % P;
    const d = Math.abs(posts[j][0] - posts[i][0]) + Math.abs(posts[j][1] - posts[i][1]);
    perimeter += d;
    cum.push(perimeter);
  }
  // Position of cow points on perimeter
  const findPos = (x, y) => {
    for (let i = 0; i < P; i++) {
      const j = (i + 1) % P;
      const px = posts[i][0], py = posts[i][1];
      const qx = posts[j][0], qy = posts[j][1];
      if (px === qx && qx === x && Math.min(py, qy) <= y && y <= Math.max(py, qy)) return cum[i] + Math.abs(y - py);
      if (py === qy && qy === y && Math.min(px, qx) <= x && x <= Math.max(px, qx)) return cum[i] + Math.abs(x - px);
    }
    return -1;
  };
  const d1 = findPos(preset.cow[0][0], preset.cow[0][1]);
  const d2 = findPos(preset.cow[1][0], preset.cow[1][1]);
  const diff = Math.abs(d1 - d2);
  const shorter = Math.min(diff, perimeter - diff);

  // SVG dimensions
  const minX = Math.min(...posts.map(p => p[0])) - 1;
  const maxX = Math.max(...posts.map(p => p[0])) + 1;
  const minY = Math.min(...posts.map(p => p[1])) - 1;
  const maxY = Math.max(...posts.map(p => p[1])) + 1;
  const W = 320; const H = 200;
  const sx = (x) => ((x - minX) / (maxX - minX)) * W;
  const sy = (y) => H - ((y - minY) / (maxY - minY)) * H;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_WF_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStage(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i+1}</button>
        ))}
      </div>

      <svg width={W} height={H} style={{ display: "block", margin: "0 auto", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8 }}>
        <polygon
          points={posts.map(p => `${sx(p[0])},${sy(p[1])}`).join(" ")}
          fill="none" stroke={A} strokeWidth="2.5"
        />
        {posts.map((p, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r="4" fill={A} />
        ))}
        {stage >= 1 && (
          <>
            <circle cx={sx(preset.cow[0][0])} cy={sy(preset.cow[0][1])} r="6" fill="#3b82f6" />
            <text x={sx(preset.cow[0][0])} y={sy(preset.cow[0][1]) - 10} fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="800">A</text>
            <circle cx={sx(preset.cow[1][0])} cy={sy(preset.cow[1][1])} r="6" fill="#dc2626" />
            <text x={sx(preset.cow[1][0])} y={sy(preset.cow[1][1]) - 10} fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="800">B</text>
          </>
        )}
      </svg>

      <div style={{ background: "#f0fdf4", border: `1.5px solid #86efac`, borderRadius: 10, padding: "10px 12px", marginTop: 10, marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7 }}>
        {stage === 0 && (<>perimeter = {perimeter} ({P} posts, total fence length)</>)}
        {stage === 1 && (
          <>
            A position on perimeter = {d1}<br/>
            B position on perimeter = {d2}<br/>
            |d1 − d2| = {diff} · perimeter − diff = {perimeter - diff}<br/>
            <b style={{ color: "#16a34a" }}>shorter = {shorter}</b>
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0} style={{
          background: stage === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${stage === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: stage === 0 ? "#b0b5c3" : A,
          cursor: stage === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{stage + 1} / 2</span>
        <button onClick={() => setStage(Math.min(1, stage + 1))} disabled={stage === 1} style={{
          background: stage === 1 ? "#e5e7eb" : A, border: `1px solid ${stage === 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: stage === 1 ? "#b0b5c3" : "#fff", cursor: stage === 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

export function WalkFenceRunner() { return null; }

/* ═══════════════════════════════════════════════════════════════
   WalkFencePathSim — animate BOTH routes around the loop
   so students see why we take min(d, P − d).
   ═══════════════════════════════════════════════════════════════ */
const _WFP_PRESETS = [
  { posts: [[0,0],[4,0],[4,3],[0,3]], A: [0,0], B: [4,3] },                  // square: diagonally opposite
  { posts: [[0,0],[4,0],[4,3],[2,3],[2,5],[0,5]], A: [4,0], B: [0,5] },      // L-shape
  { posts: [[0,0],[6,0],[6,4],[0,4]], A: [2,0], B: [6,2] },                  // rectangle
];

export function WalkFencePathSim({ E }) {
  const [pi, setPi] = useState(0);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const preset = _WFP_PRESETS[pi];
  const posts = preset.posts;
  const P = posts.length;

  // Compute perimeter + cumulative offsets
  let perimeter = 0;
  const cum = [0];
  for (let i = 0; i < P; i++) {
    const j = (i + 1) % P;
    const d = Math.abs(posts[j][0] - posts[i][0]) + Math.abs(posts[j][1] - posts[i][1]);
    perimeter += d;
    cum.push(perimeter);
  }

  // Position of point on perimeter (from post 0)
  const findPos = (x, y) => {
    for (let i = 0; i < P; i++) {
      const j = (i + 1) % P;
      const px = posts[i][0], py = posts[i][1];
      const qx = posts[j][0], qy = posts[j][1];
      if (px === qx && qx === x && Math.min(py, qy) <= y && y <= Math.max(py, qy)) return cum[i] + Math.abs(y - py);
      if (py === qy && qy === y && Math.min(px, qx) <= x && x <= Math.max(px, qx)) return cum[i] + Math.abs(x - px);
    }
    return -1;
  };
  const dA = findPos(preset.A[0], preset.A[1]);
  const dB = findPos(preset.B[0], preset.B[1]);
  const cw  = (dB - dA + perimeter) % perimeter;          // forward distance A→B
  const ccw = perimeter - cw;                              // backward distance
  const shorter = Math.min(cw, ccw);
  const longer  = Math.max(cw, ccw);

  // Resolve a perimeter offset back into (x, y)
  const offsetToXY = (offset) => {
    const o = ((offset % perimeter) + perimeter) % perimeter;
    for (let i = 0; i < P; i++) {
      if (o >= cum[i] && o <= cum[i + 1]) {
        const t = o - cum[i];
        const px = posts[i][0], py = posts[i][1];
        const qx = posts[(i + 1) % P][0], qy = posts[(i + 1) % P][1];
        const seg = cum[i + 1] - cum[i];
        if (seg === 0) return [px, py];
        const f = t / seg;
        return [px + (qx - px) * f, py + (qy - py) * f];
      }
    }
    return posts[0];
  };

  // SVG dimensions
  const minX = Math.min(...posts.map(p => p[0])) - 1;
  const maxX = Math.max(...posts.map(p => p[0])) + 1;
  const minY = Math.min(...posts.map(p => p[1])) - 1;
  const maxY = Math.max(...posts.map(p => p[1])) + 1;
  const W = 320; const H = 220;
  const sx = (x) => ((x - minX) / (maxX - minX)) * W;
  const sy = (y) => H - ((y - minY) / (maxY - minY)) * H;

  // Two walkers — green walker uses shorter route, orange walker uses longer route.
  // Both start at A (offset = dA).  Green moves toward B in the SHORT direction.
  const goCWisShorter = cw <= ccw;
  // tick goes 0..longer.  Each walker stops when it reaches B.
  const greenPos = Math.min(tick, shorter);
  const orangePos = Math.min(tick, longer);
  const greenXY  = offsetToXY(dA + (goCWisShorter ? +1 : -1) * greenPos);
  const orangeXY = offsetToXY(dA + (goCWisShorter ? -1 : +1) * orangePos);

  // Play/pause animation
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTick(t => {
        if (t >= longer) { setPlaying(false); return t; }
        return t + 1;
      });
    }, 380);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, longer]);

  const reset = () => { setPlaying(false); setTick(0); };

  // Build the two route polylines for visual trail
  const buildTrail = (direction, dist) => {
    const pts = [];
    const steps = Math.max(2, Math.round(dist) + 1);
    for (let s = 0; s <= steps; s++) {
      const off = dA + direction * (dist * (s / steps));
      const [x, y] = offsetToXY(off);
      pts.push(`${sx(x)},${sy(y)}`);
    }
    return pts.join(" ");
  };
  const greenTrail  = buildTrail(goCWisShorter ? +1 : -1, greenPos);
  const orangeTrail = buildTrail(goCWisShorter ? -1 : +1, orangePos);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: A, textAlign: "center", marginBottom: 8 }}>
        🐄 {t(E, "Two cows race — one each way around the loop", "두 소가 서로 반대 방향으로 한 바퀴를 돌아요")}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {_WFP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); reset(); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i+1}</button>
        ))}
      </div>

      <svg width={W} height={H} style={{ display: "block", margin: "0 auto", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8 }}>
        {/* Fence */}
        <polygon
          points={posts.map(p => `${sx(p[0])},${sy(p[1])}`).join(" ")}
          fill="none" stroke="#94a3b8" strokeWidth="2"
        />
        {posts.map((p, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r="3" fill="#94a3b8" />
        ))}

        {/* Orange (longer) trail */}
        {orangePos > 0 && (
          <polyline points={orangeTrail} fill="none" stroke="#f97316" strokeWidth="3.5" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {/* Green (shorter) trail — drawn on top */}
        {greenPos > 0 && (
          <polyline points={greenTrail} fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Endpoints */}
        <circle cx={sx(preset.A[0])} cy={sy(preset.A[1])} r="6" fill="#3b82f6" />
        <text x={sx(preset.A[0])} y={sy(preset.A[1]) - 10} fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="800">A</text>
        <circle cx={sx(preset.B[0])} cy={sy(preset.B[1])} r="6" fill="#dc2626" />
        <text x={sx(preset.B[0])} y={sy(preset.B[1]) - 10} fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="800">B</text>

        {/* Walkers */}
        <circle cx={sx(greenXY[0])} cy={sy(greenXY[1])} r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
        <text x={sx(greenXY[0])} y={sy(greenXY[1]) + 3} fontSize="9" fill="#fff" textAnchor="middle" fontWeight="800">S</text>
        <circle cx={sx(orangeXY[0])} cy={sy(orangeXY[1])} r="7" fill="#f97316" stroke="#fff" strokeWidth="2" />
        <text x={sx(orangeXY[0])} y={sy(orangeXY[1]) + 3} fontSize="9" fill="#fff" textAnchor="middle" fontWeight="800">L</text>
      </svg>

      <div style={{ background: "#f0fdf4", border: `1.5px solid #86efac`, borderRadius: 10, padding: "10px 12px", marginTop: 10, marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7 }}>
        perimeter = {perimeter}<br/>
        <span style={{ color: "#16a34a", fontWeight: 700 }}>S {t(E, "(short route)", "(짧은 길)")}</span> = {shorter} · {t(E, "step", "걸음")} {Math.min(tick, shorter)}/{shorter}
        {tick >= shorter && <span style={{ color: "#16a34a", fontWeight: 700 }}> ✓ {t(E, "arrived", "도착")}</span>}
        <br/>
        <span style={{ color: "#f97316", fontWeight: 700 }}>L {t(E, "(long route)", "(먼 길)")}</span> = {longer} · {t(E, "step", "걸음")} {Math.min(tick, longer)}/{longer}
        {tick >= longer && <span style={{ color: "#f97316", fontWeight: 700 }}> ✓ {t(E, "arrived", "도착")}</span>}
        <br/>
        {t(E, "answer = min(", "답 = min(")}{cw}, {ccw}) = <b style={{ color: "#16a34a" }}>{shorter}</b>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setPlaying(p => !p)} disabled={tick >= longer} style={{
          background: tick >= longer ? "#e5e7eb" : (playing ? "#fff" : A),
          border: `1px solid ${tick >= longer ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 700,
          color: tick >= longer ? "#b0b5c3" : (playing ? A : "#fff"),
          cursor: tick >= longer ? "default" : "pointer",
        }}>{playing ? `⏸ ${t(E, "pause", "정지")}` : `▶ ${t(E, "play", "재생")}`}</button>
        <button onClick={reset} style={{
          background: "#fff", border: `1px solid ${C.border}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: C.dim,
          cursor: "pointer",
        }}>↺ {t(E, "reset", "처음으로")}</button>
      </div>
    </div>
  );
}

/* Full solution code, in one place. Sections below are .slice()s of
   this array so the pieces shown on screen can never drift from what
   actually runs (`scripts/check-section-code-complete.py`). */
const WF_ALL_PY = [
  "N, P = map(int, input().split())",
  "posts = []",
  "for _ in range(P):",
  "    x, y = map(int, input().split())",
  "    posts.append((x, y))",
  "",
  "perimeter = 0",
  "cum = [0]   # cum[i] = total distance walked from post 0 to post i (along the boundary)",
  "for i in range(P):",
  "    j = (i + 1) % P",
  "    d = abs(posts[j][0] - posts[i][0]) + abs(posts[j][1] - posts[i][1])",
  "    perimeter += d",
  "    cum.append(perimeter)",
  "",
  "from bisect import bisect_right",
  "",
  "COORD_MAX = 1000",
  "# Group every fence segment by its FIXED coordinate, so a query can jump",
  "# straight to the right segment instead of scanning all P of them.",
  "vertical = [[] for _ in range(COORD_MAX + 1)]      # vertical[x] = list of (y_lo, y_hi, y_at_post_i, cum[i])",
  "horizontal = [[] for _ in range(COORD_MAX + 1)]    # horizontal[y] = list of (x_lo, x_hi, x_at_post_i, cum[i])",
  "for i in range(P):",
  "    j = (i + 1) % P",
  "    px, py = posts[i]",
  "    qx, qy = posts[j]",
  "    if px == qx:",
  "        lo, hi = min(py, qy), max(py, qy)",
  "        vertical[px].append((lo, hi, py, cum[i]))",
  "    else:",
  "        lo, hi = min(px, qx), max(px, qx)",
  "        horizontal[py].append((lo, hi, px, cum[i]))",
  "",
  "for segs in vertical:",
  "    segs.sort()",
  "vertical_lo = [[seg[0] for seg in segs] for segs in vertical]",
  "",
  "for segs in horizontal:",
  "    segs.sort()",
  "horizontal_lo = [[seg[0] for seg in segs] for segs in horizontal]",
  "",
  "def offset_of(x, y):",
  "    # Distance along the boundary from post 0 to point (x, y)",
  "    segs = vertical[x]",
  "    if segs:",
  "        i = bisect_right(vertical_lo[x], y) - 1",
  "        if i >= 0:",
  "            lo, hi, py_ref, cum_ref = segs[i]",
  "            if lo <= y <= hi:",
  "                return (cum_ref + abs(y - py_ref)) % perimeter",
  "    segs = horizontal[y]",
  "    if segs:",
  "        i = bisect_right(horizontal_lo[y], x) - 1",
  "        if i >= 0:",
  "            lo, hi, px_ref, cum_ref = segs[i]",
  "            if lo <= x <= hi:",
  "                return (cum_ref + abs(x - px_ref)) % perimeter",
  "    return -1",
  "",
  "for _ in range(N):",
  "    x1, y1, x2, y2 = map(int, input().split())",
  "    d1 = offset_of(x1, y1)",
  "    d2 = offset_of(x2, y2)",
  "    diff = abs(d1 - d2)",
  "    print(min(diff, perimeter - diff))",
];
const WF_ALL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <cstdlib>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, P;",
  "    cin >> N >> P;",
  "    vector<int> X(P), Y(P);",
  "    for (int i = 0; i < P; i++) {",
  "        cin >> X[i] >> Y[i];",
  "    }",
  "",
  "    // cum[i] = distance walked from post 0 to post i, along the fence",
  "    int perimeter = 0;",
  "    vector<int> cum(P + 1, 0);",
  "    for (int i = 0; i < P; i++) {",
  "        int j = (i + 1) % P;",
  "        int d = abs(X[j] - X[i]) + abs(Y[j] - Y[i]);",
  "        perimeter += d;",
  "        cum[i + 1] = perimeter;",
  "    }",
  "",
  "    // A Segment bundles the four numbers a lookup needs together.",
  "    struct Segment {",
  "        int lo, hi, refCoord, cumAtI;",
  "    };",
  "",
  "    // Group every fence segment by its FIXED coordinate (0..1000), so a",
  "    // query can jump straight to the right segment instead of scanning",
  "    // all P of them.",
  "    const int COORD_MAX = 1000;",
  "    vector<vector<Segment>> vertical(COORD_MAX + 1);",
  "    vector<vector<Segment>> horizontal(COORD_MAX + 1);",
  "    for (int i = 0; i < P; i++) {",
  "        int j = (i + 1) % P;",
  "        if (X[i] == X[j]) {",
  "            int lo = min(Y[i], Y[j]);",
  "            int hi = max(Y[i], Y[j]);",
  "            vertical[X[i]].push_back({lo, hi, Y[i], cum[i]});",
  "        } else {",
  "            int lo = min(X[i], X[j]);",
  "            int hi = max(X[i], X[j]);",
  "            horizontal[Y[i]].push_back({lo, hi, X[i], cum[i]});",
  "        }",
  "    }",
  "    for (int key = 0; key <= COORD_MAX; key++) {",
  "        sort(vertical[key].begin(), vertical[key].end(), [](const Segment& a, const Segment& b) {",
  "            return a.lo < b.lo;",
  "        });",
  "        sort(horizontal[key].begin(), horizontal[key].end(), [](const Segment& a, const Segment& b) {",
  "            return a.lo < b.lo;",
  "        });",
  "    }",
  "",
  "    auto offsetOf = [&](int x, int y) -> int {",
  "        const vector<Segment>& vsegs = vertical[x];",
  "        if (!vsegs.empty()) {",
  "            int i = int(upper_bound(vsegs.begin(), vsegs.end(), y,",
  "                        [](int val, const Segment& s) { return val < s.lo; }) - vsegs.begin()) - 1;",
  "            if (i >= 0 && vsegs[i].lo <= y && y <= vsegs[i].hi) {",
  "                return (vsegs[i].cumAtI + abs(y - vsegs[i].refCoord)) % perimeter;",
  "            }",
  "        }",
  "        const vector<Segment>& hsegs = horizontal[y];",
  "        if (!hsegs.empty()) {",
  "            int i = int(upper_bound(hsegs.begin(), hsegs.end(), x,",
  "                        [](int val, const Segment& s) { return val < s.lo; }) - hsegs.begin()) - 1;",
  "            if (i >= 0 && hsegs[i].lo <= x && x <= hsegs[i].hi) {",
  "                return (hsegs[i].cumAtI + abs(x - hsegs[i].refCoord)) % perimeter;",
  "            }",
  "        }",
  "        return -1;",
  "    };",
  "",
  "    for (int c = 0; c < N; c++) {",
  "        int x1, y1, x2, y2;",
  "        cin >> x1 >> y1 >> x2 >> y2;",
  "        int d1 = offsetOf(x1, y1);",
  "        int d2 = offsetOf(x2, y2);",
  "        int diff = abs(d1 - d2);",
  "        cout << min(diff, perimeter - diff) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

/* Section 1: read posts */
const WF_INPUT_PY = WF_ALL_PY.slice(0, 5);
const WF_INPUT_CPP = WF_ALL_CPP.slice(0, 16);

/* Section 2: cumulative perimeter distances */
const WF_CUM_PY = WF_ALL_PY.slice(5, 13);
const WF_CUM_CPP = WF_ALL_CPP.slice(16, 26);

/* Section 3: fast lookup (grouped by coordinate) + walk each cow */
const WF_QUERY_PY = WF_ALL_PY.slice(13, 64);
const WF_QUERY_CPP = WF_ALL_CPP.slice(26, 89);

/* Section 4: full code */
const WF_FULL_PY = WF_ALL_PY;
const WF_FULL_CPP = WF_ALL_CPP;

export function getWalkFenceSections(E) {
  return [
    {
      label: t(E, "📦 1. Read Fence Posts", "📦 1. 울타리 코너 읽기"),
      color: A,
      py: WF_INPUT_PY, cpp: WF_INPUT_CPP,
      why: [
        t(E, "Goal: for each cow, print the shorter of the two routes around the fence loop.\nTo find that fast, we'll first turn the loop into a straight number line — each post's distance from post 0.\nSo start by reading N (cows), P (posts), then the corners in order.",
            "목표는 소마다 울타리 한 바퀴를 도는 두 길 중 짧은 쪽을 출력하는 거예요.\n빠르게 구하려면 둘레를 곧게 펼친 수직선으로 먼저 바꿔요 — 코너 0 에서부터의 거리로요.\n그러니 먼저 소의 수 N 과 코너의 수 P 를 읽고, 코너를 순서대로 받아요."),
        t(E, "Posts are listed clockwise (or counter-clockwise) around the rectilinear fence.",
            "코너는 울타리를 한 방향으로 돌면서 차례대로 적혀 있어요."),
      ],
      pyOnly: [
        t(E, "tuple(map(int, ...)) packs each (x, y) tightly.",
            "tuple(map(int, ...)) 을 쓰면 (x, y) 쌍을 한 번에 담을 수 있어요."),
      ],
      cppOnly: [
        t(E, "Two parallel vector<int> X, Y avoid struct overhead — coordinates are 0..1000, so int is plenty.",
            "X, Y 를 벡터 두 개로 따로 두면 구조체를 안 만들어도 돼요.\n좌표가 0~1000 이라 int 면 넉넉해요."),
      ],
    },
    {
      label: t(E, "📐 2. Cumulative Perimeter Distances", "📐 2. 시작점에서 쌓아 온 둘레 거리"),
      color: "#0891b2",
      py: WF_CUM_PY, cpp: WF_CUM_CPP,
      why: [
        t(E, "cum[i] = how far along the fence post i is, measured from post 0.",
            "cum[i] 는 코너 0 에서 울타리를 따라 코너 i 까지 간 거리예요."),
        t(E, "Total perimeter is just cum[P] — needed to choose the shorter side later.",
            "cum[P] 가 울타리 한 바퀴예요. 나중에 짧은 쪽을 고를 때 이 값이 필요해요."),
      ],
      pyOnly: [
        t(E, "abs() works on integers — Manhattan distance for axis-aligned edges.",
            "변이 가로나 세로뿐이라 abs() 로 뺀 값이 곧 그 변의 길이예요."),
      ],
      cppOnly: [
        t(E, "abs() from <cstdlib> on int — coordinates ≤ 1000 so int range is safe.",
            "abs() 는 <cstdlib> 에 있어요. 좌표가 1000 을 넘지 않아 int 로 충분해요."),
      ],
    },
    {
      label: t(E, "🧭 3. Fast Lookup + Walk Each Cow", "🧭 3. 빠른 찾기 + 소별 거리"),
      color: "#16a34a",
      py: WF_QUERY_PY, cpp: WF_QUERY_CPP,
      why: [
        t(E, "Scanning all P edges per query is too slow (N·P). Instead, group edges by\ntheir fixed coordinate — then a query only checks the small group at that x or y.",
            "매번 변 P 개를 다 보면 N·P 라 너무 느려요. 대신 변을 고정된 좌표별로\n묶어 두면, 물음마다 그 x 나 y 에 속한 작은 무리만 보면 돼요."),
        t(E, "Within a group, binary search (bisect) finds the right segment in O(log P)\ninstead of scanning it.",
            "묶음 안에서는 이진 탐색(bisect)으로 O(log P) 만에 맞는 변을 찾아요."),
        t(E, "Why compute both directions? We can't tell which way is shorter in advance — one way is |d1 - d2|, the other is perimeter - |d1 - d2|. Take the min.",
            "왜 두 방향을 다 구할까요? 어느 쪽이 짧은지 미리 알 수 없어서예요 —\n한쪽은 |d1 - d2|, 반대쪽은 perimeter - |d1 - d2| 예요.\n둘 중 작은 값이 답이에요."),
      ],
      pyOnly: [
        t(E, "Functions defined at module scope can read the closure (posts, cum) directly.",
            "바깥에 만든 함수는 posts 와 cum 을 그대로 읽을 수 있어요."),
      ],
      cppOnly: [
        t(E, "Capturing by reference [&] gives the lambda live access to X, Y, cum.",
            "람다 앞에 [&] 를 적으면 X, Y, cum 을 그대로 쓸 수 있어요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: WF_FULL_PY, cpp: WF_FULL_CPP,
      why: [
        t(E, "Read posts → cumulative distances → for each cow, find both points on perimeter and pick shorter side.",
            "코너를 읽고, 쌓아 온 거리를 만들고, 소마다 두 점을 둘레에서 찾아 짧은 쪽을 골라요."),
        t(E, "Total work: O((N + P) log P) — building the lookup takes O(P log P),\neach of the N queries takes O(log P).",
            "빠른 찾기를 만드는 데 O(P log P), 소 N 마리 각각의 물음에 O(log P) —\n모두 O((N + P) log P) 예요."),
      ],
    },
  ];
}

export function WalkFenceProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#16a34a" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 WF_ALL_PY/CPP 배열을 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (이 파일 헤더가 USACO_VERIFIED 라 그 이름 패턴은 보호 변수로 간주된다). ── */
export function getWalkFenceWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = WF_ALL_CPP;
    return {
      code,
      vars: [
        { v: "cum", ko: "코너 0 에서부터 쌓아 온 거리", en: "distance walked from post 0, accumulated" },
        { v: "vertical / horizontal", ko: "고정 좌표별로 묶은 변 목록", en: "fence segments grouped by their fixed coordinate" },
        { v: "offsetOf", ko: "점 (x,y) 가 코너 0 부터 몇 걸음인지", en: "how far a point (x,y) is from post 0, along the fence" },
      ],
      beats: [
        { hi: [0, 15], bubble: t(E,
          "What do we need? N cows, P fence posts, and the posts' coordinates. Goal: for each cow, print the shorter of the two routes around the loop.",
          "무엇을 알아야 할까요? 소의 수 N, 코너의 수 P, 그리고 코너 좌표들이에요.\n목표는 소마다 울타리 한 바퀴를 도는 두 길 중 짧은 쪽을 출력하는 거예요.") },
        { hi: [17, 25], bubble: t(E,
          "How do we turn the loop into something we can measure quickly? Record cum[i] — the distance walked from post 0 to post i. Then the distance between ANY two posts is just a subtraction.",
          "울타리를 빠르게 잴 수 있게 바꾸려면 어떻게 할까요? cum[i] 에 코너 0 부터 코너 i 까지 쌓아 온 거리를 적어 둬요.\n그러면 어느 두 코너 사이 거리도 뺄셈 한 번으로 구할 수 있어요.") },
        { hi: [27, 49], bubble: t(E,
          "Scanning all P edges for every query is too slow (N·P). How do we speed it up? Group edges by their FIXED coordinate — vertical edges by x, horizontal edges by y. Now a query only needs to look at the small group at one x or one y.",
          "물음마다 변 P 개를 다 보면 N·P 라 너무 느려요. 어떻게 빠르게 할까요?\n변을 고정된 좌표별로 묶어 둬요 — 세로 변은 x 로, 가로 변은 y 로요.\n그러면 물음마다 그 x 나 y 에 속한 작은 무리만 보면 돼요.") },
        { hi: [50, 57], bubble: t(E,
          "Within each group, how do we find the right segment fast? Sort the segments by their starting coordinate — that unlocks binary search instead of scanning.",
          "그 무리 안에서 맞는 변을 빠르게 찾으려면요? 변을 시작 좌표 순으로 정렬해 둬요 — 그러면 훑지 않고 이진 탐색을 쓸 수 있어요.") },
        { hi: [59, 77], bubble: t(E,
          "Given a point (x, y), how far is it from post 0 along the fence? Binary-search the vertical group at x (or horizontal at y) to find the segment containing the point, then add how far into that segment the point sits.",
          "점 (x, y) 가 코너 0 부터 울타리를 따라 얼마나 떨어져 있을까요? x 의 세로 변 무리(또는 y 의 가로 변 무리)에서 이진 탐색으로 그 점이 속한 변을 찾고, 그 변 안에서 움직인 만큼을 더해요.") },
        { hi: [79, 88], bubble: t(E,
          "For each cow, find where both points sit (d1, d2). We can't tell which way around is shorter in advance, so compute both — |d1-d2| and perimeter minus that — and print the smaller one.",
          "소마다 두 점의 위치(d1, d2)를 구해요. 어느 방향이 짧은지 미리 알 수 없어서, |d1-d2| 와 perimeter 에서 그걸 뺀 값을 둘 다 구해서 작은 쪽을 출력해요.") },
      ],
    };
  }
  const code = WF_ALL_PY;
  return {
    code,
    vars: [
      { v: "cum", ko: "코너 0 에서부터 쌓아 온 거리", en: "distance walked from post 0, accumulated" },
      { v: "vertical / horizontal", ko: "고정 좌표별로 묶은 변 목록", en: "fence segments grouped by their fixed coordinate" },
      { v: "offset_of", ko: "점 (x,y) 가 코너 0 부터 몇 걸음인지", en: "how far a point (x,y) is from post 0, along the fence" },
    ],
    beats: [
      { hi: [0, 4], bubble: t(E,
        "What do we need? N cows, P fence posts, and the posts' coordinates. Goal: for each cow, print the shorter of the two routes around the loop.",
        "무엇을 알아야 할까요? 소의 수 N, 코너의 수 P, 그리고 코너 좌표들이에요.\n목표는 소마다 울타리 한 바퀴를 도는 두 길 중 짧은 쪽을 출력하는 거예요.") },
      { hi: [6, 12], bubble: t(E,
        "How do we turn the loop into something we can measure quickly? Record cum[i] — the distance walked from post 0 to post i. Then the distance between ANY two posts is just a subtraction.",
        "울타리를 빠르게 잴 수 있게 바꾸려면 어떻게 할까요? cum[i] 에 코너 0 부터 코너 i 까지 쌓아 온 거리를 적어 둬요.\n그러면 어느 두 코너 사이 거리도 뺄셈 한 번으로 구할 수 있어요.") },
      { hi: [14, 30], bubble: t(E,
        "Scanning all P edges for every query is too slow (N·P). How do we speed it up? Group edges by their FIXED coordinate — vertical edges by x, horizontal edges by y. Now a query only needs to look at the small group at one x or one y.",
        "물음마다 변 P 개를 다 보면 N·P 라 너무 느려요. 어떻게 빠르게 할까요?\n변을 고정된 좌표별로 묶어 둬요 — 세로 변은 x 로, 가로 변은 y 로요.\n그러면 물음마다 그 x 나 y 에 속한 작은 무리만 보면 돼요.") },
      { hi: [32, 38], bubble: t(E,
        "Within each group, how do we find the right segment fast? Sort the segments by their starting coordinate — that unlocks binary search instead of scanning.",
        "그 무리 안에서 맞는 변을 빠르게 찾으려면요? 변을 시작 좌표 순으로 정렬해 둬요 — 그러면 훑지 않고 이진 탐색을 쓸 수 있어요.") },
      { hi: [40, 56], bubble: t(E,
        "Given a point (x, y), how far is it from post 0 along the fence? Binary-search (bisect_right) the vertical group at x (or horizontal at y) to find the segment containing the point, then add how far into that segment the point sits.",
        "점 (x, y) 가 코너 0 부터 울타리를 따라 얼마나 떨어져 있을까요? x 의 세로 변 무리(또는 y 의 가로 변 무리)에서 이진 탐색(bisect_right)으로 그 점이 속한 변을 찾고, 그 변 안에서 움직인 만큼을 더해요.") },
      { hi: [58, 63], bubble: t(E,
        "For each cow, find where both points sit (d1, d2). We can't tell which way around is shorter in advance, so compute both — |d1-d2| and perimeter minus that — and print the smaller one.",
        "소마다 두 점의 위치(d1, d2)를 구해요. 어느 방향이 짧은지 미리 알 수 없어서, |d1-d2| 와 perimeter 에서 그걸 뺀 값을 둘 다 구해서 작은 쪽을 출력해요.") },
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

export function downloadWalkFencePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Walking Along a Fence — Full Study Guide", "🚶 Walking Along a Fence — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
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
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
