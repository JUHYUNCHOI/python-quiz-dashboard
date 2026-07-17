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

/** 재귀 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function RecursionLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 재귀 = 함수가 자기 자신을 부름", "1. Recursion = a function calling itself")}</H>
        <p>{t("큰 문제를 '나보다 한 단계 작은 같은 문제'로 쪼개서 푸는 방법이에요. 거울 속의 거울처럼요.", "Solve a big problem by reducing it to a smaller version of the same problem — like a mirror reflecting a mirror.")}</p>
      </section>

      <section>
        <H>{t("2. 꼭 필요한 두 가지", "2. The two things you always need")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li><b>{t("종료 조건(base case)", "Base case")}</b> — {t("더 쪼갤 수 없는 가장 작은 경우. 여기서 멈춰요.", "the smallest case that stops the recursion.")}</li>
          <li><b>{t("재귀 호출", "Recursive call")}</b> — {t("자기 자신을 한 단계 더 작은 값으로 호출.", "call itself with a smaller input.")}</li>
        </ul>
        <p className="text-gray-500 mt-1">{t("종료 조건이 없으면 무한히 호출되다 스택이 넘쳐요(stack overflow).", "Without a base case it calls forever and overflows the stack.")}</p>
      </section>

      <section>
        <H>{t("3. 팩토리얼 — 가장 기본", "3. Factorial — the classic")}</H>
        <p>{t("n! = n × (n-1)! 이고, 0! = 1 이에요.", "n! = n × (n-1)!, with 0! = 1.")}</p>
        <Code code={t(`int fact(int n) {
    if (n <= 1) return 1;       // 종료 조건
    return n * fact(n - 1);     // 자기 호출
}`, `int fact(int n) {
    if (n <= 1) return 1;       // base case
    return n * fact(n - 1);     // recurse
}`)} />
        <Code lang="python" code={t(`def fact(n):
    if n <= 1:        # 종료 조건
        return 1
    return n * fact(n - 1)   # 자기 호출`, `def fact(n):
    if n <= 1:        # base case
        return 1
    return n * fact(n - 1)   # recurse`)} />
      </section>

      <section>
        <H>{t("4. 피보나치 — 자기를 두 번 부르기", "4. Fibonacci — calling itself twice")}</H>
        <p>{t("F(n) = F(n-1) + F(n-2), F(0)=0, F(1)=1. 같은 값을 여러 번 계산하니 큰 n 에서는 느려요 → 메모이제이션으로 저장하면 빨라져요.", "F(n) = F(n-1) + F(n-2). It recomputes the same values, so it's slow for big n — caching (memoization) fixes that.")}</p>
        <Code code={t(`int fib(int n) {
    if (n < 2) return n;             // 종료 조건
    return fib(n-1) + fib(n-2);      // 두 번 자기 호출
}`, `int fib(int n) {
    if (n < 2) return n;             // base case
    return fib(n-1) + fib(n-2);      // two recursive calls
}`)} />
        <p className="text-gray-500 mt-1">{t("재귀는 트리·DFS·분할정복·백트래킹의 토대예요.", "Recursion is the foundation of trees, DFS, divide-and-conquer, and backtracking.")}</p>
      </section>

      <Link href="/algo/recursion/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
