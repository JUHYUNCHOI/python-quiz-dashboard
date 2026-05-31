import { C, t } from "@/components/quest/theme";
import { getAstralSections, AstralComposite, AstralChainDiscovery, AstralDpSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeAstralCh1(E) {
  return [
    /* 1-0 — Hook: visual story first (before any formal text). */
    {
      type: "reveal",
      narr: t(E,
        "First, watch ONE star move between two photos. Bessie the cow took a night-sky photo, waited, then took another. Stars either disappear OR slide by (A right, B down). Try the toggles — see what the COMPOSITE looks like.",
        "먼저 그림으로 봐요. 별 한 개가 두 사진 사이에서 어떻게 움직이는지. Bessie 라는 소가 밤하늘을 두 번 찍었어요. 별은 사라지거나 (A 오른쪽, B 아래) 로 슬쩍 이동. 아래 토글 눌러보면서 합성이 어떻게 만들어지는지 봐요."),
      content: (
        <div>
          <div style={{ padding: "12px 16px 0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 2 }}>🔭🐄</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4f46e5" }}>
              {t(E, "Bessie's two telescope photos", "Bessie 의 두 망원경 사진")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Click ★ moves / disappears, change (A,B) presets",
                    "★ 이동/사라짐 토글, (A,B) 프리셋 변경 가능")}
            </div>
          </div>
          <AstralChainDiscovery E={E} />
        </div>
      ),
    },

    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Now the formal rules. We see the COMPOSITE (the merged picture): W (empty in both photos), G (star in exactly one), B (star in both). Find the minimum stars in the original photo, or -1 if impossible.",
        "이제 정식 규칙. 합성 (두 사진 합친 그림) 의 각 칸: W (둘 다 없음), G (한 사진에만), B (둘 다). 처음 사진의 *최소* 별 수를 출력, 불가능하면 -1."),
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

    /* 1-3.5 — Exhaustive enumeration: all cases per cell. */
    {
      type: "reveal",
      narr: t(E,
        "Before solving, list EVERY way a single composite cell could happen. Each cell has two yes/no bits: did a star ORIGINALLY sit here (s)? did a star ARRIVE from the previous cell (in)? Combine — 4 sub-cases — and map to W/G/B.",
        "풀기 전에 한 칸에 *생길 수 있는 모든 경우* 를 다 적어요. 칸마다 두 개의 예/아니오: 원래 별 있었나 (s)? 이전 칸에서 별이 *들어왔나* (in)? 조합하면 4 가지 — 이걸 W/G/B 에 대응."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔍 {t(E, "All cases per cell", "한 칸의 모든 경우")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "s = star originally here? · in = star arrived from previous cell?",
                    "s = 원래 별 있었나? · in = 이전 칸에서 별이 들어왔나?")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>s</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>in</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "photo 1", "사진 1")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "photo 2", "사진 2")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "composite", "합성")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "stars here", "여기 별 수")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>·</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>·</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff" }}><b>W</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>★</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>·</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1" }}><b>G</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>·</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>★</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1" }}><b>G</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>★</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>★</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff" }}><b>B</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 3, fontWeight: 700, border: "1px solid #cbd5e1" }}>W</code> — {t(E, "1 case", "1 가지")}
              </div>
              <div style={{ fontSize: 11, color: C.text }}>
                {t(E, "s=0, in=0. No star at all.", "s=0, in=0. 별 아예 없음.")}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1.5px solid #94a3b8", borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                <code style={{ background: "#cbd5e1", padding: "1px 6px", borderRadius: 3, fontWeight: 700 }}>G</code> — {t(E, "2 cases", "2 가지")}
              </div>
              <div style={{ fontSize: 11, color: C.text }}>
                (a) {t(E, "s=1, in=0 — star here originally, but disappeared or left to next cell.",
                       "s=1, in=0 — 원래 별 있었지만 사라졌거나 다음 칸으로 이동.")}<br/>
                (b) {t(E, "s=0, in=1 — no original star, but one arrived from prev cell.",
                       "s=0, in=1 — 원래 없었는데 이전 칸 별이 들어옴.")}
              </div>
            </div>
            <div style={{ background: "#1e293b", border: "1.5px solid #0f172a", borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.6, color: "#f1f5f9" }}>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                <code style={{ background: "#1e293b", color: "#fff", padding: "1px 6px", borderRadius: 3, fontWeight: 700, border: "1px solid #475569" }}>B</code> — {t(E, "1 case", "1 가지")}
              </div>
              <div style={{ fontSize: 11 }}>
                {t(E, "s=1, in=1. Star here AND one arrived → seen in both photos.",
                      "s=1, in=1. 원래 별 + 들어온 별 → 두 사진 모두에 보임.")}
              </div>
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
            💡 {t(E,
              "G has 2 sub-cases — that's where the DP choices live. W and B are forced. The DP later tracks which sub-case minimizes total stars.",
              "G 만 두 갈래 — 여기서 DP 선택이 갈려요. W 와 B 는 결정됨. DP 는 어느 갈래가 별 수를 최소로 하는지 추적.")}
          </div>
        </div>),
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
  const sections = getAstralSections(E);
  const sectionStep = (sec, narr = "") => ({
    type: "reveal",
    narr,
    content: (<CodeSectionView section={sec} lang={lang} E={E} />),
  });

  return [
    /* 2-1 — Read input. */
    sectionStep(sections[0], t(E,
      "Stars travel (r, c) → (r+B, c+A), so cells form CHAINS along (B, A).  Per-chain DP picks min stars (or -1 if no consistent assignment).  Sections build it one piece at a time.",
      "별이 (r, c) → (r+B, c+A) 로 이동하니 칸들이 (B, A) 방향 체인을 형성. 체인별 DP 로 최소 별 (또는 -1) 결정. 아래 섹션이 한 단락씩 쌓아요.")),

    /* 2-2 — Special case A=B=0. */
    sectionStep(sections[1]),

    /* 2-3 — Walk chains. */
    sectionStep(sections[2], t(E,
      "Now the general case (A, B) ≠ (0, 0). Cells form chains along (B, A). Each chain is independent — solve them one at a time.",
      "이제 일반 케이스 (A, B) ≠ (0, 0). 칸들이 (B, A) 방향 체인 형성. 체인끼리 독립 — 하나씩 풀어요.")),

    /* 2-3.5 — DP intuition + live sim BEFORE reading the DP code. */
    {
      type: "reveal",
      narr: t(E,
        "Before the DP code: try changing W/G/B cells in this chain. The two rows below are state[0] (outgoing pin = 0) and state[1] (outgoing pin = 1). Watch what makes ∞ appear — that's when the chain is impossible.",
        "DP 코드 보기 전에 직접 만져보기: 체인 칸들의 W/G/B 를 바꿔봐요. 아래 두 줄이 state[0] (나가는 별 X) 과 state[1] (나가는 별 O). ∞ 가 언제 뜨는지 — 그게 체인이 불가능할 때."),
      content: (<AstralDpSim E={E} />),
    },

    /* 2-3.6 — First cell (k=0) forced cases. */
    {
      type: "reveal",
      narr: t(E,
        "The very first cell of a chain has NOTHING before it — so in=0 is forced. Three composite values, three outcomes. If the first cell is B, the chain is already broken.",
        "체인의 첫 칸은 *앞에 아무것도 없음* → in=0 강제. 합성 3 가지에 따라 결과 3 가지. 첫 칸이 B 면 이미 망함."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📌 {t(E, "First cell k = 0 — in = 0 forced", "첫 칸 k = 0 — in = 0 강제")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "state[out] = min stars in chain so far given this cell's outgoing pin = out.",
                    "state[out] = 이 칸 나가는 pin 이 out 일 때 체인 내 최소 별 수.")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "composite", "합성")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>s</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>out</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>state[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>state[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "note", "메모")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff" }}><b>W</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>∞</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "No star, no outgoing. out=1 impossible.", "별 없음, 나가는 별도 없음. out=1 불가.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1" }}><b>G</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0 / 1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "s=1 (in=0 forced). Star can stay (out=0) or move (out=1).",
                          "s=1 (in=0 강제). 별이 머무름 (out=0) 또는 이동 (out=1).")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff" }}><b>B</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>∞</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>∞</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "B needs in=1, but first cell forces in=0 → impossible.",
                          "B 는 in=1 필요한데 첫 칸은 in=0 강제 → 불가능.")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#991b1b", lineHeight: 1.6 }}>
            ❌ {t(E,
              "If the first cell of a chain is B, the WHOLE chain is impossible (state = [∞, ∞]) — no later transition can recover. The answer becomes -1.",
              "체인 첫 칸이 B 면 *체인 전체* 불가능 (state = [∞, ∞]) — 이후 어떤 전이로도 못 되살림. 답은 -1.")}
          </div>
        </div>),
    },

    /* 2-4 — Per-chain DP code. */
    sectionStep(sections[3], t(E,
      "The code below implements exactly what you saw in the simulator. Two states per cell, transitions per W/G/B.",
      "위 시뮬에서 본 걸 코드로. 칸마다 state 두 개, W/G/B 마다 전이 규칙.")),

    /* 2-4.5 — Why min(state[0], state[1]) is the chain answer. */
    {
      type: "reveal",
      narr: t(E,
        "After processing the last cell, we have two state values. Which one is the chain's answer? Both — whichever is smaller. Here's why.",
        "마지막 칸까지 처리한 뒤 state 두 값이 남아요. 어느 게 답? 둘 중 *작은 값*. 왜 그런지."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🎯 {t(E, "Why min(state[0], state[1])?", "왜 min(state[0], state[1])?")}
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 10, padding: 12, marginBottom: 10, fontSize: 12.5, lineHeight: 1.7, color: "#312e81" }}>
            <div style={{ marginBottom: 6 }}>
              <b>1.</b> {t(E,
                "The last cell's 'outgoing pin' points OFF the grid. So whatever value it has — 0 or 1 — there is no next cell to receive it.",
                "마지막 칸의 '나가는 pin' 은 *격자 밖* 으로 향함. 그래서 값이 0 이든 1 이든 받을 다음 칸이 없음.")}
            </div>
            <div style={{ marginBottom: 6 }}>
              <b>2.</b> {t(E,
                "Both out=0 and out=1 are valid endings — they're just two different ways to end the chain.",
                "out=0 과 out=1 둘 다 valid 한 끝맺음 — 체인을 끝내는 두 가지 방식일 뿐.")}
            </div>
            <div style={{ marginBottom: 6 }}>
              <b>3.</b> {t(E,
                "We want MINIMUM total stars. Take the smaller of the two: chain_min = min(state[0], state[1]).",
                "별 *최소* 가 목표. 두 값 중 작은 거 선택: chain_min = min(state[0], state[1]).")}
            </div>
            <div>
              <b>4.</b> {t(E,
                "If chain_min == ∞ → no valid assignment exists → the WHOLE test case is -1.",
                "chain_min == ∞ → valid 배치 없음 → 케이스 전체 답 -1.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
            💡 {t(E,
              "Chains are independent (cells of one chain never share with another). So total answer = SUM of all chain_min values. Any chain failing → -1 for the whole test case.",
              "체인끼리 독립 (한 체인 칸이 다른 체인에 안 속함). 그래서 총 답 = 모든 chain_min 합. 한 체인이라도 실패 → 케이스 전체 -1.")}
          </div>
        </div>),
    },

    /* 2-4.6 — Hand-trace example: chain G→W→G→G. */
    {
      type: "reveal",
      narr: t(E,
        "Let's hand-trace the chain [G, W, G, G] step by step. You can verify this against the live simulator above (preset 'G→W→G→G'). Final answer should be 2.",
        "체인 [G, W, G, G] 를 손으로 한 칸씩 풀어봐요. 위 시뮬 프리셋 'G→W→G→G' 로 직접 확인 가능. 최종 답은 2."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              ✍️ {t(E, "Hand-trace: chain [G, W, G, G]", "손-trace: 체인 [G, W, G, G]")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>k</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>comp</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>state[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>state[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "how", "방법")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "First cell, in=0 forced. G with in=0 → s=1, out 0 or 1 both OK → state=[1,1].",
                          "첫 칸, in=0 강제. G + in=0 → s=1, out 0/1 둘 다 OK → state=[1,1].")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff", fontWeight: 700 }}>W</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>∞</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "W needs in=0. Use prev state[0]=1 → ns[0]=1. W can't have out=1 → ns[1]=∞.",
                          "W 는 in=0 필요. 이전 state[0]=1 사용 → ns[0]=1. W 는 out=1 못 함 → ns[1]=∞.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G + in=0 branch: prev[0]=1 → s=1 (+1), out 0/1 both → ns=[2,2]. G + in=1 branch: prev[1]=∞ skip.",
                          "G + in=0 갈래: prev[0]=1 → s=1 (+1), out 0/1 → ns=[2,2]. G + in=1 갈래: prev[1]=∞ 스킵.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G + in=0: prev[0]=2 → +1 = 3, ns=[3,3]. G + in=1: prev[1]=2 → s=0 (+0), ns[0]=min(3,2)=2. Final ns=[2,3].",
                          "G + in=0: prev[0]=2 → +1 = 3, ns=[3,3]. G + in=1: prev[1]=2 → s=0 (+0), ns[0]=min(3,2)=2. 최종 ns=[2,3].")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#14532d" }}>
            ✅ {t(E, "Chain answer = min(state[0], state[1]) = min(2, 3) = 2",
                    "체인 답 = min(state[0], state[1]) = min(2, 3) = 2")}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
            {t(E, "Scroll back to the live simulator (preset 'G→W→G→G') — values should match exactly.",
                  "위 라이브 시뮬 (프리셋 'G→W→G→G') 로 돌아가서 값이 정확히 같은지 확인해 봐요.")}
          </div>
        </div>),
    },

    /* 2-5 — Full code. */
    sectionStep(sections[4]),
  ];
}
