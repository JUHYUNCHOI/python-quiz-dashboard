// ============================================
// 레슨 33: 함수 문제 30
// Part 5: 함수 - 실전
// ============================================

import { LessonData } from './types'

export const lesson33Data: LessonData = {
  id: "33",
  title: "함수 문제 30",
  emoji: "🏆",
  description: "함수 마스터를 위한 30문제!",
  chapters: [
    // ============================================
    // Chapter 1: 함수 기초 (문제 1-10)
    // ============================================
    {
      id: "ch1",
      title: "함수 기초 (1-10)",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-1",
          type: "quiz",
          title: "문제 1",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 인사():
    print('안녕!')

인사()
인사()
\`\`\``,
          options: ["안녕!", "안녕!\\n안녕!", "아무것도 출력 안 됨", "에러 발생"],
          answer: 1,
          explanation: "함수를 2번 호출했으니 '안녕!'이 2번 출력돼요!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "문제 2",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 인사(이름):
    print(f'{이름}아 안녕!')

인사('철수')
\`\`\``,
          options: ["이름아 안녕!", "철수아 안녕!", "안녕!", "에러 발생"],
          answer: 1,
          explanation: "'철수'가 이름 매개변수에 전달됩니다!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "문제 3",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 계산(a, b):
    return a * b

결과 = 계산(4, 5)
print(결과)
\`\`\``,
          options: ["9", "20", "45", "에러 발생"],
          answer: 1,
          explanation: "4 × 5 = 20"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "문제 4",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 테스트():
    print('A')
    return 'B'
    print('C')

결과 = 테스트()
print(결과)
\`\`\``,
          options: ["A\\nB\\nC", "A\\nB", "B", "에러 발생"],
          answer: 1,
          explanation: "return 이후의 코드는 실행되지 않아요!"
        },
        {
          id: "ch1-5",
          type: "mission",
          title: "문제 5: 제곱 함수",
          task: "숫자를 제곱해서 반환하는 함수를 완성하세요",
          initialCode: `def square(n):
    # 여기에 코드 작성


print(square(5))
print(square(3))`,
          expectedOutput: "25\n9",
          hint: "return n ** 2",
          hint2: "return n ** 2"
        },
        {
          id: "ch1-6",
          type: "mission",
          title: "문제 6: 두 수의 평균",
          task: "두 수의 평균을 반환하는 함수를 완성하세요",
          initialCode: `def average(a, b):
    # 여기에 코드 작성


print(average(10, 20))
print(average(3, 7))`,
          expectedOutput: "15.0\n5.0",
          hint: "return (a + b) / 2",
          hint2: "return (a + b) / 2"
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "문제 7",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 인사(이름, 메시지='안녕'):
    print(f'{메시지}, {이름}!')

인사('철수')
\`\`\``,
          options: ["철수, 안녕!", "안녕, 철수!", "에러 발생", "None"],
          answer: 1,
          explanation: "기본값 '안녕'이 사용돼요!"
        },
        {
          id: "ch1-8",
          type: "quiz",
          title: "문제 8",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 거듭제곱(n, 지수=2):
    return n ** 지수

print(거듭제곱(5, 3))
\`\`\``,
          options: ["10", "25", "125", "에러 발생"],
          answer: 2,
          explanation: "5³ = 125"
        },
        {
          id: "ch1-9",
          type: "quiz",
          title: "문제 9",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def 계산(a, b):
    return a + b, a - b

x, y = 계산(10, 3)
print(x, y)
\`\`\``,
          options: ["13, 7", "13 7", "(13, 7)", "에러 발생"],
          answer: 1,
          explanation: "10+3=13, 10-3=7"
        },
        {
          id: "ch1-10",
          type: "mission",
          title: "문제 10: 짝수 판별",
          task: "짝수면 True, 홀수면 False를 반환하세요",
          initialCode: `def is_even(n):
    # 여기에 코드 작성


print(is_even(4))
print(is_even(7))`,
          expectedOutput: "True\nFalse",
          hint: "n % 2 == 0",
          hint2: "return n % 2 == 0"
        }
      ]
    },
    // ============================================
    // Chapter 2: 지역/전역 변수 (문제 11-15)
    // ============================================
    {
      id: "ch2",
      title: "지역/전역 변수 (11-15)",
      emoji: "⭐⭐",
      steps: [
        {
          id: "ch2-1",
          type: "quiz",
          title: "문제 11",
          content: `다음 코드의 출력 결과는?
\`\`\`python
x = 5

def 함수():
    x = 10
    print(x)

함수()
print(x)
\`\`\``,
          options: ["10\\n10", "5\\n5", "10\\n5", "5\\n10"],
          answer: 2,
          explanation: "함수 안의 x(10)와 밖의 x(5)는 다른 변수!"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "문제 12",
          content: `다음 코드의 출력 결과는?
\`\`\`python
x = 1

def 함수():
    global x
    x = x + 10

함수()
print(x)
\`\`\``,
          options: ["1", "10", "11", "에러 발생"],
          answer: 2,
          explanation: "global로 전역변수 수정! 1+10=11"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "문제 13",
          content: `다음 코드는 에러가 발생합니다. 이유는?
\`\`\`python
def 함수(a=1, b):
    return a + b
\`\`\``,
          options: [
            "매개변수가 너무 많아서",
            "기본값이 있는 매개변수가 앞에 있어서",
            "return이 잘못되어서",
            "함수 이름이 한글이라서"
          ],
          answer: 1,
          explanation: "기본값이 있는 매개변수는 뒤에 와야 해요!"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "문제 14",
          content: `다음 코드의 출력 결과는?
\`\`\`python
def outer():
    x = 10
    def inner():
        return x * 2
    return inner()

print(outer())
\`\`\``,
          options: ["10", "20", "에러 발생", "None"],
          answer: 1,
          explanation: "inner가 outer의 x를 사용! 10×2=20"
        },
        {
          id: "ch2-5",
          type: "mission",
          title: "문제 15: 카운터",
          task: "global을 사용하지 않고 카운터를 증가시키세요",
          initialCode: `count = 0

def increase(n):
    return n + 1

count = increase(count)
count = increase(count)
count = increase(count)
print(count)`,
          expectedOutput: "3",
          hint: "return으로 값을 돌려받아 다시 저장하면 돼요!"
        }
      ]
    },
    // ============================================
    // Chapter 3: 람다 & sorted (문제 16-22)
    // ============================================
    {
      id: "ch3",
      title: "람다 & sorted (16-22)",
      emoji: "⭐⭐⭐",
      steps: [
        {
          id: "ch3-1",
          type: "quiz",
          title: "문제 16",
          content: `다음 코드의 출력 결과는?
\`\`\`python
제곱 = lambda x: x ** 2
print(제곱(5))
\`\`\``,
          options: ["5", "10", "25", "에러 발생"],
          answer: 2,
          explanation: "5² = 25"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "문제 17",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(sorted([3, 1, 4, 1, 5]))
\`\`\``,
          options: [
            "[1, 1, 3, 4, 5]",
            "[5, 4, 3, 1, 1]",
            "[3, 1, 4, 1, 5]",
            "에러 발생"
          ],
          answer: 0,
          explanation: "오름차순 정렬!"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "문제 18",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(sorted([3, 1, 4], reverse=True))
\`\`\``,
          options: ["[1, 3, 4]", "[4, 3, 1]", "[3, 1, 4]", "에러 발생"],
          answer: 1,
          explanation: "reverse=True는 내림차순!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "문제 19",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자들 = [(3, 'a'), (1, 'c'), (2, 'b')]
정렬 = sorted(숫자들, key=lambda x: x[0])
print(정렬)
\`\`\``,
          options: [
            "[(1, 'c'), (2, 'b'), (3, 'a')]",
            "[(3, 'a'), (2, 'b'), (1, 'c')]",
            "[('a', 3), ('b', 2), ('c', 1)]",
            "에러 발생"
          ],
          answer: 0,
          explanation: "첫 번째 요소(숫자) 기준 오름차순!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "문제 20",
          content: `다음 코드의 출력 결과는?
\`\`\`python
학생 = [('철수', 85), ('영희', 92), ('민수', 78)]
결과 = sorted(학생, key=lambda x: x[1], reverse=True)
print(결과[0][0])
\`\`\``,
          options: ["철수", "영희", "민수", "92"],
          answer: 1,
          explanation: "점수 내림차순 → 1등 영희!"
        },
        {
          id: "ch3-6",
          type: "mission",
          title: "문제 21: 길이로 정렬",
          task: "단어들을 길이 기준으로 정렬하세요",
          initialCode: `단어 = ['apple', 'hi', 'banana', 'cat']

# key=lambda로 길이 기준 정렬
결과 = sorted(단어, key=lambda x: len(x))
print(결과)`,
          expectedOutput: "['hi', 'cat', 'apple', 'banana']",
          hint: "코드를 그대로 실행하면 돼요!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "문제 22: 내림차순 정렬",
          task: "두 번째 요소 기준 내림차순으로 정렬하세요",
          initialCode: `데이터 = [('a', 3), ('b', 1), ('c', 2)]

# x[1] 기준 내림차순
결과 = # 여기에 코드 작성

print(결과)`,
          expectedOutput: "[('a', 3), ('c', 2), ('b', 1)]",
          hint: "sorted(데이터, key=lambda x: x[1], reverse=True)",
          hint2: "sorted(데이터, key=lambda x: x[1], reverse=True)"
        }
      ]
    },
    // ============================================
    // Chapter 4: 내장함수 (문제 23-30)
    // ============================================
    {
      id: "ch4",
      title: "내장함수 (23-30)",
      emoji: "🏆",
      steps: [
        {
          id: "ch4-1",
          type: "quiz",
          title: "문제 23",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(sum([1, 2, 3, 4, 5]))
\`\`\``,
          options: ["15", "12345", "[1,2,3,4,5]", "에러 발생"],
          answer: 0,
          explanation: "1+2+3+4+5 = 15"
        },
        {
          id: "ch4-2",
          type: "quiz",
          title: "문제 24",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(max([3, 7, 1, 9, 2]))
\`\`\``,
          options: ["1", "3", "7", "9"],
          answer: 3,
          explanation: "최대값 = 9"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "문제 25",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자 = ['3', '1', '4']
결과 = list(map(int, 숫자))
print(sum(결과))
\`\`\``,
          options: ["314", "8", "[3,1,4]", "에러 발생"],
          answer: 1,
          explanation: "['3','1','4'] → [3,1,4] → 3+1+4=8"
        },
        {
          id: "ch4-4",
          type: "quiz",
          title: "문제 26",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자 = [1, -2, 3, -4, 5]
결과 = list(filter(lambda x: x > 0, 숫자))
print(sum(결과))
\`\`\``,
          options: ["3", "9", "-2", "15"],
          answer: 1,
          explanation: "양수만: [1,3,5] → 1+3+5=9"
        },
        {
          id: "ch4-5",
          type: "mission",
          title: "문제 27: 평균 구하기",
          task: "sum()과 len()으로 평균을 구하세요",
          initialCode: `점수 = [80, 90, 70, 85, 95]

평균 = sum(점수) / len(점수)
print(평균)`,
          expectedOutput: "84.0",
          hint: "코드를 그대로 실행!"
        },
        {
          id: "ch4-6",
          type: "mission",
          title: "문제 28: 최대-최소",
          task: "최대값과 최소값의 차이를 구하세요",
          initialCode: `숫자 = [3, 7, 1, 9, 4]

차이 = max(숫자) - min(숫자)
print(차이)`,
          expectedOutput: "8",
          hint: "9 - 1 = 8"
        },
        {
          id: "ch4-7",
          type: "mission",
          title: "문제 29: 문자→숫자 변환",
          task: "map()으로 문자열을 정수로 변환하세요",
          initialCode: `문자들 = ['10', '20', '30']

숫자들 = list(map(int, 문자들))
print(숫자들)
print(sum(숫자들))`,
          expectedOutput: "[10, 20, 30]\n60",
          hint: "코드를 그대로 실행!"
        },
        {
          id: "ch4-8",
          type: "mission",
          title: "문제 30: 종합 문제",
          task: "점수에서 합격자(60점 이상)만 골라 평균을 구하세요",
          initialCode: `점수 = [85, 45, 92, 55, 78, 30]

# 1. 60점 이상만 필터
합격 = list(filter(lambda x: x >= 60, 점수))

# 2. 평균 계산
평균 = sum(합격) / len(합격)

print(f'합격자: {합격}')
print(f'평균: {평균}')`,
          expectedOutput: "합격자: [85, 92, 78]\n평균: 85.0",
          hint: "코드를 그대로 실행!"
        }
      ]
    }
  ]
}
