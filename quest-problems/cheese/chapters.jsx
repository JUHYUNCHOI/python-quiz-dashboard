import { C, t } from "@/components/quest/theme";
import { getCheeseSections, CheeseSimulator } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeCheeseCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ has an N×N×N cheese cube. He carves out 1×1×1 blocks one at a time. After each carve, count valid placements of a 1×1×N rod that doesn't overlap remaining cheese (the rod can rotate to align with any axis).",
        "FJ 의 N×N×N 치즈 큐브. 1×1×1 블록을 하나씩 파냄. 매 파낸 후 1×1×N 막대를 남은 치즈와 안 겹치게 둘 수 있는 위치 수 (막대는 어느 축이든 회전 가능)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧀</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#eab308" }}>Farmer John's Cheese Block</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO December 2024 Bronze #2</div>
          </div>

          <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#854d0e", marginBottom: 8 }}>
              📖 {t(E, "Setup", "설정")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "An N×N×N cube of cheese. Q updates each carve out a 1×1×1 block at integer coordinates (x, y, z) (0 ≤ x, y, z < N). After each, count where a 1×1×N rod fits (no overlap with cheese). Rod rotates freely along any axis.",
                    "N×N×N 치즈 큐브. Q 번의 update — 각각 정수 좌표 (x, y, z) 의 1×1×1 블록을 파냄 (0 ≤ x, y, z < N). 매번 1×1×N 막대 들어갈 자리 수 (어느 축이든 회전, 치즈와 겹침 X).")}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fde047", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#eab308", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#eab308" }}>{t(E, "Rod orientations", "막대 방향")}</b>
                  {t(E, " — along X, Y, or Z axis. Each cell on the rod must be CARVED (empty).",
                        " — X, Y, 또는 Z 축. 막대가 차지하는 모든 칸이 비어 있어야.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fde047", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#16a34a", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "Total placements", "총 배치")}</b>
                  {t(E, " — sum across all 3 axes. Output one count per update.",
                        " — 3 축 모두 합. update 마다 한 줄.")}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>2 ≤ N ≤ 1000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ Q ≤ 2·10⁵</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample: N=2, 5 carves. After each, valid rod placements: 0, 0, 1, 2, 5.",
        "샘플: N=2, 5 번 파냄. 매번 막대 자리: 0, 0, 1, 2, 5."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#eab308", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`2 5
0 0 0
1 1 1
0 1 0
1 0 0
1 1 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
0
1
2
5`}
              </div>
            </div>
          </div>

          <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#854d0e", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — after 5th carve", "풀이 — 5 번째 파낸 후")}
            </div>
            <div>
              {t(E, "Carved cells: (0,0,0), (1,1,1), (0,1,0), (1,0,0), (1,1,0). For N=2, a 1×1×N rod needs 2 aligned empty cells.",
                    "파낸 칸: (0,0,0), (1,1,1), (0,1,0), (1,0,0), (1,1,0). N=2 면 막대는 한 줄로 비어있는 2 칸 필요.")}
            </div>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Z-axis: row (1,1) has both (1,1,0) & (1,1,1) carved → 1 valid.",
                    "Z 축: 줄 (1,1) 의 (1,1,0), (1,1,1) 둘 다 → 1 자리.")}
              <br/>
              {t(E, "Y-axis: rows (0,*,0) and (1,*,0) both have 2 carved → 2 valid.",
                    "Y 축: (0,*,0) 와 (1,*,0) 줄 둘 다 2 카운트 → 2 자리.")}
              <br/>
              {t(E, "X-axis: rows (*,0,0) and (*,1,0) both have 2 carved → 2 valid.",
                    "X 축: (*,0,0) 와 (*,1,0) 줄 둘 다 → 2 자리.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Total: 1 + 2 + 2 = 5.", "합계: 1 + 2 + 2 = 5.")}
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the simulator. Carve cells one by one and watch each axis's row counts climb.",
        "시뮬레이터 시도. 칸 하나씩 파면서 각 축 row count 가 올라가는 걸 봐요."),
      content: (<CheeseSimulator E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "Each axis has N² rows of length N. A row becomes 'valid' (rod fits) when ALL N cells in it are carved.",
        "각 축마다 길이 N 의 row 가 N² 개. row 의 모든 N 칸이 파였을 때 막대 들어감."),
      question: t(E,
        "N = 3. Cells (0,0,0), (0,0,1), (0,0,2) are all carved. Other 24 cells are still cheese. How many valid rod placements?",
        "N = 3. 칸 (0,0,0), (0,0,1), (0,0,2) 모두 파임. 다른 24 칸은 그대로 치즈. 막대 자리 수?"),
      options: ["0", "1", "3", "9"],
      correct: 1,
      explain: t(E,
        "Only the Z-axis row (0, 0) has all 3 cells carved (positions z=0, 1, 2). Other axes' rows have at most 1 carved cell each. → 1 valid placement.",
        "Z 축 row (0, 0) 만 3 칸 모두 파임 (z=0, 1, 2). 다른 축 row 들은 최대 1 칸. → 1 자리."),
    },

    {
      type: "input",
      narr: t(E,
        "After 4th carve in sample (cells (0,0,0), (1,1,1), (0,1,0), (1,0,0)), how many valid rod placements?",
        "샘플의 4 번째 파낸 후 ((0,0,0), (1,1,1), (0,1,0), (1,0,0)), 막대 자리 수?"),
      question: t(E,
        "Valid rods after 4th carve?",
        "4 번 파낸 후 막대 자리 수?"),
      hint: t(E,
        "Y-axis row (0, *, 0): cells (0,0,0), (0,1,0) both carved → 1 valid. X-axis row (*, 0, 0): cells (0,0,0), (1,0,0) both carved → 1 valid. Total 2.",
        "Y 축 row (0, *, 0): (0,0,0), (0,1,0) 둘 다 → 1 자리. X 축 row (*, 0, 0): (0,0,0), (1,0,0) 둘 다 → 1 자리. 합 2."),
      answer: 2,
    },
  ];
}

export function makeCheeseCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Plan: maintain three N×N count grids (one per axis). Each carve increments three of them. When a row hits N (fully empty), a valid rod placement appears.",
        "계획: 축마다 N×N count 격자 (총 3 개). 매 파낼 때 3 개 갱신. row 가 N 도달 (전부 비어 있음) 하면 막대 자리 1 개 추가."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },

    ...getCheeseSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the solution step by step.", "단계별로 솔루션 작성.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
