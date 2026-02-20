import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "로또 번호 생성기",
  emoji: "🎱",
  steps: [
    {
      id: "ch2-0",
      type: "tryit",
      title: "🎱 로또 번호 만들기!",
      task: "고정 시드로 로또 번호를 생성해보세요!",
      initialCode: `import random

# seed 고정 → 항상 같은 결과!
random.seed(42)

# 1~45 중 6개 뽑기
numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n not in numbers:
        numbers.append(n)

numbers.sort()

print('=== 로또 번호 ===')
print(f'번호: {numbers}')
print(f'합계: {sum(numbers)}')
print(f'평균: {sum(numbers)/len(numbers):.1f}')`,
      expectedOutput: `=== 로또 번호 ===\n번호: [3, 14, 25, 30, 40, 45]\n합계: 157\n평균: 26.2`,
      hint: "seed(42)를 쓰면 랜덤이 항상 같은 결과를 내요!",
      hint2: "not in으로 중복 체크, sort()로 정렬!"
    },
    {
      id: "ch2-1",
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
