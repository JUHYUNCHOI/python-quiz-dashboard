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

/** 해시테이블 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function HashTableLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 해시테이블이 뭐야?", "1. What is a hash table?")}</H>
        <p>{t("'이름표 → 값'을 짝으로 저장하는 사전이에요. 찾기·넣기가 평균 O(1) — 배열을 처음부터 뒤지지 않아도 돼요.", "A dictionary storing 'key → value' pairs. Lookup/insert is O(1) on average — no scanning from the start.")}</p>
        <p className="text-gray-500 mt-1">{t("C++ 은 map/unordered_map(짝)·set/unordered_set(존재만), 파이썬은 dict·set.", "C++: map / unordered_map (pairs), set / unordered_set (membership). Python: dict, set.")}</p>
      </section>

      <section>
        <H>{t("2. 빈도수 세기 (가장 흔한 패턴)", "2. Counting frequency (most common)")}</H>
        <p>{t("'무엇이 몇 번 나왔나'를 셀 때 키=값, 값=횟수로 1줄이면 끝나요.", "To count 'how many times each item appears': key = item, value = count.")}</p>
        <Code code={t(`unordered_map<int,int> cnt;
for (int x : a) cnt[x]++;     // 없으면 0에서 시작 → +1
// cnt[7] == 7이 나온 횟수`, `unordered_map<int,int> cnt;
for (int x : a) cnt[x]++;     // starts at 0 if missing → +1
// cnt[7] == how many times 7 appeared`)} />
        <Code lang="python" code={t(`from collections import Counter
cnt = Counter(a)        # {값: 횟수}
print(cnt[7])           # 7이 나온 횟수`, `from collections import Counter
cnt = Counter(a)        # {value: count}
print(cnt[7])           # how many times 7 appeared`)} />
      </section>

      <section>
        <H>{t("3. 존재 확인 · 중복 제거 — set", "3. Membership & dedup — set")}</H>
        <p>{t("'이미 본 적 있나?'를 O(1)로 확인해요. 한 번 훑으며 set 에 넣고, 넣기 전에 있는지 보면 중복을 잡아요.", "Check 'have I seen this?' in O(1). Insert while scanning; check before inserting to catch duplicates.")}</p>
        <Code code={t(`unordered_set<int> seen;
for (int x : a) {
    if (seen.count(x)) { /* 중복! */ }
    seen.insert(x);
}`, `unordered_set<int> seen;
for (int x : a) {
    if (seen.count(x)) { /* duplicate! */ }
    seen.insert(x);
}`)} />
      </section>

      <section>
        <H>{t("4. Two Sum — 짝 찾기", "4. Two Sum — finding a pair")}</H>
        <p>{t("a[i]+a[j]==target 인 짝을, 정렬 없이 한 번에. 지금 값 x 에 대해 'target−x 를 본 적 있나?'를 map 으로 물어봐요. O(n).", "Find a[i]+a[j]==target in one pass, no sorting. For each x, ask the map: 'have I seen target−x?' — O(n).")}</p>
        <Code code={t(`unordered_map<int,int> idx;   // 값 → 인덱스
for (int i = 0; i < n; i++) {
    int need = target - a[i];
    if (idx.count(need))          // 짝을 이미 봤다
        return {idx[need], i};
    idx[a[i]] = i;                // 나를 등록
}`, `unordered_map<int,int> idx;   // value → index
for (int i = 0; i < n; i++) {
    int need = target - a[i];
    if (idx.count(need))          // pair already seen
        return {idx[need], i};
    idx[a[i]] = i;                // register myself
}`)} />
      </section>

      <Link href="/algo/hashtable/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
