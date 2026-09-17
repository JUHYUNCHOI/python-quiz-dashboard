import { C, t } from "@/components/quest/theme";
import { getCowSignalSections, CowSignalScaleSim } from "./components";

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
   Chapter 1: 📋 문제 이해 (10 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSignalCh1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "FJ has a tiny M×N picture (a grid of characters) for the Cow-Signal. He wants to scale it UP by an integer factor K — each character becomes a K×K block of itself.\nPrint the enlarged (M·K) × (N·K) picture.",
        "FJ 에게 Cow-Signal 이라는 M×N 짜리 작은 그림이 있어요.\n칸마다 글자가 하나씩 든 격자예요. 이 그림을 K 배로 확대해요.\n글자 하나가 같은 글자로 가득 찬 K×K 블록이 돼요.\n확대된 (M·K) × (N·K) 그림을 출력해요."),
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
        "The signal is drawn on a grid — like graph paper!\nEach square has either a dot '.' (empty) or an 'X' (filled).\nThis grid has 2 rows and 3 columns.", "신호는 격자 위에 그려요 — 모눈종이처럼요.\n칸마다 점 '.' 이나 'X' 가 하나씩 들어가요.\n'.' 은 빈 칸이고 'X' 는 채운 칸이에요.\n이 격자는 2행 3열이에요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8b5cf6", marginBottom: 8 }}>
            {t(E, "Original Signal (2 rows × 3 columns)", "원본 신호 (2행 × 3열)")}
          </div>
          <Grid data={[["X",".",".X"],[".",".X","."]].map((_, r) => r === 0 ? ["X",".","X"] : [".","X","."])} cellSize={44} gap={4} />
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
        "We're given three numbers: M (rows), N (columns), and K (how much to enlarge).\nK=2 means 'make everything 2 times bigger'!", "숫자 세 개가 주어져요. M 은 행 수, N 은 열 수,\nK 는 확대 배수예요.\nK=2 는 모든 걸 2배로 크게 한다는 뜻이에요."),
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

    // 1-4 퀴즈: 기본 이해
    {
      type: "quiz",
      narr: t(E,
        "Quick check! If M=2 and N=3, how many cells are in the original grid?", "확인해 봐요! M=2 이고 N=3 이면 원본 격자에 칸이 몇 개일까요?"),
      question: t(E, "2 rows × 3 columns = ? cells", "2행 × 3열 = ? 칸"),
      options: ["6", "5", "8"],
      correct: 0,
      explain: t(E, "2 × 3 = 6 cells total! ✅", "2 × 3 이니까 모두 6칸이에요! ✅"),
    },

    // 1-5 확대란? 한 칸이 K×K 블록이 됨
    {
      type: "reveal",
      narr: t(E,
        "Enlarging by K means: each single cell becomes a K×K block of the SAME character.\nIf K=2, one 'X' becomes four X's in a 2×2 square!", "K 배 확대는 칸 하나가 K×K 블록이 되는 거예요.\n블록은 원래 있던 글자로 가득 채워요.\nK=2 면 'X' 하나가 2×2 네모 안의 X 네 개가 돼요!"),
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
            {/* After K=2 */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>K=2</div>
              <Grid data={[["X","X"],["X","X"]]} cellSize={36} gap={2} />
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 700 }}>→</div>
            {/* After K=3 */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>K=3</div>
              <Grid data={[["X","X","X"],["X","X","X"],["X","X","X"]]} cellSize={28} gap={1} />
            </div>
          </div>
        </div>),
    },

    // 1-6 빈칸도 마찬가지
    {
      type: "reveal",
      narr: t(E,
        "The same rule applies to empty cells!\nOne '.' becomes a K×K block of dots.\nSo K=2 means one dot becomes four dots.", "빈 칸도 똑같아요. '.' 하나가 점으로 가득 찬 K×K 블록이 돼요.\nK=2 면 점 하나가 점 네 개가 돼요."),
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

    // 1-7 퀴즈: K=3이면?
    {
      type: "quiz",
      narr: t(E,
        "If K=3, each single cell becomes a 3×3 block. That's 9 copies of the same character!", "K=3 이면 칸 하나가 3×3 블록이 돼요. 같은 글자가 9개예요!"),
      question: t(E, "K=3. One 'X' becomes how many X's?", "K=3 이면 'X' 하나가 X 몇 개가 될까요?"),
      options: ["9", "3", "6", "12"],
      correct: 0,
      explain: t(E, "3×3 = 9 X's in a square block! ✅", "3×3 이니까 네모 블록 안에 X 가 9개예요! ✅"),
    },

    // 1-8 전체 예시: 원본 → 확대
    {
      type: "reveal",
      narr: t(E,
        "Now let's see the FULL picture!\nOriginal 2×3 grid with K=2 becomes a 4×6 grid.\nEvery cell expanded!", "이제 전체 그림을 봐요.\n원본 2×3 격자가 K=2 로 4×6 격자가 돼요.\n모든 칸이 다 커졌어요."),
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
        "Try it yourself! Click cells to flip X ↔ . and slide K from 1 to 4. Watch each source cell expand into a K×K block in real time. Hover over a source cell to see exactly which block in the output it became!",
        "직접 해 봐요! 칸을 누르면 X 와 . 가 바뀌어요.\nK 슬라이더를 1에서 4까지 옮겨 봐요.\n원본 한 칸이 K×K 블록으로 커지는 게 바로 보여요.\n원본 칸에 마우스를 올리면 그 칸이 어느 블록이 됐는지 보여요!"),
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

    // 1-10 입력 연습
    {
      type: "input",
      narr: t(E,
        "Your turn! Original grid has 3 rows, K=4. How many rows in the output?", "이제 네 차례예요! 원본 격자가 3행이고 K=4 예요.\n출력은 몇 행일까요?"),
      question: t(E, "3 × 4 = ?", "3 × 4 = ?"),
      answer: 12,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 어떻게 확대할까? (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSignalCh2(E) {
  return [
    // 2-1 두 가지 확대
    {
      type: "reveal",
      narr: t(E,
        "There are two stretches happening: HORIZONTAL (each character repeated K times in a row) and VERTICAL (each row printed K times).\nLet's see each one!", "확대는 두 갈래로 일어나요.\n가로는 한 행 안에서 글자를 K번씩 되풀이해요.\n세로는 같은 행을 K번 출력해요. 하나씩 봐요!"),
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
        "HORIZONTAL: Take one row 'X.X'.\nWith K=2, each character is repeated 2 times: X→XX, .→.., X→XX.\nResult: 'XX..XX'!", "가로 확대를 볼게요. 행 하나 'X.X' 를 가져와요.\nK=2 면 글자마다 2번씩 되풀이해요.\nX 는 XX 로, . 은 .. 로, X 는 XX 로 바뀌어요.\n그래서 'XX..XX' 가 돼요!"),
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
        "VERTICAL: After expanding horizontally, we print that same row K times!\nWith K=2, 'XX..XX' appears twice.", "이번엔 세로 확대예요. 가로로 늘린 행을 그대로 K번 출력해요.\nK=2 면 'XX..XX' 가 두 번 나와요."),
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

    // 2-5 전체 과정 추적
    {
      type: "reveal",
      narr: t(E,
        "Let's trace the FULL process! Original: [['X','.','X'],['.','X','.']], K=2.", "전체 과정을 하나씩 따라가 봐요.\n원본은 [['X','.','X'],['.','X','.']] 이고 K=2 예요."),
      content: (
        <div style={{ padding: 16 }}>
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

    // 2-7 퀴즈: 가로 확대는?
    {
      type: "quiz",
      narr: t(E,
        "For horizontal stretching, we build each output row by repeating each character K times.\nIn code: grid[i][j] * K.", "가로 확대는 출력 행을 만들 때 글자마다 K번 되풀이해요.\n코드로는 grid[i][j] * K 예요."),
      question: t(E,
        "Row = '.X.', K=3. What's the expanded row?",
        "행이 '.X.' 이고 K=3 이에요. 확대된 행은 무엇일까요?"),
      options: ["'...XXX...'", "'..XX..'", "'.X..X..X.'"],
      correct: 0,
      explain: t(E, "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅", "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅"),
    },

    // 2-8 입력 연습
    {
      type: "input",
      narr: t(E,
        "Original: 3 rows × 2 columns, K=3.\nTotal output characters in ONE output row?\nEach original row has 2 chars, each repeated 3 times.", "원본이 3행 × 2열 이고 K=3 이에요.\n출력 행 하나에는 글자가 몇 개 있을까요?\n원본 행에는 글자가 2개, 그 글자마다 3번씩 되풀이돼요."),
      question: t(E, "2 chars × 3 = ?", "글자 2개 × 3 = ?"),
      answer: 6,
    },
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
        "Step 1: Read the numbers M, N, K. The first line has all three, separated by spaces.", "1단계 — 숫자 M, N, K 를 읽어요.\n첫 줄에 세 개가 띄어쓰기로 나뉘어 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <span style={{ color: "#e2e8f0" }}>M, N, K = </span>
            <span style={{ color: "#c084fc" }}>map</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#c084fc" }}>int</span>
            <span style={{ color: "#e2e8f0" }}>, </span>
            <span style={{ color: "#c084fc" }}>input</span>
            <span style={{ color: "#e2e8f0" }}>().split())</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, whiteSpace: "pre-line" }}>
            {t(E, "input().split() reads '2 3 2' → ['2','3','2']. map(int,\n...) converts to integers.", "input().split() 이 '2 3 2' 를 읽어서 ['2','3','2'] 로 나눠요.\nmap(int, ...) 이 이걸 정수로 바꿔요.")}
          </div>
        </div>),
    },

    // 3-2 그리드 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Read M lines for the grid. Each line is a string of '.' and 'X'.", "2단계 — 격자를 채우려고 M 줄을 읽어요.\n한 줄에는 '.' 과 'X' 가 늘어서 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div style={{ color: "#e2e8f0" }}>grid = []</div>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in </span><span style={{ color: "#c084fc" }}>range</span><span style={{ color: "#e2e8f0" }}>(M):</span></div>
            <div style={{ color: "#e2e8f0" }}>    grid.append(<span style={{ color: "#c084fc" }}>input</span>())</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "grid[0] = 'X.X', grid[1] = '.X.' etc.", "grid[0] 은 'X.X', grid[1] 은 '.X.' 이렇게 들어가요.")}
          </div>
        </div>),
    },

    // 3-3 퀴즈: grid[i][j]
    {
      type: "quiz",
      narr: t(E,
        "If grid = ['X.X', '.X.'], what is grid[0][2]? Remember: index starts at 0!", "grid 가 ['X.X', '.X.'] 이면 grid[0][2] 는 무엇일까요?\n자리 번호는 0부터 세요!"),
      question: t(E, "grid[0] = 'X.X'. grid[0][2] = ?", "grid[0] = 'X.X'. grid[0][2] = ?"),
      options: ["'X'", "'.'", "'.X'"],
      correct: 0,
      explain: t(E, "'X.X'[0]='X', [1]='.', [2]='X' ✅", "'X.X'[0]='X', [1]='.', [2]='X' ✅"),
    },

    // 3-4 출력 루프: 바깥
    {
      type: "reveal",
      narr: t(E,
        "Step 3: The output loop!\nOuter loop goes through each original row.\nInner loop repeats it K times.", "3단계 — 출력하는 반복문이에요.\n바깥 반복문은 원본 행을 하나씩 봐요.\n안쪽 반복문은 그 행을 K번 되풀이해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(M):  </span><span style={{ color: "#6b7280" }}># each original row</span></div>
            <div><span style={{ color: "#c084fc" }}>    for </span><span style={{ color: "#e2e8f0" }}>_ </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(K):  </span><span style={{ color: "#6b7280" }}># repeat K times</span></div>
            <div style={{ color: "#e2e8f0" }}>        ...</div>
          </div>
        </div>),
    },

    // 3-5 행 만들기
    {
      type: "reveal",
      narr: t(E,
        "Step 4: Inside the loops, build each output row by repeating each character K times, then print it!", "4단계 — 반복문 안에서 출력 행을 만들어요.\n글자마다 K번씩 되풀이해 붙인 다음 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(M):</span></div>
            <div><span style={{ color: "#c084fc" }}>    for </span><span style={{ color: "#e2e8f0" }}>_ </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(K):</span></div>
            <div style={{ color: "#e2e8f0" }}>        row = <span style={{ color: "#34d399" }}>''</span></div>
            <div><span style={{ color: "#c084fc" }}>        for </span><span style={{ color: "#e2e8f0" }}>j </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(N):</span></div>
            <div style={{ color: "#e2e8f0" }}>            row += grid[i][j] * <span style={{ color: "#fbbf24" }}>K</span>  <span style={{ color: "#6b7280" }}># ← magic!</span></div>
            <div style={{ color: "#e2e8f0" }}>        <span style={{ color: "#c084fc" }}>print</span>(row)</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.ok, fontWeight: 700, textAlign: "center" }}>
            {t(E, "grid[i][j] * K → repeat character K times! ✨", "grid[i][j] * K → 글자를 K번 되풀이해요! ✨")}
          </div>
        </div>),
    },

    // 3-6 퀴즈: grid[i][j] * K
    {
      type: "quiz",
      narr: t(E,
        "This is the core of the solution! grid[i][j] * K does the horizontal stretching.", "이게 풀이의 핵심이에요! grid[i][j] * K 가 가로 확대를 맡아요."),
      question: t(E,
        "grid[0] = 'X.X', K=3. What does grid[0][1] * K produce?",
        "grid[0] 이 'X.X' 이고 K=3 이에요. grid[0][1] * K 는 무엇일까요?"),
      options: ["'...'", "'XXX'", "'X.X'"],
      correct: 0,
      explain: t(E, "grid[0][1] = '.'. '.' * 3 = '...' ✅", "grid[0][1] = '.'. '.' * 3 = '...' ✅"),
    },

    // 3-7 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(M × K × N × K) = O(MNK²).\nBut that's exactly the output size — we can't do better!\nEach character in the output is written exactly once.", "걸리는 시간은 O(M × K × N × K) = O(MNK²) 예요.\n이 값은 출력 크기와 똑같아요 — 더 빨리 할 수는 없어요.\n출력할 글자를 딱 한 번씩만 쓰거든요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(MNK²)</div>
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
