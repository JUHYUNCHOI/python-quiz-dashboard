import type { LessonData } from '../types'

export const lesson52: LessonData = {
  id: "52",
  title: "텍스트 RPG: 업그레이드 도전",
  description: "휴식, 치명타, 장비, 스킬로 게임 업그레이드!",
  steps: [
    // ============================================
    // Chapter 1: 휴식 시스템
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "휴식 시스템",
        desc: "max_hp 의 30% 회복, min 으로 한도 제한!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "휴식 = max_hp 의 30% 회복!",
          "회복량이 max_hp 를 넘으면 안 되니까 min 으로 제한."
        ],
        code: `class Character:
    def __init__(self, hp):
        self.hp = hp
        self.max_hp = hp

    def rest(self):
        heal = int(self.max_hp * 0.3)
        self.hp = min(self.hp + heal, self.max_hp)
        print(f'+{heal} HP -> {self.hp}/{self.max_hp}')

c = Character(120)
c.hp = 50
c.rest()`,
        result: "+36 HP -> 86/120",
        note: "int(120 * 0.3) = 36!",
        en: {
          lines: [
            "Rest = recover 30% of max_hp!",
            "Recovery can't exceed max_hp, so cap it with min."
          ],
          note: "int(120 * 0.3) = 36!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `def rest(hp, max_hp):
    heal = int(max_hp * 0.3)
    return min(hp + heal, max_hp)

print(rest(80, 100))
print(rest(95, 100))`,
        predict: {
          question: "출력 결과는?",
          options: ["110\n125", "100\n100", "30\n30", "80\n95"],
          answer: 1,
          feedback: "30 회복 → 80+30=110 이지만 max 100 으로 제한 / 95+30=125 → 100!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["110\n125", "100\n100", "30\n30", "80\n95"],
            feedback: "Recover 30 → 80+30=110 but capped at max 100 / 95+30=125 → 100!"
          },
          result: "100\n100"
        },
        result: "100\n100"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채우세요!",
        guide: "rest 메서드 — 최대 HP 의 30% 회복",
        hint: "곱셈은 *, 한도는 min!",
        template: "class Character:\n    def __init__(self, hp):\n        self.hp = hp\n        self.max_hp = hp\n\n    def rest(self):\n        heal = int(self.max_hp ___ 0.3)\n        self.hp = ___(self.hp + heal, self.max_hp)\n\nc = Character(100)\nc.hp = 40\nc.rest()\nprint(c.hp)",
        blanksAnswer: ["*", "min"],
        answer: "class Character:\n    def __init__(self, hp):\n        self.hp = hp\n        self.max_hp = hp\n\n    def rest(self):\n        heal = int(self.max_hp * 0.3)\n        self.hp = min(self.hp + heal, self.max_hp)\n\nc = Character(100)\nc.hp = 40\nc.rest()\nprint(c.hp)",
        alternateAnswers: [],
        expect: "70"
      }
    },

    { type: "reward", content: { emoji: "💤", message: "휴식 시스템 클리어!" } },

    // ============================================
    // Chapter 2: 치명타 시스템
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "치명타 시스템",
        desc: "random.random() < 0.2 면 데미지 1.5배!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "random.random() 은 0~1 사이 실수를 반환해요.",
          "이 값이 0.2 미만이면 → 20% 확률로 치명타!"
        ],
        code: `import random
random.seed(42)

for i in range(5):
    r = random.random()
    is_crit = r < 0.2
    print(f'{r:.2f} -> {"크리!" if is_crit else "일반"}')`,
        result: "0.64 -> 일반\n0.03 -> 크리!\n0.28 -> 일반\n0.22 -> 일반\n0.74 -> 일반",
        note: "0.03 < 0.2 → 크리티컬!",
        en: {
          lines: [
            "random.random() returns a decimal between 0 and 1.",
            "If that value is below 0.2 → a 20% chance of a critical hit!"
          ],
          note: "0.03 < 0.2 → critical hit!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `def attack(atk, is_crit):
    damage = atk
    if is_crit:
        damage = int(damage * 1.5)
    return damage

print(attack(20, False))
print(attack(20, True))`,
        predict: {
          question: "출력 결과는?",
          options: ["20\n20", "20\n30", "30\n20", "20\n40"],
          answer: 1,
          feedback: "일반 = 20 그대로, 크리 = int(20 * 1.5) = 30!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["20\n20", "20\n30", "30\n20", "20\n40"],
            feedback: "Normal = 20 unchanged, crit = int(20 * 1.5) = 30!"
          },
          result: "20\n30"
        },
        result: "20\n30"
      }
    },

    {
      type: "quiz",
      content: {
        question: "`random.random() < 0.2` 가 True 일 확률은?",
        options: ["2%", "20%", "80%", "항상 True"],
        answer: 1,
        explanation: "random.random() 은 0~1 사이 실수! 그 값이 0.2 보다 작을 확률 = 20%!",
        en: {
          question: "What's the probability that `random.random() < 0.2` is True?",
          options: ["2%", "20%", "80%", "Always True"],
          explanation: "random.random() is a decimal between 0 and 1! The chance it's below 0.2 = 20%!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "치명타 시스템 완성",
        hint: "random 호출, 확률 비교, 1.5배!",
        en: {
          task: "Fill in the 3 blanks!",
          guide: "Complete the critical hit system",
          hint: "call random, compare the probability, 1.5x!"
        },
        template: "import random\nrandom.seed(10)\n\ndef attack(atk):\n    damage = atk\n    if random.___() < 0.5:\n        damage = ___(damage * ___)\n        print(f'크리! {damage}')\n    else:\n        print(f'일반 {damage}')\n\nattack(10)\nattack(10)",
        blanksAnswer: ["random", "int", "1.5"],
        answer: "import random\nrandom.seed(10)\n\ndef attack(atk):\n    damage = atk\n    if random.random() < 0.5:\n        damage = int(damage * 1.5)\n        print(f'크리! {damage}')\n    else:\n        print(f'일반 {damage}')\n\nattack(10)\nattack(10)",
        alternateAnswers: [],
        expect: "일반 10\n크리! 15"
      }
    },

    { type: "reward", content: { emoji: "💥", message: "치명타 시스템 클리어!" } },

    // ============================================
    // Chapter 3: 장비 시스템
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "장비 시스템",
        desc: "base_atk + weapon.atk_bonus = 실제 공격력!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [
          "기본 공격력은 고정, 장비 보너스는 따로!",
          "실제 공격력 = base_atk + weapon.atk_bonus"
        ],
        code: `class Equipment:
    def __init__(self, name, atk_bonus):
        self.name = name
        self.atk_bonus = atk_bonus

class Character:
    def __init__(self, name, atk):
        self.name = name
        self.base_atk = atk
        self.weapon = None

    def get_atk(self):
        bonus = self.weapon.atk_bonus if self.weapon else 0
        return self.base_atk + bonus

hero = Character('용사', 15)
print(hero.get_atk())
hero.weapon = Equipment('철검', 8)
print(hero.get_atk())`,
        result: "15\n23",
        en: {
          lines: [
            "Base attack is fixed, the equipment bonus is separate!",
            "Actual attack = base_atk + weapon.atk_bonus"
          ],
          code: `class Equipment:
    def __init__(self, name, atk_bonus):
        self.name = name
        self.atk_bonus = atk_bonus

class Character:
    def __init__(self, name, atk):
        self.name = name
        self.base_atk = atk
        self.weapon = None

    def get_atk(self):
        bonus = self.weapon.atk_bonus if self.weapon else 0
        return self.base_atk + bonus

hero = Character('Hero', 15)
print(hero.get_atk())
hero.weapon = Equipment('Iron Sword', 8)
print(hero.get_atk())`,
          result: "15\n23"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Equip:
    def __init__(self, bonus):
        self.bonus = bonus

def total_atk(base, weapon):
    if weapon is None:
        return base
    return base + weapon.bonus

print(total_atk(10, None))
print(total_atk(10, Equip(5)))`,
        predict: {
          question: "출력 결과는?",
          options: ["10\n10", "10\n15", "0\n5", "에러"],
          answer: 1,
          feedback: "None 이면 base 만, 있으면 base + bonus = 15!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["10\n10", "10\n15", "0\n5", "Error"],
            feedback: "If None, just base; if present, base + bonus = 15!"
          },
          result: "10\n15"
        },
        result: "10\n15"
      }
    },

    {
      type: "quiz",
      content: {
        question: "장비 시스템에서 `base_atk` 와 `get_atk()` 를 분리하는 이유는?",
        options: [
          "파이썬 규칙이라서",
          "장비를 바꿔도 기본 스탯은 유지하려고",
          "메모리를 아끼려고",
          "코드를 길게 만들려고"
        ],
        answer: 1,
        explanation: "기본 공격력은 고정! 장비 바꾸면 보너스만 자동 계산! 분리해야 깔끔!",
        en: {
          question: "In the equipment system, why separate `base_atk` from `get_atk()`?",
          options: [
            "Because it's a Python rule",
            "So the base stat stays the same even when equipment changes",
            "To save memory",
            "To make the code longer"
          ],
          explanation: "Base attack is fixed! When you swap equipment, only the bonus is recalculated automatically! Separating them keeps it clean!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 3개를 채우세요!",
        guide: "get_atk 메서드 완성 (장비 있을 때만 보너스)",
        hint: "if-else 한 줄로 (조건부 표현식), 합산, None 체크",
        en: {
          task: "Fill in the 3 blanks!",
          guide: "Complete the get_atk method (bonus only when equipped)",
          hint: "if-else on one line (conditional expression), add them up, None check"
        },
        template: "class Equipment:\n    def __init__(self, bonus):\n        self.atk_bonus = bonus\n\nclass Hero:\n    def __init__(self, atk):\n        self.base_atk = atk\n        self.weapon = ___\n\n    def get_atk(self):\n        bonus = self.weapon.atk_bonus if self.weapon else 0\n        return self.base_atk ___ bonus\n\nh = Hero(10)\nprint(h.get_atk())\nh.weapon = Equipment(5)\nprint(h.___())",
        blanksAnswer: ["None", "+", "get_atk"],
        answer: "class Equipment:\n    def __init__(self, bonus):\n        self.atk_bonus = bonus\n\nclass Hero:\n    def __init__(self, atk):\n        self.base_atk = atk\n        self.weapon = None\n\n    def get_atk(self):\n        bonus = self.weapon.atk_bonus if self.weapon else 0\n        return self.base_atk + bonus\n\nh = Hero(10)\nprint(h.get_atk())\nh.weapon = Equipment(5)\nprint(h.get_atk())",
        alternateAnswers: [],
        expect: "10\n15"
      }
    },

    { type: "reward", content: { emoji: "🛡️", message: "장비 시스템 클리어!" } },

    // ============================================
    // Chapter 4: 종합 — 처음부터 작성
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 — 처음부터 작성",
        desc: "휴식 + 치명타 + 장비 직접 만들기!"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 휴식 함수에서 잘못된 부분은?",
        code: `class C:
    def __init__(self, hp):
        self.hp = hp
        self.max_hp = hp

    def rest(self):
        self.hp += int(self.max_hp * 0.3)`,
        options: [
          "max_hp 가 빠졌어요",
          "max_hp 를 넘을 수 있어요 (min 으로 제한 필요!)",
          "0.3 이 너무 작아요",
          "self 가 빠졌어요"
        ],
        answer: 1,
        explanation: "hp 90, max_hp 100, 회복량 30 이면 → hp = 120 (max 넘음!). min(hp + heal, max_hp) 로 한도 제한 필수!",
        en: {
          question: "What's wrong with this rest function?",
          options: [
            "max_hp is missing",
            "It can exceed max_hp (need to cap it with min!)",
            "0.3 is too small",
            "self is missing"
          ],
          explanation: "If hp is 90, max_hp is 100, and recovery is 30 → hp = 120 (over max!). You must cap it with min(hp + heal, max_hp)!"
        }
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Character(hp=100) 객체에 rest() 메서드를 만들어\nhp 40 일 때 호출하면 max_hp 30% (=30) 회복해서 70 출력",
        guide: "rest 안에서 heal = int(max_hp * 0.3), min 으로 한도 제한",
        hint: "class Character:\n    def __init__(self, hp):\n        self.hp = hp\n        self.max_hp = hp\n\n    def rest(self):\n        heal = int(self.max_hp * 0.3)\n        self.hp = min(self.hp + heal, self.max_hp)\n\nc = Character(100)\nc.hp = 40\nc.rest()\nprint(c.hp)",
        en: {
          task: "Write from scratch! Add a rest() method to a Character(hp=100) object\nso that calling it when hp is 40 recovers 30% of max_hp (=30) and prints 70",
          guide: "Inside rest, heal = int(max_hp * 0.3), cap it with min",
          hint: "class Character:\n    def __init__(self, hp):\n        self.hp = hp\n        self.max_hp = hp\n\n    def rest(self):\n        heal = int(self.max_hp * 0.3)\n        self.hp = min(self.hp + heal, self.max_hp)\n\nc = Character(100)\nc.hp = 40\nc.rest()\nprint(c.hp)"
        },
        template: null,
        answer: "class Character:\n    def __init__(self, hp):\n        self.hp = hp\n        self.max_hp = hp\n\n    def rest(self):\n        heal = int(self.max_hp * 0.3)\n        self.hp = min(self.hp + heal, self.max_hp)\n\nc = Character(100)\nc.hp = 40\nc.rest()\nprint(c.hp)",
        alternateAnswers: [
          "class Character:\n    def __init__(self,hp):\n        self.hp=hp\n        self.max_hp=hp\n    def rest(self):\n        heal=int(self.max_hp*0.3)\n        self.hp=min(self.hp+heal,self.max_hp)\nc=Character(100)\nc.hp=40\nc.rest()\nprint(c.hp)"
        ],
        expect: "70"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! random.seed(0) 으로 고정 후,\natk(20)인 캐릭터가 4 번 공격할 때 치명타(50% 확률, 1.5배) 적용한 데미지를 한 줄씩 출력",
        guide: "import random, random.seed(0), for 루프, random.random() < 0.5",
        hint: "import random\nrandom.seed(0)\natk = 20\nfor _ in range(4):\n    if random.random() < 0.5:\n        print(int(atk * 1.5))\n    else:\n        print(atk)",
        en: {
          task: "Write from scratch! After fixing the seed with random.seed(0),\nprint the damage of a character with atk(20) attacking 4 times, one line each, applying critical hits (50% chance, 1.5x)",
          guide: "import random, random.seed(0), for loop, random.random() < 0.5",
          hint: "import random\nrandom.seed(0)\natk = 20\nfor _ in range(4):\n    if random.random() < 0.5:\n        print(int(atk * 1.5))\n    else:\n        print(atk)"
        },
        template: null,
        answer: "import random\nrandom.seed(0)\natk = 20\nfor _ in range(4):\n    if random.random() < 0.5:\n        print(int(atk * 1.5))\n    else:\n        print(atk)",
        alternateAnswers: [
          "import random\nrandom.seed(0)\natk=20\nfor i in range(4):\n    if random.random()<0.5:\n        print(int(atk*1.5))\n    else:\n        print(atk)"
        ],
        expect: "20\n20\n30\n30"
      }
    },

    { type: "reward", content: { emoji: "🏆", message: "RPG 마스터 등극!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 52,
        title: "텍스트 RPG: 업그레이드 도전",
        learned: [
          "휴식 — int(max_hp * 0.3) 회복, min 으로 한도 제한",
          "치명타 — random.random() < 확률 로 판정, int(damage * 1.5)",
          "장비 — base_atk 고정 + weapon.atk_bonus 동적 합산",
          "조건부 표현식 — `a if cond else b` 로 한 줄 분기",
          "기본/보너스 분리 — 장비 바꿔도 기본은 안 변함"
        ],
        canDo: "텍스트 RPG 를 휴식/치명타/장비로 업그레이드할 수 있어요!",
        emoji: "🏆"
      }
    },

    { type: "done", content: {} }
  ]
}
