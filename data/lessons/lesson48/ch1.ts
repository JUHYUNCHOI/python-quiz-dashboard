import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "⭐ 쉬움 (1~8)",
  emoji: "⭐",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 모듈과 패키지, 얼마나 기억나?",
      content: `💭 import, pip install, math, json, random, datetime... 여태 배운 **모듈과 패키지** 내용이 얼마나 기억나는지 확인해볼까?

\`\`\`python
# 목표: 20문제 중 16문제 이상 맞추기!
# ⭐ 쉬움 8문제
# ⭐⭐ 보통 6문제
# ⭐⭐⭐ 도전 6문제
\`\`\`

@핵심: 모듈과 패키지 총정리! 20문제 도전해서 실력을 확인하자!`
    },
    {
      id: "ch1-1",
      type: "quiz",
      title: "문제 1",
      content: "모듈을 가져오는 키워드는?",
      options: ["include", "require", "import", "using"],
      answer: 2,
      explanation: "파이썬에서 모듈은 import 키워드로 가져와요!"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "문제 2",
      content: "`from math import sqrt` 후 사용법은?",
      options: ["math.sqrt(16)", "sqrt(16)", "math(sqrt(16))", "import.sqrt(16)"],
      answer: 1,
      explanation: "from...import로 가져오면 모듈명 없이 바로 사용!"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "문제 3",
      content: "`math.ceil(3.1)`의 결과는?",
      options: ["3", "4", "3.1", "에러"],
      answer: 1,
      explanation: "ceil = 올림! 3.1을 올리면 4!"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "문제 4",
      content: "`math.floor(7.9)`의 결과는?",
      options: ["7", "8", "7.9", "에러"],
      answer: 0,
      explanation: "floor = 내림! 7.9를 내리면 7!"
    },
    {
      id: "ch1-4b",
      type: "tryit",
      title: "💻 문제 4.5: math 직접 체험!",
      task: "math 모듈의 함수들을 직접 실행해보세요!",
      initialCode: `import math

# 올림 / 내림 / 반올림
numbers = [3.2, 5.7, 8.5, 1.1]

for n in numbers:
    print(f'{n} → 올림:{math.ceil(n)} 내림:{math.floor(n)} 반올림:{round(n)}')

# 절대값과 제곱근
print(f'\\nabs(-15) = {abs(-15)}')
print(f'sqrt(144) = {math.sqrt(144)}')
print(f'pi = {math.pi:.4f}')`,
      expectedOutput: `3.2 → 올림:4 내림:3 반올림:3\n5.7 → 올림:6 내림:5 반올림:6\n8.5 → 올림:9 내림:8 반올림:8\n1.1 → 올림:2 내림:1 반올림:1\n\nabs(-15) = 15\nsqrt(144) = 12.0\npi = 3.1416`,
      hint: "ceil=올림, floor=내림, round=반올림!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "문제 5",
      content: "패키지를 설치하는 명령어는?",
      options: ["python install", "pip install", "import install", "module install"],
      answer: 1,
      explanation: "pip install 패키지이름 으로 설치해요!"
    },
    {
      id: "ch1-6",
      type: "quiz",
      title: "문제 6",
      content: "모듈과 패키지의 관계는?",
      options: [
        "같은 것이다",
        "모듈 = 여러 패키지",
        "패키지 = 여러 모듈",
        "관계 없다"
      ],
      answer: 2,
      explanation: "패키지는 여러 모듈을 묶은 폴더예요!"
    },
    {
      id: "ch1-7",
      type: "quiz",
      title: "문제 7",
      content: "`import math as m` 후 pi를 사용하려면?",
      options: ["math.pi", "m.pi", "pi", "as.pi"],
      answer: 1,
      explanation: "as m으로 별명을 붙였으니 m.pi로 사용해요!"
    },
    {
      id: "ch1-7b",
      type: "mission",
      title: "🎯 문제 7.5: import 미션!",
      task: "빈칸 3개를 채워서 모듈 사용법을 완성하세요!",
      initialCode: `# 1. 특정 함수만 가져오기
___ math import sqrt, pi

# 2. 별명 붙이기
import json ___ j

# 3. 사용하기
radius = 5
area = pi * radius ** 2
print(f'반지름 {radius}의 원 넓이: {area:.2f}')
print(f'제곱근: {___(area):.2f}')

# json 별명으로 사용
data = j.dumps({'area': round(area, 2)})
print(f'JSON: {data}')`,
      expectedOutput: `반지름 5의 원 넓이: 78.54\n제곱근: 8.86\nJSON: {"area": 78.54}`,
      hint: "from으로 함수만, as로 별명, sqrt로 제곱근!",
      hint2: "from / as / sqrt"
    },
    {
      id: "ch1-8",
      type: "quiz",
      title: "문제 8",
      content: "`json.dumps()`는 무엇을 하나요?",
      options: [
        "JSON 파일 삭제",
        "딕셔너리 → JSON 문자열",
        "JSON 문자열 → 딕셔너리",
        "JSON 파일 열기"
      ],
      answer: 1,
      explanation: "dumps = dump string! 딕셔너리를 문자열로 변환!"
    }
  ]
}
