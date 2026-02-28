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
          hint: "numbers의 각 요소가 num에 들어가요!",
          hint2: "for num in numbers:"
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
          hint: "인덱스로 접근해서 10을 더해요!",
          hint2: "scores[i] = scores[i] + 10"
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
          hint: "for 안에 if를 넣어요!",
          hint2: "if score >= 80:"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "합격자(60점 이상) 수를 세세요!",
          initialCode: "scores = [45, 80, 55, 90, 70, 30, 85]\npass_count = 0\n\nfor score in scores:\n    if score >= ___:\n        pass_count += ___\n\nprint(f\"합격자: {pass_count}명\")",
          expectedOutput: "합격자: 4명",
          hint: "60점 이상이면 count를 증가시키세요!",
          hint2: "if score >= 60: pass_count += 1"
        }
      ]
    },
    {
      id: "ch4",
      title: "zip으로 묶기",
      emoji: "🤝",
      steps: [
        {
          id: "zip-explain",
          type: "explain",
          title: "🤝 zip() — 두 리스트를 짝짓기!",
          content: `두 개의 리스트를 하나로 묶고 싶을 때:

\`\`\`python
names = ["철수", "영희", "민수"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}점")
# 철수: 85점
# 영희: 92점
# 민수: 78점
\`\`\`

| 방법 | 코드 | 느낌 |
|------|------|------|
| range(len()) | \`for i in range(len(names)): names[i], scores[i]\` | 복잡 😵 |
| **zip()** | \`for name, score in zip(names, scores)\` | 깔끔! ✨ |

💡 zip = 지퍼처럼 두 리스트를 "쭉" 묶는 거예요!`
        },
        {
          id: "zip-pred1",
          type: "predict",
          title: "이 코드의 출력은?",
          content: "zip이 두 리스트를 어떻게 묶을지 생각해봐요!",
          code: "fruits = ['사과', '바나나']\nprices = [1000, 2000]\n\nfor fruit, price in zip(fruits, prices):\n    print(f'{fruit}={price}원')",
          options: ["사과=1000원\n바나나=2000원", "사과 바나나\n1000 2000", "에러", "(사과, 1000)\n(바나나, 2000)"],
          answer: 0,
          explanation: "zip()이 (사과,1000), (바나나,2000)으로 짝지어줘서 f-string으로 출력돼요!"
        },
        {
          id: "zip-pred2",
          type: "predict",
          title: "길이가 다르면?",
          content: "두 리스트 길이가 다를 때 zip은 어떻게 할까요?",
          code: "a = [1, 2, 3]\nb = ['x', 'y']\n\nfor num, letter in zip(a, b):\n    print(num, letter)",
          options: ["1 x\n2 y", "1 x\n2 y\n3 None", "에러", "1 x\n2 y\n3"],
          answer: 0,
          explanation: "zip()은 짧은 쪽에 맞춰서 끝나요! 3은 짝이 없으니 무시돼요. 안전하죠!"
        },
        {
          id: "zip-quiz",
          type: "quiz",
          title: "zip 이해하기!",
          content: "`zip(['a','b'], [1,2])`의 결과를 for문으로 순회하면?",
          options: [
            "('a',1), ('b',2) 순서로 나옴",
            "('a','b'), (1,2) 순서로 나옴",
            "[('a',1), ('b',2)] 리스트가 반환됨",
            "에러 발생"
          ],
          answer: 0,
          explanation: "zip은 같은 위치끼리 짝지어요! 첫번째끼리 ('a',1), 두번째끼리 ('b',2)!"
        }
      ]
    },
    {
      id: "ch5",
      title: "리스트 컴프리헨션",
      emoji: "⚡",
      steps: [
        {
          id: "comp-explain",
          type: "explain",
          title: "⚡ 리스트 컴프리헨션 — 한 줄의 마법!",
          content: `for문으로 새 리스트 만들기, 이렇게 하고 있었죠?

\`\`\`python
# 기존 방법: 4줄 😐
numbers = [1, 2, 3, 4, 5]
doubled = []
for num in numbers:
    doubled.append(num * 2)
# [2, 4, 6, 8, 10]
\`\`\`

**리스트 컴프리헨션으로 한 줄!** 🚀
\`\`\`python
# 컴프리헨션: 1줄! ⚡
doubled = [num * 2 for num in numbers]
# [2, 4, 6, 8, 10]
\`\`\`

**공식:** \`[표현식 for 변수 in 리스트]\`

| 기존 | 컴프리헨션 |
|------|-----------|
| 4줄 코드 | 1줄 코드 |
| 느림 | 빠름 |
| 명확 | 파이썬스러움! ✨ |`
        },
        {
          id: "comp-pred1",
          type: "predict",
          title: "이 코드의 결과는?",
          content: "리스트 컴프리헨션이 어떤 리스트를 만들지 생각해봐요!",
          code: "names = ['alice', 'bob', 'charlie']\nresult = [name.upper() for name in names]\nprint(result)",
          options: ["['ALICE', 'BOB', 'CHARLIE']", "['alice', 'bob', 'charlie']", "ALICE BOB CHARLIE", "에러"],
          answer: 0,
          explanation: "각 name에 .upper()를 적용해서 대문자 리스트가 만들어져요!"
        },
        {
          id: "comp-fillblank",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "1~5의 제곱 리스트를 컴프리헨션으로 만들어요!",
          code: "squares = [___ for ___ in range(1, ___)]",
          fillBlanks: [
            { id: 0, answer: "x**2", options: ["x**2", "x*2", "x+2", "x^2"] },
            { id: 1, answer: "x", options: ["x", "i", "num", "n"] },
            { id: 2, answer: "6", options: ["6", "5", "4", "10"] }
          ],
          explanation: "[x**2 for x in range(1, 6)]은 [1, 4, 9, 16, 25]를 만들어요! range(1,6)은 1~5!"
        },
        {
          id: "comp-if-explain",
          type: "explain",
          title: "🔍 조건부 컴프리헨션!",
          content: `if를 추가하면 필터링도 한 줄!

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 짝수만 골라서 제곱!
even_squares = [n**2 for n in numbers if n % 2 == 0]
# [4, 16, 36, 64, 100]
\`\`\`

**공식:** \`[표현식 for 변수 in 리스트 if 조건]\`

\`\`\`python
# 이것과 같은 뜻:
even_squares = []
for n in numbers:
    if n % 2 == 0:
        even_squares.append(n**2)
\`\`\`

💡 **순서**: for → if → 표현식 (읽는 순서대로!)`
        },
        {
          id: "comp-pred2",
          type: "predict",
          title: "조건부 컴프리헨션 결과는?",
          content: "어떤 단어들만 남을까요?",
          code: "words = ['hi', 'hello', 'hey', 'python', 'ha']\nresult = [w for w in words if len(w) > 2]\nprint(result)",
          options: ["['hello', 'hey', 'python']", "['hi', 'hello', 'hey', 'python', 'ha']", "['hi', 'ha']", "에러"],
          answer: 0,
          explanation: "len(w) > 2인 것만! hi(2), ha(2)는 탈락, hello(5), hey(3), python(6)만 남아요!"
        },
        {
          id: "comp-quiz",
          type: "quiz",
          title: "컴프리헨션 마스터!",
          content: "`[x for x in range(10) if x % 3 == 0]`의 결과는?",
          options: [
            "[0, 3, 6, 9]",
            "[3, 6, 9]",
            "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "[1, 2, 3]"
          ],
          answer: 0,
          explanation: "range(10)에서 3의 배수만! 0÷3=0✅, 3÷3=1✅, 6÷3=2✅, 9÷3=3✅ → [0, 3, 6, 9]"
        }
      ]
    },
    {
      id: "ch6",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission2",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "성적표를 출력하세요!",
          initialCode: "names = [\"철수\", \"영희\", \"민수\"]\nscores = [85, 92, 78]\n\nprint(\"=== 성적표 ===\")\nfor i in range(len(___)):\n    if scores[i] >= 90:\n        grade = ___\n    elif scores[i] >= 80:\n        grade = ___\n    else:\n        grade = ___\n    print(f\"{names[i]}: {scores[i]}점 ({grade})\")",
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
✅ **zip()** - 두 리스트 짝짓기
✅ **리스트 컴프리헨션** - 한 줄로 리스트 만들기

다음 시간에는 **split()과 join()**을 배워요! 🚀`
        }
      ]
    }
  ]
}
