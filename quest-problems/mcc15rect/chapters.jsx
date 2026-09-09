import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc15RectSections, getMcc15RectWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };
const A = "#059669";

/* ─────────────────────────────────────────────────────────────
   Concept sim: find the lonely x, then the lonely y, then the
   4th corner appears. Includes a negative-coordinate preset.
   ───────────────────────────────────────────────────────────── */
const PRESETS = [
  { corners: [[0, 0], [0, 3], [3, 3]], missing: [3, 0] },   // official sample
  { corners: [[1, 1], [5, 1], [1, 4]], missing: [5, 4] },
  { corners: [[-2, -1], [3, -1], [-2, 4]], missing: [3, 4] }, // negatives
  { corners: [[-5, 2], [-5, -3], [0, 2]], missing: [0, -3] }, // negatives
];

// which of the three values is the lonely one? returns [pairIdxA, pairIdxB, lonelyIdx]
function pairing(v1, v2, v3) {
  if (v1 === v2) return [0, 1, 2];
  if (v1 === v3) return [0, 2, 1];
  return [1, 2, 0];
}

function RectCornerSim({ E }) {
  /* 2026-09-09: 시뮬이 2쪽 예제(0,0)(0,3)(3,3)와 **같은 것**부터 보여줬다.
     학생: "이거 방금 본 건데." 다른 예제부터 시작한다.
     공식 예제는 프리셋에 그대로 있으니 눌러서 볼 수 있다. */
  const [pi, setPi] = useState(1);
  const [stage, setStage] = useState(0); // 0 given · 1 x · 2 y · 3 answer

  const preset = PRESETS[pi];
  const [a, b, c] = preset.corners;
  const [mx, my] = preset.missing;

  const xs3 = [a[0], b[0], c[0]];
  const ys3 = [a[1], b[1], c[1]];
  const [xpA, xpB, xL] = pairing(xs3[0], xs3[1], xs3[2]);
  const [ypA, ypB, yL] = pairing(ys3[0], ys3[1], ys3[2]);

  // scale from min/max so negative coordinates never break the drawing
  const allX = [...xs3, mx];
  const allY = [...ys3, my];
  const minX = Math.min(...allX), maxX = Math.max(...allX);
  const minY = Math.min(...allY), maxY = Math.max(...allY);
  const pad = 1;
  const W = 260, H = 190;
  const sx = (x) => 22 + ((x - minX + pad) / (maxX - minX + 2 * pad)) * (W - 44);
  const sy = (y) => H - 22 - ((y - minY + pad) / (maxY - minY + 2 * pad)) * (H - 44);

  const showX = stage >= 1, showY = stage >= 2, showAns = stage >= 3;

  const next = () => setStage(Math.min(3, stage + 1));
  const other = () => { setPi((pi + 1) % PRESETS.length); setStage(0); };

  const dot = (x, y, color, label, key) => (
    <g key={key}>
      <circle cx={sx(x)} cy={sy(y)} r="6" fill={color} stroke="#fff" strokeWidth="2" />
      <text x={sx(x) + 9} y={sy(y) - 8} fontSize="11" fontWeight="700" fill={color}>{label}</text>
      <text x={sx(x) + 9} y={sy(y) + 13} fontSize="9.5" fill="#64748b"
        fontFamily="'JetBrains Mono',monospace">({x},{y})</text>
    </g>
  );

  const chip = (val, kind) => (
    <span style={{
      ...NW, display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 34, height: 30, padding: "0 8px", borderRadius: 8,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800,
      border: kind === "lonely" ? `2px solid ${A}` : "1.5px solid #cbd5e1",
      background: kind === "lonely" ? A : kind === "pair" ? "#e2e8f0" : "#fff",
      color: kind === "lonely" ? "#fff" : "#475569",
    }}>{val}</span>
  );

  const chipRow = (label, vals, pA, pB, lo, on) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
      <span style={{ ...NW, fontSize: 12, fontWeight: 700, color: "#065f46", minWidth: 74 }}>{label}</span>
      {vals.map((v, i) => (
        <span key={i}>{chip(v, !on ? "plain" : (i === lo ? "lonely" : "pair"))}</span>
      ))}
      {on && (
        <span style={{ ...NW, ...KA, fontSize: 11.5, color: C.dim }}>
          {t(E,
            `${vals[pA]} appears twice → the lonely one is ${vals[lo]}`,
            `두 번 나온 값 ${vals[pA]} → 짝 없는 값 ${vals[lo]}`)}
        </span>
      )}
    </div>
  );

  const stageMsg = [
    t(E, "Three corners of an axis-aligned rectangle. Where is the fourth?",
        "축에 평행한 직사각형의 꼭짓점 3개예요. 네 번째는 어디일까요?"),
    t(E, "Look only at the x-coordinates: two of them are the same side, so one is lonely.",
        "x 좌표만 봐요: 두 개는 같은 변이라 짝이고, 하나만 짝이 없어요."),
    t(E, "Now the y-coordinates, exactly the same way.",
        "이번엔 y 좌표를 똑같은 방법으로 봐요."),
    t(E, "The lonely x and the lonely y together are the missing corner.",
        "짝 없는 x 와 짝 없는 y 를 합치면 그게 빠진 꼭짓점이에요."),
  ][stage];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          {"▭"} {t(E, "Find the lonely coordinate", "짝 없는 좌표 찾기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {stageMsg}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <svg width={W} height={H} style={{ background: "#fff", borderRadius: 8, border: "1px solid #d1fae5" }}>
            {/* grid */}
            {Array.from({ length: maxX - minX + 2 * pad + 1 }).map((_, i) => {
              const gx = sx(minX - pad + i);
              return <line key={`v${i}`} x1={gx} y1={16} x2={gx} y2={H - 16} stroke="#ecfdf5" strokeWidth="1" />;
            })}
            {Array.from({ length: maxY - minY + 2 * pad + 1 }).map((_, i) => {
              const gy = sy(minY - pad + i);
              return <line key={`h${i}`} x1={16} y1={gy} x2={W - 16} y2={gy} stroke="#ecfdf5" strokeWidth="1" />;
            })}
            {/* zero axes when they fall inside the view */}
            {minX - pad <= 0 && 0 <= maxX + pad &&
              <line x1={sx(0)} y1={16} x2={sx(0)} y2={H - 16} stroke="#94a3b8" strokeWidth="1.2" />}
            {minY - pad <= 0 && 0 <= maxY + pad &&
              <line x1={16} y1={sy(0)} x2={W - 16} y2={sy(0)} stroke="#94a3b8" strokeWidth="1.2" />}

            {/* the finished rectangle */}
            {showAns && (() => {
              const ux = [...new Set([...xs3, mx])].sort((p, q) => p - q);
              const uy = [...new Set([...ys3, my])].sort((p, q) => p - q);
              if (ux.length !== 2 || uy.length !== 2) return null;
              return <rect x={sx(ux[0])} y={sy(uy[1])} width={sx(ux[1]) - sx(ux[0])} height={sy(uy[0]) - sy(uy[1])}
                fill="rgba(5,150,105,0.08)" stroke={A} strokeWidth="2" strokeDasharray="4 3" />;
            })()}

            {/* guide lines for the lonely x / y */}
            {showX && <line x1={sx(xs3[xL])} y1={16} x2={sx(xs3[xL])} y2={H - 16} stroke={A} strokeWidth="2" strokeDasharray="3 3" />}
            {showY && <line x1={16} y1={sy(ys3[yL])} x2={W - 16} y2={sy(ys3[yL])} stroke={A} strokeWidth="2" strokeDasharray="3 3" />}

            {dot(a[0], a[1], "#065f46", "A", "a")}
            {dot(b[0], b[1], "#065f46", "B", "b")}
            {dot(c[0], c[1], "#065f46", "C", "c")}

            {showAns
              ? dot(mx, my, "#dc2626", "D", "d")
              : <g>
                  <circle cx={sx(mx)} cy={sy(my)} r="6" fill="#fef3c7" stroke="#a16207" strokeWidth="2" strokeDasharray="2 2" />
                  <text x={sx(mx) + 9} y={sy(my) - 8} fontSize="11" fontWeight="700" fill="#a16207">?</text>
                </g>}
          </svg>
        </div>

        <div style={{ background: "#fff", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
          {chipRow(t(E, "x of A,B,C", "A,B,C 의 x"), xs3, xpA, xpB, xL, showX)}
          {chipRow(t(E, "y of A,B,C", "A,B,C 의 y"), ys3, ypA, ypB, yL, showY)}
        </div>

        {showAns && (
          <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
            fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, ...KA }}>
            {t(E, "4th corner = (", "4번째 꼭짓점 = (")}
            <b style={{ color: "#34d399" }}>{mx}</b>, <b style={{ color: "#34d399" }}>{my}</b>)
          </div>
        )}

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
          <button onClick={next} disabled={stage >= 3} style={{
            background: stage >= 3 ? "#d1fae5" : A, color: stage >= 3 ? "#065f46" : "#fff",
            border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 800,
            cursor: stage >= 3 ? "default" : "pointer",
          }}>
            {stage === 0 ? t(E, "1) lonely x ▶", "1) 짝 없는 x ▶")
              : stage === 1 ? t(E, "2) lonely y ▶", "2) 짝 없는 y ▶")
              : stage === 2 ? t(E, "3) 4th corner ▶", "3) 4번째 꼭짓점 ▶")
              : t(E, "Done", "완료")}
          </button>
          <button onClick={() => setStage(0)} style={{
            background: "#fff", color: "#475569", border: "1.5px solid #cbd5e1",
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            {t(E, "Restart", "처음부터")}
          </button>
          <button onClick={other} style={{
            background: "#fff", color: A, border: `1.5px solid ${A}`,
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            {t(E, "Another example", "다른 예제")}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, textAlign: "center", ...KA }}>
          {t(E, `example ${pi + 1} / ${PRESETS.length} — some have negative coordinates`,
              `예제 ${pi + 1} / ${PRESETS.length} — 음수 좌표가 섞인 예제도 있어요`)}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (pick the coordinate that has no partner)
   ================================================================ */
export const SOLUTION_CODE = [
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# 축에 평행한 직사각형 → x 좌표는 왼쪽 변에 2번, 오른쪽 변에 2번 등장해요.",
  "# 주어진 3개 중 짝이 있는 두 개를 빼면, 짝 없는 하나가 답이에요.",
  "if x1 == x2: x4 = x3",
  "elif x1 == x3: x4 = x2",
  "else: x4 = x1",
  "",
  "if y1 == y2: y4 = y3",
  "elif y1 == y3: y4 = y2",
  "else: y4 = y1",
  "",
  "print(x4, y4)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15RectCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Kumar picks four points that form a rectangle with sides parallel to the axes.\nYou get 3 of the corners — print the coordinates of the fourth.",
        "Kumar 가 축에 평행한 직사각형을 이루는 네 점을 골라요.\n그중 꼭짓점 3개가 주어져요 — 네 번째 꼭짓점의 좌표를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"▭"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Rectangles</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P1</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Given 3 corners of an axis-parallel rectangle, print the 4th corner.",
                "축에 평행한 직사각형의 꼭짓점 3개를 받아서, 4번째 꼭짓점을 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Kumar chooses four points that form a ", "Kumar 가 네 점을 골라 ")}
                  <b style={{ color: A }}>{t(E, "rectangle with sides parallel to the axes", "변이 축에 평행한 직사각형")}</b>
                  {t(E, ".", " 을 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You are given the coordinates of ", "그중 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "3 vertices", "꼭짓점 3개")}</b>
                  {t(E, ".", " 의 좌표가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Coordinates can be negative: ", "좌표는 음수일 수 있어요: ")}
                  <b style={{ color: "#dc2626" }}>−1,000 ≤ x, y ≤ 1,000</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Find the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "coordinates of the fourth vertex", "네 번째 꼭짓점의 좌표")}</b>
                  {t(E, ".", "를 구해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Three lines come in, one point per line. One line goes out with the fourth point.",
        "한 줄에 한 점씩 세 줄이 들어오고, 네 번째 점 한 줄이 나가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Three lines, each with two space-separated integers x and y.", "세 줄, 각 줄에 공백으로 구분된 정수 x 와 y.")}</div>
              <div>• {t(E, "Range: ", "범위: ")}<b>−1,000 ≤ x, y ≤ 1,000</b> {t(E, "(negatives allowed)", "(음수 가능)")}</div>
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>
                x1, y1 = map(int, input().split())  ×3
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", margin: "12px 0 6px" }}>
              📤 {t(E, "Output", "출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Two space-separated integers x, y — the fourth vertex.", "공백으로 구분된 정수 두 개 x, y — 네 번째 꼭짓점.")}</div>
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>
                print(x4, y4)
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, flex: 1, minWidth: 140 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample input", "예제 입력")}</div>
              <div>0 0</div>
              <div>0 3</div>
              <div>3 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, minWidth: 110 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample output", "예제 출력")}</div>
              <div style={{ fontWeight: 800 }}>3 0</div>
            </div>
          </div>
          {/* 2026-09-09: 여기서 답(3 0)과 풀이 근거를 **다 말해버렸다.**
              학생: "2쪽에서 답까지 설명해줘서 그 뒤로는 확인만 하면 됐다."
              형제 quest mcc19rect2 는 같은 자리를 이미 다음 쪽으로 미뤄놨다.
              형식 쪽은 형식만. 찾는 건 시뮬 몫이다. */}
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
            {t(E,
              "Why 3 0? Find it yourself on the next page.",
              "왜 3 0 일까요? 다음 쪽에서 직접 찾아봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself: find the lonely x, then the lonely y, then watch the fourth corner appear.",
        "직접 해봐요. 세 점의 x 끼리, y 끼리 견줘봐요."),
      content: <RectCornerSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Negative coordinates change nothing — we only check whether two values are the same.",
        "좌표가 음수여도 달라지는 건 없어요 — 두 값이 같은지만 보니까요."),
      question: t(E,
        "Corners: (−2, −1), (3, −1), (−2, 4). What is the 4th corner?",
        "꼭짓점: (−2, −1), (3, −1), (−2, 4). 4번째 꼭짓점은?"),
      options: [
        "(−2, 4)",
        "(3, 4)",
        "(3, −1)",
        "(−2, −1)",
      ],
      correct: 1,
      explain: t(E,
        "The x's are −2, 3, −2 — the −2's pair up, so the lonely x is 3. The y's are −1, −1, 4 — the −1's pair up, so the lonely y is 4. The 4th corner is (3, 4).",
        "x 는 −2 가 두 번 → 짝 없는 3. y 는 −1 이 두 번 → 짝 없는 4. 그래서 4번째 꼭짓점은 (3, 4) 예요."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15RectCh2(E, lang = "py") {
  return [
    // 2-1: plan
    {
      type: "reveal",
      narr: t(E,
        "No sorting, no searching, no formula. Two words in the statement — 'parallel to the axes' — hand you the whole answer.",
        "정렬도, 탐색도, 공식도 필요 없어요. 문제의 '축에 평행' 이라는 말 한마디가 답을 다 알려줘요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                💡 {t(E, "What 'parallel to the axes' gives us", "'축에 평행' 이 주는 힌트")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E,
                  "The sides run straight up-down and left-right. So the left side has one x, the right side has another x — only two different x values exist in the whole rectangle. Same for y: only a bottom y and a top y.",
                  "변이 위아래·좌우로 곧게 뻗어 있어요. 그래서 왼쪽 변의 x 하나, 오른쪽 변의 x 하나 — 직사각형 전체에 x 는 딱 두 종류뿐이에요. y 도 아래쪽 하나, 위쪽 하나로 두 종류뿐이고요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                💡 {t(E, "So: pick the lonely one", "그래서: 짝 없는 값 고르기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E,
                  "Each x value belongs to two corners. We are given 3 corners, so among the three x's exactly two are equal and one has lost its partner — that lonely x is the answer's x. Do the same for y. Three comparisons each, and we are done.",
                  "x 값 하나는 꼭짓점 두 개가 나눠 써요. 우리는 꼭짓점 3개만 받았으니, x 세 개 중 두 개는 같고 하나는 짝을 잃은 상태예요 — 그 짝 없는 x 가 답의 x 예요. y 도 똑같이 하면 끝이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: 코드 — CodeWalk (설명 말풍선이 코드 줄에 붙는다)
    /* 전에는 코드 **위에** why 4줄 + pyOnly 3 + cppOnly 3 이 얹혀 있었다.
       memory/feedback_quest_code_codewalk.md 가 이 모양을 이름 대고 금지한다
       (선생님 2026-07-14: "코드 위 설명은 안 읽힘. 앞으로 코드는 모두 이런식으로.")
       형제 quest mcc19rect2 를 본떠 바꾼다 (2026-09-09, 파일럿). */
    {
      type: "reveal",
      narr: t(E,
        "Each bubble sits on the line it explains.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (() => {
        const w = getMcc15RectWalk(E, lang);
        return <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent={A} />;
      })(),
    },
  ];
}
