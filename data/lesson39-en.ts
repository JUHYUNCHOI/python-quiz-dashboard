import { LessonData } from './types'

export const lesson39EnData: LessonData = {
  id: "39en",
  title: "Mini Project: Game Save",
  emoji: "\uD83C\uDFAE",
  description: "Build a game save system using error handling + file I/O!",
  chapters: [
    {
      id: "ch1",
      title: "Project Introduction",
      emoji: "\uD83C\uDFAF",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "What if we combine error handling + file saving?",
          content: `We've learned error handling (try-except) and file saving (with open) separately... What if we **combine them** to make a real game?

\`\`\`
=== RPG Game ===
1. New Game
2. Continue
3. Save
4. Fight Monster
5. View Status
6. Quit
\`\`\`

1. **Integrate error handling + file saving**
2. Build a game **save/load** system
3. Organize code with functions

Estimated time: 30 minutes

@Key point: try-except + with open = **a complete game save system**!`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "What format should we use for character data?",
          content: `Name, HP, attack power, level, experience... There's a lot of character info. What data type is best for **bundling it all together**?

\`\`\`python
import random

character = {
    'name': '',
    'HP': 100,
    'attack': 25,
    'level': 1,
    'exp': 0
}
\`\`\`

Save file format (save.txt):
\`\`\`
Hero       <- name
85        <- HP
25        <- attack
3         <- level
45        <- exp
\`\`\`

One value per line, saved in order!

@Key point: Manage character data with a **dictionary**! Save one value per line in the file!`
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quiz!",
          content: "When saving character data to a file, what must you do with numbers (HP, level, etc.)?",
          options: [
            "Just save the numbers directly",
            "Convert to string with str() before saving",
            "Convert with int() before saving",
            "No conversion needed"
          ],
          answer: 1,
          explanation: "Files can only store strings! You must convert with str(number)!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Building the Save Feature",
      emoji: "\uD83D\uDCBE",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "What character data do we need to save?",
          content: `The character's name, HP, attack, level, exp... To **save these to a file**, we first need to open the file!

\`\`\`python
with open('save.txt', 'w') as file:
    file.write(character['name'] + '\\n')
    # Need to write the rest of the data too!
\`\`\`

'w' = write mode! Add **\\n** after the name for a line break!

@Key point: Open the file with **open('file', 'w')** and **write() one line at a time**!`
        },
        {
          id: "ch2-0a",
          type: "explain",
          title: "How do we save numeric data?",
          content: `The name is a string so we can write it directly... But what about **numbers like HP and attack**? Can we just write those?

\`\`\`python
# Numbers must be converted with str() to save!
file.write(str(character['HP']) + '\\n')
file.write(str(character['attack']) + '\\n')
file.write(str(character['level']) + '\\n')
\`\`\`

write() can only write **strings**, so convert numbers with \`str()\`!

@Key point: **Convert with str()** + **line break with \\n** = neatly saved, one value per line!`
        },
        {
          id: "ch2-1",
          type: "interactive",
          title: "Type Along: Save Function!",
          description: "Write the code that saves data to a file!",
          component: "typeAlong",
          targetTitle: "Simple Save",
          targetDescription: "Save name and HP with open",
          targetCode: "with open('save.txt', 'w') as f:\n    f.write('Hero\\n')\n    f.write(str(100))\nprint('Saved!')",
          expectedOutput: "Saved!"
        },
        {
          id: "ch2-2",
          type: "interactive",
          title: "Fill in the Blanks: Save Function",
          description: "Complete the save function!",
          component: "fillInBlank",
          codeTemplate: "def save(name, hp):\n    with open('save.txt', '___1___') as f:\n        f.write(name + '\\n')\n        f.write(___2___(hp))\n    print('Saved!')",
          blanks: [
            { id: "1", answer: "w", hint: "Write mode!" },
            { id: "2", answer: "str", hint: "Convert number to string!" }
          ],
          choices: ["w", "r", "a", "str", "int", "write"],
          expectedOutput: "Saved!"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "Predict the Output!",
          content: `What will save.txt contain after this?\n\n\`\`\`python\nwith open('save.txt', 'w') as f:\n    f.write('Hero' + '\\n')\n    f.write(str(85))\n\`\`\``,
          options: ["Hero85", "Hero (newline) 85", "85Hero", "Error"],
          answer: 1,
          explanation: "Thanks to '\\n', 'Hero' and '85' are saved on different lines!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Building the Load Feature",
      emoji: "\uD83D\uDCC2",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "How do we read lines from a file?",
          content: `We wrote one line at a time when saving... So we need to **read line by line** too, right? But what about the **\\n** at the end of each line?

\`\`\`python
with open('save.txt', 'r') as file:
    lines = file.readlines()
    character['name'] = lines[0].strip()
    # strip() = removes the \\n at the end!
\`\`\`

readlines() reads as a **list of lines**! \`['Hero\\n', '100\\n', ...]\`

@Key point: **readlines() for a list of lines** -> **strip() to remove \\n** -> clean data!`
        },
        {
          id: "ch3-0a",
          type: "explain",
          title: "Converting strings to numbers, and what if the file is missing?",
          content: `The name is a string so we can use it directly... But **HP and attack are numbers**! And what if the save file **doesn't exist**?

\`\`\`python
# Convert numeric data with int()!
character['HP'] = int(lines[1].strip())
character['attack'] = int(lines[2].strip())

# The file might not exist, so use try-except!
try:
    with open('save.txt', 'r') as file:
        # reading code...
except FileNotFoundError:
    print('No save file found!')
\`\`\`

@Key point: **int() for number conversion** + **try-except for missing files** = safe loading!`
        },
        {
          id: "ch3-1",
          type: "interactive",
          title: "Type Along: Load Function!",
          description: "Write code that safely reads a file with try-except!",
          component: "typeAlong",
          targetTitle: "Safe Loading",
          targetDescription: "Read file with try-except",
          targetCode: "try:\n    with open('save.txt', 'r') as f:\n        name = f.readline().strip()\n    print(f'Welcome, {name}!')\nexcept FileNotFoundError:\n    print('No save found!')",
          expectedOutput: "No save found!"
        },
        {
          id: "ch3-2",
          type: "interactive",
          title: "Fill in the Blanks: Load Function",
          description: "Complete the load function!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    with open('save.txt', '___2___') as f:\n        lines = f.readlines()\n        name = lines[0].___3___()\nexcept ___4___:\n    print('File not found!')",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "r", hint: "Read mode!" },
            { id: "3", answer: "strip", hint: "Remove newline!" },
            { id: "4", answer: "FileNotFoundError", hint: "Error when file is missing!" }
          ],
          choices: ["try", "except", "r", "w", "strip", "split", "FileNotFoundError", "ValueError"],
          expectedOutput: ""
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Quiz!",
          content: "Why do we use strip() on lines read with readlines()?",
          options: [
            "To convert to uppercase",
            "To remove the newline (\\n)",
            "To add spaces",
            "To convert to numbers"
          ],
          answer: 1,
          explanation: "readlines() includes \\n at the end of each line! strip() removes it!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Main Menu & Monsters",
      emoji: "\u2694\uFE0F",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "How do we build a menu with safe input?",
          content: `We show a menu and take a number as input... But what if the user types **"abc"**? We need while + try-except!

\`\`\`python
while True:
    print('\\n=== RPG Game ===')
    print('1. New Game  2. Continue  3. Save')
    print('4. Fight Monster  5. Status  6. Quit')
    try:
        choice = int(input('Choose: '))
        if choice == 1: new_game()
        elif choice == 2: load_game()
        elif choice == 3: save_game()
        elif choice == 4: fight_monster()
        elif choice == 5: view_status()
        elif choice == 6:
            print('See you next time!')
            break
    except ValueError:
        print('Please enter a number!')
\`\`\`

@Key point: **while True + try-except** = a safe menu that doesn't crash on bad input!`
        },
        {
          id: "ch4-1",
          type: "explain",
          title: "Building a battle system with random?",
          content: `Beat a monster to earn exp, and when enough exp accumulates, **level up!** What if we build combat with random + while + if?

\`\`\`python
import random

def fight_monster():
    monster_hp = random.randint(20, 40)
    print(f'A goblin appeared! (HP: {monster_hp})')

    while monster_hp > 0:
        input('Press Enter to attack!')
        damage = random.randint(10, character['attack'])
        monster_hp -= damage
        print(f'Attack! Damage {damage}')

        if monster_hp <= 0:
            exp = random.randint(20, 40)
            character['exp'] += exp
            print(f'Defeated the goblin! Exp +{exp}')

            if character['exp'] >= 100:
                character['level'] += 1
                character['exp'] -= 100
                character['attack'] += 5
                print(f'Level Up! Lv.{character["level"]}')
\`\`\`

@Key point: **random + while + if** = simple combat + level-up system complete!`
        },
        {
          id: "ch4-2",
          type: "interactive",
          title: "Fill in the Blanks: Main Loop",
          description: "Complete the core structure of the main menu!",
          component: "fillInBlank",
          codeTemplate: "___1___ True:\n    print('1.Start 2.Quit')\n    ___2___:\n        choice = int(input('Choose: '))\n        if choice == 2:\n            ___3___\n    except ___4___:\n        print('Numbers only!')",
          blanks: [
            { id: "1", answer: "while", hint: "Infinite loop!" },
            { id: "2", answer: "try", hint: "Wrap for errors!" },
            { id: "3", answer: "break", hint: "Exit the loop!" },
            { id: "4", answer: "ValueError", hint: "Bad value error!" }
          ],
          choices: ["while", "for", "try", "except", "break", "continue", "ValueError", "FileNotFoundError"],
          expectedOutput: ""
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Quiz!",
          content: "Why do we use try-except in the main menu?",
          options: [
            "To run faster",
            "To save a file",
            "So non-numeric input doesn't crash the program",
            "To make the menu look nice"
          ],
          answer: 2,
          explanation: "Input like 'abc' -> int() error -> except catches it!"
        }
      ]
    },
    {
      id: "ch5",
      title: "Review & Challenges",
      emoji: "\uD83C\uDFC6",
      steps: [
        {
          id: "ch5-0",
          type: "explain",
          title: "What does the full code structure look like?",
          content: `Data, functions, main loop... What does the **overall structure** of the game save system we built look like?

\`\`\`python
import random

# 1. Data
character = {'name': '', 'HP': 100, 'attack': 25, 'level': 1, 'exp': 0}

# 2. Functions
def new_game(): ...       # Enter name, initialize
def save_game(): ...      # with open('w')
def load_game(): ...      # try + with open('r')
def fight_monster(): ...  # random + while
def view_status(): ...    # Print dictionary

# 3. Main loop
while True:               # while + try-except
    Show menu
    Call functions based on choice
\`\`\`

- try-except for **missing file errors**
- try-except for **invalid input**
- with open for **file save/load**
- Functions to **organize code**

@Key point: **Data + Functions + Main loop** = clean game structure!`
        },
        {
          id: "ch5-1",
          type: "quiz",
          title: "Final Quiz!",
          content: "What do you need for the 'Continue' (load game) feature?",
          options: [
            "Only with open('save.txt', 'w')",
            "with open('save.txt', 'r') + try-except",
            "Only print()",
            "Only input()"
          ],
          answer: 1,
          explanation: "Read with 'r', and use try-except since the file might not exist!"
        },
        {
          id: "ch5-2",
          type: "explain",
          title: "How can we make the game more fun?",
          content: `The basic game is done... But there's only one monster type, no healing... What are some ways to make it **more fun**?

### Challenge 1: Multiple Monster Types
\`\`\`python
monsters = ['Goblin', 'Orc', 'Dragon']
monster = random.choice(monsters)
\`\`\`

### Challenge 2: Healing Items
\`\`\`python
def heal():
    character['HP'] = min(100, character['HP'] + 30)
    print(f'HP recovered! Current HP: {character["HP"]}')
\`\`\`

### Challenge 3: Monster Counterattack
The monster attacks back, reducing your HP!

---
**Next lesson:** Part 6 Problem Set 20!

@Key point: Use random.choice, min(), etc. to **expand the game**! Try these challenges yourself!`
        }
      ]
    }
  ]
}
