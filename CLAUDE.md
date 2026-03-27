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
- C++: 20 레슨 (Part 1-3, USACO 준비)
- Pseudocode/IGCSE: 별도 트랙
- 순차 잠금 해제 (완료한 레슨 + 다음 1개)

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
