import type { LessonData } from '../types'

export const lesson50: LessonData = {
  id: "50",
  title: "텍스트 RPG: 핵심 시스템",
  description: "직업별 스탯, 전투, 레벨업, 아이템 사용!",
  steps: [
    // ============================================
    // Chapter 1: 직업별 스탯
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "직업별 스탯",
        desc: "용사/마법사/궁수 — if/elif 로 분기!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "직업마다 스탯이 다르게! if/elif 로 분기해요.",
          "용사 = 튼튼, 마법사 = 공격력, 궁수 = 균형!"
        ],
        code: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        if job == 'warrior':
            self.hp, self.atk, self.defense = 120, 15, 12
        elif job == 'mage':
            self.hp, self.atk, self.defense = 80, 25, 5
        else:
            self.hp, self.atk, self.defense = 100, 20, 8

hero = Character('영희', 'mage')
print(f'{hero.name}: HP {hero.hp}, ATK {hero.atk}')`,
        result: "영희: HP 80, ATK 25"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Character:
    def __init__(self, name, job):
        if job == 'warrior':
            self.hp = 120
        elif job == 'mage':
            self.hp = 80
        else:
            self.hp = 100

a = Character('A', 'warrior')
b = Character('B', 'archer')
print(a.hp, b.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["120 80", "120 100", "80 100", "100 120"],
          answer: 1,
          feedback: "warrior → 120, archer → else 분기로 100!"
        },
        result: "120 100"
      }
    },

    {
      type: "quiz",
      content: {
        question: "마법사(mage) 직업의 특징은?",
        options: [
          "HP 최고, 공격력 낮음",
          "HP 낮음, 공격력 최고",
          "모든 스탯이 균형",
          "방어력 최고"
        ],
        answer: 1,
        explanation: "마법사는 HP 80(최저), ATK 25(최고)! 유리대포 스타일이에요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "직업별 분기 완성하기",
        hint: "if 다음은 elif, 키워드는 'mage'!",
        template: "class Character:\n    def __init__(self, name, job):\n        self.name = name\n        if job == 'warrior':\n            self.hp = 120\n        ___ job == '___':\n            self.hp = 80\n        else:\n            self.hp = 100\n\nc = Character('영희', 'mage')\nprint(c.hp)",
        blanksAnswer: ["elif", "mage"],
        answer: "class Character:\n    def __init__(self, name, job):\n        self.name = name\n        if job == 'warrior':\n            self.hp = 120\n        elif job == 'mage':\n            self.hp = 80\n        else:\n            self.hp = 100\n\nc = Character('영희', 'mage')\nprint(c.hp)",
        alternateAnswers: [],
        expect: "80"
      }
    },

    { type: "reward", content: { emoji: "⚔️", message: "직업별 스탯 클리어!" } },

    // ============================================
    // Chapter 2: 전투 시스템 (take_damage)
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "전투 시스템",
        desc: "데미지 = 공격력 - 방어력, 최소 1!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "전투 데미지 = 공격력 - 방어력!",
          "그런데 방어력이 더 높으면? 최소 1 데미지는 보장!"
        ],
        code: `def take_damage(hp, damage, defense):
    actual = damage - defense
    if actual < 1:
        actual = 1
    return hp - actual, actual

new_hp, dmg = take_damage(100, 5, 10)
print(f'데미지 {dmg}, HP {new_hp}')`,
        result: "데미지 1, HP 99",
        note: "5 - 10 = -5 지만 최소 1 보장!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Character:
    def __init__(self, hp, defense):
        self.hp = hp
        self.defense = defense

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        return actual

hero = Character(100, 5)
dmg = hero.take_damage(20)
print(dmg, hero.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["20 80", "15 85", "5 95", "1 99"],
          answer: 1,
          feedback: "20 - 5 = 15 데미지, HP 100 - 15 = 85!"
        },
        result: "15 85"
      }
    },

    {
      type: "quiz",
      content: {
        question: "용사(ATK 15) 가 고블린(DEF 5) 을 공격하면 데미지는?",
        options: ["5", "10", "15", "20"],
        answer: 1,
        explanation: "15 - 5 = 10! 방어력만큼 데미지가 깎여요!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "공격력 3, 방어력 10 인 상대를 공격하면 데미지는?",
        options: ["0", "1", "-7", "7"],
        answer: 1,
        explanation: "3 - 10 = -7 이지만 최소 1! `if actual < 1: actual = 1` 로 보장!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "take_damage 메서드 완성",
        hint: "차이 계산 → 최소 1 보장 → hp 감소",
        template: "class Hero:\n    def __init__(self, hp, defense):\n        self.hp = hp\n        self.defense = defense\n\n    def take_damage(self, damage):\n        actual = damage - self.___\n        if actual < ___:\n            actual = 1\n        self.hp ___ actual\n        return actual\n\nh = Hero(100, 8)\nprint(h.take_damage(20), h.hp)",
        blanksAnswer: ["defense", "1", "-="],
        answer: "class Hero:\n    def __init__(self, hp, defense):\n        self.hp = hp\n        self.defense = defense\n\n    def take_damage(self, damage):\n        actual = damage - self.defense\n        if actual < 1:\n            actual = 1\n        self.hp -= actual\n        return actual\n\nh = Hero(100, 8)\nprint(h.take_damage(20), h.hp)",
        alternateAnswers: [],
        expect: "12 88"
      }
    },

    { type: "reward", content: { emoji: "🗡️", message: "전투 시스템 클리어!" } },

    // ============================================
    // Chapter 3: 레벨업 + heal
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "레벨업 + heal",
        desc: "경험치 100 마다 레벨업, min 으로 회복 한도!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "heal 은 max_hp 를 넘으면 안 돼요.",
          "min(현재 hp + 회복량, max_hp) 패턴으로 한도 제한!"
        ],
        code: `class Character:
    def __init__(self):
        self.hp = 70
        self.max_hp = 100

    def heal(self, amount):
        self.hp = min(self.hp + amount, self.max_hp)

c = Character()
c.heal(50)
print(c.hp)`,
        result: "100",
        note: "70 + 50 = 120 이지만 max_hp 100 으로 제한!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "경험치 100 마다 레벨업!",
          "while 로 한 번에 여러 레벨 올라갈 수도 있어요."
        ],
        code: `class Character:
    def __init__(self):
        self.level = 1
        self.exp = 0

    def gain_exp(self, amount):
        self.exp += amount
        while self.exp >= 100:
            self.exp -= 100
            self.level += 1

c = Character()
c.gain_exp(250)
print(c.level, c.exp)`,
        predict: {
          question: "출력 결과는?",
          options: ["1 250", "2 50", "3 50", "4 50"],
          answer: 2,
          feedback: "250 → 100 빼고 lv2, 100 더 빼고 lv3, 50 남음!"
        },
        result: "3 50"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "heal 메서드 완성 — min 으로 최대치 제한!",
        hint: "min(현재값, 최대값)",
        template: "class Character:\n    def __init__(self):\n        self.hp = 50\n        self.max_hp = 100\n\n    def heal(self, amount):\n        self.hp = ___(self.hp + amount, self.___)\n\nc = Character()\nc.heal(80)\nprint(c.hp)",
        blanksAnswer: ["min", "max_hp"],
        answer: "class Character:\n    def __init__(self):\n        self.hp = 50\n        self.max_hp = 100\n\n    def heal(self, amount):\n        self.hp = min(self.hp + amount, self.max_hp)\n\nc = Character()\nc.heal(80)\nprint(c.hp)",
        alternateAnswers: [],
        expect: "100"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "___ 자리 3개를 채우세요!",
        guide: "gain_exp + 레벨업 시스템",
        hint: "100 이상이면 빼고 레벨++!",
        template: "class Player:\n    def __init__(self):\n        self.level = 1\n        self.exp = 0\n\n    def gain_exp(self, amount):\n        self.exp ___ amount\n        while self.exp ___ 100:\n            self.exp -= 100\n            self.level ___ 1\n\np = Player()\np.gain_exp(150)\nprint(p.level, p.exp)",
        blanksAnswer: ["+=", ">=", "+="],
        answer: "class Player:\n    def __init__(self):\n        self.level = 1\n        self.exp = 0\n\n    def gain_exp(self, amount):\n        self.exp += amount\n        while self.exp >= 100:\n            self.exp -= 100\n            self.level += 1\n\np = Player()\np.gain_exp(150)\nprint(p.level, p.exp)",
        alternateAnswers: [],
        expect: "2 50"
      }
    },

    { type: "reward", content: { emoji: "⭐", message: "레벨업 시스템 클리어!" } },

    // ============================================
    // Chapter 4: Item 사용 + 인벤토리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "Item 사용 + 인벤토리",
        desc: "item_type 으로 분기, append/pop 으로 관리!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "Item 의 item_type 으로 효과를 다르게 적용!",
          "'heal' → HP 회복, 'atk' → 공격력 증가, 'def' → 방어력 증가."
        ],
        code: `class Item:
    def __init__(self, name, item_type, value):
        self.name = name
        self.item_type = item_type
        self.value = value

def use_item(hero_hp, max_hp, item):
    if item.item_type == 'heal':
        return min(hero_hp + item.value, max_hp)
    return hero_hp

potion = Item('물약', 'heal', 30)
new_hp = use_item(60, 100, potion)
print(new_hp)`,
        result: "90"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "인벤토리는 리스트! append 로 추가, pop 으로 사용 후 제거."
        ],
        code: `inventory = []
inventory.append('물약')
inventory.append('검')
inventory.append('방패')
print(len(inventory))

used = inventory.pop(0)
print(used, len(inventory))`,
        predict: {
          question: "출력 결과는?",
          options: ["3\n물약 2", "3\n방패 2", "2\n물약 1", "에러"],
          answer: 0,
          feedback: "3개 추가, pop(0) 으로 첫 번째 '물약' 꺼냄, 2개 남음!"
        },
        result: "3\n물약 2"
      }
    },

    {
      type: "quiz",
      content: {
        question: "인벤토리에서 아이템을 사용하고 제거하는 메서드는?",
        options: [
          "inventory.remove(0)",
          "inventory.pop(index)",
          "inventory.delete(0)",
          "del inventory[0]"
        ],
        answer: 1,
        explanation: "pop(index) 는 해당 위치의 아이템을 꺼내고 반환! 사용+제거를 한 번에!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "use_item 함수 완성 — heal 타입만 처리",
        hint: "item_type 비교, min 으로 한도, append/pop?",
        template: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\nhp = 40\nmax_hp = 100\ninventory = [Item('물약', 'heal', 30)]\n\nitem = inventory.___(0)\nif item.item_type == '___':\n    hp = ___(hp + item.value, max_hp)\nprint(hp, len(inventory))",
        blanksAnswer: ["pop", "heal", "min"],
        answer: "class Item:\n    def __init__(self, name, item_type, value):\n        self.name = name\n        self.item_type = item_type\n        self.value = value\n\nhp = 40\nmax_hp = 100\ninventory = [Item('물약', 'heal', 30)]\n\nitem = inventory.pop(0)\nif item.item_type == 'heal':\n    hp = min(hp + item.value, max_hp)\nprint(hp, len(inventory))",
        alternateAnswers: [],
        expect: "70 0"
      }
    },

    { type: "reward", content: { emoji: "🎒", message: "인벤토리 클리어!" } },

    // ============================================
    // Chapter 5: 종합 — 처음부터 작성
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "종합 — 처음부터 작성",
        desc: "Character + take_damage + heal 종합!"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 take_damage 메서드에서 잘못된 부분은?",
        code: `def take_damage(self, damage):
    actual = damage - self.defense
    self.hp -= actual
    return actual`,
        options: [
          "self 가 빠졌어요",
          "최소 1 데미지 보장이 없어요 (방어력이 더 높으면 hp 가 늘어남!)",
          "return 이 잘못됐어요",
          "이름이 틀렸어요"
        ],
        answer: 1,
        explanation: "damage 3, defense 10 이면 actual = -7 → hp 가 7 늘어남! `if actual < 1: actual = 1` 필요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Character 클래스(hp, atk, defense)를 만들고,\ntake_damage 메서드로 hero(100, 0, 5) 가 20 데미지 받았을 때 남은 HP 출력",
        guide: "actual = damage - defense, 최소 1, hp -= actual",
        hint: "class Character:\n    def __init__(self, hp, atk, defense):\n        self.hp = hp\n        self.atk = atk\n        self.defense = defense\n\n    def take_damage(self, damage):\n        actual = damage - self.defense\n        if actual < 1:\n            actual = 1\n        self.hp -= actual\n\nhero = Character(100, 0, 5)\nhero.take_damage(20)\nprint(hero.hp)",
        template: null,
        answer: "class Character:\n    def __init__(self, hp, atk, defense):\n        self.hp = hp\n        self.atk = atk\n        self.defense = defense\n\n    def take_damage(self, damage):\n        actual = damage - self.defense\n        if actual < 1:\n            actual = 1\n        self.hp -= actual\n\nhero = Character(100, 0, 5)\nhero.take_damage(20)\nprint(hero.hp)",
        alternateAnswers: [
          "class Character:\n    def __init__(self,hp,atk,defense):\n        self.hp=hp\n        self.atk=atk\n        self.defense=defense\n    def take_damage(self,damage):\n        actual=max(damage-self.defense,1)\n        self.hp-=actual\nhero=Character(100,0,5)\nhero.take_damage(20)\nprint(hero.hp)"
        ],
        expect: "85"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Character(hp=50, max_hp=100) 객체에 heal(30) 메서드를 적용해 HP 출력.\n반드시 max_hp 를 넘지 않게 min 사용!",
        guide: "self.hp = min(self.hp + amount, self.max_hp)",
        hint: "class Character:\n    def __init__(self, hp, max_hp):\n        self.hp = hp\n        self.max_hp = max_hp\n\n    def heal(self, amount):\n        self.hp = min(self.hp + amount, self.max_hp)\n\nc = Character(50, 100)\nc.heal(30)\nprint(c.hp)",
        template: null,
        answer: "class Character:\n    def __init__(self, hp, max_hp):\n        self.hp = hp\n        self.max_hp = max_hp\n\n    def heal(self, amount):\n        self.hp = min(self.hp + amount, self.max_hp)\n\nc = Character(50, 100)\nc.heal(30)\nprint(c.hp)",
        alternateAnswers: [
          "class Character:\n    def __init__(self,hp,max_hp):\n        self.hp=hp\n        self.max_hp=max_hp\n    def heal(self,amount):\n        self.hp=min(self.hp+amount,self.max_hp)\nc=Character(50,100)\nc.heal(30)\nprint(c.hp)"
        ],
        expect: "80"
      }
    },

    { type: "reward", content: { emoji: "🎉", message: "핵심 시스템 마스터!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 50,
        title: "텍스트 RPG: 핵심 시스템",
        learned: [
          "직업별 스탯 — if/elif 로 warrior/mage/archer 분기",
          "take_damage — actual = damage - defense, 최소 1 보장",
          "heal — min(hp + amount, max_hp) 로 최대치 제한",
          "gain_exp + 레벨업 — while 로 연속 레벨업도 가능",
          "Item.item_type 으로 효과 분기, append/pop 으로 인벤토리"
        ],
        canDo: "전투, 레벨업, 인벤토리 시스템을 직접 구현할 수 있어요!",
        emoji: "⚔️"
      }
    },

    { type: "done", content: {} }
  ]
}
