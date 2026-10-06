import { C, t } from "@/components/quest/theme";
import { getMakeDistinctSections, getMakeDistinctWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { Hi, CodeBlock } from "@/components/quest/shared";
import { PlaceOneByOneSim, WhoCanMeetSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMakeDistinctCh1 (6 steps: reveal / reveal / reveal / quiz / input / reveal)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh1(E, codeLang = "py") {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Numbers, and one move: add K. Make them all different.",
        "수들에 K 를 더해서 전부 다르게 만드는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔢"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Make All Distinct</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
              {/* ⭐ pedagogy 판정(2026-10-01) — 1쪽에서 **강조가 0 인 유일한 상자**였다.
                     바로 아래 📖 문제 상자는 불릿 다섯이 색·굵기로 또렷한데, 「이게
                     **최소화** 문제다」라는 가장 중요한 사실만 밋밋했다. 그러면 뒤의
                     정렬·묶기·나눗셈이 전부 「왜 굳이 이렇게까지」로 읽힌다.
                   ⛔ 한 상자에 한 곳만 — `check-emphasis` 의 「다 굵으면 강조가 아니다」. */}
              {t(E,
                "Some numbers are given, and one number K.\nWe may pick any number and add K to it, as many times as we like.\nMake them all different — and do it in ",
                "수가 몇 개 있고, 더할 수 K 가 하나 주어져요.\n우리는 아무 수나 골라서 K 를 더할 수 있어요. 몇 번이든요.\n모든 수가 서로 달라지게 만들되, ")}
              <Hi>{t(E, "as few adds as possible", "더한 횟수가 가장 적어야 해요")}</Hi>
              {t(E, ". Print that count.", ". 그 횟수를 구해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#2563eb" }}>{t(E, "N numbers", "수 N 개가")}</b>
                  {t(E, " are given, and one more number ", " 주어져요. 그리고 더할 때 쓸 수 ")}
                  <b style={{ color: "#2563eb" }}>K</b>
                  {t(E, " to add with. K may be negative, but it is never 0.",
                       " 도 하나 주어져요. K 는 음수여도 되지만 0 은 아니에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move — pick one number and ", "한 번에 수 하나를 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "add K to it", "K 를 더해요")}</b>
                  {t(E, ". You may pick the same number again and again.", ". 같은 수를 여러 번 골라도 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "When you stop, ", "다 하고 나면 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "no two numbers may be the same", "같은 수가 하나도 없어야 해요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the fewest moves that do it", "그렇게 만드는 가장 적은 횟수를")}</b>
                  {t(E, ".", " 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "One sample — 4 numbers with K = 1. The answer is 2.",
        "샘플 하나예요. 수 네 개에 K = 1. 답은 2 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`1
4 1
4 1 4 1`}</pre>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #86efac", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`2`}</pre>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>The four numbers are 4, 1, 4, 1 and K = 1.<br />The two 4s are the same, and so are the two 1s.<br />Why the answer is 2 — that's the next page.</>,
              <>수 네 개는 4, 1, 4, 1 이고 K = 1 이에요.<br />4 가 두 개로 겹치고, 1 도 두 개로 겹쳐요.<br />답이 왜 2 인지는 다음 쪽에서 봐요.</>)}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim }}>
            {t(E, "First line is T — how many problems come in this one file.", "첫 줄 T 는 이 파일에 문제가 몇 개 들어 있나예요.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 200,000</div>
              <div>−N ≤ K ≤ N,  K ≠ 0 <span style={{ color: "#64748b", fontSize: 11 }}>
                {t(E, "(K is never 0)", "(K 는 0 이 아니라는 뜻이에요)")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each number is between 1 and N  ·  all N added together ≤ 1,000,000", "수는 1 부터 N 사이  ·  N 을 다 더해도 1,000,000 을 안 넘어요")}</div>
            </div>
            {/* 2026-09-30 학생: "N 이 「개수」와 「값의 상한」 두 뜻으로 쓰이는데
                우연인지 원래 그런지 설명이 없어 헷갈렸다." → 한 줄로 밝힌다.
                아래 199억 줄은 삭제한 4쪽에서 옮겨 온 것 —
                `feedback_why_and_how_over_slowness` 의 「제약 숫자 + 연산량 한 줄」. */}
            <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, "The same N does two jobs here: how many numbers there are, and how big a number can get.",
                    "여기서 N 은 두 가지를 같이 말해요 — 수가 몇 개인지, 그리고 수가 얼마까지 커질 수 있는지예요.")}
            </div>
            <div style={{ fontSize: 11.5, color: "#b91c1c", marginTop: 6, fontWeight: 600, lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, "If all 200,000 numbers pile up on one spot, the last one gets pushed almost 200,000 times — 19,999,900,000 pushes in all. Counting them one at a time never finishes.",
                    "같은 수가 200,000 개 있으면 마지막 수는 200,000 번 가까이 더해져요 — 다 합치면 199억 9,990만 번이에요.\n한 번에 하나씩 세는 방법으로는 끝나지 않아요.")}
            </div>
          </div>
        </div>
      ),
    },

    /* 1-3: 작은 수부터 놓아 보기 — **시뮬**.
       2026-09-21 선생님: *"굳이 필요없는 퀴즈는 없애고 주절히 설명하기보다는
       **눈에 보이게끔 시뮬로 쉽게** 보여달라 했는데 전혀 안그런데"*
       그전까지 이 쪽은 여섯 단계를 **글로 나열**했다. 시뮬이 이 quest 에 하나도 없었다.
       글로 있던 것(정렬 → 하나씩 놓기 → 합계 2 회 → "하나 더 있었다면")을
       그대로 걸음으로 옮겼다. 샘플 `[4,1,4,1]` 은 **안 바꾼다** —
       2쪽이 "답이 왜 2 인지는 다음 쪽에서" 라고 약속했기 때문이다. */
    {
      type: "reveal",
      narr: t(E,
        "Place them one by one, smallest first.",
        "작은 수부터 하나씩 놓아 봐요."),
      content: <PlaceOneByOneSim E={E} />,
    },

    /* 1-4(브루트 코드 쪽)는 2026-09-30 에 **통째로 뺐다** — PM 종합 판정.
       왜: 3쪽이 방금 "정렬하고 민 횟수는 나눗셈으로 계산한다" 를 가르쳤는데
       이 쪽 코드는 **정렬도 계산도 안 했다**(자기모순). 빨간 상자에 자인하는
       문장을 한 줄 더 붙이는 처방이 이미 **두 번 실패**했다.
       199억 사실은 2쪽 제약 박스로 옮겼다 — `feedback_why_and_how_over_slowness`
       가 말하는 「제약 숫자 옆에 연산량 한 줄」이 원래 제자리다.
       근거: pedagogy·auditor·ux 가 각각 다른 방법으로 같은 자리를 지목했다. */
    /* 1-5: K = 2 면 누가 누구와 부딪히나 — **시뮬**(전에는 객관식 퀴즈였다,
       2026-09-22 순서 개편으로 구 1-4 에서 여기로 밀림 — 내용은 그대로 옮김).
       선생님: *"굳이 필요없는 퀴즈는 없애고 … 눈에 보이게끔"*.
       고르게 하는 대신 **2 를 계속 더하면 홀수는 홀수, 짝수는 짝수**인 것을 눈으로 보게 한다. */
    {
      type: "reveal",
      /* ⚠️ 2026-09-29 선생님(라이브 보시고): *"**갑자기 애들이 이해할수 있는건가?**"*
         ⭐ 원인을 찾았다 — **4쪽의 약속과 5쪽의 첫 줄이 어긋나 있었다.**
           4쪽 끝: *"이 코드는 **어떤 값끼리 부딪히는지** 모르고 무작정 밉니다.
                    그걸 알아내면 훨씬 빨라져요 — 다음 쪽에서 봐요."*
           5쪽 narr: *"K 가 달라지면 무엇이 달라질까요?"*  ← **다른 걸 묻는다.**
         학생은 「부딪히는 값 찾기」를 기대하고 넘어오는데 첫 줄이 딴 얘기를 하니
         걸음 1 의 「3 이 갈 수 있는 수」가 **왜 나오는지** 알 수 없다.
         → narr 이 **4쪽의 약속을 받는다.** K 가 2 로 바뀌는 것도 같은 줄에 담는다.
         (`feedback_reviewers_see_pages_teacher_sees_story` — 이상한 건 쪽과 쪽 **사이**다.) */
      narr: t(E,
        "Now let us try K = 2.",
        "K = 2 도 알아볼까요?"),
      content: <WhoCanMeetSim E={E} />,
    },

    // 1-6: Input — direction-only hint (2026-09-22 순서 개편으로 구 1-5 에서 여기로 밀림)
    {
      type: "input",
      narr: t(E,
        "Now K is negative. Work it out yourself.",
        "이번엔 K 가 음수예요. 직접 풀어봐요."),
      /* ⛔ 2026-09-29 토론 판정 — **옛 예제 `[3,3,4,4]` 는 아무것도 증명 못 했다.**
           묶음이 `[3,3]`·`[4,4]` 중복뿐이라 **정렬 방향을 뒤집어도 답이 똑같이 2** 였다.
           7쪽 코드는 「K<0 이면 내림차순」이라고 가르치는데 **그 근거가 quest 전체에 없었다** —
           마지막 학생: *"왜 그런지 증명하기보다 그냥 그렇다고 받아들였다."*
         ⛔ 중간에 나온 `[3,3,5]` 안은 **제약 위반**이라 기각됐다(N=3 인데 수 5 — 원문은 1 ≤ 수 ≤ N).
         ⭐ `[1,1,1,2,3]`·K=−2 는 셋을 다 만족한다(PM 이 738개 전수, 내가 재검산):
             ①제약 통과 ②**방향이 갈린다** — 내림차순 3회 vs 오름차순 7회
             ③**한 원소가 두 번 밀린다** — 「항상 한 번만 밀면 된다」는 과잉일반화를 막는다
           🔒 코드로 확인: 답 **3**. (n=4 로는 셋을 다 만족하는 예제가 없다) */
      question: t(E,
        "a = [1, 1, 1, 2, 3], K = -2. Minimum ops?",
        "a = [1, 1, 1, 2, 3], K = -2. 최소 횟수는?"),
      /* ⚠️ 2026-09-29 — 힌트가 **두 가지를 다 물었다.** 하나(「음수면 어느 쪽으로 가나」)는
           **화면 어디서도 안 가르친 사실**이라 물어도 답이 안 나온다. 5쪽 시뮬은
           K = 1·2·3 만 보여주고 값은 늘 **커지는 방향**으로만 움직인다.
         학생 둘이 같은 자리에서 멈췄다 — *"어? 마이너스는 처음 보는데? 지금까지 계속
           더하기만 했잖아. 빼라는 건가?"* · *"그만두고 싶었던 자리가 여기다."*
         → **방향은 알려주고**, 5쪽에서 이미 익힌 「나머지로 묶기」만 물음으로 남긴다.
         ⛔ 걸음을 늘리지 않는다 — 대신 아래 `explain` 에서 같은 말을 한 줄 뺐다. */
      hint: t(E,
        "K is negative, so each push makes a value 2 smaller. Which values can ever overlap?",
        "K 가 음수라 더하면 값이 2 씩 작아져요. 어떤 수끼리 겹칠 수 있을까요?"),
      answer: 3,
      /* 2026-09-21: 맞혀도 ✅ 만 뜨고 **왜 2 인지**가 없었다 (재검증 학생 지적).
         `NumInput` 에 explain 을 새로 달아 이 자리부터 쓴다. */
      /* ⚠️ 2026-09-30 — 여기 있던 "작은 값부터 하면 7 회가 들어요" 를 **지웠다. 거짓이었다.**
           학생이 손으로 「작은 값부터」를 해보고 **3** 을 얻어 신고했고, 재보니 학생이 맞았다:
             순열 전수 3,000판 · 무작위 20,000판 — **순서가 답을 바꾼 판 0건.**
           `while x in used: x += k` 는 **처리 순서와 무관하게 총 밀기 횟수가 같다.**
           "7" 은 오름차순 목록에 K>0 용 비교식을 안 뒤집고 돌렸을 때만 나오는 값 —
           **실제로 존재하는 전략이 아니라 구현 버그의 산출물**이었다.
           ⛔ 그러니 **정렬 방향은 「답」을 위한 것이 아니다** — 7쪽 O(1) 공식이 `cur` 를
           올바로 따라가게 하려는 것이다. 근거 없는 비교 주장을 다시 넣지 마라.
           같은 이유로 위 `hint` 의 「어느 쪽부터 자리를 잡아야 할까요?」도 지웠다 —
           손으로 푸는 학생에게는 **어느 쪽부터든 답이 같다.** */
      explain: t(E,
        "3 is right.\nA value keeps its remainder when divided by 2 — the same way of splitting as the last page, with new numbers.\n1, 1, 1 and 3 all leave 1; 2 leaves 0.\nK is negative, so settle the BIGGEST first: 3 stays, the first 1 stays too, the next 1 goes to -1 (1 push), the last 1 goes to -3 (2 pushes).\nThe 2 is alone and never moves. 0+0+1+2 = 3.",
        "3 이 맞아요.\n2 로 나눈 나머지는 그대로예요 — 앞 쪽과 같은 나누는 방법이고, 숫자만 새로 골랐어요.\n1, 1, 1 과 3 은 모두 1 이 남고, 2 는 0 이 남아요.\nK 가 음수라 「큰 값부터」 자리를 잡아요 — 3 그대로, 첫 1 도 그대로, 다음 1 은 -1 로(1 회), 마지막 1 은 -3 으로(2 회).\n2 는 혼자라 안 움직여요. 0+0+1+2 = 3 회예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMakeDistinctCh2 (1 step: progressive)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh2(E, lang = "py") {
  return [
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getMakeDistinctWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Group by remainder, sort, then work out the pushes with one division.",
          "나머지로 묶고, 정렬하고, 더한 횟수는 나눗셈으로 한 번에 구해요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />),
      };
    })(),
  ];
}
