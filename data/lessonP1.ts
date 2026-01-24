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
          title: "🧮 오늘 만들 것!",
          content: `Part 1에서 배운 것을 모두 활용해서
**미니 계산기**를 만들어요!

\`\`\`
=== 🧮 미니 계산기 ===
첫 번째 숫자: 10
두 번째 숫자: 3
연산자 (+, -, *, /): +
결과: 10 + 3 = 13
\`\`\`

**사용할 개념:**
- print() 출력
- input() 입력
- 변수
- 연산자
- 데이터 타입 변환`
        },
        {
          id: "review",
          type: "explain",
          title: "📚 복습!",
          content: `**1. input()으로 입력받기**
\`\`\`python
name = input('이름: ')
\`\`\`

**2. int()로 숫자 변환**
\`\`\`python
num = int(input('숫자: '))
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
          title: "1️⃣ 숫자 2개 입력받기",
          task: "두 숫자를 입력받아 출력하세요!",
          initialCode: "num1 = int(input('첫 번째 숫자: '))\nnum2 = int(input('두 번째 숫자: '))\nprint(f'입력: {num1}, {num2}')",
          expectedOutput: "",
          hint: "int()로 숫자로 변환!",
          hint2: "num1 = int(input('첫 번째 숫자: '))"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 덧셈 계산기",
          task: "두 숫자의 합을 계산하세요!",
          initialCode: "num1 = int(input('첫 번째 숫자: '))\nnum2 = int(input('두 번째 숫자: '))\nresult = num1 + num2\nprint(f'{num1} + {num2} = {result}')",
          expectedOutput: "",
          hint: "result = num1 + num2",
          hint2: "print(f'{num1} + {num2} = {result}')"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 연산자 선택",
          task: "연산자를 입력받아 계산하세요!",
          initialCode: "num1 = int(input('첫 번째 숫자: '))\nnum2 = int(input('두 번째 숫자: '))\nop = input('연산자 (+, -, *, /): ')\n\nif op == '+':\n    result = num1 + num2\nelif op == '-':\n    result = num1 - num2\nelif op == '*':\n    result = num1 * num2\nelif op == '/':\n    result = num1 / num2\n\nprint(f'{num1} {op} {num2} = {result}')",
          expectedOutput: "",
          hint: "if-elif로 연산자 구분!",
          hint2: "if op == '+': result = num1 + num2"
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
          title: "🏆 완성된 계산기!",
          task: "제목과 함께 완성된 계산기를 만드세요!",
          initialCode: "print('=== 🧮 미니 계산기 ===')\n\nnum1 = int(input('첫 번째 숫자: '))\nnum2 = int(input('두 번째 숫자: '))\nop = input('연산자 (+, -, *, /): ')\n\nif op == '+':\n    result = num1 + num2\nelif op == '-':\n    result = num1 - num2\nelif op == '*':\n    result = num1 * num2\nelif op == '/':\n    result = num1 / num2\nelse:\n    result = '오류'\n\nprint(f'결과: {num1} {op} {num2} = {result}')",
          expectedOutput: "",
          hint: "else로 잘못된 연산자 처리!",
          hint2: "else: result = '오류'"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**미니 계산기**를 완성했어요!

### 사용한 개념:
✅ print() - 출력
✅ input() - 입력
✅ int() - 타입 변환
✅ 변수 - 데이터 저장
✅ 연산자 - 계산
✅ if-elif-else - 조건문
✅ f-string - 포맷팅

### 도전 과제 💪
- 나눗셈에서 0으로 나누기 방지
- 소수점 계산 추가 (float)
- 계산 반복하기 (while)

**Part 2**에서 조건문과 반복문을 더 배워요! 🚀`
        }
      ]
    }
  ]
}
