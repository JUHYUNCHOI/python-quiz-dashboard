import { C, t } from "@/components/quest/theme";
import { getFjFarmsSections } from "./components";
import { GrowthSim } from "./GrowthSim";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N plants — plant i starts at height h[i] and grows by a[i] per day.  We're given target counts t[i] meaning 'after some day x, plant i should have exactly t[i] OTHER plants strictly taller than it'.  Find the smallest x ≥ 0 that makes ALL counts match — or -1.",
        "FJ 의 N 개 식물 — i 번 식물은 h[i] 에서 시작해 하루 a[i] 씩 자라요. 목표 t[i] 는 '어떤 날 x 후에 i 번 식물보다 키가 큰 식물이 정확히 t[i] 개' 라는 뜻. 모든 i 의 카운트가 맞는 가장 작은 x ≥ 0 을 찾아요. 없으면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🌱</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>FJ Actually Farms</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the smallest day x ≥ 0 on which every t[i] matches (or -1 if no such day).",
                "모든 t[i] 가 맞는 가장 작은 날 x ≥ 0 (없으면 -1) 를 출력.")}
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
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N plants", "N개 식물")}</b>
                  {t(E, " with initial heights ", "이 있어요. 초기 키 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i]</code>
                  {t(E, " and growth rates ", " 와 성장률 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, ".", "이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On day d, plant i has height ", "d일에 i번 식물의 키는 ")}
                  <b style={{ color: "#0891b2" }}><code style={{ background: "#cffafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i] + a[i] · d</code></b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Target t[i]", "목표 t[i]")}</b>
                  {t(E, " is the number of OTHER plants we want to be strictly taller than plant i on the answer day.  (Same heights don't count as 'taller'.)",
                        " 는 정답 날에 i 번 식물보다 키가 큰 다른 식물의 수예요. (키가 같으면 '큼' 으로 안 침.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest day x ≥ 0", "가장 작은 x ≥ 0")}</b>
                  {t(E, " on which every t[i] matches, or -1 if it can never happen.",
                        " 를 출력해요. 모든 t[i] 가 맞는 첫 날, 절대 안 되면 -1.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Animated growth simulation — eye-evident overtake
    {
      type: "reveal",
      narr: t(E,
        "Watch two plants grow.  Drag the slider or press Play — see plant 1 (purple, faster) catch up and overtake plant 0 (cyan).",
        "두 식물이 자라는 걸 봐요. 슬라이더를 끌거나 재생 — 식물 1 (보라, 빠름) 이 식물 0 (시안) 을 따라잡아 추월."),
      content: <GrowthSim E={E} />,
    },
    // 1-3: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: T cases.  Each case: N, then N heights, N growth rates, N targets — each on its own line.",
        "입력: T 케이스. 각 케이스: N, 그 다음 N 개 키, N 개 성장률, N 개 목표 — 각자 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#065f46", whiteSpace: "pre" }}>
{`6
1
10
1
0
2
7 3
8 10
1 0
2
3 6
10 8
0 1
2
7 3
8 9
1 0
2
7 7
8 8
0 1
2
7 3
8 8
1 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
3
2
5
-1
-1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: 12, fontSize: 11.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
              🔍 {t(E, "Why -1 cases?", "왜 -1?")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "Case 5: h = [7, 7], a = [8, 8] — same growth, same start → plants stay tied forever → t = [0, 0] forever.  Target [0, 1] never reached.",
                    "5 번: h = [7, 7], a = [8, 8] — 시작과 성장률 같음 → 영원히 동점 → t = [0, 0] 만. 목표 [0, 1] 영원히 안 됨.")}
              <br/>
              {t(E, "Case 6: h = [7, 3], a = [8, 8] — same growth → gap stays 4 → plant 0 always taller → t = [0, 1] forever.  Target [1, 0] never reached.",
                    "6 번: h = [7, 3], a = [8, 8] — 성장률 같음 → 차이 4 유지 → 식물 0 항상 더 큼 → t = [0, 1] 만. 목표 [1, 0] 영원히 안 됨.")}
            </div>
          </div>
        </div>),
    },
    // 1-4: Quiz — height calculation
    {
      type: "quiz",
      narr: t(E,
        "Each plant's height on day d is h[i] + a[i] · d.",
        "d 일에 식물 i 의 키 = h[i] + a[i] · d."),
      question: t(E,
        "Plant: h=2, a=3.  After 2 days, height = 2 + 3 × 2 = ?",
        "식물: h=2, a=3. 2 일 후 키 = 2 + 3 × 2 = ?"),
      options: [
        t(E, "6", "6"),
        t(E, "8", "8"),
        t(E, "12", "12"),
      ],
      correct: 1,
      explain: t(E,
        "2 + 3 × 2 = 2 + 6 = 8.  The plant grows 3 units per day for 2 days.",
        "2 + 3 × 2 = 2 + 6 = 8. 식물이 하루에 3 씩 2 일 동안 자라."),
    },
    // 1-5: Input — confirm understanding
    {
      type: "input",
      narr: t(E,
        "Now compute count: at d=0, h = [7, 3].  How many plants are strictly TALLER than plant 0?",
        "이제 카운트: d=0 일 때 h = [7, 3]. 식물 0 보다 키가 큰 식물 수?"),
      question: t(E,
        "h = [7, 3] at d = 0.  Number of plants strictly taller than plant 0?",
        "h = [7, 3], d = 0. 식물 0 보다 큰 식물 수?"),
      hint: t(E,
        "Compare heights side by side — is plant 1 taller, shorter, or equal to plant 0?",
        "키를 나란히 비교 — 식물 1 이 식물 0 보다 큰가, 작은가, 같은가?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — try every x = 0, 1, ..., 1000.
    {
      type: "progressive",
      narr: t(E,
        "Try every day x = 0, 1, …, 1000.  At each x compute heights, count strictly-taller plants per i, return the first x matching t.  Sections build the loop one piece at a time.",
        "x = 0, 1, …, 1000 모두 시도. 각 x 에서 키 계산하고 i 마다 더 큰 식물 수를 세서 t 와 일치하는 첫 x 반환. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getFjFarmsSections(E),
    },
  ];
}
