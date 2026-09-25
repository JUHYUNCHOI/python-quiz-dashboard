// 통합 난이도 소스 (1=쉬움 … 5=어려움). MCC·USACO·MCO 카탈로그 뱃지/필터/정렬용.
// 우선순위: (1) MCC 감사맵 → (2) quest-meta 실제 엔트리 → (3) sub 라벨 유추.
import { MCC_DIFFICULTY, DIFF_COLOR, type Difficulty } from "./mcc-difficulty";
import { QUEST_CONCEPT_META } from "./quest-meta";

export type { Difficulty };
export { DIFF_COLOR };

// 출처: "audited" = 사람이 매김(①감사맵·②quest-meta 명시값), "inferred" = sub 라벨 유추(아무도 안 봄).
// 왜 필요한가 (2026-09-13, 선생님 "이 문제가 진짜 레벨3인가?"): 화면에는 값 하나로만 보여서
// 감사값과 유추값을 구별할 수 없었다. 값을 쓰는 자리는 `.value`, 출처를 보여줄 자리는 `.source`.
export type DifficultySource = "audited" | "inferred";
export type QuestDifficulty = { value: Difficulty; source: DifficultySource };

export function questDifficulty(id: string, sub?: string): QuestDifficulty | null {
  // 1) MCC: 병렬 감사로 매긴 값
  const mcc = MCC_DIFFICULTY[id];
  if (mcc) return { value: mcc, source: "audited" };

  // 2) quest-meta 에 명시 엔트리가 있으면 그 난이도 (실제 per-problem 값)
  const meta = QUEST_CONCEPT_META[id];
  if (meta && meta.difficulty) return { value: meta.difficulty, source: "audited" };

  // 3) sub 라벨에서 유추 — 아무도 안 매긴 값이다
  if (sub) {
    if (/warm[-\s]?up/i.test(sub)) return { value: 1, source: "inferred" };
    /* USACO 는 전부 Bronze → **전부 3.**
       ⚠️ 2026-09-13 이전에는 문제 번호로 유추했다 — `#1→2 · #2→3 · #3→4`.
          선생님 "이 문제가 진짜 레벨3인가?" 로 열어보니 **그 규칙이 틀렸다.**
          기획이 **사람이 매긴 42개와 대조**해 확인한 것:
            · `#1 → 2` 예측인데 수기값 셋(rounding·astral·leaders)은 **전부 3~4**
            · `#3 → 4` 예측인데 수기값 일곱 중 **여섯이 3** (moo 만 4)
            · `#2 → 3` 만 그럭저럭 맞았다 (일곱 중 여섯)
          **USACO 문제 번호는 그 대회 안 배치 순서일 뿐** 우리 학생 난이도와 상관이 거의 없고,
          `#1`·`#3` 에서는 오히려 **역상관**이었다. 그래서 규칙을 버리고 **최빈값 3** 으로 고정한다 —
          "덜 틀린" 쪽이다. 선생님 지시(2026-09-13).
       ⚠️ 이건 **모르겠다는 뜻의 3** 이다. 실제로 재본 quest 는 `quest-meta.ts` 에
          `difficulty` 를 **명시**해라 — 명시값이 이 유추보다 우선한다. */
    if (/Bronze/i.test(sub)) return { value: 3, source: "inferred" };
    // MCO(올림피아드) P1..P5 — Bronze 보다 어려움
    const p = sub.match(/\bP(\d)\b/);
    if (p) {
      const n = Number(p[1]);
      return { value: (n <= 2 ? 3 : n === 3 ? 4 : 5) as Difficulty, source: "inferred" };
    }
  }
  return null;
}
