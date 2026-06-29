// 클래스 주차 과제(bronze-class-weeks) ↔ 공개 모듈 문제(bronze-problems) 링크 + 우리 quest 매칭.
// 2026-06-29. 공개에 없는 '클래스 전용' 문제는 CLASS_ONLY_LINKS 에 공식 링크(검색 확인).
// 데이터 전용 — UI/필터가 이걸 import 해서 "문제 → cpid/url/우리 quest" 를 얻음.

import { USACO_BRONZE_PROBLEMS } from "./bronze-problems";
import type { UsacoBronzeProblem } from "./bronze-problems";
import { CPI_BRONZE_CLASS_WEEKS } from "./bronze-class-weeks";
import type { ClassWeekProblem } from "./bronze-class-weeks";

// 이름 정규화: 소문자 · "(bronze)" 제거(Silver 는 유지해 구분) · & → and · 영숫자만
const norm = (s: string) =>
  s.toLowerCase().replace(/\(bronze\)/g, "").replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

// 공개 모듈 문제를 정규화 이름으로 묶음 (동명이인은 배열)
const PUBLIC_BY_NAME = new Map<string, UsacoBronzeProblem[]>();
for (const p of USACO_BRONZE_PROBLEMS) {
  const k = norm(p.name);
  (PUBLIC_BY_NAME.get(k) ?? PUBLIC_BY_NAME.set(k, []).get(k)!).push(p);
}

// 공개 모듈엔 없는 '클래스 전용' 문제의 공식 링크 (2026-06-29 검색 확인)
export const CLASS_ONLY_LINKS: Record<string, { cpid?: number; url: string }> = {
  [norm("Bucket Brigade")]:        { cpid: 939, url: "https://usaco.org/index.php?page=viewproblem2&cpid=939" },
  [norm("Word Processor")]:        { cpid: 987, url: "https://usaco.org/index.php?page=viewproblem2&cpid=987" },
  [norm("Do You Know Your ABCs?")]:{ cpid: 1059, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1059" },
  [norm("Speeding")]:              { cpid: 568, url: "https://usaco.org/index.php?page=viewproblem2&cpid=568" }, // = Speeding Ticket
  [norm("Wormholes")]:             { cpid: 360, url: "https://usaco.org/index.php?page=viewproblem2&cpid=360" }, // 2013 Dec
  [norm("Grid Paths")]:            { url: "https://cses.fi/problemset/task/1625" },
  [norm("Rest Stops")]:            { cpid: 810, url: "https://usaco.org/index.php?page=viewproblem2&cpid=810" },
  [norm("Grass Planting")]:        { cpid: 894, url: "https://usaco.org/index.php?page=viewproblem2&cpid=894" },
  [norm("Studying Algorithms")]:   { url: "https://codeforces.com/gym/102951/problem/B" },
  [norm("D3C - White Sheet")]:     { url: "https://codeforces.com/contest/1216/problem/C" }, // = White Sheet (CF)
};

export interface LinkedProblem extends ClassWeekProblem {
  cpid?: number;
  url?: string;
  questId?: string;   // 우리 quest-problems/<id> (cpid 매칭)
}

export function linkClassProblem(p: ClassWeekProblem): LinkedProblem {
  let key = norm(p.name);
  // 클래스가 Silver 문제를 "Load Balancing"처럼 접미사 없이 부를 때 → 공개 "(Silver)" 변형과 매칭
  if (p.source === "Silver" || p.source === "USACO Silver") {
    const sk = key + "silver";
    if (PUBLIC_BY_NAME.has(sk)) key = sk;
  }
  const cands = PUBLIC_BY_NAME.get(key);
  if (cands && cands.length) {
    // 동명이인(예: Load Balancing Bronze/Silver) → 난이도 일치 우선
    const pick = cands.find(c => c.difficulty === p.difficulty) ?? cands[0];
    return { ...p, cpid: pick.cpid, url: pick.url, questId: pick.questId };
  }
  const co = CLASS_ONLY_LINKS[key];
  if (co) return { ...p, cpid: co.cpid, url: co.url };
  return { ...p }; // 매칭 실패(없어야 정상)
}

export const CLASS_WEEKS_LINKED = CPI_BRONZE_CLASS_WEEKS.map(w => ({
  ...w,
  problems: w.problems.map(linkClassProblem),
}));

// 링크 안 붙은 문제(있으면 데이터 보강 필요)
export const UNLINKED_CLASS_PROBLEMS = CLASS_WEEKS_LINKED
  .flatMap(w => w.problems.filter(p => !p.url).map(p => `${w.title}: ${p.name}`));
