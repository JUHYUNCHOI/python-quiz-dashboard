// ============================================
// Pseudocode Lesson P1: Combined Project (English)
// CIE Style Pseudocode - Review Project Part 1!
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP1EnData: LessonData = {
  id: "pseudo-p1",
  title: "Combined Project",
  emoji: "🏆",
  description: "Part 1 Review Project!",
  chapters: [
    {
      id: "ch1",
      title: "Average Calculator",
      emoji: "🧮",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🧮 The Problem: Average Calculator",
          content: `Let's build an algorithm that **inputs 5 numbers** from the user and **calculates their average**!

This project combines:
- **Arrays** to store the 5 numbers
- **Loops** to input values and calculate the sum
- **INPUT / OUTPUT** for user interaction
- **Variables** and **arithmetic** for the calculation

The plan:
1. Declare an array of 5 integers
2. Use a loop to INPUT each number
3. Use another loop to calculate the total
4. Divide the total by 5 to get the average
5. OUTPUT the result

Let's see the full solution!`
        },
        {
          id: "ch1-solution",
          type: "explain",
          title: "📋 The Solution",
          content: `Here is the complete pseudocode:

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE total : INTEGER
DECLARE average : REAL

total ← 0

FOR i ← 1 TO 5
    OUTPUT "Enter number ", i
    INPUT numbers[i]
NEXT i

FOR i ← 1 TO 5
    total ← total + numbers[i]
NEXT i

average ← total / 5
OUTPUT "The average is: ", average
\`\`\`

Key details:
- \`average\` is **REAL** (not INTEGER) because dividing may give a decimal
- We initialize \`total ← 0\` before adding to it
- The first loop **collects** data, the second loop **processes** it`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Why is `average` declared as **REAL** instead of **INTEGER**?',
          options: [
            'Because REAL is faster than INTEGER',
            'Because the result of division can be a decimal number',
            'Because INPUT always gives REAL values',
            'Because arrays require REAL data types'
          ],
          answer: 1,
          explanation: 'When you divide, the result can have a decimal (e.g., 17 / 5 = 3.4). **REAL** stores decimal numbers, while **INTEGER** only stores whole numbers. Using INTEGER would lose the decimal part!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the key part of the average calculator.',
          code: 'DECLARE numbers : ARRAY[1:5] OF INTEGER\nDECLARE total : INTEGER\ntotal ← 0\n\nFOR i ← 1 ___ 5\n    total ← total ___ numbers[i]\nNEXT i\n\naverage ← total ___ 5',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "BY", "FOR"] },
            { id: 2, answer: "+", options: ["+", "-", "*", "/"] },
            { id: 3, answer: "/", options: ["/", "*", "+", "MOD"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `If the user enters the numbers 10, 20, 30, 40, 50, what does this output?

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE total : INTEGER
DECLARE average : REAL
total ← 0

FOR i ← 1 TO 5
    INPUT numbers[i]
NEXT i

FOR i ← 1 TO 5
    total ← total + numbers[i]
NEXT i

average ← total / 5
OUTPUT average
\`\`\``,
          options: [
            '150',
            '30',
            '50',
            '10'
          ],
          answer: 1,
          explanation: 'The total is 10 + 20 + 30 + 40 + 50 = **150**. Then average = 150 / 5 = **30**. The OUTPUT shows the average, which is 30.'
        },
      ]
    },
    {
      id: "ch2",
      title: "Find Maximum",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔍 The Problem: Find the Maximum",
          content: `Now let's build an algorithm that **finds the largest value** in an array!

This is a classic algorithm problem. The strategy:
1. Start by **assuming** the first element is the biggest
2. **Loop** through the rest of the array
3. If any element is **larger** than the current max, update the max
4. After the loop, the max holds the largest value

This combines:
- **Arrays** for data storage
- **FOR loop** to check each element
- **IF conditional** to compare values
- **Variables** to track the maximum`
        },
        {
          id: "ch2-solution",
          type: "explain",
          title: "📋 The Solution",
          content: `Here is the complete pseudocode:

\`\`\`
DECLARE values : ARRAY[1:5] OF INTEGER
DECLARE max : INTEGER

values[1] ← 34
values[2] ← 72
values[3] ← 15
values[4] ← 98
values[5] ← 43

max ← values[1]

FOR i ← 2 TO 5
    IF values[i] > max THEN
        max ← values[i]
    ENDIF
NEXT i

OUTPUT "The maximum value is: ", max
\`\`\`

Key details:
- We set \`max ← values[1]\` (start with the first element)
- The loop starts at **2** (no need to compare element 1 with itself)
- Inside the loop, we only update \`max\` when we find something **bigger**

Let's trace through: max starts at 34. Then 72 > 34, so max becomes 72. Then 15 is not > 72. Then 98 > 72, so max becomes 98. Then 43 is not > 98. Final answer: **98**!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In the Find Maximum algorithm, why does the FOR loop start at **2** instead of **1**?',
          options: [
            'Because CIE arrays must start at index 2',
            'Because max is already set to values[1], so we skip it',
            'Because the first element is always the largest',
            'Because FOR loops cannot start at 1'
          ],
          answer: 1,
          explanation: 'We set `max ← values[1]` before the loop, so element 1 is already accounted for. Starting the loop at **2** avoids an unnecessary comparison of the first element with itself!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the Find Maximum algorithm.',
          code: 'max ← values[1]\n\nFOR i ← 2 TO 5\n    ___ values[i] > max ___\n        max ← ___\n    ENDIF\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "IF", options: ["IF", "WHILE", "WHEN", "CHECK"] },
            { id: 2, answer: "THEN", options: ["THEN", "DO", "BEGIN", "RUN"] },
            { id: 3, answer: "values[i]", options: ["values[i]", "max", "i", "values[5]"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE data : ARRAY[1:4] OF INTEGER
data[1] ← 55
data[2] ← 12
data[3] ← 87
data[4] ← 43

DECLARE max : INTEGER
max ← data[1]

FOR i ← 2 TO 4
    IF data[i] > max THEN
        max ← data[i]
    ENDIF
NEXT i

OUTPUT max
\`\`\``,
          options: [
            '55',
            '12',
            '87',
            '43'
          ],
          answer: 2,
          explanation: 'Let us trace: max starts at 55. Then 12 is not > 55 (no change). Then 87 > 55, so max becomes 87. Then 43 is not > 87 (no change). The output is **87**.'
        },
      ]
    },
    {
      id: "ch3",
      title: "Number Guessing Game",
      emoji: "🎲",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🎲 The Problem: Number Guessing Game",
          content: `Let's design a **Number Guessing Game**! The computer picks a secret number, and the player keeps guessing until they get it right.

This combines:
- **Variables** to store the secret number and guess
- **INPUT / OUTPUT** for player interaction
- **REPEAT...UNTIL** loop (keep going until correct)
- **IF...THEN...ELSE** conditionals for feedback

The game flow:
1. Set a secret number
2. Ask the player to guess
3. Tell them if the guess is too high or too low
4. Repeat until they guess correctly
5. Congratulate them!`
        },
        {
          id: "ch3-solution",
          type: "explain",
          title: "📋 The Solution",
          content: `Here is the complete pseudocode:

\`\`\`
DECLARE secret : INTEGER
DECLARE guess : INTEGER
DECLARE attempts : INTEGER

secret ← 42
attempts ← 0

REPEAT
    OUTPUT "Enter your guess: "
    INPUT guess
    attempts ← attempts + 1

    IF guess > secret THEN
        OUTPUT "Too high! Try lower."
    ELSE
        IF guess < secret THEN
            OUTPUT "Too low! Try higher."
        ELSE
            OUTPUT "Correct!"
        ENDIF
    ENDIF
UNTIL guess = secret

OUTPUT "You got it in ", attempts, " attempts!"
\`\`\`

Key details:
- **REPEAT...UNTIL** runs the block **at least once**, then checks the condition
- We use **nested IF** statements: first check too high, then too low, else correct
- \`attempts\` counts how many guesses the player made
- The loop ends when \`guess = secret\` becomes TRUE`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Why is **REPEAT...UNTIL** a better choice than **WHILE** for this game?',
          options: [
            'REPEAT is faster than WHILE',
            'WHILE cannot check conditions',
            'The player must guess at least once before we can check if they are correct',
            'REPEAT...UNTIL is the only loop in CIE pseudocode'
          ],
          answer: 2,
          explanation: '**REPEAT...UNTIL** runs the code **at least once** before checking the condition. This is perfect here because the player must make at least one guess before we can check if it matches the secret number!'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the core loop of the guessing game.',
          code: '___\n    OUTPUT "Enter your guess: "\n    INPUT guess\n    IF guess > secret THEN\n        OUTPUT "Too high!"\n    ENDIF\n___ guess ___ secret',
          fillBlanks: [
            { id: 1, answer: "REPEAT", options: ["REPEAT", "WHILE", "FOR", "LOOP"] },
            { id: 2, answer: "UNTIL", options: ["UNTIL", "WHILE", "ENDREPEAT", "NEXT"] },
            { id: 3, answer: "=", options: ["=", "<>", ">", "<"] }
          ]
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `The secret number is 7. The player enters: 3, then 9, then 7.
What messages does the player see (in order)?

\`\`\`
secret ← 7
REPEAT
    INPUT guess
    IF guess > secret THEN
        OUTPUT "Too high!"
    ELSE
        IF guess < secret THEN
            OUTPUT "Too low!"
        ELSE
            OUTPUT "Correct!"
        ENDIF
    ENDIF
UNTIL guess = secret
\`\`\``,
          options: [
            'Too low!\nToo high!\nCorrect!',
            'Too high! / Too low! / Correct!',
            'Correct!',
            'Too low! / Too low! / Correct!'
          ],
          answer: 0,
          explanation: 'Guess 3: 3 < 7, so "Too low!". Guess 9: 9 > 7, so "Too high!". Guess 7: 7 = 7, so "Correct!". The loop then stops because `guess = secret` is TRUE.'
        },
      ]
    },
  ]
}
