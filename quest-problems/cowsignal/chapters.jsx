import { C, t } from "@/components/quest/theme";
import { getCowSignalSections, CowSignalScaleSim } from "./components";
import { CodeBlock } from "@/components/quest/shared";

/* helper: render a grid of cells */
function Grid({ data, cellSize = 32, gap = 3, xColor = "#7c3aed", xBg = "#7c3aed", dotColor = "#c4b5fd", dotBg = "#f5f3ff", border }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap }}>
      {data.map((row, r) => (
        <div key={r} style={{ display: "flex", gap }}>
          {row.map((ch, c) => (
            <div key={c} style={{
              width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: Math.max(4, cellSize / 8), fontSize: Math.max(10, cellSize / 2.5), fontWeight: 700,
              fontFamily: "'JetBrains Mono',monospace",
              background: ch === "X" ? xBg : dotBg,
              border: border || `1px solid ${ch === "X" ? xColor : dotColor}`,
              color: ch === "X" ? "#fff" : dotColor,
            }}>{ch}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (8 steps, 2026-09-23: 11→10→8, 순수 곱셈 퀴즈 1-4·1-7 삭제 —
   "행×열/K×K/출력크기" 셋 중 미션 공식(출력크기, 1-9)만 남김)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSignalCh1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "FJ wants his tiny grid scaled up by a factor K — each character becomes a K×K block.",
        "FJ 의 작은 격자를 K 배로 확대해요 — 글자 하나가 K×K 블록이 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📡</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>The Cow-Signal</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2016 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the M·K × N·K enlarged picture, with each original character expanded into a K × K block.",
                "원본 글자를 하나하나 K × K 블록으로 확대해서 (M·K) × (N·K) 그림을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given a tiny ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "M × N picture", "M × N 그림")}</b>
                  {t(E, " (each cell is some character).",
                        " (칸마다 글자가 하나씩) 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Scale it up by an integer factor ", "이 그림을 정수 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, " — each character becomes a ", " 배로 확대해요. 글자 하나가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K × K block", "K × K 블록")}</b>
                  {t(E, " of that same character.",
                        " 이 돼요. 같은 글자로 가득 채워요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the resulting ", "확대된 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(M·K) × (N·K) enlarged picture", "(M·K) × (N·K) 그림")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2 그리드란?
    {
      type: "reveal",
      narr: t(E,
        "The signal is a grid — like graph paper — filled with dots and X's.", "신호는 모눈종이 같은 격자예요 — 점과 X 로 채워져 있어요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8b5cf6", marginBottom: 8 }}>
            {t(E, "Original Signal (2 rows × 3 columns)", "원본 신호 (2행 × 3열)")}
          </div>
          <Grid data={[["X",".","X"],[".","X","."]]} cellSize={44} gap={4} />
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 16, fontSize: 12, fontWeight: 700 }}>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#7c3aed", borderRadius: 4, verticalAlign: "middle", marginRight: 4 }}/> X = {t(E, "filled", "채움")}</span>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 4, verticalAlign: "middle", marginRight: 4 }}/> . = {t(E, "empty", "빈칸")}</span>
          </div>
        </div>),
    },

    // 1-3 M, N, K 설명
    {
      type: "reveal",
      narr: t(E,
        "We're given three numbers: M rows, N columns, and K, the enlarge factor.", "숫자 세 개가 주어져요 — M 은 행 수, N 은 열 수, K 는 확대 배수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {[
              { label: "M", value: "2", desc: t(E, "rows", "행") },
              { label: "N", value: "3", desc: t(E, "cols", "열") },
              { label: "K", value: "2", desc: t(E, "enlarge", "확대") },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, background: "#ede9fe", border: "1.5px solid #c4b5fd",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#7c3aed", marginTop: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: C.dim }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>),
    },

    /* 옛 1-4 (input "2 rows × 3 cols = ? cells") 을 여기서 지웠다 (2026-09-23, 학생 지적).
       "순수하게 크기 곱하기만 묻는" 퀴즈가 이 자리 · 1-7(옛) · 1-9 세 곳에 있었고,
       학생이 "세 번째부터는 설명은 안 읽고 숫자만 곱해서 답했다" 고 했다.
       셋 중 실제 미션 공식(출력 크기)을 확인하는 1-9 하나만 남긴다. */

    // 1-5 확대란? 한 칸이 K×K 블록이 됨
    {
      type: "reveal",
      narr: t(E,
        "Enlarging by K turns each single cell into a K×K block of that same character.", "K 배 확대는 칸 하나를 그 글자로 채운 K×K 블록으로 바꿔요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            {/* Before */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Before", "전")}</div>
              <div style={{ width: 44, height: 44, background: "#7c3aed", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace", border: "1px solid #6d28d9" }}>X</div>
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 700 }}>→</div>
            {/* After K=2 — our running example stays K=2 (2026-09-23: a K=3 branch
                used to sit here too, with no note about why the number changed;
                a student flagged it as a jarring third number. K=3 is introduced
                on its own terms two steps later, in the quiz. */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>K=2</div>
              <Grid data={[["X","X"],["X","X"]]} cellSize={36} gap={2} />
            </div>
          </div>
        </div>),
    },

    // 1-6 빈칸도 마찬가지
    {
      type: "reveal",
      narr: t(E,
        "Empty cells follow the same rule — one '.' becomes a K×K block of dots.", "빈 칸도 똑같아요 — '.' 하나가 점으로 채운 K×K 블록이 돼요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Before", "전")}</div>
              <div style={{ width: 44, height: 44, background: "#f5f3ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: "#c4b5fd", fontFamily: "'JetBrains Mono',monospace", border: "1px solid #c4b5fd" }}>.</div>
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 700 }}>→</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>K=2</div>
              <Grid data={[[".","."],[".","."]]} cellSize={36} gap={2} />
            </div>
          </div>
        </div>),
    },

    /* 옛 1-7 (K=3, X 몇 개?) 도 여기서 지웠다 (2026-09-23) — 위 1-4 삭제 사유와 같음.
       파란 줄이 "K=3 이면 3×3 블록" 이라 공식을 준 바로 뒤에 그 계산만 시키는
       자리이기도 했다(선생님 지적 ③). K×K 블록 자체는 1-5/1-6 에서 이미 그림으로 보여줬다. */

    // 1-8 전체 예시: 원본 → 확대
    {
      type: "reveal",
      narr: t(E,
        "Here's the full picture — a 2×3 grid enlarged by K=2 becomes 4×6.", "전체 그림을 봐요 — 2×3 격자가 K=2 로 4×6 이 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6", marginBottom: 6 }}>{t(E, "Original (2×3)", "원본 (2×3)")}</div>
              <Grid data={[["X",".","X"],[".","X","."]]} cellSize={40} gap={3} />
            </div>
            <div style={{ fontSize: 28, color: C.accent, fontWeight: 700, alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6", marginBottom: 6 }}>{t(E, "K=2 → (4×6)", "K=2 → (4×6)")}</div>
              <Grid data={[
                ["X","X",".",".","X","X"],
                ["X","X",".",".","X","X"],
                [".",".","X","X",".","."],
                [".",".","X","X",".","."],
              ]} cellSize={24} gap={1} />
            </div>
          </div>
        </div>),
    },

    // 1-8.5 직접 해보기 시뮬레이터
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself — click cells and drag K to watch the live expansion.",
        "직접 해 봐요 — 칸을 누르고 K 를 움직여 보세요."),
      content: <CowSignalScaleSim E={E} />,
    },

    // 1-9 출력 크기 퀴즈
    {
      type: "quiz",
      narr: t(E,
        "The output size is always M×K rows and N×K columns. Each dimension gets multiplied by K!", "출력 크기는 늘 M×K 행, N×K 열이에요.\n행 수에도 열 수에도 K 를 곱해요!"),
      question: t(E, "Original 5×4, K=3. Output size?", "원본이 5×4 이고 K=3 이에요. 출력 크기는 얼마일까요?"),
      options: [
        t(E, "15 rows × 12 columns", "15행 × 12열"),
        t(E, "8 rows × 7 columns", "8행 × 7열"),
        t(E, "5 rows × 4 columns", "5행 × 4열"),
      ],
      correct: 0,
      explain: t(E, "5×3 = 15 rows, 4×3 = 12 columns ✅", "5×3 이라 15행, 4×3 이라 12열이에요 ✅"),
    },

    /* 옛 1-10 (input "3 × 4 = ?") 을 여기서 지웠다 (2026-09-23, 학생 지적).
       이 자리는 1-9 와 똑같은 "행/열 × K" 공식을 다시 묻기만 했다 — 학생이
       "8~11쪽이 다 같은 곱셈이라 세 번째부터는 안 읽었다" 고 한 그 반복 중 하나.
       1-9 가 이 공식을 처음 확인하는 자리라 남기고, 곧바로 이어지는 재드릴은 뺐다. */
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 어떻게 확대할까? (7 steps, 2026-09-23: 8→7, 곱셈 재드릴 1개 삭제)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSignalCh2(E) {
  return [
    // 2-1 두 가지 확대
    {
      type: "reveal",
      narr: t(E,
        "Enlarging happens in two stretches — horizontal, then vertical.", "확대는 두 갈래예요 — 가로로 한 번, 세로로 한 번."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <div style={{ background: "#dbeafe", border: "1px solid #93c5fd", borderRadius: 12, padding: 12, flex: 1, maxWidth: 160 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>↔️</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{t(E, "Horizontal", "가로 확대")}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{t(E, "each char → K chars", "글자 1개 → K개")}</div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 12, padding: 12, flex: 1, maxWidth: 160 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>↕️</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>{t(E, "Vertical", "세로 확대")}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{t(E, "each row → K rows", "행 1개 → K개")}</div>
            </div>
          </div>
        </div>),
    },

    // 2-2 가로 확대 시각화
    {
      type: "reveal",
      narr: t(E,
        "Horizontal stretch: each character in a row is repeated K times.", "가로 확대는 행의 글자마다 K 번씩 되풀이하는 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {/* Original row */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 40 }}>{t(E, "Row:", "행:")}</span>
              {["X",".","X"].map((ch, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  background: ch === "X" ? "#7c3aed" : "#f5f3ff", border: `1px solid ${ch === "X" ? "#6d28d9" : "#c4b5fd"}`,
                  fontSize: 16, fontWeight: 700, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: C.accent }}>↓ {t(E, "each × 2", "각각 × 2")}</div>
            {/* Expanded row */}
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 40 }}>{t(E, "→", "→")}</span>
              {["X","X",".",".","X","X"].map((ch, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                  background: ch === "X" ? "#7c3aed" : "#f5f3ff", border: `1.5px solid ${ch === "X" ? "#6d28d9" : "#ddd6fe"}`,
                  fontSize: 12, fontWeight: 700, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
            {/* Color-coded grouping */}
            <div style={{ display: "flex", gap: 2 }}>
              <span style={{ width: 40 }}/>
              {[["#ef4444","XX"],["#3b82f6",".."],["#22c55e","XX"]].map(([clr, txt], i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 600, color: clr, textAlign: "center", width: 58 }}>
                  {txt} ← {["X",".","X"][i]}×2
                </div>
              ))}
            </div>
          </div>
        </div>),
    },

    // 2-3 세로 확대 시각화
    {
      type: "reveal",
      narr: t(E,
        "Vertical stretch: that same stretched row is printed K times.", "세로 확대는 늘어난 행을 그대로 K 번 출력하는 거예요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          {[0,1].map(r => (
            <div key={r} style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 3 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: r === 0 ? "#16a34a" : "#059669", width: 50, textAlign: "right", paddingRight: 6, lineHeight: "28px" }}>
                {t(E, `copy ${r+1}`, `복사${r+1}`)}
              </span>
              {["X","X",".",".","X","X"].map((ch, c) => (
                <div key={c} style={{ width: 28, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                  background: ch === "X" ? "#7c3aed" : "#f5f3ff", border: `1.5px solid ${ch === "X" ? "#6d28d9" : "#ddd6fe"}`,
                  fontSize: 12, fontWeight: 700, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
          ))}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginTop: 6 }}>
            {t(E, "↑ Same row printed 2 times = vertical stretch!", "↑ 같은 행을 2번 출력했어요 = 세로 확대!")}
          </div>
        </div>),
    },

    // 2-4 퀴즈: 가로 확대
    {
      type: "quiz",
      narr: t(E,
        "In Python, repeating a character is easy: 'X' * 3 = 'XXX'. String multiplication!", "파이썬에서는 글자를 쉽게 되풀이할 수 있어요.\n'X' * 3 은 'XXX' 가 돼요. 글자에 곱셈을 쓰는 거예요!"),
      question: t(E, "'.' * 4 = ?", "'.' * 4 = ?"),
      options: ["'....'", "'4.'", "4", "'.....'"],
      correct: 0,
      explain: t(E, "The dot is repeated 4 times: '....' ✅", "점이 4번 되풀이돼서 '....' 가 돼요 ✅"),
    },

    // 2-5 전체 과정 추적 (2026-09-23: 이 격자는 벌써 네 번째 등장이라
    // "왜 또 보는지" 를 narr 에 한 마디 붙였다 — 학생 지적 ⑥)
    {
      type: "reveal",
      narr: t(E,
        "Same grid as before — but this time let's trace it row by row, copy by copy.", "같은 격자예요 — 이번엔 행 하나, 복사 하나씩 순서대로 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8, fontSize: 12, color: C.dim }}>
            {t(E, "Original: 'X.X', '.X.'  ·  K = 2", "원본: 'X.X', '.X.'  ·  K = 2")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: t(E, "Row 0, copy 1", "0행, 복사1"), row: "XX..XX", bg: "#ede9fe" },
              { label: t(E, "Row 0, copy 2", "0행, 복사2"), row: "XX..XX", bg: "#ede9fe" },
              { label: t(E, "Row 1, copy 1", "1행, 복사1"), row: "..XX..", bg: "#f0fdf4" },
              { label: t(E, "Row 1, copy 2", "1행, 복사2"), row: "..XX..", bg: "#f0fdf4" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: item.bg, borderRadius: 8, padding: "6px 10px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, width: 80, flexShrink: 0 }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text, letterSpacing: 2 }}>{item.row}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, fontWeight: 700, color: "#8b5cf6" }}>
            {t(E, "4 output rows = 2 original rows × K=2!", "출력 4행 = 원본 2행 × K=2!")}
          </div>
        </div>),
    },

    // 2-6 퀴즈: 어떤 루프가 세로 확대?
    {
      type: "quiz",
      narr: t(E,
        "We need TWO kinds of loops: one to go through original rows, and one to repeat each row K times.\nWhich does what?", "반복문이 두 개 필요해요.\n하나는 원본 행을 하나씩 보고,\n하나는 그 행을 K번 되풀이해요.\n어느 쪽이 무슨 일을 할까요?"),
      question: t(E,
        "Which loop makes each row appear K times vertically?",
        "각 행이 세로로 K번 나오게 하는 반복문은 어느 쪽일까요?"),
      options: [
        t(E, "The inner loop: for _ in range(K)", "안쪽 반복문: for _ in range(K)"),
        t(E, "The outer loop: for i in range(M)", "바깥 반복문: for i in range(M)"),
      ],
      correct: 0,
      explain: t(E, "The inner loop runs K times for each row i → same row printed K times ✅", "안쪽 반복문이 행 i 마다 K번 돌아요 → 같은 행을 K번 출력해요 ✅"),
    },

    // 2-7 퀴즈: 가로 확대는? (2026-09-23: narr 이 "코드로는 grid[i][j] * K" 라고
    // 공식을 미리 준 뒤 바로 그 계산만 시켰다 — 선생님 지적 ③. 그 코드 자체는
    // 3-5/3-6 에서 처음 나오니 여기선 개념만 다시 확인한다.)
    {
      type: "quiz",
      narr: t(E,
        "Horizontal stretching means: build the row by repeating each character K times, one after another.", "가로 확대는 행을 만들 때 글자 하나하나를 K번씩 이어 붙이는 거예요."),
      question: t(E,
        "Row = '.X.', K=3. What's the expanded row?",
        "행이 '.X.' 이고 K=3 이에요. 확대된 행은 무엇일까요?"),
      options: ["'...XXX...'", "'..XX..'", "'.X..X..X.'"],
      correct: 0,
      explain: t(E, "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅", "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅"),
    },

    /* 옛 2-8 (input "2 chars × 3 = ?") 을 여기서 지웠다 (2026-09-23, 학생 지적).
       Ch1 1-9 · 1-10 과 같은 "행/열 × K" 곱셈을 또 물었다 — 학생이 지적한
       네 번 반복 중 마지막. Ch2 는 여기서 "그래서 어떤 반복문이 무엇을 하나"
       확인(2-6, 2-7)까지만 하고 코드로 넘어간다. */
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSignalCh3(E, lang = "py") {
  return [
    // 3-1 입력 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 1: read M, N, K from the first line.", "1단계 — 첫 줄에서 M, N, K 를 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <CodeBlock lang={lang} lines={lang === "cpp" ? [
            "int M, N, K;",
            "cin >> M >> N >> K;",
          ] : [
            "M, N, K = map(int, input().split())",
          ]} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, whiteSpace: "pre-line" }}>
            {lang === "cpp"
              ? t(E, "cin >> reads the three numbers directly — no parsing needed.", "cin >> 은 세 수를 바로 정수로 읽어요. 따로 변환할 필요 없어요.")
              : t(E, "input().split() reads '2 3 2' → ['2','3','2']. map(int,\n...) converts to integers.", "input().split() 이 '2 3 2' 를 읽어서 ['2','3','2'] 로 나눠요.\nmap(int, ...) 이 이걸 정수로 바꿔요.")}
          </div>
        </div>),
    },

    // 3-2 그리드 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 2: read the next M lines (rows) to fill the grid.", "2단계 — 다음 M 줄(행)을 읽어서 격자를 채워요."),
      content: (
        <div style={{ padding: 16 }}>
          <CodeBlock lang={lang} lines={lang === "cpp" ? [
            "vector<string> grid(M);",
            "for (int i = 0; i < M; i++) {",
            "    cin >> grid[i];",
            "}",
          ] : [
            "grid = []",
            "for i in range(M):",
            "    grid.append(input())",
          ]} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "grid[0] = 'X.X', grid[1] = '.X.' etc.", "grid[0] 은 'X.X', grid[1] 은 '.X.' 이렇게 들어가요.")}
          </div>
        </div>),
    },

    // 3-3 퀴즈: grid[i][j] (2026-09-23: C++ 을 눌러도 파이썬 리스트 문법(['X.X', '.X.'])
    // 그대로였다 — 선생님 지적 ①. lang 을 따라가게 고쳤다.)
    {
      type: "quiz",
      narr: lang === "cpp"
        ? t(E,
            "If grid = {\"X.X\", \".X.\"} (a vector<string>), what is grid[0][2]? Remember: index starts at 0!",
            "grid 가 {\"X.X\", \".X.\"} (vector<string>) 이면 grid[0][2] 는 무엇일까요?\n자리 번호는 0부터 세요!")
        : t(E,
            "If grid = ['X.X', '.X.'], what is grid[0][2]? Remember: index starts at 0!",
            "grid 가 ['X.X', '.X.'] 이면 grid[0][2] 는 무엇일까요?\n자리 번호는 0부터 세요!"),
      question: lang === "cpp"
        ? t(E, "grid[0] = \"X.X\". grid[0][2] = ?", "grid[0] = \"X.X\". grid[0][2] = ?")
        : t(E, "grid[0] = 'X.X'. grid[0][2] = ?", "grid[0] = 'X.X'. grid[0][2] = ?"),
      options: ["'X'", "'.'", "'.X'"],
      correct: 0,
      explain: t(E, "grid[0][0]='X', grid[0][1]='.', grid[0][2]='X' ✅", "grid[0][0]='X', grid[0][1]='.', grid[0][2]='X' ✅"),
    },

    // 3-4 출력 루프: 바깥
    {
      type: "reveal",
      narr: t(E,
        "Step 3: the output loop — outer for each row, inner to repeat it K times.", "3단계 — 출력 반복문이에요. 바깥은 행마다, 안쪽은 K 번씩요."),
      content: (
        <div style={{ padding: 16 }}>
          <CodeBlock lang={lang} lines={lang === "cpp" ? [
            E ? "for (int i = 0; i < M; i++) {  // each original row" : "for (int i = 0; i < M; i++) {  // 원본 한 행마다",
            E ? "    for (int rep = 0; rep < K; rep++) {  // repeat K times" : "    for (int rep = 0; rep < K; rep++) {  // K 번 반복",
            "        ...",
            "    }",
            "}",
          ] : [
            E ? "for i in range(M):  # each original row" : "for i in range(M):  # 원본 한 행마다",
            E ? "    for _ in range(K):  # repeat K times" : "    for _ in range(K):  # K 번 반복",
            "        ...",
          ]} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "'...' marks the spot we'll fill in the next step.", "'...' 는 다음 걸음에서 채울 자리예요.")}
          </div>
        </div>),
    },

    // 3-5 행 만들기
    {
      type: "reveal",
      narr: t(E,
        "Step 4: build each row by repeating every character K times.", "4단계 — 글자마다 K 번씩 이어 붙여서 행을 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <CodeBlock lang={lang} lines={lang === "cpp" ? [
            "for (int i = 0; i < M; i++) {",
            "    for (int rep = 0; rep < K; rep++) {",
            "        for (int j = 0; j < N; j++) {",
            E ? "            for (int k = 0; k < K; k++) {  // ← magic!" : "            for (int k = 0; k < K; k++) {  // ← 핵심!",
            "                cout << grid[i][j];",
            "            }",
            "        }",
            "        cout << \"\\n\";",
            "    }",
            "}",
          ] : [
            "for i in range(M):",
            "    for _ in range(K):",
            "        row = ''",
            "        for j in range(N):",
            E ? "            row += grid[i][j] * K  # ← magic!" : "            row += grid[i][j] * K  # ← 핵심!",
            "        print(row)",
          ]} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.ok, fontWeight: 700, textAlign: "center" }}>
            {lang === "cpp"
              ? t(E, "Print grid[i][j] K times in a row → that's the K×K block! ✨", "grid[i][j] 를 K번 이어서 출력해요 → 그게 K×K 블록이에요! ✨")
              : t(E, "grid[i][j] * K → repeat character K times! ✨", "grid[i][j] * K → 글자를 K번 되풀이해요! ✨")}
          </div>
        </div>),
    },

    // 3-6 퀴즈: 핵심 줄 확인 (2026-09-23, 선생님 지적 ①·③:
    // C++ 을 눌러도 파이썬 문자열 곱셈을 그대로 물었고, 바로 앞 3-5에서 이미
    // 보여준 효과를 narr 가 또 말한 뒤 같은 계산을 시켰다. lang 을 따라가게 하고,
    // narr 은 "확인해 보자" 로만 남겨 정답을 미리 주지 않는다.)
    {
      type: "quiz",
      narr: lang === "cpp"
        ? t(E, "Let's make sure this loop does what we expect.", "이 반복문이 우리가 생각한 대로 도는지 확인해 봐요.")
        : t(E, "Let's make sure this line does what we expect.", "이 한 줄이 우리가 생각한 대로 도는지 확인해 봐요."),
      question: lang === "cpp"
        ? t(E,
            "grid[0] = \"X.X\", K=3. The loop for (int k=0;k<K;k++) cout << grid[0][1]; prints what?",
            "grid[0] 이 \"X.X\" 이고 K=3 이에요. for (int k=0;k<K;k++) cout << grid[0][1]; 는 무엇을 출력할까요?")
        : t(E,
            "grid[0] = 'X.X', K=3. What does grid[0][1] * K produce?",
            "grid[0] 이 'X.X' 이고 K=3 이에요. grid[0][1] * K 는 무엇일까요?"),
      options: ["'...'", "'XXX'", "'X.X'"],
      correct: 0,
      explain: lang === "cpp"
        ? t(E, "grid[0][1] = '.'. The loop prints it 3 times: '...' ✅", "grid[0][1] = '.'. 이 반복문이 3번 찍어서 '...' 가 돼요 ✅")
        : t(E, "grid[0][1] = '.'. '.' * 3 = '...' ✅", "grid[0][1] = '.'. '.' * 3 = '...' ✅"),
    },

    // 3-7 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time complexity is O(MNK²) — exactly the output size, so it's optimal.", "걸리는 시간은 O(MNK²) 예요 — 출력 크기와 같아서 더 빠를 수 없어요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(MNK²)</div>
          <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
            {t(E, "O(...) is a rough way to say \"about how many steps this takes.\"", "O(...) 는 '대충 몇 번쯤 걸린다' 를 적는 방법이에요.")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{t(E, "= output size, optimal!", "= 출력 크기와 같아요. 이보다 좋을 수 없어요!")}</div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.ok, fontWeight: 700 }}>
            M,N ≤ 10, K ≤ 10 → {t(E, "max 10,000 chars, instant!", "많아야 10,000 글자예요. 바로 끝나요!")}
          </div>
        </div>),
    },

    // 3-8 완전한 코드
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드예요 — 한 부분씩 읽어 봐요.\n위쪽 버튼으로 Python 과 C++ 을 바꿔 볼 수 있어요."),
      sections: getCowSignalSections(E),
    },
  ];
}
