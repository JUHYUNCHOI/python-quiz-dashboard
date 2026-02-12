import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "반환값 (return)",
  emoji: "🎁",
  steps: [
    {
      id: "ch4-1",
      type: "explain",
      title: "return이 뭐예요?",
      content: `## 🎁 return = 결과를 돌려줘!

지금까지는 함수가 **화면에 출력**만 했어요.

\`\`\`python
def 인사(이름):
    print(f"안녕, {이름}!")  # 화면에 보여주기만
\`\`\`

**return**을 쓰면 **결과를 돌려줄** 수 있어요!

\`\`\`python
def 더하기(a, b):
    return a + b  # 결과를 돌려줌!

결과 = 더하기(3, 5)   # 8이 결과에 저장됨
print(결과)           # 8
\`\`\``
    },
    {
      id: "ch4-2",
      type: "interactive",
      title: "return 구조",
      description: "return이 어떻게 작동하는지 살펴보세요!",
      component: "returnStructure"
    },
    {
      id: "ch4-3",
      type: "mission",
      title: "더하기 함수 사용하기",
      task: "10 + 7의 결과를 출력하도록 숫자를 바꿔보세요!",
      initialCode: `def 더하기(a, b):
    return a + b

결과 = 더하기(3, 5)  # 3과 5를 10과 7로 바꿔보세요!
print(결과)`,
      expectedOutput: "17",
      hint: "더하기(10, 7)로 바꿔요!",
      hint2: "결과 = 더하기(10, 7)"
    },
    {
      id: "ch4-4",
      type: "interactive",
      title: "빈칸 채우기: return 사용",
      description: "return으로 결과를 돌려주세요!",
      component: "fillInBlank",
      codeTemplate: "def 빼기(a, b):\n    ___1___ a - b\n\n결과 = 빼기(10, 3)\nprint(결과)",
      blanks: [{ id: "1", answer: "return", hint: "결과를 돌려주는 키워드" }],
      choices: ["return", "print", "def", "result"],
      expectedOutput: "7"
    },
    {
      id: "ch4-5",
      type: "explain",
      title: "print vs return",
      content: `## ⚠️ 차이점!

**print** = 화면에 보여주기만
\`\`\`python
def 인사():
    print("안녕!")

x = 인사()    # "안녕!" 출력됨
print(x)      # None (비어있음)
\`\`\`

**return** = 값을 돌려줌
\`\`\`python
def 더하기(a, b):
    return a + b

x = 더하기(3, 5)
print(x)      # 8
print(x * 2)  # 16 - 계산에도 사용 가능!
\`\`\`

결과를 **저장하거나 계산**에 쓰려면 **return**!`
    },
    {
      id: "ch4-6",
      type: "interactive",
      title: "빈칸 채우기: 곱하기 결과",
      description: "곱한 결과를 돌려주세요!",
      component: "fillInBlank",
      codeTemplate: "def multiply(a, b):\n    return ___1___\n\nprint(multiply(3, 4))",
      blanks: [{ id: "1", answer: "a * b", hint: "두 수를 곱하는 식" }],
      choices: ["a * b", "a + b", "a - b", "a / b"],
      expectedOutput: "12"
    },
    {
      id: "ch4-7",
      type: "mission",
      title: "제곱 함수 만들기",
      task: "square 함수가 숫자의 제곱을 돌려주도록 빈칸을 채우세요 (3의 제곱 = 3 * 3 = 9)",
      initialCode: `def square(n):
    return _____  # n * n 을 입력하세요

print(square(3))   # 9가 나와야 해요
print(square(5))   # 25가 나와야 해요`,
      expectedOutput: "9\n25",
      hint: "제곱은 같은 수를 두 번 곱하는 거예요!",
      hint2: "n을 두 번 곱하려면 n * n"
    },
    {
      id: "ch4-8",
      type: "quiz",
      title: "return 퀴즈",
      content: `다음 코드의 출력 결과는?
\`\`\`python
def 계산(a, b):
    return a * b

결과 = 계산(4, 5)
print(결과)
\`\`\``,
      options: ["9", "20", "45", "에러 발생"],
      answer: 1,
      explanation: "4 × 5 = 20이 return되어 결과에 저장됩니다!"
    }
  ]
}
