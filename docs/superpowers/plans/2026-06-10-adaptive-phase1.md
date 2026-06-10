# 적응형 학습 엔진 Phase 1 (연습/KL) 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 연습/KL 문제에서 학생의 개념별 숙련도를 (기존 solved·starred 데이터로) 추정해, 고정 순서 대신 "이 학생에게 딱 맞는 다음 1개"를 소프트하게 추천한다.

**Architecture:** `lib/adaptive/` 순수 함수 4개(types·concepts·skill-model·next-item) + 조합 진입점 `getAdaptiveNext`. 입력은 이미 로드된 `solvedSet/starredSet`(usePracticeProgress) + 문제 풀(ALL_CLUSTERS). 엔진이 null/throw면 기존 `getSmartNext` 순서로 폴백. UI는 `/practice`가 엔진을 호출해 "⭐ 다음 1개"를 강조 + 이유 한 줄.

**Tech Stack:** Next.js 16, TypeScript, vitest(`npm test`), 기존 `data/practice`(PracticeProblem: id·cluster·difficulty·kl), `hooks/use-practice-progress`.

**제약:** 학생 데이터 보호(새 테이블/컬럼 X — 기존 데이터에서 계산만). 소프트(하드잠금 X). 각 Task 끝 `npx tsc --noEmit` + 필요시 `npm test`. dev 커밋. Phase 2(알고리즘)·3(레슨) 제외.

**개념 정의:** `concept = problem.cluster` (예: `algo-array-contest`, `loops`). 무태그/무클러스터 → 적응 풀에서 제외.

---

### Task 1: 타입 + 개념 매핑 (`lib/adaptive/types.ts`, `lib/adaptive/concepts.ts`)

**Files:**
- Create: `lib/adaptive/types.ts`
- Create: `lib/adaptive/concepts.ts`
- Test: `__tests__/adaptive/concepts.test.ts`

- [ ] **Step 1: 실패 테스트 작성** — `__tests__/adaptive/concepts.test.ts`

```ts
import { describe, it, expect } from "vitest"
import { problemConcept } from "@/lib/adaptive/concepts"

describe("problemConcept", () => {
  it("문제의 cluster 를 개념으로 반환", () => {
    expect(problemConcept({ id: "aarr-e01", cluster: "algo-array-contest", difficulty: "쉬움" } as any)).toBe("algo-array-contest")
  })
  it("cluster 없으면 null (적응 풀 제외)", () => {
    expect(problemConcept({ id: "x", difficulty: "쉬움" } as any)).toBeNull()
  })
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm test -- concepts` · Expected: FAIL (problemConcept not found)

- [ ] **Step 3: types.ts 작성**

```ts
// lib/adaptive/types.ts
export type Concept = string  // = cluster id
export type Difficulty = "쉬움" | "보통" | "어려움"
export type Level = "struggling" | "learning" | "proficient" | "mastered"

export interface ProgressEvent {
  problemId: string
  concept: Concept
  difficulty: Difficulty
  solved: boolean
  starred: boolean   // 힌트 없이 깔끔히
}
export interface ConceptMastery { score: number; level: Level; recent: boolean[] }
export interface AdaptiveNext {
  problemId: string
  concept: Concept
  reason: string       // "왜 이 문제" 한 줄
  reasonEn: string
}
```

- [ ] **Step 4: concepts.ts 작성**

```ts
// lib/adaptive/concepts.ts
import type { PracticeProblem } from "@/data/practice/types"
import type { Concept } from "./types"

export function problemConcept(p: Pick<PracticeProblem, "cluster">): Concept | null {
  return p.cluster && p.cluster.length > 0 ? p.cluster : null
}
```

- [ ] **Step 5: 통과 확인** — Run: `npm test -- concepts` · Expected: PASS
- [ ] **Step 6: 커밋** — `git add lib/adaptive/types.ts lib/adaptive/concepts.ts __tests__/adaptive/concepts.test.ts && git commit -m "feat(adaptive): 타입 + 개념 매핑(concept=cluster)"`

---

### Task 2: 숙련도 모델 (`lib/adaptive/skill-model.ts`)

**Files:**
- Create: `lib/adaptive/skill-model.ts`
- Test: `__tests__/adaptive/skill-model.test.ts`

가중치/임계값(스펙): starred +2, 힌트풀이(solved&&!starred) +1, 미풀이(attempted but !solved) −1. level: `≤0 → struggling`, `1–2 → learning`, `3–5 → proficient`, `≥6 → mastered`. recent = 그 개념 마지막 3 이벤트의 "성공(solved)" 여부.

- [ ] **Step 1: 실패 테스트**

```ts
import { describe, it, expect } from "vitest"
import { computeMastery } from "@/lib/adaptive/skill-model"
import type { ProgressEvent } from "@/lib/adaptive/types"

const ev = (over: Partial<ProgressEvent>): ProgressEvent =>
  ({ problemId: "p", concept: "c", difficulty: "쉬움", solved: true, starred: true, ...over })

describe("computeMastery", () => {
  it("깔끔히 3개 → mastered (점수 6)", () => {
    const m = computeMastery([ev({}), ev({ problemId: "p2" }), ev({ problemId: "p3" })])
    expect(m["c"].score).toBe(6)
    expect(m["c"].level).toBe("mastered")
  })
  it("힌트풀이 1개 → learning (점수 1)", () => {
    const m = computeMastery([ev({ starred: false })])
    expect(m["c"].level).toBe("learning")
  })
  it("미풀이 → struggling (점수 음수)", () => {
    const m = computeMastery([ev({ solved: false, starred: false })])
    expect(m["c"].level).toBe("struggling")
  })
  it("이벤트 0 → 빈 객체", () => {
    expect(computeMastery([])).toEqual({})
  })
})
```

- [ ] **Step 2: 실패 확인** — `npm test -- skill-model` → FAIL
- [ ] **Step 3: 구현**

```ts
// lib/adaptive/skill-model.ts
import type { ProgressEvent, ConceptMastery, Level } from "./types"

function levelOf(score: number): Level {
  if (score <= 0) return "struggling"
  if (score <= 2) return "learning"
  if (score <= 5) return "proficient"
  return "mastered"
}

export function computeMastery(events: ProgressEvent[]): Record<string, ConceptMastery> {
  const byConcept: Record<string, ProgressEvent[]> = {}
  for (const e of events) (byConcept[e.concept] ??= []).push(e)

  const out: Record<string, ConceptMastery> = {}
  for (const [concept, evs] of Object.entries(byConcept)) {
    let score = 0
    for (const e of evs) {
      if (e.solved && e.starred) score += 2
      else if (e.solved) score += 1
      else score -= 1
    }
    const recent = evs.slice(-3).map(e => e.solved)
    out[concept] = { score, level: levelOf(score), recent }
  }
  return out
}
```

- [ ] **Step 4: 통과 확인** — `npm test -- skill-model` → PASS
- [ ] **Step 5: 커밋** — `git add lib/adaptive/skill-model.ts __tests__/adaptive/skill-model.test.ts && git commit -m "feat(adaptive): 개념별 숙련도 모델(computeMastery)"`

---

### Task 3: 다음문제 선택 (`lib/adaptive/next-item.ts`)

**Files:**
- Create: `lib/adaptive/next-item.ts`
- Test: `__tests__/adaptive/next-item.test.ts`

로직: 후보 = 미풀이 문제. 개념 순서(pool 등장 순) 중 *아직 mastered 아닌* 첫 개념을 타깃. 타깃 난이도 = level→{struggling/learning:쉬움, proficient:보통, mastered:어려움}. 그 개념·난이도의 미풀이 1개(없으면 인접 난이도). 없으면 다음 개념. 전부 풀/마스터 → null.

- [ ] **Step 1: 실패 테스트**

```ts
import { describe, it, expect } from "vitest"
import { pickNext } from "@/lib/adaptive/next-item"
import type { ProgressEvent } from "@/lib/adaptive/types"

const P = (id: string, cluster: string, difficulty: any) => ({ id, cluster, difficulty })

describe("pickNext", () => {
  const pool = [
    P("a1", "arr", "쉬움"), P("a2", "arr", "보통"), P("a3", "arr", "어려움"),
    P("s1", "sort", "쉬움"),
  ] as any[]

  it("콜드스타트(이벤트 0) → 첫 개념 가장 쉬운 미풀이", () => {
    const next = pickNext([], pool, new Set())
    expect(next?.problemId).toBe("a1")
  })
  it("arr 쉬움 깔끔히 → arr 보통(한 칸 위)", () => {
    const evs: ProgressEvent[] = [{ problemId: "a1", concept: "arr", difficulty: "쉬움", solved: true, starred: true }]
    const next = pickNext(evs, pool, new Set(["a1"]))
    expect(next?.problemId).toBe("a2")
  })
  it("arr 전부 풀음 → 다음 개념 sort", () => {
    const next = pickNext([], pool, new Set(["a1", "a2", "a3"]))
    expect(next?.problemId).toBe("s1")
  })
  it("전부 풀음 → null (폴백 신호)", () => {
    expect(pickNext([], pool, new Set(["a1","a2","a3","s1"]))).toBeNull()
  })
})
```

- [ ] **Step 2: 실패 확인** — `npm test -- next-item` → FAIL
- [ ] **Step 3: 구현** (computeMastery 재사용; difficulty 순서/타깃 매핑; 개념 순서 = pool 첫 등장 순)

```ts
// lib/adaptive/next-item.ts
import type { AdaptiveNext, ProgressEvent, Difficulty, Level } from "./types"
import { computeMastery } from "./skill-model"

const DIFF_ORDER: Difficulty[] = ["쉬움", "보통", "어려움"]
const TARGET: Record<Level, Difficulty> = {
  struggling: "쉬움", learning: "쉬움", proficient: "보통", mastered: "어려움",
}
type Cand = { id: string; cluster: string; difficulty: Difficulty }

export function pickNext(events: ProgressEvent[], pool: Cand[], solved: Set<string>): AdaptiveNext | null {
  const mastery = computeMastery(events)
  // 개념 순서 = pool 첫 등장 순
  const order: string[] = []
  for (const p of pool) if (!order.includes(p.cluster)) order.push(p.cluster)

  for (const concept of order) {
    const unsolved = pool.filter(p => p.cluster === concept && !solved.has(p.id))
    if (unsolved.length === 0) continue  // 이 개념 다 품 → 다음
    const level: Level = mastery[concept]?.level ?? "struggling"
    const target = TARGET[level]
    // 타깃 난이도부터 가까운 순으로 미풀이 한 개
    const ti = DIFF_ORDER.indexOf(target)
    const ranked = [...unsolved].sort((a, b) =>
      Math.abs(DIFF_ORDER.indexOf(a.difficulty) - ti) - Math.abs(DIFF_ORDER.indexOf(b.difficulty) - ti))
    const pick = ranked[0]
    const reason =
      level === "struggling" ? "쉬운 것부터 차근차근"
      : level === "mastered" ? "잘하니 한 단계 어려운 걸로"
      : "딱 맞는 난이도로 한 칸 위"
    const reasonEn =
      level === "struggling" ? "Start easy" : level === "mastered" ? "You're strong — harder one" : "Just-right next step"
    return { problemId: pick.id, concept, reason, reasonEn }
  }
  return null
}
```

- [ ] **Step 4: 통과 확인** — `npm test -- next-item` → PASS
- [ ] **Step 5: 커밋** — `git add lib/adaptive/next-item.ts __tests__/adaptive/next-item.test.ts && git commit -m "feat(adaptive): 다음문제 선택(pickNext, ZPD)"`

---

### Task 4: 조합 진입점 + 폴백 (`lib/adaptive/index.ts`)

**Files:**
- Create: `lib/adaptive/index.ts`
- Test: `__tests__/adaptive/index.test.ts`

`getAdaptiveNext({ pool, solvedSet, starredSet })`: pool(미풀이 후보)·진행으로 ProgressEvent[] 구성(solved=solvedSet.has, starred=starredSet.has; pool 전체를 이벤트로 — 미풀이는 solved:false 이벤트로 넣지 말고, **풀이 기록 있는 것만** 이벤트화) → pickNext. throw 시 null.

- [ ] **Step 1: 실패 테스트**

```ts
import { describe, it, expect } from "vitest"
import { getAdaptiveNext } from "@/lib/adaptive"

const P = (id: string, cluster: string, difficulty: any) => ({ id, cluster, difficulty })
describe("getAdaptiveNext", () => {
  it("solved/starred 로 이벤트 구성 후 추천", () => {
    const pool = [P("a1","arr","쉬움"), P("a2","arr","보통")] as any[]
    const r = getAdaptiveNext({ pool, solvedSet: new Set(["a1"]), starredSet: new Set(["a1"]) })
    expect(r?.problemId).toBe("a2")
  })
  it("후보 없음 → null", () => {
    expect(getAdaptiveNext({ pool: [], solvedSet: new Set(), starredSet: new Set() })).toBeNull()
  })
})
```

- [ ] **Step 2: 실패 확인** — `npm test -- adaptive/index` → FAIL
- [ ] **Step 3: 구현**

```ts
// lib/adaptive/index.ts
import { pickNext } from "./next-item"
import type { AdaptiveNext, ProgressEvent, Difficulty } from "./types"
export * from "./types"

interface Args {
  pool: { id: string; cluster: string; difficulty: Difficulty }[]
  solvedSet: Set<string>
  starredSet: Set<string>
}
export function getAdaptiveNext({ pool, solvedSet, starredSet }: Args): AdaptiveNext | null {
  try {
    const events: ProgressEvent[] = pool
      .filter(p => solvedSet.has(p.id))   // 풀이 기록 있는 것만 이벤트화
      .map(p => ({ problemId: p.id, concept: p.cluster, difficulty: p.difficulty, solved: true, starred: starredSet.has(p.id) }))
    return pickNext(events, pool, solvedSet)
  } catch { return null }
}
```

- [ ] **Step 4: 통과 확인** — `npm test -- adaptive/index` → PASS
- [ ] **Step 5: 커밋** — `git add lib/adaptive/index.ts __tests__/adaptive/index.test.ts && git commit -m "feat(adaptive): 진입점 getAdaptiveNext + 폴백"`

---

### Task 5: `/practice` KL 모드에 "⭐ 다음 1개" 강조 (UI, 소프트)

**Files:**
- Modify: `app/practice/page.tsx` (KLView)

KLView 가 `getAdaptiveNext({ pool: KL_FLAT, solvedSet, starredSet })` 호출 → 추천 문제를 목록 맨 위 "⭐ 지금 추천" 카드로 강조(이유 표시). 나머지 목록 그대로(소프트). 추천 null이면 카드 숨김(=폴백, 그냥 목록).

- [ ] **Step 1:** `KLView({ solvedSet })` 시그니처에 `starredSet` 추가, 호출부(ClusterList→KLView)에서 `starredSet` 전달. (ClusterList 는 이미 `starredSet` prop 받음)
- [ ] **Step 2:** KLView 안에서:
```tsx
import { getAdaptiveNext } from "@/lib/adaptive"
// ...
const rec = getAdaptiveNext({ pool: KL_FLAT.map(p => ({ id: p.id, cluster: p._clusterId, difficulty: p.difficulty })), solvedSet, starredSet })
const recProb = rec ? KL_FLAT.find(p => p.id === rec.problemId) : null
```
- [ ] **Step 3:** 목록 위에 추천 카드 렌더 (recProb 있을 때):
```tsx
{recProb && (
  <Link href={`/practice?cluster=${recProb._clusterId}&problem=${recProb.id}&from=kl`}
    className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 flex items-center gap-3 hover:shadow-md transition-all">
    <span className="text-2xl shrink-0">⭐</span>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-bold text-amber-600">{t("지금 추천 — " + rec!.reason, "Recommended — " + rec!.reasonEn)}</p>
      <p className="font-bold text-gray-900 truncate">{recProb.title}</p>
    </div>
    <span className="text-amber-500 shrink-0">→</span>
  </Link>
)}
```
- [ ] **Step 4: 빌드 게이트** — Run: `npx tsc --noEmit` (journey-mockup 무관 에러만 무시) → 0, `npm run build` → EXIT 0
- [ ] **Step 5: 커밋** — `git add app/practice/page.tsx && git commit -m "feat(practice): KL 모드에 적응형 '⭐ 다음 1개' 추천 카드(소프트)"`

---

### Task 6 (선택, 후순위): attempts 신호 노출

현재 GET `/api/practice/progress` 는 solved·starred 만 반환(attempts 컬럼은 있음). "반복 실패→쉬운 거" 신호를 강화하려면 GET 에 attempts 포함(additive) + usePracticeProgress·엔진에 전달. **v1 검증 후 필요하면.** (이번 플랜 필수 아님 — solved/starred 만으로 동작.)

---

## 완료 기준 (Phase 1)
- `npm test` 적응형 단위테스트 전부 통과.
- `/practice` 🎯 KL 모드 진입 시 "⭐ 지금 추천" 카드가 학생 진행에 따라 바뀜(콜드=가장 쉬움, 깔끔히 풀수록 위로).
- 추천 실패/후보 없음 → 카드 숨김(기존 목록·순서 그대로 = 폴백). 하드 잠금 없음.
- tsc + next build 통과. dev 커밋. 학생 데이터/스키마 무변경.
