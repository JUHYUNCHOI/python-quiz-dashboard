import { C, t } from "@/components/quest/theme";
import { getCowSignalSections } from "./components";

export const SOLUTION_CODE = [
  "M, N, K = map(int, input().split())",
  "grid = []",
  "for i in range(M):",
  "    grid.append(input())",
  "",
  "for i in range(M):",
  "    for _ in range(K):",
  "        row = ''",
  "        for j in range(N):",
  "            row += grid[i][j] * K",
  "        print(row)",
];

/* helper: render a grid of cells */
function Grid({ data, cellSize = 32, gap = 3, xColor = "#7c3aed", xBg = "#7c3aed", dotColor = "#c4b5fd", dotBg = "#f5f3ff", border }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap }}>
      {data.map((row, r) => (
        <div key={r} style={{ display: "flex", gap }}>
          {row.map((ch, c) => (
            <div key={c} style={{
              width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: Math.max(4, cellSize / 8), fontSize: Math.max(10, cellSize / 2.5), fontWeight: 900,
              fontFamily: "'JetBrains Mono',monospace",
              background: ch === "X" ? xBg : dotBg,
              border: border || `2px solid ${ch === "X" ? xColor : dotColor}`,
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
        "The cows need to send a signal!\nThey have a small picture, and they want to make it BIGGER.\nLet's learn how!\n📡", "소들이 신호를 보내야 해! 작은 그림이 있는데, 크게 만들고 싶어. 어떻게 하는지 배우자! 📡"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>The Cow-Signal</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2016 Bronze #3</div>
        </div>),
    },

    // 1-2 그리드란?
    {
      type: "reveal",
      narr: t(E,
        "The signal is drawn on a grid — like graph paper!\nEach square has either a dot '.' (empty) or an 'X' (filled).\nThis grid has 2 rows and 3 columns.", "신호는 그리드 위에 그려져 — 모눈종이처럼! 각 칸에는 점 '.' (빈칸) 또는 'X' (채워진 칸). 이 그리드는 2행 3열이야."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#8b5cf6", marginBottom: 8 }}>
            {t(E, "Original Signal (2 rows × 3 columns)", "원본 신호 (2행 × 3열)")}
          </div>
          <Grid data={[["X",".",".X"],[".",".X","."]].map((_, r) => r === 0 ? ["X",".","X"] : [".","X","."])} cellSize={44} gap={4} />
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 16, fontSize: 12, fontWeight: 700 }}>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#7c3aed", borderRadius: 4, verticalAlign: "middle", marginRight: 4 }}/> X = {t(E, "filled", "채움")}</span>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 4, verticalAlign: "middle", marginRight: 4 }}/> . = {t(E, "empty", "빈칸")}</span>
          </div>
        </div>),
    },

    // 1-3 M, N, K 설명
    {
      type: "reveal",
      narr: t(E,
        "We're given three numbers: M (rows), N (columns), and K (how much to enlarge).\nK=2 means 'make everything 2 times bigger'!", "세 숫자가 주어져: M (행 수), N (열 수), K (확대 배수). K=2는 '모든 걸 2배로 크게'라는 뜻!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {[
              { label: "M", value: "2", desc: t(E, "rows", "행") },
              { label: "N", value: "3", desc: t(E, "cols", "열") },
              { label: "K", value: "2", desc: t(E, "enlarge", "확대") },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, background: "#ede9fe", border: "2.5px solid #c4b5fd",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#7c3aed", marginTop: 4 }}>{item.label}</div>
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
        "Quick check! If M=2 and N=3, how many cells are in the original grid?", "확인! M=2이고 N=3이면, 원본 그리드에 칸이 몇 개야?"),
      question: t(E, "2 rows × 3 columns = ? cells", "2행 × 3열 = ? 칸"),
      options: ["6", "5", "8"],
      correct: 0,
      explain: t(E, "2 × 3 = 6 cells total! ✅", "2 × 3 = 6칸! ✅"),
    },

    // 1-5 확대란? 한 칸이 K×K 블록이 됨
    {
      type: "reveal",
      narr: t(E,
        "Enlarging by K means: each single cell becomes a K×K block of the SAME character.\nIf K=2, one 'X' becomes four X's in a 2×2 square!", "K배 확대란: 각 칸 하나가 같은 문자의 K×K 블록이 되는 것! K=2이면, 'X' 하나가 2×2 정사각형의 X 네 개가 돼!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            {/* Before */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Before", "전")}</div>
              <div style={{ width: 44, height: 44, background: "#7c3aed", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'JetBrains Mono',monospace", border: "2px solid #6d28d9" }}>X</div>
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 900 }}>→</div>
            {/* After K=2 */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>K=2</div>
              <Grid data={[["X","X"],["X","X"]]} cellSize={36} gap={2} />
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 900 }}>→</div>
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
        "The same rule applies to empty cells!\nOne '.' becomes a K×K block of dots.\nSo K=2 means one dot becomes four dots.", "빈칸도 마찬가지야! '.' 하나가 K×K 블록의 점이 돼. K=2면 점 하나가 점 네 개가 돼."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Before", "전")}</div>
              <div style={{ width: 44, height: 44, background: "#f5f3ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, color: "#c4b5fd", fontFamily: "'JetBrains Mono',monospace", border: "2px solid #c4b5fd" }}>.</div>
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 900 }}>→</div>
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
        "If K=3, each single cell becomes a 3×3 block. That's 9 copies of the same character!", "K=3이면, 각 칸 하나가 3×3 블록이 돼. 같은 문자 9개!"),
      question: t(E, "K=3. One 'X' becomes how many X's?", "K=3. 'X' 하나가 몇 개의 X가 돼?"),
      options: ["9", "3", "6", "12"],
      correct: 0,
      explain: t(E, "3×3 = 9 X's in a square block! ✅", "3×3 = 정사각형 블록에 X가 9개! ✅"),
    },

    // 1-8 전체 예시: 원본 → 확대
    {
      type: "reveal",
      narr: t(E,
        "Now let's see the FULL picture!\nOriginal 2×3 grid with K=2 becomes a 4×6 grid.\nEvery cell expanded!", "이제 전체 그림을 보자! 원본 2×3 그리드가 K=2로 4×6 그리드가 돼. 모든 셀이 확장!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#8b5cf6", marginBottom: 6 }}>{t(E, "Original (2×3)", "원본 (2×3)")}</div>
              <Grid data={[["X",".","X"],[".","X","."]]} cellSize={40} gap={3} />
            </div>
            <div style={{ fontSize: 28, color: C.accent, fontWeight: 900, alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#8b5cf6", marginBottom: 6 }}>{t(E, "K=2 → (4×6)", "K=2 → (4×6)")}</div>
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

    // 1-9 출력 크기 퀴즈
    {
      type: "quiz",
      narr: t(E,
        "The output size is always M×K rows and N×K columns. Each dimension gets multiplied by K!", "출력 크기는 항상 M×K 행, N×K 열이야. 각 차원에 K를 곱해!"),
      question: t(E, "Original 5×4, K=3. Output size?", "원본 5×4, K=3. 출력 크기?"),
      options: [
        t(E, "15 rows × 12 columns", "15행 × 12열"),
        t(E, "8 rows × 7 columns", "8행 × 7열"),
        t(E, "5 rows × 4 columns", "5행 × 4열"),
      ],
      correct: 0,
      explain: t(E, "5×3 = 15 rows, 4×3 = 12 columns ✅", "5×3 = 15행, 4×3 = 12열 ✅"),
    },

    // 1-10 입력 연습
    {
      type: "input",
      narr: t(E,
        "Your turn! Original grid has 3 rows, K=4. How many rows in the output?", "네 차례! 원본 그리드가 3행, K=4. 출력의 행 수는?"),
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
        "There are two stretches happening: HORIZONTAL (each character repeated K times in a row) and VERTICAL (each row printed K times).\nLet's see each one!", "두 가지 확대가 일어나: 가로 (각 문자를 행에서 K번 반복)와 세로 (각 행을 K번 출력). 하나씩 보자!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <div style={{ background: "#dbeafe", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, flex: 1, maxWidth: 160 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>↔️</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#2563eb" }}>{t(E, "Horizontal", "가로 확대")}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{t(E, "each char → K chars", "문자 1개 → K개")}</div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 12, padding: 12, flex: 1, maxWidth: 160 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>↕️</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a" }}>{t(E, "Vertical", "세로 확대")}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{t(E, "each row → K rows", "행 1개 → K개")}</div>
            </div>
          </div>
        </div>),
    },

    // 2-2 가로 확대 시각화
    {
      type: "reveal",
      narr: t(E,
        "HORIZONTAL: Take one row 'X.X'.\nWith K=2, each character is repeated 2 times: X→XX, .→.., X→XX.\nResult: 'XX..XX'!", "가로: 행 하나 'X.X'를 가져와. K=2면 각 문자를 2번 반복: X→XX, .→.., X→XX. 결과: 'XX..XX'!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {/* Original row */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 40 }}>{t(E, "Row:", "행:")}</span>
              {["X",".","X"].map((ch, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  background: ch === "X" ? "#7c3aed" : "#f5f3ff", border: `2px solid ${ch === "X" ? "#6d28d9" : "#c4b5fd"}`,
                  fontSize: 16, fontWeight: 900, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: C.accent }}>↓ {t(E, "each × 2", "각각 × 2")}</div>
            {/* Expanded row */}
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 40 }}>{t(E, "→", "→")}</span>
              {["X","X",".",".","X","X"].map((ch, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                  background: ch === "X" ? "#7c3aed" : "#f5f3ff", border: `1.5px solid ${ch === "X" ? "#6d28d9" : "#ddd6fe"}`,
                  fontSize: 12, fontWeight: 900, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
            {/* Color-coded grouping */}
            <div style={{ display: "flex", gap: 2 }}>
              <span style={{ width: 40 }}/>
              {[["#ef4444","XX"],["#3b82f6",".."],["#22c55e","XX"]].map(([clr, txt], i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 800, color: clr, textAlign: "center", width: 58 }}>
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
        "VERTICAL: After expanding horizontally, we print that same row K times!\nWith K=2, 'XX..XX' appears twice.", "세로: 가로 확대 후, 같은 행을 K번 출력! K=2면 'XX..XX'가 두 번 나와."),
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
                  fontSize: 12, fontWeight: 900, color: ch === "X" ? "#fff" : "#c4b5fd", fontFamily: "'JetBrains Mono',monospace" }}>{ch}</div>
              ))}
            </div>
          ))}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginTop: 6 }}>
            {t(E, "↑ Same row printed 2 times = vertical stretch!", "↑ 같은 행 2번 출력 = 세로 확대!")}
          </div>
        </div>),
    },

    // 2-4 퀴즈: 가로 확대
    {
      type: "quiz",
      narr: t(E,
        "In Python, repeating a character is easy: 'X' * 3 = 'XXX'. String multiplication!", "파이썬에서 문자 반복은 쉬워: 'X' * 3 = 'XXX'. 문자열 곱셈!"),
      question: t(E, "'.' * 4 = ?", "'.' * 4 = ?"),
      options: ["'....'", "'4.'", "4", "'.....'"],
      correct: 0,
      explain: t(E, "The dot is repeated 4 times: '....' ✅", "점이 4번 반복: '....' ✅"),
    },

    // 2-5 전체 과정 추적
    {
      type: "reveal",
      narr: t(E,
        "Let's trace the FULL process! Original: [['X','.','X'],['.','X','.']], K=2.", "전체 과정을 추적하자! 원본: [['X','.','X'],['.','X','.']], K=2."),
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
                <span style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, letterSpacing: 2 }}>{item.row}</span>
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
        "We need TWO kinds of loops: one to go through original rows, and one to repeat each row K times.\nWhich does what?", "두 종류의 루프가 필요해: 원본 행을 순회하는 것과, 각 행을 K번 반복하는 것. 어떤 게 뭘 할까?"),
      question: t(E,
        "Which loop makes each row appear K times vertically?",
        "각 행이 세로로 K번 나오게 하는 루프는?"),
      options: [
        t(E, "The inner loop: for _ in range(K)", "안쪽 루프: for _ in range(K)"),
        t(E, "The outer loop: for i in range(M)", "바깥 루프: for i in range(M)"),
      ],
      correct: 0,
      explain: t(E, "The inner loop runs K times for each row i → same row printed K times ✅", "안쪽 루프가 각 행 i에 대해 K번 실행 → 같은 행 K번 출력 ✅"),
    },

    // 2-7 퀴즈: 가로 확대는?
    {
      type: "quiz",
      narr: t(E,
        "For horizontal stretching, we build each output row by repeating each character K times.\nIn code: grid[i][j] * K.", "가로 확대는 각 출력 행을 만들 때 각 문자를 K번 반복. 코드: grid[i][j] * K."),
      question: t(E,
        "Row = '.X.', K=3. What's the expanded row?",
        "행 = '.X.', K=3. 확대된 행은?"),
      options: ["'...XXX...'", "'..XX..'", "'.X..X..X.'"],
      correct: 0,
      explain: t(E, "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅", "'.'*3 + 'X'*3 + '.'*3 = '...XXX...' ✅"),
    },

    // 2-8 입력 연습
    {
      type: "input",
      narr: t(E,
        "Original: 3 rows × 2 columns, K=3.\nTotal output characters in ONE output row?\nEach original row has 2 chars, each repeated 3 times.", "원본: 3행 × 2열, K=3. 출력 행 하나의 총 문자 수? 원본 행은 2문자, 각각 3번 반복."),
      question: t(E, "2 chars × 3 = ?", "2문자 × 3 = ?"),
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
        "Step 1: Read the numbers M, N, K. The first line has all three, separated by spaces.", "1단계: 숫자 M, N, K를 읽어. 첫 줄에 세 개가 공백으로 구분되어 있어."),
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
            {t(E, "input().split() reads '2 3 2' → ['2','3','2']. map(int,\n...) converts to integers.", "input().split()이 '2 3 2' → ['2','3','2'] 읽고.\nmap(int, ...)이 정수로 변환.")}
          </div>
        </div>),
    },

    // 3-2 그리드 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Read M lines for the grid. Each line is a string of '.' and 'X'.", "2단계: 그리드로 M줄을 읽어. 각 줄은 '.'와 'X'의 문자열이야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div style={{ color: "#e2e8f0" }}>grid = []</div>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in </span><span style={{ color: "#c084fc" }}>range</span><span style={{ color: "#e2e8f0" }}>(M):</span></div>
            <div style={{ color: "#e2e8f0" }}>    grid.append(<span style={{ color: "#c084fc" }}>input</span>())</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "grid[0] = 'X.X', grid[1] = '.X.' etc.", "grid[0] = 'X.X', grid[1] = '.X.' 등.")}
          </div>
        </div>),
    },

    // 3-3 퀴즈: grid[i][j]
    {
      type: "quiz",
      narr: t(E,
        "If grid = ['X.X', '.X.'], what is grid[0][2]? Remember: index starts at 0!", "grid = ['X.X', '.X.']이면, grid[0][2]는? 인덱스는 0부터 시작!"),
      question: t(E, "grid[0] = 'X.X'. grid[0][2] = ?", "grid[0] = 'X.X'. grid[0][2] = ?"),
      options: ["'X'", "'.'", "'.X'"],
      correct: 0,
      explain: t(E, "'X.X'[0]='X', [1]='.', [2]='X' ✅", "'X.X'[0]='X', [1]='.', [2]='X' ✅"),
    },

    // 3-4 출력 루프: 바깥
    {
      type: "reveal",
      narr: t(E,
        "Step 3: The output loop!\nOuter loop goes through each original row.\nInner loop repeats it K times.", "3단계: 출력 루프! 바깥 루프가 원본 행을 순회. 안쪽 루프가 K번 반복."),
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
        "Step 4: Inside the loops, build each output row by repeating each character K times, then print it!", "4단계: 루프 안에서, 각 문자를 K번 반복하여 출력 행을 만들고, 출력!"),
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
            {t(E, "grid[i][j] * K → repeat character K times! ✨", "grid[i][j] * K → 문자를 K번 반복! ✨")}
          </div>
        </div>),
    },

    // 3-6 퀴즈: grid[i][j] * K
    {
      type: "quiz",
      narr: t(E,
        "This is the core of the solution! grid[i][j] * K does the horizontal stretching.", "이게 솔루션의 핵심이야! grid[i][j] * K가 가로 확대를 해."),
      question: t(E,
        "grid[0] = 'X.X', K=3. What does grid[0][1] * K produce?",
        "grid[0] = 'X.X', K=3. grid[0][1] * K의 결과는?"),
      options: ["'...'", "'XXX'", "'X.X'"],
      correct: 0,
      explain: t(E, "grid[0][1] = '.'. '.' * 3 = '...' ✅", "grid[0][1] = '.'. '.' * 3 = '...' ✅"),
    },

    // 3-7 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(M × K × N × K) = O(MNK²).\nBut that's exactly the output size — we can't do better!\nEach character in the output is written exactly once.", "시간복잡도: O(M × K × N × K) = O(MNK²). 하지만 그게 정확히 출력 크기야 — 더 빨리 할 수 없어! 출력의 각 문자를 정확히 한 번 씀."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(MNK²)</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{t(E, "= output size, optimal!", "= 출력 크기, 최적!")}</div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.ok, fontWeight: 700 }}>
            M,N ≤ 10, K ≤ 10 → {t(E, "max 10,000 chars, instant!", "최대 10,000자, 즉시!")}
          </div>
        </div>),
    },

    // 3-8 완전한 코드
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowSignalSections(E),
    },
  ];
}
