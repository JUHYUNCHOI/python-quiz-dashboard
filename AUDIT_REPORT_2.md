# 2차 퀴즈 문제 감사 보고서 (AUDIT_REPORT_2.md)

작성일: 2026-04-03
감사 범위: `data/questions/cpp-questions.ts` (300+문제) + `data/questions/python-questions.ts` (400+문제)
감사 항목: (1) 잘못된 lessonId, (2) 선수학습 위반, (3) 유사 중복 문제

---

## C++ 문제 감사 결과

### 확정 이슈

| ID | 현재 lessonId | 문제 유형 | 상세 설명 | 권장 조치 |
|---|---|---|---|---|
| 38 | cpp-6 | 잘못된 lessonId | 코드: `cout << 17 % 5;`. if/else가 없고 `%` 연산자만 테스트. cpp-6은 조건문 레슨이고 `%`는 cpp-5(연산자) 내용 | `lessonId: "cpp-5"` 로 변경 |
| 42 | cpp-6 | 잘못된 lessonId | 코드: `(a > b ? a : b)` 삼항 연산자 테스트. 삼항 연산자는 cpp-5(연산자) 내용 | `lessonId: "cpp-5"` 로 변경 |
| 63 | cpp-8 | 잘못된 lessonId | `continue`+`break`를 for 루프에서 테스트. 함수 관련 내용이 전혀 없음. break/continue는 cpp-7(반복문) 내용 | `lessonId: "cpp-7"` 로 변경 |
| 100 | cpp-10 | 선수학습 위반 | 코드: `for (int& x : v) x = x * 2;` — `int&` 참조 타입 사용. 참조(reference)는 cpp-12에서 가르치며, 커리큘럼 순서상 cpp-10 이후임 | 코드를 `for (auto x : v)` 형태로 재작성하거나 `lessonId: "cpp-12"` 로 변경 |
| 214 | cpp-23 | 유사 중복 | `sort(v.begin(), v.end())` 후 `v[0]`, `v[4]` 확인 — 기본 오름차순 sort 테스트 | ID 227과 내용 완전 중복. 둘 중 하나 삭제 권장 |
| 227 | cpp-23 | 유사 중복 | `sort(v.begin(), v.end())` 후 `v[0]`, `v[4]` 확인 — ID 214와 코드 구조와 테스트 내용이 거의 동일 | ID 214와 내용 완전 중복. 둘 중 하나 삭제 권장 |
| 232 | cpp-17 | 선수학습 위반 | `count_if`에서 lambda `[](int x) { return x % 2 == 0; }` 사용. 람다는 cpp-23에서 가르치고, 커리큘럼 순서상 cpp-17이 먼저임 (cpp-17→cpp-18→cpp-19→cpp-20→cpp-p3→cpp-15→cpp-23) | `lessonId: "cpp-23"` 으로 변경 |
| 234 | cpp-17 | 선수학습 위반 | `sort(v.begin(), v.end(), greater<int>())` 사용. comparator가 있는 sort는 cpp-23 내용, cpp-17 이후에 가르침 | `lessonId: "cpp-23"` 으로 변경 |
| 244 | cpp-17 | 선수학습 위반 | `partition(v.begin(), v.end(), [](int x) { return x % 2 == 0; })` — lambda 사용. lambda는 cpp-23 내용 | `lessonId: "cpp-23"` 으로 변경하거나 lambda 없는 함수 포인터 버전으로 재작성 |
| 258 | cpp-17 | 잘못된 lessonId | 이진 탐색 시간 복잡도 O(log N) 문제. 이진 탐색은 STL 탐색 함수(cpp-17) 주제가 아니라 알고리즘 이론 주제. cpp-17은 `find`, `count_if`, `accumulate`, 반복자를 가르침 | `lessonId: "algo-preview"` 로 변경 |

---

### 참고: 커리큘럼 순서 (ID ≠ 순서)
```
cpp-1 → cpp-2 → cpp-3 → cpp-4 → cpp-5 → cpp-6 → cpp-7 → cpp-8 → cpp-p1
→ cpp-9 → cpp-21 → cpp-10 → cpp-11 → cpp-12 → cpp-13 → cpp-14 → cpp-22 → cpp-p2
→ cpp-15 → cpp-23 → cpp-16 → cpp-17 → cpp-18 → cpp-19 → cpp-20 → cpp-p3
```
람다(lambda)는 cpp-23(커스텀 정렬) 레슨에서 처음 등장 → cpp-17(STL 탐색)에서 람다를 사용하면 선수학습 위반

---

## Python 문제 감사 결과

### 확정 이슈

| ID | 현재 lessonId | 문제 유형 | 상세 설명 | 권장 조치 |
|---|---|---|---|---|
| 67 | 13 | 선수학습 위반 | `["a", "b", "c"]` 리스트 리터럴 사용 + `enumerate()`. 리스트는 lesson 16(리스트 기초)부터 도입. lesson 13은 for문(range()만 사용) | 코드를 `for i, c in enumerate("abc"):` 형태로 재작성하거나 `lessonId: 17` 로 변경 |
| 68 | 13 | 선수학습 위반 | `names = ["철수", "영희"]`, `scores = [90, 85]` 리스트 리터럴 + `zip()` 사용. 리스트는 lesson 16이 선수학습 | `lessonId: 17` 또는 `18` 로 변경 |
| 73 | 13 | 선수학습 위반 | `result = []` + `result.append((i, j))` — 리스트 생성 및 append 메서드 사용. 리스트는 lesson 16이 선수학습 | `lessonId: 17` 로 변경 |
| 78 | 13 | 선수학습 위반 | `nums = [1, 2, 3, 4, 5]` 리스트 리터럴 사용 in for 루프 문제. 리스트는 lesson 16이 선수학습 | `lessonId: 17` 로 변경 |
| 79 | 13 | 선수학습 위반 | `result = []` + `result.append((i, j))` — 리스트 생성 및 append 사용. 리스트는 lesson 16이 선수학습 | `lessonId: 17` 로 변경 |
| 300 | 17 | 잘못된 lessonId | 파일 섹션 주석은 "Lesson 25"라고 표시되어 있으나 `lessonId: 17`로 설정됨. 코드는 2D matrix 대각선 추출 `matrix[i][i]`, `matrix[i][n-1-i]` — lesson 17은 "리스트와 반복문"이며 단순 1D 리스트 순회가 주 내용. 2D list 고급 조작은 너무 이름. | `lessonId: 26` (자료구조 비교와 선택) 또는 별도 고급 리스트 문제 섹션으로 이동 |

---

### 경계선 이슈 (확정 불가, 검토 권장)

| ID | 현재 lessonId | 문제 | 설명 |
|---|---|---|---|
| 89 | 16 | 잠재적 선수학습 | 2D 리스트 `matrix[1][2]` 접근 테스트. Python 커리큘럼에 전용 "2D 리스트" 레슨이 없으므로 lesson 16(리스트 기초) 배치가 차선책이지만, 처음 배우는 학생에게 2D 리스트는 이른 개념일 수 있음. 현재 배치 유지 가능하나 난이도를 "어려움"으로 유지 권장. |

---

## 요약

| 파일 | 확정 이슈 수 | 주요 원인 |
|---|---|---|
| cpp-questions.ts | 10건 | 커리큘럼 순서 오해 (cpp-23 lambda가 cpp-17보다 나중임), 반복문/연산자 문제가 조건문/함수 레슨에 잘못 배정, 유사 중복 |
| python-questions.ts | 6건 | 리스트(lesson 16 이후) 개념이 for문(lesson 13) 레슨 문제에 선수학습 위반으로 사용됨 |
| **합계** | **16건** | |

---

## 수정 우선순위

### 즉시 수정 필요 (선수학습 위반 — 학생 혼란 유발)
1. **ID 100** (cpp-10): 참조(`int&`) 사용 — cpp-12 이후 개념
2. **ID 232** (cpp-17): lambda 사용 — cpp-23 이후 개념
3. **ID 234** (cpp-17): sort + greater<int>() — cpp-23 이후 개념
4. **ID 244** (cpp-17): partition + lambda — cpp-23 이후 개념
5. **ID 67, 68, 73, 78, 79** (Python, lesson 13): 리스트 리터럴/메서드 — lesson 16 이후 개념

### 보통 우선순위 (잘못된 lessonId)
6. **ID 38** (cpp-6): `%` 연산자 → cpp-5
7. **ID 42** (cpp-6): 삼항 연산자 → cpp-5
8. **ID 63** (cpp-8): break/continue → cpp-7
9. **ID 258** (cpp-17): 이진 탐색 알고리즘 → algo-preview
10. **ID 300** (Python lesson 17): 2D 대각선 추출 → lesson 26 또는 더 높은 레슨

### 낮은 우선순위 (유사 중복)
11. **ID 214 & 227** (cpp-23): 기본 sort 중복 — 둘 중 하나 삭제

---

## 참고: ID 변경 금지 원칙
- 기존 학생 mastery 데이터 보호를 위해 `question.id`는 변경 불가
- `lessonId` 변경은 허용: 해당 문제가 다른 레슨 복습 큐에 나타날 뿐, 기존 정답 기록은 보존됨
- 문제 삭제(ID 214 또는 227)는 mastery 데이터 손실 우려가 있으므로 `lessonId: "deprecated"` 등 비활성 ID로 변경하는 방식 권장
