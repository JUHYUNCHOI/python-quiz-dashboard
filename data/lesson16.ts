// ============================================
// 레슨 16: 리스트 기초
// ============================================
import { LessonData } from './types'

export const lesson16Data: LessonData = {
  id: "16",
  title: "리스트 기초",
  emoji: "📋",
  description: "여러 데이터를 한 번에 저장하는 리스트!",
  chapters: [
    {
      id: "ch1",
      title: "리스트 만들기",
      emoji: "📝",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📋 리스트란?",
          content: `**리스트** = 여러 값을 순서대로 저장하는 자료구조

\`\`\`python
fruits = ["사과", "바나나", "딸기"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

- **대괄호 [ ]** 사용
- **쉼표(,)**로 구분
- **다양한 타입** 섞어서 저장 가능!

### 어디서 자주 쓰여요?

- 학생 명단, 점수 기록 — **순서대로** 줄 세우기
- 장바구니, 댓글 — **추가/삭제** 가 잦음
- 게임 인벤토리 — 들어오고 나가고
- 입력 받은 여러 값 모음 — \`input().split()\` 결과
- 자료 처리의 가장 기본 단위

> 🎯 자료구조 4 종 중 **가장 많이 쓰는** 게 리스트예요. 익혀두면 평생 사용.`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 리스트 만드는 다양한 방법",
          content: `\`\`\`python
# 1) 대괄호 — 가장 흔함
fruits = ["사과", "바나나"]
empty = []

# 2) list() 함수 — 다른 컬렉션을 리스트로
chars = list("hello")        # ['h', 'e', 'l', 'l', 'o']
nums  = list(range(5))       # [0, 1, 2, 3, 4]
empty = list()               # []

# 3) 같은 값 여러 번 — *
zeros = [0] * 5              # [0, 0, 0, 0, 0]
hello = ["hi"] * 3           # ['hi', 'hi', 'hi']

# 4) 리스트 컴프리헨션 (다음 레슨에서 자세히)
squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]
\`\`\`

### range 와 함께 — 자주 쓰는 패턴

\`\`\`python
# 0 부터 9 까지
list(range(10))         # [0, 1, ..., 9]

# 1 부터 10 까지
list(range(1, 11))      # [1, 2, ..., 10]

# 짝수만 (1~20)
list(range(2, 21, 2))   # [2, 4, 6, ..., 20]
\`\`\`

> 💡 **\`[0] * n\`** 은 게임 점수판 / 카운터 초기화에 유용. **\`list(range(...))\`** 는 코딩 테스트에서 자주.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "과일 리스트를 만들고 출력하세요!",
          initialCode: "fruits = [\"사과\", \"바나나\", \"딸기\"]\nprint(fruits)",
          expectedOutput: "['사과', '바나나', '딸기']",
          hint: "대괄호 안에 값들을 넣어요!",
          hint2: "[\"사과\", \"바나나\", \"딸기\"]"
        },
        {
          id: "index-explain",
          type: "explain",
          title: "🔢 인덱스로 접근",
          content: `각 요소는 **인덱스(순서)**로 접근해요!

\`\`\`python
fruits = ["사과", "바나나", "딸기"]
#          [0]      [1]       [2]

print(fruits[0])  # 사과 (첫 번째)
print(fruits[1])  # 바나나 (두 번째)
print(fruits[2])  # 딸기 (세 번째)
\`\`\`

⚠️ 인덱스는 **0부터** 시작해요!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 인덱스로 접근!",
          task: "두 번째 과일을 출력하세요!",
          initialCode: "fruits = [\"사과\", \"바나나\", \"딸기\"]\nprint(fruits[1])",
          expectedOutput: "바나나",
          hint: "두 번째는 인덱스 1!",
          hint2: "fruits[1]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "[10, 20, 30][2]의 결과는?",
          options: ["10", "20", "30", "에러"],
          answer: 2,
          explanation: "인덱스 2는 세 번째 요소! 30이에요."
        }
      ]
    },
    {
      id: "ch2",
      title: "리스트 수정",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ 값 수정하기",
          content: `인덱스로 접근해서 값을 바꿀 수 있어요:

\`\`\`python
fruits = ["사과", "바나나", "딸기"]
fruits[1] = "포도"  # 바나나 → 포도
print(fruits)  # ['사과', '포도', '딸기']
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 값 수정하기!",
          task: "첫 번째 값을 '오렌지'로 바꾸세요!",
          initialCode: "fruits = [\"사과\", \"바나나\", \"딸기\"]\nfruits[0] = \"오렌지\"\nprint(fruits)",
          expectedOutput: "['오렌지', '바나나', '딸기']",
          hint: "인덱스 0은 첫 번째!",
          hint2: "fruits[0] = \"오렌지\""
        },
        {
          id: "add-explain",
          type: "explain",
          title: "➕ 요소 추가/삭제",
          content: `**append()** - 끝에 추가
\`\`\`python
fruits = ["사과", "바나나"]
fruits.append("딸기")
print(fruits)  # ['사과', '바나나', '딸기']
\`\`\`

**remove()** - 값으로 삭제
\`\`\`python
fruits.remove("바나나")
print(fruits)  # ['사과', '딸기']
\`\`\`

**pop()** - 인덱스로 삭제 (기본: 마지막)
\`\`\`python
fruits.pop()   # 마지막 삭제
fruits.pop(0)  # 첫 번째 삭제
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 요소 추가하기!",
          task: "'포도'를 추가하세요!",
          initialCode: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"포도\")\nprint(fruits)",
          expectedOutput: "['사과', '바나나', '포도']",
          hint: "append()로 추가!",
          hint2: "fruits.append(\"포도\")"
        },
        {
          id: "insert-explain",
          type: "explain",
          title: "📍 insert — 특정 위치에 끼워넣기",
          content: `\`append\` 는 끝에만 추가. **insert(위치, 값)** 으로 원하는 위치에 끼워넣을 수 있어요.

\`\`\`python
fruits = ["사과", "딸기", "포도"]

# 인덱스 1 자리에 '바나나' 끼워넣기 (뒤에 있던 건 한 칸씩 밀림)
fruits.insert(1, "바나나")
print(fruits)
# ['사과', '바나나', '딸기', '포도']

# 맨 앞에 추가 (인덱스 0)
fruits.insert(0, "오렌지")
print(fruits)
# ['오렌지', '사과', '바나나', '딸기', '포도']
\`\`\`

### remove vs pop 다시

\`\`\`python
nums = [10, 20, 30, 20, 40]

# remove(값) — 값으로 첫 등장만 삭제
nums.remove(20)
print(nums)   # [10, 30, 20, 40] ← 첫 20 만

# pop(인덱스) — 위치로 삭제 + 그 값 반환
val = nums.pop(0)
print(val, nums)   # 10 [30, 20, 40]

# pop() — 마지막 (인덱스 생략)
last = nums.pop()
print(last, nums)  # 40 [30, 20]
\`\`\`

> 🎯 한 줄: **append=뒤에, insert=원하는 위치, remove=값으로 삭제, pop=위치로 삭제+꺼내기.**`
        },
        {
          id: "try-insert",
          type: "tryit",
          title: "🖥️ 직접 해보기 — insert / pop",
          task: "맨 앞에 '오렌지' 끼워넣고, 마지막 요소를 꺼내서 출력하세요!",
          initialCode: "fruits = [\"사과\", \"바나나\", \"딸기\"]\n\n# 맨 앞에 '오렌지' 끼워넣기\nfruits.___(0, \"오렌지\")\n\n# 마지막 꺼내기 (반환값 받기)\nlast = fruits.___()\n\nprint(f\"리스트: {fruits}\")\nprint(f\"꺼낸 값: {last}\")",
          expectedOutput: "리스트: ['오렌지', '사과', '바나나']\n꺼낸 값: 딸기",
          hint: "fruits.insert(0, \"오렌지\") / last = fruits.pop()",
          hint2: "fruits.insert(0, \"오렌지\")\nlast = fruits.pop()"
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "🔗 리스트 합치기 — + 와 extend",
          content: `두 리스트를 합치는 두 가지 방법.

\`\`\`python
a = [1, 2, 3]
b = [4, 5, 6]

# 방법 1) + 연산자 — 새 리스트 만듦
merged = a + b
print(merged)  # [1, 2, 3, 4, 5, 6]
print(a)       # [1, 2, 3] — 원본 안 변함!

# 방법 2) extend — a 에 직접 합침
a.extend(b)
print(a)       # [1, 2, 3, 4, 5, 6] — a 자체가 변함
\`\`\`

### append vs extend 헷갈림 주의

\`\`\`python
a = [1, 2, 3]
b = [4, 5, 6]

a.append(b)    # b 를 통째로 한 요소로 넣음
print(a)       # [1, 2, 3, [4, 5, 6]]   ← 중첩!

a = [1, 2, 3]
a.extend(b)    # b 의 요소들을 풀어서 넣음
print(a)       # [1, 2, 3, 4, 5, 6]     ← 평평
\`\`\`

> 🎯 한 줄: **append = 그대로 한 개로, extend = 풀어서 여러 개로.**`
        },
        {
          id: "try-concat",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 리스트 합치기",
          task: "두 반의 학생 명단을 + 로 합쳐 전체 명단을 만드세요!",
          initialCode: "class_a = [\"철수\", \"영희\", \"민수\"]\nclass_b = [\"수지\", \"준호\"]\n\n# + 로 새 리스트 만들기 (원본 안 변함)\nall_students = ___\n\nprint(f\"전체: {all_students}\")\nprint(f\"인원: {len(all_students)}명\")\nprint(f\"A 반은 그대로: {class_a}\")",
          expectedOutput: "전체: ['철수', '영희', '민수', '수지', '준호']\n인원: 5명\nA 반은 그대로: ['철수', '영희', '민수']",
          hint: "all_students = class_a + class_b",
          hint2: "all_students = class_a + class_b"
        }
      ]
    },
    {
      id: "ch3",
      title: "리스트 기능",
      emoji: "🔧",
      steps: [
        {
          id: "len-explain",
          type: "explain",
          title: "📏 길이와 검색",
          content: `**len()** - 길이 구하기
\`\`\`python
fruits = ["사과", "바나나", "딸기"]
print(len(fruits))  # 3
\`\`\`

**in** - 포함 여부
\`\`\`python
print("사과" in fruits)  # True
print("포도" in fruits)  # False
\`\`\`

**index()** - 위치 찾기
\`\`\`python
print(fruits.index("바나나"))  # 1
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 길이 구하기!",
          task: "리스트 길이를 출력하세요!",
          initialCode: "numbers = [10, 20, 30, 40, 50]\nprint(f\"개수: {len(numbers)}개\")",
          expectedOutput: "개수: 5개",
          hint: "len()으로 길이!",
          hint2: "len(numbers)"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ 음수 인덱스",
          content: `뒤에서부터 셀 수도 있어요!

\`\`\`python
fruits = ["사과", "바나나", "딸기"]
#          [0]      [1]       [2]
#          [-3]     [-2]      [-1]

print(fruits[-1])  # 딸기 (마지막)
print(fruits[-2])  # 바나나 (뒤에서 두 번째)
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "[1, 2, 3, 4, 5][-1]의 결과는?",
          options: ["1", "5", "-1", "에러"],
          answer: 1,
          explanation: "[-1]은 마지막 요소! 5예요."
        },
        {
          id: "sort-explain",
          type: "explain",
          title: "🔢 정렬과 뒤집기 — sort / sorted / reverse",
          content: `**sort()** — 리스트 자체를 정렬 (원본 변경)
**sorted()** — 정렬된 **새 리스트** 반환 (원본 그대로)
**reverse()** — 순서 뒤집기

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# sort() — 자체 정렬
nums.sort()
print(nums)    # [1, 1, 2, 3, 4, 5, 6, 9]

# 내림차순
nums.sort(reverse=True)
print(nums)    # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() — 원본 보존
original = [3, 1, 4]
new_list = sorted(original)
print(new_list)   # [1, 3, 4]
print(original)   # [3, 1, 4] — 그대로!

# reverse() — 정렬 안 하고 단순히 뒤집기
fruits = ["사과", "배", "감"]
fruits.reverse()
print(fruits)  # ['감', '배', '사과']
\`\`\`

### 키 함수 — 길이순/특정 기준 정렬

\`\`\`python
words = ["apple", "kiwi", "banana"]

words.sort(key=len)        # 길이순
print(words)               # ['kiwi', 'apple', 'banana']
\`\`\`

> 🎯 **자체 변경 vs 새 리스트** — sort vs sorted 의 가장 큰 차이.`
        },
        {
          id: "try-sort",
          type: "tryit",
          title: "🖥️ 직접 해보기 — sort 와 sorted",
          task: "점수 리스트를 정렬해 두 줄로 출력하세요. 첫 줄은 원본 그대로, 둘째 줄은 정렬된 결과.",
          initialCode: "scores = [85, 92, 78, 95, 67, 88]\n\n# 1) sorted() 로 새 정렬 리스트\ntop_scores = ___(scores, reverse=True)\n\nprint(f\"원본: {scores}\")\nprint(f\"내림차순: {top_scores}\")",
          expectedOutput: "원본: [85, 92, 78, 95, 67, 88]\n내림차순: [95, 92, 88, 85, 78, 67]",
          hint: "sorted(scores, reverse=True) — 원본 안 건드림.",
          hint2: "top_scores = sorted(scores, reverse=True)"
        },
        {
          id: "count-method",
          type: "explain",
          title: "🔢 count — 같은 값 몇 개?",
          content: `**count(값)** — 그 값이 몇 번 들어있는지.

\`\`\`python
votes = ["A", "B", "A", "C", "A", "B"]

print(votes.count("A"))   # 3
print(votes.count("B"))   # 2
print(votes.count("D"))   # 0 — 없으면 0
\`\`\`

### 가장 많이 등장한 값 찾기

\`\`\`python
votes = ["A", "B", "A", "C", "A", "B"]
unique = set(votes)   # 후보들

# 각 후보의 표를 세서 max
winner = max(unique, key=votes.count)
print(winner)   # 'A'
\`\`\`

> 💡 더 큰 데이터는 \`collections.Counter\` (다음 레슨 / 딕셔너리 레슨에서 본 거).`
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ 리스트 컴프리헨션 — 한 줄로 만들기",
          content: `for 루프로 만들던 리스트를 **한 줄에**.

\`\`\`python
# 기존 방식 — 4 줄
squares = []
for n in range(1, 6):
    squares.append(n * n)
# [1, 4, 9, 16, 25]

# 컴프리헨션 — 1 줄
squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]
\`\`\`

### 조건 추가 (if 필터)

\`\`\`python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 짝수만
even = [n for n in nums if n % 2 == 0]
# [2, 4, 6, 8, 10]

# 짝수의 제곱
even_sq = [n*n for n in nums if n % 2 == 0]
# [4, 16, 36, 64, 100]
\`\`\`

### 학생 점수 → 합격 명단

\`\`\`python
scores = [("철수", 85), ("영희", 55), ("민수", 70)]
passed = [name for name, s in scores if s >= 60]
# ['철수', '민수']
\`\`\`

> 🎯 익숙해지면 매우 강력. 처음엔 어려우면 그냥 for 루프 써도 OK — 점차 익숙해져요.`
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 컴프리헨션",
          task: "1~10 중 짝수만 골라 제곱해서 출력하세요!",
          initialCode: "# 1~10 의 짝수만 골라 그 제곱을 리스트로\n# (10 은 포함, range(1, 11))\nresult = ___\n\nprint(result)",
          expectedOutput: "[4, 16, 36, 64, 100]",
          hint: "[n * n for n in range(1, 11) if n % 2 == 0]",
          hint2: "result = [n * n for n in range(1, 11) if n % 2 == 0]"
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
          title: "🏆 미션 1 — 장바구니 시스템",
          task: "장바구니 시스템을 만들어보세요!",
          initialCode: "cart = []\n\n# 상품 추가\ncart.___(\"사과\")\ncart.___(\"우유\")\ncart.___(\"빵\")\n\nprint(\"장바구니:\", cart)\nprint(f\"총 {___(cart)}개 상품\")\n\n# 우유 삭제\ncart.___(\"우유\")\nprint(\"우유 삭제 후:\", cart)",
          expectedOutput: "장바구니: ['사과', '우유', '빵']\n총 3개 상품\n우유 삭제 후: ['사과', '빵']",
          hint: "append()로 추가, remove()로 삭제!",
          hint2: "len()으로 개수 확인!"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 점수 통계 한방에",
          task: "점수 리스트에서 **최고/최저/평균/정렬된 상위 3 개** 를 한꺼번에 출력하세요.",
          initialCode: "scores = [85, 92, 78, 95, 67, 88, 73, 90, 81, 76]\n\nprint(f\"개수: {len(scores)}\")\nprint(f\"최고: {___(scores)}\")\nprint(f\"최저: {___(scores)}\")\nprint(f\"평균: {___(scores) / len(scores):.1f}\")\n\n# 상위 3 개 (정렬 내림차순 후 [:3])\ntop3 = sorted(scores, reverse=True)[:___]\nprint(f\"상위 3: {top3}\")",
          expectedOutput: "개수: 10\n최고: 95\n최저: 67\n평균: 82.5\n상위 3: [95, 92, 90]",
          hint: "max, min, sum 내장 함수. [:3] 으로 처음 3 개.",
          hint2: "max(scores), min(scores), sum(scores), [:3]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 입력 받은 수의 짝수만",
          task: "공백으로 구분된 정수들을 입력받아 **짝수만 정렬해** 출력하세요!",
          initialCode: "nums = list(map(int, input().split()))\n\n# 컴프리헨션으로 짝수만 골라 정렬\nevens = sorted([n for n in nums if n % ___ == 0])\n\nprint(evens)",
          expectedOutput: "[2, 4, 6, 8]",
          stdin: "5 2 8 3 6 1 4 7",
          hint: "n % 2 == 0 이 짝수.",
          hint2: "evens = sorted([n for n in nums if n % 2 == 0])"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **리스트 \`[ ]\`** — 순서대로 저장, 가장 많이 쓰는 자료구조
✅ **만드는 법** — \`[...]\`, \`list()\`, \`[0]*n\`, \`list(range(...))\`
✅ **인덱스** — \`[0]\` 부터, 음수 \`[-1]\` 도 가능
✅ **수정** — \`a[i] = v\`
✅ **추가** — \`append\` (끝), \`insert(i, v)\` (특정 위치)
✅ **삭제** — \`remove(값)\`, \`pop(인덱스)\`, \`pop()\` (마지막)
✅ **합치기** — \`+\` (새 리스트), \`extend\` (자체 변경)
✅ **append vs extend 함정** — 통째로 vs 풀어서
✅ **정렬** — \`sort()\` (자체) / \`sorted()\` (새 리스트), \`reverse=True\` 내림차순
✅ **검사** — \`len\`, \`in\`, \`index\`, \`count\`
✅ **컴프리헨션** — \`[n*n for n in range(1, 6) if ...]\`

다음 시간에는 **리스트와 반복문 — for 로 리스트 다루기** 를 배워요! 🚀`
        }
      ]
    }
  ]
}
