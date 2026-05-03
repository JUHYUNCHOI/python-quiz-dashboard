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
        "Farmer John has plants that grow at different rates! We need to find the earliest day when the plants reach a specific height ranking. Let's dig in! 🌱",
        "파머 존의 식물들은 다른 속도로 자라! 식물들이 특정 키 순서에 도달하는 가장 빠른 날을 찾아야 해. 알아보자! 🌱"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌱</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>FJ Actually Farms</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N plants with initial heights h and growth rates a. Find min days d so that height ranking matches target t. Binary search on d!",
              "N개 식물, 초기 키 h와 성장률 a. 키 순서가 목표 t와 일치하는 최소 날 d를 찾아. d에 대해 이분 탐색!")}
          </div>
        </div>),
    },
    // 1-2: Quiz — height calculation
    {
      type: "quiz",
      narr: t(E,
        "Each plant's height on day d is: h_i + a_i * d. If a plant starts at height 2 with growth rate 3, after 2 days it's 2 + 3*2 = 8!",
        "d일 후 각 식물의 키는: h_i + a_i * d. 초기 키 2, 성장률 3이면, 2일 후 2 + 3*2 = 8!"),
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
        "Let's verify: plant with h=2, a=3, after 2 days. Enter the height!",
        "확인해보자: h=2, a=3인 식물, 2일 후 키를 입력해!"),
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
        "Binary search on day d! For each candidate d, compute all heights, sort them, and check if the ranking matches. O(N log N log D) total.",
        "날짜 d에 대해 이분 탐색! 후보 d마다 모든 키를 계산하고, 정렬해서 순서가 맞는지 확인. 총 O(N log N log D)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", marginBottom: 8 }}>
            {t(E, "Binary Search on Days", "날짜에 대한 이분 탐색")}
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
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
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getFjFarmsSections(E),
    },
  ];
}
