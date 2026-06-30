// CPI Bronze Class — 8주 과제 시퀀스 (2026-06-29 수집, 로그인 세션으로 읽음)
// 출처: usaco.guide/groups/d7eYGfddXq3m2trXG2xt (CPI Bronze Class, 비공개 그룹)
//   공개 모듈 문제목록(bronze-problems.ts)과 다름 — 이건 실제 수업의 '주차별 엄선 과제 + 진도 순서'.
//   일부 문제는 공개 모듈엔 없음(예: Bucket Brigade, Word Processor, Speeding, Wormholes, Grid Paths,
//   Grass Planting, Rest Stops, Studying Algorithms, Do You Know Your ABCs?).
// ⚠️ 데이터 전용. cpid/url 은 bronze-problems.ts 의 같은 이름과 매칭해 보강 가능(여기선 name/source/difficulty/주차만).

import type { UsacoDifficulty } from "./bronze-problems";

export interface ClassWeekProblem {
  name: string;
  source: string;              // "Bronze" | "Old Bronze" | "Silver" | "CSES" | "CF" | "YS" | ""
  difficulty: UsacoDifficulty | "Insane";
}

export interface BronzeClassWeek {
  week: number;
  title: string;
  modules: string[];           // 대응 USACO Guide 모듈
  postId: string;              // 그룹 포스트 id (로그인 필요)
  problems: ClassWeekProblem[];
}

export const CPI_BRONZE_CLASS_WEEKS: BronzeClassWeek[] = [
  {
    week: 1, title: "Time Complexity, Rectangle Geometry",
    modules: ["Time Complexity", "Rectangle Geometry"], postId: "ZkhTvlw0KgyHrqQ69LD1",
    problems: [
      { name: "Square Pasture", source: "Bronze", difficulty: "Very Easy" },
      { name: "Bucket Brigade", source: "Bronze", difficulty: "Easy" },
      { name: "Blocked Billboard", source: "Bronze", difficulty: "Easy" },
      { name: "Blocked Billboard II", source: "Bronze", difficulty: "Easy" },
      { name: "Word Processor", source: "Bronze", difficulty: "Easy" },
      { name: "Do You Know Your ABCs?", source: "Bronze", difficulty: "Easy" },
      { name: "The Cow-Signal", source: "Bronze", difficulty: "Easy" },
      { name: "D3C - White Sheet", source: "CF", difficulty: "Normal" },
    ],
  },
  {
    week: 2, title: "Data Structures and Simulation",
    modules: ["Introduction to Data Structures", "Simulation"], postId: "yxuk8S2r38bWhaZO3p0S",
    problems: [
      { name: "Shell Game", source: "Bronze", difficulty: "Easy" },
      { name: "Mixing Milk", source: "Bronze", difficulty: "Easy" },
      { name: "Measuring Traffic", source: "Bronze", difficulty: "Normal" },
      { name: "Circular Barn", source: "Bronze", difficulty: "Normal" },
      { name: "Censoring", source: "Old Bronze", difficulty: "Hard" },
      { name: "Stuck in a Rut", source: "Bronze", difficulty: "Very Hard" },
    ],
  },
  {
    week: 3, title: "Basic Complete Search",
    modules: ["Basic Complete Search"], postId: "HUiqbm1YRSctsEgyrY4e",
    problems: [
      { name: "Bovine Genomics (Bronze)", source: "Bronze", difficulty: "Normal" },
      { name: "Cow Gymnastics", source: "Bronze", difficulty: "Normal" },
      { name: "Lifeguards", source: "Bronze", difficulty: "Normal" },
      { name: "Guess the Animal", source: "Bronze", difficulty: "Hard" },
      { name: "Bovine Genomics (Silver)", source: "Silver", difficulty: "Hard" },
      { name: "Contaminated Milk", source: "Bronze", difficulty: "Very Hard" },
      { name: "Load Balancing", source: "Silver", difficulty: "Very Hard" },
    ],
  },
  {
    week: 4, title: "Complete Search with Recursion",
    modules: ["Complete Search with Recursion"], postId: "MIQuQTvNNdQsecFDVbcL",
    problems: [
      { name: "Apple Division", source: "CSES", difficulty: "Easy" },
      { name: "Creating Strings I", source: "CSES", difficulty: "Easy" },
      { name: "Speeding", source: "Bronze", difficulty: "Easy" },
      { name: "Chessboard & Queens", source: "CSES", difficulty: "Normal" },
      { name: "Livestock Lineup", source: "Bronze", difficulty: "Hard" },
      { name: "Back & Forth", source: "Bronze", difficulty: "Hard" },
      { name: "Wormholes", source: "Old Bronze", difficulty: "Very Hard" },
      { name: "Grid Paths", source: "CSES", difficulty: "Insane" },
    ],
  },
  {
    week: 5, title: "Sorting, Sets, and Maps",
    modules: ["Introduction to Sorting", "Introduction to Sets & Maps"], postId: "u87yGFPJWpEhF9705NfA",
    problems: [
      { name: "Distinct Numbers", source: "CSES", difficulty: "Easy" },
      { name: "Associative Array", source: "YS", difficulty: "Easy" },
      { name: "Kayaking", source: "CF", difficulty: "Normal" },
      { name: "Team Tic Tac Toe", source: "Bronze", difficulty: "Normal" },
      { name: "Why Did the Cow Cross the Road III", source: "Bronze", difficulty: "Normal" },
      { name: "Angry Cows", source: "Bronze", difficulty: "Hard" },
    ],
  },
  {
    week: 6, title: "Ad Hoc Problems",
    modules: ["Ad Hoc Problems"], postId: "ERvii88YFkVzf2qfqgoC",
    problems: [
      { name: "Sleepy Cow Herding", source: "Bronze", difficulty: "Easy" },
      { name: "Promotion Counting", source: "Bronze", difficulty: "Easy" },
      { name: "Sleepy Cow Sorting", source: "Bronze", difficulty: "Hard" },
      { name: "Taming the Herd", source: "Bronze", difficulty: "Hard" },
      { name: "Hoofball", source: "Bronze", difficulty: "Very Hard" },
      { name: "Modern Art", source: "Bronze", difficulty: "Very Hard" },
      { name: "Spaced Out", source: "Silver", difficulty: "Very Hard" },
    ],
  },
  {
    week: 7, title: "Greedy Algorithms",
    modules: ["Introduction to Greedy Algorithms"], postId: "zfoEMNCmxxhR1HkBW30W",
    problems: [
      { name: "Studying Algorithms", source: "CF", difficulty: "Very Easy" },
      { name: "Mad Scientist", source: "Bronze", difficulty: "Easy" },
      { name: "Cow Tipping", source: "Bronze", difficulty: "Normal" },
      { name: "Rest Stops", source: "", difficulty: "Normal" },
      { name: "Even More Odd Photos", source: "Bronze", difficulty: "Normal" },
      { name: "Out of Place", source: "Bronze", difficulty: "Hard" },
      { name: "Race", source: "Bronze", difficulty: "Very Hard" },
    ],
  },
  {
    week: 8, title: "Introduction to Graphs",
    modules: ["Introduction to Graphs"], postId: "NmKW2cknaBADsX6kYX50",
    problems: [
      { name: "Grass Planting", source: "Silver", difficulty: "Normal" },
      { name: "The Great Revegetation", source: "Bronze", difficulty: "Hard" },
      { name: "Milk Factory", source: "Bronze", difficulty: "Hard" },
      { name: "Swapity Swap", source: "Bronze", difficulty: "Hard" },
      { name: "Cow Evolution", source: "Bronze", difficulty: "Very Hard" },
      { name: "Family Tree", source: "Bronze", difficulty: "Very Hard" },
    ],
  },
];
