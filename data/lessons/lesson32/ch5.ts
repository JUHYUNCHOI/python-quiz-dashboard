import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "정리 & 프로젝트",
  emoji: "🎉",
  steps: [
    {
      id: "ch5-1",
      type: "explain",
      title: "📚 함수 총정리!",
      content: `@핵심: **함수** = 반복되는 코드를 담은 상자!

**만드는 법:**
\`\`\`python
def 함수이름(매개변수):
    실행할 코드
    return 결과  # 필요할 때만
\`\`\`

**사용하는 법:**
\`\`\`python
함수이름(전달할값)
\`\`\`

- \`def\` = 함수 정의 시작
- \`( )\` 안에 매개변수
- \`:\` 빼먹지 말기! 들여쓰기 필수!
- **호출해야 실행**됨!`
    },
    {
      id: "ch5-2",
      type: "explain",
      title: "💭 이걸로 계산기를 만들 수 있을까?",
      content: `💭 함수와 return을 배웠으니... **나만의 계산기**를 만들 수 있지 않을까?

\`\`\`python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(10, 5))       # 15
print(subtract(10, 5))  # 5
\`\`\`

@핵심: 함수마다 **하나의 기능**을 담으면 깔끔한 계산기 완성!`
    },
    {
      id: "ch5-3",
      type: "interactive",
      title: "빈칸 채우기: 더하기 함수",
      description: "더하기 함수를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "def add(a, b):\n    ___1___ a + b\n\nresult = ___2___\nprint(result)",
      blanks: [
        { id: "1", answer: "return", hint: "결과를 돌려주는 키워드" },
        { id: "2", answer: "add(3, 5)", hint: "함수를 호출해요" }
      ],
      choices: ["return", "print", "add(3, 5)", "add"],
      expectedOutput: "8"
    },
    {
      id: "ch5-4",
      type: "mission",
      title: "빼기 함수 만들기",
      task: "subtract 함수가 두 수의 차이를 돌려주도록 빈칸을 채우세요!",
      initialCode: `def subtract(a, b):
    return _____  # a - b를 입력하세요

print(subtract(10, 3))  # 7이 나와야 해요
print(subtract(20, 8))  # 12가 나와야 해요`,
      expectedOutput: "7\n12",
      hint: "두 수를 빼는 식을 입력해요!",
      hint2: "빼기 연산자는 - 예요!"
    },
    {
      id: "ch5-5",
      type: "interactive",
      title: "빈칸 채우기: 나누기 함수",
      description: "나누기 함수를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "def divide(a, b):\n    ___1___ a / b\n\nresult = ___2___\nprint(result)",
      blanks: [
        { id: "1", answer: "return", hint: "결과를 돌려주는 키워드" },
        { id: "2", answer: "divide(10, 2)", hint: "함수를 호출해요" }
      ],
      choices: ["return", "print", "divide(10, 2)", "divide"],
      expectedOutput: "5.0"
    },
    {
      id: "ch5-6",
      type: "mission",
      title: "🏆 도전: 곱하기 계산기",
      task: "multiply 함수를 완성해서 계산기를 완성하세요!",
      initialCode: `# 계산기 완성하기!
def add(a, b):
    return a + b

def multiply(a, b):
    return _____  # a * b를 입력하세요

print("3 + 5 =", add(3, 5))
print("3 * 5 =", multiply(3, 5))`,
      expectedOutput: "3 + 5 = 8\n3 * 5 = 15",
      hint: "두 수를 곱하는 식을 입력해요!",
      hint2: "곱하기 연산자는 * 예요!"
    },
    {
      id: "ch5-7",
      type: "quiz",
      title: "마지막 퀴즈!",
      content: "함수를 사용하는 가장 큰 이유는?",
      options: [
        "프로그램을 느리게 만들기 위해",
        "코드를 재사용하고 반복을 줄이기 위해",
        "파일 크기를 늘리기 위해",
        "에러를 더 많이 내기 위해"
      ],
      answer: 1,
      explanation: "함수는 코드를 재사용하고 반복을 줄여줘요! 수정도 쉬워지고요!"
    }
  ]
}
