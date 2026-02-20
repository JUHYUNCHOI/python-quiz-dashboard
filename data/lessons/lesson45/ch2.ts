import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "⭐⭐ 보통 (9~14)",
  emoji: "⭐",
  steps: [
    {
      id: "ch2-0",
      type: "tryit",
      title: "문제 9: math 활용",
      task: "math 모듈로 계산을 실행해보세요!",
      initialCode: `import math

numbers = [3.2, 7.8, 4.5, 9.1, 2.7]

print('=== 올림/내림 ===')
for n in numbers:
    print(f'{n} -> 올림: {math.ceil(n)}, 내림: {math.floor(n)}')

print(f'\\n합계: {sum(numbers)}')
print(f'평균: {sum(numbers)/len(numbers):.1f}')`,
      expectedOutput: `=== 올림/내림 ===\n3.2 -> 올림: 4, 내림: 3\n7.8 -> 올림: 8, 내림: 7\n4.5 -> 올림: 5, 내림: 4\n9.1 -> 올림: 10, 내림: 9\n2.7 -> 올림: 3, 내림: 2\n\n합계: 27.3\n평균: 5.5`,
      hint: "ceil은 올림, floor는 내림!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-1",
      type: "mission",
      title: "문제 10: json 변환",
      task: "빈칸 2개를 채워서 JSON 변환을 완성하세요!",
      initialCode: `import json

student = {'name': '철수', 'age': 15, 'scores': [90, 85, 92]}

# 딕셔너리 → JSON 문자열
json_str = json.___(student, ensure_ascii=False)
print(f'JSON: {json_str}')

# JSON 문자열 → 딕셔너리
parsed = json.___(json_str)
print(f'이름: {parsed["name"]}')
print(f'평균: {sum(parsed["scores"])/len(parsed["scores"]):.1f}')`,
      expectedOutput: `JSON: {"name": "철수", "age": 15, "scores": [90, 85, 92]}\n이름: 철수\n평균: 89.0`,
      hint: "dumps는 변환, loads는 복원!",
      hint2: "dumps / loads"
    },
    {
      id: "ch2-2",
      type: "quiz",
      title: "문제 11",
      content: "`random.randint(1, 6)`으로 나올 수 없는 값은?",
      options: ["1", "3", "6", "7"],
      answer: 3,
      explanation: "randint(1, 6)은 1~6 사이! 7은 나올 수 없어요!"
    },
    {
      id: "ch2-3",
      type: "quiz",
      title: "문제 12",
      content: "다음 중 내장 모듈이 아닌 것은?",
      options: ["math", "json", "requests", "string"],
      answer: 2,
      explanation: "requests는 외부 패키지! pip install requests로 설치해야 해요!"
    },
    {
      id: "ch2-4",
      type: "mission",
      title: "문제 13: 원의 넓이",
      task: "빈칸 2개를 채워서 원의 넓이를 계산하세요!",
      initialCode: `import ___

radii = [3, 5, 7, 10]

for r in radii:
    area = math.___ * r ** 2
    print(f'반지름 {r}: 넓이 = {area:.2f}')`,
      expectedOutput: `반지름 3: 넓이 = 28.27\n반지름 5: 넓이 = 78.54\n반지름 7: 넓이 = 153.94\n반지름 10: 넓이 = 314.16`,
      hint: "math 모듈의 pi 상수를 사용해요!",
      hint2: "math / pi"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "문제 14",
      content: "`pip list`는 무엇을 보여주나요?",
      options: [
        "파이썬 문법 목록",
        "설치된 패키지 목록",
        "사용 가능한 함수 목록",
        "import한 모듈 목록"
      ],
      answer: 1,
      explanation: "pip list는 현재 설치된 모든 패키지 목록을 보여줘요!"
    }
  ]
}
