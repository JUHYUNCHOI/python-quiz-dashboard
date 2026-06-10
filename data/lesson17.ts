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
          title: "🔄 리스트 + for = 박스 하나씩 꺼내기",
          content: `리스트의 박스를 **하나씩** 꺼내서 들여다 볼 수 있어요. 학교 사물함을 차례로 여는 느낌!

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for fruit in fruits:        # for (각각) 변수 in (리스트) :
    print(fruit)
# 사과
# 바나나
# 딸기
\`\`\`

**for 변수 in 리스트:** 형태 — \`fruit\` 에 각 박스 값이 차례로 들어가요.`
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
          content: `그냥 꺼내서 보는 것보다, 박스를 하나씩 꺼내면서 **숫자를 차곡차곡 쌓는** 게 진짜 자주 쓰는 패턴이에요. 장바구니에 물건을 하나씩 담으면서 영수증 합계가 *그때그때* 늘어나는 것처럼요. 🧾

핵심은 **밖에 통(\`total\`)을 하나 두고**, for 가 한 바퀴 돌 때마다 그 통에 값을 더하는 거예요.

\`\`\`python
prices = [1000, 2000, 3000]
total = 0                      # ① 빈 통을 먼저 만들고

for price in prices:
    total = total + price      # ② 한 개 꺼낼 때마다 통에 더해요

print("총합:", total)  # 6000
\`\`\`

> 💡 한 바퀴씩 통 안을 따라가 보면:
> - 시작: \`total = 0\`
> - \`price = 1000\` → \`total = 0 + 1000 = 1000\`
> - \`price = 2000\` → \`total = 1000 + 2000 = 3000\`
> - \`price = 3000\` → \`total = 3000 + 3000 = 6000\`
>
> \`total\` 은 **for 안에서 매번 새로 만드는 게 아니라**, 밖에서 만든 통을 *계속 이어서* 쓰는 거예요. for 밖에서 \`total = 0\` 으로 시작하는 게 그래서 중요해요. (안에 두면 매번 0 으로 초기화돼서 늘 마지막 값만 남아요!)

**합계만 필요하면 더 짧게:**
\`\`\`python
total = sum(prices)  # 6000
\`\`\`

\`sum()\` 은 *합계 전용* 단축키예요. 하지만 합계가 아니라 *조건 맞는 것만 세기*, *최댓값 갱신* 같은 건 위처럼 직접 통을 굴려야 하니, 이 "통에 쌓기" 패턴은 꼭 손에 익혀 두세요.`
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
          title: "🔢 enumerate (번호도 같이) — 순서 번호 필요할 때",
          content: `기본 for 는 값만 줘요 — *"철수, 영희, 민수"*. 그런데 가끔은 **"몇 번째 학생인지"** 도 같이 알아야 해요. *"3번 학생: 철수"* 처럼 번호를 붙여 출력하거나, 등수를 매길 때요.

**직접 번호를 세는 방법도 있긴 해요:**
\`\`\`python
i = 0                    # 번호 통을 따로 두고
for fruit in fruits:
    print(f"{i}번: {fruit}")
    i = i + 1            # 매번 직접 1 올려줘야 해요 — 깜빡하기 쉬움!
\`\`\`

이렇게 \`i = i + 1\` 을 손으로 챙기면, *한 줄이라도 빠뜨리면* 번호가 안 올라가거나 엉켜요. **enumerate** 는 이 번호 매기기를 *대신 해주는 도우미*예요. (이름값 그대로 — enumerate = "번호 매기다")

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for i, fruit in enumerate(fruits):    # i = 번호, fruit = 값 (둘 다 자동!)
    print(f"{i}번: {fruit}")
# 0번: 사과
# 1번: 바나나
# 2번: 딸기
\`\`\`

\`enumerate(리스트)\` 가 한 바퀴마다 **(번호, 값)** 을 한 묶음으로 건네줘요. 그래서 \`i, fruit\` 두 변수로 한 번에 받는 거예요.

> 💡 번호는 \`0\` 부터 시작해요 (리스트 인덱스와 똑같이!). 사람이 보는 "1번, 2번…" 으로 바꾸려면 \`i + 1\` 로 출력하면 돼요 — 1등/2등 매길 때 자주 쓰는 손질이에요.`
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
          content: `\`enumerate\` 말고도, **위치 번호(인덱스)** 로 리스트를 도는 방법이 또 있어요 — \`range(len(리스트))\`.

\`len(fruits)\` 가 \`3\` 이면 \`range(3)\` → \`0, 1, 2\`. 즉 **자리 번호를 직접 만들어** 놓고, \`fruits[i]\` 로 그 자리 박스를 꺼내는 거예요.

\`\`\`python
fruits = ["사과", "바나나", "딸기"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")   # i 자리 박스를 직접 집어요
\`\`\`

그런데 *그냥 값만 볼 거면* \`for fruit in fruits:\` 가 훨씬 깔끔해요. **그럼 이 방식은 언제 쓸까요?** — 리스트 **내용을 그 자리에서 바꿔야** 할 때예요.

\`\`\`python
numbers = [1, 2, 3]
for i in range(len(numbers)):
    numbers[i] = numbers[i] * 2    # i 자리에 새 값을 *덮어써요*
print(numbers)  # [2, 4, 6]
\`\`\`

> ⚠️ \`for num in numbers:\` 의 \`num\` 은 박스 속 값의 **복사본**이라, \`num = num * 2\` 해도 원본 리스트는 안 바뀌어요. 원본을 고치려면 *"몇 번 자리"* 인 \`i\` 를 알아야 \`numbers[i] = ...\` 로 그 칸을 직접 덮어쓸 수 있어요. 그래서 **값을 수정할 땐 인덱스 접근** 이 필요한 거예요.`
        },
        {
          id: "pre-for-pattern",
          type: "quiz",
          title: "❓ 결정 — 리스트 값을 수정하려면?",
          content: "**리스트 *값을 수정* 해야 한다면 어느 패턴?**",
          options: ["for x in lst (값만 받음)", "for i, x in enumerate(lst)", "for i in range(len(lst))"],
          answer: 2,
          explanation: "값만 받으면 *복사본* — 수정 안 됨. *위치 (인덱스)* 가 필요하니 `range(len(lst))` 또는 `enumerate` (둘 다 OK)."
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
        },
        {
          id: "ch2-sorted",
          type: "explain",
          title: "📊 정렬하기 — sorted()",
          content: `리스트를 정렬할 때는 \`sorted()\` 함수를 씁니다.

\`\`\`python
nums = [5, 2, 8, 1, 9, 3]
print(sorted(nums))  # [1, 2, 3, 5, 8, 9]  ← 오름차순

print(sorted(nums, reverse=True))  # [9, 8, 5, 3, 2, 1]  ← 내림차순
\`\`\`

💡 \`sorted()\` 는 **새 리스트를 반환**합니다. 원본은 바뀌지 않아요.

\`\`\`python
words = ["banana", "apple", "cherry"]
print(sorted(words))  # ['apple', 'banana', 'cherry']  ← 사전순
print(words)          # ['banana', 'apple', 'cherry']  ← 원본 그대로
\`\`\`

💡 **고급 정렬** (특정 기준으로 정렬하기 — 예: 딕셔너리를 값 기준으로 정렬)은 lesson 35 내장함수 편에서 배워요.`
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
          content: `리스트 전체를 도는 건 똑같은데, 이번엔 **전부 다 처리하지 않고** *마음에 드는 것만 골라내요*. 빨래 바구니에서 흰옷만 따로 빼는 느낌이에요. 🧺

방법은 의외로 단순해요 — **for 로 하나씩 꺼내 보고**, 안에서 **if 로 "이거 조건 맞아?" 한 번 물어보는** 거예요. 맞으면 처리(여기선 출력), 아니면 그냥 지나쳐요.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:        # ① 하나씩 꺼내서
    if num % 2 == 0:       # ② "짝수야?" 라고 물어보고
        print(num)         # ③ 맞을 때만 출력 (홀수면 그냥 통과)
# 2, 4, 6, 8, 10
\`\`\`

> 💡 \`num % 2\` 는 2 로 나눈 **나머지**예요. 짝수는 나머지가 \`0\`, 홀수는 \`1\`. 그래서 \`num % 2 == 0\` 이 "짝수냐?" 를 묻는 거예요.
>
> if 의 조건만 바꾸면 **무엇이든 골라낼 수 있어요** — \`if score >= 80\` 이면 80 점 이상만, \`if "김" in name\` 이면 김씨만. for(다 돌기) + if(조건 검사) 조합은 "조건에 맞는 것만 골라 담기" 의 가장 기본 도구예요.`
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
          title: "🤝 zip (지퍼) — 두 리스트를 짝지어 묶기",
          content: `**zip = 지퍼처럼 묶기**. 두 리스트를 같은 자리끼리 짝지어 한 번에 꺼낼 수 있어요.

\`\`\`python
names = ["철수", "영희", "민수"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}점")
# 철수: 85점
# 영희: 92점
# 민수: 78점
\`\`\`

🎒 비유: 이름표 줄과 점수표 줄을 **지퍼** 로 쭉 닫는 모습.

> 💡 \`range(len())\` 로도 가능하지만 \`zip\` 이 훨씬 깔끔.`
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
          explanation: "zip은 같은 위치끼리 짝지어요! 첫 번째끼리 ('a',1), 두 번째끼리 ('b',2)!"
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
          title: "⚡ 리스트 컴프리헨션 (comprehension) — 한 줄로 만들기",
          content: `L16 에서 살짝 봤죠? 좀 더 깊이 들어가요.

\`\`\`python
# 기존 방법: 4 줄
numbers = [1, 2, 3, 4, 5]
doubled = []
for num in numbers:
    doubled.append(num * 2)
# [2, 4, 6, 8, 10]

# 컴프리헨션: 1 줄!
doubled = [num * 2 for num in numbers]
\`\`\`

**공식:** \`[표현식 for 변수 in 리스트]\`

> 💡 영어로 "for each num in numbers, 2 배 한 걸 모아라" 라고 읽으면 자연스러워요.`
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
          id: "pre-mission2-loop",
          type: "quiz",
          title: "❓ 결정 — 학생 리스트를 어떻게 돌릴까?",
          content: "**학생 리스트를 *돌면서* 점수별 등급 출력 — 어떤 패턴?**",
          options: ["for-each (값만)", "enumerate (값+번호)", "range(len) (위치 직접)"],
          answer: 0,
          explanation: "값만 보면 되니 `for name in names:` 가 제일 깔끔! enumerate 는 번호도 같이 필요할 때."
        },
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
