import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "로또 번호 생성기",
  emoji: "🎱",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 생각해보기: 랜덤 번호 뽑기",
      content: `![랜덤 번호 뽑기](/lessons/l28/ch1-0-random.png)

💭 로또는 1~45 중에서 6개를 뽑잖아. 근데 **같은 번호가 두 번** 나오면 안 되는데... 어떻게 중복 없이 뽑지?

\`\`\`python
import random
random.seed(42)  # 항상 같은 결과!

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n not in numbers:  # 중복 체크!
        numbers.append(n)
\`\`\`

@핵심: \`not in\`으로 중복 체크하면서 6개가 될 때까지 반복!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "🎱 로또 번호 만들기!",
      task: "빈칸을 채워서 로또 번호를 뽑아보세요!",
      initialCode: `import random
random.seed(42)

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n ___ in numbers:
        numbers.___(n)

numbers.sort()

print('=== 로또 번호 ===')
print(f'번호: {___}')`,
      expectedOutput: `=== 로또 번호 ===\n번호: [3, 14, 25, 30, 40, 45]`,
      hint: "중복이 아닌 것만! not in으로 체크, append로 추가!",
      hint2: "not / append / numbers"
    },
    {
      id: "ch1-2",
      type: "explain",
      title: "💭 생각해보기: 여러 세트 뽑기",
      content: `![여러 세트 뽑기](/lessons/l28/ch1-2-multi.png)

💭 로또 1장만 사면 아쉽지! **5세트**를 뽑으려면? 번호 뽑는 코드를 5번 반복하면 되겠지?

\`\`\`python
for game in range(1, 6):
    numbers = []  # 매 세트마다 새로!
    # ... 6개 뽑기 ...
    numbers.sort()  # 정렬!
\`\`\`

@핵심: \`for\`문으로 5번 반복! 매번 빈 리스트로 시작하고 \`sort()\`로 정렬!`
    },
    {
      id: "ch1-3",
      type: "mission",
      title: "🎯 미션: 로또 5세트!",
      task: "빈칸 3개를 채워서 5세트를 만드세요!",
      initialCode: `import random
random.seed(100)

for game in range(1, 6):
    numbers = []
    while len(numbers) < ___:
        n = random.randint(1, 45)
        if n not ___ numbers:
            numbers.append(n)
    numbers.___()
    print(f'{game}세트: {numbers}')`,
      expectedOutput: `1세트: [5, 6, 12, 17, 27, 28]\n2세트: [2, 16, 21, 26, 34, 44]\n3세트: [2, 12, 21, 24, 36, 43]\n4세트: [6, 7, 15, 16, 24, 37]\n5세트: [3, 4, 7, 18, 34, 37]`,
      hint: "6개 뽑기, 중복 체크, 정렬!",
      hint2: "6 / in / sort"
    }
  ]
}
