# Python 레슨별 학습 내용 명세서

> 복습 퀴즈 / 연습 문제 출제 기준. 각 레슨의 quiz/practice는 이 범위 안에서만 출제.
> 각 레슨의 **"이 레슨 전까지 배운 것"** = 문제 출제 시 사용 가능한 개념 전체 목록.
> 마지막 업데이트: 2025-04

---

## Lesson 1: print() 출력

**이 레슨 전까지 배운 것:**
- (없음 — 첫 레슨)

**가르치는 것:**
- `print('문자열')` — 따옴표 필수, `'` 와 `"` 모두 OK
- `print(숫자)` — 숫자는 따옴표 없이
- `print(10 + 5)` — 계산식 결과 출력
- `print('글자', 숫자)` — 쉼표로 여러 값 (자동 공백 구분)
- `'100'` (문자열) vs `100` (숫자) 구분

**출제 범위:**
- print() 문법 오류 찾기 (따옴표 없음)
- 출력 결과 예측 (문자열 / 숫자 / 계산 / 쉼표 조합)
- `'100'` vs `100` 차이

**출제 금지:**
- sep, end 옵션 (→ lesson 7)
- f-string (→ lesson 8)
- 변수 (→ lesson 3)

---

## Lesson 2: 데이터 타입

**이 레슨 전까지 배운 것:**
- `print()`, 문자열/숫자 구분

**가르치는 것:**
- 4가지 기본 타입: `int`, `float`, `str`, `bool`
- `type()` 함수 — 결과는 `<class 'int'>` 형태
- `True` / `False` (대문자 필수)
- 비교 결과가 bool: `10 > 5` → `True`

**출제 범위:**
- 주어진 값의 타입 맞추기
- `type(x)` 출력 결과 (`<class 'int'>` 형식)
- True/False 대소문자 오류 찾기
- 비교 연산 결과 True/False

**출제 금지:**
- `isinstance()` (안 배움)
- `None` 타입 (안 배움)
- 암묵적 타입 변환 int+float (안 배움)
- bool이 int를 상속한다는 개념 (안 배움)
- 부동소수점 정밀도 (안 배움)

---

## Lesson 3: 변수

**이 레슨 전까지 배운 것:**
- `print()`, `int`, `float`, `str`, `bool`, `type()`, True/False, 비교 결과

**가르치는 것:**
- 변수 선언: `name = '용사'`, `hp = 100`
- 변수로 값 꺼내 쓰기
- 재할당: `hp = hp - 20`
- `x = x + 3` 패턴
- 변수 이름 규칙: 영문/숫자/언더스코어, snake_case, 숫자로 시작 불가

**출제 범위:**
- 변수 재할당 후 값 예측
- 변수 이름 오류 (숫자로 시작, 예약어)
- `x = x + 1` 패턴 결과

**출제 금지:**
- 연산자 심화 (→ lesson 4)
- 여러 변수 동시 할당 (→ lesson 19 튜플 언패킹)

---

## Lesson 4: 연산자

**이 레슨 전까지 배운 것:**
- `print()`, `type()`, 4가지 기본 타입
- 변수 선언, 재할당

**가르치는 것:**
- 산술: `+`, `-`, `*`, `/`, `//` (몫), `%` (나머지), `**` (거듭제곱)
- `/` 는 항상 float 반환 (`10 / 2 = 5.0`)
- `//` 는 정수 나눗셈 (`10 // 3 = 3`)
- 비교: `>`, `<`, `>=`, `<=`, `==`, `!=` → 결과는 True/False
- 논리: `and`, `or`, `not`
- 연산자 우선순위: `**` > `*/%//` > `+-` > 비교 > 논리

**출제 범위:**
- 산술 연산 결과 (`//`, `%`, `**`, `/`)
- 비교 연산 결과 True/False
- `and` / `or` / `not` 결과
- 우선순위 포함한 식 계산

**출제 금지:**
- 음수 나머지 `-7 % 3` (edge case, 안 다룸)
- 비트 연산자
- 문자열 연산 `+`, `*` (→ lesson 5)

---

## Lesson 5: 문자열 연산

**이 레슨 전까지 배운 것:**
- `print()`, `type()`, 4가지 기본 타입
- 변수 선언/재할당
- `+`, `-`, `*`, `/`, `//`, `%`, `**`, 비교, 논리 연산자

**가르치는 것:**
- `'Hello' + 'World'` → `'HelloWorld'` (문자열 이어붙이기)
- `'하' * 3` → `'하하하'` (문자열 반복)
- 문자열 + 숫자 → **TypeError** (타입 불일치)
- `str()` 로 숫자 → 문자열 변환 후 이어붙이기 가능
- 힌트: f-string이 더 편함 (→ lesson 8)

**출제 범위:**
- `+` 로 문자열 이어붙이기 결과
- `*` 로 문자열 반복 결과
- `'글자' + 숫자` → TypeError
- `str()` 변환 후 결과

**출제 금지:**
- f-string (→ lesson 8)
- 문자열 메서드 upper/lower 등 (→ lesson 6)
- 인덱싱/슬라이싱 (→ lesson 22)

---

## Lesson 6: 문자열 메서드

**이 레슨 전까지 배운 것:**
- `print()`, `type()`, `str()`, 기본 연산자
- 변수, 문자열 `+`, `*`, TypeError

**가르치는 것:**
- `text.upper()` — 대문자 변환
- `text.lower()` — 소문자 변환
- `text.strip()` — 앞뒤 공백 제거
- `text.replace('old', 'new')` — 치환
- `len(text)` — 문자열 길이
- `text.find('문자')` — 위치 반환 (없으면 -1)
- 메서드 체이닝 가능: `'hello'.upper().replace('L', 'X')`

**출제 범위:**
- 각 메서드 적용 결과
- `len()` 결과
- `find()` 반환값 (위치 or -1)
- 메서드 체이닝 결과

**출제 금지:**
- `split()`, `join()` (→ lesson 18)
- `count()`, `startswith()`, `endswith()` (안 다룸)
- 인덱싱 (→ lesson 22)

---

## Lesson 7: print() 옵션 (sep/end)

**이 레슨 전까지 배운 것:**
- `print()`, `type()`, `str()`, `len()`
- 변수, 기본 연산자, 문자열 연산, 메서드 6종

**가르치는 것:**
- `sep` 옵션: `print('A', 'B', sep='-')` → `A-B`
- `sep` 기본값: `' '` (공백)
- `end` 옵션: `print('Hello', end=' ')` — 줄바꿈 대신 다른 문자
- `end` 기본값: `'\n'`
- `sep`과 `end` 동시 사용

**출제 범위:**
- sep/end 설정 시 출력 결과
- 기본값 알기
- 여러 print()가 end로 연결될 때 최종 출력

**출제 금지:**
- f-string (→ lesson 8)
- `print(*리스트, sep=...)` (→ lesson 16 이후)

---

## Lesson 8: f-string

**이 레슨 전까지 배운 것:**
- `print()`, `sep`, `end`, `type()`, `str()`, `len()`
- 변수, 기본 연산자, 문자열 연산/메서드

**가르치는 것:**
- `f"이름: {name}"` — 변수 삽입
- `f"{a} + {b} = {a+b}"` — 식 계산도 가능
- `f"{pi:.2f}"` — 소수점 포맷 (`.2f`)
- `f"{n:03d}"` — 0 채우기 (zero-padding)
- `f"{n:>10}"` — 정렬 (우측)
- `f"{name.upper()}"` — 메서드 호출도 가능

**출제 범위:**
- f-string 기본 변수 삽입 결과
- `:.2f`, `:03d` 포맷 결과
- f-string 안 계산식 결과

**출제 금지:**
- `format()` 함수 (안 다룸)
- `%` 포맷팅 (안 다룸)

---

## Lesson 9: 타입 변환

**이 레슨 전까지 배운 것:**
- `print()`, `sep`, `end`, `type()`, `str()`, `len()`
- 변수, 연산자 전체, 문자열 연산/메서드, f-string

**가르치는 것:**
- `int("123")` → 123
- `int(3.7)` → 3 (소수점 버림, 반올림 아님)
- `int("  42  ")` → 42 (공백 자동 제거)
- `float("3.14")` → 3.14
- `str(123)` → `"123"`
- `int("hello")` → **ValueError**
- `int("3.14")` → **ValueError** (float 문자열 → int 직접 불가)
- `bool(0)` → False, `bool("")` → False, `bool("hello")` → True

**출제 범위:**
- 각 변환 함수 결과
- ValueError 발생 케이스
- int()의 소수점 버림 vs round()
- 부동소수점 정밀도: `0.1 + 0.2 == 0.3` → False (float 특성)

**출제 금지:**
- 복잡한 bool 변환 (empty list 등 → lesson 16 이후)

---

## Lesson 10: input()

**이 레슨 전까지 배운 것:**
- `print()`, `sep`, `end`, `f-string`
- `type()`, `str()`, `int()`, `float()`, `bool()`
- 변수, 연산자 전체, 문자열 연산/메서드

**가르치는 것:**
- `name = input('이름: ')` — 항상 문자열 반환
- `age = int(input('나이: '))` — 정수로 변환
- `x = float(input())` — 실수로 변환
- input() 없이는 프로그램이 사용자와 소통 불가

**출제 범위:**
- `input()` 반환 타입은 항상 `str`
- `int(input())` 패턴
- 문자열 입력을 숫자로 안 바꾸면 TypeError

**출제 금지:**
- `x = print("Hello")` → None (안 다룸)
- 조건문 (→ lesson 11)

---

## Lesson 11: 조건문 (if/elif/else)

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `sep`, `end`, `f-string`
- `type()`, `str()`, `int()`, `float()`, `bool()`
- 변수, 연산자 전체, 문자열 연산/메서드

**가르치는 것:**
- `if 조건:` — 콜론, 들여쓰기 필수
- `if ... else ...`
- `if ... elif ... elif ... else ...`
- 들여쓰기 오류 인식

**출제 범위:**
- 주어진 값에서 어느 분기 실행되는지
- elif 순서에 따른 결과 차이
- 들여쓰기 오류 찾기

**출제 금지:**
- `and`/`or`/`not` 복합 조건 (→ lesson 12)
- 반복문 (→ lesson 13/14)
- 삼항 연산자 (안 다룸)

---

## Lesson 12: 조건문 심화 (and/or/not)

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환 4종
- 변수, 연산자 전체, 문자열 연산/메서드
- `if`, `elif`, `else`

**가르치는 것:**
- `and` — 둘 다 True여야 True
- `or` — 하나라도 True면 True
- `not` — True ↔ False 반전
- 복합 조건: `age >= 13 and age < 19`
- 연결 비교: `1 < 5 < 10` → True (Python 특성)

**출제 범위:**
- and/or/not 결과 예측
- 복합 조건이 포함된 if문 결과
- 연결 비교 결과

**출제 금지:**
- 단락 평가 심화 (and/or의 실제 반환값 — 안 다룸)

---

## Lesson 13: 반복문 (for)

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환
- 변수, 연산자 전체, 문자열 연산/메서드
- `if`, `elif`, `else`, `and`, `or`, `not`

**가르치는 것:**
- `for i in range(5):` — 0~4 반복
- `range(1, 6)` — 1~5
- `range(0, 10, 2)` — 0,2,4,6,8 (간격)
- `for item in 리스트:` — 리스트 순회 (리스트 개념 맛보기)
- 누적 패턴: `total += i`
- 중첩 for문

**출제 범위:**
- range() 결과 범위
- 반복 횟수 계산
- 누적합 결과
- 중첩 반복문 출력 결과

**출제 금지:**
- `enumerate()` (→ lesson 17)
- `zip()` (→ lesson 17/35)
- 리스트 컴프리헨션 (→ lesson 17)
- 리스트 메서드 (→ lesson 16)

---

## Lesson 14: 반복문 (while)

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환
- 변수, 연산자 전체, 문자열 연산/메서드
- `if/elif/else`, `and/or/not`
- `for`, `range()`, 누적 패턴, 중첩 for

**가르치는 것:**
- `while 조건:` — 조건이 True인 동안 반복
- `while True:` + `break` — 무한 루프 탈출
- `continue` — 이번 반복 건너뜀
- for vs while: 횟수 정해짐 → for, 조건 기반 → while

**출제 범위:**
- while문 실행 횟수 / 결과 예측
- break/continue 포함 결과
- 무한 루프 조건 인식

---

## Lesson 15: 자료구조 개요

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환
- 변수, 연산자 전체, 문자열 연산/메서드
- `if/elif/else`, `and/or/not`
- `for`, `range()`, 중첩 for
- `while`, `break`, `continue`

**가르치는 것:**
- 4가지 자료구조 특징 비교
  - 리스트 `[]`: 순서 있음, 수정 가능, 중복 허용
  - 튜플 `()`: 순서 있음, 수정 불가, 고정값
  - 딕셔너리 `{}`: 키:값, 순서 없음(3.7부터 삽입순)
  - 집합 `{}`: 중복 없음, 순서 없음
- 언제 어떤 걸 쓰는지

**출제 범위:**
- 각 자료구조 특징 구분
- 수정 가능 여부
- 중복 허용 여부

---

## Lesson 16: 리스트 기초

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환, `len()`, `str()`
- 변수, 연산자 전체, 문자열 연산/메서드
- `if/elif/else`, `and/or/not`, `for`, `range()`, `while`, `break`, `continue`
- 자료구조 4종 개념 (아직 메서드 모름)

**가르치는 것:**
- 리스트 생성: `[1, 2, 3]`
- 인덱스 접근: `list[0]` (0부터), `list[-1]` (마지막)
- `append(값)` — 뒤에 추가
- `remove(값)` — 값으로 삭제 (처음 발견된 것)
- `pop()` / `pop(i)` — 삭제 후 반환
- `len()` — 길이
- `in` 연산자 — 포함 여부
- `list.index(값)` — 위치 반환

**출제 범위:**
- 인덱스 접근 결과 (양수/음수)
- append/remove/pop 후 리스트 상태
- len(), in 결과

**출제 금지:**
- `sort()`, `reverse()` (→ lesson 35)
- `count()`, `insert()` (안 다룸)
- enumerate, zip (→ lesson 17)
- 2D 리스트 (→ lesson 17)

---

## Lesson 17: 리스트와 반복문

**이 레슨 전까지 배운 것:**
- `print()`, `input()`, `f-string`, 타입 변환
- `len()`, `str()`, `int()`, `float()`
- 문자열 메서드 6종 (upper, lower, strip, replace, find)
- `if/elif/else`, `and/or/not`, `for`, `range()`, `while`, `break`, `continue`
- 리스트: 생성, 인덱싱, append, remove, pop, len, in, index

**가르치는 것:**
- `for item in list:` — 리스트 직접 순회
- `enumerate(list)` → `(인덱스, 값)` 쌍
- `range(len(list))` — 인덱스로 접근
- `zip(list1, list2)` — 두 리스트 짝짓기
- 리스트 컴프리헨션: `[x*2 for x in nums]`, `[x for x in nums if x > 0]`
- 2D 리스트: `matrix = [[1,2],[3,4]]`, `matrix[0][1]` 접근

**출제 범위:**
- enumerate, zip 결과
- 리스트 컴프리헨션 결과
- 2D 리스트 접근

---

## Lesson 18: split()과 join()

**이 레슨 전까지 배운 것:**
- lesson 17까지 전체
- enumerate, zip, 리스트 컴프리헨션, 2D 리스트

**가르치는 것:**
- `'a b c'.split()` → `['a', 'b', 'c']` (공백 기준)
- `'a,b,c'.split(',')` → `['a', 'b', 'c']` (구분자 지정)
- `map(int, input().split())` — 공백 구분 정수 여러 개 입력
- `'-'.join(['a', 'b', 'c'])` → `'a-b-c'`
- `list(map(int, input().split()))` — 리스트로 변환

**출제 범위:**
- split() 결과 (기본/구분자 지정)
- join() 결과
- map(int, ...) 패턴

---

## Lesson 19: 튜플

**이 레슨 전까지 배운 것:**
- lesson 18까지 전체
- split(), join(), map() 패턴

**가르치는 것:**
- 튜플 생성: `(1, 2, 3)` — 수정 불가
- 인덱스 접근은 리스트와 동일
- 언패킹: `x, y = (3, 4)`
- 값 교환: `a, b = b, a`
- 1개짜리 튜플: `(1,)` — 쉼표 필수
- `tuple()` / `list()` — 변환

**출제 범위:**
- 튜플 수정 시도 → TypeError
- 언패킹 결과
- 값 교환 패턴

---

## Lesson 20: 딕셔너리

**이 레슨 전까지 배운 것:**
- lesson 19까지 전체
- 튜플, 언패킹, 값 교환

**가르치는 것:**
- 딕셔너리 생성: `{'name': '철수', 'age': 15}`
- 값 접근: `d['key']`
- 추가/수정: `d['key'] = value`
- 삭제: `del d['key']`, `d.pop('key')`
- `d.keys()`, `d.values()`, `d.items()`
- `d.get('key', 기본값)` — 없을 때 기본값 반환
- `key in d` — 키 존재 확인

**출제 범위:**
- 딕셔너리 접근/수정 결과
- 없는 키 접근 → KeyError vs get() 차이
- items() 순회

---

## Lesson 21: 집합 (set)

**이 레슨 전까지 배운 것:**
- lesson 20까지 전체
- 딕셔너리: 생성, 접근, 수정, 삭제, keys/values/items, get

**가르치는 것:**
- 집합 생성: `{1, 2, 3}`, `set([1, 2, 2, 3])` → 중복 제거
- `add(값)`, `remove(값)`, `discard(값)` (discard는 없어도 오류 없음)
- `in` 연산 — O(1)
- 집합 연산: `|` (합집합), `&` (교집합), `-` (차집합)
- `set()` 활용: 중복 제거 패턴

**출제 범위:**
- 중복 제거 결과
- 집합 연산 결과
- add/remove 후 상태

---

## Lesson 22: 슬라이싱

**이 레슨 전까지 배운 것:**
- lesson 21까지 전체
- 집합: 생성, add/remove, 집합 연산

**가르치는 것:**
- `list[1:4]` — 인덱스 1~3 (끝 제외)
- `list[:3]`, `list[2:]`
- `list[-2:]` — 뒤에서 2개
- `list[::-1]` — 뒤집기
- `list[::2]` — 2칸씩
- 문자열에도 동일하게 적용
- 슬라이싱은 새 객체 반환 (원본 불변)

**출제 범위:**
- 슬라이싱 결과
- 음수 인덱스 슬라이싱
- `[::-1]` 결과
- 문자열 슬라이싱

---

## Lesson 23: 스택 (Stack)

**이 레슨 전까지 배운 것:**
- lesson 22까지 전체
- 슬라이싱 (리스트/문자열)

**가르치는 것:**
- LIFO (Last In, First Out)
- 리스트로 구현: `append()` (push), `pop()` (pop)
- 스택 상태 추적
- 스택이 쓰이는 상황: 괄호 검사, 뒤로가기, Ctrl+Z

**출제 범위:**
- push/pop 순서에 따른 스택 상태
- LIFO 원칙
- 괄호 검사 로직

---

## Lesson 24: 큐 (Queue)

**이 레슨 전까지 배운 것:**
- lesson 23까지 전체
- 스택: LIFO, append/pop

**가르치는 것:**
- FIFO (First In, First Out)
- `from collections import deque`
- `deque.append()` (뒤), `deque.popleft()` (앞)
- 리스트 `pop(0)` → O(n) vs `deque.popleft()` → O(1) 성능 차이
- 큐가 쓰이는 상황: 프린터 대기열, 게임 매칭

**출제 범위:**
- append/popleft 순서에 따른 큐 상태
- FIFO 원칙
- deque import 방법

---

## Lesson 25: 덱 (Deque)

**이 레슨 전까지 배운 것:**
- lesson 24까지 전체
- 큐: FIFO, deque, append/popleft

**가르치는 것:**
- 양쪽 끝에서 추가/삭제 — 모두 O(1)
- `appendleft(값)` — 앞에 추가
- `popleft()` — 앞에서 삭제
- `append(값)` — 뒤에 추가
- `pop()` — 뒤에서 삭제
- `rotate(n)` — 오른쪽으로 n칸 회전 (음수면 왼쪽)
- `maxlen=N` — 최대 길이 제한 (초과 시 반대쪽 자동 제거)

**출제 범위:**
- appendleft/popleft 결과
- rotate() 결과
- maxlen 초과 시 동작

---

## Lesson 26: 자료구조 비교와 선택

**이 레슨 전까지 배운 것:**
- lesson 25까지 전체
- 리스트, 튜플, 딕셔너리, 집합, 스택, 큐, 덱 전체

**가르치는 것:**
- 시간복잡도 비교: 리스트 `in` → O(n), 딕셔너리/집합 `in` → O(1)
- 리스트 `pop(0)` → O(n), 덱 `popleft()` → O(1)
- 상황별 자료구조 선택: 검색 → dict/set, 순서 → list, 앞뒤 작업 → deque
- `from collections import Counter` — 개수 세기 특화
- `Counter({'a': 3, 'b': 2})`, `most_common(n)`

**출제 범위:**
- 상황에 맞는 자료구조 선택
- 시간복잡도 비교
- Counter 기본 사용

---

## Lesson 27: 가위바위보 게임 (Part 4 프로젝트)

**이 레슨 전까지 배운 것:** lesson 26까지 전체

**가르치는 것:**
- 리스트 + 조건문 + 반복문 종합 활용
- 승/무/패 카운터 패턴: `wins += 1`
- 연승 / 최대값 추적 로직
- `import random`, `random.choice(리스트)` — 무작위 선택

**출제 범위:**
- 리스트 인덱싱 + 조건 조합
- random.choice 활용

---

## Lesson 28: 로또 번호 생성기 (Part 4 프로젝트)

**이 레슨 전까지 배운 것:** lesson 27까지 전체 + random 기초

**가르치는 것:**
- `random.randint(1, 45)` — 범위 내 정수 난수
- 중복 없는 숫자 생성: `while len(numbers) < 6` + `in` 체크
- `sorted()` 로 정렬
- 집합 활용 중복 방지

---

## Lesson 29: 단어장 프로그램 (Part 4 프로젝트)

**이 레슨 전까지 배운 것:** lesson 28까지 전체

**가르치는 것:**
- 딕셔너리로 단어-뜻 저장
- CRUD 패턴: 추가 `vocab['apple'] = '사과'`, 검색 `if word in vocab`, 삭제 `del vocab[word]`
- `for k, v in vocab.items():` 전체 출력

---

## Lesson 30: 성적 관리 시스템 (Part 4 프로젝트)

**이 레슨 전까지 배운 것:** lesson 29까지 전체

**가르치는 것:**
- 딕셔너리 + 리스트 조합: `{'이름': '철수', '점수': [80, 90, 85]}`
- 평균 계산: `sum(scores) / len(scores)`
- 중첩 자료구조 설계 감각

---

## Lesson 31: Part 4 종합 문제

**이 레슨 전까지 배운 것:** lesson 30까지 전체

**출제 범위:** Lesson 15-30 전체 범위

---

## Lesson 32: 함수 기초 (def/return)

**이 레슨 전까지 배운 것:** lesson 31까지 전체 (자료구조, 반복문, 조건문 모두)

**가르치는 것:**
- `def 함수명():` — 함수 정의, 콜론 + 들여쓰기
- 함수 호출: `함수명()`
- `return 값` — 값 반환
- return 없는 함수 → 반환값은 `None`
- 코드 재사용 개념 (DRY)

**출제 범위:**
- def 문법 오류 찾기
- 함수 호출 후 반환값
- return 없는 함수 결과 (None)

**출제 금지:**
- 매개변수 (→ lesson 33)
- lambda (→ lesson 34)
- 기본값 매개변수 (→ lesson 33)

---

## Lesson 33: 매개변수와 반환값

**이 레슨 전까지 배운 것:**
- lesson 31까지 전체
- `def 함수명():`, `return`, None 반환

**가르치는 것:**
- 매개변수(parameter): `def greet(name):`
- 인수(argument): `greet('철수')`
- 기본값 매개변수: `def power(x, n=2):`
- 여러 반환값: `return a, b` → 튜플로 반환
- 키워드 인수: `greet(name='철수')`

**출제 범위:**
- 매개변수/인수 구분
- 기본값 매개변수 결과
- 다중 return 값 언패킹 (`a, b = func()`)
- 키워드 인수 전달 결과

---

## Lesson 34: 함수 활용 (lambda/스코프)

**이 레슨 전까지 배운 것:**
- lesson 33까지 전체
- def, return, 매개변수, 기본값, 키워드 인수, 다중 반환

**가르치는 것:**
- 지역변수 vs 전역변수 (scope)
- `global` 키워드 — 전역 변수 수정
- lambda 함수: `lambda x: x**2`
- lambda 여러 매개변수: `lambda x, y: x + y`
- `sorted(list, key=lambda x: x[1])` — 키 기준 정렬

**출제 범위:**
- 지역/전역 변수 접근 결과
- lambda 식 결과
- sorted with key 결과

**출제 금지:**
- 클로저 (안 다룸)
- 데코레이터 (안 다룸)

---

## Lesson 35: 내장함수 총정리

**이 레슨 전까지 배운 것:**
- lesson 34까지 전체
- 함수 기초, 매개변수, lambda, scope

**가르치는 것:**
- `len()`, `sum()`, `max()`, `min()`
- `abs()` — 절댓값
- `round(x, n)` — 반올림
- `sorted(list, reverse=True)` — 새 정렬 리스트 반환
- `list.sort()` — 원본 in-place 정렬
- `map(함수, iterable)` — 변환
- `filter(함수, iterable)` — 필터링
- `enumerate(list)` — (인덱스, 값) (lesson 17에서 먼저 등장, 여기서 심화)
- `zip(list1, list2)` — 병렬 순회 (lesson 17에서 먼저 등장, 여기서 심화)

**출제 범위:**
- 각 내장함수 결과
- map + lambda 조합
- filter 조건 결과
- sorted vs sort 차이

---

## Lesson 36: 함수 문제 30

**이 레슨 전까지 배운 것:** lesson 35까지 전체

**출제 범위:** Lesson 32-35 전체 범위

---

## Lesson 37: 에러 처리 (try-except)

**이 레슨 전까지 배운 것:** lesson 36까지 전체 (함수, lambda, 내장함수 포함)

**가르치는 것:**
- `try: ... except: ...` 기본 구조
- 특정 예외 처리: `except ValueError:`, `except ZeroDivisionError:`
- `except Exception as e:` — 오류 메시지 출력
- `finally:` — 항상 실행 (오류 유무 관계없이)
- `raise` — 직접 예외 발생

**출제 범위:**
- try-except 흐름 추적
- 특정 예외 발생 케이스
- finally 실행 여부

**출제 금지:**
- 커스텀 예외 클래스 (안 다룸)

---

## Lesson 38: 파일 읽고 쓰기

**이 레슨 전까지 배운 것:** lesson 37까지 전체 (try-except 포함)

**가르치는 것:**
- `open('file.txt', 'w')` — 파일 열기 (w/r/a 모드)
- `f.write('내용')`, `f.read()`
- `with open(...) as f:` — 자동 닫기 (권장 패턴)
- `f.readlines()` — 줄 단위 리스트로 읽기
- `import json`, `json.dump(data, f)`, `json.load(f)` — JSON 저장/읽기

**출제 범위:**
- with open 패턴
- 읽기/쓰기 모드 구분
- json.dump/load 흐름

---

## Lesson 39: Part 6 프로젝트 (게임 세이브 시스템)

**이 레슨 전까지 배운 것:** lesson 38까지 전체

**가르치는 것:**
- try-except + 파일 I/O 통합
- JSON 파일로 게임 상태 저장/불러오기

---

## Lesson 40: Part 6 문제 20

**이 레슨 전까지 배운 것:** lesson 39까지 전체

**출제 범위:** Lesson 37-39 전체 범위

---

## Lesson 41: 클래스 기초

**이 레슨 전까지 배운 것:** lesson 40까지 전체 (함수, 에러처리, 파일 I/O 포함)

**가르치는 것:**
- 클래스 필요성: 여러 변수 → 하나의 묶음
- `class 캐릭터:` — 클래스 정의
- `__init__(self, ...)` — 생성자 (객체 만들 때 자동 실행)
- `self` — 자기 자신 참조
- 객체 생성: `hero = 캐릭터('철수', 100)`
- 속성 접근: `hero.name`, `hero.hp`

**출제 범위:**
- `__init__` 실행 후 속성 값
- 속성 접근 결과
- 클래스 문법 오류 찾기

**출제 금지:**
- 메서드 (→ lesson 42)
- 상속 (→ lesson 42)

---

## Lesson 42: 메서드와 속성

**이 레슨 전까지 배운 것:**
- lesson 41까지 전체
- 클래스, `__init__`, `self`, 속성 접근

**가르치는 것:**
- 메서드 정의: `def attack(self):` (self 필수)
- 메서드 호출: `hero.attack()`
- 매개변수가 있는 메서드: `def take_damage(self, dmg):`
- 속성 수정: `self.hp -= dmg`
- 상속 기초: `class Warrior(캐릭터):`
- `super().__init__()` — 부모 생성자 호출

**출제 범위:**
- 메서드 호출 결과
- 속성 변경 추적
- 상속 기본 구조

---

## Lesson 43: Part 7 프로젝트 (RPG 게임)

**이 레슨 전까지 배운 것:** lesson 42까지 전체

**출제 범위:** 클래스, 메서드, 상속 종합

---

## Lesson 44: Part 7 문제 20

**이 레슨 전까지 배운 것:** lesson 43까지 전체

**출제 범위:** Lesson 41-43 전체 범위

---

## Lesson 45: 모듈 기초

**이 레슨 전까지 배운 것:** lesson 44까지 전체

**가르치는 것:**
- `import math` — 모듈 불러오기
- `from math import sqrt` — 특정 함수만
- `math.sqrt()`, `math.pi`, `math.floor()`, `math.ceil()`
- `import random`, `random.randint()`, `random.choice()`, `random.shuffle()`
- `import datetime`, `datetime.datetime.now()`
- 자신이 만든 .py 파일도 모듈로 import 가능

**출제 범위:**
- import 문법 차이 (`import x` vs `from x import y`)
- 내장 모듈 함수 결과
- math, random 함수 활용

---

## Lesson 46: 패키지와 pip

**이 레슨 전까지 배운 것:** lesson 45까지 전체 + import 기초

**가르치는 것:**
- 패키지 = 여러 모듈의 묶음
- `pip install 패키지명` — 외부 패키지 설치
- 외부 라이브러리 예시: `requests`, `pygame`, `numpy`
- `requirements.txt` 개념

**출제 범위:**
- pip 사용법 개념
- 패키지 vs 모듈 구분

---

## Lesson 47: Part 8 프로젝트 (날씨 앱)

**이 레슨 전까지 배운 것:** lesson 46까지 전체

---

## Lesson 48: Part 8 문제 20

**이 레슨 전까지 배운 것:** lesson 47까지 전체

**출제 범위:** Lesson 45-47 전체 범위

---

## Lesson 49-52: Part 9 텍스트 RPG

**이 레슨 전까지 배운 것:** lesson 48까지 전체 — 모든 개념 사용 가능

**가르치는 것:**
- 49: 게임 설계 — 클래스 구조 설계, 프로그램 아키텍처
- 50: 핵심 시스템 — 캐릭터/몬스터/아이템 클래스 구현
- 51: 게임 완성 — 상점, 세이브(json), 메인 루프 (while True + input)
- 52: 업그레이드 도전 — 크리티컬, 퀘스트, 스킬 시스템

**출제 범위:** Lesson 1-48 전체 종합

---

## 누적 학습 현황 요약

| 레슨 완료 시점 | 사용 가능한 주요 개념 |
|--------------|---------------------|
| lesson 4 (연산자) | print, type, str/int/float/bool, 변수, 산술/비교/논리 연산자 |
| lesson 8 (f-string) | + 문자열 연산, 메서드(upper/lower/strip/replace/find), sep/end, f-string |
| lesson 10 (input) | + int()/float()/bool() 변환, input() |
| lesson 14 (while) | + if/elif/else, and/or/not, for/range, while/break/continue |
| lesson 22 (슬라이싱) | + 리스트, enumerate, zip, 컴프리헨션, 2D리스트, split/join, 튜플, dict, set, 슬라이싱 |
| lesson 26 (자료구조비교) | + 스택, 큐, 덱, Counter, 시간복잡도 개념 |
| lesson 31 (Part4 종합) | + random, 프로젝트 경험 |
| lesson 35 (내장함수) | + def, return, 매개변수, 기본값, lambda, scope, abs, round, sorted, map, filter |
| lesson 40 (Part6 종합) | + try-except, 파일I/O, json |
| lesson 44 (Part7 종합) | + class, __init__, self, 메서드, 상속 |
| lesson 48 (Part8 종합) | + import, math/random/datetime, pip |
| lesson 52 (RPG 완성) | 전체 커리큘럼 완료 |

---

## ⚠️ 자주 혼동하는 것

1. **sort() vs sorted()**:
   - `list.sort()` — 원본 in-place 정렬, None 반환 → lesson 35
   - `sorted(list)` — 새 리스트 반환 → lesson 35 (lesson 28에서 먼저 등장)
2. **enumerate, zip 첫 등장**: lesson 17이지만 lesson 35에서도 다시 다룸
3. **random 첫 등장**: lesson 27 프로젝트 (공식 모듈로 lesson 45에서)
4. **2D 리스트 전용 레슨 없음**: lesson 17에 포함, quiz lessonId = 17
5. **def 첫 등장 = lesson 32**: lesson 32 이전 문제에 함수 정의 사용 금지
6. **lambda = lesson 34**: sorted(key=lambda) 패턴도 lesson 34 이후만
7. **클래스 = lesson 41**: lesson 41 이전 문제에 class 사용 금지
