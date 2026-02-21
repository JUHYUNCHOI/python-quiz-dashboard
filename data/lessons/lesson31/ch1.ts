import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "기초 문제 (1~10)",
  emoji: "⭐",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "🏆 종합 도전!",
      content: `## Part 1~3 총정리!

| 파트 | 문제 수 |
|------|---------|
| ⭐ 기초 | 10문제 |
| ⭐⭐ 자료구조 | 10문제 |
| ⭐⭐⭐ 종합 | 10문제 |

총 30문제! 24문제 이상 맞추면 합격! 🎯`
    },
    {
      id: "ch1-1",
      type: "quiz",
      title: "문제 1",
      content: "출력 결과는?\n\n```python\nprint(10 // 3)\n```",
      options: ["3", "3.33", "3.0", "4"],
      answer: 0,
      explanation: "//는 몫 연산! 10 나누기 3의 몫은 3!"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "문제 2",
      content: "출력 결과는?\n\n```python\nprint(10 % 3)\n```",
      options: ["3", "1", "0", "3.33"],
      answer: 1,
      explanation: "%는 나머지 연산! 10 나누기 3의 나머지는 1!"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "문제 3",
      content: "출력 결과는?\n\n```python\nx = '파이썬'\nprint(x * 3)\n```",
      options: ["에러", "파이썬3", "파이썬파이썬파이썬", "9"],
      answer: 2,
      explanation: "문자열 * 숫자 = 반복! '파이썬' × 3 = '파이썬파이썬파이썬'!"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "문제 4",
      content: "출력 결과는?\n\n```python\nfor i in range(3):\n    print(i, end=' ')\n```",
      options: ["1 2 3 ", "0 1 2 ", "0 1 2 3 ", "1 2 "],
      answer: 1,
      explanation: "range(3)은 0, 1, 2! end=' '로 한 줄에 출력!"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "문제 5",
      content: "출력 결과는?\n\n```python\nx = 15\nif x > 20:\n    print('A')\nelif x > 10:\n    print('B')\nelse:\n    print('C')\n```",
      options: ["A", "B", "C", "AB"],
      answer: 1,
      explanation: "15 > 20? X → 15 > 10? O → 'B'!"
    },
    {
      id: "ch1-6",
      type: "tryit",
      title: "문제 6: 구구단",
      task: "7단을 출력하는 코드를 실행하세요!",
      initialCode: `for i in range(1, 10):
    print(f'7 x {i} = {7 * i}')`,
      expectedOutput: `7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63`,
      hint: "range(1, 10)은 1~9!",
      hint2: "7 * i로 곱셈 결과를 구해요!"
    },
    {
      id: "ch1-7",
      type: "quiz",
      title: "문제 7",
      content: "출력 결과는?\n\n```python\ntext = 'Hello World'\nprint(text[0:5])\n```",
      options: ["Hello", "Hello ", "Hello World", "H"],
      answer: 0,
      explanation: "text[0:5]는 인덱스 0~4! 'Hello'!"
    },
    {
      id: "ch1-8",
      type: "mission",
      title: "문제 8: 짝수 합",
      task: "빈칸 2개를 채워서 1~20 사이 짝수의 합을 구하세요!",
      initialCode: `total = 0
for i in range(1, ___):
    if i ___ 2 == 0:
        total += i
print(f'1~20 짝수의 합: {total}')`,
      expectedOutput: `1~20 짝수의 합: 110`,
      hint: "range(1, 21)로 1~20, % 2 == 0이면 짝수!",
      hint2: "21 / %"
    },
    {
      id: "ch1-9",
      type: "quiz",
      title: "문제 9",
      content: "출력 결과는?\n\n```python\nresult = ''\nfor ch in 'Python':\n    if ch.isupper():\n        result += ch\nprint(result)\n```",
      options: ["Python", "P", "PYTHON", "python"],
      answer: 1,
      explanation: "'Python'에서 대문자는 'P' 하나뿐!"
    },
    {
      id: "ch1-10",
      type: "quiz",
      title: "문제 10",
      content: "출력 결과는?\n\n```python\nnums = [3, 1, 4, 1, 5]\nnums.sort()\nprint(nums[-1])\n```",
      options: ["3", "5", "1", "에러"],
      answer: 1,
      explanation: "sort()로 정렬 → [1, 1, 3, 4, 5], [-1]은 마지막 = 5!"
    }
  ]
}
