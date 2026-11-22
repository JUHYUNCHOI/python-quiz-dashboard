/**
 * 문제 제목의 영어판을 id 로 찾는다.
 *
 * 사다리(`app/course/ladder/ladder-data.ts`)는 한국어 제목만 들고 있다. 영어
 * 제목은 문제 은행(`data/practice/*`)의 `en.title` 에 이미 들어 있으므로,
 * 사다리에 영어 필드를 복제하지 않고 id 로 이어 붙인다 — 복제하면 둘이 갈린다.
 *
 * `BANK_CLUSTERS` 를 꼭 같이 넣어야 한다. `ALL_CLUSTERS` 에는 코딩 뱅크가
 * 빠져 있어서, 번역이 멀쩡히 있는 뱅크 문제 100개가 영어 화면에서 한국어로
 * 나왔다.
 */

import { ALL_CLUSTERS, BANK_CLUSTERS } from "@/data/practice"

const EN_TITLES = new Map<string, string>()
for (const c of [...ALL_CLUSTERS, ...BANK_CLUSTERS]) {
  for (const p of c.problems) {
    if (p.en?.title) EN_TITLES.set(p.id, p.en.title)
  }
}

export function englishTitle(id: string): string | undefined {
  return EN_TITLES.get(id)
}

/** 화면에 쓸 제목. 영어판이 없으면 한국어로 떨어진다. */
export function problemTitle(p: { id: string; title: string }, lang: string): string {
  return lang === "en" ? (EN_TITLES.get(p.id) ?? p.title) : p.title
}
