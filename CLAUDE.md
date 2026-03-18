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
