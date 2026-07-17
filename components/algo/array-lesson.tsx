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

/** 배열 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function ArrayLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 배열이 뭐야?", "1. What is an array?")}</H>
        <p>{t("같은 종류의 값을 한 줄로 나란히 담아, 번호(인덱스)로 꺼내 쓰는 상자예요.", "A row of same-type values, accessed by number (index).")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">{t("인덱스", "index")}:  0   1   2   3   4{"\n"}{t("값", "value")}:  [7] [2] [9] [4] [1]</p>
        <p className="text-gray-500 mt-1">{t("인덱스로 바로 접근하니 O(1) — 몇 번째든 똑같이 빨라요.", "Access by index is O(1) — any position, same speed.")}</p>
      </section>

      <section>
        <H>{t("2. 순회 · 최대 · 최소 · 합", "2. Traverse · max · min · sum")}</H>
        <p>{t("배열 문제의 절반은 한 번 훑으면서 무언가를 모으는 거예요.", "Half of array problems are: scan once, accumulate something.")}</p>
        <Code code={t(`vector<int> a = {7, 2, 9, 4, 1};
int mx = a[0], sum = 0;
for (int x : a) {           // 한 번 훑기 — O(n)
    mx = max(mx, x);        // 최댓값 갱신
    sum += x;               // 합 누적
}`, `vector<int> a = {7, 2, 9, 4, 1};
int mx = a[0], sum = 0;
for (int x : a) {           // one pass — O(n)
    mx = max(mx, x);        // update max
    sum += x;               // accumulate sum
}`)} />
        <Code lang="python" code={t(`a = [7, 2, 9, 4, 1]
print(max(a), min(a), sum(a))   # 9 1 23`, `a = [7, 2, 9, 4, 1]
print(max(a), min(a), sum(a))   # 9 1 23`)} />
      </section>

      <section>
        <H>{t("3. 두 포인터 (Two Pointers)", "3. Two Pointers")}</H>
        <p>{t("양 끝(또는 두 위치)에서 인덱스 두 개를 움직이며 한 번에 훑어요. 이중 반복(O(n²))을 O(n)으로 줄일 때 강력해요. 정렬된 배열에서 합이 목표값인 짝 찾기가 대표 예시.", "Move two indices (e.g. from both ends) in one pass. Turns O(n²) into O(n). Classic: find a pair summing to a target in a sorted array.")}</p>
        <Code code={t(`// 정렬된 a 에서 a[i]+a[j]==target 짝 찾기
int i = 0, j = a.size() - 1;
while (i < j) {
    int s = a[i] + a[j];
    if (s == target) break;     // 찾음
    else if (s < target) i++;   // 더 큰 합 필요 → 왼쪽을 키움
    else j--;                   // 더 작은 합 필요 → 오른쪽을 줄임
}`, `// find pair a[i]+a[j]==target in sorted a
int i = 0, j = a.size() - 1;
while (i < j) {
    int s = a[i] + a[j];
    if (s == target) break;     // found
    else if (s < target) i++;   // need bigger sum → move left up
    else j--;                   // need smaller sum → move right down
}`)} />
      </section>

      <section>
        <H>{t("4. 슬라이딩 윈도우", "4. Sliding Window")}</H>
        <p>{t("연속한 구간(창)을 한 칸씩 밀면서, 매번 다시 더하지 않고 '들어온 값 +, 나간 값 −'만 해요. '연속 k개 합/평균이 최대' 같은 문제에 딱.", "Slide a contiguous window: add the entering value, subtract the leaving one — no recomputation. Perfect for 'max sum of k consecutive items'.")}</p>
        <Code code={t(`// 길이 k 구간 합의 최댓값
int win = 0;
for (int i = 0; i < k; i++) win += a[i];   // 첫 창
int best = win;
for (int i = k; i < n; i++) {
    win += a[i] - a[i - k];                 // 한 칸 밀기
    best = max(best, win);
}`, `// max sum of a window of length k
int win = 0;
for (int i = 0; i < k; i++) win += a[i];   // first window
int best = win;
for (int i = k; i < n; i++) {
    win += a[i] - a[i - k];                 // slide one
    best = max(best, win);
}`)} />
      </section>

      <Link href="/algo/array/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
