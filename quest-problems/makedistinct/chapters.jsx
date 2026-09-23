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
            <b>{t(E, "It gives the right answer — but it is too slow.", "답은 맞아요. 그런데 너무 느려요.")}</b><br />
            {/* "몇 분" 이었다 → 실측값으로. project-lead 가 N=200,000·K=1 을 끝까지 돌렸다: 1179초. */}
            {t(E,
              "N can be 200,000. One value may be pushed almost N times, and each push looks through everything placed so far — that is about 200,000 × 200,000 = 40,000,000,000 steps → we actually ran it, and it took about 20 minutes.",
              "N 이 200,000 까지예요. 값 하나가 거의 N 번 밀릴 수 있고, 밀 때마다 지금까지 놓은 값을 전부 훑어요. 200,000 × 200,000 = 400억 번쯤 돼요 → 실제로 돌려보니 20분 걸려요.")}
          </div>

          {/* 2026-09-22 PM 판정 — 이 쪽이 3쪽 바로 뒤(구 6쪽 자리)로 옮겨오면서
              옛 문구("4쪽에서 홀수·짝수로 갈렸던 것, 5쪽에서 '나머지'로…")가
              아직 안 나온 내용을 과거형으로 가리키게 됐다. 결론 선언 대신
              질문을 던지고 다음 쪽이 구조로 답하게 한다 — PM 이 문장을 확정. */}
          <div style={{ marginTop: 10, background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#065f46", lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            👉 {t(E,
              "This code pushes blindly, without knowing which values will collide. Once we figure that out, it gets much faster — see the next page.",
              "이 코드는 어떤 값끼리 부딪히는지 모르고 무작정 밉니다. 그걸 알아내면 훨씬 빨라져요 — 다음 쪽에서 봐요.")}
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
      narr: t(E,
        "So far K was 1. What changes when K is 2?",
        "지금까지는 K = 1 이었어요. K 가 2 면 무엇이 달라질까요?"),
      content: <WhoCanMeetSim E={E} />,
    },

    // 1-6: Input — direction-only hint (2026-09-22 순서 개편으로 구 1-5 에서 여기로 밀림)
    {
      type: "input",
      narr: t(E,
        "Now K is negative. Work it out yourself.",
        "이번엔 K 가 음수예요. 직접 풀어봐요."),
      question: t(E,
        "a = [3, 3, 4, 4], K = -2. Minimum ops?",
        "a = [3, 3, 4, 4], K = -2. 최소 횟수는?"),
      hint: t(E,
        "K is negative — which way does a push move a value? And which of these four can ever meet?",
        "K 가 음수면 밀 때 값이 어느 쪽으로 갈까요? 그리고 이 넷 중 어떤 수끼리 만날 수 있을까요?"),
      answer: 2,
      /* 2026-09-21: 맞혀도 ✅ 만 뜨고 **왜 2 인지**가 없었다 (재검증 학생 지적).
         `NumInput` 에 explain 을 새로 달아 이 자리부터 쓴다. */
      explain: t(E,
        "2 is right.\nK = -2, so each push lowers a value by 2 — and a value keeps its remainder when divided by 2.\nSo the two 3s are one pile and the two 4s are another; the piles never meet.\nIn each pile the second one has to move down once: 3 → 1 and 4 → 2. One push each, 2 in total.",
        "2 가 맞아요.\nK = -2 라서 밀면 값이 2 씩 작아져요. 2 로 나눈 나머지는 그대로예요.\n그래서 3 두 개가 한 묶음, 4 두 개가 다른 묶음이고 서로 만나지 않아요.\n묶음마다 두 번째 값만 한 번씩 내려가면 돼요 — 3 → 1, 4 → 2. 합해서 2 회예요."),
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
          "Group by remainder, sort, then push forward one at a time.",
          "나머지로 묶고, 정렬하고, 앞에서부터 하나씩 밀어요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />),
      };
    })(),
  ];
}
