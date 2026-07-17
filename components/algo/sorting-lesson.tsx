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

/** 정렬 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function SortingLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 정렬이 뭐야?", "1. What is sorting?")}</H>
        <p>{t("데이터를 크기 순서대로 줄 세우는 거예요.", "Lining data up in order by size.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">[5, 3, 1, 4, 2] → [1, 2, 3, 4, 5]</p>
      </section>

      <section>
        <H>{t("2. 한 줄이면 끝 — sort()", "2. One line — sort()")}</H>
        <p>{t("직접 구현하지 않아요. 언어가 주는 sort() 를 써요.", "You don't write it yourself — use the built-in sort().")}</p>
        <Code code={t(`vector<int> v = {5, 3, 1, 4, 2};
sort(v.begin(), v.end());                  // 오름차순 → 1 2 3 4 5
sort(v.begin(), v.end(), greater<int>());  // 내림차순 → 5 4 3 2 1`, `vector<int> v = {5, 3, 1, 4, 2};
sort(v.begin(), v.end());                  // ascending → 1 2 3 4 5
sort(v.begin(), v.end(), greater<int>());  // descending → 5 4 3 2 1`)} />
        <p className="text-gray-500">{t("파이썬은 더 짧아요:", "Python is even shorter:")}</p>
        <Code lang="python" code={t(`a = [5, 3, 1, 4, 2]
a.sort()               # 오름차순
a.sort(reverse=True)   # 내림차순`, `a = [5, 3, 1, 4, 2]
a.sort()               # ascending
a.sort(reverse=True)   # descending`)} />
      </section>

      <section>
        <H>{t("3. '무엇을 기준으로' 정렬?", "3. Sort by WHAT?")}</H>
        <p>{t("점수·시간·이름 등 기준을 정해요. 기준이 복잡하면 비교 함수를 직접 줘요.", "Pick a key — score, time, name… For complex keys, pass a compare function.")}</p>
        <Code code={t(`// 점수 내림차순, 같으면 이름 오름차순
sort(s.begin(), s.end(), [](auto& a, auto& b){
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});`, `// score descending, then name ascending
sort(s.begin(), s.end(), [](auto& a, auto& b){
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});`)} />
      </section>

      <section>
        <H>{t("4. 정렬해두면 쉬워지는 것", "4. Why sort first?")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("이웃한 것만 비교하면 됨 → 중복 찾기, 가장 가까운 두 수", "Compare only neighbors → duplicates, closest pair")}</li>
          <li>{t("이분탐색이 가능해짐 → 정렬된 데이터에서 빠르게 찾기", "Binary search becomes possible")}</li>
          <li>{t("그리디 — 작은/큰 것부터 골라 쓰기 (회의실 배정 등)", "Greedy — pick smallest/largest first (interval scheduling…)")}</li>
        </ul>
      </section>

      <Link href="/algo/sorting/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
