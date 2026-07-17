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

/** 이분탐색 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function BinarySearchLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 절반씩 줄여서 찾기", "1. Find by halving each time")}</H>
        <p>{t("정렬된 데이터에서 가운데를 보고, 찾는 값보다 크면 왼쪽 절반, 작으면 오른쪽 절반만 다시 봐요. 매번 후보가 반으로 줄어요.", "On sorted data, look at the middle: if the target is smaller go left, if bigger go right. Each step halves the candidates.")}</p>
        <p className="text-gray-500 mt-1">{t("100만 개도 약 20번이면 끝나요 (log₂N).", "A million items take only ~20 steps (log₂N).")}</p>
      </section>

      <section>
        <H>{t("2. 전제: 반드시 '정렬되어' 있어야 함", "2. The catch: data must be SORTED")}</H>
        <p>{t("정렬돼 있어야 '한쪽을 버려도 된다'는 판단이 가능해요. 정렬 안 됐으면 먼저 sort() 부터.", "Sorting is what lets you safely throw away half. If not sorted, sort() first.")}</p>
        <Code code={t(`int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) { /* 찾음 */ break; }
    else if (a[mid] < target) lo = mid + 1;   // 오른쪽 절반
    else hi = mid - 1;                         // 왼쪽 절반
}`, `int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) { /* found */ break; }
    else if (a[mid] < target) lo = mid + 1;   // right half
    else hi = mid - 1;                         // left half
}`)} />
      </section>

      <section>
        <H>{t("3. STL 한 줄로 — lower_bound / upper_bound", "3. One line with STL — lower_bound / upper_bound")}</H>
        <p>{t("직접 짜기 전에 STL 이 있어요. lower_bound 는 'target 이상이 처음 나오는 위치'를 찾아줘요.", "Before writing it yourself, STL has it. lower_bound finds the first position where target could go (≥ target).")}</p>
        <Code code={t(`sort(v.begin(), v.end());
auto it = lower_bound(v.begin(), v.end(), x);  // x 이상 첫 위치
int idx = it - v.begin();
// upper_bound: x 초과 첫 위치 → 개수 세기에 유용`, `sort(v.begin(), v.end());
auto it = lower_bound(v.begin(), v.end(), x);  // first pos ≥ x
int idx = it - v.begin();
// upper_bound: first pos > x → handy for counting`)} />
        <Code lang="python" code={t(`import bisect
bisect.bisect_left(a, x)   # x 이상 첫 위치 (lower_bound)
bisect.bisect_right(a, x)  # x 초과 첫 위치 (upper_bound)`, `import bisect
bisect.bisect_left(a, x)   # first pos >= x (lower_bound)
bisect.bisect_right(a, x)  # first pos > x (upper_bound)`)} />
      </section>

      <section>
        <H>{t("4. 한 단계 위 — 매개변수 탐색(파라메트릭)", "4. Level up — parametric search (binary search on the answer)")}</H>
        <p>{t("'답이 X 이상이면 가능?' 이라는 질문의 답이 어느 지점부터 쭉 가능/불가능으로 갈리면, 그 경계를 이분탐색으로 찾아요. (예: 최소 시간, 최대 길이)", "If 'is X feasible?' switches from yes to no at some boundary, binary-search that boundary — e.g. minimum time, maximum length.")}</p>
        <Code code={t(`int lo = 1, hi = MAX, ans = -1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (possible(mid)) { ans = mid; hi = mid - 1; }  // 더 작게 시도
    else lo = mid + 1;
}`, `int lo = 1, hi = MAX, ans = -1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (possible(mid)) { ans = mid; hi = mid - 1; }  // try smaller
    else lo = mid + 1;
}`)} />
      </section>

      <Link href="/algo/binarysearch/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
