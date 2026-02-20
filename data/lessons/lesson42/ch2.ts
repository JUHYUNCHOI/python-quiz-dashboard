import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "math 모듈 마스터",
  emoji: "🔢",
  steps: [
    {
      id: "ch2-0",
      type: "tryit",
      title: "🔢 math 모듈 주요 기능!",
      task: "math 모듈의 다양한 함수를 실행해보세요!",
      initialCode: `import math

# 반올림/올림/내림
print('=== 반올림 ===')
print(f'ceil(3.2) = {math.ceil(3.2)}')
print(f'floor(3.9) = {math.floor(3.9)}')

# 제곱근, 거듭제곱
print('\\n=== 제곱 ===')
print(f'sqrt(144) = {math.sqrt(144)}')
print(f'pow(2, 10) = {math.pow(2, 10)}')

# 상수
print('\\n=== 상수 ===')
print(f'pi = {math.pi:.6f}')
print(f'e = {math.e:.6f}')

# 절댓값, 팩토리얼
print('\\n=== 기타 ===')
print(f'fabs(-7.5) = {math.fabs(-7.5)}')
print(f'factorial(5) = {math.factorial(5)}')`,
      expectedOutput: `=== 반올림 ===\nceil(3.2) = 4\nfloor(3.9) = 3\n\n=== 제곱 ===\nsqrt(144) = 12.0\npow(2, 10) = 1024.0\n\n=== 상수 ===\npi = 3.141593\ne = 2.718282\n\n=== 기타 ===\nfabs(-7.5) = 7.5\nfactorial(5) = 120`,
      hint: "ceil=올림, floor=내림, sqrt=제곱근!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "🔵 원의 넓이 계산기!",
      task: "math.pi를 사용해서 원의 넓이를 계산하세요!",
      initialCode: `import math

radii = [1, 3, 5, 10]

print('=== 원의 넓이 ===')
for r in radii:
    area = math.pi * r ** 2
    print(f'반지름 {r}: 넓이 = {area:.2f}')

print(f'\\n=== 구의 부피 ===')
r = 5
volume = (4/3) * math.pi * r ** 3
print(f'반지름 {r}: 부피 = {volume:.2f}')`,
      expectedOutput: `=== 원의 넓이 ===\n반지름 1: 넓이 = 3.14\n반지름 3: 넓이 = 28.27\n반지름 5: 넓이 = 78.54\n반지름 10: 넓이 = 314.16\n\n=== 구의 부피 ===\n반지름 5: 부피 = 523.60`,
      hint: "원의 넓이 = π × r², 구의 부피 = (4/3) × π × r³",
      hint2: "math.pi * r ** 2로 원의 넓이를 계산해요!"
    },
    {
      id: "ch2-2",
      type: "mission",
      title: "🎯 미션: math로 성적 통계!",
      task: "빈칸 3개를 채워서 math 모듈로 성적 통계를 완성하세요!",
      initialCode: `import ___

scores = [78, 92, 85, 67, 94, 88, 73, 91]

total = sum(scores)
avg = total / len(scores)

print(f'총점: {total}')
print(f'평균: {avg:.1f}')
print(f'평균 올림: {math.___(avg)}')
print(f'평균 내림: {math.___(avg)}')`,
      expectedOutput: `총점: 668\n평균: 83.5\n평균 올림: 84\n평균 내림: 83`,
      hint: "올림은 ceil, 내림은 floor!",
      hint2: "math / ceil / floor"
    },
    {
      id: "ch2-3",
      type: "quiz",
      title: "퀴즈!",
      content: "`math.ceil(4.1)`과 `math.floor(4.9)`의 결과는?",
      options: [
        "4, 4",
        "5, 5",
        "5, 4",
        "4, 5"
      ],
      answer: 2,
      explanation: "ceil(4.1)=5 (올림), floor(4.9)=4 (내림)!"
    }
  ]
}
