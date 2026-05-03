import { C, t } from "@/components/quest/theme";
import { getCandyCaneSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "heights = list(map(int, input().split()))",
  "",
  "for _ in range(M):",
  "    h = int(input())  # candy cane height",
  "    bottom = 0",
  "    for i in range(N):",
  "        if heights[i] > bottom:",
  "            eat = min(heights[i], h) - bottom",
  "            if eat > 0:",
  "                heights[i] += eat",
  "                bottom += eat",
  "        if bottom >= h:",
  "            break",
  "",
  "for x in heights:",
  "    print(x)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCandyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows love candy canes! Each candy cane hangs from above, and cows eat from the bottom up to their height. Let's figure out how this works! 🍬",
        "소들은 캔디 케인을 좋아해! 캔디 케인은 위에서 걸려 있고, 소들은 아래부터 자기 키만큼 먹어. 어떻게 동작하는지 알아보자! 🍬"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍬</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Candy Cane Feast</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N cows, M candy canes. Each cane hung from top. Cows eat bottom up to their height, then grow by amount eaten!",
              "N마리 소, M개 캔디 케인. 캔디는 위에서 매달려 있어. 소들은 아래부터 자기 키까지 먹고, 먹은 만큼 키가 커져!")}
          </div>
        </div>),
    },
    // 1-2: Quiz — single cow eating
    {
      type: "quiz",
      narr: t(E,
        "A cow has height 3 and faces a candy cane of height 6. The candy hangs from 0 to 6. The cow can reach up to height 3. How much does it eat?",
        "키 3인 소가 높이 6짜리 캔디 케인을 만났어. 캔디는 0~6에 있어. 소는 높이 3까지 닿아. 얼마나 먹을까?"),
      question: t(E,
        "Cow height = 3, candy cane height = 6. How much does the cow eat?",
        "소 키 = 3, 캔디 높이 = 6. 소가 얼마나 먹어?"),
      options: [
        t(E, "6 (eats everything)", "6 (다 먹음)"),
        t(E, "3 (eats up to its height)", "3 (자기 키까지 먹음)"),
        t(E, "0 (can't reach)", "0 (닿지 못함)"),
      ],
      correct: 1,
      explain: t(E,
        "The cow can only reach up to height 3, so it eats the portion from 0 to 3 = 3 units!",
        "소는 높이 3까지만 닿으니까 0~3 부분인 3만큼 먹어!"),
    },
    // 1-3: Input — multi-cow scenario
    {
      type: "input",
      narr: t(E,
        "Cow heights = [3, 2, 5], one candy cane of height 6. Cow1 (h=3) eats 0→3, candy remaining is 3→6. Cow2 (h=2) can't reach 3! Cow3 (h=5) eats 3→5. How much does cow2 eat from this candy?",
        "소 키 = [3, 2, 5], 캔디 높이 6. 소1(키3)이 0→3 먹고, 남은 캔디는 3→6. 소2(키2)는 3에 못 닿아! 소3(키5)은 3→5 먹어. 소2가 이 캔디에서 먹는 양은?"),
      question: t(E,
        "Cow heights [3,2,5], candy height 6.\nAfter cow1 eats 0→3, bottom=3.\nCow2 height=2, bottom=3.\nHow much does cow2 eat?",
        "소 키 [3,2,5], 캔디 높이 6.\n소1이 0→3 먹고 bottom=3.\n소2 키=2, bottom=3.\n소2가 먹는 양은?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCandyCh2(E, lang = "py") {
  return [
    // 2-1: Approach reveal
    {
      type: "reveal",
      narr: t(E,
        "The approach: simulate each candy cane. Track the bottom (where eating starts). Each cow eats from bottom up to min(height, candy_top). Time complexity: O(N × M).",
        "접근법: 각 캔디 케인을 시뮬레이션해. 먹기 시작하는 위치(bottom)를 추적해. 각 소는 bottom부터 min(키, 캔디 꼭대기)까지 먹어. 시간 복잡도: O(N × M)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Simulation Approach", "시뮬레이션 접근법")}
          </div>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each candy cane:\n• Track bottom = 0 (where next cow starts eating)\n• Each cow eats min(cow_height, candy_top) - bottom\n• Cow grows by amount eaten\n• bottom moves up\n\nTime: O(N × M)",
              "각 캔디마다:\n• bottom = 0 (다음 소가 먹기 시작하는 위치) 추적\n• 각 소는 min(소_키, 캔디_꼭대기) - bottom 만큼 먹음\n• 소 키가 먹은 만큼 커짐\n• bottom이 올라감\n\n시간: O(N × M)")}
          </div>
        </div>),
    },
    // 2-2: Full code reveal
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCandyCaneSections(E),
    },
  ];
}
