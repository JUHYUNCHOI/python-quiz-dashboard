# C++ 레슨별 학습 내용 명세서

> 복습 퀴즈 / 연습 문제 출제 기준. 각 레슨의 quiz/practice는 이 범위 안에서만 출제.
> 각 레슨의 **"이 레슨 전까지 배운 것"** = 문제 출제 시 사용 가능한 개념 전체 목록.
> 마지막 업데이트: 2025-04

---

## ⚠️ 커리큘럼 순서 주의

ID 번호 ≠ 커리큘럼 순서. 반드시 아래 순서 기준으로 판단할 것.

| 순서 | lessonId | 제목 |
|------|----------|------|
| 1 | cpp-1 | Python vs C++ |
| 2 | cpp-2 | cout 심화 & namespace |
| 3 | cpp-3 | 변수와 타입 |
| 4 | cpp-4 | cin 입력 |
| 5 | cpp-5 | 연산자 |
| 6 | cpp-6 | 조건문 |
| 7 | cpp-7 | 반복문 |
| 8 | cpp-8 | 함수 |
| - | cpp-p1 | 프로젝트 1 |
| 9 | cpp-9 | 배열 & 벡터 |
| 10 | cpp-21 | 2차원 배열 & 2D vector |
| 11 | cpp-10 | Range-for & auto |
| 12 | cpp-11 | 문자열 심화 |
| 13 | cpp-12 | 참조와 함수 |
| 14 | cpp-13 | 포인터 기초 |
| 15 | cpp-14 | 구조체 (struct) |
| 16 | cpp-22 | 클래스 (class) |
| - | cpp-p2 | 프로젝트 2 |
| 17 | cpp-15 | pair & tuple |
| 18 | cpp-23 | sort 마스터 |
| 19 | cpp-16 | map & set |
| 20 | cpp-17 | STL 탐색 함수 |
| 21 | cpp-18 | stack & queue |
| 22 | cpp-19 | 파일 I/O & Fast I/O |
| 23 | cpp-20 | CP 실전 팁 |
| - | cpp-p3 | 프로젝트 3 |

---

## Lesson cpp-1: Python vs C++

**이 레슨 전까지 배운 것:**
- (없음 — 첫 레슨)

**가르치는 것:**
- C++는 컴파일 언어 vs Python은 인터프리터 언어
- 파일 확장자 `.cpp`
- `#include <iostream>` — 입출력 라이브러리
- `int main() { return 0; }` — 진입점
- `std::cout << "Hello" << std::endl;` — 기본 출력
- `<<` 연산자 (출력 스트림 연산자)

**출제 범위:**
- main() 구조 문법 오류 찾기
- `std::cout` 기본 출력 결과
- C++ vs Python 차이점 개념

**출제 금지:**
- `using namespace std;` (→ cpp-2)
- 변수 선언 (→ cpp-3)

---

## Lesson cpp-2: cout 심화 & namespace

**이 레슨 전까지 배운 것:**
- `#include <iostream>`, `int main()`, `std::cout`, `<<`, `std::endl`

**가르치는 것:**
- `using namespace std;` — std:: 생략 가능
- `cout << 숫자`, `cout << 계산식`
- 이스케이프 시퀀스: `\n` (줄바꿈), `\t` (탭)
- `endl` vs `\n` 차이 (endl은 버퍼 flush 포함)
- 여러 값 연결: `cout << "점수: " << 100 << endl;`

**출제 범위:**
- `\n`, `\t` 포함 출력 결과 예측
- `cout << a << " " << b` 패턴 결과
- endl vs `\n` 개념

**출제 금지:**
- 변수 (→ cpp-3)
- cin (→ cpp-4)

---

## Lesson cpp-3: 변수와 타입

**이 레슨 전까지 배운 것:**
- `#include <iostream>`, `using namespace std;`, `int main()`
- `cout`, `<<`, `endl`, `\n`, `\t`

**가르치는 것:**
- 타입 명시 선언: `int x = 10;`, `double pi = 3.14;`
- 기본 타입: `int`, `double`, `string`, `char`, `bool`
- `#include <string>` — string 타입 사용 시 필요
- `const` — 상수 선언
- `auto` — 타입 자동 추론
- 타입 변환: `(int)3.7`, `(double)5`
- bool: `true` / `false` (소문자)
- 정수 나눗셈: `5 / 2 = 2` (소수점 버림)

**출제 범위:**
- 타입별 변수 선언 결과
- `int / int` 정수 나눗셈 결과
- `const` 변수 수정 시도 → 컴파일 오류
- auto 타입 추론 결과

**출제 금지:**
- cin 입력 (→ cpp-4)
- 연산자 심화 `++`, `+=` (→ cpp-5)
- if 조건문 (→ cpp-6)

---

## Lesson cpp-4: cin 입력

**이 레슨 전까지 배운 것:**
- `cout`, `endl`, `\n`, `\t`
- `int`, `double`, `string`, `char`, `bool`, `const`, `auto`
- 정수 나눗셈 (`int/int = int`)

**가르치는 것:**
- `cin >> 변수;` — 표준 입력
- `>>` 연산자 (입력 스트림 연산자)
- `cin >> a >> b;` — 여러 값 한 번에 입력
- `getline(cin, str)` — 공백 포함 한 줄 입력
- Python의 `int(input())` vs C++의 `int n; cin >> n;`

**출제 범위:**
- `cin >>` 타입 자동 변환 개념
- 여러 변수 입력 순서
- `getline` vs `>>` 차이

**출제 금지:**
- 연산자 심화 (→ cpp-5)
- 조건문 (→ cpp-6)

---

## Lesson cpp-5: 연산자

**이 레슨 전까지 배운 것:**
- `cout`, `cin`, `endl`, `\n`, `\t`
- `int`, `double`, `string`, `char`, `bool`, `const`, `auto`
- 기본 입출력 (`cin >>`, `cout <<`)

**가르치는 것:**
- 산술: `+`, `-`, `*`, `/`, `%`
- 증감: `++` (후위/전위), `--`
- 복합 대입: `+=`, `-=`, `*=`, `/=`
- 비교: `>`, `<`, `>=`, `<=`, `==`, `!=`
- 논리: `&&` (and), `||` (or), `!` (not)
- 삼항 연산자: `(조건) ? 참값 : 거짓값`
- 우선순위: `!` > `*/%` > `+-` > `<>` > `==!=` > `&&` > `||`

**출제 범위:**
- `++i` vs `i++` 결과 차이
- `&&`, `||`, `!` 조합 결과
- 삼항 연산자 결과
- 복합 대입 후 값 예측

**출제 금지:**
- `if`문 (→ cpp-6)
- 비트 연산자 (→ cpp-20)

---

## Lesson cpp-6: 조건문 (if/else/switch)

**이 레슨 전까지 배운 것:**
- `cout`, `cin`, `endl`, `\n`, `\t`
- `int`, `double`, `string`, `char`, `bool`, `const`, `auto`
- `++`, `--`, `+=`, `-=`, `&&`, `||`, `!`, 삼항 연산자

**가르치는 것:**
- `if (조건) { }` — 괄호와 중괄호 필수
- `if ... else ...`
- `if ... else if ... else ...`
- `switch (변수) { case 값: ... break; default: ... }`
- C++ 조건문과 Python 조건문 차이 (콜론 없음, 중괄호 사용)

**출제 범위:**
- if/else 분기 결과
- else if 순서에 따른 결과
- switch-case 흐름 (break 유무)
- 중첩 if 결과

**출제 금지:**
- 반복문 (→ cpp-7)

---

## Lesson cpp-7: 반복문 (for/while/do-while)

**이 레슨 전까지 배운 것:**
- `cout`, `cin`, 기본 타입
- `++`, `--`, `+=`, `-=`, `&&`, `||`, `!`, 삼항
- `if`, `else if`, `else`, `switch`

**가르치는 것:**
- `for (int i = 0; i < n; i++)` — 3파트 구조
- `while (조건) { }` — 조건 기반 반복
- `do { } while (조건);` — 최소 1회 실행
- `break` — 반복문 즉시 종료
- `continue` — 이번 반복 건너뜀
- 중첩 반복문
- `for`의 `i++` vs `i += 2` (간격)

**출제 범위:**
- for 반복 횟수 계산
- 누적합/카운터 패턴 결과
- break/continue 포함 결과 추적
- 중첩 반복문 출력 예측
- while 종료 조건

**출제 금지:**
- 배열/벡터 (→ cpp-9)
- 함수 (→ cpp-8)

---

## Lesson cpp-8: 함수

**이 레슨 전까지 배운 것:**
- `cout`, `cin`, 기본 타입 (`int`, `double`, `string`, `char`, `bool`)
- `++`, `--`, `+=`, `&&`, `||`, `!`, 삼항
- `if/else if/else`, `switch`
- `for`, `while`, `do-while`, `break`, `continue`

**가르치는 것:**
- 함수 선언: `반환타입 함수명(타입 매개변수) { return ...; }`
- `void` 함수 — 반환값 없음
- 함수 오버로딩: 같은 이름, 다른 매개변수 타입
- 함수 선언(declaration) vs 정의(definition) 순서
- 재귀 함수 기초

**출제 범위:**
- 함수 반환값 예측
- void vs return 차이
- 오버로딩 시 어떤 함수가 호출되는지
- 재귀 함수 결과 (간단한 경우)

**출제 금지:**
- call-by-reference `&` (→ cpp-12)
- 포인터 (→ cpp-13)
- 기본값 매개변수 (→ 안 다룸 / cpp-8에서 다루면 명시)

---

## Lesson cpp-p1: 프로젝트 1 — 숫자 맞추기 게임

**이 레슨 전까지 배운 것:** cpp-8까지 전체

**가르치는 것:**
- `srand(time(0))`, `rand() % N` — 난수 생성
- `while (true)` + `break` 게임 루프
- 함수 분리 (`getRandomNumber()`, `playGame()`)
- 사용자 입력 반복 처리

---

## Lesson cpp-9: 배열 & 벡터

**이 레슨 전까지 배운 것:**
- cpp-1~8 전체 (cout, cin, 기본 타입, 연산자, if/else, for/while, 함수)
- `rand()`, `srand()` (cpp-p1)

**가르치는 것:**
- C 스타일 배열: `int arr[5] = {1, 2, 3, 4, 5};`
- 배열 인덱싱: `arr[0]` ~ `arr[4]`
- `#include <vector>`, `vector<int> v;`
- `v.push_back(값)`, `v.pop_back()`
- `v.size()`, `v.empty()`, `v.clear()`
- `vector<int> v(5, 0)` — 크기+초기값 초기화
- for문으로 배열/벡터 순회: `for (int i = 0; i < v.size(); i++)`

**출제 범위:**
- 배열/벡터 인덱싱 결과
- push_back/pop_back 후 상태
- size(), empty() 결과
- 배열 경계 넘기 → 미정의 동작

**출제 금지:**
- 2D 배열 (→ cpp-21)
- range-for (→ cpp-10)
- auto (→ cpp-10)
- 문자열 메서드 (→ cpp-11)
- 레퍼런스 (→ cpp-12)

---

## Lesson cpp-21: 2차원 배열 & 2D vector

**이 레슨 전까지 배운 것:**
- cpp-1~9 전체
- `vector<int>`, `push_back`, `pop_back`, `size()`, 인덱싱

**가르치는 것:**
- C 스타일 2D 배열: `int grid[3][4];`
- 2D 벡터: `vector<vector<int>> grid(3, vector<int>(4, 0));`
- 접근: `grid[행][열]`
- 중첩 for문으로 순회
- 행/열 크기: `grid.size()`, `grid[0].size()`

**출제 범위:**
- `grid[i][j]` 접근 결과
- 2D 벡터 초기화 크기
- 중첩 for 순회 출력 결과

**출제 금지:**
- range-for (→ cpp-10)
- auto (→ cpp-10)
- 레퍼런스 (→ cpp-12)
- 문자열 메서드 (→ cpp-11)

---

## Lesson cpp-10: Range-for & auto

**이 레슨 전까지 배운 것:**
- cpp-1~9, cpp-21 전체
- 1D/2D 배열, 벡터

**가르치는 것:**
- `for (int x : vec)` — range-based for (Python의 `for x in list`)
- `for (auto x : vec)` — auto로 타입 자동 추론
- `for (int& x : vec)` — 레퍼런스로 원소 수정
- `for (const int& x : vec)` — 읽기 전용 레퍼런스
- `auto` 변수 타입 추론: `auto x = 3.14;`

**출제 범위:**
- range-for 순회 결과
- `int& x` vs `int x` 수정 여부
- auto 타입 추론 결과

**출제 금지:**
- 레퍼런스 함수 매개변수 (→ cpp-12)
- 포인터 (→ cpp-13)

---

## Lesson cpp-11: 문자열 심화

**이 레슨 전까지 배운 것:**
- cpp-1~10, cpp-21 전체
- range-for, auto, 1D/2D 벡터

**가르치는 것:**
- `s.length()` / `s.size()` — 문자열 길이
- `s.substr(pos, len)` — 부분 문자열
- `s.find("패턴")` — 위치 반환 (없으면 `string::npos`)
- `s.replace(pos, len, "새문자열")` — 치환
- 문자열 비교: `==`, `<`, `>` (사전순)
- 타입 변환: `to_string(숫자)`, `stoi("123")`, `stod("3.14")`
- 문자열 이어붙이기: `s1 + s2`, `s += "추가"`

**출제 범위:**
- substr 결과 (pos, len)
- find 반환값 (위치 or string::npos)
- stoi/to_string 변환 결과
- 문자열 비교 결과

**출제 금지:**
- 레퍼런스 (→ cpp-12)
- 포인터 (→ cpp-13)

---

## Lesson cpp-12: 참조와 함수 (References)

**이 레슨 전까지 배운 것:**
- cpp-1~11, cpp-21 전체
- range-for, auto, 문자열 메서드

**가르치는 것:**
- call-by-value: 복사본 전달 — 원본 불변
- call-by-reference `&`: 원본 직접 수정
  ```cpp
  void addOne(int& x) { x++; }
  ```
- const 레퍼런스: `const int& x` — 읽기 전용
- swap 함수: 레퍼런스로 두 변수 교환
- 레퍼런스 변수: `int& ref = x;`

**출제 범위:**
- value vs reference 전달 후 원본 변수 값
- `void swap(int& a, int& b)` 동작 결과
- const 레퍼런스로 수정 시도 → 컴파일 오류

**출제 금지:**
- 포인터 (→ cpp-13)
- 구조체 (→ cpp-14)

---

## Lesson cpp-13: 포인터 기초

**이 레슨 전까지 배운 것:**
- cpp-1~12, cpp-21 전체
- call-by-value, call-by-reference

**가르치는 것:**
- 포인터 선언: `int* ptr;`
- 주소 연산자: `ptr = &x;` — x의 주소 저장
- 역참조 연산자: `*ptr` — 포인터가 가리키는 값
- `nullptr` — 빈 포인터
- 포인터 vs 레퍼런스 차이:
  - 포인터: 재할당 가능, nullptr 가능
  - 레퍼런스: 선언 시 초기화 필수, 재할당 불가
- 포인터로 값 수정: `*ptr = 20;`

**출제 범위:**
- `&변수`, `*포인터` 결과
- 포인터로 값 수정 후 원본 변수 값
- `nullptr` 개념
- 포인터 vs 레퍼런스 특성 구분

**출제 금지:**
- 포인터 산술 심화 (→ 안 다룸)
- 동적 메모리 `new/delete` (→ 안 다룸)
- 구조체 포인터 `->` (→ cpp-14 이후)

---

## Lesson cpp-14: 구조체 (struct)

**이 레슨 전까지 배운 것:**
- cpp-1~13, cpp-21 전체
- 포인터, 레퍼런스, 문자열 메서드

**가르치는 것:**
- `struct 이름 { 멤버변수들; };`
- 구조체 인스턴스 생성: `Student s = {"철수", 90};`
- 멤버 접근: `s.name`, `s.score`
- 구조체 배열: `Student arr[3];`
- 함수에 구조체 전달 (value/reference)
- 구조체로 데이터 묶기 (캐릭터, 학생 등)

**출제 범위:**
- 구조체 멤버 접근 결과
- 구조체 레퍼런스 전달 후 값 변경
- 구조체 배열 인덱싱

**출제 금지:**
- 클래스 (→ cpp-22)
- `->` 연산자 (→ 포인터와 결합, 고급)
- 상속 (→ cpp-22)

---

## Lesson cpp-22: 클래스 (class)

**이 레슨 전까지 배운 것:**
- cpp-1~14, cpp-21 전체 (Part 2 모두)
- 구조체, 포인터, 레퍼런스, 문자열, 벡터

**가르치는 것:**
- `class 이름 { public: ... private: ... };`
- `public` / `private` 접근 제어
- `__init__` 대응 → 생성자: `ClassName(타입 매개변수) { }`
- `this->` — 자기 자신의 멤버 접근
- getter/setter 메서드
- 멤버 함수 정의
- 상속: `class Warrior : public Character { }`
- `super()` 대응 → 부모 생성자 호출: `Character(name, hp)`
- 캡슐화 개념

**출제 범위:**
- 생성자 실행 후 멤버 변수 값
- public/private 접근 오류
- 메서드 호출 결과
- 상속 시 부모 메서드 호출

**출제 금지:**
- 가상 함수/다형성 `virtual` (→ 고급, 안 다룸)
- 순수 가상 함수/추상 클래스 (→ 안 다룸)
- 연산자 오버로딩 (→ 안 다룸)

---

## Lesson cpp-p2: 프로젝트 2 — RPG 캐릭터 관리

**이 레슨 전까지 배운 것:** cpp-22까지 전체 (Part 2 완료)

**가르치는 것:**
- struct + class 조합 설계
- `vector<Character>` 컬렉션 관리
- `to_string()` 활용 포맷 출력
- 객체 합성(composition) 패턴

---

## Lesson cpp-15: pair & tuple

**이 레슨 전까지 배운 것:**
- cpp-1~14, cpp-21, cpp-22 전체 (Part 1+2 완료)

**가르치는 것:**
- `#include <utility>`, `pair<T1, T2>`
- 접근: `.first`, `.second`
- `make_pair(a, b)` 생성
- pair 자동 정렬: first 기준 → 같으면 second 기준
- `vector<pair<int, int>>` 활용
- 구조화 바인딩(C++17): `auto [a, b] = p;`

**출제 범위:**
- pair.first / pair.second 접근 결과
- pair 비교 순서 (자동 정렬 기준)
- vector<pair> 인덱싱

**출제 금지:**
- `tuple` (→ 같은 레슨이지만 pair 우선. tuple 문제는 tuple 학습 후)
- sort (→ cpp-23)

---

## Lesson cpp-23: sort 마스터

**이 레슨 전까지 배운 것:**
- cpp-1~15 전체
- pair, vector, 구조체, 클래스

**가르치는 것:**
- `#include <algorithm>`, `sort(v.begin(), v.end())`
- 내림차순: `sort(v.begin(), v.end(), greater<int>())`
- 람다 비교자: `sort(v.begin(), v.end(), [](int a, int b){ return a < b; })`
- pair 두 번째 기준 정렬: `[](auto& a, auto& b){ return a.second < b.second; }`
- 다중 조건 정렬 (점수 내림차순, 이름 오름차순)
- 중복 제거: `sort` + `unique()` + `.erase()`
- 수동 정렬 알고리즘 이론 (버블/선택/삽입 개념)

**출제 범위:**
- sort 기본/내림차순 결과
- 람다 비교자로 정렬 후 순서
- pair 정렬 기준
- unique+erase 결과

**출제 금지:**
- `map`, `set` (→ cpp-16)
- `lower_bound`, `upper_bound` (→ cpp-16)

---

## Lesson cpp-16: map & set

**이 레슨 전까지 배운 것:**
- cpp-1~15, cpp-21~23 전체
- sort, lambda, pair

**가르치는 것:**
- `#include <map>`, `map<K, V>` — 키-값, 자동 정렬
- `m[key] = value`, `m.count(key)`, `m.find(key)`
- `#include <set>`, `set<T>` — 중복 없음, 자동 정렬
- `s.insert(값)`, `s.count(값)`, `s.erase(값)`
- `unordered_map`, `unordered_set` — O(1) 평균, 정렬 없음
- range-for로 map/set 순회
- `m.lower_bound(key)`, `m.upper_bound(key)`

**출제 범위:**
- map 삽입/조회 결과
- map 자동 정렬 순서
- set 중복 제거 결과
- unordered_map vs map 차이 (정렬 여부)
- count(key) — 존재 여부 확인

**출제 금지:**
- STL 탐색 알고리즘 함수 (→ cpp-17)

---

## Lesson cpp-17: STL 탐색 함수

**이 레슨 전까지 배운 것:**
- cpp-1~16, cpp-21~23 전체
- map, set, unordered_map, sort, pair

**가르치는 것:**
- `find(begin, end, 값)` — 반복자 반환
- `count_if(begin, end, 조건)` — 조건 만족 개수
- `binary_search(begin, end, 값)` — 정렬된 컨테이너에서 탐색
- `min_element`, `max_element` — 최솟값/최댓값 반복자
- `accumulate(begin, end, 초기값)` — 누적합
- 반복자(iterator) 개념 기초

**출제 범위:**
- accumulate 결과
- count_if 결과
- min_element/max_element 결과
- binary_search 전제조건 (정렬 필요)

---

## Lesson cpp-18: stack & queue & priority_queue

**이 레슨 전까지 배운 것:**
- cpp-1~17, cpp-21~23 전체
- STL 알고리즘, map/set, sort, pair

**가르치는 것:**
- `#include <stack>`, `stack<T>`
  - `.push()`, `.pop()`, `.top()`, `.empty()`
  - LIFO (Last In First Out)
- `#include <queue>`, `queue<T>`
  - `.push()`, `.pop()`, `.front()`, `.back()`
  - FIFO (First In First Out)
- `deque<T>` — 양쪽 끝 삽입/삭제
  - `push_front()`, `push_back()`, `pop_front()`, `pop_back()`
- `priority_queue<T>` — 최대 힙 (default)
  - `priority_queue<int, vector<int>, greater<int>>` — 최소 힙

**출제 범위:**
- push/pop 순서에 따른 스택/큐 상태
- top() / front() 결과
- LIFO vs FIFO 구분
- priority_queue 꺼내는 순서 (최대/최소)

---

## Lesson cpp-19: 파일 I/O & Fast I/O

**이 레슨 전까지 배운 것:**
- cpp-1~18, cpp-21~23 전체 (Part 3 대부분)

**가르치는 것:**
- `#include <fstream>`, `ifstream fin("input.txt")`, `ofstream fout`
- `fin >> 변수`, `fout << 값`
- USACO 스타일: `freopen("file.in", "r", stdin)`
- Fast I/O: `ios_base::sync_with_stdio(false); cin.tie(nullptr);`
- `getline(cin, str)` — 한 줄 전체 읽기
- `endl` vs `'\n'` 성능 차이

**출제 범위:**
- ifstream/ofstream 기본 사용법
- fast I/O 코드 패턴
- freopen USACO 스타일

---

## Lesson cpp-20: CP 실전 팁

**이 레슨 전까지 배운 것:**
- cpp-1~19, cpp-21~23 전체 (전체 커리큘럼)

**가르치는 것:**
- `#include <bits/stdc++.h>` — 모든 STL 한 번에
- `typedef long long ll;` / `using ll = long long;`
- `#define INF 1e9`, `#define MOD 1e9+7`
- 비트 연산: `&` (AND), `|` (OR), `^` (XOR), `<<` (left shift), `>>` (right shift)
- 다익스트라 개념 소개 (알고리즘 이론 맛보기)

**출제 범위 (algo-preview 제외):**
- `typedef`/`using` 별칭 문법
- 비트 연산 결과 (`5 & 3`, `5 | 3`, `5 ^ 3`)
- `bits/stdc++.h` 목적

**⚠️ algo-preview 처리:**
- BFS/DFS/DP/그리디/백트래킹/유니온파인드/누적합/투포인터/슬라이딩윈도우 문제
  → `lessonId: "algo-preview"` (Algorithm Lab으로 이관 예정)

---

## Lesson cpp-p3: 프로젝트 3 — USACO 모의전

**이 레슨 전까지 배운 것:** 전체 커리큘럼 완료

**가르치는 것:**
- Problem 1: pair 정렬 + 커스텀 비교자
- Problem 2: map 빈도 분석
- Problem 3: stack 괄호 매칭
- USACO 파일 I/O (`freopen`)

---

## 누적 학습 현황 요약

| 레슨 완료 시점 | 사용 가능한 주요 개념 |
|--------------|---------------------|
| cpp-4 (cin) | cout/cin, 기본 타입 5종, 입출력 |
| cpp-7 (반복문) | + 연산자, 조건문, for/while/break/continue |
| cpp-8 (함수) | + 함수 선언/오버로딩/재귀 |
| cpp-p1 (프로젝트1) | + rand(), srand(), 게임 루프 |
| cpp-9 (벡터) | + 1D 배열/벡터, push_back, pop_back |
| cpp-21 (2D) | + 2D 배열/벡터, grid[i][j] |
| cpp-11 (문자열) | + range-for, auto, 문자열 메서드 |
| cpp-14 (구조체) | + 레퍼런스, 포인터, 구조체 |
| cpp-22 (클래스) | + 클래스, 생성자, 상속, 캡슐화 |
| cpp-p2 (프로젝트2) | Part 2 완료 |
| cpp-15 (pair) | + pair, .first/.second |
| cpp-23 (sort) | + sort, 람다 비교자, unique |
| cpp-16 (map/set) | + map, set, unordered 버전 |
| cpp-17 (STL탐색) | + accumulate, count_if, binary_search |
| cpp-18 (stack/queue) | + stack, queue, deque, priority_queue |
| cpp-20 (CP팁) | + 비트연산, typedef, bits/stdc++.h |
| cpp-p3 (프로젝트3) | 전체 커리큘럼 완료 |

---

## ⚠️ 자주 혼동하는 것

1. **cpp-21 (2D 배열)은 커리큘럼 10번째지만 ID가 21** — cpp-9 직후에 나옴. 이 시점엔 range-for, auto, 문자열 메서드 아직 모름
2. **cpp-22 (클래스)는 커리큘럼 16번째지만 ID가 22** — 구조체(cpp-14) 직후에 나옴
3. **cpp-23 (sort)는 커리큘럼 18번째지만 ID가 23** — pair(cpp-15) 직후에 나옴
4. **cpp-10은 ID가 10이지만 커리큘럼 11번째** — cpp-21(2D 배열) 다음에 나옴
