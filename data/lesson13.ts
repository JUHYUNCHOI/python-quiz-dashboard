// ============================================
// 레슨 13: 반복문 (for)
// ============================================
import { LessonData } from './types'

export const lesson13Data: LessonData = {
  id: "13",
  title: "반복문 (for)",
  emoji: "🔄",
  description: "정해진 횟수만큼 반복하는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "for문 기초",
      emoji: "🔁",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 반복이 필요해!",
          content: `"안녕하세요"를 5번 출력하고 싶어요.

\`\`\`python
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
\`\`\`

100번이면? 😱 **반복문**으로 해결!`
        },
        {
          id: "for-explain",
          type: "explain",
          title: "🔁 for문 기본",
          content: `\`\`\`python
for i in range(5):
    print("안녕하세요")
\`\`\`

이 코드가 "안녕하세요"를 **5번** 출력해요!

- \`for\`: 반복해!
- \`i\`: 반복할 때마다 바뀌는 변수
- \`range(5)\`: 0, 1, 2, 3, 4 (5번)
- \`:\`: 콜론 필수!
- 들여쓰기: 반복할 코드`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'Hello!'를 3번 출력하세요!",
          initialCode: "for i in range(___):\n    print(\"Hello!\")",
          expectedOutput: "Hello!\nHello!\nHello!",
          hint: "range(3)은 3번 반복!",
          hint2: "for i in range(3):"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`for i in range(4):`의 반복 횟수는?",
          options: ["3번", "4번", "5번", "에러"],
          answer: 1,
          explanation: "range(4)는 0, 1, 2, 3으로 4번 반복해요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "range() 활용",
      emoji: "🔢",
      steps: [
        {
          id: "range-explain",
          type: "explain",
          title: "🔢 range() 자세히",
          content: `**range(끝)** - 0부터 끝-1까지
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
\`\`\`

**range(시작, 끝)** - 시작부터 끝-1까지
\`\`\`python
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5
\`\`\`

**range(시작, 끝, 간격)**
\`\`\`python
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 1부터 5까지 출력!",
          task: "1, 2, 3, 4, 5를 출력하세요!",
          initialCode: "# 1부터 5까지 출력하세요\nfor i in range(___, ___):\n    print(i)",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "range(1, 6)은 1부터 5까지!",
          hint2: "for i in range(1, 6):"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 짝수만 출력!",
          task: "2, 4, 6, 8, 10을 출력하세요!",
          initialCode: "# 2부터 10까지 2씩 증가\nfor i in range(___, ___, ___):\n    print(i)",
          expectedOutput: "2\n4\n6\n8\n10",
          hint: "range(시작, 끝, 간격) 사용!",
          hint2: "range(2, 11, 2)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`range(1, 10, 3)`이 생성하는 숫자들은?",
          options: ["1, 2, 3", "1, 4, 7", "1, 4, 7, 10", "3, 6, 9"],
          answer: 1,
          explanation: "1부터 시작해서 3씩 증가! 1, 4, 7 (10 미포함)"
        }
      ]
    },
    {
      id: "ch3",
      title: "리스트 순회",
      emoji: "📋",
      steps: [
        {
          id: "list-explain",
          type: "explain",
          title: "📋 리스트 순회하기",
          content: `**리스트** \`[]\`는 여러 값을 한곳에 담는 상자예요!
\`\`\`python
fruits = ["사과", "바나나", "딸기"]
\`\`\`

💡 리스트는 **Part 3에서 자세히** 배워요! 지금은 for문과 함께 쓰는 법만 봐요.

for문으로 리스트의 각 요소를 하나씩 꺼낼 수 있어요:

\`\`\`python
for fruit in fruits:
    print(fruit)
# 사과
# 바나나
# 딸기
\`\`\`

**for 변수 in 리스트:** 형태!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "이름들을 하나씩 인사하세요!",
          initialCode: "names = [\"철수\", \"영희\", \"민수\"]\n\nfor ___ in names:\n    print(f\"안녕, {___}!\")",
          expectedOutput: "안녕, 철수!\n안녕, 영희!\n안녕, 민수!",
          hint: "리스트의 각 요소가 변수에 들어가요!",
          hint2: "for name in names: / {name}"
        },
        {
          id: "sum-explain",
          type: "explain",
          title: "🧮 합계 구하기",
          content: `for문으로 합계를 구할 수 있어요:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
total = 0

for num in numbers:
    total = total + num

print(f"합계: {total}")  # 합계: 150
\`\`\`

또는 더 짧게:
\`\`\`python
total = sum(numbers)  # 150
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 합계 구하기!",
          task: "점수들의 합계를 구하세요!",
          initialCode: "scores = [85, 90, 78, 92, 88]\ntotal = 0\n\nfor score in scores:\n    # total에 score를 더하세요\n    total = ___\n\nprint(f\"총점: {total}\")",
          expectedOutput: "총점: 433",
          hint: "현재 total에 score를 더해서 다시 total에 저장!",
          hint2: "또는 total += score"
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
          task: "구구단 5단을 출력하세요!",
          initialCode: "dan = 5\n\nfor i in range(___, ___):\n    result = ___\n    print(f\"{dan} x {i} = {result}\")",
          expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45",
          hint: "range(1, 10)으로 1~9, result = dan * i",
          hint2: "range(1, 10) / dan * i"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **for i in range(n):** - n번 반복
✅ **range(시작, 끝, 간격)** - 범위 지정
✅ **for item in list:** - 리스트 순회
✅ **합계 구하기** - total += num

다음 시간에는 **while 반복문**을 배워요! 🚀`
        }
      ]
    }
  ]
}
