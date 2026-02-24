import { LessonData } from './types'

export const lesson50EnData: LessonData = {
  id: "50en",
  title: "Text RPG: Core Systems",
  emoji: "⚔️",
  description: "Implement characters, monsters, and items!",
  chapters: [
    {
      id: "ch1",
      title: "Character Class",
      emoji: "🦸",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "How do we set different stats per job?",
          content: `Warriors are tough, mages have high attack... How do we **set different values based on job**?

| Job | HP | ATK | DEF | Trait |
|-----|----|-----|-----|-------|
| **Warrior** | 120 | 15 | 12 | Best HP & defense! |
| **Mage** | 80 | 25 | 5 | Highest attack! |
| **Archer** | 100 | 20 | 8 | Balanced stats! |

\`\`\`python
if job == 'warrior':
    s.hp, s.atk, s.defense = 120, 15, 12
elif job == 'mage':
    s.hp, s.atk, s.defense = 80, 25, 5
elif job == 'archer':
    s.hp, s.atk, s.defense = 100, 20, 8
\`\`\`

@Key point: Use **if/elif** to branch by job and set different stats!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "Full Character class!",
          task: "Run the Character class with job-based stats and combat methods!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.inventory = []
        s.alive = True

        # Stats per job!
        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk = 15
            s.defense = 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk = 25
            s.defense = 5
        elif job == 'archer':
            s.hp, s.max_hp = 100, 100
            s.atk = 20
            s.defense = 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} damage)')
        return actual

    def heal(s, amount):
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'  {s.name} healed! HP: {s.hp}/{s.max_hp}')

    def status(s):
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
        print(f'[{jobs[s.job]}] {s.name} Lv.{s.level}')
        print(f'  HP: {s.hp}/{s.max_hp} | ATK: {s.atk} | DEF: {s.defense}')
        print(f'  EXP: {s.exp} | Gold: {s.gold}')

# Compare 3 jobs!
print('=== Job Stats ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('Test', job)
    hero.status()
    print()`,
          expectedOutput: `=== Job Stats ===\n[Warrior] Test Lv.1\n  HP: 120/120 | ATK: 15 | DEF: 12\n  EXP: 0 | Gold: 0\n\n[Mage] Test Lv.1\n  HP: 80/80 | ATK: 25 | DEF: 5\n  EXP: 0 | Gold: 0\n\n[Archer] Test Lv.1\n  HP: 100/100 | ATK: 20 | DEF: 8\n  EXP: 0 | Gold: 0\n`,
          hint: "Use if/elif to set different stats per job!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "Level-up system!",
          task: "Run the system where you collect EXP and level up!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.alive = True

        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk, s.defense = 15, 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk, s.defense = 25, 5
        else:
            s.hp, s.max_hp = 100, 100
            s.atk, s.defense = 20, 8

    def gain_exp(s, amount):
        s.exp += amount
        print(f'  +{amount} EXP (total {s.exp})')
        # Level up every 100 EXP!
        while s.exp >= 100:
            s.exp -= 100
            s.level_up()

    def level_up(s):
        s.level += 1
        # Level-up bonus!
        s.max_hp += 10
        s.hp = s.max_hp  # Full recovery!
        s.atk += 3
        s.defense += 2
        print(f'  * Level up! Lv.{s.level}!')
        print(f'    HP: {s.max_hp} | ATK: {s.atk} | DEF: {s.defense}')

    def gain_gold(s, amount):
        s.gold += amount
        print(f'  +{amount} gold (total {s.gold})')

# Test!
hero = Character('Warrior', 'warrior')
print(f'=== {hero.name} Lv.{hero.level} ===')
print(f'HP: {hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')

print('\\n--- Slime defeated! ---')
hero.gain_exp(50)
hero.gain_gold(30)

print('\\n--- Goblin defeated! ---')
hero.gain_exp(70)
hero.gain_gold(50)

print(f'\\n=== Current Status ===')
print(f'Lv.{hero.level} | HP: {hero.hp}/{hero.max_hp}')
print(f'ATK: {hero.atk} | DEF: {hero.defense}')
print(f'EXP: {hero.exp} | Gold: {hero.gold}')`,
          expectedOutput: `=== Warrior Lv.1 ===\nHP: 120 | ATK: 15 | DEF: 12\n\n--- Slime defeated! ---\n  +50 EXP (total 50)\n  +30 gold (total 30)\n\n--- Goblin defeated! ---\n  +70 EXP (total 120)\n  * Level up! Lv.2!\n    HP: 130 | ATK: 18 | DEF: 14\n  +50 gold (total 80)\n\n=== Current Status ===\nLv.2 | HP: 130/130\nATK: 18 | DEF: 14\nEXP: 20 | Gold: 80`,
          hint: "Level up every 100 EXP! Use while for consecutive level-ups!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch1-3",
          type: "mission",
          title: "Mission: Complete the Character!",
          task: "Fill in 3 blanks to complete the Character class!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.exp = 0

        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk, s.defense = 15, 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk, s.defense = 25, 5

    def gain_exp(s, amount):
        s.___ += amount
        if s.exp >= 100:
            s.exp -= 100
            s.level_up()

    def level_up(s):
        s.___ += 1
        s.max_hp += 10
        s.hp = s.max_hp
        s.atk += 3
        print(f'Level up! Lv.{s.level}')
        print(f'  HP: {s.max_hp}, ATK: {s.atk}')

hero = Character('Alice', 'warrior')
print(f'Lv.{hero.level} | HP: {hero.hp} | ATK: {hero.atk}')

hero.gain_exp(100)

hero2 = Character('Bob', '___')
print(f'\\nMage HP: {hero2.hp}, ATK: {hero2.atk}')`,
          expectedOutput: `Lv.1 | HP: 120 | ATK: 15\nLevel up! Lv.2\n  HP: 130, ATK: 18\n\nMage HP: 80, ATK: 25`,
          hint: "Add to exp, increment level, mage job name!",
          hint2: "exp / level / mage"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Quiz!",
          content: "Which description is correct for the Mage job?",
          options: ["Highest HP, low attack", "Low HP, highest attack", "All stats balanced", "Highest defense"],
          answer: 1,
          explanation: "Mage has HP 80 (lowest) and ATK 25 (highest)! A glass cannon style!"
        },
        {
          id: "ch1-5",
          type: "tryit",
          title: "3-job battle comparison!",
          task: "See how each job performs against the same monster!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk, s.defense = 15, 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk, s.defense = 25, 5
        else:
            s.hp, s.max_hp = 100, 100
            s.atk, s.defense = 20, 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        return actual

# Monster attack power 15
monster_atk = 15

print('=== Monster (ATK 15) single attack comparison ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('Test', job)
    dmg = hero.take_damage(monster_atk)
    jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
    print(f'{jobs[job]}: {dmg} damage -> HP {hero.hp}/{hero.max_hp}')

print('\\n=== Damage each job deals to monster (DEF 5) ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('Test', job)
    dmg = hero.atk - 5  # Monster defense 5
    jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
    print(f'{jobs[job]}: ATK {hero.atk} - DEF 5 = {dmg} damage')`,
          expectedOutput: `=== Monster (ATK 15) single attack comparison ===\nWarrior: 3 damage -> HP 117/120\nMage: 10 damage -> HP 70/80\nArcher: 7 damage -> HP 93/100\n\n=== Damage each job deals to monster (DEF 5) ===\nWarrior: ATK 15 - DEF 5 = 10 damage\nMage: ATK 25 - DEF 5 = 20 damage\nArcher: ATK 20 - DEF 5 = 15 damage`,
          hint: "Higher defense means less damage taken!",
          hint2: "Run the code as-is!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Monster + Battle",
      emoji: "👹",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "How do we easily create different monster types?",
          content: `Slime, Goblin, Dragon... Can we make it so just entering a name **auto-sets all the stats**?

| Monster | HP | ATK | DEF | EXP | Gold |
|---------|----|-----|-----|-----|------|
| **Slime** | 30 | 8 | 2 | 30 | 20 |
| **Goblin** | 50 | 15 | 5 | 60 | 40 |
| **Dragon** | 100 | 25 | 10 | 150 | 100 |

\`\`\`python
def create_monster(name):
    monsters = {
        'slime':  Monster('Slime', 30, 8, 2, 30, 20),
        'goblin': Monster('Goblin', 50, 15, 5, 60, 40),
        'dragon': Monster('Dragon', 100, 25, 10, 150, 100),
    }
    return monsters[name]
\`\`\`

@Key point: Store monster data in a **dictionary** and retrieve by name -- that's the factory pattern!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "Monster class!",
          task: "Run the Monster class and factory function!",
          initialCode: `class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def show(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: HP {s.hp}/{s.max_hp}')

def create_monster(name):
    data = {
        'slime':  ('Slime', 30, 8, 2, 30, 20),
        'goblin': ('Goblin', 50, 15, 5, 60, 40),
        'dragon': ('Dragon', 100, 25, 10, 150, 100),
    }
    d = data[name]
    return Monster(d[0], d[1], d[2], d[3], d[4], d[5])

# Create monsters!
print('=== Monster Index ===')
for key in ['slime', 'goblin', 'dragon']:
    m = create_monster(key)
    m.show()
    print(f'  Reward: EXP {m.exp_reward}, Gold {m.gold_reward}')`,
          expectedOutput: `=== Monster Index ===\n[O] Slime: HP 30/30\n  Reward: EXP 30, Gold 20\n[O] Goblin: HP 50/50\n  Reward: EXP 60, Gold 40\n[O] Dragon: HP 100/100\n  Reward: EXP 150, Gold 100`,
          hint: "Use a dictionary to manage monster data!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "How does a battle play out?",
          content: `Player attacks, monster attacks... How do we implement this **turn-based battle** in code?

\`\`\`
[Battle Start]
  |
  +-> Player Turn
  |    +-> attack
  |    +-> heal
  |    +-> run
  |
  +-> Monster Turn
  |    +-> auto-attack
  |
  +-> Victory? -> Rewards!
  +-> Defeat? -> Game Over
\`\`\`

\`\`\`python
actual = attacker.atk - target.defense
if actual < 1:
    actual = 1  # Minimum 1 damage!
\`\`\`

@Key point: Damage = **attack - defense**, minimum 1! Alternating attacks in a turn-based structure!`
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "Auto-battle!",
          task: "Run an auto-battle using the actions list!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.alive = True
        s.exp = 0
        s.gold = 0
        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk, s.defense = 15, 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk, s.defense = 25, 5
        else:
            s.hp, s.max_hp = 100, 100
            s.atk, s.defense = 20, 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack_target(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} damage)')

    def heal_self(s, amount):
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'  {s.name} healed! HP: {s.hp}/{s.max_hp}')

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack_target(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} damage)')

# Battle!
hero = Character('Warrior', 'warrior')
goblin = Monster('Goblin', 50, 15, 5, 60, 40)

actions = ['attack', 'attack', 'heal', 'attack', 'attack', 'attack']

print('=== Battle Start! ===')
print(f'{hero.name}: HP {hero.hp}/{hero.max_hp}')
print(f'{goblin.name}: HP {goblin.hp}/50')

turn = 1
for action in actions:
    if not hero.alive or not goblin.alive:
        break

    print(f'\\n--- Turn {turn} ---')

    if action == 'attack':
        hero.attack_target(goblin)
    elif action == 'heal':
        hero.heal_self(30)

    if goblin.alive:
        goblin.attack_target(hero)

    print(f'  [{hero.name} HP:{hero.hp}] [{goblin.name} HP:{goblin.hp}]')
    turn += 1

print('\\n=== Battle Over! ===')
if not goblin.alive:
    hero.exp += goblin.exp_reward
    hero.gold += goblin.gold_reward
    print(f'{goblin.name} defeated!')
    print(f'+{goblin.exp_reward} EXP, +{goblin.gold_reward} gold')
    print(f'{hero.name}: EXP {hero.exp}, Gold {hero.gold}')
elif not hero.alive:
    print('Defeat...')`,
          expectedOutput: `=== Battle Start! ===\nWarrior: HP 120/120\nGoblin: HP 50/50\n\n--- Turn 1 ---\n  Warrior -> Goblin (10 damage)\n  Goblin -> Warrior (3 damage)\n  [Warrior HP:117] [Goblin HP:40]\n\n--- Turn 2 ---\n  Warrior -> Goblin (10 damage)\n  Goblin -> Warrior (3 damage)\n  [Warrior HP:114] [Goblin HP:30]\n\n--- Turn 3 ---\n  Warrior healed! HP: 120/120\n  Goblin -> Warrior (3 damage)\n  [Warrior HP:117] [Goblin HP:30]\n\n--- Turn 4 ---\n  Warrior -> Goblin (10 damage)\n  Goblin -> Warrior (3 damage)\n  [Warrior HP:114] [Goblin HP:20]\n\n--- Turn 5 ---\n  Warrior -> Goblin (10 damage)\n  Goblin -> Warrior (3 damage)\n  [Warrior HP:111] [Goblin HP:10]\n\n--- Turn 6 ---\n  Warrior -> Goblin (10 damage)\n  [Warrior HP:111] [Goblin HP:0]\n\n=== Battle Over! ===\nGoblin defeated!\n+60 EXP, +40 gold\nWarrior: EXP 60, Gold 40`,
          hint: "The actions list determines the action each turn!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch2-4",
          type: "mission",
          title: "Mission: Battle function!",
          task: "Fill in 3 blanks to complete the battle function!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

def battle(hero, monster, actions):
    print(f'{monster.name} appears!')
    for action in actions:
        if not hero.alive or not monster.___:
            break
        if action == 'attack':
            dmg = monster.take_damage(hero.___)
            print(f'  {hero.name} -> {monster.name} ({dmg})')
        if monster.alive:
            dmg = hero.___(monster.atk)
            print(f'  {monster.name} -> {hero.name} ({dmg})')

hero = Character('Bob', 100, 20, 8)
slime = Monster('Slime', 30, 8, 2, 30, 20)

battle(hero, slime, ['attack', 'attack', 'attack'])
print(f'\\nResult: {hero.name} HP {hero.hp}')`,
          expectedOutput: `Slime appears!\n  Bob -> Slime (18)\n  Slime -> Bob (1)\n  Bob -> Slime (18)\n\nResult: Bob HP 99`,
          hint: "Check alive, attack with atk, receive damage with take_damage!",
          hint2: "alive / atk / take_damage"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Quiz!",
          content: "When a Warrior (ATK 15) attacks a Goblin (DEF 5), how much damage?",
          options: ["5", "10", "15", "20"],
          answer: 1,
          explanation: "15 - 5 = 10 damage! Defense reduces the damage taken!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Item + Inventory",
      emoji: "🎒",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "How do we distinguish item types?",
          content: `Potions heal HP, power potions boost attack... Each item has a **different effect -- how do we tell them apart**?

| Type | Effect | Example |
|------|--------|---------|
| **heal** | HP recovery | Potion (+30 HP) |
| **atk** | Attack boost | Power Potion (+5 ATK) |
| **def** | Defense boost | Shield Potion (+5 DEF) |

\`\`\`python
class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name        # Potion
        s.item_type = item_type  # 'heal'
        s.value = value      # 30
        s.price = price      # 50
\`\`\`

@Key point: Use **item_type** to distinguish 'heal', 'atk', 'def' and apply different effects!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "Item class + usage!",
          task: "Create items and use them on a character!",
          initialCode: `class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type
        s.value = value
        s.price = price

    def show(s):
        types = {'heal': 'Heal', 'atk': 'Attack', 'def': 'Defense'}
        print(f'  {s.name} [{types[s.item_type]} +{s.value}] ({s.price} gold)')

class Character:
    def __init__(s, name):
        s.name = name
        s.hp, s.max_hp = 100, 100
        s.atk = 15
        s.defense = 10
        s.inventory = []

    def use_item(s, item):
        if item.item_type == 'heal':
            s.hp = min(s.hp + item.value, s.max_hp)
            print(f'{s.name}: Used {item.name}! HP {s.hp}/{s.max_hp}')
        elif item.item_type == 'atk':
            s.atk += item.value
            print(f'{s.name}: Used {item.name}! ATK {s.atk}')
        elif item.item_type == 'def':
            s.defense += item.value
            print(f'{s.name}: Used {item.name}! DEF {s.defense}')

# Create items
potion = Item('Potion', 'heal', 30, 50)
power = Item('Power Potion', 'atk', 5, 80)
shield = Item('Shield Potion', 'def', 3, 60)

print('=== Item List ===')
potion.show()
power.show()
shield.show()

# Use them!
hero = Character('Alice')
hero.hp = 60  # Damaged state
print(f'\\n=== Before Using Items ===')
print(f'HP: {hero.hp}/{hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')

print(f'\\n=== Using Items! ===')
hero.use_item(potion)
hero.use_item(power)
hero.use_item(shield)

print(f'\\n=== Final Stats ===')
print(f'HP: {hero.hp}/{hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')`,
          expectedOutput: `=== Item List ===\n  Potion [Heal +30] (50 gold)\n  Power Potion [Attack +5] (80 gold)\n  Shield Potion [Defense +3] (60 gold)\n\n=== Before Using Items ===\nHP: 60/100 | ATK: 15 | DEF: 10\n\n=== Using Items! ===\nAlice: Used Potion! HP 90/100\nAlice: Used Power Potion! ATK 20\nAlice: Used Shield Potion! DEF 13\n\n=== Final Stats ===\nHP: 90/100 | ATK: 20 | DEF: 13`,
          hint: "Use if/elif on item_type to apply different effects!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "Inventory management!",
          task: "Add items to inventory, use them, and check the inventory!",
          initialCode: `class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type
        s.value = value
        s.price = price

class Character:
    def __init__(s, name):
        s.name = name
        s.hp, s.max_hp = 100, 100
        s.atk = 15
        s.defense = 10
        s.inventory = []

    def add_item(s, item):
        s.inventory.append(item)
        print(f'  + Got {item.name}!')

    def show_inventory(s):
        if len(s.inventory) == 0:
            print('  (empty)')
            return
        for i, item in enumerate(s.inventory):
            types = {'heal': 'Heal', 'atk': 'Attack', 'def': 'Defense'}
            print(f'  {i+1}. {item.name} [{types[item.item_type]} +{item.value}]')

    def use_item(s, index):
        if index < 0 or index >= len(s.inventory):
            print('  Invalid number!')
            return
        item = s.inventory.pop(index)  # Remove after use!
        if item.item_type == 'heal':
            s.hp = min(s.hp + item.value, s.max_hp)
            print(f'  Used {item.name}! HP {s.hp}/{s.max_hp}')
        elif item.item_type == 'atk':
            s.atk += item.value
            print(f'  Used {item.name}! ATK {s.atk}')

# Test!
hero = Character('Bob')
hero.hp = 50

print('=== Inventory ===')
hero.show_inventory()

print('\\n--- Items acquired! ---')
hero.add_item(Item('Potion', 'heal', 30, 50))
hero.add_item(Item('Potion', 'heal', 30, 50))
hero.add_item(Item('Power Potion', 'atk', 5, 80))

print('\\n=== Inventory ===')
hero.show_inventory()

print('\\n--- Using potion! ---')
hero.use_item(0)

print('\\n=== Inventory ===')
hero.show_inventory()
print(f'\\nHP: {hero.hp}/{hero.max_hp}')`,
          expectedOutput: `=== Inventory ===\n  (empty)\n\n--- Items acquired! ---\n  + Got Potion!\n  + Got Potion!\n  + Got Power Potion!\n\n=== Inventory ===\n  1. Potion [Heal +30]\n  2. Potion [Heal +30]\n  3. Power Potion [Attack +5]\n\n--- Using potion! ---\n  Used Potion! HP 80/100\n\n=== Inventory ===\n  1. Potion [Heal +30]\n  2. Power Potion [Attack +5]\n\nHP: 80/100`,
          hint: "Use append to add, pop to use and remove!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch3-3",
          type: "mission",
          title: "Mission: Complete the inventory!",
          task: "Fill in 3 blanks to complete the inventory system!",
          initialCode: `class Item:
    def __init__(s, name, item_type, value):
        s.name = name
        s.item_type = item_type
        s.value = value

class Character:
    def __init__(s, name):
        s.name = name
        s.hp, s.max_hp = 80, 100
        s.inventory = []

    def add_item(s, item):
        s.inventory.___(item)
        print(f'+ {item.name}')

    def use_item(s, index):
        item = s.inventory.___(index)
        if item.item_type == 'heal':
            s.hp = ___(s.hp + item.value, s.max_hp)
            print(f'{item.name} used! HP {s.hp}/{s.max_hp}')

hero = Character('Alice')
hero.add_item(Item('Potion', 'heal', 30))
hero.add_item(Item('Big Potion', 'heal', 50))

print(f'Items: {len(hero.inventory)}')
hero.use_item(0)
print(f'Items: {len(hero.inventory)}')`,
          expectedOutput: `+ Potion\n+ Big Potion\nItems: 2\nPotion used! HP 100/100\nItems: 1`,
          hint: "Add to list, remove from list, cap at max HP!",
          hint2: "append / pop / min"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Quiz!",
          content: "Which method removes an item from inventory and returns it?",
          options: ["inventory.remove(0)", "inventory.pop(index)", "inventory.delete(0)", "del inventory[0]"],
          answer: 1,
          explanation: "pop(index) retrieves and returns the item at that position! Use and remove in one step!"
        }
      ]
    }
  ]
}
