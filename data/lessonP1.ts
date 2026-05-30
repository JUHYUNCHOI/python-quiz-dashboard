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
결과: 10 + 3 = 13
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
          title: "💡 if-elif 살짝 맛보기!",
          content: `계산기는 +, -, *, / 중 **어떤 걸 할지 골라야** 해요.
이때 쓰는 게 \`if\`와 \`elif\`!

\`\`\`python
op = '+'

if op == '+':
    print('더하기!')
elif op == '-':
    print('빼기!')
\`\`\`

- \`if 조건:\` → 조건이 맞으면 실행!
- \`elif 조건:\` → 위의 if가 아니면, 이 조건을 확인!
- \`else:\` → 위의 모든 조건이 아니면 실행!

💡 \`if-elif-else\`는 **Part 2에서 자세히** 배워요!
지금은 "조건에 따라 다른 코드를 실행한다"는 것만 이해하면 OK!`
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 곱하기·나누기도 추가!",
          task: "*, / 도 처리하게 빈칸을 채워봐!",
          initialCode: "# input() 대신 직접 값을 넣어요\nnum1 = 10\nnum2 = 3\nop = '+'\n\nif op == '+':\n    result = num1 + num2\nelif op == '-':\n    result = num1 - num2\n# 나머지 연산자도 추가해봐\nelif op == '*':\n    result = ___\nelif op == '/':\n    result = ___\n\nprint(f'{num1} {op} {num2} = {result}')",
          expectedOutput: "10 + 3 = 13",
          hint: "곱하기는 num1 * num2, 나누기는 num1 / num2!",
          hint2: "num1 * num2 / num1 / num2"
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
          task: "제목, 모든 연산, 결과 출력까지 다 채워봐!",
          initialCode: "print('=== 🧮 미니 계산기 ===')\n\n# input() 대신 직접 값을 넣어요\nnum1 = 10\nnum2 = 3\nop = '+'\n\nif op == '+':\n    result = ___\nelif op == '-':\n    result = ___\nelif op == '*':\n    result = ___\nelif op == '/':\n    result = ___\nelse:\n    result = '오류'\n\nprint(f'결과: {num1} {op} {num2} = {result}')",
          expectedOutput: "=== 🧮 미니 계산기 ===\n결과: 10 + 3 = 13",
          hint: "각 연산자에 맞는 계산식을 넣으세요!",
          hint2: "result = num1 + num2"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**미니 계산기**를 완성했어요!

### 오늘 쓴 개념:
✅ print() - 출력
✅ 변수 - 데이터 저장
✅ +, -, *, / - 연산자
✅ if-elif-else - 조건문 (살짝 맛보기)
✅ f-string - 결과 꾸미기

### 도전 과제 💪 (Part 2 배운 후에!)
- 나눗셈에서 0으로 나누기 막기
- 직접 input()으로 숫자 받기
- 계산 여러 번 반복하기 (while)
- 좋아하는 숫자로 num1, num2 바꿔서 실행!

**Part 2**에서 조건문과 반복문을 자세히 배워요! 🚀`
        }
      ]
    }
  ]
}
