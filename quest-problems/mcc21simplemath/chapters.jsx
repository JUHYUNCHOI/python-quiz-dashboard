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
  "        k = sum(1 for x in a if (x >> bit) & 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + (1 << bit) % MOD * factor) % MOD",
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
        "N 개의 수와 연산자 선택 P 가 주어져요. 비어있지 않은 모든 부분집합에 대해, 그 부분집합을 연산자로 합쳐요 — 그리고 2^N − 1 개 부분집합의 값을 다 더해요."),
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
                "모든 비어있지 않은 부분집합의 '연산자로 합친 값'을 다 더해서 10^9+7 로 나눈 나머지를 구해요.")}
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
                  {t(E, " and a selector ", " 와 선택자 ")}<b style={{ color: "#7c3aed" }}>P</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every nonempty subset", "비어있지 않은 모든 부분집합")}</b>
                  {t(E, " of the numbers, combine its elements with the operator ", " 에 대해, 그 원소들을 연산자 ")}
                  <b>★</b>{t(E, ":", " 로 합쳐요:")}
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
                  <b style={{ color: "#15803d" }}>{t(E, "sum of all those subset values, mod 10^9+7", "그 부분집합 값들의 총합을 10^9+7 로 나눈 나머지")}</b>
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
        "입력은 두 줄이에요: N 과 P, 그다음 N 개의 수. 공식 예제 세 개예요 — 같은 수 {1,2,3}, 연산자마다 하나씩."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Line 1: ", "1번째 줄: ")}<b>N</b> <b>P</b> {t(E, "(count, then operator selector)", "(개수, 그다음 연산자 선택자)")}</div>
              <div>• {t(E, "Line 2: ", "2번째 줄: ")}<b>{t(E, "the N numbers", "N 개의 수")}</b> A₁ … Aₙ</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <SampleCard E={E} p={1} out={24} note={t(E, "P=1 · add", "P=1 · 덧셈")} />
            <SampleCard E={E} p={2} out={23} note={t(E, "P=2 · multiply", "P=2 · 곱셈")} />
            <SampleCard E={E} p={3} out={12} note={t(E, "P=3 · XOR", "P=3 · XOR")} />
          </div>

          <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.7, ...KA }}>
            {t(E, "The 7 nonempty subsets of {1,2,3}, combined and summed:", "{1,2,3} 의 7 개 부분집합을 합쳐서 더하면:")}
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
      narr: t(E,
        "Feel it on {1,2,3}. List all 7 subsets, watch the running total, then reveal the shortcut that reaches the same total without listing.",
        "{1,2,3} 로 직접 느껴봐요. 7 개 부분집합을 다 나열하고 누적 합을 보고, 나열 없이 같은 합에 닿는 지름길을 열어봐요."),
      content: null,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "In {1,2,3}, fix the number 1. The other two (2 and 3) are each either in or out: 2×2 = 4 subsets contain 1.",
        "{1,2,3} 에서 수 1 을 고정해요. 나머지 둘(2 와 3)은 각각 있거나 없거나: 2×2 = 4 개의 부분집합이 1 을 포함해요."),
      question: t(E,
        "Among the 7 nonempty subsets of {1,2,3}, how many contain the number 1?",
        "{1,2,3} 의 7 개 부분집합 중, 수 1 을 포함하는 건 몇 개?"),
      options: [
        t(E, "4", "4"),
        t(E, "3", "3"),
        t(E, "7", "7"),
      ],
      correct: 0,
      explain: t(E,
        "4. Fix 1; the other 2 numbers are free → 2^(3-1) = 4 subsets. That's why for addition each number is added 2^(N-1) times.",
        "4 개예요. 1 을 고정하면 나머지 2 개가 자유 → 2^(3-1) = 4 개. 그래서 덧셈에서 각 수는 2^(N-1) 번 더해져요."),
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
        "느린 방법은 2^N − 1 개 부분집합을 다 나열해 각각 합쳐요 — N 이 25 만 넘어도 불가능해요. 빠른 방법은 부분집합을 하나도 나열하지 않아요: 각 수(또는 각 비트)가 총합에 얼마나 기여하는지 세요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: enumerate every subset", "느림: 모든 부분집합 나열")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "2^N − 1 subsets. At N=50000 that's 2^50000 — the universe can't hold that many. Times out instantly.", "2^N − 1 개 부분집합. N=50000 이면 2^50000 개 — 우주에 담을 수도 없어요. 즉시 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
                🚀 {t(E, "Fast: count each contribution", "빠름: 기여를 센다")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                <div>• <b>P=1</b> {t(E, "each number lands in 2^(N-1) subsets → ", "각 수는 2^(N-1) 개 부분집합에 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(N-1)·ΣA</span></div>
                <div>• <b>P=2</b> {t(E, "sum of all subset products → ", "모든 부분집합 곱의 합 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>∏(1+Aᵢ) − 1</span></div>
                <div>• <b>P=3</b> {t(E, "per bit, odd-count subsets → ", "비트마다, 홀수 개 부분집합 → ")}<span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412" }}>2^(k-1)·2^(N-k)</span></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, one operator at a time.", "↓ 빠른 코드가 아래에 연산자별로 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — one section per operator. Read the 💡 note first, then the code.",
        "풀이 코드 — 연산자마다 한 섹션. 💡 노트를 먼저 읽고 코드를 봐요."),
      sections: getMcc21SimpleMathSections(E),
    },
  ];
}
