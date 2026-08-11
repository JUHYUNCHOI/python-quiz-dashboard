import { C, t } from "@/components/quest/theme";
import { getRectanglesWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { RectanglesSim } from "./sims";

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

    // [전] 연속 구간 나누기 (sim)
    {
      type: "reveal",
      label: t(E, "Split into groups", "연속 구간 나누기"),
      narr: t(E, "Since reds are adjacent, each blue covers a contiguous group — cost = (sum of widths) × (max height). Try splittings and see which is smallest.",
                 "빨강이 붙어 있으니 파랑 하나는 연속 구간을 덮어요 — 비용 = (폭 합) × (최고 높이). 여러 분할을 해보며 최소를 찾아요."),
      content: (<RectanglesSim E={E} />),
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
