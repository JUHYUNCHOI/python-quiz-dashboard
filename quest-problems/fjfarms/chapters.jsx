import { C, t } from "@/components/quest/theme";
import { getFjFarmsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "h = list(map(int, input().split()))",
  "a = list(map(int, input().split()))",
  "t = list(map(int, input().split()))",
  "",
  "lo, hi = 0, 10**18",
  "while lo < hi:",
  "    mid = (lo + hi) // 2",
  "    cur = [h[i] + a[i] * mid for i in range(N)]",
  "    order = sorted(range(N), key=lambda i: cur[i])",
  "    if order == t:",
  "        hi = mid",
  "    else:",
  "        lo = mid + 1",
  "",
  "print(lo)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N plants. Each plant i starts at height h[i] and grows by a[i] per day, so on day d its height is h[i] + a[i]·d.\nFind the SMALLEST day d on which the plants — sorted by height — match the given target order t.",
        "FJ에게 N개 식물이 있어요. i번 식물은 키 h[i]에서 시작해서 하루에 a[i]씩 자라요. 그러므로 d일에는 키가 h[i] + a[i]·d 가 되어요.\n식물을 키 순으로 정렬한 결과가 목표 순서 t와 같아지는 가장 빠른 날 d를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🌱</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>FJ Actually Farms</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On day d, plant i has height ", "d일에 i번 식물의 키는 ")}
                  <b style={{ color: "#0891b2" }}><code style={{ background: "#cffafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i] + a[i] · d</code></b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "target order t", "목표 순서 t")}</b>
                  {t(E, " — sorting the plants by height (lowest to highest) on the answer day must give exactly this order.",
                        " — 정답 날에 식물들을 키 오름차순으로 정렬했을 때 정확히 이 순서가 나와야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest day d ≥ 0", "가장 작은 d ≥ 0")}</b>
                  {t(E, " on which the height ranking matches t.",
                        " 를 출력해요. 키 순서가 t와 같아지는 첫 날.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz — height calculation
    {
      type: "quiz",
      narr: t(E,
        "Each plant's height on day d is: h_i + a_i * d.\nIf a plant starts at height 2 with growth rate 3, after 2 days it's 2 + 3*2 = 8!", "d일 후 각 식물의 키는: h_i + a_i * d. 초기 키 2, 성장률 3이면, 2일 후 2 + 3*2 = 8!"),
      question: t(E,
        "Plant: h=2, a=3. After 2 days, height = 2 + 3×2 = ?",
        "식물: h=2, a=3. 2일 후 키 = 2 + 3×2 = ?"),
      options: [
        t(E, "6", "6"),
        t(E, "8", "8"),
        t(E, "12", "12"),
      ],
      correct: 1,
      explain: t(E,
        "2 + 3 × 2 = 2 + 6 = 8! The plant grows 3 units per day for 2 days.",
        "2 + 3 × 2 = 2 + 6 = 8! 식물이 하루에 3씩 2일 동안 자라."),
    },
    // 1-3: Input — confirm understanding
    {
      type: "input",
      narr: t(E,
        "Let's verify: plant with h=2, a=3, after 2 days. Enter the height!", "확인해보자: h=2, a=3인 식물, 2일 후 키를 입력해요!"),
      question: t(E,
        "h=2, a=3, d=2\nHeight = h + a × d = ?",
        "h=2, a=3, d=2\n키 = h + a × d = ?"),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh2(E, lang = "py") {
  return [
    // 2-1: Approach reveal
    {
      type: "reveal",
      narr: t(E,
        "Binary search on day d!\nFor each candidate d, compute all heights, sort them, and check if the ranking matches.\nO(N log N log D) total.", "날짜 d에 대해 이분 탐색! 후보 d마다 모든 키를 계산하고, 정렬해서 순서가 맞는지 확인. 총 O(N log N log D)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", marginBottom: 8 }}>
            {t(E, "Binary Search on Days", "날짜에 대한 이분 탐색")}
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Binary search on d (0 to 10^18):\n• For candidate d, compute height_i = h_i + a_i × d\n• Sort plants by height → get ranking\n• If ranking matches target → try smaller d (hi = mid)\n• If not → need larger d (lo = mid + 1)\n\nTime: O(N log N × log D)",
              "d에 대해 이분 탐색 (0 ~ 10^18):\n• 후보 d에서 height_i = h_i + a_i × d 계산\n• 키 기준 정렬 → 순위 확인\n• 순위가 목표와 같으면 → 더 작은 d 시도 (hi = mid)\n• 다르면 → 더 큰 d 필요 (lo = mid + 1)\n\n시간: O(N log N × log D)")}
          </div>
          <div style={{
            marginTop: 10, background: "#ecfdf5", borderRadius: 10,
            padding: 10, border: "2px solid #6ee7b7",
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#059669", marginBottom: 4 }}>
              {t(E, "Why binary search works", "이분 탐색이 되는 이유")}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
              fontWeight: 700, color: C.text, lineHeight: 1.8,
            }}>
              {t(E,
                "Once the ranking is achieved at day d, it stays valid for all d' >= d (growth rates are constant).",
                "d일에 순위가 달성되면, d' >= d인 모든 날에도 유효해 (성장률이 일정하니까).")}
            </div>
          </div>
        </div>),
    },
    // 2-2: Full code reveal
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getFjFarmsSections(E),
    },
  ];
}
