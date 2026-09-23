import { C, t } from "@/components/quest/theme";
import { getStrangeFnSections, getStrangeFnWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { StrangeFnDigitSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeStrangeFnCh1
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "How many times must f run to turn x into 0?",
        "이상한 함수 f 를 몇 번 써야 x 가 0 이 되는지 세는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔮"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#5b21b6" }}>Strange Function</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 , wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "Output how many applications of f are needed to reach 0, mod 10⁹+7.",
                "f 를 몇 번 써야 0 이 되는지 10⁹+7 로 나눈 나머지를 출력해요.")}
            </div>
            {/* 2026-09-22: 10⁹+7 이 화면에 16번 나오지만 뜻은 한 번도 안 밝혀져 있었다.
                학생이 처음 만나는 이 자리(1쪽 미션)에서 한 번만 정의한다. */}
            <div style={{ fontSize: 11, color: "#7c3aed", marginTop: 6, wordBreak: "keep-all", textWrap: "balance", whiteSpace: "pre-line" }}>
              {t(E,
                "10⁹+7 = 1,000,000,007, a huge prime.\nThe true answer can get astronomically large, so we only report the remainder after dividing by it.",
                "10⁹+7 은 1,000,000,007 이라는 아주 큰 소수예요.\n답이 어마어마하게 커질 수 있어서, 이 수로 나눈 나머지만 답으로 내요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A function ", "함수 ")}
                  <b style={{ color: "#8b5cf6" }}>f(x)</b>
                  {t(E, " is defined on positive integers.", " 가 양의 정수에 정의돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If x has any digit other than 0 or 1: replace ",
                        "x 에 0/1 이 아닌 자릿수가 하나라도 있으면, ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each digit", "각 자릿수")}</b>
                  {t(E, " by 1 if odd, 0 if even.", "를 홀수면 1, 짝수면 0으로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Otherwise (x contains only 0/1): replace x with ",
                        "그게 아니면 (x 가 0 과 1 로만 되어 있으면), x 를 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "x − 1", "x − 1")}</b>
                  {t(E, ".", " 로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print how many ", "")}
                  <b style={{ color: "#15803d" }}>f</b>
                  {t(E, " applications make x become 0, mod ",
                        " 를 몇 번 쓰면 x 가 0 이 되는지를 ")}
                  <b style={{ color: "#15803d" }}>10⁹+7</b>
                  {t(E, ".", " 로 나눈 나머지를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Input/Output format (2026-09-22 신설 — 형식 카드를 샘플에서 분리, photoshoot25 시즌 표준 그대로)
    {
      type: "reveal",
      narr: t(E,
        "First line T, then one x per line — one test each.",
        "첫 줄에 T, 그다음 줄마다 x 가 하나씩 있어요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of tests", "— 테스트 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #c4b5fd" }}>
                <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>x</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— one number, on its own line", "— 수 하나, 한 줄에 하나")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats T times", "↑ 이 줄이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each x, how many times f applies until it hits 0, mod 10⁹+7 (T lines).",
                  "x 마다 f 를 몇 번 써야 0 이 되는지를 10⁹+7 로 나눈 나머지로, 한 줄씩 출력해요 (T 줄).")}
            </div>
          </div>
          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 100,000 (= 10⁵)</div>
              <div>1 ≤ x &lt; 10^(2×10⁵)  <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(x can have up to 200,000 digits)", "(x 는 최대 20만 자리짜리 수일 수 있음)")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "total digits across all x ≤ 10⁶ (one million)", "모든 x 의 자릿수 합 ≤ 10⁶ (백만)")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Sample I/O + x=210 시뮬 (2026-09-22 — 정적 텍스트 트레이스를 SimNav 시뮬로 교체)
    {
      type: "reveal",
      narr: t(E,
        "Two samples, then walk x = 210 one step at a time.",
        "예제 두 개를 보고, x = 210 은 한 단계씩 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <div>2</div>
              <div>24680</div>
              <div>210</div>
            </div>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div>1</div>
              <div>4</div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Trace x = 24680", "추적 x = 24680")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" , wordBreak: "keep-all", textWrap: "balance" }}>
              <div>24680 → {t(E, "has digits other than 0/1", "0/1 이 아닌 자릿수 있음")}</div>
              <div>{t(E, "each digit by parity:", "자리별 홀짝:")} 2→0, 4→0, 6→0, 8→0, 0→0</div>
              <div>= 00000 = 0 ✅ <b style={{ color: "#15803d" }}>{t(E, "1 op (f used once)", "1번 (f 를 한 번 씀)")}</b></div>
            </div>
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <StrangeFnDigitSim E={E} />
          </div>
        </div>),
    },

    // 1-4: 한계 — 하나씩 세면 못 센다 (2026-09-22 신설. 브루트 코드 없음 — feedback_why_and_how_over_slowness)
    {
      type: "reveal",
      narr: t(E,
        "What if we just count f, one use at a time? We can't.",
        "f 를 하나씩 세면 어떻게 될까요? 그럴 수 없어요."),
      content: (
        <div style={{ padding: 20, wordBreak: "keep-all" }}>
          <div style={{
            maxWidth: 470, margin: "0 auto", background: "#fef2f2",
            border: "1.5px solid #fca5a5", borderRadius: 12, padding: "14px 16px",
          }}>
            <div style={{ fontWeight: 800, color: "#b91c1c", marginBottom: 8, fontSize: 13 }}>
              🐌 {t(E, "Count f one use at a time?", "f 를 한 번씩 세어 가면?")}
            </div>
            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>1 ≤ x &lt; 10^(2×10⁵)</div>
              <div style={{ color: "#b91c1c", fontWeight: 800, marginTop: 4 }}>
                {t(E, "total digits across all x ≤ 10⁶", "모든 x 의 자릿수 합 ≤ 10⁶")}
              </div>
            </div>
            {/* 2026-09-23 학생 검증: 190자 문단이 "한 번에 안 읽혀서 두 번 다시 읽었다" —
                내용은 그대로 두고 네 문장으로 나눠 보여준다 (빼지 않는다). */}
            <div style={{ fontSize: 11.5, color: "#7f1d1d", marginTop: 8, lineHeight: 1.6, wordBreak: "keep-all" }}>
              <div>{t(E,
                "x itself can already have up to 200,000 digits — and it stays that big even after it's 0/1 only.",
                "x 자체가 이미 20만 자리에 가까운 수일 수 있어요. 0/1 만 남아도 크기는 그대로예요.")}</div>
              <div style={{ marginTop: 6 }}>{t(E,
                "f only subtracts 1 each time, so reaching 0 takes as many steps as the value itself.",
                "f 는 한 번에 1 씩만 빼요. 그래서 0 까지 가려면 그 값 크기만큼 여러 번 걸려요.")}</div>
              <div style={{ marginTop: 6, fontWeight: 700 }}>{t(E,
                "That means the number of f's needed can be astronomically large.",
                "그러니 f 의 횟수 자체가 어마어마하게 커질 수 있어요.")}</div>
              <div style={{ marginTop: 6 }}>{t(E,
                "Counting one by one means looping that many times — far more than any loop can finish.",
                "하나씩 세는 건 그 횟수만큼 반복해야 해서, 어떤 반복문도 끝낼 수 없어요.")}</div>
            </div>
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", fontSize: 12.5, color: "#5b21b6", textAlign: "center", fontWeight: 700 }}>
            {t(E,
              "→ So: don't count one by one. Find a rule from small values, and get the answer with one formula.",
              "→ 그러니 하나씩 세지 말고, 작은 값에서 규칙을 찾아 식 하나로 한 번에 구해요.")}
          </div>
        </div>),
    },

    // 1-5: 도입 — 작은 n 부터 직접 세어보기 (input, 2026-09-22 신설. 공식 없이 손으로)
    // 2026-09-23 학생 검증: g(1)=1·g(3)=4 가 계산 과정 없이 표에 나와서 "외워야 했다"·
    // "공식이 왜 맞는지 하늘에서 떨어진 느낌" — x=10 하나만 세게 했던 걸
    // x=1 → x=10 → x=11 세 걸음으로 늘린다. 이 셋의 이진수 읽기가 정확히 n=1,2,3 이라
    // 8쪽 표의 첫 세 줄을 그대로 손으로 검산하게 된다.
    {
      type: "input",
      narr: t(E,
        "Let's count by hand for small values first.",
        "작은 값부터 직접 세어 봐요."),
      question: t(E,
        "x = 1. How many f's until it hits 0?",
        "x = 1 이에요. 0 이 될 때까지 f 를 몇 번 써야 할까요?"),
      hint: t(E,
        "x with only 0/1 digits uses the x − 1 rule.\nWhat's 1 − 1? Is that already 0?",
        "x 가 0 과 1 로만 되어 있으면 x − 1 규칙을 써요.\n1 − 1 은 몇인가요? 바로 0 이 되나요?"),
      answer: 1,
      explain: t(E,
        "1 is right. 1 → 0, one f. We'll meet this value again in the table later.",
        "1 이 맞아요. 1 → 0, 한 번이에요. 이 값은 이따가 표에서 다시 만나요."),
    },

    // 1-6: 도입 — x=10 (n=2), 힌트를 방향만 남기게 순화 (2026-09-23: "계산을 거의 다 해줘서
    // 답을 세는 것 말고는 할 게 없었다" 지적 — 두 규칙을 말로만 알려주고 계산은 학생이 한다)
    {
      type: "input",
      narr: t(E,
        "Now a slightly bigger one.",
        "이번엔 조금 더 큰 값이에요."),
      question: t(E,
        "x = 10 (only 0s and 1s). How many f's until it hits 0? Count it out.",
        "x = 10 이에요 (0 과 1 만 있어요). 0 이 될 때까지 f 를 몇 번 써야 할까요? 직접 세어 보세요."),
      hint: t(E,
        "10 has only 0/1 digits, so it uses the x − 1 rule. If the result has any digit other than 0/1, switch to the parity rule instead (odd digit → 1, even digit → 0). Keep alternating between the two rules until you reach 0 — count every step.",
        "10 은 0 과 1 로만 되어 있으니 x − 1 규칙을 써요. 계산한 값에 0/1 이 아닌 자리가 있으면 이번엔 홀짝 규칙(홀수 → 1, 짝수 → 0)을 써요. 0 이 될 때까지 두 규칙을 번갈아 쓰면서 몇 번 걸렸는지 세어보세요."),
      answer: 3,
      explain: t(E,
        "3 is right. 10 → 9 → 1 → 0, three f's.\nx = 1 took 1, x = 10 took 3 — it didn't just go up by one. Let's count one more, then find the rule.",
        "3 이 맞아요. 10 → 9 → 1 → 0, 세 번이에요.\nx = 1 은 1 번, x = 10 은 3 번이에요. 하나씩 늘지는 않네요. 하나만 더 세어 보고 규칙을 찾아요."),
    },

    // 1-7: 도입 — x=11 (n=3), 홀짝 변환이 낀 값 (2026-09-23 신설)
    {
      type: "input",
      narr: t(E,
        "One more — one step longer than the last.",
        "하나 더 — 앞의 것보다 한 걸음 길어요."),
      question: t(E,
        "x = 11 (only 0s and 1s too). How many f's until it hits 0?",
        "x = 11 이에요 (이것도 0 과 1 만 있어요). 0 이 될 때까지 f 를 몇 번 써야 할까요?"),
      hint: t(E,
        "Same two rules as before — keep alternating until you reach 0, and count every step.",
        "이번에도 같은 두 규칙을 번갈아 적용해요. 0 이 될 때까지 몇 번 걸리는지 세어보세요."),
      answer: 4,
      explain: t(E,
        "4 is right. 11 → 10 → 9 → 1 → 0, four f's. Let's check the three values we just found — 1, 3, 4 — in the table.",
        "4 가 맞아요. 11 → 10 → 9 → 1 → 0, 네 번이에요. 방금 구한 세 값 1, 3, 4 를 표에서 다시 확인해요."),
    },

    // 1-6 A: 이진수로 읽는 법 (2026-09-23 PM 판정 — 8쪽 5개 박스를 5쪽으로 쪼갠다.
    // 근거: memory/quest_season_shape_consistency.md("쪽 하나에 표 하나") +
    // feedback_screen_must_not_rely_on_memory. 걸음 A~E, 각 걸음은 질문 하나만 답한다.
    {
      type: "reveal",
      narr: t(E,
        "How do leftover 0/1 digits become one number?",
        "남은 0과 1을 어떻게 하나의 수로 읽을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            🔢 {t(E, "Reading as binary", "이진수로 읽기")}
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, wordBreak: "keep-all", textWrap: "balance" }}>
              <div>{t(E,
                "Page 3 subtracted x = 210 in plain decimal. That was the right way to do it there.",
                "3쪽에서는 x = 210 을 그냥 십진수로 뺐어요. 그 계산은 거기서는 맞는 방법이었어요.")}</div>
              <div style={{ marginTop: 6 }}>{t(E,
                "Here we want to find a rule, so we read the same 0/1 digits a different way: as binary.",
                "여기서는 규칙을 찾으려고 같은 0과 1을 다른 방법으로 읽어요. 바로 이진수예요.")}</div>
              {/* 2026-09-23 학생 검증: "왜 하필 이진수로 읽는지" 설명 없이 "그렇게 해보자" 로
                  시작했다 — 한 문장으로 이유를 밝힌다. */}
              <div style={{ marginTop: 6 }}>{t(E,
                "Why binary and not decimal? Once every digit is only 0 or 1, those digits already look exactly like binary digits — reading them that way turns x into one whole number n. We can then look for a pattern using small values of n first (like n = 1, 2, 3 you already found) — even though n itself can grow just as huge as x once you plug in the real input.",
                "왜 하필 십진수가 아니라 이진수일까요? 자리마다 0 아니면 1 만 남으면, 그 모양이 이미 이진수 자리와 똑같아요. 그대로 이진수로 읽으면 x 가 정수 n 하나가 돼요. 그러면 방금 구한 것처럼 n 이 작을 때(1, 2, 3…)부터 규칙을 먼저 찾아볼 수 있어요 — 실제 입력을 넣으면 n 도 x 만큼 커질 수 있지만요.")}</div>
              <div style={{ marginTop: 6 }}>{t(E,
                "In binary, place values double as you move left: 1, 2, 4, 8 …",
                "이진수는 오른쪽 자리부터 자리값이 1, 2, 4, 8 … 이렇게 두 배씩 커져요.")}</div>
            </div>
          </div>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 8, textAlign: "center" }}>
              {t(E, "Example: reading \"10\" as binary", "예: \"10\" 을 이진수로 읽으면?")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, fontFamily: "'JetBrains Mono',monospace" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#5b21b6" }}>1</div>
                <div style={{ fontSize: 10.5, color: C.dim, marginTop: 2 }}>{t(E, "place value 2", "자리값 2")}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#5b21b6" }}>0</div>
                <div style={{ fontSize: 10.5, color: C.dim, marginTop: 2 }}>{t(E, "place value 1", "자리값 1")}</div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 800, color: "#15803d", fontFamily: "'JetBrains Mono',monospace" }}>
              1×2 + 0×1 = 2 → n = 2
            </div>
          </div>
        </div>),
    },

    // 1-6 B: 이미 직접 센 세 값을 n 으로
    {
      type: "reveal",
      narr: t(E,
        "Turn the three values you already counted into n.",
        "직접 센 세 값을 이진수 n 으로 바꿔요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 2026-09-23 학생 검증: g 가 이 쪽 표에서 정의 없이 처음 등장 —
              "이게 답 세는 함수구나" 를 학생이 직접 짐작했다. 쓰기 전에 한 문장으로 밝힌다. */}
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 10, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Let's give that count a name: g(n) is the number of f's needed, once x has been read as the binary number n.",
              "이 횟수에 이름을 붙여요. x 를 이진수로 읽은 값이 n 일 때, f 가 필요한 횟수를 g(n) 이라고 해요.")}
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#166534", lineHeight: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6, fontFamily: "inherit" }}>
              ✅ {t(E, "Already counted (pages 5–7)", "이미 직접 셌어요 (5~7쪽)")}
            </div>
            <div>"1" = 1×1 → n=1, g(1)=1 <span style={{ color: C.dim }}>(x = 1)</span></div>
            <div>"10" = 1×2+0×1 → n=2, g(2)=3 <span style={{ color: C.dim }}>(x = 10)</span></div>
            <div>"11" = 1×2+1×1 → n=3, g(3)=4 <span style={{ color: C.dim }}>(x = 11)</span></div>
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Check: does this n match the g you counted by hand on those pages?",
              "방금 5~7쪽에서 직접 구한 값과 같은지 확인해보세요.")}
          </div>
        </div>),
    },

    // 1-6 C: n=4~7 로 늘려서 짝/홀 비교 (형태 칸 없음 — 스스로 관찰)
    {
      type: "reveal",
      narr: t(E,
        "What about n = 4 through 7?",
        "n = 4 부터 7 까지는 g(n) 이 얼마일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            🧩 {t(E, "Line up more n's", "표를 늘려서 비교해봐요")}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 10, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Look at the even-n rows and the odd-n rows separately. How does g(n) differ?",
              "짝수 n 줄과 홀수 n 줄을 나눠서 봐요. g(n) 이 어떻게 다른가요?")}
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: C.text, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>n</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>g(n)</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>{t(E, "n is…", "n 은…")}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>0</td><td>0</td><td>{t(E, "even", "짝수")}</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>1 ✅</td><td>1</td><td>{t(E, "odd", "홀수")}</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>2 ✅</td><td>3</td><td>{t(E, "even", "짝수")}</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>3 ✅</td><td>4</td><td>{t(E, "odd", "홀수")}</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>4</td><td>6</td><td>{t(E, "even", "짝수")}</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>5</td><td>7</td><td>{t(E, "odd", "홀수")}</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>6</td><td>9</td><td>{t(E, "even", "짝수")}</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>7</td><td>10</td><td>{t(E, "odd", "홀수")}</td></tr>
              </tbody>
            </table>
          </div>
        </div>),
    },

    // 1-6 D: 짝수=3k, 홀수=3k+1 확인 (형태 칸 등장 — 이제 "찾기"가 아니라 "확인")
    {
      type: "reveal",
      narr: t(E,
        "Is it really 3k for even n, 3k+1 for odd n?",
        "정말 짝수는 3k, 홀수는 3k+1 인가요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            ✅ {t(E, "Let's check", "확인해봐요")}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 10, wordBreak: "keep-all", textWrap: "balance" }}>
            <div>{t(E,
              "Let k be n divided by 2 (the quotient).",
              "k 는 n 을 2 로 나눈 몫이에요.")}</div>
            <div style={{ marginTop: 4 }}>{t(E,
              "Let's check whether the even/odd rows you just split really follow this form.",
              "방금 짝수 줄, 홀수 줄로 나눠 본 것이 정말 이런 식을 따르는지 확인해요.")}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: C.text, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>n</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>g(n)</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>{t(E, "form", "형태")}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>0</td><td>0</td><td>—</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>1 ✅</td><td>1</td><td>2k+1, k=0 → 3k+1=1</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>2 ✅</td><td>3</td><td>2k, k=1 → 3k=3</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>3 ✅</td><td>4</td><td>2k+1, k=1 → 3k+1=4</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>4</td><td>6</td><td>2k, k=2 → 3k=6</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>5</td><td>7</td><td>2k+1, k=2 → 3k+1=7</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>6</td><td>9</td><td>2k, k=3 → 3k=9</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>7</td><td>10</td><td>2k+1, k=3 → 3k+1=10</td></tr>
              </tbody>
            </table>
          </div>
        </div>),
    },

    // 1-6 E: 두 식을 하나로 합치기 (floor 정의는 여기서 처음 등장)
    {
      type: "reveal",
      narr: t(E,
        "Combine both into one formula.",
        "이 둘을 식 하나로 합쳐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              {t(E, "✅ Formula", "✅ 공식")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" , wordBreak: "keep-all", textWrap: "balance" }}>
              <div>g(2k)   = 3k</div>
              <div>g(2k+1) = 3k + 1</div>
            </div>
            <div style={{ fontSize: 11, color: "#166534", marginTop: 8, fontFamily: "inherit", wordBreak: "keep-all", textWrap: "balance" }}>
              <div>{t(E,
                "If n = 2k, then 3n/2 is 3k.",
                "n = 2k 면 3n/2 는 3k 예요.")}</div>
              <div style={{ marginTop: 4 }}>{t(E,
                "If n = 2k+1, then 3n/2 is 3k+1.5. Drop the decimal and it's 3k+1.",
                "n = 2k+1 이면 3n/2 는 3k+1.5 인데, 소수점을 버리면 3k+1 이에요.")}</div>
              <div style={{ marginTop: 4 }}>{t(E,
                "Both cases become one formula:",
                "둘 다 다음 식 하나로 써요.")}</div>
            </div>
            <div style={{ fontSize: 12, color: "#15803d", fontFamily: "'JetBrains Mono', monospace", marginTop: 6, textAlign: "center", fontWeight: 800 }}>
              {t(E, "= floor(3·n / 2)", "= floor(3·n / 2)")}
            </div>
            <div style={{ fontSize: 11, color: "#166534", marginTop: 8, fontFamily: "inherit", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "floor drops anything after the decimal point. For example, floor(3.5) is 3.",
                "floor 는 소수점 아래를 버리는 거예요. 예를 들어 floor(3.5) 는 3 이에요.")}
            </div>
          </div>
        </div>),
    },

    // 1-6 F: g(n) 만으론 부족하다는 경고 — 2026-09-23 재검증에서 갈라냄.
    // 원래 공식 카드 아래(marginTop:10)에 이어 붙어 있었는데, 학생이 "천천히 두 번
    // 읽어야 했다" 고 난이도 4 를 매겼다. 공식(방금 완성)과 +1 보정(다음에 적용할 규칙)은
    // 서로 다른 생각이라 쪽을 나눈다. 이 "+1" 규칙은 13쪽 힌트가 그대로 기대는 내용이라
    // 반드시 13쪽보다 앞이어야 한다 — 빼거나 뒤로 미루면 힌트가 다시 틀려진다.
    {
      type: "reveal",
      narr: t(E,
        "But g(n) alone isn't the final answer.",
        "그런데 g(n) 만으로는 아직 답이 아니에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
              ⚠️ {t(E, "g(n) alone isn't the final answer", "g(n) 이 바로 답은 아니에요")}
            </div>
            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "g(n) only counts steps after everything is already 0/1. If a parity-flip ran first (page 3), that flip was also a use of f — add 1 for it.",
                "g(n) 은 이미 0/1 만 남은 뒤의 단계만 세요. 그 전에 홀짝 변환을 한 번 썼다면(3쪽), 그것도 f 를 한 번 쓴 거라 1 을 더해야 해요.")}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#92400e", lineHeight: 1.9 }}>
              {t(E,
                "Check with x = 210 from page 3: parity-flip once → \"010\" → n = 2 → g(2) = 3 → 1 + 3 = 4. Matches the 4 we counted by hand.",
                "3쪽 x = 210 으로 확인: 홀짝 변환 1번 → \"010\" → n = 2 → g(2) = 3 → 1 + 3 = 4. 손으로 센 4 번과 같아요.")}
            </div>
          </div>
        </div>),
    },

    // 1-7: 연습1
    {
      type: "input",
      narr: t(E,
        "Practice — a value with a digit other than 0/1.",
        "0/1 이 아닌 자리가 있는 값도 연습해 봐요."),
      question: t(E,
        "How many f's for x = 37?",
        "x = 37 은 몇 번 만에 0 이 될까요?"),
      hint: t(E,
        "Same ideas as before.\n① Does it need a parity-flip first — what do 3 and 7 become? (that flip counts as 1)\n② Read that result as binary — what's n?\n③ Put n into the formula: floor(3n/2).\n④ You flipped once in step ①, so add that 1 to step ③'s result — that's your final answer.",
        "앞에서 배운 걸 그대로 써요.\n① 먼저 홀짝 변환이 필요한가요? 3 과 7 은 뭐가 되나요? (그 변환도 1번으로 세요)\n② 그 결과를 이진수로 읽으면 n 은 얼마인가요?\n③ n 을 공식 floor(3n/2) 에 넣어요.\n④ ①에서 한 번 변환했으니, ③의 결과에 그 1 을 더해요 — 그게 최종 답이에요."),
      answer: 5,
      explain: t(E,
        "5 is right. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\nSame as 1 + g(3) = 1 + 4 = 5.",
        "5 가 맞아요. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\n1 + g(3) = 1 + 4 = 5 와 같아요."),
    },

    // 1-8: 연습2 — 이미 0/1 인 큰 값 (input, x=1010 → 15. 2026-09-22 신설)
    {
      type: "input",
      narr: t(E,
        "Practice — a bigger value that's already 0/1.",
        "이미 0 과 1 만 있는, 더 큰 값도 연습해 봐요."),
      question: t(E,
        "How many f's for x = 1010?",
        "x = 1010 은 몇 번 만에 0 이 될까요?"),
      hint: t(E,
        "① This one is already 0/1, so the parity-flip step is skipped — nothing to add for it.\n② Read it straight as binary — what's n?\n③ Put n into the formula: floor(3n/2).\n④ Since step ① added nothing, step ③'s result is already your final answer — no +1 this time.",
        "① 이 값은 이미 0/1 이라 홀짝 변환 단계는 건너뛰어요 — 더할 게 없어요.\n② 바로 이진수로 읽으면 n 은 얼마인가요?\n③ n 을 공식 floor(3n/2) 에 넣어요.\n④ ①에서 더할 게 없었으니, ③의 결과가 그대로 최종 답이에요 — 이번엔 +1 이 없어요."),
      answer: 15,
      explain: t(E,
        "15 is right. g(10) = 3 × 5 = 15 — counting by hand would take 15 steps, but the formula gives it in one shot.",
        "15 가 맞아요. g(10) = 3 × 5 = 15 — 직접 세면 15 단계나 걸리지만, 식으로는 한 번에 나와요."),
    },
  ];
}


/* ── 계획: 코드 전에 세 단계로 정리 (2026-09-23 신설) ─────────────
   선생님: "코드 전에 뭘 어떻게 하겠다고 자세히 설명한건가?
            시뮬만 보고도 코드를 짤수 있나?" → 못 짠다.
   원인(pedagogy): 3쪽 시뮬은 f 를 4번 되풀이 적용하는 걸 보여주는데
   코드는 그걸 안 한다 — ①홀짝 한 번 ②이진수로 읽기 ③공식. 그 세 단계가
   화면에 없고 7쪽 힌트 안에 정답 전문으로 숨어 있었다(memory/usaco_quest_learning_flow.md
   의 "계획" 단계 부재 · memory/feedback_students_copy_the_answer.md 와 같은 모양).
   모양은 buymilk 의 "Plan" 쪽(BuyMilkPlan)을 그대로 베꼈다 — 파란 박스 +
   번호 걸음, 새 시뮬은 만들지 않는다. 숫자는 전부 학생이 이미 본 것만 쓴다
   (x=210 은 3쪽 시뮬, n=2·g(2)=3 은 "이미 직접 셌어요" 걸음).
   ⚠️ 2026-09-23 두 번째 판정: 예전엔 여기서 "8쪽 표" 처럼 쪽 번호를 박아
   놓았는데, 그 표가 있던 쪽을 다섯 쪽으로 쪼개면서 번호가 다 밀렸다.
   쪽 번호를 아예 안 쓰고 "이미 확인한 값" 으로만 가리키도록 고쳤다 —
   앞으로 쪽이 늘거나 줄어도 이 문장은 안 깨진다. */
function StrangeFnPlan({ E }) {
  const Step = ({ n, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#8b5cf6",
        color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {n}
      </span>
      <div style={{ fontSize: 12.5, lineHeight: 1.7, color: "#334155", wordBreak: "keep-all", textWrap: "balance" }}>
        {children}
      </div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 470, margin: "0 auto" }}>
      <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12,
        padding: "12px 16px", marginBottom: 12, wordBreak: "keep-all", textWrap: "balance" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
          🗺️ {t(E, "Three steps, in code order", "코드가 할 세 단계")}
        </div>
        <Step n={1}>
          {t(E,
            "If any digit isn't 0/1: flip every digit to 0/1 by parity, all at once (1 op).",
            "0/1 이 아닌 자리가 있으면, 한 번에 다 홀짝으로 0/1 로 바꿔요 (1번).")}
        </Step>
        <Step n={2}>
          {t(E,
            "Read the leftover 0/1 digits as binary — that's n.",
            "남은 0/1 을 이진수로 읽어요 — 그게 n 이에요.")}
        </Step>
        <Step n={3}>
          {t(E,
            "Put n into the formula: floor(3n/2).",
            "n 을 공식 floor(3n/2) 에 넣어요.")}
        </Step>
      </div>

      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12,
        padding: "12px 16px", marginBottom: 10 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
          🔁 {t(E, "Double-check with x = 210", "x = 210 으로 다시 세어 봐요")}
        </div>
        <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace",
          wordBreak: "keep-all", textWrap: "balance" }}>
          <div>{t(E, "One by one (page 3): 210 → 10 → 9 → 1 → 0 = 4", "하나씩 세면 (3쪽): 210 → 10 → 9 → 1 → 0 = 4번")}</div>
          <div style={{ marginTop: 6 }}>{t(E, "① parity-flip once → \"010\"", "① 홀짝 변환 1번 → \"010\"")}</div>
          <div>{t(E, "② read as binary → n = 2 (same n we already confirmed)", "② 이진수로 읽으면 → n = 2 (앞에서 확인한 값과 같아요)")}</div>
          <div>{t(E, "③ g(2) = 3", "③ g(2) = 3")}</div>
          <div style={{ marginTop: 4, fontWeight: 800 }}>1 + 3 = 4</div>
        </div>
      </div>

      <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
        padding: "9px 14px", fontSize: 12.5, color: "#166534", fontWeight: 700, textAlign: "center",
        wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E,
          "✅ Same answer, both ways — so these three steps become the code.",
          "✅ 두 방법 다 답이 같아요 — 그래서 이 세 단계가 그대로 코드가 돼요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeStrangeFnCh2
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code: what will it actually do? Three steps.",
        "코드로는 뭘 할까요? 세 단계예요."),
      content: (<StrangeFnPlan E={E} />),
    },
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getStrangeFnWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Flip digits once if needed, then use the formula.",
          "필요하면 자릿수를 한 번 바꾸고, 그 다음 공식을 써요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />),
      };
    })(),
  ];
}
