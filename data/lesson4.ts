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
          title: "🔢 특별한 연산자 — //, %, **",
          content: `\`+ - * /\` 외에도 자주 쓰는 연산자가 **3 가지** 더 있어요.

### 나누기와 짝꿍 — 몫과 나머지

\`/\` 가 나눗셈 결과를 그대로 주는 거라면, 그걸 **몫** 과 **나머지** 로 나눠 받는 도구가 따로 있어요.

\`\`\`python
print(10 / 3)   # 3.333...   ← 보통 나누기 (소수)
print(10 // 3)  # 3           ← 몫만 (// 두 번)
print(10 % 3)   # 1           ← 나머지만 (%)
\`\`\`

10 ÷ 3 = 3 …나머지 1.
- 슬래시 두 번 \`//\` 가 그 "3" (몫)
- 퍼센트 \`%\` 가 그 "1" (나머지)

### 거듭제곱 (별표 두 개)

수학의 **승 (제곱)** 을 표현하는 도구. 별표를 두 개 붙여 써요.

\`\`\`python
print(2 ** 3)   # 8     ← 2 × 2 × 2
print(2 ** 4)   # 16    ← 2 × 2 × 2 × 2
print(5 ** 2)   # 25    ← 5 × 5
print(10 ** 3)  # 1000  ← 10 × 10 × 10
\`\`\`

읽는 법: \`2 ** 3\` 은 "이를 세 번 곱한 값" — 즉 \`2 × 2 × 2 = 8\`.

> 🎯 한 줄: 별표 **두 개** 를 붙이면 거듭제곱. 왼쪽 수를 오른쪽 수만큼 곱한 값.

⚠️ 별표 **한 개** 는 곱하기, **두 개** 는 거듭제곱. 헷갈리기 쉬워요!

\`\`\`python
2 * 4    # 8   ← 곱하기 (한 번)
2 ** 4   # 16  ← 거듭제곱 (네 번 곱)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "17을 5로 나눈 나머지를 출력하세요!",
          initialCode: "# 나눗셈 결과의 나머지를 구하는 연산자를 떠올려봐!\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "나머지는 % 기호예요",
          hint2: "print(17 % 5)"
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
          title: "🎯 % 의 진짜 매력 — 홀짝 검사",
          content: `\`%\` (나머지) 가 단순 계산보다 더 중요한 이유는 **홀짝 검사** 의 단골이기 때문이에요.

\`\`\`python
n = 7
print(n % 2)    # 1 — 홀수면 1
print(8 % 2)    # 0 — 짝수면 0
\`\`\`

### 다양한 활용

\`\`\`python
# 홀짝 판별
n = 13
if n % 2 == 0:
    print("짝수")
else:
    print("홀수")
# → 홀수

# 3 의 배수?
if n % 3 == 0:
    print("3 의 배수")

# 마지막 자릿수
n = 1234
last_digit = n % 10   # 4
\`\`\`

> 🎯 한 줄: **\`% 2\` 는 짝/홀 검사, \`% N\` 은 N 의 배수인지 검사.**`
        },
        {
          id: "try-modulo",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 홀짝 카운트",
          task: "1~10 까지 숫자 중 짝수가 몇 개인지 출력하세요!",
          initialCode: "count = 0\nfor n in range(1, 11):\n    if n ___ 2 == 0:\n        count += 1\n\nprint(f\"짝수 개수: {count}\")",
          expectedOutput: "짝수 개수: 5",
          hint: "n % 2 == 0 이 짝수 검사.",
          hint2: "if n % 2 == 0:"
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
          title: "⚖️ 비교하기",
          content: `두 값을 비교하면 **True** 또는 **False**가 나와요!

\`\`\`python
print(10 > 5)    # 크다 → True
print(10 < 5)    # 작다 → False
print(10 >= 10)  # 크거나 같다 → True
print(10 <= 5)   # 작거나 같다 → False
\`\`\``
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
          title: "🟰 같다 / 다르다",
          content: `**같다**는 \`==\` (등호 2개!)
**다르다**는 \`!=\`

\`\`\`python
print(10 == 10)  # 같다 → True
print(10 == 5)   # 같다 → False
print(10 != 5)   # 다르다 → True
\`\`\`

⚠️ \`=\`는 저장, \`==\`는 비교!`
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
          title: "🔗 비교 연쇄 — 1 < x < 10 (수학처럼!)",
          content: `다른 언어는 \`x > 0 && x < 10\` 처럼 두 번 써야 하지만, **파이썬은 수학처럼 연쇄 가능**.

\`\`\`python
x = 5

# 길게
print(0 < x and x < 10)   # True

# 파이썬 식 — 수학과 똑같이
print(0 < x < 10)         # True

# 다른 비교도 가능
print(0 <= x < 10)        # True
print(1 < x < 10 < 100)   # True (3 단)
\`\`\`

### 활용 — 점수 등급

\`\`\`python
score = 85

if 90 <= score <= 100:
    grade = "A"
elif 80 <= score < 90:
    grade = "B"
elif 70 <= score < 80:
    grade = "C"
else:
    grade = "F"

print(grade)   # B
\`\`\`

읽기에도 자연스럽고 코드도 짧아져요. 파이썬 의 멋있는 기능 중 하나.`
        },
        {
          id: "try-chained",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 비교 연쇄",
          task: "나이가 13~19 (10대) 인지 한 줄에 검사하세요!",
          initialCode: "age = 16\n\n# 13 이상 19 이하 (연쇄 비교!)\nis_teen = ___ <= age <= ___\n\nprint(f\"10대? {is_teen}\")",
          expectedOutput: "10대? True",
          hint: "13 <= age <= 19",
          hint2: "is_teen = 13 <= age <= 19"
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
          title: "🔗 and, or, not",
          content: `여러 조건을 합칠 수 있어요!

\`\`\`python
# and: 둘 다 True여야 True
print(True and True)   # True
print(True and False)  # False

# or: 하나만 True면 True
print(True or False)   # True

# not: 반대로
print(not True)        # False
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

\`\`\`python
age = 16
has_id = True

# 둘 다 만족해야
if age >= 18 and has_id:
    print("입장 가능")
else:
    print("입장 불가")

# 하나라도 만족하면
day = "토"
if day == "토" or day == "일":
    print("주말!")
\`\`\`

### not 으로 뒤집기

\`\`\`python
is_open = False
if not is_open:
    print("닫혀있음")
\`\`\`

### 진리표

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

> 💡 **and** = "둘 다", **or** = "하나라도", **not** = "반대".`
        },
        {
          id: "try-logic-real",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 합격 조건 두 가지",
          task: "점수 60 이상 **그리고** 출석 80% 이상이면 '합격', 아니면 '불합격' 출력!",
          initialCode: "score = 75\nattendance = 85   # 출석률 %\n\n# 두 조건 다 만족\nif score >= 60 ___ attendance >= 80:\n    print(\"합격\")\nelse:\n    print(\"불합격\")",
          expectedOutput: "합격",
          hint: "둘 다 만족 = and",
          hint2: "if score >= 60 and attendance >= 80:"
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
          initialCode: "price = 15000\ncount = 3\n# 합계를 계산하세요\ntotal = ___\n# 10% 할인 계산\ndiscount = ___\n# 최종 가격\nfinal = ___\n\nprint(f'단가: {price}원')\nprint(f'수량: {count}개')\nprint(f'합계: {total}원')\nprint(f'할인: {discount}원')\nprint(f'최종: {final}원')",
          expectedOutput: "단가: 15000원\n수량: 3개\n합계: 45000원\n할인: 4500.0원\n최종: 40500.0원",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — BMI 계산 + 등급 판정",
          task: "BMI = 몸무게(kg) / (키(m))² 계산하고 비교 연쇄로 등급 출력. (입력은 stdin)",
          initialCode: "weight = float(input(\"몸무게(kg): \"))\nheight = float(input(\"키(m): \"))\n\n# BMI 계산 (** 거듭제곱 활용)\nbmi = weight / (height ___ 2)\n\n# 비교 연쇄로 등급\nif bmi < 18.5:\n    grade = \"저체중\"\nelif ___ <= bmi < 25:\n    grade = \"정상\"\nelif 25 <= bmi < 30:\n    grade = \"과체중\"\nelse:\n    grade = \"비만\"\n\nprint(f\"BMI: {bmi:.1f}\")\nprint(f\"등급: {grade}\")",
          expectedOutput: "BMI: 22.0\n등급: 정상",
          stdin: "60\n1.65",
          hint: "height ** 2 거듭제곱. 18.5 <= bmi < 25 비교 연쇄.",
          hint2: "bmi = weight / (height ** 2)\nelif 18.5 <= bmi < 25:"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 시간 변환 (초 → 시:분:초)",
          task: "초 단위 시간을 받아 'HH:MM:SS' 형식으로 출력하세요. (// 와 % 활용)",
          initialCode: "total_sec = int(input())\n\n# // 와 % 사용\nhours = total_sec ___ 3600\nminutes = (total_sec % 3600) ___ 60\nseconds = total_sec ___ 60\n\nprint(f\"{hours:02d}:{minutes:02d}:{seconds:02d}\")",
          expectedOutput: "01:30:25",
          stdin: "5425",
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
