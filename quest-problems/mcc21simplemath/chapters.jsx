import { C, t } from "@/components/quest/theme";
import { getMcc21SimpleMathSections } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE (counting per element / per bit — never enumerate
   the 2^N − 1 subsets). Verified on samples 24 / 23 / 12.
   ================================================================ */
export const SOLUTION_CODE = [
  "MOD = 10**9 + 7",
  "N, P = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "if P == 1:                       # ➕ 더하기",
  "    ans = pow(2, N - 1, MOD) * (sum(a) % MOD) % MOD",
  "",
  "elif P == 2:                     # ✖️ 곱하기",
  "    prod = 1",
  "    for x in a:",
  "        prod = prod * (1 + x) % MOD",
  "    ans = (prod - 1) % MOD",
  "",
  "else:                            # ⊕ XOR",
  "    ans = 0",
  "    for bit in range(31):",
  "        place = 2 ** bit            # 그 자리의 값 — 1, 2, 4, 8, ...",
  "        k = sum(1 for x in a if (x // place) % 2 == 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + place % MOD * factor) % MOD",
  "    ans %= MOD",
  "",
  "print(ans)",
];

/* small sample card used in the input step */
function SampleCard({ E, p, out, note }) {
  return (
    <div style={{ flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", gap: 8, ...KA }}>
        <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: "10px 0 0 10px", padding: "8px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6, flex: 1 }}>
          <div style={{ color: "#8b949e", fontSize: 10.5, marginBottom: 2 }}>{t(E, "input", "입력")}</div>
          <div>3 {p}</div>
          <div>1 2 3</div>
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
        "You get N numbers and an operator selector P. For EVERY nonempty subset, combine that subset with the operator — then sum those values over all 2^N − 1 subsets.",
        "수 N 개와, 어떤 연산자를 쓸지 정하는 P 를 받아요.\n비어 있지 않은 부분집합마다 그 안의 수를 그 연산자로 합쳐요.\n그렇게 나온 2^N − 1 개의 값을 전부 더해요."),
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
              <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 22, fontSize: 12.5 }}>
                <div><b style={{ color: "#7c3aed" }}>P=1</b> → {t(E, "addition (+)", "덧셈 (+)")}</div>
                <div><b style={{ color: "#7c3aed" }}>P=2</b> → {t(E, "multiplication (×)", "곱셈 (×)")}</div>
                <div><b style={{ color: "#7c3aed" }}>P=3</b> → {t(E, "bitwise XOR (⊕)", "비트 XOR (⊕)")}</div>
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
      narr: t(E,
        "Input is two lines: N and P, then the N numbers. Here are the three official examples — same numbers {1,2,3}, one for each operator.",
        "입력은 두 줄이에요.\n첫 줄에 N 과 P 가 있고, 둘째 줄에 수 N 개가 있어요.\n아래 예제 셋은 수가 {1,2,3} 로 같고 연산자만 달라요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Line 1: ", "첫째 줄: ")}<b>N</b> <b>P</b> {t(E, "(count, then operator selector)", "(수의 개수, 그다음 어떤 연산자를 쓸지)")}</div>
              <div>• {t(E, "Line 2: ", "둘째 줄: ")}<b>{t(E, "the N numbers", "수 N 개")}</b> A₁ … Aₙ</div>
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
      narr: t(E,
        "Feel it on {1,2,3}. List all 7 subsets, watch the running total, then reveal the shortcut that reaches the same total without listing.",
        "{1,2,3} 로 직접 해 봐요.\n부분집합 7 개를 하나씩 적으면서 합이 쌓이는 걸 보고,\n다 적지 않고도 같은 합에 닿는 지름길을 찾아봐요."),
      content: null,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Fix the number 1 in {1,2,3}. Each of the other two (2 and 3) is either in or out.",
        "1 을 꼭 넣기로 하면, 남은 2 와 3 은 각각 넣거나 빼거나예요."),
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
  ];
}

export function makeMcc21SimpleMathCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way lists all 2^N − 1 subsets and combines each — impossible past ~N=25. The fast way never lists a subset: it counts how much each number (or each bit) contributes to the total.",
        "부분집합을 다 적지 않고, 각 수가 총합에 몇 번 쓰이는지만 세요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: enumerate every subset", "느린 방법: 부분집합을 하나하나 다 적기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "2^N − 1 subsets. At N=50000 that's 2^50000 — the universe can't hold that many. Times out instantly.", "부분집합이 2^N − 1 개예요.\nN 이 25 만 넘어도 벌써 손을 못 대요.\nN 이 50000 이면 2^50000 개라서 세상에 다 적어 둘 수도 없어요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
                🚀 {t(E, "Fast: count each contribution", "빠른 방법: 각각이 몇 번 쓰이는지 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                <div>• <b>P=1</b> {t(E, "each number lands in 2^(N-1) subsets → ", "수 하나는 2^(N-1) 개의 부분집합에 들어가요 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(N-1)·ΣA</span></div>
                <div>• <b>P=2</b> {t(E, "sum of all subset products → ", "부분집합마다 곱한 값을 다 더하면 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>∏(1+Aᵢ) − 1</span></div>
                <div>• <b>P=3</b> {t(E, "per bit, odd-count subsets → ", "비트마다 그 비트가 홀수 개 뽑힌 경우만 세면 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(k-1)·2^(N-k)</span></div>
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
