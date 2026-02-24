// ============================================
// Lesson 28: Lotto Number Generator
// ============================================
import { LessonData } from './types'

export const lesson28EnData: LessonData = {
  id: "28en",
  title: "Lotto Number Generator",
  emoji: "🎱",
  description: "Use random, duplicate checking, and loops to generate lotto numbers!",
  chapters: [
    {
      id: "ch1",
      title: "Lotto Number Generator",
      emoji: "🎱",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 Think About It: Picking Random Numbers",
          content: `![Picking Random Numbers](/lessons/l28/ch1-0-random.png)

💭 Lotto picks 6 numbers from 1~45. But **the same number can't appear twice**... How do we pick without duplicates?

\`\`\`python
import random
random.seed(42)  # Always the same result!

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n not in numbers:  # Duplicate check!
        numbers.append(n)
\`\`\`

@Key point: Use \`not in\` to check for duplicates and keep looping until we have 6!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "🎱 Generate Lotto Numbers!",
          task: "Fill in the blanks to pick lotto numbers!",
          initialCode: `import random
random.seed(42)

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n ___ in numbers:
        numbers.___(n)

numbers.sort()

print('=== Lotto Numbers ===')
print(f'Numbers: {___}')`,
          expectedOutput: `=== Lotto Numbers ===\nNumbers: [3, 14, 25, 30, 40, 45]`,
          hint: "Only add non-duplicates! Check with not in, add with append!",
          hint2: "not / append / numbers"
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "💭 Think About It: Picking Multiple Sets",
          content: `![Picking Multiple Sets](/lessons/l28/ch1-2-multi.png)

💭 Buying just one lotto ticket isn't enough! To pick **5 sets**, we just repeat the number-picking code 5 times, right?

\`\`\`python
for game in range(1, 6):
    numbers = []  # Fresh list for each set!
    # ... pick 6 numbers ...
    numbers.sort()  # Sort!
\`\`\`

@Key point: Use a \`for\` loop to repeat 5 times! Start with an empty list each time and \`sort()\` the result!`
        },
        {
          id: "ch1-3",
          type: "mission",
          title: "🎯 Mission: 5 Lotto Sets!",
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
          hint: "Pick 6, check duplicates, sort!",
          hint2: "6 / in / sort"
        }
      ]
    }
  ]
}
