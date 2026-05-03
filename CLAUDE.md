# CLAUDE.md — 코드린 프로젝트 컨텍스트

## 프로젝트 개요
코드린(Coderin): 중학생/고등학생을 위한 코딩 학습 대시보드. Python, C++, Pseudocode(IGCSE) 커리큘럼 제공.

## 기술 스택
- Next.js 16 (App Router, Turbopack)
- TypeScript, Tailwind CSS
- Supabase (인증, DB)
- `output: export` (정적 빌드) — 동적 라우트 불가, query params 사용

## 🔮 향후 구조 변경 — 메모리 참고

**"Supabase로 콘텐츠 이전 / 어드민 페이지 만들기" 이야기가 나오면** 먼저 메모리 문서 확인:
`~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/project_supabase_migration.md`

요약: 현재 레슨 콘텐츠는 TS 파일에 저장 → 클라이언트 번들로 노출됨 → 콘텐츠 유출 위험.
**결정(2026-04-21): 지금은 편집 우선, 수정 빈도 월 1회 이하로 줄어들면 Supabase로 이전 + 어드민 페이지 구축.**
편집 중에도 JSON 직렬화 가능 구조, 필드 이름 일관성, 문자열 ID, en 블록 방식 유지해서 나중에 마이그레이션 쉽게.

## 📐 레슨 품질 기준 — 새 레슨 / 수정 전 필독

**레슨 작성·보강 작업 전 반드시** 메모리 문서 확인:
`~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/lesson_quality_standard.md`

핵심 원칙:
- **한 레슨 = 한 주제 = 한 주제만** (다음 레슨 개념 미리 노출 ❌)
- **능동 스텝 비율 50%+** (tryit/practice/mission/quiz/predict)
- **interactive 직후 tryit 필수** — 시각화는 보조, 연습 대체 ❌
- **난이도 사다리**: 따라치기 → 빈칸 → 처음부터 (특히 함수/클래스 같은 추상 개념)
- **첫 언어 학생용 Python**: 능동 비율 55%+, 매 챕터마다 mission 1개 이상
- **일상 동사 우선**, 공식 용어는 부록 박스

**Python 레슨 감사 v3 우선순위 — 완료 (2026-04-29).** Lesson 41 (52→55%), 23-26 (50%+), 11 (44→50%), 3 (drift 정리), 39 (mission 추가), 28-30 (의도 확인) 모두 처리. 다음 audit 은 분기 후 새로 측정.

---

## ⚠️ 레슨 파일 수정 규칙 — 반드시 준수

**레슨 콘텐츠 파일은 선생님이 직접 작성/디버깅한 내용이 들어있다. Write(전체 덮어쓰기)를 사용하면 해당 내용이 영구 손실된다.**

### 절대 규칙
- `data/cpp/lesson*.ts`, `data/cpp/lessonP*.ts` — **Edit만 사용, Write 금지**
- `data/lesson*.ts`, `data/lesson*-en.ts` — **Edit만 사용, Write 금지**
- `data/cpp/lesson*-en.ts` — **Edit만 사용, Write 금지**
- 예외: 새 파일 생성(기존 파일 없음)은 Write 가능

### ✅ 선생님 검토 완료된 복습 파일 (수정 시 더욱 조심)

아래 파일들은 선생님이 복습 흐름/난이도/한영 동기화를 직접 검토 완료했어요.
구조(스텝 순서, interleaving 위치, context/starterCode 구성 등)를 건드리는 건 절대 조심.
사소한 수정도 파일 상단 주석(`✅ 선생님 검토 완료`)을 먼저 확인하고 진행.

- `app/review/[lessonId]/data/lessons/lessonCpp14.ts` — cpp-14 struct 복습 (검토일: 2026-04-21)

### 왜 중요한가
- 과거에 lesson15.ts에서 sort 챕터를 lesson23으로 이동할 때 Write로 통째로 덮어써서 pair 비교/애니메이션 스텝 등 선생님이 작성한 콘텐츠가 손실됨
- 선생님이 A 작업을 요청했는데 Claude가 "관련된 B 파일도 정리하자"고 판단해서 Write를 쓰면 B에서 손실 발생
- **요청하지 않은 파일은 건드리지 않는다**

---

## ⚠️ 복습 레슨 파일 작성 규칙 — practice/interleaving answer 필드

`app/review/[lessonId]/data/lessons/` 파일에서 practice/interleaving 스텝 작성 시 **반드시** 다음 규칙을 지켜야 한다.

### isAnswerCorrect() 동작 방식
```
// 학생이 빈칸에 입력한 텍스트 vs content.answer 비교
normalize(content.answer) === normalize(student_input)
// blanksAnswer는 length > 1 일 때만 join하여 비교 (단일 항목은 사용 안 됨!)
```

### ✅ 올바른 패턴

**단일 빈칸 (template에 ___ 1개):**
```typescript
template: "for (int i = 1; i <= 10; i++) {\n    sum ___ i;\n}",
answer: "+=",           // ← 빈칸에 들어갈 텍스트만!
expect: "55",           // ← 정답 후 보여줄 출력/코드 (비교에 사용 안 됨)
```

**복수 빈칸 (template에 ___ 2개 이상):**
```typescript
template: "for (int i = ___; i <= ___; i++)",
blanksAnswer: ["1", "5"],                    // ← 각 빈칸 값
answer: "for (int i = 1; i <= 5; i++)",     // ← 전체 코드 (blanksAnswer join으로 비교됨)
expect: "1\n2\n3\n4\n5",
```

**전체 코드 작성 (template: null):**
```typescript
template: null,
answer: "int n, sum = 0;\ncin >> n;\nfor...",  // ← 전체 코드 (직접 비교)
alternateAnswers: ["int n;\ncin>>n;..."],
expect: "15",
```

### ❌ 절대 하면 안 되는 패턴 (54개 버그의 원인)
```typescript
// 단일 빈칸인데 answer가 전체 코드 → 학생이 올바른 답 입력해도 오답 처리됨!
template: "sum ___ i;",
blanksAnswer: ["+="],    // 단일 항목 → 비교에 사용 안 됨
answer: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum += i;\n}\ncout << sum << endl;",  // ← 버그!
```

### 검증 명령어
```bash
npm run check-review   # 버그 있으면 즉시 감지
```

복습 레슨 파일 수정/추가 후 반드시 실행할 것.

---

## ⚠️ Supabase DB 알려진 문제 & 해결법

### lesson_progress variant null vs "" 충돌
- `lesson_progress` 테이블 UNIQUE 제약: `(user_id, lesson_id, variant, progress_type)`
- 구버전 코드는 `variant = null`, 신버전은 `variant = ""` 로 저장
- **null ≠ ""** 이라 같은 레슨이 두 행으로 중복되어 upsert 충돌 발생
- 증상: 학생이 완료했는데 선생님 화면에 안 보임 / 학생 커리큘럼에 완료 안 뜸

**발생 시 해결 SQL (Supabase SQL Editor에서 순서대로 실행):**
```sql
-- 1단계: "" 행에 null 행의 좋은 데이터 반영 (completed=true 보존)
UPDATE lesson_progress lp_empty
SET
  completed = GREATEST(lp_empty.completed, lp_null.completed),
  updated_at = GREATEST(lp_empty.updated_at, lp_null.updated_at)
FROM lesson_progress lp_null
WHERE lp_null.variant IS NULL
  AND lp_empty.variant = ''
  AND lp_null.user_id = lp_empty.user_id
  AND lp_null.lesson_id = lp_empty.lesson_id
  AND lp_null.progress_type = lp_empty.progress_type;

-- 2단계: null 행 삭제
DELETE FROM lesson_progress WHERE variant IS NULL;
```

**예방:** 코드에서 lesson_progress upsert 시 항상 `variant: ""` 명시. null이 들어가지 않도록 주의.

---

## 3개 학습 모드 — 역할 구분

| 경로 | 역할 | 데이터 소스 |
|---|---|---|
| `/learn/[lessonId]` | 수업: 설명 → 예제 → 직접 해보기 | `data/lesson*.ts` (chapters 구조) |
| `/review/[lessonId]` | 복습: 배운 내용을 다양한 문제로 확인 | `app/review/[lessonId]/data/lessons/lesson*.ts` (flat steps 구조) |
| `/quiz` | 말해보카 방식: 랜덤 MCQ, 스마트 세션, 간격 반복 | `data/questions/python-questions.ts`, `cpp-questions.ts` |

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

**⚠️ 현재 상태 (2026-04-07):**
- `client-page.tsx`가 실수로 `/learn` 데이터를 바라보고 있음 → 복습 데이터(`./data/lessons`)를 다시 연결해야 함
- `ReviewStepRenderer` 컴포넌트 신규 작성 필요 (learn의 StepRenderer와 타입 시스템이 다름)
- DB 연동(`saveStepAnswer`, `markQuizComplete`)은 그대로 유지

**복습 레슨 파일 작성 규칙:**
- Claude.md의 Python 레슨 번호 매핑 참고해서 진도에 맞는 개념만 사용
- `template: null`이면 코드 전체를 직접 써야 하는 문제
- `interleaving`은 이전 레슨 개념 복습 (현재 레슨 개념 아님)

---

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
- Python: 52 레슨 + 4 프로젝트 = 56 항목 (Part 1-9). 레슨 ID는 숫자 1~52, 프로젝트 ID는 p1~p4
- C++: 23 레슨 + 프로젝트 3개 (Part 1-3)
- Pseudocode/IGCSE: 별도 트랙
- 순차 잠금 해제 (완료한 레슨 + 다음 1개)

### ⚠️ Python 레슨 번호 매핑 (퀴즈 문제 작업 시 반드시 확인)

> `python-questions.ts` 파일 내 섹션 주석과 실제 커리큘럼 ID가 다를 수 있음. **항상 `app/curriculum/page.tsx`의 `pythonCurriculumData`를 정답으로 사용할 것.**

| lessonId | 레슨 제목 | 비고 |
|---|---|---|
| 1 | print() 출력 | |
| 2 | 데이터 타입 | int, float, bool, str — 리스트/딕셔너리 없음 |
| 3 | 변수 | |
| 4 | 연산자 | |
| 5 | 문자열 연산 | |
| 6 | 문자열 메서드 | |
| 7 | print() 옵션 (sep/end) | |
| 8 | f-string | f-string 첫 등장 |
| 9 | 타입 변환 | |
| 10 | input() | |
| 11 | 조건문 (if/elif/else) | def 없음, 리스트 없음 |
| 12 | 조건문 심화 (and/or/not) | |
| 13 | 반복문 (for) | range() 사용. 리스트 리터럴 `[]` 없음 |
| 14 | 반복문 (while) | |
| 15 | 자료구조 개요 | 4가지 자료구조 소개 |
| 16 | 리스트 기초 | 리스트 첫 등장. `[]`, append, pop 등 |
| 17 | 리스트와 반복문 | for문으로 리스트 순회. 2D 리스트도 여기 포함 |
| 18 | split()과 join() | |
| 19 | 튜플 | |
| 20 | 딕셔너리 | |
| 21 | 집합 (set) | |
| 22 | 슬라이싱 | |
| 23 | 스택 (Stack) | LIFO |
| 24 | 큐 (Queue) | FIFO. deque를 큐로 사용하는 것 포함 |
| **25** | **덱 (Deque)** | **양쪽 삽입/삭제. deque 고유 연산 (rotate 등)** |
| **26** | **자료구조 비교와 선택** | **상황에 맞는 자료구조 고르기. 성능 비교** |
| 27-31 | Part 4 프로젝트/문제 | 가위바위보, 로또, 단어장, 성적관리, 종합 |
| 32 | 함수 기초 (def/return) | **def 첫 등장** |
| 33 | 매개변수와 반환값 | |
| 34 | 함수 활용 (lambda/스코프) | **lambda 첫 등장** |
| 35 | 내장함수 총정리 | len, sum, max, min, sorted, map |
| 36 | 함수 문제 30 | |
| 37 | 에러 처리 (try-except) | |
| 38 | 파일 읽고 쓰기 | |
| 39-40 | Part 6 프로젝트/문제 | |
| 41 | 클래스 기초 | |
| 42 | 메서드와 속성 | |
| 43-44 | Part 7 프로젝트/문제 | |
| 45 | 모듈 기초 | |
| 46 | 패키지와 pip | |
| 47-48 | Part 8 프로젝트/문제 | |
| 49-52 | Part 9 텍스트 RPG | |

**⚠️ 자주 혼동되는 것:**
- lesson 25 = **덱(Deque)** (NOT 2D 리스트)
- lesson 26 = **자료구조 비교** (NOT 정렬)
- 2D 리스트 전용 레슨은 없음 → `lessonId: 17` (리스트와 반복문)에 배정
- def/함수는 lesson 32부터, lambda는 lesson 34부터

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
