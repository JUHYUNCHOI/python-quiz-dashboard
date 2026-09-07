import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "내장 모듈 활용",
  emoji: "🧰",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 pip install 없이 바로 쓸 수 있는 모듈이 있다고?",
      content: `💭 패키지는 pip install로 설치해야 한다고 배웠는데... math나 json은 설치 안 했는데 바로 쓸 수 있었잖아! **설치 없이** 쓸 수 있는 모듈이 뭐가 있을까?

\`\`\`python
import math       # 설치 필요 없음!
import json        # 설치 필요 없음!
import string      # 설치 필요 없음!
\`\`\`

@핵심: **내장 모듈** = 파이썬에 기본 포함! pip install 없이 바로 import 가능!

| 모듈 | 기능 | 예시 |
|------|------|------|
| math | 수학 계산 | sqrt(), ceil(), pi |
| json | JSON 데이터 처리 | dumps(), loads() |
| string | 문자열 상수 | ascii_lowercase |
| random | 랜덤 값 | randint(), choice() |
| datetime | 날짜/시간 | now(), date() |`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 json 모듈 활용!",
      task: "json 모듈로 데이터를 변환해보세요!",
      initialCode: `import json

# 딕셔너리를 JSON 문자열로
data = {
    'name': '용사',
    'hp': 100,
    'items': ['검', '방패', '포션']
}

json_str = json.___(data, ensure_ascii=False, indent=2)
print('=== JSON 변환 ===')
print(json_str)

# JSON 문자열을 딕셔너리로
parsed = json.___(json_str)
print(f'\\n이름: {parsed["name"]}')
print(f'아이템: {parsed["items"]}')`,
      expectedOutput: `=== JSON 변환 ===\n{\n  "name": "용사",\n  "hp": 100,\n  "items": [\n    "검",\n    "방패",\n    "포션"\n  ]\n}\n\n이름: 용사\n아이템: ['검', '방패', '포션']`,
      hint: "딕셔너리를 문자열로 내보내는 쪽과, 문자열을 다시 읽어 들이는 쪽이에요. 두 이름이 서로 반대 뜻이에요.",
      hint2: "dumps / loads"
    },
    {
      id: "ch2-2",
      type: "tryit",
      title: "💻 string 모듈 활용!",
      task: "string 모듈의 상수 이름을 알맞은 자리에 넣어보세요. 쓸 이름 (순서는 섞여 있어요): digits · ascii_uppercase · ascii_lowercase",
      initialCode: `import string

print('소문자:', string.___)
print('대문자:', string.___)
print('숫자:', string.___)
print('특수문자:', string.punctuation[:10])`,
      expectedOutput: `소문자: abcdefghijklmnopqrstuvwxyz\n대문자: ABCDEFGHIJKLMNOPQRSTUVWXYZ\n숫자: 0123456789\n특수문자: !"#$%&'()*`,
      hint: "소문자·대문자·숫자를 각각 뭐라고 부르는 이름이었죠? 맨 아래 punctuation 이 모양의 본보기예요.",
      hint2: "ascii_lowercase / ascii_uppercase / digits"
    },
    {
      id: "ch2-3",
      type: "mission",
      title: "🎯 미션: 비밀번호 검증기!",
      task: "빈칸 3개를 채워서 string 모듈로 비밀번호 검증기를 완성하세요!",
      initialCode: `import string

def check_password(pw):
    has_lower = False
    has_upper = False
    has_digit = False

    for ch in pw:
        if ch in string.___:
            has_lower = True
        elif ch in string.___:
            has_upper = True
        elif ch in string.___:
            has_digit = True

    print(f'비밀번호: {pw}')
    print(f'  소문자: {"✅" if has_lower else "❌"}')
    print(f'  대문자: {"✅" if has_upper else "❌"}')
    print(f'  숫자: {"✅" if has_digit else "❌"}')

    if has_lower and has_upper and has_digit:
        print('  → 강한 비밀번호!')
    else:
        print('  → 약한 비밀번호!')

check_password('Hello123')
print()
check_password('hello')`,
      expectedOutput: `비밀번호: Hello123\n  소문자: ✅\n  대문자: ✅\n  숫자: ✅\n  → 강한 비밀번호!\n\n비밀번호: hello\n  소문자: ✅\n  대문자: ❌\n  숫자: ❌\n  → 약한 비밀번호!`,
      hint: "바로 앞 문제에서 쓴 이름 셋을 그대로 다시 써요.",
      hint2: "ascii_lowercase / ascii_uppercase / digits"
    },
    {
      id: "ch2-4",
      type: "quiz",
      title: "퀴즈!",
      content: "`json.dumps()`의 역할은?",
      options: [
        "JSON 파일 삭제",
        "딕셔너리 → JSON 문자열",
        "JSON → 파이썬 실행",
        "JSON 파일 열기"
      ],
      answer: 1,
      explanation: "dumps = dump string! 딕셔너리를 JSON 문자열로 변환해요!"
    }
  ]
}
