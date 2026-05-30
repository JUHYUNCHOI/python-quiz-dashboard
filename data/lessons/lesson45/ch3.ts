import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "random & datetime 개념",
  emoji: "🎲",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 주사위 굴리기를 코드로 만들려면?",
      content: `💭 게임에서 **주사위 굴리기**, **가위바위보 랜덤 선택**, **뽑기**... 이런 걸 코드로 어떻게 만들까? 매번 다른 값이 나오게 할 수 있을까?

\`\`\`python
import random

# 정수 랜덤
random.randint(1, 6)    # 주사위: 1~6 중 하나

# 리스트에서 선택
random.choice(['가위', '바위', '보'])

# 리스트 섞기
cards = [1, 2, 3, 4, 5]
random.shuffle(cards)

# 0~1 사이 실수
random.random()  # 0.7432... 등
\`\`\`

@핵심: **random** 모듈 = randint(범위 정수), choice(리스트에서 하나), shuffle(섞기)!

⚠️ random은 실행할 때마다 결과가 달라요!
💡 **seed**를 지정하면 같은 결과를 얻을 수 있어요:
\`\`\`python
random.seed(42)  # 시드 고정
random.randint(1, 10)  # 항상 같은 값!
\`\`\``
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "퀴즈: random!",
      content: "`random.randint(1, 10)`의 결과로 나올 수 **없는** 값은?",
      options: ["1", "5", "10", "11"],
      answer: 3,
      explanation: "randint(1, 10)은 1~10 사이! 11은 나올 수 없어요!"
    },
    {
      id: "ch3-2",
      type: "quiz",
      title: "퀴즈: random.choice!",
      content: "`random.choice(['a', 'b', 'c'])`는 무엇을 하나요?",
      options: [
        "항상 'a'를 반환",
        "리스트에서 랜덤으로 하나 선택",
        "리스트를 정렬",
        "리스트를 섞음"
      ],
      answer: 1,
      explanation: "choice는 리스트에서 랜덤으로 하나를 골라요!"
    },
    {
      id: "ch3-3",
      type: "explain",
      title: "💭 생일까지 며칠 남았는지 계산하려면?",
      content: `💭 **오늘 날짜**를 알고 싶거나, 두 날짜 사이의 **며칠 차이**를 계산하고 싶을 때... 직접 빼기를 하기엔 복잡한데?

\`\`\`python
import datetime

# 현재 날짜/시간
now = datetime.datetime.now()
print(now)  # 2024-03-15 14:30:00.123456

# 특정 날짜 만들기
birthday = datetime.date(2010, 5, 20)
print(birthday)  # 2010-05-20

# 날짜 차이 계산
d1 = datetime.date(2024, 1, 1)
d2 = datetime.date(2024, 12, 31)
diff = d2 - d1
print(diff.days)  # 365
\`\`\`

@핵심: **datetime** 모듈 = 날짜 만들기(date), 현재 시간(now), 날짜끼리 빼기(-)로 차이 계산!`
    },
    {
      id: "ch3-4",
      type: "tryit",
      title: "💻 datetime 고정값 실습!",
      task: "고정 날짜로 날짜 계산을 실행해보세요!",
      initialCode: `import datetime

# 고정 날짜로 실습
birthday = datetime.date(2010, 5, 20)
school_start = datetime.date(2024, 3, 4)
today = datetime.date(2024, 6, 15)

# 날짜 정보 꺼내기
print(f'생일: {birthday.year}년 {birthday.month}월 {birthday.day}일')

# 날짜 차이 계산
age_days = today - birthday
school_days = today - school_start

print(f'태어난 지 {age_days.days}일')
print(f'개학한 지 {school_days.days}일')

# 비교
if today > birthday:
    print('생일이 지났어요!')`,
      expectedOutput: `생일: 2010년 5월 20일\n태어난 지 5139일\n개학한 지 103일\n생일이 지났어요!`,
      hint: "날짜끼리 빼면 차이(일수)가 나와요!",
      hint2: ".days로 일수를 가져와요!"
    },
    {
      id: "ch3-5",
      type: "quiz",
      title: "퀴즈!",
      content: "두 날짜의 차이를 구하려면?",
      options: [
        "date.diff(d1, d2)",
        "d2 - d1",
        "datetime.between(d1, d2)",
        "d1.diff(d2)"
      ],
      answer: 1,
      explanation: "파이썬에서는 날짜끼리 빼기(-)가 가능해요! 결과의 .days로 일수를 얻어요!"
    },
    {
      id: "ch3-6",
      type: "tryit",
      title: "🎲 seed로 랜덤 고정하기!",
      task: "random.seed()로 랜덤 결과를 고정해서 실행해보세요!",
      initialCode: `import random

# seed 고정하면 매번 같은 결과!
random.seed(42)
print('=== 주사위 5번 ===')
for i in range(5):
    roll = random.randint(1, 6)
    print(f'{i+1}번째: {roll}')

# 리스트에서 랜덤 선택
random.seed(42)
foods = ['치킨', '피자', '햄버거', '떡볶이', '김밥']
for i in range(3):
    pick = random.choice(foods)
    print(f'\\n오늘의 메뉴 {i+1}: {pick}')`,
      expectedOutput: `=== 주사위 5번 ===\n1번째: 1\n2번째: 1\n3번째: 6\n4번째: 6\n5번째: 6\n\n오늘의 메뉴 1: 치킨\n오늘의 메뉴 2: 치킨\n오늘의 메뉴 3: 김밥`,
      hint: "seed(42)를 설정하면 항상 같은 순서의 랜덤값이 나와요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-7",
      type: "mission",
      title: "🎯 미션: 모듈 종합 활용!",
      task: "빈칸 3개를 채워서 세 가지 모듈을 활용하는 프로그램을 완성하세요!",
      initialCode: `import math
import random
import datetime

# 1. math로 계산
scores = [85, 92, 78, 96, 88]
avg = sum(scores) / len(scores)
print(f'평균: {avg}')
print(f'올림: {math.___(avg)}')

# 2. random으로 랜덤 (seed 고정)
random.seed(100)
items = ['검', '방패', '포션', '마법서']
prize = random.___(items)
print(f'\\n오늘의 보상: {prize}')

# 3. datetime으로 날짜
start = datetime.date(2024, 3, 1)
end = datetime.date(2024, 12, 31)
diff = end - start
print(f'\\n남은 날: {diff.___}일')`,
      expectedOutput: `평균: 87.8\n올림: 88\n\n오늘의 보상: 방패\n\n남은 날: 305일`,
      hint: "올림 함수, 랜덤 선택 함수, 날짜 차이 속성!",
      hint2: "ceil / choice / days"
    }
  ]
}
