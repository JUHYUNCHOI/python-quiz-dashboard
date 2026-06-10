import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "프로젝트: 계산기",
  emoji: "🧮",
  steps: [
    {
      id: "ch5-1",
      type: "explain",
      title: "💭 4가지 연산을 함수로 만들면?",
      content: `💭 더하기, 빼기, 곱하기, 나누기를 **각각 함수로** 만들어서 계산기를 완성할 수 있을까?

\`\`\`
=== 계산기 ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

오늘 배운 걸 활용해서 4개 함수를 만들어보자!

@핵심: 각 연산을 **함수로 분리**하면 깔끔하고 재사용하기 좋은 계산기가 된다!`
    },
    {
      id: "ch5-2",
      type: "interactive",
      title: "따라 써보기: 더하기 & 빼기",
      description: "더하기와 빼기 함수를 만들어요!",
      component: "typeAlong",
      targetCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(f'3 + 5 = {add(3, 5)}')
print(f'10 - 4 = {subtract(10, 4)}')`,
      expectedOutput: "3 + 5 = 8\n10 - 4 = 6"
    },
    {
      id: "ch5-3",
      type: "interactive",
      title: "빈칸 채우기: 곱하기",
      description: "곱하기 함수를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "def multiply(a, b):\n    return ___1___\n\nprint(f'6 * 7 = {multiply(6, 7)}')",
      blanks: [{ id: "1", answer: "a * b", hint: "두 수를 곱하는 식!" }],
      choices: ["a * b", "a + b", "a - b", "a / b"],
      expectedOutput: "6 * 7 = 42"
    },
    {
      id: "ch5-4",
      type: "mission",
      title: "나누기 함수",
      task: "divide 함수를 완성하세요!",
      initialCode: `def divide(a, b):
    # 여기에 return 문을 작성하세요!


print(f'20 / 4 = {divide(20, 4)}')`,
      expectedOutput: "20 / 4 = 5.0",
      hint: "나누기 연산자는 /",
      hint2: "return a / b"
    },
    {
      id: "ch5-5",
      type: "mission",
      title: "🧮 계산기 완성!",
      task: "4가지 연산 함수를 모두 완성하세요!",
      initialCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    # 여기에 코드!

def divide(a, b):
    # 여기에 코드!

print('=== 계산기 ===')
print(f'3 + 5 = {add(3, 5)}')
print(f'10 - 4 = {subtract(10, 4)}')
print(f'6 * 7 = {multiply(6, 7)}')
print(f'20 / 4 = {divide(20, 4)}')`,
      expectedOutput: "=== 계산기 ===\n3 + 5 = 8\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5.0",
      hint: "곱하기는 *, 나누기는 /",
      hint2: "return a * b, return a / b"
    },
    {
      id: "ch5-6",
      type: "mission",
      title: "🏆 도전: 안전한 나누기",
      task: "0으로 나누려고 하면 '나눌 수 없어요!'를 반환하세요!",
      initialCode: `def safe_divide(a, b):
    # b가 0이면 나눌 수 없다고 알려주고
    # 그렇지 않으면 나눈 결과를 돌려주세요


print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
      expectedOutput: "5.0\n나눌 수 없어요!",
      hint: "if b == 0: 으로 체크!",
      hint2: "if b == 0:\n    return '나눌 수 없어요!'\nreturn a / b"
    }
  ]
}
