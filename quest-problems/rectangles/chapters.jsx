import { C, t } from "@/components/quest/theme";
import { getRectanglesWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CodeBlock } from "@/components/quest/shared";
import { RectanglesSim, WhyContiguousSim, WhyCostSim } from "./sims";

const A = "#f97316";

/* ================================================================
   SOLUTION CODE (구간 분할 DP — 최소 파랑 총면적)
   ================================================================ */
export const SOLUTION_CODE = [
  "n, k = map(int, input().split())",
  "h = [0] * n",
  "w = [0] * n",
  "for i in range(n):",
  "    h[i], w[i] = map(int, input().split())",
  "if k > n:",
  "    k = n",
  "INF = float('inf')",
  "dp = [[INF] * (n + 1) for _ in range(k + 1)]",
  "dp[0][0] = 0",
  "for kk in range(1, k + 1):",
  "    for i in range(1, n + 1):",
  "        sw = 0",
  "        mh = 0",
  "        for j in range(i, 0, -1):",
  "            sw += w[j - 1]",
  "            mh = max(mh, h[j - 1])",
  "            if dp[kk - 1][j - 1] < INF:",
  "                dp[kk][i] = min(dp[kk][i], dp[kk - 1][j - 1] + sw * mh)",
  "print(min(dp[kk][n] for kk in range(1, k + 1)))",
];


/* 샘플 입출력 — 구체 숫자 INPUT/OUTPUT + 한 줄씩 (cowsplits/chipxchg 모양). */
function RectanglesSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 2
1 1
2 2
1 2`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`8`}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 2</code> — {t(E, "N = 3 red rects, K = 2 blue rects allowed", "N = 3 (빨강 사각형 수), K = 2 (파랑 최대 수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 1</code> — {t(E, "rect 1: height 1, width 1", "사각형 1: 높이 1, 폭 1")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2 2</code> — {t(E, "rect 2: height 2, width 2", "사각형 2: 높이 2, 폭 2")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2</code> — {t(E, "rect 3: height 1, width 2", "사각형 3: 높이 1, 폭 2")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fdba74" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>8</code>{t(E, " = smallest total blue area. Group [1,2] → 2×3 = 6, group [3] → 1×2 = 2, total 8.", " = 최소 파랑 총면적. 구간 [1,2] → 2×3 = 6, 구간 [3] → 1×2 = 2, 합 8.")}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: N ≤ 200 · K ≤ 10⁹ · each h, w ≤ 1000. Area can be large → use 64-bit.",
             "📌 제약: N ≤ 200 · K ≤ 10⁹ · 각 h, w ≤ 1000. 면적이 커질 수 있어 → 64비트 필요.")}
      </div>
    </div>
  );
}

/* 정리 — 발견한 걸 한 판단으로 (cowsplits CowSplitsPlan 모양). */
function RectanglesRecap({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#9a3412", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole idea, at a glance", "핵심 아이디어 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Each red inside exactly one blue → blues split the reds into contiguous groups.",
             "각 빨강이 정확히 한 파랑 안 → 파랑들이 빨강을 연속 구간으로 분할.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "One blue covers a contiguous group", "파랑 하나 = 연속 구간 하나")}
             res={t(E, "(Σw) × (max h)", "(폭합) × (최고높이)")} col="#2563eb" bg="#eff6ff" />
        <Row q={t(E, "Split ≤ K groups, minimize total area", "≤ K개 구간으로 나눠 총면적 최소")}
             res="dp[k][i]" col="#f97316" bg="#fff7ed" />
        <Row q={t(E, "K huge? cap it — N groups is enough", "K가 커도? N개 넘으면 캡")}
             res="K = min(K, N)" col="#059669" bg="#ecfdf5" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeRectanglesCh1 — 라벨 + 전부 reveal (퀴즈/입력 없음)
   문제(도입) → 샘플 입출력 → 연속 구간 나누기(sim) → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeRectanglesCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "N red rectangles sit side by side on the x-axis. Cover them with at most K blue rectangles — each red inside exactly one blue — so the total blue area is smallest.",
        "x축에 나란히 붙은 빨강 사각형 N개를 파랑 사각형 최대 K개로 덮어요 — 각 빨강은 정확히 한 파랑 안 — 파랑 총면적이 가장 작게."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"▬"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Rectangles</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P5</div>
          </div>

          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Cover all N red rectangles with at most K blue ones so that each red is inside exactly one blue, minimizing the total blue area.",
                "빨강 사각형 N개를 파랑 최대 K개로 덮되 각 빨강이 정확히 한 파랑 안에 들어가게, 파랑 총면적을 최소화.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N red rectangles", "빨강 사각형 N개")}</b>
                  {t(E, " side by side on the x-axis — rect ", " 가 x축에 나란히 붙어 있어요 — 사각형 ")}
                  <code style={{ background: "#fde68a", padding: "1px 5px", borderRadius: 4 }}>i</code>
                  {t(E, " has height ", " 는 높이 ")}
                  <code style={{ background: "#fde68a", padding: "1px 5px", borderRadius: 4 }}>hᵢ</code>
                  {t(E, ", width ", ", 폭 ")}
                  <code style={{ background: "#fde68a", padding: "1px 5px", borderRadius: 4 }}>wᵢ</code>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cover them with at most ", "이들을 최대 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "K blue rectangles", "파랑 사각형 K개")}</b>
                  {t(E, " — each red must sit inside ", " 로 덮되 — 각 빨강은 ")}
                  <b>{t(E, "exactly one blue.", "정확히 한 파랑 안.")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "출력: ")}
                  <b style={{ color: "#059669" }}>{t(E, "smallest possible total blue area.", "가능한 최소 파랑 총면적.")}</b>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
            {t(E, "📌 N ≤ 200 · K ≤ 10⁹ · each h, w ≤ 1000.", "📌 N ≤ 200 · K ≤ 10⁹ · 각 h, w ≤ 1000.")}
          </div>
        </div>),
    },

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "A concrete example — the rectangles and the answer we must print.",
                 "구체적인 예 하나 — 사각형들과, 우리가 출력해야 할 답."),
      content: (<RectanglesSample E={E} />),
    },

    /* [전] ① 왜 '붙어 있는 덩어리' 인가 — 전엔 이 문장이 근거 없이 한 줄로 나왔다
       (선생님 2026-09-03: "하나도 이해 안되게끔 되어 있어"). */
    {
      type: "reveal",
      label: t(E, "Why a run", "왜 붙은 덩어리?"),
      narr: t(E, "First question: can one blue skip over a red in the middle?",
                 "첫 질문 — 파랑 하나가 가운데 빨강을 건너뛸 수 있을까요?"),
      content: (<WhyContiguousSim E={E} />),
    },

    /* [전] ② 파랑 하나의 값 — 폭은 합, 높이는 최댓값. 그리고 남는 빈칸(손해)까지. */
    {
      type: "reveal",
      label: t(E, "What it costs", "파랑 하나의 값"),
      narr: t(E, "Next: how big does one blue have to be? Width and height behave differently.",
                 "다음 — 파랑 하나는 얼마나 커야 할까요? 폭과 높이가 다르게 정해져요."),
      content: (<WhyCostSim E={E} />),
    },

    /* [전] ③ 그래서 나눠보면 줄어든다 — 기존 시뮬 */
    {
      type: "reveal",
      label: t(E, "Split into groups", "나눠보기"),
      narr: t(E, "So try cutting the row in different places and compare the totals.",
                 "그럼 줄을 여기저기서 잘라보고 총합을 비교해봐요."),
      content: (<RectanglesSim E={E} />),
    },

    /* [전] ④ 능동 — 직접 계산해 보기. 전엔 퀴즈·입력 스텝이 하나도 없었다. */
    {
      type: "input",
      label: t(E, "Your turn", "직접"),
      narr: t(E, "Your turn — what does the group [②③] cost on its own?",
                 "직접 해봐요 — 구간 [②③] 하나의 값은 얼마일까요?"),
      question: t(E, "② is 2×2, ③ is 1×2 (height × width). Area of one blue over [②③]?",
                    "② 는 2×2, ③ 은 1×2 예요 (높이 × 폭). [②③] 를 덮는 파랑 하나의 면적은?"),
      hint: t(E, "Width = 2 + 2. Height = the taller of 2 and 1.",
                 "폭 = 2 + 2. 높이 = 2 와 1 중 큰 쪽."),
      answer: 8,
    },

    /* [전] ⑤ K = min(K, N) 이유 — 전엔 "N개 넘으면 캡" 한 줄이 전부였다. */
    {
      type: "reveal",
      label: t(E, "K is huge", "K 가 클 때"),
      narr: t(E, "One more thing: K can be up to 10^9, but N is only 200. Doesn't that break everything?",
                 "하나만 더 — K 는 10억까지 가는데 N 은 200뿐이에요. 큰일 아닐까요?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all", maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#9a3412", marginBottom: 12, textWrap: "balance" }}>
            🤔 {t(E, "K up to 10^9 — but N is only 200", "K 는 10억까지, 그런데 N 은 200")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              t(E, <>Cutting the row of <b>N</b> reds into pieces gives <b>at most N</b> pieces —<br />one per red. You can't make more.</>,
                   <>빨강 <b>N</b>개짜리 줄을 잘라봐야 조각은 <b>많아야 N개</b>예요.<br />하나씩 떼는 게 끝이라 더는 못 만들어요.</>),
              t(E, <>So a K bigger than N buys you nothing.<br />Extra blues would have to cover <b>zero</b> reds — and every red already has one.</>,
                   <>그래서 K 가 N 보다 커도 쓸 데가 없어요.<br />남는 파랑은 빨강을 <b>하나도</b> 안 덮게 되는데, 이미 다 덮여 있으니까요.</>),
              t(E, <>Just clamp it first: <b>K = min(K, N)</b>.<br />Now K ≤ 200 and the table stays small.</>,
                   <>그래서 먼저 잘라둬요 — <b>K = min(K, N)</b>.<br />이러면 K ≤ 200 이라 표가 작게 유지돼요.</>),
            ].map((body, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff7ed",
                border: "1.5px solid #fdba74", borderRadius: 12, padding: "11px 14px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#ea580c",
                  color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "#334155", textWrap: "balance" }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E, "Everything boils down to one idea: split reds into ≤ K contiguous groups.",
                 "결국 하나로 정리돼요: 빨강을 ≤ K개 연속 구간으로 분할."),
      content: (<RectanglesRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeRectanglesCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeRectanglesCh2(E, lang = "py") {
  const w = getRectanglesWalk(E, lang);
  return [
    /* [결 앞] 쉬운 첫 코드 → 한계 → 빠른 코드. 전엔 이 흐름이 통째로 없고
       바로 3중 루프 DP 가 나왔다 (선생님 2026-09-03: "하나도 이해 안되게끔"). */
    {
      type: "reveal",
      label: t(E, "First idea", "쉬운 생각"),
      narr: t(E, "Before any clever code — what is the most obvious thing we could do?",
                 "똑똑한 코드 전에 — 제일 뻔한 방법은 뭘까요?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all", maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#9a3412", marginBottom: 12, textWrap: "balance" }}>
            🐢 {t(E, "Just try every way to cut", "그냥 자르는 방법을 전부 해보기")}
          </div>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12,
            padding: "12px 15px", fontSize: 13, lineHeight: 1.8, color: "#334155", textWrap: "balance" }}>
            {t(E, <>Cutting the row is the whole problem.<br />
                   With <b>n</b> reds there are <b>n−1</b> gaps between them,<br />
                   and at each gap we either <b>cut</b> or <b>don't</b>.<br />
                   So: try all of those, add up each one, keep the smallest.</>,
                 <>줄을 자르는 게 문제의 전부였죠.<br />
                   빨강이 <b>n</b>개면 사이의 틈은 <b>n−1</b>개고,<br />
                   틈마다 <b>자른다 / 안 자른다</b> 둘 중 하나예요.<br />
                   그럼 그걸 전부 해보고, 각각 더해서, 제일 작은 걸 고르면 돼요.</>)}
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800 }}>
            {[["① | ② ③", "1 + 8 = 9"], ["① ② | ③", "6 + 2 = 8"], ["① | ② | ③", "1 + 4 + 2 = 7 ✗ K=2"], ["① ② ③", "10"]].map(([a, b], i) => (
              <span key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "5px 9px", color: "#475569" }}>
                {a} <span style={{ color: "#94a3b8" }}>→</span> {b}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      type: "reveal",
      label: t(E, "Slow code", "느린 코드"),
      narr: t(E, "Here it is, straight from that sentence — one bit per gap, 0 = don't cut, 1 = cut.",
                 "그 말을 그대로 옮긴 코드예요 — 틈마다 비트 하나, 0 이면 안 자르고 1 이면 자르기."),
      content: (
        <div style={{ padding: 16 }}>
          <CodeBlock lines={[
        "n, k = map(int, input().split())",
        "h = [0] * n",
        "w = [0] * n",
        "for i in range(n):",
        "    h[i], w[i] = map(int, input().split())",
        "",
        "best = float('inf')",
        "# 자를 자리 n-1 군데를, 자를지 말지 전부 해보기",
        "for mask in range(1 << (n - 1)):",
        "    groups = 1",
        "    total = 0",
        "    sw, mh = w[0], h[0]",
        "    for i in range(1, n):",
        "        if mask >> (i - 1) & 1:        # 여기서 자른다",
        "            total += sw * mh           # 지금까지 모은 덩어리를 값으로",
        "            groups += 1",
        "            sw, mh = w[i], h[i]        # 새 덩어리 시작",
        "        else:                          # 안 자르고 이어 붙인다",
        "            sw += w[i]",
        "            mh = max(mh, h[i])",
        "    total += sw * mh                   # 마지막 덩어리",
        "    if groups <= k:",
        "        best = min(best, total)",
        "",
        "print(best)",
      ]} lang="py" />
        </div>
      ),
    },
    {
      type: "reveal",
      label: t(E, "Too slow", "한계"),
      narr: t(E, "It is correct. But look at how fast the number of cuts grows.",
                 "답은 맞아요. 그런데 자르는 방법의 가짓수가 얼마나 빨리 커지는지 봐요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all", maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#b91c1c", marginBottom: 12 }}>
            ⏱ {t(E, "2^(n−1) ways to cut", "자르는 방법 = 2^(n−1) 가지")}
          </div>
          <div style={{ display: "grid", gap: 5 }}>
            {[["n = 10", "512"], ["n = 20", "약 52만"], ["n = 30", "약 5억"], ["n = 200", "2^199 — 우주가 끝나도 못 셈"]].map(([a, b], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 12px",
                borderRadius: 8, background: i === 3 ? "#fef2f2" : "#f8fafc",
                border: `1.5px solid ${i === 3 ? "#fca5a5" : "#e2e8f0"}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800,
                color: i === 3 ? "#b91c1c" : "#475569" }}>
                <span>{a}</span><span>{t(E, b.replace("약 ", "~").replace("만", "0k").replace("억", "00M").replace(" — 우주가 끝나도 못 셈", " — hopeless"), b)}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
            padding: "11px 14px", fontSize: 13, lineHeight: 1.8, color: "#1e3a8a", textWrap: "balance" }}>
            {t(E, <><b>So how do we fix it?</b><br />
                   Look at what the slow code repeats: for every cut pattern it re-adds the same front part over and over.<br />
                   If we <b>remember the best answer for each front part</b>, we never redo it.</>,
                 <><b>그럼 어떻게 고칠까요?</b><br />
                   느린 코드가 뭘 반복하는지 봐요 — 자르는 방법마다 <b>앞부분을 계속 다시 더해요</b>.<br />
                   앞부분의 <b>최선을 한 번 구해서 적어두면</b>, 다시 안 해도 돼요.</>)}
          </div>
        </div>
      ),
    },
    {
      type: "reveal",
      label: t(E, "The table", "적어둘 표"),
      narr: t(E, "That is the whole trick. Here is what we write down.",
                 "그게 전부예요. 무엇을 적어둘지 정해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all", maxWidth: 540, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#5b21b6", marginBottom: 12 }}>
            📓 {t(E, "dp[kk][i] — what it means", "dp[kk][i] 가 뜻하는 것")}
          </div>
          <div style={{ background: "#faf5ff", border: "1.5px solid #c4b5fd", borderRadius: 12,
            padding: "12px 15px", fontSize: 13.5, lineHeight: 1.9, color: "#334155", textAlign: "center", textWrap: "balance" }}>
            {t(E, <><b>dp[kk][i]</b> = the smallest total area<br />to cover the <b>first i reds</b> using <b>kk blues</b>.</>,
                 <><b>dp[kk][i]</b> = <b>앞에서부터 i개</b>의 빨강을<br /><b>파랑 kk개</b>로 덮을 때의 최소 총면적.</>)}
          </div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              t(E, <>To fill one cell, ask: <b>where did the last blue start?</b><br />Try every start j — that blue covers reds j…i.</>,
                   <>한 칸을 채우려면 물어요 — <b>마지막 파랑이 어디서 시작했지?</b><br />시작점 j 를 다 해봐요. 그 파랑은 j…i 를 덮어요.</>),
              t(E, <>Cost = <b>dp[kk−1][j−1]</b> (the front part, already solved)<br />+ (widths of j…i added) × (tallest of j…i).</>,
                   <>값 = <b>dp[kk−1][j−1]</b> (앞부분, 이미 풀어놨음)<br />+ (j…i 폭의 합) × (j…i 중 제일 높은 것).</>),
              t(E, <>Take the smallest over all j. That's the cell.<br />The front part is looked up, never recomputed — that's the speedup.</>,
                   <>j 를 다 해보고 제일 작은 걸 그 칸에 적어요.<br />앞부분은 <b>꺼내 쓰기만</b> 하고 다시 안 계산해요 — 그게 빨라진 이유예요.</>),
            ].map((body, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff",
                border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "11px 14px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#7c3aed",
                  color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "#334155", textWrap: "balance" }}>{body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#15803d", textWrap: "balance" }}>
            {t(E, "2^199 → about 200 × 200 × 200 steps. Now it fits.",
                 "2^199 → 200 × 200 × 200 번쯤. 이제 돌아가요.")}
          </div>
        </div>
      ),
    },
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read input, cap K, fill the partition DP (group cost = Σw × max-h), then take the minimum.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → K 캡 → 구간 분할 DP 채우기(구간 비용 = 폭합×최고높이) → 최소 고르기."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#f97316" />
      ),
    },
  ];
}
