import { LessonData } from './types'

export const lesson52EnData: LessonData = {
  id: "52en",
  title: "Text RPG: Upgrade Challenges",
  emoji: "🏆",
  description: "Add critical hits, quests, skills, and more to upgrade your game!",
  chapters: [
    {
      id: "ch1",
      title: "Easy Challenges",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 What else can we add to the finished game?",
          content: `💭 The text RPG is complete... but what if we added features like **rest, critical hits, equipment, and skills**?

| Difficulty | Challenge |
|------------|-----------|
| ⭐ Easy | Rest feature, Critical hits, Equipment |
| ⭐⭐ Normal | Quests, Skills |
| ⭐⭐⭐ Hard | Achievements, Monster drops |

@Key point: Add challenges **one at a time** by difficulty to gradually improve the game!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "💻 ① Rest Feature!",
          task: "Run the rest feature that recovers HP between battles!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense

    def rest(s):
        # Recover 30% of max HP!
        heal_amount = int(s.max_hp * 0.3)
        s.hp = min(s.hp + heal_amount, s.max_hp)
        print(f'{s.name} rests! +{heal_amount} HP -> {s.hp}/{s.max_hp}')

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        return actual

# Test!
hero = Character('Hero', 120, 15, 10)

# Taking damage in battle
hero.take_damage(20)
hero.take_damage(25)
print(f'After battle: HP {hero.hp}/{hero.max_hp}')

# Rest!
print()
hero.rest()
hero.rest()
hero.rest()  # What if it exceeds max HP?

print(f'\\nFinal: HP {hero.hp}/{hero.max_hp}')`,
          expectedOutput: `After battle: HP 95/120\n\nHero rests! +36 HP -> 120/120\nHero rests! +36 HP -> 120/120\nHero rests! +36 HP -> 120/120\n\nFinal: HP 120/120`,
          hint: "Recover 30% of max_hp, limit with min!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-2",
          type: "mission",
          title: "🎯 Mission: Add Rest!",
          task: "Fill in 3 blanks to complete the rest feature!",
          initialCode: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp
        s.___ = hp

    def rest(s):
        heal = int(s.max_hp * 0.3)
        s.hp = ___(s.hp + heal, s.max_hp)
        print(f'Rest! HP: {s.hp}/{s.max_hp}')

hero = Character('Hero', 100)
hero.hp = 50
print(f'Current HP: {hero.hp}')
hero.___()
print(f'After recovery: {hero.hp}')`,
          expectedOutput: `Current HP: 50\nRest! HP: 80/100\nAfter recovery: 80`,
          hint: "Store max_hp, limit with min, call rest!",
          hint2: "max_hp / min / rest"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "💻 ② Critical Hit System!",
          task: "Run a critical hit system that deals 1.5x damage with 20% chance!",
          initialCode: `import random
random.seed(42)

class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.crit_rate = 0.2   # 20% chance
        s.crit_damage = 1.5  # 1.5x

    def attack_target(s, target):
        damage = s.atk

        # Critical hit check!
        is_crit = random.random() < s.crit_rate
        if is_crit:
            damage = int(damage * s.crit_damage)

        actual = damage - target.defense
        if actual < 1:
            actual = 1
        target.hp -= actual

        if is_crit:
            print(f'  ★ Critical! {s.name} -> {target.name} ({actual} damage!)')
        else:
            print(f'  {s.name} -> {target.name} ({actual} damage)')

class Monster:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense

# Test! (Fixed seed for consistent results)
hero = Character('Hero', 120, 20, 10)
goblin = Monster('Goblin', 100, 12, 5)

print('=== Critical Hit Test (5 attacks) ===')
for i in range(5):
    hero.attack_target(goblin)
    print(f'    Goblin HP: {goblin.hp}')`,
          expectedOutput: `=== Critical Hit Test (5 attacks) ===\n  Hero -> Goblin (15 damage)\n    Goblin HP: 85\n  ★ Critical! Hero -> Goblin (25 damage!)\n    Goblin HP: 60\n  Hero -> Goblin (15 damage)\n    Goblin HP: 45\n  Hero -> Goblin (15 damage)\n    Goblin HP: 30\n  ★ Critical! Hero -> Goblin (25 damage!)\n    Goblin HP: 5`,
          hint: "If random.random() < 0.2, it's a critical hit! 1.5x damage!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-4",
          type: "mission",
          title: "🎯 Mission: Add Critical Hits!",
          task: "Fill in 3 blanks to implement critical hits!",
          initialCode: `import random
random.seed(10)

class Fighter:
    def __init__(s, name, atk):
        s.name = name
        s.atk = atk
        s.crit_rate = 0.3  # 30%

    def attack(s):
        damage = s.atk
        is_crit = random.___() < s.crit_rate
        if ___:
            damage = int(damage * 2)
            print(f'★ Critical! {s.name}: {damage} damage!')
        else:
            print(f'{s.name}: {___} damage')

hero = Fighter('Hero', 10)
for i in range(4):
    hero.attack()`,
          expectedOutput: `Hero: 10 damage\n★ Critical! Hero: 20 damage!\nHero: 10 damage\n★ Critical! Hero: 20 damage!`,
          hint: "random.random() for probability, is_crit condition, damage output!",
          hint2: "random / is_crit / damage"
        },
        {
          id: "ch1-5",
          type: "tryit",
          title: "💻 ③ Equipment System!",
          task: "Run an equipment system where stats change when equipping weapons and armor!",
          initialCode: `class Equipment:
    def __init__(s, name, slot, atk_bonus, def_bonus):
        s.name = name
        s.slot = slot  # 'weapon' or 'armor'
        s.atk_bonus = atk_bonus
        s.def_bonus = def_bonus

class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp, s.max_hp = hp, hp
        s.base_atk = atk
        s.base_def = defense
        s.weapon = None
        s.armor = None

    def equip(s, equipment):
        if equipment.slot == 'weapon':
            if s.weapon:
                print(f'  Unequipped {s.weapon.name}')
            s.weapon = equipment
            print(f'  Equipped {equipment.name}!')
        elif equipment.slot == 'armor':
            if s.armor:
                print(f'  Unequipped {s.armor.name}')
            s.armor = equipment
            print(f'  Equipped {equipment.name}!')

    def get_atk(s):
        bonus = s.weapon.atk_bonus if s.weapon else 0
        return s.base_atk + bonus

    def get_def(s):
        bonus = s.armor.def_bonus if s.armor else 0
        return s.base_def + bonus

    def status(s):
        w = s.weapon.name if s.weapon else 'None'
        a = s.armor.name if s.armor else 'None'
        print(f'{s.name}: ATK {s.get_atk()} (base {s.base_atk}), DEF {s.get_def()} (base {s.base_def})')
        print(f'  Weapon: {w}, Armor: {a}')

# Equipment!
wooden_sword = Equipment('Wooden Sword', 'weapon', 3, 0)
iron_sword = Equipment('Iron Sword', 'weapon', 8, 0)
leather = Equipment('Leather Armor', 'armor', 0, 5)
iron_armor = Equipment('Iron Armor', 'armor', 0, 10)

# Test!
hero = Character('Hero', 120, 15, 10)
print('=== Before Equipment ===')
hero.status()

print('\\n--- Wooden Sword + Leather Armor ---')
hero.equip(wooden_sword)
hero.equip(leather)
hero.status()

print('\\n--- Upgrade to Iron Sword! ---')
hero.equip(iron_sword)
hero.status()`,
          expectedOutput: `=== Before Equipment ===\nHero: ATK 15 (base 15), DEF 10 (base 10)\n  Weapon: None, Armor: None\n\n--- Wooden Sword + Leather Armor ---\n  Equipped Wooden Sword!\n  Equipped Leather Armor!\nHero: ATK 18 (base 15), DEF 15 (base 10)\n  Weapon: Wooden Sword, Armor: Leather Armor\n\n--- Upgrade to Iron Sword! ---\n  Unequipped Wooden Sword\n  Equipped Iron Sword!\nHero: ATK 23 (base 15), DEF 15 (base 10)\n  Weapon: Iron Sword, Armor: Leather Armor`,
          hint: "base_atk + weapon.atk_bonus = actual attack power!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-6",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the probability that `random.random() < 0.2` is True?",
          options: ["2%", "20%", "80%", "Always True"],
          answer: 1,
          explanation: "random.random() returns a float between 0 and 1! The probability of it being less than 0.2 = 20%! Perfect for critical hit chance."
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Why do we separate `base_atk` and `get_atk()` in the equipment system?",
          options: [
            "It's a Python rule",
            "To keep base stats unchanged when swapping equipment",
            "To save memory",
            "To make the code longer"
          ],
          answer: 1,
          explanation: "Base attack (base_atk) stays fixed! Equipment bonuses are calculated automatically on equip/unequip! Separating them keeps things clean."
        }
      ]
    },
    {
      id: "ch2",
      title: "Normal Challenges",
      emoji: "⭐⭐",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "💭 How do we implement quests and skills?",
          content: `💭 Quests like "Defeat 3 Slimes!", skills like "Fireball!"... how do we **build these in code**?

| # | Feature | Concepts Used |
|---|---------|---------------|
| ④ | Quest System | Dictionary + conditionals |
| ⑤ | Skill System | Class + methods |

@Key point: **Dictionary** for data management + **class methods** for functionality = normal difficulty challenges!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "💻 ④ Quest System!",
          task: "Run a quest management system using dictionaries!",
          initialCode: `class Quest:
    def __init__(s, name, description, target, reward_gold, reward_exp):
        s.name = name
        s.description = description
        s.target = target    # Goal number
        s.progress = 0       # Current progress
        s.completed = False
        s.reward_gold = reward_gold
        s.reward_exp = reward_exp

    def update(s, amount):
        if s.completed:
            return
        s.progress += amount
        print(f'  [{s.name}] Progress: {s.progress}/{s.target}')
        if s.progress >= s.target:
            s.completed = True
            print(f'  ★ Quest complete! Reward: {s.reward_gold} gold, {s.reward_exp} EXP')

    def show(s):
        status = 'Done' if s.completed else f'{s.progress}/{s.target}'
        print(f'  [{status}] {s.name}: {s.description}')

# Quest list!
quests = {
    'kill_slime': Quest('Slime Hunt', 'Defeat 3 slimes', 3, 50, 30),
    'collect_gold': Quest('Gold Collector', 'Collect 100 gold', 100, 0, 50),
}

print('=== Quest List ===')
for q in quests.values():
    q.show()

# Defeat slimes!
print('\\n--- Slime defeated! ---')
quests['kill_slime'].update(1)
quests['kill_slime'].update(1)
quests['kill_slime'].update(1)

# Gold earned!
print('\\n--- Gold earned! ---')
quests['collect_gold'].update(50)
quests['collect_gold'].update(30)
quests['collect_gold'].update(30)

print('\\n=== Quest Status ===')
for q in quests.values():
    q.show()`,
          expectedOutput: `=== Quest List ===\n  [0/3] Slime Hunt: Defeat 3 slimes\n  [0/100] Gold Collector: Collect 100 gold\n\n--- Slime defeated! ---\n  [Slime Hunt] Progress: 1/3\n  [Slime Hunt] Progress: 2/3\n  [Slime Hunt] Progress: 3/3\n  ★ Quest complete! Reward: 50 gold, 30 EXP\n\n--- Gold earned! ---\n  [Gold Collector] Progress: 50/100\n  [Gold Collector] Progress: 80/100\n  [Gold Collector] Progress: 110/100\n  ★ Quest complete! Reward: 0 gold, 50 EXP\n\n=== Quest Status ===\n  [Done] Slime Hunt: Defeat 3 slimes\n  [Done] Gold Collector: Collect 100 gold`,
          hint: "If progress is at or above target, it's complete!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-2",
          type: "mission",
          title: "🎯 Mission: Complete the Quest!",
          task: "Fill in 3 blanks to complete the quest system!",
          initialCode: `class Quest:
    def __init__(s, name, target):
        s.name = name
        s.target = target
        s.progress = 0
        s.___ = False

    def update(s, amount):
        s.progress += amount
        if s.progress >= s.___:
            s.completed = True
            print(f'{s.name} complete!')
        else:
            print(f'{s.name}: {s.progress}/{s.target}')

q = Quest('Monster Hunt', 3)
q.update(1)
q._____(1)
q.update(1)`,
          expectedOutput: `Monster Hunt: 1/3\nMonster Hunt: 2/3\nMonster Hunt complete!`,
          hint: "Completion state, compare to goal, call update!",
          hint2: "completed / target / update"
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "💻 ⑤ Skill System!",
          task: "Use special skills for each job class!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.mp = 50
        s.max_mp = 50

        if job == 'warrior':
            s.hp, s.max_hp, s.atk, s.defense = 120, 120, 15, 12
            s.skills = {
                'power_strike': {'name': 'Power Strike', 'mp': 15, 'multiplier': 2.0},
                'war_cry': {'name': 'War Cry', 'mp': 10, 'atk_buff': 5},
            }
        elif job == 'mage':
            s.hp, s.max_hp, s.atk, s.defense = 80, 80, 25, 5
            s.skills = {
                'fireball': {'name': 'Fireball', 'mp': 20, 'multiplier': 2.5},
                'heal_spell': {'name': 'Heal', 'mp': 15, 'heal': 40},
            }
        else:
            s.hp, s.max_hp, s.atk, s.defense = 100, 100, 20, 8
            s.skills = {
                'rapid_shot': {'name': 'Rapid Shot', 'mp': 15, 'hits': 3},
                'dodge': {'name': 'Dodge', 'mp': 10, 'def_buff': 8},
            }

    def use_skill(s, skill_key, target=None):
        if skill_key not in s.skills:
            print('  No such skill!')
            return
        skill = s.skills[skill_key]
        if s.mp < skill['mp']:
            print(f'  Not enough MP! ({s.mp}/{skill["mp"]})')
            return

        s.mp -= skill['mp']
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}

        if 'multiplier' in skill:
            damage = int(s.atk * skill['multiplier'])
            print(f'  ★ {skill["name"]}! {damage} damage! (MP: {s.mp})')
        elif 'heal' in skill:
            s.hp = min(s.hp + skill['heal'], s.max_hp)
            print(f'  ★ {skill["name"]}! HP {s.hp}/{s.max_hp} (MP: {s.mp})')
        elif 'hits' in skill:
            total = 0
            for i in range(skill['hits']):
                dmg = int(s.atk * 0.6)
                total += dmg
            print(f'  ★ {skill["name"]}! {skill["hits"]} hits = {total} damage! (MP: {s.mp})')
        elif 'atk_buff' in skill:
            s.atk += skill['atk_buff']
            print(f'  ★ {skill["name"]}! ATK +{skill["atk_buff"]} -> {s.atk} (MP: {s.mp})')
        elif 'def_buff' in skill:
            s.defense += skill['def_buff']
            print(f'  ★ {skill["name"]}! DEF +{skill["def_buff"]} -> {s.defense} (MP: {s.mp})')

    def show_skills(s):
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
        print(f'[{jobs[s.job]}] {s.name}\\'s skills (MP: {s.mp}/{s.max_mp})')
        for key, skill in s.skills.items():
            print(f'  - {skill["name"]} (MP: {skill["mp"]})')

# Test!
print('=== Warrior Skills ===')
warrior = Character('Tom', 'warrior')
warrior.show_skills()
warrior.use_skill('power_strike')
warrior.use_skill('war_cry')

print('\\n=== Mage Skills ===')
mage = Character('Lily', 'mage')
mage.hp = 50
mage.show_skills()
mage.use_skill('fireball')
mage.use_skill('heal_spell')

print('\\n=== Archer Skills ===')
archer = Character('Sam', 'archer')
archer.show_skills()
archer.use_skill('rapid_shot')
archer.use_skill('dodge')`,
          expectedOutput: `=== Warrior Skills ===\n[Warrior] Tom's skills (MP: 50/50)\n  - Power Strike (MP: 15)\n  - War Cry (MP: 10)\n  ★ Power Strike! 30 damage! (MP: 35)\n  ★ War Cry! ATK +5 -> 20 (MP: 25)\n\n=== Mage Skills ===\n[Mage] Lily's skills (MP: 50/50)\n  - Fireball (MP: 20)\n  - Heal (MP: 15)\n  ★ Fireball! 62 damage! (MP: 30)\n  ★ Heal! HP 80/80 (MP: 15)\n\n=== Archer Skills ===\n[Archer] Sam's skills (MP: 50/50)\n  - Rapid Shot (MP: 15)\n  - Dodge (MP: 10)\n  ★ Rapid Shot! 3 hits = 36 damage! (MP: 35)\n  ★ Dodge! DEF +8 -> 16 (MP: 25)`,
          hint: "Manage skill data with dictionaries, consume MP!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-4",
          type: "mission",
          title: "🎯 Mission: Add Skills!",
          task: "Fill in 3 blanks to complete the skill system!",
          initialCode: `class Mage:
    def __init__(s, name):
        s.name = name
        s.hp, s.max_hp = 80, 80
        s.atk = 25
        s.mp = 50

    def fireball(s):
        cost = 20
        if s.___ < cost:
            print('Not enough MP!')
            return
        s.mp -= cost
        damage = int(s.atk * ___)
        print(f'Fireball! {damage} damage (MP: {s.mp})')

    def heal(s):
        cost = 15
        if s.mp < cost:
            print('Not enough MP!')
            return
        s.mp -= cost
        s.hp = min(s.hp + 40, s.___)
        print(f'Heal! HP: {s.hp}/{s.max_hp} (MP: {s.mp})')

m = Mage('Lily')
m.hp = 50
m.fireball()
m.heal()`,
          expectedOutput: `Fireball! 62 damage (MP: 30)\nHeal! HP: 80/80 (MP: 15)`,
          hint: "Check MP, 2.5x damage, limit to max_hp!",
          hint2: "mp / 2.5 / max_hp"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Why does the quest system check `s.progress >= s.target`?",
          options: [
            "Complete only when progress exactly equals the goal",
            "To mark as complete when progress reaches or exceeds the goal",
            "To delete the quest",
            "To reduce the reward"
          ],
          answer: 1,
          explanation: "You might achieve multiple at once, so check with >=! Example: goal is 3 but you achieve 5 at once -- still complete!"
        },
        {
          id: "ch2-6",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the advantage of managing skill data with dictionaries?",
          options: [
            "The code gets longer, which is better",
            "Adding new skills only requires adding data",
            "Dictionaries are faster than lists",
            "It's a Python rule"
          ],
          answer: 1,
          explanation: "By separating skill data into dictionaries, you can add new skills by just adding data without modifying code!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Hard Challenges",
      emoji: "⭐⭐⭐",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "💭 How do we create achievements and drops?",
          content: `💭 "Defeat 5 monsters!" achievements, items dropping with probability... can we make these with **lambda and random**?

| # | Feature | Difficulty |
|---|---------|------------|
| ⑥ | Achievement System | ⭐⭐⭐ |
| ⑦ | Monster Drops | ⭐⭐⭐ |

@Key point: **lambda for condition checks** (achievements) + **random for probability** (drops) = advanced features complete!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "💻 ⑥ Achievement System!",
          task: "Run an achievement system that unlocks when conditions are met!",
          initialCode: `class Achievement:
    def __init__(s, name, description, condition_fn):
        s.name = name
        s.description = description
        s.condition_fn = condition_fn  # Function!
        s.unlocked = False

    def check(s, player_data):
        if s.unlocked:
            return
        if s.condition_fn(player_data):
            s.unlocked = True
            print(f'  ★ Achievement unlocked: {s.name}!')
            print(f'    {s.description}')

# Achievement list!
achievements = [
    Achievement('First Battle', 'Win your first battle!',
                lambda d: d['kills'] >= 1),
    Achievement('Slayer', 'Defeat 5 monsters!',
                lambda d: d['kills'] >= 5),
    Achievement('Rich', 'Reach 200 gold!',
                lambda d: d['gold'] >= 200),
    Achievement('Expert', 'Reach level 3!',
                lambda d: d['level'] >= 3),
]

def check_all(player_data):
    for ach in achievements:
        ach.check(player_data)

def show_achievements():
    print('=== Achievements ===')
    for ach in achievements:
        status = '★' if ach.unlocked else '  '
        print(f'  [{status}] {ach.name}: {ach.description}')

# Game progression simulation!
player = {'kills': 0, 'gold': 0, 'level': 1}

show_achievements()

print('\\n--- Battle! ---')
player['kills'] += 1
player['gold'] += 40
check_all(player)

print('\\n--- 4 more battles! ---')
player['kills'] += 4
player['gold'] += 180
check_all(player)

print('\\n--- Level up! ---')
player['level'] = 3
check_all(player)

print()
show_achievements()`,
          expectedOutput: `=== Achievements ===\n  [  ] First Battle: Win your first battle!\n  [  ] Slayer: Defeat 5 monsters!\n  [  ] Rich: Reach 200 gold!\n  [  ] Expert: Reach level 3!\n\n--- Battle! ---\n  ★ Achievement unlocked: First Battle!\n    Win your first battle!\n\n--- 4 more battles! ---\n  ★ Achievement unlocked: Slayer!\n    Defeat 5 monsters!\n  ★ Achievement unlocked: Rich!\n    Reach 200 gold!\n\n--- Level up! ---\n  ★ Achievement unlocked: Expert!\n    Reach level 3!\n\n=== Achievements ===\n  [★] First Battle: Win your first battle!\n  [★] Slayer: Defeat 5 monsters!\n  [★] Rich: Reach 200 gold!\n  [★] Expert: Reach level 3!`,
          hint: "lambda for condition functions, condition_fn(data) to check!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "💻 ⑦ Monster Drops!",
          task: "Run a system where monsters drop items with probability when defeated!",
          initialCode: `import random
random.seed(42)

class Item:
    def __init__(s, name, item_type, value):
        s.name = name
        s.item_type = item_type
        s.value = value

class Monster:
    def __init__(s, name, hp, drops):
        s.name = name
        s.hp = hp
        # drops = [(item, chance), ...]
        s.drops = drops

    def get_drops(s):
        result = []
        for item, chance in s.drops:
            if random.random() < chance:
                result.append(item)
        return result

# Drop tables!
slime_drops = [
    (Item('Sticky Jelly', 'heal', 10), 0.5),  # 50%
    (Item('Slime Core', 'atk', 2), 0.2),       # 20%
]

goblin_drops = [
    (Item('Potion', 'heal', 30), 0.6),          # 60%
    (Item('Rusty Sword', 'atk', 5), 0.3),       # 30%
    (Item('Goblin Crown', 'def', 8), 0.1),      # 10%
]

# Battle simulation!
print('=== Defeated 5 Slimes! ===')
for i in range(5):
    slime = Monster('Slime', 30, slime_drops)
    drops = slime.get_drops()
    if drops:
        for item in drops:
            types = {'heal': 'Heal', 'atk': 'ATK', 'def': 'DEF'}
            print(f'  #{i+1}: {item.name} [{types[item.item_type]} +{item.value}] dropped!')
    else:
        print(f'  #{i+1}: (No drop)')

print('\\n=== Defeated 5 Goblins! ===')
for i in range(5):
    goblin = Monster('Goblin', 50, goblin_drops)
    drops = goblin.get_drops()
    if drops:
        for item in drops:
            types = {'heal': 'Heal', 'atk': 'ATK', 'def': 'DEF'}
            print(f'  #{i+1}: {item.name} [{types[item.item_type]} +{item.value}] dropped!')
    else:
        print(f'  #{i+1}: (No drop)')`,
          expectedOutput: `=== Defeated 5 Slimes! ===\n  #1: (No drop)\n  #2: Sticky Jelly [Heal +10] dropped!\n  #3: (No drop)\n  #4: Sticky Jelly [Heal +10] dropped!\n  #5: Sticky Jelly [Heal +10] dropped!\n\n=== Defeated 5 Goblins! ===\n  #1: Potion [Heal +30] dropped!\n  #2: Potion [Heal +30] dropped!\n  #3: Potion [Heal +30] dropped!\nRusty Sword [ATK +5] dropped!\n  #4: Potion [Heal +30] dropped!\nRusty Sword [ATK +5] dropped!\n  #5: (No drop)`,
          hint: "random.random() < chance for drop check!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What does `lambda d: d['kills'] >= 5` mean?",
          options: [
            "A function that sets kills to 5",
            "A function that checks if kills is 5 or more",
            "A function that subtracts 5 from kills",
            "A function that repeats kills 5 times"
          ],
          answer: 1,
          explanation: "lambda is a simple function! It takes a dictionary d and returns True/False for whether d['kills'] >= 5!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "❓ Quiz!",
          content: "In monster drops, what percentage is a probability of 0.1?",
          options: ["1%", "10%", "0.1%", "100%"],
          answer: 1,
          explanation: "0.1 = 10%! The probability of random.random() being less than 0.1 is 10%, so it drops about 1 out of 10 times!"
        },
        {
          id: "ch3-5",
          type: "explain",
          title: "💭 What if you've built all 7 features?",
          content: `💭 Rest, critical hits, equipment, quests, skills, achievements, drops... **what concepts were used** in these 7 features?

### Features Added:
| # | Feature | Core Concept |
|---|---------|--------------|
| ① | Rest | max_hp percentage calculation |
| ② | Critical Hits | random probability |
| ③ | Equipment | Class composition |
| ④ | Quests | Dictionary + progress tracking |
| ⑤ | Skills | MP + job-based branching |
| ⑥ | Achievements | lambda + condition checks |
| ⑦ | Drops | Probability + lists |

### What you can try next:
- **File separation** -- character.py, monster.py, game.py
- **colorama** -- Colored terminal output
- **GUI** -- Add graphics with tkinter
- **Multiplayer** -- 2-player battle mode

@Key point: Using just Python basics, you added **7 advanced features** to build a real game!`
        }
      ]
    }
  ]
}
