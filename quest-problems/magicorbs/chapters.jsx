import { C, t } from "@/components/quest/theme";
import { getMagicOrbsSections, MagicOrbsMergeSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (verified → 11, 37 on the official samples)
   Sort ascending; the k-th smallest orb (0-indexed) is worth
   value × 2^k. Sum mod 1e9+7, once per test case.
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "MOD = 10**9 + 7",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    n = int(input())",
  "    a = list(map(int, input().split()))",
  "    a.sort()                 # smallest first",
  "",
  "    ans = 0",
  "    p = 1                    # coefficient: 1, 2, 4, 8, ...",
  "    for v in a:",
  "        ans = (ans + v * p) % MOD",
  "        p = (p * 2) % MOD",
  "    print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps) — mirrors mcc20cipher
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "You have N magical orbs. Over and over, you fuse two orbs x and y into one new orb worth x + 2·y — until a single orb is left.\nMake that last orb as powerful as possible, then print its power mod 1e9+7.",
        "N 개의 마법 구슬이 있어요. 두 구슬 x, y 를 골라 하나의 새 구슬 x + 2·y 로 융합하기를 반복 — 구슬이 하나 남을 때까지 해요.\n마지막 구슬을 최대한 세게 만든 뒤, 그 파워를 1e9+7 로 나눈 나머지를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔮"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8b5cf6" }}>Magical Orbs</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ede9fe", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Fuse the orbs in the smartest order to maximize the final orb's power, then print it mod 1e9+7.",
                "가장 똑똑한 순서로 구슬을 융합해 마지막 구슬의 파워를 최대로 만든 뒤, 1e9+7 로 나눈 나머지를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N magical orbs", "N 개의 마법 구슬")}</b>
                  {t(E, " with powers ", " 이 있고, 파워 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, ".", " 를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Pick any two orbs ", "아무 구슬 두 개 ")}
                  <b style={{ color: "#8b5cf6" }}>x</b>{t(E, " and ", " 와 ")}<b style={{ color: "#f59e0b" }}>y</b>
                  {t(E, ", destroy both, and create one new orb worth ", " 를 골라 둘 다 없애고, 새 구슬 ")}
                  <b style={{ color: "#7c3aed" }}>x + 2·y</b>
                  {t(E, " — the second orb gets doubled.", " 를 만들어요 — 두 번째 구슬 y 가 두 배가 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeat until ", "구슬이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "only one orb remains", "하나만 남을 때까지")}</b>
                  {t(E, ".", " 반복해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum final power, mod 1e9+7", "마지막 파워의 최댓값 (1e9+7 나머지)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? First a line with T (number of test cases). Each test has n on its own line, then a line with the n orb powers. Print one answer per test.",
        "데이터는 어떻게 들어올까요? 먼저 T (테스트 개수) 한 줄. 각 테스트마다 n 한 줄, 그다음 n 개의 구슬 파워 한 줄이에요. 테스트마다 답 하나를 출력해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — how many test cases", "(첫 줄) — 테스트 개수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: "2px solid #c4b5fd" }}>
                <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>n</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of orbs in this test", "— 이 테스트의 구슬 개수")}</span></div>
                <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>a<sub>1</sub> a<sub>2</sub> … a<sub>n</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the n orb powers", "— n 개 구슬의 파워")}</span></div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: sum of n ≤ 2·10^5, 0 ≤ a[i] ≤ 10^18.", "제약: n 의 합 ≤ 2·10^5, 0 ≤ a[i] ≤ 10^18.")}
            </div>
          </div>

          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each test, one integer — the maximum final power, taken mod 1e9+7.",
                  "테스트마다 정수 하나 — 마지막 파워의 최댓값을 1e9+7 로 나눈 나머지.")}
            </div>
          </div>

          {/* sample */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>2</div>
                <div>3</div>
                <div>1 2 1</div>
                <div>4</div>
                <div>1 2 3 2</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>11</div>
                <div>37</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, ...KA }}>
            {t(E,
              "For [1, 2, 1]: fuse smart and the last orb reaches 11. For [1, 2, 3, 2]: it reaches 37. The whole game is choosing the fusing order.",
              "[1, 2, 1] 은 잘 융합하면 마지막 구슬이 11 이 돼요. [1, 2, 3, 2] 는 37 이 돼요. 핵심은 융합 순서를 고르는 거예요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim — merge it yourself
    {
      type: "reveal",
      narr: t(E,
        "Feel the fusion. Pick x, then pick y (y gets doubled), and fuse — over and over. Try different orders and watch the final power. Can you reach the best?",
        "융합을 직접 느껴봐요. x 를 고르고 y 를 고르면 (y 가 두 배) 융합돼요 — 계속 반복. 순서를 바꿔가며 마지막 파워를 봐요. 최고 기록에 닿을 수 있나요?"),
      content: (
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
            🔮 {t(E, "Fusion Lab — x + 2·y, until one orb is left", "융합 실험실 — x + 2·y, 구슬 하나 남을 때까지")}
          </div>
          <MagicOrbsMergeSim E={E} />
        </div>),
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Fusing x, y makes x + 2·y — the second orb is doubled. So the bigger an orb is, the more we want it in the doubled (y) slot, again and again.",
        "x, y 를 융합하면 x + 2·y — 두 번째 구슬이 두 배예요. 그러니 큰 구슬일수록 두 배가 되는 y 자리에 여러 번 들어가면 좋아요."),
      question: t(E,
        "Two orbs [3, 1], one fusion. What is the maximum final power?",
        "구슬 두 개 [3, 1], 한 번 융합. 마지막 파워의 최댓값은?"),
      options: [
        t(E, "5  (x=3, y=1 → 3 + 2·1)", "5  (x=3, y=1 → 3 + 2·1)"),
        t(E, "7  (x=1, y=3 → 1 + 2·3)", "7  (x=1, y=3 → 1 + 2·3)"),
        t(E, "8  (3 + 1, then double)", "8  (3 + 1 후 두 배)"),
      ],
      correct: 1,
      explain: t(E,
        "Put the bigger orb (3) in the doubled y slot: 1 + 2·3 = 7. Doubling the larger value always wins.",
        "큰 구슬(3)을 두 배가 되는 y 자리에: 1 + 2·3 = 7. 큰 값을 두 배로 만드는 게 항상 유리해요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps) — slow vs fast plan, then progressive
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "Trying every possible fusing order explodes — with n orbs there are factorially many orders, hopeless past a handful. The fast way spots the pattern: sort ascending, and the k-th smallest orb is worth value × 2^k.",
        "가능한 모든 융합 순서를 다 해보면 폭발해요 — 구슬 n 개면 순서가 팩토리얼로 많아, 조금만 커져도 불가능. 빠른 방법은 규칙을 찾아요: 오름차순 정렬하면 k 번째로 작은 구슬은 값 × 2^k 만큼 기여해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every fusing order", "느림: 모든 융합 순서 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "The number of orders grows factorially. Even n = 15 is already billions of tries. Times out.",
                     "순서의 개수가 팩토리얼로 늘어요. n = 15 만 돼도 벌써 수십억 번. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: sort ascending, weight by 2^k", "빠름: 오름차순 정렬 후 2^k 가중치")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort once, then one pass: coefficient 1, 2, 4, 8, … for the smallest, next, next. Total O(n log n).",
                     "한 번 정렬한 뒤 한 번 훑기: 가장 작은 구슬부터 계수 1, 2, 4, 8, … 총 O(n log n).")}
              </div>
            </div>
          </div>

          {/* worked coefficient example */}
          <div style={{ marginTop: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: C.dim, marginBottom: 6, letterSpacing: 0.3 }}>
              {t(E, "WHY 2^k — [1, 2, 1] sorted → [1, 1, 2]", "왜 2^k — [1, 2, 1] 정렬 → [1, 1, 2]")}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: C.text }}>
              <span style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 6, padding: "2px 8px" }}>1 × 1 = 1</span>
              <span style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 6, padding: "2px 8px" }}>1 × 2 = 2</span>
              <span style={{ background: "#ddd6fe", border: "1px solid #a78bfa", borderRadius: 6, padding: "2px 8px", fontWeight: 800 }}>2 × 4 = 8</span>
              <span style={{ color: "#5b21b6", fontWeight: 800, alignSelf: "center" }}>→ 11 ✓</span>
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
              {t(E, "The biggest orb ends up doubled the most times, so it earns the biggest coefficient — that's why we sort ascending.",
                   "가장 큰 구슬이 두 배를 가장 여러 번 받아서 가장 큰 계수를 얻어요 — 그래서 오름차순으로 정렬해요.")}
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMagicOrbsSections(E),
    },
  ];
}
