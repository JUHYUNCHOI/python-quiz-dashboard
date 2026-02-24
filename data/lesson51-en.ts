import { LessonData } from './types'

export const lesson51EnData: LessonData = {
  id: "51en",
  title: "Text RPG: Completing the Game",
  emoji: "🎮",
  description: "Complete the game with a shop, save system, and game loop!",
  chapters: [
    {
      id: "ch1",
      title: "Shop System",
      emoji: "🏪",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 How do we manage shop items?",
          content: `💭 Potion, big potion, power potion... how do we **neatly store** the list of items for sale in a shop?

\`\`\`python
shop_items = {
    'potion':     Item('Potion', 'heal', 30, 50),
    'big_potion': Item('Big Potion', 'heal', 60, 100),
    'power':      Item('Power Potion', 'atk', 5, 80),
}
\`\`\`

### Shop features:
1. **View list** — name, effect, price
2. **Purchase** — check gold -> deduct -> add to inventory
3. **Insufficient funds** — "Not enough gold!"

@Key point: Using a **dictionary** to manage shop items lets you look them up by name instantly!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "💻 Build a shop!",
          task: "Run the system that lets you buy items from a shop!",
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
        s.gold = 200
        s.inventory = []

    def add_item(s, item):
        s.inventory.append(item)

# Shop!
shop_items = {
    'potion':     Item('Potion', 'heal', 30, 50),
    'big_potion': Item('Big Potion', 'heal', 60, 100),
    'power':      Item('Power Potion', 'atk', 5, 80),
}

def show_shop():
    print('=== Shop ===')
    for key, item in shop_items.items():
        types = {'heal': 'Heal', 'atk': 'ATK'}
        print(f'  {item.name}: {types[item.item_type]} +{item.value} ({item.price}G)')

def buy_item(hero, item_key):
    if item_key not in shop_items:
        print('  Item not found!')
        return
    item = shop_items[item_key]
    if hero.gold < item.price:
        print(f'  Not enough gold! (Have: {hero.gold}, Need: {item.price})')
        return
    hero.gold -= item.price
    # Create a new item object!
    new_item = Item(item.name, item.item_type, item.value, item.price)
    hero.add_item(new_item)
    print(f'  Bought {item.name}! (-{item.price}G, Balance: {hero.gold})')

# Test!
hero = Character('Hero')
print(f'Gold: {hero.gold}')

show_shop()

# Buy using actions pattern!
buy_actions = ['potion', 'potion', 'power', 'big_potion']

print('\\n--- Shopping! ---')
for action in buy_actions:
    buy_item(hero, action)

print(f'\\nBalance: {hero.gold}G')
print(f'Inventory: {len(hero.inventory)} items')
for item in hero.inventory:
    print(f'  - {item.name}')`,
          expectedOutput: `Gold: 200\n=== Shop ===\n  Potion: Heal +30 (50G)\n  Big Potion: Heal +60 (100G)\n  Power Potion: ATK +5 (80G)\n\n--- Shopping! ---\n  Bought Potion! (-50G, Balance: 150)\n  Bought Potion! (-50G, Balance: 100)\n  Bought Power Potion! (-80G, Balance: 20)\n  Not enough gold! (Have: 20, Need: 100)\n\nBalance: 20G\nInventory: 3 items\n  - Potion\n  - Potion\n  - Power Potion`,
          hint: "Check gold -> deduct -> add to inventory!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-2",
          type: "mission",
          title: "🎯 Mission: Complete the shop!",
          task: "Fill in 3 blanks to complete the shop system!",
          initialCode: `class Item:
    def __init__(s, name, price):
        s.name = name
        s.price = price

shop = {
    'sword': Item('Sword', 150),
    'shield': Item('Shield', 120),
}

gold = 200

def buy(item_key):
    global gold
    item = shop[item_key]
    if gold ___ item.price:
        print(f'Not enough gold!')
        return False
    gold -= item.___
    print(f'Bought {item.name}! (Balance: {gold})')
    return True

print(f'Gold: {gold}')
buy('sword')
buy('___')
print(f'Remaining gold: {gold}')`,
          expectedOutput: `Gold: 200\nBought Sword! (Balance: 50)\nNot enough gold!\nRemaining gold: 50`,
          hint: "Gold comparison, price deduction, buy shield!",
          hint2: "< / price / shield"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "💻 Battle -> Reward -> Shop!",
          task: "Win a battle, earn gold, and go shopping!",
          initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp, s.max_hp = hp, hp
        s.atk = atk
        s.defense = defense
        s.gold = 0
        s.inventory = []
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
    def __init__(s, name, hp, atk, defense, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
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

# Simple battle!
hero = Character('Hero', 120, 20, 10)
goblin = Monster('Goblin', 40, 12, 3, 50)

print('=== Battle! ===')
while hero.alive and goblin.alive:
    dmg = goblin.take_damage(hero.atk)
    print(f'  Hero -> Goblin ({dmg})')
    if goblin.alive:
        dmg = hero.take_damage(goblin.atk)
        print(f'  Goblin -> Hero ({dmg})')

print(f'\\nGoblin defeated! +{goblin.gold_reward}G')
hero.gold += goblin.gold_reward

# Shop!
print(f'\\n=== Shop (Have: {hero.gold}G) ===')
print(f'  Potion: 30G')
# Buy potion
hero.gold -= 30
hero.inventory.append('Potion')
print(f'  Bought Potion! (Balance: {hero.gold})')

# Use potion
hero.hp = min(hero.hp + 30, hero.max_hp)
hero.inventory.pop(0)
print(f'\\nUsed Potion! HP: {hero.hp}/{hero.max_hp}')
print(f'Remaining gold: {hero.gold}')`,
          expectedOutput: `=== Battle! ===\n  Hero -> Goblin (17)\n  Goblin -> Hero (2)\n  Hero -> Goblin (17)\n  Goblin -> Hero (2)\n  Hero -> Goblin (17)\n\nGoblin defeated! +50G\n\n=== Shop (Have: 50G) ===\n  Potion: 30G\n  Bought Potion! (Balance: 20)\n\nUsed Potion! HP: 120/120\nRemaining gold: 20`,
          hint: "Battle -> reward -> shop -> use item, a natural flow!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When you have 80 gold and a potion costs 100 gold, what's the correct handling?",
          options: [
            "Just buy it (negative gold)",
            "Error occurs",
            "Print 'Not enough gold!' message",
            "Automatically apply a discount"
          ],
          answer: 2,
          explanation: "We check with if gold < price: and if insufficient, we block the purchase!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Save/Load",
      emoji: "💾",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "💭 How do we save game data?",
          content: `💭 Character name, level, gold... isn't there a way to **convert this to a string and save** it?

\`\`\`python
import json

# Data to save
save_data = {
    'name': 'Hero',
    'job': 'warrior',
    'level': 3,
    'hp': 85,
    'gold': 150,
    'inventory': ['Potion', 'Sword']
}

# Dictionary -> JSON string
json_str = json.dumps(save_data)
# '{"name": "Hero", "job": "warrior", ...}'

# JSON string -> Dictionary
loaded = json.loads(json_str)
# {'name': 'Hero', 'job': 'warrior', ...}
\`\`\`

@Key point: **json.dumps()** = save dictionary as string, **json.loads()** = restore string to dictionary!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "💻 Implement Save/Load!",
          task: "Save character data as JSON and load it back!",
          initialCode: `import json

class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.hp, s.max_hp = 100, 100
        s.atk = 15
        s.defense = 10
        s.gold = 0
        s.exp = 0
        s.inventory = []

    def to_dict(s):
        return {
            'name': s.name,
            'job': s.job,
            'level': s.level,
            'hp': s.hp,
            'max_hp': s.max_hp,
            'atk': s.atk,
            'defense': s.defense,
            'gold': s.gold,
            'exp': s.exp,
            'inventory': [item for item in s.inventory]
        }

    def status(s):
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
        print(f'[{jobs[s.job]}] {s.name} Lv.{s.level}')
        print(f'  HP: {s.hp}/{s.max_hp} | ATK: {s.atk}')
        print(f'  Gold: {s.gold} | Inventory: {s.inventory}')

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

# 1. Create character + play
hero = Character('Alice', 'warrior')
hero.level = 3
hero.hp = 85
hero.max_hp = 130
hero.atk = 24
hero.defense = 16
hero.gold = 250
hero.inventory = ['Potion', 'Potion', 'Power Potion']

print('=== Before Save ===')
hero.status()

# 2. Save!
save_data = hero.to_dict()
json_str = json.dumps(save_data, ensure_ascii=False)
print(f'\\n=== Save Data ===')
print(json_str)

# 3. Load!
loaded_data = json.loads(json_str)
loaded_hero = from_dict(loaded_data)
print(f'\\n=== Load Complete! ===')
loaded_hero.status()`,
          expectedOutput: `=== Before Save ===\n[Warrior] Alice Lv.3\n  HP: 85/130 | ATK: 24\n  Gold: 250 | Inventory: ['Potion', 'Potion', 'Power Potion']\n\n=== Save Data ===\n{"name": "Alice", "job": "warrior", "level": 3, "hp": 85, "max_hp": 130, "atk": 24, "defense": 16, "gold": 250, "exp": 0, "inventory": ["Potion", "Potion", "Power Potion"]}\n\n=== Load Complete! ===\n[Warrior] Alice Lv.3\n  HP: 85/130 | ATK: 24\n  Gold: 250 | Inventory: ['Potion', 'Potion', 'Power Potion']`,
          hint: "Convert to dictionary with to_dict(), save/load with json.dumps/loads!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-2",
          type: "mission",
          title: "🎯 Mission: Save system!",
          task: "Fill in 3 blanks to complete save/load!",
          initialCode: `import json

data = {
    'name': 'Bob',
    'level': 5,
    'gold': 300,
    'items': ['Sword', 'Shield']
}

# Save: dictionary -> JSON string
save_str = json.___(data, ensure_ascii=False)
print(f'Saved: {save_str}')

# Load: JSON string -> dictionary
loaded = json.___(save_str)
print(f'Name: {loaded["name"]}')
print(f'Level: {loaded["___"]}')
print(f'Items: {loaded["items"]}')`,
          expectedOutput: `Saved: {"name": "Bob", "level": 5, "gold": 300, "items": ["Sword", "Shield"]}\nName: Bob\nLevel: 5\nItems: ['Sword', 'Shield']`,
          hint: "Dictionary to JSON is dumps, JSON to dictionary is loads!",
          hint2: "dumps / loads / level"
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "💻 Multiple save slots!",
          task: "Run a system that manages 3 save slots!",
          initialCode: `import json

# Save slots (dictionary)
save_slots = {}

def save_game(slot, data):
    save_slots[slot] = json.dumps(data, ensure_ascii=False)
    print(f'[Slot {slot}] Save complete!')

def load_game(slot):
    if slot not in save_slots:
        print(f'[Slot {slot}] Empty!')
        return None
    data = json.loads(save_slots[slot])
    print(f'[Slot {slot}] Load complete!')
    return data

def show_slots():
    print('=== Save Slots ===')
    for i in range(1, 4):
        if i in save_slots:
            data = json.loads(save_slots[i])
            print(f'  Slot {i}: {data["name"]} Lv.{data["level"]}')
        else:
            print(f'  Slot {i}: (empty)')

# Test!
show_slots()

print()
save_game(1, {'name': 'Warrior', 'level': 3, 'gold': 200})
save_game(2, {'name': 'Mage', 'level': 5, 'gold': 500})

print()
show_slots()

print()
data = load_game(2)
if data:
    print(f'  Name: {data["name"]}, Gold: {data["gold"]}')

print()
load_game(3)`,
          expectedOutput: `=== Save Slots ===\n  Slot 1: (empty)\n  Slot 2: (empty)\n  Slot 3: (empty)\n\n[Slot 1] Save complete!\n[Slot 2] Save complete!\n\n=== Save Slots ===\n  Slot 1: Warrior Lv.3\n  Slot 2: Mage Lv.5\n  Slot 3: (empty)\n\n[Slot 2] Load complete!\n  Name: Mage, Gold: 500\n\n[Slot 3] Empty!`,
          hint: "Manage slots with a dictionary, serialize with JSON!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What are the roles of json.dumps() and json.loads()?",
          options: [
            "dumps: save to file, loads: read from file",
            "dumps: dictionary -> string, loads: string -> dictionary",
            "dumps: string -> dictionary, loads: dictionary -> string",
            "Both are file-related functions"
          ],
          answer: 1,
          explanation: "dumps = dictionary to JSON string! loads = JSON string to dictionary!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Game Complete!",
      emoji: "🎮",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "💭 How do we combine battle, shop, and save into one?",
          content: `💭 Battle, visit the shop, save... can we run **all these features in one while loop**?

\`\`\`python
actions = ['warrior', 'battle', 'battle', 'shop',
           'buy_potion', 'use_potion', 'save', 'battle',
           'quit']

idx = 0
while True:
    action = actions[idx]
    idx += 1

    if action == 'quit':
        break
    elif action == 'battle':
        # Battle!
    elif action == 'shop':
        # Shop!
    elif action == 'save':
        # Save!
    ...
\`\`\`

@Key point: **The actions list IS the game scenario!** Branch by action using while + if/elif!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "💻 Run the full game!",
          task: "Run the completed text RPG!",
          initialCode: `import json
import random
random.seed(42)

class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.inventory = []
        s.alive = True
        if job == 'warrior':
            s.hp, s.max_hp, s.atk, s.defense = 120, 120, 15, 12
        elif job == 'mage':
            s.hp, s.max_hp, s.atk, s.defense = 80, 80, 25, 5
        else:
            s.hp, s.max_hp, s.atk, s.defense = 100, 100, 20, 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1: actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def gain_exp(s, amount):
        s.exp += amount
        if s.exp >= 100:
            s.exp -= 100
            s.level += 1
            s.max_hp += 10
            s.hp = s.max_hp
            s.atk += 3
            s.defense += 2
            print(f'  ★ Level Up! Lv.{s.level}!')

    def status(s):
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
        print(f'  [{jobs[s.job]}] {s.name} Lv.{s.level}')
        print(f'  HP: {s.hp}/{s.max_hp} | ATK: {s.atk} | DEF: {s.defense}')
        print(f'  EXP: {s.exp}/100 | Gold: {s.gold}')

    def to_dict(s):
        return {'name': s.name, 'job': s.job, 'level': s.level,
                'hp': s.hp, 'max_hp': s.max_hp, 'atk': s.atk,
                'defense': s.defense, 'exp': s.exp, 'gold': s.gold}

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
        if actual < 1: actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

def create_monster():
    monsters = [
        ('Slime', 30, 8, 2, 30, 20),
        ('Goblin', 50, 15, 5, 60, 40),
        ('Orc', 70, 18, 8, 80, 60),
    ]
    m = random.choice(monsters)
    return Monster(m[0], m[1], m[2], m[3], m[4], m[5])

# === Game Start! ===
actions = [
    'warrior',       # Job selection
    'battle',        # 1st battle
    'attack', 'attack', 'attack',
    'battle',        # 2nd battle
    'attack', 'attack', 'heal', 'attack', 'attack',
    'status',        # Check status
    'shop',          # Shop
    'buy_potion',
    'save',          # Save
    'quit'
]

idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

# Job selection
job = next_action()
hero = Character('Player', job)
jobs_en = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
print(f'=== {jobs_en[job]} is born! ===')
hero.status()

save_data = None

# Game loop!
while True:
    action = next_action()
    if action == 'quit':
        print('\\nGame Over!')
        break

    if action == 'battle':
        monster = create_monster()
        print(f'\\n--- {monster.name} appeared! (HP:{monster.hp}) ---')

        while hero.alive and monster.alive:
            battle_action = next_action()
            if battle_action == 'attack':
                dmg = monster.take_damage(hero.atk)
                print(f'  {hero.name} -> {monster.name} ({dmg})')
            elif battle_action == 'heal':
                hero.hp = min(hero.hp + 30, hero.max_hp)
                print(f'  {hero.name} healed! HP: {hero.hp}/{hero.max_hp}')

            if monster.alive:
                dmg = hero.take_damage(monster.atk)
                print(f'  {monster.name} -> {hero.name} ({dmg})')

        if not monster.alive:
            hero.gold += monster.gold_reward
            hero.gain_exp(monster.exp_reward)
            print(f'  Victory! +{monster.exp_reward}EXP, +{monster.gold_reward}G')

    elif action == 'status':
        print('\\n--- Status ---')
        hero.status()

    elif action == 'shop':
        print(f'\\n--- Shop (Have: {hero.gold}G) ---')
        print('  Potion: 30G')

    elif action == 'buy_potion':
        if hero.gold >= 30:
            hero.gold -= 30
            hero.inventory.append('Potion')
            print(f'  Bought Potion! (Balance: {hero.gold})')
        else:
            print('  Not enough gold!')

    elif action == 'save':
        save_data = json.dumps(hero.to_dict(), ensure_ascii=False)
        print(f'\\n--- Save Complete! ---')

print('\\n=== Final Results ===')
hero.status()
if save_data:
    print(f'\\nSave: {save_data}')`,
          expectedOutput: `=== Warrior is born! ===\n  [Warrior] Player Lv.1\n  HP: 120/120 | ATK: 15 | DEF: 12\n  EXP: 0/100 | Gold: 0\n\n--- Goblin appeared! (HP:50) ---\n  Player -> Goblin (10)\n  Goblin -> Player (3)\n  Player -> Goblin (10)\n  Goblin -> Player (3)\n  Player -> Goblin (10)\n  Goblin -> Player (3)\n  Victory! +60EXP, +40G\n\n--- Slime appeared! (HP:30) ---\n  Player -> Slime (13)\n  Slime -> Player (1)\n  Player -> Slime (13)\n  Slime -> Player (1)\n  Player healed! HP: 120/120\n  Slime -> Player (1)\n  Player -> Slime (13)\n  Victory! +30EXP, +20G\n\n--- Status ---\n  [Warrior] Player Lv.1\n  HP: 119/120 | ATK: 15 | DEF: 12\n  EXP: 90/100 | Gold: 60\n\n--- Shop (Have: 60G) ---\n  Potion: 30G\n  Bought Potion! (Balance: 30)\n\n--- Save Complete! ---\n\nGame Over!\n\n=== Final Results ===\n  [Warrior] Player Lv.1\n  HP: 119/120 | ATK: 15 | DEF: 12\n  EXP: 90/100 | Gold: 30\n\nSave: {"name": "Player", "job": "warrior", "level": 1, "hp": 119, "max_hp": 120, "atk": 15, "defense": 12, "exp": 90, "gold": 30}`,
          hint: "The actions list is the game scenario! Repeat with while!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-2",
          type: "mission",
          title: "🎯 Mission: Game loop!",
          task: "Fill in 3 blanks to complete the game loop!",
          initialCode: `actions = ['battle', 'shop', 'save', 'quit']
idx = 0

hp = 100
gold = 0
saved = False

while True:
    action = actions[idx]
    ___ += 1

    if action == 'quit':
        print('Quit!')
        ___

    if action == 'battle':
        print(f'Battle won! +50G')
        gold += 50
    elif action == '___':
        print(f'Shop! (Have: {gold}G)')
    elif action == 'save':
        saved = True
        print('Save complete!')

print(f'Gold: {gold}, Saved: {saved}')`,
          expectedOutput: `Battle won! +50G\nShop! (Have: 50G)\nSave complete!\nQuit!\nGold: 50, Saved: True`,
          hint: "Increment index, exit loop, shop string!",
          hint2: "idx / break / shop"
        },
        {
          id: "ch3-3",
          type: "tryit",
          title: "💻 Play as a Mage!",
          task: "See how battles differ when you choose the Mage class!",
          initialCode: `import random
random.seed(42)

class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.alive = True
        if job == 'warrior':
            s.hp, s.max_hp, s.atk, s.defense = 120, 120, 15, 12
        elif job == 'mage':
            s.hp, s.max_hp, s.atk, s.defense = 80, 80, 25, 5
        else:
            s.hp, s.max_hp, s.atk, s.defense = 100, 100, 20, 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1: actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

class Monster:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1: actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

# Same monster, different classes!
print('=== Class Battle Comparison (vs Goblin HP:50 ATK:15 DEF:5) ===')

for job in ['warrior', 'mage', 'archer']:
    hero = Character('Test', job)
    goblin = Monster('Goblin', 50, 15, 5)
    jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}

    turns = 0
    while hero.alive and goblin.alive:
        turns += 1
        goblin.take_damage(hero.atk)
        if goblin.alive:
            hero.take_damage(goblin.atk)

    print(f'{jobs[job]}: Won in {turns} turns! (Remaining HP: {hero.hp}/{hero.max_hp})')`,
          expectedOutput: `=== Class Battle Comparison (vs Goblin HP:50 ATK:15 DEF:5) ===\nWarrior: Won in 5 turns! (Remaining HP: 108/120)\nMage: Won in 3 turns! (Remaining HP: 60/80)\nArcher: Won in 4 turns! (Remaining HP: 72/100)`,
          hint: "Mage wins faster but has less HP remaining!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Why do we use `while True` + `break` in a game loop?",
          options: [
            "It's faster than a for loop",
            "To keep repeating until 'quit' comes",
            "It's a Python rule",
            "To prevent errors"
          ],
          answer: 1,
          explanation: "Since we don't know when the game will end, we use while True for infinite looping! When 'quit' comes, we escape with break!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Why are battle results different for each class?",
          options: [
            "random works differently",
            "ATK, DEF, HP are different for each class",
            "The monster uses different attacks",
            "Because of a bug"
          ],
          answer: 1,
          explanation: "Mage (ATK 25) wins fast but has low HP (80), while Warrior (DEF 12) is slow but safe!"
        },
        {
          id: "ch3-6",
          type: "explain",
          title: "💭 How many concepts did we use in total?",
          content: `💭 Classes, dictionaries, lists, JSON, loops... how many **concepts** went into this text RPG?

### What we built:
- **Character** — 3 classes, level up, battle, inventory
- **Monster** — multiple types, reward system
- **Item** — heal/attack/defense items
- **Shop** — purchasing, gold management
- **Save/Load** — JSON serialization
- **Game Loop** — auto-play with actions list

### Complete concept summary:
| Concept | From | Used For |
|---------|------|----------|
| **Classes** | Part 7 | Character, Monster, Item |
| **Dictionaries** | Part 3 | Shop, save data |
| **Lists** | Part 3 | Inventory, actions |
| **JSON** | Part 8 | Save/Load |
| **Loops** | Part 2 | Game loop, battle |
| **Conditionals** | Part 2 | Action branching, damage calc |

@Key point: We used **6 core concepts** together to complete one text RPG!`
        }
      ]
    }
  ]
}
