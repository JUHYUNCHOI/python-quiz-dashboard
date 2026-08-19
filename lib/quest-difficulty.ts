// 통합 난이도 소스 (1=쉬움 … 5=어려움). MCC·USACO·MCO 카탈로그 뱃지/필터/정렬용.
// 우선순위: (1) MCC 감사맵 → (2) quest-meta 실제 엔트리 → (3) sub 라벨 유추.
import { MCC_DIFFICULTY, DIFF_COLOR, type Difficulty } from "./mcc-difficulty";
import { QUEST_CONCEPT_META } from "./quest-meta";

export type { Difficulty };
export { DIFF_COLOR };

export function questDifficulty(id: string, sub?: string): Difficulty | null {
  // 1) MCC: 병렬 감사로 매긴 값
  const mcc = MCC_DIFFICULTY[id];
  if (mcc) return mcc;

  // 2) quest-meta 에 명시 엔트리가 있으면 그 난이도 (실제 per-problem 값)
  const meta = QUEST_CONCEPT_META[id];
  if (meta && meta.difficulty) return meta.difficulty;

  // 3) sub 라벨에서 유추
  if (sub) {
    if (/warm[-\s]?up/i.test(sub)) return 1;
    // USACO 는 전부 Bronze → 문제번호로: #1 쉬움 … #3 어려움
    const b = sub.match(/Bronze\s*#\s*(\d)/i);
    if (b) return Math.min(4, Number(b[1]) + 1) as Difficulty;   // #1→2, #2→3, #3→4
    // MCO(올림피아드) P1..P5 — Bronze 보다 어려움
    const p = sub.match(/\bP(\d)\b/);
    if (p) { const n = Number(p[1]); return (n <= 2 ? 3 : n === 3 ? 4 : 5) as Difficulty; }
  }
  return null;
}
