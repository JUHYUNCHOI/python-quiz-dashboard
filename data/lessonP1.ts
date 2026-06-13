// ============================================
// 프로젝트 1: 미니 계산기
// ============================================
import { LessonData } from './types'

export const lessonP1Data: LessonData = {
  id: "p1",
  title: "미니 계산기",
  emoji: "🧮",
  description: "Part 1 복습 프로젝트! 사칙연산 계산기를 만들어요.",
  chapters: [
    {
      id: "ch1",
      title: "프로젝트 소개",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🧮 오늘 만들 것: 미니 계산기!",
          content: `Part 1에서 배운 것을 다 써서
**나만의 계산기**를 만들어요!

💡 웹에서는 input()을 못 써서,
숫자를 변수에 미리 넣어서 사용해요!

\`\`\`
=== 🧮 미니 계산기 ===
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3.33...
\`\`\`

**오늘 쓸 개념:**
- print() 출력
- 변수에 값 저장
- +, -, *, / 연산자
- f-string으로 결과 꾸미기`
        },
        {
          id: "review",
          type: "explain",
          title: "📚 30초 복습!",
          content: `**1. 변수에 값 저장하기**
\`\`\`python
num1 = 10
num2 = 3
\`\`\`

**2. int()로 문자열 → 숫자 변환**
\`\`\`python
num = int('15')  # 15
\`\`\`

**3. 계산하기**
\`\`\`python
result = 10 + 3
\`\`\`

**4. f-string으로 출력**
\`\`\`python
print(f'결과: {result}')
\`\`\``
        }
      ]
    },
    {
      id: "ch2",
      title: "단계별 만들기",
      emoji: "🔧",
      steps: [
        {
          id: "step1",
          type: "tryit",
          title: "1️⃣ 숫자 2개 보여주기",
          task: "두 숫자를 변수에 넣고 화면에 출력해봐!",
          initialCode: "# input() 대신 직접 값을 넣어요\nnum1 = 10\nnum2 = 3\n# f-string으로 두 숫자를 출력하세요\nprint(f'입력: {___}, {___}')",
          expectedOutput: "입력: 10, 3",
          hint: "f-string 안에 변수 이름을 넣으세요!",
          hint2: "print(f'입력: {num1}, {num2}')"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 덧셈부터!",
          task: "두 숫자를 더해서 result에 넣어봐!",
          initialCode: "# input() 대신 직접 값을 넣어요\nnum1 = 10\nnum2 = 3\n# 두 숫자를 더하세요\nresult = ___\nprint(f'{num1} + {num2} = {result}')",
          expectedOutput: "10 + 3 = 13",
          hint: "두 변수를 더해서 result에 저장!",
          hint2: "result = num1 + num2"
        },
        {
          id: "step2-5",
          type: "explain",
          title: "🔢 빼기·곱하기·나누기도!",
          content: `덧셈을 해봤으니, 나머지도 **똑같은 방법**으로!

\`\`\`python
print(f'{num1} - {num2} = {num1 - num2}')   # 빼기
print(f'{num1} * {num2} = {num1 * num2}')   # 곱하기
print(f'{num1} / {num2} = {num1 / num2}')   # 나누기
\`\`\`

💡 \`/\`(나누기) 결과는 항상 **소수(float)** 예요 — lesson 9에서 배웠죠!
(10 / 3 = 3.333...)`
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 곱하기·나누기도 추가!",
          task: "곱하기·나누기 결과를 빈칸에 채워봐!",
          initialCode: "num1 = 10\nnum2 = 3\nprint(f'{num1} + {num2} = {num1 + num2}')\nprint(f'{num1} - {num2} = {num1 - num2}')\nprint(f'{num1} * {num2} = {___}')\nprint(f'{num1} / {num2} = {___}')",
          expectedOutput: "10 + 3 = 13\n10 - 3 = 7\n10 * 3 = 30\n10 / 3 = 3.3333333333333335",
          hint: "곱하기는 num1 * num2, 나누기는 num1 / num2!",
          hint2: "num1 * num2  /  num1 / num2"
        }
      ]
    },
    {
      id: "ch3",
      title: "최종 프로젝트",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 완성된 계산기 만들기!",
          task: "제목 + 네 가지 연산 결과를 다 채워 완성해봐!",
          initialCode: "print('=== 🧮 미니 계산기 ===')\nnum1 = 10\nnum2 = 3\nprint(f'{num1} + {num2} = {___}')\nprint(f'{num1} - {num2} = {___}')\nprint(f'{num1} * {num2} = {___}')\nprint(f'{num1} / {num2} = {___}')",
          expectedOutput: "=== 🧮 미니 계산기 ===\n10 + 3 = 13\n10 - 3 = 7\n10 * 3 = 30\n10 / 3 = 3.3333333333333335",
          hint: "각 빈칸: num1 + num2, num1 - num2, num1 * num2, num1 / num2",
          hint2: "num1 + num2"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**미니 계산기**를 완성했어요! 두 수의 사칙연산을 한 번에 보여주죠.

### 오늘 쓴 개념:
✅ print() - 출력
✅ 변수 - 데이터 저장
✅ +, -, *, / - 연산자
✅ int() / float() - 타입 변환
✅ f-string - 결과 꾸미기

### 🤔 그런데… 한 가지 아쉬운 점!
지금은 +, -, ×, ÷ 를 **전부** 보여줘요.
근데 사용자가 **"+ 하나만"** 보고 싶다면?
원하는 것만 **골라서** 보여주려면 — **"조건"** 이 필요해요!

➡️ 그게 바로 **Part 2**에서 배울 **조건문 \`if\`** 예요! 🚀
(\`if op == '+': ...\` 처럼 — 곧 만나요!)

### 도전 과제 💪 (Part 2 배운 후에!)
- \`if\` 로 원하는 연산 하나만 골라 보여주기
- \`input()\` 으로 직접 숫자 받기
- \`while\` 로 계산 여러 번 반복하기`
        }
      ]
    }
  ]
}
