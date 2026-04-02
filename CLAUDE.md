# CLAUDE.md — 코드린 프로젝트 컨텍스트

## 프로젝트 개요
코드린(Coderin): 중학생/고등학생을 위한 코딩 학습 대시보드. Python, C++, Pseudocode(IGCSE) 커리큘럼 제공.

## 기술 스택
- Next.js 16 (App Router, Turbopack)
- TypeScript, Tailwind CSS
- Supabase (인증, DB)
- `output: export` (정적 빌드) — 동적 라우트 불가, query params 사용

## 퀴즈 시스템 아키텍처

### 문제 파일
- `data/questions/python-questions.ts` — Python 300문제
- `data/questions/cpp-questions.ts` — C++ 300문제

### QuizQuestion 인터페이스 (hooks/use-quiz-state.ts)
```ts
interface QuizQuestion {
  id: number
  lessonId: string | number    // 커리큘럼 레슨 매핑 (Python: 1-52, C++: "cpp-1"~"cpp-20")
  difficulty: string           // "쉬움" | "보통" | "어려움"
  question: string
  code: string
  options: string[]
  correctAnswer: number        // 0-based index
  explanation: string
  keyConceptTitle: string
  keyConceptDescription: string
  codeComparison?: { wrong: string; correct: string }
  relatedTopics?: string[]
  animationKey?: string        // 오답 설명 시 보여줄 애니메이션 컴포넌트 키
}
```

### 스마트 세션 시스템 (lib/quiz-question-selector.ts)
- 복습 30% + 새 문제 50% + 인터리빙 20%
- 난이도 필터: beginner→쉬움, intermediate→쉬움+보통, advanced→전체
- 진도 기반 출제: localStorage의 completedLessons 기준
- 새 문제는 lessonId 순서 → 난이도 순서로 출제

### 간격 반복 (lib/spaced-repetition.ts)
- Leitner 5-box 시스템 (1일, 3일, 7일, 14일, 30일)
- localStorage "question-mastery"에 저장
- 틀린 문제 2-3문제 후 재출제 (retryQueue)

### 애니메이션 시스템
- 레지스트리: `components/learn/component-registry.ts`
- 애니메이션 폴더: `components/animations/`
- 퀴즈 오답 시 ExplanationPanel에서 animationKey로 동적 로드

### SyntaxBuilder 애니메이션 (components/animations/syntax-builder.tsx)
문법이 단계별로 조립되는 애니메이션. 프리셋:
- `cppIfBuilder`, `cppForBuilder`, `cppWhileBuilder`, `cppFunctionBuilder`
- `pyIfBuilder`, `pyForBuilder`, `pyFunctionBuilder`, `pyClassBuilder`

**새 문법 프리셋 추가 방법:**
1. `syntax-builder.tsx`의 PRESETS 객체에 새 프리셋 추가
2. 편의 컴포넌트 export 추가
3. `component-registry.ts`에 등록
4. 관련 문제에 `animationKey` 추가

### 커리큘럼 구조 (app/curriculum/page.tsx)
- Python: 52 레슨 (Part 1-9)
- C++: 23 레슨 + 프로젝트 3개 (Part 1-3)
- Pseudocode/IGCSE: 별도 트랙
- 순차 잠금 해제 (완료한 레슨 + 다음 1개)

### ⚠️ C++ lessonId ↔ 커리큘럼 매핑 (ID 번호 ≠ 커리큘럼 순서)

> **퀴즈 문제 작업 시 반드시 이 표를 참고할 것. ID 번호만 보고 순서를 추측하면 안 됨.**

**Part 1** (cpp-p1로 마무리):
| lessonId | 커리큘럼 순서 | 내용 |
|---|---|---|
| cpp-1 | 1 | 파이썬 vs C++ — main(), #include, 기본 구조 |
| cpp-2 | 2 | cout 심화 & namespace — endl, \n, \t, using namespace std |
| cpp-3 | 3 | 변수와 타입 — int/double/string/bool/char, const, auto, 타입변환 |
| cpp-4 | 4 | cin 입력 — cin >>, getline |
| cpp-5 | 5 | 연산자 — +,-,*,/,%, ++, +=, ==, !=, &&, \|\|, !, 삼항 |
| cpp-6 | 6 | 조건문 — if/else, else if, switch/case |
| cpp-7 | 7 | 반복문 — for, while, do-while, break, continue, 중첩 루프 |
| cpp-8 | 8 | 함수 — 선언/정의, 매개변수, return, void, 오버로딩 |
| cpp-p1 | - | 프로젝트: 숫자 맞추기 게임 |

**Part 2** (cpp-p2로 마무리):
| lessonId | 커리큘럼 순서 | 내용 |
|---|---|---|
| cpp-9 | 9 | 배열 & 벡터 — int arr[5], vector<T>, push_back, pop_back, size |
| cpp-21 | 10 | 2차원 배열 & 2D vector — grid[행][열], vector<vector<int>> ← ID가 21이지만 파트2 2번째! |
| cpp-10 | 11 | Range-for & auto — for(auto x : vec), 타입 추론 |
| cpp-11 | 12 | 문자열 심화 — substr, find, replace, length, compare |
| cpp-12 | 13 | 참조와 함수 — int& ref, pass by reference, swap |
| cpp-13 | 14 | 포인터 기초 — int* ptr, &, *, nullptr, 포인터 산술 |
| cpp-14 | 15 | 구조체 (struct) — struct 선언, . 멤버 접근, struct 배열 |
| cpp-22 | 16 | 클래스 (class) — class, public/private, getter/setter, 생성자, OOP ← ID가 22이지만 파트2 마지막! |
| cpp-p2 | - | 프로젝트: RPG 캐릭터 관리 |

**Part 3** (cpp-p3로 마무리):
| lessonId | 커리큘럼 순서 | 내용 |
|---|---|---|
| cpp-15 | 17 | pair & tuple — std::pair, .first/.second, std::tuple, get<> |
| cpp-23 | 18 | sort 마스터 — sort(), 커스텀 comparator, lambda 정렬, 정렬 알고리즘 이론 ← ID가 23이지만 파트3 2번째! |
| cpp-16 | 19 | map & set — std::map, std::set, std::unordered_map |
| cpp-17 | 20 | STL 탐색 함수 — find, count_if, accumulate, 반복자 |
| cpp-18 | 21 | stack & queue — std::stack, std::queue, std::deque, std::priority_queue |
| cpp-19 | 22 | 파일 I/O & Fast I/O — ifstream, ofstream, ios::sync_with_stdio |
| cpp-20 | 23 | CP 실전 팁 — 다익스트라, bits/stdc++.h, 비트연산, typedef |
| cpp-p3 | - | 프로젝트: USACO 모의전 |

**퀴즈 문제 작성/배정 시 체크리스트:**
- cpp-21 문제는 cpp-9(배열/벡터), cpp-7(반복문)만 전제해야 함 — 문자열/레퍼런스/포인터 개념 사용 금지
- cpp-22 문제는 cpp-14(struct)까지 배운 상태 기준 — STL(cpp-15~) 개념 사용 금지
- cpp-23 문제는 cpp-15(pair/tuple) 이후 — sort 심화 및 정렬 이론 담당
- 상속/다형성/virtual 개념 → cpp-22(class) 레슨에 포함
- 수동 구현 정렬(버블/선택/삽입) 이론 → cpp-23

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
[문법]          [연습]            [알고리즘]         [실전]
C++ 23레슨  →  코딩 연습       →  Algorithm Lab  →  CodeQuest
Python 52레슨   132문제 (9클러스터) 22토픽            161문제 (USACO/MCC)
```

커리큘럼 페이지를 전체 여정 맵으로 개편. 학생이 처음부터 목적지를 볼 수 있어야 함.

### 잠금 해제 기준

| 섹션 | 잠금 해제 조건 |
|---|---|
| 연습 문제 | C++ 8레슨 이상 완료 |
| 알고리즘 (Algorithm Lab) | 연습 클러스터 5개 이상 완료 |
| 실전 (CodeQuest) | 알고리즘 토픽 8개 이상 완료 |

---

## Phase 1: MCQ 퀴즈 재배분 (현재 진행)

USACO Bronze 분석 결과 — 모든 문제에 등장: 반복문, 배열, 조건문, 정렬.
현재 cpp-22(클래스 79개), cpp-20(CP팁 62개)에 과도하게 편중되어 있음.
기존 question.id 삭제 불가 (학생 mastery 데이터 보호). **추가만** 한다.

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

### 설계 원칙
- 기존 레슨 스텝에 **삽입하지 않는다** — 별도 `/practice` 시스템으로 분리
- 기존 학생 진도에 영향 없음 (lesson_id 체계가 완전히 독립적)
- CppRunner 기반 자동 채점 (Wandbox API 기존 사용)
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

## 배포
- Vercel (정적 빌드)
- `npm run build` = `next build`
- 동적 라우트 대신 query params 사용 (/parent?t=TOKEN)

## ⚠️ 핵심 제약사항 — 기존 학생 데이터 보호

**실제 학생들이 이미 학습 중인 프로덕션 서비스다. 모든 변경은 기존 진도 데이터에 영향을 주면 안 된다.**

### 절대 하면 안 되는 것
- `lesson_id` 값 변경 — Supabase `lesson_progress` 테이블에 저장된 키값이므로 바꾸면 기존 진도가 사라짐
- `question.id` 변경 — `question-mastery` localStorage/DB에 저장된 키값
- localStorage 키 이름 변경 (`completedLessons`, `completedQuizzes`, `question-mastery`, `quiz-history` 등)
- Supabase 테이블 컬럼 삭제/이름 변경 (마이그레이션 없이)
- 커리큘럼 레슨 순서 변경 — 잠금 해제 로직이 순서 기반이므로 기존 학생의 unlock 상태가 달라짐

### 변경 시 반드시 확인할 것
- 레슨 내용(텍스트/코드 예시) 수정 → OK, lesson_id만 유지하면 됨
- 새 레슨 추가 → OK, 기존 ID와 겹치지 않게
- UI/컴포넌트 변경 → OK, 데이터 구조에 영향 없으면
- DB 스키마 변경 → 반드시 하위 호환 마이그레이션 작성 후 진행
- variant=null 같은 레거시 데이터가 DB에 존재할 수 있음 — 쿼리 작성 시 null/'' 모두 고려

### 🔒 보호된 lesson_id 목록 (절대 변경/삭제 금지)

**Python** (숫자형 ID):
`1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52`

**C++** (문자열형 ID):
`cpp-1 cpp-2 cpp-3 cpp-4 cpp-5 cpp-6 cpp-7 cpp-8 cpp-p1`
`cpp-9 cpp-10 cpp-11 cpp-12 cpp-13 cpp-14 cpp-p2`
`cpp-15 cpp-16 cpp-17 cpp-18 cpp-19 cpp-20 cpp-p3`

**Pseudocode/IGCSE** (문자열형 ID):
`pseudo-1 pseudo-2 pseudo-3 pseudo-4 pseudo-5 pseudo-6 pseudo-7 pseudo-8 pseudo-28 pseudo-p1`
`pseudo-9 pseudo-10 pseudo-11 pseudo-12 pseudo-13 pseudo-14 pseudo-p2`
`pseudo-15 pseudo-16 pseudo-17 pseudo-18 pseudo-19 pseudo-20 pseudo-p3`
`pseudo-21 pseudo-22 pseudo-23`
`pseudo-24 pseudo-25 pseudo-26 pseudo-27`
`igcse-sql1 igcse-sql2 igcse-logic1`

> 새 레슨 추가 시: Python은 53부터, C++은 cpp-23부터, Pseudocode는 pseudo-29부터 사용
> (cpp-21 = 2차원 배열, cpp-22 = 클래스 — 이미 사용 중. 커리큘럼 순서는 ID 순서와 다를 수 있음: cpp-9 → cpp-21 → cpp-10 순으로 표시)
