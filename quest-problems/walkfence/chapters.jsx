import { C, t } from "@/components/quest/theme";
import { getWalkFenceSections, WalkFenceSim, WalkFencePathSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

const ACCENT = "#059669";       // emerald-600
const TINT   = "#ecfdf5";        // emerald-50
const BORDER = "#6ee7b7";        // emerald-300
const DARK   = "#065f46";        // emerald-800

export function makeWalkCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ's pasture is fenced by P posts forming a rectilinear polygon (axis-aligned). Each cow walks the SHORTER of the two routes around the closed loop between her start and end.",
        "FJ 의 목초지를 직각 다각형 (축에 평행) 의 P 개 코너로 둘러싸요. 각 소는 시작 — 끝 사이 폐곡선 두 경로 중 더 짧은 쪽으로 걸어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🚶</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: ACCENT }}>Walking Along a Fence</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: TINT, border: `1.5px solid ${ACCENT}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5 }}>
              {t(E,
                "For each cow, output the shorter of the two routes around the closed fence loop between her start and end points.",
                "각 소마다 — 시작과 끝 사이 폐곡선 두 경로 중 더 짧은 쪽을 출력.")}
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 8 }}>
              📖 {t(E, "Setup", "설정")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E,
                "P posts (P even) listed in order around a rectilinear polygon — adjacent posts always share an x- or y-coordinate. N cows each give (x₁ y₁ x₂ y₂); both endpoints lie ON the fence. Print the SHORTER of the two routes around the loop.",
                "P 개 코너 (P 짝수) 가 직각 다각형 둘레 순서로 — 인접 코너는 x 또는 y 가 같음. 소 N 마리 각자 (x₁ y₁ x₂ y₂); 두 끝점 모두 울타리 위에 있음. 폐곡선 두 경로 중 더 짧은 쪽 출력.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>4 ≤ P ≤ 2·10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ x, y ≤ 1000</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample: square fence (perimeter 8) with 5 cows. Walk through cow 2 below.",
        "샘플: 둘레 8 의 정사각 울타리, 소 5 마리. 2 번 소를 아래에서 따라가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: DARK, marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: DARK, whiteSpace: "pre" }}>
{`5 4
0 0
2 0
2 2
0 2
0 0 0 2
0 2 1 0
2 1 0 2
1 0 1 2
1 2 1 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`2
3
3
4
4`}
              </div>
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: DARK, marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — cow 2 from (0,2) to (1,0)", "풀이 — 2 번 소 (0,2) → (1,0)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Posts in order: (0,0) → (2,0) → (2,2) → (0,2). Total perimeter = 8.",
                    "코너 순서: (0,0) → (2,0) → (2,2) → (0,2). 총 둘레 = 8.")}
              <br/>
              {t(E, "(0,2) is at perimeter offset 6 (clockwise from start).",
                    "(0,2) 의 둘레 위치 = 6 (시작점 기준 시계 반대).")}
              <br/>
              {t(E, "(1,0) lies on the bottom edge → offset 1.",
                    "(1,0) 은 아래 변 위 → 위치 1.")}
              <br/>
              {t(E, "|6 − 1| = 5; the other way = 8 − 5 = 3. → answer 3.",
                    "|6 − 1| = 5; 다른 쪽 = 8 − 5 = 3. → 답 3.")}
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Watch two cows race A → B — one each way around the loop. The green one always wins; that's our answer.",
        "두 소가 A → B 경주 — 각자 다른 방향. 항상 초록 소가 이겨요; 그게 답."),
      content: (<WalkFencePathSim E={E} />),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the simulator — different fence shapes, with the cow's two route options visible.",
        "시뮬레이터 — 다양한 울타리 모양, 소의 두 경로가 보여요."),
      content: (<WalkFenceSim E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "On a closed loop of perimeter L, the shorter distance between two points is min(d, L − d).",
        "둘레 L 폐곡선에서 두 점 사이 짧은 거리 = min(d, L − d)."),
      question: t(E,
        "Perimeter = 8. Distance one way = 3. Shorter route?",
        "둘레 = 8. 한쪽 거리 = 3. 더 짧은 경로?"),
      options: ["3", "5", "4"],
      correct: 0,
      explain: t(E, "min(3, 8 − 3) = min(3, 5) = 3.", "min(3, 8 − 3) = min(3, 5) = 3."),
    },

    {
      type: "input",
      narr: t(E,
        "Square fence (0,0)→(2,0)→(2,2)→(0,2), perimeter 8.  Cow walks (0,0) to (0,2) — find the shorter of the two routes.",
        "정사각 울타리 (0,0)→(2,0)→(2,2)→(0,2), 둘레 8. 소가 (0,0) → (0,2) — 두 경로 중 더 짧은 쪽."),
      question: t(E, "Shorter distance?", "더 짧은 거리?"),
      hint: t(E,
        "Trace one route, then the other.  Pick the smaller.",
        "한쪽 경로 따라가 보고, 다른 쪽도. 더 짧은 쪽."),
      answer: 2,
    },
  ];
}

export function makeWalkCh2(E, lang = "py") {
  const sections = getWalkFenceSections(E);
  return [
    ...sections.map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Compute a perimeter offset for each query point — then the answer is min(|d1 − d2|, perimeter − |d1 − d2|).  Sections build it one piece at a time.",
            "쿼리 점마다 둘레 위치를 구해 — 답은 min(|d1 − d2|, 둘레 − |d1 − d2|). 아래 섹션이 한 단락씩 쌓아요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
