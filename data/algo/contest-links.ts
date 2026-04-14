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
]

/**
 * Returns contest links for a given algo topic ID, or null if none.
 */
export function getAlgoContestLinks(topicId: string): TopicContestLink | null {
  return ALGO_CONTEST_LINKS.find(l => l.topicId === topicId) ?? null
}
