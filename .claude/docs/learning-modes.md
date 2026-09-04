# 3개 학습 모드 (learn / review / quiz)

> **언제 여나:** 화면을 만들거나 데이터가 어디 있는지 찾을 때
> 원래 `CLAUDE.md` 안에 있던 내용을 2026-09-04 에 옮겼다. 내용은 그대로다.

---

## 3개 학습 모드 — 역할 구분

| 경로 | 역할 | 데이터 소스 |
|---|---|---|
| `/learn/[lessonId]` | 수업: 설명 → 예제 → 직접 해보기 | `data/lesson*.ts` (chapters 구조) |
| `/review/[lessonId]` | 복습: 배운 내용을 다양한 문제로 확인 | `app/review/[lessonId]/data/lessons/lesson*.ts` (flat steps 구조) |
| `/quiz` | 말해보카 방식: 랜덤 MCQ, 스마트 세션, 간격 반복 | Supabase `questions` 테이블 (`/api/questions`) |

### /review 시스템 아키텍처

**데이터 위치:** `app/review/[lessonId]/data/lessons/lesson*.ts`
**타입 정의:** `app/review/[lessonId]/data/types.ts`
**렌더러:** `app/review/[lessonId]/client-page.tsx`

**복습 스텝 타입:**
- `quiz` — 객관식 (QuizContent: question, options, answer, explanation)
- `practice` — 빈칸 채우기 / 코드 직접 쓰기 (PracticeContent: template, answer, expect)
- `interleaving` — 이전 레슨 개념 복습용 빈칸 채우기 (InterleavingContent)
- `explain` with `predict` — 코드 결과 예측 퀴즈 (ExplainContent.predict)
- `errorQuiz` — 틀린 코드 찾기 (ErrorQuizContent)
- `summary` — 챕터 요약 카드 (건너뜀)
- `chapter`, `reward`, `done` — UI 구조용 (건너뜀)

**✅ 현재 상태 (2026-06-21 갱신 — 동작 완료):**
- `client-page.tsx`는 복습 데이터(`./data/lessons`의 `lessonsData`)에 올바르게 연결됨
- `ReviewStepRenderer` 컴포넌트 작성 완료, 복습 스텝 렌더링 중
- **Python 코드 채점은 진짜 파이썬(Pyodide)** 사용 — `app/review/[lessonId]/utils/pyodideRun.ts` 의 `runPythonReal`. 과거 가짜 정규식 러너가 `if/for` 를 못 돌려 맞는 조건문 코드를 오답 처리하던 버그 수정함. C++ 채점은 Piston.
- 코드 에디터 신택스 하이라이트: `app/review/[lessonId]/utils/highlightPy.ts`(Python) + `highlightCppCode`(C++)
- DB 연동(`saveStepAnswer`, `markQuizComplete`)은 그대로 유지

**복습 레슨 파일 작성 규칙:**
- Claude.md의 Python 레슨 번호 매핑 참고해서 진도에 맞는 개념만 사용
- `template: null`이면 코드 전체를 직접 써야 하는 문제
- `interleaving`은 이전 레슨 개념 복습 (현재 레슨 개념 아님)

---
