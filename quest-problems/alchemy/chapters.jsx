import { C, t } from "@/components/quest/theme";
import { getAlchemyWalk, RecipeSimulator } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-22, PM 판정 ⑤: 영어 297자 3문장 — 문단이었다. 한 문장으로 줄인다. */
      narr: t(E,
        "Use recipes as many times as you like — what's the max units of metal N you can end up with?",
        "레시피를 여러 번 써서 금속 N 을 최대 몇 개까지 만들 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"⚗️"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Alchemy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the MAXIMUM number of units of metal N you can craft.",
                "만들 수 있는 금속 N 의 최대 개수를 출력해요.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N metals numbered 1..N", "1..N 번호의 금속 N개")}</b>
                  {t(E, ". You're told how many units of each metal you start with.",
                        "가 있어요. 각 금속을 몇 개씩 가지고 시작하는지도 함께 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {/* 2026-09-22, PM 판정 ①: 원문은 "K (K < N) recipes … at most one recipe
                    to make it" — 레시피가 모든 금속에 있는 게 아니고, 있어도 금속 하나당
                    최대 하나뿐이다. 아래 2쪽 "금속 4 가 없어서" 와 맞춘다. usaco.org 원문 확인. */}
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Only some metals ", "레시피가 있는 금속은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "have a recipe (K of them, K < N)", "일부(K개, K < N)뿐")}</b>
                  {t(E, " — a set of distinct lower-numbered metals that combines into 1 unit of it. Every metal has at most one recipe.",
                        "이에요 — 있으면, 서로 다른 더 낮은 번호의 금속들을 모아서 1개를 만들 수 있어요. 금속 하나에 레시피는 있어도 최대 하나예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You can ", "레시피는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "apply any recipe any number of times", "원하는 만큼 여러 번 사용")}</b>
                  {t(E, ", as long as you have the ingredients.",
                        "할 수 있어요. 재료만 있으면 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the maximum number of units of metal N you can make", "만들 수 있는 금속 N 의 최대 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <RecipeSimulator E={E} />
        </div>),
    },
    // 1-2: Official I/O format + verbatim sample + worked example
    {
      type: "reveal",
      narr: t(E,
        "Here is the exact input/output format and the official sample. Trace it once so the recipe-line format is clear.",
        "입출력 형식과 공식 예제를 한 번 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6 }}>📥 {t(E, "Input", "입력")}</div>
            <div>{t(E, "Line 1: N (number of metals, 1 ≤ N ≤ 100).", "1번째 줄: 금속 개수 N (1 ≤ N ≤ 100).")}</div>
            <div>{t(E, "Line 2: N integers a[1..N] — starting units (0 ≤ a[i] ≤ 10000).", "2번째 줄: 정수 N 개 a[1..N] — 처음에 가진 개수예요 (0 ≤ a[i] ≤ 10000).")}</div>
            <div>{t(E, "Line 3: K (number of recipes, 1 ≤ K < N).", "3번째 줄: 레시피 개수 K (1 ≤ K < N).")}</div>
            <div>{t(E, "Next K lines: L M ing_1 … ing_M — make 1 of metal L from M ingredients.", "다음 K줄: L M 재료_1 … 재료_M — 재료 M개로 금속 L 1개를 만들어요.")}</div>
            <div style={{ fontWeight: 700, color: "#92400e", margin: "8px 0 6px" }}>📤 {t(E, "Output", "출력")}</div>
            <div>{t(E, "The maximum number of units of metal N achievable.", "만들 수 있는 금속 N 의 최대 개수를 써요.")}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Input", "예제 입력")}</div>
              <pre style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`5
2 0 0 1 0
3
5 2 3 4
2 1 1
3 1 2`}</pre>
            </div>
            <div style={{ flex: 1, minWidth: 110 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Output", "예제 출력")}</div>
              <pre style={{ background: "#0f172a", color: "#86efac", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`1`}</pre>
            </div>
          </div>
          {/* TODO: sim redesign — a static worked example, can become an animated craft-trace later */}
          <div style={{ background: "#fff", border: "1px dashed #fcd34d", borderRadius: 10, padding: "10px 12px", marginTop: 10, fontSize: 11.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>🔍 {t(E, "Reading the recipe lines", "레시피 줄 읽기")}</div>
            <div>{t(E, "\"5 2 3 4\" → make metal 5 from M=2 ingredients: metals 3 and 4.", "\"5 2 3 4\" → 재료 M=2개(금속 3, 4)로 금속 5 를 만들어요.")}</div>
            <div>{t(E, "\"2 1 1\" → make metal 2 from M=1 ingredient: metal 1.", "\"2 1 1\" → 재료 M=1개(금속 1)로 금속 2 를 만들어요.")}</div>
            <div>{t(E, "\"3 1 2\" → make metal 3 from M=1 ingredient: metal 2.", "\"3 1 2\" → 재료 M=1개(금속 2)로 금속 3 을 만들어요.")}</div>
            <div style={{ marginTop: 6, wordBreak: "keep-all" }}>
              {/* 2026-09-22, PM 판정 ⑤(ux 실측): 143자 한 줄이 모바일에서 "금속"과 "5"
                  사이가 끊겼다. 절 단위로 <br/> 을 직접 넣고, 숫자마다 "금속" 을 붙인다
                  (학생 지적: "1→2→3 부분은 '금속' 이 빠지고 숫자만 있어서 눈이 멈췄어요"). */}
              {t(E, "Start: metal 1 = 2, metal 4 = 1, rest 0.", "처음에 금속 1 이 2개, 금속 4 가 1개 있고 나머지는 0 이에요.")}
              <br />
              {t(E, "Turn metal 1 → metal 2 → metal 3.", "금속 1 → 금속 2 → 금속 3 으로 바꿔요.")}
              <br />
              {t(E, "Then metal 3 + metal 4 → metal 5 — that's one unit made.", "그리고 금속 3 + 금속 4 → 금속 5 를 만들면 금속 5 가 1개 나와요.")}
              <br />
              {t(E, "Only one metal 1 is left, not enough for a second metal 5 → answer 1.", "그 뒤 금속 1 이 1개 남지만 금속 4 가 없어서 두 번째 금속 5 는 못 만들어요 → 답은 1 이에요.")}
            </div>
          </div>
        </div>
      ),
    },
    // 1-3: Quiz — 2026-09-22 PM 판정 ②③: 3쪽 숫자를 1쪽 시뮬(RecipeSimulator) 초기값에
    // 맞춘다 (금속1=3, 금속2=2, 금속3=1). "방금 눌러본 시뮬 그대로" 로 이어지게.
    // 검산: scripts/alchemy_check.py — solve(3, [3,2,1], {3:[1,2]}) == 3.
    {
      type: "quiz",
      narr: t(E,
        "Same numbers as the sim you just tried — what's the answer?", "방금 시뮬 그대로예요 — 답이 뭘까요?"),
      question: t(E,
        "Recipe: metal1 + metal2 -> metal3. Start: 3 of metal1, 2 of metal2, already 1 of metal3. Max metal3 you can end up with?",
        "레시피는 금속1 + 금속2 = 금속3 이에요. 처음에 금속1 이 3개, 금속2 가 2개, 금속3 이 이미 1개 있어요. 최대 몇 개의 금속3 을 가질 수 있나요?"),
      options: [
        t(E, "3", "3"),
        t(E, "4", "4"),
        t(E, "2", "2"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The 1 you already have + 2 more you can craft = 3 total.",
        "맞아요! 이미 있던 1개 + 새로 만들 수 있는 2개 = 총 3개예요."),
    },
    // 1-4: Input — 2026-09-22 PM 판정 ②: 3쪽과 다른(더 어려운) 예제로 — 2단계 레시피
    // 사슬에서 재고가 부분 소비된 뒤 실패하는 경우를 직접 계산해 본다.
    // 검산: solve(3, [5,0,0], {2:[1], 3:[1,2]}) == 2 (scripts/alchemy_check.py).
    {
      type: "input",
      narr: t(E,
        "A harder recipe chain: metal 2 needs metal 1, and metal 3 needs metal 1 AND metal 2.",
        "이번엔 레시피가 두 단계예요 — 금속2 는 금속1 로, 금속3 은 금속1 과 금속2 로 만들어요."),
      question: t(E,
        "Two recipes: metal2 is made from metal1, and metal3 is made from metal1 AND metal2. You start with 5 of metal1 (0 of metal2, metal3). Max metal3 you can make?",
        "레시피는 두 개예요: 금속2 는 금속1 로 만들고, 금속3 은 금속1 과 금속2 로 만들어요. 처음에 금속1 이 5개 있어요(금속2, 금속3 은 0개). 금속3 을 최대 몇 개까지 만들 수 있나요?"),
      hint: t(E,
        "Each metal3 needs 1 metal1 directly, plus 1 metal2 — but that metal2 itself needs 1 more metal1. So each metal3 actually costs 2 of metal1.",
        "금속3 하나를 만들려면 금속1 1개(직접) + 금속2 1개가 필요해요. 근데 금속2 하나를 만들려면 금속1 이 또 1개 필요해요 — 그래서 금속3 하나당 금속1 이 사실 2개씩 들어가요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (1 step)
   2026-09-22, PM 판정 ④: ProgressiveCodeStepper(섹션 1개, 코드 위 "왜" 3줄)를
   CodeWalk 으로 바꾼다 — 이미 확립된 절차(moohunt·buymilk·makedistinct).
   🔒 FULL_PY / FULL_CPP 는 한 글자도 안 바꿨다 (components.jsx 의 getAlchemyWalk 참고).
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh2(E, lang = "py") {
  const w = getAlchemyWalk(E, lang);
  return [
    // 2-1: CodeWalk
    {
      type: "reveal",
      narr: t(E,
        "Walk through the code piece by piece to see how we craft metal N.",
        "코드를 한 조각씩 짚어가며 금속 N 을 만드는 방법을 봐요."),
      content: (
        <>
          <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} marks={w.marks} beats={w.beats} accent="#d97706" />
          {/* 2026-09-24: 파이썬은 여기까지다. 재귀를 걷어 2.7배 빨라졌지만(1.82초 → 0.67초)
              채점기 2·3번은 여전히 시간 초과다(9/11). 숫자는 전부 그날 실제로 받은 결과다. */}
          {lang === "py" && (
            <div style={{
              margin: "0 16px 16px", background: "#fff7ed", borderRadius: 8, padding: "8px 12px",
              border: "1.5px solid #fdba74", fontSize: 12, color: "#9a3412",
              lineHeight: 1.6, wordBreak: "keep-all", whiteSpace: "pre-line",
            }}>
              {t(E,
                "Heads up: crafting one metal can pull in a long chain of other metals, and the same chain gets rebuilt many times. Python is too slow for the largest inputs.",
                "\uc9da\uace0 \uac08 \uac83\uc774 \uc788\uc5b4\uc694. \uae08\uc18d \ud558\ub098\ub97c \ub9cc\ub4e4\ub824\uba74 \ub2e4\ub978 \uae08\uc18d\uc774 \uae38\uac8c \ub530\ub77c\uc624\uace0,\n\uac19\uc740 \uc904\uae30\ub97c \uc5ec\ub7ec \ubc88 \ub2e4\uc2dc \ub9cc\ub4e4\uc5b4\uc694. \uc81c\uc77c \ud070 \uc785\ub825\uc5d0\uc11c\ub294 \ud30c\uc774\uc36c\uc774 \ub290\ub824\uc694.")}
              <div style={{ marginTop: 4, fontWeight: 700 }}>
                {t(E, "Actual grading: Python 9/11 (TLE on 2\u20133) \u00b7 C++ 11/11 PASS.",
                     "\uc2e4\uc81c \ucc44\uc810: \ud30c\uc774\uc36c 9/11 (2\u00b73\ubc88 \uc2dc\uac04 \ucd08\uacfc) \u00b7 C++ 11/11 \ud1b5\uacfc.")}
              </div>
            </div>
          )}
        </>
      ),
    },
  ];
}
