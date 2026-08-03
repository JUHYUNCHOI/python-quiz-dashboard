import { C, t } from "@/components/quest/theme";
import { getPhotoshoot25Sections, getPhotoshoot25Walk } from "./components";
import { PhotoWindowSim, PhotoUpdateSim } from "./sims";
import { CodeWalk } from "@/components/quest/CodeWalk";

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
    /* [전-1] 퀴즈 3 개(느린 비용 / 영향받는 창 수 / 최대 단조) → 시뮬 2 개로 교체.
       셋 다 "말로 물어보고 말로 답" 이었는데, 이 문제는 답이 통째로 그림이다.
       (선생님: "퀴즈는 없는게 좋은것 같아", "설명은 시뮬로") */
    {
      type: "reveal",
      narr: t(E,
        "First — what IS a photo's score?  Slide the K x K square everywhere and keep the best.",
        "먼저 — 사진 점수가 뭔지부터.  K x K 정사각형을 다 밀어보고 제일 좋은 걸 기억해요."),
      content: (<PhotoWindowSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E,
        "Now the key: when ONE cow gets prettier, which photos change?  Only the ones containing her — and their top-left corners form a rectangle.",
        "이제 핵심: 소 한 마리가 예뻐지면 어떤 사진이 바뀔까?  그 소가 들어간 사진만 — 그리고 그 사진들의 왼쪽위가 직사각형을 이뤄요."),
      content: (<PhotoUpdateSim E={E} />),
    },
    // 1-4b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  Grid size, then Q updates.  Print the best window after each one.",
        "데이터는 어떻게 들어올까?  격자 크기, 그 다음 Q 개 업데이트.  매번 최고 창을 출력."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— grid size, camera size", "— 격자 크기, 카메라 크기")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of updates", "— 업데이트 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>r c v</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— set cell (r,c) to beauty v", "— 칸 (r,c) 를 아름다움 v 로")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats Q times", "↑ 이 줄이 Q 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "After each update, the largest sum among all K×K windows (Q lines).",
                  "각 업데이트 후, 모든 K×K 창 중 최대 합 (Q 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 500</div>
              <div>1 ≤ K ≤ min(N, 25)</div>
              <div>1 ≤ Q ≤ 30,000 (= 3 × 10⁴)</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "1 ≤ v ≤ 10⁶  ·  updates only increase a cell's value", "1 ≤ v ≤ 10⁶  ·  업데이트는 값을 올리기만 함")}</div>
            </div>
          </div>
        </div>),
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
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getPhotoshoot25Walk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Keep each window's sum in S. On each update, touch only the windows containing (r,c).  Each part lights up with a bubble.",
          "각 창의 합을 S 에 유지. 업데이트마다 (r,c) 를 포함하는 창만 손대요.  각 부분이 밝아지며 말풍선이 떠요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />),
      };
    })(),
  ];
}
