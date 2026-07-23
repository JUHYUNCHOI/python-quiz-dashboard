import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getCornerCoverSections } from "./components";

/* ================================================================
   Deep-audit sim — adjust N and M, watch the algorithm classify
   each case and highlight the distinct corner cells.
   ================================================================ */
function CornerAuditSim({ E }) {
  const [N, setN] = useState(3);
  const [M, setM] = useState(5);

  const isCorner = (r, c) => (r === 0 || r === N - 1) && (c === 0 || c === M - 1);
  const branch = N === 1 && M === 1 ? "1x1" : (N === 1 || M === 1) ? "line" : "rect";
  const expected = branch === "1x1" ? 1 : branch === "line" ? 2 : 4;

  // Count DISTINCT corner cells (degenerate cases collapse)
  const seen = new Set();
  for (let r = 0; r < N; r++) for (let c = 0; c < M; c++) {
    if (isCorner(r, c)) seen.add(`${r},${c}`);
  }
  const distinct = seen.size;

  const CELL = N <= 4 && M <= 6 ? 36 : N <= 6 && M <= 8 ? 28 : 22;

  const branchColor = branch === "1x1" ? "#dc2626" : branch === "line" ? "#d97706" : "#059669";
  const branchLabel = branch === "1x1"
    ? t(E, "N == 1 and M == 1  →  print(1)", "N == 1 그리고 M == 1  →  print(1)")
    : branch === "line"
      ? t(E, "N == 1 or M == 1  →  print(2)", "N == 1 또는 M == 1  →  print(2)")
      : t(E, "else  →  print(4)", "그 외  →  print(4)");

  const Slider = ({ label, val, set, min, max }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
      <span style={{ fontWeight: 700, color: "#065f46", minWidth: 16 }}>{label}</span>
      <button onClick={() => set(Math.max(min, val - 1))} style={{
        width: 26, height: 26, borderRadius: 6, border: "1.5px solid #059669",
        background: "#fff", color: "#059669", fontWeight: 800, cursor: "pointer",
      }}>−</button>
      <span style={{ minWidth: 22, textAlign: "center", fontWeight: 800, color: "#059669" }}>{val}</span>
      <button onClick={() => set(Math.min(max, val + 1))} style={{
        width: 26, height: 26, borderRadius: 6, border: "1.5px solid #059669",
        background: "#fff", color: "#059669", fontWeight: 800, cursor: "pointer",
      }}>+</button>
    </div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
        padding: "10px 14px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          🔬 {t(E, "Deep audit — pick N and M, watch the branches", "딥 오딧 — N, M 을 골라보고 분기를 살펴봐요")}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Slider label="N" val={N} set={setN} min={1} max={6} />
          <Slider label="M" val={M} set={setM} min={1} max={8} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{
          display: "grid",
          gridTemplateRows: `repeat(${N}, ${CELL}px)`,
          gridTemplateColumns: `repeat(${M}, ${CELL}px)`,
          gap: 2, background: "#d1fae5", padding: 4, borderRadius: 8,
        }}>
          {Array.from({ length: N }).map((_, r) =>
            Array.from({ length: M }).map((__, c) => {
              const corner = isCorner(r, c);
              return (
                <div key={`${r}-${c}`} style={{
                  background: corner ? branchColor : "#fff",
                  color: corner ? "#fff" : "#9ca3af",
                  borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                  boxShadow: corner ? `0 0 0 2px ${branchColor}` : "none",
                  transition: "background .2s, box-shadow .2s",
                }}>
                  {corner ? "★" : ""}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div style={{
        background: "#fff", border: `1.5px solid ${branchColor}`, borderRadius: 10,
        padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ fontSize: 12, color: C.dim }}>
          {t(E, "Active branch:", "선택된 분기:")}
          <b style={{ color: branchColor, marginLeft: 6 }}>{branchLabel}</b>
        </div>
        <div style={{ fontSize: 13, color: C.text }}>
          {t(E, "Distinct corner cells (★):", "서로 다른 꼭짓점 칸 (★):")}
          <b style={{ color: branchColor, marginLeft: 6 }}>{distinct}</b>
          <span style={{ color: C.dim, marginLeft: 8, fontSize: 12 }}>
            {t(E, `→ matches print(${expected})`, `→ print(${expected}) 와 일치`)}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.5 }}>
          {t(E,
            "Try N=1, M=1 (1 corner), N=1 and M≥2 (a line, 2 corners), then N≥2 and M≥2 (full rectangle, 4 corners). The grid collapses, but the formula still holds.",
            "N=1, M=1 (꼭짓점 1) → N=1 이면서 M≥2 (직선, 2) → N≥2 이면서 M≥2 (직사각형, 4) 순서로 눌러봐요. 격자가 무너져도 공식은 그대로.")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# An N x M grid always has 4 corners",
  "# unless N == 1 or M == 1 (then 2 corners)",
  "# unless N == 1 and M == 1 (then 1 corner)",
  "",
  "if N == 1 and M == 1:",
  "    print(1)",
  "elif N == 1 or M == 1:",
  "    print(2)",
  "else:",
  "    print(4)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N × M grid is given. Print how many DISTINCT corner cells the grid has — corners being the cells at the four 'extremes' of the rectangle.\n(A degenerate grid like 1×M or N×1 has only 2 distinct corners; a single cell 1×1 has only 1.)",
        "N × M 격자가 주어져요. 격자의 네 '끝' 에 위치한 칸들 — 즉 꼭짓점 칸 — 의 서로 다른 개수를 출력해요.\n(예외: 1×M 이나 N×1 같은 가늘어진 격자는 꼭짓점이 2개, 1×1 한 칸은 꼭짓점이 1개.)"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcd0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Corner Cover</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E, "Print the number of distinct corner cells in an N × M grid.", "N × M 격자의 서로 다른 꼭짓점 칸 개수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N × M grid", "N × M 격자")}</b>
                  {t(E, " is given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "corner cell", "꼭짓점 칸")}</b>
                  {t(E, " is at one of the four 'extremes' of the rectangle (top-left, top-right, bottom-left, bottom-right).",
                        " 은 사각형의 네 끝 (좌상, 우상, 좌하, 우하) 중 하나의 위치에 있는 칸.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Degenerate grids: ", "예외: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "1 × M or N × 1 has 2 distinct corners; 1 × 1 has 1", "1 × M 이나 N × 1 은 꼭짓점이 2개, 1 × 1 은 1개")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinct corner cells", "서로 다른 꼭짓점 칸의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 (quest 자체 코드/예제에서 도출 — MCC 2024 공개 원문 없음, 제약 미상 → CONSTRAINTS 생략)
    {
      type: "reveal",
      narr: t(E,
        "So how does the data come in?", "그럼 데이터는 어떻게 들어올까?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(one line) — grid rows N and columns M, space-separated", "(한 줄) — 격자의 행 N 과 열 M, 공백으로 구분")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single integer — the number of distinct corner cells in the grid.",
                  "정수 하나 — 격자의 서로 다른 꼭짓점 칸의 개수.")}
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
                <div>3 5</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>4</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "A 3 × 5 grid (both sides ≥ 2) is a full rectangle, so it has 4 distinct corner cells.",
                "3 × 5 격자 (양변 모두 ≥ 2) 는 온전한 직사각형이라 서로 다른 꼭짓점 칸이 4개예요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "How many corners does a 3x5 grid have?", "3x5 격자의 꼭짓점은 몇 개예요?"),
      question: t(E,
        "A 3x5 rectangular grid has how many corner cells?",
        "3x5 직사각형 격자의 꼭짓점 셀은 몇 개?"),
      options: [
        t(E, "2", "2개"),
        t(E, "4", "4개"),
        t(E, "8", "8개"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Any rectangle with N>=2 and M>=2 has exactly 4 corner cells: top-left, top-right, bottom-left, bottom-right.",
        "맞아! N>=2, M>=2인 직사각형은 정확히 4개의 꼭짓점 셀이 있어: 좌상, 우상, 좌하, 우하."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For a 4x4 square grid, how many corners need covering?", "4x4 정사각형 격자에서 덮어야 할 꼭짓점은 몇 개?"),
      question: t(E,
        "N=4, M=4. How many corners?",
        "N=4, M=4. 꼭짓점은 몇 개?"),
      hint: t(E,
        "A square is just a rectangle with N == M. Both are ≥ 2 here — count its extreme cells.",
        "정사각형도 N == M 인 직사각형이에요. 둘 다 ≥ 2 인 경우 — 끝 칸들을 세어봐요."),
      answer: 4,
    },
    // 1-4: Deep-audit sim — sweep N and M, watch the three branches
    {
      type: "reveal",
      narr: t(E,
        "Sweep N and M yourself — the grid collapses on degenerate cases, and the algorithm's three branches light up.",
        "N 과 M 을 직접 바꿔봐요 — 가늘어진 경우엔 격자가 무너지고, 알고리즘의 세 분기가 차례로 켜져요."),
      content: <CornerAuditSim E={E} />,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Just three cases based on (N, M): if both = 1, only 1 corner; if exactly one = 1 (a line), 2 corners; otherwise 4 corners. Sections build it one piece at a time.",
        "세 가지 경우 (N, M) 기준: 둘 다 = 1 이면 꼭짓점 1 개; 한쪽만 = 1 (직선) 이면 2 개; 그 외 4 개. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCornerCoverSections(E),
    },
  ];
}
