import { C, t } from "@/components/quest/theme";
import { getMcc21SimpleMathSections, getMcc21SimpleMathBruteSections } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE (counting per element / per bit — never enumerate
   the 2^N − 1 subsets). Verified on samples 24 / 23 / 12.
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

/* small sample card used in the input step */
function SampleCard({ E, p, out, note }) {
  return (
    <div style={{ flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", gap: 8, ...KA }}>
        <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: "10px 0 0 10px", padding: "8px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6, flex: 1 }}>
          <div style={{ color: "#8b949e", fontSize: 10.5, marginBottom: 2 }}>{t(E, "input", "입력")}</div>
          <div>N = 3</div>
          <div>P = {p}</div>
          <div>A = [1, 2, 3]</div>
        </div>
        <div style={{ background: "#0f172a", color: "#fb923c", borderRadius: "0 10px 10px 0", padding: "8px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6, minWidth: 64 }}>
          <div style={{ color: "#8b949e", fontSize: 10.5, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{out}</div>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: C.dim, marginTop: 4, textAlign: "center", ...KA }}>{note}</div>
    </div>
  );
}

export function makeMcc21SimpleMathCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "You get N numbers and an operator selector P. For EVERY nonempty subset, combine that subset with the operator — then sum all of those values.",
        /* 2026-09-17: 77자·세 문장이었다. 아래 미션·문제 카드가 같은 말을 다시 한다. */
        "부분집합마다 수를 합친 값을 전부 더해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔢"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f97316" }}>Simple Math</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P5</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Sum the operator-combined value of every nonempty subset, mod 10^9+7.",
                "비어 있지 않은 부분집합마다 연산자로 합친 값을 구해요.\n그 값을 전부 더한 뒤 10^9+7 로 나눈 나머지를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You are given ", "")}
                  <b style={{ color: "#f97316" }}>N</b>{t(E, " numbers ", " 개의 수 ")}
                  <b style={{ color: "#f97316" }}>A₁, A₂, …, Aₙ</b>
                  {t(E, " and a selector ", " 와, 어떤 연산자를 쓸지 정하는 ")}<b style={{ color: "#7c3aed" }}>P</b>
                  {t(E, ".", " 를 받아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every nonempty subset", "비어 있지 않은 부분집합")}</b>
                  {t(E, " of the numbers, combine its elements with the operator ", " 마다 그 안의 수들을 연산자 ")}
                  <b>★</b>{t(E, ":", " 로 합쳐요.")}
                </div>
              </div>
              {/* 2026-09-17: 미션·문제가 "부분집합" 에 전부 기대는데 그게 무엇인지 한 번도
                  안 말했다. 학생이 처음 만나는 자리에서 한 번 풀어 준다. */}
              <div style={{ paddingLeft: 22, fontSize: 12, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line", textWrap: "balance" }}>
                {t(E,
                  "A subset is any group you make by picking some of the numbers. \"Nonempty\" means the group that picks nothing doesn't count. With 3 numbers you get 7 such groups.",
                  "부분집합은 주어진 수 중에서 몇 개를 골라 만든 묶음이에요.\n아무것도 안 고른 묶음은 세지 않아요.\n수가 3 개면 이런 묶음이 7 개 나와요.")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 22, fontSize: 12.5 }}>
                <div><b style={{ color: "#7c3aed" }}>P=1</b> → {t(E, "addition (+)", "덧셈 (+)")}</div>
                <div><b style={{ color: "#7c3aed" }}>P=2</b> → {t(E, "multiplication (×)", "곱셈 (×)")}</div>
                <div><b style={{ color: "#7c3aed" }}>P=3</b> → {t(E, "bitwise XOR (⊕)", "비트 XOR (⊕)")}</div>
                {/* 2026-09-17: ⊕ 가 무엇인지 안 밝힌 채로 2 쪽 예제에서 바로 쓰였다.
                    뒤 문제(1-6)의 수 {1,2} 와 겹치지 않는 예로 든다. */}
                <div style={{ fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
                  {t(E,
                    "A bit is one digit of a number written in base 2. XOR compares the two numbers digit by digit and puts a 1 where exactly one side has a 1. So 6 ⊕ 3 = 5.",
                    "비트는 수를 2 진수로 적었을 때의 한 자리예요.\nXOR 는 두 수를 자리마다 견줘서\n한쪽에만 1 이 있는 자리를 1 로 놓아요.\n그래서 6 ⊕ 3 = 5 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "sum of all those subset values, mod 10^9+7", "그 값들을 모두 더한 뒤 10^9+7 로 나눈 나머지")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 10, ...KA }}>
              {t(E, "Limits: 1 ≤ N ≤ 5·10^4, 1 ≤ P ≤ 3, 1 ≤ Aᵢ ≤ 10^9.", "제약: 1 ≤ N ≤ 5·10^4, 1 ≤ P ≤ 3, 1 ≤ Aᵢ ≤ 10^9.")}
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official samples
    {
      type: "reveal",
      /* 2026-09-17: 79자·세 문장이었다. 바로 아래 입력 카드와 예제 카드가 같은 말을 다시 한다. */
      narr: t(E,
        "The input format, and the three official examples.",
        "입력이 어떻게 들어오는지, 공식 예제 셋을 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "How this contest gives you the values", "이 대회가 값을 주는 방법")}
            </div>
            {/* ⚠️ 2026-09-17 — 여기 "첫째 줄: N P / 둘째 줄: 수 N 개" 라고 적혀 있었다.
                **원문에는 그런 형식이 없다.** 원문은 "The input consists of the integers N and P
                and the array A" 한 줄이고, 예제도 `N = 3 / P = 1 / A = [1, 2, 3]` 로 준다.
                우리가 지어낸 형식이었다 (선생님: "문제에 나온 인풋이랑 다르게 코드가 있는데?").
                교육 담당과 학생이 서로 안 보고 둘 다 "원문대로 변수형" 을 골랐다.
                학생만 말한 걱정 — "그럼 input() 은 언제 배워요?" — 때문에 아래 다리 한 줄이 붙었다. */}
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "This contest has no line-by-line input format. It hands you the values directly:",
                             "이 대회는 줄 단위 입력 형식이 없어요. 값을 그대로 줘요.")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46", marginTop: 6, marginLeft: 10 }}>
                N = 3<br />P = 1<br />A = [1, 2, 3]
              </div>
              <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim }}>
                {t(E, "Reading values line by line with input() shows up in the 2022 problems.",
                      "input() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <SampleCard E={E} p={1} out={24} note={t(E, "P=1 · add", "P=1 · 덧셈")} />
            <SampleCard E={E} p={2} out={23} note={t(E, "P=2 · multiply", "P=2 · 곱셈")} />
            <SampleCard E={E} p={3} out={12} note={t(E, "P=3 · XOR", "P=3 · XOR")} />
          </div>

          <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.7, ...KA }}>
            {t(E, "The 7 nonempty subsets of {1,2,3}, combined and summed:", "{1,2,3} 의 부분집합 7 개를 연산자로 합쳐서 더하면 이렇게 돼요.")}
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#9a3412", marginTop: 4 }}>
              P=1: 1+2+3+(1+2)+(1+3)+(2+3)+(1+2+3) = 24
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#9a3412" }}>
              P=2: 1+2+3+(1×2)+(1×3)+(2×3)+(1×2×3) = 23
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#9a3412" }}>
              P=3: 1+2+3+(1⊕2)+(1⊕3)+(2⊕3)+(1⊕2⊕3) = 12
            </div>
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "opsim",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      /* 2026-09-17: 이 narr 이 81 자·세 문장이었고, 바로 아래 카드가 같은 말을 또 했다.
         파란 바는 "지금 뭘 볼 차례" 만 말한다. */
      /* 2026-09-17: "직접 적어 봐요" 라고 했는데 시뮬이 7 개를 이미 다 적어서 보여준다.
         글과 화면이 다른 말을 하고 있었다. 화면이 맞고 글이 틀렸다. */
      narr: t(E,
        "Switch the operator and watch all 7 subsets.",
        "연산자를 바꿔 가며 부분집합 7 개를 봐요."),
      content: null,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      /* 2026-09-17: 이 narr 이 세는 방법을 통째로 알려줘서(2 와 3 이 각각 넣거나 빼거나 → 2×2)
         답 4 가 그냥 나왔다. 파란 바는 "지금 뭘 볼 차례" 만 말한다. */
      narr: t(E,
        "Your turn — count them yourself.",
        "이번엔 직접 세어 볼 차례예요."),
      question: t(E,
        "Among the 7 nonempty subsets of {1,2,3}, how many contain the number 1?",
        "{1,2,3} 의 부분집합 7 개 중에서\n수 1 이 들어 있는 것은 몇 개일까요?"),
      options: [
        t(E, "4", "4"),
        t(E, "3", "3"),
        t(E, "7", "7"),
      ],
      correct: 0,
      explain: t(E,
        "4. Fix 1; the other 2 numbers are free → 2^(3-1) = 4 subsets. That's why for addition each number is added 2^(N-1) times.",
        "4 개예요. 1 을 꼭 넣으면 남은 수 2 개는 넣거나 빼거나 마음대로예요.\n그래서 2^(3-1) = 4 개가 나와요.\n같은 이유로 덧셈에서는 어떤 수든 2^(N-1) 번 더해져요."),
    },

    /* 2026-09-17: 사다리가 P=1 에만 걸려 있었다 — P=2·P=3 은 코드 옆 💡 글로만 설명됐다.
       세 연산이 이 문제의 축이니 직접 세어 보는 칸을 둘 더 놓는다. */
    // 1-5: hand-computed input — P = 2 (multiplication)
    {
      type: "input",
      narr: t(E,
        "Now P = 2 (multiply), with just two numbers: {2, 3}.",
        "이번엔 P = 2(곱셈)예요. 수는 {2, 3} 둘뿐이에요."),
      question: t(E,
        "P = 2, numbers {2, 3}. Add up the values of all 3 nonempty subsets.",
        "P = 2(곱셈), 수는 {2, 3} 이에요.\n비어 있지 않은 부분집합 3 개의 값을 다 더하면?"),
      hint: t(E,
        "The subsets are {2}, {3}, {2,3} — worth 2, 3 and 2×3. Shortcut: expand (1+2)(1+3) and drop the 1 that comes from the empty set.",
        "부분집합은 {2}, {3}, {2,3} 이고 값은 2, 3, 2×3 이에요.\n지름길로는 (1+2)(1+3) 을 펼친 뒤\n빈 집합에서 온 1 만 빼면 돼요."),
      answer: 11,
    },

    // 1-6: hand-computed input — P = 3 (XOR)
    {
      type: "input",
      narr: t(E,
        /* 2026-09-17: 영어가 "Same two numbers" 라고 했는데 앞 쪽은 {2,3}, 여기는 {1,2} 다. */
        "This time P = 3 (XOR), with the numbers {1, 2}.",
        "이번엔 P = 3(XOR)이에요. 수는 {1, 2} 예요."),
      question: t(E,
        "P = 3, numbers {1, 2}. Add up the values of all 3 nonempty subsets.",
        "P = 3(XOR), 수는 {1, 2} 예요.\n비어 있지 않은 부분집합 3 개의 값을 다 더하면?"),
      hint: t(E,
        "XOR compares bit by bit: a bit is 1 when exactly one side has it. So 1 ⊕ 2 = 3. The three subsets are worth 1, 2 and 1⊕2.",
        "XOR 는 비트끼리 견줘서 한쪽에만 있을 때 1 이 돼요.\n그래서 1 ⊕ 2 = 3 이에요.\n부분집합 3 개의 값은 1, 2, 그리고 1⊕2 예요."),
      answer: 6,
    },
  ];
}

export function makeMcc21SimpleMathCh2(E, lang = "py") {
  return [
    /* 2-0: 첫 코드 (2026-09-17 신설)
       왜 생겼나 — project-lead 판정: 기승전결의 **'첫 코드' 단계가 통째로 없었다.**
       예제를 손으로 세다가 곧장 최종 공식으로 점프했다.
       이 쪽이 있어야 다음 쪽의 "그런데 N 이 커지면" 이 **무엇에 대한 한계인지** 가 생긴다.
       비트 연산은 안 쓴다 — 안 가르친 개념이다. 리스트를 늘려 가며 만든다. */
    {
      type: "progressive",
      narr: t(E,
        "First, write it the way you just counted by hand.",
        "먼저 방금 손으로 센 그대로 짜 봐요."),
      sections: getMcc21SimpleMathBruteSections(E),
    },
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The code you just wrote stops working once N grows. Here is why, and what to do instead.",
        "방금 그 코드는 N 이 조금만 커져도 못 써요. 왜 그런지 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "The code you just wrote", "방금 짠 코드")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {/* 2026-09-17: "N 이 25 만 넘어도 손을 못 댄다" 에서 25 가 어디서 온 수인지 안 말했다. */}
                {t(E, "2^N − 1 subsets. At N=25 that's already over 30 million. At N=50000 that's 2^50000 — the universe can't hold that many.", "부분집합이 2^N − 1 개예요.\nN 이 25 면 벌써 3 천만 개가 넘어요.\nN 이 50000 이면 2^50000 개라서 세상에 다 적어 둘 수도 없어요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
                🚀 {t(E, "Fast: count each contribution", "빠른 방법: 각각이 몇 번 쓰이는지 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {/* 2026-09-17: Σ 와 ∏ 를 아무 데서도 안 가르치고 썼고, k 도 여기서 처음 나오는데
                    무엇인지 안 밝혔다. 기호를 풀어 쓰고 k 를 문장 안에서 정의한다. */}
                <div>• <b>P=1</b> {t(E, "each number lands in 2^(N-1) subsets → ", "수 하나는 2^(N-1) 개의 부분집합에 들어가요 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(N-1) × (A₁+A₂+…+Aₙ)</span></div>
                <div>• <b>P=2</b> {t(E, "sum of all subset products → ", "부분집합마다 곱한 값을 다 더하면 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>(1+A₁)(1+A₂)…(1+Aₙ) − 1</span></div>
                <div>• <b>P=3</b> {t(E, "if k numbers have that bit, count the odd picks → ", "그 비트를 가진 수가 k 개일 때, 홀수 개 뽑은 경우만 세면 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(k-1) × 2^(N-k)</span></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, one operator at a time.", "↓ 다음 쪽에서 빠른 코드를 연산자별로 하나씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — one section per operator. Read the 💡 note first, then the code.",
        "연산자마다 한 부분씩 있어요. 💡 설명을 먼저 읽고 코드를 봐요."),
      sections: getMcc21SimpleMathSections(E),
    },
  ];
}
