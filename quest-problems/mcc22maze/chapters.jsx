import { C, t } from "@/components/quest/theme";
import { getMcc22MazeSections, Mcc22MazeConnectSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* 2026-09-11: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 죽은 복제본이었다(저장소 67곳 중 실제로 쓰는 건 3곳뿐).
   살아 있는 코드는 components.jsx 의 단계별 배열이다. 둘을 같이 두면 조용히 어긋난다 —
   실제로 오늘 입출력 방식을 고칠 때 이쪽만 옛 모양으로 남아 검사기에 걸렸다. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem  (title → I/O + sample → concept sim → quiz)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "An n × n grid of open (.) and blocked (#) cells. You move between adjacent OPEN cells. One operation: pick a whole row or column and smash every wall in it.\nFind the MINIMUM operations so the bottom-right corner becomes reachable from the top-left.",
        "좌상단에서 우하단까지 닿게 만드는 최소 조작 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udff0"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Maze</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Make the two corners reachable using as FEW row/column clears as possible.",
                "행/열 부수기를 최대한 적게 써서 두 모서리가 이어지게 만들어요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "n × n grid", "n × n 격자")}</b>
                  {t(E, " of open cells (.) and walls (#). You may walk between ", " — 통로(.) 와 벽(#). ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent open cells", "인접한 통로 칸")}</b>
                  {t(E, " (up/down/left/right).", " 사이를 상하좌우로 오가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "One operation", "조작 한 번")}</b>
                  {t(E, ": pick a whole ", ": 한 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "row or column", "행 또는 열")}</b>
                  {t(E, " and turn every wall in it into an open cell. Repeat as many times as you like.",
                        " 을 골라 그 안의 벽을 전부 통로로 바꿔요. 원하는 만큼 반복할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 조작 횟수")}</b>
                  {t(E, " so the bottom-right corner (n, n) becomes reachable from the top-left corner (1, 1).",
                        " 를 출력해요. 우하단 (n, n) 이 좌상단 (1, 1) 에서 도달 가능해지도록.")}
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
        "Read the input format and the official example. Both corners are always open, and the answer is one small number per test.",
        "입력 형식과 공식 예제를 봐요. 두 모서리는 항상 통로이고, 답은 테스트마다 작은 수 하나예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 개수")}</div>
              <div>• {t(E, "per test: ", "테스트마다: ")}<b>n</b>{t(E, ", then ", ", 그다음 ")}<b>n</b>{t(E, " grid rows of . and #", " 줄의 격자 (. 와 #)")}</div>
              <div>• {t(E, "corners (1,1) and (n,n) are always open (.)", "모서리 (1,1) 과 (n,n) 은 항상 통로 (.)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: T ≤ 100000, n ≤ 1000, and the total of all n² ≤ 1000000.",
                   "제약: T ≤ 100000, n ≤ 1000, 모든 n² 의 합 ≤ 1000000.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>2</div>
              <div>4</div>
              <div>..##</div>
              <div>#.##</div>
              <div>#..#</div>
              <div>##..</div>
              <div>3</div>
              <div>.#.</div>
              <div>.#.</div>
              <div>.#.</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 80 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>0</div>
              <div style={{ fontWeight: 800 }}>1</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Test 1 is already connected corner to corner → 0. In test 2 the middle column is all walls, splitting left from right; clear that one column → 1.",
              "테스트 1 은 이미 모서리끼리 이어져 있어요 → 0. 테스트 2 는 가운데 열이 전부 벽이라 좌우가 나뉘어요. 그 열 하나만 부수면 → 1.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Clear rows and columns yourself, and find the fewest that works.",
        "행과 열을 직접 부수면서 최소 몇 번이면 되는지 찾아봐요."),
      content: <Mcc22MazeConnectSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Your turn to think it through.",
        "이번엔 직접 생각해 볼 차례예요."),
      question: t(E,
        "Why can the answer NEVER be 3 or more?",
        "왜 정답이 절대 3 이상이 될 수 없을까요?"),
      options: [
        t(E, "Two clears — one row, one column — are always enough.",
             "행 하나 열 하나, 두 번이면 언제나 충분하기 때문이에요."),
        t(E, "The grid is always small enough to walk through.",
             "격자가 늘 걸어서 지날 만큼 작기 때문이에요."),
        t(E, "There are at most 2 walls in any grid.",
             "격자에 벽이 최대 2개뿐이기 때문이에요."),
      ],
      correct: 0,
      explain: t(E,
        "Right. The top row holds (1,1), the last column holds (n,n), and they meet at the top-right corner — so that L-shaped corridor links both, 2 always works, and the answer is only ever 0, 1, or 2.",
        "맞아요. 맨 윗 행에는 (1,1) 이, 맨 오른쪽 열에는 (n,n) 이 들어 있고 둘은 오른쪽 위 모서리에서 만나요. 그래서 ㄱ자 통로 하나로 두 모서리가 이어지고, 정답은 항상 0, 1, 2 중 하나예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code  (slow-vs-fast plan → progressive code)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "First see why the slow way explodes, then find a faster one.",
        "느린 방법이 왜 터지는지 보고, 더 빠른 길을 찾아봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every subset of rows/columns", "느림: 행/열의 모든 조합 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "2^(2n) combinations, each re-searching the whole maze. Hopeless.",
                     "2^(2n) 가지 조합마다 미로 전체를 다시 살펴봐야 해요. 불가능해요.")}
              </div>
            </div>
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                🤔 {t(E, "So how do we solve it? Let's think.", "그럼 어떻게 해결하면 될까요? 생각해 봐요.")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {t(E,
                  "We already know the answer can only be 0, 1, or 2.\nSo we do not have to search — we only have to ask three questions in order.",
                  "정답이 0, 1, 2 중 하나라는 건 이미 알아냈어요.\n그러니 찾아 헤맬 필요가 없어요 — 물어볼 것이 세 가지뿐이에요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: just three questions", "빠름: 물어볼 것은 세 가지")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E, "① already connected? → 0.  ② any single row or column clear connects? → 1.  ③ otherwise → 2.",
                     "① 이미 이어졌나? → 0.  ② 행 하나·열 하나로 이어지나? → 1.  ③ 아니면 → 2.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22MazeSections(E),
    },
  ];
}
