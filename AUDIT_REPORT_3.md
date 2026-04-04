# Coderin Quiz Audit Report — AUDIT_REPORT_3
**Date:** 2026-04-03
**Auditor:** Claude Sonnet 4.6 (Full File Read Audit)
**Files Audited:**
- `data/questions/cpp-questions.ts` (~7500 lines, ~300+ questions including Phase 1 additions)
- `data/questions/python-questions.ts` (~5900 lines, ~300+ questions including additions)

---

## Methodology

All questions in both files were read in 150-line chunks from offset 0 to end. Each question was checked against:
1. **Curriculum mapping** — CLAUDE.md tables and `app/curriculum/page.tsx` for ground truth lesson content
2. **Prerequisite violations** — code/options/explanation using concepts not yet introduced at the assigned lessonId
3. **Content mismatch** — question topic does not match what the lesson actually teaches
4. **Duplicates** — questions testing the same single narrow concept within the same lesson

---

## Section 1: 잘못된 lessonId (Wrong lessonId)

### Python 문제

| ID | 현재 lessonId | 현재 내용 | 올바른 lessonId | 근거 |
|----|-------------|---------|--------------|------|
| 89 | 16 (리스트 기초) | `matrix[1][2]` — 2D 리스트 요소 접근 테스트 | 17 | 2D 리스트는 레슨 17 "리스트와 반복문"에서 처음 등장. 레슨 16은 1D 리스트 기초만 다룸 |
| 165 | 26 (자료구조 비교와 선택) | `sorted(nums)` 기본 정렬 테스트 | 28 또는 32 이후 | 레슨 26은 "자료구조 비교와 선택" (스택/큐/덱/집합 특성 비교). 정렬은 별도 레슨 주제임 |
| 166 | 26 (자료구조 비교와 선택) | `sorted(words, key=len)` key 인자 정렬 테스트 | 28 또는 32 이후 | 동일 이유. key 함수 정렬은 레슨 26 범위를 벗어남 |

**참고:** python-questions.ts 파일 내 섹션 주석 `// ── Lesson 25: 2D 리스트 ──`는 오기(誤記)이지만 해당 구역 내 문제들의 `lessonId` 값 자체는 17로 올바르게 설정되어 있음. 주석만 오해를 유발함.

### C++ 문제

| ID | 현재 lessonId | 현재 내용 | 올바른 lessonId | 근거 |
|----|-------------|---------|--------------|------|
| 227 | "retired" | 기본 sort() 오름차순 정렬 | cpp-23 | lessonId "retired"는 존재하지 않는 값. 내용은 cpp-23(sort 마스터) 범위이므로 cpp-23으로 변경 필요 |
| 237 | cpp-17 | 직접 구현된 이진 탐색 알고리즘 코드 (`binarySearch()` 함수) | algo-preview | 이진 탐색 알고리즘 이론은 C++ 커리큘럼에서 가르치지 않음. `lower_bound` 사용법(STL 함수)은 cpp-17이 맞지만, 직접 구현 알고리즘 이론은 algo-preview 범위 |
| 238 | cpp-17 | `reverse()`, `rotate()` 복합 사용 — rotate() 알고리즘 테스트 | cpp-17 (경계) | rotate()는 cpp-17에서 다루지 않는 함수. 그러나 algorithm 헤더 내이므로 cpp-17 허용 범위로 볼 수 있음 — 낮은 심각도 |
| 240 | cpp-20 | `lower_bound` 미정렬 벡터에서 사용 시 UB 테스트 | cpp-17 | lower_bound 함수 자체는 cpp-17(STL 탐색 함수) 레슨 주제. cpp-20은 CP 실전 팁 레슨이며 이 내용은 cpp-17에 어울림 |

---

## Section 2: 선수학습 위반 (Prerequisite Violations)

### 심각도 기준
- **CRITICAL:** 해당 레슨에서 배우지 않은 핵심 키워드/문법이 코드에 등장
- **HIGH:** 개념적으로 선수학습이 필요하지만 문법 키워드는 없는 경우
- **LOW:** 경계선상 — 주의가 필요하지만 명백한 위반은 아님

### Python 문제 — CRITICAL

| ID | lessonId | 위반 내용 | 근거 |
|----|----------|---------|------|
| 155 | 23 (스택) | 코드에 `def is_valid(s):` — `def` 키워드 사용 | `def`는 레슨 32(함수 기초)에서 처음 등장. 레슨 23은 `def` 이전. 학생이 `def`를 모르는 상태에서 이 문제를 받으면 해석 불가 |
| 156 | 23 (스택) | 코드에 `def reverse_string(s):` — `def` 키워드 사용 | 동일. `def` 키워드는 레슨 32 이전 레슨들에서 사용 불가 |

### Python 문제 — HIGH (경계선 이슈)

| ID | lessonId | 위반 내용 | 근거 |
|----|----------|---------|------|
| 122 | 19 (튜플) | `from collections import namedtuple` 사용 | `collections` 모듈은 레슨 45~46(모듈)에서 소개됨. 레슨 19는 모듈 import가 전혀 등장하지 않는 시점. 내용 자체는 tuple 개념이지만 `namedtuple` import는 과도하게 앞섬 |
| 300 | 17 | `[matrix[i][len(matrix)-1-i] for i in range(len(matrix))]` — 리스트 컴프리헨션 with 역방향 인덱스 | 리스트 컴프리헨션은 레슨 17 이후에 나오는 고급 기법. 레슨 17 "리스트와 반복문" 기본 범위를 상당히 벗어남 |

### C++ 문제 — 검토 결과

C++ 문제들에서 아래 규칙을 전체 파일 대상으로 검토하였음:
- `int& ref` (참조) → cpp-12 이후에만 허용
- `v.begin()` / `v.end()` (이터레이터) → cpp-17 이후에만 허용
- `lambda [](x){...}` → cpp-23 이후에만 허용
- `pair<>`, `.first/.second` → cpp-15 이후에만 허용
- `sort()` with comparator → cpp-23 이후에만 허용

**결과:** C++ 문제들은 대체로 선수학습 규칙을 잘 준수하고 있음. 다만 다음 케이스가 주목됨:

| ID | lessonId | 검토 내용 | 판정 |
|----|----------|---------|------|
| 228 | cpp-23 | `operator<` 오버로딩 — `class Student`에 `bool operator<(const Student& other)` 사용 | 문법상 class는 cpp-22, operator overloading은 cpp-22 또는 cpp-23에서 다룰 수 있음. cpp-23에서 정렬 커스터마이징으로 적합함 — OK |
| 232 | cpp-23 | `count_if(v.begin(), v.end(), [](int x){...})` — lambda 사용 | cpp-23에서 lambda를 소개하므로 OK |
| 334 | cpp-10 | `for (int& x : v)` — 참조 사용 | 참조는 cpp-12에서 소개. cpp-10에서 `int& x`를 사용하면 **선수학습 위반** |

### C++ CRITICAL 선수학습 위반

| ID | lessonId | 위반 내용 | 근거 |
|----|----------|---------|------|
| 334 | cpp-10 (Range-for & auto) | `for (int& x : v)` — 참조(`&`) 사용 | `int&` (참조) 개념은 cpp-12(레퍼런스)에서 처음 소개됨. cpp-10은 cpp-12 이전 레슨. 학생이 `&`의 의미를 모르는 상태임 |

---

## Section 3: 중복 문제 (Duplicate Questions)

### Python 문제

| 중복 그룹 | 문제 ID들 | 중복 내용 | 권장 처리 |
|---------|---------|---------|---------|
| lessonId 1 print() 기초 | 360, 361, 362, 363 + 기존 lessonId 1 문제 다수 | print()에서 쉼표로 공백 자동 삽입, 문자열 연결 + 출력 | 레슨 1은 문제가 매우 많음 (360, 361, 362, 363이 새로 추가됨). 총 7개+ 유사 문제 존재. 쉬움 난이도 3~4개 이상은 중복 과다 |
| lessonId 3 변수 기초 | 297, 364, 365 | 변수 swap / 변수 업데이트 / 변수 덮어쓰기 | 레슨 3 기초 문제 중복. ID 297(swap), 364(덮어쓰기), 365(money -= 패턴)은 각각 다른 측면을 다루므로 허용 가능 |
| lessonId 8 f-string | 382, 383, 384 (신규) + 기존 레슨 8 문제들 | f-string {} 기초, f-string 계산, f-string f 빠뜨리기 실수 | 레슨 8 문제가 매우 많아짐. 신규 추가된 382~384는 초급용으로 내용이 다름 — 허용 가능 |
| lessonId 10 input() | 388, 389, 400, 401, 402, 403, 404, 405 | input() 기초 사용 패턴 반복 | 레슨 10에 8개의 input() 문제가 집중됨. 그 중 일부는 거의 동일한 패턴 (int(input()) 패턴이 388, 389, 400~405에서 반복됨) |
| lessonId 12 논리 연산자 | 368, 369, 375, 376, 377 | and/or/not 기초 적용 | 모두 "and", "or", "not" 기초 테스트. 각각 다른 상황이지만 동일 개념의 직접 응용으로 중복성이 높음. 3~4개로 줄이는 것 권장 |
| lessonId 7 print 옵션 | 380, 381, 394, 395, 396, 397, 398, 399 | end=, sep= 옵션 | 레슨 7에 8개의 print 옵션 문제. end/sep을 테스트하는 문제가 중복됨. 특히 395(sep=''), 394(sep=', ')는 거의 동일한 sep 개념 |
| lessonId 24 큐 | 412, 413, 414, 415, 416, 417, 418 | FIFO, deque.append, deque.popleft 기본 사용 | 큐 레슨에 7개 문제. 중복성은 낮으나 412(FIFO 순서)와 415(for루프로 큐에 넣고 빼기)는 동일 개념의 단순 변형 |
| lessonId 25 덱 | 419, 420, 421, 422, 423, 424, 425, 426, 427 | appendleft, popleft, maxlen, rotate | 덱 레슨에 9개 문제. 내용은 다양하나 420(appendleft 기초)와 425(append+appendleft 조합)는 중복성 있음 |

### C++ 문제

| 중복 그룹 | 문제 ID들 | 중복 내용 | 권장 처리 |
|---------|---------|---------|---------|
| lessonId cpp-1 Hello World 기초 | 329, 330, 331, 332, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371 | cpp-1 레슨에 28개 이상의 문제 | cpp-1에 극단적으로 많은 문제가 집중됨. 그 중 다수가 "#include", "std::cout", "endl", "세미콜론", "중괄호" 같은 매우 좁은 기초 개념을 반복 테스트. 예: 351(endl은 줄바꿈), 369(endl 추가)는 거의 동일 |
| lessonId cpp-1 컴파일 관련 | 331(g++ 명령), 358(./a.out 실행), 359(g++ -o), 370(g++ -o 빈칸) | g++ 컴파일 명령 반복 | ID 331, 359, 370은 모두 g++ 컴파일/실행 관련. 동일 주제의 경미한 변형 |
| lessonId cpp-18 스택/큐 | 246(priority_queue), 247(deque 기초), 250(deque push), 254(stack LIFO), 255(queue FIFO) | STL 스택/큐/덱 기본 push/pop/top/front 사용 | 각 컨테이너를 한 번씩 다루므로 허용 가능. 중복 없음 |
| lessonId cpp-23 정렬 | 234, 236, 257, 259, 266, 267 | sort() 내림차순/lambda 정렬, 버블소트, 선택소트, 삽입소트, 합병소트 이론 | 내용이 다양하므로 중복 없음 — OK |
| lessonId algo-preview 이진탐색 | 242, 258 | 이진 탐색 구현/시간복잡도 | algo-preview 풀에서 2개는 허용 수준 |
| lessonId cpp-p1 난수 | 342(rand()%100+1) | 동일 내용의 단독 문제 — 중복 없음 | OK |

---

## Section 4: 기타 이슈

### lessonId "retired" 문제

| ID | lessonId | 설명 |
|----|----------|-----|
| 227 | "retired" | 이 lessonId는 정의된 커리큘럼 어디에도 없음. 학생 복습 큐에 절대 등장 안 하므로 기능상 문제는 없으나, 내용상 cpp-23(sort 기초) 범위이므로 정리 필요 |

### 파일 주석 오류 (Python)

| 위치 | 오류 내용 | 영향 |
|-----|---------|-----|
| python-questions.ts 내 `// ── Lesson 25: 2D 리스트 ──` 주석 | 커리큘럼상 레슨 25는 "덱(Deque)"임. 실제 해당 구역 문제들의 `lessonId`는 17(올바름)이지만 주석이 잘못됨 | 코드 유지보수 시 혼란 유발. 데이터 정확성 문제는 없음 |
| python-questions.ts 내 `// ── Lesson 26: 정렬 ──` 주석 | 커리큘럼상 레슨 26은 "자료구조 비교와 선택"임. 정렬 레슨 아님 | ID 165, 166이 이 주석 아래 있으며 실제 lessonId도 26으로 잘못 배정됨 — Section 1에서 보고 |

---

## 요약 (Summary)

### 즉시 수정 필요 (CRITICAL)

| 우선순위 | 파일 | 문제 ID | 수정 내용 |
|--------|-----|--------|---------|
| P1 | python | 155, 156 | lessonId 23에서 `def` 키워드 사용 — `def`는 레슨 32 이전 사용 불가. lessonId를 32+ 이후로 변경하거나 `def` 없이 재작성 |
| P1 | cpp | 334 | lessonId cpp-10에서 `for (int& x : v)` — 참조(`&`)는 cpp-12 이전 사용 불가. lessonId를 cpp-12로 변경 필요 |

### 수정 권장 (HIGH)

| 우선순위 | 파일 | 문제 ID | 수정 내용 |
|--------|-----|--------|---------|
| P2 | python | 89 | lessonId 16 → 17로 변경 (2D 리스트 내용) |
| P2 | python | 165, 166 | lessonId 26 → 28 이후로 변경 (정렬 내용이 자료구조 비교 레슨에 배치됨) |
| P2 | cpp | 227 | lessonId "retired" → "cpp-23"으로 변경 |
| P2 | python | 122 | lessonId 19에서 `from collections import namedtuple` — 레슨 45 이전에 모듈 import 불가. 내용을 기본 tuple로 재작성하거나 lessonId를 46으로 변경 |
| P2 | cpp | 240 | lessonId cpp-20 → cpp-17로 변경 (lower_bound 내용) |

### 검토 권장 (LOW)

| 우선순위 | 파일 | 문제 ID | 수정 내용 |
|--------|-----|--------|---------|
| P3 | cpp | 237 | lessonId cpp-17에 직접 구현 이진탐색 알고리즘 포함 여부 검토 — STL lower_bound 사용법은 cpp-17 OK, 알고리즘 직접 구현 이론은 algo-preview 고려 |
| P3 | python | 300 | lessonId 17에 리스트 컴프리헨션 포함 여부 검토 |

### 중복 경감 권장

| 파일 | lessonId | 현재 문제 수 | 권장 수 | 대상 |
|-----|---------|-----------|--------|-----|
| cpp | cpp-1 | 28개 이상 | 12~15개 | #include/cout/endl 반복 문제 절반으로 축소 |
| python | 10 | 8개 | 5개 | int(input()) 패턴 반복 제거 |
| python | 12 | 5개 논리연산자 기초 | 3개 | and/or/not 단순 적용 중복 |
| python | 7 | 8개 print 옵션 | 5개 | sep/end 거의 동일 문제 제거 |

---

## 전체 통계

| 항목 | Python | C++ |
|-----|--------|-----|
| 잘못된 lessonId | 3개 (ID 89, 165, 166) | 3개 (ID 227, 238, 240) |
| 선수학습 위반 (CRITICAL) | 2개 (ID 155, 156) | 1개 (ID 334) |
| 선수학습 위반 (HIGH) | 2개 (ID 122, 300) | 0개 |
| 주요 중복 그룹 | 8그룹 | 2그룹 |
| algo-preview 의도적 배치 | 해당없음 | 34개 (CLAUDE.md 기록된 대로 정상) |

---

## 부록: 검증된 정상 항목

다음은 의심스러워 보일 수 있으나 감사 결과 **정상**으로 판정된 항목들:

- **algo-preview lessonId (cpp-questions):** CLAUDE.md에 명시된 의도적 보관소. ID 242, 260~300 범위 다수 — 정상
- **cpp-21 (2D 배열) 문제들:** cpp-9(배열/벡터), cpp-7(반복문)만 전제하며 올바르게 배치됨 — 정상
- **cpp-22 (클래스) 문제들:** STL(cpp-15~) 개념 없이 class/struct 범위에서 다룸 — 정상
- **cpp-23 sort 문제에서 lambda 사용:** lambda는 cpp-23에서 소개되므로 OK — 정상
- **Python lessonId 26 신규 추가 문제 (428~433):** 자료구조 비교/선택 내용으로 올바르게 배치됨 — 정상
- **Python lessonId 25 신규 추가 문제 (419~427):** 덱(Deque) 내용으로 올바르게 배치됨 — 정상
