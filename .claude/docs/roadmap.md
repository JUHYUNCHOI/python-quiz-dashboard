# 제품 로드맵 (Phase 1~5)

> **언제 여나:** 우선순위를 정할 때. ⚠️ 2026-09-04 검토에서 Phase 2B·3·4·5 는 이미 완료된 것으로 확인됐다 — 본문은 그 이전 시점 서술이다
> 원래 `CLAUDE.md` 안에 있던 내용을 2026-09-04 에 옮겼다. 내용은 그대로다.

---

## ⚠️ 먼저 — 아래 Phase 서술은 2026-04 이전 시점 계획이다

2026-09-04 에 코드로 재확인한 **실제 현재 상태**는 이렇다. 아래 본문과 어긋나면 이 표가 맞다.

| 단계 | 라이브 경로 | 실측 | 완료 커밋 |
|---|---|---|---|
| 1. 문법 | `/learn/[lessonId]` | Python 52 · C++ 26 레슨 | — |
| 2. 연습 클러스터 | `data/practice/bank-*.ts` | 클러스터 파일 존재 | `4fbb15cc` (04-09) |
| 3. 코딩 뱅크 | `/coding-bank` | **라이브** | `4fbb15cc` ~ `e9e2c4a3` (04-09~04-29) |
| 4. 알고리즘 | `/algo` | **토픽 23개 라이브** | `8ee9683e` (04-09) |
| 5. 실전 | `/quest` | **문제 180개 라이브** | 이전부터 운영 중 |
| 통합 지도 | `/journey` | **6스테이지 라이브** | `607b0fab` (04-14) |

**잠금 해제 조건은 전부 제거됐다** (선생님 결정). 아래 본문의 잠금 표는 옛 계획이다.
- `app/algo/page.tsx:20` — "잠금은 두지 않는다 — soft, 추천만 강조"
- `app/quest/page.tsx:325` — "모두 풀린 상태로 (이전: 알고리즘 토픽 8개 완료 조건)"

**아직 확인 못 한 것:** MCQ +63개 SQL(ID 10766~10828)이 DB 에 적용됐는지.
SQL 파일은 `scripts/output/` 에 있다. 조회 권한이 없어 미확인 —
Supabase SQL Editor 에서 `SELECT COUNT(*) FROM questions WHERE id BETWEEN 10766 AND 10828`.


## 제품 로드맵

### 3개 플랫폼 현황

| 플랫폼 | 경로 | 스택 | 배포 | lesson_id 접두사 |
|---|---|---|---|---|
| **Coderin** | `~/Coding/python-quiz-dashboard` | Next.js 16, TS, Tailwind | Vercel | `cpp-*`, `python-*`, `pseudo-*` |
| **Algorithm Lab** | `~/Coding/Algorithm` | Vanilla JS SPA | Cloudflare Workers | `algo-*` |
| **CodeQuest** | `~/Coding/codequest` | React 18 + Vite | Vercel (예정) | `cq-*` |

세 플랫폼 모두 **같은 Supabase 인스턴스**(`kehxcwquevocshrytgyo`)와 `lesson_progress` 테이블을 공유한다.
Algorithm Lab, CodeQuest 모두 Coderin SSO 연동이 이미 구현되어 있다.

### 전체 학습 여정 (제품 비전)

```
[문법]          [연습]              [알고리즘 준비]       [알고리즘]         [실전]
C++ 23레슨  →  코딩 연습 클러스터 →  코딩 뱅크          →  Algorithm Lab  →  CodeQuest
Python 52레슨  (레슨 진행 중 병행)   (브루트포스/종합)      22토픽            161문제 (USACO/MCC)
```

커리큘럼 페이지를 전체 여정 맵으로 개편. 학생이 처음부터 목적지를 볼 수 있어야 함.

### 학습 단계별 설계 원칙 (핵심)

**문제 의식:** 문법만 배우다 보면 vector를 언제 어떻게 쓰는지 모른다. 수업 중 복습도 중요하지만, 실제로 코드를 짜서 뭔가 만드는 경험이 있어야 한다.

#### 1단계: 코딩 연습 클러스터 (레슨 진행 중 병행)
- 각 레슨 완료 시 해당 레슨 개념의 연습 문제 클러스터 해금
- 문법을 배우는 과정이므로 **너무 어려운 문제는 안 됨**
- 목표: "배운 문법이 실제로 동작하는 것을 확인"
- ex) cpp-9 완료 → 벡터 클러스터(배열 순회, 최댓값 등 단순 활용)

#### 2단계: 코딩 뱅크 (모든 레슨 완료 후, 알고리즘 전)
- **알고리즘 지식 없이** 배운 STL/문법 지식만으로 풀 수 있는 복합 문제들
- 브루트포스, 완전탐색 등 — 특별한 알고리즘 없이 "아는 것으로 밀어붙이기"
- 여러 도구를 스스로 선택해서 쓰는 경험 (sort + map, stack + 조건문 등)
- unlockAfter: cpp-p3 (Part 3 프로젝트 완료 후)
- 목표: "도구는 다 있다. 이제 문제를 읽고 어떤 도구를 쓸지 판단하라"
- USACO Bronze 직전 준비 단계 — 여기서 막히면 알고리즘 가도 힘듦

#### 3단계: Algorithm Lab (알고리즘 이론)
- BFS/DFS, DP, 이분탐색, 그리디 등 알고리즘 이론
- 코딩 뱅크 일정 수 완료 후 해금

#### 4단계: CodeQuest (USACO/MCC 실전 문제)
- 알고리즘 토픽 일정 수 완료 후 해금

### 잠금 해제 기준

| 섹션 | 잠금 해제 조건 |
|---|---|
| 연습 문제 클러스터 | 해당 레슨 완료 (레슨별 개별 해금) |
| 코딩 뱅크 | cpp-p3 완료 (Part 3 프로젝트) |
| 알고리즘 (Algorithm Lab) | 코딩 뱅크 일정 수 완료 (TBD) |
| 실전 (CodeQuest) | 알고리즘 토픽 8개 이상 완료 |

---

## Phase 1: MCQ 퀴즈 재배분 (SQL 준비 완료, DB 적용 확인 필요)

USACO Bronze 분석 결과 — 모든 문제에 등장: 반복문, 배열, 조건문, 정렬.
현재 cpp-22(클래스 79개), cpp-20(CP팁 62개)에 과도하게 편중되어 있음.
기존 question.id 삭제 불가 (학생 mastery 데이터 보호). **추가만** 한다.

**상태 (2026-04-29):** +63 SQL 파일 모두 작성 완료, git 커밋됨 (`5e9f4a7`).
- `scripts/output/new_cpp_questions.sql` — cpp-6 +15 / cpp-7 +13 / cpp-23 +14 (ID 10766-10807)
- `scripts/output/new_cpp_questions_phase1b.sql` — cpp-12 +11 / cpp-3 +10 (ID 10808-10828)
- ⚠️ `scripts/output/new_cpp_questions_cpp12_cpp3.sql` (ID 10829-10849) 는 phase1b 와 내용 중복 — 적용 안 해도 됨
- 모두 `ON CONFLICT (id) DO NOTHING` 안전 처리 → 재실행해도 무해
- **DB 에 적용됐는지 Supabase 에서 `SELECT COUNT(*) FROM questions WHERE id BETWEEN 10766 AND 10828` 로 확인. 0 이면 위 두 SQL 파일 SQL Editor 에서 실행.**

### ⚠️ algo-preview lessonId — 알고리즘 Lab용 임시 보관소

cpp-20 문제 중 BFS/DFS/DP/그리디/백트래킹/유니온파인드/누적합/투포인터/슬라이딩윈도우 등
**C++ 커리큘럼에서 가르치지 않는 알고리즘 이론** 문제들은 `lessonId: "algo-preview"`로 설정한다.

**이유:**
- cpp-20 레슨("CP 실전 팁")은 비트연산/typedef/다익스트라만 가르침
- 위 알고리즘 주제들은 Phase 4(Algorithm Lab 흡수) 이후 `algo-*` lessonId로 재배정 예정
- `algo-preview`는 존재하지 않는 lessonId → 학생 복습 큐에 절대 등장 안 함
- question.id는 그대로 → 기존 mastery 데이터 무손실

**algo-preview로 이동된 question IDs (cpp-questions.ts):**
`242, 260, 261, 262, 263, 264, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 288, 289, 290, 292, 293, 294, 296, 297, 298, 299, 300`

Phase 4 완료 시: 각 알고리즘 토픽에 맞는 `algo-*` ID로 재배정할 것.

| 레슨 | 현재 | 목표 | 추가 | 이유 |
|---|---|---|---|---|
| cpp-6 조건문 | 7 | 22 | +15 | Bronze 100% 등장, 어려움 0개 |
| cpp-7 반복문 | 12 | 25 | +13 | Bronze 100% 등장 |
| cpp-23 커스텀 정렬 | 11 | 25 | +14 | Bronze 60%+ 등장, 쉬움 0개 |
| cpp-12 레퍼런스 | 7 | 18 | +11 | 핵심 개념 대비 부족 |
| cpp-3 타입시스템 | 8 | 18 | +10 | Python→C++ 전환 최대 난관 |

**총 +63개 MCQ 문제 작성**

---

## Phase 2: 코딩 연습 문제 시스템 + 콘텐츠

### Phase 2A: 레슨 병행 연습 클러스터 (현재 구현됨)
레슨 완료 시 해당 개념의 클러스터 해금. 문법을 배우는 과정이므로 단일 개념, 적정 난이도 유지.

### Phase 2B: 코딩 뱅크 (미구현 — 다음 주요 작업)
**알고리즘 Lab 직전 단계.** 모든 레슨 완료 후 해금. 알고리즘 지식 없이 배운 STL만으로 풀 수 있는 복합 문제. 어떤 도구를 쓸지 스스로 판단해야 함. 브루트포스/완전탐색 중심.
- unlockAfter: `cpp-p3`
- 목표 문제 수: ~30문제
- 난이도: 쉬움 5 / 보통 15 / 어려움 10
- 문제 유형: sort+map 조합, 완전탐색, 그리디(알고리즘 이름 몰라도 풀 수 있는 수준)

### 설계 원칙
- 기존 레슨 스텝에 **삽입하지 않는다** — 별도 `/practice` 시스템으로 분리
- 기존 학생 진도에 영향 없음 (lesson_id 체계가 완전히 독립적)
- CppRunner 기반 자동 채점 (Piston 자체 호스팅 서버 사용 — `lib/piston.ts`)
- lesson_id 접두사: `practice-*`

### PracticeProblem 인터페이스

```typescript
interface PracticeProblem {
  id: string                              // "loop-001"
  cluster: string                         // "반복문 패턴"
  unlockAfter: string                     // "cpp-7"
  difficulty: "쉬움" | "보통" | "어려움"
  title: string
  description: string
  constraints: string                     // "1 ≤ N ≤ 1000"
  initialCode: string                     // 시작 템플릿
  testCases: { stdin: string; expectedOutput: string }[]
  hints: string[]                         // 단계별 공개
  solutionCode: string
  solutionExplanation: string
}
```

### 연습 문제 클러스터 (USACO Bronze 분석 기반)

| 클러스터 | 잠금 해제 | 문제 수 | 핵심 패턴 |
|---|---|---|---|
| 입출력 기초 | cpp-4 | 8 | cin 다중 입력, 포맷 출력 |
| 조건/논리 | cpp-6 | 15 | 중첩 if, 경계값, 논리 오류 |
| **반복문 패턴** | cpp-7 | 20 | 중첩 루프, 누적, 패턴 (핵심) |
| **배열/벡터** | cpp-9 | 20 | 순회, 최대/최소, 두 배열 (핵심) |
| 문자열 | cpp-11 | 12 | 파싱, 문자 비교, 변환 |
| map/set 활용 | cpp-16 | 12 | 빈도수, 중복 제거, 존재 확인 |
| **정렬 마스터** | cpp-23 | 15 | 커스텀 정렬, 정렬 후 처리 (핵심) |
| 2D 그리드 | cpp-21 | 15 | 격자 탐색, 행/열 처리 |
| **시뮬레이션** | cpp-9+7+6 | 15 | Bronze 핵심 — 직접 시뮬 (핵심) |

**총 132문제**

---

## Phase 3: 커리큘럼 페이지 개편

```
┌─────────────────────────────────────────────────┐
│  🗺️ 나의 학습 여정                                │
├──────────┬──────────┬────────────┬──────────────┤
│ 1. 문법  │ 2. 연습  │ 3. 알고리즘 │  4. 실전     │
│ C++ 23레슨│ 9클러스터 │  22토픽    │  161문제     │
└──────────┴──────────┴────────────┴──────────────┘
```

---

## Phase 4: Algorithm Lab → Coderin 흡수

### 기술 방식
Vanilla JS 시각화를 처음부터 재작성하지 않는다.
`useRef + useEffect` 래퍼 패턴으로 기존 JS 초기화 함수를 React 컴포넌트 안에서 호출.

```tsx
useEffect(() => {
  if (vizRef.current) {
    AlgoTopics[topicId].renderConcept(vizRef.current)
  }
  return () => { /* cleanup */ }
}, [topicId])
```

### 통합 우선순위 (USACO Bronze → Silver 순)

**Wave 1 — Bronze 직결 (먼저):**
sorting → array → prefixsum → stackqueue → hashtable

**Wave 2 — Silver 필수:**
graph(BFS/DFS) → recursion → binarysearch → greedy → dp

**Wave 3 — Gold+:**
backtracking, tree, trie, unionfind, shortestpath, bitmanipulation 등

### 설계 원칙
- 알고리즘 이론은 언어 무관 단일 콘텐츠
- 코드 예시만 Python ↔ C++ 토글 (기본값: 학생이 더 배운 언어)
- 기존 `algo-*` lesson_id 유지 (기존 진도 보호)
- Algorithm Lab CLAUDE.md의 시각화 품질 기준 그대로 적용

### Algorithm Lab 콘텐츠 구조 (참고)
- 22개 토픽 파일: `~/Coding/Algorithm/topics/*.js`
- 각 토픽: `renderConcept()` + `_renderViz*()` + `_initStepController()`
- 시각화: FLIP 애니메이션 패턴 (closure 기반 step controller)
- 4탭 구조: Problem / Think(힌트) / Sim(시뮬레이션) / Code

---

## Phase 5: CodeQuest → Coderin 흡수

- `/quest/[problemId]` 라우트로 통합
- 기존 React 컴포넌트 Next.js로 이전 (스택 친화적)
- `shared.jsx`의 Quiz, CodeBlock 등 Coderin 컴포넌트와 호환
- 기존 `cq-*` lesson_id 유지

### CodeQuest 콘텐츠 구조 (참고)
- 161개 USACO Bronze/MCC 문제 튜토리얼 (`~/Coding/codequest/src/problems/`)
- 각 문제: 3챕터(문제이해/풀이전략/코드빌드), 26+ 스텝
- 공유 컴포넌트: `Narration`, `Quiz`, `NumInput`, `CodeBlock`, `CodeReveal`
