import { C, t } from "@/components/quest/theme";
import { getBuyMilkSections, getBuyMilkWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { NormalizeSim, GreedySim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeBuyMilkCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBuyMilkCh1(E) {
  return [
    // 1-1: Title + Mission reveal
    // 1-1: Title + Mission reveal
    {
      type: "reveal",
      narr: t(E,
        "Farmer John has N deals. Deal i sells 2^(i-1) buckets of milk for a_i moonies, prices strictly increasing. For each query x, find the minimum cost to buy at least x buckets.",
        "농부 존이 N 개의 거래를 제안해요. 거래 i 는 2^(i-1) 통의 우유를 a_i 무니에 팔고, 가격은 엄격히 증가해요. 각 쿼리 x 에 대해 최소 x 통을 사는 최소 비용을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥛</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Purchasing Milk</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2026 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "For each query x,\noutput the minimum cost to buy at least x buckets of milk.",
                "각 쿼리 x 에 대해 최소 x 통의 우유를 사는 최소 비용을 출력.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Deal ", "거래 ")}
                  <b style={{ color: "#d97706" }}>i</b>
                  {t(E, " sells ", " 는 ")}
                  <b style={{ color: "#0891b2" }}>2^(i-1)</b>
                  {t(E, " buckets at price ", " 통을 ")}
                  <b style={{ color: "#0891b2" }}>a_i</b>
                  {t(E, ". Prices strictly increase: a_1 < a_2 < ... < a_N.", " 무니에 팔아요. 가격은 엄격 증가: a_1 < a_2 < ... < a_N.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each deal can be taken any non-negative number of times.",
                        "각 거래는 0 번 이상 원하는 만큼 살 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each of the Q queries x, print the minimum cost to get ", "각 쿼리 x 에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "at least x buckets", "최소 x 통")}</b>
                  {t(E, ".", " 을 사는 최소 비용을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },


    // 1-2: Sample reveal
    {
      type: "reveal",
      narr: t(E,
        "Sample 1: N=2, prices [10, 15]. So 1 bucket = 10, 2 buckets = 15. Query x=6: 3 copies of the 2-bucket deal = 45. Query x=7: same 3 copies of 2-bucket + 1 copy of 1-bucket = 55.",
        "예제 1: N=2, 가격 [10, 15]. 1 통 = 10, 2 통 = 15. 쿼리 x=6: 2 통짜리 3 번 = 45. 쿼리 x=7: 2 통짜리 3 번 + 1 통짜리 1 번 = 55."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>
              📥 {t(E, "Sample 1 — Input", "예제 1 — 입력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`2 4
10 15
1
2
6
7`}
            </pre>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 10 }}>
              📤 {t(E, "Sample 1 — Output", "예제 1 — 출력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`10
15
45
55`}
            </pre>
          </div>
          <div style={{ background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            {t(E, "Notice for x=6: three of the 2-bucket deal cost 3 × 15 = 45.\nSix of the 1-bucket deal would cost 60.\nThe bigger deal is cheaper per bucket.",
                 "x=6 을 봐요. 2통짜리 3번이면 3 × 15 = 45 예요.\n1통짜리 6번은 60 이에요.\n큰 거래가 통당 더 싸요.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100,000 (= 10⁵)</div>
              <div>1 ≤ Q ≤ 10,000 (= 10⁴)</div>
              <div>1 ≤ a<sub>i</sub> ≤ 10⁹ <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(strictly increasing)", "(순증가)")}</span></div>
              <div>1 ≤ x ≤ 10⁹ <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "· use 64-bit ints", "· 64비트 정수 필요")}</span></div>
            </div>
          </div>
        </div>),
    },

    // [승] 먼저 물어봐요 — 큰 딜이 통당 더 쌀 수 있다는 걸 학생이 눈치채게

    // 1-3: Quiz — per-bucket price
    {
      type: "quiz",
      narr: t(E,
        "Prices are strictly increasing, but bucket counts double. Which deal could have the lowest price per bucket?",
        "가격은 엄격 증가하지만 통 수는 2 배씩 늘어요. 통당 단가가 가장 낮은 거래는 어떤 거래일 수 있을까?"),
      question: t(E,
        "If a = [10, 15], what is the price per bucket for each deal?",
        "a = [10, 15] 일 때 각 거래의 통당 단가는?"),
      options: [
        t(E, "Deal 1: 10/bucket · Deal 2: 7.5/bucket — bigger deal is cheaper",
            "거래 1: 10/통 · 거래 2: 7.5/통 — 큰 거래가 더 쌈"),
        t(E, "Deal 1: 10/bucket · Deal 2: 15/bucket — smaller deal is always best",
            "거래 1: 10/통 · 거래 2: 15/통 — 작은 거래가 항상 최선"),
      ],
      correct: 0,
      explain: t(E,
        "Right. Deal 2 sells 2 buckets for 15, so 7.5 per bucket — cheaper than Deal 1's 10 per bucket. Greedy 'always use the smallest deal' would be wrong.",
        "맞아요. 거래 2 는 2통에 15 니까 통당 7.5 예요.\n거래 1 의 통당 10 보다 싸요.\n그래서 '항상 작은 거래만 쓰면 된다' 는 생각은 틀려요."),
    },


    // [전] 정규화 — 핵심 ①. 전엔 코드 말풍선 안에만 있어서 학생이 코드에서 처음 만났음
    //   (선생님 2026-08-29 검토). c[i] = min(a[i], 2·c[i-1]) 를 페이지에서 먼저 발견하게.
    {
      type: "reveal",
      narr: t(E,
        "Before any code: a big deal can be a bad deal. Let's find the cheapest price for each block first.",
        "코드 전에 — 큰 딜이 오히려 손해일 수 있어요. 블록마다 가장 싼 값을 먼저 구해요."),
      content: (<NormalizeSim E={E} />),
    },

    // [전] 또 물어봐요 — 필요한 양보다 더 사도 쌀 수 있다 (그리디의 '올림' 갈래)

    // 1-5: Quiz — over-buy idea
    {
      type: "quiz",
      narr: t(E,
        "Sometimes buying MORE buckets than you need is cheaper. Why?",
        "필요한 양보다 더 많이 사는 게 더 쌀 수도 있어요. 왜?"),
      question: t(E,
        "When can over-buying (getting > x buckets) be cheaper than buying exactly x?",
        "정확히 x 통을 사는 것보다 더 많이 사는 게 쌀 때는 언제?"),
      options: [
        t(E, "When one big deal already covers x and is cheaper than combining smaller deals",
            "큰 거래 하나로 x 를 덮을 수 있고, 그게 작은 거래들을 합한 것보다 쌀 때"),
        t(E, "Never — buying more is always more expensive",
            "절대 — 더 많이 사면 항상 더 비쌈"),
      ],
      correct: 0,
      explain: t(E,
        "Exactly. The minimum cost answer might over-shoot x. So at each deal, we also try 'buy one extra of this size and stop'.",
        "맞아요. 최소 비용이 x 통을 넘겨 사는 경우일 수도 있어요.\n그래서 블록마다 '올림해서 사고 끝내기' 도 같이 따져봐요."),
    },


    // [전] 그리디 — 핵심 ②. 큰 블록부터 올림/내림 두 갈래만 비교하면 끝
    {
      type: "reveal",
      narr: t(E,
        "Now bigger blocks are never worse. So walk from the biggest block down, comparing just two choices.",
        "이제 큰 블록이 손해가 아니에요. 그러니 큰 블록부터 훑으며 두 갈래만 비교해요."),
      content: (<GreedySim key="greedy5" E={E} x={5} />),
    },

    // [전] 한 번 더 — 이번엔 '올림해서 사고 끝내기' 가 실제로 이기는 x.
    //   바로 앞 퀴즈에서 '더 사는 게 쌀 수도 있다' 고 배웠는데 x=5 에선 그 갈래가
    //   이기지 않아서 학생이 확인할 데가 없었음 (선생님 2026-09-03 검토).
    {
      type: "reveal",
      narr: t(E,
        "Same deals, x = 7 this time. Watch the 'round up and stop' branch actually win.",
        "같은 딜로 이번엔 x = 7 이에요.\n'올림해서 사고 끝내기' 갈래가 실제로 이기는 걸 봐요."),
      content: (<GreedySim key="greedy7" E={E} x={7} />),
    },

    // [결] 배운 걸로 직접 확인 — 시뮬과 다른 x 로 (x=9 → 50)

    // 1-4: Input — sample tracing
    {
      type: "input",
      narr: t(E,
        "Same deals as the sims: a = [10, 15, 20, 45]. This time x = 9 — do it yourself.",
        "시뮬과 같은 딜이에요. a = [10, 15, 20, 45].\n이번엔 x = 9 예요. 직접 해봐요."),
      question: t(E,
        "a=[10,15,20,45], deal sizes 1,2,4,8. Min cost for x=9?",
        "a=[10,15,20,45], 거래 크기 1,2,4,8. x=9 의 최소 비용?"),
      hint: t(E,
        "Use the block prices you found: 10, 15, 20, 40.\nStart from the biggest block and compare the two choices.",
        "아까 구한 블록 값을 써요. 10, 15, 20, 40 이에요.\n제일 큰 블록부터 두 갈래를 비교해 봐요."),
      answer: 50,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeBuyMilkCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
/* 코드로 넘어가기 전 다리 — 두 시뮬에서 본 것을 코드 변수 이름으로 옮겨 적는 카드.
   왜 생겼나 (선생님 2026-09-03 검토): Ch2 가 시뮬 → 코드로 곧장 점프해서
   c / rem / cost / ans 라는 이름을 학생이 코드에서 처음 만났음.
   photoshoot25 의 Plan 카드와 같은 자리·같은 모양. */
function BuyMilkPlan({ E }) {
  const box = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", wordBreak: "keep-all" };
  const Insight = ({ icon, head, body, color }) => (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", ...box, borderLeft: `4px solid ${color}` }}>
      <span style={{ fontSize: 20, lineHeight: 1.2 }}>{icon}</span>
      <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "#334155", textWrap: "balance" }}>
        <b style={{ color: "#0f172a" }}>{head}</b><br />{body}
      </div>
    </div>
  );
  const codeTag = (s) => (
    <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#b45309", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 5, padding: "0 5px" }}>{s}</code>
  );
  const Line = ({ n, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 7 }}>
      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 999, background: "#d97706", color: "#fff", fontSize: 11.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: "#334155", wordBreak: "keep-all", textWrap: "balance" }}>{children}</div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 620, margin: "0 auto" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>
        🧩 {t(E, "What the two sims told us", "두 시뮬에서 알아낸 것")}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <Insight icon="💰" color="#d97706"
          head={t(E, "A big deal can be a bad deal.", "큰 딜이 오히려 손해일 수 있다.")}
          body={t(E, <>So each block gets its own real price {codeTag("c[i]")} — the deal, or two half-blocks, whichever is cheaper.</>,
                     <>그래서 블록마다 진짜 값 {codeTag("c[i]")} 를 따로 구해요.<br />딜 값과 반쪽 블록 두 개 값 중 싼 쪽이에요.</>)} />
        <Insight icon="🧱" color="#0891b2"
          head={t(E, "At each block there are only two choices.", "블록마다 고를 건 두 가지뿐이다.")}
          body={t(E, <>Round up and stop, or take the floor and carry {codeTag("rem")} down to smaller blocks.</>,
                     <>올림해서 사고 끝내거나,<br />내림만큼만 사고 남은 {codeTag("rem")} 을 작은 블록으로 넘겨요.</>)} />
        <Insight icon="📉" color="#059669"
          head={t(E, "One pass, big to small — no searching.", "큰 것부터 한 번만 훑으면 끝 — 탐색이 없다.")}
          body={t(E, <>Every block gives one candidate; {codeTag("ans")} just keeps the smallest.</>,
                     <>블록마다 후보가 하나씩 나와요.<br />{codeTag("ans")} 는 그중 제일 작은 값만 들고 있으면 돼요.</>)} />
      </div>

      <div style={{ ...box, background: "#f8fafc", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 9 }}>
          ⚙️ {t(E, "So the code does this, in order", "그래서 코드는 이 순서로 해요")}
        </div>
        <Line n={1}>{t(E, <>Read the deal prices {codeTag("a")}.</>, <>딜 가격 {codeTag("a")} 를 읽어요.</>)}</Line>
        <Line n={2}>{t(E, <>Build {codeTag("c")}: {codeTag("c[i] = min(a[i], 2*c[i-1])")} — the first sim.</>,
                         <>{codeTag("c")} 를 만들어요. {codeTag("c[i] = min(a[i], 2*c[i-1])")} — 첫 시뮬이 한 일이에요.</>)}</Line>
        <Line n={3}>{t(E, <>Per query: {codeTag("rem = x")}, {codeTag("cost = 0")}, {codeTag("ans = ∞")}.</>,
                         <>쿼리마다 {codeTag("rem = x")}, {codeTag("cost = 0")}, {codeTag("ans = 무한대")} 로 시작해요.</>)}</Line>
        <Line n={4}>{t(E, <>Big block → small block: the round-up candidate goes into {codeTag("ans")}, then buy the floor and update {codeTag("cost")} and {codeTag("rem")}.</>,
                         <>큰 블록부터 작은 블록까지 훑어요.<br />올림 후보를 {codeTag("ans")} 에 넣고,<br />내림만큼 사서 {codeTag("cost")} 와 {codeTag("rem")} 을 갱신해요.</>)}</Line>
        <Line n={5}>{t(E, <>Print {codeTag("ans")}.</>, <>{codeTag("ans")} 를 출력해요.</>)}</Line>
      </div>

      <div style={{ ...box, background: "#fffbeb", borderColor: "#fcd34d", fontSize: 12.5, lineHeight: 1.7, color: "#92400e", wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, <>The table in the second sim was exactly this: one row per block, the “round up → cost” column is the {codeTag("ans")} candidate, the “take / carry” column is {codeTag("cost")} and {codeTag("rem")}.</>,
             <>두 번째 시뮬의 표가 바로 이거예요.<br />한 줄이 블록 하나고, ‘올림하면 값’ 칸이 {codeTag("ans")} 후보,<br />‘내림 / 넘김’ 칸이 {codeTag("cost")} 와 {codeTag("rem")} 이에요.</>)}
      </div>
    </div>
  );
}

export function makeBuyMilkCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code: the same two ideas, written with the names the code uses.",
        "코드 전에 — 방금 본 두 생각을 코드가 쓰는 이름으로 다시 적어봐요."),
      content: (<BuyMilkPlan E={E} />),
    },
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getBuyMilkWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "No recursion! Normalize the block prices, then sweep big→small per query.  Each part lights up with a bubble.",
          "재귀 없이! 블록 가격을 정규화하고, 쿼리마다 큰 블록→작은 블록으로 훑어요.  각 부분이 밝아지며 말풍선이 떠요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />),
      };
    })(),
  ];
}
