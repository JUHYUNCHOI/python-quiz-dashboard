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

/** 그리디 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function GreedyLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 그리디 = 매 순간 가장 좋아 보이는 걸 고름", "1. Greedy = pick the best-looking choice each step")}</H>
        <p>{t("앞으로 어떻게 될지 멀리 안 보고, 지금 이 순간 최선을 그때그때 골라요. 거스름돈을 큰 동전부터 주는 것처럼요.", "Don't look far ahead — just take the locally best choice at each step. Like making change with the biggest coins first.")}</p>
      </section>

      <section>
        <H>{t("2. 핵심은 '정렬 후 차례로'", "2. The pattern: sort, then go in order")}</H>
        <p>{t("대부분의 그리디는 '어떤 기준으로 정렬한 뒤, 앞에서부터 조건에 맞으면 고른다' 형태예요. 정렬 기준을 잘 정하는 게 전부예요.", "Most greedy solutions are: sort by some key, then go front to back and take items that fit. Choosing the right sort key is the whole game.")}</p>
        <Code code={t(`sort(a.begin(), a.end());   // 기준에 맞게 정렬
for (auto& x : a) {
    if (조건맞음) 선택();      // 앞에서부터 욕심껏
}`, `sort(a.begin(), a.end());   // sort by the chosen key
for (auto& x : a) {
    if (fits()) choose();      // greedily take from the front
}`)} />
      </section>

      <section>
        <H>{t("3. 대표 예 — 회의실 배정", "3. Classic — activity selection")}</H>
        <p>{t("끝나는 시간이 빠른 회의부터 고르면, 한 방에서 최대한 많은 회의를 넣을 수 있어요. '끝나는 시간' 기준 정렬이 비결.", "Pick the meeting that finishes earliest first — that packs the most meetings into one room. The trick is sorting by end time.")}</p>
        <Code code={t(`sort(m.begin(), m.end(), [](auto& a, auto& b){
    return a.end < b.end;          // 끝나는 시간 빠른 순
});
int last = -1, cnt = 0;
for (auto& x : m)
    if (x.start >= last) { cnt++; last = x.end; }  // 안 겹치면 선택`, `sort(m.begin(), m.end(), [](auto& a, auto& b){
    return a.end < b.end;          // sort by earliest end time
});
int last = -1, cnt = 0;
for (auto& x : m)
    if (x.start >= last) { cnt++; last = x.end; }  // take if no overlap`)} />
      </section>

      <section>
        <H>{t("4. 그리디가 항상 맞진 않아요", "4. Greedy isn't always correct")}</H>
        <p>{t("'지금 최선'이 '전체 최선'으로 이어진다는 보장이 있을 때만 옳아요. 의심되면 작은 반례를 직접 만들어 확인하세요. 안 되면 완전탐색이나 DP 로.", "It's only right when each local best truly leads to the global best. When unsure, hand-build a small counterexample. If it breaks, switch to brute force or DP.")}</p>
      </section>

      <Link href="/algo/greedy/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
