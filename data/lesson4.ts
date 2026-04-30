// ============================================
// 레슨 4: 연산자
// ============================================
import { LessonData } from './types'

export const lesson4Data: LessonData = {
  id: "4",
  title: "연산자",
  emoji: "🧮",
  description: "계산하고 비교하는 연산자를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "산술 연산자",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "산술 연산자",
          content: `**연산자(operator)**는 숫자끼리 계산할 때 쓰는 기호예요.

| 연산자 | 의미 | 예시 |
|--------|------|------|
| \`+\` | 더하기 | \`10 + 3\` → 13 |
| \`-\` | 빼기 | \`10 - 3\` → 7 |
| \`*\` | 곱하기 | \`10 * 3\` → 30 |
| \`/\` | 나누기 | \`10 / 3\` → 3.333... |

\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333333333333335
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "19000 * 3 을 계산해서 출력하세요!",
          initialCode: "# 19000 * 3을 계산하세요\nprint(___)",
          expectedOutput: "57000",
          hint: "곱하기는 * 기호예요",
          hint2: "print(19000 * 3)"
        },
        {
          id: "special-explain",
          type: "explain",
          title: "🔢 몫과 나머지 — // 와 %",
          content: `초등학교 때 나눗셈 처음 배웠던 거 기억나죠?

> 🍪 **쿠키 10 개를 친구 3 명이 나눠 먹어요.** 한 명당 몇 개? 그리고 몇 개 남죠?

\`\`\`
한 명당: 3 개  ← 몫
남는 거: 1 개  ← 나머지
\`\`\`

파이썬에서도 **몫** 과 **나머지** 를 따로 구할 수 있어요.

\`\`\`python
print(10 / 3)    # 3.333...   ← 보통 나누기 (소수까지)
print(10 // 3)   # 3           ← 몫만! (슬래시 두 번)
print(10 % 3)    # 1           ← 나머지만! (퍼센트)
\`\`\`

### 정리

| 연산자 | 이름 | 예시 | 뜻 |
|---|---|---|---|
| \`/\` | 나누기 | \`10 / 3\` → 3.33... | 소수까지 나눔 |
| \`//\` | 몫 | \`10 // 3\` → 3 | 한 명당 받는 수 |
| \`%\` | 나머지 | \`10 % 3\` → 1 | 남는 수 |

### 더 많은 예시

\`\`\`python
# 사탕 7 개를 2 명에게
print(7 // 2)    # 3 — 한 명당 3 개씩
print(7 % 2)     # 1 — 한 개 남음

# 분 단위 → 시간:분
print(75 // 60)  # 1 — 1 시간
print(75 % 60)   # 15 — 15 분

# 문제집 100 페이지를 7 일에
print(100 // 7)  # 14 — 하루 14 페이지
print(100 % 7)   # 2 — 2 페이지 남음
\`\`\`

> 🎯 \`//\` = "몇 개씩 줄 수 있나?", \`%\` = "몇 개 남나?"`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 나머지",
          task: "17 을 5 로 나눈 나머지를 출력하세요!",
          initialCode: "# 17 을 5 로 나누면 몫 3, 나머지는 몇?\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "남는 수를 구하는 연산자!",
          hint2: "print(17 % 5)"
        },
        {
          id: "try-quotient",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 몫",
          task: "사탕 23 개를 4 명에게 나눠줄 때 한 명당 몇 개씩 받나요? (몫 출력)",
          initialCode: "candy = 23\npeople = 4\nprint(candy ___ people)",
          expectedOutput: "5",
          hint: "한 명당 받는 수 = 몫. 슬래시 두 번 쓰는 연산자!",
          hint2: "print(candy // people)"
        },
        {
          id: "power-explain",
          type: "explain",
          title: "🔢 거듭제곱 — 별표 두 개 (\\*\\*)",
          content: `같은 숫자를 **여러 번 곱하는** 일이 자주 있어요. 예:

> 종이 한 장을 반으로 접고, 또 접고, 또 접고... **10 번 접으면 몇 겹**?

답: 2 를 10 번 곱한 값 = **1024 겹**!

이걸 짧게 쓰는 게 **거듭제곱** — 별표를 **두 개** 붙여요.

\`\`\`python
print(2 ** 1)   # 2     ← 2 한 번
print(2 ** 2)   # 4     ← 2 × 2 (두 번)
print(2 ** 3)   # 8     ← 2 × 2 × 2 (세 번)
print(2 ** 10)  # 1024  ← 2 를 10 번 곱한 값!
\`\`\`

### 다른 숫자도

\`\`\`python
print(5 ** 2)    # 25    ← 5 × 5
print(3 ** 4)    # 81    ← 3 × 3 × 3 × 3
print(10 ** 3)   # 1000  ← 10 × 10 × 10 (1000 = 10의 세제곱)
\`\`\`

읽는 법: \`a ** b\` 는 "a 를 b 번 곱한 값". 수학의 \`a^b\` 와 같아요.

### ⚠️ 별표 한 개 vs 두 개

\`\`\`python
print(2 * 4)    # 8   ← 곱하기 (한 번만)
print(2 ** 4)   # 16  ← 거듭제곱 (네 번 곱)
\`\`\`

별 **한 개** 는 보통 곱하기. **두 개** 가 붙으면 거듭제곱. 의미 완전히 달라요!`
        },
        {
          id: "try-power",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 거듭제곱",
          task: "한 변이 6cm 인 정사각형의 넓이는? (6 의 제곱)",
          initialCode: "side = 6\n# 정사각형 넓이 = 한 변 × 한 변 (= 한 변의 제곱)\narea = side __ 2\nprint(area)",
          expectedOutput: "36",
          hint: "별표 두 개로 거듭제곱.",
          hint2: "area = side ** 2"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "2 ** 4 의 결과는?",
          options: ["6", "8", "16", "24"],
          answer: 2,
          explanation: "2 ** 4 = 2의 4승 = 2×2×2×2 = 16"
        },
        {
          id: "modulo-uses",
          type: "explain",
          title: "🎯 % 의 진짜 매력 — 홀짝 신호",
          content: `\`%\` (나머지) 가 단순 계산보다 더 중요한 이유는 **홀짝 신호** 로 자주 쓰이기 때문이에요.

\`\`\`python
print(7 % 2)    # 1 — 홀수면 1
print(8 % 2)    # 0 — 짝수면 0
\`\`\`

→ 어떤 수든 \`% 2\` 결과는 **0 (짝수) 또는 1 (홀수)** 둘 중 하나. 나중에 조건문 (lesson 11) 배우면 이걸로 짝/홀 분기 가능.

### 또 다른 활용 — 마지막 자릿수

\`\`\`python
print(1234 % 10)   # 4 — 1234 의 일의 자리
print(567 % 10)    # 7 — 567 의 일의 자리
\`\`\`

\`% 10\` = "10 으로 나눈 나머지" = "일의 자리 숫자" 가 돼요.

### N 의 배수 신호

\`\`\`python
print(15 % 3)   # 0 — 15 는 3 의 배수
print(15 % 4)   # 3 — 15 는 4 의 배수 아님
print(20 % 5)   # 0 — 20 은 5 의 배수
\`\`\`

\`% N\` 결과가 \`0\` 이면 **N 의 배수**, \`0\` 이 아니면 **배수 아님**.

> 🎯 한 줄: **% 2 는 짝/홀 신호, % N 은 N 의 배수 신호 (결과 0 = 배수).**`
        },
        {
          id: "try-modulo",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 일의 자리",
          task: "5678 을 10 으로 나눴을 때의 나머지를 출력하세요. (그게 일의 자리예요!)",
          initialCode: "# 일의 자리 숫자를 구해서 출력해보세요\nprint(5678 ___ 10)",
          expectedOutput: "8",
          hint: "10 으로 나눈 나머지를 구하는 연산자가 있어요.",
          hint2: "print(5678 % 10)"
        },
        {
          id: "operator-priority",
          type: "explain",
          title: "📐 연산자 우선순위 — 괄호 잊지 말기",
          content: `수학과 같아요. 곱셈 / 나눗셈이 덧셈 / 뺄셈보다 먼저.

\`\`\`python
print(2 + 3 * 4)      # 14 (곱셈 먼저)
print((2 + 3) * 4)    # 20 (괄호 먼저)
print(10 - 6 / 2)     # 7.0  (나눗셈 먼저)
print((10 - 6) / 2)   # 2.0
\`\`\`

### 우선순위 표 (높음 → 낮음)

1. \`( )\` — 괄호 (가장 우선)
2. \`**\` — 거듭제곱
3. \`*\`, \`/\`, \`//\`, \`%\` — 곱셈/나눗셈류
4. \`+\`, \`-\` — 덧셈/뺄셈
5. \`<\`, \`>\`, \`==\` 등 — 비교
6. \`not\`
7. \`and\`
8. \`or\` — 가장 늦게

> 💡 **헷갈리면 괄호 친절히 써요.** 컴퓨터한테도 사람한테도 명확.

\`\`\`python
# 헷갈림 ❌
x = a + b * c < 100

# 명확 ✅
x = (a + (b * c)) < 100
\`\`\``
        }
      ]
    },
    {
      id: "ch2",
      title: "비교 연산자",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ 두 값을 비교해보자!",
          content: `프로그램은 항상 **결정** 을 해야 해요:

> 🎮 "체력이 0 보다 큰가? → 살아있다"
> 🛒 "가격이 5000 원 이하인가? → 살 수 있다"
> 📝 "점수가 80 이상인가? → A 등급"

이런 **비교** 의 결과는 항상 두 가지 — **True** (참, 맞다) 또는 **False** (거짓, 아니다).

### 비교 연산자 4 가지

| 기호 | 뜻 | 예시 |
|---|---|---|
| \`>\` | 크다 | \`10 > 5\` → True |
| \`<\` | 작다 | \`10 < 5\` → False |
| \`>=\` | 크거나 같다 (이상) | \`10 >= 10\` → True |
| \`<=\` | 작거나 같다 (이하) | \`10 <= 5\` → False |

### 직접 봐요

\`\`\`python
print(10 > 5)     # True   ← 10 이 5 보다 크니까
print(3 > 7)      # False  ← 3 은 7 보다 작으니까
print(10 >= 10)   # True   ← 같은 것도 '이상' 에 들어감
print(10 > 10)    # False  ← '크다' 는 같은 건 안 됨
\`\`\`

### 💡 \`>=\` 와 \`>\` 차이

- \`>=\` (이상): "**같거나** 더 큰" — 같은 것 OK
- \`>\` (초과): "**더 큰**" — 같은 것 X

비슷하지만 같은 값일 때 결과가 달라요.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "100 > 50 의 결과를 출력하세요!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "> 는 '크다'를 비교해요",
          hint2: "print(100 > 50)"
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 같다 / 다르다 — \\=\\= 와 !=",
          content: `"두 값이 **같은지** / **다른지**" 도 자주 검사해요:

> 🔑 "비밀번호가 1234 와 같은가?"
> 🎲 "주사위 결과가 6 인가?"
> 🚪 "정답이 'apple' 과 같은가?"

\`\`\`python
print(10 == 10)   # True   ← 같다
print(10 == 5)    # False  ← 같지 않다
print(10 != 5)    # True   ← 다르다
print(10 != 10)   # False  ← 다르지 않다 (같음)
\`\`\`

### ⚠️ 가장 헷갈리는 함정 — \\= 한 개 vs \\=\\= 두 개

| 기호 | 뜻 |
|---|---|
| \`=\` | **저장** — 변수에 값 넣기 (\`x = 10\`) |
| \`==\` | **비교** — 두 값이 같은지 묻기 (\`x == 10\`) |

\`\`\`python
x = 10        # 저장 — x 라는 상자에 10 을 넣어요
print(x == 10)   # 비교 — x 가 10 과 같은가? → True
\`\`\`

**규칙: 등호 한 개는 "넣기", 두 개는 "묻기".** 외워두면 편해요!

### 문자열도 비교 가능

\`\`\`python
print("apple" == "apple")  # True
print("apple" == "Apple")  # False — 대문자 / 소문자 다름
print("hi" != "bye")       # True — 다름
\`\`\``
        },
        {
          id: "try-equal",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 같은가?",
          task: "비밀번호 입력값이 '1234' 와 같은지 검사해서 True/False 출력!",
          initialCode: "input_pw = '1234'\nresult = input_pw __ '1234'\nprint(result)",
          expectedOutput: "True",
          hint: "'같다' 비교는 등호 두 개.",
          hint2: "result = input_pw == '1234'"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`x = 10` 과 `x == 10` 의 차이는?",
          options: [
            "둘 다 같다",
            "= 는 저장, == 는 비교",
            "= 는 비교, == 는 저장",
            "둘 다 에러"
          ],
          answer: 1,
          explanation: "= 는 값을 저장, == 는 두 값이 같은지 비교!"
        },
        {
          id: "chained-compare",
          type: "explain",
          title: "📌 참고 — 비교 연쇄",
          content: `수학 시간의 부등식 \`0 < x < 10\` 처럼 **파이썬은 비교를 한 줄에 연쇄** 할 수 있어요.

\`\`\`python
x = 5
print(0 < x < 10)   # True — 수학 부등식 그대로
\`\`\`

> 🎯 "점수가 70~90 인가?" 같은 **범위 검사** 에 자주 쓰여요.

⚠️ 지금 단계에선 **있다는 것만** 알아두면 OK. 자세한 사용은 **lesson 11 (조건문)** 에서 \`if\` 와 함께 자연스럽게 배워요.`
        },
        {
          id: "try-chained",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 점수 비교",
          task: "점수가 60 점 이상인지, 정확히 100 점인지 두 가지를 비교해 True/False 를 출력하세요!",
          initialCode: "score = 75\npass_check = score __ 60\nperfect = score __ 100\nprint('합격선?', pass_check)\nprint('만점?', perfect)",
          expectedOutput: "합격선? True\n만점? False",
          hint: "첫 줄은 '이상', 둘째 줄은 '같다' — 두 비교 연산자.",
          hint2: "pass_check = score >= 60\nperfect = score == 100"
        }
      ]
    },
    {
      id: "ch3",
      title: "논리 연산자",
      emoji: "🔗",
      steps: [
        {
          id: "logic-explain",
          type: "explain",
          title: "🔗 조건 합치기 — and, or, not",
          content: `엄마가 시키시는 말 잘 들어보세요. 똑같이 두 사람 이름이 나와도 **느낌이 다르죠**?

### 👫 "민수 그리고 영희, 손 닦고 와!"

민수 한 명만 닦으면 안 돼요. **둘 다** 닦아야 해요.

→ 이게 **and** (그리고): **둘 다** 만족해야 True.

\`\`\`python
민수_손닦음 = True
영희_손닦음 = False

print(민수_손닦음 and 영희_손닦음)   # False ← 영희 안 닦았으니
\`\`\`

### 👬 "민수 또는 영희, 문 닫아줘!"

누가 닫아도 돼요. **한 명만** 닫으면 끝.

→ 이게 **or** (또는): **하나라도** 만족하면 True.

\`\`\`python
민수_문닫음 = False
영희_문닫음 = True

print(민수_문닫음 or 영희_문닫음)    # True ← 영희가 닫았으니 OK
\`\`\`

### 🚫 not — 반대로 뒤집기

\`\`\`python
print(not True)    # False  ← True 의 반대
print(not False)   # True   ← False 의 반대

is_open = False
print(not is_open)   # True ← '닫혀있다' 의 반대 = '열려있지 않다'
\`\`\`

### 정리표

| | True and True | True and False | False and False |
|---|---|---|---|
| **and** (그리고) | True | False | False |
| **or** (또는) | True | True | False |

> 🎯 **and** = 둘 다 만족해야 / **or** = 하나라도 만족하면 / **not** = 반대로

### 더 많은 일상 예시

\`\`\`python
age = 15
height = 140

# 놀이기구: 13 살 이상 그리고 130cm 이상 (둘 다)
print(age >= 13 and height >= 130)   # True

# 휴일: 토 또는 일 (한 가지만)
day = "토"
print(day == "토" or day == "일")    # True

# 산책: 어둡지 않으면 (반대)
is_dark = False
print(not is_dark)                    # True
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "(10 > 5) and (3 < 7) 의 결과를 출력하세요!",
          initialCode: "print((10 > 5) ___ (3 < 7))",
          expectedOutput: "True",
          hint: "둘 다 True면 and 결과도 True!",
          hint2: "print((10 > 5) and (3 < 7))"
        },
        {
          id: "is-not-explain",
          type: "explain",
          title: "🔎 \`is\`, \`is not\`, \`not\` — 또 다른 비교",
          content: `### \`is\` / \`is not\` — '같은 것인가?' 검사

\`==\` 가 **값이 같은지** 묻는다면, \`is\` 는 **완전히 같은 것인지** (같은 자리에 있는 그것인지) 검사해요.

가장 자주 쓰는 곳: **\`None\` 인지 확인할 때**.

\`\`\`python
x = None

print(x is None)        # True   ← 'x 가 None 이다' 검사 — 권장
print(x is not None)    # False  ← 반대 — 'x 가 None 이 아니다'

print(x == None)        # True 도 됨 — 다만 is 가 더 정확
\`\`\`

> 💡 **\`x is None\`** 가 파이썬 권장 스타일. \`== None\` 도 동작은 하지만 \`is None\` 이 더 명확.

### \`not\` — 앞에 붙여서 뒤집기

\`not\` 은 한 값 **앞에** 붙어서 True/False 를 뒤집어요.

\`\`\`python
print(not True)         # False
print(not False)        # True
print(not (5 > 3))      # False  ← 5 > 3 = True 의 반대
\`\`\`

### \`not in\` — 미리보기 (lesson 5+ 에서 자세히)

문자열, 리스트 안에 **없는지** 검사. (in 의 반대)

\`\`\`python
print('a' not in 'hello')   # True   ← 'a' 없음
print(7 not in [1, 2, 3])   # True   ← 7 없음
\`\`\`

> 🎯 정리: **is = '그 자체인가?', not = '반대', not in = 'in 의 반대'.**`
        },
        {
          id: "try-is-not",
          type: "tryit",
          title: "🖥️ 직접 해보기 — None 검사 + 뒤집기",
          task: "name 이 None 인지 검사하고, 그 결과를 뒤집어 출력하세요!",
          initialCode: "name = None\ncheck = name __ None\nopposite = __ check\nprint('None?', check)\nprint('아님?', opposite)",
          expectedOutput: "None? True\n아님? False",
          hint: "첫 줄은 None 검사 — == 보다 권장되는 두 글자. 둘째 줄은 뒤집기 — 한 단어.",
          hint2: "check = name is None\nopposite = not check"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "True or False 의 결과는?",
          options: ["True", "False", "에러", "TrueFalse"],
          answer: 0,
          explanation: "or는 하나만 True여도 True!"
        },
        {
          id: "logic-real",
          type: "explain",
          title: "🎯 and / or 실전 — 조건 합치기",
          content: `\`and\` / \`or\` 는 단독 \`True/False\` 보다 **두 조건 합칠 때** 진가가 나와요.

### 두 조건 모두 만족? — and

\`\`\`python
age = 16
has_id = True

# age >= 18 (False) AND has_id (True) = False
print(age >= 18 and has_id)   # False
\`\`\`

### 하나라도 만족? — or

\`\`\`python
day = "토"

# 토요일 OR 일요일 — 하나만 맞아도 True
print(day == "토" or day == "일")   # True
\`\`\`

### 반대로 뒤집기 — not

\`\`\`python
is_open = False
print(not is_open)   # True — False 의 반대
\`\`\`

### 진리표

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

> 💡 **and** = "둘 다", **or** = "하나라도", **not** = "반대".

(나중에 조건문 — lesson 11 — 에서 이 결과들을 if 와 함께 쓰는 법 배워요.)`
        },
        {
          id: "try-logic-real",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 두 조건 동시에",
          task: "점수 60 이상 **그리고** 출석 80% 이상인지 한 줄로 검사해서 True/False 출력!",
          initialCode: "score = 75\nattendance = 85   # 출석률 %\n\n# 두 조건 동시에 만족하는지 한 줄에\nresult = score >= 60 ___ attendance >= 80\n\nprint(result)",
          expectedOutput: "True",
          hint: "둘 다 만족 = and",
          hint2: "result = score >= 60 and attendance >= 80"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "compound-explain",
          type: "explain",
          title: "📝 복합 대입 연산자",
          content: `변수 값을 바꿀 때 더 짧게 쓸 수 있어요!

\`\`\`python
score = 100
score = score + 10  # 긴 방법
score += 10         # 짧은 방법 (같은 의미!)
\`\`\`

\`+=\`, \`-=\`, \`*=\`, \`/=\` 등 사용 가능!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "hp = 100에서 hp -= 30 후 출력하세요!",
          initialCode: "hp = 100\nhp ___ 30\nprint(hp)",
          expectedOutput: "70",
          hint: "-= 는 빼고 저장해요",
          hint2: "hp = 100\nhp -= 30\nprint(hp)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 미션 1 — 가격 계산기",
          task: "가격 계산기를 완성하세요! (단가 15000원, 3개, 10% 할인)",
          initialCode: "price = 15000\ncount = 3\n# 합계를 계산하세요\ntotal = ___\n# 10% 할인 계산\ndiscount = ___\n# 최종 가격\nfinal = ___\n\nprint('단가:', price, '원')\nprint('수량:', count, '개')\nprint('합계:', total, '원')\nprint('할인:', discount, '원')\nprint('최종:', final, '원')",
          expectedOutput: "단가: 15000 원\n수량: 3 개\n합계: 45000 원\n할인: 4500.0 원\n최종: 40500.0 원",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — BMI 계산",
          task: "몸무게 60kg, 키 1.65m 의 BMI 를 거듭제곱 연산자로 계산하세요. (BMI = 몸무게 / 키²)",
          initialCode: "weight = 60      # kg\nheight = 1.65    # m\n\n# 거듭제곱 (별표 두 개) 으로 키² 계산\nbmi = weight / (height ___ 2)\n\nprint(\"BMI:\", round(bmi, 1))",
          expectedOutput: "BMI: 22.0",
          hint: "height ** 2 거듭제곱.",
          hint2: "bmi = weight / (height ** 2)"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 초를 시간/분/초로 분해",
          task: "5425 초를 시간/분/초 단위로 분해해 각각 출력하세요. (// 와 % 활용)",
          initialCode: "total_sec = 5425\n\n# // 와 % 사용\nhours = total_sec ___ 3600        # 시간 (몫)\nminutes = (total_sec % 3600) ___ 60   # 남은 초 → 분 (몫)\nseconds = total_sec ___ 60        # 마지막 초 (나머지)\n\nprint(\"시:\", hours)\nprint(\"분:\", minutes)\nprint(\"초:\", seconds)",
          expectedOutput: "시: 1\n분: 30\n초: 25",
          hint: "1 시간 = 3600 초. // 로 몫, % 로 나머지.",
          hint2: "hours = total_sec // 3600\nminutes = (total_sec % 3600) // 60\nseconds = total_sec % 60"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **산술 연산자**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\` (몫), \`%\` (나머지), \`**\` (거듭제곱)
✅ \`%\` 의 진짜 매력 — 홀짝 검사 / N 의 배수 / 시계 순환 / 마지막 자릿수
✅ **연산자 우선순위** — 헷갈리면 괄호 친절히
✅ **비교 연산자**: \`>\`, \`<\`, \`>=\`, \`<=\`, \`==\`, \`!=\`
✅ **\`=\` vs \`==\`** — 저장 vs 비교
✅ **비교 연쇄** — \`0 < x < 10\` 수학처럼
✅ **논리 연산자**: \`and\` (둘 다), \`or\` (하나라도), \`not\` (반대)
✅ **복합 대입**: \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`//=\`, \`%=\`, \`**=\`

다음 시간에는 **문자열 연산** 을 배워서 글자를 더하고 곱해봐요! 🚀`
        }
      ]
    }
  ]
}
