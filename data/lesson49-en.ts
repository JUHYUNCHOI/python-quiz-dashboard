import { LessonData } from './types'

export const lesson49EnData: LessonData = {
  id: "49en",
  title: "Text RPG: Game Design",
  emoji: "📋",
  description: "Design class structures and game flow!",
  chapters: [
    {
      id: "ch1",
      title: "Class Design",
      emoji: "📋",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "What can we build with classes?",
          content: `What if we combine classes, dictionaries, and JSON to make a **real game**?

\`\`\`
=== Text RPG ===
Choose a class: Warrior
Warrior born! HP:120 ATK:15 DEF:10

--- Turn 1 ---
Slime appears! HP:30
> Attack!
Warrior -> Slime (12 damage)
Slime -> Warrior (3 damage)
...
Slime defeated! +50 gold, +30 EXP
Level up! Lv.1 -> Lv.2

> Shop
Potion 50 gold -> Purchased!

> Save
Save complete!
\`\`\`

@Key point: We'll use **classes, modules, and JSON** from Parts 7-8 to build a text RPG!`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "How many blueprints does a game need?",
          content: `An RPG has players, monsters, and items. How many **classes** do we need to represent them?

| Class | Role | Attributes |
|-------|------|------------|
| **Character** | Player | name, HP, attack, defense, job, level, gold |
| **Monster** | Enemy | name, HP, attack, defense, EXP, gold |
| **Item** | Item | name, type, effect, price |

\`\`\`python
# We can build the whole game with 3 classes!
class Character:  # Player
    ...
class Monster:    # Enemy
    ...
class Item:       # Item
    ...
\`\`\`

@Key point: With **3 classes** (Character, Monster, Item), we can design every element of the game!`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "Start with the basics! Name and job?",
          content: `To create an RPG character, you obviously need a **name** and a **job**, right? Let's start there!

\`\`\`python
class Character:
    def __init__(s, name, job):
        s.name = name   # Name
        s.job = job     # Job
\`\`\`

@Key point: Put **name and job** in __init__ first! Start with the most basic info!`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "You need HP and attack power to fight!",
          content: `A name and job alone won't let you fight! You need **HP** to take hits and **attack power** to deal damage!

\`\`\`python
        # Stats (can be set differently per job!)
        s.hp = 100         # Current HP
        s.max_hp = 100     # Max HP (recovery limit!)
        s.atk = 15         # Attack power
        s.defense = 10     # Defense
\`\`\`

Why **store max_hp separately**: When HP drops and you heal, you need to cap it so it doesn't exceed the maximum!

@Key point: **hp, max_hp, atk, defense** -- 4 attributes complete the combat stats!`
        },
        {
          id: "ch1-4",
          type: "explain",
          title: "Leveling, EXP, and an item bag too!",
          content: `Defeat monsters to earn EXP and **level up**! Spend gold to **buy items**! These need to be attributes too!

\`\`\`python
        # Growth
        s.level = 1        # Level
        s.exp = 0          # Experience
        s.gold = 0         # Gold

        # Equipment
        s.inventory = []   # Inventory (a list!)
\`\`\`

**All together:**
\`\`\`python
class Character:
    def __init__(s, name, job):
        s.name = name      # Basic info
        s.job = job
        s.hp = 100         # Stats
        s.max_hp = 100
        s.atk = 15
        s.defense = 10
        s.level = 1        # Growth
        s.exp = 0
        s.gold = 0
        s.inventory = []   # Equipment
\`\`\`

@Key point: Basic info + stats + growth + equipment = **__init__ complete!** Build it step by step and it's not complicated!`
        },
        {
          id: "ch1-5",
          type: "tryit",
          title: "Create a basic Character!",
          task: "Create a Character class and print the character info!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.hp = 100
        s.max_hp = 100
        s.atk = 15
        s.defense = 10
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.inventory = []

    def status(s):
        print(f'=== {s.name} ===')
        print(f'Job: {s.job}')
        print(f'HP: {s.hp}/{s.max_hp}')
        print(f'ATK: {s.atk} | DEF: {s.defense}')
        print(f'Lv.{s.level} | EXP: {s.exp}')
        print(f'Gold: {s.gold}')

# Create a character!
hero = Character('Alice', 'Warrior')
hero.status()`,
          expectedOutput: `=== Alice ===\nJob: Warrior\nHP: 100/100\nATK: 15 | DEF: 10\nLv.1 | EXP: 0\nGold: 0`,
          hint: "A class manages all of a character's information!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch1-6",
          type: "explain",
          title: "What attributes does a monster need?",
          content: `Monsters also need HP and attack power! Plus, they should give **rewards** when defeated!

\`\`\`python
class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp    # EXP on defeat
        s.gold_reward = gold  # Gold on defeat
\`\`\`

@Key point: Monsters need combat stats + **defeat rewards (exp, gold)**!`
        },
        {
          id: "ch1-7",
          type: "explain",
          title: "Items have different effects by type!",
          content: `Potions **heal**, swords **boost attack**, shields **boost defense**... Each type has a different effect!

\`\`\`python
class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type  # 'heal', 'atk', 'def'
        s.value = value          # Effect value
        s.price = price          # Price
\`\`\`

@Key point: Item uses **item_type** to distinguish types, and stores **value** and **price**!`
        },
        {
          id: "ch1-8",
          type: "tryit",
          title: "Create all 3 classes!",
          task: "Create Character, Monster, and Item classes!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.hp = 100
        s.max_hp = 100
        s.atk = 15
        s.defense = 10
        s.level = 1

    def show(s):
        print(f'[{s.job}] {s.name}: HP {s.hp}/{s.max_hp}, ATK {s.atk}, DEF {s.defense}')

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold

    def show(s):
        print(f'[Monster] {s.name}: HP {s.hp}, ATK {s.atk}, DEF {s.defense}')

class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type
        s.value = value
        s.price = price

    def show(s):
        types = {'heal': 'Heal', 'atk': 'Attack', 'def': 'Defense'}
        print(f'[{types[s.item_type]}] {s.name}: +{s.value}, {s.price} gold')

# Create!
hero = Character('Bob', 'Mage')
slime = Monster('Slime', 30, 8, 2, 20, 30)
potion = Item('Potion', 'heal', 30, 50)

hero.show()
slime.show()
potion.show()`,
          expectedOutput: `[Mage] Bob: HP 100/100, ATK 15, DEF 10\n[Monster] Slime: HP 30, ATK 8, DEF 2\n[Heal] Potion: +30, 50 gold`,
          hint: "3 classes represent every element of the game!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch1-9",
          type: "quiz",
          title: "Quiz!",
          content: "Which attribute is NOT essential for a Monster class in an RPG?",
          options: ["hp (health)", "atk (attack)", "inventory (item bag)", "exp_reward (EXP reward)"],
          answer: 2,
          explanation: "Inventory belongs to the player (Character)! Monsters need HP, attack, and rewards."
        },
        {
          id: "ch1-10",
          type: "quiz",
          title: "Quiz!",
          content: "Why do we store max_hp separately in `s.max_hp = hp`?",
          options: [
            "To save memory",
            "To know the maximum when healing",
            "Python syntax requires it",
            "So monsters can use it too"
          ],
          answer: 1,
          explanation: "When HP drops and you heal, you need max_hp to cap recovery! The `min(hp + heal, max_hp)` pattern!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Game Flow Design",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "What order does a game flow in?",
          content: `Pick a job, fight, buy items... How do we **repeat this flow in code**?

\`\`\`
[Start]
  |
  +-> Job selection (Warrior/Mage/Archer)
  |
  +-> [Main Loop] -------------------+
  |    +-> Battle (fight monsters)   |
  |    +-> Shop (buy items)          |
  |    +-> Inventory (use items)     |
  |    +-> Save (save game)          |
  |    +-> Quit                      |
  |         ^                        |
  |         +------------------------+
  |
  +-> [Game Over or Clear!]
\`\`\`

@Key point: Choosing actions inside a **while loop** = game loop!`
        },
        {
          id: "ch2-1",
          type: "explain",
          title: "What if we pre-load actions into a list instead of input()?",
          content: `We can't use input() on the web! What if we put the player's actions **into a list ahead of time**?

\`\`\`python
# Original game (uses input - doesn't work on web!)
action = input('Action? ')

# Our approach (pre-load into a list!)
actions = ['attack', 'attack', 'heal', 'shop']
\`\`\`

@Key point: Pre-loading actions **in a list** lets us create game scenarios without input()!`
        },
        {
          id: "ch2-1a",
          type: "explain",
          title: "How do we pull items from the list one at a time?",
          content: `We put actions in a list... but we need a function to **pull them out one by one in order**, right?

\`\`\`python
idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'  # Quit when done!
\`\`\`

idx starts at 0 and increments by 1 each call, pulling the next action from the list!

@Key point: The **next_action()** function pulls actions from the list one by one for an automatic scenario!`
        },
        {
          id: "ch2-2",
          type: "tryit",
          title: "Menu with an actions list!",
          task: "Run a menu system using the actions list!",
          initialCode: `# actions list = pre-planned actions!
actions = ['battle', 'battle', 'shop', 'inventory', 'save', 'quit']

idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

# Game loop!
print('=== Text RPG ===')
turn = 1
while True:
    action = next_action()
    if action == 'quit':
        print('\\nGame over!')
        break

    print(f'\\n[Turn {turn}] Action: {action}')

    if action == 'battle':
        print('  -> Battle start!')
    elif action == 'shop':
        print('  -> Entering shop!')
    elif action == 'inventory':
        print('  -> Checking inventory!')
    elif action == 'save':
        print('  -> Game saved!')

    turn += 1`,
          expectedOutput: `=== Text RPG ===\n\n[Turn 1] Action: battle\n  -> Battle start!\n\n[Turn 2] Action: battle\n  -> Battle start!\n\n[Turn 3] Action: shop\n  -> Entering shop!\n\n[Turn 4] Action: inventory\n  -> Checking inventory!\n\n[Turn 5] Action: save\n  -> Game saved!\n\nGame over!`,
          hint: "while + next_action() creates the game loop!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "Job selection system!",
          task: "Create characters with different stats based on their job!",
          initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.inventory = []

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

    def status(s):
        jobs = {'warrior': 'Warrior', 'mage': 'Mage', 'archer': 'Archer'}
        print(f'[{jobs[s.job]}] {s.name}')
        print(f'  HP: {s.hp}/{s.max_hp}')
        print(f'  ATK: {s.atk} | DEF: {s.defense}')

# Job selection! (actions pattern)
job_choice = 'warrior'

print('=== Job Selection ===')
print(f'Choice: {job_choice}')

hero = Character('Player', job_choice)
print()
hero.status()

# Compare all jobs!
print('\\n=== All Jobs Comparison ===')
for job in ['warrior', 'mage', 'archer']:
    c = Character('Test', job)
    c.status()
    print()`,
          expectedOutput: `=== Job Selection ===\nChoice: warrior\n\n[Warrior] Player\n  HP: 120/120\n  ATK: 15 | DEF: 12\n\n=== All Jobs Comparison ===\n[Warrior] Test\n  HP: 120/120\n  ATK: 15 | DEF: 12\n\n[Mage] Test\n  HP: 80/80\n  ATK: 25 | DEF: 5\n\n[Archer] Test\n  HP: 100/100\n  ATK: 20 | DEF: 8\n`,
          hint: "Use if/elif to set different stats per job!",
          hint2: "Run the code as-is!"
        },
        {
          id: "ch2-4",
          type: "mission",
          title: "Mission: Complete the menu system!",
          task: "Fill in 3 blanks to complete the game menu!",
          initialCode: `actions = ['battle', 'shop', 'status', 'quit']

idx = 0
def next_action():
    global ___
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

gold = 100
hp = 80

print('=== Menu ===')
while True:
    action = ___()
    if action == 'quit':
        print('Game over!')
        break

    if action == 'battle':
        print(f'Battle! Gold +50')
        gold += 50
    elif action == '___':
        print(f'Shop! (Have: {gold} gold)')
    elif action == 'status':
        print(f'HP: {hp}, Gold: {gold}')`,
          expectedOutput: `=== Menu ===\nBattle! Gold +50\nShop! (Have: 150 gold)\nHP: 80, Gold: 150\nGame over!`,
          hint: "Access idx with global, call next_action(), use the 'shop' string!",
          hint2: "idx / next_action / shop"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Quiz!",
          content: "In a web environment (Pyodide), what do we use instead of `input()`?",
          options: [
            "Use the prompt() function",
            "Pre-load actions into a list",
            "Read from sys.stdin",
            "Python can't be used on the web"
          ],
          answer: 1,
          explanation: "Like actions = ['attack', 'heal', 'shop'], we pre-define actions and pull them out one by one with next_action()!"
        },
        {
          id: "ch2-6",
          type: "quiz",
          title: "Quiz!",
          content: "Why do we use if/elif for job selection?",
          options: [
            "Because Python doesn't have a switch statement",
            "To set different stats for each job",
            "To make the code longer",
            "To prevent errors"
          ],
          answer: 1,
          explanation: "Warriors get high HP, mages get high ATK! You need if/elif branching to set different values per job!"
        },
        {
          id: "ch2-7",
          type: "explain",
          title: "Let's summarize what we've designed!",
          content: `3 classes, game flow, actions pattern... Let's see the big picture!

### 3 Classes to Build:
- **Character** -- job-based stats, leveling, inventory
- **Monster** -- HP, attack, rewards
- **Item** -- type, effect, price

### Game Flow:
\`\`\`
Job selection -> [Battle/Shop/Inventory/Save] loop -> Quit
\`\`\`

### Pyodide Solution:
\`\`\`python
actions = ['warrior', 'attack', 'shop', 'save']
\`\`\`

@Key point: **3 classes + while loop + actions list** = text RPG design complete!`
        }
      ]
    }
  ]
}
