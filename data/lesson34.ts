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

함수()
print(f'함수 밖: {x}')`,
          expectedOutput: "함수 안: 10\n함수 밖: 5",
          hint: "함수 안의 x = 10은 새로운 지역변수예요"
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
          initialCode: `# 제곱 함수
제곱 = lambda x: x ** 2
print(제곱(5))

# 홀수 판별
홀수 = lambda x: x % 2 == 1
print(홀수(7))
print(홀수(4))`,
          expectedOutput: "25\nTrue\nFalse",
          hint: "5² = 25, 7은 홀수(True), 4는 짝수(False)"
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
      id: "ch3",
      title: "sorted()와 람다 활용",
      emoji: "📊",
      steps: [
        {
          id: "ch3-1",
          type: "explain",
          title: "💭 점수 기준으로 학생을 정렬하려면?",
          content: `💭 학생 리스트가 \`[('철수', 85), ('영희', 92), ('민수', 78)]\`. 그냥 \`sorted()\`로 하면 이름 순으로 정렬돼... **점수 기준**으로 정렬하려면?

\`\`\`python
학생들 = [('철수', 85), ('영희', 92), ('민수', 78)]

# 점수(두 번째 값) 기준 정렬
정렬됨 = sorted(학생들, key=lambda x: x[1])
print(정렬됨)
# [('민수', 78), ('철수', 85), ('영희', 92)]
\`\`\`

**\`key=lambda x: x[1]\`** = "각 튜플의 두 번째 값(점수)으로 비교해줘!"

@핵심: \`sorted()\`의 \`key=lambda\` 조합으로 **원하는 기준**으로 정렬! Level 2 단골 출제.`
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "점수 기준 정렬",
          task: "학생들을 점수 기준으로 정렬해보세요",
          initialCode: `학생들 = [('철수', 85), ('영희', 92), ('민수', 78)]

# 점수(x[1]) 기준 정렬
정렬됨 = sorted(학생들, key=lambda x: x[1])
print(정렬됨)`,
          expectedOutput: "[('민수', 78), ('철수', 85), ('영희', 92)]",
          hint: "x[1]은 각 튜플의 두 번째 요소(점수)예요"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "sorted와 람다",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자들 = [(3, 'a'), (1, 'c'), (2, 'b')]
정렬 = sorted(숫자들, key=lambda x: x[0])
print(정렬)
\`\`\``,
          options: [
            "[(3, 'a'), (1, 'c'), (2, 'b')]",
            "[(1, 'c'), (2, 'b'), (3, 'a')]",
            "[('a', 3), ('b', 2), ('c', 1)]",
            "에러 발생"
          ],
          answer: 1,
          explanation: "x[0](첫 번째 숫자) 기준으로 정렬! 1, 2, 3 순서가 돼요."
        },
        {
          id: "ch3-4",
          type: "mission",
          title: "내림차순 정렬",
          task: "데이터를 두 번째 요소 기준으로 내림차순 정렬하세요",
          initialCode: `데이터 = [('a', 3), ('b', 1), ('c', 2)]

# 두 번째 요소(x[1]) 기준, 내림차순
정렬 = sorted(데이터, key=lambda x: x[1], reverse=True)
print(정렬)`,
          expectedOutput: "[('a', 3), ('c', 2), ('b', 1)]",
          hint: "reverse=True를 추가하면 내림차순이에요"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "🏆 문자열 길이로 정렬",
          task: "단어들을 길이 기준으로 정렬하세요",
          initialCode: `단어들 = ['apple', 'hi', 'banana', 'cat']

# 길이(len(x)) 기준 정렬
정렬 = # 여기에 코드 작성

print(정렬)`,
          expectedOutput: "['hi', 'cat', 'apple', 'banana']",
          hint: "key에 길이를 구하는 함수를 넣으세요",
          hint2: "len() 함수를 lambda로 감싸세요"
        }
      ]
    },
    // ============================================
    // Chapter 4: 함수 안에서 함수 호출
    // ============================================
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
    합 = 더하기(a, b)
    곱 = 곱하기(a, b)
    return 합, 곱

합계, 곱셈 = 계산(3, 5)
print(f'합: {합계}, 곱: {곱셈}')`,
          expectedOutput: "합: 8, 곱: 15",
          hint: "3+5=8, 3×5=15"
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
