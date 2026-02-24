import { LessonData } from './types'

export const lesson43EnData: LessonData = {
  id: "43en",
  title: "Mini Project: RPG Game",
  emoji: "🎮",
  description: "Build RPG characters with classes and battle them!",
  chapters: [
    {
      id: "ch1",
      title: "Creating a Character Class",
      emoji: "🦸",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "Can we build a real RPG game with classes?",
          content: `Can we combine classes, methods, and attributes we've learned so far to build a **real RPG battle game**?

### 4 Steps to Complete:
1. 🦸 **Character Class** — Basic attributes
2. 👹 **Monster Class** — Creating enemies
3. ⚔️ **Battle System** — Turn-based combat
4. 🏆 **Level Up System** — Growth

\`\`\`python
# Our final goal!
hero = Hero('Hero', 100, 20)
monster = Monster('Dragon', 80, 15)
battle(hero, monster)  # Auto battle!
\`\`\`

@Key Point: Classes + Methods + Attributes = You can even make an **RPG game**!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "Step 1: Basic Character Class",
          task: "Run the basic structure of the Character class!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.alive = True

    def status(s):
        bar_len = 10
        filled = int(s.hp / s.max_hp * bar_len)
        bar = '#' * filled + '-' * (bar_len - filled)
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: [{bar}] HP {s.hp}/{s.max_hp} ATK {s.atk}')

hero = Character('Hero', 100, 20)
mage = Character('Mage', 80, 30)
hero.status()
mage.status()`,
          expectedOutput: `[O] Hero: [##########] HP 100/100 ATK 20\n[O] Mage: [##########] HP 80/80 ATK 30`,
          hint: "The HP bar is built based on the current health ratio!",
          hint2: "filled = int(s.hp / s.max_hp * bar_len) calculates the ratio!"
        },
        {
          id: "ch1-2",
          type: "mission",
          title: "Mission: Add Defense to the Character!",
          task: "Add a defense attribute to the Character class! Fill in the 2 blanks!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.___ = defense
        s.alive = True

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: HP {s.hp}/{s.max_hp} ATK {s.atk} DEF {s.___}')

hero = Character('Hero', 100, 20, 10)
hero.status()`,
          expectedOutput: `[O] Hero: HP 100/100 ATK 20 DEF 10`,
          hint: "Store defense just like other attributes using s.xxx!",
          hint2: "defense / defense"
        }
      ]
    },
    {
      id: "ch2",
      title: "Monsters & Battle Methods",
      emoji: "👹",
      steps: [
        {
          id: "ch2-0",
          type: "tryit",
          title: "Step 2: Creating Monsters!",
          task: "Run the battle system with attack, take_damage, and heal methods added to the Character class!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'{s.name} -> {target.name} ({actual} dmg)')
        if not target.alive:
            print(f'{target.name} defeated!')

    def heal(s, amount):
        if not s.alive:
            return
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'{s.name} healed! HP: {s.hp}/{s.max_hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: HP {s.hp}/{s.max_hp}')

# Create characters
hero = Character('Hero', 100, 25, 8)
slime = Character('Slime', 40, 12, 3)

print('=== Characters Created ===')
hero.status()
slime.status()

print('\\n=== Battle! ===')
hero.attack(slime)
slime.attack(hero)
hero.attack(slime)

print('\\n=== Result ===')
hero.status()
slime.status()`,
          expectedOutput: `=== Characters Created ===\n[O] Hero: HP 100/100\n[O] Slime: HP 40/40\n\n=== Battle! ===\nHero -> Slime (22 dmg)\nSlime -> Hero (4 dmg)\nHero -> Slime (22 dmg)\nSlime defeated!\n\n=== Result ===\n[O] Hero: HP 96/100\n[X] Slime: HP 0/40`,
          hint: "Defense reduces damage in take_damage!",
          hint2: "actual = damage - defense, minimum 1 damage always gets through!"
        },
        {
          id: "ch2-0b",
          type: "mission",
          title: "Mission: Complete the Battle Methods!",
          task: "Fill in 3 blanks to complete the battle system!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense

    def take_damage(s, damage):
        actual = damage - s.___
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        return actual

    def attack(s, target):
        actual = target.___(s.atk)
        print(f'{s.name} -> {target.name} ({actual} dmg)')

    def status(s):
        print(f'{s.name}: HP {s.hp}')

hero = Character('Hero', 100, 25, 8)
slime = Character('Slime', 30, 10, 2)

hero.status()
slime.status()

print('\\n--- Battle! ---')
hero.___(slime)
slime.attack(hero)

print('\\n--- Result ---')
hero.status()
slime.status()`,
          expectedOutput: `Hero: HP 100\nSlime: HP 30\n\n--- Battle! ---\nHero -> Slime (23 dmg)\nSlime -> Hero (2 dmg)\n\n--- Result ---\nHero: HP 98\nSlime: HP 7`,
          hint: "Defense reduces damage, take_damage applies it, attack initiates combat!",
          hint2: "defense / take_damage / attack"
        },
        {
          id: "ch2-1",
          type: "quiz",
          title: "Quiz!",
          content: "If defense is 10 and you receive an attack of 8?\n\n```python\ndef take_damage(s, damage):\n    actual = damage - s.defense\n    if actual < 1:\n        actual = 1\n```",
          options: [
            "0 damage (ignored)",
            "1 damage (minimum)",
            "8 damage (unchanged)",
            "Error"
          ],
          answer: 1,
          explanation: "8 - 10 = -2, but minimum 1 damage always gets through!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Turn-Based Battle System",
      emoji: "⚔️",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "How do we make the hero and monster take turns fighting?",
          content: `We made the attack method, but how do we implement **taking turns** attacking each other?

### Flow
\`\`\`
Turn 1: Hero acts → Monster acts
Turn 2: Hero acts → Monster acts
Turn 3: ...  (Until someone falls!)
\`\`\`

### Lists instead of input()!
\`\`\`python
# We can't use input() on this web app, so...
actions = ['attack', 'heal', 'attack']

for action in actions:
    if action == 'attack':
        hero.attack(monster)
    elif action == 'heal':
        hero.heal(20)
\`\`\`

@Key Point: **List + for loop** to pre-define actions creates an automatic turn-based battle!`
        },
        {
          id: "ch3-0",
          type: "tryit",
          title: "Step 3: Turn-Based Battle!",
          task: "Run the auto-battle system using an actions list!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} dmg)')
        if not target.alive:
            print(f'  {target.name} defeated!')

    def heal(s, amount):
        if not s.alive:
            return
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'  {s.name} healed! HP: {s.hp}/{s.max_hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'  [{state}] {s.name}: HP {s.hp}/{s.max_hp}')

# Create characters
hero = Character('Hero', 100, 25, 8)
goblin = Character('Goblin', 60, 18, 5)

# Action list (instead of input()!)
actions = ['attack', 'attack', 'heal', 'attack', 'attack']

print('=== RPG Battle Start! ===')
hero.status()
goblin.status()

turn = 1
for action in actions:
    if not hero.alive or not goblin.alive:
        break

    print(f'\\n--- Turn {turn} ---')

    if action == 'attack':
        hero.attack(goblin)
    elif action == 'heal':
        hero.heal(20)

    if goblin.alive:
        goblin.attack(hero)

    turn = turn + 1

print('\\n=== Battle Over! ===')
hero.status()
goblin.status()
if hero.alive:
    print('Victory!')
else:
    print('Defeat...')`,
          expectedOutput: `=== RPG Battle Start! ===\n  [O] Hero: HP 100/100\n  [O] Goblin: HP 60/60\n\n--- Turn 1 ---\n  Hero -> Goblin (20 dmg)\n  Goblin -> Hero (10 dmg)\n\n--- Turn 2 ---\n  Hero -> Goblin (20 dmg)\n  Goblin -> Hero (10 dmg)\n\n--- Turn 3 ---\n  Hero healed! HP: 100/100\n  Goblin -> Hero (10 dmg)\n\n--- Turn 4 ---\n  Hero -> Goblin (20 dmg)\n  Goblin defeated!\n\n=== Battle Over! ===\n  [O] Hero: HP 90/100\n  [X] Goblin: HP 0/60\nVictory!`,
          hint: "The actions list defines moves without needing input()!",
          hint2: "for action in actions processes one turn at a time!"
        },
        {
          id: "ch3-1",
          type: "mission",
          title: "Mission: Add a Battle Action!",
          task: "Fill in 3 blanks to add a 'defend' action!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True
        s.defending = False

    def take_damage(s, damage):
        actual = damage - s.defense
        if s.defending:
            actual = actual // 2
            s.defending = False
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} dmg)')

    def defend(s):
        s.___ = True
        print(f'  {s.name} braces! (next damage halved)')

    def heal(s, amount):
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'  {s.name} healed! HP: {s.hp}/{s.max_hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'  [{state}] {s.name}: HP {s.hp}/{s.max_hp}')

hero = Character('Hero', 80, 22, 5)
orc = Character('Orc', 50, 20, 3)

# Let's use defend!
actions = ['defend', 'attack', '___', 'attack']

print('=== Battle Start! ===')
turn = 1
for action in actions:
    if not hero.alive or not orc.alive:
        break
    print(f'\\n--- Turn {turn} ---')
    if action == 'attack':
        hero.attack(orc)
    elif action == 'defend':
        hero.defend()
    elif action == 'heal':
        hero.___(15)
    if orc.alive:
        orc.attack(hero)
    turn = turn + 1

print('\\n=== Result ===')
hero.status()
orc.status()`,
          expectedOutput: `=== Battle Start! ===\n\n--- Turn 1 ---\n  Hero braces! (next damage halved)\n  Orc -> Hero (7 dmg)\n\n--- Turn 2 ---\n  Hero -> Orc (19 dmg)\n  Orc -> Hero (15 dmg)\n\n--- Turn 3 ---\n  Hero healed! HP: 73/80\n  Orc -> Hero (15 dmg)\n\n--- Turn 4 ---\n  Hero -> Orc (19 dmg)\n  Orc -> Hero (15 dmg)\n\n=== Result ===\n  [O] Hero: HP 43/80\n  [O] Orc: HP 12/50`,
          hint: "Set defending to True, add heal to the list, call the heal method!",
          hint2: "defending / heal / heal"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "Quiz: Turn-Based Battle!",
          content: "What happens when you take damage after using defend()?\n\n```python\ndef take_damage(s, damage):\n    actual = damage - s.defense\n    if s.defending:\n        actual = actual // 2\n```",
          options: [
            "0 damage",
            "No change in damage",
            "Damage is cut in half",
            "Error occurs"
          ],
          answer: 2,
          explanation: "If defending is True, actual // 2 cuts damage in half! The power of defense!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Level Up System",
      emoji: "🏆",
      steps: [
        {
          id: "ch4-0",
          type: "tryit",
          title: "Step 4: Level Up!",
          task: "Run the system where you gain experience and level up!",
          initialCode: `class Hero:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.level = 1
        s.exp = 0
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} dmg)')
        if not target.alive:
            print(f'  {target.name} defeated!')

    def gain_exp(s, amount):
        s.exp = s.exp + amount
        print(f'  +{amount} EXP (total {s.exp})')
        if s.exp >= 100:
            s.level_up()

    def level_up(s):
        s.level = s.level + 1
        s.exp = s.exp - 100
        s.max_hp = s.max_hp + 20
        s.hp = s.max_hp
        s.atk = s.atk + 5
        s.defense = s.defense + 2
        print(f'  ★ LEVEL UP! Lv.{s.level}!')
        print(f'  HP {s.max_hp} ATK {s.atk} DEF {s.defense}')

    def status(s):
        print(f'  Lv.{s.level} {s.name}: HP {s.hp}/{s.max_hp} ATK {s.atk} DEF {s.defense} EXP {s.exp}/100')

class Monster:
    def __init__(s, name, hp, atk, defense, exp_reward):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp_reward
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} dmg)')

# Game Start!
hero = Hero('Hero', 100, 20, 5)
hero.status()

monsters = [
    Monster('Slime', 30, 10, 2, 40),
    Monster('Goblin', 50, 15, 4, 60),
    Monster('Orc', 70, 20, 6, 80),
]

for monster in monsters:
    if not hero.alive:
        break

    print(f'\\n=== {monster.name} appears! ===')

    while hero.alive and monster.alive:
        hero.attack(monster)
        if monster.alive:
            monster.attack(hero)

    if hero.alive:
        hero.gain_exp(monster.exp_reward)
        hero.status()

print('\\n=== Final Result ===')
hero.status()`,
          expectedOutput: `  Lv.1 Hero: HP 100/100 ATK 20 DEF 5 EXP 0/100\n\n=== Slime appears! ===\n  Hero -> Slime (18 dmg)\n  Slime -> Hero (5 dmg)\n  Hero -> Slime (18 dmg)\n  Slime defeated!\n  +40 EXP (total 40)\n  Lv.1 Hero: HP 90/100 ATK 20 DEF 5 EXP 40/100\n\n=== Goblin appears! ===\n  Hero -> Goblin (16 dmg)\n  Goblin -> Hero (10 dmg)\n  Hero -> Goblin (16 dmg)\n  Goblin -> Hero (10 dmg)\n  Hero -> Goblin (16 dmg)\n  Goblin -> Hero (10 dmg)\n  Hero -> Goblin (16 dmg)\n  Goblin defeated!\n  +60 EXP (total 100)\n  ★ LEVEL UP! Lv.2!\n  HP 120 ATK 25 DEF 7\n  Lv.2 Hero: HP 120/120 ATK 25 DEF 7 EXP 0/100\n\n=== Orc appears! ===\n  Hero -> Orc (19 dmg)\n  Orc -> Hero (13 dmg)\n  Hero -> Orc (19 dmg)\n  Orc -> Hero (13 dmg)\n  Hero -> Orc (19 dmg)\n  Orc -> Hero (13 dmg)\n  Hero -> Orc (19 dmg)\n  Orc defeated!\n  +80 EXP (total 80)\n  Lv.2 Hero: HP 81/120 ATK 25 DEF 7 EXP 80/100\n\n=== Final Result ===\n  Lv.2 Hero: HP 81/120 ATK 25 DEF 7 EXP 80/100`,
          hint: "When you level up, stats increase and HP fully recovers!",
          hint2: "If exp >= 100, level up! On level up: max_hp+20, atk+5, def+2!"
        },
        {
          id: "ch4-1",
          type: "mission",
          title: "Mission: Add a Skill System!",
          task: "Complete the special_attack method for the Hero class! Fill in 3 blanks!",
          initialCode: `class Hero:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.mp = 50
        s.alive = True

    def take_damage(s, damage):
        s.hp = s.hp - damage
        if s.hp <= 0:
            s.hp = 0
            s.alive = False

    def attack(s, target):
        target.take_damage(s.atk)
        print(f'{s.name} attacks! (-{s.atk}) {target.name} HP: {target.hp}')

    def special_attack(s, target, mp_cost):
        if s.mp < ___:
            print('Not enough MP!')
            return
        s.___ = s.mp - mp_cost
        damage = s.atk * 2
        target.take_damage(___)
        print(f'{s.name} special attack! (-{damage}) {target.name} HP: {target.hp}')
        print(f'MP remaining: {s.mp}')

class Monster:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp
        s.alive = True

    def take_damage(s, damage):
        s.hp = s.hp - damage
        if s.hp <= 0:
            s.hp = 0
            s.alive = False

hero = Hero('Hero', 100, 20)
boss = Monster('Boss', 120)

hero.attack(boss)
hero.special_attack(boss, 20)
hero.special_attack(boss, 20)
hero.special_attack(boss, 20)`,
          expectedOutput: `Hero attacks! (-20) Boss HP: 100\nHero special attack! (-40) Boss HP: 60\nMP remaining: 30\nHero special attack! (-40) Boss HP: 20\nMP remaining: 10\nNot enough MP!`,
          hint: "Check if MP is enough, consume MP, then deal 2x damage!",
          hint2: "mp_cost / mp / damage"
        }
      ]
    }
  ]
}
