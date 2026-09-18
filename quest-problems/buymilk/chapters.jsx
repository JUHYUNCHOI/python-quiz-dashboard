import { Fragment } from "react";
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
        "Farmer John sells milk in bundles. Buy x buckets as cheaply as you can.",
        "농부 존이 우유를 묶음으로 팔아요. x 통을 제일 싸게 사요."),
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
                "질문이 하나 올 때마다,\nx 통 이상을 사는 가장 싼 값을 출력해요.")}
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
                  {t(E, ". Prices strictly increase: a_1 < a_2 < ... < a_N.", " 원에 팔아요.\n뒤 거래일수록 값이 꼭 더 비싸요 — a_1 < a_2 < ... < a_N 이에요.")}
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
                  {t(E, "For each of the Q queries x, print the minimum cost to get ", "x 가 하나 올 때마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "at least x buckets", "x 통 이상")}</b>
                  {t(E, ".", " 을 사는 가장 싼 값을 출력해요.")}
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
        "Sample 1. Look at what the input and the output look like.",
        "예제 1 이에요. 입력과 출력이 어떻게 생겼는지 봐요."),
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
            {/* ⚠️ 2026-09-16 — 두 번 고쳤다.
                1차: 끝문장 "큰 거래가 통당 더 싸요" 를 지웠다. **그래도 안 됐다.**
                학생: *"2쪽에서 3×15=45 vs 60 을 보여주는 순간 '큰 거래가 더 싸다'는 걸
                계산으로 이미 봐버려서, 3쪽 퀴즈는 생각해서 고른 게 아니라 방금 본 걸 그대로 골랐다."*
                → **결론 문장이 아니라 계산 자체가 스포일러였다.** 45 와 60 을 나란히 놓으면
                   문장을 지워도 답이 보인다. 그래서 비교를 통째로 뺐다.
                이 쪽이 할 일은 **입출력을 읽는 법**이고, 값 비교는 3쪽 퀴즈 몫이다. */}
            {/* ⚠️ 2026-09-17 세 번째 고침 — 선생님: *"마지막에 7통을 사야하는건데
                그게 왜 55가 나왔는지 모르겠어."*
                출력에 숫자가 넷인데 화면이 **하나도 설명하지 않고** 있었다.
                앞 두 번은 "45 를 어떻게 만드나" 를 **물어보기만** 했다 — 답은 어디에도 없었다.
                입출력 형식 쪽이 할 일은 **출력을 읽는 법을 알려주는 것**이다.
                ⚠️ 45 와 60 을 나란히 놓는 비교는 넣지 마라 — 3쪽 퀴즈를 죽인다(2026-09-16). */}
            {t(E, "Outputs come in query order: x = 1, 2, 6, 7 → 10, 15, 45, 55.\nTake the last one: 7 buckets. Buy deal 2 three times (6 buckets, 45), then deal 1 once (1 bucket, 10). That is 55.\nYou may mix deals, and buy the same deal many times.",
                 "출력은 질문 순서대로예요 — x = 1, 2, 6, 7 의 답이 10, 15, 45, 55 예요.\n마지막 55 를 봐요. 7통이에요.\n거래 2 를 세 번 사면 6통에 45, 여기에 거래 1 을 하나 더해 7통에 55 예요.\n거래를 섞어 사도 되고, 같은 거래를 여러 번 사도 돼요.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100,000 (= 10⁵)</div>
              <div>1 ≤ Q ≤ 10,000 (= 10⁴)</div>
              <div>1 ≤ a<sub>i</sub> ≤ 1,000,000,000 <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(strictly increasing)", "(뒤로 갈수록 커져요)")}</span></div>
              <div>1 ≤ x ≤ 1,000,000,000 <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "· use 64-bit ints", "· 답이 커서 큰 정수를 써요")}</span></div>
            </div>
          </div>
        </div>),
    },

    // [승] 먼저 물어봐요 — 큰 딜이 통당 더 쌀 수 있다는 걸 학생이 눈치채게

    // 1-3: Quiz — per-bucket price
    {
      type: "quiz",
      narr: t(E,
        "Deal 2 costs more — but it also gives more buckets.",
        "거래 2 는 더 비싼데, 통은 더 많이 줘요."),
      // ⚠️ 2026-09-17 선생님이 이 쪽을 보시고 *"못알아보겠어"*.
      //    네 가지가 겹쳐 있었다:
      //    ① `a = [10, 15]` 만 주고 **거래 1·2 가 각각 몇 통인지는 이 쪽에 없었다.**
      //       그게 없으면 7.5 를 계산할 수가 없다 — 앞 쪽으로 되돌아가야 했다.
      //    ② "통당 단가" — 초6 에게 어려운 말. "한 통에 얼마" 로.
      //    ③ 파란 바는 "제일 싼 건 어디?" 를 묻는데 문제는 "단가는?" 을 물었다. 서로 다른 질문.
      //    ④ 보기가 **계산 결과 + 결론**을 같이 줘서, 학생이 계산 안 하고 결론만 보고 골랐다.
      //    근거: feedback_screen_must_not_rely_on_memory · feedback_no_invented_terms
      question: t(E,
        "Deal 1 gives 1 bucket for 10.\nDeal 2 gives 2 buckets for 15.\nSo how much is ONE bucket from each?",
        "거래 1 은 1통에 10 이에요.\n거래 2 는 2통에 15 예요.\n그럼 한 통으로 치면 각각 얼마일까요?"),
      options: [
        t(E, "Deal 1 → 10 per bucket · Deal 2 → 7.5 per bucket",
            "거래 1 은 한 통에 10 · 거래 2 는 한 통에 7.5"),
        t(E, "Deal 1 → 10 per bucket · Deal 2 → 15 per bucket",
            "거래 1 은 한 통에 10 · 거래 2 는 한 통에 15"),
      ],
      correct: 0,
      explain: t(E,
        "Right. Deal 2 sells 2 buckets for 15, so 7.5 per bucket — cheaper than Deal 1's 10 per bucket. Greedy 'always use the smallest deal' would be wrong.",
        "맞아요. 15 를 2통으로 나누면 7.5 예요.\n거래 1 은 10 이었으니, 7.5 가 더 싸요.\n**큰 거래가 한 통당 더 쌀 수 있어요.**\n그래서 '작은 거래만 쓰면 된다' 는 생각은 틀려요."),
    },


    // [전] 정규화 — 핵심 ①. 전엔 코드 말풍선 안에만 있어서 학생이 코드에서 처음 만났음
    //   (선생님 2026-08-29 검토). c[i] = min(a[i], 2·c[i-1]) 를 페이지에서 먼저 발견하게.
    {
      type: "reveal",
      narr: t(E,
        "Solving this takes two steps. Step one — settle the cheapest price for each pack.",
        "푸는 건 두 걸음이에요. 먼저 묶음마다 제일 싸게 사는 값을 정해요."),
      content: (<NormalizeSim E={E} />),
    },

    // [전] 또 물어봐요 — 필요한 양보다 더 사도 쌀 수 있다 (그리디의 '올림' 갈래)

    // 1-5: Quiz — over-buy idea
    {
      type: "quiz",
      /* ⚠️ 2026-09-18 선생님이 이 퀴즈를 보시고 *"이해가 안돼"*.
         **숫자가 있는데 `x` 라는 글자로 물어보고 있었다.** 앞 쪽에서 묶음 값
         10 · 15 · 20 · 40 을 막 구해 놓고, 정작 물어볼 때는 추상으로 돌아갔다.
         보기도 "큰 거래 하나로 x 통을 다 채우는 게, 작은 거래를 여러 번 사는 것보다 쌀 때"
         처럼 한 번에 못 읽는 문장이었다. **그 숫자로 물어본다.** */
      narr: t(E,
        "Sometimes buying MORE buckets than you need is cheaper. Why?",
        "필요한 것보다 더 많이 사는 게 쌀 때도 있어요. 왜 그럴까요?"),
      question: t(E,
        "7 buckets needed. One 8-pack costs 40. Buying exactly 7 costs 45. How can buying MORE be cheaper?",
        "7통이 필요해요. 8통짜리는 40 이에요. 딱 7통만 맞춰 사면 45 예요.\n더 많이 사는데 어떻게 더 쌀 수 있을까요?"),
      options: [
        t(E, "A bigger pack is cheaper per bucket, so even with leftovers it can cost less",
            "큰 묶음이 한 통 가격이 더 싸서, 통이 남아도 값은 더 쌀 수 있어요"),
        t(E, "It can't — buying more is always more expensive",
            "그럴 리 없어요. 많이 살수록 늘 더 비싸요"),
      ],
      correct: 0,
      explain: t(E,
        "Right. 8 buckets for 40 beats 7 buckets for 45 — the extra bucket is free, in effect. So at every pack we also try 'buy enough and stop'.",
        "맞아요. 8통에 40 이 7통에 45 보다 싸요. 남는 1통은 공짜인 셈이에요.\n그래서 묶음마다 '넉넉히 사고 끝내기' 도 같이 따져봐요."),
    },


    // [전] 그리디 — 핵심 ②. 큰 묶음부터 올림/내림 두 갈래만 비교하면 끝
    {
      type: "reveal",
      narr: t(E,
        "Now bigger blocks are never worse. So walk from the biggest block down, comparing just two choices.",
        "이제 둘째 걸음이에요. 큰 묶음부터 차례로 사 봐요. 먼저 5통으로 연습해요."),
      content: (<GreedySim key="greedy5" E={E} x={5} />),
    },

    // [전] 한 번 더 — 이번엔 '올림해서 사고 끝내기' 가 실제로 이기는 x.
    //   바로 앞 퀴즈에서 '더 사는 게 쌀 수도 있다' 고 배웠는데 x=5 에선 그 갈래가
    //   이기지 않아서 학생이 확인할 데가 없었음 (선생님 2026-09-03 검토).
    {
      type: "reveal",
      narr: t(E,
        "Same deals, x = 7 this time. Watch the 'round up and stop' branch actually win.",
        "이번엔 7통이에요. 같은 방법인데 답이 5통 때와 달라져요."),
      content: (<GreedySim key="greedy7" E={E} x={7} />),
    },

    // [결] 배운 걸로 직접 확인 — 시뮬과 **다른 답이 나오는** x 로 (x=3 → 20)
    /* ⚠️ 2026-09-18: 여기가 x=9 였는데 답이 50 이고, 그건 6쪽(x=5 → 30)과 **같은 이야기**다
       (딱 맞게 산 쪽이 이긴다). 7쪽에서 어렵게 세운 "넉넉히 사는 쪽이 이길 때가 있다" 를
       한 번도 다시 안 물었다 — 7쪽을 놓친 학생도 그냥 풀 수 있었다.
       x=3 은 셋 다 다르다: 8통짜리로 넉넉히(40) 도, 딱 맞추기(25) 도 아니고
       **4통짜리 하나로 넉넉히(20)** 가 이긴다. "제일 큰 것 아니면 딱 맞추기" 로
       잘못 줄여 외운 학생을 정확히 걸러낸다. 값은 손이 아니라 알고리즘으로 확인했다. */
    // 1-4: Input — sample tracing
    {
      type: "input",
      narr: t(E,
        "Same deals, but x = 3 this time — do it yourself.",
        "같은 거래로 x = 3 을 직접 해봐요."),
      question: t(E,
        "a=[10,15,20,45], deal sizes 1,2,4,8. Min cost for x=3?",
        "거래 값이 10, 15, 20, 45 예요. 3통일 때 얼마가 제일 쌀까요?"),
      hint: t(E,
        "Use the block prices you found: 10, 15, 20, 40.\nStart from the biggest block and compare the two choices.",
        "아까 구한 묶음 값을 써요. 10, 15, 20, 40 이에요.\n제일 큰 묶음부터 두 갈래를 비교해 봐요."),
      answer: 20,
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
  // ⚠️ 2026-09-15 ux-reviewer 실측: 모바일 375px 에서 `c` 뱃지와 `c[i] = min(...)` 뱃지가
  //    **완전히 같은 좌표**(top 836.42 / left 86.5)로 겹쳐 앞의 것이 안 보였다.
  //    원인은 아래 Line 의 `textWrap: "balance"` 가 인라인 <code> 두 개와 부딪힌 것.
  //    `inline-block` + `nowrap` 으로 뱃지를 한 덩어리로 만들어 balance 가 쪼개지 못하게 한다.
  //    (balance 자체는 한글 줄바꿈 규칙이라 빼지 않는다 — memory/feedback_korean_linebreak.md)
  const codeTag = (s) => (
    <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#b45309", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 5, padding: "0 5px", display: "inline-block", whiteSpace: "nowrap", maxWidth: "100%", overflowX: "auto", verticalAlign: "middle" }}>{s}</code>
  );
  // 두 걸음을 **그림 두 장**으로. 글은 그림에 붙는 이름표만.
  const StepPic = ({ n, cap, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#2563eb", color: "#fff",
        fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 6, wordBreak: "keep-all" }}>{cap}</div>
        {children}
      </div>
    </div>
  );
  const Line = ({ n, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 7 }}>
      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 999, background: "#d97706", color: "#fff", fontSize: 11.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <div style={{ minWidth: 0, fontSize: 13, lineHeight: 1.7, color: "#334155", wordBreak: "keep-all", textWrap: "balance" }}>{children}</div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 620, margin: "0 auto" }}>
      {/* ⚠️ 2026-09-18 선생님: *"봐도 어떻게 풀겠다는게 안보여"*
          풀이 계획이 **이 쪽에 와서야**, 그것도 **코드 이름으로** 처음 나왔다.
          앞 여덟 쪽은 조각만 줬다. 그래서 두 걸음을 **코드 이름보다 먼저 우리말로** 놓는다.
          (파란 줄에도 "첫째 걸음" · "둘째 걸음" 을 넣어 4·6쪽부터 보이게 했다.) */}
      <div style={{ background: "#eff6ff", border: "1.5px solid #60a5fa", borderRadius: 12,
        padding: "12px 16px", marginBottom: 14, wordBreak: "keep-all", textWrap: "balance" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1e40af", marginBottom: 6 }}>
          🗺️ {t(E, "The whole solution, in two steps", "푸는 방법은 두 걸음이에요")}
        </div>
        {/* ⚠️ 2026-09-18 선생님: *"주절이 글 말고 이미지로 보여줄수는 없나?"*
            여기 두 걸음이 각각 긴 문장 하나였다. 그림으로 바꾼다 —
            ① 은 묶음 값이 45 → 40 으로 바뀌는 걸 **눈으로** 보이고,
            ② 는 8 → 4 → 2 → 1 로 내려가는 길과 갈림길 둘을 **그림으로** 보인다.
            글은 그림에 붙는 이름표만 남긴다. */}
        <StepPic
          n={1}
          cap={t(E, "Fix each pack's cheapest price", "묶음마다 제일 싼 값을 정해요")}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-end" }}>
            {[[1, 10, null], [2, 15, null], [4, 20, null], [8, 45, 40]].map(([sz, was, now]) => (
              <div key={sz} style={{ textAlign: "center", minWidth: 62 }}>
                <div style={{ fontSize: 11, color: "#1e40af", fontWeight: 700, marginBottom: 3 }}>{sz}{t(E, "-pack", "통짜리")}</div>
                <div style={{ background: now ? "#dcfce7" : "#fff", border: `1.5px solid ${now ? "#4ade80" : "#bfdbfe"}`,
                  borderRadius: 8, padding: "5px 0", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15, color: "#0f172a" }}>
                  {now ? (<><s style={{ color: "#94a3b8", fontWeight: 600 }}>{was}</s> {now}</>) : was}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "#166534", marginTop: 5 }}>
            ↑ {t(E, "two 4-packs (20 + 20) beat the 8-pack deal", "4통짜리를 두 번 사면 20 + 20 이라 더 싸요")}
          </div>
        </StepPic>
        <StepPic
          n={2}
          cap={t(E, "Walk from the biggest pack down", "큰 묶음부터 차례로 내려와요")}
        >
          <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
            {[8, 4, 2, 1].map((sz, i) => (
              <span key={sz} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {i > 0 && <span style={{ color: "#60a5fa", fontWeight: 800 }}>→</span>}
                <span style={{ background: "#fff", border: "1.5px solid #bfdbfe", borderRadius: 8, padding: "4px 9px",
                  fontSize: 12.5, fontWeight: 800, color: "#1e40af", whiteSpace: "nowrap" }}>{sz}{t(E, "-pack", "통짜리")}</span>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 180px", background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 8, padding: "6px 9px", fontSize: 12, color: "#7c2d12", wordBreak: "keep-all" }}>
              <b>{t(E, "Buy enough, stop", "넉넉히 사고 끝내기")}</b><br />{t(E, "→ a price to keep", "→ 값 하나가 나와요")}
            </div>
            <div style={{ flex: "1 1 180px", background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 8, padding: "6px 9px", fontSize: 12, color: "#3730a3", wordBreak: "keep-all" }}>
              <b>{t(E, "Buy less, carry the rest", "모자라게 사고 남기기")}</b><br />{t(E, "→ next pack takes it", "→ 다음 묶음으로 넘겨요")}
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: "#1e40af", marginTop: 6, fontWeight: 700 }}>
            🏁 {t(E, "the cheapest price we saw is the answer", "나온 값 중 제일 싼 값이 답이에요")}
          </div>
        </StepPic>
      </div>
      {/* ⚠️ 2026-09-18 선생님: *"정보가 너무 많아"*
          여기 있던 「🧩 두 시뮬에서 알아낸 것」 인사이트 카드 셋을 지웠다.
          같은 얘기를 **세 번** 하고 있었다 — 위 「푸는 방법은 두 걸음」 상자 ·
          이 카드 셋 · 아래 「코드는 이 순서로」 번호 목록.
          ⚠️ **내가 만든 문제다.** 2026-09-16 에 같은 이유로 마무리 박스를 이미 한 번 지웠는데
             (바로 아래 주석이 그 기록이다), 오늘 내가 위에 상자를 하나 더 얹어서 다시 셋이 됐다.
          코드 이름(block_cost · left · best)은 아래 번호 목록이 그대로 소개하므로 잃는 게 없다. */}

      <div style={{ ...box, background: "#f8fafc", marginBottom: 10 }}>
        {/* ⚠️ 2026-09-18 선생님: *"글밥이 너무 많아서 읽기 힘든 부분도 많고"*
            여기 번호 목록 다섯 줄이 위 그림과 **같은 얘기를 말로 다시** 하고 있었다.
            그림이 이미 순서를 보여주므로, 이 상자는 **이름표만** 맡는다 —
            그림에서 본 것을 코드에서 뭐라고 부르는지. */}
        <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 9 }}>
          ⚙️ {t(E, "What the code calls them", "코드에서 부르는 이름")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", alignItems: "center", fontSize: 12.5, color: "#334155" }}>
          {[
            ["deal_price", t(E, "the deal prices", "거래 가격")],
            ["block_cost", t(E, "cheapest price of one pack — step ①", "묶음 하나의 제일 싼 값 — ① 에서 정한 것")],
            ["want", t(E, "buckets to buy (the problem's x)", "사야 할 통 수 (문제의 x)")],
            ["left", t(E, "buckets not covered yet", "아직 못 채운 통")],
            ["paid", t(E, "paid so far", "여기까지 낸 값")],
            ["best", t(E, "cheapest price seen — the answer", "지금까지 제일 싼 값 — 이게 답")],
          ].map(([name, mean]) => (
            <Fragment key={name}>
              <div style={{ textAlign: "right" }}>{codeTag(name)}</div>
              <div style={{ wordBreak: "keep-all" }}>{mean}</div>
            </Fragment>
          ))}
        </div>
      </div>
      {/* ⚠️ 2026-09-16: 여기 있던 노란 마무리 박스를 지웠다. 같은 아이디어를 인사이트 카드 →
          번호 목록 → 마무리 박스로 **세 번** 말하고 있었고, 이 쪽이 10쪽 중 제일 무거웠다
          (카드 7개·스크롤 381px, ux-reviewer 실측). 박스만 있던 내용 — 시뮬 표의 두 칸이
          어떤 변수인지 — 은 위 4번 줄에 합쳤다. 지운 게 아니라 옮긴 것이다. */}
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
        "방금 본 두 생각을 코드가 쓰는 이름으로 다시 적어요."),
      content: (<BuyMilkPlan E={E} />),
    },
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getBuyMilkWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "No recursion — one sweep from the biggest block down.",
          "재귀 없이 큰 묶음부터 한 번만 훑어요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />),
      };
    })(),
  ];
}
