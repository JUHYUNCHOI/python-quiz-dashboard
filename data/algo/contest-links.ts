/**
 * data/algo/contest-links.ts
 *
 * Maps each Algorithm Lab topic to related CodeQuest (USACO/MCC) problems
 * students can try after studying the topic.
 *
 * Only Wave 1 (Bronze) topics have entries — Wave 2/3 go beyond USACO Bronze.
 * CodeQuest URL: https://codequest.coderin.app/?p=<problemId>
 */

import { CODEQUEST_BASE_URL, codeQuestUrl } from "@/data/practice/contest-links"
import type { ContestProblem } from "@/data/practice/contest-links"

export type { ContestProblem }
export { codeQuestUrl, CODEQUEST_BASE_URL }

export interface TopicContestLink {
  topicId: string
  problems: ContestProblem[]
}

/**
 * Per-topic contest problem recommendations.
 * Problems ordered: easy first.
 */
export const ALGO_CONTEST_LINKS: TopicContestLink[] = [
  {
    topicId: "array",
    problems: [
      {
        id: "hps17",
        title: "Cow HPS (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "배열에서 각 값의 빈도를 세는 기본 패턴",
      },
      {
        id: "billboard",
        title: "Billboard (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "배열 범위 연산 — 직사각형 넓이 계산",
      },
      {
        id: "outofplace",
        title: "Out of Place (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "배열 순회로 순서가 맞지 않는 원소 찾기",
      },
    ],
  },
  {
    topicId: "sorting",
    problems: [
      {
        id: "sleepysort",
        title: "Sleepy Cow Sorting (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "정렬 이동 횟수 계산 — 정렬 핵심 스킬",
      },
      {
        id: "outofplace",
        title: "Out of Place (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "정렬 로직으로 단일 비정상 원소 찾기",
      },
      {
        id: "comfycows",
        title: "Comfy Cows (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "정렬 + 스윕: 각 소의 comfortable range 찾기",
      },
      {
        id: "mcc19elim",
        title: "Elimination (MCC 2019)",
        source: "MCC",
        difficulty: "medium",
        why: "다중 키 정렬 + 그리디 매칭",
      },
    ],
  },
  {
    topicId: "stackqueue",
    problems: [
      {
        id: "shellgame",
        title: "Shell Game (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "스왑 시퀀스로 오브젝트 추적 — 스택/큐 상태 관리",
      },
      {
        id: "backforth",
        title: "Back and Forth (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "멀티 스텝 이동 시뮬레이션 — 큐 기반 상태 추적",
      },
    ],
  },
  {
    topicId: "hashtable",
    problems: [
      {
        id: "bovgenomics",
        title: "Bovine Genomics (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "문자 빈도 비교 — 해시테이블 핵심 패턴",
      },
      {
        id: "mcc19elim",
        title: "Elimination (MCC 2019)",
        source: "MCC",
        difficulty: "medium",
        why: "빈도 카운팅 + 그리디 — 해시테이블 응용",
      },
    ],
  },
  {
    topicId: "prefixsum",
    problems: [
      {
        id: "mcc15rect",
        title: "Rectangle (MCC 2015)",
        source: "MCC",
        difficulty: "medium",
        why: "2D 누적합으로 유효 직사각형 개수 세기",
      },
      {
        id: "modernart",
        title: "Modern Art (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "구간 분석 — 누적합으로 색 범위 추적",
      },
    ],
  },
  {
    topicId: "string",
    problems: [
      {
        id: "bovgenomics",
        title: "Bovine Genomics (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "문자별 문자열 비교 — 문자열 기본기",
      },
      {
        id: "whereami",
        title: "Where Am I? (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "최소 고유 접두사 길이 찾기 — 문자열 패턴 매칭",
      },
      {
        id: "moolang",
        title: "Moo Language (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "커스텀 언어 파싱 및 디코딩 — 문자열 파싱 심화",
      },
      {
        id: "mcc19palindrome",
        title: "Palindrome (MCC 2019)",
        source: "MCC",
        difficulty: "medium",
        why: "팰린드롬 검사 + 제약 조건 — 문자열 조작",
      },
    ],
  },
  /* ⭐ 2026-09-27 선생님: *"BFS랑 DFS 문제들 모아두게 해달라는것 되었나? USACO랑 MCC에서."*
     `quest-auditor` 가 quest 180개를 네 겹으로 훑어(키워드 → 좌표쌍 패턴 → 스택 패턴 →
     `visited` 동의어 `seen|marked|explore`, 거기에 `def dfs|def bfs` 전수 검색까지)
     🔒 정답 코드를 직접 읽고 판정했다 — **BFS/DFS 를 쓰는 quest 는 정확히 이 셋뿐이다.**
     `reach`·`mco15trains` 는 가중치가 있는 다익스트라라 `shortestpath` 가 맞고,
     `swapity`(순열 사이클)·`revegetation`(고정 순서 그리디 색칠)·`mcc19bakery`(two-pointer)는
     `deque`·`visited` 를 쓰지만 탐색이 아니다. */
  {
    topicId: "graph",
    problems: [
      {
        id: "mcc20citytour",
        title: "City Tour (MCC 2020)",
        source: "MCC",
        difficulty: "easy",
        why: "격자에서 건너갈 수 있는 칸만 따라가며 번져 나가기 — 가장 기본이 되는 모양",
      },
      {
        id: "mcc20knight",
        title: "Knight (MCC 2020)",
        source: "MCC",
        difficulty: "medium",
        why: "나이트가 뛰는 8방향 — 몇 번 만에 닿는지는 «한 겹씩» 세면 나와요",
      },
      {
        id: "milkfactory",
        title: "Milk Factory (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "길을 거꾸로 뒤집어 놓고 탐색하면 «모두가 닿을 수 있는 곳» 이 보여요",
      },
    ],
  },
]

/**
 * Returns contest links for a given algo topic ID, or null if none.
 */
export function getAlgoContestLinks(topicId: string): TopicContestLink | null {
  return ALGO_CONTEST_LINKS.find(l => l.topicId === topicId) ?? null
}
