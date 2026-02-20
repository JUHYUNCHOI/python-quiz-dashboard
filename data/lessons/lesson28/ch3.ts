import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "종합 도전 (21~30)",
  emoji: "⭐⭐⭐",
  steps: [
    {
      id: "ch3-0",
      type: "tryit",
      title: "문제 21: 피보나치 수열",
      task: "피보나치 수열 10개를 출력하세요!",
      initialCode: `fib = [0, 1]
for i in range(8):
    fib.append(fib[-1] + fib[-2])
print(f'피보나치: {fib}')
print(f'10번째: {fib[9]}')`,
      expectedOutput: `피보나치: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n10번째: 34`,
      hint: "현재 = 이전 + 그 이전!",
      hint2: "fib[-1] + fib[-2]로 다음 수를 구해요!"
    },
    {
      id: "ch3-1",
      type: "mission",
      title: "문제 22: 소수 찾기",
      task: "빈칸 2개를 채워서 2~30 사이 소수를 찾으세요!",
      initialCode: `primes = []
for n in range(2, 31):
    is_prime = True
    for i in range(2, n):
        if n ___ i == 0:
            is_prime = False
            break
    if ___:
        primes.append(n)

print(f'소수: {primes}')
print(f'개수: {len(primes)}개')`,
      expectedOutput: `소수: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]\n개수: 10개`,
      hint: "어떤 수로도 나누어 떨어지지 않으면 소수!",
      hint2: "% / is_prime"
    },
    {
      id: "ch3-2",
      type: "quiz",
      title: "문제 23",
      content: "출력 결과는?\n\n```python\nresult = [x**2 for x in range(1, 6)]\nprint(result)\n```",
      options: ["[1, 2, 3, 4, 5]", "[1, 4, 9, 16, 25]", "[2, 4, 6, 8, 10]", "에러"],
      answer: 1,
      explanation: "리스트 컴프리헨션! 1², 2², 3², 4², 5² = [1, 4, 9, 16, 25]!"
    },
    {
      id: "ch3-3",
      type: "tryit",
      title: "문제 24: 학생 정렬",
      task: "학생을 점수순으로 정렬하세요!",
      initialCode: `students = [
    ('철수', 85), ('영희', 92),
    ('민수', 78), ('지영', 95),
    ('현우', 88)
]

# 점수순 정렬 (내림차순)
ranked = sorted(students, key=lambda x: x[1], reverse=True)

print('=== 성적 순위 ===')
for i, (name, score) in enumerate(ranked, 1):
    print(f'{i}등: {name} ({score}점)')`,
      expectedOutput: `=== 성적 순위 ===\n1등: 지영 (95점)\n2등: 영희 (92점)\n3등: 현우 (88점)\n4등: 철수 (85점)\n5등: 민수 (78점)`,
      hint: "sorted의 key 매개변수로 정렬 기준을 정해요!",
      hint2: "lambda x: x[1]은 튜플의 두 번째(점수)를 기준으로!"
    },
    {
      id: "ch3-4",
      type: "mission",
      title: "문제 25: 별 피라미드",
      task: "빈칸 2개를 채워서 별 피라미드를 완성하세요!",
      initialCode: `n = 5
for i in range(1, n+1):
    spaces = ' ' * (n - ___)
    stars = '*' * (2 * i ___ 1)
    print(spaces + stars)`,
      expectedOutput: `    *\n   ***\n  *****\n *******\n*********`,
      hint: "공백은 줄어들고, 별은 홀수개씩 늘어나요!",
      hint2: "i / -"
    },
    {
      id: "ch3-5",
      type: "tryit",
      title: "문제 26: 행렬 덧셈",
      task: "2x3 행렬의 덧셈을 실행하세요!",
      initialCode: `matrix1 = [[1, 2, 3], [4, 5, 6]]
matrix2 = [[7, 8, 9], [10, 11, 12]]
result = []

for i in range(len(matrix1)):
    row = []
    for j in range(len(matrix1[0])):
        row.append(matrix1[i][j] + matrix2[i][j])
    result.append(row)

print('행렬1:', matrix1)
print('행렬2:', matrix2)
print('결과:', result)`,
      expectedOutput: `행렬1: [[1, 2, 3], [4, 5, 6]]\n행렬2: [[7, 8, 9], [10, 11, 12]]\n결과: [[8, 10, 12], [14, 16, 18]]`,
      hint: "같은 위치의 원소끼리 더해요!",
      hint2: "matrix1[i][j] + matrix2[i][j]!"
    },
    {
      id: "ch3-6",
      type: "quiz",
      title: "문제 27",
      content: "출력 결과는?\n\n```python\nwords = ['cat', 'apple', 'dog', 'banana']\nresult = sorted(words, key=len)\nprint(result[0])\n```",
      options: ["apple", "cat", "dog", "banana"],
      answer: 1,
      explanation: "key=len으로 길이순 정렬! 가장 짧은 'cat'이 [0]!"
    },
    {
      id: "ch3-7",
      type: "mission",
      title: "문제 28: 최빈값 찾기",
      task: "빈칸 2개를 채워서 최빈값을 찾으세요!",
      initialCode: `data = [1, 3, 2, 3, 4, 3, 2, 1, 3, 2]
counter = {}

for n in data:
    if n in counter:
        counter[n] ___ 1
    else:
        counter[n] = 1

max_count = max(counter.___)
for num, count in counter.items():
    if count == max_count:
        print(f'최빈값: {num} ({count}번)')`,
      expectedOutput: `최빈값: 3 (4번)`,
      hint: "딕셔너리로 세고, max로 최대값 찾기!",
      hint2: "+= / values()"
    },
    {
      id: "ch3-8",
      type: "quiz",
      title: "문제 29",
      content: "출력 결과는?\n\n```python\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)\nprint(a | b)\n```",
      options: [
        "{2, 3}\\n{1, 2, 3, 4}",
        "{1, 4}\\n{2, 3}",
        "{2, 3}\\n{1, 4}",
        "에러"
      ],
      answer: 0,
      explanation: "&는 교집합 {2,3}, |는 합집합 {1,2,3,4}!"
    },
    {
      id: "ch3-9",
      type: "tryit",
      title: "문제 30: 최종 미션!",
      task: "종합 데이터 처리를 실행하세요!",
      initialCode: `# 쇼핑 데이터
purchases = [
    {'item': '사과', 'price': 1500, 'qty': 3},
    {'item': '바나나', 'price': 2000, 'qty': 2},
    {'item': '사과', 'price': 1500, 'qty': 1},
    {'item': '체리', 'price': 3000, 'qty': 1},
    {'item': '바나나', 'price': 2000, 'qty': 3},
]

# 아이템별 총 금액
totals = {}
for p in purchases:
    item = p['item']
    amount = p['price'] * p['qty']
    if item in totals:
        totals[item] += amount
    else:
        totals[item] = amount

print('=== 아이템별 총 금액 ===')
for item, total in sorted(totals.items(), key=lambda x: x[1], reverse=True):
    print(f'  {item}: {total:,}원')

grand_total = sum(totals.values())
print(f'\\n총 합계: {grand_total:,}원')`,
      expectedOutput: `=== 아이템별 총 금액 ===\n  바나나: 10,000원\n  사과: 6,000원\n  체리: 3,000원\n\n총 합계: 19,000원`,
      hint: "딕셔너리로 아이템별 합산!",
      hint2: "price * qty로 금액 계산, 아이템별 누적!"
    }
  ]
}
