// ============================================
// 레슨 30: 매개변수와 반환값
// Part 5: 함수 - 기초
// ============================================

import { LessonData } from './types'

export const lesson30Data: LessonData = {
  id: "30",
  title: "매개변수와 반환값",
  emoji: "📦",
  description: "함수에 값을 주고, 결과를 받아요!",
  chapters: [
    // ============================================
    // Chapter 1: 매개변수 복습
    // ============================================
    {
      id: "ch1",
      title: "매개변수 복습",
      emoji: "📦",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "오늘 만들 것!",
          content: `## 🧮 계산기 함수를 만들어요!

\`\`\`
=== 계산기 ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
\`\`\``
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "매개변수 1개",
          task: "제곱 함수를 실행해보세요",
          initialCode: `def 제곱(n):
    return n * n

print(제곱(5))`,
          expectedOutput: "25",
          hint: "5의 제곱 = 5 × 5 = 25"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "매개변수 2개",
          task: "더하기 함수를 실행해보세요",
          initialCode: `def 더하기(a, b):
    return a + b

print(더하기(3, 5))`,
          expectedOutput: "8",
          hint: "3 + 5 = 8"
        },
        {
          id: "ch1-4",
          type: "mission",
          title: "빼기 함수 만들기",
          task: "두 수를 빼서 반환하는 subtract 함수를 완성하세요",
          initialCode: `def subtract(a, b):
    # 여기에 코드 작성


print(subtract(10, 3))
print(subtract(20, 8))`,
          expectedOutput: "7\n12",
          hint: "return a - b를 사용하세요",
          hint2: "return a - b"
        }
      ]
    },
    // ============================================
    // Chapter 2: 기본값 (Default Value)
    // ============================================
    {
      id: "ch2",
      title: "기본값 (Default Value)",
      emoji: "⚙️",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "기본값이란?",
          content: `## 🤔 생각해보기

인사 함수를 만들었어요.
대부분 "안녕"이라고 하는데, 가끔 "반가워"라고 하고 싶어요.
매번 "안녕"을 입력하는 게 귀찮은데...

**기본값 = 자동으로 들어가는 값!**

\`\`\`python
def 인사(이름, 메시지='안녕'):  # ← 기본값 설정
    print(f'{메시지}, {이름}!')

인사('철수')             # "안녕, 철수!" (기본값 사용)
인사('영희', '반가워')   # "반가워, 영희!" (직접 지정)
\`\`\``
        },
        {
          id: "ch2-2",
          type: "tryit",
          title: "기본값 사용하기",
          task: "기본값이 어떻게 동작하는지 확인해보세요",
          initialCode: `def 인사(이름, 메시지='안녕'):
    print(f'{메시지}, {이름}!')

인사('철수')              # 메시지 안 줌
인사('영희', '반가워')    # 메시지 줌`,
          expectedOutput: "안녕, 철수!\n반가워, 영희!",
          hint: "첫 번째는 기본값 '안녕'이 들어가요"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "기본값 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 거듭제곱(n, 지수=2):
    return n ** 지수

print(거듭제곱(3))
\`\`\``,
          options: [
            "3",
            "6",
            "9",
            "에러 발생"
          ],
          answer: 2,
          explanation: "지수를 안 줬으니 기본값 2가 사용돼요. 3² = 9"
        },
        {
          id: "ch2-4",
          type: "tryit",
          title: "거듭제곱 함수",
          task: "기본값과 직접 지정을 비교해보세요",
          initialCode: `def 거듭제곱(n, 지수=2):
    return n ** 지수

print(거듭제곱(3))       # 기본값 사용
print(거듭제곱(3, 3))    # 지수=3
print(거듭제곱(2, 10))   # 지수=10`,
          expectedOutput: "9\n27\n1024",
          hint: "3² = 9, 3³ = 27, 2¹⁰ = 1024"
        },
        {
          id: "ch2-5",
          type: "explain",
          title: "⚠️ 주의: 기본값 순서",
          content: `## 🚨 기본값이 있는 매개변수는 뒤에!

\`\`\`python
# ❌ 에러!
def 함수(a=1, b):
    return a + b

# ✅ OK!
def 함수(a, b=1):
    return a + b
\`\`\`

기본값이 **없는** 매개변수가 먼저, **있는** 매개변수가 나중에!`
        },
        {
          id: "ch2-6",
          type: "mission",
          title: "할인 함수",
          task: "가격과 할인율(기본값 10)을 받아 할인된 가격을 반환하세요",
          initialCode: `def discount(price, rate=10):
    # 할인된 가격 = 가격 * (100 - 할인율) / 100
    # 여기에 코드 작성


print(discount(10000))       # 10% 할인 = 9000
print(discount(10000, 20))   # 20% 할인 = 8000`,
          expectedOutput: "9000.0\n8000.0",
          hint: "할인된 가격 = price * (100 - rate) / 100",
          hint2: "return price * (100 - rate) / 100"
        }
      ]
    },
    // ============================================
    // Chapter 3: 여러 값 반환하기
    // ============================================
    {
      id: "ch3",
      title: "여러 값 반환하기",
      emoji: "📤",
      steps: [
        {
          id: "ch3-1",
          type: "explain",
          title: "여러 값 반환",
          content: `## 📤 함수는 여러 값을 한 번에 반환할 수 있어요!

\`\`\`python
def 나누기(숫자, 나누는수):
    몫 = 숫자 // 나누는수
    나머지 = 숫자 % 나누는수
    return 몫, 나머지    # 2개 반환!

몫, 나머지 = 나누기(17, 5)  # 각각 받기!
\`\`\`

**쉽게 생각하면:**
- 하나로 받으면 → **튜플**로 됨
- 각각 받으면 → 각 변수에 저장!`
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "몫과 나머지",
          task: "두 가지 방법으로 받아보세요",
          initialCode: `def 나누기(숫자, 나누는수):
    몫 = 숫자 // 나누는수
    나머지 = 숫자 % 나누는수
    return 몫, 나머지

결과 = 나누기(17, 5)
print(결과)

몫, 나머지 = 나누기(17, 5)
print(f'몫: {몫}, 나머지: {나머지}')`,
          expectedOutput: "(3, 2)\n몫: 3, 나머지: 2",
          hint: "17 ÷ 5 = 3 나머지 2"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "여러 값 반환 이해",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 계산(a, b):
    return a + b, a - b

x, y = 계산(10, 3)
print(x, y)
\`\`\``,
          options: [
            "13, 7",
            "13 7",
            "(13, 7)",
            "에러 발생"
          ],
          answer: 1,
          explanation: "10+3=13, 10-3=7이 각각 x, y에 저장돼요!"
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "최대값과 최소값",
          task: "한 번에 최대값과 최소값을 반환하는 함수를 실행해보세요",
          initialCode: `def 최대최소(숫자들):
    return max(숫자들), min(숫자들)

최대, 최소 = 최대최소([3, 7, 1, 9, 4])
print(f'최대: {최대}, 최소: {최소}')`,
          expectedOutput: "최대: 9, 최소: 1",
          hint: "max()는 최대값, min()은 최소값을 구해요"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "합계와 평균",
          task: "리스트를 받아 합계와 평균을 둘 다 반환하는 함수를 완성하세요",
          initialCode: `def 통계(숫자들):
    합계 = sum(숫자들)
    # 평균 계산하고 합계, 평균 둘 다 반환하세요


합계, 평균 = 통계([10, 20, 30])
print(f'합계: {합계}, 평균: {평균}')`,
          expectedOutput: "합계: 60, 평균: 20.0",
          hint: "평균 = 합계 / len(숫자들), return 합계, 평균",
          hint2: "평균 = 합계 / len(숫자들)\\n    return 합계, 평균"
        }
      ]
    },
    // ============================================
    // Chapter 4: 키워드 인자
    // ============================================
    {
      id: "ch4",
      title: "키워드 인자",
      emoji: "🏷️",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "키워드 인자란?",
          content: `## 🏷️ 순서 상관없이 이름으로 전달!

\`\`\`python
def 소개(이름, 나이, 학교):
    print(f'{이름}, {나이}살, {학교}')

# 순서대로 (위치 인자)
소개('철수', 15, '파이썬중')

# 이름으로 (키워드 인자) - 순서 달라도 OK!
소개(학교='파이썬중', 이름='철수', 나이=15)
\`\`\`

둘 다 같은 결과: \`철수, 15살, 파이썬중\`

**장점:** 어떤 값이 어떤 매개변수인지 명확해요!`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "키워드 인자 사용",
          task: "두 가지 방법으로 함수를 호출해보세요",
          initialCode: `def 프로필(이름, 나이, 직업):
    print(f'{이름}({나이}세) - {직업}')

# 위치 인자
프로필('철수', 15, '학생')

# 키워드 인자 (순서 달라도 OK!)
프로필(직업='개발자', 나이=25, 이름='영희')`,
          expectedOutput: "철수(15세) - 학생\n영희(25세) - 개발자",
          hint: "키워드 인자는 순서가 달라도 이름으로 매칭돼요"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "키워드 인자 이해",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def greet(name, msg='안녕'):
    print(f'{msg}, {name}!')

greet(msg='반가워', name='민수')
\`\`\``,
          options: [
            "안녕, 민수!",
            "반가워, 민수!",
            "민수, 반가워!",
            "에러 발생"
          ],
          answer: 1,
          explanation: "키워드 인자로 msg='반가워', name='민수'가 전달돼요!"
        }
      ]
    },
    // ============================================
    // Chapter 5: 프로젝트
    // ============================================
    {
      id: "ch5",
      title: "프로젝트: 계산기 함수",
      emoji: "🧮",
      steps: [
        {
          id: "ch5-1",
          type: "explain",
          title: "계산기 만들기",
          content: `## 🧮 계산기 함수들을 만들어요!

\`\`\`
=== 계산기 ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

더하기, 빼기, 곱하기, 나누기 함수 4개!`
        },
        {
          id: "ch5-2",
          type: "mission",
          title: "계산기 완성",
          task: "4가지 연산 함수를 완성하세요",
          initialCode: `def 더하기(a, b):
    return a + b

def 빼기(a, b):
    return a - b

def 곱하기(a, b):
    # 여기에 코드 작성

def 나누기(a, b):
    # 여기에 코드 작성

print('=== 계산기 ===')
print(f'3 + 5 = {더하기(3, 5)}')
print(f'10 - 4 = {빼기(10, 4)}')
print(f'6 * 7 = {곱하기(6, 7)}')
print(f'20 / 4 = {나누기(20, 4)}')`,
          expectedOutput: "=== 계산기 ===\n3 + 5 = 8\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5.0",
          hint: "곱하기: return a * b, 나누기: return a / b",
          hint2: "return a * b\\n\\ndef 나누기(a, b):\\n    return a / b"
        },
        {
          id: "ch5-3",
          type: "mission",
          title: "🏆 도전: 안전한 나누기",
          task: "0으로 나누려고 하면 '나눌 수 없어요!'를 반환하는 함수를 만드세요",
          initialCode: `def safe_divide(a, b):
    # b가 0이면 '나눌 수 없어요!' 반환
    # 아니면 a / b 반환


print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
          expectedOutput: "5.0\n나눌 수 없어요!",
          hint: "if b == 0: 으로 먼저 확인하세요",
          hint2: "if b == 0:\\n        return '나눌 수 없어요!'\\n    return a / b"
        }
      ]
    }
  ]
}
