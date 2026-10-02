import { C, t } from "@/components/quest/theme";
import { NumInput } from "@/components/quest/shared";
import { getStrangeFnSections, getStrangeFnWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { StrangeFnDigitSim } from "./sims";

/* 샘플 입출력 상자의 «← 설명» 라벨 */
const SIO = { color: "#94a3b8", fontSize: 10.5 };

/* 1쪽 «규칙이 무슨 일을 하나» — x = 35 를 끝까지 한 번 보여준다.
   2026-09-30 선생님: *"양의 정수에 정의돼요? 0/1이 아닌 자릿수가 하나라도 있으면? 뭔말이지?"*
   원인 둘 — ①「자릿수」를 «자리의 개수»(제약 상자)와 «그 자리의 숫자»(규칙) 두 뜻으로 썼다
   ②1쪽에 규칙 넷뿐이고 **숫자가 하나도 없었다.** 말을 고치는 것만으론 ②가 안 닫힌다.
   답은 🔒 코드로 검증함: 35 → 5 번, 24 → 1 번 (scripts/run-quest-code.py). */
const F_TRACE_35 = [
  ["35", "11", "3 과 5 는 둘 다 홀수 → 1, 1", "3 and 5 are both odd → 1, 1"],
  ["11", "10", "0 과 1 뿐 → 1 빼기", "only 0s and 1s → subtract 1"],
  ["10", "9", "0 과 1 뿐 → 1 빼기", "only 0s and 1s → subtract 1"],
  ["9", "1", "9 는 홀수 → 1", "9 is odd → 1"],
  ["1", "0", "0 과 1 뿐 → 1 빼기", "only 0s and 1s → subtract 1"],
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeStrangeFnCh1
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "How many times must the rule run to turn x into 0?",
        "이상한 규칙을 몇 번 써야 x 가 0 이 되는지 세는 문제예요."),
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
                "Output how many times we must change x to reach 0, mod 10⁹+7.",
                "x 를 몇 번 바꿔야 0 이 되는지 10⁹+7 로 나눈 나머지를 출력해요.")}
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
                  {t(E, "You get one number ", "수 ")}
                  <b style={{ color: "#8b5cf6" }}>x</b>
                  {t(E, ". Change it over and over by the two rules below.",
                        " 하나를 받아요. 아래 두 규칙으로 계속 바꿔 나가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If x has a digit that is not 0 and not 1 — change ",
                        "x 를 이루는 숫자 중에 0 도 1 도 아닌 게 하나라도 있으면 — ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "every digit", "숫자 하나하나")}</b>
                  {t(E, ": odd becomes 1, even becomes 0.", "를 홀수면 1 로, 짝수면 0 으로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If only 0s and 1s are left — subtract ",
                        "0 과 1 만 남았으면 — x 에서 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "1", "1")}</b>
                  {t(E, " from x.", " 을 빼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "We call one such change ", "이렇게 한 번 바꾸는 것을 ")}
                  <b style={{ color: "#15803d" }}>f</b>
                  {t(E, ". Print how many f's make x become 0, mod ",
                        " 라고 해요. f 를 몇 번 쓰면 x 가 0 이 되는지 ")}
                  <b style={{ color: "#15803d" }}>10⁹+7</b>
                  {t(E, ".", " 로 나눈 나머지를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 규칙만 읽어서는 무슨 일이 일어나는지 안 보인다 — 한 수를 끝까지 따라가 본다 */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#047857", marginBottom: 8, wordBreak: "keep-all" }}>
              🔍 {t(E, "One number, all the way: x = 35", "한 수를 끝까지 따라가 봐요 — x = 35")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {F_TRACE_35.map(([from, to, ko, en], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#047857", minWidth: 62, textAlign: "right" }}>
                    {from} {"→"} {to}
                  </span>
                  <span style={{ fontSize: 11.5, color: C.dim, wordBreak: "keep-all" }}>{t(E, en, ko)}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 9, paddingTop: 8, borderTop: "1px dashed #6ee7b7", fontSize: 12.5, color: "#047857", fontWeight: 700, wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, "0 after 5 changes — so the answer for 35 is 5.",
                    "다섯 번 만에 0 이 됐어요 — 그래서 35 의 답은 5 예요.")}
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
                  "x 마다 f 를 몇 번 써야 0 이 되는지 10⁹+7 로 나눈 나머지로, 한 줄씩 출력해요 (T 줄).")}
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
              {/* 2026-09-23 선생님: "입력값과 출력값이 뭐를 의미하는데? 학생은 이걸 알았어?"
                  — 숫자만 있고 **뜻이 어디에도 없었다.** 설명은 한 쪽 전(「첫 줄에 T」)에 있는데,
                  쪽을 넘기면 앞 쪽은 사라진다. 학생은 그 `T` 와 이 `2` 를 스스로 이어야 했다.
                  학생 넷이 다녀갔는데 아무도 안 짚었다 — 아무도 이걸 묻지 않았다.
                  형제 quest `checkups/chapters.jsx:97` 이 쓰는 «← 설명» 모양을 그대로 쓴다.
                  근거: memory/feedback_screen_must_not_rely_on_memory.md */}
              <div>2      <span style={SIO}>← {t(E, "2 problems below", "아래에 문제 2개")}</span></div>
              <div>24680  <span style={SIO}>← {t(E, "first x", "첫 번째 x")}</span></div>
              <div>210    <span style={SIO}>← {t(E, "second x", "두 번째 x")}</span></div>
            </div>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div>1  <span style={SIO}>← {t(E, "answer for 24680", "24680 의 답")}</span></div>
              <div>4  <span style={SIO}>← {t(E, "answer for 210", "210 의 답")}</span></div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Trace x = 24680", "추적 x = 24680")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" , wordBreak: "keep-all", textWrap: "balance" }}>
              <div>24680 → {t(E, "has digits other than 0/1", "0 도 1 도 아닌 숫자가 있음")}</div>
              <div>{t(E, "each digit by parity:", "자리별 홀짝:")} 2→0, 4→0, 6→0, 8→0, 0→0</div>
              <div>= 00000 = 0 ✅ <b style={{ color: "#15803d" }}>{t(E, "1 op (f used once)", "1번 (f 를 한 번 씀)")}</b></div>
            </div>
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <StrangeFnDigitSim E={E} />
          </div>
        </div>),
    },

    // 1-4~7 병합 (2026-09-23, 선생님 "쇼츠에 익숙한 애들이 저걸 다 읽겠어"):
    // 옛 1-4(한계)를 다리 문장 한 줄로 줄여 이 쪽 맨 위로 접었다 — 옛 1-4의 제약
    // 상자는 2쪽과 그대로 겹쳐서 뺐다(§같은 말 두 곳 규칙). 옛 1-5·1-6·1-7(x=1·10·11)
    // 은 셋 다 난이도 1~2·한 번에 정답이라 한 쪽에 모은다 — 실측:
    // "5~7 — 내가 손으로 계산했고 다 맞았다(1, 3, 4)." 세 값은 그대로 둔다(9쪽이 다시 부른다).
    {
      type: "reveal",
      narr: t(E,
        "Let's count by hand for small values first.",
        "작은 값부터 직접 세어 봐요."),
      content: (
        <div>
          <div style={{ padding: "16px 16px 6px", fontSize: 12, color: "#7f1d1d", lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "x can reach 200,000 digits, and f only takes 1 off at a time.\nCounting one by one never ends — so find a rule from small values.",
              "x 는 20만 자리까지 가는데 f 는 1 씩만 빼요. 하나씩 세면 끝나지 않아요.\n작은 값부터 세어 규칙을 찾아요.")}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <NumInput E={E}
              question={t(E,
                "x = 1. How many f's until it hits 0?",
                "x = 1 이에요. 0 이 될 때까지 f 를 몇 번 써야 할까요?")}
              hint={t(E,
                "x with only 0/1 digits uses the x − 1 rule.\nWhat's 1 − 1? Is that already 0?",
                "x 가 0 과 1 로만 되어 있으면 x − 1 규칙을 써요.\n1 − 1 은 몇인가요? 바로 0 이 되나요?")}
              answer={1}
              explain={t(E,
                "1 is right. 1 → 0, one f.",
                "1 이 맞아요. 1 → 0, 한 번이에요.")}
            />
          </div>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <NumInput E={E}
              question={t(E,
                "x = 10 (only 0s and 1s). How many f's until it hits 0? Count it out.",
                "x = 10 이에요 (0 과 1 만 있어요). 0 이 될 때까지 f 를 몇 번 써야 할까요? 직접 세어 보세요.")}
              hint={t(E,
                "10 has only 0s and 1s → subtract 1 → 9.\n9 is not 0/1, so the rule switches. Count to 0.",
                "10 은 0 과 1 뿐이라 1 을 빼요 → 9.\n9 는 0 도 1 도 아니니 규칙이 바뀌어요. 0 까지 세어 보세요.")}
              answer={3}
              explain={t(E,
                "3 is right. 10 → 9 → 1 → 0, three f's.\nx = 1 took 1, x = 10 took 3 — it didn't just go up by one.",
                "3 이 맞아요. 10 → 9 → 1 → 0, 세 번이에요.\nx = 1 은 1 번, x = 10 은 3 번이에요. 하나씩 늘지는 않네요.")}
            />
          </div>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <NumInput E={E}
              question={t(E,
                "x = 11 (only 0s and 1s too). How many f's until it hits 0?",
                "x = 11 이에요 (이것도 0 과 1 만 있어요). 0 이 될 때까지 f 를 몇 번 써야 할까요?")}
              hint={t(E,
                "Same two rules as before — keep alternating until you reach 0, and count every step.",
                "같은 두 규칙을 번갈아 써요. 0 까지 몇 번인지 세어 보세요.")}
              answer={4}
              explain={t(E,
                "4 is right. 11 → 10 → 9 → 1 → 0, four f's.\n1, 10, 11 — all three use only 0s and 1s.\nLet's line up numbers like these and look for a pattern.",
                "4 가 맞아요. 11 → 10 → 9 → 1 → 0, 네 번이에요.\n1, 10, 11 — 셋 다 0 과 1 로만 된 수예요.\n이런 수만 따로 늘어놓아 규칙을 찾아볼게요.")}
            />
          </div>
        </div>),
    },

    // 1-6 A: 이진수로 읽는 법 (2026-09-23 PM 판정 — 8쪽 5개 박스를 5쪽으로 쪼갠다.
    // 근거: memory/quest_season_shape_consistency.md("쪽 하나에 표 하나") +
    // feedback_screen_must_not_rely_on_memory. 걸음 A~E, 각 걸음은 질문 하나만 답한다.
    {
      type: "reveal",
      narr: t(E,
        "How do the leftover 0s and 1s become one number?",
        "남은 0과 1을 어떻게 하나의 수로 읽을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            {/* ⛔ 2026-10-01 — 여기가 「답을 먼저 통보하던」 자리다.
                본문은 「이진수」라는 말을 **일부러 피해서** 「십진수로 고치면」으로 돌아갔는데,
                **헤더 한 줄이 그 노력을 무효화**하고 있었다 — 학생은 쪽을 열자마자
                **아직 뜻을 모르는 말**부터 읽었다. 실측: 「이진수」의 뜻을 밝히는 문장이
                화면에 **0개**였다(헤더 1곳 + 아는 말처럼 쓰는 곳 4곳).
                이름은 **표를 본 뒤**에 붙인다 — 아래 ④ 자리. */}
            🔢 {t(E, "Line them up and read", "늘어놓고 읽기")}
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
              {/* 2026-09-30 선생님 *"설명 너무 길어"* — 네 문단이었다.
                  자리값 설명은 바로 아래 예 상자가 「자리값 2 · 자리값 1」로 이미 보여준다. */}
              {/* 2026-09-30 선생님: *"뭔말이지? 한표를 늘어놓으면 하나의 수로 맞춰야해요?
                  그대로 읽으면 X가 수 n하나가 돼요?"* — 내가 **추상적으로 말하고 숫자를
                  안 보여줬다.** 오늘 1쪽에서 겪은 것과 같은 실수다.
                  「하나의 수로 맞춘다」가 실제로 무슨 일인지 **그 자리에서 숫자로** 보인다:
                    1, 10, 11 → 1, 2, 3. 그게 전부다. */}
              {/* 2026-09-30, 선생님이 **두 번** 지적하셨다 — *"뭔말이지?"* → *"아직도 추상적이야"*.
                  두 번 다 내가 «왜 이진수인가»를 **말로 설명하려** 했기 때문이다.
                  진짜 답은 설명이 아니라 **늘어놓고 보면 보이는 것**이었다:
                    0 과 1 만 쓰는 수를 작은 것부터 세면 1, 10, 11, 100, 101 …
                    그게 이진수로 1, 2, 3, 4, 5 … 를 센 것과 **완전히 같은 차례**다.
                  (기계로 확인함 — 오름차순이 정확히 일치한다.)
                  ⛔ 여기에 「그러면 규칙을 찾을 수 있어요」 같은 **보람 설명을 덧붙이지 마라.**
                     그게 두 번 다 「추상적」이라는 말을 들은 자리다. */}
              <div>{t(E,
                "One rule turns every digit into 0 or 1 — so its result is always made only of 0s and 1s (page 1: 35 → 11).\nThe numbers we count are 0s and 1s not by choice but because the rule makes them so. Line them up from the smallest:\n1, 10, 11, 100, 101 …",
                "규칙 하나가 숫자를 전부 0 아니면 1 로 바꾸죠 — 그래서 그 규칙을 쓰면 결과는 늘 0 과 1 로만 된 수예요 (1쪽 35 → 11 처럼).\n우리가 세는 수가 0 과 1 뿐인 건 고른 게 아니라 규칙이 그렇게 만든 거예요. 작은 것부터 늘어놓아 봐요.\n1, 10, 11, 100, 101 …")}</div>
              {/* 선생님 제안(2026-09-30): *"이걸 십진수로 고쳐면… 이라고 하면 더 쉽지 않을까?"*
                  맞다. «바꿔 부르는 게 이진수예요» 는 **이름을 가르치는 문장**이고,
                  «십진수로 고치면» 은 **학생이 이미 아는 곳으로 데려다주는 문장**이다.
                  ⚠️ 이 quest 에 「십진수」가 처음 나오는 자리라 뜻을 한 번만 붙인다
                     (`feedback_no_invented_terms`: 용어는 처음 쓰기 전에 정의). */}
              <div style={{ marginTop: 6 }}>{t(E,
                "Turn those into decimal and you get\n1, 2, 3, 4, 5 …\n10 becomes 2. 11 becomes 3.",
                "이걸 십진수로 고치면 1, 2, 3, 4, 5 … 예요.\n10 은 2 가 되고, 11 은 3 이 돼요.")}</div>
            </div>
          </div>
          {/* ⭐ 2026-10-01 — 옛 6쪽(표 + 이름 붙이기)을 **이 쪽으로 끌어왔다.** 쪽 11 → 10.
              학생: *"같은 줄에서 「10」이 「2」로 바뀌는 걸 보면 **5쪽을 기억하고 있어야만**
              넘어간다. 깜빡하고 왔다면 「10이 왜 갑자기 2야?」 하고 **멈추게 된다.**"*
              처방은 둘인데(①앞 내용을 요약해 다시 보여준다 ②애초에 같은 화면에 둔다)
              **②가 공짜다** — 문장을 안 늘리고 기억 의존이 구조적으로 사라진다.
              ux 실측: 241px + 332px = 573~650px → **1.5~1.6 화면**.
              이미 라이브인 3·4쪽이 1.62 화면이라 **전례가 이 크기를 통과시키고 있다.**
              (옛 「자리값 2 / 1×2+0×1=2」 예 상자는 어제 뺐다 — 아래 표가 같은 계산을 한다.) */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
              ✅ {t(E, "You counted these yourself", "직접 센 값이에요")}
            </div>
            <table style={{ width: "100%", fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace", color: "#166534", borderCollapse: "collapse" }}>
              {/* ⛔ 2026-09-30 선생님: *"뭔가 훅 사라진 느낌인데. g(n)이 어떻게 구해졌는지
                  모를텐데."* — 처음 표로 바꿀 때 **가운데 칸의 계산 과정을 지워** 표가
                  결과만 주장하게 만들었다. `1×2 + 0×1 = 2` 를 되살린다.
                  오른쪽 칸도 어디서 온 값인지 머리글에 적는다(앞 쪽에서 학생이 직접 셌다). */}
              <thead>
                <tr style={{ color: "#15803d" }}>
                  {/* 2026-09-30 학생이 유일하게 찾은 것 — *"10 이 4쪽에서는 그냥 십진수 10
                      이었는데 6쪽 표에서는 이진수로 읽어서 2 로 다시 쓰인 것이 헷갈렸다.
                      머리가 한 번 꼬였다."* → `feedback_same_number_two_meanings` 위반이다.
                      머리글에 **이게 x 라는 것과, 0/1 만 쓰는 수라는 것**을 밝혀 두 뜻을 가른다. */}
                  <th style={{ padding: "4px 6px", textAlign: "left", fontFamily: "inherit" }}>{t(E, "x (only 0s and 1s)", "x (0 과 1 만 써요)")}</th>
                  <th style={{ padding: "4px 6px", textAlign: "left", fontFamily: "inherit" }}>{t(E, "in decimal", "십진수로 고치면")}</th>
                  <th style={{ padding: "4px 6px", textAlign: "left", fontFamily: "inherit" }}>{t(E, "times (counted on page 4)", "몇 번 (4쪽에서 직접 셌죠)")}</th>
                </tr>
              </thead>
              <tbody>
                {/* 선생님: *"직접세었다는건 어떻게 했다는거지?"* — 답만 있고 **과정이 없었다.**
                    「센다」는 걸음이 여러 개라는 뜻인데 화면엔 숫자 하나뿐이었다.
                    칸 안에 걸음을 그대로 넣는다(따로 목록을 만들지 않는다 — 분량 때문). */}
                <tr><td style={{ padding: "3px 6px" }}>1</td><td>1×1 = 1</td><td>1 &nbsp;(1→0)</td></tr>
                <tr><td style={{ padding: "3px 6px" }}>10</td><td>1×2 + 0×1 = 2</td><td>3 &nbsp;(10→9→1→0)</td></tr>
                <tr><td style={{ padding: "3px 6px" }}>11</td><td>1×2 + 1×1 = 3</td><td>4 &nbsp;(11→10→9→1→0)</td></tr>
              </tbody>
            </table>
          </div>
          {/* ⭐ 2026-10-01 — **이름은 여기서 처음 붙인다.** 표를 본 뒤라
              「방금 x 칸에서 본」이 가리키는 대상이 **화면에 같이 있다.**
              ⛔ 이 문장을 위로 올리지 마라 — 그게 「답을 먼저 통보한다」는 결함이었다. */}
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "This way of writing with only 0s and 1s is called binary — the 1, 10, 11 you just saw in the x column are all binary.",
              "0 과 1 만 쓰는 이 방법을 이진수라고 해요 — 방금 x 칸에서 본 1, 10, 11 이 전부 이진수예요.")}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Name the middle column n, and the right column g(n).\nSo when n is 2, the answer is 3 — we write g(2) = 3.",
              "가운데 칸을 n, 오른쪽 칸을 g(n) 이라고 부를게요.\nn 이 2 일 때 3 이니까, g(2) = 3 이라고 적어요.")}
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
          {/* ⚠️ 2026-10-01 재검증 학생: *"「형태」 칸에 `2k`, `2k+1` 이 갑자기 나오는데
              **`k` 가 뭔지 설명이 없었다.** 「k가 뭐지?」 하고 **잠깐 멈췄다.**
              6쪽에서 짐작하고 **7쪽 끝에 가서야 확인했다.**"*
              원인: 옛 8쪽 표를 이 쪽으로 흡수하면서 **표만 옮기고 정의는 두고 왔다.**
              이름은 **처음 쓰는 자리**에서 밝힌다. 7쪽 끝의 중복 정의는 지웠다. */}
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 8, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Let's call n divided by 2 (the quotient) k — that's what the «form» column uses.",
              "n 을 2 로 나눈 몫을 k 라고 부를게요 — 아래 「형태」 칸에서 써요.")}
          </div>
          {/* 2026-09-23 교육 담당 지적: ✅ 가 붙은 n=1,2,3 만 학생이 직접 센 값인데
              n=0,4,5,6,7 의 g(n) 이 **출처 없이** 같이 올라와 있었다.
              다음 쪽이 그 값들로 "3k / 3k+1 과 맞나" 를 확인시키는데,
              믿을 근거가 없으면 확인이 아니라 순환논증이 된다.
              ⚠️ 손으로 세게 만들지는 않는다 — 여섯 걸음짜리 반복이라 이미 기각됐다.
              한 줄이면 된다(새 쪽·새 클릭 0). */}
          <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 6, wordBreak: "keep-all" }}>
            {t(E,
              "✅ rows are the ones you counted yourself. The rest were counted the same way, ahead of time.",
              "✅ 가 붙은 줄은 직접 센 값이에요. 나머지도 같은 방법으로 미리 세어 둔 값이에요.")}
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: C.text, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>n</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>g(n)</th>
                  {/* ⭐ 2026-10-01 — 옛 8쪽 표를 **여기로 흡수했다.** 두 표가 `n`·`g(n)` 두 칸을
                      **토씨 하나 안 틀리고 두 번** 보여주고 있었다(ux 실측). 학생이 같은 숫자를 두 번 읽었다.
                      「짝수/홀수」 칸을 「형태」로 바꾸면 그 칸이 하던 일(짝·홀 가르기)을 2k·2k+1 이 그대로 한다.
                      ⚠️ 형태는 **짧게** — `2k+1` 까지만. `k=3 → 3k+1=10` 은 g(n) 칸이 이미 10 을 보여줘서 재계산이다.
                      그래야 375px 에서 안 뭉갠다. */}
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>{t(E, "form", "형태")}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>0</td><td>0</td><td>2k</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>1 ✅</td><td>1</td><td>2k+1</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>2 ✅</td><td>3</td><td>2k</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>3 ✅</td><td>4</td><td>2k+1</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>4</td><td>6</td><td>2k</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>5</td><td>7</td><td>2k+1</td></tr>
                <tr style={{ background: "#eef2ff" }}><td style={{ padding: "3px 8px" }}>6</td><td>9</td><td>2k</td></tr>
                <tr style={{ background: "#fffbeb" }}><td style={{ padding: "3px 8px" }}>7</td><td>10</td><td>2k+1</td></tr>
              </tbody>
            </table>
          </div>
        </div>),
    },

    /* 1-6 D: **왜 1.5 배인가** — 2026-10-01 재설계(담당자 둘 2라운드 수렴, PM 종합).
       ⛔ 여기 있던 것 둘을 뺐다:
         · 추상 문장 *"자리가 넘어갈 때마다 걸음이 하나 더 껴요"* — **숫자가 0개**인 주장이었다.
           학생이 **여기서 그만두고 싶어했다**: *"「자리가 넘어간다」가 어느 순간인지 전혀
           그림이 안 그려졌다. 화면은 **검산만 보여줄 뿐 유도 과정을 안 보여준다.**"*
         · n=0~7 8행 표 — 앞 쪽 표와 **같은 9행을 토씨 하나 안 틀리고 두 번** 보여줬다.
       ⭐ 대신 **앞 쪽에서 이미 본** `11 → 10 → 9 → 1 → 0` 에 **라벨 둘만** 붙인다.
          새 숫자도 새 시뮬도 안 만든다 — 학생이 스스로 찾아낸 바로 그 구조다:
          *"`10→9` 는 자리 빌림, `9→1` 이 그 뒤에 끼는 한 걸음."*
          이 트레이스 **하나 안에 두 경우가 다 들어 있어서**(`11→10` 은 안 넘어감)
          「한 경우로 항상을 주장」도 피한다(`feedback_one_case_cannot_claim_always`).
       ⚠️ **「홀짝」 단독으로 쓰지 마라** — 바로 앞 쪽이 「짝수/홀수」를 **n 의 성질**로 쓴다.
          규칙을 가리킬 땐 quest 가 이미 쓰는 고정 이름 **「홀짝 변환」**으로. 새 용어 금지.
       검증: 「마지막 자리가 0 이면 보정 1번」 → n=1..300 전수 어긋남 0건(메인 세션). */
    {
      type: "reveal",
      /* ⛔ 백로그에서 꺼냈다 (2026-10-01) — 학생: *"「아까 그 줄」이 **그게 뭔지 몰라서
           5쪽까지 두 번 뒤로 갔다 왔어요.** n=3 이라는 **숫자만 툭** 나와요."*
         ⚠️ PM 이 *"narr 을 바꾸면 자연히 풀린다"* 고 봤는데 **안 풀렸다**(그 기록도 WORK.md 에 있다).
         ⭐ 「몇 쪽을 보라」고 되돌려 보내는 게 답이 아니다 — **그 줄을 이 쪽에 데려온다**
           (`feedback_screen_must_not_rely_on_memory`: 「앞에서처럼」이라고 썼으면
            그게 무엇인지 **옆에 같이 있어야** 한다).
         그래서 ①narr 에서 「아까」를 없애고 ②제목에 **줄 전체와 n↔이진수 연결**을 박는다.
         5쪽 표가 이미 `11 | 1×2 + 1×1 = 3 | 4 (11→10→9→1→0)` 로 같은 값을 쓴다 — 숫자가 어긋나지 않는다. */
      narr: t(E,
        "n = 3 takes four steps — let's walk them.",
        "n = 3 은 네 걸음이에요. 한 걸음씩 다시 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            🔍 {t(E, "n = 3 (binary 11) — 11 → 10 → 9 → 1 → 0, four steps",
                     "n = 3 (이진수로 11) — 11 → 10 → 9 → 1 → 0, 네 걸음")}
          </div>
          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                ["11 → 10", "끝자리가 1 이라 그냥 1 을 빼면 끝", "last digit is 1 — just subtract 1"],
                ["10 → 9", "끝자리가 0 이라 자리가 넘어가요 → 홀짝 변환이 한 번 더 껴요", "last digit is 0 — a digit carries over → one parity swap is added"],
                ["9 → 1", "그 홀짝 변환이에요", "that is the parity swap"],
                ["1 → 0", "다시 그냥 1 을 빼요", "just subtract 1 again"],
              ].map(([mv, ko, en], i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#5b21b6", minWidth: 68 }}>{mv}</span>
                  <span style={{ fontSize: 11.5, color: C.dim, wordBreak: "keep-all" }}>{t(E, en, ko)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "So a carry adds one extra step — which is why n alone is not the answer, only close to it.\nThe next page pins down the exact formula.",
              "자리가 넘어갈 때마다 이렇게 한 걸음이 더 껴요 — 그래서 n 만으론 정확하지 않고 비슷하게만 맞아요.\n다음 쪽에서 정확한 식으로 확인해요.")}
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
            {/* 2026-09-30: x = 210 재확인 줄을 뺐다 — ch2 「코드가 할 세 단계」 쪽의
                「🔁 x = 210 으로 다시 세어 봐요」 가 **같은 계산을 그대로** 한다.
                경고 본문(왜 +1 이 필요한가)은 그대로 둔다. */}
          </div>
        </div>),
    },

    // 1-7~8 병합 (2026-09-23, 쇼츠 지적에 이어 두 연습쪽 병합 — 힌트는 기본
    // 접혀 있어(NumInput 은 눌러야 열림) 두 문제를 한 쪽에 둬도 화면이 빽빽해지지
    // 않는다. 두 값(37·1010)이 서로 다른 경우(변환 필요/불필요)를 맡는 건 그대로 유지.
    {
      type: "reveal",
      narr: t(E,
        "Practice with two more values.",
        "두 값을 더 연습해 봐요."),
      content: (
        <div>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <NumInput E={E}
              question={t(E,
                "How many f's for x = 37? (has a digit other than 0/1)",
                "x = 37 은 몇 번 만에 0 이 될까요? (0/1 이 아닌 자리가 있어요)")}
              hint={t(E,
                "① Flip 3 and 7 by parity — what do you get? (that flip counts as 1)\n② Read that as binary — what's n?\n③ Put n into floor(3n/2), then add the 1 from ①.",
                "① 3 과 7 을 홀짝으로 바꾸면? (이 변환도 1 번)\n② 그걸 이진수로 읽으면 n 은?\n③ floor(3n/2) 에 넣고, ①의 1 번을 더해요.")}
              answer={5}
              explain={t(E,
                "5 is right. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\nSame as 1 + g(3) = 1 + 4 = 5.",
                "5 가 맞아요. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\n1 + g(3) = 1 + 4 = 5 와 같아요.")}
            />
          </div>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <NumInput E={E}
              question={t(E,
                "How many f's for x = 1010? (already only 0/1)",
                "x = 1010 은 몇 번 만에 0 이 될까요? (이미 0 과 1 만 있어요)")}
              hint={t(E,
                "① Already only 0s and 1s, so skip the parity flip — no 1 to add.\n② Read it as binary — what's n?\n③ floor(3n/2) is the answer as it stands.",
                "① 이미 0 과 1 뿐이라 홀짝 변환을 건너뛰어요 — 더할 1 이 없어요.\n② 이진수로 읽으면 n 은?\n③ floor(3n/2) 가 그대로 답이에요.")}
              answer={15}
              explain={t(E,
                "15 is right. g(10) = 3 × 5 = 15 — counting by hand would take 15 steps, but the formula gives it in one shot.",
                "15 가 맞아요. g(10) = 3 × 5 = 15 — 직접 세면 15 단계나 걸리지만, 식으로는 한 번에 나와요.")}
            />
          </div>
        </div>),
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
          "필요하면 숫자를 한 번 바꾸고, 그 다음 공식을 써요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />),
      };
    })(),
  ];
}
