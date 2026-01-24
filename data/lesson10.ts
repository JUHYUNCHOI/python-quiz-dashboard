// ============================================
// 레슨 10: input() 입력
// ============================================
import { LessonData } from './types'

export const lesson10Data: LessonData = {
  id: "10",
  title: "input() 입력",
  emoji: "⌨️",
  description: "사용자에게 입력받는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "input() 기초",
      emoji: "⌨️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 대화하는 프로그램!",
          content: `지금까지는 우리가 일방적으로 출력만 했어요.

이제 **사용자의 입력**을 받아볼 거예요!

\`\`\`python
name = input('이름이 뭐야? ')
print(f'안녕, {name}!')
\`\`\`

실행하면:
\`\`\`
이름이 뭐야? 홍길동
안녕, 홍길동!
\`\`\``
        },
        {
          id: "concept",
          type: "explain",
          title: "📥 input() 함수",
          content: `\`input()\`은 사용자가 입력할 때까지 기다려요!

\`\`\`python
answer = input('질문 내용')
\`\`\`

1. '질문 내용'이 화면에 나타나고
2. 사용자가 입력하고 Enter를 누르면
3. 입력한 값이 answer 변수에 저장돼요!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "이름을 입력받아 인사하는 코드예요! 실행해보세요.",
          initialCode: "name = input('이름: ')\nprint(f'안녕, {name}!')",
          expectedOutput: "",
          hint: "input()으로 받은 값을 name에 저장!",
          hint2: "name = input('이름: ')"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "input()의 결과는 항상 어떤 타입일까요?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "입력에 따라 다름"],
          answer: 2,
          explanation: "input()은 항상 문자열(str)을 반환해요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "숫자 입력받기",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ 문제 발생!",
          content: `나이를 입력받아서 계산해볼까요?

\`\`\`python
age = input('나이: ')
print(age + 1)  # 에러!!! 😱
\`\`\`

왜 에러가 날까요?
→ input()은 **항상 문자열**을 반환해요!
→ '15' + 1 은 계산 불가!`
        },
        {
          id: "solution-explain",
          type: "explain",
          title: "✅ 해결: int()로 변환!",
          content: `문자열을 숫자로 바꿔야 해요!

\`\`\`python
age = input('나이: ')      # '15' (문자열)
age = int(age)             # 15 (정수로 변환!)
print(age + 1)             # 16 ✅
\`\`\`

더 짧게:
\`\`\`python
age = int(input('나이: '))
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "숫자 두 개를 입력받아 더하는 코드예요!",
          initialCode: "a = int(input('첫 번째 숫자: '))\nb = int(input('두 번째 숫자: '))\nprint(f'{a} + {b} = {a + b}')",
          expectedOutput: "",
          hint: "int()로 문자열을 숫자로 변환!",
          hint2: "int(input('숫자: '))"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "int('123')의 결과는?",
          options: ["'123' (문자열)", "123 (정수)", "에러", "123.0 (실수)"],
          answer: 1,
          explanation: "int()는 문자열 '123'을 정수 123으로 변환해요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "실수 입력받기",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 실수 입력받기",
          content: `소수점이 있는 숫자는 \`float()\`를 써요!

\`\`\`python
height = float(input('키(cm): '))
print(f'키: {height}cm')
\`\`\`

**타입 변환 정리:**
- \`int()\`: 정수로 변환
- \`float()\`: 실수로 변환
- \`str()\`: 문자열로 변환`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "키(cm)를 입력받아 m로 변환해보세요!",
          initialCode: "cm = float(input('키(cm): '))\nm = cm / 100\nprint(f'{m}m')",
          expectedOutput: "",
          hint: "float()로 실수 변환 후 100으로 나눠요",
          hint2: "cm / 100"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "int('3.14')의 결과는?",
          options: ["3", "3.14", "에러", "'3'"],
          answer: 2,
          explanation: "int()는 소수점 문자열을 바로 변환 못 해요!"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "치킨 가격과 수량을 입력받아 총 가격을 계산하세요!",
          initialCode: "price = int(input('치킨 가격: '))\ncount = int(input('수량: '))\ntotal = price * count\nprint(f'총 가격: {total}원')",
          expectedOutput: "",
          hint: "가격 * 수량 = 총 가격!",
          hint2: "total = price * count"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ \`input()\`으로 사용자 입력 받기
✅ input()은 **항상 문자열** 반환!
✅ \`int()\`, \`float()\`로 숫자 변환
✅ **대화형 프로그램** 만들기!

🎉 **Part 1 완료!**
다음 Part에서는 **조건문**을 배워요! 🧠`
        }
      ]
    }
  ]
}
