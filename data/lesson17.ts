// ============================================
// 레슨 17: 리스트와 반복문
// ============================================
import { LessonData } from './types'

export const lesson17Data: LessonData = {
  id: "17",
  title: "리스트와 반복문",
  emoji: "🔁",
  description: "반복문으로 리스트를 다뤄요!",
  chapters: [
    {
      id: "ch1",
      title: "for문으로 순회",
      emoji: "🔄",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 리스트 + for = 최강 조합!",
          content: `리스트의 각 요소를 하나씩 꺼낼 수 있어요:

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for fruit in fruits:
    print(fruit)
# 사과
# 바나나
# 딸기
\`\`\`

**for 변수 in 리스트:** 형태!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "리스트의 모든 요소를 출력하세요!",
          initialCode: "numbers = [10, 20, 30, 40, 50]\n\nfor num in numbers:\n    print(num)",
          expectedOutput: "10\n20\n30\n40\n50",
          hint: "for num in numbers:",
          hint2: "numbers의 각 요소가 num에 들어가요!"
        },
        {
          id: "calc-explain",
          type: "explain",
          title: "🧮 순회하면서 계산",
          content: `각 요소로 뭔가를 할 수 있어요:

\`\`\`python
prices = [1000, 2000, 3000]
total = 0

for price in prices:
    total = total + price

print("총합:", total)  # 6000
\`\`\`

**더 짧게:**
\`\`\`python
total = sum(prices)  # 6000
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 합계 구하기!",
          task: "점수의 합계를 구하세요!",
          initialCode: "scores = [85, 90, 78, 92, 88]\ntotal = 0\n\nfor score in scores:\n    total = total + score\n\nprint(\"합계:\", total)",
          expectedOutput: "합계: 433",
          hint: "total = total + score",
          hint2: "또는 total += score"
        }
      ]
    },
    {
      id: "ch2",
      title: "인덱스와 함께",
      emoji: "🔢",
      steps: [
        {
          id: "enumerate-explain",
          type: "explain",
          title: "🔢 enumerate() - 인덱스도 필요할 때",
          content: `순서 번호(인덱스)도 같이 필요하면?

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for i, fruit in enumerate(fruits):
    print(f"{i}번: {fruit}")
# 0번: 사과
# 1번: 바나나
# 2번: 딸기
\`\`\`

**enumerate(리스트)** = (인덱스, 값) 쌍!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 순위 출력!",
          task: "순위와 이름을 함께 출력하세요!",
          initialCode: "winners = [\"철수\", \"영희\", \"민수\"]\n\nfor i, name in enumerate(winners):\n    print(f\"{i+1}등: {name}\")",
          expectedOutput: "1등: 철수\n2등: 영희\n3등: 민수",
          hint: "i+1로 1부터 시작하게!",
          hint2: "enumerate()는 0부터 시작해요"
        },
        {
          id: "range-explain",
          type: "explain",
          title: "🔢 range()와 인덱스 접근",
          content: `range(len(리스트))로도 순회 가능:

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
\`\`\`

**값을 수정할 때 유용해요:**
\`\`\`python
numbers = [1, 2, 3]
for i in range(len(numbers)):
    numbers[i] = numbers[i] * 2
print(numbers)  # [2, 4, 6]
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 값 수정하기!",
          task: "모든 점수에 10점씩 더하세요!",
          initialCode: "scores = [70, 80, 90]\n\nfor i in range(len(scores)):\n    scores[i] = scores[i] + 10\n\nprint(scores)",
          expectedOutput: "[80, 90, 100]",
          hint: "scores[i] = scores[i] + 10",
          hint2: "또는 scores[i] += 10"
        }
      ]
    },
    {
      id: "ch3",
      title: "조건과 결합",
      emoji: "🔍",
      steps: [
        {
          id: "filter-explain",
          type: "explain",
          title: "🔍 조건에 맞는 것만 찾기",
          content: `for문 안에서 if문으로 필터링:

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:
    if num % 2 == 0:  # 짝수만
        print(num)
# 2, 4, 6, 8, 10
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 80점 이상만!",
          task: "80점 이상인 점수만 출력하세요!",
          initialCode: "scores = [65, 80, 72, 95, 88, 55, 90]\n\nfor score in scores:\n    if score >= 80:\n        print(score)",
          expectedOutput: "80\n95\n88\n90",
          hint: "if score >= 80:",
          hint2: "for 안에 if를 넣어요!"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "합격자(60점 이상) 수를 세세요!",
          initialCode: "scores = [45, 80, 55, 90, 70, 30, 85]\npass_count = 0\n\nfor score in scores:\n    if score >= 60:\n        pass_count += 1\n\nprint(f\"합격자: {pass_count}명\")",
          expectedOutput: "합격자: 4명",
          hint: "if score >= 60: pass_count += 1",
          hint2: "60점 이상이면 count 증가!"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission2",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "성적표를 출력하세요!",
          initialCode: "names = [\"철수\", \"영희\", \"민수\"]\nscores = [85, 92, 78]\n\nprint(\"=== 성적표 ===\")\nfor i in range(len(names)):\n    if scores[i] >= 90:\n        grade = \"A\"\n    elif scores[i] >= 80:\n        grade = \"B\"\n    else:\n        grade = \"C\"\n    print(f\"{names[i]}: {scores[i]}점 ({grade})\")",
          expectedOutput: "=== 성적표 ===\n철수: 85점 (B)\n영희: 92점 (A)\n민수: 78점 (C)",
          hint: "range(len(names))로 인덱스 순회!",
          hint2: "names[i]와 scores[i]를 같이 사용!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **for item in list** - 기본 순회
✅ **enumerate()** - 인덱스와 함께
✅ **range(len())** - 인덱스로 접근
✅ **for + if** - 조건 필터링

다음 시간에는 **split()과 join()**을 배워요! 🚀`
        }
      ]
    }
  ]
}
