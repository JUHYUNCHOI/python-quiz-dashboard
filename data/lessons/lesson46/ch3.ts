import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "종합 실습",
  emoji: "🎮",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 웹 크롤링, 게임 개발도 파이썬으로 할 수 있다고?",
      content: `💭 파이썬으로 **웹 요청**, **게임 개발**, **데이터 분석**까지 할 수 있대! 근데 이런 큰 공구함은 기본 내장이 아닌데... 어디서 빌려올 수 있을까?

\`\`\`bash
# 사용 흐름
pip install requests    # 1. 설치
import requests         # 2. 불러오기
requests.get(url)       # 3. 사용!
\`\`\`

@핵심: **PyPI(pypi.org)** = 40만 개 이상의 외부 패키지 저장소! pip install로 설치해서 사용!

| 패키지 | 용도 | 설치 명령어 |
|--------|------|-------------|
| requests | 웹 요청 | pip install requests |
| pandas | 데이터 분석 | pip install pandas |
| pygame | 게임 개발 | pip install pygame |
| flask | 웹 서버 | pip install flask |
| matplotlib | 그래프 | pip install matplotlib |

> 이 웹 환경에서는 외부 패키지를 설치할 수 없지만,
> 실제 컴퓨터에서는 pip으로 자유롭게 설치할 수 있어요!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "💻 여러 내장 모듈 함께 사용!",
      task: "math + json 모듈을 함께 사용하세요!",
      initialCode: `import math
import json

# 게임 캐릭터 데이터
characters = [
    {'name': '용사', 'hp': 100, 'atk': 25},
    {'name': '마법사', 'hp': 80, 'atk': 35},
    {'name': '궁수', 'hp': 90, 'atk': 30}
]

# 평균 공격력 계산
total_atk = sum(c['atk'] for c in characters)
avg_atk = total_atk / len(characters)

print(f'평균 공격력: {avg_atk:.1f}')
print(f'올림: {math.ceil(avg_atk)}')
print(f'캐릭터 수: {len(characters)}명')

# JSON으로 저장 형식
save_data = json.dumps(characters, ensure_ascii=False)
print(f'\\n저장 데이터: {save_data}')`,
      expectedOutput: `평균 공격력: 30.0\n올림: 30\n캐릭터 수: 3명\n\n저장 데이터: [{"name": "용사", "hp": 100, "atk": 25}, {"name": "마법사", "hp": 80, "atk": 35}, {"name": "궁수", "hp": 90, "atk": 30}]`,
      hint: "math는 계산, json은 데이터 변환에 사용",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-1b",
      type: "tryit",
      title: "💻 json으로 설정 파일 만들기!",
      task: "json 모듈로 게임 설정을 관리해보세요!",
      initialCode: `import json

# 게임 설정 만들기
settings = {
    'volume': 80,
    'difficulty': '보통',
    'language': '한국어',
    'controls': {
        'jump': 'space',
        'attack': 'z',
        'defend': 'x'
    }
}

# 설정 저장 (JSON으로 변환)
settings_json = json.dumps(settings, ensure_ascii=False, indent=2)
print('=== 설정 저장 ===')
print(settings_json)

# 설정 불러오기 (JSON에서 복원)
loaded = json.loads(settings_json)
print(f'\\n=== 설정 확인 ===')
print(f'볼륨: {loaded["volume"]}')
print(f'난이도: {loaded["difficulty"]}')
print(f'점프 키: {loaded["controls"]["jump"]}')

# 설정 변경
loaded['volume'] = 50
loaded['difficulty'] = '어려움'
new_json = json.dumps(loaded, ensure_ascii=False, indent=2)
print(f'\\n=== 변경된 설정 ===')
print(f'볼륨: {loaded["volume"]}')
print(f'난이도: {loaded["difficulty"]}')`,
      expectedOutput: `=== 설정 저장 ===\n{\n  "volume": 80,\n  "difficulty": "보통",\n  "language": "한국어",\n  "controls": {\n    "jump": "space",\n    "attack": "z",\n    "defend": "x"\n  }\n}\n\n=== 설정 확인 ===\n볼륨: 80\n난이도: 보통\n점프 키: space\n\n=== 변경된 설정 ===\n볼륨: 50\n난이도: 어려움`,
      hint: "json.dumps로 저장, json.loads로 불러오기!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-2",
      type: "mission",
      title: "🎯 게임 세이브/로드 시스템!",
      task: "빈칸 3개를 채워서 게임 세이브/로드 시스템을 완성하세요!",
      initialCode: `import ___

# 게임 세이브 데이터
save = {
    'player': '용사',
    'level': 5,
    'hp': 150,
    'items': ['불꽃검', '강철방패', '회복포션'],
    'gold': 2500
}

# 세이브 (딕셔너리 → JSON 문자열)
save_str = json.___(save, ensure_ascii=False, indent=2)
print('=== 게임 저장 ===')
print(save_str)

# 로드 (JSON 문자열 → 딕셔너리)
loaded = json.___(save_str)
print(f'\\n=== 게임 로드 ===')
print(f'플레이어: {loaded["player"]}')
print(f'레벨: {loaded["level"]}')
print(f'아이템: {", ".join(loaded["items"])}')
print(f'골드: {loaded["gold"]}G')`,
      expectedOutput: `=== 게임 저장 ===\n{\n  "player": "용사",\n  "level": 5,\n  "hp": 150,\n  "items": [\n    "불꽃검",\n    "강철방패",\n    "회복포션"\n  ],\n  "gold": 2500\n}\n\n=== 게임 로드 ===\n플레이어: 용사\n레벨: 5\n아이템: 불꽃검, 강철방패, 회복포션\n골드: 2500G`,
      hint: "json 모듈의 dumps(저장)와 loads(불러오기)를 사용해요!",
      hint2: "json / dumps / loads"
    },
    {
      id: "ch3-3",
      type: "quiz",
      title: "최종 퀴즈!",
      content: "외부 패키지를 사용하려면 어떤 순서로 해야 하나요?",
      options: [
        "import → pip install → 사용",
        "pip install → import → 사용",
        "사용 → pip install → import",
        "import만 하면 됨"
      ],
      answer: 1,
      explanation: "먼저 pip install로 설치하고, import로 불러온 뒤, 사용할 수 있어요!"
    }
  ]
}
