// ============================================
// Lesson 27: Rock Paper Scissors Game
// Part 4: Mini Projects Collection (English)
// ============================================

import { LessonData } from './types'

export const lesson27EnData: LessonData = {
  id: "27en",
  title: "Rock Paper Scissors Game",
  emoji: "✊",
  description: "Build Rock Paper Scissors with lists, conditionals, and loops!",
  chapters: [
    // ============================================
    // Chapter 1: Rock Paper Scissors Game
    // ============================================
    {
      id: "ch1",
      title: "Rock Paper Scissors Game",
      emoji: "✊",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "Mini Project Collection!",
          content: `![Mini Project Intro](/lessons/l27/ch1-0-intro.png)

@Key point: Time to use everything you've learned! First up: **Rock Paper Scissors**!`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "Think About It: Computer's Choice",
          content: `![Computer's Choice](/lessons/l27/ch1-1-computer-choice.png)

A human can just pick... but how does the **computer** choose one of 'rock', 'paper', or 'scissors'?

\`\`\`python
choices = ['rock', 'paper', 'scissors']
computer = choices[0]  # First item = 'rock'
\`\`\`

@Key point: Put the options in a list, then grab one by **index**!`
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "Make the Computer Choose!",
          task: "Pick the computer's choice from the list!",
          initialCode: `player = 'scissors'

# Options the computer can choose from
choices = ['rock', 'paper', 'scissors']

# Pick the third item from the list!
computer = ___[2]

print(f'Player: {player}')
print(f'Computer: {___}')`,
          expectedOutput: `Player: scissors\nComputer: scissors`,
          hint: "Access by list name and index! choices[2] is 'scissors'",
          hint2: "choices / computer"
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "Think About It: Deciding the Winner",
          content: `![Deciding the Winner](/lessons/l27/ch1-3-judge.png)

Both players made their move! Scissors vs Paper! How do we decide **who wins**?

- ✊ Same choice -> **Draw**
- ✌️ Scissors vs Paper -> **Win!**
- ✊ Rock vs Scissors -> **Win!**
- ✋ Paper vs Rock -> **Win!**
- Everything else -> **Lose**

@Key point: Check each case in order with \`if\` -> \`elif\` -> \`else\`!`
        },
        {
          id: "ch1-4",
          type: "tryit",
          title: "Decide the Winner!",
          task: "Same = draw! Scissors > Paper, Rock > Scissors, Paper > Rock! Fill in the 3 blanks!",
          initialCode: `player = 'scissors'
computer = 'paper'

if player ___ computer:
    result = 'Draw'
elif player == 'scissors' and computer == '___':
    result = 'Win!'
elif player == 'rock' and computer == 'scissors':
    result = 'Win!'
elif player == 'paper' and computer == 'rock':
    result = '___'
else:
    result = 'Lose'

print(f'{player} vs {computer} -> {result}')`,
          expectedOutput: `scissors vs paper -> Win!`,
          hint: "Equal = ==, scissors beats 'paper'!",
          hint2: "== / paper / Win!"
        },
        {
          id: "ch1-5",
          type: "explain",
          title: "Think About It: Multiple Rounds",
          content: `![Multiple Rounds](/lessons/l27/ch1-5-repeat.png)

One round is boring! What if we want to play **5 rounds**? We can't copy-paste the same code 5 times...

\`\`\`python
wins = 0
losses = 0
draws = 0

for i in range(5):
    # Play one round...
    # If win: wins += 1
\`\`\`

@Key point: Repeat with a \`for\` loop, and count wins/losses/draws with **variables**!`
        },
        {
          id: "ch1-6",
          type: "tryit",
          title: "5-Round Match!",
          task: "Loop 5 times and count wins/losses/draws! Fill in the 3 blanks!",
          initialCode: `player_choices = ['scissors', 'rock', 'paper', 'scissors', 'paper']
computer_choices = ['rock', 'scissors', 'scissors', 'paper', 'paper']

wins = 0
losses = 0
draws = 0

for i in ___(len(player_choices)):
    player = player_choices[i]
    computer = computer_choices[i]

    if player == computer:
        result = 'Draw'
        ___ += 1
    elif (player == 'scissors' and computer == 'paper') or \\
         (player == 'rock' and computer == 'scissors') or \\
         (player == 'paper' and computer == 'rock'):
        result = 'Win!'
        wins += 1
    else:
        result = 'Lose'
        ___ += 1

    print(f'Round {i+1}: {player} vs {computer} -> {result}')

print(f'\\n=== Result: {wins}W {losses}L {draws}D ===')`,
          expectedOutput: `Round 1: scissors vs rock -> Lose\nRound 2: rock vs scissors -> Win!\nRound 3: paper vs scissors -> Lose\nRound 4: scissors vs paper -> Win!\nRound 5: paper vs paper -> Draw\n\n=== Result: 2W 2L 1D ===`,
          hint: "range() to loop from 0! Draws go to draws, losses go to losses!",
          hint2: "range / draws / losses"
        },
        {
          id: "ch1-7",
          type: "explain",
          title: "Think About It: Win Streak",
          content: `![Win Streak](/lessons/l27/ch1-7-streak.png)

When you're gaming, you see things like "3-win streak!" How do you count **consecutive** wins? It's different from total wins...

\`\`\`python
streak = 0       # Current streak
max_streak = 0   # Best streak

# Win:  streak += 1
# Lose: streak = 0
# Each round: update max_streak!
\`\`\`

@Key point: \`streak\` goes +1 on a win, resets to 0 on a loss! Save the best in \`max_streak\`!`
        },
        {
          id: "ch1-8",
          type: "mission",
          title: "Mission: Complete the Win Streak Counter!",
          task: "Fill in the 3 blanks to complete the win streak counter!",
          initialCode: `player_choices = ['scissors', 'rock', 'rock', 'paper', 'scissors']
computer_choices = ['paper', 'scissors', 'scissors', 'scissors', 'paper']

streak = 0
max_streak = 0

for i in range(len(player_choices)):
    player = player_choices[i]
    computer = computer_choices[i]

    if player == computer:
        result = 'Draw'
        streak = ___
    elif (player == 'scissors' and computer == 'paper') or \\
         (player == 'rock' and computer == 'scissors') or \\
         (player == 'paper' and computer == 'rock'):
        result = 'Win!'
        streak ___ 1
    else:
        result = 'Lose'
        streak = 0

    if streak > ___:
        max_streak = streak

    print(f'Round {i+1}: {result} (streak: {streak})')

print(f'\\nBest streak: {max_streak}')`,
          expectedOutput: `Round 1: Win! (streak: 1)\nRound 2: Win! (streak: 2)\nRound 3: Win! (streak: 3)\nRound 4: Lose (streak: 0)\nRound 5: Win! (streak: 1)\n\nBest streak: 3`,
          hint: "Draw resets streak, win adds +1, update the max!",
          hint2: "0 / += / max_streak"
        }
      ]
    },
    // ============================================
    // Chapter 2: Lottery Number Generator
    // ============================================
    {
      id: "ch2",
      title: "Lottery Number Generator",
      emoji: "🎱",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "Think About It: Random Numbers",
          content: `![Random Numbers](/lessons/l27/ch2-0-random.png)

The lottery picks 6 numbers from 1~45. But **the same number can't appear twice**... how do we pick without duplicates?

\`\`\`python
import random
random.seed(42)  # Same result every time!

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n not in numbers:  # Duplicate check!
        numbers.append(n)
\`\`\`

@Key point: Use \`not in\` to check for duplicates while repeating until we have 6!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "Generate Lottery Numbers!",
          task: "Fill in the blanks to generate lottery numbers!",
          initialCode: `import random
random.seed(42)

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n ___ in numbers:
        numbers.___(n)

numbers.sort()

print('=== Lottery Numbers ===')
print(f'Numbers: {___}')`,
          expectedOutput: `=== Lottery Numbers ===\nNumbers: [3, 14, 25, 30, 40, 45]`,
          hint: "Only add non-duplicates! Check with not in, add with append!",
          hint2: "not / append / numbers"
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "Think About It: Multiple Sets",
          content: `![Multiple Sets](/lessons/l27/ch2-2-multi.png)

One lottery ticket isn't enough! To draw **5 sets**? Just repeat the number-picking code 5 times!

\`\`\`python
for game in range(1, 6):
    numbers = []  # Fresh list each set!
    # ... pick 6 numbers ...
    numbers.sort()  # Sort!
\`\`\`

@Key point: Repeat 5 times with a \`for\` loop! Start with an empty list each time and \`sort()\`!`
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "Mission: 5 Lottery Sets!",
          task: "Fill in the 3 blanks to generate 5 sets!",
          initialCode: `import random
random.seed(100)

for game in range(1, 6):
    numbers = []
    while len(numbers) < ___:
        n = random.randint(1, 45)
        if n not ___ numbers:
            numbers.append(n)
    numbers.___()
    print(f'Set {game}: {numbers}')`,
          expectedOutput: `Set 1: [5, 6, 12, 17, 27, 28]\nSet 2: [2, 16, 21, 26, 34, 44]\nSet 3: [2, 12, 21, 24, 36, 43]\nSet 4: [6, 7, 15, 16, 24, 37]\nSet 5: [3, 4, 7, 18, 34, 37]`,
          hint: "Pick 6 numbers, check duplicates, sort!",
          hint2: "6 / in / sort"
        }
      ]
    },
    // ============================================
    // Chapter 3: Vocabulary Book Program
    // ============================================
    {
      id: "ch3",
      title: "Vocabulary Book Program",
      emoji: "📖",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "Think About It: Storing Words",
          content: `![Storing Words](/lessons/l27/ch3-0-vocab.png)

I want to make a vocabulary book! "apple" means "pomme", "banana" means "banane"... How do I store a **word** paired with its **meaning**?

\`\`\`python
vocab = {}
vocab['apple'] = 'pomme'
vocab['banana'] = 'banane'
print(vocab['apple'])  # pomme
\`\`\`

@Key point: Use a **dictionary** to store word:meaning pairs!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "Add Words!",
          task: "Fill in the blanks to add words to the vocabulary book and search!",
          initialCode: `vocab = {}

# Add words
vocab['apple'] = 'pomme'
vocab['banana'] = 'banane'
vocab[___] = 'cerise'

# Search for a word
word = 'apple'
if word ___ vocab:
    print(f'{word} = {vocab[___]}')
else:
    print(f'{word} not found')

print(f'Vocab book: {len(vocab)} words')`,
          expectedOutput: `apple = pomme\nVocab book: 3 words`,
          hint: "Store with a key in the dictionary! Check with in!",
          hint2: "'cherry' / in / word"
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "Think About It: Add / Search / Delete",
          content: `![Vocabulary Features](/lessons/l27/ch3-2-crud.png)

What good is a vocab book if you can only **add** words! You also need to **search**, and **delete** wrong ones. How do we tell these actions apart?

\`\`\`python
# Use commands to distinguish!
action = 'add'      # Add
action = 'search'   # Search
action = 'delete'   # Delete
action = 'list'     # List all

# Branch with if/elif!
\`\`\`

@Key point: Branch commands with \`if/elif\` to handle add/search/delete/list!`
        },
        {
          id: "ch3-3",
          type: "mission",
          title: "Mission: Complete the Vocab Book!",
          task: "Fill in the 3 blanks to complete the vocabulary program!",
          initialCode: `vocab = {}

commands = [
    ('add', 'apple', 'pomme'),
    ('add', 'banana', 'banane'),
    ('add', 'cherry', 'cerise'),
    ('search', 'apple', ''),
    ('search', 'grape', ''),
    ('delete', 'banana', ''),
    ('list', '', ''),
]

for cmd in commands:
    action = cmd[0]

    if action == 'add':
        word, meaning = cmd[1], cmd[2]
        vocab[word] = ___
        print(f'+ {word}: {meaning}')

    elif action == 'search':
        word = cmd[1]
        if word ___ vocab:
            print(f'O {word} = {vocab[word]}')
        else:
            print(f'X {word} not found')

    elif action == 'delete':
        word = cmd[1]
        if word in vocab:
            ___ vocab[word]
            print(f'- {word} deleted')

    elif action == 'list':
        print(f'--- Vocab Book ({len(vocab)} words) ---')
        for w, m in vocab.items():
            print(f'  {w}: {m}')`,
          expectedOutput: `+ apple: pomme\n+ banana: banane\n+ cherry: cerise\nO apple = pomme\nX grape not found\n- banana deleted\n--- Vocab Book (2 words) ---\n  apple: pomme\n  cherry: cerise`,
          hint: "Store the meaning, search with in, delete with del!",
          hint2: "meaning / in / del"
        }
      ]
    },
    // ============================================
    // Chapter 4: Grade Management System
    // ============================================
    {
      id: "ch4",
      title: "Grade Management System",
      emoji: "📊",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "Think About It: Student Data",
          content: `![Student Data](/lessons/l27/ch4-0-data.png)

How do you store 4 students' Korean, English, and Math scores? Put dictionaries inside a list and you can manage it like a **table**!

\`\`\`python
students = [
    {'name': 'Tom', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Jane', 'kor': 95, 'eng': 88, 'math': 92},
]
# students[0]['name'] -> 'Tom'
\`\`\`

@Key point: Combine **list + dictionary** to store table-like data!`
        },
        {
          id: "ch4-1",
          type: "tryit",
          title: "Print Report Cards!",
          task: "Fill in the blanks to print each student's average and grade!",
          initialCode: `students = [
    {'name': 'Tom', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Jane', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': 'Mike', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': 'Sara', 'kor': 88, 'eng': 95, 'math': 90},
]

for s in students:
    avg = (s['kor'] + s['eng'] + s['___']) / 3

    if avg >= 90:
        grade = 'A'
    elif avg >= ___:
        grade = 'B'
    else:
        grade = 'C'

    print(f'{s["___"]}: avg {avg:.1f} -> {grade}')`,
          expectedOutput: `Tom: avg 85.0 -> B\nJane: avg 91.7 -> A\nMike: avg 72.3 -> C\nSara: avg 91.0 -> A`,
          hint: "Average of 3 subjects! 90+ is A, 80+ is B, rest is C!",
          hint2: "math / 80 / name"
        },
        {
          id: "ch4-2",
          type: "explain",
          title: "Think About It: Subject Analysis",
          content: `![Subject Analysis](/lessons/l27/ch4-2-analysis.png)

We've seen each student's grades... but how do we find the **average by subject**? We need to pull out just the Korean scores and average them!

\`\`\`python
# Use list comprehension to extract one subject!
kor_scores = [s['kor'] for s in students]
# [85, 95, 72, 88]

avg = sum(kor_scores) / len(kor_scores)
\`\`\`

@Key point: Use **list comprehension** to extract specific subject scores and average them!`
        },
        {
          id: "ch4-3",
          type: "mission",
          title: "Mission: Find Failing Students!",
          task: "Fill in the 3 blanks to find students with failing subjects (below 70)!",
          initialCode: `students = [
    {'name': 'Tom', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Jane', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': 'Mike', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': 'Sara', 'kor': 88, 'eng': 95, 'math': 90},
]

subjects = {'kor': 'Korean', 'eng': 'English', '___': 'Math'}

print('=== Fail Check ===')
for s in students:
    fails = []
    for key, name in subjects.___():
        if s[key] ___ 70:
            fails.append(f'{name}({s[key]})')

    if fails:
        print(f'{s["name"]}: {", ".join(fails)}')
    else:
        print(f'{s["name"]}: No fails')`,
          expectedOutput: `=== Fail Check ===\nTom: No fails\nJane: No fails\nMike: English(65)\nSara: No fails`,
          hint: "Below 70 is a fail! Use .items() to loop through the dictionary!",
          hint2: "math / items / <"
        }
      ]
    }
  ]
}
