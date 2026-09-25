import { C, t } from "@/components/quest/theme";
import { WalkFenceSim, WalkFencePathSim } from "./components";

const ACCENT = "#059669";       // emerald-600
const TINT   = "#ecfdf5";        // emerald-50
const BORDER = "#6ee7b7";        // emerald-300
const DARK   = "#065f46";        // emerald-800

export function makeWalkCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ's pasture is fenced by P posts forming a rectilinear loop; each cow walks the SHORTER of the two routes around it.",
        "울타리를 따라 도는 두 길 중 짧은 쪽으로 걸어요."),
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
                "소마다 시작점에서 끝점까지 가는 길이 두 갈래예요. 그중 더 짧은 쪽의 길이를 출력해요.")}
            </div>
          </div>

          <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 8 }}>
              📖 {t(E, "Setup", "설정")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E,
                "P posts (P even) listed in order around a rectilinear polygon — adjacent posts always share an x- or y-coordinate. N cows each give (x₁ y₁ x₂ y₂); both endpoints lie ON the fence. Print the SHORTER of the two routes around the loop.",
                "코너 P 개(P 는 짝수)가 울타리 둘레를 따라 순서대로 놓여 있어요. 옆에 붙은 코너끼리는 x 나 y 가 같아요. 소 N 마리가 각각 (x₁ y₁ x₂ y₂) 를 주는데, 두 점 모두 울타리 위에 있어요. 한 바퀴를 도는 두 길 중 더 짧은 쪽을 출력해요.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 100,000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>4 ≤ P ≤ 200,000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ x, y ≤ 1000</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample: square fence (perimeter 8) with 5 cows. Walk through cow 2 below.",
        "둘레가 8 인 정사각 울타리에 소가 5 마리 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: TINT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: DARK, marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: DARK }}>
                <div>5 4 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← N P", "← N P")}</span></div>
                <div>0 0 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← post 1", "← 코너1")}</span></div>
                <div>2 0 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← post 2", "← 코너2")}</span></div>
                <div>2 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← post 3", "← 코너3")}</span></div>
                <div>0 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← post 4", "← 코너4")}</span></div>
                <div>0 0 0 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 1", "← 소1")}</span></div>
                <div>0 2 1 0 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 2", "← 소2")}</span></div>
                <div>2 1 0 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 3", "← 소3")}</span></div>
                <div>1 0 1 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 4", "← 소4")}</span></div>
                <div>1 2 1 0 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 5", "← 소5")}</span></div>
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534" }}>
                <div>2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 1", "← 소1")}</span></div>
                <div>3 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 2", "← 소2")}</span></div>
                <div>3 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 3", "← 소3")}</span></div>
                <div>4 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 4", "← 소4")}</span></div>
                <div>4 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← cow 5", "← 소5")}</span></div>
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
                    "(0,2) 는 코너 순서를 따라 시작점에서 6 만큼 간 자리예요.")}
              <br/>
              {t(E, "(1,0) lies on the bottom edge → offset 1.",
                    "(1,0) 은 아래쪽 변에 있어서 위치가 1 이에요.")}
              <br/>
              {t(E, "|6 − 1| = 5; the other way = 8 − 5 = 3. → answer 3.",
                    "|6 − 1| = 5 예요. 반대로 돌면 8 − 5 = 3 이라 답은 3 이에요.")}
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Watch two cows race A → B — one each way around the loop. The green one always wins; that's our answer.",
        "서로 반대로 도는 두 소 중 먼저 닿는 쪽이 답이에요."),
      content: (<WalkFencePathSim E={E} />),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the simulator — different fence shapes, with the cow's two route options visible.",
        "울타리 모양을 바꿔 가며 두 갈래 길을 볼 수 있어요."),
      content: (<WalkFenceSim E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "On a closed loop of perimeter L, the shorter distance between two points is min(d, L − d).",
        "한 바퀴가 L 이면 짧은 거리는 min(d, L − d) 예요."),
      question: t(E,
        "Perimeter = 8. Distance one way = 3. Shorter route?",
        "둘레가 8 이고 한쪽 길이가 3 이면 더 짧은 길은 얼마일까요?"),
      options: ["3", "5", "4"],
      correct: 0,
      explain: t(E, "min(3, 8 − 3) = min(3, 5) = 3.", "min(3, 8 − 3) = min(3, 5) = 3."),
    },

    {
      type: "input",
      narr: t(E,
        "Square fence (0,0)→(2,0)→(2,2)→(0,2), perimeter 8.  Cow walks (0,0) to (0,2) — find the shorter of the two routes.",
        "둘레가 8 인 정사각 울타리에서 (0,0) 에서 (0,2) 로 가요."),
      question: t(E, "Shorter distance?", "더 짧은 거리는 얼마일까요?"),
      hint: t(E,
        "Trace one route, then the other.  Pick the smaller.",
        "한쪽 길을 따라가 보고 다른 쪽도 따라가 본 다음, 더 짧은 쪽을 골라요."),
      answer: 2,
    },
  ];
}

export function makeWalkCh2(E, lang = "py") {
  return [
    // 2-1: CodeWalk — solution code, explained line by line in thinking order.
    {
      type: "walkfence-walk",
      narr: t(E,
        "Read the solution code piece by piece.",
        "풀이 코드를 한 단락씩 읽어 봐요."),
    },
  ];
}
