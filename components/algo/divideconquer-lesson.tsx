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

/** 분할 정복 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function DivideConquerLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 분할 정복이 뭐야?", "1. What is divide & conquer?")}</H>
        <p>{t("큰 문제를 같은 모양의 작은 문제로 '쪼개고(divide)', 각각 '풀고(conquer)', 결과를 '합쳐요(combine)'.", "Split a big problem into smaller same-shaped ones, solve each, then combine the results.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">{t("나누고 → 정복하고 → 합치기", "divide → conquer → combine")}</p>
      </section>

      <section>
        <H>{t("2. 병합 정렬 — 대표 예", "2. Merge sort — the classic")}</H>
        <p>{t("배열을 반으로 쪼개 각각 정렬한 뒤, 두 정렬된 반쪽을 하나로 합쳐요. O(N log N).", "Split the array in half, sort each half, then merge two sorted halves into one. O(N log N).")}</p>
        <Code lang="python" code={t(`def merge_sort(a):
    if len(a) <= 1:
        return a                       # 더 못 쪼개면 그대로
    mid = len(a) // 2
    L = merge_sort(a[:mid])            # 왼쪽 정복
    R = merge_sort(a[mid:])            # 오른쪽 정복
    return merge(L, R)                 # 두 정렬된 반쪽을 합치기`, `def merge_sort(a):
    if len(a) <= 1:
        return a                       # can't split further, return as-is
    mid = len(a) // 2
    L = merge_sort(a[:mid])            # conquer left
    R = merge_sort(a[mid:])            # conquer right
    return merge(L, R)                 # combine the two sorted halves`)} />
      </section>

      <section>
        <H>{t("3. 이분 탐색도 같은 사고", "3. Binary search is the same idea")}</H>
        <p>{t("정렬된 데이터에서 가운데를 보고 절반을 버려요. 매번 후보가 반으로 → O(log N).", "On sorted data, check the middle and throw away half. The search space halves each step → O(log N).")}</p>
        <Code code={t(`int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;   // 왼쪽 절반 버림
    else hi = mid - 1;                   // 오른쪽 절반 버림
}`, `int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;   // discard left half
    else hi = mid - 1;                   // discard right half
}`)} />
      </section>

      <section>
        <H>{t("4. 분할 정복으로 풀리는 것", "4. What divide & conquer unlocks")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("정렬·이분탐색 — N log N / log N 으로 빠르게", "Sorting & binary search — N log N / log N")}</li>
          <li>{t("거듭제곱 a^n 을 O(log N) 에 (분할 거듭제곱)", "Fast exponentiation a^n in O(log N)")}</li>
          <li>{t("'반으로 나눠 합치면 더 쉬워지나?' 가 분할 정복 신호", "'Does splitting in half make combining easier?' → the D&C signal")}</li>
        </ul>
      </section>

      <Link href="/algo/divideconquer/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
