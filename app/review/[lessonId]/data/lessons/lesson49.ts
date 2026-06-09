import type { LessonData } from '../types'

export const lesson49: LessonData = {
  id: "49",
  title: "텍스트 RPG: 게임 설계",
  description: "클래스 3개로 RPG의 모든 것을 설계해요!",
  steps: [
    // ============================================
    // Chapter 1: Character 클래스 설계
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "Character 클래스 설계",
        desc: "이름, HP, ATK, DEF, 인벤토리!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "RPG의 주인공 = Character 클래스!",
          "이름, 체력, 공격력, 방어력... 속성으로 모두 표현해요."
        ],
        code: `class Character:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.max_hp = 100
        self.atk = 15
        self.defense = 10

hero = Character('용사')
print(f'{hero.name}: HP {hero.hp}/{hero.max_hp}')`,
        result: "용사: HP 100/100",
        note: "max_hp는 회복할 때 한도로 써요!",
        en: {
          lines: [
            "The RPG hero = the Character class!",
            "Name, HP, attack, defense... all expressed as attributes."
          ],
          code: `class Character:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.max_hp = 100
        self.atk = 15
        self.defense = 10

hero = Character('Hero')
print(f'{hero.name}: HP {hero.hp}/{hero.max_hp}')`,
          result: "Hero: HP 100/100",
          note: "max_hp is used as the cap when healing!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Character:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.max_hp = 100

hero = Character('철수')
hero.hp = hero.hp - 30
print(hero.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["100", "70", "30", "에러"],
          answer: 1,
          feedback: "100 - 30 = 70! 객체 속성도 변수처럼 바꿀 수 있어요!"
        },
        en: {
          code: `class Character:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.max_hp = 100

hero = Character('Tom')
hero.hp = hero.hp - 30
print(hero.hp)`,
          predict: {
            question: "What's the output?",
            options: ["100", "70", "30", "Error"],
            feedback: "100 - 30 = 70! Object attributes can be changed just like variables!"
          },
          result: "70"
        },
        result: "70"
      }
    },

    {
      type: "quiz",
      content: {
        question: "Character 클래스에 `max_hp`를 따로 저장하는 이유는?",
        options: [
          "메모리를 아끼려고",
          "회복할 때 최대치를 넘지 않게 제한하려고",
          "파이썬 규칙이라서",
          "몬스터와 구분하려고"
        ],
        answer: 1,
        explanation: "HP가 줄었다가 회복할 때 max_hp 보다 넘지 않게! min(hp + heal, max_hp) 패턴!",
        en: {
          question: "Why store `max_hp` separately in the Character class?",
          options: [
            "To save memory",
            "To cap healing so HP doesn't exceed the maximum",
            "Because it's a Python rule",
            "To distinguish from monsters"
          ],
          explanation: "So that when HP drops and then heals, it doesn't exceed max_hp! The min(hp + heal, max_hp) pattern!"
        }
      }
    },

    // 빈칸: Character 기본 만들기
    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채우세요!",
        guide: "Character 클래스의 __init__ 완성",
        hint: "self.속성 = 값",
        template: "class Character:\n    def __init__(self, name):\n        self.___ = name\n        self.hp = 100\n        self.max_hp = 100\n\nhero = Character('용사')\nprint(f'{hero.name}: HP {hero.hp}')",
        answer: "name",
        alternateAnswers: [],
        expect: "용사: HP 100",
        en: {
          task: "Fill in the blank!",
          guide: "Complete the Character class's __init__",
          hint: "self.attribute = value",
          template: "class Character:\n    def __init__(self, name):\n        self.___ = name\n        self.hp = 100\n        self.max_hp = 100\n\nhero = Character('Hero')\nprint(f'{hero.name}: HP {hero.hp}')",
          expect: "Hero: HP 100"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "골드와 인벤토리 속성 추가하기",
        hint: "골드는 숫자 0, 인벤토리는 빈 리스트 []!",
        template: "class Character:\n    def __init__(self, name):\n        self.name = name\n        self.gold = ___\n        self.inventory = ___\n\nhero = Character('영희')\nprint(f'골드: {hero.gold}, 가방: {hero.inventory}')",
        blanksAnswer: ["0", "[]"],
        answer: "class Character:\n    def __init__(self, name):\n        self.name = name\n        self.gold = 0\n        self.inventory = []\n\nhero = Character('영희')\nprint(f'골드: {hero.gold}, 가방: {hero.inventory}')",
        alternateAnswers: [],
        expect: "골드: 0, 가방: []",
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Add gold and inventory attributes",
          hint: "Gold is the number 0, inventory is an empty list []!",
          template: "class Character:\n    def __init__(self, name):\n        self.name = name\n        self.gold = ___\n        self.inventory = ___\n\nhero = Character('Emma')\nprint(f'Gold: {hero.gold}, Bag: {hero.inventory}')",
          answer: "class Character:\n    def __init__(self, name):\n        self.name = name\n        self.gold = 0\n        self.inventory = []\n\nhero = Character('Emma')\nprint(f'Gold: {hero.gold}, Bag: {hero.inventory}')",
          expect: "Gold: 0, Bag: []"
        }
      }
    },

    { type: "reward", content: { emoji: "🦸", message: "Character 클래스 설계 완료!" } },

    // ============================================
    // Chapter 2: Monster, Item 클래스
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "Monster & Item 클래스",
        desc: "몬스터에는 보상, 아이템에는 효과!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "Monster 는 Character 와 비슷하지만 보상이 핵심이에요.",
          "처치 시 경험치(exp_reward), 골드(gold_reward) 를 줘요."
        ],
        code: `class Monster:
    def __init__(self, name, hp, atk, exp, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.exp_reward = exp
        self.gold_reward = gold

slime = Monster('슬라임', 30, 8, 30, 20)
print(f'{slime.name}: HP {slime.hp}, 보상 {slime.gold_reward}G')`,
        result: "슬라임: HP 30, 보상 20G",
        en: {
          lines: [
            "A Monster is similar to a Character, but rewards are key.",
            "When defeated, it gives experience (exp_reward) and gold (gold_reward)."
          ],
          code: `class Monster:
    def __init__(self, name, hp, atk, exp, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.exp_reward = exp
        self.gold_reward = gold

slime = Monster('Slime', 30, 8, 30, 20)
print(f'{slime.name}: HP {slime.hp}, reward {slime.gold_reward}G')`,
          result: "Slime: HP 30, reward 20G"
        }
      }
    },

    {
      type: "quiz",
      content: {
        question: "Monster 클래스에 꼭 필요하지 않은 속성은?",
        options: [
          "hp (체력)",
          "atk (공격력)",
          "inventory (인벤토리)",
          "exp_reward (경험치 보상)"
        ],
        answer: 2,
        explanation: "인벤토리는 플레이어의 속성! 몬스터는 HP, 공격력, 처치 보상이 핵심!",
        en: {
          question: "Which attribute is NOT essential for the Monster class?",
          options: [
            "hp (health)",
            "atk (attack power)",
            "inventory",
            "exp_reward (experience reward)"
          ],
          explanation: "Inventory is a player attribute! For a monster, HP, attack power, and defeat rewards are key!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "Item 은 종류(item_type) 로 효과를 구분해요.",
          "'heal' = 회복, 'atk' = 공격력 증가, 'def' = 방어력 증가."
        ],
        code: `class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type
        self.value = value
        self.price = price

potion = Item('물약', 'heal', 30, 50)
print(f'{potion.name}: {potion.item_type} +{potion.value}, {potion.price}G')`,
        result: "물약: heal +30, 50G",
        en: {
          lines: [
            "An Item uses its type (item_type) to distinguish effects.",
            "'heal' = healing, 'atk' = attack boost, 'def' = defense boost."
          ],
          code: `class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type
        self.value = value
        self.price = price

potion = Item('Potion', 'heal', 30, 50)
print(f'{potion.name}: {potion.item_type} +{potion.value}, {potion.price}G')`,
          result: "Potion: heal +30, 50G"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "Monster 클래스 만들기",
        hint: "self.속성 = 매개변수 형태!",
        template: "class Monster:\n    def __init__(self, name, hp, gold):\n        self.___ = name\n        self.hp = ___\n        self.gold_reward = ___\n\nm = Monster('고블린', 50, 40)\nprint(f'{m.name}: HP {m.hp}, +{m.gold_reward}G')",
        blanksAnswer: ["name", "hp", "gold"],
        answer: "class Monster:\n    def __init__(self, name, hp, gold):\n        self.name = name\n        self.hp = hp\n        self.gold_reward = gold\n\nm = Monster('고블린', 50, 40)\nprint(f'{m.name}: HP {m.hp}, +{m.gold_reward}G')",
        alternateAnswers: [],
        expect: "고블린: HP 50, +40G",
        en: {
          task: "Fill in the 3 blanks!",
          guide: "Create the Monster class",
          hint: "Use the pattern self.attribute = parameter!",
          template: "class Monster:\n    def __init__(self, name, hp, gold):\n        self.___ = name\n        self.hp = ___\n        self.gold_reward = ___\n\nm = Monster('Goblin', 50, 40)\nprint(f'{m.name}: HP {m.hp}, +{m.gold_reward}G')",
          answer: "class Monster:\n    def __init__(self, name, hp, gold):\n        self.name = name\n        self.hp = hp\n        self.gold_reward = gold\n\nm = Monster('Goblin', 50, 40)\nprint(f'{m.name}: HP {m.hp}, +{m.gold_reward}G')",
          expect: "Goblin: HP 50, +40G"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "Item 클래스 만들기",
        hint: "item_type, value 둘 다 매개변수에서!",
        template: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = ___\n        self.value = ___\n\nsword = Item('검', 'atk', 5)\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
        blanksAnswer: ["item_type", "value"],
        answer: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\nsword = Item('검', 'atk', 5)\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
        alternateAnswers: [],
        expect: "검: atk +5",
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Create the Item class",
          hint: "Both item_type and value come from the parameters!",
          template: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = ___\n        self.value = ___\n\nsword = Item('Sword', 'atk', 5)\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
          answer: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\nsword = Item('Sword', 'atk', 5)\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
          expect: "Sword: atk +5"
        }
      }
    },

    { type: "reward", content: { emoji: "👹", message: "Monster & Item 설계 클리어!" } },

    // ============================================
    // Chapter 3: actions 패턴 (Pyodide 대응)
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "actions 패턴",
        desc: "input() 대신 리스트에 미리 넣기!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "웹에서는 input() 을 못 써요.",
          "대신 actions 리스트에 행동을 미리 넣고 하나씩 꺼내요!"
        ],
        code: `actions = ['battle', 'shop', 'quit']
idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

print(next_action())
print(next_action())
print(next_action())`,
        result: "battle\nshop\nquit",
        en: {
          lines: [
            "On the web you can't use input().",
            "Instead, put actions into an actions list ahead of time and take them out one by one!"
          ],
          code: `actions = ['battle', 'shop', 'quit']
idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

print(next_action())
print(next_action())
print(next_action())`,
          result: "battle\nshop\nquit"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `actions = ['attack', 'heal', 'attack']
idx = 0
def next_action():
    global idx
    a = actions[idx]
    idx += 1
    return a

print(next_action())
print(next_action())`,
        predict: {
          question: "두 번째 print 결과는?",
          options: ["attack", "heal", "attack heal", "에러"],
          answer: 1,
          feedback: "idx 가 0→1 로 늘어나서 두 번째 호출 시 actions[1] = 'heal'!"
        },
        en: {
          code: `actions = ['attack', 'heal', 'attack']
idx = 0
def next_action():
    global idx
    a = actions[idx]
    idx += 1
    return a

print(next_action())
print(next_action())`,
          predict: {
            question: "What's the second print's result?",
            options: ["attack", "heal", "attack heal", "Error"],
            feedback: "idx grows 0→1, so the second call gives actions[1] = 'heal'!"
          },
          result: "attack\nheal"
        },
        result: "attack\nheal"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "next_action 함수 완성",
        hint: "global 로 idx 변경 가능하게, idx += 1!",
        template: "actions = ['go', 'stop']\nidx = 0\ndef next_action():\n    ___ idx\n    a = actions[idx]\n    idx ___ 1\n    return a\n\nprint(next_action())\nprint(next_action())",
        blanksAnswer: ["global", "+="],
        answer: "actions = ['go', 'stop']\nidx = 0\ndef next_action():\n    global idx\n    a = actions[idx]\n    idx += 1\n    return a\n\nprint(next_action())\nprint(next_action())",
        alternateAnswers: [],
        expect: "go\nstop",
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Complete the next_action function",
          hint: "Use global so idx can be changed, and idx += 1!",
          template: "actions = ['go', 'stop']\nidx = 0\ndef next_action():\n    ___ idx\n    a = actions[idx]\n    idx ___ 1\n    return a\n\nprint(next_action())\nprint(next_action())",
          answer: "actions = ['go', 'stop']\nidx = 0\ndef next_action():\n    global idx\n    a = actions[idx]\n    idx += 1\n    return a\n\nprint(next_action())\nprint(next_action())",
          expect: "go\nstop"
        }
      }
    },

    {
      type: "quiz",
      content: {
        question: "웹(Pyodide) 환경에서 `input()` 대신 사용하는 방법은?",
        options: [
          "prompt() 함수 사용",
          "actions 리스트에 미리 행동을 넣어두기",
          "sys.stdin 으로 읽기",
          "웹에서는 파이썬을 못 쓴다"
        ],
        answer: 1,
        explanation: "actions = ['attack', 'heal'] 처럼 미리 정해두고 next_action() 으로 하나씩 꺼내요!",
        en: {
          question: "In a web (Pyodide) environment, what do you use instead of `input()`?",
          options: [
            "Use the prompt() function",
            "Put actions into an actions list ahead of time",
            "Read with sys.stdin",
            "You can't use Python on the web"
          ],
          explanation: "Decide them ahead of time like actions = ['attack', 'heal'] and take them out one by one with next_action()!"
        }
      }
    },

    { type: "reward", content: { emoji: "🔄", message: "게임 흐름 설계 완료!" } },

    // ============================================
    // Chapter 4: 종합 — 처음부터 작성
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 — 처음부터 작성",
        desc: "Character, Monster, Item 직접 만들기!"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 Character 클래스에서 잘못된 부분은?",
        code: `class Character:
    def __init__(self, name):
        name = name
        self.hp = 100

hero = Character('용사')
print(hero.name)`,
        options: [
          "class 키워드가 빠졌어요",
          "__init__ 이름이 틀렸어요",
          "self.name = name 이 되어야 해요",
          "hp 가 너무 높아요"
        ],
        answer: 2,
        explanation: "self. 가 빠지면 객체에 저장이 안 돼요! self.name = name 으로 객체에 속성을 저장해야 hero.name 에 접근 가능!",
        en: {
          question: "What's wrong with this Character class?",
          options: [
            "The class keyword is missing",
            "The __init__ name is wrong",
            "It should be self.name = name",
            "hp is too high"
          ],
          explanation: "Without self., it's not stored on the object! You must store the attribute with self.name = name to access hero.name!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Character 클래스(name, hp, atk)를 만들고\nhero('용사', 100, 15) 를 생성해 'name: HP/ATK' 형식으로 출력하세요",
        guide: "class Character → __init__(self, name, hp, atk) → self.속성 = 값",
        hint: "class Character:\n    def __init__(self, name, hp, atk):\n        self.name = name\n        self.hp = hp\n        self.atk = atk\n\nhero = Character('용사', 100, 15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')",
        template: null,
        answer: "class Character:\n    def __init__(self, name, hp, atk):\n        self.name = name\n        self.hp = hp\n        self.atk = atk\n\nhero = Character('용사', 100, 15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')",
        alternateAnswers: [
          "class Character:\n    def __init__(s,name,hp,atk):\n        s.name=name\n        s.hp=hp\n        s.atk=atk\nhero=Character('용사',100,15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')"
        ],
        expect: "용사: 100/15",
        en: {
          task: "Write from scratch! Create a Character class (name, hp, atk),\nthen create hero('Hero', 100, 15) and print it in 'name: HP/ATK' format",
          guide: "class Character → __init__(self, name, hp, atk) → self.attribute = value",
          hint: "class Character:\n    def __init__(self, name, hp, atk):\n        self.name = name\n        self.hp = hp\n        self.atk = atk\n\nhero = Character('Hero', 100, 15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')",
          answer: "class Character:\n    def __init__(self, name, hp, atk):\n        self.name = name\n        self.hp = hp\n        self.atk = atk\n\nhero = Character('Hero', 100, 15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')",
          alternateAnswers: [
            "class Character:\n    def __init__(s,name,hp,atk):\n        s.name=name\n        s.hp=hp\n        s.atk=atk\nhero=Character('Hero',100,15)\nprint(f'{hero.name}: {hero.hp}/{hero.atk}')"
          ],
          expect: "Hero: 100/15"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Item 클래스(name, item_type, value)를 만들고\npotion('물약', 'heal', 30) 과 sword('검', 'atk', 8) 을 만들어 각각 'name: type +value' 출력",
        guide: "class Item: __init__ 에 3개 매개변수, 객체 2개 생성",
        hint: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\npotion = Item('물약', 'heal', 30)\nsword = Item('검', 'atk', 8)\nprint(f'{potion.name}: {potion.item_type} +{potion.value}')\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
        template: null,
        answer: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\npotion = Item('물약', 'heal', 30)\nsword = Item('검', 'atk', 8)\nprint(f'{potion.name}: {potion.item_type} +{potion.value}')\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
        expect: "물약: heal +30\n검: atk +8",
        en: {
          task: "Write from scratch! Create an Item class (name, item_type, value),\nthen create potion('Potion', 'heal', 30) and sword('Sword', 'atk', 8) and print each as 'name: type +value'",
          guide: "class Item: __init__ with 3 parameters, create 2 objects",
          hint: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\npotion = Item('Potion', 'heal', 30)\nsword = Item('Sword', 'atk', 8)\nprint(f'{potion.name}: {potion.item_type} +{potion.value}')\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
          answer: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\npotion = Item('Potion', 'heal', 30)\nsword = Item('Sword', 'atk', 8)\nprint(f'{potion.name}: {potion.item_type} +{potion.value}')\nprint(f'{sword.name}: {sword.item_type} +{sword.value}')",
          expect: "Potion: heal +30\nSword: atk +8"
        }
      }
    },

    { type: "reward", content: { emoji: "🎉", message: "텍스트 RPG 설계 마스터!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 49,
        title: "텍스트 RPG: 게임 설계",
        learned: [
          "Character 클래스 — 이름, HP, ATK, DEF, 인벤토리",
          "Monster 클래스 — HP, 공격력, 처치 보상(exp, gold)",
          "Item 클래스 — 종류(item_type), 효과(value), 가격",
          "max_hp 따로 저장 → 회복 한도 제한",
          "actions 리스트 + next_action() → input() 대체 패턴"
        ],
        canDo: "클래스 3개로 텍스트 RPG 의 뼈대를 설계할 수 있어요!",
        emoji: "📋"
      }
    },

    { type: "done", content: {} }
  ]
}
