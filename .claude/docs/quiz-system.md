# 퀴즈 시스템 + 레슨 ID 매핑

> **언제 여나:** 퀴즈 문제를 만지거나, Python/C++ 레슨 번호를 확인할 때
> 원래 `CLAUDE.md` 안에 있던 내용을 2026-09-04 에 옮겼다. 내용은 그대로다.

---

## 퀴즈 시스템 아키텍처

### 문제 파일
⚠️ **2026-04-05 (`8c794fbf`) 에 TS 파일은 삭제되고 Supabase 로 이전됐다.**
지금 문제는 Supabase `questions` 테이블 (`GET /api/questions`) 에서 온다.
`app/api/questions/route.ts` 는 `correctAnswer` 를 빼고 내려주고,
정답 비교는 `app/api/check-answer/route.ts` 가 서버에서만 한다.
→ 셸에서 문제 내용을 훑어보려면 로그인 세션이 필요하다. 없으면 '확인 불가' 라고 정직하게 적어라.

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
