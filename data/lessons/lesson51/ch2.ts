import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "세이브/로드",
  emoji: "💾",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 게임 데이터를 저장하려면 어떻게?",
      content: `💭 캐릭터 이름, 레벨, 골드... 이걸 **문자열로 바꿔서 저장**할 수 있는 방법은 없을까?

\`\`\`python
import json

# 저장할 데이터
save_data = {
    'name': '용사',
    'job': 'warrior',
    'level': 3,
    'hp': 85,
    'gold': 150,
    'inventory': ['물약', '검']
}

# 딕셔너리 → JSON 문자열
json_str = json.dumps(save_data)
# '{"name": "용사", "job": "warrior", ...}'

# JSON 문자열 → 딕셔너리
loaded = json.loads(json_str)
# {'name': '용사', 'job': 'warrior', ...}
\`\`\`

@핵심: **json.dumps()** = 딕셔너리를 문자열로 저장, **json.loads()** = 문자열을 딕셔너리로 복원!`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 세이브/로드 구현!",
      task: "캐릭터 데이터를 JSON으로 저장하고 불러오세요!",
      initialCode: `import json

class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.hp, self.max_hp = 100, 100
        self.atk = 15
        self.defense = 10
        self.gold = 0
        self.exp = 0
        self.inventory = []

    def to_dict(self):
        return {
            'name': self.name,
            'job': self.job,
            'level': self.level,
            'hp': self.hp,
            'max_hp': self.max_hp,
            'atk': self.atk,
            'defense': self.defense,
            'gold': self.gold,
            'exp': self.exp,
            'inventory': [item for item in self.inventory]
        }

    def status(self):
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
        print(f'[{jobs[self.job]}] {self.name} Lv.{self.level}')
        print(f'  HP: {self.hp}/{self.max_hp} | ATK: {self.atk}')
        print(f'  골드: {self.gold} | 인벤토리: {self.inventory}')

def from_dict(data):
    hero = Character(data['name'], data['job'])
    hero.level = data['level']
    hero.hp = data['hp']
    hero.max_hp = data['max_hp']
    hero.atk = data['atk']
    hero.defense = data['defense']
    hero.gold = data['gold']
    hero.exp = data['exp']
    hero.inventory = data['inventory']
    return hero

# 1. 캐릭터 생성 + 플레이
hero = Character('철수', 'warrior')
hero.level = 3
hero.hp = 85
hero.max_hp = 130
hero.atk = 24
hero.defense = 16
hero.gold = 250
hero.inventory = ['물약', '물약', '힘의 물약']

print('=== 저장 전 ===')
hero.status()

# 2. 세이브!
save_data = hero.to_dict()
json_str = json.dumps(save_data, ensure_ascii=False)
print(f'\\n=== 세이브 데이터 ===')
print(json_str)

# 3. 로드!
loaded_data = json.loads(json_str)
loaded_hero = from_dict(loaded_data)
print(f'\\n=== 로드 완료! ===')
loaded_hero.status()`,
      expectedOutput: `=== 저장 전 ===\n[용사] 철수 Lv.3\n  HP: 85/130 | ATK: 24\n  골드: 250 | 인벤토리: ['물약', '물약', '힘의 물약']\n\n=== 세이브 데이터 ===\n{"name": "철수", "job": "warrior", "level": 3, "hp": 85, "max_hp": 130, "atk": 24, "defense": 16, "gold": 250, "exp": 0, "inventory": ["물약", "물약", "힘의 물약"]}\n\n=== 로드 완료! ===\n[용사] 철수 Lv.3\n  HP: 85/130 | ATK: 24\n  골드: 250 | 인벤토리: ['물약', '물약', '힘의 물약']`,
      hint: "to_dict()로 딕셔너리 변환, json.dumps/loads로 저장/불러오기!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-2",
      type: "mission",
      title: "🎯 미션: 세이브 시스템!",
      task: "빈칸 3개를 채워서 세이브/로드를 완성하세요!",
      initialCode: `import json

data = {
    'name': '영희',
    'level': 5,
    'gold': 300,
    'items': ['검', '방패']
}

# 세이브: 딕셔너리 → JSON 문자열
save_str = json.___(data, ensure_ascii=False)
print(f'저장: {save_str}')

# 로드: JSON 문자열 → 딕셔너리
loaded = json.___(save_str)
print(f'이름: {loaded["name"]}')
print(f'레벨: {loaded["___"]}')
print(f'아이템: {loaded["items"]}')`,
      expectedOutput: `저장: {"name": "영희", "level": 5, "gold": 300, "items": ["검", "방패"]}\n이름: 영희\n레벨: 5\n아이템: ['검', '방패']`,
      hint: "딕셔너리→JSON은 dumps, JSON→딕셔너리는 loads!",
      hint2: "dumps / loads / level"
    },
    {
      id: "ch2-3",
      type: "tryit",
      title: "💻 여러 슬롯 세이브!",
      task: "세이브 슬롯 3개를 관리하는 시스템을 실행해보세요!",
      initialCode: `import json

# 세이브 슬롯 (딕셔너리)
save_slots = {}

def save_game(slot, data):
    save_slots[slot] = json.dumps(data, ensure_ascii=False)
    print(f'[슬롯 {slot}] 저장 완료!')

def load_game(slot):
    if slot not in save_slots:
        print(f'[슬롯 {slot}] 비어있음!')
        return None
    data = json.loads(save_slots[slot])
    print(f'[슬롯 {slot}] 불러오기 완료!')
    return data

def show_slots():
    print('=== 세이브 슬롯 ===')
    for i in range(1, 4):
        if i in save_slots:
            data = json.loads(save_slots[i])
            print(f'  슬롯 {i}: {data["name"]} Lv.{data["level"]}')
        else:
            print(f'  슬롯 {i}: (비어있음)')

# 테스트!
show_slots()

print()
save_game(1, {'name': '용사', 'level': 3, 'gold': 200})
save_game(2, {'name': '마법사', 'level': 5, 'gold': 500})

print()
show_slots()

print()
data = load_game(2)
if data:
    print(f'  이름: {data["name"]}, 골드: {data["gold"]}')

print()
load_game(3)`,
      expectedOutput: `=== 세이브 슬롯 ===\n  슬롯 1: (비어있음)\n  슬롯 2: (비어있음)\n  슬롯 3: (비어있음)\n\n[슬롯 1] 저장 완료!\n[슬롯 2] 저장 완료!\n\n=== 세이브 슬롯 ===\n  슬롯 1: 용사 Lv.3\n  슬롯 2: 마법사 Lv.5\n  슬롯 3: (비어있음)\n\n[슬롯 2] 불러오기 완료!\n  이름: 마법사, 골드: 500\n\n[슬롯 3] 비어있음!`,
      hint: "딕셔너리로 슬롯 관리, JSON으로 직렬화!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "json.dumps()와 json.loads()의 역할은?",
      options: [
        "dumps: 파일 저장, loads: 파일 읽기",
        "dumps: 딕셔너리→문자열, loads: 문자열→딕셔너리",
        "dumps: 문자열→딕셔너리, loads: 딕셔너리→문자열",
        "둘 다 파일 관련 함수"
      ],
      answer: 1,
      explanation: "dumps = 딕셔너리를 JSON 문자열로! loads = JSON 문자열을 딕셔너리로!"
    }
  ]
}
