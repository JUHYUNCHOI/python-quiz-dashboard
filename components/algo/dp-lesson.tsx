"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { highlightCode } from "@/components/practice/practice-runner"

function Code({ code, lang = "cpp" }: { code: string; lang?: "cpp" | "python" }) {
  return (
    <pre
      className="rounded-lg bg-gray-900 px-3 py-2.5 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap my-2"
      dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
    />
  )
}

/** 동적 프로그래밍(DP) 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function DpLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. DP가 뭐야?", "1. What is DP?")}</H>
        <p>{t("큰 문제를 작은 문제로 쪼개되, '똑같은 작은 문제가 여러 번 나오는' 경우 답을 한 번만 구하고 저장해 재사용하는 거예요.", "Break a big problem into smaller ones — and when the same small problem appears again, solve it once, store the answer, and reuse it.")}</p>
        <p className="text-gray-500 mt-1">{t("두 가지 조건: ① 겹치는 부분 문제 ② 작은 답으로 큰 답을 만들 수 있음.", "Two conditions: (1) overlapping subproblems, (2) bigger answers built from smaller ones.")}</p>
      </section>

      <section>
        <H>{t("2. 메모이제이션 — 답을 적어두기", "2. Memoization — write the answer down")}</H>
        <p>{t("피보나치는 같은 값을 계속 다시 계산해요. 한 번 구한 값을 표에 적어두면 두 번 다시 안 풀어요.", "Fibonacci recomputes the same value over and over. Write each result in a table and you never solve it twice.")}</p>
        <Code code={`int memo[N];
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];          // 적어둔 게 있으면 재사용
    return memo[n] = fib(n-1) + fib(n-2); // 구하면서 저장
}`} />
        <p className="text-gray-500">{t("작은 것부터 표를 채우는 '바텀업(반복문)' 방식도 있어요:", "Or fill the table bottom-up with a loop:")}</p>
        <Code code={`dp[0] = 0; dp[1] = 1;
for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];`} />
      </section>

      <section>
        <H>{t("3. 점화식 — '한 칸을 어떻게 채우나'", "3. The recurrence — 'how to fill one cell'")}</H>
        <p>{t("DP의 핵심은 'dp[i] 를 이전 답들로 어떻게 만드나'를 찾는 거예요. 배낭 문제는 '이 물건을 담느냐 마느냐' 중 더 좋은 쪽을 고르는 식이에요.", "The heart of DP is figuring out 'how dp[i] is built from earlier answers.' Knapsack picks the better of 'take this item or skip it.'")}</p>
        <Code lang="python" code={`# 0/1 배낭: w 무게까지의 최대 가치
dp[i][w] = max(dp[i-1][w],                 # 안 담음
               dp[i-1][w-weight[i]] + val[i])  # 담음`} />
      </section>

      <section>
        <H>{t("4. 대표 문제와 패턴", "4. Classic problems & patterns")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("피보나치 / 계단 오르기 — DP 입문, 1차원 dp[]", "Fibonacci / climbing stairs — DP intro, 1-D dp[]")}</li>
          <li>{t("배낭(Knapsack) — 담기/안 담기 선택, 2차원 dp[][]", "Knapsack — take/skip choice, 2-D dp[][]")}</li>
          <li>{t("LCS(최장 공통 부분 수열) — 두 문자열 비교 표 채우기", "LCS (longest common subsequence) — fill a table comparing two strings")}</li>
          <li>{t("핵심: '무엇을 dp 에 저장할지(상태)'를 정하는 게 제일 어려워요", "Key: deciding 'what dp stores (the state)' is the hardest part")}</li>
        </ul>
      </section>

      <Link href="/algo/dp/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
