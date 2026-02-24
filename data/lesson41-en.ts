import { LessonData } from './types'

export const lesson41EnData: LessonData = {
  id: "41en",
  title: "Class Basics",
  emoji: "\ud83c\udf69",
  description: "Learn how classes stamp out objects like a cookie cutter!",
  chapters: [
    {
      id: "ch1",
      title: "Why Do We Need Classes?",
      emoji: "\ud83e\udd14",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "What if you need 10 characters? How many variables?",
          content: `Imagine an RPG game where you need 10 characters. Name, HP, attack power... **how many variables** would you need?

\`\`\`python
# Character 1
char1_name = 'Hero'
char1_hp = 100
char1_atk = 20

# Character 2
char2_name = 'Mage'
char2_hp = 80
char2_atk = 30

# Character 3
char3_name = 'Archer'
char3_hp = 90
char3_atk = 25

# ... still need 7 more!
\`\`\`

@Key point: That's 30 variables! Is there a cleaner way?`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "What if you could shrink 30 variables down to 3 lines?",
          content: `What if 30 variables could become **3 lines**? How is that possible?

\`\`\`python
hero = Character('Hero', 100, 20)
mage = Character('Mage', 80, 30)
archer = Character('Archer', 90, 25)
\`\`\`

**The Cookie Cutter Secret**
- **Cookie cutter** = the blueprint (shape is fixed)
- **Cookie** = the actual cookie stamped out by the cutter

With one cutter, you can make 100, even 1000 cookies!

@Key point: With one **class (cutter)**, you can stamp out as many objects (cookies) as you want!`
        },
        {
          id: "ch1-2",
          type: "interactive",
          title: "Class = Cookie Cutter Experience!",
          description: "Experience the process of stamping out objects (cookies) from a class (cookie cutter)!",
          component: "classBoonguh"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Quiz!",
          content: "Using the cookie cutter analogy, what is the relationship between class and object?",
          options: [
            "Class = cookie, Object = cutter",
            "Class = cookie cutter, Object = cookie",
            "Class = store, Object = customer",
            "Class = filling, Object = cookie"
          ],
          answer: 1,
          explanation: "A class (cutter) stamps out objects (cookies)! One cutter can make many cookies!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Creating a Class",
      emoji: "\ud83d\udd28",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "What does the code to create a class look like?",
          content: `To make a cookie cutter in code, use the **class** keyword!

\`\`\`python
# Define a class (make the cutter)
class Character:
    pass  # no features yet

# Create objects (stamp out cookies)
hero = Character()
villain = Character()

print(type(hero))
\`\`\`

**Result:**
\`<class '__main__.Character'>\`

Warning: Class names start with an **uppercase** letter!
- Functions: \`print()\`, \`input()\` (lowercase)
- Classes: \`Character()\`, \`Monster()\` (uppercase)

@Key point: Use \`class Name:\` to make a cutter, then \`Name()\` to stamp out objects!`
        },
        {
          id: "ch2-1",
          type: "explain",
          title: "How do we put a name into an empty class?",
          content: `An empty class has no info. To at least give it a name, **what function** do we need?

\`\`\`python
class Character:
    def __init__(s, char_name):
        s.char_name = char_name
        print(f'{char_name} created!')
\`\`\`

\`__init__\` is the initialization function that **runs automatically** when an object is created!

@Key point: Put a name in \`__init__\` and the empty cookie gets its filling!`
        },
        {
          id: "ch2-1a",
          type: "explain",
          title: "What if we add HP too, not just a name?",
          content: `A name alone is not enough! What if we add **HP** to complete the character?

\`\`\`python
class Character:
    def __init__(s, char_name, char_hp):
        s.char_name = char_name
        s.char_hp = char_hp

hero = Character('Hero', 100)
print(f'Name: {hero.char_name}')
print(f'HP: {hero.char_hp}')
\`\`\`

**Result:** \`Name: Hero\` / \`HP: 100\`

@Key point: Add more parameters to store **as much info as you want** in __init__!`
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Quiz!",
          content: "When does `__init__` run?",
          options: [
            "When the program starts",
            "When the class is defined",
            "When an object is created (calling Character())",
            "When print() is called"
          ],
          answer: 2,
          explanation: "`__init__` runs automatically when you create an object like `Character('Hero', 100)`!"
        },
        {
          id: "ch2-3",
          type: "explain",
          title: "Who exactly is 's' in __init__?",
          content: `In \`def __init__(s, char_name)\`, what is **s**? Where does it come from?

\`\`\`python
class Character:
    def __init__(s, char_name):
        print(f'Who is s? {s}')
        s.char_name = char_name

hero = Character('Hero')
print(f'Who is hero? {hero}')
\`\`\`

**Result:**
\`\`\`
Who is s? <__main__.Character object at 0x123abc>
Who is hero? <__main__.Character object at 0x123abc>
\`\`\`

The addresses are the same! s and hero are the same object!

When a cookie is being stamped from the cutter:
- \`s\` = "this cookie that's being made right now"
- \`hero\` = "the name tag on the finished cookie"

Note: Usually written as \`self\`, but this course uses \`s\`!

@Key point: **s (self) means "myself"** -- it refers to the object being created!`
        },
        {
          id: "ch2-4",
          type: "interactive",
          title: "Type Along: Create a Class!",
          description: "Create a Character class yourself!",
          component: "typeAlong",
          targetTitle: "Create a Character Class",
          targetDescription: "Use class and __init__ to create a character",
          targetCode: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\nhero = Character('Hero', 100)\nprint(f'{hero.name}: HP {hero.hp}')",
          expectedOutput: "Hero: HP 100"
        },
        {
          id: "ch2-5",
          type: "interactive",
          title: "Fill in the Blanks: Class Basics",
          description: "Complete the class!",
          component: "fillInBlank",
          codeTemplate: "___1___ Dog:\n    def ___2___(s, name):\n        ___3___.name = name\n\ndog = Dog('Buddy')\nprint(dog.name)",
          blanks: [
            { id: "1", answer: "class", hint: "Define a class!" },
            { id: "2", answer: "__init__", hint: "Initialization function!" },
            { id: "3", answer: "s", hint: "Refers to itself!" }
          ],
          choices: ["class", "def", "__init__", "__main__", "s", "self", "dog"],
          expectedOutput: "Buddy"
        }
      ]
    },
    {
      id: "ch3",
      title: "Creating Multiple Objects",
      emoji: "\ud83d\udc65",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "Can we make different characters from the same cutter?",
          content: `Can one Character cutter make **both a hero and a mage**?

\`\`\`python
class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

hero = Character('Hero', 100, 20)
mage = Character('Mage', 80, 35)
\`\`\`

@Key point: Use the same class with **different values** to create multiple objects!`
        },
        {
          id: "ch3-0a",
          type: "explain",
          title: "Do they really have different values? Let's check!",
          content: `Do the hero and mage **actually hold different values**? Could the values get mixed up?

\`\`\`python
print(f'{hero.char_name}: HP {hero.hp}, ATK {hero.atk}')
print(f'{mage.char_name}: HP {mage.hp}, ATK {mage.atk}')
\`\`\`

**Result:**
\`\`\`
Hero: HP 100, ATK 20
Mage: HP 80, ATK 35
\`\`\`

The values don't mix! Each object holds **its own independent values**!

@Key point: Even when you create multiple objects from 1 class, each has **its own values**!`
        },
        {
          id: "ch3-1",
          type: "quiz",
          title: "Predict the output!",
          content: "What is the result of this code?\n\n```python\nclass Pet:\n    def __init__(s, pet_name):\n        s.pet_name = pet_name\n\ndog = Pet('Buddy')\ncat = Pet('Whiskers')\nprint(dog.pet_name, cat.pet_name)\n```",
          options: ["Buddy Buddy", "Whiskers Whiskers", "Buddy Whiskers", "Error"],
          answer: 2,
          explanation: "dog and cat are different objects! Each has its own unique pet_name!"
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "Can we change HP after creation?",
          content: `The hero's HP is 100, but what if they **take damage**? Do we need to create a new one, or can we just change the value?

\`\`\`python
hero = Character('Hero', 100)
print(f'Initial HP: {hero.hp}')

hero.hp = hero.hp - 30
print(f'After damage HP: {hero.hp}')
\`\`\`

**Result:** \`Initial HP: 100\` then \`After damage HP: 70\`

@Key point: Use \`object.attribute = new_value\` to change attributes anytime!`
        },
        {
          id: "ch3-2a",
          type: "explain",
          title: "If we change one character, does the other change too?",
          content: `We reduced the hero's HP... does the mage's HP go down too?

\`\`\`python
hero = Character('Hero', 100)
mage = Character('Mage', 80)

hero.hp = hero.hp - 30  # Only the hero takes damage!

print(f'Hero HP: {hero.hp}')    # 70
print(f'Mage HP: {mage.hp}')    # 80 (unchanged!)
\`\`\`

Other objects are not affected! Each object is **completely independent**!

@Key point: Changing one object's attributes **does not affect other objects!**`
        },
        {
          id: "ch3-3",
          type: "interactive",
          title: "Fill in the Blanks: Multiple Objects",
          description: "Complete the Item class and create 2 items!",
          component: "fillInBlank",
          codeTemplate: "class Item:\n    def __init__(___1___, item_name, price):\n        s.item_name = ___2___\n        s.price = price\n\nsword = ___3___('Sword', 500)\nshield = Item('Shield', 300)\nprint(f'{sword.item_name}: {sword.___4___} gold')",
          blanks: [
            { id: "1", answer: "s, item_name, price", hint: "s + 2 parameters!" },
            { id: "2", answer: "item_name", hint: "Store the received name!" },
            { id: "3", answer: "Item", hint: "Create an object from the class!" },
            { id: "4", answer: "price", hint: "Price attribute!" }
          ],
          choices: ["s, item_name, price", "item_name, price", "item_name", "price", "Item", "item", "name"],
          expectedOutput: "Sword: 500 gold"
        }
      ]
    },
    {
      id: "ch4",
      title: "Practice & Review",
      emoji: "\ud83c\udfae",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "How would you build a Monster class?",
          content: `Now that you know the Character class... you can make a **Monster class** the same way, right? What attributes does it need?

**Requirements:**
- Attributes: char_name, hp, atk
- Create 3 monsters: Slime, Goblin, Dragon
- Print each monster's info

5-minute challenge!

### Hint
\`\`\`python
class Monster:
    def __init__(s, char_name, hp, atk):
        # Store 3 values in s.xxx = xxx format!
\`\`\`

@Key point: The class structure is always the same -- \`class Name: -> __init__ -> s.attr = value\`!`
        },
        {
          id: "ch4-1",
          type: "interactive",
          title: "Type Along: Monster Class!",
          description: "Create a Monster class yourself!",
          component: "typeAlong",
          targetTitle: "Monster Class",
          targetDescription: "Create 3 monsters",
          targetCode: "class Monster:\n    def __init__(s, name, hp, atk):\n        s.name = name\n        s.hp = hp\n        s.atk = atk\n\nslime = Monster('Slime', 30, 5)\ngoblin = Monster('Goblin', 50, 10)\ndragon = Monster('Dragon', 200, 50)\n\nprint(f'{slime.name}: HP {slime.hp}')\nprint(f'{dragon.name}: HP {dragon.hp}')",
          expectedOutput: "Slime: HP 30\nDragon: HP 200"
        },
        {
          id: "ch4-2",
          type: "interactive",
          title: "Fill in the Blanks: Student Class",
          description: "Complete a class that holds student info!",
          component: "fillInBlank",
          codeTemplate: "___1___ Student:\n    def __init__(___2___, name, grade, score):\n        s.name = name\n        s.grade = ___3___\n        s.score = score\n\ns1 = Student('Alice', 3, 85)\nprint(f'{s1.___4___}: Grade {s1.grade}, Score {s1.score}')",
          blanks: [
            { id: "1", answer: "class", hint: "Define a class!" },
            { id: "2", answer: "s, name, grade, score", hint: "s + 3 parameters!" },
            { id: "3", answer: "grade", hint: "Store the grade!" },
            { id: "4", answer: "name", hint: "Name attribute!" }
          ],
          choices: ["class", "def", "s, name, grade, score", "name, grade, score", "grade", "score", "name", "student"],
          expectedOutput: "Alice: Grade 3, Score 85"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Final Quiz!",
          content: "What is the result of this code?\n\n```python\nclass Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\na = Character('Hero', 100)\nb = Character('Mage', 80)\na.hp = a.hp - 20\nprint(a.hp, b.hp)\n```",
          options: ["80 80", "100 80", "80 60", "Error"],
          answer: 0,
          explanation: "a and b are different objects! Only a.hp decreases, b.hp stays at 80!"
        },
        {
          id: "ch4-4",
          type: "explain",
          title: "Let's summarize everything we learned today!",
          content: `class, __init__, s... Can we fit everything we learned into **one table**?

| Code | Description | Example |
|------|-------------|---------|
| class ClassName: | Define a class (cutter) | class Character: |
| def __init__(s): | Initialization function | def __init__(s, hp): |
| s | The object itself (self) | s.hp = hp |
| ClassName() | Create an object | hero = Character() |
| object.attribute | Access an attribute | hero.hp |

### Checklist
- [ ] Class = cutter, Object = what's stamped out
- [ ] You can define a class with \`class\`
- [ ] You know when __init__ runs
- [ ] You understand what s (self) means

@Key point: A class is a **cutter**, an object is **what's stamped out**, and s is **myself**!`
        }
      ]
    }
  ]
}
