import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "⭐⭐⭐ 도전 (15~20)",
  emoji: "⭐",
  steps: [
    {
      id: "ch3-0",
      type: "tryit",
      title: "문제 15: string 모듈",
      task: "string 모듈로 비밀번호 검증기를 만들어보세요!",
      initialCode: `import string

def check_password(pw):
    has_lower = False
    has_upper = False
    has_digit = False

    for ch in pw:
        if ch in string.ascii_lowercase:
            has_lower = True
        if ch in string.ascii_uppercase:
            has_upper = True
        if ch in string.digits:
            has_digit = True

    results = []
    if len(pw) >= 8:
        results.append('O 길이 8자 이상')
    else:
        results.append('X 길이 8자 미만')

    results.append(f'{"O" if has_lower else "X"} 소문자')
    results.append(f'{"O" if has_upper else "X"} 대문자')
    results.append(f'{"O" if has_digit else "X"} 숫자')

    return results

passwords = ['abc', 'Hello123!', 'PASSWORD']
for pw in passwords:
    print(f'--- {pw} ---')
    for r in check_password(pw):
        print(f'  {r}')`,
      expectedOutput: `--- abc ---\n  X 길이 8자 미만\n  O 소문자\n  X 대문자\n  X 숫자\n--- Hello123! ---\n  O 길이 8자 이상\n  O 소문자\n  O 대문자\n  O 숫자\n--- PASSWORD ---\n  O 길이 8자 이상\n  X 소문자\n  O 대문자\n  X 숫자`,
      hint: "string.ascii_lowercase, ascii_uppercase, digits로 검사!",
      hint2: "in 연산자로 각 문자가 어느 카테고리인지 확인해요!"
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "문제 16",
      content: "`datetime.date(2024, 12, 25) - datetime.date(2024, 1, 1)`의 `.days`는?",
      options: ["359", "365", "360", "에러"],
      answer: 0,
      explanation: "1월 1일부터 12월 25일까지는 359일!"
    },
    {
      id: "ch3-2",
      type: "mission",
      title: "문제 17: math + json 종합",
      task: "빈칸 3개를 채워서 성적 통계 시스템을 완성하세요!",
      initialCode: `import math
import json

students = [
    {'name': '철수', 'score': 85},
    {'name': '영희', 'score': 92},
    {'name': '민수', 'score': 78},
    {'name': '지영', 'score': 95},
]

scores = [s['score'] for s in students]
avg = sum(scores) / ___(scores)

print(f'평균: {avg:.1f}')
print(f'올림: {math.ceil(___)}')

# JSON 저장
save = json.dumps(students, ___=False)
print(f'저장: {save}')`,
      expectedOutput: `평균: 87.5\n올림: 88\n저장: [{"name": "철수", "score": 85}, {"name": "영희", "score": 92}, {"name": "민수", "score": 78}, {"name": "지영", "score": 95}]`,
      hint: "len으로 개수, avg를 올림, ensure_ascii로 한글!",
      hint2: "len / avg / ensure_ascii"
    },
    {
      id: "ch3-3",
      type: "quiz",
      title: "문제 18",
      content: "`random.choice(['사과', '바나나', '포도'])`는?",
      options: [
        "항상 '사과'",
        "리스트에서 랜덤 선택",
        "리스트 전체 반환",
        "리스트 정렬"
      ],
      answer: 1,
      explanation: "choice는 리스트에서 하나를 랜덤으로 골라요!"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "문제 19",
      content: "외부 패키지 사용 순서로 올바른 것은?",
      options: [
        "import → pip install → 사용",
        "사용 → pip install → import",
        "pip install → import → 사용",
        "pip install만 하면 됨"
      ],
      answer: 2,
      explanation: "pip install(설치) → import(불러오기) → 사용! 순서 중요!"
    },
    {
      id: "ch3-5",
      type: "mission",
      title: "문제 20: 모듈 종합 미션!",
      task: "빈칸 3개를 채워서 게임 아이템 상점을 완성하세요!",
      initialCode: `import math
import ___

shop_items = {
    '검': {'price': 1500, 'atk': 20},
    '방패': {'price': 1200, 'atk': 0},
    '지팡이': {'price': 2000, 'atk': 35},
}

# 가격 통계
prices = [item['price'] for item in shop_items.___()]
avg_price = sum(prices) / len(prices)

print('=== 아이템 상점 ===')
for name, info in shop_items.items():
    print(f'  {name}: {info["price"]}G (ATK +{info["atk"]})')

print(f'\\n평균 가격: {math.___(avg_price)}G (올림)')

# JSON 저장
save = json.dumps(shop_items, ensure_ascii=False)
print(f'세이브 데이터 크기: {len(save)}자')`,
      expectedOutput: `=== 아이템 상점 ===\n  검: 1500G (ATK +20)\n  방패: 1200G (ATK +0)\n  지팡이: 2000G (ATK +35)\n\n평균 가격: 1567G (올림)\n세이브 데이터 크기: 96자`,
      hint: "json 모듈, values()로 값 가져오기, ceil로 올림!",
      hint2: "json / values / ceil"
    }
  ]
}
