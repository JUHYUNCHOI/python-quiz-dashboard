import { LessonData } from './types'

export const lesson42EnData: LessonData = {
  id: "42en",
  title: "Methods and Attributes",
  emoji: "\u2694\ufe0f",
  description: "Add abilities like attack and heal to your classes!",
  chapters: [
    {
      id: "ch1",
      title: "Creating Your First Method",
      emoji: "\ud83d\udde3\ufe0f",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "How do we make a character say hello?",
          content: `We created a character, but... the hero can't greet or show status. How do we add **behavior**?

\`\`\`python
hero = Character('Hero', 100)
# Hero, say hello! -> ???
# Hero, show your status! -> ???
\`\`\`

Just **add a function inside** the class! This is called a **method**!

@Key point: **Method = a function inside a class** -- the way to add behavior to objects!`
        },
        {
          id: "ch1-0a",
          type: "explain",
          title: "What does a method look like in code?",
          content: `OK, so we put a function inside the class... but **what does the code look like?**

\`\`\`python
class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

    def say_hello(s):  # <-- method!
        print(f'Hi! I am {s.char_name}!')
\`\`\`

Note: The first parameter of a method is always **s (self)** = "myself"!

@Key point: Define with \`def method_name(s):\` inside the class, call with \`object.method()\`!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "Create greeting & status methods!",
          task: "Run a Character class with say_hello and show_status methods!",
          initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

    def say_hello(s):
        print(f'Hi! I am {s.char_name}!')

    def show_status(s):
        print(f'{s.char_name}: HP {s.hp}')

hero = Character('Hero', 100)
hero.say_hello()
hero.show_status()`,
          expectedOutput: `Hi! I am Hero!\nHero: HP 100`,
          hint: "Methods are called with object.method_name()!",
          hint2: "Use a dot (.) after hero, then the method name, like hero.say_hello()!"
        },
        {
          id: "ch1-1b",
          type: "tryit",
          title: "Add parameters to a method!",
          task: "Create and run a method that takes parameters!",
          initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

    def say_hello(s):
        print(f'Hi! I am {s.char_name}!')

    def introduce(s, age, job):
        print(f'Name: {s.char_name}')
        print(f'Age: {age}')
        print(f'Job: {job}')
        print(f'HP: {s.hp}')

hero = Character('Hero', 100)
hero.say_hello()
print()

# Call with parameters!
hero.introduce(18, 'Warrior')
print()

mage = Character('Mage', 80)
mage.introduce(20, 'Wizard')`,
          expectedOutput: `Hi! I am Hero!\n\nName: Hero\nAge: 18\nJob: Warrior\nHP: 100\n\nName: Mage\nAge: 20\nJob: Wizard\nHP: 80`,
          hint: "Methods can take extra parameters just like regular functions!",
          hint2: "Add the parameters you want after s, separated by commas!"
        },
        {
          id: "ch1-1c",
          type: "mission",
          title: "Mission: Create a Method!",
          task: "Fill in the 3 blanks to complete the level-up method!",
          initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp
        s.level = 1

    def show_status(s):
        print(f'{s.char_name} Lv.{s.level} (HP:{s.hp})')

    def level_up(___):
        s.level = s.level + 1
        s.___ = s.hp + 20
        print(f'{s.char_name} leveled up! Lv.{s.level} (HP:{s.hp})')

hero = Character('Hero', 100)
hero.show_status()
hero.___()
hero.level_up()
hero.show_status()`,
          expectedOutput: `Hero Lv.1 (HP:100)\nHero leveled up! Lv.2 (HP:120)\nHero leveled up! Lv.3 (HP:140)\nHero Lv.3 (HP:140)`,
          hint: "The first parameter of a method is s, increase HP, and call by method name!",
          hint2: "s / hp / level_up"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quiz!",
          content: "What rule must you always follow when creating a method?",
          options: [
            "Method names must start with an uppercase letter",
            "The first parameter of a method must be s (self)",
            "Methods must always have a return statement",
            "Methods must be written outside the class"
          ],
          answer: 1,
          explanation: "The first parameter of a method is always s (self)! It refers to 'myself'."
        }
      ]
    },
    {
      id: "ch2",
      title: "Attack / Heal Methods",
      emoji: "\u2694\ufe0f",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "To attack a slime, what does the hero need to know?",
          content: `The greeting method worked alone... but attacking needs a **target**! How do we pass a target to a method?

\`\`\`python
def attack(s, target):  # target = the attack target!
    print(f'{s.char_name} attacks {target.char_name}!')
    target.hp = target.hp - s.atk  # Reduce target's HP!
\`\`\`

**target** is also an object, so you can use \`target.char_name\`, \`target.hp\`!

@Key point: Pass **another object as a parameter** to a method, and you can change the other object's attributes!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "Run the attack system!",
          task: "Run the code where the hero attacks the slime!",
          initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        print(f'{s.char_name} attacks {target.char_name}!')
        print(f'{s.atk} damage!')
        target.hp = target.hp - s.atk
        print(f'{target.char_name} remaining HP: {target.hp}')

hero = Character('Hero', 100, 25)
slime = Character('Slime', 30, 5)
hero.attack(slime)`,
          expectedOutput: `Hero attacks Slime!\n25 damage!\nSlime remaining HP: 5`,
          hint: "In hero.attack(slime), s=hero and target=slime!",
          hint2: "Inside the attack method, s is Hero and target is Slime!"
        },
        {
          id: "ch2-2",
          type: "tryit",
          title: "Build a healing system!",
          task: "Run the heal method that restores HP but doesn't exceed max_hp!",
          initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk

    def heal(s, amount):
        s.hp = s.hp + amount
        if s.hp > s.max_hp:
            s.hp = s.max_hp
        print(f'{s.char_name} healed! (+{amount}) HP: {s.hp}/{s.max_hp}')

    def status(s):
        print(f'{s.char_name}: HP {s.hp}/{s.max_hp}, ATK {s.atk}')

hero = Character('Hero', 100, 25)
hero.status()
hero.hp = hero.hp - 40
hero.status()
hero.heal(30)
hero.heal(50)`,
          expectedOutput: `Hero: HP 100/100, ATK 25\nHero: HP 60/100, ATK 25\nHero healed! (+30) HP: 90/100\nHero healed! (+50) HP: 100/100`,
          hint: "max_hp is the maximum health! Healing can't exceed it!",
          hint2: "heal(50) gives 90+50=140, but it caps at max_hp which is 100!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Instance Variables vs Class Variables",
      emoji: "\ud83d\udd00",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "Where do we store values that are the same for everyone, like a game title?",
          content: `The hero's HP and the mage's HP should be different... but the **game title** is the same for everyone. Where do we store that?

- \`s.hp\` -> **Different value** for each character (instance variable)
- Game title -> Should be the **same value** for all...?

@Key point: Different for each = **instance variable**, same for all = **???** (next step!)`
        },
        {
          id: "ch3-0a",
          type: "explain",
          title: "Use a class variable to share a value across all objects!",
          content: `Declare a variable **inside the class but outside any method**, and all objects can share it!

\`\`\`python
class Character:
    game_title = 'RPG Hero Game'  # Class variable (shared!)

    def __init__(s, char_name, hp):
        s.char_name = char_name   # Instance variable (individual!)
        s.hp = hp                 # Instance variable (individual!)
\`\`\`

| Type | Declared In | Access | Feature |
|------|-------------|--------|---------|
| Instance variable | Inside __init__ | s.xxx | Different for each |
| Class variable | Outside methods | Character.xxx | Shared by all |

@Key point: **Instance variables (s.xxx)** are individual, **class variables (Character.xxx)** are shared!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "Experience class variables!",
          task: "See the difference between class variables and instance variables!",
          initialCode: `class Character:
    game_title = 'RPG Hero Game'
    total_count = 0

    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp
        Character.total_count = Character.total_count + 1
        print(f'{char_name} created! (Total: {Character.total_count})')

hero = Character('Hero', 100)
mage = Character('Mage', 80)
archer = Character('Archer', 90)

print(f'\\nGame title: {Character.game_title}')
print(f'Character count: {Character.total_count}')
print(f'{hero.char_name} HP: {hero.hp}')
print(f'{mage.char_name} HP: {mage.hp}')`,
          expectedOutput: `Hero created! (Total: 1)\nMage created! (Total: 2)\nArcher created! (Total: 3)\n\nGame title: RPG Hero Game\nCharacter count: 3\nHero HP: 100\nMage HP: 80`,
          hint: "Character.total_count is shared by all objects, but s.hp is different for each!",
          hint2: "Class variables use Character.varname, instance variables use s.varname!"
        },
        {
          id: "ch3-1b",
          type: "mission",
          title: "Mission: Use Class Variables!",
          task: "Fill in the 3 blanks to complete the team system!",
          initialCode: `class TeamMember:
    team_name = 'RPG Adventure Party'
    member_count = ___

    def __init__(s, name, role):
        s.name = name
        s.role = role
        TeamMember.member_count = TeamMember.___ + 1

    def introduce(s):
        print(f'[{TeamMember.team_name}] {s.name} ({s.role})')

m1 = TeamMember('Hero', 'Warrior')
m2 = TeamMember('Rin', 'Archer')
m3 = TeamMember('Sophia', 'Healer')

m1.introduce()
m2.introduce()
m3.introduce()
print(f'\\nTeam members: {TeamMember.___}')`,
          expectedOutput: `[RPG Adventure Party] Hero (Warrior)\n[RPG Adventure Party] Rin (Archer)\n[RPG Adventure Party] Sophia (Healer)\n\nTeam members: 3`,
          hint: "Class variable starts at 0, increase member_count by 1 each time!",
          hint2: "0 / member_count / member_count"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "Quiz: Variable Types!",
          content: "Which statement about **class variables** is correct?",
          options: [
            "Each object has a different value",
            "Declared using the s.xxx format",
            "All objects share the same value",
            "Can only be created inside __init__"
          ],
          answer: 2,
          explanation: "Class variables are shared by all objects! They're declared inside the class but outside methods!"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Quiz: Predict the Output!",
          content: "What is the result of this code?\n\n```python\nclass Pet:\n    count = 0\n    \n    def __init__(s, name):\n        s.name = name\n        Pet.count = Pet.count + 1\n\na = Pet('Buddy')\nb = Pet('Whiskers')\nc = Pet('Tweety')\nprint(Pet.count, a.name)\n```",
          options: [
            "1 Buddy",
            "3 Buddy",
            "3 Tweety",
            "Error"
          ],
          answer: 1,
          explanation: "Pet.count is a class variable, so creating 3 pets makes it 3! a.name stays 'Buddy'!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Mini Battle & Missions",
      emoji: "\ud83c\udfae",
      steps: [
        {
          id: "ch4-0",
          type: "tryit",
          title: "Mini Battle System!",
          task: "Run the battle system that uses an alive attribute!",
          initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk
        s.alive = True

    def attack(s, target):
        if not s.alive:
            print(f'{s.char_name} is dead!')
            return
        print(f'{s.char_name} -> {target.char_name} attack! (-{s.atk})')
        target.hp = target.hp - s.atk
        if target.hp <= 0:
            target.hp = 0
            target.alive = False
            print(f'{target.char_name} defeated!')
        else:
            print(f'{target.char_name} remaining HP: {target.hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.char_name}: HP {s.hp}')

hero = Character('Hero', 100, 25)
slime = Character('Slime', 40, 10)

print('=== Battle Start! ===')
hero.status()
slime.status()

print('\\n--- Turn 1 ---')
hero.attack(slime)

print('\\n--- Turn 2 ---')
hero.attack(slime)

print('\\n=== Result ===')
hero.status()
slime.status()`,
          expectedOutput: `=== Battle Start! ===\n[O] Hero: HP 100\n[O] Slime: HP 40\n\n--- Turn 1 ---\nHero -> Slime attack! (-25)\nSlime remaining HP: 15\n\n--- Turn 2 ---\nHero -> Slime attack! (-25)\nSlime defeated!\n\n=== Result ===\n[O] Hero: HP 100\n[X] Slime: HP 0`,
          hint: "alive is True when alive, False when dead!",
          hint2: "If target.hp <= 0, set target.alive = False to mark as defeated!"
        },
        {
          id: "ch4-1",
          type: "mission",
          title: "Mission: Bank Account Class!",
          task: "Fill in the 3 blanks (___) in the BankAccount class to complete deposit, withdraw, and balance check features!",
          initialCode: `class BankAccount:
    def __init__(s, owner, balance):
        s.owner = owner
        s.balance = balance

    def deposit(s, amount):
        s.balance = s.balance ___ amount
        print(f'Deposited {amount}! Balance: {s.balance}')

    def withdraw(s, amount):
        if s.balance ___ amount:
            s.balance = s.balance - amount
            print(f'Withdrew {amount}! Balance: {s.balance}')
        else:
            print(f'Insufficient funds! Current: {s.balance}')

    def show_balance(s):
        print(f'{s.owner} balance: {s.___}')

account = BankAccount('Alice', 10000)
account.show_balance()
account.deposit(5000)
account.withdraw(3000)
account.withdraw(20000)
account.show_balance()`,
          expectedOutput: `Alice balance: 10000\nDeposited 5000! Balance: 15000\nWithdrew 3000! Balance: 12000\nInsufficient funds! Current: 12000\nAlice balance: 12000`,
          hint: "Deposit uses addition, withdrawal condition compares balance!",
          hint2: "+ / >= / balance"
        }
      ]
    }
  ]
}
