import { C, t } from "@/components/quest/theme";
import { getFjFarmsSections } from "./components";
import { GrowthSim } from "./GrowthSim";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "As the plants grow, will a day ever match the targets exactly?",
        "식물이 자라다 보면 목표와 딱 맞는 날이 올까요?"),
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
                "모든 t[i] 가 맞아떨어지는 가장 이른 날 x 를 출력해요. 그런 날이 없으면 -1 을 출력해요.")}
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
                        " 는 정답인 날에 i 번 식물보다 키가 큰 식물이 몇 개여야 하는지예요. 키가 같으면 '더 크다' 로 세지 않아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest day x ≥ 0", "가장 작은 x ≥ 0")}</b>
                  {t(E, " on which every t[i] matches, or -1 if it can never happen.",
                        " 을 출력해요. 모든 t[i] 가 맞는 첫날이에요. 끝내 그런 날이 없으면 -1 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: Numbers-first warm-up — compute h+a·d on tiny numbers before the abstraction
    {
      type: "reveal",
      narr: t(E,
        "Before the formula sinks in, let's compute two plants' heights day by day with real numbers.",
        "식물 두 개의 키를 날마다 숫자로 직접 구해 볼게요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              🔢 {t(E, "Heights grow every day — with numbers", "키는 날마다 자라요 — 숫자로 보기")}
            </div>
            <div style={{ marginBottom: 6 }}>
              {t(E, "Plant 0: height 8, +1/day → ", "0번 식물: 키 8, 하루 +1 → ")}<code>8 + 1·d</code><br/>
              {t(E, "Plant 1: height 3, +3/day → ", "1번 식물: 키 3, 하루 +3 → ")}<code>3 + 3·d</code>
            </div>
            <div style={{ paddingLeft: 8, borderLeft: "3px solid #6ee7b7", display: "flex", flexDirection: "column", gap: 3, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <div>d=0:  8  vs  3</div>
              <div>d=1:  9  vs  6</div>
              <div>d=2: 10  vs  9</div>
              <div style={{ color: "#7c3aed", fontWeight: 700 }}>d=3: 11  vs 12  ← {t(E, "plant 1 overtakes!", "1번이 추월!")}</div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
              👉 {t(E, "Plants taller than plant 0: ", "0번보다 큰 식물 수: ")}
              <b>{t(E, "0 on days 0–2, then 1 from day 3.", "d=0~2 에는 0 개, d=3 부터는 1 개예요.")}</b>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
                {t(E, "That 'taller-than count' changes over time — we hunt the day it matches every t[i].",
                     "이 '더 큰 식물 수' 는 날마다 달라져요. 우리는 모든 t[i] 와 맞아떨어지는 날을 찾아요.")}
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
        "더 빨리 자라는 식물 1 이 식물 0 을 따라잡는 걸 봐요."),
      content: <GrowthSim E={E} />,
    },
    // 1-3: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: T cases.  Each case: N, then N heights, N growth rates, N targets — each on its own line.",
        "한 문제마다 N, 키, 성장률, 목표가 한 줄씩 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#065f46" }}>
                <div>6 <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.65 }}>← {t(E, "T (cases)", "T (문제 수)")}</span></div>
                {[
                  { n: 1, h: "10", a: "1", tt: "0" },
                  { n: 2, h: "7 3", a: "8 10", tt: "1 0" },
                  { n: 2, h: "3 6", a: "10 8", tt: "0 1" },
                  { n: 2, h: "7 3", a: "8 9", tt: "1 0" },
                  { n: 2, h: "7 7", a: "8 8", tt: "0 1" },
                  { n: 2, h: "7 3", a: "8 8", tt: "1 0" },
                ].map((c, i) => (
                  <div key={i} style={{ marginTop: 4, paddingTop: 4, borderTop: i > 0 ? "1px dotted #a7f3d0" : "none" }}>
                    <div>{c.n} <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.65 }}>← N ({i + 1}{t(E, "", "번")})</span></div>
                    <div>{c.h} <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.65 }}>← h[]</span></div>
                    <div>{c.a} <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.65 }}>← a[]</span></div>
                    <div>{c.tt} <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.65 }}>← t[]</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534" }}>
                {[0, 3, 2, 5, -1, -1].map((v, i) => (
                  <div key={i}>{v} <span style={{ fontSize: 10.5, color: "#166534", opacity: 0.65 }}>← {i + 1}{t(E, "", "번")} {t(E, "answer", "답")}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: 12, fontSize: 11.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
              🔍 {t(E, "Why -1 cases?", "왜 -1?")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "Case 5: h = [7, 7], a = [8, 8] — same growth, same start → plants stay tied forever → t = [0, 0] forever.  Target [0, 1] never reached.",
                    "5 번은 h = [7, 7], a = [8, 8] 이에요. 시작 키도 성장률도 같아서 둘은 늘 같은 키예요. 그래서 t 는 언제나 [0, 0] 이고, 목표 [0, 1] 은 영영 안 나와요.")}
              <br/>
              {t(E, "Case 6: h = [7, 3], a = [8, 8] — same growth → gap stays 4 → plant 0 always taller → t = [0, 1] forever.  Target [1, 0] never reached.",
                    "6 번은 h = [7, 3], a = [8, 8] 이에요. 성장률이 같아서 키 차이 4 가 그대로 남아요. 식물 0 이 늘 더 커서 t 는 언제나 [0, 1] 이고, 목표 [1, 0] 은 영영 안 나와요.")}
            </div>
          </div>
        </div>),
    },
    // 1-4: Quiz — height calculation
    {
      type: "quiz",
      narr: t(E,
        "Each plant's height on day d is h[i] + a[i] · d.",
        "d 일째 식물 i 의 키는 h[i] + a[i] · d 예요."),
      question: t(E,
        "Plant: h=2, a=3.  After 2 days, height = 2 + 3 × 2 = ?",
        "h=2, a=3 인 식물의 2 일 후 키는 2 + 3 × 2 = ?"),
      options: [
        t(E, "6", "6"),
        t(E, "8", "8"),
        t(E, "12", "12"),
      ],
      correct: 1,
      explain: t(E,
        "2 + 3 × 2 = 2 + 6 = 8.  The plant grows 3 units per day for 2 days.",
        "2 + 3 × 2 = 2 + 6 = 8 이에요. 하루에 3 씩 이틀을 자란 거예요."),
    },
    // 1-5: Input — confirm understanding
    {
      type: "input",
      narr: t(E,
        "Now compute count: at d=0, h = [7, 3].  How many plants are strictly TALLER than plant 0?",
        "이번엔 세어 봐요. d=0 일 때 키는 h = [7, 3] 이에요."),
      question: t(E,
        "h = [7, 3] at d = 0.  Number of plants strictly taller than plant 0?",
        "식물 0 보다 키가 큰 식물은 몇 개일까요?"),
      hint: t(E,
        "Compare heights side by side — is plant 1 taller, shorter, or equal to plant 0?",
        "키를 나란히 놓고 봐요. 식물 1 이 식물 0 보다 큰가요, 작은가요?"),
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
        "Try day x from 0 upward and find the first day that matches.",
        "날 x 를 0 부터 하나씩 넣어 보며 맞는 첫날을 찾을게요."),
      sections: getFjFarmsSections(E),
    },
  ];
}
