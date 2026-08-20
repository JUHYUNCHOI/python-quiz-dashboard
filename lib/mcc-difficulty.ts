// MCC 문제 난이도 (1=쉬움 … 5=어려움, Bronze 상대).
// 2026-08-18 병렬 감사 6배치로 48개 전부 평가 (알고리즘/개념 기준).
// 용도: /quest 카탈로그에서 난이도 뱃지 + "쉬운 것부터" 정렬.
// quest-meta.ts 의 difficulty 와 별개(가벼운 MCC 전용 소스) — 나중에 통합 가능.

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export const MCC_DIFFICULTY: Record<string, Difficulty> = {
  // 1 — 쉬움 (단순 스캔/정렬/한 줄 관찰)
  mcc15bahasaf: 1, magicorbs: 1, mcc19rect: 1, xorstring: 1,

  // 2 — 기본 (시뮬/경우나눔/집합·딕셔너리)
  collatz: 2, cornercover: 2, fences: 2, mcc15rect: 2, mcc19candy: 2,
  mcc19rect2: 2, mcc21carrots: 2,
  mcc22aliens: 2, mcc22grammar: 2,
  simplegame: 2,

  // 3 — 표준 기법 (그리디/정렬활용/스택·투포인터/BFS 기본)
  fans: 3, gifts: 3, mcc15equation: 3, mcc15isthmus: 3, mcc15choco: 3,
  mcc19bakery: 3, mcc19ditcoin: 3, mcc19elim: 3, mcc20citytour: 3, mcc20cipher: 3,
  mcc20missing: 3, mcc21dvd: 3,
  mcc21marbles: 3, mcc21menu: 3,
  tichu: 3, tricks: 3, word: 3,

  // 4 — 어려움 (다단계/DP/BFS 응용)
  explodingarrow: 4, mcc19palindrome: 4, mcc20zigzag: 4, mcc20kitty: 4, mcc20knight: 4,
  mcc21glass: 4, mcc21simplemath: 4,
  mcc22cardshark: 4, mcc22maze: 4, mcc22birthday: 4, mcc22lamp: 4, mobilegame: 4,

  // 5 — 매우 어려움 (구간 DP/다익스트라/조합 DP)
  innovation: 5, reach: 5, rectangles: 5, subseqmedian: 5, sumk: 5,
};

/** 난이 색상 (1 초록 → 5 빨강). */
export const DIFF_COLOR: Record<Difficulty, string> = {
  1: "#16a34a", 2: "#65a30d", 3: "#ca8a04", 4: "#ea580c", 5: "#dc2626",
};

export function mccDifficulty(id: string): Difficulty | null {
  return MCC_DIFFICULTY[id] ?? null;
}
