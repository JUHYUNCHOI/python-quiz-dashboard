import type { LessonData } from '../types'

export const lesson51: LessonData = {
  id: "51",
  title: "텍스트 RPG: 게임 완성",
  description: "상점, 세이브, 게임 루프로 게임을 완성해요!",
  steps: [
    // ============================================
    // Chapter 1: 상점 시스템
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "상점 시스템",
        desc: "골드 확인 → 차감 → 인벤토리에 추가!",
        en: {
          title: "Shop System",
          desc: "Check gold → deduct → add to inventory!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "상점에서 아이템을 사는 순서!",
          "① 골드 충분한지 확인 → ② 차감 → ③ 인벤토리에 추가"
        ],
        code: `gold = 200
inventory = []

def buy(item_name, price):
    global gold
    if gold < price:
        print(f'골드 부족!')
        return
    gold -= price
    inventory.append(item_name)
    print(f'{item_name} 구매! 잔액: {gold}')

buy('물약', 50)
buy('검', 300)`,
        result: "물약 구매! 잔액: 150\n골드 부족!",
        en: {
          lines: [
            "The order for buying an item at the shop!",
            "① Check if you have enough gold → ② deduct → ③ add to inventory"
          ]
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `gold = 100
def buy(price):
    global gold
    if gold < price:
        return False
    gold -= price
    return True

print(buy(60))
print(buy(80))
print(gold)`,
        predict: {
          question: "출력 결과는?",
          options: ["True True 0", "True False 40", "True False -40", "False False 100"],
          answer: 1,
          feedback: "60 차감 OK(40 남음), 80 은 부족해서 False, gold = 40!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["True True 0", "True False 40", "True False -40", "False False 100"],
            feedback: "Deducting 60 is OK (40 left), 80 is too much so False, gold = 40!"
          }
        },
        result: "True\nFalse\n40"
      }
    },

    {
      type: "quiz",
      content: {
        question: "보유 골드 80, 물약 100 골드일 때 올바른 처리는?",
        options: [
          "그냥 구매 (마이너스 골드)",
          "에러 발생",
          "'골드 부족!' 메시지 출력하고 구매 안 함",
          "자동으로 할인"
        ],
        answer: 2,
        explanation: "if gold < price: 로 확인하고 부족하면 return! 마이너스가 되면 안 돼요!",
        en: {
          question: "You have 80 gold and a potion costs 100 gold. What's the correct handling?",
          options: [
            "Buy it anyway (negative gold)",
            "Raise an error",
            "Print 'Not enough gold!' and don't buy",
            "Apply a discount automatically"
          ],
          explanation: "Check with if gold < price: and return if not enough! Gold should never go negative!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "buy 함수 — 골드 부족 처리!",
        hint: "비교, 차감, append",
        template: "gold = 100\ninventory = []\n\ndef buy(name, price):\n    global gold\n    if gold ___ price:\n        print('부족!')\n        return\n    gold ___ price\n    inventory.___(name)\n    print(f'{name} 구매! 잔액 {gold}')\n\nbuy('물약', 50)\nbuy('검', 200)",
        blanksAnswer: ["<", "-=", "append"],
        answer: "gold = 100\ninventory = []\n\ndef buy(name, price):\n    global gold\n    if gold < price:\n        print('부족!')\n        return\n    gold -= price\n    inventory.append(name)\n    print(f'{name} 구매! 잔액 {gold}')\n\nbuy('물약', 50)\nbuy('검', 200)",
        alternateAnswers: [],
        expect: "물약 구매! 잔액 50\n부족!",
        en: {
          task: "Fill in the 3 blanks!",
          guide: "buy function — handle not enough gold!",
          hint: "compare, deduct, append"
        }
      }
    },

    { type: "reward", content: { emoji: "🏪", message: "상점 시스템 클리어!" } },

    // ============================================
    // Chapter 2: 세이브/로드 (JSON)
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "세이브/로드 (JSON)",
        desc: "json.dumps / json.loads 로 저장/불러오기!",
        en: {
          title: "Save/Load (JSON)",
          desc: "Save/load with json.dumps / json.loads!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "json.dumps() — 딕셔너리 → 문자열 (저장용)",
          "json.loads() — 문자열 → 딕셔너리 (불러오기)"
        ],
        code: `import json

data = {'name': '용사', 'level': 3, 'gold': 200}
json_str = json.dumps(data, ensure_ascii=False)
print(json_str)

loaded = json.loads(json_str)
print(loaded['name'], loaded['level'])`,
        result: `{"name": "용사", "level": 3, "gold": 200}\n용사 3`,
        note: "ensure_ascii=False 면 한글이 그대로 보여요!",
        en: {
          lines: [
            "json.dumps() — dictionary → string (for saving)",
            "json.loads() — string → dictionary (for loading)"
          ],
          note: "With ensure_ascii=False, Korean text shows as-is!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import json
data = {'hp': 80, 'gold': 150}
s = json.dumps(data)
print(type(s).__name__)
back = json.loads(s)
print(type(back).__name__)`,
        predict: {
          question: "출력 결과는?",
          options: ["str\nstr", "dict\ndict", "str\ndict", "dict\nstr"],
          answer: 2,
          feedback: "dumps → 문자열(str), loads → 딕셔너리(dict)!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["str\nstr", "dict\ndict", "str\ndict", "dict\nstr"],
            feedback: "dumps → string (str), loads → dictionary (dict)!"
          }
        },
        result: "str\ndict"
      }
    },

    {
      type: "quiz",
      content: {
        question: "json.dumps() 와 json.loads() 의 역할은?",
        options: [
          "dumps: 파일 저장, loads: 파일 읽기",
          "dumps: 딕셔너리→문자열, loads: 문자열→딕셔너리",
          "dumps: 문자열→딕셔너리, loads: 딕셔너리→문자열",
          "둘 다 파일 관련 함수"
        ],
        answer: 1,
        explanation: "dumps = 딕셔너리를 JSON 문자열로! loads = JSON 문자열을 딕셔너리로!",
        en: {
          question: "What do json.dumps() and json.loads() do?",
          options: [
            "dumps: save file, loads: read file",
            "dumps: dictionary→string, loads: string→dictionary",
            "dumps: string→dictionary, loads: dictionary→string",
            "Both are file-related functions"
          ],
          explanation: "dumps = turns a dictionary into a JSON string! loads = turns a JSON string into a dictionary!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "to_dict 메서드 + json.dumps 로 세이브",
        hint: "self.속성을 딕셔너리 값으로!",
        template: "import json\n\nclass Character:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n\n    def to_dict(self):\n        return {'name': self.___, 'level': self.___}\n\nhero = Character('영희', 5)\ns = json.dumps(hero.to_dict(), ensure_ascii=False)\nprint(s)",
        blanksAnswer: ["name", "level"],
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Save with a to_dict method + json.dumps",
          hint: "Use self.attribute as the dictionary values!"
        },
        answer: "import json\n\nclass Character:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n\n    def to_dict(self):\n        return {'name': self.name, 'level': self.level}\n\nhero = Character('영희', 5)\ns = json.dumps(hero.to_dict(), ensure_ascii=False)\nprint(s)",
        alternateAnswers: [],
        expect: `{"name": "영희", "level": 5}`
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "json 으로 세이브 & 로드 왕복",
        hint: "dumps 로 저장, loads 로 복원!",
        template: "import json\n\ndata = {'name': '용사', 'gold': 100}\nsave = json.___(data, ensure_ascii=False)\nload = json.___(save)\nprint(load['name'], load['gold'])",
        blanksAnswer: ["dumps", "loads"],
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Save & load round-trip with json",
          hint: "Save with dumps, restore with loads!"
        },
        answer: "import json\n\ndata = {'name': '용사', 'gold': 100}\nsave = json.dumps(data, ensure_ascii=False)\nload = json.loads(save)\nprint(load['name'], load['gold'])",
        alternateAnswers: [],
        expect: "용사 100"
      }
    },

    { type: "reward", content: { emoji: "💾", message: "세이브/로드 클리어!" } },

    // ============================================
    // Chapter 3: 게임 루프 (while + if/elif)
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "게임 루프",
        desc: "while True + actions + if/elif 분기!",
        en: {
          title: "Game Loop",
          desc: "while True + actions + if/elif branching!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "게임은 언제 끝날지 모르니까 while True!",
          "'quit' 액션이 오면 break 로 탈출!"
        ],
        en: {
          lines: [
            "We never know when the game will end, so while True!",
            "When the 'quit' action comes, break out with break!"
          ]
        },
        code: `actions = ['battle', 'shop', 'quit']
idx = 0
gold = 0

while True:
    action = actions[idx]
    idx += 1
    if action == 'quit':
        break
    if action == 'battle':
        gold += 50
        print(f'전투! +50G ({gold})')
    elif action == 'shop':
        print(f'상점 (보유: {gold})')
print('종료!')`,
        result: "전투! +50G (50)\n상점 (보유: 50)\n종료!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `actions = ['a', 'b', 'quit', 'c']
idx = 0
result = []
while True:
    action = actions[idx]
    idx += 1
    if action == 'quit':
        break
    result.append(action)
print(result)`,
        predict: {
          question: "출력 결과는?",
          options: ["['a', 'b']", "['a', 'b', 'c']", "['a', 'b', 'quit', 'c']", "[]"],
          answer: 0,
          feedback: "'quit' 만나면 break! 그 뒤 'c' 는 처리 안 됨!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["['a', 'b']", "['a', 'b', 'c']", "['a', 'b', 'quit', 'c']", "[]"],
            feedback: "When 'quit' is reached, break! So 'c' after it is never processed!"
          }
        },
        result: "['a', 'b']"
      }
    },

    {
      type: "quiz",
      content: {
        question: "게임 루프에서 `while True` + `break` 를 쓰는 이유는?",
        options: [
          "for문보다 빨라서",
          "'quit' 이 올 때까지 계속 반복하려고",
          "파이썬 규칙이라서",
          "에러를 방지하려고"
        ],
        answer: 1,
        explanation: "게임은 언제 끝날지 모르니까 while True 로 무한 반복! 'quit' 이 오면 break 로 탈출!",
        en: {
          question: "Why use `while True` + `break` in a game loop?",
          options: [
            "Because it's faster than a for loop",
            "To keep looping until 'quit' comes",
            "Because it's a Python rule",
            "To prevent errors"
          ],
          explanation: "We never know when the game will end, so loop forever with while True! When 'quit' comes, break out with break!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "게임 루프 완성!",
        hint: "인덱스 증가, break, elif!",
        template: "actions = ['fight', 'save', 'quit']\nidx = 0\nresult = []\nwhile True:\n    action = actions[idx]\n    idx ___ 1\n    if action == 'quit':\n        ___\n    if action == 'fight':\n        result.append('battle')\n    ___ action == 'save':\n        result.append('saved')\nprint(result)",
        blanksAnswer: ["+=", "break", "elif"],
        en: {
          task: "Fill in the 3 blanks!",
          guide: "Complete the game loop!",
          hint: "increase the index, break, elif!"
        },
        answer: "actions = ['fight', 'save', 'quit']\nidx = 0\nresult = []\nwhile True:\n    action = actions[idx]\n    idx += 1\n    if action == 'quit':\n        break\n    if action == 'fight':\n        result.append('battle')\n    elif action == 'save':\n        result.append('saved')\nprint(result)",
        alternateAnswers: [],
        expect: "['battle', 'saved']"
      }
    },

    { type: "reward", content: { emoji: "🔄", message: "게임 루프 클리어!" } },

    // ============================================
    // Chapter 4: 종합 — 처음부터 작성
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 — 처음부터 작성",
        desc: "상점 + 세이브 + 루프 직접 만들기!",
        en: {
          title: "Wrap-up — Write From Scratch",
          desc: "Build the shop + save + loop yourself!"
        }
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 세이브 코드에서 문제는?",
        code: `import json
hero = {'name': '용사', 'gold': 100}
save = json.dumps(hero)
print(save)`,
        options: [
          "import 가 잘못됐어요",
          "한글이 \\u 코드로 깨져 보일 수 있어요 (ensure_ascii=False 필요)",
          "json.dumps 가 잘못됐어요",
          "에러 발생"
        ],
        answer: 1,
        explanation: "기본은 한글이 \\uc6a9 같은 코드로 바뀌어요. ensure_ascii=False 를 줘야 한글 그대로!",
        en: {
          question: "What's the problem with this save code?",
          options: [
            "The import is wrong",
            "Korean text may appear garbled as \\u codes (need ensure_ascii=False)",
            "json.dumps is wrong",
            "It raises an error"
          ],
          explanation: "By default Korean text turns into codes like \\uc6a9. You need ensure_ascii=False to keep Korean as-is!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! gold=200, items=['검'] 인 딕셔너리 data 를 만들고\njson.dumps(ensure_ascii=False) 로 문자열을 만든 뒤,\njson.loads 로 다시 복원해서 'gold: 200, 첫 아이템: 검' 형식으로 출력",
        guide: "import json → 딕셔너리 만들기 → dumps → loads → 값 꺼내기",
        hint: "import json\n\ndata = {'gold': 200, 'items': ['검']}\ns = json.dumps(data, ensure_ascii=False)\nback = json.loads(s)\nprint(f'gold: {back[\"gold\"]}, 첫 아이템: {back[\"items\"][0]}')",
        en: {
          task: "Write from scratch! Build a dictionary data with gold=200, items=['검'],\nturn it into a string with json.dumps(ensure_ascii=False),\nthen restore it with json.loads and print in the format 'gold: 200, 첫 아이템: 검'",
          guide: "import json → build dictionary → dumps → loads → pull out values"
        },
        template: null,
        answer: "import json\n\ndata = {'gold': 200, 'items': ['검']}\ns = json.dumps(data, ensure_ascii=False)\nback = json.loads(s)\nprint(f'gold: {back[\"gold\"]}, 첫 아이템: {back[\"items\"][0]}')",
        alternateAnswers: [
          "import json\ndata={'gold':200,'items':['검']}\ns=json.dumps(data,ensure_ascii=False)\nback=json.loads(s)\nprint(f'gold: {back[\"gold\"]}, 첫 아이템: {back[\"items\"][0]}')"
        ],
        expect: "gold: 200, 첫 아이템: 검"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! actions = ['battle', 'shop', 'quit'] 를 while True 로 처리.\nbattle 이면 gold += 50, shop 이면 'shop' 출력, quit 이면 break.\n마지막에 gold 출력 (시작 gold = 0)",
        guide: "while True + idx 증가 + if/elif/break",
        hint: "actions = ['battle', 'shop', 'quit']\nidx = 0\ngold = 0\nwhile True:\n    action = actions[idx]\n    idx += 1\n    if action == 'quit':\n        break\n    if action == 'battle':\n        gold += 50\n    elif action == 'shop':\n        print('shop')\nprint(gold)",
        en: {
          task: "Write from scratch! Process actions = ['battle', 'shop', 'quit'] with while True.\nIf battle, gold += 50; if shop, print 'shop'; if quit, break.\nPrint gold at the end (starting gold = 0)",
          guide: "while True + increment idx + if/elif/break"
        },
        template: null,
        answer: "actions = ['battle', 'shop', 'quit']\nidx = 0\ngold = 0\nwhile True:\n    action = actions[idx]\n    idx += 1\n    if action == 'quit':\n        break\n    if action == 'battle':\n        gold += 50\n    elif action == 'shop':\n        print('shop')\nprint(gold)",
        alternateAnswers: [
          "actions=['battle','shop','quit']\nidx=0\ngold=0\nwhile True:\n    a=actions[idx]\n    idx+=1\n    if a=='quit': break\n    if a=='battle': gold+=50\n    elif a=='shop': print('shop')\nprint(gold)"
        ],
        expect: "shop\n50"
      }
    },

    { type: "reward", content: { emoji: "🎮", message: "게임 완성!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 51,
        title: "텍스트 RPG: 게임 완성",
        learned: [
          "상점 — 골드 확인(if gold < price) → 차감 → 인벤토리 추가",
          "세이브 — to_dict() + json.dumps(ensure_ascii=False)",
          "로드 — json.loads() 로 딕셔너리 복원",
          "게임 루프 — while True + actions + if/elif + break",
          "'quit' 액션 만나면 break 로 깔끔히 탈출"
        ],
        canDo: "전투/상점/세이브를 모두 갖춘 텍스트 RPG 를 완성할 수 있어요!",
        emoji: "🎮"
      }
    },

    { type: "done", content: {} }
  ]
}
