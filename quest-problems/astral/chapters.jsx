import { C, t } from "@/components/quest/theme";
import { getAstralSections, AstralComposite } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeAstralCh1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Two telescope photos taken back-to-back. Between them, every star EITHER disappeared OR shifted by (A right, B down). We see the COMPOSITE: W (empty in both), G (in exactly one), B (in both). Find the minimum stars in the original photo, or -1 if impossible.",
        "두 망원경 사진을 연달아 찍음. 사이에 별마다 사라지거나 (A 오른쪽, B 아래) 로 이동. 합쳐진 결과: W (둘 다 없음), G (한 곳만), B (둘 다). 처음 사진의 최소 별 수, 불가능하면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#4f46e5" }}>Astral Superposition</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #4f46e5", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#312e81", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#312e81", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum stars in the original photo that match the composite — or -1 if no consistent original exists.",
                "합친 그림과 일치하는 원본 사진의 최소 별 수를 출력 — 일관된 원본이 없으면 -1.")}
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#312e81", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "Bessie took two photos of an N×N sky. Between the two photos, each star EITHER disappeared OR moved A right and B down. Stars that move off the grid are lost. The two photos are combined into one composite:",
                    "Bessie 가 N×N 하늘을 두 번 찍음. 두 번째 사진 사이에 별마다 사라지거나 A 오른쪽 + B 아래로 이동. 화면 밖으로 나간 별은 사라짐. 두 사진을 합쳐서:")}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14, border: "1px solid #cbd5e1" }}>W</code>
                {t(E, " — empty in BOTH photos.", " — 둘 다 비어있음.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #94a3b8", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#cbd5e1", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>G</code>
                {t(E, " — star in EXACTLY ONE photo.", " — 정확히 한 사진에만.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #475569", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#1e293b", color: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>B</code>
                {t(E, " — star in BOTH photos.", " — 두 사진 모두.")}
              </div>
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, padding: "8px 10px", background: "#fff", border: "1.5px solid #a5b4fc", borderRadius: 8 }}>
              <b style={{ color: "#312e81" }}>{t(E, "Goal", "목표")}:</b>{" "}
              {t(E, "Print the MINIMUM number of stars in the FIRST photo (the original sky) consistent with the composite. If no consistent assignment exists, print -1.",
                    "합성 결과와 모순 없는 첫 사진 (원래 하늘) 의 별 최소 개수 출력. 모순 없는 배치가 없으면 -1.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 1000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ A, B ≤ N</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 1000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>Σ N² ≤ 10⁷</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 (A=B=0). */
    {
      type: "reveal",
      narr: t(E,
        "Sample 1: A=B=0 means stars never move (they stay or disappear). W = no star, G = star that disappeared, B = star that stayed. Min stars = #G + #B = 7.",
        "샘플 1: A=B=0 → 별이 안 움직임 (그대로 있거나 사라짐). W = 별 없음, G = 사라진 별, B = 그대로 있는 별. 최소 별 = #G + #B = 7."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — A = B = 0", "샘플 1 — A = B = 0")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`1
3 0 0
WWB
BBB
GGG`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`7`}
              </div>
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#312e81", marginBottom: 6 }}>
              🔍 {t(E, "When A = B = 0, the analysis is simple", "A = B = 0 일 때 분석 단순")}
            </div>
            <div>
              {t(E, "A star that 'shifts' lands on its OWN cell. So a cell's two photos look like:",
                    "별이 '이동' 해도 자기 자리 그대로. 그래서 한 칸의 두 사진 상태:")}
            </div>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              W → no star at all (s=0).<br/>
              G → star existed, but disappeared (s=1, m=0). 1 star.<br/>
              B → star existed, stayed (s=1, m=1). 1 star.
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Total stars = (count of G cells) + (count of B cells) = 3 + 4 = 7.",
                    "총 별 = (G 칸 수) + (B 칸 수) = 3 + 4 = 7.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Composite simulator. */
    {
      type: "reveal",
      narr: t(E,
        "Drag (A, B) shift to see how stars travel between the two photos. Try different presets including the impossible case.",
        "이동량 (A, B) 을 바꾸면서 별이 두 사진 사이를 어떻게 옮겨가는지 봐요. 불가능 케이스도 포함된 preset 시도."),
      content: (<AstralComposite E={E} />),
    },

    /* 1-4 — Quiz: when is -1? */
    {
      type: "quiz",
      narr: t(E,
        "Think about when a B (star in both photos) is impossible: photo 2 needs a star here, which means a star arrived from (r-B, c-A). If that source cell is OFF the grid, no star can arrive.",
        "B (두 사진 모두 별) 가 언제 불가능한지: 사진 2 에 별이 있으려면 (r-B, c-A) 에서 별이 와야. 그 출발 칸이 격자 밖이면 못 옴."),
      question: t(E,
        "N=3, A=1, B=1. Which composite cell can NEVER be 'B' (no source can arrive)?",
        "N=3, A=1, B=1. 어느 합성 칸이 'B' 일 수 없을까 (도착 출발지 없음)?"),
      options: [
        "(2, 2)",
        "(1, 1)",
        "(3, 3)",
      ],
      correct: 1,
      explain: t(E,
        "Cell (1, 1) needs a star from (1−1, 1−1) = (0, 0), which is OFF the grid (1-indexed cells start at 1). So (1, 1) can never be B.",
        "칸 (1, 1) 은 (1−1, 1−1) = (0, 0) 에서 와야 하는데 격자 밖 (1-indexed). 그래서 (1, 1) 은 B 일 수 없음."),
    },

    /* 1-5 — Input quiz. */
    {
      type: "input",
      narr: t(E,
        "Tiny case A = B = 0, grid \"GW\" / \"WG\". Two G cells, no B. Min stars?",
        "작은 케이스 A = B = 0, 그리드 \"GW\" / \"WG\". G 두 개, B 없음. 최소 별?"),
      question: t(E,
        "Min stars (A=B=0)?",
        "최소 별 (A=B=0)?"),
      hint: t(E,
        "A=B=0 → answer = #G + #B = 2 + 0 = 2.",
        "A=B=0 → 답 = #G + #B = 2 + 0 = 2."),
      answer: 2,
    },
  ];
}

export function makeAstralCh2(E, lang = "py") {
  return [
    /* 2-1..2-N — sections directly. */
    ...getAstralSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Stars travel (r, c) → (r+B, c+A), so cells form CHAINS along (B, A).  Per-chain DP picks min stars (or -1 if no consistent assignment).  Sections build it one piece at a time.",
            "별이 (r, c) → (r+B, c+A) 로 이동하니 칸들이 (B, A) 방향 체인을 형성. 체인별 DP 로 최소 별 (또는 -1) 결정. 아래 섹션이 한 단락씩 쌓아요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
