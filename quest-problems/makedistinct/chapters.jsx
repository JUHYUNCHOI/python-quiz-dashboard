import { C, t } from "@/components/quest/theme";
import { getMakeDistinctSections, getMakeDistinctWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CodeBlock } from "@/components/quest/shared";
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
              {t(E,
                "Some numbers are given, and one number K.\nWe may pick any number and add K to it, as many times as we like.\nMake them all different — and do it in as few adds as possible. Print that count.",
                "수가 몇 개 있고, 더할 수 K 가 하나 주어져요.\n우리는 아무 수나 골라서 K 를 더할 수 있어요. 몇 번이든요.\n모든 수가 서로 달라지게 만들되, 더한 횟수가 가장 적어야 해요. 그 횟수를 구해요.")}
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
            {t(E, "First line is T (number of test cases).", "첫 줄 T 는 테스트케이스 개수.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 200,000</div>
              <div>−N ≤ K ≤ N,  K ≠ 0</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each number is between 1 and N  ·  all N added together ≤ 1,000,000", "수는 1 부터 N 사이  ·  N 을 다 더해도 1,000,000 을 안 넘어요")}</div>
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

    /* 1-4: 쉬운 첫 코드와 그 한계 (2026-09-21 추가, 2026-09-22 3쪽 바로 뒤로 이동)
       왜 생겼나 — 교육 검토: **[기][승][전] 다음이 바로 최종 코드**여서
       "쉬운 방법 → 왜 안 되나 → 그래서 이 방법" 사다리의 첫 칸이 비어 있었다.
       project-lead 가 실측해서 판정했다 — 브루트는 **답은 맞고**(무작위 3000 케이스
       최적해와 전부 일치) **느리다**(파이썬 N=10,000 에 2.3초, 깨끗한 O(N²)).
       그래서 한 쪽만 넣는다. `feedback_why_and_how_over_slowness.md` 처방대로
       느림을 체감시키는 데 쪽을 쓰지 않고 **제약 숫자 + 연산량 한 줄**로 끝낸다.

       왜 여기(3쪽 바로 뒤)로 옮겼나 (2026-09-22, PM 판정) — 선생님이 예전 4쪽 결론을
       보시고 *"그래서 뭐? 어쨋다는거지?"*, 이어서 *"브루트 포스가 느리기 때문에
       이걸 써야한다는게 더 맞는것 같은데"*. ux 실측: 3쪽 마지막 걸음이 이미
       "겹치면 그 자리에서 바로 밀기" 를 손으로 시연하고 있었다 — 그 다음 문장은
       (구 4쪽의 홀짝 관찰이 아니라) 그걸 코드로 옮긴 이 브루트 쪽이다. */
    {
      type: "reveal",
      narr: t(E,
        "What if we just push whenever two values collide?",
        "겹칠 때마다 그 자리에서 바로 밀면 안 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🐣 {t(E, "The first idea — just push on collision", "제일 먼저 떠오르는 방법 — 겹치면 바로 밀기")}
          </div>

          <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7, marginBottom: 8, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Keep the values we have already placed. For each new value, push it by K until it lands somewhere free.",
              "이미 놓은 값들을 들고 있다가, 새 값이 겹치면 빈 자리를 만날 때까지 K 씩 밀어요.")}
          </div>

          <CodeBlock lang={codeLang} isEn={E} lines={codeLang === "cpp" ? [
            "vector<long long> used;   // 이미 놓인 값들",
            "long long total = 0;",
            "",
            "for (long long x : a) {",
            "    while (find(used.begin(), used.end(), x) != used.end()) {",
            "        x += k;           // 한 번 밀고 다시 본다",
            "        total++;",
            "    }",
            "    used.push_back(x);",
            "}",
            "",
            "cout << total << \"\\n\";",
          ] : [
            "used = []          # 이미 놓인 값들",
            "total = 0",
            "",
            "for x in a:",
            "    while x in used:   # 겹치면",
            "        x += k         # 한 번 밀고 다시 본다",
            "        total += 1",
            "    used.append(x)",
            "",
            "print(total)",
          ]} />

          <div style={{ marginTop: 10, background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            {/* ⭐ 2026-09-28 학생(초6): *"코드가 `for x in a:` 로 **원래 순서 그대로** 도는데,
                3쪽에서는 내내 **「작은 값부터 정렬해야 나중에 덜 움직여요」** 라고 강조했었다.
                **「어, 정렬 안 하는데 답이 맞다고?」** 하는 생각이 들었다. 왜 순서 상관없이
                맞는지는 설명이 없었다."* → 앞 쪽이 세운 규칙과 이 코드가 어긋나 보인다.
                **한 마디만 그 자리에 놓는다**(`feedback_sentence_must_follow`). */}
            {/* ⚠️ 2026-09-29 선생님(화면 보시고): *"오래 걸린다는 얘기겠지? **엄청 기네**"*
                맞다. 이 빨간 상자에 **두 가지**가 들어 있었다 —
                ①정렬을 안 해도 답이 맞는 이유(3문장) ②느리다(2문장, 숫자 포함).
                `feedback_why_and_how_over_slowness`: *"느린 건 금방 안다. 한계는 한 화면이면
                충분 — **제약 숫자 + 연산량 한 줄**. 아낀 분량을 「왜·어떻게」에 써라."*
                → ①은 한 문장으로, ②도 한 줄로. 둘 다 내용은 남기고 길이만 줄인다. */}
            <b>{t(E, "It gives the right answer — but it is too slow.", "답은 맞아요. 그런데 너무 느려요.")}</b><br />
            {/* ⚠️ 2026-09-29 학생: *"이 줄이 뜬금없었다. 이 페이지 코드에는 `sort` 가
                 하나도 없다(`for x in a: while x in used:` 만 있다). 갑자기 「정렬」이
                 나와서 「어 정렬이 왜 나오지?」 하고 잠깐 멈췄다."*
               이 문장은 **앞 학생의 질문**("3쪽은 정렬하라더니 코드는 왜 안 하나")에
               답하려고 넣은 것인데, 질문 없이 답만 떠 있었다. → **화면의 코드를
               가리키며** 연다. 그러면 답이 답으로 읽힌다(`feedback_sentence_must_follow`). */}
            {t(E,
              "This code does not sort — it reads a in the original order, and the answer is still right.",
              "이 코드는 정렬을 안 해요 — 원래 순서대로 훑는데도 답은 맞아요.")}<br />
            {/* 실측값이다 — project-lead 가 N=200,000·K=1 을 끝까지 돌렸다: 1179초.
               ⚠️ 2026-09-29 학생: *"「400억 번쯤」 숫자가 어디서 나온 건지 화면이
                 안 보여준다. 20만×20만인가 짐작은 했는데 그냥 믿고 넘어갔다."*
               → **곱셈을 그 자리에 쓴다.** 줄은 안 늘린다. */}
            {/* ⛔ 2026-09-29 토론 판정 — **옛 문장은 「자료구조가 느리다」(벽 A)를 말하고 있었다.**
                 *"200,000 × 200,000 ≒ 400억 번 → 20분"* — 셋이 다 틀렸다:
                 ① 이 코드는 O(N²)가 아니라 **O(N³)** 이다(`x in used` 가 매번 전체를 훑는다).
                 ② 「20분」은 외삽하면 **38시간**, 주석의 「1179초」는 역산하면 N ≈ 41,000 — 재현 불가.
                 ③ 여기 「나머지」는 **일상어**(그 밖의 것들)인데 5쪽은 **수학 용어**(mod)로 쓴다 —
                    같은 낱말 두 뜻(`feedback_same_number_two_meanings` 의 낱말판).
               ⭐ **더 큰 문제: 벽 A 는 set 하나로 668배 풀린다**(실측). 그래서 이 문장을 두면
                 눈치 빠른 학생의 *"그럼 set 쓰면 되잖아요?"* 가 **실제로 맞는 말**이 되고,
                 뒤에 나오는 묶기·정렬·점프가 전부 «왜 굳이?» 가 된다.
               → **벽 B 로 통째로 갈아 끼운다.** 답 자체가 커서 **세는 것만으로** 터지는 벽이다.
                 이건 자료구조로 못 넘는다. 검산: 전부 1, K=1, N=200,000 →
                 `200,000 × 199,999 ÷ 2 = 19,999,900,000`. 제약(각 수 1~N)도 지킨다.
               ⛔ 벽 A 를 한 문장이라도 남기지 않는다 — 한 화면에 큰 수 둘(400억·199억)은
                 선생님이 오늘 지적하신 *"정보 너무 많이 갑자기"* 를 그대로 재현한다. */}
            {t(E,
              "If all 200,000 numbers land in one pile, the last one gets pushed almost 200,000 times — 19,999,900,000 pushes in total, about 100,000 times the 200,000 numbers we started with. Counting them one at a time never finishes.",
              "수 200,000 개가 한 곳에 몰리면 마지막 수는 200,000 번 가까이 밀려요 — 다 합치면 199억 9,990만 번, 처음 수 200,000 개의 10만 배쯤이에요.\n한 번에 하나씩 세는 방법으로는 끝나지 않아요.")}
          </div>

          {/* 2026-09-22 PM 판정 — 이 쪽이 3쪽 바로 뒤(구 6쪽 자리)로 옮겨오면서
              옛 문구("4쪽에서 홀수·짝수로 갈렸던 것, 5쪽에서 '나머지'로…")가
              아직 안 나온 내용을 과거형으로 가리키게 됐다. 결론 선언 대신
              질문을 던지고 다음 쪽이 구조로 답하게 한다 — PM 이 문장을 확정. */}
          <div style={{ marginTop: 10, background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#065f46", lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            {/* ⛔ 옛 문장 *"그걸 알아내면 훨씬 빨라져요"* 는 실측과 안 맞는다 —
                 묶기만 해도 속도는 안 는다(정렬+set 624배 vs 묶기+정렬+set 599배).
               → 약속을 **「세지 말고 계산한다」** 로 바꾼다. 5쪽이 그것을 갚는다. */}
            👉 {t(E,
              "So we must not count one push at a time — we need to work it out in one go. The next page shows how.",
              "그러니 한 번씩 세면 안 돼요 — 한 번에 계산해 내야 해요. 어떻게 하는지 다음 쪽에서 봐요.")}
          </div>
        </div>
      ),
    },

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
        "This time K = 2. Which values can ever clash?",
        "이번엔 K = 2 예요. 어떤 값끼리 부딪힐 수 있는지 알아봐요."),
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
        "K is negative, so each push makes a value 2 smaller. Which ones can ever meet — and which end should you settle first?",
        "K 가 음수라 밀면 값이 2 씩 작아져요. 어떤 수끼리 만날 수 있을까요? 그리고 어느 쪽부터 자리를 잡아야 할까요?"),
      answer: 3,
      /* 2026-09-21: 맞혀도 ✅ 만 뜨고 **왜 2 인지**가 없었다 (재검증 학생 지적).
         `NumInput` 에 explain 을 새로 달아 이 자리부터 쓴다. */
      /* ⭐ 이 해설이 **정렬 방향의 근거**를 처음으로 숫자로 보여준다 — quest 전체에서 여기뿐이다.
           5쪽이 가르친 「나머지로 묶기」를 그대로 쓰되 **숫자는 새로 골랐다**는 것도 여기서 말한다
           (5쪽 마지막 걸음이 「이 방법을 다음 쪽에서도 쓴다」고 하는 것과 맞춘다). */
      explain: t(E,
        "3 is right.\nA value keeps its remainder when divided by 2 — the same way of splitting as the last page, with new numbers.\n1, 1, 1 and 3 all leave 1; 2 leaves 0.\nK is negative, so settle the BIGGEST first: 3 stays, then 1 → -1, then 1 → -3. Two pushes there, one more for the 2s pile — 3 in total.\nStart from the smallest instead and it costs 7. That is why the direction flips when K is negative.",
        "3 이 맞아요.\n2 로 나눈 나머지는 그대로예요 — 앞 쪽과 같은 나누는 방법이고, 숫자만 새로 골랐어요.\n1, 1, 1 과 3 은 모두 1 이 남고, 2 는 0 이 남아요.\nK 가 음수라 「큰 값부터」 자리를 잡아요 — 3 은 그대로, 1 은 -1 로, 또 1 은 -3 으로. 여기서 2 회.\n작은 값부터 하면 7 회가 들어요. K 가 음수일 때 방향이 뒤집히는 까닭이에요."),
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
          "나머지로 묶고, 정렬하고, 민 횟수는 나눗셈으로 한 번에 구해요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />),
      };
    })(),
  ];
}
