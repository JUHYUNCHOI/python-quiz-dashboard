import { C, t } from "@/components/quest/theme";
import { getPhotoshoot25Sections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makePhotoshoot25Ch1 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshoot25Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N x N field of cows, all starting with beauty 0. Farmer John takes K x K square photos. After each beauty update, output the best possible photo.",
        "N x N 들판에 소들 (처음 모두 아름다움 0). 농부는 K x K 정사각형 사진을 찍어요. 매번 한 마리 아름다움이 늘어날 때, 가장 멋진 사진의 점수를 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📸"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#5b21b6" }}>Photoshoot (2025)</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "After each beauty update, print the maximum sum over every K x K window of the grid.",
                "매번 한 칸의 아름다움이 늘어날 때마다 모든 K x K 윈도우 중 최대 합을 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#5b21b6" }}>{t(E, "N x N grid", "N x N 격자")}</b>
                  {t(E, " of cows (1 ≤ N ≤ 500). Each cow has a beauty value, all starting at 0.",
                       " 의 소들 (1 ≤ N ≤ 500). 각 소는 아름다움 값을 가지며 처음엔 모두 0.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A camera shot is any ", "사진은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K x K square", "K x K 정사각형")}</b>
                  {t(E, " (1 ≤ K ≤ min(N, 25)). Its score = sum of beauties inside.",
                       " (1 ≤ K ≤ min(N, 25)). 점수 = 안에 든 아름다움의 합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are Q updates (Q ≤ 30000). Each gives a single cow ", "Q 번의 업데이트 (Q ≤ 30000). 매번 한 마리 소에게 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "a higher beauty value", "더 높은 아름다움")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "After each update, print the ", "각 업데이트 후 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum K x K window sum", "K x K 윈도우의 최대 합")}</b>
                  {t(E, ".", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: Numbers-first warm-up — compute K×K window sums on a tiny grid before the big-O talk
    {
      type: "reveal",
      narr: t(E,
        "Before the big-O talk, let's slide a 2×2 photo over a tiny 3×3 grid and add up real numbers.",
        "빅오 얘기 전에, 작은 3×3 격자 위에서 2×2 사진을 옮겨가며 실제 숫자를 더해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              🔢 {t(E, "K×K window sum — with numbers", "K×K 창 합 — 숫자로")}
            </div>
            <div style={{ marginBottom: 6 }}>
              {t(E, "Grid N=3, photo size K=2. Beauty:", "격자 N=3, 사진 크기 K=2. 아름다움:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, background: "#fff", border: "1px solid #c4b5fd", borderRadius: 6, padding: "6px 10px", display: "inline-block", lineHeight: 1.5 }}>
              <div>1&nbsp;&nbsp;2&nbsp;&nbsp;0</div>
              <div>0&nbsp;&nbsp;3&nbsp;&nbsp;1</div>
              <div>4&nbsp;&nbsp;0&nbsp;&nbsp;2</div>
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, marginBottom: 2 }}>
              {t(E, "All 4 windows (a 2×2 slides to 4 spots on a 3×3):", "창은 4 개 (3×3 위에서 2×2 가 4 군데로 미끄러짐):")}
            </div>
            <div style={{ paddingLeft: 8, borderLeft: "3px solid #c4b5fd", display: "flex", flexDirection: "column", gap: 3 }}>
              <div>{t(E, "top-left 2×2: ", "왼쪽 위 2×2: ")}1+2+0+3 = <b>6</b></div>
              <div>{t(E, "top-right 2×2: ", "오른쪽 위 2×2: ")}2+0+3+1 = <b>6</b></div>
              <div style={{ color: "#7c3aed", fontWeight: 700 }}>{t(E, "bottom-left 2×2: ", "왼쪽 아래 2×2: ")}0+3+4+0 = 7 ← {t(E, "biggest!", "최대!")}</div>
              <div>{t(E, "bottom-right 2×2: ", "오른쪽 아래 2×2: ")}3+1+0+2 = <b>6</b></div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
              👉 {t(E, "Best photo = the largest sum among all K×K windows = ", "가장 멋진 사진 = 모든 K×K 창 합 중 최댓값 = ")}<b style={{ color: "#15803d" }}>7</b>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
                {t(E, "An update raises one cell — some window sums change, and we reprint the max.",
                     "업데이트는 한 칸을 키워요 — 일부 창 합이 바뀌고, 최댓값을 다시 출력해요.")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz — naive cost
    {
      type: "quiz",
      narr: t(E,
        "Naive idea: after each update, recompute every K x K window sum from scratch. Why is that too slow?",
        "단순 아이디어: 매 업데이트마다 모든 K x K 윈도우 합을 처음부터 계산. 왜 느릴까?"),
      question: t(E,
        "If we recompute every window sum from scratch after each of Q updates, roughly how many operations?",
        "Q 번 업데이트마다 모든 윈도우 합을 처음부터 계산하면 대략 몇 연산?"),
      options: [
        t(E, "About Q · N² · K² ≈ 30000 · 250000 · 625 — way too slow", "약 Q · N² · K² ≈ 30000 · 250000 · 625 — 너무 느림"),
        t(E, "About Q · K² ≈ 30000 · 625 — very fast", "약 Q · K² ≈ 30000 · 625 — 아주 빠름"),
      ],
      correct: 0,
      explain: t(E,
        "Right — recomputing all (N-K+1)² windows × K² cells each, Q times, is far over the time limit. We need a smarter update.",
        "맞아 — (N-K+1)² 개 윈도우 × K² 칸을 Q 번 다시 계산하면 시간 초과. 더 똑똑한 업데이트가 필요해."),
    },
    // 1-3: Quiz — which windows are affected
    {
      type: "quiz",
      narr: t(E,
        "When one cow's beauty changes, only some windows change. How many?",
        "한 마리 소의 값이 바뀔 때 몇 개의 윈도우가 영향을 받을까?"),
      question: t(E,
        "Updating cow at (r,c) changes the sum of how many K x K windows (at most)?",
        "(r,c) 갱신 시 영향받는 K x K 윈도우 수는 최대 몇 개?"),
      options: [
        t(E, "All windows in the grid", "격자의 모든 윈도우"),
        t(E, "At most K · K = K²", "최대 K · K = K²"),
        t(E, "Exactly N - K + 1", "정확히 N - K + 1"),
      ],
      correct: 1,
      explain: t(E,
        "A window contains (r,c) only if its top-left (i,j) satisfies r-K+1 ≤ i ≤ r and c-K+1 ≤ j ≤ c — at most K choices for i and K for j.",
        "(r,c) 를 포함하는 윈도우는 좌상단 (i,j) 가 r-K+1 ≤ i ≤ r, c-K+1 ≤ j ≤ c 를 만족 — i 후보 K 개, j 후보 K 개."),
    },
    // 1-4: Quiz — monotone max
    {
      type: "quiz",
      narr: t(E,
        "Each update only INCREASES a beauty (problem guarantees v > old). What does that say about the global max?",
        "각 업데이트는 아름다움을 늘리기만 해요 (v > 이전값 보장). 전체 최대는?"),
      question: t(E,
        "Since beauties only increase, the maximum window sum across the whole grid is...",
        "아름다움이 늘기만 하니까 전체 격자의 최대 윈도우 합은...")
      ,
      options: [
        t(E, "Non-decreasing — never goes down", "단조 비감소 — 절대 줄지 않음"),
        t(E, "Could go up or down", "오를 수도 내릴 수도 있음"),
      ],
      correct: 0,
      explain: t(E,
        "Beauties only go up, so every window sum only goes up. The global max is non-decreasing — we just compare new sums against cur_max.",
        "아름다움이 늘기만 하니 모든 윈도우 합도 늘기만 함. 전체 최대는 비감소 — 새로 갱신된 합만 cur_max 와 비교하면 끝."),
    },
    // 1-5: Input — count affected windows
    {
      type: "input",
      narr: t(E,
        "Sample 1: N=4, K=2. Update at (3,1). How many K x K windows contain (3,1)?",
        "예제 1: N=4, K=2. (3,1) 갱신. 이 칸을 포함하는 K x K 윈도우 수는?"),
      question: t(E,
        "N=4, K=2, cell (3,1): how many 2 x 2 windows contain it?",
        "N=4, K=2, 칸 (3,1): 포함하는 2 x 2 윈도우 수는?"),
      hint: t(E,
        "Top-left i ranges over max(1,r-K+1)..min(r,N-K+1). Same for j.",
        "좌상단 i 범위: max(1,r-K+1)..min(r,N-K+1). j 도 동일."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makePhotoshoot25Ch2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshoot25Ch2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Maintain S[i][j] = sum of the K x K window with top-left (i,j). On each update, only touch the ≤ K² windows that contain (r,c), and bump cur_max as needed.",
        "S[i][j] = 좌상단 (i,j) 인 K x K 윈도우 합. 매 업데이트마다 (r,c) 를 포함하는 ≤ K² 개 윈도우만 갱신하고 cur_max 비교."),
      sections: getPhotoshoot25Sections(E),
    },
  ];
}
