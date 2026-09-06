// ============================================
// 레슨 34: 함수 활용
// Part 5: 함수 - 기초
// ============================================

import { LessonData } from './types'

export const lesson34Data: LessonData = {
  id: "34",
  title: "함수 활용",
  emoji: "⚡",
  description: "지역변수, 전역변수, 람다 함수를 배워요!",
  chapters: [
    // ============================================
    // Chapter 1: 지역변수 vs 전역변수
    // ============================================
    {
      id: "ch1",
      title: "지역변수 vs 전역변수",
      emoji: "🏠",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 함수 안에서 만든 변수, 밖에서도 쓸 수 있을까?",
          content: `💭 함수 안에서 \`x = 10\` 이라고 만들면, **함수 밖에서도** 그 x를 쓸 수 있을까? 아니면 함수 안에서만?

**비유로 생각해보면:**
- **전역변수** = 집 거실에 있는 물건 (가족 모두 사용 가능) 🏠
- **지역변수** = 내 방에 있는 물건 (나만 사용 가능) 🚪

@핵심: 변수가 **어디서 쓰일 수 있는지** = 변수의 **범위**! 함수 안/밖에서 다르게 동작해.`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "🚪 지역변수 — 함수 안에서만!",
          content: `💭 함수 안에서 만든 변수는 **내 방 물건**처럼 함수 안에서만 쓸 수 있어. 밖에서 부르면 어떻게 될까?

\`\`\`python
def 함수():
    x = 10    # 지역변수 (함수 안 물건)
    print(x)  # 10 - 함수 안에서는 OK ✅

함수()
print(x)      # ❌ 에러! 함수 밖에서는 모르는 변수
\`\`\`

함수가 끝나면 지역변수는 **사라져요!** 다음에 부르면 새로 만들어져요.

@핵심: 함수 안에서 만든 변수 = **지역변수** = 함수 안에서만! 밖에서는 에러!`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "🌍 전역변수 — 어디서든 읽기 OK!",
          content: `💭 그럼 반대로 **함수 밖에서** 만든 변수는? 함수 안에서도 읽을 수 있을까?

\`\`\`python
x = 10        # 전역변수 (거실 물건)

def 함수():
    print(x)  # 10 - 함수 안에서도 읽기 OK ✅

함수()
print(x)      # 10 - 함수 밖에서도 OK ✅
\`\`\`

전역변수는 프로그램 **어디서든** 읽을 수 있어요!

@핵심: 함수 밖에서 만든 변수 = **전역변수** = 모든 함수가 읽을 수 있다!`
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "지역변수 vs 전역변수",
          content: `다음 코드의 출력 결과는?
\`\`\`python
x = 5

def 함수():
    x = 10
    print(x)

함수()
print(x)
\`\`\``,
          options: [
            "10\n10",
            "5\n5",
            "10\n5",
            "5\n10"
          ],
          answer: 2,
          explanation: "함수 안의 x는 지역변수(10), 바깥의 x는 전역변수(5)! 서로 다른 변수예요."
        },
        {
          id: "ch1-5",
          type: "tryit",
          title: "직접 확인하기",
          task: "지역변수와 전역변수의 차이를 확인해보세요",
          initialCode: `x = 5        # 전역변수

def 함수():
    x = 10   # 지역변수 (새로 만들어짐!)
    print(f'함수 안: {x}')

___          # 함수를 불러요
print(f'함수 밖: {___}')   # 밖의 x 는 몇일까요?`,
          expectedOutput: "함수 안: 10\n함수 밖: 5",
          hint: "첫 빈칸은 함수를 부르는 줄, 둘째 빈칸은 밖에 있는 변수 이름이에요",
          hint2: "함수() / x"
        },
        {
          id: "ch1-6",
          type: "explain",
          title: "💭 함수 안에서 전역변수를 바꿀 수 있을까?",
          content: `💭 함수 안에서 전역변수를 **바꾸려고** 하면? 그냥 \`x = 20\`이라고 쓰면 될까?

\`\`\`python
x = 10

def 함수():
    global x    # 👈 "전역변수 x를 쓸 거야!" 선언
    x = 20

함수()
print(x)    # 20 (바뀜!)
\`\`\`

\`global\` 키워드로 "이건 전역변수야!"라고 알려줘야 해요.

🚨 **주의!** \`global\`은 **가급적 쓰지 마세요!** 코드가 복잡해져요. 대신 \`return\`을 써서 결과를 돌려받는 게 좋아요.

@핵심: 함수 안에서 전역변수를 **수정**하려면 \`global x\` 선언이 필요. 하지만 \`return\`이 더 깔끔!`
        }
      ]
    },
    // ============================================
    // Chapter 2: 람다 함수
    // ============================================
    {
      id: "ch2",
      title: "람다 함수 (Lambda)",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "💭 def 3줄 쓰기 귀찮은데... 한 줄로 안 될까?",
          content: `💭 간단한 함수인데도 \`def\` 3줄, \`return\` 한 줄... 너무 길어! **한 줄짜리 함수**는 없을까?

**람다(lambda) = 한 줄 함수!** ⚡

\`\`\`python
# 일반 함수 (3줄)
def 더하기(a, b):
    return a + b

# 람다 함수 (1줄!)
더하기2 = lambda a, b: a + b

# 둘 다 같은 결과!
print(더하기(3, 5))     # 8
print(더하기2(3, 5))    # 8
\`\`\`

@핵심: 람다는 **이름 붙은 한 줄 함수!** def 없이, return 없이 짧게 쓸 때 편해.`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "📝 람다 모양 분석",
          content: `💭 람다는 어떻게 생겼지? 이 모양만 외우면 끝!

\`\`\`python
lambda 매개변수: 반환값
\`\`\`

- \`lambda\` = "한 줄 함수 시작!"
- 콜론(\`:\`) 뒤가 **돌려주는 값** (return 안 써도 됨!)

**예시:**
\`\`\`python
제곱 = lambda x: x ** 2
print(제곱(5))    # 25

홀수 = lambda x: x % 2 == 1
print(홀수(7))    # True
\`\`\`

@핵심: \`lambda 매개변수: 반환값\` — 콜론 뒤가 결과! return 안 써도 자동으로 돌려줘.`
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "람다 함수 만들기",
          task: "람다 함수를 실행해보세요",
          initialCode: `# 제곱 함수 — x 를 두 번 곱해요
제곱 = lambda x: ___
print(제곱(5))

# 홀수 판별 — 2 로 나눈 나머지가 1 이면 홀수
홀수 = lambda x: ___
print(홀수(7))
print(홀수(4))`,
          expectedOutput: "25\nTrue\nFalse",
          hint: "5² = 25, 7은 홀수(True), 4는 짝수(False)",
          hint2: "x ** 2 / x % 2 == 1"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "람다 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
double = lambda x: x * 2
print(double(7))
\`\`\``,
          options: [
            "7",
            "14",
            "72",
            "에러 발생"
          ],
          answer: 1,
          explanation: "lambda x: x * 2는 x를 2배로 만들어요. 7 × 2 = 14"
        },
        {
          id: "ch2-5",
          type: "mission",
          title: "람다로 3배 함수",
          task: "숫자를 3배로 만드는 람다 함수 triple을 완성하세요",
          initialCode: `triple = lambda x: # 여기에 코드 작성

print(triple(5))
print(triple(10))`,
          expectedOutput: "15\n30",
          hint: "x를 3배로 만드려면?",
          hint2: "곱하기 연산자 *를 사용하세요"
        }
      ]
    },
    // ============================================
    // Chapter 3: sorted()와 람다
    // ============================================
    {
      /* 2026-09-06: 옛 ch3(sorted + key=lambda)는 레슨35와 중복이라 뺐다.
         그러자 ch2 에서 배운 람다를 레슨34 안에서 **써먹는 자리**가 없어졌다 —
         문법만 배우고 왜 배웠는지는 안 나온 채 ch4 로 넘어갔다.
         그 자리를 이 챕터가 채운다. sorted·map·filter 같은 내장 함수는
         일부러 안 쓴다 (그건 레슨35 몫). 여기선 **직접 만든 함수**에
         람다를 건네준다. 스텝 id 에 b 를 붙인 건 옛 ch3-1~5 를 이미
         완료 처리한 학생이 새 내용을 '한 것'으로 보게 되는 걸 막으려고. */
      id: "ch3",
      title: "함수를 재료로 건네주기",
      emoji: "🎁",
      steps: [
        {
          id: "ch3-1b",
          type: "explain",
          title: "💭 두 함수가 딱 한 줄만 달라요",
          content: `💭 아래 두 함수를 봐요. 거의 똑같은데... 어디가 다른지 찾았나요?

\`\`\`python
def 두배_전부(숫자들):
    결과 = []
    for n in 숫자들:
        결과.append(n * 2)
    return 결과

def 제곱_전부(숫자들):
    결과 = []
    for n in 숫자들:
        결과.append(n ** 2)
    return 결과
\`\`\`

다른 건 딱 **한 줄** — \`n * 2\` 냐 \`n ** 2\` 냐. 나머지 네 줄은 글자 하나까지 똑같아요.

ch1 에서 본 그 신호가 또 나왔어요: **같은 코드를 두 번 썼다.** 상자에 담을 때가 된 거죠.

그런데 이번엔 좀 달라요. 지금까지 구멍(매개변수)에 넣던 건 \`축하("철수")\` 처럼 **숫자나 글자** 였어요. 여기서 매번 달라지는 건 재료가 아니라 **하는 일** 이에요.

> 💭 하는 일도 구멍에 넣을 수 있을까요? 다음 칸에서 직접 봐요.

@핵심: 두 함수가 '하는 일' 한 줄만 다르다면, **그 하는 일**을 재료로 받으면 돼!`
        },
        {
          id: "ch3-2b",
          type: "interactive",
          title: "규칙을 갈아 끼워 봐요",
          description: "규칙 카드를 바꿔 끼우면 결과가 어떻게 달라질까요?",
          component: "pyRuleSwapper"
        },
        {
          id: "ch3-3b",
          type: "interactive",
          title: "따라 써보기: 규칙을 건네주기",
          description: "방금 본 코드를 그대로 따라 써봐요!",
          component: "typeAlong",
          targetCode: `def 전부(숫자들, 규칙):
    결과 = []
    for n in 숫자들:
        결과.append(규칙(n))
    return 결과

print(전부([1, 2, 3], lambda n: n * 2))`,
          expectedOutput: "[2, 4, 6]"
        },
        {
          id: "ch3-4b",
          type: "tryit",
          title: "빈칸 채우기: 규칙 자리",
          task: "규칙을 부르는 자리와 건네주는 자리를 채워보세요",
          initialCode: `def 전부(숫자들, 규칙):
    결과 = []
    for n in 숫자들:
        결과.append(___)      # 규칙에 n 을 넣어 부르기
    return 결과

# 세 배로 만드는 규칙을 건네주세요
print(전부([1, 2, 3], ___))`,
          expectedOutput: "[3, 6, 9]",
          hint: "첫 빈칸은 규칙을 부르는 자리, 둘째 빈칸은 lambda 로 시작하는 한 줄이에요",
          hint2: "규칙(n) / lambda n: n * 3"
        },
        {
          id: "ch3-5b",
          type: "mission",
          title: "🎯 처음부터 만들어보기",
          description: "빈칸 없이, 처음부터 직접 써봐요!",
          task: "규칙을 재료로 받아 두 수에 적용하는 계산 함수를 만들고, 더하는 규칙과 곱하는 규칙을 각각 건네주세요.",
          initialCode: `# 여기에 처음부터 직접 써보세요!
# 3 과 5 를 더하는 규칙  → 8
# 3 과 5 를 곱하는 규칙  → 15


`,
          expectedOutput: "8\n15",
          hint: "재료를 셋 받는 함수를 만들어요 — 두 수, 그리고 규칙. 안에서 규칙을 부르면 돼요.",
          hint2: `def 계산(a, b, 규칙):\n    return 규칙(a, b)\n\nprint(계산(3, 5, lambda x, y: x + y))\nprint(계산(3, 5, lambda x, y: x * y))`
        },
        {
          id: "ch3-6b",
          type: "quiz",
          title: "확인 퀴즈",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 적용(값, 규칙):
    return 규칙(값)

print(적용(4, lambda x: x + 10))
\`\`\``,
          options: [
            "4",
            "10",
            "14",
            "에러 발생"
          ],
          answer: 2,
          explanation: "규칙 자리에 lambda x: x + 10 이 들어갔으니 규칙(4) 는 4 + 10 = 14 예요. 이렇게 함수를 재료로 받는 함수를 어려운 말로 '고차 함수' 라고 불러요 — 이름은 몰라도 괜찮아요. 다음 레슨에서 배울 sorted(..., key=...) 도 똑같아요. sorted 에게 '어떤 자로 잴지' 규칙을 건네주는 거예요."
        }
      ]
    },
    {
      id: "ch4",
      title: "함수 안에서 함수 호출",
      emoji: "🔗",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 함수 안에서 다른 함수를 부를 수 있을까?",
          content: `💭 더하기 함수, 곱하기 함수를 따로 만들었는데... 새 함수에서 **그 둘을 다 부르면** 어떻게 될까?

\`\`\`python
def 더하기(a, b):
    return a + b

def 곱하기(a, b):
    return a * b

def 계산(a, b):
    합 = 더하기(a, b)    # 더하기 함수 호출
    곱 = 곱하기(a, b)    # 곱하기 함수 호출
    return 합, 곱

합계, 곱셈 = 계산(3, 5)
print(f'합: {합계}, 곱: {곱셈}')
# 합: 8, 곱: 15
\`\`\`

@핵심: 함수가 **다른 함수를 부를 수 있다!** 큰 문제를 작은 함수들로 쪼개서 해결!`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "함수 조합하기",
          task: "함수 안에서 다른 함수를 호출해보세요",
          initialCode: `def 더하기(a, b):
    return a + b

def 곱하기(a, b):
    return a * b

def 계산(a, b):
    합 = ___(a, b)
    곱 = ___(a, b)
    return 합, 곱

합계, 곱셈 = 계산(3, 5)
print(f'합: {합계}, 곱: {곱셈}')`,
          expectedOutput: "합: 8, 곱: 15",
          hint: "위에서 만든 두 함수 중 어느 걸 불러야 합이 나오고, 어느 걸 불러야 곱이 나올까요?",
          hint2: "더하기 / 곱하기"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "중첩 함수",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def outer():
    x = 10
    def inner():
        return x * 2
    return inner()

print(outer())
\`\`\``,
          options: [
            "10",
            "20",
            "에러 발생",
            "None"
          ],
          answer: 1,
          explanation: "inner 함수는 outer 함수의 x를 사용할 수 있어요. 10 × 2 = 20"
        },
        {
          id: "ch4-4",
          type: "mission",
          title: "온도 변환기",
          task: "섭씨→화씨, 화씨→섭씨 변환 후 둘 다 반환하는 함수를 완성하세요",
          initialCode: `def 섭씨to화씨(c):
    return c * 9/5 + 32

def 화씨to섭씨(f):
    return (f - 32) * 5/9

def 온도변환(섭씨):
    화씨 = 섭씨to화씨(섭씨)
    다시섭씨 = 화씨to섭씨(화씨)
    # 화씨와 다시섭씨 둘 다 반환


f, c = 온도변환(100)
print(f'100°C = {f}°F')
print(f'{f}°F = {c}°C')`,
          expectedOutput: "100°C = 212.0°F\n212.0°F = 100.0°C",
          hint: "두 값을 쉼표로 구분해서 반환하세요",
          hint2: "return에 변수 두 개를 나열하면 돼요"
        }
      ]
    }
  ]
}
