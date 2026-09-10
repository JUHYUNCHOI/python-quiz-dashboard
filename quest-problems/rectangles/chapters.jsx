import { C, t } from "@/components/quest/theme";
import { getRectanglesWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { RectanglesSim, WhyContiguousSim, WhyCostSim, WhyTableSim, DPTableFillSim, RectStage, AutoRectStage } from "./sims";

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
{`4 2
1 1
2 2
1 2
2 1`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`11`}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>4 2</code> — {t(E, "N = 4 red rects, K = 2 blue rects allowed", "N = 4 (빨강 사각형 수), K = 2 (파랑 최대 수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 1</code> — {t(E, "rect 1: height 1, width 1", "사각형 1: 높이 1, 폭 1")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2 2</code> — {t(E, "rect 2: height 2, width 2", "사각형 2: 높이 2, 폭 2")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2</code> — {t(E, "rect 3: height 1, width 2", "사각형 3: 높이 1, 폭 2")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2 1</code> — {t(E, "rect 4: height 2, width 1", "사각형 4: 높이 2, 폭 1")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fdba74" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>11</code>{t(E, " = smallest total blue area. Group [1] → 1×1 = 1, group [2,3,4] → 2×5 = 10, total 11.", " = 최소 파랑 총면적. 구간 [1] → 1×1 = 1, 구간 [2,3,4] → 2×5 = 10, 합 11.")}
        </div>
        {/* 2026-09-10 — 공식 샘플을 **지우지 않았다.** 여기 그대로 남긴다.
            가르치는 예제만 빨강 4개로 올린 이유는 sims.jsx 의 REDS 주석에 적어뒀다:
            3개면 자르는 방법이 3가지뿐이라 손으로 10초면 다 세어져서,
            "그래서 표는 왜 만드나" 가 화면에서 안 섰다. */}
        <div style={{ marginTop: 8, paddingTop: 7, borderTop: "1px dashed #fdba74", fontSize: 11.5, color: "#9a3412", lineHeight: 1.75 }}>
          {t(E, <>The official contest sample is one rect shorter — <code>3 2 / 1 1 / 2 2 / 1 2</code> → <b>8</b>.<br />
                 We added a fourth so there is more to think about.</>,
               <>대회 원문 예제는 빨강이 하나 적어요 — <code>3 2 / 1 1 / 2 2 / 1 2</code> → <b>8</b>.<br />
                 여기서는 하나 더 붙여 4개로 연습해요.</>)}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: N ≤ 200 · K ≤ 10⁹ · each h, w ≤ 1000. Areas add up to something huge.",
             "📌 제약: N ≤ 200 · K ≤ 10⁹ · 각 h, w ≤ 1000. 면적을 다 더하면 아주 커져요.")}
      </div>
    </div>
  );
}

/* 정리 — 발견한 걸 한 판단으로 (cowsplits CowSplitsPlan 모양). */
function RectanglesRecap({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#9a3412", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole idea, at a glance", "핵심 아이디어 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Each red inside exactly one blue → blues split the reds into contiguous groups.",
             "각 빨강이 정확히 한 파랑 안 → 파랑들이 빨강을 연속 구간으로 분할.")}
      </div>
      {/* 2026-09-08 — 선생님: "난 아직도 핵심을 모르겠는데? 갑자기 왜 코드가 나오지?"
          3자 검토로 원인 둘을 찾았다.
          ① 여기 마지막 줄이 "표를 채워서 최소값 고르기" 를 예고하는데, 다음에 실제로 나오는 건
             **완전탐색**이다. 예고와 실물이 어긋나서 "갑자기" 로 느껴졌다.
             게다가 "표" 는 다섯 쪽 뒤에야 처음 설명되는 말이라 스포일러이기도 했다.
          ② 1~8쪽 어디에도 **"손으로는 못 한다"** 가 없었다. 학생은 6쪽에서 손으로 답까지 구했다.
             손으로 되는데 왜 코드가 필요한지 아무도 말해주지 않았다.
          → 핵심을 한 문장으로 못박고, 코드가 필요한 이유를 여기서 말한다.
             "표" 얘기는 빼서 13쪽에서 스스로 발견하게 남긴다. */}
      {/* 2026-09-08 선생님: "이것도 이해 안됨" (기호표를 보시고)
          전엔 "질문 → 기호" 행 세 줄이었다. 7쪽에서와 같은 병이다 —
          이 quest 는 내내 그림으로 보여주다가 정리에서만 갑자기 기호로 돌아갔다.
          정리는 **본 것을 다시 보여주는 자리**지 기호로 압축하는 자리가 아니다.
          → 우리가 실제로 고른 답(① | ②③④ = 1 + 10 = 11)을 그림으로 다시 보여준다.
            (폭합)×(최고높이)는 그림 안 라벨이 이미 말해준다. */}
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9a3412", textAlign: "center",
          marginBottom: 8, wordBreak: "keep-all" }}>
          {t(E, "This was the answer — 2 blues, total 11.", "우리가 고른 답이 이거였어요 — 파랑 2개, 합쳐서 11.")}
        </div>
        <RectStage groups={[[0], [1, 2, 3]]} />
      </div>

      {/* 핵심 한 문장 — 이 쪽 라벨이 "핵심 아이디어 한눈에" 인데 정작 핵심을 말한 적이 없었다. */}
      <div style={{ maxWidth: 480, margin: "14px auto 0", background: "#fff7ed",
        border: "2px solid #f97316", borderRadius: 12, padding: "13px 16px", textAlign: "center",
        fontSize: 13.5, fontWeight: 800, color: "#9a3412", lineHeight: 1.8,
        wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, <>So the whole problem is this:<br />
              <b>cut the row into at most K pieces</b>, and make the total area smallest.</>,
             <>그러니까 이 문제는 이거예요 —<br />
              <b>줄을 최대 K조각으로 자르고</b>, 총면적을 가장 작게.</>)}
      </div>

      {/* 코드가 필요한 이유. 여기가 없어서 "갑자기 왜 코드가 나오지" 가 됐다. */}
      <div style={{ maxWidth: 480, margin: "10px auto 0", background: "#f8fafc",
        border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "11px 15px", textAlign: "center",
        fontSize: 12.5, color: "#475569", lineHeight: 1.85, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, <>Four reds took eight tries — and the top two differed by <b>1</b>.<br />
              <b>N goes up to 200.</b> From here the computer does it.</>,
             <>빨강 4개도 여덟 번을 따져봤고, 1등과 2등은 <b>1 차이</b>였어요.<br />
              그런데 <b>N 은 200까지</b> 가요. 여기서부터는 컴퓨터가 해요.</>)}
      </div>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "First, the most obvious way — try every cut →", "먼저 제일 뻔한 방법부터 — 전부 잘라보기 →")}
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
        "Cover N reds with at most K blues — smallest total area.",
        "빨강 N개를 파랑 최대 K개로 덮어요. 총면적이 가장 작게."),
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

    /* 배운 규칙(폭 합 × 최고 높이)을 **바로** 직접 써보는 자리.

       2026-09-08 에 순서를 바꿨다. 전에는 비교표(아래 '나눠보기')가 먼저 나왔는데,
       그 표 안에 [②③] = 8 이 이미 적혀 있었다. 답을 보여준 다음에 "직접 해봐요" 라고
       물은 것이다. 배운 직후에 묻고, 표는 그다음에 본다. */
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

    /* [전] ③ 그래서 나눠보면 줄어든다 — 기존 시뮬 */
    {
      type: "reveal",
      label: t(E, "Split into groups", "나눠보기"),
      narr: t(E, "So try cutting the row in different places and compare the totals.",
                 "그럼 줄을 여기저기서 잘라보고 총합을 비교해봐요."),
      content: (<RectanglesSim E={E} />),
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
          {/* 2026-09-08 선생님: "뭔가 오래걸린다는건지는 알겠는데 **밑에 글이 머리에 안들어와**"
              전엔 여기가 문단 세 개였다. 이 quest 는 내내 그림으로 보여주다가
              여기서만 갑자기 글로 설명했다. 그리고 학생도 같은 쪽을 짚었다 —
              마지막 문단의 "표가 작게 유지돼요" 는 **표가 다섯 쪽 뒤에야 처음 나오는데** 쓴 말이다.
              → 그림 하나로 보여주고, 문장은 한 줄만 남긴다. "표" 얘기는 뺀다. */}
          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9a3412", textAlign: "center",
              marginBottom: 8, wordBreak: "keep-all" }}>
              {t(E, <>Reds are 4. Give yourself 6 blues — can you use them all?</>,
                   <>빨강이 4개예요. 파랑을 6개 준다면, 다 쓸 수 있을까요?</>)}
            </div>
            <RectStage groups={[[0], [1], [2], [3]]} />
            <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
              {["①", "②", "③", "④", "—", "—"].map((lab, i) => (
                <span key={i} style={{
                  fontSize: 11.5, fontWeight: 800, padding: "4px 10px", borderRadius: 999,
                  background: i < 4 ? "rgba(37,99,235,0.16)" : "#f1f5f9",
                  border: `1.5px solid ${i < 4 ? "#2563eb" : "#cbd5e1"}`,
                  color: i < 4 ? "#1d4ed8" : "#94a3b8",
                }}>
                  {t(E, `blue ${i + 1}`, `파랑 ${i + 1}`)} {lab}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #f97316",
              borderRadius: 12, padding: "12px 16px", textAlign: "center",
              fontSize: 13.5, fontWeight: 800, color: "#9a3412", lineHeight: 1.8,
              wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, <>Blues 5 and 6 have <b>nothing left to cover</b>.<br />
                    So K past N is wasted — <b>K = min(K, N)</b>.</>,
                   <>파랑 5번·6번은 <b>덮을 게 없어요.</b><br />
                    그러니 N 을 넘는 K 는 쓸 데가 없어요 — <b>K = min(K, N)</b>.</>)}
            </div>
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
          {/* 2026-09-08 선생님(네 번째 같은 지적): "이해 안돼. 읽기 싫어"
              전엔 글 네 줄 + `① | ② ③ → 1 + 8 = 9` 같은 기호 칩 네 개였다.
              기호 칩은 학생이 머릿속에서 그림으로 되돌려야 읽힌다 — 그 되돌리기를 우리가 해준다.
              **자르는 방법을 그대로 그림으로** 보여주고, 문장은 한 줄만 남긴다.
              2026-09-10 빨강이 4개가 되면서 방법이 4가지 → **8가지**가 됐다.
              여덟 장이 많아 보이지만 그게 이 쪽이 하려는 말이다 — "손으로 다 해보면 이만큼".
              그리고 규칙(K=2)을 어기는 쪽이 **더 싸다**는 것도 여기서 눈에 보인다. */}
          <div style={{ fontSize: 13, lineHeight: 1.8, color: "#334155", textAlign: "center",
            wordBreak: "keep-all", textWrap: "balance", marginBottom: 12 }}>
            {t(E, <>Cutting the row is the whole problem — so just <b>try every way to cut</b>.<br />
                   With 4 reds there are eight.</>,
                 <>줄을 자르는 게 문제의 전부였죠 — 그러니 <b>자르는 방법을 전부 해보면</b> 돼요.<br />
                   빨강이 4개면 방법은 여덟 가지예요.</>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 10, maxWidth: 520, margin: "0 auto" }}>
            {[
              /* 파랑 2개 이하 — 규칙에 맞는 넷 */
              { g: [[0, 1, 2, 3]],            sum: "12",                blues: 1, ok: true },
              { g: [[0], [1, 2, 3]],          sum: "1 + 10 = 11",       blues: 2, ok: true, best: true },
              { g: [[0, 1], [2, 3]],          sum: "6 + 6 = 12",        blues: 2, ok: true },
              { g: [[0, 1, 2], [3]],          sum: "10 + 2 = 12",       blues: 2, ok: true },
              /* 파랑 3개 이상 — 더 싸지만 K = 2 를 넘는다 */
              { g: [[0], [1], [2, 3]],        sum: "1 + 4 + 6 = 11",    blues: 3, ok: false },
              { g: [[0], [1, 2], [3]],        sum: "1 + 8 + 2 = 11",    blues: 3, ok: false },
              { g: [[0, 1], [2], [3]],        sum: "6 + 2 + 2 = 10",    blues: 3, ok: false },
              { g: [[0], [1], [2], [3]],      sum: "1 + 4 + 2 + 2 = 9", blues: 4, ok: false },
            ].map((c, i) => (
              <div key={i} style={{
                background: c.best ? "#ecfdf5" : c.ok ? "#fff" : "#fef2f2",
                border: `${c.best ? 2 : 1.5}px solid ${c.best ? "#059669" : c.ok ? "#e2e8f0" : "#fca5a5"}`,
                borderRadius: 12, padding: "8px 6px 10px" }}>
                <AutoRectStage small={0.52} big={0.72} groups={c.g} bad={!c.ok} />
                <div style={{ textAlign: "center", marginTop: 4, fontSize: 12.5, fontWeight: 800,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: c.best ? "#065f46" : c.ok ? "#475569" : "#991b1b" }}>
                  {c.sum}{c.best ? " ✓" : ""}
                </div>
                {!c.ok && (
                  <div style={{ textAlign: "center", marginTop: 2, fontSize: 11, fontWeight: 700,
                    color: "#991b1b", wordBreak: "keep-all" }}>
                    {t(E, `${c.blues} blues — but K = 2`, `파랑 ${c.blues}개 — K = 2 인데`)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, fontWeight: 800,
            color: "#065f46", wordBreak: "keep-all" }}>
            {t(E, "Smallest among the allowed ones → 11 (the next is 12)",
                 "규칙에 맞는 것 중 제일 작은 것 → 11 (그다음이 12)")}
          </div>
        </div>
      ),
    },
    /* 2026-09-08 — "느린 코드" 쪽을 **뺐다.** 선생님:
       "굳이 없어도 될것 같아. 그냥 많이 걸리니 어떻게 하자로 하면 될것 같아"

       그 쪽은 완전탐색 24줄을 CodeWalk 로 보여주고 곧바로 버리는 코드였다. 값이 없었다:
       · 학생은 그 아이디어를 **코드 없이도 이미 알았다** ("완전탐색까지는 내 생각과 같았다")
       · 그러면서 **바로 그 코드에서 완전히 막혔다**(난이도 5) — 비트 연산자를 안 배웠다
       · 최종 DP 코드와 공유하는 것도 없다. 읽고 버리는 24줄이었다
       이제 흐름이 이렇게 된다: 방법을 다 그려본다 → 근데 200개면 2^199 → 그럼 어떻게 고칠까.
       ⚠️ quest_problem_standard 의 "첫 코드 → 한계" 와는 어긋난다. 다만 여기선 첫 코드가
          이해를 돕기는커녕 막는 자리였다. 표준은 이야기를 위한 것이지 그 반대가 아니다. */
    {
      type: "reveal",
      label: t(E, "Too slow", "한계"),
      narr: t(E, "That works. But look at how fast the number of ways grows.",
                 "그렇게 하면 답은 나와요. 그런데 방법의 가짓수가 얼마나 빨리 커지는지 봐요."),
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
                   Look at what we keep repeating: for every way of cutting we re-add the same front part over and over.<br />
                   If we <b>remember the best answer for each front part</b>, we never redo it.</>,
                 <><b>그럼 어떻게 고칠까요?</b><br />
                   우리가 뭘 반복하고 있는지 봐요 — 자르는 방법마다 <b>앞부분을 계속 다시 더해요</b>.<br />
                   앞부분의 <b>최선을 한 번 구해서 적어두면</b>, 다시 안 해도 돼요.</>)}
          </div>
        </div>
      ),
    },
    /* 결-b 와 결-c 사이를 잇는다 (2026-09-07). 선생님:
       "전부다 브루트포스하다보면 시간이 오래걸린다고 하는데 그럼 그거 때문에
        어떻게 하면 될까 먼저 포인트를 알았으면 하는데"
       그전 흐름: "가짓수가 폭발한다(한계)" → 바로 "표를 채워봐요".
       표가 느림과 무슨 상관인지 아무도 말해주지 않았다. 그 사이를 채운다.
       포인트는 정답이 아니라 **원인**이다 — 같은 앞부분을 몇 번이고 다시 센다. */
    {
      type: "reveal",
      label: t(E, "The point", "포인트"),
      narr: t(E, "Before the fix — why is it slow, really?",
                 "고치기 전에요. 왜 느린 걸까요? 진짜 이유요."),
      content: (<WhyTableSim E={E} />),
    },
    {
      // 2026-09-07: 학생 둘이 "dp 표를 손으로 채워보고서야 이해했다" 고 했다.
      // 이름(dp)을 붙이기 **전에** 같은 숫자로 표를 직접 채워 보인다.
      type: "reveal",
      label: t(E, "Fill it by hand", "손으로 채워보기"),
      narr: t(E, "Before naming anything — let's fill the table ourselves.",
                 "이름을 붙이기 전에, 표를 직접 채워봐요."),
      content: (<DPTableFillSim E={E} />),
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
        "The code. Each bubble sits on the line it explains.",
        "코드예요. 말풍선이 설명하는 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#f97316" />
      ),
    },
  ];
}
