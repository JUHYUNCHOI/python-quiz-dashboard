import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "자료구조 문제 (11~20)",
  emoji: "⭐⭐",
  steps: [
    {
      id: "ch2-0",
      type: "quiz",
      title: "문제 11",
      content: "출력 결과는?\n\n```python\nfruits = ['사과', '바나나', '체리']\nfruits.append('포도')\nprint(len(fruits))\n```",
      options: ["3", "4", "5", "에러"],
      answer: 1,
      explanation: "3개에 append로 1개 추가 → 4개!"
    },
    {
      id: "ch2-1",
      type: "quiz",
      title: "문제 12",
      content: "출력 결과는?\n\n```python\ninfo = {'name': '철수', 'age': 15}\ninfo['grade'] = 'A'\nprint(len(info))\n```",
      options: ["2", "3", "4", "에러"],
      answer: 1,
      explanation: "2개에 새 키 추가 → 3개!"
    },
    {
      id: "ch2-2",
      type: "quiz",
      title: "문제 13",
      content: "출력 결과는?\n\n```python\ns = {1, 2, 3, 2, 1}\nprint(len(s))\n```",
      options: ["5", "3", "2", "에러"],
      answer: 1,
      explanation: "집합은 중복 제거! {1, 2, 3} → 3개!"
    },
    {
      id: "ch2-3",
      type: "mission",
      title: "문제 14: 리스트 뒤집기",
      task: "빈칸 2개를 채워서 리스트를 뒤집으세요!",
      initialCode: `nums = [1, 2, 3, 4, 5]
reversed_nums = []

for i in range(len(nums)-1, -1, ___):
    reversed_nums.___(nums[i])

print(reversed_nums)`,
      expectedOutput: `[5, 4, 3, 2, 1]`,
      hint: "range를 역순으로, append로 추가!",
      hint2: "-1 / append"
    },
    {
      id: "ch2-4",
      type: "quiz",
      title: "문제 15",
      content: "출력 결과는?\n\n```python\nd = {'a': 1, 'b': 2, 'c': 3}\nprint(list(d.keys()))\n```",
      options: ["[1, 2, 3]", "['a', 'b', 'c']", "[('a',1), ('b',2)]", "에러"],
      answer: 1,
      explanation: ".keys()는 키만 반환! ['a', 'b', 'c']!"
    },
    {
      id: "ch2-5",
      type: "tryit",
      title: "문제 16: 중복 제거",
      task: "리스트에서 중복을 제거하고 정렬하세요!",
      initialCode: `nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
unique = sorted(set(nums))
print(f'원본: {nums}')
print(f'중복 제거: {unique}')
print(f'원본 {len(nums)}개 → {len(unique)}개')`,
      expectedOutput: `원본: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]\n중복 제거: [1, 2, 3, 4, 5, 6, 9]\n원본 11개 → 7개`,
      hint: "set()으로 중복 제거, sorted()로 정렬!",
      hint2: "sorted(set(리스트))가 핵심!"
    },
    {
      id: "ch2-6",
      type: "quiz",
      title: "문제 17",
      content: "출력 결과는?\n\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\n```",
      options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "에러"],
      answer: 1,
      explanation: "b = a는 같은 리스트를 가리켜요! b에 추가하면 a도 변해요!"
    },
    {
      id: "ch2-7",
      type: "mission",
      title: "문제 18: 글자 세기",
      task: "빈칸 2개를 채워서 글자 빈도를 세세요!",
      initialCode: `text = 'banana'
counter = {}

for ch in text:
    if ch in ___:
        counter[ch] += 1
    else:
        counter[ch] = ___

for ch, count in counter.items():
    print(f'{ch}: {count}번')`,
      expectedOutput: `b: 1번\na: 3번\nn: 2번`,
      hint: "딕셔너리에 있으면 +1, 없으면 1로 시작!",
      hint2: "counter / 1"
    },
    {
      id: "ch2-8",
      type: "quiz",
      title: "문제 19",
      content: "출력 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50]\nprint(nums[1:4])\n```",
      options: ["[10, 20, 30]", "[20, 30, 40]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
      answer: 1,
      explanation: "[1:4]는 인덱스 1, 2, 3! → [20, 30, 40]!"
    },
    {
      id: "ch2-9",
      type: "mission",
      title: "문제 20: 딕셔너리 합치기",
      task: "빈칸 2개를 채워서 두 딕셔너리를 합치세요!",
      initialCode: `scores1 = {'철수': 85, '영희': 92}
scores2 = {'민수': 78, '지영': 95}

all_scores = {}
for name, score in scores1.___():
    all_scores[name] = score
for name, score in scores2.items():
    all_scores[___] = score

print(all_scores)
print(f'평균: {sum(all_scores.values())/len(all_scores):.1f}')`,
      expectedOutput: `{'철수': 85, '영희': 92, '민수': 78, '지영': 95}\n평균: 87.5`,
      hint: ".items()로 순회하면서 새 딕셔너리에 추가!",
      hint2: "items / name"
    }
  ]
}
