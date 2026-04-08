import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import Counter",
  "from itertools import combinations",
  "",
  "N = int(input())",
  "packs = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    packs.append((min(a,b), max(a,b)))",
  "",
  "pair_count = Counter(packs)",
  "",
  "colors = set()",
  "for a, b in packs:",
  "    colors.add(a)",
  "    colors.add(b)",
  "",
  "answer = 0",
  "for x, y in combinations(sorted(colors), 2):",
  "    A = pair_count.get((x, x), 0)",
  "    B = pair_count.get((y, y), 0)",
  "    C = pair_count.get((x, y), 0)",
  "    answer += A * B * C",
  "    answer += C * (C-1) * (C-2) // 6",
  "",
  "print(answer)",
];

/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => (
      <div key={i} style={{
        display: "flex", minHeight: 20,
        background: hl && hl.includes(i) ? "rgba(249,115,22,.15)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fdba74" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh1(E) {
  const O = "#f97316", P = "#a855f7", G = "#22c55e";
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "It's Halloween! There are candy bags — each bag has 2 candies. Pick 3 bags. Open them: you get 6 candies. For it to be a success, those 6 candies must be exactly 2 colors with 3 of each! 🎃",
        "할로윈이야! 사탕 봉지가 잔뜩 있어. 봉지마다 사탕이 2개씩 들어있지. 이 중에서 봉지를 딱 3개만 골라. 열어보면 사탕 6개가 나와. 이 6개 사탕이 '두 가지 색, 각각 3개씩'이면 성공! 이렇게 성공하는 방법이 몇 가지인지 세는 문제야. 🎃"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎃</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Trick or Treat</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P3</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N bags (2 candies each) → pick 3 bags → open them → need exactly 2 colors, 3 each!",
              "봉지 N개 (각 2개씩) → 3개 고르기 → 열어보기 → 2가지 색 × 3개씩이면 성공!")}
          </div>
        </div>),
    },
    // 1-2: Pack concept
    {
      type: "reveal",
      narr: t(E,
        "Each bag has exactly 2 candies inside. Sometimes both are the same color, sometimes different!",
        "봉지를 열면 사탕 2개가 나와. 둘이 같은 색일 수도 있고, 서로 다른 색일 수도 있어!"),
      content: (() => {
        const packs = [
          { a: O, b: P, la: "1", lb: "2", label: "(1,2)" },
          { a: O, b: O, la: "1", lb: "1", label: "(1,1)" },
          { a: P, b: P, la: "2", lb: "2", label: "(2,2)" },
          { a: O, b: G, la: "1", lb: "3", label: "(1,3)" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {packs.map((p, i) => (
                <div key={i} style={{
                  background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12,
                  padding: "10px 12px", textAlign: "center", minWidth: 70,
                }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.a, border: `2px solid ${p.a}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff" }}>{p.la}</div>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.b, border: `2px solid ${p.b}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff" }}>{p.lb}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#f97316", fontFamily: "'JetBrains Mono',monospace" }}>{p.label}</div>
                  <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>
                    {p.a === p.b ? t(E, "Same", "같은 색") : t(E, "Mixed", "다른 색")}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center",
            }}>
              💡 {t(E,
                "1 bag = 2 candies. Pick 3 bags = 6 candies total!",
                "봉지 1개 = 사탕 2개. 봉지 3개를 고르면 = 사탕 총 6개!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Quiz — valid selection
    {
      type: "quiz",
      narr: t(E,
        "3 bags = 6 candies. To succeed, the 6 candies must be exactly 2 colors, 3 of each!",
        "봉지 3개를 열면 사탕 6개. 이 6개가 딱 '2가지 색, 3개씩'이면 성공이야!"),
      question: t(E,
        "Bags (1,2), (1,1), (2,2) → colors: 1×3, 2×3. Success?",
        "봉지 (1,2), (1,1), (2,2)를 골랐어. 사탕을 꺼내보면 색1이 3개, 색2가 3개. 성공일까?"),
      options: [
        t(E, "No, all 6 must be different colors", "아니, 6개 다 다른 색이어야 해"),
        t(E, "Yes! Exactly 2 colors, 3 each", "맞아! 딱 2색, 3개씩"),
        t(E, "No, need at least 3 colors", "아니, 3가지 이상 필요해"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Color 1 appears 3 times, color 2 appears 3 times. That's exactly what we need!",
        "정답! 색1이 3개, 색2가 3개. 이게 바로 우리가 원하는 거야!"),
    },
    // 1-4: Pack type classification
    {
      type: "reveal",
      narr: t(E,
        "Here's the trick! Pick two colors x and y. Every bag falls into one of 3 groups based on what's inside.",
        "여기가 핵심이야! 색깔 2개를 골라서 x, y라고 부르자. 그러면 모든 봉지를 안에 든 사탕에 따라 3가지 그룹으로 나눌 수 있어."),
      content: (() => {
        const types = [
          { label: "Type A", emoji: "🟠🟠", desc_en: "(x,x) → x color ×2", desc_ko: "(x,x) → x색 사탕만 2개", color: O, bg: "#fff7ed", bd: "#fdba74" },
          { label: "Type B", emoji: "🟣🟣", desc_en: "(y,y) → y color ×2", desc_ko: "(y,y) → y색 사탕만 2개", color: P, bg: "#faf5ff", bd: "#d8b4fe" },
          { label: "Type C", emoji: "🟠🟣", desc_en: "(x,y) → 1x + 1y", desc_ko: "(x,y) → x색 1개 + y색 1개", color: G, bg: "#ecfdf5", bd: "#6ee7b7" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", marginBottom: 8, textAlign: "center" }}>
              {t(E, "Bag types for color pair (x, y)", "색 쌍 (x, y)로 봉지를 분류하면")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {types.map((tp, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: tp.bg, borderRadius: 10, padding: "8px 12px",
                  border: `2px solid ${tp.bd}`,
                }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{tp.emoji}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: tp.color }}>{tp.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                      {E ? tp.desc_en : tp.desc_ko}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center", lineHeight: 1.6,
            }}>
              {t(E,
                "We need x=3, y=3 from exactly 3 bags!",
                "봉지 3개를 열었을 때, x색 3개 + y색 3개가 나와야 해!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-5: Quiz — which combos work
    {
      type: "quiz",
      narr: t(E,
        "We need 3 of color x and 3 of color y from 3 bags. A-bag gives 2x, B-bag gives 2y, C-bag gives 1x+1y. Which combos of 3 bags work?",
        "우리는 x색 3개, y색 3개가 필요해. A봉지를 열면 x가 2개, B봉지를 열면 y가 2개, C봉지를 열면 x 1개 + y 1개가 나와. 봉지 3개로 어떤 조합이 가능할까?"),
      question: t(E,
        "Which combos of 3 bags give exactly 3x and 3y?",
        "봉지 3개를 어떻게 조합해야 x 3개, y 3개가 될까?"),
      options: [
        t(E, "Only: 1A + 1B + 1C", "1A + 1B + 1C만"),
        t(E, "Only: 3C", "3C만"),
        t(E, "Both: (1A+1B+1C) and (3C)", "둘 다: (1A+1B+1C)과 (3C)"),
      ],
      correct: 2,
      explain: t(E,
        "Both work! 1A+1B+1C: 2+0+1=3x, 0+2+1=3y ✓. 3C: 1+1+1=3x, 1+1+1=3y ✓. No other combos give 3+3!",
        "둘 다 돼! A+B+C 하나씩: x가 2+0+1=3, y가 0+2+1=3 ✓. C 3개: x가 1+1+1=3, y가 1+1+1=3 ✓. 이 두 가지만 가능해!"),
    },
    // 1-6: Counting formula
    {
      type: "reveal",
      narr: t(E,
        "So the plan is: for each pair of colors (x,y), count A, B, C bags, apply two simple formulas, and add it all up!",
        "그래서 이렇게 풀어! 색깔 쌍 (x,y)마다 → A, B, C 봉지 몇 개인지 세고 → 공식 2개를 적용하고 → 전부 더하면 답이야!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{
            background: "#fff7ed", borderRadius: 12, padding: 14,
            border: "2px solid #fdba74",
          }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#f97316", marginBottom: 10, textAlign: "center" }}>
              {t(E, "The Formula", "공식")}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              fontWeight: 700, color: C.text, lineHeight: 2.2, textAlign: "center",
            }}>
              <div style={{ background: "#fef3c7", borderRadius: 6, padding: "4px 8px", marginBottom: 4 }}>
                <span style={{ color: "#f97316" }}>Case 1:</span> countA × countB × countC
              </div>
              <div style={{ background: "#fef3c7", borderRadius: 6, padding: "4px 8px", marginBottom: 4 }}>
                <span style={{ color: "#a855f7" }}>Case 2:</span> C(countC, 3) = <span style={{ fontSize: 11 }}>countC×(countC-1)×(countC-2)/6</span>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 6, padding: "6px 8px", border: "1.5px solid #6ee7b7", fontSize: 14 }}>
                <span style={{ color: "#059669", fontWeight: 900 }}>{t(E, "answer", "답")}</span> = {t(E, <span style={{ fontSize: 11 }}>sum over all pairs</span>, <span style={{ fontSize: 11 }}>모든 색 쌍의 합</span>)} (Case1 + Case2)
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
            {t(E,
              "For every pair of colors (x,y), classify the bags, apply formulas, and add up!",
              "모든 색 쌍 (x,y)에 대해 봉지를 분류하고, 공식을 적용해서 전부 더하면 끝!")}
          </div>
        </div>),
    },
    // 1-7: Input — apply formula
    {
      type: "input",
      narr: t(E,
        "Try calculating! If there are 2 A-bags, 1 B-bag, and 2 C-bags, what do you get?",
        "직접 계산해보자! A봉지 2개, B봉지 1개, C봉지 2개면 답은 얼마일까?"),
      question: t(E,
        "A=2, B=1, C=2.\nA×B×C + C(2,3) = ?",
        "A=2, B=1, C=2.\nA×B×C + C(2,3) = ?"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🎃 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh2(E) {
  return [
    // 2-1: Pack type classifier
    {
      type: "packTypeClassifier",
      narr: t(E,
        "Pick a color pair and watch the 9 sample bags get sorted into A, B, C types! Try different pairs. 🎃",
        "색 쌍을 하나 골라봐! 봉지 9개가 A, B, C 종류로 나뉘는 걸 볼 수 있어. 다른 쌍도 눌러봐! 🎃"),
    },
    // 2-2: Quiz — pack type
    {
      type: "quiz",
      narr: t(E,
        "Quick check! Bag (1,1) has two candies, both color 1. If we're looking at color pair (1,2), what type is this bag?",
        "퀴즈! 봉지 (1,1)에는 사탕이 둘 다 색1이야. 색 쌍 (1,2)에서 이 봉지는 어떤 종류?"),
      question: t(E,
        "Bag (1,1) for pair (1,2) is...?",
        "봉지 (1,1)은 색 쌍 (1,2)에서 어떤 종류?"),
      options: [
        t(E, "Type A (both = x)", "A타입 (둘 다 x)"),
        t(E, "Type B (both = y)", "B타입 (둘 다 y)"),
        t(E, "Type C (mixed)", "C타입 (섞임)"),
      ],
      correct: 0,
      explain: t(E,
        "Bag (1,1) = both candies are color 1 = x. That's Type A: (x,x)!",
        "봉지 (1,1) = 사탕 둘 다 색1 = x색. 그래서 A종류(x,x)야!"),
    },
    // 2-3: Pack picker simulator
    {
      type: "packPickerSim",
      narr: t(E,
        "Now try picking 3 bags yourself! See if you can get exactly 2 colors with 3 candies each. 🎃",
        "이제 직접 봉지 3개를 골라봐! 사탕 색이 딱 2가지 × 3개씩 나오는지 확인해보자! 🎃"),
    },
    // 2-4: Color pair counter
    {
      type: "colorPairCounter",
      narr: t(E,
        "Watch the algorithm check each color pair and count the valid ways step by step!",
        "알고리즘이 색 쌍을 하나씩 확인하면서 가능한 방법을 세는 과정을 지켜봐!"),
    },
    // 2-5: Final answer input
    {
      type: "input",
      narr: t(E,
        "You saw the counting! What's the total for the 9-bag sample?",
        "세는 과정을 봤지! 봉지 9개짜리 예제의 최종 답은?"),
      question: t(E,
        "Total valid ways for the sample?",
        "예제에서 가능한 방법은 총 몇 가지?"),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh3(E) {
  return [
    // 3-1: Read + normalize
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code! First, read the bags and normalize: (2,1) → (1,2) so we don't double-count.",
        "코드를 짜보자! 먼저 봉지 정보를 읽고, (2,1)과 (1,2)를 같은 걸로 취급해서 중복을 없애."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 1: Read & normalize bags", "1단계: 봉지 읽기 & 정리")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "(2,1) and (1,2) are the same bag! min/max ensures consistent ordering.",
              "(2,1)과 (1,2)는 같은 봉지야! min/max로 항상 작은 수가 앞에 오게 정리해.")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "packs = []",
              "for _ in range(N):",
              "    a, b = map(int, input().split())",
              "    packs.append((min(a,b), max(a,b)))",
            ]}
            highlight={[3, 4]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: "#f97316", fontWeight: 700, textAlign: "center" }}>
            (2,1) → min=1, max=2 → <span style={{ fontWeight: 900 }}>(1,2)</span> ✓
          </div>
        </div>),
    },
    // 3-2: Counter
    {
      type: "reveal",
      narr: t(E,
        "Count how many of each bag type using Counter. This lets us quickly look up A, B, C counts!",
        "Counter로 같은 종류의 봉지가 몇 개인지 세. 이러면 A, B, C 개수를 바로 알 수 있어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 2: Count bag types", "2단계: 봉지 종류별 개수 세기")}
          </div>
          <CodeSnippet
            lines={[
              "from collections import Counter",
              "pair_count = Counter(packs)",
            ]}
            highlight={[0, 1]}
          />
          <div style={{
            marginTop: 10, background: "#fff7ed", borderRadius: 10,
            padding: 10, border: "2px solid #fdba74",
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#f97316", marginBottom: 4 }}>
              {t(E, "Example result:", "예시 결과:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text, lineHeight: 1.8 }}>
              {"{"}<br />
              {"  (1,1): 3,  (1,2): 2,"}<br />
              {"  (1,3): 2,  (2,2): 1"}<br />
              {"}"}
            </div>
          </div>
        </div>),
    },
    // 3-3: Colors + combinations
    {
      type: "reveal",
      narr: t(E,
        "Collect all the colors that appear, then go through every pair of colors.",
        "나오는 색깔을 전부 모은 다음, 2개씩 짝을 지어 확인해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 3: Get color pairs", "3단계: 색 쌍 구하기")}
          </div>
          <CodeSnippet
            lines={[
              "from itertools import combinations",
              "",
              "colors = set()",
              "for a, b in packs:",
              "    colors.add(a)",
              "    colors.add(b)",
              "",
              "# combinations(sorted(colors), 2)",
              "# → (1,2), (1,3), (2,3)",
            ]}
            highlight={[2, 3, 4, 5]}
          />
          <div style={{
            display: "flex", justifyContent: "center", gap: 6, marginTop: 10,
          }}>
            {["(1,2)", "(1,3)", "(2,3)"].map((p, i) => (
              <div key={i} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
                background: "#fff7ed", border: "2px solid #fdba74", color: "#f97316",
              }}>{p}</div>
            ))}
          </div>
        </div>),
    },
    // 3-4: Main loop + formula
    {
      type: "reveal",
      narr: t(E,
        "The main loop! For each pair (x,y), look up how many A, B, C bags exist, then apply the formulas.",
        "핵심 반복문! 색 쌍 (x,y)마다 A, B, C 봉지가 몇 개인지 찾고, 공식 두 개를 적용해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 4: Count valid ways!", "4단계: 가능한 방법 수 세기!")}
          </div>
          <CodeSnippet
            lines={[
              "answer = 0",
              "for x, y in combinations(sorted(colors), 2):",
              "    A = pair_count.get((x, x), 0)",
              "    B = pair_count.get((y, y), 0)",
              "    C = pair_count.get((x, y), 0)",
              "    answer += A * B * C",
              "    answer += C * (C-1) * (C-2) // 6",
              "",
              "print(answer)",
            ]}
            highlight={[5, 6]}
          />
          <div style={{
            marginTop: 10, background: "#d1fae5", borderRadius: 10,
            padding: "8px 12px", border: "2px solid #6ee7b7", textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#059669" }}>
              {t(E, "That's the complete algorithm! 🎉", "이게 전체 알고리즘! 🎉")}
            </div>
          </div>
        </div>),
    },
    // 3-5: Formula trace
    {
      type: "formulaTrace",
      narr: t(E,
        "Let's trace through the sample, pair by pair! See how each color pair adds to the answer.",
        "예제를 색 쌍별로 따라가보자! 각 색 쌍에서 답이 얼마나 늘어나는지 봐."),
    },
    // 3-6: Full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read bags → count types → check each color pair. 🎃",
        "전체 풀이 코드야! 봉지 읽기 → 종류별 세기 → 색 쌍마다 공식 적용. 🎃"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
