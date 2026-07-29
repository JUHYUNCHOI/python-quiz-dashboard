/**
 * 알고리즘 학습 경로 — 본길(trunk) / 옆길(side)
 *
 * 왜 이 파일이 있나 (2026-07-29, 선생님):
 *   "알고리즘을 가르치고 싶은데 배우는 순서를 내가 알면 좋겠어. 솔직히 재귀는
 *    아이들이 자꾸 어려워해서 허들이야. 그래서 알고리즘 배우다가 막혀."
 *
 * 20 개 토픽을 전부 순서대로 시키면 학생이 어려운 하나(재귀)에서 멈춘다.
 * 그래서 **꼭 해야 하는 8 개(본길)** 와 **필요할 때 오는 12 개(옆길)** 로 나눈다.
 * 본길 8 개 = USACO Silver 입구까지.
 *
 * ⚠️ 순서는 여기 저장하지 않는다.
 *    `data/algo/topics.ts` 의 선언 순서가 유일한 순서 원천이고, 여기서는 "어느 게
 *    본길인지"(TRUNK_IDS) 만 정한다. 선언 순서를 TRUNK_IDS 로 거르면 의도한 8 개
 *    순서가 그대로 나온다 (문자열만 건너뜀). 순서가 두 곳에 살면 반드시 어긋난다.
 *
 * ⚠️ 진도(completedIds)를 여기서 읽지 않는다.
 *    이미 저장소 안에 알고리즘 진도 정의가 여러 개 흩어져 있다(smart-next / algo 페이지 /
 *    journey / journey-stages / path-completion …). 여기서 또 읽으면 N+1 번째가 된다.
 *    `lib/smart-next.ts` 와 같은 방식으로 **인자로 받는 순수 함수**로 둔다.
 */

import { ALGO_TOPICS, type AlgoTopic } from "@/data/algo/topics"

/** 본길 — 꼭 해야 하는 8 개. 순서는 ALGO_TOPICS 선언 순서를 따른다. */
export const TRUNK_IDS: ReadonlySet<string> = new Set([
  "array",        // 1
  "sorting",      // 2
  "stackqueue",   // 3
  "hashtable",    // 4
  "prefixsum",    // 5
  "binarysearch", // 6
  "greedy",       // 7
  "graph",        // 8  ← 여기까지가 USACO Silver 입구
])

/**
 * 옆길 안내 — "이건 언제 필요한가".
 * 학생이 건너뛰어도 불안하지 않게, *언제 돌아오면 되는지* 를 알려주는 게 목적.
 */
export const SIDE_NOTES: Record<string, { ko: string; en: string }> = {
  recursion:       { ko: "DFS·백트래킹 할 때 필요해요. 그래프(BFS) 먼저 하고 와도 돼요.",
                     en: "Needed for DFS & backtracking. Fine to do graph (BFS) first." },
  string:          { ko: "문자열 문제를 만났을 때.",
                     en: "When you hit a string problem." },
  unionfind:       { ko: "'같은 그룹인가?' 를 묻는 문제에서.",
                     en: "For 'are these in the same group?' problems." },
  dp:              { ko: "Silver 후반. 본길 끝내고 오면 훨씬 쉬워요.",
                     en: "Later Silver. Much easier after the trunk." },
  backtracking:    { ko: "재귀를 먼저. 모든 경우를 다 만들어 봐야 할 때.",
                     en: "Do recursion first. For when you must try every case." },
  tree:            { ko: "그래프를 먼저. 트리는 사이클 없는 그래프예요.",
                     en: "Do graph first — a tree is a graph without cycles." },
  priorityqueue:   { ko: "'가장 작은/큰 것 먼저' 가 필요할 때. 최단 경로의 준비물.",
                     en: "When you need 'smallest/largest first'. Prep for shortest path." },
  topologicalsort: { ko: "'순서를 정해야 하는' 문제 (선수과목 같은).",
                     en: "For ordering problems (like course prerequisites)." },
  shortestpath:    { ko: "선마다 걸리는 시간이 다를 때. 우선순위 큐를 먼저.",
                     en: "When each edge has a different cost. Do priority queue first." },
  divideconquer:   { ko: "재귀를 먼저. 반으로 쪼개서 푸는 문제.",
                     en: "Do recursion first. For split-in-half problems." },
  bitmanipulation: { ko: "Gold+ 에서 가끔. 급하지 않아요.",
                     en: "Occasionally at Gold+. Not urgent." },
  trie:            { ko: "문자열을 아주 많이 검색할 때.",
                     en: "When searching huge numbers of strings." },
  slidingwindow:   { ko: "누적합을 먼저. 구간을 밀어가며 보는 문제.",
                     en: "Do prefix sum first. For sliding-range problems." },
}

export interface AlgoPathState {
  /** 본길 — 학습 순서대로 */
  trunk: AlgoTopic[]
  /** 옆길 — 나머지 전부 */
  side: AlgoTopic[]
  /** 다음에 할 본길 토픽 (전부 끝났으면 null) */
  current: AlgoTopic | null
  /** 완료한 본길 개수 */
  done: number
  /** 본길 총 개수 */
  total: number
  /** 본길을 다 끝냈나 */
  isTrunkDone: boolean
}

/** 토픽이 본길인지 */
export function isTrunk(topicId: string): boolean {
  return TRUNK_IDS.has(topicId)
}

/** 옆길 안내 문구 (없으면 null) */
export function getSideNote(topicId: string): { ko: string; en: string } | null {
  return SIDE_NOTES[topicId] ?? null
}

/**
 * 진도(algo-* lessonId 집합)를 받아 경로 상태를 계산한다.
 * 순수 함수 — 저장소를 읽지 않는다.
 */
export function getAlgoPath(completedIds: Set<string | number>): AlgoPathState {
  const trunk = ALGO_TOPICS.filter(tp => TRUNK_IDS.has(tp.id))
  const side = ALGO_TOPICS.filter(tp => !TRUNK_IDS.has(tp.id))
  const done = trunk.filter(tp => completedIds.has(tp.lessonId)).length
  const current = trunk.find(tp => !completedIds.has(tp.lessonId)) ?? null
  return {
    trunk,
    side,
    current,
    done,
    total: trunk.length,
    isTrunkDone: current === null,
  }
}
