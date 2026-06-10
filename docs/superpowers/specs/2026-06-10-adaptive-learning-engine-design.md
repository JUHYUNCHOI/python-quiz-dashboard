# 적응형 학습 엔진 설계 — "스마트 다음 1개"

> 작성: 2026-06-10 · 상태: 설계 합의(브레인스토밍) · 다음: writing-plans

## 1. 문제 & 북극성

**문제:** 지금 연습/KL/알고리즘은 *고정 순서*다. 잘하는 학생은 지루하고(이미 아는 걸 또), 막히는 학생은 좌절한다(너무 어려운 게 순서대로 옴). 학생마다 실력이 다른데 길은 하나다.

**북극성(사용자):** "학생이 *고민 없이* 다음 1개만 보고 쭉쭉 → 대회까지." 적응형은 이 "다음 1개"를 **이 학생한테 딱 맞는 1개**로 만드는 것.

**사용자 결정(브레인스토밍):**
- 범위: **전부**(연습·알고리즘·레슨) — 단 **엔진은 공용 1개, 적용은 단계 롤아웃**.
- 적응 방식: **시스템이 다음 1개를 정해서 제시**(자동) + 소프트 탈출구("더 쉬운 거"/목록) + "왜 이 문제?" 한 줄.
- 콜드 스타트: **조용히 파악**(진단 퀴즈 없음). 쉬운 것부터 시작 → 결과로 보정.
- 엔진: **A(개념별 휴리스틱) + C(Leitner 재출제) 코어**, 인터페이스 분리해 나중에 **B(ELO)**로 코어 교체 가능.

## 2. 절대 제약 (학생 데이터 보호)
- 기존 `lesson_progress`·`practice_progress` 스키마/키 **변경 금지**. v1은 기존 데이터에서 **계산만** (새 테이블/컬럼 없음).
- `question.id`·lesson_id·localStorage 키 불변.
- 엔진은 **절대 하드 잠금 X** — 추천(소프트)만. 실패 시 기존 순서로 폴백.

## 3. 아키텍처 (순수 함수 분리)

```
lib/adaptive/
  concepts.ts      개념 정의 + (문제·레슨)→개념 매핑 + 커리큘럼 순서(선수관계)
  skill-model.ts   진행 이벤트(solved·starred·attempts) + 문제태그 → (학생×개념) 숙련도
  next-item.ts     숙련도 + 후보 풀 → 다음 1개 + 이유(+소프트 대안)
  index.ts         조합 진입점 (예: getAdaptiveNext)
```
- 모두 **순수 함수**(Supabase 비결합) → 단위 테스트 용이, 컨텍스트에 담김.
- 기존 `lib/smart-next.ts`는 적응 엔진을 호출하는 **얇은 래퍼**가 되거나, 화면이 새 `useAdaptiveNext` 훅을 씀.
- 데이터 로드(Supabase/localStorage)는 기존 `usePracticeProgress`/`api/practice/progress` 재사용 — 엔진엔 이미 로드된 이벤트만 주입.

### 3.1 concepts.ts
- `Concept` = 토픽 키(배열·정렬·투포인터·해시·누적합·그리디·문자열·스택큐 … + algo 토픽 + (Phase3) 레슨 개념).
- `problemConcept(problem)` → 개념 (문제의 cluster/topic 태그에서). 
- **태그 폴백:** 태그 없는 문제는 개념 `"general"`로 매핑하되 적응 풀에서 제외(고정 순서로). 계획 단계에서 Phase-1 후보(연습 클러스터 + KL)가 전부 유효 태그를 갖는지 먼저 확인.
- `CONCEPT_ORDER` / `prereqs` — 커리큘럼 순서(기초 개념을 고급보다 먼저). 기존 TOPIC_PREREQ·ALGO_TOPICS.wave 재사용.

### 3.2 skill-model.ts
- 입력: `ProgressEvent[]` = {problemId, concept, difficulty, solved, starred, attempts}. **순서 = 배열 순(시도 순). v1은 영구 타임스탬프 불필요** — "최근"은 그 개념 이벤트 부분열의 뒤쪽 N개.
- (학생×개념) **mastery score**: 깔끔히(starred) **+2**, 힌트/스캐폴드 풀이 **+1**, 실패/미풀이 **−1**. (가중치 상수, 튜닝 가능)
- score → `level` **초기 임계값(상수, 튜닝 가능)**: `score ≤ 0 || 데이터 0 → struggling/unknown(쉬운 것부터)`, `1–2 → learning`, `3–5 → proficient`, `≥6 → mastered`. "최근 연속" = 그 개념 마지막 **3개** 이벤트.
- (옵션·후순위) 시간 감쇠로 복습 필요 표시.
- 순수: `computeMastery(events): Record<Concept, {score, level, recent}>`. (TDD: 위 임계값으로 기대 출력 단언)

### 3.3 next-item.ts
- 입력: mastery, 후보 문제 풀(개념·난이도·미풀이 여부), 커리큘럼 순서.
- 로직:
  1. **타깃 개념** = 커리큘럼 순서상 아직 mastered 아닌 개념 중, 도달 가능(선수 충족)한 것에서 *약한/현재* 개념.
  2. 그 개념의 **"한 칸 위" 난이도** 미풀이 문제 1개 (ZPD: 너무 쉽지도 어렵지도).
  3. 최근 반복 실패 → 한 칸 **아래**(쉬운 거) 또는 **개념 미니레슨 링크**.
  4. 그 개념 쉬운 거 다 깔끔 → **건너뛰고** 다음 개념/난이도.
  5. **Leitner**: 예전 실패 문제가 "재출제 due"면 우선 끼움.
- 출력: `{ problem, reason, easierAlt?, listFallback }`.
- 이유 예: "배열은 잘하니 한 칸 위로 / 투포인터가 약해서 쉬운 것부터 / 저번에 막힌 거 다시".

## 4. 데이터 흐름
1. 화면 진입 → `usePracticeProgress`(기존)가 solved/starred/attempts 로드(Supabase + localStorage).
2. 문제 풀 + 태그(기존 ALL_CLUSTERS)와 합쳐 `ProgressEvent[]` 구성.
3. `computeMastery` → `getAdaptiveNext` → 다음 1개 + 이유.
4. 문제 풀면 기존 `api/practice/progress` 가 이벤트 저장 → 다음 계산에 반영(실시간).
- **새 저장소 없음(v1).** 성능 이슈 시 Phase 후 `concept_mastery` 캐시 테이블(하위호환 마이그레이션) 검토.

## 5. UI (기존 화면이 엔진 호출)
- **/journey 히어로**, **/practice(KL·클러스터)**, **레슨 완료**, **세트 완료** — 고정순서(getSmartNext) 대신 `getAdaptiveNext`.
- 사다리/목록: "⭐ 네 다음 1개" 강조 + **"왜 이 문제" 한 줄** + 작은 **"더 쉬운 거"/"목록"**(소프트 탈출).
- 세트 완료 "이해도 평가"(이미 구현)가 엔진 신호로 자연 연결.
- 블랙박스 금지 — 항상 이유 표시.

## 6. 단계 롤아웃
- **Phase 1 — 연습/KL** (데이터 있음, 위험 낮음, 가치 큼): 엔진 코어 + 연습/KL "다음 1개" 적응. ⭐ 먼저.
- **Phase 2 — 알고리즘 토픽**: 토픽 숙련도 → 약한/엣지 토픽 추천 + 보충 링크.
- **Phase 3 — 레슨**: 레슨 개념 선수관계로 건너뛰기/보충. **가장 민감(핵심 진도)** → 마지막.
- 각 Phase: 순수함수 단위테스트 → tsc/build 게이트 → dev 커밋 → 검토.

## 7. 테스트
- `skill-model`: 이벤트열 → 기대 숙련도 (TDD).
- `next-item`: 숙련도 → 기대 추천(엣지: 콜드스타트, 전부 마스터, 반복실패, due 재출제).
- 폴백: 엔진 throw/빈결과 → 기존 getSmartNext 순서.

## 8. 엣지/에러
- 콜드 스타트(이벤트 0) → 전 개념 unknown → 첫 개념 가장 쉬운 문제.
- 오프라인/Supabase 실패 → localStorage 이벤트로 계산.
- 후보 풀 고갈(다 품) → "이 단계 완료 → 다음 단계" 안내.
- 엔진 예외 → 기존 순서 폴백(절대 빈 화면/막힘 없음).

## 9. YAGNI (지금 안 함)
- ELO(B)·시간감쇠·캐시 테이블·진단 퀴즈 — 후순위. v1은 휴리스틱 + 기존 데이터 계산.
- Phase 2·3는 Phase 1 검증 후.
