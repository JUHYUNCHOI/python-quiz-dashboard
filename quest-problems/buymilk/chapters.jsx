import { C, t } from "@/components/quest/theme";
import { getBuyMilkSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeBuyMilkCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBuyMilkCh1(E) {
  return [
    // 1-1: Title + Mission reveal
    {
      type: "reveal",
      narr: t(E,
        "Farmer John has N deals. Deal i sells 2^(i-1) buckets of milk for a_i moonies, prices strictly increasing. For each query x, find the minimum cost to buy at least x buckets.",
        "농부 존이 N 개의 거래를 제안해요. 거래 i 는 2^(i-1) 통의 우유를 a_i 무니에 팔고, 가격은 엄격히 증가해요. 각 쿼리 x 에 대해 최소 x 통을 사는 최소 비용을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥛</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Purchasing Milk</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2026 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "For each query x, output the minimum cost to buy at least x buckets of milk.",
                "각 쿼리 x 에 대해 최소 x 통의 우유를 사는 최소 비용을 출력.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Deal ", "거래 ")}
                  <b style={{ color: "#d97706" }}>i</b>
                  {t(E, " sells ", " 는 ")}
                  <b style={{ color: "#0891b2" }}>2^(i-1)</b>
                  {t(E, " buckets at price ", " 통을 ")}
                  <b style={{ color: "#0891b2" }}>a_i</b>
                  {t(E, ". Prices strictly increase: a_1 < a_2 < ... < a_N.", " 무니에 팔아요. 가격은 엄격 증가: a_1 < a_2 < ... < a_N.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each deal can be taken any non-negative number of times.",
                        "각 거래는 0 번 이상 원하는 만큼 살 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each of the Q queries x, print the minimum cost to get ", "각 쿼리 x 에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "at least x buckets", "최소 x 통")}</b>
                  {t(E, ".", " 을 사는 최소 비용을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample reveal
    {
      type: "reveal",
      narr: t(E,
        "Sample 1: N=2, prices [10, 15]. So 1 bucket = 10, 2 buckets = 15. Query x=6: 3 copies of the 2-bucket deal = 45. Query x=7: same 3 copies of 2-bucket + 1 copy of 1-bucket = 55.",
        "예제 1: N=2, 가격 [10, 15]. 1 통 = 10, 2 통 = 15. 쿼리 x=6: 2 통짜리 3 번 = 45. 쿼리 x=7: 2 통짜리 3 번 + 1 통짜리 1 번 = 55."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>
              📥 {t(E, "Sample 1 — Input", "예제 1 — 입력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`2 4
10 15
1
2
6
7`}
            </pre>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 10 }}>
              📤 {t(E, "Sample 1 — Output", "예제 1 — 출력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`10
15
45
55`}
            </pre>
          </div>
          <div style={{ background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            {t(E, "Notice for x=6: three of the 2-bucket deal cost 3 × 15 = 45. Six of the 1-bucket deal would cost 60. The bigger deal is cheaper per bucket here.",
                 "x=6 에서 주목: 2 통짜리 3 번 = 3 × 15 = 45. 1 통짜리 6 번 = 60. 큰 거래가 통당 더 싸요.")}
          </div>
        </div>),
    },

    // 1-3: Quiz — per-bucket price
    {
      type: "quiz",
      narr: t(E,
        "Prices are strictly increasing, but bucket counts double. Which deal could have the lowest price per bucket?",
        "가격은 엄격 증가하지만 통 수는 2 배씩 늘어요. 통당 단가가 가장 낮은 거래는 어떤 거래일 수 있을까?"),
      question: t(E,
        "If a = [10, 15], what is the price per bucket for each deal?",
        "a = [10, 15] 일 때 각 거래의 통당 단가는?"),
      options: [
        t(E, "Deal 1: 10/bucket · Deal 2: 7.5/bucket — bigger deal is cheaper",
            "거래 1: 10/통 · 거래 2: 7.5/통 — 큰 거래가 더 쌈"),
        t(E, "Deal 1: 10/bucket · Deal 2: 15/bucket — smaller deal is always best",
            "거래 1: 10/통 · 거래 2: 15/통 — 작은 거래가 항상 최선"),
      ],
      correct: 0,
      explain: t(E,
        "Right. Deal 2 sells 2 buckets for 15, so 7.5 per bucket — cheaper than Deal 1's 10 per bucket. Greedy 'always use the smallest deal' would be wrong.",
        "맞아. 거래 2 는 2 통에 15, 즉 통당 7.5 — 거래 1 의 통당 10 보다 싸. '항상 작은 거래만 써' 라는 그리디는 틀려."),
    },

    // 1-4: Input — sample tracing
    {
      type: "input",
      narr: t(E,
        "Sample 2: a = [10, 25, 30, 70] — deals give 1, 2, 4, 8 buckets. For x=5, what is the minimum cost?",
        "예제 2: a = [10, 25, 30, 70] — 거래는 1, 2, 4, 8 통. x=5 일 때 최소 비용은?"),
      question: t(E,
        "a=[10,25,30,70], deal sizes 1,2,4,8. Min cost for x=5?",
        "a=[10,25,30,70], 거래 크기 1,2,4,8. x=5 의 최소 비용?"),
      hint: t(E,
        "One copy of the 4-bucket deal plus one copy of the 1-bucket deal — try the math.",
        "4 통짜리 1 번 + 1 통짜리 1 번 — 합쳐 보자."),
      answer: 40,
    },

    // 1-5: Quiz — over-buy idea
    {
      type: "quiz",
      narr: t(E,
        "Sometimes buying MORE buckets than you need is cheaper. Why?",
        "필요한 양보다 더 많이 사는 게 더 쌀 수도 있어요. 왜?"),
      question: t(E,
        "When can over-buying (getting > x buckets) be cheaper than buying exactly x?",
        "정확히 x 통을 사는 것보다 더 많이 사는 게 쌀 때는 언제?"),
      options: [
        t(E, "When one big deal already covers x and is cheaper than combining smaller deals",
            "큰 거래 하나로 x 를 덮을 수 있고, 그게 작은 거래들을 합한 것보다 쌀 때"),
        t(E, "Never — buying more is always more expensive",
            "절대 — 더 많이 사면 항상 더 비쌈"),
      ],
      correct: 0,
      explain: t(E,
        "Exactly. The minimum cost answer might over-shoot x. So at each deal, we also try 'buy one extra of this size and stop'.",
        "맞아. 최소 비용 답이 x 를 초과할 수도 있어. 그래서 각 거래에서 '한 번 더 사고 끝내기' 도 같이 시도해."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeBuyMilkCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeBuyMilkCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Top-down recursion: for each query x, at deal i (largest first) try three options — use floor(x / 2^i) copies and recurse, use ceil copies and stop, or skip this deal. Take the min. Plus one shortcut: cheapest single-bulk deal that already covers x.",
        "위에서 아래로 재귀: 각 쿼리 x 에 대해 거래 i (큰 것부터) 에서 세 가지 — floor(x / 2^i) 개 + 나머지 재귀, ceil 개 + 끝, 이 거래 건너뛰기 — 의 최솟값. 추가로 x 를 한 번에 덮는 가장 싼 거래도 후보."),
      sections: getBuyMilkSections(E),
    },
  ];
}
